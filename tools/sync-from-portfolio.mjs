// Copies the latest projects, services, packages and contact details from the founder's portfolio.
// Usage: npm run sync   (then commit and push)
import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const BASE = "https://raw.githubusercontent.com/uowyeasin-cyber/protpolio-2/main";
const get = async (p) => { const r = await fetch(`${BASE}/${p}`); if (!r.ok) throw new Error(`${p}: ${r.status}`); return r; };

// 1. Data file.
const content = await (await get("data/content.js")).text();
await fs.writeFile(path.join(root, "data/content.js"), content);

// 2. Project showcase (titles, covers, accents, Bangla text).
const pj = await (await get("projects/projects.json")).json();
const base = (u) => u.split("/").pop().replace(/\.webp$/, "");
const out = {};
for (const p of pj.projects || []) {
  const pick = (L = {}) => ({ kicker: L.kicker || "", title: L.title || "", em: L.em || "", lead: L.lead || "", status: L.status || "", feats: (L.feats || []).slice(0, 4).map((f) => [f[1], f[2]]) });
  out[p.name] = { slug: p.slug, url: p.url, cover: base(p.cover), accent: p.accent, stage: p.stage, demo: p.demo || "", en: pick(p.en), bn: pick(p.bn) };
}
for (const p of pj.products || []) out[p.name] = { url: p.url, cover: base(p.cover), stage: p.stage, product: true, en: p.en, bn: p.bn || {} };
await fs.writeFile(path.join(root, "data/projects.js"), "// Generated from the portfolio's /projects/projects.json by tools/sync-from-portfolio.mjs\nconst SHOWCASE = " + JSON.stringify(out, null, 1) + ";\n");

// 3. Images the data points to.
const names = new Set([...content.matchAll(/(?:img|cover):"([a-z0-9-]+)"/g)].map((m) => m[1]));
Object.values(out).forEach((p) => names.add(p.cover));
let added = 0;
for (const n of names) {
  const f = /^(dev-|cover-|me-)/.test(n) ? `${n}.webp` : `${n}-t.webp`;
  const dest = path.join(root, "img", f);
  try { await fs.access(dest); continue; } catch {}
  try { await fs.writeFile(dest, Buffer.from(await (await get(`img/${f}`)).arrayBuffer())); added++; } catch (e) { console.log("skip", f); }
}
console.log(`Synced from the portfolio. ${Object.keys(out).length} showcase entries, ${added} new images.`);
