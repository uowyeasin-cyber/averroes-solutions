// Orders, custom quote requests, client reviews and "notify me" sign-ups from the site.
// POST (public): saves one order, returns its number. Nothing is charged; the owner sends the invoice.
// GET ?id=&email= (public): one order, only when the number and checkout email match (receipt and tracking).
// GET (owner): every order, newest first. PATCH (owner) { id, status }: marks an order new / contacted / paid / done / cancelled.
import crypto from "node:crypto";
import { guard, query, readJSON, send, store } from "./_lib.js";
import { findOrder, publicView, limited } from "./_orders.js";

const STATUS = ["new", "contacted", "paid", "done", "cancelled"];
const clip = (v, n) => String(v ?? "").trim().slice(0, n);

export default async function handler(req, res) {
  try {
    if (req.method === "POST") {
      const b = await readJSON(req, 20_000);
      if (b.website) return send(res, 200, { id: "AV-OK" }); // bots fill the hidden field
      const kind = ["waitlist", "quote", "review"].includes(b.kind) ? b.kind : "order";
      const o = {
        kind, product: clip(b.product, 120), plan: clip(b.plan, 80), price: clip(b.price, 40),
        name: clip(b.name, 120), email: clip(b.email, 160), phone: clip(b.phone, 40), business: clip(b.business, 160),
        country: clip(b.country, 60), domain: clip(b.domain, 160), notes: clip(b.notes, 2000), pay: clip(b.pay, 80),
        budget: clip(b.budget, 60), service: clip(b.service, 160), role: clip(b.role, 80),
        rating: Math.min(5, Math.max(1, parseInt(b.rating, 10) || 5)),
      };
      if (!o.product || !o.name || !/^\S+@\S+\.\S+$/.test(o.email)) return send(res, 400, { error: "Please add your name and a valid email." });
      if (kind === "order" && o.phone.replace(/\D/g, "").length < 7) return send(res, 400, { error: "Please add a phone or WhatsApp number." });
      const id = ({ order: "AV-", quote: "QT-", waitlist: "WL-", review: "RV-" })[kind] + crypto.randomBytes(3).toString("hex").toUpperCase();
      const at = new Date().toISOString();
      // The long random part keeps the file address unguessable (the store is public).
      await store.put(`orders/${at.replace(/[:.]/g, "-")}-${id}-${crypto.randomBytes(16).toString("hex")}.json`, JSON.stringify({ id, at, status: "new", ...o }), "application/json");
      return send(res, 200, { id });
    }
    if (req.method === "GET") {
      const q = query(req);
      if (q.get("id")) {
        if (limited(req, 20, 10 * 60e3)) return send(res, 429, { error: "Too many tries. Please wait a few minutes." });
        const o = await findOrder(q.get("id"), q.get("email"));
        return o ? send(res, 200, { order: publicView(o) }) : send(res, 404, { error: "We could not find that order. Check the order number and the email you used at checkout." });
      }
      if (!guard(req, res)) return;
      const items = (await store.list("orders/")).slice(0, 300);
      const orders = (await Promise.all(items.map((i) => store.getJSON(i).then((o) => ({ ...o, file: i.pathname })).catch(() => null)))).filter(Boolean);
      return send(res, 200, { orders });
    }
    if (req.method === "PATCH") {
      if (!guard(req, res, { write: true })) return;
      const b = await readJSON(req, 5_000);
      if (!STATUS.includes(b.status)) return send(res, 400, { error: "Unknown status." });
      const item = (await store.list("orders/")).find((i) => i.pathname.includes(`-${String(b.id).replace(/[^A-Z0-9-]/gi, "")}-`));
      if (!item) return send(res, 404, { error: "No such order." });
      const o = await store.getJSON(item);
      await store.put(item.pathname, JSON.stringify({ ...o, status: b.status, updated: new Date().toISOString() }), "application/json", { overwrite: true });
      return send(res, 200, { ok: true });
    }
    send(res, 405, { error: "GET, POST or PATCH only." });
  } catch (e) {
    send(res, e.status || 500, { error: e.status ? e.message : "Could not save. Please try again." });
  }
}
