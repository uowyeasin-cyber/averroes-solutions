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
    ext: '<path d="M7 17L17 7M8 7h9v9"/>', plus: '<path d="M12 5v14M5 12h14"/>', trash: '<path d="M4 7h16M9 7V4h6v3M6 7l1 13h10l1-13"/>',
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
  const EMPTY = { v: 1, brand: {}, text: { en: {}, bn: {} }, hide: null, seo: {}, topics: [], verify: {} };
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
  const ROOMS = [["overview", "Overview", "home"], ["seo", "Pages & SEO", "seo"], ["guides", "Guides", "guide"], ["keywords", "Keyword ideas", "kw"], ["content", "Website text", "text"], ["theme", "Look & feel", "theme"], ["publish", "Publish & history", "pub"], ["setup", "Setup", "setup"]];
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
      const keys = [["heroPill", "Small line above the headline"], ["heroA", "Headline (first part)"], ["heroEm", "Headline (highlighted words)"], ["heroLead", "Text under the headline"], ["servicesLead", "Services intro"], ["workLead", "Work intro"], ["founderBody", "Founder text"], ["contactLead", "Contact text"]];
      let L = content.lang || "en";
      const all = [...DEV.map(d => d.n), ...PROJECTS.map(p => p.name)];
      const hide = Array.isArray(S.hide) ? S.hide : AGENCY_HIDE;
      $("#view").innerHTML = `<div class="panel"><header><div><h2>Website text</h2><p class="muted">Leave a box empty to keep the original text.</p></div><div class="seg" role="group" aria-label="Language"><button type="button" data-l="en" aria-pressed="${L === "en"}">English</button><button type="button" data-l="bn" aria-pressed="${L === "bn"}">বাংলা</button></div></header>
        ${keys.map(([k, n]) => `<div class="sec"><div class="row"><b style="font-size:13.5px">${n}</b><button class="btn small ai" data-rw="${k}">Rewrite</button></div>
          <textarea class="t" data-k="${k}" rows="${k.includes("Body") || k.includes("Lead") ? 3 : 2}" placeholder="${esc(UI[L][k])}">${esc(S.text[L]?.[k] || "")}</textarea><div class="opts" id="rw-${k}"></div></div>`).join("")}</div>
        <div class="panel"><header><div><h2>Projects shown on the agency site</h2><p class="muted">Untick a project to hide it. All of them still stay on your portfolio.</p></div></header>
          <div class="grid2">${all.map(n => `<label class="check"><input type="checkbox" data-hide="${esc(n)}" ${hide.includes(n) ? "" : "checked"}>${esc(AGENCY_OVERRIDE[n]?.n || n)}</label>`).join("")}</div></div>`;
      $$(".seg [data-l]").forEach(b => b.addEventListener("click", () => { content.lang = b.dataset.l; VIEWS.content(); }));
      $$("textarea[data-k]").forEach(t => t.addEventListener("input", () => { S.text[L] ||= {}; const v = t.value.trim(); if (v) S.text[L][t.dataset.k] = v; else delete S.text[L][t.dataset.k]; setDirty(); }));
      $$("[data-rw]").forEach(b => b.addEventListener("click", async () => {
        const k = b.dataset.rw, ta = $(`textarea[data-k="${k}"]`); busy(b, true);
        try {
          const r = await ai("rewrite", { text: ta.value || UI[L][k], lang: L });
          $("#rw-" + k).innerHTML = r.options.slice(0, 3).map(o => `<button type="button">${esc(o)}</button>`).join("");
          $$("#rw-" + k + " button").forEach(o => o.addEventListener("click", () => { ta.value = o.textContent; ta.dispatchEvent(new Event("input")); $("#rw-" + k).innerHTML = ""; }));
        } catch (err) { toast(err.message, 4000); } finally { busy(b, false); }
      }));
      $$("[data-hide]").forEach(c => c.addEventListener("change", () => { const h = new Set(Array.isArray(S.hide) ? S.hide : AGENCY_HIDE); c.checked ? h.delete(c.dataset.hide) : h.add(c.dataset.hide); S.hide = [...h]; setDirty(); }));
    },
    theme() {
      const cur = S.brand.accent || "#1f3fd8", mode = S.brand.mode || "auto";
      const sw = [["#1f3fd8", "Averroes blue"], ["#0f766e", "Teal"], ["#7c3aed", "Violet"], ["#c2410c", "Burnt orange"], ["#be123c", "Ruby"], ["#0e1430", "Ink"]];
      $("#view").innerHTML = `<div class="panel"><header><div><h2>Brand colour</h2><p class="muted">Used for buttons, links and highlights across the site and guide pages.</p></div></header>
        <div class="swatches">${sw.map(([c, n]) => `<button type="button" title="${n}" aria-label="${n}" data-c="${c}" style="background:${c}" aria-pressed="${c === cur}"></button>`).join("")}</div>
        <label class="f" style="max-width:240px">Custom colour<input class="t" type="color" id="cPick" value="${esc(cur)}" style="height:44px;padding:4px"></label></div>
        <div class="panel"><header><div><h2>Default appearance</h2><p class="muted">What first-time visitors see. They can still switch with the moon button.</p></div></header>
        <div class="seg" role="group">${[["auto", "Follow device"], ["light", "Light"], ["dark", "Dark"]].map(([v, n]) => `<button type="button" data-m="${v}" aria-pressed="${v === mode}">${n}</button>`).join("")}</div></div>`;
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
      try { const j = await api("site"); PUB_ID = j.id; S = { ...clone(EMPTY), ...j.content }; } catch (e) { toast(e.message, 4000); }
      const d = ls.get("av-admin-draft");
      if (d && d.base === PUB_ID && d.S) { S = d.S; dirty = true; setTimeout(() => toast("Restored your unpublished changes."), 300); }
    }
    PUBLISHED = clone(S);
    shell();
  }
  start();
})();
