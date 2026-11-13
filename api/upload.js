// Photo uploads for the admin (owner only).
// GET: the media library (every photo uploaded before, newest first).
// POST { name, type, data }: saves one image (base64) and returns its public URL.
import { guard, readJSON, send, store, slugify } from "./_lib.js";

const TYPES = { "image/webp": "webp", "image/png": "png", "image/jpeg": "jpg", "image/gif": "gif", "image/avif": "avif" };

export default async function handler(req, res) {
  try {
    if (req.method === "GET") {
      if (!guard(req, res)) return;
      const items = await store.list("media/");
      return send(res, 200, { items: items.slice(0, 300).map((i) => ({ url: i.url, name: i.pathname.replace(/^media\//, ""), size: i.size })) });
    }
    if (req.method !== "POST") return send(res, 405, { error: "GET or POST only." });
    if (!guard(req, res, { write: true })) return;
    const b = await readJSON(req, 4_200_000);
    const ext = TYPES[b.type];
    if (!ext) return send(res, 400, { error: "Use a JPG, PNG, WebP, GIF or AVIF image." });
    const buf = Buffer.from(String(b.data || ""), "base64");
    if (!buf.length) return send(res, 400, { error: "The image is empty." });
    if (buf.length > 3_000_000) return send(res, 413, { error: "The image is over 3 MB. Try a smaller one." });
    const id = new Date().toISOString().replace(/[:.]/g, "-");
    const url = await store.put(`media/${id}-${slugify(b.name || "photo").slice(0, 40) || "photo"}.${ext}`, buf, b.type);
    send(res, 200, { url });
  } catch (e) {
    send(res, e.status || 500, { error: e.status === 413 ? "The image is too large." : e.status ? e.message : "Upload failed." });
  }
}
