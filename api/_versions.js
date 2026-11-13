import { guard, store, send, versionId } from "./_lib.js";

export default async function handler(req, res) {
  if (!guard(req, res)) return;
  try {
    const items = await store.list("site/");
    send(res, 200, { versions: items.slice(0, 200).map((i) => ({ id: versionId(i.pathname), at: i.uploadedAt, size: i.size })) });
  } catch {
    send(res, 500, { error: "Server error." });
  }
}
