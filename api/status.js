// Owner only: which services are switched on in Vercel.
import { guard, send, store } from "./_lib.js";
export default function handler(req, res) {
  if (!guard(req, res)) return;
  send(res, 200, { storage: store.usesBlob(), ai: Boolean(process.env.GEMINI_API_KEY), model: process.env.GEMINI_MODEL || "gemini-2.5-flash" });
}
