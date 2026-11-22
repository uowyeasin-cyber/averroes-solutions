// Applies the owner's edits from the admin panel (settings.data) on top of the built-in data.
// Used by the website (browser) and by the server-rendered pages, so both always match.
function applyEdits(D, E) {
  E = E || {};
  const out = { ...D };
  const sv = E.services || {};
  out.SERVICES = D.SERVICES.filter((s) => !(sv[s.go] && sv[s.go].hide)).map((s) => {
    const o = sv[s.go];
    if (!o) return s;
    const l = Array.isArray(o.l) ? o.l.filter(Boolean) : [];
    return { ...s, t: o.t || s.t, p: o.p || s.p, l: l.length ? l : s.l, price: o.price || "" };
  });
  out.PACKAGES = { ...D.PACKAGES };
  Object.keys(E.packages || {}).forEach((k) => { if (Array.isArray(E.packages[k]) && E.packages[k].length && out.PACKAGES[k]) out.PACKAGES[k] = E.packages[k]; });
  out.FAQ = Array.isArray(E.faq) && E.faq.length ? E.faq.filter((f) => f && f[0] && f[1]) : D.FAQ;
  const c = E.contact || {};
  out.SITE = { ...D.SITE };
  ["whatsapp", "phone", "email"].forEach((k) => { if (c[k]) out.SITE[k] = c[k]; });
  out.AGENCY = c.base ? { ...D.AGENCY, base: { ...D.AGENCY.base, en: c.base } } : D.AGENCY;
  // Brand, header and footer: company name, tagline, logo and social links.
  const b = E.site || {};
  if (b.name) out.AGENCY = { ...out.AGENCY, name: b.name };
  ["linkedin", "github", "facebook", "youtube", "instagram"].forEach((k) => { if (b[k]) out.SITE[k] = b[k]; });
  if (b.portfolio) out.AGENCY = { ...out.AGENCY, portfolio: b.portfolio.replace(/\/$/, "") };
  out.STATS = Array.isArray(E.stats) && E.stats.some((s) => s && s[0]) ? E.stats : null;
  out.FEATURED = Array.isArray(E.featured) && E.featured.filter(Boolean).length ? E.featured.filter(Boolean) : null;
  return out;
}

// Products for sale with the owner's edits (D needs AGENCY_SHOP and SHOWCASE). Shared by the product pages,
// the sitemap, the chat assistant and the admin SEO room. Finished products first, "soon" ones last.
function productList(D, E) {
  E = E || {};
  const o = E.shop || {}, SC = D.SHOWCASE || {};
  const slug = (s) => String(s || "").toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
  const plansOf = (x, it) => { const pl = (x.plans || []).filter((p) => p && p.t); return pl.length ? pl : it.plans || []; };
  const own = (E.shopAdd || []).filter((x) => x && x.n && !x.hide).map((x) => {
    const fe = (x.feats || []).filter((f) => f && f[0]);
    return { n: x.n, rank: +x.rank || 0, slug: slug(x.n), tag: x.tag || "", img: x.img || "", lead: x.lead || "", demo: x.demo || "", status: x.status || "", plans: plansOf(x, {}), price: x.price || "", feats: fe };
  });
  const base = (D.AGENCY_SHOP || []).map((it, ix) => {
    const e = o[it.n] || {}; if (e.hide) return null;
    const s = SC[it.from || it.n] || {}, L = s.en || {}, fe = (e.feats || []).filter((f) => f && f[0]);
    const n = e.name || it.n;
    return { n, rank: +e.rank || ix + 1, slug: slug(n), tag: e.tag || it.tag || "", img: e.img || it.img || "", lead: e.lead || it.lead || L.lead || L.p || "", demo: e.demo || it.demo || s.demo || "",
      status: e.status || it.status || "", plans: plansOf(e, it), price: e.price || it.price || "", feats: fe.length ? fe : (L.feats || []) };
  }).filter(Boolean);
  const all = own.concat(base).sort((a, b) => a.rank - b.rank);
  return [...all.filter((x) => x.status !== "soon"), ...all.filter((x) => x.status === "soon")];
}

// Default SEO for a product page; the owner can override any of it in the admin SEO room (seo["prod:<slug>"]).
function productSeo(p, brand) {
  const num = (x) => { const m = String(x || "").replace(/,/g, "").match(/(\d+(?:\.\d+)?)/); return m ? +m[1] : null; };
  const prices = (p.plans || []).map((x) => x.price).filter((x) => num(x) != null).sort((a, b) => num(a) - num(b));
  const from = prices[0] || p.price || "";
  const tag = p.tag || "product", tagL = tag.replace(/\b[A-Z](?![A-Z])/g, (c) => c.toLowerCase());
  const head = `${p.n}: Ready-made ${tag}`;
  const title = head.length + brand.length + 3 <= 62 ? `${head} | ${brand}` : head;
  let meta = `${p.lead}${from ? ` From ${from}.` : ""}${p.demo ? " Free live demo." : ""}`;
  if (meta.length > 158) meta = meta.slice(0, 155).replace(/\s+\S*$/, "") + "…";
  return { title, meta, from, kw: [p.n, `ready-made ${tagL}`, `buy ${tagL}`, `${tagL} price`, `${tagL} for small business`, `${tagL} Malaysia`, `${tagL} Bangladesh`].join(", "),
    h1: `${p.n}, a ready-made ${tagL} for your brand`, intro: p.lead };
}
