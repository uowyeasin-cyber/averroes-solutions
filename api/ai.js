// AI helper for the admin (owner only). Uses Google Gemini with the GEMINI_API_KEY set in Vercel.
// POST { task, input }  ->  JSON shaped for that task.
import { guard, readJSON, send } from "./_lib.js";
import { runAI } from "./_ai.js";

export default async function handler(req, res) {
  if (req.method !== "POST") return send(res, 405, { error: "POST only." });
  if (!guard(req, res, { write: true })) return;
  let body;
  try { body = await readJSON(req, 100_000); } catch { return send(res, 400, { error: "Bad request." }); }
  try {
    send(res, 200, { result: await runAI(body.task, body.input) });
  } catch (e) {
    send(res, e.status || 502, { error: e.status ? e.message : "AI did not answer. Try again." });
  }
}
