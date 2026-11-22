// Server-rendered pages that search engines can read without running JavaScript:
//   /products/<slug>  one page per product for sale (with the owner's shop and SEO edits)
//   /services/<slug>  one page per service (from SERVICE_PAGES, with the owner's SEO edits)
//   /guides/<slug>    topic pages the owner creates in the admin (often drafted by AI)
import { siteData, settings, origin, escHtml as e, send, query } from "./_lib.js";

const num = (x) => { const m = String(x || "").replace(/,/g, "").match(/(\d+(?:\.\d+)?)/); return m ? +m[1] : null; };
const cur = (x) => (String(x || "").match(/\b(USD|MYR|RM|BDT|EUR|GBP)\b/i) || ["USD"])[0].toUpperCase().replace("RM", "MYR");

export function servicePage(D, S, slug) {
  const sp = D.SERVICE_PAGES.find((x) => x.slug === slug);
  if (!sp) return null;
  const o = S.seo["svc:" + slug] || {};
  const card = D.SERVICES.find((x) => x.go === slug) || {};
  return {
    kind: "service", slug, path: `/services/${slug}`,
    title: o.title || sp.title.replace(/Yeasin Arafat/g, D.AGENCY.name), desc: o.desc || sp.meta.replace(/Yeasin Arafat/g, D.AGENCY.name), kw: o.kw || sp.kw,
    h1: o.h1 || sp.h1, intro: o.intro || sp.intro.replace(/^I'm the founder of [^.]+\.\s*/, "").replace(/\bI'm\b/g, "we're").replace(/\bI've\b/g, "we've").replace(/\bI\b/g, "we").replace(/\bMy\b/g, "Our").replace(/\bmy\b/g, "our").replace(/\bme\b/g, "us").replace(/(^|[.!?] )we\b/g, "$1We"),
    points: sp.points || card.l || [], work: sp.work || [], pkg: sp.pkg, faq: (o.faq || sp.faq || []), bn: sp.bn, name: card.t || sp.nav,
    sections: o.sections || [],
  };
}

export function topicPage(S, slug) {
  const t = (S.topics || []).find((x) => x.slug === slug && !x.draft);
  return t ? { kind: "guide", path: `/guides/${t.slug}`, ...t, points: [], work: [] } : null;
}

export function productPage(D, S, slug) {
  const list = D.productList(D, S.data || {}), p = list.find((x) => x.slug === slug);
  if (!p) return null;
  const def = D.productSeo(p, D.AGENCY.name), o = S.seo["prod:" + slug] || {};
  const it = D.AGENCY_SHOP.find((x) => x.n === p.n || (S.data?.shop?.[x.n]?.name === p.n)) || {};
  const plans = (p.plans || []).map((x) => x.t + " " + (x.price || "custom quote") + (x.d ? ` (${x.d.toLowerCase()})` : "")).join(", ");
  const faq = [
    [`How much does ${p.n} cost?`, plans ? `Plans: ${plans}. The exact price is confirmed with you before any payment.` : "Ask us for a quote. The price is confirmed with you before any payment."],
    [`Can I try ${p.n} before I buy?`, p.demo ? `Yes. Open the free live demo and click around as long as you like. Nothing to install and no sign-up.` : "Yes. Message us on WhatsApp and we will show you a live walkthrough."],
    ["Will it carry my own brand?", "Yes. We add your logo, colours, content and domain, so your customers only see your business."],
    ["How do I pay?", "Nothing is charged on the website. After you order we confirm the details within 24 hours and send a secure invoice. You can pay by bank transfer, card, PayPal, bKash and other methods."],
    ["What happens after I order?", "You get an order number and receipt at once. We contact you, set everything up under your brand, and hand it over live. You can track the order any time."],
  ];
  return { kind: "product", slug, path: `/products/${slug}`, product: p, page: it.page || "", related: list.filter((x) => x.slug !== slug && x.status !== "soon").slice(0, 3),
    title: o.title || def.title, desc: o.desc || def.meta, kw: o.kw || def.kw, h1: o.h1 || def.h1, intro: o.intro || def.intro, from: def.from, name: p.n, faq, points: [], work: [], sections: [] };
}

const imgUrl = (S, base, name) => { if (!name) return ""; const ov = S.data?.images?.[name]; const n = ov || name; return /^https?:/.test(n) ? n : n.startsWith("/") ? base + n : `${base}/img/${n}.webp`; };

function body(D, S, p, base) {
  const brand = D.AGENCY.name;
  const abs = (u) => (/^https?:/.test(u) ? u : D.AGENCY.portfolio + (u.startsWith("/") ? u : "/" + u));
  if (p.kind === "product") {
    const x = p.product, soon = x.status === "soon", buy = `/#buy/${x.slug}`;
    return `<section class="ph"><div class="ph-t"><span class="kick">${e(x.tag)}${soon ? " · Coming soon" : " · Ready-made"}</span><h1>${e(p.h1)}</h1><p class="intro">${e(p.intro)}</p>
      ${p.from && !soon ? `<p class="from"><small>From</small> <b>${e(p.from)}</b></p>` : ""}
      <div class="acts"><a class="btn solid" href="${buy}">${soon ? "Get notified" : "Buy now"}</a>${x.demo ? `<a class="btn" href="${e(x.demo)}" target="_blank" rel="noopener">Free live demo ↗</a>` : ""}</div>
      <p class="safe">Nothing is charged online. We confirm first, then invoice.</p></div>
      <div class="ph-i"><img src="${e(imgUrl(S, base, x.img))}" alt="${e(x.n)}: ${e(x.tag)}" width="1600" height="1000" fetchpriority="high"></div></section>
    ${x.feats?.length ? `<h2>What you get</h2><div class="feats">${x.feats.map((f) => `<div><b>${e(f[0])}</b>${f[1] ? `<span>${e(f[1])}</span>` : ""}</div>`).join("")}</div>` : ""}
    ${x.plans?.length && !soon ? `<h2>Plans and prices</h2><div class="plans">${x.plans.map((pl) => `<div class="plan${pl.pop ? " pop" : ""}">${pl.pop ? `<em>Most popular</em>` : ""}<b>${e(pl.t)}</b><span class="price">${e(pl.price || "Custom quote")}</span>${pl.d ? `<small>${e(pl.d)}</small>` : ""}<ul>${(pl.l || []).map((l) => `<li>${e(l)}</li>`).join("")}</ul><a class="btn${pl.pop ? " solid" : ""}" href="${buy}">Choose ${e(pl.t)}</a></div>`).join("")}</div>` : ""}
    <h2>How buying works</h2><ol class="steps"><li><b>Pick a plan</b><span>Try the demo, choose a plan and place your order. You get an order number and receipt at once.</span></li><li><b>We confirm</b><span>Within 24 hours we confirm the details with you and send a secure invoice.</span></li><li><b>Go live</b><span>We add your brand, content and domain, then hand it over live.</span></li></ol>
    ${p.page ? `<p class="case">See how it was built and the results it delivered: <a href="${e(p.page)}">read the ${e(x.n)} case study</a> on the founder's portfolio.</p>` : ""}`
    + faqHtml(p) + (p.related.length ? `<h2>More ready-made products</h2><div class="grid">${p.related.map((r) => `<a class="card" href="/products/${r.slug}"><img src="${e(imgUrl(S, base, r.img))}" alt="${e(r.n)}" loading="lazy" width="1600" height="1000"><b>${e(r.n)}</b><span>${e(r.tag)}${D.productSeo(r, brand).from ? " · from " + e(D.productSeo(r, brand).from) : ""}</span></a>`).join("")}</div>` : "")
      + cta(soon ? "Want to know when it launches?" : `Ready to launch ${x.n}?`, soon ? "Join the list and we will tell you first." : "Order today and go live in days, under your own brand.", buy, soon ? "Get notified" : "Buy now");
  }
  const pk = p.pkg && D.PACKAGES[p.pkg];
  const lang = p.lang === "bn" ? "bn" : "en";
  return `<span class="kick">${p.kind === "guide" ? "Guide" : "Service"}</span><h1>${e(p.h1)}</h1><p class="intro">${e(p.intro)}</p>
${p.points.length ? `<ul class="pts">${p.points.map((x) => `<li>${e(x)}</li>`).join("")}</ul>` : ""}
${(p.sections || []).map((s) => `<h2>${e(s.h)}</h2>${String(s.p).split(/\n{2,}/).map((x) => `<p>${e(x)}</p>`).join("")}`).join("")}
${p.work.length ? `<h2>Work we have done</h2><div class="grid">${p.work.map(([t, , l, d]) => `<a class="card" href="${e(abs(l))}" rel="noopener"><b>${e(t)}</b><span>${e(d)}</span></a>`).join("")}</div>` : ""}
${pk ? `<h2>Packages</h2><div class="grid">${pk.map((x) => `<div class="card"><b>${e(x.t)}</b><span class="price">${e(x.price || "Custom quote")}</span><span>${e(x.f)}</span></div>`).join("")}</div>` : ""}
${faqHtml(p, lang)}${cta(p.cta || (lang === "bn" ? "আপনার প্রজেক্ট নিয়ে কথা বলি?" : "Want this for your business?"), lang === "bn" ? "২৪ ঘণ্টার মধ্যে নির্দিষ্ট কোটেশন পাবেন।" : "Send a short brief and get a fixed quote within 24 hours.", "/#quote", lang === "bn" ? "প্রজেক্ট শুরু করুন" : "Get a quote")}`;
}
const faqHtml = (p, lang) => p.faq?.length ? `<h2>${lang === "bn" ? "প্রশ্ন ও উত্তর" : "Questions"}</h2>${p.faq.map(([q, a]) => `<details><summary>${e(q)}</summary><p>${e(a)}</p></details>`).join("")}` : "";
const cta = (h, t, href, b) => `<div class="cta"><h2>${e(h)}</h2><p>${e(t)}</p><a class="btn solid" href="${href}">${e(b)}</a></div>`;

export function render(D, S, p, base) {
  const brand = D.AGENCY.name, url = base + p.path, portfolio = D.AGENCY.portfolio;
  const org = { "@type": "Organization", "@id": base + "/#organization", name: brand, url: base + "/", logo: base + "/icon-512.png",
    founder: { "@type": "Person", name: D.SITE.name, url: portfolio + "/", sameAs: [portfolio + "/", D.SITE.linkedin, D.SITE.github].filter(Boolean) },
    sameAs: [portfolio + "/", D.SITE.linkedin, D.SITE.facebook, D.SITE.youtube].filter(Boolean) };
  const section = p.kind === "product" ? ["Shop", base + "/#shop"] : p.kind === "guide" ? ["Guides", base + "/#guides"] : ["Services", base + "/#services"];
  const ld = [{ "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [
    { "@type": "ListItem", position: 1, name: brand, item: base + "/" }, { "@type": "ListItem", position: 2, name: section[0], item: section[1] }, { "@type": "ListItem", position: 3, name: p.name || p.h1, item: url }] }];
  let image = base + "/img/bn-ecommerce-studio.webp";
  if (p.kind === "product") {
    const x = p.product, offers = (x.plans || []).filter((pl) => num(pl.price) != null).map((pl) => ({ "@type": "Offer", name: `${x.n} · ${pl.t}`, price: num(pl.price), priceCurrency: cur(pl.price),
      availability: x.status === "soon" ? "https://schema.org/PreOrder" : "https://schema.org/InStock", url, seller: { "@id": base + "/#organization" } }));
    image = imgUrl(S, base, x.img);
    ld.push({ "@context": "https://schema.org", "@type": "Product", name: x.n, description: p.desc, image, url, sku: x.slug, category: x.tag, brand: { "@type": "Brand", name: brand },
      ...(offers.length ? { offers: offers.length > 1 ? { "@type": "AggregateOffer", lowPrice: Math.min(...offers.map((o) => o.price)), highPrice: Math.max(...offers.map((o) => o.price)), priceCurrency: offers[0].priceCurrency, offerCount: offers.length, availability: offers[0].availability, offers } : offers[0] } : {}),
      ...(p.page ? { subjectOf: { "@type": "CreativeWork", name: `${x.n} case study`, url: p.page } } : {}) });
    ld.push({ "@context": "https://schema.org", ...org });
  } else {
    ld.push({ "@context": "https://schema.org", "@type": p.kind === "guide" ? "Article" : "Service", name: p.h1, description: p.desc, url,
      ...(p.kind === "guide" ? { headline: p.h1, dateModified: p.updated || undefined, author: { "@id": base + "/#organization" } } : { serviceType: p.name, areaServed: ["Malaysia", "Bangladesh", "United States", "Worldwide"] }),
      provider: org });
  }
  if (p.faq?.length) ld.push({ "@context": "https://schema.org", "@type": "FAQPage", mainEntity: p.faq.map(([q, a]) => ({ "@type": "Question", name: q, acceptedAnswer: { "@type": "Answer", text: a } })) });
  const lang = p.lang === "bn" ? "bn" : "en";
  const products = D.productList(D, S.data || {}).map((x) => `<a href="/products/${x.slug}">${e(x.n)}</a>`).join("");
  const services = D.SERVICE_PAGES.map((s) => `<a href="/services/${s.slug}">${e(s.nav)}</a>`).join("");
  const guides = (S.topics || []).filter((t) => !t.draft).slice(0, 12).map((t) => `<a href="/guides/${t.slug}">${e(t.h1 || t.title)}</a>`).join("");
  return `<!doctype html><html lang="${lang}" data-theme="dark"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1,viewport-fit=cover">
<title>${e(p.title)}</title><meta name="description" content="${e(p.desc)}">${p.kw ? `<meta name="keywords" content="${e(p.kw)}">` : ""}
<link rel="canonical" href="${e(url)}"><meta name="robots" content="index,follow,max-image-preview:large"><meta name="theme-color" content="#050E26">
<meta property="og:type" content="${p.kind === "product" ? "product" : p.kind === "guide" ? "article" : "website"}"><meta property="og:title" content="${e(p.title)}"><meta property="og:description" content="${e(p.desc)}"><meta property="og:url" content="${e(url)}"><meta property="og:site_name" content="${e(brand)}"><meta property="og:image" content="${e(image)}">
<meta name="twitter:card" content="summary_large_image"><meta name="twitter:title" content="${e(p.title)}"><meta name="twitter:description" content="${e(p.desc)}"><meta name="twitter:image" content="${e(image)}">
${p.kind === "product" && p.from ? `<meta property="product:price:amount" content="${num(p.from)}"><meta property="product:price:currency" content="${cur(p.from)}">` : ""}
${S.verify?.google ? `<meta name="google-site-verification" content="${e(S.verify.google)}">` : ""}<link rel="icon" href="/favicon.ico" sizes="48x48"><link rel="icon" href="/icon.svg" type="image/svg+xml"><link rel="apple-touch-icon" href="/apple-touch-icon.png"><link rel="manifest" href="/site.webmanifest">
<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Geist:wght@400;500;600;700&family=Instrument+Serif:ital@1&family=Hind+Siliguri:wght@400;600;700&display=swap">
<script>try{var t=localStorage.getItem("av-theme");if(t)document.documentElement.dataset.theme=t}catch(e){}</script>
<script type="application/ld+json">${JSON.stringify(ld).replace(/</g, "\\u003c")}</script>
<style>
:root{--bg:#050E26;--panel:#0B1A3D;--line:#1A2B5A;--ink:#F4F7FE;--ink-2:#C9D4EE;--mute:#A8B6DA;--accent:#8DB0FF;--btn:#fff;--btn-ink:#050E26;color-scheme:dark}
:root[data-theme=light]{--bg:#F5F7FB;--panel:#fff;--line:#E0E6F0;--ink:#0A1633;--ink-2:#26324F;--mute:#56627E;--accent:#1E3FAE;--btn:#0D2260;--btn-ink:#fff;color-scheme:light}
*{box-sizing:border-box}body{margin:0;background:var(--bg);color:var(--ink);font:16.5px/1.7 Geist,"Hind Siliguri",system-ui,sans-serif;-webkit-font-smoothing:antialiased}
:root[data-theme=dark] body::before{content:"";position:fixed;inset:0;z-index:-1;pointer-events:none;background:radial-gradient(60vw 50vh at 100% 0%,rgba(70,120,255,.24),transparent 70%),radial-gradient(50vw 55vh at 0% 40%,rgba(56,78,220,.16),transparent 70%)}
a{color:var(--accent)}img{max-width:100%;height:auto;display:block}
.w{max-width:1160px;margin:0 auto;padding-left:max(20px,env(safe-area-inset-left));padding-right:max(20px,env(safe-area-inset-right))}
header{position:sticky;top:0;z-index:5;background:color-mix(in srgb,var(--bg) 85%,transparent);backdrop-filter:blur(12px);border-bottom:1px solid var(--line)}
header .w{display:flex;justify-content:space-between;align-items:center;height:72px;gap:16px}
.logo img{height:40px;width:auto}
:root[data-theme=dark] .logo img{filter:drop-shadow(.8px 0 0 rgba(255,255,255,.9)) drop-shadow(-.8px 0 0 rgba(255,255,255,.9)) drop-shadow(0 .8px 0 rgba(255,255,255,.9)) drop-shadow(0 -.8px 0 rgba(255,255,255,.9))}
header nav{display:flex;gap:22px;align-items:center;font-size:14.5px}header nav a{color:var(--ink-2);text-decoration:none}header nav a:hover{color:var(--ink)}
.btn{display:inline-flex;align-items:center;gap:8px;padding:12px 20px;border-radius:999px;border:1px solid var(--line);color:var(--ink);font-weight:600;text-decoration:none;font-size:15px}
.btn.solid{background:var(--btn);color:var(--btn-ink);border-color:var(--btn)}
header nav .btn{padding:9px 16px;color:var(--btn-ink)}
main{padding-bottom:40px}.crumb{font-size:13.5px;color:var(--mute);margin:28px 0 0}.crumb a{color:var(--mute);text-decoration:none}
.kick{display:inline-block;margin-top:22px;font-size:13px;font-weight:600;letter-spacing:.04em;text-transform:uppercase;color:var(--accent)}
h1,h2,h3{font-weight:650;line-height:1.08;letter-spacing:-.035em;text-wrap:balance}
h1{font-size:clamp(34px,5vw,58px);margin:10px 0 18px}h2{font-size:clamp(26px,3vw,36px);margin:64px 0 18px}
.intro{font-size:19px;color:var(--ink-2);max-width:62ch}p{color:var(--ink-2)}
.ph{display:grid;grid-template-columns:1fr 1.1fr;gap:clamp(24px,4vw,56px);align-items:center;margin-top:8px}.ph>*{min-width:0}.ph h1{font-size:clamp(32px,3.8vw,50px)}.ph-i img{display:block;width:100%;height:auto;aspect-ratio:16/10;object-fit:cover;background:var(--bg-3)}
.ph-i img{border-radius:22px;border:1px solid var(--line);box-shadow:0 40px 80px -30px rgba(0,0,0,.6)}
.from small{color:var(--mute)}.from b{font-size:30px;letter-spacing:-.03em}.acts{display:flex;gap:10px;flex-wrap:wrap;margin:18px 0 8px}.safe{font-size:13.5px;color:var(--mute)}
.feats{display:grid;grid-template-columns:repeat(auto-fit,minmax(240px,1fr));gap:14px}.feats div{background:var(--panel);border:1px solid var(--line);border-radius:18px;padding:20px;display:grid;gap:4px}.feats span{color:var(--ink-2);font-size:15px}
.plans{display:grid;grid-template-columns:repeat(auto-fit,minmax(250px,1fr));gap:16px}.plan{background:var(--panel);border:1px solid var(--line);border-radius:22px;padding:24px;display:grid;gap:8px;align-content:start;position:relative}
.plan.pop{background:linear-gradient(160deg,#0A1A44,#163A9C 55%,#2E57D6);color:#fff;border-color:transparent}.plan.pop li,.plan.pop small{color:#D6DFF5}
.plan em{font-style:normal;font-size:12px;font-weight:600;background:rgba(255,255,255,.16);padding:4px 10px;border-radius:99px;width:max-content}
.plan .price{font-size:30px;font-weight:650;letter-spacing:-.03em}.plan ul{margin:6px 0 10px;padding-left:18px;color:var(--ink-2);font-size:14.5px}.plan .btn{justify-content:center}.plan.pop .btn{background:#fff;color:#0A1A44}
.steps{display:grid;grid-template-columns:repeat(3,1fr);gap:16px;list-style:none;padding:0;counter-reset:s}.steps li{background:var(--panel);border:1px solid var(--line);border-radius:18px;padding:20px;display:grid;gap:4px;counter-increment:s}
.steps li::before{content:"0" counter(s);font:600 13px ui-monospace,monospace;color:var(--accent)}.steps span{color:var(--ink-2);font-size:15px}
.case{margin-top:28px;padding:18px 20px;border-radius:16px;border:1px solid var(--line);background:var(--panel)}
ul.pts{padding:0;list-style:none;display:grid;gap:10px}ul.pts li{padding-left:26px;position:relative;color:var(--ink-2)}ul.pts li::before{content:"";position:absolute;left:4px;top:11px;width:8px;height:8px;border-radius:50%;background:var(--accent)}
.grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(240px,1fr));gap:16px}
.card{background:var(--panel);border:1px solid var(--line);border-radius:18px;padding:18px;text-decoration:none;color:var(--ink);display:grid;gap:6px;align-content:start}.card img{border-radius:12px;margin-bottom:6px}
.card span{font-size:14.5px;color:var(--ink-2)}.card .price{font-size:22px;font-weight:650;color:var(--ink)}
details{border-bottom:1px solid var(--line);padding:16px 0}summary{cursor:pointer;font-weight:600}
.cta{margin:72px 0 24px;background:linear-gradient(135deg,#0A1A44,#163A9C 70%,#2E57D6);color:#fff;border-radius:26px;padding:clamp(28px,4vw,48px);display:grid;gap:12px}
.cta h2{margin:0;color:#fff}.cta p{color:#D6DFF5;margin:0}.cta .btn{background:#fff;color:#0A1A44;width:max-content}
footer{border-top:1px solid var(--line);padding:36px 0;font-size:14px;color:var(--mute)}footer h4{margin:18px 0 6px;color:var(--ink);font-size:14px}footer .links{display:flex;flex-wrap:wrap;gap:6px 18px}footer a{color:var(--ink-2);text-decoration:none}
@media (max-width:860px){.ph{grid-template-columns:1fr}.ph-i{order:-1}.steps{grid-template-columns:1fr}header nav a:not(.btn){display:none}}
</style></head><body>
<header><div class="w"><a class="logo" href="/" aria-label="${e(brand)}, home"><img src="/img/logo-wordmark.webp" alt="${e(brand)}" width="462" height="151"></a><nav><a href="/#shop">Shop</a><a href="/#services">Custom builds</a><a href="/#pricing">Pricing</a><a href="/#track">Track order</a><a class="btn solid" href="/#quote">Get a quote</a></nav></div></header>
<main class="w">
<p class="crumb"><a href="/">${e(brand)}</a> / <a href="${section[1].replace(base, "")}">${section[0]}</a> / ${e(p.name || p.h1)}</p>
${body(D, S, p, base)}
</main>
<footer><div class="w"><a class="logo" href="/"><img src="/img/logo-wordmark.webp" alt="${e(brand)}" width="462" height="151" loading="lazy" style="height:44px"></a>
<h4>Ready-made products</h4><div class="links">${products}</div>
<h4>Custom builds</h4><div class="links">${services}</div>${guides ? `<h4>Guides</h4><div class="links">${guides}</div>` : ""}
<h4>About</h4><div class="links"><a href="${e(portfolio)}/">About the founder</a><a href="${e(portfolio)}/projects/">All projects</a><a href="/#track">Track order</a><a href="/#quote">Get a quote</a></div>
<p>© ${new Date().getFullYear()} ${e(brand)}</p></div></footer>
</body></html>`;
}

export default async function handler(req, res) {
  try {
    const q = query(req), kind = q.get("kind"), slug = (q.get("slug") || "").toLowerCase();
    const S = (await settings()).content, D = await siteData(S);
    const p = kind === "guide" ? topicPage(S, slug) : kind === "product" ? productPage(D, S, slug) : servicePage(D, S, slug);
    if (!p) return send(res, 404, "Page not found.");
    res.writeHead(200, { "Content-Type": "text/html; charset=utf-8", "Cache-Control": "public, max-age=0, s-maxage=60, stale-while-revalidate=600" });
    res.end(render(D, S, p, origin(req)));
  } catch (err) {
    send(res, 500, "Server error.");
  }
}
