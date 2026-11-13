// Shared helpers for the owner-only editor: auth, request parsing and storage.
import crypto from "node:crypto";
import fs from "node:fs/promises";
import path from "node:path";

const COOKIE = "av_s";
const SESSION_DAYS = 14;

export function config() {
  const email = (process.env.OWNER_EMAIL || "").trim().toLowerCase();
  const hash = (process.env.OWNER_PASSWORD_HASH || "").trim();
  const plain = process.env.OWNER_PASSWORD || "";
  // Without SESSION_SECRET, derive one from the password so changing it signs every session out.
  const secret = process.env.SESSION_SECRET || (hash || plain ? sha256("av-admin:" + (hash || plain)) : "");
  return { email, hash, plain, secret, ready: Boolean(email && (hash || plain) && secret) };
}

const sha256 = (s) => crypto.createHash("sha256").update(s).digest("hex");
const same = (a, b) => {
  const x = Buffer.from(String(a)), y = Buffer.from(String(b));
  return x.length === y.length && crypto.timingSafeEqual(x, y);
};

export function hashPassword(pw, salt = crypto.randomBytes(16).toString("hex")) {
  return `scrypt$${salt}$${crypto.scryptSync(pw, salt, 64).toString("hex")}`;
}

export function checkLogin(email, password) {
  const c = config();
  if (!c.ready) return false;
  const emailOk = same(String(email || "").trim().toLowerCase(), c.email);
  let pwOk;
  if (c.hash) {
    const [alg, salt, h] = c.hash.split("$");
    pwOk = alg === "scrypt" && salt && h && same(crypto.scryptSync(String(password || ""), salt, 64).toString("hex"), h);
  } else {
    pwOk = same(sha256(String(password || "")), sha256(c.plain));
  }
  return emailOk && pwOk;
}

function sign(data, secret) {
  return crypto.createHmac("sha256", secret).update(data).digest("base64url");
}

export function sessionCookie() {
  const c = config();
  const payload = Buffer.from(JSON.stringify({ e: c.email, x: Date.now() + SESSION_DAYS * 864e5 })).toString("base64url");
  return `${COOKIE}=${payload}.${sign(payload, c.secret)}; Path=/; HttpOnly; Secure; SameSite=Strict; Max-Age=${SESSION_DAYS * 86400}`;
}

export const clearCookie = `${COOKIE}=; Path=/; HttpOnly; Secure; SameSite=Strict; Max-Age=0`;

export function session(req) {
  const c = config();
  if (!c.ready) return null;
  const m = (req.headers.cookie || "").match(new RegExp(`(?:^|;\\s*)${COOKIE}=([^;]+)`));
  if (!m) return null;
  const [payload, sig] = m[1].split(".");
  if (!payload || !sig || !same(sig, sign(payload, c.secret))) return null;
  try {
    const s = JSON.parse(Buffer.from(payload, "base64url").toString());
    return s.x > Date.now() && s.e === c.email ? { email: s.e } : null;
  } catch {
    return null;
  }
}

// Writes must come from the site itself (the cookie is SameSite=Strict too).
export function sameOrigin(req) {
  const o = req.headers.origin;
  if (!o) return false;
  try {
    return new URL(o).host === (req.headers["x-forwarded-host"] || req.headers.host);
  } catch {
    return false;
  }
}

export function query(req) {
  return new URL(req.url, "http://local").searchParams;
}

export async function readBody(req, limit) {
  const chunks = [];
  let size = 0;
  for await (const c of req) {
    size += c.length;
    if (size > limit) throw Object.assign(new Error("Too large"), { status: 413 });
    chunks.push(c);
  }
  return Buffer.concat(chunks);
}

export async function readJSON(req, limit = 1_000_000) {
  return JSON.parse((await readBody(req, limit)).toString("utf8") || "{}");
}

export function send(res, status, body, headers = {}) {
  const isText = typeof body === "string";
  res.writeHead(status, {
    "Content-Type": isText ? "text/plain; charset=utf-8" : "application/json; charset=utf-8",
    "Cache-Control": "no-store",
    ...headers,
  });
  res.end(isText ? body : JSON.stringify(body));
}

export function guard(req, res, { write = false } = {}) {
  if (!config().ready) return send(res, 503, { error: "The editor is not set up yet." }), null;
  const s = session(req);
  if (!s) return send(res, 401, { error: "Not signed in." }), null;
  if (write && !sameOrigin(req)) return send(res, 403, { error: "Bad origin." }), null;
  return s;
}

// Storage: Vercel Blob in production, a local folder for development.
let blob;
async function blobApi() {
  return (blob ||= await import("@vercel/blob"));
}

const fsRoot = () => path.resolve(process.env.CMS_DATA_DIR || ".admin-data");

export const store = {
  usesBlob: () => Boolean(process.env.BLOB_READ_WRITE_TOKEN),

  async put(pathname, data, contentType) {
    if (this.usesBlob()) {
      const { put } = await blobApi();
      const r = await put(pathname, data, { access: "public", contentType, addRandomSuffix: false });
      return r.url;
    }
    const file = path.join(fsRoot(), pathname);
    await fs.mkdir(path.dirname(file), { recursive: true });
    await fs.writeFile(file, data);
    return "/admin-files/" + pathname;
  },

  // Newest first: [{ pathname, url, uploadedAt, size }]
  async list(prefix) {
    let items = [];
    if (this.usesBlob()) {
      const { list } = await blobApi();
      let cursor;
      do {
        const r = await list({ prefix, cursor, limit: 1000 });
        items.push(...r.blobs);
        cursor = r.hasMore ? r.cursor : undefined;
      } while (cursor);
    } else {
      const dir = path.join(fsRoot(), prefix);
      const names = await fs.readdir(dir).catch(() => []);
      for (const n of names) {
        const st = await fs.stat(path.join(dir, n));
        items.push({ pathname: prefix + n, url: "/admin-files/" + prefix + n, uploadedAt: st.mtime, size: st.size });
      }
    }
    return items.sort((a, b) => (a.pathname < b.pathname ? 1 : -1));
  },

  async getJSON(item) {
    if (this.usesBlob()) {
      const r = await fetch(item.url, { cache: "no-store" });
      if (!r.ok) throw new Error("Could not read " + item.pathname);
      return r.json();
    }
    return JSON.parse(await fs.readFile(path.join(fsRoot(), item.pathname), "utf8"));
  },
};

export const versionId = (pathname) => pathname.replace(/^site\//, "").replace(/\.json$/, "");

// ---------- agency helpers ----------
import { fileURLToPath } from "node:url";
const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
let dataCache;
// Loads the browser data files (content.js + agency.js) on the server.
export async function siteData() {
  if (dataCache) return dataCache;
  const src = (await fs.readFile(path.join(ROOT, "data/content.js"), "utf8")) + "\n" + (await fs.readFile(path.join(ROOT, "data/agency.js"), "utf8"));
  dataCache = new Function(src + ";return {SITE,DEV,PROJECTS,SERVICES,SERVICE_PAGES,PACKAGES,PACKAGE_TABS,FAQ,AGENCY,AGENCY_HIDE,AGENCY_OVERRIDE,AGENCY_PRODUCTS,SERVICE_BN,UI}")();
  return dataCache;
}
export const readRoot = (file) => fs.readFile(path.join(ROOT, file), "utf8");

export const EMPTY_SETTINGS = { v: 1, brand: {}, text: { en: {}, bn: {} }, hide: null, seo: {}, topics: [], verify: {} };
let settingsCache = { at: 0, val: null };
// Latest published settings (cached for 10 seconds per instance).
export async function settings(fresh = false) {
  if (!fresh && settingsCache.val && Date.now() - settingsCache.at < 10e3) return settingsCache.val;
  let val = EMPTY_SETTINGS, id = null;
  try {
    const items = await store.list("site/");
    if (items[0]) { val = { ...EMPTY_SETTINGS, ...(await store.getJSON(items[0])) }; id = versionId(items[0].pathname); }
  } catch {}
  settingsCache = { at: Date.now(), val: { id, content: val } };
  return settingsCache.val;
}

export const origin = (req) => `https://${req.headers["x-forwarded-host"] || req.headers.host}`;
export const escHtml = (s) => String(s ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
export const slugify = (s) => String(s || "").toLowerCase().normalize("NFKD").replace(/[^\p{L}\p{N}]+/gu, "-").replace(/^-+|-+$/g, "").slice(0, 80);
