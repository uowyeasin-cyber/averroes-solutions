(() => {
  "use strict";
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const esc = s => String(s ?? "").replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const clone = o => JSON.parse(JSON.stringify(o));
  const ls = { get(k) { try { return JSON.parse(localStorage.getItem(k)); } catch { return null; } }, set(k, v) { try { localStorage.setItem(k, JSON.stringify(v)); } catch {} }, del(k) { try { localStorage.removeItem(k); } catch {} } };
  const I = {
    home: '<path d="M3 11l9-8 9 8"/><path d="M5 10v10h14V10"/>', seo: '<circle cx="11" cy="11" r="7"/><path d="M21 21l-4.3-4.3"/>',
    guide: '<path d="M4 4h12a4 4 0 0 1 4 4v12H8a4 4 0 0 1-4-4z"/><path d="M8 9h8M8 13h6"/>', kw: '<path d="M4 7h10M4 12h16M4 17h7"/>',
    text: '<path d="M4 6h16M9 6v14M15 12h5M17.5 12v8"/>', theme: '<circle cx="12" cy="12" r="9"/><path d="M12 3a9 9 0 0 0 0 18z" fill="currentColor"/>',
    pub: '<path d="M12 19V5M5 12l7-7 7 7"/>', setup: '<circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.7 1.7 0 0 0 .3 1.8l.1.1a2 2 0 1 1-2.8 2.8l-.1-.1a1.7 1.7 0 0 0-1.8-.3 1.7 1.7 0 0 0-1 1.5V21a2 2 0 1 1-4 0v-.1a1.7 1.7 0 0 0-1.1-1.5 1.7 1.7 0 0 0-1.8.3l-.1.1a2 2 0 1 1-2.8-2.8l.1-.1a1.7 1.7 0 0 0 .3-1.8 1.7 1.7 0 0 0-1.5-1H3a2 2 0 1 1 0-4h.1a1.7 1.7 0 0 0 1.5-1.1 1.7 1.7 0 0 0-.3-1.8l-.1-.1a2 2 0 1 1 2.8-2.8l.1.1a1.7 1.7 0 0 0 1.8.3H9a1.7 1.7 0 0 0 1-1.5V3a2 2 0 1 1 4 0v.1a1.7 1.7 0 0 0 1 1.5 1.7 1.7 0 0 0 1.8-.3l.1-.1a2 2 0 1 1 2.8 2.8l-.1.1a1.7 1.7 0 0 0-.3 1.8V9a1.7 1.7 0 0 0 1.5 1H21a2 2 0 1 1 0 4h-.1a1.7 1.7 0 0 0-1.5 1z"/>',
    out: '<path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4M16 17l5-5-5-5M21 12H9"/>', menu: '<path d="M4 7h16M4 12h16M4 17h16"/>', x: '<path d="M6 6l12 12M18 6L6 18"/>',
    ext: '<path d="M7 17L17 7M8 7h9v9"/>', spark: '<path d="M12 3l1.9 5.1L19 10l-5.1 1.9L12 17l-1.9-5.1L5 10l5.1-1.9z"/><path d="M19 16l.8 2.2L22 19l-2.2.8L19 22l-.8-2.2L16 19l2.2-.8z"/>',
    star: '<path d="M12 3l2.7 5.6 6.1.9-4.4 4.3 1 6.1L12 17l-5.4 2.9 1-6.1-4.4-4.3 6.1-.9z"/>',
    cart: '<circle cx="9" cy="20" r="1.5"/><circle cx="18" cy="20" r="1.5"/><path d="M2 3h3l2.7 12.3a1 1 0 0 0 1 .7h9.6a1 1 0 0 0 1-.8L21 8H6"/>',
    up: '<path d="M12 16V4M7 9l5-5 5 5"/><path d="M4 16v3a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1v-3"/>', img: '<rect x="3" y="4" width="18" height="16" rx="2"/><circle cx="9" cy="10" r="2"/><path d="M21 16l-5-5-9 9"/>',
    brandi: '<path d="M4 20L12 4l8 16"/><path d="M3 15c6-3 12-3 18-1"/>',
    tag: '<path d="M3 12V4h8l10 10-8 8z"/><circle cx="7.5" cy="8.5" r="1.5"/>', box: '<path d="M3 7l9-4 9 4v10l-9 4-9-4z"/><path d="M3 7l9 4 9-4M12 11v10"/>',
    q: '<circle cx="12" cy="12" r="9"/><path d="M9.5 9a2.5 2.5 0 1 1 3.5 2.3c-.6.3-1 .9-1 1.6V14M12 17h.01"/>', phone: '<path d="M21 12a9 9 0 0 1-13.4 7.9L3 21l1.2-4.4A9 9 0 1 1 21 12z"/>', plus: '<path d="M12 5v14M5 12h14"/>', trash: '<path d="M4 7h16M9 7V4h6v3M6 7l1 13h10l1-13"/>',
  };
  const icon = n => `<svg class="i" viewBox="0 0 24 24">${I[n]}</svg>`;
  const toast = (t, ms = 2200) => { const el = $("#toast"); el.textContent = t; el.classList.add("on"); clearTimeout(toast.t); toast.t = setTimeout(() => el.classList.remove("on"), ms); };

  // ---------- server ----------
  let DEMO = false, ME = null, STATUS = { storage: false, ai: false };
  async function api(path, opts = {}) {
    if (DEMO) throw new Error("Preview mode: this works on the live site after deploy.");
    const r = await fetch("/api/" + path, { method: opts.method || "GET", headers: opts.body ? { "Content-Type": "application/json" } : {}, body: opts.body ? JSON.stringify(opts.body) : undefined, credentials: "same-origin" });
    const j = await r.json().catch(() => ({}));
    if (!r.ok) throw new Error(j.error || "Something went wrong (" + r.status + ").");
    return j;
  }
  const ai = (task, input) => api("ai", { method: "POST", body: { task, input } }).then(j => j.result);

  // ---------- settings ----------
  const EMPTY = { v: 1, brand: {}, text: { en: {}, bn: {} }, hide: null, seo: {}, topics: [], verify: {}, data: {}, autopilot: { on: false, publish: false, queue: [] } };
  let S = clone(EMPTY), PUBLISHED = null, PUB_ID = null, dirty = false;
  function setDirty(v = true) { dirty = v; if (v) ls.set("av-admin-draft", { base: PUB_ID, S }); else ls.del("av-admin-draft"); const st = $("#state"); if (st) { st.classList.toggle("dirty", dirty); st.querySelector("span").textContent = dirty ? "Unpublished changes" : "All changes live"; } }
  const kwFirst = kw => String(kw || "").split(",")[0].trim();

  // ---------- pages + SEO score ----------
  const words = s => String(s || "").trim().split(/\s+/).filter(Boolean).length;
  function pages() {
    const home = S.seo.home || {};
    const heroT = (S.text.en.heroA || UI.en.heroA) + " " + (S.text.en.heroEm || UI.en.heroEm), heroL = S.text.en.heroLead || UI.en.heroLead;
    const homeContent = [heroT, heroL, ...SERVICES.map(s => s.t + ". " + s.p + " " + s.l.join(". ")), ...FAQ.map(f => f.join(" "))].join("\n");
    const list = [{ id: "home", type: "Home", name: "Home page", path: "/", h1: heroT, first: heroL, content: homeContent, faq: FAQ.length,
      title: home.title || "Averroes Solutions · Apps, Websites, AI Agents & Brand Design",
      desc: home.desc || "Averroes Solutions designs, builds and launches apps, websites, online stores, AI agents and brands for businesses in Malaysia, Bangladesh and worldwide. Fixed quotes.",
      kw: home.kw || "", focus: home.focus || kwFirst(home.kw) }];
    SERVICE_PAGES.forEach(sp => {
      const o = S.seo["svc:" + sp.slug] || {};
      const intro = o.intro || sp.intro;
      list.push({ id: "svc:" + sp.slug, type: "Service", name: sp.nav, path: "/services/" + sp.slug, h1: o.h1 || sp.h1, first: intro, intro,
        content: [o.h1 || sp.h1, intro, ...(sp.points || []), ...(sp.work || []).map(w => w[0] + " " + w[3]), ...(sp.faq || []).map(f => f.join(" ")), sp.bn ? sp.bn.p : ""].join("\n"),
        faq: (sp.faq || []).length, title: o.title || sp.title.replace(/Yeasin Arafat/g, AGENCY.name), desc: o.desc || sp.meta.replace(/Yeasin Arafat/g, AGENCY.name), kw: o.kw || sp.kw, focus: o.focus || kwFirst(o.kw || sp.kw), def: sp });
    });
    S.topics.forEach((t, i) => list.push({ id: "guide:" + i, type: "Guide", name: t.h1 || t.title || "Untitled guide", path: "/guides/" + t.slug, h1: t.h1, first: t.intro,
      content: [t.h1, t.intro, ...(t.sections || []).map(s => s.h + " " + s.p), ...(t.faq || []).map(f => f.join(" "))].join("\n"),
      faq: (t.faq || []).length, title: t.title, desc: t.desc, kw: t.kw, focus: t.focus || kwFirst(t.kw), draft: t.draft, topic: i }));
    return list;
  }
  function checks(p) {
    const k = String(p.focus || "").toLowerCase(), has = s => k && String(s || "").toLowerCase().includes(k);
    const tl = String(p.title || "").length, dl = String(p.desc || "").length, w = words(p.content);
    return [
      [tl >= 30 && tl <= 60, 15, `Title is 30–60 characters (now ${tl})`],
      [dl >= 120 && dl <= 160, 15, `Description is 120–160 characters (now ${dl})`],
      [!!k, 10, "A focus keyword is set"],
      [has(p.title), 15, "Focus keyword is in the title"],
      [has(p.desc), 10, "Focus keyword is in the description"],
      [has(p.h1), 10, "Focus keyword is in the main heading (H1)"],
      [has(p.first), 10, "Focus keyword is in the first paragraph"],
      [w >= 300, 10, `At least 300 words on the page (now ${w})`],
      [p.faq >= 2, 5, "Has questions & answers (can show as rich results)"],
    ];
  }
  const score = p => checks(p).reduce((a, [ok, pts]) => a + (ok ? pts : 0), 0);
  const chip = n => n >= 80 ? `<span class="chip good">Good</span>` : n >= 50 ? `<span class="chip warn">Needs work</span>` : `<span class="chip bad">Weak</span>`;

  // ---------- shell ----------
  const ROOMS = [["overview", "Overview", "home"], ["orders", "Orders", "cart"], ["autopilot", "AI autopilot", "spark"], ["content", "Website text", "text"], ["brand", "Brand, header & footer", "brandi"], ["photos", "Photos", "img"], ["services", "Services & prices", "tag"], ["projects", "Projects & shop", "box"], ["reviews", "Client reviews", "star"], ["faq", "Questions", "q"], ["contact", "Contact & numbers", "phone"], ["seo", "Pages & SEO", "seo"], ["guides", "Guides", "guide"], ["keywords", "Keyword ideas", "kw"], ["theme", "Look & feel", "theme"], ["publish", "Publish & history", "pub"], ["setup", "Setup", "setup"]];
  let room = (location.hash.slice(1) && ROOMS.some(r => r[0] === location.hash.slice(1))) ? location.hash.slice(1) : "overview";

  function shell() {
    $("#root").innerHTML = `<div class="app">
      <aside class="rail" id="rail">
        <div class="brand"><svg width="28" height="28" viewBox="0 0 32 32" aria-hidden="true"><path d="M3 28L16 4l13 24" fill="none" stroke="#6f8bff" stroke-width="3.4" stroke-linejoin="round"/><path d="M2 21c8-4 18-4 28-1" fill="none" stroke="#eef0fb" stroke-width="2" stroke-linecap="round"/><circle cx="16" cy="20" r="3" fill="#ff5a4f"/></svg><span>Averroes<small>Admin</small></span></div>
        ${ROOMS.map(([id, n, ic]) => `<button type="button" data-room="${id}" ${id === room ? 'aria-current="page"' : ""}>${icon(ic)}${n}</button>`).join("")}
        <div class="sp"></div>
        <button type="button" onclick="window.open('/','_blank')">${icon("ext")}View website</button>
        <button type="button" id="logout">${icon("out")}Sign out</button>
        <div class="who">${esc(ME || "Preview")}</div>
      </aside>
      <main>
        ${DEMO ? `<div class="demo">Preview mode. Sign-in, saving and AI start working once the site is deployed with its settings.</div>` : ""}
        <div class="bar"><button class="btn small ghost menuBtn" id="menuBtn" aria-label="Menu">${icon("menu")}</button><h1 id="title"></h1><div class="sp"></div>
          <div class="state" id="state"><i></i><span>All changes live</span></div>
          <button class="btn primary small" id="publishTop">${icon("pub")}Publish</button></div>
        <div class="view" id="view"></div>
      </main>
    </div>
    <div class="drawer" id="drawer"><div class="scrim" data-close></div><div class="body" role="dialog" aria-modal="true" aria-labelledby="dTitle"><div class="head"><h2 id="dTitle"></h2><button class="btn small ghost" data-close aria-label="Close">${icon("x")}</button></div><div class="scroll" id="dBody"></div><div class="foot" id="dFoot"></div></div></div>`;
    setDirty(dirty);
    show(room);
  }
  function show(r) {
    room = r; history.replaceState(null, "", "#" + r);
    $$(".rail button[data-room]").forEach(b => b.dataset.room === r ? b.setAttribute("aria-current", "page") : b.removeAttribute("aria-current"));
    $("#title").textContent = ROOMS.find(x => x[0] === r)[1];
    $("#rail").classList.remove("open");
    VIEWS[r]();
    scrollTo(0, 0);
  }

  // ---------- rooms ----------
  // ---------- photos: upload, library, image fields ----------
  const imgSrc = v => !v ? "" : /^(https?:|\/|data:)/.test(v) ? v : (window.IMG && window.IMG[v]) || `../img/${v}.webp`;
  let IMGSET = () => () => {};
  const imgField = (id, val, def) => `<div class="imgf" data-imgf="${esc(id)}">
    <div class="thumb">${val || def ? `<img src="${esc(imgSrc(val || def))}" alt="" loading="lazy">` : `<span class="muted">No photo</span>`}${val ? `<span class="new">New</span>` : ""}</div>
    <div class="imgacts"><button type="button" class="btn small" data-up>${icon("up")}Upload</button><button type="button" class="btn small ghost" data-lib>Library</button>${val ? `<button type="button" class="btn small ghost" data-reset>Reset</button>` : ""}
      <input class="t" data-url placeholder="or paste an image link" value="${esc(/^https?:/.test(val || "") ? val : "")}"></div></div>`;
  async function uploadImage(file) {
    if (!/^image\//.test(file.type)) throw new Error("Choose an image file (JPG, PNG or WebP).");
    const bmp = await createImageBitmap(file);
    const k = Math.min(1, 2000 / Math.max(bmp.width, bmp.height));
    const c = document.createElement("canvas"); c.width = Math.round(bmp.width * k); c.height = Math.round(bmp.height * k);
    c.getContext("2d").drawImage(bmp, 0, 0, c.width, c.height);
    let q = 0.86, url = c.toDataURL("image/webp", q);
    while (url.length > 3_900_000 && q > 0.4) { q -= 0.15; url = c.toDataURL("image/webp", q); }
    if (url.length > 3_900_000) throw new Error("This photo is too large. Try a smaller one.");
    if (DEMO) return url;
    const type = url.slice(5, url.indexOf(";"));
    return (await api("upload", { method: "POST", body: { name: file.name.replace(/\.[^.]+$/, ""), type, data: url.split(",")[1] } })).url;
  }
  function pickFile() {
    return new Promise(res => { const i = document.createElement("input"); i.type = "file"; i.accept = "image/*"; i.onchange = () => res(i.files[0] || null); i.click(); });
  }
  async function library(onPick) {
    const box = document.createElement("div"); box.className = "lib";
    box.innerHTML = `<div class="libin"><header><h2>Media library</h2><button class="btn small ghost" data-x>${icon("x")}</button></header><div class="libgrid"><p class="muted">Loading…</p></div></div>`;
    document.body.appendChild(box);
    const close = () => box.remove();
    box.addEventListener("click", e => { if (e.target === box || e.target.closest("[data-x]")) close(); });
    try {
      const items = DEMO ? [] : (await api("upload")).items;
      box.querySelector(".libgrid").innerHTML = items.length ? items.map(it => `<button type="button" data-u="${esc(it.url)}" ${onPick ? "" : "disabled"}><img src="${esc(it.url)}" alt="" loading="lazy"><span>${esc(it.name.replace(/^[\dT-]+Z?-/, ""))}</span></button>`).join("")
        : `<p class="muted">${DEMO ? "The library works on the live site." : "No photos uploaded yet. Use Upload on any photo."}</p>`;
      box.querySelectorAll("[data-u]").forEach(b => b.addEventListener("click", () => { close(); onPick && onPick(b.dataset.u); }));
    } catch (err) { box.querySelector(".libgrid").innerHTML = `<p class="muted">${esc(err.message)}</p>`; }
  }
  document.addEventListener("click", async e => {
    if (e.target.closest("[data-libonly]")) return library(null);
    const f = e.target.closest("[data-imgf]"); if (!f) return;
    const set = IMGSET(f.dataset.imgf);
    if (e.target.closest("[data-reset]")) return set("");
    if (e.target.closest("[data-lib]")) return library(set);
    const up = e.target.closest("[data-up]");
    if (up) {
      const file = await pickFile(); if (!file) return;
      busy(up, true);
      try { set(await uploadImage(file)); toast("Photo ready. Publish when you're ready."); } catch (err) { toast(err.message, 4000); busy(up, false); }
    }
  });
  document.addEventListener("change", e => {
    const u = e.target.closest("[data-url]"); if (!u) return;
    const v = u.value.trim(); if (v && !/^https:\/\//.test(v)) return toast("Use a link that starts with https://", 3000);
    IMGSET(u.closest("[data-imgf]").dataset.imgf)(v);
  });
  // Built-in projects in the order the website shows them.
  function baseWork() {
    const sw = DEV.filter(d => !AGENCY_PRODUCTS.includes(d.n)).map(d => { const o = { ...d, ...(AGENCY_OVERRIDE[d.n] || {}) }, s = SHOWCASE[d.n] || {};
      return { key: d.n, name: d.n, title: d.n, kick: o.k, text: (s.en && s.en.lead) || o.p, list: o.l || [], tags: o.tags || [], img: o.img || s.cover, live: o.link ? [o.link[0], o.link[1]] : null, page: s.url || "" }; });
    const br = PROJECTS.map(p => ({ key: p.slug, name: p.name, title: p.name, kick: `${p.client} · ${p.year}`, text: p.summary, list: p.deliver ? [p.deliver] : [], tags: p.tags || [], img: p.cover + "-t", page: "" }));
    return [...sw, ...br];
  }
  function photoGroups() {
    const seen = new Set(), add = (arr, k, l) => { if (k && !seen.has(k)) { seen.add(k); arr.push([k, l]); } };
    const hero = [], shop = [], prod = [], work = [], brand = [];
    AGENCY_SHOP.forEach(it => add(shop, it.img, it.n));
    Object.entries(typeof AGENCY_BANNERS === "object" ? AGENCY_BANNERS : {}).forEach(([k, img]) => add(hero, img, ((PROJECTS.find(x => x.slug === k) || {}).name || k)));
    AGENCY_PRODUCTS.forEach(n => { const d = DEV.find(x => x.n === n); if (d) add(prod, d.img || (SHOWCASE[n] || {}).cover, n); });
    baseWork().forEach(w => add(work, w.img, w.title));
    return [["Logo", brand], ["Product banners (shop, top slider and checkout) · best size 1600×1000", shop], ["Featured project banners (Recent work) · 1600×1000", hero], ["Own apps", prod], ["Projects", work]].filter(g => g[1].length);
  }

  const VIEWS = {
    overview() {
      const P = pages(), sc = P.map(score), avg = Math.round(sc.reduce((a, b) => a + b, 0) / P.length);
      const weak = P.map((p, i) => [p, sc[i]]).sort((a, b) => a[1] - b[1]).slice(0, 5);
      const live = S.topics.filter(t => !t.draft).length;
      $("#view").innerHTML = `
        <div class="panel" style="grid-template-columns:auto 1fr;align-items:center;gap:28px">
          <div class="ring" style="--v:${avg};--c:${avg >= 80 ? "var(--good)" : avg >= 50 ? "var(--warn)" : "var(--bad)"}"><b>${avg}</b></div>
          <div style="display:grid;gap:8px"><h2>Search health ${chip(avg)}</h2><p class="muted">Average SEO score across ${P.length} pages. Open the weakest page below, press the AI button, check its suggestion, then publish.</p>
          <div style="display:flex;gap:10px;flex-wrap:wrap;margin-top:6px"><button class="btn ai" data-go="keywords">Find keywords to rank for</button><button class="btn" data-go="guides">${icon("plus")}New guide page</button></div></div>
        </div>
        <div class="grid4">
          <div class="kpi"><b>${P.length}</b><span>pages search engines can index</span></div>
          <div class="kpi"><b>${live}</b><span>guide pages live</span></div>
          <div class="kpi"><b>${sc.filter(s => s < 80).length}</b><span>pages that need work</span></div>
          <div class="kpi"><b style="font-size:20px;padding-top:8px">${DEMO ? "Preview" : STATUS.ai ? "On" : "Off"}</b><span>AI assistant${!DEMO && !STATUS.ai ? " · see Setup" : ""}</span></div>
        </div>
        <div class="panel"><header><h2>Fix these first</h2><button class="btn small" data-go="seo">All pages</button></header>
          <div class="tablewrap"><table><thead><tr><th>Page</th><th>Type</th><th>Score</th><th></th></tr></thead><tbody>
          ${weak.map(([p, s]) => `<tr class="rowlink" data-page="${esc(p.id)}"><td>${esc(p.name)}</td><td class="muted">${p.type}</td><td><span class="score">${s}</span></td><td>${chip(s)}</td></tr>`).join("")}
          </tbody></table></div></div>`;
    },
    seo() {
      const P = pages();
      $("#view").innerHTML = `<div class="panel"><header><div><h2>Every page Google can find</h2><p class="muted">Click a page to edit how it appears in search. Scores update as you type.</p></div><a class="btn small" href="/sitemap.xml" target="_blank" rel="noopener">${icon("ext")}Sitemap</a></header>
        <div class="tablewrap"><table><thead><tr><th>Page</th><th>Type</th><th>Focus keyword</th><th>Score</th><th></th></tr></thead><tbody>
        ${P.map(p => { const s = score(p); return `<tr class="rowlink" data-page="${esc(p.id)}"><td><b style="font-weight:600">${esc(p.name)}</b><div class="muted">${esc(p.path)}</div></td><td class="muted">${p.type}${p.draft ? " · draft" : ""}</td><td>${p.focus ? esc(p.focus) : '<span class="muted">not set</span>'}</td><td><span class="score">${s}</span></td><td>${chip(s)}</td></tr>`; }).join("")}
        </tbody></table></div></div>`;
    },
    guides(prefill) {
      const P = pages().filter(p => p.type === "Guide");
      $("#view").innerHTML = `
        <div class="panel"><header><div><h2>Write a guide with AI</h2><p class="muted">A guide is a page built to rank for one search, like "ecommerce website price in Bangladesh". AI writes a full draft, you check it, then publish.</p></div></header>
          <form id="newGuide" style="display:grid;gap:14px">
            <div class="grid2">
              <label class="f">Keyword to rank for<input class="t" id="gKw" required placeholder="e.g. restaurant website design Malaysia" value="${esc(prefill?.k || "")}"></label>
              <label class="f">Service it sells<select class="t" id="gSvc"><option value="">Let AI choose</option>${SERVICES.map(s => `<option>${esc(s.t)}</option>`).join("")}</select></label>
            </div>
            <div class="grid2">
              <label class="f">Language<select class="t" id="gLang"><option value="en">English</option><option value="bn" ${prefill?.bn ? "selected" : ""}>বাংলা</option></select></label>
              <label class="f">Market<input class="t" id="gMarket" value="Malaysia and Bangladesh"></label>
            </div>
            <label class="f">Anything AI should know (optional)<textarea class="t" id="gNotes" placeholder="e.g. mention bKash payment and that we deliver in 2 weeks"></textarea></label>
            <div style="display:flex;gap:10px;flex-wrap:wrap"><button class="btn ai" type="submit" id="gGo">Write the page</button><button class="btn" type="button" id="gBlank">${icon("plus")}Start blank</button></div>
          </form></div>
        <div class="panel"><header><h2>Your guides</h2></header>
          ${P.length ? `<div class="tablewrap"><table><thead><tr><th>Guide</th><th>Status</th><th>Score</th><th></th></tr></thead><tbody>${P.map(p => { const s = score(p); return `<tr class="rowlink" data-page="${esc(p.id)}"><td><b style="font-weight:600">${esc(p.name)}</b><div class="muted">${esc(p.path)}</div></td><td>${p.draft ? '<span class="chip plain">Draft</span>' : '<span class="chip good">Live</span>'}</td><td><span class="score">${s}</span></td><td>${chip(s)}</td></tr>`; }).join("")}</tbody></table></div>`
          : `<div class="empty"><b>No guides yet</b><p>Write your first one above. Each guide becomes its own page at /guides/your-keyword, listed in the sitemap and the site footer.</p></div>`}</div>`;
      $("#newGuide").addEventListener("submit", async e => {
        e.preventDefault();
        const b = $("#gGo"); busy(b, true);
        try {
          const r = await ai("topic", { keyword: $("#gKw").value.trim(), lang: $("#gLang").value, market: $("#gMarket").value, service: $("#gSvc").value, notes: $("#gNotes").value });
          const slug = uniqueSlug(r.slug || $("#gKw").value);
          S.topics.unshift({ slug, lang: $("#gLang").value, draft: true, focus: $("#gKw").value.trim(), title: r.title, desc: r.desc, kw: r.kw || $("#gKw").value, h1: r.h1, intro: r.intro, sections: r.sections || [], faq: (r.faq || []).filter(f => f.length >= 2).map(f => [f[0], f[1]]), cta: r.cta || "", updated: new Date().toISOString() });
          setDirty(); VIEWS.guides(); openPage("guide:0"); toast("Draft ready. Check it, switch it to Live, then publish.");
        } catch (err) { toast(err.message, 4000); } finally { busy(b, false); }
      });
      $("#gBlank").addEventListener("click", () => {
        const k = $("#gKw").value.trim() || "new guide";
        S.topics.unshift({ slug: uniqueSlug(k), lang: $("#gLang").value, draft: true, focus: $("#gKw").value.trim(), title: "", desc: "", kw: "", h1: "", intro: "", sections: [{ h: "", p: "" }], faq: [], cta: "", updated: new Date().toISOString() });
        setDirty(); VIEWS.guides(); openPage("guide:0");
      });
    },
    keywords() {
      $("#view").innerHTML = `<div class="panel"><header><div><h2>What should you rank for?</h2><p class="muted">Type a service or idea. AI suggests the searches people really make, grouped by what they want, with how hard each one is for a new site.</p></div></header>
        <form id="kwForm" style="display:grid;gap:14px"><div class="grid2"><label class="f">Service, product or topic<input class="t" id="kTopic" required placeholder="e.g. AI chatbot for restaurants"></label><label class="f">Market<input class="t" id="kMarket" value="Malaysia and Bangladesh"></label></div>
        <div><button class="btn ai" id="kGo" type="submit">Suggest keywords</button></div></form></div>
        <div id="kwOut"></div>`;
      $("#kwForm").addEventListener("submit", async e => {
        e.preventDefault(); const b = $("#kGo"); busy(b, true);
        try {
          const r = await ai("keywords", { topic: $("#kTopic").value, market: $("#kMarket").value });
          const tone = d => /low/i.test(d) ? "good" : /high/i.test(d) ? "bad" : "warn";
          $("#kwOut").innerHTML = `<div class="panel"><header><h2>Ideas for “${esc($("#kTopic").value)}”</h2></header>${r.tip ? `<div class="aibox">${esc(r.tip)}</div>` : ""}
            <div class="grid2">${r.groups.map(g => `<div class="kwgroup"><h3>${esc(g.intent)}</h3>${g.items.map(k => `<div class="kw"><span>${esc(k.k)}<div class="muted">${esc(k.page || "")}</div></span><span style="display:flex;gap:8px;align-items:center"><span class="chip ${tone(k.diff)}">${esc(k.diff)}</span><button class="btn small" data-mkguide="${esc(k.k)}">Write guide</button></span></div>`).join("")}</div>`).join("")}</div></div>`;
        } catch (err) { toast(err.message, 4000); } finally { busy(b, false); }
      });
    },
    content() {
      const human = k => k.replace(/([A-Z])/g, " $1").replace(/^./, c => c.toUpperCase()).replace(/\bA$/, "(first part)").replace(/\bEm$/, "(highlighted words)");
      const keys = Object.keys(UI.en).filter(k => typeof UI.en[k] === "string");
      const q = (content.q || "").toLowerCase();
      const shown = keys.filter(k => !q || k.toLowerCase().includes(q) || UI.en[k].toLowerCase().includes(q) || String(S.text.en[k] || "").toLowerCase().includes(q));
      $("#view").innerHTML = `<div class="panel"><header><div><h2>Every text on the website</h2><p class="muted">${keys.length} texts. Type in a box to replace the original; leave it empty to keep it. The AI button suggests better wording.</p></div></header>
        <input class="t" id="cq" placeholder="Search text, e.g. headline, pricing, contact" value="${esc(content.q || "")}">
        ${shown.map(k => `<div class="sec"><div class="row"><b style="font-size:13.5px">${esc(human(k))}</b><button class="btn small ai" data-rw="${k}">AI rewrite</button></div>
          <textarea class="t" data-k="${k}" rows="${UI.en[k].length > 90 ? 3 : 1}" placeholder="${esc(UI.en[k])}">${esc(S.text.en?.[k] || "")}</textarea><div class="opts" id="rw-${k}"></div></div>`).join("")}</div>`;
      $("#cq").addEventListener("input", e => { content.q = e.target.value; const pos = e.target.selectionStart; VIEWS.content(); const n = $("#cq"); n.focus(); n.setSelectionRange(pos, pos); });
      $$("textarea[data-k]").forEach(t => t.addEventListener("input", () => { S.text.en ||= {}; const v = t.value.trim(); if (v) S.text.en[t.dataset.k] = v; else delete S.text.en[t.dataset.k]; setDirty(); }));
      $$("[data-rw]").forEach(b => b.addEventListener("click", async () => {
        const k = b.dataset.rw, ta = $(`textarea[data-k="${k}"]`); busy(b, true);
        try {
          const r = await ai("rewrite", { text: ta.value || UI.en[k], lang: "en" });
          $("#rw-" + k).innerHTML = r.options.slice(0, 3).map(o => `<button type="button">${esc(o)}</button>`).join("");
          $$("#rw-" + k + " button").forEach(o => o.addEventListener("click", () => { ta.value = o.textContent; ta.dispatchEvent(new Event("input")); $("#rw-" + k).innerHTML = ""; }));
        } catch (err) { toast(err.message, 4000); } finally { busy(b, false); }
      }));
    },
    theme() {
      const cur = S.brand.accent || "#1f3fd8", mode = S.brand.mode || "auto";
      const sw = [["#1f3fd8", "Averroes blue"], ["#0f766e", "Teal"], ["#7c3aed", "Violet"], ["#c2410c", "Burnt orange"], ["#be123c", "Ruby"], ["#0e1430", "Ink"]];
      $("#view").innerHTML = `<div class="panel"><header><div><h2>Brand colour</h2><p class="muted">Used for buttons, links and highlights across the site and guide pages.</p></div></header>
        <div class="swatches">${sw.map(([c, n]) => `<button type="button" title="${n}" aria-label="${n}" data-c="${c}" style="background:${c}" aria-pressed="${c === cur}"></button>`).join("")}</div>
        <label class="f" style="max-width:240px">Custom colour<input class="t" type="color" id="cPick" value="${esc(cur)}" style="height:44px;padding:4px"></label></div>
        <div class="panel"><header><div><h2>Default appearance</h2><p class="muted">What first-time visitors see. They can still switch with the moon button.</p></div></header>
        <div class="seg" role="group">${[["auto", "Premium blue (default)"], ["light", "Professional white"], ["dark", "Premium blue"]].map(([v, n]) => `<button type="button" data-m="${v}" aria-pressed="${v === mode}">${n}</button>`).join("")}</div></div>`;
      const setC = c => { S.brand.accent = c; setDirty(); VIEWS.theme(); };
      $$("[data-c]").forEach(b => b.addEventListener("click", () => setC(b.dataset.c)));
      $("#cPick").addEventListener("change", e => setC(e.target.value));
      $$("[data-m]").forEach(b => b.addEventListener("click", () => { S.brand.mode = b.dataset.m; setDirty(); VIEWS.theme(); }));
    },
    async publish() {
      $("#view").innerHTML = `<div class="panel"><header><div><h2>${dirty ? "You have unpublished changes" : "Everything is live"}</h2><p class="muted">Publishing saves a new version. Old versions stay here, so you can always go back.</p></div><button class="btn primary" id="pubNow" ${dirty ? "" : "disabled"}>${icon("pub")}Publish now</button></header></div>
        <div class="panel"><header><h2>Version history</h2></header><div id="vers" class="muted">Loading…</div></div>`;
      $("#pubNow").addEventListener("click", publish);
      try {
        const { versions } = await api("versions");
        $("#vers").innerHTML = versions.length ? `<div class="tablewrap"><table><thead><tr><th>Published</th><th></th></tr></thead><tbody>${versions.slice(0, 40).map((v, i) => `<tr><td>${new Date(v.at).toLocaleString()} ${i === 0 ? '<span class="chip good">Live</span>' : ""}</td><td style="text-align:right">${i ? `<button class="btn small" data-restore="${esc(v.id)}">Restore</button>` : ""}</td></tr>`).join("")}</tbody></table></div>` : "No versions yet. Your first publish will appear here.";
      } catch (e) { $("#vers").textContent = e.message; }
    },
    setup() {
      const ok = b => b ? '<span class="chip good">On</span>' : '<span class="chip bad">Off</span>';
      $("#view").innerHTML = `<div class="panel"><header><h2>Services</h2></header>
        <ul class="setup" style="list-style:none;margin:0;padding:0">
          <li><div style="display:flex;justify-content:space-between;gap:10px"><b>Saving (Vercel Blob)</b>${DEMO ? '<span class="chip plain">Preview</span>' : ok(STATUS.storage)}</div><p class="muted">In Vercel: Storage → Create → Blob → connect to this project. It adds <code>BLOB_READ_WRITE_TOKEN</code> for you.</p></li>
          <li><div style="display:flex;justify-content:space-between;gap:10px"><b>AI assistant (Google Gemini)</b>${DEMO ? '<span class="chip plain">Preview</span>' : ok(STATUS.ai)}</div><p class="muted">Add <code>GEMINI_API_KEY</code> in Vercel → Settings → Environment Variables (a free key from aistudio.google.com), then redeploy.</p></li>
          <li><b>Admin sign-in</b><p class="muted"><code>OWNER_EMAIL</code> and <code>OWNER_PASSWORD_HASH</code> (make it with <code>npm run hash "your password"</code>).</p></li>
        </ul></div>
        <div class="panel"><header><div><h2>Google Search Console</h2><p class="muted">Add the site in search.google.com/search-console, choose “HTML tag”, and paste only the code from content="…".</p></div></header>
          <label class="f">Verification code<input class="t" id="gv" value="${esc(S.verify?.google || "")}" placeholder="e.g. 3e809eaaea7c6722…"></label>
          <p class="muted">Then submit <b>/sitemap.xml</b> in Search Console. It lists every service and guide page automatically.</p></div>
        <div class="panel"><header><div><h2>Tell search engines about changes</h2><p class="muted">Pings Bing, Yandex, Naver and others through IndexNow. Google reads your sitemap on its own.</p></div><button class="btn" id="ping">Send update ping</button></header></div>`;
      $("#gv").addEventListener("input", e => { S.verify = { ...(S.verify || {}), google: e.target.value.trim().replace(/^.*content="([^"]+)".*$/, "$1") }; setDirty(); });
      $("#ping").addEventListener("click", async e => { busy(e.currentTarget, true); try { const r = await api("indexnow", { method: "POST", body: {} }); toast(`Sent ${r.count} pages (status ${r.status}).`); } catch (err) { toast(err.message, 4000); } finally { busy(e.currentTarget, false); } });
    },
    // ---------- Services & prices ----------
    services() {
      const D = (S.data ||= {}), sv = (D.services ||= {}), pk = (D.packages ||= {});
      const tab = VIEWS.services.tab || Object.keys(PACKAGES)[0];
      const list = k => (pk[k] && pk[k].length ? pk[k] : PACKAGES[k]);
      $("#view").innerHTML = `<div class="panel"><header><div><h2>Services</h2><p class="muted">Edit the name, text, bullet points and starting price of every service. Empty boxes keep the original.</p></div></header>
        <div style="display:grid;gap:14px">${SERVICES.map(s => { const o = sv[s.go] || {}; return `<details class="ed"><summary><span><b>${esc(o.t || s.t)}</b><span class="muted"> · ${o.hide ? "hidden" : "shown"}${o.price ? " · " + esc(o.price) : ""}</span></span><span class="muted">Edit</span></summary>
          <div class="edbody" data-svc="${esc(s.go)}">
            <div class="grid2"><label class="f">Name<input class="t" data-f="t" value="${esc(o.t || "")}" placeholder="${esc(s.t)}"></label><label class="f">Starting price (e.g. USD 149)<input class="t" data-f="price" value="${esc(o.price || "")}" placeholder="from the pricing table"></label></div>
            <label class="f"><span class="row"><span>Short description</span><button type="button" class="btn small ai" data-airw="p">AI rewrite</button></span><textarea class="t" data-f="p" rows="2" placeholder="${esc(s.p)}">${esc(o.p || "")}</textarea></label>
            <label class="f">Bullet points (one per line)<textarea class="t" data-f="l" rows="3" placeholder="${esc(s.l.join("\n"))}">${esc((o.l || []).join("\n"))}</textarea></label>
            <div class="opts" data-opts></div>
            <label class="check"><input type="checkbox" data-f="hide" ${o.hide ? "checked" : ""}>Hide this service on the website</label>
          </div></details>`; }).join("")}</div></div>
        <div class="panel"><header><div><h2>Pricing packages</h2><p class="muted">These show in the Pricing section and on each service page.</p></div><button class="btn small ghost" id="pkReset">Reset this tab</button></header>
          <div class="seg" role="tablist" style="flex-wrap:wrap">${Object.keys(PACKAGES).map(k => `<button type="button" data-pt="${k}" aria-pressed="${k === tab}">${esc(PACKAGE_TABS[k])}</button>`).join("")}</div>
          <div class="grid3" id="pkList">${list(tab).map((p, i) => `<div class="pkcard" data-pi="${i}">
            <label class="f">Package name<input class="t" data-pf="t" value="${esc(p.t)}"></label>
            <label class="f">Price (e.g. From USD 349)<input class="t" data-pf="price" value="${esc(p.price || "")}"></label>
            <label class="f">Small label<input class="t" data-pf="d" value="${esc(p.d || "")}"></label>
            <label class="f">Who it's for<textarea class="t" data-pf="f" rows="2">${esc(p.f || "")}</textarea></label>
            <label class="f">What's included (one per line)<textarea class="t" data-pf="l" rows="4">${esc((p.l || []).join("\n"))}</textarea></label>
            <label class="check"><input type="checkbox" data-pf="pop" ${p.pop ? "checked" : ""}>Mark as most popular</label></div>`).join("")}</div></div>`;
      $$("[data-svc]").forEach(box => {
        const go = box.dataset.svc;
        box.addEventListener("input", e => {
          const f = e.target.dataset.f; if (!f) return;
          const o = (sv[go] ||= {});
          if (f === "hide") o.hide = e.target.checked; else if (f === "l") o.l = e.target.value.split("\n").map(x => x.trim()).filter(Boolean); else o[f] = e.target.value.trim();
          Object.keys(o).forEach(k => { if (o[k] === "" || o[k] === false || (Array.isArray(o[k]) && !o[k].length)) delete o[k]; });
          if (!Object.keys(o).length) delete sv[go];
          setDirty();
        });
        box.querySelector("[data-airw]").addEventListener("click", async ev => {
          const b = ev.currentTarget, ta = box.querySelector('[data-f="p"]'), out = box.querySelector("[data-opts]"); busy(b, true);
          try {
            const r = await ai("rewrite", { text: ta.value || ta.placeholder, lang: "en", goal: "a service description that makes a business owner want to get in touch" });
            out.innerHTML = r.options.slice(0, 3).map(o => `<button type="button">${esc(o)}</button>`).join("");
            out.querySelectorAll("button").forEach(o => o.addEventListener("click", () => { ta.value = o.textContent; ta.dispatchEvent(new Event("input", { bubbles: true })); out.innerHTML = ""; }));
          } catch (err) { toast(err.message, 4000); } finally { busy(b, false); }
        });
      });
      $$("[data-pt]").forEach(b => b.addEventListener("click", () => { VIEWS.services.tab = b.dataset.pt; VIEWS.services(); }));
      $("#pkList").addEventListener("input", e => {
        const f = e.target.dataset.pf; if (!f) return;
        if (!pk[tab] || !pk[tab].length) pk[tab] = clone(PACKAGES[tab]);
        const p = pk[tab][+e.target.closest("[data-pi]").dataset.pi];
        if (f === "pop") p.pop = e.target.checked; else if (f === "l") p.l = e.target.value.split("\n").map(x => x.trim()).filter(Boolean); else p[f] = e.target.value;
        setDirty();
      });
      $("#pkReset").addEventListener("click", () => { delete pk[tab]; setDirty(); VIEWS.services(); toast("Back to the original prices for this tab."); });
    },

    // ---------- Projects & shop ----------
    // ---------- Orders ----------
    async orders() {
      const f = VIEWS.orders.f || "order";
      $("#view").innerHTML = `<div class="panel"><header><div><h2>Orders</h2><p class="muted">Every order, custom quote request and "notify me" sign-up. Nobody is charged on the website: contact the buyer, send the invoice, then mark the order.</p></div>
        <div class="seg2">${[["order", "Orders"], ["quote", "Quote requests"], ["review", "Client reviews"], ["waitlist", "Notify me"]].map(([k, l]) => `<button class="btn small ${k === f ? "primary" : ""}" data-of="${k}">${l}</button>`).join("")}</div></header><div id="olist"><p class="muted">Loading…</p></div></div>`;
      $$("[data-of]").forEach(b => b.addEventListener("click", () => { VIEWS.orders.f = b.dataset.of; VIEWS.orders(); }));
      let list = [];
      try { list = DEMO ? [] : (await api("order")).orders; } catch (err) { $("#olist").innerHTML = `<p class="muted">${esc(err.message)}</p>`; return; }
      list = list.filter(o => o.kind === f);
      const wa = n => "https://wa.me/" + String(n || "").replace(/\D/g, "");
      const ST = [["new", "New"], ["contacted", "Contacted"], ["paid", "Paid"], ["done", "Delivered"], ["cancelled", "Cancelled"]];
      $("#olist").innerHTML = list.length ? list.map(o => `<details class="ed" ${o.status === "new" ? "open" : ""}><summary><span><b>${esc(o.id)} · ${esc(o.product)}${o.plan ? " · " + esc(o.plan) : ""}</b><span class="muted"> · ${esc(o.name)} · ${new Date(o.at).toLocaleString()}</span></span>
          <span class="chip ${o.status === "new" ? "warn" : o.status === "cancelled" ? "bad" : "good"}">${esc((ST.find(x => x[0] === o.status) || ST[0])[1])}</span></summary>
        <div class="edbody"><div class="grid2">
          ${[["Price", o.price], ["Payment", o.pay], ["Email", o.email ? `<a href="mailto:${esc(o.email)}?subject=${encodeURIComponent("Your order " + o.id)}">${esc(o.email)}</a>` : ""], ["Phone", o.phone ? `<a href="${wa(o.phone)}" target="_blank" rel="noopener">${esc(o.phone)} (WhatsApp)</a>` : ""],
             ["Rating", o.kind === "review" ? "★".repeat(o.rating || 5) : ""], ["Role", o.role], ["Service", o.service], ["Budget", o.budget], ["Business", o.business], ["Country", o.country], ["Domain", o.domain]].filter(r => r[1]).map(([k, v]) => `<div><span class="muted">${k}</span><div>${/^</.test(v) ? v : esc(v)}</div></div>`).join("")}</div>
          ${o.notes ? `<div><span class="muted">Notes</span><p style="white-space:pre-wrap;margin:4px 0 0">${esc(o.notes)}</p></div>` : ""}
          ${f === "review" ? `<div class="row"><button class="btn small primary" type="button" data-rvok="${esc(o.id)}">${icon("plus")}Show on the website</button><span class="muted">Adds it to Client reviews, where you can edit it before you publish.</span></div>` : ""}
          ${f !== "waitlist" ? `<label class="f" style="max-width:260px">Status<select class="t" data-ost="${esc(o.id)}">${ST.map(([k, l]) => `<option value="${k}" ${o.status === k ? "selected" : ""}>${l}</option>`).join("")}</select></label>` : ""}</div></details>`).join("")
        : `<p class="muted">${DEMO ? "Orders show here on the live site." : f === "order" ? "No orders yet. They appear here as soon as someone checks out." : f === "quote" ? "No quote requests yet. They come from the form at the bottom of the site." : f === "review" ? "No reviews sent yet. Clients can send one with Write a review on the site." : "No sign-ups yet."}</p>`;
      $$("[data-rvok]").forEach(b => b.addEventListener("click", async () => {
        const o = list.find(x => x.id === b.dataset.rvok); if (!o) return;
        const D = (S.data ||= {}); D.reviews ||= [];
        if (D.reviews.some(r => r.from === o.id)) return toast("This review is already in Client reviews.");
        D.reviews.unshift({ id: Date.now().toString(36), from: o.id, name: o.name, role: o.role || "", company: o.business || "", country: o.country || "", project: o.product && o.product !== "Review" ? o.product : "", rating: o.rating || 5, text: o.notes });
        setDirty(); try { if (!DEMO) await api("order", { method: "PATCH", body: { id: o.id, status: "done" } }); } catch {}
        toast("Added to Client reviews. Press Publish to show it."); VIEWS.reviews.open = D.reviews[0].id; show("reviews");
      }));
      $$("[data-ost]").forEach(sel => sel.addEventListener("change", async () => { try { await api("order", { method: "PATCH", body: { id: sel.dataset.ost, status: sel.value } }); toast("Order updated."); VIEWS.orders(); } catch (err) { toast(err.message, 4000); } }));
    },

    // ---------- Client reviews ----------
    reviews() {
      const D = (S.data ||= {}); D.reviews ||= [];
      const open = VIEWS.reviews.open;
      const f = (o, k, l, ph = "") => `<label class="f">${l}<input class="t" data-k="${k}" value="${esc(o[k] || "")}" placeholder="${esc(ph)}"></label>`;
      $("#view").innerHTML = `<div class="panel"><header><div><h2>Client reviews</h2><p class="muted">Shown on the home page under "What our clients say". Add reviews your clients gave you, or approve ones they send from the site (Orders, Client reviews tab). Edit, hide, reorder or delete any of them. The section stays hidden until at least one review is visible.</p></div>
        <button class="btn small primary" id="revNew">${icon("plus")}Add review</button></header>
        ${D.reviews.length ? D.reviews.map((o, i) => `<details class="ed" ${open === o.id ? "open" : ""}><summary><span><b>${esc(o.name || "New review")}</b><span class="muted"> · ${"★".repeat(+o.rating || 5)}${o.company ? " · " + esc(o.company) : ""}${o.hide ? " · hidden" : ""}</span></span><span class="muted">Edit</span></summary>
          <div class="edbody" data-rv="${esc(o.id)}"><div class="grid2">${f(o, "name", "Client name")}${f(o, "role", "Role", "Owner")}${f(o, "company", "Business")}${f(o, "country", "Country", "Malaysia")}${f(o, "project", "Project or product", "Storefront Pro")}
            <label class="f">Rating<select class="t" data-k="rating">${[5, 4, 3, 2, 1].map(n => `<option value="${n}" ${(+o.rating || 5) === n ? "selected" : ""}>${"★".repeat(n)} (${n})</option>`).join("")}</select></label></div>
            <label class="f">Review<textarea class="t" data-k="text" rows="4">${esc(o.text || "")}</textarea></label>
            <div class="f"><span>Client photo (optional, a square photo looks best)</span>${imgField("rv:" + o.id, o.photo, "")}</div>
            <div class="row"><label class="check"><input type="checkbox" data-k="hide" ${o.hide ? "checked" : ""}>Hide from the website</label>
              <button type="button" class="btn small ghost" data-rvmv="-1" ${i ? "" : "disabled"}>Move up</button><button type="button" class="btn small ghost" data-rvmv="1" ${i < D.reviews.length - 1 ? "" : "disabled"}>Move down</button>
              <button type="button" class="btn small ghost" data-rvdel>Delete</button></div></div></details>`).join("")
          : `<p class="muted">No reviews yet. Press Add review and paste what a client told you, with their permission.</p>`}</div>`;
      $$("[data-rv]").forEach(box => { const h = () => { const it = D.reviews.find(x => x.id === box.dataset.rv);
          box.querySelectorAll("[data-k]").forEach(el => { const k = el.dataset.k, v = el.type === "checkbox" ? el.checked : el.value.trim(); if (v) it[k] = k === "rating" ? +v : v; else delete it[k]; }); setDirty(); };
        box.addEventListener("input", h); box.addEventListener("change", h); });
      $$("[data-rvdel]").forEach(b => b.addEventListener("click", () => { if (!confirm("Delete this review?")) return; const id = b.closest("[data-rv]").dataset.rv; D.reviews = D.reviews.filter(x => x.id !== id); setDirty(); VIEWS.reviews(); }));
      $$("[data-rvmv]").forEach(b => b.addEventListener("click", () => { const id = b.closest("[data-rv]").dataset.rv, i = D.reviews.findIndex(x => x.id === id), j = i + +b.dataset.rvmv;
        [D.reviews[i], D.reviews[j]] = [D.reviews[j], D.reviews[i]]; VIEWS.reviews.open = id; setDirty(); VIEWS.reviews(); }));
      $("#revNew").addEventListener("click", () => { const id = Date.now().toString(36); D.reviews.unshift({ id, rating: 5 }); VIEWS.reviews.open = id; setDirty(); VIEWS.reviews(); });
      IMGSET = id => url => { const it = D.reviews.find(x => x.id === id.slice(3)); if (!it) return; if (url) it.photo = url; else delete it.photo; VIEWS.reviews.open = it.id; setDirty(); VIEWS.reviews(); };
    },

    // ---------- Photos ----------
    photos() {
      const D = (S.data ||= {}), im = (D.images ||= {});
      const groups = photoGroups();
      $("#view").innerHTML = `<div class="panel"><header><div><h2>Every photo on the website</h2><p class="muted">Upload a new photo to replace one everywhere it appears. Photos are resized for the web automatically. Reset brings back the original.</p></div><button class="btn small" data-libonly>${icon("img")}Media library</button></header></div>
        ${groups.map(([g, list]) => `<div class="panel"><header><h2>${esc(g)}</h2></header><div class="phgrid">${list.map(([k, label]) => `<div class="ph"><b>${esc(label)}</b>${imgField("img:" + k, im[k], k)}</div>`).join("")}</div></div>`).join("")}`;
      IMGSET = id => url => { const k = id.slice(4); if (url) im[k] = url; else delete im[k]; setDirty(); VIEWS.photos(); };
    },

    // ---------- Projects & shop ----------
    projects() {
      const D = (S.data ||= {}), shop = (D.shop ||= {}), WE = (D.work ||= {});
      D.shopAdd ||= []; D.workAdd ||= [];
      const hide = Array.isArray(S.hide) ? S.hide : AGENCY_HIDE;
      const base = baseWork();
      const keys = [...D.workAdd.filter(x => x.title).map(x => ["c-" + x.id, x.title]), ...base.map(w => [w.key, (WE[w.key] && WE[w.key].title) || w.title])];
      const feat = D.featured && D.featured.length ? D.featured : AGENCY_FEATURED;
      const lines = a => (a || []).join("\n"), featTxt = f => (f || []).map(x => x[1] ? x[0] + ": " + x[1] : x[0]).join("\n");
      const shopForm = (o, def, own) => `
        <div class="grid2"><label class="f">Product name<input class="t" data-k="${own ? "n" : "name"}" value="${esc(own ? o.n || "" : o.name || "")}" placeholder="${esc(def.n || "e.g. Restaurant website")}"></label>
          <label class="f">Label on the photo<input class="t" data-k="tag" value="${esc(o.tag || "")}" placeholder="${esc(def.tag || "e.g. Website")}"></label>
          <label class="f">Status<select class="t" data-k="status"><option value="">Available to buy</option><option value="soon" ${(o.status || def.status) === "soon" ? "selected" : ""}>Coming soon (no checkout)</option></select></label>
          <label class="f">Live demo link<input class="t" data-k="demo" value="${esc(o.demo || "")}" placeholder="${esc(def.demo || "https://…")}"></label></div>
        <label class="f"><span class="row"><span>Sales text</span><button type="button" class="btn small ai" data-aisales>AI write</button></span><textarea class="t" data-k="lead" rows="2" placeholder="${esc(def.lead || "What the buyer gets, in one or two sentences")}">${esc(o.lead || "")}</textarea></label>
        <div class="opts" data-opts></div>
        <label class="f">Features (one per line, "Name: detail"; the first 3 show on the card)<textarea class="t" data-k="feats" rows="3" placeholder="${esc(featTxt(def.feats) || "Online payments: Cards, PayPal and bKash")}">${esc(featTxt(o.feats))}</textarea></label>
        <div class="f"><span>Plans & prices (shown when a buyer clicks Buy now)</span><div class="grid3">${[0, 1, 2].map(i => { const P = ((o.plans && o.plans.length ? o.plans : def.plans) || [])[i] || {};
          return `<div class="pkcard" data-pl="${i}"><label class="f">Plan name<input class="t" data-pk="t" value="${esc(P.t || "")}" placeholder="${["Starter", "Business", "Premium"][i]}"></label>
            <label class="f">Price<input class="t" data-pk="price" value="${esc(P.price || "")}" placeholder="USD 299"></label>
            <label class="f">Delivery<input class="t" data-pk="d" value="${esc(P.d || "")}" placeholder="Live in 5 days"></label>
            <label class="f">What's included (one per line)<textarea class="t" data-pk="l" rows="4">${esc((P.l || []).join("\n"))}</textarea></label>
            <label class="check"><input type="radio" name="pop-${esc(own ? o.id : def.n)}" data-pk="pop" ${P.pop ? "checked" : ""}>Most popular</label></div>`; }).join("")}</div></div>
        <div class="f"><span>Photo</span>${imgField((own ? "sa:" : "so:") + (own ? o.id : def.n), o.img, def.img)}</div>
        <div class="row"><label class="check"><input type="checkbox" data-k="hide" ${o.hide ? "checked" : ""}>Hide from the shop</label>${own ? `<button type="button" class="btn small ghost" data-del>${icon("trash")}Delete</button>` : ""}</div>`;
      const workForm = (o, def, own) => `
        <div class="grid2"><label class="f">Project name<input class="t" data-k="title" value="${esc(o.title || "")}" placeholder="${esc(def.title || "e.g. City Dental Clinic")}"></label>
          <label class="f">Small line above the name<input class="t" data-k="kick" value="${esc(o.kick || "")}" placeholder="${esc(def.kick || "e.g. Clinic website · 2026")}"></label>
          ${own ? `<label class="f">Type<select class="t" data-k="type"><option value="software" ${o.type !== "brand" ? "selected" : ""}>App / website / software</option><option value="brand" ${o.type === "brand" ? "selected" : ""}>Brand / design</option></select></label>` : ""}
          <label class="f">Live link<input class="t" data-k="live" value="${esc(o.live || "")}" placeholder="${esc((def.live && def.live[1]) || "https://…")}"></label>
          <label class="f">Case study link<input class="t" data-k="page" value="${esc(o.page || "")}" placeholder="${esc(def.page || "https://…")}"></label></div>
        <label class="f"><span class="row"><span>Description</span><button type="button" class="btn small ai" data-aiwork>AI write</button></span><textarea class="t" data-k="text" rows="3" placeholder="${esc(def.text || "What you built and the result for the client")}">${esc(o.text || "")}</textarea></label>
        <div class="opts" data-opts></div>
        <div class="grid2"><label class="f">Highlights (one per line)<textarea class="t" data-k="list" rows="3" placeholder="${esc(lines(def.list))}">${esc(lines(o.list))}</textarea></label>
          <label class="f">Tags (comma separated)<input class="t" data-k="tags" value="${esc((o.tags || []).join(", "))}" placeholder="${esc((def.tags || []).join(", "))}"></label></div>
        <div class="f"><span>Photo</span>${imgField((own ? "wa:" : "wo:") + (own ? o.id : def.key), o.img, def.img)}</div>
        ${own ? `<div class="row"><label class="check"><input type="checkbox" data-k="hide" ${o.hide ? "checked" : ""}>Hide from the website</label><button type="button" class="btn small ghost" data-del>${icon("trash")}Delete</button></div>` : ""}`;
      const open = VIEWS.projects.open || "";
      $("#view").innerHTML = `<div class="panel"><header><div><h2>Shop: products for sale</h2><p class="muted">Add a product, or change any product's name, price, text, features and photo. Empty boxes keep the original.</p></div><button class="btn small primary" id="shopNew">${icon("plus")}Add product</button></header>
        <div style="display:grid;gap:12px">
          ${D.shopAdd.map(o => `<details class="ed" ${open === "sa" + o.id ? "open" : ""}><summary><span><b>${esc(o.n || "New product")}</b><span class="muted"> · your product · ${o.status === "soon" ? "coming soon" : "for sale"}${o.hide ? " · hidden" : ""}</span></span><span class="muted">Edit</span></summary><div class="edbody" data-sa="${esc(o.id)}">${shopForm(o, {}, true)}</div></details>`).join("")}
          ${AGENCY_SHOP.map(it => { const o = shop[it.n] || {}, s = SHOWCASE[it.from || it.n] || {}, L = s.en || {}; const def = { ...it, lead: it.lead || L.lead || "", feats: (L.feats || []).slice(0, 6), demo: it.demo || s.demo || "" };
            return `<details class="ed"><summary><span><b>${esc(o.name || it.n)}</b><span class="muted"> · ${(o.status || it.status) === "soon" ? "coming soon" : "for sale"}${o.hide ? " · hidden" : ""}</span></span><span class="muted">Edit</span></summary><div class="edbody" data-so="${esc(it.n)}">${shopForm(o, def, false)}</div></details>`; }).join("")}
        </div></div>
        <div class="panel"><header><div><h2>Projects</h2><p class="muted">Add a new project, or edit any project's name, text, links and photo. New projects show first under Work.</p></div><button class="btn small primary" id="workNew">${icon("plus")}Add project</button></header>
        <div style="display:grid;gap:12px">
          ${D.workAdd.map(o => `<details class="ed" ${open === "wa" + o.id ? "open" : ""}><summary><span><b>${esc(o.title || "New project")}</b><span class="muted"> · added by you${o.hide ? " · hidden" : ""}</span></span><span class="muted">Edit</span></summary><div class="edbody" data-wa="${esc(o.id)}">${workForm(o, {}, true)}</div></details>`).join("")}
          ${base.map(w => { const o = WE[w.key] || {}, n = w.name; return `<details class="ed"><summary><span><b>${esc(o.title || w.title)}</b><span class="muted"> · ${esc(w.kick)}${hide.includes(n) ? " · hidden" : ""}</span></span><span class="muted">Edit</span></summary><div class="edbody" data-wo="${esc(w.key)}">${workForm(o, w, false)}
            <label class="check"><input type="checkbox" data-hide="${esc(n)}" ${hide.includes(n) ? "" : "checked"}>Show on the website</label></div></details>`; }).join("")}
        </div></div>
        <div class="panel"><header><div><h2>Featured case studies</h2><p class="muted">The three big projects shown first under Work.</p></div></header>
          <div class="grid3">${[0, 1, 2].map(i => `<label class="f">Spot ${i + 1}<select class="t" data-feat="${i}">${keys.map(([k, n]) => `<option value="${esc(k)}" ${feat[i] === k ? "selected" : ""}>${esc(n)}</option>`).join("")}</select></label>`).join("")}</div></div>`;

      const readPlans = box => [...box.querySelectorAll("[data-pl]")].map(c => { const g = k => c.querySelector(`[data-pk="${k}"]`);
        const P = { t: g("t").value.trim(), price: g("price").value.trim(), d: g("d").value.trim(), l: g("l").value.split("\n").map(x => x.trim()).filter(Boolean) };
        if (g("pop").checked) P.pop = true; return P; }).filter(P => P.t);
      const read = box => { const o = {}; box.querySelectorAll("[data-k]").forEach(el => {
        const k = el.dataset.k, v = el.type === "checkbox" ? el.checked : el.value.trim();
        if (!v) return;
        if (k === "list") o.list = v.split("\n").map(x => x.trim()).filter(Boolean);
        else if (k === "tags") o.tags = v.split(",").map(x => x.trim()).filter(Boolean);
        else if (k === "feats") o.feats = v.split("\n").map(x => x.trim()).filter(Boolean).map(x => { const i = x.indexOf(":"); return i > 0 ? [x.slice(0, i).trim(), x.slice(i + 1).trim()] : [x, ""]; });
        else o[k] = v;
      }); return o; };
      const bind = (sel, save) => $$(sel).forEach(box => { const h = () => save(box); box.addEventListener("input", h); box.addEventListener("change", h); });
      bind("[data-so]", box => { const n = box.dataset.so, o = { ...read(box) }, it = AGENCY_SHOP.find(x => x.n === n) || {}, pl = readPlans(box);
        if (JSON.stringify(pl) !== JSON.stringify((it.plans || []).map(P => ({ t: P.t, price: P.price || "", d: P.d || "", l: P.l || [], ...(P.pop ? { pop: true } : {}) })))) o.plans = pl; if (shop[n]?.img) o.img = shop[n].img; if (Object.keys(o).length) shop[n] = o; else delete shop[n]; setDirty(); });
      bind("[data-wo]", box => { const k = box.dataset.wo, o = read(box); if (WE[k]?.img) o.img = WE[k].img; if (Object.keys(o).length) WE[k] = o; else delete WE[k]; setDirty(); });
      bind("[data-sa]", box => { const it = D.shopAdd.find(x => x.id === box.dataset.sa); Object.keys(it).forEach(k => k !== "id" && k !== "img" && delete it[k]); Object.assign(it, read(box)); const pl = readPlans(box); if (pl.length) it.plans = pl; setDirty(); });
      bind("[data-wa]", box => { const it = D.workAdd.find(x => x.id === box.dataset.wa); Object.keys(it).forEach(k => k !== "id" && k !== "img" && delete it[k]); Object.assign(it, read(box)); setDirty(); });
      $$("[data-del]").forEach(b => b.addEventListener("click", () => {
        const sa = b.closest("[data-sa]"), wa = b.closest("[data-wa]");
        if (!confirm("Delete this " + (sa ? "product" : "project") + "? You can undo it by not publishing.")) return;
        if (sa) D.shopAdd = D.shopAdd.filter(x => x.id !== sa.dataset.sa); else D.workAdd = D.workAdd.filter(x => x.id !== wa.dataset.wa);
        setDirty(); VIEWS.projects();
      }));
      $$("[data-hide]").forEach(c => c.addEventListener("change", e => { e.stopPropagation(); const h = new Set(Array.isArray(S.hide) ? S.hide : AGENCY_HIDE); c.checked ? h.delete(c.dataset.hide) : h.add(c.dataset.hide); S.hide = [...h]; setDirty(); }));
      $("#shopNew").addEventListener("click", () => { const id = Date.now().toString(36); D.shopAdd.unshift({ id }); VIEWS.projects.open = "sa" + id; setDirty(); VIEWS.projects(); });
      $("#workNew").addEventListener("click", () => { const id = Date.now().toString(36); D.workAdd.unshift({ id, type: "software" }); VIEWS.projects.open = "wa" + id; setDirty(); VIEWS.projects(); });
      $$("[data-feat]").forEach(s => s.addEventListener("change", () => { D.featured = $$("[data-feat]").map(x => x.value); setDirty(); }));
      const aiBtn = (sel, goal) => $$(sel).forEach(b => b.addEventListener("click", async () => {
        const box = b.closest(".edbody"), ta = box.querySelector('[data-k="lead"], [data-k="text"]'), out = box.querySelector("[data-opts]"); busy(b, true);
        try {
          const name = (box.querySelector('[data-k="n"], [data-k="name"], [data-k="title"]') || {}).value || "";
          const r = await ai("rewrite", { text: ta.value || ta.placeholder || name, lang: "en", goal: goal + (name ? " (" + name + ")" : "") });
          out.innerHTML = r.options.slice(0, 3).map(o => `<button type="button">${esc(o)}</button>`).join("");
          out.querySelectorAll("button").forEach(o => o.addEventListener("click", () => { ta.value = o.textContent; ta.dispatchEvent(new Event("input", { bubbles: true })); out.innerHTML = ""; }));
        } catch (err) { toast(err.message, 4000); } finally { busy(b, false); }
      }));
      aiBtn("[data-aisales]", "sales copy for a ready-made product that makes a business owner want to buy it");
      aiBtn("[data-aiwork]", "a short, results-focused case study description for an agency website");
      IMGSET = id => url => {
        const [kind, key] = [id.slice(0, 2), id.slice(3)];
        const set = o => { if (url) o.img = url; else delete o.img; };
        if (kind === "so") { shop[key] ||= {}; set(shop[key]); if (!Object.keys(shop[key]).length) delete shop[key]; }
        if (kind === "wo") { WE[key] ||= {}; set(WE[key]); if (!Object.keys(WE[key]).length) delete WE[key]; }
        if (kind === "sa") { set(D.shopAdd.find(x => x.id === key)); VIEWS.projects.open = "sa" + key; }
        if (kind === "wa") { set(D.workAdd.find(x => x.id === key)); VIEWS.projects.open = "wa" + key; }
        setDirty(); const keepOpen = $$("details.ed").map(d => d.open); VIEWS.projects(); $$("details.ed").forEach((d, i) => { if (keepOpen[i]) d.open = true; });
      };
    },

    // ---------- Brand, header & footer ----------
    brand() {
      const D = (S.data ||= {}), b = (D.site ||= {});
      const TXT = [["navServices", "Menu: Services"], ["navShop", "Menu: Shop"], ["navPricing", "Menu: Pricing"], ["navWork", "Menu: Work"], ["navFounder", "Menu: Founder"], ["navFaq", "Menu: FAQ"], ["navContact", "Header button"], ["annText", "Top announcement bar: text"], ["annLink", "Top announcement bar: link text"],
        ["trackNav", "Footer: Track order link"], ["chatName", "Chat assistant: name"], ["chatSub", "Chat assistant: line under the name"], ["chatGreet", "Chat assistant: first message"], ["chatPh", "Chat assistant: input placeholder"], ["chatNotes", "Chat assistant: extra facts it should know (offers, opening hours, delivery times)"], ["footer", "Footer: short line under the logo"], ["footShop", "Footer: Shop title"], ["footServices", "Footer: Services title"], ["footStudio", "Footer: Studio title"], ["footContact", "Footer: Contact title"], ["footFounder", "Footer: founder link"]].filter(([k]) => typeof UI.en[k] === "string");
      $("#view").innerHTML = `<div class="panel"><header><div><h2>Brand</h2><p class="muted">Your company name and logo in the header, footer, WhatsApp messages and Google.</p></div></header>
        <div class="grid2"><label class="f">Company name<input class="t" data-b="name" value="${esc(b.name || "")}" placeholder="${esc(AGENCY.name)}"></label>
          <label class="f">Small line under the name<input class="t" data-b="tagline" value="${esc(b.tagline || "")}" placeholder="Solutions"></label>
          <label class="f">Big word at the bottom of the footer<input class="t" data-b="word" value="${esc(b.word || "")}" placeholder="${esc(AGENCY.name.split(" ")[0])}"></label>
          <label class="f">Founder's portfolio link<input class="t" data-b="portfolio" value="${esc(b.portfolio || "")}" placeholder="${esc(AGENCY.portfolio)}"></label></div>
        <div class="f"><span>Logo file (optional). Leave empty to keep the built-in Averroes logo; upload one to replace it in the header, footer and founder section.</span>${imgField("site:logo", b.logo, "")}</div></div>
        <div class="panel"><header><div><h2>Header & footer text</h2><p class="muted">Menu names and footer titles. Empty keeps the original.</p></div></header>
          <div class="grid2">${TXT.map(([k, l]) => `<label class="f">${esc(l)}<input class="t" data-tx="${k}" value="${esc(S.text.en?.[k] || "")}" placeholder="${esc(UI.en[k])}"></label>`).join("")}</div></div>
        <div class="panel"><header><div><h2>Social links</h2><p class="muted">Shown in the footer. Leave one empty to use the original; type "none" to hide it.</p></div></header>
          <div class="grid2">${["linkedin", "github", "facebook", "youtube"].map(k => `<label class="f">${k[0].toUpperCase() + k.slice(1)}<input class="t" data-b="${k}" value="${esc(b[k] || "")}" placeholder="${esc(SITE[k] || "https://…")}"></label>`).join("")}</div></div>`;
      $$("[data-b]").forEach(el => el.addEventListener("input", () => { const v = el.value.trim(); if (v) b[el.dataset.b] = v; else delete b[el.dataset.b]; setDirty(); }));
      $$("[data-tx]").forEach(el => el.addEventListener("input", () => { S.text.en ||= {}; const v = el.value.trim(); if (v) S.text.en[el.dataset.tx] = v; else delete S.text.en[el.dataset.tx]; setDirty(); }));
      IMGSET = id => url => {
        if (id === "site:logo") { if (url) b.logo = url; else delete b.logo; }
        else { D.images ||= {}; const k = id.slice(4); if (url) D.images[k] = url; else delete D.images[k]; }
        setDirty(); VIEWS.brand();
      };
    },

    // ---------- FAQ ----------
    faq() {
      const D = (S.data ||= {});
      if (!Array.isArray(D.faq) || !D.faq.length) VIEWS.faq.list = VIEWS.faq.list || clone(FAQ.filter(f => !/jobs and internships/i.test(f[0])));
      const L = D.faq && D.faq.length ? D.faq : VIEWS.faq.list;
      $("#view").innerHTML = `<div class="panel"><header><div><h2>Questions & answers</h2><p class="muted">Shown on the home page and read by Google as rich results.</p></div><div style="display:flex;gap:8px;flex-wrap:wrap"><button class="btn small ai" id="faqAi">AI: write questions buyers ask</button><button class="btn small" id="faqAdd">${icon("plus")}Question</button></div></header>
        <div id="faqOut"></div>
        <div style="display:grid;gap:12px" id="faqEd">${L.map((f, i) => `<div class="pkcard" data-fi="${i}" style="display:grid;gap:8px"><div class="row"><input class="t" data-q value="${esc(f[0])}" placeholder="Question"><button class="btn small ghost" data-fdel aria-label="Remove">${icon("trash")}</button></div><textarea class="t" data-a rows="2" placeholder="Answer">${esc(f[1])}</textarea></div>`).join("")}</div></div>`;
      const save = () => { D.faq = $$("#faqEd [data-fi]").map(r => [r.querySelector("[data-q]").value, r.querySelector("[data-a]").value]); setDirty(); };
      $("#faqEd").addEventListener("input", save);
      $("#faqEd").addEventListener("click", e => { const d = e.target.closest("[data-fdel]"); if (d) { d.closest("[data-fi]").remove(); save(); } });
      $("#faqAdd").addEventListener("click", () => { save(); D.faq.push(["", ""]); VIEWS.faq(); });
      $("#faqAi").addEventListener("click", async e => {
        const b = e.currentTarget; busy(b, true);
        try {
          const r = await ai("faq", { services: SERVICES.map(s => s.t).join(", "), existing: L.map(f => f[0]).join(" | ") });
          $("#faqOut").innerHTML = `<div class="aibox"><b>AI suggestions</b>${r.faq.map((f, i) => `<label class="check" style="align-items:flex-start"><input type="checkbox" data-sug="${i}" checked><span><b>${esc(f[0])}</b><br><span class="muted">${esc(f[1])}</span></span></label>`).join("")}<div><button class="btn primary small" id="faqUse">Add the ticked ones</button></div></div>`;
          $("#faqUse").onclick = () => { save(); $$("[data-sug]").forEach(c => { if (c.checked) D.faq.push(r.faq[+c.dataset.sug].slice(0, 2)); }); setDirty(); VIEWS.faq(); toast("Added. Publish when you're ready."); };
        } catch (err) { toast(err.message, 4000); } finally { busy(b, false); }
      });
    },

    // ---------- Contact & numbers ----------
    contact() {
      const D = (S.data ||= {}), c = (D.contact ||= {});
      const st = D.stats && D.stats.length ? D.stats : [["2017", UI.en.stat1], [String(DEV.length + PROJECTS.length), UI.en.stat2], [String(AGENCY_PRODUCTS.length), UI.en.stat3], ["24h", UI.en.stat4]];
      $("#view").innerHTML = `<div class="panel"><header><div><h2>Contact details</h2><p class="muted">Used by every WhatsApp button, the contact form and the footer.</p></div></header>
        <div class="grid2">
          <label class="f">WhatsApp number (with country code)<input class="t" data-c="whatsapp" value="${esc(c.whatsapp || "")}" placeholder="${esc(SITE.whatsapp)}"></label>
          <label class="f">Phone shown on the site<input class="t" data-c="phone" value="${esc(c.phone || "")}" placeholder="${esc(SITE.phone || "")}"></label>
          <label class="f">Email<input class="t" data-c="email" value="${esc(c.email || "")}" placeholder="${esc(SITE.email)}"></label>
          <label class="f">Studio locations<input class="t" data-c="base" value="${esc(c.base || "")}" placeholder="${esc(AGENCY.base.en)}"></label>
        </div></div>
        <div class="panel"><header><div><h2>Numbers under the hero</h2><p class="muted">Four big numbers. Only use numbers that are true.</p></div></header>
          <div class="grid2" id="stEd">${st.map((s, i) => `<div class="pkcard" data-si="${i}" style="display:grid;grid-template-columns:110px 1fr;gap:10px"><input class="t" data-sv value="${esc(s[0])}"><input class="t" data-sl value="${esc(s[1])}"></div>`).join("")}</div></div>`;
      $$("[data-c]").forEach(i => i.addEventListener("input", () => { const v = i.value.trim(); if (v) c[i.dataset.c] = v; else delete c[i.dataset.c]; setDirty(); }));
      $("#stEd").addEventListener("input", () => { D.stats = $$("#stEd [data-si]").map(r => [r.querySelector("[data-sv]").value.trim(), r.querySelector("[data-sl]").value.trim()]); setDirty(); });
    },

    // ---------- AI autopilot ----------
    autopilot() {
      const A = (S.autopilot ||= { on: false, publish: false, queue: [] });
      $("#view").innerHTML = `<div class="panel"><header><div><h2>One-click AI</h2><p class="muted">AI does the work, you check the result, then press Publish.</p></div></header>
          <div class="grid3">
            <div class="pkcard" style="display:grid;gap:10px"><b>Fix SEO on every page</b><p class="muted">Writes a better title, description and keywords for every page scoring under 80.</p><button class="btn ai small" id="apSeo">Run</button></div>
            <div class="pkcard" style="display:grid;gap:10px"><b>Polish the home page text</b><p class="muted">Rewrites the headline and section intros to sound more premium and convincing.</p><button class="btn ai small" id="apCopy">Run</button></div>
            <div class="pkcard" style="display:grid;gap:10px"><b>Find new keywords</b><p class="muted">Suggests searches to rank for and adds them to the weekly guide queue below.</p><button class="btn ai small" id="apKw">Run</button></div>
          </div><div id="apOut"></div></div>
        <div class="panel"><header><div><h2>Weekly guide autopilot</h2><p class="muted">Every Monday, AI writes one new guide page from the queue below${A.last ? `. Last run: ${esc(new Date(A.last).toLocaleString())}${A.lastSlug ? " (" + esc(A.lastSlug) + ")" : ""}` : ""}.</p></div></header>
          <label class="check"><input type="checkbox" id="apOn" ${A.on ? "checked" : ""}>Turn on the weekly guide autopilot</label>
          <label class="check"><input type="checkbox" id="apPub" ${A.publish ? "checked" : ""}>Publish new guides straight away (otherwise they wait as drafts for you to check)</label>
          <label class="f">Keyword queue (one per line, top one goes first)<textarea class="t" id="apQ" rows="6" placeholder="e.g. restaurant website design Malaysia">${esc((A.queue || []).join("\n"))}</textarea></label>
          <p class="muted">If the queue is empty, AI picks a keyword itself from your services.</p></div>`;
      $("#apOn").onchange = e => { A.on = e.target.checked; setDirty(); };
      $("#apPub").onchange = e => { A.publish = e.target.checked; setDirty(); };
      $("#apQ").oninput = e => { A.queue = e.target.value.split("\n").map(x => x.trim()).filter(Boolean); setDirty(); };
      $("#apSeo").onclick = async e => {
        const b = e.currentTarget; busy(b, true); let n = 0;
        try {
          const weak = pages().filter(p => p.type !== "Guide" && score(p) < 80);
          for (const p of weak) {
            b.innerHTML = `<span class="spin"></span>${++n}/${weak.length}`;
            const r = await ai("meta", { type: p.type, name: p.name, keyword: p.focus, lang: "en", content: p.content });
            const o = (S.seo[p.id] ||= {}); o.title = r.title; o.desc = r.desc; o.kw = r.kw; if (!o.focus) o.focus = kwFirst(r.kw);
          }
          setDirty(); $("#apOut").innerHTML = `<div class="aibox">Updated ${weak.length} page${weak.length === 1 ? "" : "s"}. Check them in Pages & SEO, then publish.</div>`;
        } catch (err) { toast(err.message, 4000); } finally { b.dataset.html && (b.innerHTML = b.dataset.html); b.disabled = false; }
      };
      $("#apCopy").onclick = async e => {
        const b = e.currentTarget; busy(b, true);
        try {
          const keys = ["heroPill", "heroA", "heroEm", "heroLead", "servicesLead", "workLead", "shopLead", "founderBody", "contactLead"];
          const cur = Object.fromEntries(keys.map(k => [k, S.text.en[k] || UI.en[k] || ""]));
          const r = await ai("copy", { text: JSON.stringify(cur) });
          $("#apOut").innerHTML = `<div class="aibox"><b>AI suggestions</b>${(r.items || []).filter(x => keys.includes(x.key)).map((x, i) => `<label class="check" style="align-items:flex-start"><input type="checkbox" data-cp="${esc(x.key)}" data-v="${esc(x.text)}" checked><span><span class="muted">${esc(x.key)}</span><br>${esc(x.text)}</span></label>`).join("")}<div><button class="btn primary small" id="cpUse">Use the ticked ones</button></div></div>`;
          $("#cpUse").onclick = () => { $$("[data-cp]").forEach(c => { if (c.checked) S.text.en[c.dataset.cp] = c.dataset.v; }); setDirty(); $("#apOut").innerHTML = ""; toast("Applied. Publish when you're ready."); };
        } catch (err) { toast(err.message, 4000); } finally { busy(b, false); }
      };
      $("#apKw").onclick = async e => {
        const b = e.currentTarget; busy(b, true);
        try {
          const r = await ai("keywords", { topic: SERVICES.slice(0, 6).map(s => s.t).join(", "), market: "Malaysia, Bangladesh and the USA" });
          const ks = r.groups.flatMap(g => g.items).filter(k => !/high/i.test(k.diff)).map(k => k.k).slice(0, 12);
          A.queue = [...new Set([...(A.queue || []), ...ks])]; setDirty(); VIEWS.autopilot(); toast(`Added ${ks.length} keywords to the queue.`);
        } catch (err) { toast(err.message, 4000); } finally { busy(b, false); }
      };
    },
  };
  const content = {};

  // ---------- page editor ----------
  function field(id, label, val, opts = {}) {
    const ctl = opts.area
      ? `<textarea class="t" id="${id}" rows="${opts.rows || 3}" placeholder="${esc(opts.ph || "")}">${esc(val)}</textarea>`
      : `<input class="t" id="${id}" value="${esc(val)}" placeholder="${esc(opts.ph || "")}">`;
    return `<label class="f"><span class="row"><span>${label}</span>${opts.max ? `<span class="count" data-count="${id}"></span>` : ""}</span>${ctl}</label>`;
  }
  function openPage(id) {
    const p = pages().find(x => x.id === id); if (!p) return;
    const guide = p.type === "Guide", t = guide ? S.topics[p.topic] : null;
    $("#dTitle").textContent = p.name;
    const base = (location.protocol.startsWith("http") ? location.host : "averroes-solutions.vercel.app");
    $("#dBody").innerHTML = `
      ${guide ? `<div class="sec"><div class="row"><b>Status</b><div class="seg" role="group"><button type="button" data-st="draft" aria-pressed="${!!t.draft}">Draft</button><button type="button" data-st="live" aria-pressed="${!t.draft}">Live</button></div></div>
        <div class="grid2">${field("eSlug", "Web address", t.slug, { ph: "my-guide" })}<label class="f">Language<select class="t" id="eLang"><option value="en">English</option><option value="bn" ${t.lang === "bn" ? "selected" : ""}>বাংলা</option></select></label></div></div>` : ""}
      <div class="sec"><b>Google preview</b><div class="serp"><span class="u">${esc(base)}${esc(p.path)}</span><span class="t" id="pvT"></span><span class="d" id="pvD"></span></div></div>
      ${field("eFocus", "Focus keyword (the one search this page should win)", p.focus, { ph: "e.g. ecommerce website Bangladesh" })}
      ${field("eTitle", "SEO title", p.title, { max: 60 })}
      ${field("eDesc", "Meta description", p.desc, { max: 160, area: true, rows: 3 })}
      ${field("eKw", "Related keywords (comma separated)", p.kw, { area: true, rows: 2 })}
      ${p.type !== "Home" ? field("eH1", "Main heading (H1)", p.h1) : `<p class="muted">The home page heading is edited in Website text.</p>`}
      ${p.type !== "Home" ? field("eIntro", "First paragraph", guide ? t.intro : p.intro, { area: true, rows: 4 }) : ""}
      ${guide ? `<div class="sec"><div class="row"><b>Sections</b><button class="btn small" id="addSec" type="button">${icon("plus")}Section</button></div><div id="secs" style="display:grid;gap:12px"></div></div>
        <div class="sec"><div class="row"><b>Questions & answers</b><button class="btn small" id="addFaq" type="button">${icon("plus")}Question</button></div><div id="faqs" style="display:grid;gap:12px"></div></div>
        ${field("eCta", "Closing call to action", t.cta, { ph: "Want a store like this? Get a fixed quote." })}` : ""}
      <div class="sec"><div class="row"><b>SEO checklist</b><span class="score" id="eScore"></span></div><ul class="checks" id="eChecks"></ul></div>
      <div id="aiOut"></div>`;
    $("#dFoot").innerHTML = `${guide ? `<button class="btn ghost" id="eDel" style="margin-right:auto;color:var(--bad)">${icon("trash")}Delete</button>` : ""}
      <button class="btn ai small" id="aiMeta">Write title & description</button><button class="btn ai small" id="aiImp">How to rank higher</button>
      ${guide && !t.draft ? `<a class="btn small" href="${esc(p.path)}" target="_blank" rel="noopener">${icon("ext")}Open</a>` : ""}`;

    const secRow = (s, i) => `<div style="display:grid;gap:8px;border-top:1px solid var(--line);padding-top:10px"><div class="row"><input class="t" data-sh="${i}" value="${esc(s.h)}" placeholder="Section heading"><button class="btn small ghost" data-sdel="${i}" aria-label="Remove section">${icon("trash")}</button></div><textarea class="t" data-sp="${i}" rows="4" placeholder="Paragraph">${esc(s.p)}</textarea></div>`;
    const faqRow = (f, i) => `<div style="display:grid;gap:8px;border-top:1px solid var(--line);padding-top:10px"><div class="row"><input class="t" data-fq="${i}" value="${esc(f[0])}" placeholder="Question"><button class="btn small ghost" data-fdel="${i}" aria-label="Remove question">${icon("trash")}</button></div><textarea class="t" data-fa="${i}" rows="2" placeholder="Answer">${esc(f[1])}</textarea></div>`;
    const drawLists = () => { if (!guide) return; $("#secs").innerHTML = (t.sections || []).map(secRow).join(""); $("#faqs").innerHTML = (t.faq || []).map(faqRow).join(""); };
    drawLists();

    function read() {
      const v = id => $("#" + id)?.value ?? "";
      if (guide) {
        Object.assign(t, { focus: v("eFocus").trim(), title: v("eTitle"), desc: v("eDesc"), kw: v("eKw"), h1: v("eH1"), intro: v("eIntro"), cta: v("eCta"), lang: v("eLang") || "en", updated: new Date().toISOString() });
        const s = v("eSlug"); if (s) t.slug = uniqueSlug(s, p.topic);
        $$("[data-sh]").forEach(el => t.sections[+el.dataset.sh].h = el.value); $$("[data-sp]").forEach(el => t.sections[+el.dataset.sp].p = el.value);
        $$("[data-fq]").forEach(el => t.faq[+el.dataset.fq][0] = el.value); $$("[data-fa]").forEach(el => t.faq[+el.dataset.fa][1] = el.value);
      } else {
        const o = S.seo[p.id] = { ...(S.seo[p.id] || {}) };
        const put = (k, val, def) => { val = String(val).trim(); if (val && val !== String(def ?? "").trim()) o[k] = val; else delete o[k]; };
        put("focus", v("eFocus"), ""); put("title", v("eTitle"), p.def ? p.def.title.replace(/Yeasin Arafat/g, AGENCY.name) : ""); put("desc", v("eDesc"), p.def?.meta.replace(/Yeasin Arafat/g, AGENCY.name)); put("kw", v("eKw"), p.def?.kw);
        if (p.type !== "Home") { put("h1", v("eH1"), p.def?.h1); put("intro", v("eIntro"), p.def?.intro); }
        if (p.type === "Home") { o.title = v("eTitle").trim(); o.desc = v("eDesc").trim(); o.kw = v("eKw").trim(); }
      }
      setDirty();
      const np = pages().find(x => x.id === id);
      $("#pvT").textContent = np.title || "Add an SEO title"; $("#pvD").textContent = np.desc || "Add a meta description";
      const c = checks(np), s = score(np);
      $("#eScore").innerHTML = `${s}/100 ${chip(s)}`;
      $("#eChecks").innerHTML = c.map(([ok, , n]) => `<li class="${ok ? "ok" : ""}">${esc(n)}</li>`).join("");
      $$("[data-count]").forEach(el => { const n = $("#" + el.dataset.count).value.length, max = el.dataset.count === "eTitle" ? 60 : 160, min = el.dataset.count === "eTitle" ? 30 : 120; el.textContent = `${n}/${max}`; el.className = "count " + (n > max ? "over" : n >= min ? "ok" : ""); });
      return np;
    }
    $("#dBody").oninput = read;
    $("#dBody").onclick = e => {
      const st = e.target.closest("[data-st]"); if (st) { t.draft = st.dataset.st === "draft"; $$("[data-st]").forEach(b => b.setAttribute("aria-pressed", String(b === st))); setDirty(); }
      if (e.target.closest("#addSec")) { read(); t.sections.push({ h: "", p: "" }); drawLists(); }
      if (e.target.closest("#addFaq")) { read(); (t.faq ||= []).push(["", ""]); drawLists(); }
      const sd = e.target.closest("[data-sdel]"); if (sd) { read(); t.sections.splice(+sd.dataset.sdel, 1); drawLists(); read(); }
      const fd = e.target.closest("[data-fdel]"); if (fd) { read(); t.faq.splice(+fd.dataset.fdel, 1); drawLists(); read(); }
    };
    $("#aiMeta").onclick = async e => {
      const np = read(), b = e.currentTarget; busy(b, true);
      try {
        const r = await ai("meta", { type: p.type, name: p.name, keyword: $("#eFocus").value, lang: guide ? t.lang : "en", content: np.content });
        $("#aiOut").innerHTML = `<div class="aibox"><b>AI suggestion</b><div class="serp"><span class="t">${esc(r.title)}</span><span class="d">${esc(r.desc)}</span></div><p class="muted">${esc(r.kw)}</p>${r.why ? `<p>${esc(r.why)}</p>` : ""}<div><button class="btn primary small" id="useMeta">Use this</button></div></div>`;
        $("#useMeta").onclick = () => { $("#eTitle").value = r.title; $("#eDesc").value = r.desc; $("#eKw").value = r.kw; if (!$("#eFocus").value) $("#eFocus").value = kwFirst(r.kw); read(); $("#aiOut").innerHTML = ""; toast("Applied. Publish when you're ready."); };
      } catch (err) { toast(err.message, 4000); } finally { busy(b, false); }
    };
    $("#aiImp").onclick = async e => {
      const np = read(), b = e.currentTarget; busy(b, true);
      try {
        const r = await ai("improve", { keyword: np.focus, title: np.title, desc: np.desc, content: np.content });
        $("#aiOut").innerHTML = `<div class="aibox"><b>How to rank higher</b><ol>${r.fixes.map(f => `<li>${esc(f)}</li>`).join("")}</ol></div>`;
      } catch (err) { toast(err.message, 4000); } finally { busy(b, false); }
    };
    if (guide) $("#eDel").onclick = () => {
      if ($("#eDel").dataset.sure) { S.topics.splice(p.topic, 1); setDirty(); closeDrawer(); toast("Guide deleted. Publish to remove it from the site."); return; }
      $("#eDel").dataset.sure = 1; $("#eDel").lastChild.textContent = "Press again to delete";
    };
    read(); if (!dirty) setDirty(false);
    $("#drawer").classList.add("on");
    setTimeout(() => $("#eFocus").focus(), 50);
  }
  function closeDrawer() { $("#drawer").classList.remove("on"); VIEWS[room](); }
  function uniqueSlug(s, self = -1) {
    let base = String(s).toLowerCase().normalize("NFKD").replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "").slice(0, 70) || "guide", slug = base, n = 2;
    while (S.topics.some((t, i) => i !== self && t.slug === slug)) slug = `${base}-${n++}`;
    return slug;
  }
  function busy(b, on) { if (!b) return; b.disabled = on; if (on) { b.dataset.html = b.innerHTML; b.innerHTML = `<span class="spin"></span>Working…`; } else if (b.dataset.html) b.innerHTML = b.dataset.html; }

  async function publish() {
    const b = $("#publishTop"); busy(b, true);
    try {
      const { id } = await api("site", { method: "PUT", body: S });
      PUB_ID = id; PUBLISHED = clone(S); setDirty(false); toast("Published. The site updates within a minute.");
      if (room === "publish") VIEWS.publish();
    } catch (e) { toast(e.message, 4000); } finally { busy(b, false); }
  }

  // ---------- events ----------
  document.addEventListener("click", async e => {
    const r = e.target.closest("[data-room]"); if (r) return show(r.dataset.room);
    const g = e.target.closest("[data-go]"); if (g) return show(g.dataset.go);
    const pg = e.target.closest("[data-page]"); if (pg) return openPage(pg.dataset.page);
    if (e.target.closest("[data-close]")) return closeDrawer();
    if (e.target.closest("#publishTop")) return publish();
    if (e.target.closest("#menuBtn")) return $("#rail").classList.toggle("open");
    const mk = e.target.closest("[data-mkguide]"); if (mk) { show("guides"); VIEWS.guides({ k: mk.dataset.mkguide, bn: /[ঀ-৿]/.test(mk.dataset.mkguide) }); $("#gKw").focus(); return; }
    const rs = e.target.closest("[data-restore]");
    if (rs) { try { const { content } = await api("site?v=" + encodeURIComponent(rs.dataset.restore)); S = { ...clone(EMPTY), ...content }; setDirty(); toast("Loaded that version. Press Publish to make it live."); VIEWS.publish(); } catch (err) { toast(err.message, 4000); } }
    if (e.target.closest("#logout")) { try { await api("logout", { method: "POST" }); } catch {} location.reload(); }
  });
  addEventListener("keydown", e => { if (e.key === "Escape" && $("#drawer")?.classList.contains("on")) closeDrawer(); });
  addEventListener("beforeunload", e => { if (dirty && !DEMO) { e.preventDefault(); e.returnValue = ""; } });

  // ---------- start ----------
  function login(msg = "") {
    $("#root").innerHTML = `<div class="login"><form id="lf"><div class="brand" style="color:var(--ink);padding:0"><span>Averroes<small style="color:var(--ink-3)">Admin</small></span></div><h1>Sign in</h1>
      <label class="f">Email<input class="t" id="le" type="email" autocomplete="username" required></label>
      <label class="f">Password<input class="t" id="lp" type="password" autocomplete="current-password" required></label>
      <p class="err" id="lerr">${esc(msg)}</p><button class="btn primary" id="lb" type="submit">Sign in</button></form></div>`;
    $("#lf").addEventListener("submit", async e => {
      e.preventDefault(); const b = $("#lb"); busy(b, true);
      try { await api("login", { method: "POST", body: { email: $("#le").value, password: $("#lp").value } }); start(); }
      catch (err) { $("#lerr").textContent = err.message; busy(b, false); }
    });
  }
  async function start() {
    let me;
    try { const r = await fetch("/api/me", { credentials: "same-origin" }); if (!r.ok) throw 0; me = await r.json(); } catch { DEMO = true; }
    if (!DEMO && !me.email) return login();
    ME = me?.email || null;
    if (!DEMO) {
      try { STATUS = await api("status"); } catch {}
      try { const j = await api("site"); PUB_ID = j.id; S = { ...clone(EMPTY), ...j.content }; S.data ||= {}; } catch (e) { toast(e.message, 4000); }
      const d = ls.get("av-admin-draft");
      if (d && d.base === PUB_ID && d.S) { S = d.S; dirty = true; setTimeout(() => toast("Restored your unpublished changes."), 300); }
    }
    PUBLISHED = clone(S);
    shell();
  }
  start();
})();
