// Weekly guide autopilot, run by Vercel Cron (see vercel.json). When the owner turns it on in the
// admin, it writes one guide page for the next keyword in the queue and saves a new settings version.
// New guides stay as drafts unless the owner chose "publish straight away".
import { store, send, settings, slugify, siteData } from "./_lib.js";
import { runAI } from "./_ai.js";

export default async function handler(req, res) {
  const secret = process.env.CRON_SECRET;
  if (!secret || req.headers.authorization !== `Bearer ${secret}`) return send(res, 401, { error: "Not allowed." });
  try {
    const cur = (await settings(true)).content;
    const A = cur.autopilot || {};
    if (!A.on) return send(res, 200, { skipped: "Autopilot is off." });
    const queue = [...(A.queue || [])];
    let keyword = queue.shift();
    if (!keyword) {
      const D = await siteData(cur);
      const r = await runAI("keywords", { topic: D.SERVICES.slice(0, 6).map((s) => s.t).join(", "), market: "Malaysia, Bangladesh and the USA" });
      const used = new Set((cur.topics || []).map((t) => String(t.focus || "").toLowerCase()));
      keyword = r.groups.flatMap((g) => g.items).map((k) => k.k).find((k) => !used.has(k.toLowerCase()));
      if (!keyword) return send(res, 200, { skipped: "No new keyword found." });
    }
    const g = await runAI("topic", { keyword, lang: "en", market: "Malaysia, Bangladesh and the USA" });
    const topics = [...(cur.topics || [])];
    let base = slugify(g.slug || keyword) || "guide", slug = base, n = 2;
    while (topics.some((t) => t.slug === slug)) slug = `${base}-${n++}`;
    topics.unshift({ slug, lang: "en", draft: !A.publish, auto: true, focus: keyword, title: g.title, desc: g.desc, kw: g.kw || keyword, h1: g.h1, intro: g.intro,
      sections: g.sections || [], faq: (g.faq || []).filter((f) => f.length >= 2).map((f) => [f[0], f[1]]), cta: g.cta || "", updated: new Date().toISOString() });
    const next = { ...cur, topics, autopilot: { ...A, queue, last: new Date().toISOString(), lastSlug: slug } };
    const id = new Date().toISOString().replace(/[:.]/g, "-") + "-auto";
    await store.put(`site/${id}.json`, JSON.stringify(next), "application/json");
    await settings(true);
    send(res, 200, { ok: true, slug, draft: !A.publish });
  } catch (e) {
    send(res, 500, { error: e.message || "Autopilot failed." });
  }
}
