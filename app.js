(() => {
  "use strict";
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const esc = s => String(s ?? "").replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const store = { get(k) { try { return localStorage.getItem(k); } catch { return null; } }, set(k, v) { try { localStorage.setItem(k, v); } catch {} } };
  const I = {
    out: '<path d="M7 17L17 7M8 7h9v9"/>', x: '<path d="M6 6l12 12M18 6L6 18"/>', lock: '<rect x="5" y="11" width="14" height="10" rx="2"/><path d="M8 11V8a4 4 0 0 1 8 0v3"/>',
    chat: '<path d="M21 12a9 9 0 0 1-13.4 7.9L3 21l1.2-4.4A9 9 0 1 1 21 12z"/>', cal: '<rect x="3" y="5" width="18" height="16" rx="2"/><path d="M16 3v4M8 3v4M3 10h18"/>',
    mail: '<rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 7l9 6 9-6"/>', arr: '<path d="M5 12h14M13 6l6 6-6 6"/>', check: '<path d="M5 12l5 5L20 7"/>',
    left: '<path d="M15 6l-6 6 6 6"/>', star: '<path d="M12 3l2.7 5.6 6.1.9-4.4 4.3 1 6.1L12 17l-5.4 2.9 1-6.1-4.4-4.3 6.1-.9z"/>', right: '<path d="M9 6l6 6-6 6"/>', send: '<path d="M4 12l16-8-6 16-2.5-6.5z"/>', spark: '<path d="M12 3l1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8z"/><path d="M19 15l.8 2.2L22 18l-2.2.8L19 21l-.8-2.2L16 18l2.2-.8z"/>', copy: '<rect x="9" y="9" width="11" height="11" rx="2"/><path d="M5 15V5a2 2 0 0 1 2-2h10"/>', print: '<path d="M6 9V3h12v6"/><rect x="3" y="9" width="18" height="8" rx="2"/><path d="M7 14h10v7H7z"/>', search: '<circle cx="11" cy="11" r="7"/><path d="M20 20l-3.5-3.5"/>', eye: '<path d="M2 12s3.6-7 10-7 10 7 10 7-3.6 7-10 7S2 12 2 12z"/><circle cx="12" cy="12" r="3"/>',
  };
  const ic = (n, cls = "i") => `<svg class="${cls}" viewBox="0 0 24 24">${I[n]}</svg>`;
  const REDUCED = matchMedia("(prefers-reduced-motion: reduce)").matches;

  // Images: window.IMG lets the bundled preview swap in embedded images.
  // The owner can replace any photo in the admin (EDIT.data.images), or give a full URL.
  let IMGO = {};
  const img = name => !name ? "" : /^(https?:|\/|data:)/.test(name) ? name : IMGO[name] || (window.IMG && window.IMG[name]) || `img/${name}.webp`;
  const abs = url => !url ? "" : /^https?:/.test(url) ? url : AGENCY.portfolio.replace(/\/$/, "") + "/" + url.replace(/^\//, "");
  const host = u => { try { return new URL(u).host.replace(/^www\./, ""); } catch { return ""; } };
  const ONLINE = location.protocol.startsWith("http") && !window.IMG;
  let STATS = null, FEATURED = null;

  const lang = "en"; // English only
  // Owner edits from the admin panel (from /api/site; empty when offline).
  let EDIT = { text: { en: {} }, topics: [], brand: {} };
  const t = k => (EDIT.text?.en?.[k]) || UI.en[k] || "";
  const heading = key => `${esc(t(key + "A"))} <em>${esc(t(key + "Em"))}</em>`;

  // ---------- data ----------
  let HIDE = AGENCY_HIDE, work = [];
  const show = n => SHOWCASE[n] || {};
  function buildData() {
    const dev = DEV.filter(d => !HIDE.includes(d.n)).map(d => ({ ...d, ...(AGENCY_OVERRIDE[d.n] || {}) }));
    const software = dev.filter(d => !AGENCY_PRODUCTS.includes(d.n)).map(d => {
      const s = show(d.n);
      return { type: "software", key: d.n, title: d.n, kick: d.k, text: d.p, list: d.l || [], tags: d.tags || [], img: d.img || s.cover, accent: s.accent,
        live: d.link ? [d.link[0], abs(d.link[1])] : null, page: s.url || null };
    });
    const brand = PROJECTS.filter(p => !HIDE.includes(p.name)).map(p => ({
      type: "brand", key: p.slug, title: p.name, kick: `${p.client} · ${p.year}`, text: p.summary, list: p.deliver ? [p.deliver] : [], tags: p.tags || [],
      img: p.cover + "-t", page: `${AGENCY.portfolio}/#p-${p.slug}`,
    }));
    const D = EDIT.data || {}, WE = D.work || {};
    const edit = w => { const o = WE[w.key]; if (!o) return w; const l = (o.list || []).filter(Boolean), g = (o.tags || []).filter(Boolean);
      return { ...w, title: o.title || w.title, kick: o.kick || w.kick, text: o.text || w.text, img: o.img || w.img, list: l.length ? l : w.list, tags: g.length ? g : w.tags,
        live: o.live ? [t("liveDemo"), o.live] : w.live, page: o.page || w.page, edited: !!(o.title || o.text) }; };
    const added = (D.workAdd || []).filter(x => x && x.title && !x.hide).map(x => ({ type: x.type === "brand" ? "brand" : "software", key: "c-" + x.id, title: x.title, kick: x.kick || "", text: x.text || "",
      list: (x.list || []).filter(Boolean), tags: (x.tags || []).filter(Boolean), img: x.img || "", accent: x.accent || "", live: x.live ? [t("liveDemo"), x.live] : null, page: x.page || null, custom: true }));
    work = [...added, ...software.map(edit), ...brand.map(edit)];
  }

  // ---------- shop data ----------
  const slug = s => String(s || "").toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
  const priceNum = p => { const m = String(p || "").replace(/,/g, "").match(/(\d+(?:\.\d+)?)/); return m ? +m[1] : null; };
  const fromPrice = p => { const ps = (p.plans || []).map(x => x.price).filter(x => priceNum(x) != null); if (!ps.length) return p.price || ""; return ps.sort((a, b) => priceNum(a) - priceNum(b))[0]; };
  // Products for sale. Finished products come first; anything marked "soon" is kept apart and shown last.
  function shopItems() {
    const E = (EDIT.data && EDIT.data.shop) || {};
    const plansOf = (o, it) => { const pl = (o.plans || []).filter(x => x && x.t); return pl.length ? pl : (it.plans || []); };
    const own = ((EDIT.data && EDIT.data.shopAdd) || []).filter(x => x && x.n && !x.hide).map(x => { const fe = (x.feats || []).filter(f => f && f[0]);
      return { n: x.n, tag: x.tag || "", img: x.img || "", lead: x.lead || "", price: x.price || "", demo: x.demo || "", page: x.page || "", status: x.status || "", plans: plansOf(x, {}), feats: fe.slice(0, 3), featsAll: fe }; });
    const all = own.concat(AGENCY_SHOP.map(it => {
      const s = show(it.from || it.n), L = s.en || {}, o = E[it.n] || {};
      if (o.hide) return null;
      const fe = (o.feats || []).filter(f => f && f[0]), base = fe.length ? fe : (L.feats || []);
      return { ...it, n: o.name || it.n, tag: o.tag || it.tag, img: o.img || it.img, lead: o.lead || it.lead || L.lead || L.p || "", feats: base.slice(0, 3), featsAll: base,
        price: o.price || it.price || "", demo: o.demo || it.demo || s.demo || "", page: it.page || s.url || "", status: o.status || it.status || "", plans: plansOf(o, it) };
    }).filter(Boolean));
    return [...all.filter(x => x.status !== "soon"), ...all.filter(x => x.status === "soon")];
  }
  const ready = () => shopItems().filter(x => x.status !== "soon");

  // ---------- hero ----------
  function renderHero() { $("#heroH").innerHTML = heading("hero"); }
  function renderStats() {
    const shipped = DEV.length + PROJECTS.length;
    const st = STATS || [["2017", t("stat1")], [shipped + "+", t("stat2")], ["24h", t("stat4")]];
    $("#stats").innerHTML = st.slice(0, 4).map(([v, l]) => `<div><b>${esc(v)}</b><span>${esc(l)}</span></div>`).join("");
  }
  // Hero slider: only finished products, one after another. Unfinished ones never appear here.
  let sl = 0, SL = [];
  const DUR = 6000;
  function renderSlider() {
    SL = ready(); const box = $("#slider"); box.hidden = !SL.length; if (!SL.length) return;
    sl = Math.min(sl, SL.length - 1);
    const n = SL.length;
    box.innerHTML = `<div class="sl-view">
        <div class="sl-track">${SL.map((p, i) => { const fp = fromPrice(p);
          return `<article class="sl-slide" role="group" aria-roledescription="slide" aria-label="${i + 1} ${esc(t("slOf"))} ${n}: ${esc(p.n)}">
            <button class="sl-im" type="button" data-buy="${esc(p.n)}" tabindex="-1" aria-label="${esc(p.n)}"><span class="pic"><img src="${img(p.img)}" alt="${esc(p.n)}" ${i ? 'loading="lazy"' : 'fetchpriority="high"'}></span><span class="badge"><i></i>${esc(t("slReady"))}</span></button>
            <div class="sl-info"><div><span class="tg">${esc(p.tag)}</span><h3>${esc(p.n)}</h3><p>${esc(p.lead)}</p></div>
              <div class="sl-pr"><small>${esc(fp ? t("from") : t("shopPrice"))}</small><b>${esc(fp || t("shopAsk"))}</b></div></div>
            <div class="sl-acts"><button class="btn solid" type="button" data-buy="${esc(p.n)}">${esc(t("shopBuy"))}${ic("arr", "i arr")}</button>${p.demo ? `<a class="btn" href="${esc(p.demo)}" target="_blank" rel="noopener">${ic("eye")}${esc(t("liveDemo"))}</a>` : ""}</div>
          </article>`; }).join("")}</div>
        ${n > 1 ? `<button class="sl-arrow prev" type="button" data-sl="-1" aria-label="${esc(t("slPrev"))}">${ic("left")}</button><button class="sl-arrow next" type="button" data-sl="1" aria-label="${esc(t("slNext"))}">${ic("right")}</button>` : ""}
      </div>
      ${n > 1 ? `<div class="sl-tabs" role="tablist" aria-label="${esc(t("slReady"))}" style="--dur:${DUR}ms">${SL.map((p, i) => `<button type="button" role="tab" data-slt="${i}" aria-label="${esc(p.n)}"><img src="${img(p.img)}" alt="" loading="lazy"><span><b>${esc(p.n)}</b><small>${esc(fromPrice(p) ? t("from") + " " + fromPrice(p) : p.tag)}</small></span></button>`).join("")}</div>` : ""}`;
    goSlide(sl, true);
  }
  function goSlide(i, instant) {
    const box = $("#slider"), n = SL.length; if (!n) return;
    sl = (i + n) % n;
    const tr = $(".sl-track", box); if (instant) { tr.style.transition = "none"; requestAnimationFrame(() => { tr.style.transition = ""; }); }
    tr.style.transform = `translateX(${-100 * sl}%)`;
    $$(".sl-slide", box).forEach((s, k) => { s.classList.toggle("on", k === sl); s.setAttribute("aria-hidden", String(k !== sl)); $$("a,button", s).forEach(el => el.tabIndex = k === sl && !el.classList.contains("sl-im") ? 0 : -1); });
    $$("[data-slt]", box).forEach((b, k) => { b.removeAttribute("aria-selected"); void b.offsetWidth; b.setAttribute("aria-selected", String(k === sl)); });
    restartTimer();
  }
  // Auto-advance. The tab's progress bar shows the time left; hovering or focusing the slider pauses it.
  let slTimer = 0, slLeft = DUR, slStart = 0;
  const paused = () => $("#slider").classList.contains("paused") || document.hidden;
  function restartTimer() { clearTimeout(slTimer); slLeft = DUR; if (!paused()) runTimer(); }
  function runTimer() { if (REDUCED || SL.length < 2) return; clearTimeout(slTimer); slStart = Date.now(); slTimer = setTimeout(() => goSlide(sl + 1), slLeft); }
  function pause(on) {
    const box = $("#slider"); if (box.classList.contains("paused") === on) return;
    box.classList.toggle("paused", on);
    if (on) { clearTimeout(slTimer); slLeft = Math.max(400, slLeft - (Date.now() - slStart)); } else runTimer();
  }
  {
    const box = $("#slider");
    box.addEventListener("pointerenter", e => { if (e.pointerType === "mouse") pause(true); });
    box.addEventListener("pointerleave", e => { if (e.pointerType === "mouse") pause(false); });
    box.addEventListener("focusin", () => pause(true));
    box.addEventListener("focusout", e => { if (!box.contains(e.relatedTarget)) pause(false); });
    box.addEventListener("keydown", e => { if (e.key === "ArrowRight") goSlide(sl + 1); if (e.key === "ArrowLeft") goSlide(sl - 1); });
    let x0 = null, y0 = 0;
    box.addEventListener("touchstart", e => { x0 = e.touches[0].clientX; y0 = e.touches[0].clientY; }, { passive: true });
    box.addEventListener("touchend", e => { if (x0 == null) return; const dx = e.changedTouches[0].clientX - x0, dy = e.changedTouches[0].clientY - y0; x0 = null;
      if (Math.abs(dx) > 45 && Math.abs(dx) > Math.abs(dy)) goSlide(sl + (dx < 0 ? 1 : -1)); }, { passive: true });
    document.addEventListener("visibilitychange", () => { if (document.hidden) { clearTimeout(slTimer); } else if (!box.classList.contains("paused")) restartTimer(); });
  }

  // ---------- shop ----------
  let cat = "all";
  const card = p => { const soon = p.status === "soon", fp = fromPrice(p);
    return `<article class="card reveal ${soon ? "soon" : ""}">
      <button class="im" type="button" data-buy="${esc(p.n)}" aria-label="${esc(p.n)}"><img src="${img(p.img)}" alt="${esc(p.n)}" loading="lazy"></button>
      <div class="bd"><span class="tg">${esc(p.tag)}${soon ? ` <span class="sn">${esc(t("soonTag"))}</span>` : ""}</span><h3>${esc(p.n)}</h3><p>${esc(p.lead)}</p>
        ${soon || !p.feats.length ? "" : `<ul>${p.feats.map(f => `<li>${ic("check")}<span>${esc(f[0])}${f[1] ? `<span class="muted"> · ${esc(f[1])}</span>` : ""}</span></li>`).join("")}</ul>`}
        <div class="ft">${soon ? "" : `<div class="price"><small>${esc(fp ? t("from") : t("shopPrice"))}</small><b>${esc(fp || t("shopAsk"))}</b></div>`}
          <div class="acts">${p.demo ? `<a class="btn sm" href="${esc(p.demo)}" target="_blank" rel="noopener">${esc(t("liveDemo"))}</a>` : ""}<button class="btn solid sm" type="button" data-buy="${esc(p.n)}">${esc(soon ? t("soonBtn") : t("shopBuy"))}</button></div></div>
      </div></article>`; };
  function renderShop() {
    const items = shopItems(), now = items.filter(x => x.status !== "soon"), soon = items.filter(x => x.status === "soon");
    const cats = [...new Set(now.map(x => x.tag).filter(Boolean))];
    if (cat !== "all" && !cats.includes(cat)) cat = "all";
    $("#filters").hidden = cats.length < 2;
    $("#filters").innerHTML = [["all", t("shopAll")], ...cats.map(c => [c, c])].map(([k, l]) => `<button type="button" data-cat="${esc(k)}" aria-pressed="${k === cat}">${esc(l)}</button>`).join("");
    const shown = now.filter(x => cat === "all" || x.tag === cat);
    $("#shopGrid").dataset.n = shown.length; $("#shopGrid").innerHTML = shown.map(card).join("");
    $("#soonWrap").hidden = !soon.length;
    $("#soonGrid").innerHTML = soon.map(card).join("");
  }
  // Spotlight: the first ready product, shown big with its plans.
  function renderSpotlight() {
    const p = ready()[0], box = $("#spotlight"); box.hidden = !p || !(p.plans || []).length; if (box.hidden) return;
    const feats = (p.featsAll || p.feats || []).slice(0, 4);
    $("#spotIn").innerHTML = `<div>
        <span class="eyebrow">${esc(t("spotEyebrow"))} · ${esc(p.tag)}</span>
        <h2>${esc(p.n)}</h2><p class="lead">${esc(p.lead)}</p>
        ${feats.length ? `<ul>${feats.map(f => `<li>${ic("check")}<span><b>${esc(f[0])}</b>${f[1] ? " " + esc(f[1]) : ""}</span></li>`).join("")}</ul>` : ""}
        <div class="plans3" role="list" aria-label="${esc(t("spotPlans"))}">${p.plans.slice(0, 3).map((x, i) => `<button type="button" role="listitem" class="${x.pop ? "pop" : ""}" data-buy="${esc(p.n)}" data-pl="${i}"><small>${esc(x.t)}${x.pop ? " · " + esc(t("popular")) : ""}</small><b>${esc(x.price || t("shopAsk"))}</b><small>${esc(x.d || "")}</small></button>`).join("")}</div>
        <div class="ctas"><button class="btn solid" type="button" data-buy="${esc(p.n)}">${esc(t("shopBuy"))}${ic("arr", "i arr")}</button>${p.demo ? `<a class="btn" href="${esc(p.demo)}" target="_blank" rel="noopener">${esc(t("spotTry"))}${ic("out", "i arr")}</a>` : ""}</div>
      </div>
      <button class="shot" type="button" data-buy="${esc(p.n)}" aria-label="${esc(p.n)}" style="all:unset;cursor:pointer;display:block;border-radius:20px;overflow:hidden;border:1px solid rgba(255,255,255,.12);box-shadow:0 40px 90px -30px rgba(0,0,0,.8);background:#111"><img src="${img(p.img)}" alt="${esc(p.n)}" loading="lazy" style="display:block;width:100%;aspect-ratio:16/10;object-fit:cover"></button>`;
  }

  // ---------- sections ----------
  function renderBand() {
    const names = ["The Halal Gyro Spot", "Spring Hill Deli", "Panjabi Emporium", "Hidayah Foundation", "Wisdom English Institute", "Sunnah Store", "Amalnama", "Averroes Code", "Easy Life"];
    const row = names.map(n => `<span>${esc(n)}</span>`).join("");
    $("#track").innerHTML = row + row;
  }
  const priceFor = slug => {
    const own = SERVICES.find(s => s.go === slug); if (own && own.price) return own.price.replace(/^From\s+/i, "");
    const map = { "app-development": "apps", "website-development": "dev", "ecommerce-website": "dev", "ui-ux-design": "uiux", "seo-services": "seo", "ai-automation": "ai", "portfolio-website": "dev", "logo-design": "design", "menu-design": "design", "led-menu-board": "design", "social-media-design": "design", "video-editing": "design" };
    const k = map[slug], p = k && PACKAGES[k] && PACKAGES[k][0];
    return p && p.price ? p.price.replace(/^From\s+/i, "") : "";
  };
  function renderServices() {
    const main = SERVICES.slice(0, 6), rest = SERVICES.slice(6);
    $("#svcMore").innerHTML = rest.length ? `<span>${esc(t("alsoDo"))}</span>` + rest.map(s => ONLINE && s.go ? `<a href="/services/${esc(s.go)}">${esc(s.t)}</a>` : `<a href="#quote" data-pick="${esc(s.t)}">${esc(s.t)}</a>`).join("") : "";
    $("#bento").innerHTML = main.map(s => { const pr = priceFor(s.go);
      return `<a class="svr reveal" href="#quote" data-pick="${esc(s.t)}"><span class="ic"><svg viewBox="0 0 24 24">${s.i}</svg></span>
        <div><h3>${esc(s.t)}</h3><p>${esc(s.p)}</p></div>
        ${pr ? `<span class="pr"><small>${esc(t("from"))}</small><b>${esc(pr)}</b></span>` : `<span class="pr"><small>${esc(t("shopPrice"))}</small><b>${esc(t("shopAsk"))}</b></span>`}
        <span class="go">${ic("arr")}</span></a>`;
    }).join("");
  }
  function renderFeatured() {
    const keys = FEATURED || AGENCY_FEATURED, list = keys.map(k => work.find(w => w.key === k || w.title === k)).filter(Boolean);
    for (const w of work) { if (list.length >= 3) break; if (!list.includes(w) && w.img) list.push(w); }
    const BN = typeof AGENCY_BANNERS === "object" ? AGENCY_BANNERS : {}, WE = (EDIT.data && EDIT.data.work) || {};
    $("#feat").innerHTML = list.slice(0, 3).map(w => { const pic = (WE[w.key] && WE[w.key].img) || BN[w.key] || BN[w.title] || w.img; const href = w.page || (w.live && w.live[1]) || "#";
      return `<a class="wk reveal" href="${esc(href)}" target="_blank" rel="noopener"><div class="im"><img src="${img(pic)}" alt="${esc(w.title)}" loading="lazy"></div>
        <div class="bd"><small>${esc(w.kick)}</small><h3>${esc(w.title)}${ic("out")}</h3><p>${esc(w.text)}</p></div></a>`; }).join("");
  }
  // Client reviews: only real reviews the owner added (or approved) in the admin. Hidden while there are none.
  const stars = n => `<span class="stars" aria-label="${n} out of 5">${[1, 2, 3, 4, 5].map(i => `<svg viewBox="0 0 24 24" class="${i <= n ? "" : "off"}">${I.star}</svg>`).join("")}</span>`;
  function reviews() {
    const own = (EDIT.data && EDIT.data.reviews) || [];
    const base = (typeof TESTIMONIALS !== "undefined" ? TESTIMONIALS : []).map((x, i) => ({ id: "t" + i, name: x.name || x.n, role: x.role || x.r || "", text: x.text || x.q || x.t, rating: x.rating || 5 }));
    return (own.length ? own : base).filter(r => r && r.name && r.text && !r.hide);
  }
  function renderReviews() {
    const list = reviews(), box = $("#reviews"); box.hidden = !list.length; if (!list.length) return;
    const avg = list.reduce((s, r) => s + (+r.rating || 5), 0) / list.length;
    $("#revSum").innerHTML = `<b>${avg.toFixed(1)}</b><span>${stars(Math.round(avg))}<span>${esc(t("revOf"))} ${list.length} ${esc(t("revCount"))}</span></span>`;
    const g = $("#revGrid"); g.dataset.n = Math.min(list.length, 6);
    g.innerHTML = list.slice(0, 6).map(r => { const ini = r.name.split(/\s+/).map(w => w[0]).slice(0, 2).join("").toUpperCase();
      const who = [r.role, r.company].filter(Boolean).join(", ") + (r.country ? (r.role || r.company ? " · " : "") + r.country : "");
      return `<figure class="rv reveal">${stars(+r.rating || 5)}<blockquote>${esc(r.text)}</blockquote>${r.project ? `<span class="pj">${esc(r.project)}</span>` : ""}
        <footer><span class="av">${r.photo ? `<img src="${img(r.photo)}" alt="" loading="lazy">` : esc(ini)}</span><span><b>${esc(r.name)}</b>${who ? `<small>${esc(who)}</small>` : ""}</span></footer></figure>`; }).join("");
  }
  function openReview() {
    st.p = null; st.step = "review"; pause(true);
    SB.querySelector(".st-panel").innerHTML = `<header class="st-h"><div class="st-crumb"><span class="on">${esc(t("revEyebrow"))}</span></div><button class="st-x" type="button" aria-label="Close">${ic("x")}</button></header>
      <div class="st-body"><div class="st-done" style="text-align:left;max-width:620px"><h2 id="stTitle">${esc(t("revH"))}</h2><p class="st-lead">${esc(t("revP"))}</p>
      <form class="st-form" id="revF" novalidate>
        <div><span style="font-size:13.5px;font-weight:500">${esc(t("revRating"))}</span><div class="st-stars" role="radiogroup">${[1, 2, 3, 4, 5].map(i => `<label class="${i <= 5 ? "on" : ""}" aria-label="${i} stars"><input type="radio" name="rating" value="${i}" ${i === 5 ? "checked" : ""}><svg viewBox="0 0 24 24">${I.star}</svg></label>`).join("")}</div></div>
        <div class="two"><label>${esc(t("coName"))} *<input name="name" required autocomplete="name"></label><label>${esc(t("coEmail"))} *<input name="email" type="email" required autocomplete="email"></label></div>
        <div class="two"><label>${esc(t("revCompany"))}<input name="business" autocomplete="organization"></label><label>${esc(t("revRole"))}<input name="role" placeholder="Owner"></label></div>
        <div class="two"><label>${esc(t("coCountry"))}<input name="country"></label><label>${esc(t("revProject"))}<input name="product" placeholder="Online store"></label></div>
        <label>${esc(t("revText"))} *<textarea name="notes" rows="5" required></textarea></label>
        <input name="website" class="hp" tabindex="-1" autocomplete="off">
        <div class="st-acts"><button class="btn solid" type="submit">${esc(t("revSend"))}${ic("arr", "i arr")}</button></div>
        <p class="st-note" id="stNote" aria-live="polite"></p></form></div></div>`;
    SB.hidden = false; document.documentElement.classList.add("noscroll"); requestAnimationFrame(() => SB.classList.add("on"));
    setTimeout(() => SB.querySelector(".st-x").focus(), 50);
  }
  async function sendReview(form) {
    const f = Object.fromEntries(new FormData(form).entries()), note = $("#stNote");
    if (!f.name.trim() || !/^\S+@\S+\.\S+$/.test(f.email) || f.notes.trim().length < 10) { note.textContent = t("revNeed"); note.className = "st-note err"; return; }
    const btn = form.querySelector('[type="submit"]'); btn.disabled = true; note.textContent = t("coSending"); note.className = "st-note";
    try { await post({ kind: "review", ...f, product: f.product || "Review" }); form.innerHTML = `<p class="st-note" style="font-size:16px;color:var(--good)">${esc(t("revThanks"))}</p>`; }
    catch (e) { note.textContent = e.message || t("coFail"); note.className = "st-note err"; btn.disabled = false; }
  }
  function renderSteps() {
    $("#steps").innerHTML = AGENCY_PROCESS.map(s => `<li class="reveal"><h3>${esc(s.en[0])}</h3><p>${esc(s.en[1])}</p><small>${esc(s.en[2])}</small></li>`).join("");
  }
  let tab = "dev";
  function renderPricing() {
    if (!PACKAGES[tab]) tab = Object.keys(PACKAGES)[0];
    $("#tabs").innerHTML = `<span class="pill-bg" aria-hidden="true"></span>` + Object.keys(PACKAGES).map(k => `<button type="button" role="tab" data-t="${k}" aria-selected="${k === tab}">${esc(PACKAGE_TABS[k])}</button>`).join("");
    requestAnimationFrame(movePill);
    $("#pk").innerHTML = PACKAGES[tab].map(p => {
      const m = String(p.price || "").match(/^From\s+(.*)$/i);
      return `<article class="plan ${p.pop ? "pop" : ""}" style="--i:${PACKAGES[tab].indexOf(p)}"><span class="tag">${esc(p.pop ? t("popular") : p.d)}</span><h3>${esc(p.t)}</h3><p>${esc(p.f)}</p>
        <div class="amt">${m ? `<small>${esc(t("from"))}</small>${esc(m[1])}` : esc(p.price || "Custom quote")}</div>
        <ul>${p.l.map(x => `<li>${ic("check")}<span>${esc(x)}</span></li>`).join("")}</ul>
        <a class="btn ${p.pop ? "solid" : ""}" href="#quote" data-pick="${esc(PACKAGE_TABS[tab] + " · " + p.t)}">${esc(t("choose"))}${ic("arr", "i arr")}</a></article>`;
    }).join("");
  }
  function movePill() {
    const b = $('#tabs [aria-selected="true"]'), pill = $("#tabs .pill-bg"); if (!b || !pill) return;
    pill.style.left = b.offsetLeft + "px"; pill.style.width = b.offsetWidth + "px";
  }
  addEventListener("resize", movePill);
  // Prices count up from zero when they appear.
  function countUp(el) {
    const node = el.lastChild; if (!node || node.nodeType !== 3 || REDUCED) return; const m = node.textContent.match(/^(.*?)([\d,]+)(.*)$/); if (!m) return;
    const end = +m[2].replace(/,/g, ""), t0 = performance.now(), D = 900;
    const step = now => { const k = Math.min(1, (now - t0) / D), v = Math.round(end * (1 - Math.pow(1 - k, 3)));
      node.textContent = m[1] + v.toLocaleString("en-US") + m[3]; if (k < 1) requestAnimationFrame(step); };
    requestAnimationFrame(step);
  }
  function swapPlans() {
    const pk = $("#pk"); pk.classList.remove("swap"); void pk.offsetWidth; pk.classList.add("swap");
    $$("#pk .amt").forEach(countUp);
  }
  function renderFaq() {
    const we = s => s.replace(/\bI'm\b/g, "we're").replace(/\bI've\b/g, "we've").replace(/\bI\b/g, "we").replace(/\bme\b/g, "us").replace(/\bmy\b/g, "our").replace(/(^|\. )we\b/g, "$1We");
    $("#faqlist").innerHTML = FAQ.filter(f => !/jobs and internships/i.test(f[0]))
      .map((f, i) => `<details ${i === 0 ? "open" : ""}><summary>${esc(we(f[0]))}<i aria-hidden="true"></i></summary><p>${esc(we(f[1]))}</p></details>`).join("");
  }
  function renderForm() {
    const keep = $("#fService").value, keepB = $("#fBudget").selectedIndex;
    const opts = Object.keys(PACKAGES).flatMap(k => PACKAGES[k].map(p => `${PACKAGE_TABS[k]} · ${p.t}`));
    const prods = ready().map(p => `${p.n} (ready-made)`);
    $("#fService").innerHTML = [...new Set(["Not sure yet", ...prods, ...SERVICES.map(s => s.t), ...opts])].map(o => `<option>${esc(o)}</option>`).join("");
    if (keep) { if (![...$("#fService").options].some(o => o.value === keep)) $("#fService").insertAdjacentHTML("beforeend", `<option>${esc(keep)}</option>`); $("#fService").value = keep; }
    $("#fBudget").innerHTML = t("budgetOpts").map(o => `<option>${esc(o)}</option>`).join("");
    if (keepB > 0) $("#fBudget").selectedIndex = keepB;
  }
  function renderFooter() {
    $("#fshop").innerHTML = ready().slice(0, 6).map(p => `<a href="#buy/${slug(p.n)}" data-buy="${esc(p.n)}">${esc(p.n)}</a>`).join("");
    $("#fsvc").innerHTML = SERVICES.slice(0, 6).map(s => `<a href="${ONLINE ? "/services/" + esc(s.go) : "#services"}">${esc(s.t)}</a>`).join("");
    const g = (EDIT.topics || []).filter(x => !x.draft), box = $("#guides");
    box.hidden = !g.length;
    box.innerHTML = g.length ? `<b>Guides</b>` + g.map(x => `<a href="/guides/${esc(x.slug)}">${esc(x.h1 || x.title)}</a>`).join("") : "";
  }
  function applyText() {
    document.documentElement.lang = lang;
    $$("[data-i]").forEach(el => { const v = t(el.dataset.i); if (typeof v === "string" && v) el.textContent = v; });
    $$("[data-h]").forEach(el => { el.innerHTML = heading(el.dataset.h); });
    $("#base").textContent = AGENCY.base.en; $("#baseF").textContent = AGENCY.base.en;
    // The announcement points at the first ready product unless the owner wrote their own text.
    const p = ready()[0], a = $("#annLink");
    if (p) { a.dataset.buy = p.n; if (!EDIT.text?.en?.annLink) a.querySelector("span").textContent = p.n; }
    $("#ann").hidden = !p;
  }
  function applyBrand() {
    const b = (EDIT.data && EDIT.data.site) || {}, name = AGENCY.name;
    $$("[data-brand]").forEach(el => { el.textContent = name; });
    if (b.logo) { $$(".logo .wm").forEach(m => { m.src = img(b.logo); m.removeAttribute("width"); m.removeAttribute("height"); }); const big = $(".logoTile img"); if (big) big.src = img(b.logo); }
    $$(".logo").forEach(a => a.setAttribute("aria-label", name + ", home"));
    $$("img[data-img]").forEach(m => { const k = m.dataset.img; if (b.logo && k === "logo-wordmark") return; if (IMGO[k] || window.IMG) m.src = img(k); });
  }
  function renderAll() {
    buildData(); applyText(); applyBrand(); renderHero(); renderStats(); renderSlider(); renderShop(); renderSpotlight(); renderServices(); renderPricing(); renderSteps(); renderFeatured(); renderReviews(); renderFaq(); renderForm(); renderFooter(); watchReveal();
  }

  // ---------- store: product page -> checkout -> confirmation ----------
  const st = { p: null, plan: 0, step: "product", order: null };
  const SB = $("#store");
  function openStore(name, planIdx) {
    const p = shopItems().find(x => slug(x.n) === slug(name)); if (!p) return;
    st.p = p; st.step = p.status === "soon" ? "notify" : "product";
    st.plan = planIdx != null && p.plans[planIdx] ? +planIdx : Math.max(0, (p.plans || []).findIndex(x => x.pop));
    pause(true);
    drawStore(); SB.hidden = false; document.documentElement.classList.add("noscroll");
    requestAnimationFrame(() => SB.classList.add("on"));
    if (location.hash !== "#buy/" + slug(p.n)) history.pushState(null, "", "#buy/" + slug(p.n));
    setTimeout(() => SB.querySelector(".st-x").focus(), 50);
  }
  function closeStore(fromPop) {
    SB.classList.remove("on"); document.documentElement.classList.remove("noscroll");
    setTimeout(() => { SB.hidden = true; }, 300); pause(false);
    if (!fromPop && /^#(buy\/|track)/.test(location.hash)) history.pushState(null, "", location.pathname + location.search);
  }
  const plan = () => (st.p.plans || [])[st.plan] || { t: "Standard", price: st.p.price || "" };
  const talk = p => `<div class="st-talk"><b>${esc(t("stTalkH"))}</b><p>${esc(t("stTalkP"))}</p>
    <div class="st-talk-a"><a href="${waLink("Hi " + AGENCY.name + ", I have a question about " + p.n + ".")}" target="_blank" rel="noopener">${ic("chat")}<span>WhatsApp</span></a>
    <a href="${waLink("Hi " + AGENCY.name + ", I'd like to book a short call about " + p.n + ".")}" target="_blank" rel="noopener">${ic("cal")}<span>${esc(t("stCall"))}</span></a>
    ${SITE.email ? `<a href="mailto:${esc(SITE.email)}?subject=${encodeURIComponent(p.n)}">${ic("mail")}<span>${esc(t("orEmail"))}</span></a>` : ""}</div></div>`;
  function drawStore() {
    if (st.step === "track") return drawTrack();
    const p = st.p, pl = plan(), steps = ["product", "checkout", "done"], si = steps.indexOf(st.step);
    const head = `<header class="st-h"><div class="st-crumb">${p.status === "soon" ? `<span class="on">${esc(t("soonTag"))}</span>` : steps.map((s, i) => `<span class="${i === si ? "on" : i < si ? "ok" : ""}">${i + 1}. ${esc(t("st_" + s))}</span>`).join("")}</div>
      <button class="st-x" type="button" aria-label="Close">${ic("x")}</button></header>`;
    let body = "";
    if (st.step === "product" || st.step === "notify") {
      const feats = (p.featsAll || p.feats || []).slice(0, 6);
      body = `<div class="st-grid">
        <div class="st-main">
          <div class="st-shot"><img src="${img(p.img)}" alt="${esc(p.n)}"></div>
          <span class="sp-tag">${esc(p.tag)}</span><h2 id="stTitle">${esc(p.n)}</h2><p class="st-lead">${esc(p.lead)}</p>
          ${feats.length ? `<h4>${esc(t("stWhat"))}</h4><ul class="st-feats">${feats.map(f => `<li>${ic("check")}<span><b>${esc(f[0])}</b>${f[1] ? " " + esc(f[1]) : ""}</span></li>`).join("")}</ul>` : ""}
          ${p.status === "soon" ? "" : `<h4>${esc(t("stHow"))}</h4><ol class="st-how"><li><b>${esc(t("stHow1"))}</b><span>${esc(t("stHow1p"))}</span></li><li><b>${esc(t("stHow2"))}</b><span>${esc(t("stHow2p"))}</span></li><li><b>${esc(t("stHow3"))}</b><span>${esc(t("stHow3p"))}</span></li></ol>`}
        </div>
        <aside class="st-side">${p.status === "soon" ? `
          <div class="st-box"><b class="st-bh">${esc(t("soonH"))}</b><p class="muted2">${esc(t("soonP"))}</p>
            <form class="st-form" id="notifyF"><label>${esc(t("coName"))}<input name="name" required autocomplete="name"></label><label>${esc(t("coEmail"))}<input name="email" type="email" required autocomplete="email"></label>
            <input name="website" class="hp" tabindex="-1" autocomplete="off"><button class="btn solid wide" type="submit">${esc(t("soonBtn"))}</button><p class="st-note" id="stNote" aria-live="polite"></p></form>
            ${p.demo ? `<a class="btn wide" href="${esc(p.demo)}" target="_blank" rel="noopener">${esc(t("stTry"))}${ic("out", "i arr")}</a>` : ""}</div>` : `
          <div class="st-box"><b class="st-bh">${esc(t("stChoose"))}</b>
            ${p.demo ? `<a class="st-free" href="${esc(p.demo)}" target="_blank" rel="noopener"><span><b>${esc(t("stFree"))}</b><small>${esc(t("stFreeP"))}</small></span><em>${esc(t("stFreeTag"))}</em></a>` : ""}
            <div class="st-plans" role="radiogroup" aria-label="${esc(t("stChoose"))}">${(p.plans || []).map((x, i) => `<button type="button" role="radio" aria-checked="${i === st.plan}" data-plan="${i}" class="st-plan">
              <span class="st-pt"><b>${esc(x.t)}</b>${x.pop ? `<em>${esc(t("popular"))}</em>` : ""}<strong>${esc(x.price || t("shopAsk"))}</strong></span>
              ${x.d ? `<small>${esc(x.d)}</small>` : ""}<ul>${(x.l || []).map(l => `<li>${ic("check")}${esc(l)}</li>`).join("")}</ul></button>`).join("")}</div>
            <button class="btn solid wide" type="button" data-go="checkout">${esc(t("stContinue"))}${ic("arr", "i arr")}</button>
            <p class="st-safe">${ic("lock")}${esc(t("stSafe"))}</p></div>`}
          ${talk(p)}</aside></div>
        ${p.status === "soon" ? "" : `<div class="st-mbar"><span><small>${esc(t("from"))}</small><b>${esc(fromPrice(p) || t("shopAsk"))}</b></span><button class="btn solid" type="button" data-jump>${esc(t("st_product"))}${ic("arr", "i arr")}</button></div>`}`;
    } else if (st.step === "checkout") {
      body = `<div class="st-grid co">
        <form class="st-main st-form" id="coF" novalidate>
          <h2 id="stTitle">${esc(t("coH"))}</h2><p class="st-lead">${esc(t("coP"))}</p>
          <div class="two"><label>${esc(t("coName"))} *<input name="name" required autocomplete="name"></label><label>${esc(t("coEmail"))} *<input name="email" type="email" required autocomplete="email"></label></div>
          <div class="two"><label>${esc(t("coPhone"))} *<input name="phone" required autocomplete="tel" inputmode="tel" placeholder="+60 …"></label><label>${esc(t("coBiz"))}<input name="business" autocomplete="organization"></label></div>
          <div class="two"><label>${esc(t("coCountry"))}<select name="country">${["Malaysia", "Bangladesh", "United States", "United Kingdom", "Other"].map(c => `<option>${c}</option>`).join("")}</select></label><label>${esc(t("coDomain"))}<input name="domain" placeholder="yourbusiness.com"></label></div>
          <label>${esc(t("coNotes"))}<textarea name="notes" rows="3" placeholder="${esc(t("coNotesPh"))}"></textarea></label>
          <fieldset class="st-pay"><legend>${esc(t("coPay"))}</legend>${t("payOpts").map((o, i) => `<label class="st-radio"><input type="radio" name="pay" value="${esc(o[0])}" ${i ? "" : "checked"}><span><b>${esc(o[0])}</b><small>${esc(o[1])}</small></span></label>`).join("")}</fieldset>
          <label class="st-agree"><input type="checkbox" name="agree" required><span>${esc(t("coAgree"))}</span></label>
          <input name="website" class="hp" tabindex="-1" autocomplete="off">
          <div class="st-acts"><button class="btn" type="button" data-go="product">${esc(t("coBack"))}</button><button class="btn solid" type="submit">${esc(t("coPlace"))}${ic("arr", "i arr")}</button></div>
          <p class="st-note" id="stNote" aria-live="polite"></p>
        </form>
        <aside class="st-side"><div class="st-box st-sum"><b class="st-bh">${esc(t("coSum"))}</b>
          <div class="st-item"><img src="${img(p.img)}" alt=""><span><b>${esc(p.n)}</b><small>${esc(pl.t)}${pl.d ? " · " + esc(pl.d) : ""}</small></span></div>
          <ul>${(pl.l || []).slice(0, 5).map(l => `<li>${ic("check")}${esc(l)}</li>`).join("")}</ul>
          <div class="st-total"><span>${esc(t("coTotal"))}</span><b>${esc(pl.price || t("shopAsk"))}</b></div>
          <p class="st-safe">${ic("lock")}${esc(t("coAfter"))}</p></div>${talk(p)}</aside></div>`;
    } else {
      const o = st.order || {};
      body = `<div class="st-done"><span class="st-ok">${ic("check")}</span><h2 id="stTitle">${esc(t("doneH"))}</h2>
        <p class="st-lead">${esc(t("doneP").replace("{id}", o.id || ""))}</p>
        ${receipt(o)}
        <div class="st-acts wrap">${rcActs(o)}<button class="btn" type="button" data-close-store>${esc(t("doneBack"))}</button></div>
        <ol class="st-how"><li><b>${esc(t("done1"))}</b><span>${esc(t("done1p"))}</span></li><li><b>${esc(t("done2"))}</b><span>${esc(t("done2p"))}</span></li><li><b>${esc(t("done3"))}</b><span>${esc(t("done3p"))}</span></li></ol></div>`;
    }
    SB.querySelector(".st-panel").innerHTML = head + `<div class="st-body">${body}</div>`;
    SB.querySelector(".st-body").scrollTop = 0;
    drawQR();
  }

  // ---------- receipt, order history and tracking ----------
  const STATUS = { new: "Received", contacted: "Confirmed", paid: "In progress", done: "Delivered", cancelled: "Cancelled" };
  const history_ = { get() { try { return JSON.parse(store.get("av-orders") || "[]"); } catch { return []; } },
    save(o) { const list = this.get().filter(x => x.id !== o.id); list.unshift(o); store.set("av-orders", JSON.stringify(list.slice(0, 30))); } };
  const trackUrl = id => (ONLINE ? location.origin + "/" : "https://averroessolutions.vercel.app/") + "#track/" + id;
  const when = at => { try { return new Date(at).toLocaleString("en-GB", { day: "numeric", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit" }); } catch { return ""; } };
  function receipt(o) {
    const st_ = o.status || "new", rows = [["Customer", o.name], ["Email", o.email], ["Phone", o.phone], ["Business", o.business], ["Country", o.country], ["Domain", o.domain], ["Payment method", o.pay]].filter(r => r[1]);
    return `<div class="rcpt" id="rcpt">
      <div class="rc-top"><img src="${img("logo-wordmark")}" alt="${esc(AGENCY.name)}"><span class="rc-st ${esc(st_)}">${esc(o.statusLabel || STATUS[st_] || "Received")}</span></div>
      <div class="rc-id"><div><small>${esc(t("rcTitle"))} · ${esc(t("trackId"))}</small><b>${esc(o.id || "")}</b><small>${esc(when(o.at))}</small></div>
        <div class="rc-qrw"><div class="rc-qr" data-qr="${esc(trackUrl(o.id || ""))}"></div><span>${esc(t("rcScan"))}</span></div></div>
      ${rows.length ? `<dl class="rc-dl">${rows.map(r => `<div><dt>${esc(r[0])}</dt><dd>${esc(r[1])}</dd></div>`).join("")}</dl>` : ""}
      <div class="rc-item"><span><b>${esc(o.product || "")}</b><small>${esc(o.plan ? o.plan + " plan" : "")}</small></span><b>${esc(o.price || t("shopAsk"))}</b></div>
      <div class="rc-tot"><span>Total, invoiced after we confirm</span><b>${esc(o.price || t("shopAsk"))}</b></div>
      <p class="rc-note">${esc(t("rcNote"))} ${esc(trackUrl(o.id || ""))}</p></div>`;
  }
  const rcActs = o => `<button class="btn solid" type="button" data-print>${ic("print")}${esc(t("rcPrint"))}</button>
    <button class="btn" type="button" data-copy="${esc(o.id || "")}">${ic("copy")}<span>${esc(t("rcCopy"))}</span></button>
    <a class="btn" href="${waLink(`Hi ${AGENCY.name}, about my order ${o.id || ""} (${o.product || ""}${o.plan ? ", " + o.plan : ""}).`)}" target="_blank" rel="noopener">${ic("chat")}WhatsApp</a>`;
  let qrLib;
  function drawQR() {
    const box = SB.querySelector("[data-qr]"); if (!box) return;
    const go = () => { try { const q = window.qrcode(0, "M"); q.addData(box.dataset.qr); q.make(); box.innerHTML = q.createSvgTag({ cellSize: 4, margin: 0, scalable: true }); } catch {} };
    if (window.qrcode) return go();
    qrLib ||= new Promise((ok, no) => { const s = document.createElement("script"); s.src = (window.QR_SRC || "/vendor/qrcode.js"); s.onload = ok; s.onerror = no; document.head.appendChild(s); });
    qrLib.then(go, () => {});
  }
  const tk = { id: "", email: "", res: null, err: "", busy: false };
  function openTrack(id) {
    st.step = "track"; st.p = null; tk.res = null; tk.err = "";
    if (id) { tk.id = id.toUpperCase(); const h = history_.get().find(x => x.id === tk.id); if (h) tk.email = h.email; }
    pause(true); drawStore(); SB.hidden = false; document.documentElement.classList.add("noscroll");
    requestAnimationFrame(() => SB.classList.add("on"));
    const want = "#track" + (id ? "/" + tk.id : ""); if (location.hash !== want) history.pushState(null, "", want);
    if (tk.id && tk.email) lookup();
  }
  function drawTrack() {
    const mine = history_.get(), r = tk.res;
    const steps = ["new", "contacted", "paid", "done"], at = r ? steps.indexOf(r.status) : -1;
    SB.querySelector(".st-panel").innerHTML = `<header class="st-h"><div class="st-crumb"><span class="on">${esc(t("trackH"))}</span></div><button class="st-x" type="button" aria-label="Close">${ic("x")}</button></header>
      <div class="st-body"><div class="trk">
        <div><h2 id="stTitle">${esc(t("trackH"))}</h2><p class="st-lead">${esc(t("trackP"))}</p>
          <form class="st-form" id="trkF"><div class="two"><label>${esc(t("trackId"))}<input name="id" required value="${esc(tk.id)}" placeholder="AV-1A2B3C" autocapitalize="characters"></label>
            <label>${esc(t("coEmail"))}<input name="email" type="email" required value="${esc(tk.email)}" autocomplete="email"></label></div>
            <button class="btn solid" type="submit" ${tk.busy ? "disabled" : ""}>${ic("search")}${esc(tk.busy ? "Checking…" : t("trackBtn"))}</button>
            ${tk.err ? `<p class="st-note err">${esc(tk.err)}</p>` : ""}</form>
          ${r ? `<div class="trk-res">
            ${r.status === "cancelled" ? "" : `<ol class="tl">${steps.map((s, i) => `<li class="${i <= at ? "on" : ""}">${esc(STATUS[s])}</li>`).join("")}</ol>`}
            <p class="trk-msg"><b>${esc(r.statusLabel)}.</b> ${esc(r.statusText || "")}</p>
            ${receipt(r)}<div class="st-acts wrap">${rcActs(r)}</div></div>` : ""}
        </div>
        <aside class="st-side"><div class="st-box"><b class="st-bh">${esc(t("trackMine"))}</b>
          ${mine.length ? `<div class="mine">${mine.map(o => `<button type="button" data-mine="${esc(o.id)}"><span><b>${esc(o.id)}</b><small>${esc(o.product || "")}${o.plan ? " · " + esc(o.plan) : ""} · ${esc(when(o.at))}</small></span>${ic("right")}</button>`).join("")}</div>` : `<p class="muted2">${esc(t("trackNone"))}</p>`}
        </div>${SITE.whatsapp ? `<div class="st-talk"><b>${esc(t("stTalkH"))}</b><div class="st-talk-a"><a href="${waLink("Hi " + AGENCY.name + ", I have a question about my order.")}" target="_blank" rel="noopener">${ic("chat")}<span>WhatsApp</span></a></div></div>` : ""}</aside>
      </div></div>`;
    drawQR();
  }
  async function lookup() {
    tk.busy = true; tk.err = ""; drawTrack();
    const local = history_.get().find(x => x.id === tk.id && x.email.toLowerCase() === tk.email.toLowerCase());
    try {
      if (!ONLINE) { if (!local) throw new Error(t("trackNot")); tk.res = { ...local, statusLabel: STATUS[local.status || "new"], statusText: "We have your order and will contact you within 24 hours to confirm the details." }; }
      else {
        const r = await fetch(`/api/order?id=${encodeURIComponent(tk.id)}&email=${encodeURIComponent(tk.email)}`), j = await r.json().catch(() => ({}));
        if (!r.ok) throw new Error(j.error || t("trackNot"));
        tk.res = j.order; if (local) history_.save({ ...local, status: j.order.status });
      }
      if (location.hash !== "#track/" + tk.id) history.replaceState(null, "", "#track/" + tk.id);
    } catch (e) { tk.res = null; tk.err = e.message || t("trackNot"); }
    tk.busy = false; drawTrack();
  }
  async function post(body) {
    if (!ONLINE) return (body.kind === "order" ? "AV-" : body.kind === "quote" ? "QT-" : "WL-") + Math.random().toString(36).slice(2, 8).toUpperCase();
    const r = await fetch("/api/order", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(body) });
    const j = await r.json().catch(() => ({})); if (!r.ok) throw new Error(j.error || ""); return j.id;
  }
  async function sendOrder(form, kind) {
    const f = Object.fromEntries(new FormData(form).entries()), note = $("#stNote");
    if (kind === "order") {
      const bad = !f.name.trim() || !/^\S+@\S+\.\S+$/.test(f.email) || f.phone.replace(/\D/g, "").length < 7 || !form.agree.checked;
      if (bad) { note.textContent = t("coNeed"); note.className = "st-note err"; return; }
    }
    const pl = plan(), btn = form.querySelector('[type="submit"]'); btn.disabled = true; note.textContent = t("coSending"); note.className = "st-note";
    const body = { kind, product: st.p.n, plan: kind === "order" ? pl.t : "", price: kind === "order" ? pl.price || "" : "", ...f };
    delete body.agree;
    try {
      const id = await post(body);
      if (kind === "order") {
        st.order = { id, at: new Date().toISOString(), status: "new", product: st.p.n, plan: pl.t, price: pl.price || "", pay: f.pay, name: f.name, email: f.email, phone: f.phone, business: f.business, country: f.country, domain: f.domain };
        history_.save(st.order); st.step = "done"; drawStore();
      }
      else { note.textContent = t("soonDone"); form.reset(); btn.disabled = false; }
    } catch (e) { note.textContent = e.message || t("coFail"); note.className = "st-note err"; btn.disabled = false; }
  }
  SB.addEventListener("click", e => {
    if (e.target === SB || e.target.closest(".st-x") || e.target.closest("[data-close-store]")) return closeStore();
    if (e.target.closest("[data-print]")) return print();
    const cp = e.target.closest("[data-copy]"); if (cp) { navigator.clipboard?.writeText(cp.dataset.copy).then(() => { const s = cp.querySelector("span"); if (s) { s.textContent = t("rcCopied"); setTimeout(() => { s.textContent = t("rcCopy"); }, 1600); } }); return; }
    const mn = e.target.closest("[data-mine]"); if (mn) { const h = history_.get().find(x => x.id === mn.dataset.mine); tk.id = h.id; tk.email = h.email; return lookup(); }
    const pb = e.target.closest("[data-plan]"); if (pb) { st.plan = +pb.dataset.plan; $$(".st-plan", SB).forEach((b, i) => b.setAttribute("aria-checked", String(i === st.plan))); return; }
    if (e.target.closest("[data-jump]")) return SB.querySelector(".st-side").scrollIntoView({ behavior: REDUCED ? "auto" : "smooth" });
    const go = e.target.closest("[data-go]"); if (go) { st.step = go.dataset.go; drawStore(); }
  });
  SB.addEventListener("change", e => { if (e.target.name === "rating") { const v = +e.target.value; $$(".st-stars label", SB).forEach((l, i) => l.classList.toggle("on", i < v)); } });
  SB.addEventListener("submit", e => { e.preventDefault(); if (e.target.id === "revF") return sendReview(e.target);
    if (e.target.id === "trkF") { const f = new FormData(e.target); tk.id = String(f.get("id") || "").trim().toUpperCase(); tk.email = String(f.get("email") || "").trim(); return lookup(); } sendOrder(e.target, e.target.id === "notifyF" ? "waitlist" : "order"); });
  document.addEventListener("keydown", e => { if (e.key === "Escape" && !SB.hidden) closeStore(); });
  addEventListener("popstate", () => { const m = location.hash.match(/^#buy\/(.+)$/), k = location.hash.match(/^#track(?:\/(.+))?$/); if (m) openStore(m[1]); else if (k) openTrack(k[1]); else if (!SB.hidden) closeStore(true); });

  // ---------- AI chat assistant ----------
  function chat() {
    const fab = document.createElement("button"), box = document.createElement("div");
    fab.className = "cb-fab"; fab.type = "button"; fab.setAttribute("aria-label", t("chatName"));
    fab.innerHTML = `${ic("spark")}<span class="l">${esc(t("chatFab"))}</span><span class="dot"></span>`;
    box.className = "cb"; box.hidden = true; box.setAttribute("role", "dialog"); box.setAttribute("aria-label", t("chatName"));
    box.innerHTML = `<header class="cb-h"><span class="cb-av"><img src="icon.svg" alt=""></span><span><b>${esc(t("chatName"))}</b><small><i></i>${esc(t("chatSub"))}</small></span><button type="button" data-cb-x aria-label="Close">${ic("x")}</button></header>
      <div class="cb-log" aria-live="polite"></div><div class="cb-chips"></div>
      <form class="cb-f"><textarea rows="1" placeholder="${esc(t("chatPh"))}" aria-label="${esc(t("chatPh"))}" maxlength="1000"></textarea><button type="submit" aria-label="Send">${ic("send")}</button></form>
      <p class="cb-foot">${esc(t("chatFoot"))} <a href="${waLink("Hi " + AGENCY.name + ", I have a question.")}" target="_blank" rel="noopener">${esc(t("chatHuman"))}</a>.</p>`;
    document.body.append(fab, box);
    const log = $(".cb-log", box), ta = $("textarea", box), send = $(".cb-f button", box), chips = $(".cb-chips", box);
    let msgs = []; try { msgs = JSON.parse(sessionStorage.getItem("av-chat") || "[]"); } catch {}
    const keep = () => { try { sessionStorage.setItem("av-chat", JSON.stringify(msgs.slice(-30))); } catch {} };
    const nameOf = s => (shopItems().find(x => slug(x.n) === s) || {}).n;
    // Bot text: escaped, then **bold**, "- " bullets, site links (#buy/…, #track/…) and web links.
    const fmt = s => {
      let h = esc(s).replace(/\*\*(.+?)\*\*/g, "<b>$1</b>");
      h = h.replace(/(^|[\s(])#buy\/([a-z0-9-]+)/g, (m, a, sl) => `${a}<a href="#buy/${sl}" data-buy="${sl}">${esc(nameOf(sl) || "View product")}</a>`);
      h = h.replace(/(^|[\s(])#track(?:\/([A-Z0-9-]+))?/g, (m, a, id) => `${a}<a href="#track${id ? "/" + id : ""}" data-track="${id || ""}">${esc(t("trackNav"))}</a>`);
      h = h.replace(/(^|[\s(])#(quote|pricing|shop|faq)\b/g, (m, a, k) => `${a}<a href="#${k}" data-cb-go>${k === "quote" ? "quote form" : k}</a>`);
      h = h.replace(/(https?:\/\/[^\s<)]+[^\s<).,])/g, u => `<a href="${u}" target="_blank" rel="noopener">${u.replace(/^https?:\/\/(www\.)?/, "").slice(0, 40)}</a>`);
      const lines = h.split(/\n/); let out = "", inL = false;
      lines.forEach(l => { const m = l.match(/^\s*[-*•]\s+(.*)/); if (m) { if (!inL) { out += "<ul>"; inL = true; } out += `<li>${m[1]}</li>`; } else { if (inL) { out += "</ul>"; inL = false; } out += (out && !out.endsWith("</ul>") ? "<br>" : "") + l; } });
      return out + (inL ? "</ul>" : "");
    };
    const bubble = (role, text) => { const d = document.createElement("div"); d.className = "cb-m " + (role === "user" ? "me" : "bot"); d.innerHTML = role === "user" ? esc(text) : fmt(text); log.appendChild(d); log.scrollTop = log.scrollHeight; return d; };
    const draw = () => { log.innerHTML = ""; bubble("bot", t("chatGreet")); msgs.forEach(m => bubble(m.role, m.text));
      chips.innerHTML = msgs.length ? "" : (UI.en.chatChips || []).map(c => `<button type="button" data-q="${esc(c[1])}">${esc(c[0])}</button>`).join(""); };
    async function ask(q) {
      q = q.trim(); if (!q || send.disabled) return;
      msgs.push({ role: "user", text: q }); keep(); bubble("user", q); chips.innerHTML = ""; ta.value = ""; ta.style.height = "";
      const wait = bubble("bot", ""); wait.innerHTML = `<span class="cb-typing"><i></i><i></i><i></i></span>`; send.disabled = true;
      let reply;
      try {
        if (!ONLINE) throw new Error(t("chatOff"));
        const r = await fetch("/api/chat", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ messages: msgs.slice(-12) }) });
        const j = await r.json().catch(() => ({})); if (!r.ok) throw new Error(j.error || t("chatOff")); reply = j.reply;
        msgs.push({ role: "bot", text: reply }); keep();
      } catch (e) { reply = e.message || t("chatOff"); }
      wait.innerHTML = fmt(reply); log.scrollTop = log.scrollHeight; send.disabled = false; ta.focus();
    }
    const open = () => { draw(); box.hidden = false; requestAnimationFrame(() => box.classList.add("on")); fab.classList.add("hide"); setTimeout(() => ta.focus(), 80); };
    const close = () => { box.classList.remove("on"); fab.classList.remove("hide"); setTimeout(() => { box.hidden = true; }, 250); };
    fab.addEventListener("click", open);
    box.addEventListener("click", e => {
      if (e.target.closest("[data-cb-x]")) return close();
      const c = e.target.closest("[data-q]"); if (c) return ask(c.dataset.q);
      if (e.target.closest("[data-buy],[data-track]") && innerWidth < 560) close();
      if (e.target.closest("[data-cb-go]")) close();
    });
    $(".cb-f", box).addEventListener("submit", e => { e.preventDefault(); ask(ta.value); });
    ta.addEventListener("keydown", e => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); ask(ta.value); } });
    ta.addEventListener("input", () => { ta.style.height = ""; ta.style.height = Math.min(120, ta.scrollHeight) + "px"; });
    document.addEventListener("keydown", e => { if (e.key === "Escape" && !box.hidden && SB.hidden) close(); });
  }

  // ---------- motion ----------
  let io;
  function watchReveal() {
    if (REDUCED || !("IntersectionObserver" in window)) { $$(".steps").forEach(s => s.classList.add("in")); return; }
    $$(".sh, .svside, .fnd, .faqg > div:first-child, .why > div, .plans .plan").forEach(el => el.classList.add("reveal"));
    $$(".grid, .svl, .works, .why, .plans, .steps, .revs, #bento").forEach(g => [...g.children].forEach((c, k) => c.style.setProperty("--i", k % 6)));
    io && io.disconnect();
    io = new IntersectionObserver(es => es.forEach(e => { if (!e.isIntersecting) return;
      const el = e.target; el.classList.remove("pre"); if (el.matches(".steps")) el.classList.add("in");
      if (el.matches("#pk") && !el.dataset.counted) { el.dataset.counted = 1; $$(".amt", el).forEach(countUp); }
      io.unobserve(el); }), { rootMargin: "0px 0px -10% 0px" });
    $$(".reveal").forEach(el => { const r = el.getBoundingClientRect(); if (r.top > innerHeight) { el.classList.add("pre"); io.observe(el); } });
    $$(".steps, #pk").forEach(el => io.observe(el));
  }
  const top = $("#top"), links = $$("nav.main a"), secs = links.map(a => $(a.getAttribute("href")));
  function onScroll() {
    top.classList.toggle("scrolled", document.documentElement.scrollTop > 8);
    let cur = -1; secs.forEach((s, i) => { if (s && s.getBoundingClientRect().top < 140) cur = i; });
    links.forEach((a, i) => a.classList.toggle("on", i === cur));
  }
  addEventListener("scroll", onScroll, { passive: true });

  // ---------- events ----------
  document.addEventListener("click", e => {
    const s1 = e.target.closest("[data-sl]"); if (s1) return goSlide(sl + +s1.dataset.sl);
    const s2 = e.target.closest("[data-slt]"); if (s2) return goSlide(+s2.dataset.slt);
    const c = e.target.closest("[data-cat]"); if (c) { cat = c.dataset.cat; renderShop(); watchReveal(); return; }
    const tb = e.target.closest("[data-t]"); if (tb) { tab = tb.dataset.t; renderPricing(); return swapPlans(); }
    if (e.target.closest("[data-review]")) { e.preventDefault(); return openReview(); }
    const by = e.target.closest("[data-buy]"); if (by) { e.preventDefault(); return openStore(by.dataset.buy, by.dataset.pl); }
    const tr = e.target.closest("[data-track]"); if (tr) { e.preventDefault(); return openTrack(tr.dataset.track || ""); }
    const pick = e.target.closest("[data-pick]");
    if (pick) {
      const sel = $("#fService"), v = pick.dataset.pick;
      if (![...sel.options].some(o => o.value === v)) sel.insertAdjacentHTML("beforeend", `<option>${esc(v)}</option>`);
      sel.value = v; setTimeout(() => $("#fName").focus({ preventScroll: true }), 500);
    }
    if (e.target.closest("nav.main a")) { $("#nav").classList.remove("open"); $("#menu").setAttribute("aria-expanded", "false"); }
  });
  $("#menu").addEventListener("click", () => { const o = $("#nav").classList.toggle("open"); $("#menu").setAttribute("aria-expanded", String(o)); });
  $("#theme").addEventListener("click", () => {
    const root = document.documentElement;
    const light = (root.dataset.theme || "dark") === "light";
    root.dataset.theme = light ? "dark" : "light"; store.set("av-theme", root.dataset.theme);
  });
  const savedTheme = store.get("av-theme");
  if (savedTheme) document.documentElement.dataset.theme = savedTheme;

  // ---------- contact ----------
  const waNum = () => String(SITE.whatsapp || "").replace(/\D/g, "");
  const waLink = msg => `https://wa.me/${waNum()}${msg ? "?text=" + encodeURIComponent(msg) : ""}`;
  function setContact() {
    $("#wa").textContent = SITE.phone || "+" + waNum(); $("#mail").textContent = SITE.email || "";
    $("#waLine").href = waLink(`Hi ${AGENCY.name}, I'd like to talk about a project.`);
    $("#mailLine").href = SITE.email ? "mailto:" + SITE.email : "#"; $("#mailLine").hidden = !SITE.email;
    $("#fwa").href = $("#fwa2").href = $("#waLine").href;
    $("#bookCall").href = $("#bookCall2").href = waLink(`Hi ${AGENCY.name}, I'd like to book a short call about a project.`);
  }
  function setLinks() {
    ["#founderLink", "#footFounder"].forEach(s => $(s).href = AGENCY.portfolio + "/");
    $("#allProjects").href = AGENCY.portfolio + "/projects/";
    [["#gh", "github"], ["#li", "linkedin"], ["#fb", "facebook"], ["#yt", "youtube"]].forEach(([id, k]) => { const a = $(id); const on = SITE[k] && SITE[k] !== "none"; a.href = on ? SITE[k] : "#"; a.hidden = !on; });
  }
  setContact(); setLinks();
  $("#yr").textContent = new Date().getFullYear();

  // Quote form: saved for the owner (admin > Orders > Quotes). Nothing opens WhatsApp unless the buyer chooses it.
  const note = (txt, cls) => { const n = $("#fnote"); n.textContent = txt; n.className = "note" + (cls ? " " + cls : ""); };
  $("#brief").addEventListener("submit", async e => {
    e.preventDefault();
    const F = e.target, f = Object.fromEntries(new FormData(F).entries());
    if (!f.name.trim() || !/^\S+@\S+\.\S+$/.test(f.email) || !f.notes.trim()) return note(t("fNeed"), "err");
    const btn = F.querySelector('[type="submit"]'); btn.disabled = true; note(t("qSending"));
    try {
      const id = await post({ kind: "quote", product: f.service || "Custom project", ...f });
      note(t("qDone").replace("{id}", id), "ok"); F.reset(); renderForm();
    } catch (err) { note(err.message || t("coFail"), "err"); }
    btn.disabled = false;
  });

  // ---------- start ----------
  renderBand(); renderAll(); onScroll();
  { const m0 = location.hash.match(/^#buy\/(.+)$/), k0 = location.hash.match(/^#track(?:\/(.+))?$/); if (m0) openStore(m0[1]); else if (k0) openTrack(k0[1]); }
  chat();
  if (ONLINE) fetch("/api/site").then(r => r.ok ? r.json() : null).then(j => {
    if (!j || !j.content) return;
    EDIT = { ...EDIT, ...j.content };
    if (Array.isArray(EDIT.hide)) HIDE = EDIT.hide;
    if (EDIT.data && typeof applyEdits === "function") {
      const X = applyEdits({ SITE, SERVICES, PACKAGES, FAQ, AGENCY }, EDIT.data);
      SERVICES.splice(0, SERVICES.length, ...X.SERVICES); FAQ.splice(0, FAQ.length, ...X.FAQ);
      Object.assign(PACKAGES, X.PACKAGES); Object.assign(SITE, X.SITE); AGENCY.base = X.AGENCY.base;
      STATS = X.STATS; FEATURED = X.FEATURED; AGENCY.name = X.AGENCY.name; AGENCY.portfolio = X.AGENCY.portfolio;
      IMGO = EDIT.data.images || {}; setContact(); setLinks();
    }
    if (EDIT.brand?.accent) document.documentElement.style.setProperty("--accent", EDIT.brand.accent);
    if (EDIT.brand?.mode && EDIT.brand.mode !== "auto" && !savedTheme) document.documentElement.dataset.theme = EDIT.brand.mode;
    renderAll(); if (!SB.hidden && st.p && st.step !== "review") { const k = slug(st.p.n); st.p = shopItems().find(x => slug(x.n) === k) || st.p; if (st.step === "product") drawStore(); }
  }).catch(() => {});
})();
