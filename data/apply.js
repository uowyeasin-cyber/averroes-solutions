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
