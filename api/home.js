// Serves the home page with the owner's SEO title, description, keywords and structured data
// written into the HTML, so search engines see them without running JavaScript.
import { readRoot, siteData, settings, origin, escHtml as e } from "./_lib.js";

export default async function handler(req, res) {
  let html = await readRoot("home.html");
  try {
    const D = await siteData(), S = (await settings()).content, base = origin(req), h = S.seo.home || {};
    const title = h.title || "Averroes Solutions · Apps, Websites, AI Agents & Brand Design";
    const desc = h.desc || "Averroes Solutions designs, builds and launches apps, websites, online stores, AI agents and brands for businesses in Malaysia, Bangladesh and worldwide. Fixed quotes.";
    const ld = { "@context": "https://schema.org", "@type": "ProfessionalService", name: D.AGENCY.name, url: base + "/", logo: base + "/img/me-averroes-logo.webp", description: desc,
      email: D.SITE.email, telephone: D.SITE.phone, areaServed: D.SITE.areas, founder: { "@type": "Person", name: D.SITE.name, url: D.AGENCY.portfolio },
      sameAs: [D.SITE.linkedin, D.SITE.github, D.SITE.facebook, D.SITE.instagram, D.SITE.youtube].filter(Boolean),
      hasOfferCatalog: { "@type": "OfferCatalog", name: "Services", itemListElement: D.SERVICE_PAGES.map((s) => ({ "@type": "Offer", itemOffered: { "@type": "Service", name: s.nav, url: `${base}/services/${s.slug}` } })) } };
    const head = `<title>${e(title)}</title>\n<meta name="description" content="${e(desc)}">${h.kw ? `\n<meta name="keywords" content="${e(h.kw)}">` : ""}\n<link rel="canonical" href="${base}/">\n<meta property="og:url" content="${base}/">${S.verify?.google ? `\n<meta name="google-site-verification" content="${e(S.verify.google)}">` : ""}\n<script type="application/ld+json">${JSON.stringify(ld).replace(/</g, "\\u003c")}</script>`;
    html = html.replace(/<title>[\s\S]*?<\/title>/, "").replace(/<meta name="description"[^>]*>/, "").replace(/<meta property="og:title" content="[^"]*">/, `<meta property="og:title" content="${e(title)}">`).replace(/<meta property="og:description" content="[^"]*">/, `<meta property="og:description" content="${e(desc)}">`).replace("<meta charset=\"utf-8\">", "<meta charset=\"utf-8\">\n" + head);
  } catch {}
  res.writeHead(200, { "Content-Type": "text/html; charset=utf-8", "Cache-Control": "public, max-age=0, s-maxage=60, stale-while-revalidate=600" });
  res.end(html);
}
