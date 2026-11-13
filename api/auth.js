// The Hobby plan allows 12 functions, so small endpoints share one function.
// /api/login, logout and me are rewritten here (vercel.json); the action comes from ?a= or the original path.
const pick = (req, names) => {
  const u = new URL(req.url || "/", "http://x");
  const a = (req.query && req.query.a) || u.searchParams.get("a") || u.pathname.split("/").pop();
  return names.includes(a) ? a : null;
};
import login from "./_login.js";
import logout from "./_logout.js";
import me from "./_me.js";
const H = { login, logout, me };

export default function handler(req, res) {
  const a = pick(req, Object.keys(H));
  if (!a) { res.statusCode = 404; res.setHeader("Content-Type", "application/json"); return res.end('{"error":"Not found."}'); }
  return H[a](req, res);
}
