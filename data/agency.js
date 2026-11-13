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
const AGENCY_FEATURED = ["Sunnah Store", "AI Agent Front Desk", "halal-gyro-spot"];

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
    navServices: "Services", navWork: "Work", navProducts: "Products", navProcess: "Process", navPricing: "Pricing", navFounder: "Founder", navContact: "Start a project",
    heroPill: "Booking new projects · reply within 24 hours",
    heroA: "We build the apps, websites and AI your business", heroEm: "grows on.",
    heroLead: "Averroes Solutions is a digital studio for apps, online stores, AI agents and brands. One team takes you from the first sketch to launch day, with a fixed quote before any work starts.",
    heroCta: "Start a project", heroCta2: "See our work",
    trust1: "Fixed quote before we start", trust2: "Weekly live previews", trust3: "Clients in the USA, Malaysia & Bangladesh",
    stat1: "building since", stat2: "projects shipped", stat3: "own apps live", stat4: "reply on every brief",
    servicesEyebrow: "Services", servicesA: "Everything you need to launch,", servicesEm: "under one roof.",
    servicesLead: "Pick one service, or hand us the whole launch: brand, website or app, payments, SEO and the AI that answers your customers.",
    from: "From", details: "Details", ask: "Ask about this",
    workEyebrow: "Selected work", workA: "Real projects.", workEm: "Live links.",
    workLead: "Every project here is live or has a working demo you can open.",
    caseStudy: "Full case study", liveDemo: "Open live", moreWork: "More work",
    workAll: "All", workSoftware: "Apps & software", workBrand: "Brand & design",
    productsEyebrow: "Our own products", productsA: "We ship", productsEm: "our own apps.",
    productsLead: "We design, build and run these ourselves. Your project gets the same care.",
    processEyebrow: "How we work", processA: "Four steps.", processEm: "No surprises.",
    pricingEyebrow: "Pricing", pricingA: "Clear prices,", pricingEm: "fixed quotes.",
    pricingLead: "Starting prices for each kind of project. You get an exact quote before work begins.",
    popular: "Most popular", choose: "Choose this",
    founderEyebrow: "Meet the founder", founderA: "The person who builds it", founderEm: "answers your messages.",
    founderBody: "Averroes Solutions is led by Yeasin Arafat, a computer science student at the University of Wollongong Malaysia who has designed and built for clients since 2017. You talk to him directly, from the first message to launch.",
    founderCta: "Visit the founder's portfolio",
    faqEyebrow: "Questions", faqA: "Before you", faqEm: "ask.", faqLead: "Still unsure? Send a message and get a straight answer within a day.",
    contactEyebrow: "Start a project", contactA: "Have a project", contactEm: "in mind?",
    contactLead: "Fill in three things. The form writes a WhatsApp message for you, and nothing is sent until you press send.",
    fName: "Your name", fService: "What do you need?", fBudget: "Budget", fDetails: "A few lines about the project",
    fSend: "Send on WhatsApp", fCopy: "Copy message", copied: "Copied", fNeed: "Please add your name and a few lines about the project.",
    orEmail: "Email", footer: "A digital studio for apps, websites, AI and brands.", footFounder: "Founder's portfolio",
    footServices: "Services", footStudio: "Studio", footContact: "Contact", likeThis: "I want something like this",
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
