// Server-rendered pages that search engines can read without running JavaScript:
//   /services/<slug>  one page per service (from SERVICE_PAGES, with the owner's SEO edits)
//   /guides/<slug>    topic pages the owner creates in the admin (often drafted by AI)
import { siteData, settings, origin, escHtml as e, send, query } from "./_lib.js";

export function servicePage(D, S, slug) {
  const sp = D.SERVICE_PAGES.find((x) => x.slug === slug);
  if (!sp) return null;
  const o = S.seo["svc:" + slug] || {};
  const card = D.SERVICES.find((x) => x.go === slug) || {};
  return {
    kind: "service", slug, path: `/services/${slug}`,
    title: o.title || sp.title.replace(/Yeasin Arafat/g, D.AGENCY.name), desc: o.desc || sp.meta.replace(/Yeasin Arafat/g, D.AGENCY.name), kw: o.kw || sp.kw,
    h1: o.h1 || sp.h1, intro: o.intro || sp.intro.replace(/\bI build\b/g, "We build").replace(/\bI\b/g, "we").replace(/\bMy own\b/g, "Our own").replace(/\bmy\b/g, "our"),
    points: sp.points || card.l || [], work: sp.work || [], pkg: sp.pkg, faq: (o.faq || sp.faq || []), bn: sp.bn, name: card.t || sp.nav,
    sections: o.sections || [],
  };
}

export function topicPage(S, slug) {
  const t = (S.topics || []).find((x) => x.slug === slug && !x.draft);
  return t ? { kind: "guide", path: `/guides/${t.slug}`, ...t, points: [], work: [] } : null;
}

export function render(D, S, p, base) {
  const brand = D.AGENCY.name, accent = S.brand?.accent || "#1f3fd8";
  const url = base + p.path;
  const abs = (u) => (/^https?:/.test(u) ? u : D.AGENCY.portfolio + (u.startsWith("/") ? u : "/" + u));
  const pk = p.pkg && D.PACKAGES[p.pkg];
  const services = D.SERVICE_PAGES.map((s) => `<a href="/services/${s.slug}">${e(s.nav)}</a>`).join("");
  const guides = (S.topics || []).filter((t) => !t.draft).slice(0, 12).map((t) => `<a href="/guides/${t.slug}">${e(t.h1 || t.title)}</a>`).join("");
  const ld = [
    { "@context": "https://schema.org", "@type": p.kind === "guide" ? "Article" : "Service", name: p.h1, description: p.desc, url,
      ...(p.kind === "guide" ? { headline: p.h1, dateModified: p.updated || undefined, author: { "@type": "Organization", name: brand } } : { serviceType: p.name, areaServed: ["Malaysia", "Bangladesh", "United States", "Worldwide"] }),
      provider: { "@type": "Organization", name: brand, url: base + "/", founder: { "@type": "Person", name: D.SITE.name, url: D.AGENCY.portfolio } } },
    { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [
      { "@type": "ListItem", position: 1, name: brand, item: base + "/" },
      { "@type": "ListItem", position: 2, name: p.kind === "guide" ? "Guides" : "Services", item: base + "/#" + (p.kind === "guide" ? "guides" : "services") },
      { "@type": "ListItem", position: 3, name: p.h1, item: url } ] },
  ];
  if (p.faq?.length) ld.push({ "@context": "https://schema.org", "@type": "FAQPage", mainEntity: p.faq.map(([q, a]) => ({ "@type": "Question", name: q, acceptedAnswer: { "@type": "Answer", text: a } })) });
  const lang = p.lang === "bn" ? "bn" : "en";
  return `<!doctype html><html lang="${lang}"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1,viewport-fit=cover">
<title>${e(p.title)}</title><meta name="description" content="${e(p.desc)}">${p.kw ? `<meta name="keywords" content="${e(p.kw)}">` : ""}
<link rel="canonical" href="${e(url)}"><meta property="og:type" content="website"><meta property="og:title" content="${e(p.title)}"><meta property="og:description" content="${e(p.desc)}"><meta property="og:url" content="${e(url)}"><meta property="og:site_name" content="${e(brand)}">
${S.verify?.google ? `<meta name="google-site-verification" content="${e(S.verify.google)}">` : ""}<link rel="icon" href="/img/me-averroes-logo.webp">
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Geist:wght@400;500;600&family=Instrument+Serif:ital@1&family=Hind+Siliguri:wght@400;600;700&display=swap">
<script type="application/ld+json">${JSON.stringify(ld).replace(/</g, "\\u003c")}</script>
<style>
:root{--bg:#060C18;--surface:#0B1426;--line:#1B2742;--ink:#EEF2FA;--ink-2:#9AA7BF;--ink-3:#66738D;--brand:${e(accent)};--hero:#0B1426;color-scheme:dark}
@media (prefers-color-scheme:light){:root{--bg:#F6F7F9;--surface:#fff;--line:#E1E6EE;--ink:#0B1B33;--ink-2:#4B5A73;--ink-3:#8A95A8;--hero:#0B1B33;color-scheme:light}}
*{box-sizing:border-box}body{margin:0;background:var(--bg);color:var(--ink);font:16.5px/1.7 Geist,"Hind Siliguri",system-ui,sans-serif}
a{color:var(--brand)}.w{max-width:860px;margin:0 auto;padding-left:max(20px,env(safe-area-inset-left));padding-right:max(20px,env(safe-area-inset-right))}
header{background:var(--hero);color:#eef0fb;border-bottom:1px solid var(--line)}header .w{max-width:1160px;display:flex;justify-content:space-between;align-items:center;height:64px;gap:16px}
header a{color:#eef0fb;text-decoration:none}.logo{font:600 18px Geist,sans-serif;letter-spacing:-.02em}.logo i{display:inline-block;width:8px;height:8px;border-radius:50%;background:#ff5a4f;margin-left:4px}
header nav{display:flex;gap:18px;font-size:14.5px}header nav a{color:#a9b0d0}
.crumb{font-size:13.5px;color:var(--ink-3);margin-top:40px}.crumb a{color:var(--ink-3)}
h1,h2,h3{font-family:Geist,"Hind Siliguri",sans-serif;font-weight:600;line-height:1.1;letter-spacing:-.03em;text-wrap:balance}
html[lang=bn] h1,html[lang=bn] h2{font-family:"Hind Siliguri",sans-serif}
h1{font-size:clamp(32px,5vw,50px);margin:14px 0 18px}h2{font-size:28px;margin:48px 0 12px}
.intro{font-size:19px;color:var(--ink-2)}p{color:var(--ink-2)}
ul.pts{padding:0;list-style:none;display:grid;gap:10px}ul.pts li{padding-left:26px;position:relative}ul.pts li::before{content:"";position:absolute;left:4px;top:11px;width:8px;height:8px;border-radius:50%;background:var(--brand)}
.grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(220px,1fr));gap:16px}
.card{background:var(--surface);border:1px solid var(--line);border-radius:14px;padding:20px;text-decoration:none;color:var(--ink);display:grid;gap:6px}
.card b{font-size:16.5px}.card span{font-size:14.5px;color:var(--ink-2)}.price{font:600 22px Geist,sans-serif;letter-spacing:-.03em}
details{border-bottom:1px solid var(--line);padding:14px 0}summary{cursor:pointer;font-weight:600}
.cta{margin:56px 0;background:var(--hero);color:#eef0fb;border-radius:20px;padding:36px;display:grid;gap:14px}
.cta p{color:#a9b0d0;margin:0}.btn{display:inline-block;background:#fff;color:#0e1430;font-weight:600;padding:13px 20px;border-radius:999px;text-decoration:none;width:max-content}
footer{border-top:1px solid var(--line);padding:32px 0;font-size:14px;color:var(--ink-3)}footer .links{display:flex;flex-wrap:wrap;gap:8px 18px;margin:10px 0 18px}footer a{color:var(--ink-2);text-decoration:none}
@media (max-width:600px){header nav a:not(:last-child){display:none}}
</style></head><body>
<header><div class="w"><a class="logo" href="/">Averroes<i></i></a><nav><a href="/#services">Services</a><a href="/#work">Work</a><a href="/#contact">Start a project</a></nav></div></header>
<main class="w">
<p class="crumb"><a href="/">${e(brand)}</a> / ${p.kind === "guide" ? "Guides" : "Services"} / ${e(p.name || p.h1)}</p>
<h1>${e(p.h1)}</h1>
<p class="intro">${e(p.intro)}</p>
${p.points.length ? `<ul class="pts">${p.points.map((x) => `<li>${e(x)}</li>`).join("")}</ul>` : ""}
${(p.sections || []).map((s) => `<h2>${e(s.h)}</h2>${String(s.p).split(/\n{2,}/).map((x) => `<p>${e(x)}</p>`).join("")}`).join("")}
${p.work.length ? `<h2>Work we have done</h2><div class="grid">${p.work.map(([t, , l, d]) => `<a class="card" href="${e(abs(l))}" rel="noopener"><b>${e(t)}</b><span>${e(d)}</span></a>`).join("")}</div>` : ""}
${pk ? `<h2>Packages</h2><div class="grid">${pk.map((x) => `<div class="card"><b>${e(x.t)}</b><span class="price">${e(x.price || "Custom quote")}</span><span>${e(x.f)}</span></div>`).join("")}</div>` : ""}
${p.faq?.length ? `<h2>${lang === "bn" ? "প্রশ্ন ও উত্তর" : "Questions"}</h2>${p.faq.map(([q, a]) => `<details><summary>${e(q)}</summary><p>${e(a)}</p></details>`).join("")}` : ""}
${p.bn ? `<section lang="bn"><h2>${e(p.bn.h)}</h2><p>${e(p.bn.p)}</p>${(p.bn.faq || []).map(([q, a]) => `<details><summary>${e(q)}</summary><p>${e(a)}</p></details>`).join("")}</section>` : ""}
<div class="cta"><h2 style="margin:0;color:#eef0fb">${e(p.cta || (lang === "bn" ? "আপনার প্রজেক্ট নিয়ে কথা বলি?" : "Want this for your business?"))}</h2><p>${lang === "bn" ? "২৪ ঘণ্টার মধ্যে নির্দিষ্ট কোটেশন পাবেন।" : "Send a short brief and get a fixed quote within 24 hours."}</p><a class="btn" href="/#contact">${lang === "bn" ? "প্রজেক্ট শুরু করুন" : "Start a project"}</a></div>
</main>
<footer><div class="w"><b style="color:var(--ink)">${e(brand)}</b><div class="links">${services}</div>${guides ? `<div class="links">${guides}</div>` : ""}<a href="${e(D.AGENCY.portfolio)}/">Founder's portfolio</a></div></footer>
</body></html>`;
}

export default async function handler(req, res) {
  try {
    const q = query(req), kind = q.get("kind"), slug = (q.get("slug") || "").toLowerCase();
    const D = await siteData(), S = (await settings()).content;
    const p = kind === "guide" ? topicPage(S, slug) : servicePage(D, S, slug);
    if (!p) return send(res, 404, "Page not found.");
    res.writeHead(200, { "Content-Type": "text/html; charset=utf-8", "Cache-Control": "public, max-age=0, s-maxage=60, stale-while-revalidate=600" });
    res.end(render(D, S, p, origin(req)));
  } catch (err) {
    send(res, 500, "Server error.");
  }
}
