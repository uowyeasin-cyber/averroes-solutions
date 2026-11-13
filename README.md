# Averroes Solutions · agency website

The agency site for Averroes Solutions. It is a separate website from the founder's portfolio
(yeasinarafatbd.vercel.app) but uses the same projects, services, packages and contact details.

## What's inside
```
home.html          the public site (served at /)
app.js             renders services, work, products, packages, FAQ, contact form, EN/বাংলা switch
data/content.js    copy of the portfolio's data file (projects, services, packages, FAQ, contact)
data/agency.js     agency-only settings: name, facts, process, hidden projects, Bangla text
admin/             the admin panel at /admin (owner only)
api/               Vercel functions: sign-in, settings, AI, service + guide pages, sitemap, IndexNow
tools/             sync from portfolio, password hasher, local dev server
```

## Admin panel (/admin)
- **Overview**: an SEO score for every page and the pages to fix first.
- **Pages & SEO**: Google preview, title, description, keywords, H1 and intro for the home page and every
  service page, with a live checklist. AI writes titles and descriptions and says how to rank higher.
- **Guides**: type a keyword ("ecommerce website price Bangladesh"); AI writes a full page with sections and FAQ.
  Check it, switch it to Live, publish. It appears at /guides/<slug>, in the sitemap and the footer.
- **Keyword ideas**: AI suggests real searches by intent and difficulty; one tap turns one into a guide.
- **Website text** (English and Bangla), **Look & feel** (brand colour, default light/dark), **Publish & history**
  (every publish is a version you can restore), **Setup** (Search Console code, IndexNow ping).

Service and guide pages are rendered on the server with meta tags, canonical URLs and JSON-LD
(Service, Article, FAQPage, BreadcrumbList), so search engines read them without running JavaScript.

## Deploy on Vercel (free)
1. Import this repository in Vercel. Project name `averroes-solutions` gives `averroes-solutions.vercel.app`.
2. Storage → Create → **Blob** → connect it to the project (adds `BLOB_READ_WRITE_TOKEN`).
3. Settings → Environment Variables:
   - `OWNER_EMAIL` – your sign-in email
   - `OWNER_PASSWORD_HASH` – run `npm run hash "your password"` and paste the result
   - `GEMINI_API_KEY` – free key from aistudio.google.com (turns on the AI buttons)
4. Redeploy, open `/admin`, sign in.
5. In Google Search Console add the site, paste the verification code in Admin → Setup, publish,
   then submit `/sitemap.xml`.

## Keep it in step with the portfolio
After you add a project or service on the portfolio, run `npm run sync`, commit and push.

## Run locally
```
OWNER_EMAIL=you@example.com OWNER_PASSWORD=test node tools/dev-server.mjs
```
Then open http://localhost:3000 and http://localhost:3000/admin/. Saved settings go to `.admin-data/`.
