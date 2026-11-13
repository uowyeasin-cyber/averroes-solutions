// Order lookup shared by the public tracking endpoint (api/order.js) and the chat assistant (api/chat.js).
// A customer sees an order only when they give both its number and the email used at checkout.
import { store } from "./_lib.js";

export const ORDER_ID = /\b(AV|QT|WL)-[0-9A-F]{6}\b/i;

// What each status means to a customer.
export const STATUS_TEXT = {
  new: ["Received", "We have your order and will contact you within 24 hours to confirm the details."],
  contacted: ["Confirmed", "We have been in touch and agreed the details. The invoice follows."],
  paid: ["In progress", "Payment received. We are setting up your product."],
  done: ["Delivered", "Your product is live and handed over."],
  cancelled: ["Cancelled", "This order was cancelled. Contact us if that is a mistake."],
};

const norm = (s) => String(s || "").trim().toLowerCase();

// Returns the order if the number and email match, otherwise null.
export async function findOrder(id, email) {
  const clean = String(id || "").toUpperCase().replace(/[^A-Z0-9-]/g, "");
  if (!ORDER_ID.test(clean) || !/^\S+@\S+\.\S+$/.test(String(email || ""))) return null;
  const item = (await store.list("orders/")).find((i) => i.pathname.includes(`-${clean}-`));
  if (!item) return null;
  const o = await store.getJSON(item);
  return norm(o.email) === norm(email) ? o : null;
}

// The fields a customer may see on their receipt.
export function publicView(o) {
  const [label, text] = STATUS_TEXT[o.status] || STATUS_TEXT.new;
  return { id: o.id, kind: o.kind, at: o.at, updated: o.updated || null, status: o.status || "new", statusLabel: label, statusText: text,
    product: o.product, plan: o.plan, price: o.price, pay: o.pay, name: o.name, email: o.email, phone: o.phone, business: o.business,
    country: o.country, domain: o.domain, service: o.service, budget: o.budget };
}

// Small per-instance limiter so nobody can guess order numbers in bulk.
const hits = new Map();
export function limited(req, max, windowMs) {
  const ip = String(req.headers["x-forwarded-for"] || req.socket?.remoteAddress || "?").split(",")[0].trim();
  const now = Date.now(), list = (hits.get(ip) || []).filter((t) => now - t < windowMs);
  list.push(now); hits.set(ip, list);
  if (hits.size > 5000) hits.clear();
  return list.length > max;
}
