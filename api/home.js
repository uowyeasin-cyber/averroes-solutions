// Serves the home page with the owner's SEO title, description, keywords and structured data
// written into the HTML, so search engines see them without running JavaScript.
import { readRoot, siteData, settings, origin, escHtml as e } from "./_lib.js";

export default async function handler(req, res) {
  let html = await readRoot("home.html");
  try {
    const S = (await settings()).content, D = await siteData(S), base = origin(req), h = S.seo.home || {};
    const title = h.title || "Averroes Solutions · Apps, Websites, AI Agents & Brand Design";
    const desc = h.desc || "Averroes Solutions designs, builds and launches apps, websites, online stores, AI agents and brands for businesses in Malaysia, Bangladesh and worldwide. Fixed quotes.";
    const prods = D.productList(D, S.data || {});
    const abs = (u) => { if (!u) return ""; const n = S.data?.images?.[u] || u; return /^https?:/.test(n) ? n : n.startsWith("/") ? base + n : /\.[a-z0-9]{3,4}$/i.test(n) ? `${base}/${n}` : `${base}/img/${n}.webp`; };
    const img = abs((prods.find((p) => p.img) || {}).img) || base + "/img/logo-wordmark.webp";
    const org = { "@type": ["Organization", "ProfessionalService"], "@id": base + "/#organization", name: D.AGENCY.name, url: base + "/", logo: base + "/icon-512.png", image: img, description: desc,
      email: D.SITE.email, telephone: D.SITE.phone, areaServed: D.SITE.areas, founder: { "@type": "Person", name: D.SITE.name, url: D.AGENCY.portfolio },
      sameAs: [D.AGENCY.portfolio, D.SITE.linkedin, D.SITE.github, D.SITE.facebook, D.SITE.instagram, D.SITE.youtube].filter(Boolean),
      hasOfferCatalog: { "@type": "OfferCatalog", name: "Services", itemListElement: D.SERVICE_PAGES.map((s) => ({ "@type": "Offer", itemOffered: { "@type": "Service", name: s.nav, url: `${base}/services/${s.slug}` } })) } };
    const list = { "@type": "ItemList", name: "Ready-made digital products", itemListElement: prods.map((p, i) => ({ "@type": "ListItem", position: i + 1, url: `${base}/products/${p.slug}`, name: p.n })) };
    const ld = { "@context": "https://schema.org", "@graph": [org, list] };
    const site = { "@context": "https://schema.org", "@type": "WebSite", name: D.AGENCY.name, url: base + "/", publisher: { "@id": base + "/#organization" } };
    const head = `<title>${e(title)}</title>\n<meta name="description" content="${e(desc)}">${h.kw ? `\n<meta name="keywords" content="${e(h.kw)}">` : ""}\n<link rel="canonical" href="${base}/">\n<meta property="og:url" content="${base}/">\n<meta property="og:image" content="${e(img)}">\n<meta name="twitter:card" content="summary_large_image">\n<meta name="twitter:title" content="${e(title)}">\n<meta name="twitter:description" content="${e(desc)}">\n<meta name="twitter:image" content="${e(img)}">\n<meta name="robots" content="index,follow,max-image-preview:large">${S.verify?.google ? `\n<meta name="google-site-verification" content="${e(S.verify.google)}">` : ""}\n<script type="application/ld+json">${JSON.stringify(ld).replace(/</g, "\\u003c")}</script>\n<script type="application/ld+json">${JSON.stringify(site).replace(/</g, "\\u003c")}</script>`;
    html = html.replace(/<title>[\s\S]*?<\/title>/, "").replace(/<meta name="description"[^>]*>/, "").replace(/<meta property="og:image"[^>]*>/, "").replace(/<meta name="twitter:[^"]*"[^>]*>/g, "").replace(/<meta property="og:title" content="[^"]*">/, `<meta property="og:title" content="${e(title)}">`).replace(/<meta property="og:description" content="[^"]*">/, `<meta property="og:description" content="${e(desc)}">`).replace("<meta charset=\"utf-8\">", "<meta charset=\"utf-8\">\n" + head);
  } catch {}
  res.writeHead(200, { "Content-Type": "text/html; charset=utf-8", "Cache-Control": "public, max-age=0, s-maxage=60, stale-while-revalidate=600" });
  res.end(html);
}
