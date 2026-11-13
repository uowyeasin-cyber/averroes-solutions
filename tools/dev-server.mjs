// Local preview with the admin and API:
//   OWNER_EMAIL=you@example.com OWNER_PASSWORD=test node tools/dev-server.mjs
import http from "node:http";
import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const types = { ".html": "text/html; charset=utf-8", ".js": "text/javascript", ".css": "text/css", ".webp": "image/webp", ".json": "application/json", ".txt": "text/plain", ".svg": "image/svg+xml" };
const routes = [
  [/^\/$/, "home", ""],
  [/^\/services\/([^/]+)$/, "page", "kind=service&slug=$1"],
  [/^\/guides\/([^/]+)$/, "page", "kind=guide&slug=$1"],
  [/^\/sitemap\.xml$/, "sitemap", ""],
];

http.createServer(async (req, res) => {
  let p = new URL(req.url, "http://x").pathname;
  for (const [re, fn, q] of routes) {
    if (re.test(p)) { req.url = `/api/${fn}?${p.replace(re, q)}`; p = `/api/${fn}`; break; }
  }
  if (p.startsWith("/api/")) {
    const mod = await import(path.join(root, p + ".js")).catch(() => null);
    if (!mod) { res.writeHead(404); return res.end("No such API."); }
    req.headers.origin ||= `http://${req.headers.host}`;
    return mod.default(req, res);
  }
  if (p.startsWith("/admin-files/")) p = "/.admin-data/" + p.slice(13);
  if (p.endsWith("/")) p += "index.html";
  try {
    const f = path.join(root, decodeURIComponent(p));
    const body = await fs.readFile(f);
    res.writeHead(200, { "Content-Type": types[path.extname(f)] || "application/octet-stream" });
    res.end(body);
  } catch {
    res.writeHead(404); res.end("Not found");
  }
}).listen(process.env.PORT || 3000, () => console.log("http://localhost:" + (process.env.PORT || 3000)));
