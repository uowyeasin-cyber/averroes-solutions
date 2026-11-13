// GET: the latest published settings (public). GET ?v=<id>: an older version (owner only).
// PUT: publish a new version (owner only). Every publish is kept, so any version can be restored.
import { guard, session, store, query, readJSON, send, versionId, settings } from "./_lib.js";

export default async function handler(req, res) {
  try {
    if (req.method === "GET") {
      const want = query(req).get("v");
      if (want) {
        if (!guard(req, res)) return;
        const item = (await store.list("site/")).find((i) => versionId(i.pathname) === want);
        return item ? send(res, 200, { id: want, content: await store.getJSON(item) }) : send(res, 404, { error: "No such version." });
      }
      const owner = !!session(req);
      const s = await settings(owner);
      return send(res, 200, s, { "Cache-Control": owner ? "no-store" : "public, max-age=0, s-maxage=10, stale-while-revalidate=60" });
    }
    if (req.method === "PUT") {
      if (!guard(req, res, { write: true })) return;
      const c = await readJSON(req, 2_000_000);
      if (!c || c.v !== 1 || typeof c.seo !== "object" || !Array.isArray(c.topics)) return send(res, 400, { error: "Bad settings." });
      const id = new Date().toISOString().replace(/[:.]/g, "-") + "-" + Math.random().toString(36).slice(2, 6);
      await store.put(`site/${id}.json`, JSON.stringify(c), "application/json");
      await settings(true);
      return send(res, 200, { id });
    }
    send(res, 405, { error: "GET or PUT only." });
  } catch (e) {
    send(res, e.status || 500, { error: e.status ? e.message : "Server error." });
  }
}
