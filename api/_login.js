import { config, checkLogin, sessionCookie, sameOrigin, readJSON, send } from "./_lib.js";

const tries = new Map(); // ip -> { n, t }, per instance

export default async function handler(req, res) {
  if (req.method !== "POST") return send(res, 405, { error: "POST only." });
  if (!config().ready) return send(res, 503, { error: "The admin is not set up yet. Add OWNER_EMAIL and OWNER_PASSWORD_HASH in Vercel." });
  if (!sameOrigin(req)) return send(res, 403, { error: "Bad origin." });
  const ip = String(req.headers["x-forwarded-for"] || req.socket?.remoteAddress || "").split(",")[0].trim();
  const now = Date.now();
  const t = tries.get(ip);
  if (t && now - t.t < 15 * 60e3 && t.n >= 8) return send(res, 429, { error: "Too many attempts. Try again in 15 minutes." });
  let body;
  try { body = await readJSON(req, 10_000); } catch { return send(res, 400, { error: "Bad request." }); }
  await new Promise((r) => setTimeout(r, 400));
  if (!checkLogin(body.email, body.password)) {
    tries.set(ip, { n: t && now - t.t < 15 * 60e3 ? t.n + 1 : 1, t: t && now - t.t < 15 * 60e3 ? t.t : now });
    return send(res, 401, { error: "Wrong email or password." });
  }
  tries.delete(ip);
  send(res, 200, { ok: true }, { "Set-Cookie": sessionCookie() });
}
