// Shared Gemini tasks for the admin AI buttons and the weekly autopilot.
export const BRIEF = `You write for Averroes Solutions, a small digital agency (apps, websites, online stores, UI/UX, SEO, AI agents and automation, logo and brand design, menus, social media design, video). Clients are in Malaysia, Bangladesh, the USA and worldwide. Founder: Yeasin Arafat. Own products: Amalnama, Averroes Code, Easy Life. Write plainly and specifically, never invent client names, reviews, awards or numbers. Prefer real search phrases people type into Google.`;

export const TASKS = {
  // SEO title, description and keywords for one page.
  meta: (i) => ({
    prompt: `Write SEO metadata for this page.\nPage type: ${i.type}\nPage name: ${i.name}\nTarget keyword (may be empty): ${i.keyword || ""}\nMarket: ${i.market || "Malaysia and Bangladesh"}\nLanguage: ${i.lang === "bn" ? "Bangla" : "English"}\nPage content:\n${String(i.content || "").slice(0, 4000)}\n\nRules: title 45-60 characters with the main keyword near the start and the brand "Averroes Solutions" at the end if it fits; description 140-158 characters, a clear benefit and a call to action; 6-10 keywords people actually search, mixing short and long-tail, include Bangla phrases if useful.`,
    schema: { type: "object", properties: { title: { type: "string" }, desc: { type: "string" }, kw: { type: "string" }, why: { type: "string" } }, required: ["title", "desc", "kw"] },
  }),
  // Keyword ideas for a topic, grouped by intent.
  keywords: (i) => ({
    prompt: `Suggest search keywords for: "${i.topic}". Market: ${i.market || "Malaysia and Bangladesh"}. Give 12-20 keywords grouped by search intent (buy, compare, learn, local). For each give an estimated difficulty (low/medium/high) for a new small site and the page type that should target it. Include Bangla keywords when the market includes Bangladesh.`,
    schema: { type: "object", properties: { groups: { type: "array", items: { type: "object", properties: { intent: { type: "string" }, items: { type: "array", items: { type: "object", properties: { k: { type: "string" }, diff: { type: "string" }, page: { type: "string" } }, required: ["k", "diff"] } } }, required: ["intent", "items"] } }, tip: { type: "string" } }, required: ["groups"] },
  }),
  // A complete landing page that targets one keyword.
  topic: (i) => ({
    prompt: `Write a landing page that can rank on Google for the keyword "${i.keyword}".\nLanguage: ${i.lang === "bn" ? "Bangla" : "English"}. Market: ${i.market || "Malaysia and Bangladesh"}.\nService it sells: ${i.service || "choose the best-fitting service"}.\nNotes from the owner: ${i.notes || "none"}\n\nStructure: a specific H1 (not identical to the title), a 2-3 sentence intro that answers the search directly, 4-6 sections with H2 headings and 60-120 word paragraphs (cover what it is, who it is for, what is included, how the process works, price guidance in ranges with "from", and why this agency), 4-6 FAQs people really ask, and a one-line call to action. Use the keyword and close variants naturally, never stuffed. Also give a URL slug (lowercase, hyphens, Latin letters even for Bangla), an SEO title (45-60 chars) and meta description (140-158 chars).`,
    schema: { type: "object", properties: { slug: { type: "string" }, title: { type: "string" }, desc: { type: "string" }, kw: { type: "string" }, h1: { type: "string" }, intro: { type: "string" }, sections: { type: "array", items: { type: "object", properties: { h: { type: "string" }, p: { type: "string" } }, required: ["h", "p"] } }, faq: { type: "array", items: { type: "array", items: { type: "string" } } }, cta: { type: "string" } }, required: ["slug", "title", "desc", "h1", "intro", "sections", "faq"] },
  }),
  // Concrete fixes for a page that scored low.
  improve: (i) => ({
    prompt: `Review this page's SEO and give the 3-6 most useful fixes, most important first. Be concrete (say exactly what to change).\nTarget keyword: ${i.keyword || "(none set)"}\nTitle: ${i.title}\nDescription: ${i.desc}\nContent:\n${String(i.content || "").slice(0, 5000)}`,
    schema: { type: "object", properties: { fixes: { type: "array", items: { type: "string" } } }, required: ["fixes"] },
  }),
  // Rewrite any text (hero line, service intro) in a chosen tone.
  rewrite: (i) => ({
    prompt: `Rewrite this text for a premium, plain-spoken agency website. Keep the meaning, keep it about the same length or shorter, ${i.lang === "bn" ? "write in natural Bangla" : "write in English"}. ${i.goal ? "Goal: " + i.goal : ""}\n\nText:\n${i.text}`,
    schema: { type: "object", properties: { options: { type: "array", items: { type: "string" } } }, required: ["options"] },
  }),
  // Questions buyers really ask, with answers.
  faq: (i) => ({
    prompt: `Write 5 FAQ entries for the agency's home page. Services: ${i.services}. Questions already on the page (do not repeat): ${i.existing || "none"}. Each answer 1-3 short sentences, practical, no invented numbers or guarantees.`,
    schema: { type: "object", properties: { faq: { type: "array", items: { type: "array", items: { type: "string" } } } }, required: ["faq"] },
  }),
  // Premium rewrite of several website texts at once. Input is JSON {key: text}.
  copy: (i) => ({
    prompt: `Rewrite each of these website texts so the agency sounds premium, confident and trustworthy, in plain English. Keep each about the same length or shorter, keep facts unchanged, no invented numbers. heroA + heroEm form one headline (heroEm is the 1-4 highlighted words at the end). Return one item per key.\n\n${String(i.text || "").slice(0, 6000)}`,
    schema: { type: "object", properties: { items: { type: "array", items: { type: "object", properties: { key: { type: "string" }, text: { type: "string" } }, required: ["key", "text"] } } }, required: ["items"] },
  }),
};

// Runs one task on Gemini and returns the parsed JSON result.
export async function runAI(task, input) {
  const key = process.env.GEMINI_API_KEY;
  if (!key) throw Object.assign(new Error("AI is off. Add GEMINI_API_KEY in Vercel → Settings → Environment Variables, then redeploy."), { status: 503 });
  const make = TASKS[task];
  if (!make) throw Object.assign(new Error("Unknown task."), { status: 400 });
  const { prompt, schema } = make(input || {});
  const model = process.env.GEMINI_MODEL || "gemini-2.5-flash";
  const r = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent`, {
    method: "POST",
    headers: { "Content-Type": "application/json", "x-goog-api-key": key },
    body: JSON.stringify({
      systemInstruction: { parts: [{ text: BRIEF }] },
      contents: [{ role: "user", parts: [{ text: prompt }] }],
      generationConfig: { temperature: 0.6, responseMimeType: "application/json", responseSchema: schema },
    }),
  });
  const j = await r.json();
  if (!r.ok) throw Object.assign(new Error("AI error: " + (j.error?.message || r.status)), { status: 502 });
  const text = j.candidates?.[0]?.content?.parts?.map((p) => p.text).join("") || "{}";
  return JSON.parse(text);
}
