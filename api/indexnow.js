// Owner only: tells Bing, Yandex, Naver, Seznam and others (IndexNow) that pages changed.
// Google reads the sitemap instead; submit /sitemap.xml once in Google Search Console.
import { guard, siteData, settings, origin, send } from "./_lib.js";

export default async function handler(req, res) {
  if (req.method !== "POST") return send(res, 405, { error: "POST only." });
  if (!guard(req, res, { write: true })) return;
  const D = await siteData(), S = (await settings(true)).content, base = origin(req), key = D.SITE.indexNowKey;
  const urlList = [base + "/", ...D.SERVICE_PAGES.map((s) => `${base}/services/${s.slug}`), ...(S.topics || []).filter((t) => !t.draft).map((t) => `${base}/guides/${t.slug}`)];
  try {
    const r = await fetch("https://api.indexnow.org/indexnow", { method: "POST", headers: { "Content-Type": "application/json; charset=utf-8" },
      body: JSON.stringify({ host: new URL(base).host, key, keyLocation: `${base}/${key}.txt`, urlList }) });
    send(res, 200, { status: r.status, count: urlList.length });
  } catch {
    send(res, 502, { error: "Could not reach IndexNow." });
  }
}
