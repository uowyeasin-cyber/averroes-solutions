import { siteData, settings, origin } from "./_lib.js";

export default async function handler(req, res) {
  const D = await siteData(), S = (await settings()).content, base = origin(req);
  const urls = [["/", "1.0"], ...D.SERVICE_PAGES.map((s) => [`/services/${s.slug}`, "0.8"]), ...(S.topics || []).filter((t) => !t.draft).map((t) => [`/guides/${t.slug}`, "0.7", t.updated])];
  res.writeHead(200, { "Content-Type": "application/xml; charset=utf-8", "Cache-Control": "public, s-maxage=300" });
  res.end(`<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.map(([u, p, m]) => `  <url><loc>${base}${u}</loc>${m ? `<lastmod>${String(m).slice(0, 10)}</lastmod>` : ""}<priority>${p}</priority></url>`).join("\n")}\n</urlset>\n`);
}
