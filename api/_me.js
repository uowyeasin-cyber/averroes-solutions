import { session, send } from "./_lib.js";

export default function handler(req, res) {
  const s = session(req);
  send(res, 200, { email: s ? s.email : null });
}
