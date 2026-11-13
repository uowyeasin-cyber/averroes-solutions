// The Hobby plan allows 12 functions, so small endpoints share one function.
// /api/status and versions are rewritten here (vercel.json); the action comes from ?a= or the original path.
const pick = (req, names) => {
  const u = new URL(req.url || "/", "http://x");
  const a = (req.query && req.query.a) || u.searchParams.get("a") || u.pathname.split("/").pop();
  return names.includes(a) ? a : null;
};
import status from "./_status.js";
import versions from "./_versions.js";
const H = { status, versions };

export default function handler(req, res) {
  const a = pick(req, Object.keys(H));
  if (!a) { res.statusCode = 404; res.setHeader("Content-Type", "application/json"); return res.end('{"error":"Not found."}'); }
  return H[a](req, res);
}
