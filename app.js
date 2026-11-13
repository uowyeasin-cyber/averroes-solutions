(() => {
  "use strict";
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const esc = s => String(s ?? "").replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const store = { get(k) { try { return localStorage.getItem(k); } catch { return null; } }, set(k, v) { try { localStorage.setItem(k, v); } catch {} } };
  const I = {
    out: '<path d="M7 17L17 7M8 7h9v9"/>', arr: '<path d="M5 12h14M13 6l6 6-6 6"/>', check: '<path d="M5 12l5 5L20 7"/>',
  };
  const ic = (n, cls = "i") => `<svg class="${cls}" viewBox="0 0 24 24">${I[n]}</svg>`;
  const REDUCED = matchMedia("(prefers-reduced-motion: reduce)").matches;

  // Images: window.IMG lets the bundled preview swap in embedded images.
  const img = name => (window.IMG && window.IMG[name]) || `img/${name}.webp`;
  const abs = url => !url ? "" : /^https?:/.test(url) ? url : AGENCY.portfolio.replace(/\/$/, "") + "/" + url.replace(/^\//, "");
  const ONLINE = location.protocol.startsWith("http") && !window.IMG;

  let lang = store.get("av-lang") === "bn" ? "bn" : "en";
  // Owner edits from the admin panel (from /api/site; empty when offline).
  let EDIT = { text: { en: {}, bn: {} }, topics: [], brand: {} };
  const t = k => (EDIT.text?.[lang]?.[k]) || (UI[lang] && UI[lang][k]) || EDIT.text?.en?.[k] || UI.en[k] || "";
  const heading = key => `${esc(t(key + "A"))} <em>${esc(t(key + "Em"))}</em>`;

  // ---------- data ----------
  let HIDE = AGENCY_HIDE, software = [], brand = [], work = [], products = [];
  const show = n => SHOWCASE[n] || {};
  function buildData() {
    const dev = DEV.filter(d => !HIDE.includes(d.n)).map(d => ({ ...d, ...(AGENCY_OVERRIDE[d.n] || {}) }));
    software = dev.filter(d => !AGENCY_PRODUCTS.includes(d.n)).map(d => {
      const s = show(d.n);
      return { type: "software", key: d.n, title: d.n, kick: d.k, text: d.p, list: d.l || [], tags: d.tags || [], img: s.cover || d.img, accent: s.accent,
        live: d.link ? [d.link[0], abs(d.link[1])] : null, page: s.url || null, gh: d.gh ? `https://github.com/uowyeasin-cyber/${d.gh}` : null };
    });
    brand = PROJECTS.filter(p => !HIDE.includes(p.name)).map(p => ({
      type: "brand", key: p.slug, title: p.name, kick: `${p.client} · ${p.year}`, text: p.summary, list: p.deliver ? [p.deliver] : [], tags: p.tags || [],
      img: p.cover + "-t", page: `${AGENCY.portfolio}/#p-${p.slug}`,
    }));
    work = [...software, ...brand];
    products = AGENCY_PRODUCTS.map(n => {
      const d = DEV.find(x => x.n === n); if (!d) return null;
      const s = show(n), L = s[lang] && s[lang].lead ? s[lang] : (s.en || {});
      return { n, kick: L.kicker || d.k, title: L.title || d.n, em: L.em || "", lead: L.lead || L.p || d.p, status: L.status || d.k,
        feats: (L.feats && L.feats.length ? L.feats : (d.l || []).slice(0, 4).map(x => [x, ""])), img: s.cover || d.img, accent: s.accent || "#5B86FF",
        link: d.link ? [d.link[0], abs(d.link[1])] : null, page: s.url || null };
    }).filter(Boolean);
  }

  // ---------- hero ----------
  const SLIDES = [["cover-sunnah-store", "sunnahstore.vercel.app", "Sunnah Store"], ["cover-ai-agent-front-desk", "AI front desk · live demo", "AI Agent Front Desk"], ["cover-amalnama", "Amalnama · installable app", "Amalnama"], ["cover-averroes-code", "Averroes Code · desktop & mobile", "Averroes Code"]];
  let slide = 0, slideTimer;
  function renderHero() {
    const words = `${t("heroA")}`.split(" ").map((w, i) => `<span class="w" style="--n:${i}">${esc(w)}</span>`).join(" ");
    const n = t("heroA").split(" ").length;
    $("#heroH").innerHTML = `${words} <em class="w" style="--n:${n}">${esc(t("heroEm"))}</em>`;
  }
  function renderSlides() {
    $("#slides").innerHTML = SLIDES.map(([im, , n], i) => `<img src="${img(im)}" alt="${esc(n)}" class="${i === slide ? "on" : ""}" ${i ? 'loading="lazy"' : ""}>`).join("");
    $("#dots").innerHTML = SLIDES.map((s, i) => `<button type="button" aria-label="Show ${esc(s[2])}" class="${i === slide ? "on" : ""}" data-slide="${i}"></button>`).join("") + `<span class="lbl" id="slideLbl">${esc(SLIDES[slide][2])}</span>`;
    $("#slideUrl").textContent = SLIDES[slide][1];
  }
  function goSlide(i) {
    slide = (i + SLIDES.length) % SLIDES.length;
    $$("#slides img").forEach((m, k) => m.classList.toggle("on", k === slide));
    $$("#dots button").forEach((b, k) => { b.classList.remove("on"); if (k === slide) { void b.offsetWidth; b.classList.add("on"); } });
    $("#slideUrl").textContent = SLIDES[slide][1]; $("#slideLbl").textContent = SLIDES[slide][2];
    clearTimeout(slideTimer); if (!REDUCED) slideTimer = setTimeout(() => goSlide(slide + 1), 4600);
  }
  // Gentle 3D tilt that follows the pointer.
  const stage = $("#stage"), screen = $("#screen");
  if (!REDUCED && matchMedia("(pointer:fine)").matches) {
    stage.addEventListener("pointermove", e => {
      const r = stage.getBoundingClientRect(), x = (e.clientX - r.left) / r.width - .5, y = (e.clientY - r.top) / r.height - .5;
      screen.style.transform = `rotateY(${-9 + x * 10}deg) rotateX(${4 - y * 8}deg)`;
    });
    stage.addEventListener("pointerleave", () => { screen.style.transform = ""; });
  }

  // ---------- sections ----------
  function renderBand() {
    const names = ["The Halal Gyro Spot", "Spring Hill Deli", "Panjabi Emporium", "Hidayah Foundation", "Wisdom English Institute", "Sunnah Store", "Amalnama", "Averroes Code", "Easy Life"];
    const row = names.map(n => `<span>${esc(n)}</span>`).join("");
    $("#track").innerHTML = row + row;
  }
  function renderStats() {
    const shipped = DEV.length + PROJECTS.length;
    const st = [["2017", t("stat1")], [String(shipped), t("stat2")], [String(AGENCY_PRODUCTS.length), t("stat3")], ["24h", t("stat4")]];
    $("#stats").innerHTML = st.map(([v, l]) => `<div><b data-count="${esc(v)}">${esc(v)}</b><span>${esc(l)}</span></div>`).join("");
  }
  const priceFor = slug => {
    const map = { "app-development": "apps", "website-development": "dev", "ecommerce-website": "dev", "ui-ux-design": "uiux", "seo-services": "seo", "ai-automation": "ai", "portfolio-website": "dev", "logo-design": "design", "menu-design": "design", "led-menu-board": "design", "social-media-design": "design", "video-editing": "design" };
    const k = map[slug], p = k && PACKAGES[k] && PACKAGES[k][0];
    return p && p.price ? p.price.replace(/^From\s+/i, "") : "";
  };
  function renderServices() {
    $("#bento").innerHTML = SERVICES.map((s, i) => {
      const bn = lang === "bn" && SERVICE_BN[s.go], pr = priceFor(s.go);
      const more = ONLINE && s.go ? `<a class="link" href="/services/${esc(s.go)}">${esc(t("details"))}${ic("out")}</a>` : `<a class="link" href="#contact" data-pick="${esc(s.t)}">${esc(t("ask"))}${ic("arr")}</a>`;
      return `<article class="svc reveal ${i < 2 ? "big" : ""}"><div class="ic"><svg viewBox="0 0 24 24">${s.i}</svg></div>
        <h3>${esc(bn ? bn[0] : s.t)}</h3><p>${esc(bn ? bn[1] : s.p)}</p><ul>${s.l.map(x => `<li>${esc(x)}</li>`).join("")}</ul>
        <div class="foot">${pr ? `<span class="price">${esc(t("from"))} <b>${esc(pr)}</b></span>` : "<span></span>"}${more}</div></article>`;
    }).join("");
  }
  function caseHTML(w) {
    const s = show(w.title);
    const L = (s[lang] && s[lang].title) ? s[lang] : s.en;
    const title = L ? `${esc(L.title)} <em style="color:${esc(w.accent || "var(--accent)")}">${esc(L.em)}</em>` : esc(w.title);
    const lead = L ? L.lead : w.text;
    return `<article class="case reveal">
      <a class="shot" href="${esc(w.page || (w.live && w.live[1]) || "#")}" target="_blank" rel="noopener" aria-label="${esc(w.title)}"><img src="${img(w.img)}" alt="${esc(w.title)}" loading="lazy"></a>
      <div class="txt"><p class="mono">${esc(w.kick)}</p><h3>${title}</h3><p>${esc(lead)}</p>
        <ul>${w.list.slice(0, 3).map(x => `<li>${ic("check")}<span>${esc(x)}</span></li>`).join("")}</ul>
        <div class="tags">${w.tags.slice(0, 5).map(x => `<span>${esc(x)}</span>`).join("")}</div>
        <div class="acts">${w.page ? `<a class="btn solid" href="${esc(w.page)}" target="_blank" rel="noopener">${esc(t("caseStudy"))}${ic("out", "i arr")}</a>` : ""}${w.live ? `<a class="btn" href="${esc(w.live[1])}" target="_blank" rel="noopener">${esc(t("liveDemo"))}${ic("out", "i arr")}</a>` : ""}</div>
      </div></article>`;
  }
  function renderFeatured() {
    const list = AGENCY_FEATURED.map(k => work.find(w => w.key === k)).filter(Boolean);
    $("#feat").innerHTML = list.map(caseHTML).join("");
  }
  let filter = "all";
  function renderGrid() {
    const feat = new Set(AGENCY_FEATURED);
    const list = work.filter(w => !feat.has(w.key) && (filter === "all" || w.type === filter));
    $("#grid").innerHTML = list.map(w => `<button class="card" type="button" data-w="${work.indexOf(w)}"><div class="im"><img src="${img(w.img)}" alt="" loading="lazy"></div>
      <p class="mono">${esc(w.kick)}</p><h4>${esc(w.title)}${ic("out")}</h4><p>${esc(w.text)}</p></button>`).join("");
  }
  let prod = 0;
  function renderProducts() {
    $("#ptabs").innerHTML = products.map((p, i) => `<button type="button" role="tab" data-p="${i}" aria-selected="${i === prod}" style="--c:${esc(p.accent)}"><i></i>${esc(p.n)}</button>`).join("");
    const p = products[prod]; if (!p) return;
    const v = $("#pview"); v.style.setProperty("--c", p.accent);
    v.innerHTML = `<div class="im"><img src="${img(p.img)}" alt="${esc(p.n)}"></div>
      <div class="tx"><p class="mono">${esc(p.kick)}</p><h3>${esc(p.title)} <em>${esc(p.em)}</em></h3><p class="lead" style="font-size:16px">${esc(p.lead)}</p>
      <p class="st"><i></i>${esc(p.status)}</p>
      <ul>${p.feats.slice(0, 3).map(f => `<li><b>${esc(f[0])}</b>${f[1] ? `<span>${esc(f[1])}</span>` : ""}</li>`).join("")}</ul>
      <div style="display:flex;gap:10px;flex-wrap:wrap">${p.page ? `<a class="btn solid" href="${esc(p.page)}" target="_blank" rel="noopener">${esc(t("caseStudy"))}${ic("out", "i arr")}</a>` : ""}${p.link ? `<a class="btn" href="${esc(p.link[1])}" target="_blank" rel="noopener">${esc(p.link[0])}${ic("out", "i arr")}</a>` : ""}</div></div>`;
  }
  function renderSteps() {
    $("#steps").innerHTML = AGENCY_PROCESS.map(s => `<li class="reveal"><h3>${esc(s[lang][0])}</h3><p>${esc(s[lang][1])}</p><small>${esc(s[lang][2])}</small></li>`).join("");
  }
  let tab = "dev";
  function renderPricing() {
    $("#tabs").innerHTML = Object.keys(PACKAGES).map(k => `<button type="button" role="tab" data-t="${k}" aria-selected="${k === tab}">${esc(lang === "bn" ? PACKAGE_TABS_BN[k] || PACKAGE_TABS[k] : PACKAGE_TABS[k])}</button>`).join("");
    $("#pk").innerHTML = PACKAGES[tab].map(p => {
      const m = String(p.price || "").match(/^From\s+(.*)$/i);
      return `<article class="plan ${p.pop ? "pop" : ""}"><span class="tag">${esc(p.pop ? t("popular") : p.d)}</span><h3>${esc(p.t)}</h3><p>${esc(p.f)}</p>
        <div class="price">${m ? `<small>${esc(t("from"))}</small>${esc(m[1])}` : esc(p.price || "Custom quote")}</div>
        <ul>${p.l.map(x => `<li>${ic("check")}<span>${esc(x)}</span></li>`).join("")}</ul>
        <a class="btn ${p.pop ? "solid" : ""}" href="#contact" data-pick="${esc(PACKAGE_TABS[tab] + " · " + p.t)}">${esc(t("choose"))}${ic("arr", "i arr")}</a></article>`;
    }).join("");
  }
  function renderFaq() {
    const we = s => s.replace(/\bI'm\b/g, "we're").replace(/\bI've\b/g, "we've").replace(/\bI\b/g, "we").replace(/\bme\b/g, "us").replace(/\bmy\b/g, "our").replace(/(^|\. )we\b/g, "$1We");
    $("#faqlist").innerHTML = FAQ.filter(f => !/jobs and internships/i.test(f[0]))
      .map((f, i) => `<details ${i === 0 ? "open" : ""}><summary>${esc(we(f[0]))}<i aria-hidden="true"></i></summary><p>${esc(we(f[1]))}</p></details>`).join("");
  }
  function renderForm() {
    const keep = $("#fService").value, keepB = $("#fBudget").selectedIndex;
    const opts = Object.keys(PACKAGES).flatMap(k => PACKAGES[k].map(p => `${PACKAGE_TABS[k]} · ${p.t}`));
    $("#fService").innerHTML = ["Not sure yet", ...SERVICES.map(s => s.t), ...opts].map(o => `<option>${esc(o)}</option>`).join("");
    if (keep) $("#fService").value = keep;
    $("#fBudget").innerHTML = t("budgetOpts").map(o => `<option>${esc(o)}</option>`).join("");
    if (keepB > 0) $("#fBudget").selectedIndex = keepB;
  }
  function renderFooter() {
    $("#fsvc").innerHTML = SERVICES.slice(0, 7).map(s => `<a href="${ONLINE ? "/services/" + esc(s.go) : "#services"}">${esc(lang === "bn" && SERVICE_BN[s.go] ? SERVICE_BN[s.go][0] : s.t)}</a>`).join("");
    const g = (EDIT.topics || []).filter(x => !x.draft), box = $("#guides");
    box.hidden = !g.length;
    box.innerHTML = g.length ? `<b>${lang === "bn" ? "গাইড" : "Guides"}</b>` + g.map(x => `<a href="/guides/${esc(x.slug)}">${esc(x.h1 || x.title)}</a>`).join("") : "";
  }
  function applyText() {
    document.documentElement.lang = lang; document.documentElement.dataset.lang = lang;
    $$("[data-i]").forEach(el => { const v = t(el.dataset.i); if (typeof v === "string" && v) el.textContent = v; });
    $$("[data-h]").forEach(el => { el.innerHTML = heading(el.dataset.h); });
    $$(".seg button").forEach(b => b.setAttribute("aria-pressed", String(b.dataset.lang === lang)));
    $("#base").textContent = AGENCY.base[lang]; $("#baseF").textContent = AGENCY.base[lang];
  }
  function renderAll() {
    buildData(); applyText(); renderHero(); renderStats(); renderServices(); renderFeatured(); renderGrid(); renderProducts(); renderSteps(); renderPricing(); renderFaq(); renderForm(); renderFooter(); watchReveal();
  }

  // ---------- project sheet ----------
  const sheet = $("#sheet");
  function openSheet(w) {
    $("#sheetImg").innerHTML = `<img src="${img(w.img)}" alt="${esc(w.title)}">`;
    $("#sheetKick").textContent = w.kick; $("#sheetTitle").textContent = w.title; $("#sheetText").textContent = w.text;
    $("#sheetList").innerHTML = w.list.map(x => `<li>${esc(x)}</li>`).join("");
    $("#sheetTags").innerHTML = w.tags.map(x => `<span>${esc(x)}</span>`).join("");
    $("#sheetActs").innerHTML =
      (w.page ? `<a class="btn solid" href="${esc(w.page)}" target="_blank" rel="noopener">${esc(t("caseStudy"))}${ic("out", "i arr")}</a>` : "") +
      (w.live ? `<a class="btn" href="${esc(w.live[1])}" target="_blank" rel="noopener">${esc(t("liveDemo"))}${ic("out", "i arr")}</a>` : "") +
      `<a class="btn" href="#contact" data-pick="Something like ${esc(w.title)}" data-close>${esc(t("likeThis"))}</a>`;
    sheet.showModal ? sheet.showModal() : sheet.setAttribute("open", "");
  }
  const closeSheet = () => sheet.close ? sheet.close() : sheet.removeAttribute("open");
  $("#sheetClose").addEventListener("click", closeSheet);
  sheet.addEventListener("click", e => { if (e.target === sheet) closeSheet(); });

  // ---------- motion ----------
  let io;
  function watchReveal() {
    if (REDUCED || !("IntersectionObserver" in window)) return;
    io && io.disconnect();
    io = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { e.target.classList.remove("pre"); io.unobserve(e.target); } }), { rootMargin: "0px 0px -8% 0px" });
    $$(".reveal").forEach(el => { const r = el.getBoundingClientRect(); if (r.top > innerHeight) { el.classList.add("pre"); io.observe(el); } });
  }
  const bar = $("#progress"), top = $("#top"), links = $$("nav.main a"), secs = links.map(a => $(a.getAttribute("href")));
  function onScroll() {
    const h = document.documentElement, p = h.scrollTop / Math.max(1, h.scrollHeight - innerHeight);
    bar.style.transform = `scaleX(${p})`; top.classList.toggle("scrolled", h.scrollTop > 8);
    let cur = -1; secs.forEach((s, i) => { if (s && s.getBoundingClientRect().top < 140) cur = i; });
    links.forEach((a, i) => a.classList.toggle("on", i === cur));
  }
  addEventListener("scroll", onScroll, { passive: true });
  // Spotlight that follows the pointer on service cards.
  document.addEventListener("pointermove", e => {
    const c = e.target.closest && e.target.closest(".svc"); if (!c) return;
    const r = c.getBoundingClientRect(); c.style.setProperty("--mx", `${e.clientX - r.left}px`); c.style.setProperty("--my", `${e.clientY - r.top}px`);
  });

  // ---------- events ----------
  document.addEventListener("click", e => {
    const card = e.target.closest("[data-w]"); if (card) return openSheet(work[+card.dataset.w]);
    const f = e.target.closest("[data-f]"); if (f) { filter = f.dataset.f; $$("#filters button").forEach(b => b.setAttribute("aria-pressed", String(b === f))); return renderGrid(); }
    const tb = e.target.closest("[data-t]"); if (tb) { tab = tb.dataset.t; return renderPricing(); }
    const pb = e.target.closest("[data-p]"); if (pb) { prod = +pb.dataset.p; return renderProducts(); }
    const sd = e.target.closest("[data-slide]"); if (sd) return goSlide(+sd.dataset.slide);
    const pick = e.target.closest("[data-pick]");
    if (pick) {
      const sel = $("#fService"), v = pick.dataset.pick;
      if (![...sel.options].some(o => o.value === v)) sel.insertAdjacentHTML("beforeend", `<option>${esc(v)}</option>`);
      sel.value = v; if (pick.hasAttribute("data-close")) closeSheet();
      setTimeout(() => $("#fName").focus({ preventScroll: true }), 500);
    }
    const lb = e.target.closest(".seg button"); if (lb) { lang = lb.dataset.lang; store.set("av-lang", lang); renderAll(); }
    if (e.target.closest("nav.main a")) { $("#nav").classList.remove("open"); $("#menu").setAttribute("aria-expanded", "false"); }
  });
  $("#menu").addEventListener("click", () => { const o = $("#nav").classList.toggle("open"); $("#menu").setAttribute("aria-expanded", String(o)); });
  $("#theme").addEventListener("click", () => {
    const root = document.documentElement;
    const light = root.dataset.theme ? root.dataset.theme === "light" : matchMedia("(prefers-color-scheme: light)").matches;
    root.dataset.theme = light ? "dark" : "light"; store.set("av-theme", root.dataset.theme);
  });
  const savedTheme = store.get("av-theme");
  if (savedTheme) document.documentElement.dataset.theme = savedTheme;

  // ---------- contact ----------
  const waNum = String(SITE.whatsapp || "").replace(/\D/g, "");
  const waLink = (msg) => `https://wa.me/${waNum}${msg ? "?text=" + encodeURIComponent(msg) : ""}`;
  $("#wa").textContent = SITE.phone || "+" + waNum; $("#mail").textContent = SITE.email || "";
  $("#waHero").href = waLink(`Hi ${AGENCY.name}, I'd like to talk about a project.`); $("#fwa").href = $("#waHero").href;
  ["#founderLink", "#footFounder"].forEach(s => $(s).href = AGENCY.portfolio + "/");
  $("#gh").href = SITE.github; $("#li").href = SITE.linkedin; $("#fb").href = SITE.facebook; $("#yt").href = SITE.youtube;
  $("#yr").textContent = new Date().getFullYear();
  if (window.IMG) $("#founderImg").src = img("me-portrait-studio");

  function message() {
    const name = $("#fName").value.trim(), details = $("#fDetails").value.trim();
    if (!name || !details) return null;
    return `Hi ${AGENCY.name}, I'm ${name}.\nService: ${$("#fService").value}\nBudget: ${$("#fBudget").value}\n\n${details}`;
  }
  const note = (txt, err) => { const n = $("#fnote"); n.textContent = txt; n.classList.toggle("err", !!err); };
  const toast = txt => { const el = $("#toast"); el.textContent = txt; el.classList.add("on"); setTimeout(() => el.classList.remove("on"), 1800); };
  $("#brief").addEventListener("submit", e => {
    e.preventDefault(); const m = message(); if (!m) return note(t("fNeed"), true); note("");
    const a = document.createElement("a"); a.href = waLink(m); a.target = "_blank"; a.rel = "noopener"; document.body.appendChild(a); a.click(); a.remove();
  });
  $("#copy").addEventListener("click", () => {
    const m = message(); if (!m) return note(t("fNeed"), true); note("");
    const fallback = () => { const ta = $("#fDetails"); ta.focus(); ta.select(); };
    try { navigator.clipboard.writeText(m).then(() => toast(t("copied")), fallback); } catch { fallback(); }
  });

  // ---------- start ----------
  renderBand(); renderSlides(); renderAll(); onScroll(); goSlide(0);
  if (ONLINE) fetch("/api/site").then(r => r.ok ? r.json() : null).then(j => {
    if (!j || !j.content) return;
    EDIT = { ...EDIT, ...j.content };
    if (Array.isArray(EDIT.hide)) HIDE = EDIT.hide;
    if (EDIT.brand?.accent) document.documentElement.style.setProperty("--accent", EDIT.brand.accent);
    if (EDIT.brand?.mode && EDIT.brand.mode !== "auto" && !savedTheme) document.documentElement.dataset.theme = EDIT.brand.mode;
    renderAll();
  }).catch(() => {});
})();
