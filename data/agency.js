// ============================================================
// Agency settings. Everything that is ONLY for the agency site lives here.
// Projects, services, packages, FAQ and contact details come from
// data/content.js and data/projects.js, copies of the portfolio's data
// (run `npm run sync` to refresh them).
// ============================================================

const AGENCY = {
  name: "Averroes Solutions",
  short: "Averroes",
  // The founder's portfolio. Every "Founder" link goes here.
  portfolio: "https://yeasinarafatbd.vercel.app",
  url: "https://averroes-solutions.vercel.app",
  base: { en: "Kuala Lumpur · Dhaka · remote worldwide", bn: "কুয়ালালামপুর · ঢাকা · সারা বিশ্বে রিমোট" },
};

// Portfolio projects to hide from the agency (by name). The admin panel can change this.
const AGENCY_HIDE = ["This portfolio", "Animated login & sign-up", "Tic Tac Toe: Unbeatable AI", "Online Food Ordering System", "Sakina Nest"];

// Rename or relink a portfolio project only on the agency site.
const AGENCY_OVERRIDE = {
  "Super Note": { n: "Easy Life", link: ["See plans & live demo", "/easy-life/"] },
};

// Our own products, in this order.
const AGENCY_PRODUCTS = ["Amalnama", "Averroes Code", "Easy Life"];
// Case studies shown large, in this order (software by name, brand work by slug).
const AGENCY_FEATURED = ["Sunnah Store", "halal-gyro-spot", "AI Agent Front Desk"];

// Products for sale. status "soon" shows the product under "Coming soon" (no checkout, a "Notify me" button instead).
// Every field, plan and price can be changed in the admin (Projects & shop). Prices here are starting suggestions.
const AGENCY_SHOP = [
  { n: "Storefront Pro", from: "Sunnah Store", tag: "E-commerce store", img: "bn-storefront-pro", demo: "https://sunnahstore.vercel.app/", page: "https://yeasinarafatbd.vercel.app/storefront-pro/",
    lead: "The complete online store behind Sunnah Store, ready for your brand: storefront, admin panel, online payments and courier tracking.",
    plans: [
      { t: "Starter", price: "USD 299", d: "Live in 5 days", l: ["Storefront with your logo, colours and products", "Up to 50 products added for you", "Cash on delivery and one online payment method", "Launched on a free subdomain"] },
      { t: "Business", price: "USD 499", d: "Live in 7 days", pop: true, l: ["Everything in Starter", "Admin panel with offers and order reports", "Stripe, PayPal or SSLCommerz payments", "Your own domain and Google setup", "30 days of support"] },
      { t: "Premium", price: "USD 899", d: "Live in 14 days", l: ["Everything in Business", "Courier booking and live tracking", "Custom pages and features", "Product SEO and speed tuning", "90 days of support"] },
    ] },
  { n: "Portfolio Studio", tag: "Portfolio website", img: "bn-portfolio-studio", demo: "https://yeasinarafatbd.vercel.app/",
    plans: [
      { t: "Starter", price: "USD 99", d: "Live in 3 days", l: ["Your text, photos and projects", "Light and dark themes", "Launched on a free subdomain"] },
      { t: "Business", price: "USD 199", d: "Live in 5 days", pop: true, l: ["Everything in Starter", "Private editor to change anything yourself", "Printable résumé and case study pages", "Your own domain and Google setup"] },
      { t: "Premium", price: "USD 349", d: "Live in 10 days", l: ["Everything in Business", "Custom design touches for your brand", "SEO for your name and services", "60 days of support"] },
    ] },
  { n: "Tic Tac Toe: Unbeatable AI", tag: "Browser game", img: "bn-tic-tac-toe",
    plans: [
      { t: "Source code", price: "USD 29", d: "Instant delivery", l: ["Full source code", "Licence for one website", "Setup guide"] },
      { t: "Branded", price: "USD 79", d: "Ready in 2 days", pop: true, l: ["Your name, logo and colours", "Published on your website", "Mobile-ready"] },
      { t: "Custom", price: "USD 149", d: "Ready in 5 days", l: ["Everything in Branded", "New themes or levels", "Score board for your visitors"] },
    ] },
  { n: "Animated login & sign-up", tag: "UI component", img: "bn-animated-login",
    plans: [
      { t: "Source code", price: "USD 19", d: "Instant delivery", l: ["HTML, CSS and JavaScript", "Licence for one project", "Setup guide"] },
      { t: "Branded", price: "USD 49", d: "Ready in 2 days", pop: true, l: ["Styled to your brand", "Connected to your form or backend", "Mobile-ready"] },
      { t: "Connected", price: "USD 99", d: "Ready in 4 days", l: ["Everything in Branded", "Real sign-in with Firebase or Supabase", "Password reset and social sign-in"] },
    ] },
  { n: "AI Front Desk", from: "AI Agent Front Desk", tag: "AI agent", img: "bn-ai-front-desk", demo: "https://yeasinarafatbd.vercel.app/demo/ai-agent.html", status: "soon",
    lead: "An AI assistant that answers customers, takes bookings and orders, and hands over to your team when it should. In final testing." },
];

// Same-size banners (1600x1000) for the work cards, in each project's own colours.
const AGENCY_BANNERS = { "Sunnah Store": "bn-storefront-pro", "halal-gyro-spot": "bn-halal-gyro-spot", "AI Agent Front Desk": "bn-ai-front-desk" };

// How a project runs. The order is real: each step needs the one before it.
const AGENCY_PROCESS = [
  { en: ["Brief", "Tell us the goal on WhatsApp or the form. We ask the questions that matter and reply within 24 hours.", "Day 1"],
    bn: ["ব্রিফ", "WhatsApp বা ফর্মে লক্ষ্যটা বলুন। দরকারি প্রশ্ন করে ২৪ ঘণ্টার মধ্যে উত্তর দিই।", "১ম দিন"] },
  { en: ["Fixed quote", "Scope, price and dates in writing. Nothing starts until you approve it.", "Day 2–3"],
    bn: ["নির্দিষ্ট কোটেশন", "কাজের পরিধি, দাম আর তারিখ লিখিতভাবে। আপনার অনুমোদন ছাড়া কাজ শুরু হয় না।", "২–৩ দিন"] },
  { en: ["Design & build", "You follow progress on a live preview link every week and comment right on it.", "Weekly previews"],
    bn: ["ডিজাইন ও তৈরি", "প্রতি সপ্তাহে লাইভ প্রিভিউ লিংকে অগ্রগতি দেখবেন, সেখানেই মন্তব্য করবেন।", "সাপ্তাহিক প্রিভিউ"] },
  { en: ["Launch & care", "We publish it, hand over the files and code, and stay on for fixes after launch.", "Launch day →"],
    bn: ["লঞ্চ ও সাপোর্ট", "আমরা লাইভ করি, ফাইল ও কোড বুঝিয়ে দিই, লঞ্চের পরেও পাশে থাকি।", "লঞ্চের পরেও"] },
];

// Bangla text for the portfolio's service cards (matched by their "go" slug).
const SERVICE_BN = {
  "app-development": ["মোবাইল ও ওয়েব অ্যাপ", "অফলাইনে চলে, একাধিক ভাষায়, লগইন, ডেটা আর পেমেন্টসহ অ্যাপ।"],
  "website-development": ["ওয়েবসাইট ও অনলাইন স্টোর", "দ্রুত ব্যবসায়িক সাইট ও স্টোর, গুগলে র‍্যাংক করার মতো করে বানানো।"],
  "ui-ux-design": ["ওয়েব ডিজাইন ও UI/UX", "Figma-তে ওয়্যারফ্রেম, অ্যাপ স্ক্রিন আর ডিজাইন সিস্টেম।"],
  "seo-services": ["SEO ও গুগল র‍্যাংকিং", "কাস্টমার যেন গুগলে আপনাকে খুঁজে পায়: কিওয়ার্ড, স্পিড, Google Business Profile।"],
  "ai-automation": ["AI এজেন্ট ও অটোমেশন", "AI কাস্টমারের উত্তর দেয়, বুকিং ও অর্ডার নেয়, একঘেয়ে কাজ নিজে করে।"],
  "portfolio-website": ["পোর্টফোলিও ওয়েবসাইট", "আপনার কাজ, রেজিউমে আর নিজে আপডেট করার এডিটরসহ পোর্টফোলিও।"],
  "logo-design": ["ব্র্যান্ড আইডেন্টিটি", "ছোট অ্যাপ আইকন থেকে দোকানের সাইনবোর্ড, সব জায়গায় মানানসই লোগো।"],
  "menu-design": ["মেনু ও প্রিন্ট", "পড়তে সহজ, প্রিন্টের জন্য তৈরি মেনু, ব্রোশিওর আর ফর্ম।"],
  "led-menu-board": ["LED ও স্ক্রিন মেনু", "কাউন্টারের ডিজিটাল মেনু বোর্ড, লাইন থেকেই দাম পড়া যায়।"],
  "social-media-design": ["সোশ্যাল মিডিয়া ডিজাইন", "পোস্ট, কভার আর রিল, পুরো ফিড যেন এক ব্র্যান্ডের মতো লাগে।"],
  "video-editing": ["ভিডিও এডিটিং", "মোশন গ্রাফিক্স আর সাউন্ডসহ প্রোমো ও ডিসপ্লে ভিডিও।"],
};

const PACKAGE_TABS_BN = { apps: "অ্যাপ", dev: "ওয়েবসাইট", uiux: "UI/UX", seo: "SEO", ai: "AI এজেন্ট", design: "ডিজাইন ও ভিডিও" };

// Interface text in both languages. Keys are used by data-i="..." in home.html.
// A key ending in "Em" is the highlighted part of a heading.
const UI = {
  en: {
    navServices: "Custom builds", navWork: "Work", navProducts: "Products", navShop: "Shop", navProcess: "Process", navPricing: "Pricing", navFounder: "About", navContact: "Get a quote",
    heroPill: "Ready-made websites, apps & AI · launch in days",
    heroA: "Launch your business online,", heroEm: "in days, not months.",
    heroLead: "Choose a finished, tested product, try the live demo for free, and we put your brand on it and launch it for you. You pay only after we confirm your order.",
    heroCta: "Shop products", heroCta2: "Get a custom quote",
    trust1: "Try the live demo first", trust2: "Your brand, set up and launched", trust3: "Fixed price, no surprises",
    stat1: "building since", stat2: "projects shipped", stat3: "own apps live", stat4: "reply on every brief",
    servicesEyebrow: "Custom builds", servicesA: "Need something custom?", servicesEm: "We build it for you.",
    servicesLead: "When a ready-made product is not enough, our team designs and builds it from scratch, with a fixed price agreed before work starts.",
    from: "From", details: "Details", ask: "Ask about this",
    workEyebrow: "Recent work", workA: "Proof it works.", workEm: "Live and in use.",
    workLead: "Real businesses run on what we build. Open any project and see it live.",
    caseStudy: "Full case study", liveDemo: "Live demo", moreWork: "More work",
    workAll: "All", workSoftware: "Apps & software", workBrand: "Brand & design",
    productsEyebrow: "Our own products", productsA: "We ship", productsEm: "our own apps.",
    productsLead: "We design, build and run these ourselves. Your project gets the same care.",
    getQuote: "Get a quote", allProjects: "See all projects", navFaq: "FAQ",
    brandLine: "Digital product studio",
    stPlans: "See plans & prices", soonTag: "Coming soon", soonShort: "Join the list", soonBtn: "Notify me", soonH2: "Coming soon", soonLead: "In final testing. Leave your email and we'll tell you first.",
    soonH: "Be the first to know", soonP: "This product is in final testing. Leave your email and we'll send you launch pricing before anyone else.", soonDone: "Thank you. You're on the list.",
    st_product: "Choose a plan", st_checkout: "Checkout", st_done: "Confirmation", stWhat: "What you get", stHow: "How it works",
    stHow1: "Place your order", stHow1p: "Pick a plan and send your details. It takes a minute.", stHow2: "We confirm and invoice", stHow2p: "We check the details with you and email a secure invoice within 24 hours.",
    stHow3: "We set up and launch", stHow3p: "Once paid, we add your brand, set it up and hand it over, live.",
    stChoose: "Choose your plan", stFree: "Try it free", stFreeP: "Open the live demo before you buy", stFreeTag: "Free", stContinue: "Continue to checkout", stTry: "Try the live demo",
    stSafe: "No payment now. You pay only after we confirm your order.", stTalkH: "Prefer to talk first?", stTalkP: "Ask anything before you order. A real person replies, usually within a few hours.", stCall: "Book a call",
    coH: "Your details", coP: "We use these to confirm your order and send the invoice. Nothing is charged today.", coName: "Full name", coEmail: "Email", coPhone: "WhatsApp or phone", coBiz: "Business name",
    coCountry: "Country", coDomain: "Domain (if you have one)", coNotes: "Anything we should know?", coNotesPh: "Your brand colours, products, a date you need it by…", coPay: "How would you like to pay?",
    payOpts: [["Card or online payment", "We email a secure payment link."], ["Bank transfer", "We email our bank details with the invoice."], ["bKash or Nagad", "For customers in Bangladesh."]],
    coAgree: "I understand work starts after the invoice is paid.", coBack: "Back", coPlace: "Place order", coSum: "Order summary", coTotal: "Total", coAfter: "Pay after we confirm. Secure invoice by email.",
    coNeed: "Please fill in your name, a valid email, your phone and tick the box.", coSending: "Sending your order…", coFail: "Could not send. Please try again or message us on WhatsApp.",
    doneH: "Order received. Thank you!", doneP: "Your order number is {id}. We'll contact you within 24 hours to confirm the details and send your invoice.", doneNo: "Order",
    done1: "We review your order", done1p: "Usually within a few hours.", done2: "You get an invoice", done2p: "By email, with your chosen payment method.", done3: "We build and launch", done3p: "You see progress and approve before launch.",
    doneWa: "Message us about this order", doneBack: "Back to the shop",
    heroSvc: "Service", heroEx: "Example project", heroSvcMore: "Explore this service", heroSeeProj: "See",
    shopEyebrow: "Shop", shopA: "Ready-made products,", shopEm: "launched for you.",
    shopLead: "Every product here is finished, tested and live. Try the demo, pick a plan, and we set it up under your brand.",
    shopPrice: "Price", shopAsk: "On request", shopBuy: "Buy now",
    processEyebrow: "How we work", processA: "Four steps.", processEm: "No surprises.",
    pricingEyebrow: "Pricing", pricingA: "Clear prices,", pricingEm: "fixed quotes.",
    pricingLead: "Starting prices for each kind of project. You get an exact quote before work begins.",
    popular: "Most popular", choose: "Choose this",
    founderEyebrow: "Meet the founder", founderA: "Founder-led.", founderEm: "Senior hands on every project.",
    founderBody: "Averroes Solutions was founded in 2017 by Yeasin Arafat. He leads every project personally, from the first call to launch day, so you always speak with the person building your product.",
    founderCta: "About the founder", bookCall: "Book a call with the founder", alsoDo: "We also do",
    faqEyebrow: "Questions", faqA: "Before you", faqEm: "ask.", faqLead: "Still unsure? Send a message and get a straight answer within a day.",
    contactEyebrow: "Start a project", contactA: "Have a project", contactEm: "in mind?",
    contactLead: "Tell us what you need and get a fixed quote within 24 hours.",
    fName: "Your name", fService: "What do you need?", fBudget: "Budget", fDetails: "A few lines about the project",
    fSend: "Send on WhatsApp", fCopy: "Copy message", copied: "Copied", fNeed: "Please add your name, a valid email and a few lines about the project.",
    orEmail: "Email", footer: "A digital studio for apps, websites, AI and brands.", footFounder: "About the founder",
    footServices: "Services", footStudio: "Studio", footContact: "Contact", likeThis: "I want something like this",
    annText: "New: a complete online store, live in 7 days, with",
    annLink: "Storefront Pro",
    heroBadge: "New",
    trustedBy: "Trusted by businesses in the USA, Malaysia and Bangladesh",
    slReady: "Ready to buy",
    slOf: "of",
    slPrev: "Previous product",
    slNext: "Next product",
    shopAll: "All products",
    soonTitle: "Launching next",
    footShop: "Shop",
    spotEyebrow: "Best seller",
    spotPlans: "Pick a plan",
    spotTry: "Try the live demo free",
    whyEyebrow: "Why Averroes",
    whyA: "Buy with",
    whyEm: "complete confidence.",
    whyLead: "No risk, no hidden costs, and a real team behind every product.",
    why1: "Try before you buy",
    why1p: "Every product has a free live demo. Click around as long as you like before you decide.",
    why2: "Pay after we confirm",
    why2p: "Nothing is charged on the website. We confirm your order first, then send a secure invoice.",
    why3: "Live in days",
    why3p: "Products are finished and tested, so we only add your brand, set it up and launch.",
    why4: "Real support",
    why4p: "A real person answers on WhatsApp and email, before and long after launch.",
    ctaEyebrow: "Let's build it",
    ctaA: "Ready to launch",
    ctaEm: "your next big thing?",
    ctaLead: "Buy a ready-made product today, or tell us what you need and get a fixed quote within 24 hours.",
    qH: "Get a custom quote",
    qP: "Tell us what you need. We reply within 24 hours with a fixed price.",
    qSend: "Request my quote",
    qOr: "Prefer WhatsApp?",
    qOrLink: "Message us",
    qSending: "Sending…",
    qDone: "Thank you! Your reference is {id}. We'll reply within 24 hours with a fixed quote.",
    founderRole: "Founder & lead engineer · Computer Science, UOW Malaysia",
    revEyebrow: "Client reviews", revA: "What our clients", revEm: "say about us.", revWrite: "Write a review", revLeave: "Leave a review", revOf: "from", revCount: "reviews",
    revH: "Share your experience", revP: "Worked with us? Tell other business owners how it went. We read every review before it goes on the site.",
    revRating: "Your rating", revCompany: "Business name", revRole: "Your role", revProject: "What did we build for you?", revText: "Your review",
    revSend: "Send review", revThanks: "Thank you! Your review was received and will appear after a quick check.", revNeed: "Please add your name, a valid email and a few words about your experience.",
    svOk1: "Fixed price before work starts", svOk2: "Weekly live previews", svOk3: "You own the code and files",
    budgetOpts: ["Not sure yet", "Under USD 300", "USD 300 – 1,000", "USD 1,000 – 3,000", "USD 3,000+"],
  },
  bn: {
    navServices: "সার্ভিস", navWork: "কাজ", navProducts: "প্রোডাক্ট", navProcess: "ধাপ", navPricing: "দাম", navFounder: "প্রতিষ্ঠাতা", navContact: "প্রজেক্ট শুরু করুন",
    heroPill: "নতুন প্রজেক্ট নিচ্ছি · ২৪ ঘণ্টায় উত্তর",
    heroA: "আপনার ব্যবসা বড় করার অ্যাপ, ওয়েবসাইট আর AI", heroEm: "আমরা বানাই।",
    heroLead: "Averroes Solutions একটি ডিজিটাল স্টুডিও: অ্যাপ, অনলাইন স্টোর, AI এজেন্ট আর ব্র্যান্ড। প্রথম স্কেচ থেকে লঞ্চের দিন পর্যন্ত এক টিম, কাজ শুরুর আগেই নির্দিষ্ট কোটেশন।",
    heroCta: "প্রজেক্ট শুরু করুন", heroCta2: "আমাদের কাজ দেখুন",
    trust1: "শুরুর আগে নির্দিষ্ট দাম", trust2: "প্রতি সপ্তাহে লাইভ প্রিভিউ", trust3: "যুক্তরাষ্ট্র, মালয়েশিয়া ও বাংলাদেশে ক্লায়েন্ট",
    stat1: "সাল থেকে কাজ করছি", stat2: "প্রজেক্ট সম্পন্ন", stat3: "নিজস্ব অ্যাপ চালু", stat4: "এর মধ্যে উত্তর",
    servicesEyebrow: "সার্ভিস", servicesA: "লঞ্চের জন্য যা যা লাগে,", servicesEm: "সব এক জায়গায়।",
    servicesLead: "একটা সার্ভিস নিন, অথবা পুরো লঞ্চ আমাদের দিন: ব্র্যান্ড, ওয়েবসাইট বা অ্যাপ, পেমেন্ট, SEO আর কাস্টমারের উত্তর দেওয়া AI।",
    from: "শুরু", details: "বিস্তারিত", ask: "এটা নিয়ে জানতে চাই",
    workEyebrow: "বাছাই করা কাজ", workA: "আসল প্রজেক্ট।", workEm: "লাইভ লিংক।",
    workLead: "এখানের প্রতিটা প্রজেক্ট লাইভ, অথবা খুলে দেখার মতো ডেমো আছে।",
    caseStudy: "পুরো কেস স্টাডি", liveDemo: "লাইভ খুলুন", moreWork: "আরও কাজ",
    workAll: "সব", workSoftware: "অ্যাপ ও সফটওয়্যার", workBrand: "ব্র্যান্ড ও ডিজাইন",
    productsEyebrow: "আমাদের নিজস্ব প্রোডাক্ট", productsA: "নিজেদের অ্যাপ", productsEm: "নিজেরাই চালাই।",
    productsLead: "এগুলো আমরা নিজেরা ডিজাইন করেছি, বানিয়েছি, চালাচ্ছি। আপনার প্রজেক্টেও একই যত্ন।",
    processEyebrow: "কীভাবে কাজ করি", processA: "চারটা ধাপ।", processEm: "কোনো চমক নেই।",
    pricingEyebrow: "দাম", pricingA: "পরিষ্কার দাম,", pricingEm: "নির্দিষ্ট কোটেশন।",
    pricingLead: "প্রতিটা ধরনের প্রজেক্টের শুরুর দাম। কাজ শুরুর আগে সঠিক কোটেশন পাবেন।",
    popular: "সবচেয়ে জনপ্রিয়", choose: "এটা নিতে চাই",
    founderEyebrow: "প্রতিষ্ঠাতা", founderA: "যিনি বানান,", founderEm: "তিনিই উত্তর দেন।",
    founderBody: "Averroes Solutions চালান ইয়াসিন আরাফাত, ইউনিভার্সিটি অব ওলংগং মালয়েশিয়ার কম্পিউটার সায়েন্সের ছাত্র, ২০১৭ থেকে ক্লায়েন্টদের জন্য ডিজাইন ও ডেভেলপ করছেন। প্রথম মেসেজ থেকে লঞ্চ পর্যন্ত সরাসরি তাঁর সাথেই কথা বলবেন।",
    founderCta: "প্রতিষ্ঠাতার পোর্টফোলিও দেখুন",
    faqEyebrow: "প্রশ্ন", faqA: "জিজ্ঞেস করার", faqEm: "আগেই উত্তর।", faqLead: "এখনও প্রশ্ন আছে? মেসেজ দিন, এক দিনের মধ্যে সোজা উত্তর পাবেন।",
    contactEyebrow: "প্রজেক্ট শুরু করুন", contactA: "মাথায় কোনো", contactEm: "প্রজেক্ট আছে?",
    contactLead: "তিনটা জিনিস লিখুন। ফর্মটা আপনার জন্য একটা WhatsApp মেসেজ বানিয়ে দেবে, আপনি সেন্ড না চাপলে কিছুই যাবে না।",
    fName: "আপনার নাম", fService: "কী দরকার?", fBudget: "বাজেট", fDetails: "প্রজেক্ট নিয়ে কয়েক লাইন",
    fSend: "WhatsApp-এ পাঠান", fCopy: "মেসেজ কপি করুন", copied: "কপি হয়েছে", fNeed: "নাম আর প্রজেক্ট নিয়ে কয়েক লাইন লিখুন।",
    orEmail: "ইমেইল", footer: "অ্যাপ, ওয়েবসাইট, AI আর ব্র্যান্ডের ডিজিটাল স্টুডিও।", footFounder: "প্রতিষ্ঠাতার পোর্টফোলিও",
    footServices: "সার্ভিস", footStudio: "স্টুডিও", footContact: "যোগাযোগ", likeThis: "এরকম কিছু চাই",
    budgetOpts: ["এখনও ঠিক করিনি", "USD 300 এর কম", "USD 300 – 1,000", "USD 1,000 – 3,000", "USD 3,000+"],
  },
};
