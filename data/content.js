// ============================================================
// Site content. Everything a visitor reads in the lists, cards,
// galleries, credentials and chatbot comes from this file.
// Edit it to update the site, or to rebrand it for someone else.
// Images live in /img (name-t.webp is the thumbnail of name.webp).
// ============================================================

// Your details, used by the WhatsApp buttons, quote buttons and brief form.
const SITE = {
  name: "Yeasin Arafat",
  // Name search engines show next to your results (Google "site name").
  siteName: "Yeasin Arafat | Averroes Solutions",
  // IndexNow key (any 32 letters/numbers). Lets Bing, Yahoo, DuckDuckGo, Yandex, Naver and Seznam
  // hear about new pages at once: run `node tools/indexnow.mjs` after you deploy.
  indexNowKey: "2452c92025b4c51503bc5e69cb00a39d",
  email: "yeasinarafat272003@gmail.com",
  whatsapp: "60178151865",          // country code + number, digits only
  phone: "+60 17 815 1865",
  location: "Shah Alam, Selangor, Malaysia",
  role: "software developer, web & app developer and UI/UX designer",
  linkedin: "https://www.linkedin.com/in/yeasin-arafat-07269432b",
  youtube: "https://www.youtube.com/@Yeasin27Arafat",
  facebook: "https://www.facebook.com/yeasin27arafat2003",
  instagram: "https://www.instagram.com/yeasin27arafat2003/",
  github: "https://github.com/uowyeasin-cyber",
  resume: "https://drive.google.com/file/d/1pEi4xJrkY9GgL6H_Nm5rOhIOL7Ktamwk/view?usp=drivesdk",
  url: "https://yeasinarafatbd.vercel.app",   // live address, used by the service pages and sitemap
  areas: ["Malaysia","Bangladesh","United States","Worldwide"],
  languages: ["English","Bengali"],
  // Agency website (Averroes Solutions). Leave "" to hide every agency link; set the address
  // (for example "https://averroes-solutions.vercel.app") once the agency site is live.
  agency: "",
};

// Image sizes [width, height] for every gallery piece (used for layout before images load).
const META = {"edu-english-course-cover": [1600, 901], "com-eid-poster-1": [1080, 1350], "com-eid-poster-2": [1280, 1600], "pe-logo": [500, 500], "com-merit-certificate": [1600, 1131], "pe-fb-cover": [1600, 901], "me-portrait-studio": [896, 1152], "hgs-social-platters": [1080, 1080], "hid-foundation-logo": [500, 500], "hgs-wordmark": [500, 500], "hgs-social-order-now": [1080, 1080], "pe-reel-ramadan": [900, 1600], "pe-reel-shop-now": [900, 1600], "pe-reel-product": [900, 1600], "hid-blood-bank-form": [1131, 1600], "shd-menu-platters": [1131, 1600], "shd-menu-wraps": [1131, 1600], "shd-menu-sandwich": [1131, 1600], "shd-menu-cover": [1131, 1600], "shd-menu-rice": [1131, 1600], "shd-led-menu": [1600, 900], "hgs-menu-cover": [1131, 1600], "hgs-menu-platters": [1131, 1600], "hgs-menu-wraps": [1131, 1600], "hgs-menu-sandwich": [1131, 1600], "hgs-menu-chicken": [1131, 1600], "hgs-menu-salads": [1131, 1600], "edu-podcast-thumb": [1280, 720], "hgs-brochure-outside": [1600, 1236], "hgs-brochure-inside": [1600, 1236], "hgs-social-pizza": [1080, 1080], "hid-tshirt": [1131, 1600], "me-portrait-city": [1254, 1254], "edu-podcast-banner": [1546, 423], "me-portrait-formal": [496, 654], "hid-canada-ad": [1080, 1080], "hid-blood-bank-logo": [960, 960], "hgs-social-fried-chicken": [1080, 1080], "hgs-grand-opening": [985, 494], "hgs-web-banner": [1600, 901], "com-tme-logo": [500, 500], "hid-shop-app": [540, 1200], "com-ramadan-calendar": [899, 1599], "com-batch-2k21-logo": [1024, 1024], "me-averroes-logo": [500, 500], "hgs-led-menu": [1600, 1035], "hid-shop-logo-dark": [500, 500], "hgs-badge-logo": [500, 500], "edu-wisdom-logo": [500, 500], "edu-ahmads-logo": [500, 500], "com-somaj-kollan-logo": [500, 500], "hgs-app-splash": [720, 1600], "me-ya-logo": [1595, 1600], "hid-clothing-promo": [1080, 1080], "edu-youtube-thumb": [1280, 720], "hid-shop-logo": [500, 500], "edu-book-cover": [1003, 1600], "com-alor-ahoban-logo": [1594, 1600], "me-fb-cover": [1600, 901], "com-madrasa-notice": [720, 720]};

// Gallery pieces: id: [title, category, spec]. Category is one of the CATS keys below.
const P = {
  "hgs-badge-logo":["Halal Gyro Spot badge logo","branding","Logo · 500×500"],
  "hgs-wordmark":["Halal Gyro Spot wordmark","branding","Wordmark"],
  "hgs-menu-cover":["Menu cover","print","Menu · A4 portrait"],
  "hgs-menu-platters":["Gyro platters page","print","Menu · A4 portrait"],
  "hgs-menu-wraps":["Gyro wraps page","print","Menu · A4 portrait"],
  "hgs-menu-sandwich":["Sandwich page","print","Menu · A4 portrait"],
  "hgs-menu-chicken":["Chicken, wings & tenders","print","Menu · A4 portrait"],
  "hgs-menu-salads":["Salads, sides & seafood","print","Menu · A4 portrait"],
  "hgs-brochure-outside":["Z-fold brochure, outside","print","Z-fold · 3 panels"],
  "hgs-brochure-inside":["Z-fold brochure, inside","print","Z-fold · 3 panels"],
  "hgs-led-menu":["LED menu board","print","LED screen · landscape"],
  "hgs-social-platters":["Gyro platters post","social","Post · 1080×1080"],
  "hgs-social-order-now":["Order now post","social","Post · 1080×1080"],
  "hgs-social-pizza":["Pizza post","social","Post · 1080×1080"],
  "hgs-social-fried-chicken":["Fried chicken combo post","social","Post · 1080×1080"],
  "hgs-grand-opening":["Grand opening banner","social","Banner"],
  "hgs-web-banner":["Delivery web banner","social","Cover · 1640×924"],
  "hgs-app-splash":["Ordering app, start screen","web","App UI · 720×1600"],
  "shd-menu-cover":["Spring Hill Deli menu cover","print","Menu · A4 portrait"],
  "shd-menu-platters":["Gyro platters page","print","Menu · A4 portrait"],
  "shd-menu-wraps":["Gyro wraps page","print","Menu · A4 portrait"],
  "shd-menu-sandwich":["Sandwich page","print","Menu · A4 portrait"],
  "shd-menu-rice":["Rice bowls & gizzard page","print","Menu · A4 portrait"],
  "shd-led-menu":["Spring Hill Deli LED menu","print","LED screen · 1920×1080"],
  "pe-logo":["Panjabi Emporium logo","branding","Logo · 500×500"],
  "pe-fb-cover":["Ramadan collection cover","social","Cover · 1640×924"],
  "pe-reel-ramadan":["Ramadan collection reel","social","Reel · 1080×1920"],
  "pe-reel-shop-now":["Shop now reel","social","Reel · 1080×1920"],
  "pe-reel-product":["Product card reel","social","Reel · 1080×1920"],
  "hid-foundation-logo":["Hidayah Foundation logo","branding","Logo"],
  "hid-blood-bank-logo":["Hidayah Blood Bank logo","branding","Logo · 960×960"],
  "hid-shop-logo":["Hidayah Shop BD logo","branding","Logo · 500×500"],
  "hid-shop-logo-dark":["Hidayah Shop BD logo, dark","branding","Logo · 500×500"],
  "hid-blood-bank-form":["Blood donor form","print","Form · A4"],
  "hid-clothing-promo":["Men's clothing promo","social","Post · 1080×1080"],
  "hid-tshirt":["Bangladesh T-shirt product","social","Product · A4"],
  "hid-canada-ad":["Canada application ad","social","Post · 1080×1080"],
  "hid-shop-app":["Shop app, new arrivals","web","App UI · 540×1200"],
  "edu-wisdom-logo":["Wisdom English Institute logo","branding","Logo · 500×500"],
  "edu-english-course-cover":["English course cover","social","Cover · 1640×924"],
  "edu-book-cover":["Full Spoken Book cover","print","Book cover · 1410×2250"],
  "edu-ahmads-logo":["Ahmad's Education logo","branding","Logo · 500×500"],
  "edu-youtube-thumb":["YouTube thumbnail","social","Thumbnail · 1280×720"],
  "edu-podcast-thumb":["The Daily Podcast thumbnail","social","Thumbnail · 1280×720"],
  "edu-podcast-banner":["Yeasin Podcast banner","social","Banner · 1546×423"],
  "com-somaj-kollan-logo":["Islami Somaj Kollan Parishad logo","branding","Logo · 500×500"],
  "com-alor-ahoban-logo":["Alor Ahoban Foundation logo","branding","Logo"],
  "com-batch-2k21-logo":["Batch 2k21 logo","branding","Logo · 1024×1024"],
  "com-tme-logo":["T-ME logo","branding","Logo · 500×500"],
  "com-merit-certificate":["Merit exam certificate","print","Certificate · landscape"],
  "com-eid-poster-1":["Eid Mubarak poster","social","Poster · 1080×1350"],
  "com-eid-poster-2":["Eid greeting poster","print","Poster · print"],
  "com-ramadan-calendar":["Ramadan calendar","print","Calendar · portrait"],
  "com-madrasa-notice":["Madrasa admission notice 2025","social","Post · 1080×1080"],
  "me-averroes-logo":["Averroes logo","branding","Logo · 500×500"],
  "me-ya-logo":["YA personal monogram","branding","Monogram"],
  "me-fb-cover":["Grow Your Skill cover","social","Cover · 1640×924"],
};

// Videos in /vid with a poster in /img/<id>-poster.jpg.
const VIDEOS = {
  "hgs-display":{t:"Halal Gyro Spot display video",spec:"Video · 1080p · 2:55",cat:"video"},
  "gyro-pita":{t:"Chicken Gyro on Pita promo",spec:"Video · 1080p · 0:30",cat:"video"},
  "hgs-app-demo":{t:"Ordering app walkthrough",spec:"Screen recording · 0:27",cat:"web"},
};

// Archive filter categories.
const CATS = [["all","All"],["branding","Logos & Branding"],["print","Menus & Print"],["social","Social Media"],["video","Video & Motion"],["web","App & Web"],["architecture","Architecture"]];

// Design case studies (each gets its own page at #p-<slug>).
const PROJECTS = [
  {slug:"halal-gyro-spot", name:"The Halal Gyro Spot", client:"The Halal Gyro Spot, Pensacola, Florida", year:"2024–2025", cover:"hgs-brochure-inside",
   scope:"Full brand system", tags:["Branding","Menu","LED","Video","App UI"],
   summary:"A complete visual system for a halal restaurant in Florida. I designed the logo, a six-page menu, a Z-fold takeaway brochure, an LED menu board, launch and delivery posts, an ordering app concept and promo videos.",
   deliver:"Logo, 6-page menu, Z-fold brochure, LED board, 7 social posts, app UI, 2 videos",
   groups:[
     {h:"Identity",p:"A bold red-and-black badge built for food photos, takeaway bags and delivery apps. The round seal reads well even as a tiny delivery-app icon.",cols:2,fit:true,items:["hgs-badge-logo","hgs-wordmark"]},
     {h:"Six-page menu",p:"Dark wood texture, round food photos and big red numbers, so customers can order by number at the counter.",cols:3,items:["hgs-menu-cover","hgs-menu-platters","hgs-menu-wraps","hgs-menu-sandwich","hgs-menu-chicken","hgs-menu-salads"]},
     {h:"Z-fold brochure",p:"The full menu folded into three panels for takeaway bags and local drops.",cols:2,items:["hgs-brochure-outside","hgs-brochure-inside"]},
     {h:"LED menu board",p:"The full menu on one landscape screen over the counter, with prices large enough to read from the queue.",cols:1,items:["hgs-led-menu"]},
     {h:"Launch & social media",p:"Grand opening and delivery-partner posts that all share one layout, so the feed looks like one brand.",cols:3,items:["hgs-social-platters","hgs-social-order-now","hgs-social-pizza","hgs-social-fried-chicken","hgs-web-banner","hgs-grand-opening"]},
     {h:"Video",p:"A long in-store display loop and a short product promo for social media.",video:["hgs-display","gyro-pita"]},
     {h:"Ordering app concept",p:"A mobile ordering flow with a start screen, category tabs and an add-to-cart grid, in the same brand colours.",app:true},
   ]},
  {slug:"spring-hill-deli", name:"Spring Hill Deli", client:"Spring Hill Deli, Panama City, Florida", year:"2025", cover:"shd-led-menu",
   scope:"Menu & LED board", tags:["Menu","LED","Print"],
   summary:"A premium black-and-gold menu for a Florida deli, plus a matching LED menu board. Gold serif headings and round food photos make a fast-food menu feel upmarket.",
   deliver:"Multi-page menu, LED menu board",
   groups:[
     {h:"LED menu board",p:"Every section of the menu on one 1920×1080 screen, laid out in three columns.",cols:1,items:["shd-led-menu"]},
     {h:"Printed menu",p:"Each page has one category, a gold header and price pills that are easy to scan.",cols:3,items:["shd-menu-cover","shd-menu-platters","shd-menu-wraps","shd-menu-sandwich","shd-menu-rice"]},
   ]},
  {slug:"panjabi-emporium", name:"Panjabi Emporium", client:"Panjabi Emporium, menswear", year:"2025", cover:"pe-fb-cover",
   scope:"Brand & campaign", tags:["Logo","Reels","Campaign"],
   summary:"The logo and a Ramadan collection campaign for a panjabi clothing shop. The work covers a Facebook cover and vertical reels for Instagram.",
   deliver:"Logo, cover, 3 reels",
   groups:[
     {h:"Logo",p:"A heavy italic wordmark with a gold accent, made to work on black packaging and on clothing tags.",cols:2,fit:true,items:["pe-logo","pe-fb-cover"]},
     {h:"Instagram reels",p:"Vertical 1080×1920 frames: a collection opener, a product card with sizes and price, and a shop-now end card.",cols:3,items:["pe-reel-ramadan","pe-reel-product","pe-reel-shop-now"]},
   ]},
  {slug:"hidayah", name:"Hidayah Foundation & Shop", client:"Founder · Hidayah United Foundation, Hidayah Blood Bank, Hidayah Shop BD", year:"2017–2025", cover:"hid-blood-bank-logo",
   scope:"Family of brands", tags:["Logos","Forms","E-commerce"],
   summary:"Identities for organisations I founded: a community foundation, a blood bank that connects donors with patients, and an online shop. Each one shares the same bold HiDAYAH lettering.",
   deliver:"3 logos, donor form, product posts, shop app screen",
   groups:[
     {h:"Logos",p:"One wordmark across the family: the foundation and the online shop, in light and dark versions.",cols:3,fit:true,items:["hid-foundation-logo","hid-shop-logo","hid-shop-logo-dark"]},
     {h:"Blood bank",p:"A blood-drop emblem with caring hands, and a printable A4 donor sign-up form in the same colours.",cols:2,fit:true,items:["hid-blood-bank-logo","hid-blood-bank-form"]},
     {h:"Shop BD",p:"Product posts and a new-arrivals screen for the online store.",cols:4,items:["hid-clothing-promo","hid-tshirt","hid-canada-ad","hid-shop-app"]},
   ]},
  {slug:"sakina-nest", name:"Sakina Nest", client:"Family home design concept", year:"Concept", cover:"sak-1",
   scope:"Architecture presentation", tags:["Floor plans","3D","Layout"],
   summary:"A presentation for a white two-storey family home. It includes floor plans for each level, 3D views, a roof-top plan and cut-away views, laid out like an architect's client book.",
   deliver:"9-page A4 presentation",
   groups:[
     {h:"Concept",p:"The cover and the design notes: what changed and how the house looks.",cols:2,items:["sak-1","sak-2"]},
     {h:"Plans",p:"Ground floor, first floor and roof plans, with a short guide to who lives where.",cols:2,items:["sak-3","sak-4","sak-5","sak-6"]},
     {h:"Views",p:"Cut-away 3D views of each floor.",cols:3,items:["sak-7","sak-8","sak-9"]},
   ]},
  {slug:"education", name:"Education & Creators", client:"Wisdom English Institute · Ahmad's Education · Yeasin Podcast", year:"2024–2025", cover:"edu-english-course-cover",
   scope:"Logos, covers & thumbnails", tags:["Logo","Book cover","YouTube"],
   summary:"Design for English schools and creators: school logos, a course banner, a children's spoken-English book cover, and podcast and YouTube thumbnails.",
   deliver:"2 logos, book cover, course cover, 3 thumbnails",
   groups:[
     {h:"School identities",p:"Round seals for two English schools that work on certificates and as profile pictures.",cols:2,fit:true,items:["edu-wisdom-logo","edu-ahmads-logo"]},
     {h:"Course & book",p:"A Facebook cover for the English speaking course and the cover of its companion book.",cols:2,items:["edu-english-course-cover","edu-book-cover"]},
     {h:"Podcast & YouTube",p:"Thumbnails and a channel banner made to stand out in a crowded feed.",cols:3,items:["edu-youtube-thumb","edu-podcast-thumb","edu-podcast-banner"]},
   ]},
  {slug:"community", name:"Community & Events", client:"Foundations, schools and local leaders in Bangladesh", year:"2024–2025", cover:"com-eid-poster-1",
   scope:"Logos, posters & print", tags:["Bangla type","Posters","Certificates"],
   summary:"Bangla and English work for community groups: organisation seals, Eid greetings, a Ramadan calendar, an admission notice and award certificates.",
   deliver:"4 logos, posters, calendar, certificate",
   groups:[
     {h:"Organisation seals",p:"Round emblems with Bangla lettering set along the circle.",cols:4,fit:true,items:["com-somaj-kollan-logo","com-alor-ahoban-logo","com-batch-2k21-logo","com-tme-logo"]},
     {h:"Posters & notices",p:"Festive greetings and notices for print and Facebook.",cols:4,items:["com-eid-poster-1","com-eid-poster-2","com-ramadan-calendar","com-madrasa-notice"]},
     {h:"Certificates",p:"A merit award certificate with a classic border.",cols:1,items:["com-merit-certificate"]},
   ]},
];

// Services page cards, in priority order (the first 4 also show on Home).
// r = rating out of 5 shown on the card (set your real client rating; delete r to hide it).
// rn = optional review count text, e.g. "12 reviews". go = the /services/<slug>/ page the card opens.
const SERVICES = [
  {r:4.9,go:"app-development",t:"Mobile & web apps",p:"Apps that work offline, in several languages, with logins, data and payments when you need them.",l:["Android, iOS & web (PWA)","Accounts, dashboards & payments","Firebase, Node.js & PostgreSQL"],i:'<rect x="7" y="2" width="10" height="20" rx="2"/><path d="M11 18h2"/>'},
  {r:5.0,go:"website-development",t:"Websites & online stores",p:"Fast business sites and stores in Next.js, built to rank on Google and load quickly on phones.",l:["Business & landing pages","E-commerce with Stripe, PayPal, bKash","Hosting, domain & SEO setup"],i:'<rect x="3" y="4" width="18" height="16" rx="2"/><path d="M3 9h18M7 6.5h.01M10 6.5h.01"/>'},
  {r:4.9,go:"ui-ux-design",t:"Web design & UI/UX",p:"Wireframes, app screens and design systems in Figma, tested so people find what they need.",l:["Wireframes & prototypes","App & website screens","Design systems & components"],i:'<path d="M12 19l7-7 3 3-7 7-3-3z"/><path d="M18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5z"/><path d="M2 2l7.6 7.6"/><circle cx="11" cy="11" r="2"/>'},
  {r:4.8,go:"seo-services",t:"SEO & Google ranking",p:"Help customers find you on Google: technical SEO, keywords, page speed and a Google Business Profile.",l:["Keyword research & on-page SEO","Search Console, sitemap & structured data","Page speed & Google Business Profile"],i:'<circle cx="11" cy="11" r="7"/><path d="M21 21l-4.3-4.3"/><path d="M8 13l2-2 2 2 3-3"/>'},
  {r:4.9,go:"ai-automation",t:"AI agents & automation",p:"AI agents, assistants and automations that answer customers, take bookings and orders, and run the repetitive work for you.",l:["AI agents that use your tools: bookings, orders, CRM","AI assistants for websites & WhatsApp","Automations for forms, sheets, emails & reports"],i:'<rect x="5" y="8" width="14" height="11" rx="2"/><path d="M12 8V4M9 4h6M9 13h.01M15 13h.01M10 16h4M3 12v3M21 12v3"/>'},
  {r:5.0,go:"portfolio-website",t:"Portfolio websites",p:"A personal portfolio like this one, with your work, résumé and a private editor to update it yourself.",l:["Light & dark themes","Case studies & résumé page","Owner-only editor, no code needed"],i:'<rect x="3" y="3" width="7" height="9" rx="1"/><rect x="14" y="3" width="7" height="5" rx="1"/><rect x="14" y="12" width="7" height="9" rx="1"/><rect x="3" y="16" width="7" height="5" rx="1"/>'},
  {r:4.9,go:"logo-design",t:"Brand identity",p:"Logos and visual systems that work as a tiny app icon and on a shop sign.",l:["Logo & monogram design","Colour and type system","Seals and badges"],i:'<path d="M12 3l8 4.5v9L12 21l-8-4.5v-9z"/><path d="M12 12l8-4.5M12 12v9M12 12L4 7.5"/>'},
  {r:4.9,go:"menu-design",t:"Menus & print",p:"Restaurant menus, brochures and forms that are easy to read and ready for print.",l:["Multi-page menus","Z-fold & tri-fold brochures","Certificates & forms"],i:'<rect x="5" y="3" width="14" height="18" rx="2"/><path d="M9 8h6M9 12h6M9 16h4"/>'},
  {r:4.8,go:"led-menu-board",t:"LED & screen menus",p:"Digital menu boards for counters, laid out so prices read from the queue.",l:["1080p menu boards","Display loops","Promo screens"],i:'<rect x="3" y="4" width="18" height="12" rx="2"/><path d="M8 20h8M12 16v4"/>'},
  {r:4.9,go:"social-media-design",t:"Social media design",p:"Posts, covers and reels that keep a feed looking like one brand.",l:["1:1 posts & 9:16 reels","Facebook & YouTube covers","Launch campaigns"],i:'<rect x="4" y="4" width="16" height="16" rx="4"/><circle cx="12" cy="12" r="3.5"/><circle cx="17" cy="7" r=".8" fill="currentColor"/>'},
  {r:4.8,go:"video-editing",t:"Video editing",p:"Short promos and longer display videos with motion graphics and sound.",l:["Food & product promos","Thumbnails","Motion text"],i:'<rect x="3" y="5" width="13" height="14" rx="2"/><path d="M16 10l5-3v10l-5-3"/>'},
];

// Software toolkit tiles: [badge, name, use, text colour, badge colour].
const TOOLS = [["Re","React","Web & mobile UI","#61DAFB","#20232A"],["Nx","Next.js","Full-stack websites","#fff","#000"],["TS","TypeScript","Safer app code","#fff","#3178C6"],["JS","JavaScript","Interaction","#000","#F7DF1E"],["Tw","Tailwind CSS","Fast styling","#fff","#0EA5E9"],["Nd","Node.js","Servers & APIs","#fff","#3C873A"],["Fb","Firebase","Login & live data","#fff","#DD2C00"],["Pg","PostgreSQL","Databases","#fff","#336791"],["Py","Python","Programming","#FFD43B","#306998"],["Jv","Java","OOP & Spring Boot","#fff","#E76F00"],["St","Stripe","Online payments","#fff","#635BFF"],["Fg","Figma","UI/UX design","#fff","#A259FF"],["GSC","Search Console","Google indexing","#fff","#4285F4"],["Gm","Gemini","AI features","#fff","#1A73E8"],["Gh","GitHub","Code & projects","#fff","#24292F"],["Ps","Photoshop","Photo editing","#31A8FF","#001E36"],["Ai","Illustrator","Logos & vectors","#FF9A00","#330000"],["Pr","Premiere Pro","Video editing","#9999FF","#00005B"]];

// Education rows: [dates, title, detail, score, optional [link label, url]].
const EDU = [
  ["Jan 2026 – Dec 2028","Bachelor of Engineering, Computer Science","University of Wollongong Malaysia · UOW High Achievers Scholarship (30% tuition fee waiver) · Computer Science Club, competitions and hackathons.","UOW",["See awards & credentials","#awards"]],
  ["May 2024 – Dec 2025","Honours, English Language and Literature","Tongi Govt College.",""],
  ["May 2024 – Dec 2025","Fazil","Tamirul Millat Kamil Madrasah.",""],
  ["Mar 2022 – Sep 2023","Intermediate (HSC), Science","Tamirul Millat Kamil Madrasah. Where I learned leadership.","5.00"],
  ["Until Mar 2023","Dakhil (SSC), Science","Al Manar Dakhil Madrasah. School-level activities.","5.00"],
  ["English","IELTS","Above Band 6 overall.","6+"],
]

// Work history rows: same shape as EDU.
const EXP = [
  ["Oct 2026 – now","Application Developer & Founder · Averroes AI","Self-employed, remote. Building AI-powered tools, automation for businesses and customer service, and software for real-world problems. Flagship project: Amalnama.","",["Install Amalnama","https://uowyeasin-cyber.github.io/AmalnamaForever"]],
  ["May – Jul 2026","Barista · swich caffe","Part-time at Sunway Pyramid, Selangor. Prepared espresso, cappuccino, latte, specialty coffees, mocktails, tea and juices; served cakes and gelato; handled orders, stock checks and customer requests; kept high standards of hygiene and presentation during busy hours.",""],
  ["Mar 2023 – Mar 2025","Small Business Owner · Hidayah Shop BD","Dhaka, on-site. Started during COVID-19 and restarted after HSC. Ran the online store, its marketing and business strategy.",""],
  ["Feb 2023 – Nov 2025","Founder · Hidayah United Foundation","A non-profit organisation in Bangladesh for social services and charity work.","",["Visit website","https://sites.google.com/view/hidayah-united-foundation/home"]],
  ["Jan 2017 – Sep 2025","Founder · Hidayah Blood Bank","A donor network that connected patients with nearby blood donors across Bangladesh, run remotely.",""],
  ["Internships","Programming Hero · Code Biruni","Internship work in programming and web development.",""],
  ["Freelance","Graphic designer & video editor","Brands, menus, LED boards and campaigns for The Halal Gyro Spot, Spring Hill Deli, Panjabi Emporium and others.",""],
  ["Teaching","English & IELTS trainer","Trained students in spoken English and IELTS preparation.",""],
]

// Skill cards on the About page.
const SKILLS = [
  ["Graphic design","Logos, menus, print layouts, social campaigns and Bangla and English typography."],
  ["Software development","C++, Java, Python, JavaScript and MySQL. Focus on software development, cybersecurity, data science and AI."],
  ["UI/UX & web","Figma, WordPress, HTML and CSS. App screens, landing pages and full-stack prototypes."],
  ["Communication","Clear briefs and fast revisions with clients in different countries. IELTS 6+."],
  ["Leadership","Founding and running Averroes AI, Hidayah Blood Bank, Hidayah United Foundation and Hidayah Shop BD."],
];

// Software projects (Code page and the Apps / Websites / Games / Systems sections of Work).
const DEV = [
  {n:"Amalnama",k:"Flagship app · Averroes AI",img:"dev-amalnama",full:"dev-amalnama",tags:["Mobile web app","AI","Offline-first","6 languages"],
   p:"Your daily record of good deeds. A free, ad-free Islamic companion app with prayer times, Quran, hadith, an AI mufti, Qibla, a hifz tracker and family budgets in one place.",
   l:["Prayer times with azan, all 114 surahs of the Quran and the six authentic hadith collections","An AI mufti (Gemini through Firebase AI Logic) that answers with Quran and hadith references","WhatsApp-style chats, groups and group calls that ring through Web Push even when the app is closed","Halal finance planner, zakat calculator, hifz tracker and daily routine","Installable PWA in vanilla JavaScript with no build step; GitHub Actions run checks and refresh the video feed every 6 hours"],
   link:["Install Amalnama","https://uowyeasin-cyber.github.io/AmalnamaForever/"],gh:"AmalnamaForever"},
  {n:"Averroes Code",k:"Desktop & mobile app · Averroes AI",img:"dev-averroes-code",full:"dev-averroes-code",tags:["C · C++ · Python · Java","JS · TS · HTML · CSS","Offline","Pyodide · WebAssembly"],
   p:"A free code editor and compiler that works fully offline on Windows, Mac and Linux, with a phone app too. It comes with 23 video courses in English, Bangla, Hindi and Arabic.",
   l:["Write and run C, C++, Python, Java, JavaScript, TypeScript, HTML and CSS without internet","Python runs in the browser through Pyodide (WebAssembly); C++ and JavaScript run in web workers","Courses from HTML to AI, cloud and DSA, plus unlimited practice problems","Live contests, medals and shareable certificates that anyone can verify"],
   link:["Download Averroes Code","https://uowyeasin-cyber.github.io/averroes-code/"],gh:"uowyeasin-cyber.github.io"},
  {n:"Easy Life",k:"New app · Averroes AI · in development",img:"dev-easy-life",full:"dev-easy-life",tags:["Android","AI agent","Bangla + English voice","Offline reminders"],
   p:"Say it once, the AI does the rest. An AI life assistant that turns Bangla or English speech into notes, reminders, money records, messages and CVs, sorted into study, business, family and personal life.",
   l:["Accurate mixed Bangla-English voice notes, filed automatically into six life areas","Its own reminder engine: notification, alarm on silent or a full-screen call-style alert, offline and duplicate-free","Class mode with lecture recording, simple Bangla explanations and quizzes","Counts bKash, Nagad and bank payments from notifications across several businesses","One-tap messages, intros, emails and CVs, with AI suggestions for who to send them to"],
   link:["See plans & live demo","/easy-life/"]},
  {n:"Sunnah Store",k:"Full-stack e-commerce · live",img:"dev-sunnah",link:["Visit Sunnah Store","https://sunnahstore.vercel.app/"],gh:"sunnah-store",tags:["Next.js 16","Prisma 6","PostgreSQL","Stripe · PayPal · SSLCommerz"],
   p:"A complete online shop with a storefront and an admin panel. Customers can pay by card, PayPal, bKash or Nagad, or cash on delivery, and orders are booked with a courier automatically.",
   l:["Storefront and admin panel built on the Next.js App Router with cached catalogue reads","Payments through Stripe (cards and FPX), PayPal and SSLCommerz, marked paid only after server-side confirmation","Steadfast courier booking and tracking for Bangladesh, Ship24 tracking everywhere else, with a cron job that emails customers","English, Bangla, Hindi and right-to-left Arabic","Reviews, offers, ads, social campaigns, store credit, expense reports and product view analytics"],
   code:`<span class="c">// prisma/schema.prisma (excerpt)</span>\n<span class="k">model</span> Product   { ... }\n<span class="k">model</span> Order     { ... }\n<span class="k">model</span> OrderLine { ... }\n<span class="k">model</span> Customer  { ... }\n<span class="k">model</span> Review    { ... }\n<span class="k">model</span> Offer     { ... }\n<span class="k">model</span> Campaign  { ... }\n<span class="k">model</span> Expense   { ... }\n\n<span class="c"># 9 migrations · 4 languages · 3 payment gateways</span>`,gh:"sunnah-store"},
  {n:"AI Agent Front Desk",k:"AI agents & automation · live prototype",img:"dev-ai-agent",demo:"ai-agent",link:["Open the prototype","demo/ai-agent.html"],tags:["AI agent","Tool calling","WhatsApp","Automation"],
   p:"An AI agent that runs the front desk of a restaurant. It answers questions, books tables, takes delivery orders, tracks riders and hands angry customers to a manager, while a live panel shows every step and tool it uses.",
   l:["Understands intent and fills booking details over several messages, asking one short question at a time","Calls tools for availability, bookings, orders, payment links, courier tracking and Google Sheets","Hands over to a person on complaints or when it isn't confident, instead of guessing","Replies in English and Bangla","An Automations view with six workflows: booking reminders, missed-call replies, nightly reports, review alerts, stock reorders and CRM leads"]},
  {n:"Campus Islamic Society website",k:"Next.js starter site · live prototype",img:"dev-cis",demo:"campus-islamic-society",link:["Open the prototype","demo/campus-islamic-society.html"],tags:["Next.js 16","React 19","TypeScript","Tailwind 4"],
   p:"A starter website for a university Islamic society, with a live prayer clock as its centrepiece. The night-sky and brass theme is built for reading after Maghrib as much as at noon.",
   l:["Live prayer times from JAKIM e-Solat, fetched on the server and refreshed every hour","A countdown to the next prayer and a 24-hour sky-colour timeline","Falls back to sample times if the prayer API is down","Values, upcoming events, committee and a WhatsApp join band, all edited from one site.ts file","Planned next: Supabase for events and a page for each event"]},
  {n:"Tic Tac Toe: Unbeatable AI",k:"Game · playable demo",demo:"tictactoe",link:["Play full screen","demo/tictactoe.html"],tags:["JavaScript","Minimax","CSS animation"],
   p:"A Tic Tac Toe game against an AI that never loses. You can't win, so a draw earns points. Levels go on forever, with ranks from Rookie up to Conqueror.",
   l:["Minimax search, so the AI always plays the best move","Points, draws and unlimited levels with rank titles","Five animated themes that change as you level up: city, ocean, desert, snow and space","One HTML file with no libraries"]},
  {n:"Animated login & sign-up",k:"UI component · live demo",demo:"login",tags:["HTML","CSS","JavaScript"],
   p:"A login and registration screen where a curved purple panel slides across to swap between the two forms.",
   l:["Pure CSS transitions with timed delays for the slide","One class toggle in JavaScript drives the whole animation","Social sign-in buttons and form validation"]},
  {n:"CampusEarn",k:"Full-stack prototype · live demo",img:"dev-campusearn",demo:"campusearn",link:["Open the prototype","demo/campusearn.html"],tags:["Node.js","SQLite","Firestore","REST API"],
   p:"A student job marketplace that connects university students with flexible part-time work on and around campus. It has separate student, job-giver and admin workspaces.",
   l:["Dependency-free Node.js server with a small REST API","Related SQLite tables for profiles, jobs, applications, payments and verification","Optional Cloud Firestore as the main store, with SQLite as a local cache","Works offline from a local copy when the server is down"],
   code:`<span class="c"># run locally</span>\n<span class="k">$</span> node --env-file-if-exists=.env server.js\n<span class="c">→ listening on 127.0.0.1:3000</span>\n\n<span class="k">GET</span>    /api/health  <span class="s">200</span>\n<span class="k">GET</span>    /api/state   <span class="s">200</span>\n<span class="k">PUT</span>    /api/state   <span class="s">200</span>\n<span class="k">DELETE</span> /api/state   <span class="s">204</span>`},
  {n:"CloudEats: from monolith to microservices",k:"Cloud & DevOps · live demo",diagram:true,img:"dev-cloudeats",demo:"cloudeats",link:["Open the prototype","demo/cloudeats.html"],tags:["Docker","MySQL","Redis","MongoDB","Express","Jest","Husky"],
   p:"A food ordering platform that I'm splitting from one Express server into separate services. A demo storefront, Nasi Lemak Paradise, sits in front of it.",
   l:["Started as a monolith: Express, MySQL, bcrypt-hashed passwords and a register page","Now separate user, menu and order services behind an Express API gateway with JWT checks","MySQL for users and menus, Redis for sessions and caching, MongoDB for orders","Docker Compose runs everything, with healthchecks, named volumes and a private network","The menu service has a 13-case Jest suite for rating validation, covering boundaries, decimals, null and strings","A Husky pre-commit hook runs the tests before every commit","In progress: moving the menu routes out of the monolith"]},
  {n:"Online Food Ordering System",k:"University group project · live demo",img:"dev-food-ordering",demo:"food-ordering",link:["Open the prototype","demo/food-ordering.html"],gh:"OnlineFoodOrderingSystem",tags:["Java","UML","OOSAD","Web frontend"],
   p:"A food ordering system analysed and designed the object-oriented way, with full UML documentation, a Java console app and a companion web frontend.",
   l:["Use case, class and sequence diagrams","Java console app built from the class model","Web frontend for browsing the menu and placing orders"],
   code:`<span class="k">public class</span> Order {\n  <span class="k">private final</span> List&lt;OrderItem&gt; items;\n  <span class="k">private</span> OrderStatus status = OrderStatus.<span class="s">PLACED</span>;\n\n  <span class="k">public double</span> total() {\n    <span class="k">return</span> items.stream()\n      .mapToDouble(OrderItem::subtotal).sum();\n  }\n}`},
  {n:"This portfolio",k:"Personal site · live",img:"dev-portfolio",full:"dev-portfolio",link:["Open the live site","https://yeasinarafatbd.vercel.app/"],gh:"protpolio-2",tags:["HTML","CSS","JavaScript","Vercel"],
   p:"My own site, built more than once on purpose: first as a Vite, React and Tailwind app, then as a single dependency-free HTML file. This version adds case studies and a filterable work archive.",
   l:["Hash-based pages without a framework","Optimised images and video","Works on phones and large screens"],
   code:`<span class="c">// tiny router, no framework</span>\naddEventListener(<span class="s">"hashchange"</span>, route);\n\n<span class="k">function</span> route() {\n  <span class="k">const</span> page = location.hash.slice(1) || <span class="s">"home"</span>;\n  show(page);\n}`},
];

// Licences and certifications.
const CREDS=[
  {t:"Top Coder Malaysia 2026",iss:"Thulija Technologies (T-Academy) · Data Science Association · supported by MDEC",d:"Issued 29 Jul 2026",id:"CODE/DSA/G11/UOW/003",note:"Placed 5th at university level (UOW Malaysia, Glenmarie) and qualified for the national round.",img:"cert-topcoder"},
  {t:"Tableau Fundamentals",iss:"University of Wollongong Malaysia",d:"Issued 31 Jul 2026",id:"UOWM/04236",note:"Tableau Fundamentals Workshop, UOW Malaysia Glenmarie Campus.",img:"cert-tableau",url:"https://drive.google.com/drive/folders/1nRFZDywj4FXpEXFwWso1p4ujg_jTW9yS"},
  {t:"Python Coder",iss:"Data Science Association",d:"Issued Jul 2026",note:"Python programming certification.",url:"https://www.linkedin.com/company/datascienceassociation/"},
  {t:"UOW High Achievers Scholarship",iss:"University of Wollongong Malaysia",d:"Awarded 2026",tag:"30% tuition fee waiver",note:"A merit scholarship that covers 30% of my tuition fees, awarded for outstanding academic results including GPA 5.00/5.00 in both SSC and HSC."},
];

// Client quotes, e.g. {q:"…", n:"Name", r:"Owner, Business"}. The section stays hidden while this is empty.
const TESTIMONIALS=[];

// Service packages, one tab each, in this order. price: estimated starting price shown on the card;
// edit freely, or set price: "" to show "Custom quote". Tab names are in PACKAGE_TABS.
const PACKAGE_TABS={apps:"Apps",dev:"Websites",uiux:"UI/UX",seo:"SEO",ai:"AI agents",design:"Design & video"};
const PACKAGES={
  apps:[
    {t:"Starter app",f:"A first version of your idea that people can install and use.",price:"From USD 499",d:"Launch fast",l:["Installable app for Android, iPhone & web (PWA)","Up to 5 screens","Login and a simple database","Published and live for you"]},
    {t:"Business app",f:"An app your customers or team use every day.",price:"From USD 999",d:"Most popular",pop:1,l:["Everything in Starter app","User accounts and admin dashboard","Payments, bookings or orders","Push notifications and offline mode","2 months of fixes after launch"]},
    {t:"Custom platform",f:"A bigger product with several user types or AI features.",price:"From USD 1,999",d:"Custom build",l:["Several roles (customer, staff, admin)","AI features such as chat or smart search","Integrations and APIs","Tests and documentation"]},
  ],
  dev:[
    {t:"Portfolio or landing page",f:"One polished site that shows who you are or what you sell.",price:"From USD 149",d:"Fast turnaround",l:["Responsive, mobile-first design","Contact form or WhatsApp button","Basic SEO and analytics","Deployed live for you"]},
    {t:"Business website",f:"A multi-page site you can grow.",price:"From USD 349",d:"Most popular",pop:1,l:["Up to 6 pages in Next.js","Your brand, copy and images","Fast load and good Lighthouse score","Hosting and domain setup"]},
    {t:"Web app or store",f:"Accounts, data, payments or a dashboard.",price:"From USD 799",d:"Custom build",l:["Login and user accounts","Database (PostgreSQL or MySQL)","Payments, orders or bookings","Admin dashboard","Tests and documentation"]},
  ],
  uiux:[
    {t:"Screen design",f:"A few key screens designed properly.",price:"From USD 99",d:"Quick start",l:["Up to 5 app or web screens","Mobile and desktop versions","Figma source file","2 rounds of revisions"]},
    {t:"Full UI/UX design",f:"A whole app or website, ready to build.",price:"From USD 299",d:"Most popular",pop:1,l:["Wireframes and user flow","All screens, mobile and desktop","Clickable prototype","Developer handoff"]},
    {t:"Design system",f:"One consistent look across every product.",price:"From USD 599",d:"Complete system",l:["Colours, type and spacing tokens","Buttons, forms and components","Usage guidelines","Figma library"]},
  ],
  seo:[
    {t:"SEO setup",f:"Get a new or existing site ready for Google.",price:"From USD 79",d:"One-time",l:["Titles, descriptions and headings","Sitemap, robots.txt and structured data","Google Search Console setup","Speed and mobile check"]},
    {t:"SEO growth",f:"Climb for the searches that bring customers.",price:"From USD 149 / month",d:"Most popular",pop:1,l:["Keyword research for your market","New and improved pages each month","Technical fixes and speed work","Monthly ranking report"]},
    {t:"Local SEO",f:"Show up on Google Maps in your area.",price:"From USD 99",d:"For local shops",l:["Google Business Profile setup","Local keywords and pages","Reviews and photos guidance","Bangla and English listings"]},
  ],
  ai:[
    {t:"AI assistant",f:"A smart assistant that answers your customers 24/7.",price:"From USD 199",d:"Quick win",l:["Chatbot for your website or WhatsApp","Trained on your products, prices and FAQs","Hands over to you when needed","Setup and testing included"]},
    {t:"AI automation",f:"Take repetitive work off your team's plate.",price:"From USD 399",d:"Most popular",pop:1,l:["Automated replies, bookings and follow-ups","Forms, sheets, emails and reports connected","AI that sorts, summarises and drafts","1 month of support and tweaks"]},
    {t:"AI agent",f:"An agent that takes real actions in your business tools.",price:"From USD 999",d:"Custom build",l:["AI features inside your own app or dashboard","Gemini, OpenAI or other models","Your data kept private and secure","Tests and documentation"]},
  ],
  design:[
    {t:"Starter",f:"A single piece that needs to look right.",price:"From USD 25",d:"Fast turnaround",l:["Logo, poster, flyer or 3 social posts","2 concepts to choose from","Print and web files","2 rounds of revisions"]},
    {t:"Brand kit",f:"A new shop, restaurant or page getting started.",price:"From USD 129",d:"Most popular",pop:1,l:["Logo with colour and type system","Menu or brochure, print-ready","5 social posts and a cover","Source files included","3 rounds of revisions"]},
    {t:"Full launch",f:"Everything a launch needs, in one style.",price:"From USD 299",d:"Complete system",l:["Everything in Brand kit","LED or TV menu board","Promo video or reel","Launch campaign posts","Priority support"]},
  ],
};

// Questions on the Services page.
const FAQ=[
  ["How do we start?","Send a short brief on WhatsApp, by email or with the form on the Contact page. I reply within 24 hours with questions and a fixed quote."],
  ["How does payment work?","You approve the quote before I start. For bigger projects we split it into a deposit and a final payment on delivery. I can work through online marketplaces too if you prefer."],
  ["Do you work with clients outside Malaysia?","Yes. I've delivered full brand systems for The Halal Gyro Spot in Florida, USA, and several businesses in Bangladesh. I work in English and Bangla."],
  ["What files will I get?","Print-ready PDFs, PNG and JPG files for web and social media, and source files when the package includes them. For websites you get the live site and the code."],
  ["Are you available for jobs and internships?","Yes. I'm open to internships, part-time and graduate roles in software development, on-site in the Klang Valley, hybrid or remote. See my one-page résumé."],
];

// Chatbot answers: k = keywords, a = answer (HTML allowed).
const BOT=[
  {k:["skill","skills","tech","stack","know","react","next.js","nextjs","typescript","javascript","python","java","node","firebase","database","tools"],a:'I build with React, Next.js, TypeScript, JavaScript, Node.js, Firebase and PostgreSQL, and I also code in C++, Java, Python and SQL. For design I use Photoshop, Illustrator, Figma and Canva, and for video Premiere Pro and After Effects. See <a href="#about">About</a>.'},
  {k:["averroes code","editor","compiler"],a:'Averroes Code is my free offline code editor and compiler for C, C++, Python, Java, JavaScript and more, with 23 courses in 4 languages. <a href="https://uowyeasin-cyber.github.io/averroes-code/" target="_blank" rel="noopener">Download it here</a>.'},
  {k:["store","shop","miswak","e-commerce","ecommerce"],a:'Sunnah Store (sunnahstore.vercel.app) is a live online shop for miswak pens, miswak sticks and attar I built with Next.js, Prisma and PostgreSQL, with card, PayPal, bKash and cash-on-delivery payments, courier tracking and 4 languages. See the <a href="#code">Code</a> page.'},
  {k:["amalnama","islamic app","quran","prayer app","averroes"],a:'Amalnama is my free, ad-free Islamic companion app: prayer times, Quran, hadith, an AI mufti, Qibla, hifz tracker and family budgets. It works offline in 6 languages. <a href="https://uowyeasin-cyber.github.io/AmalnamaForever" target="_blank" rel="noopener">Install it here</a>.'},
  {k:["project","build","built","code","app","github","campus","game","tic","next","prayer","islamic","docker","cloud","microservice","devops"],a:'My code projects include Amalnama (an Islamic companion app), Averroes Code (an offline code editor with courses), Sunnah Store (a live e-commerce site), a Campus Islamic Society website in Next.js with live prayer times, CloudEats (a food ordering app I\'m moving to Docker microservices), an unbeatable Tic Tac Toe AI and CampusEarn (a student jobs platform). Try the demos on the <a href="#code">Code</a> page.'},
  {k:["design","logo","menu","brand","graphic","video","work","portfolio"],a:'I\'ve designed full brands, menus, LED boards, social posts and videos for clients like The Halal Gyro Spot and Spring Hill Deli. Browse them on the <a href="#work">Work</a> page.'},
  {k:["resume","résumé","cv"],a:'You can open my résumé here: <a href="https://drive.google.com/file/d/1pEi4xJrkY9GgL6H_Nm5rOhIOL7Ktamwk/view?usp=drivesdk" target="_blank" rel="noopener">Résumé on Google Drive</a>.'},
  {k:["award","achiev","top coder","certif","tableau","scholar","presenter"],a:'I\'m Top Coder Malaysia 2026 (T-Academy) and hold the UOW High Achievers Scholarship, which covers 30% of my tuition fees. I\'m also certified in Tableau Fundamentals and as a Python Coder. See <a href="#awards">Awards</a>.'},
  {k:["educat","study","uni","university","college","uow","gpa","school","degree","ssc","hsc","ielts","porashona","পড়াশোনা"],a:'I\'m studying a Bachelor of Engineering in Computer Science at UOW Malaysia (2026 to 2028) on the High Achievers Scholarship. I scored GPA 5.00 in both SSC and HSC, and I\'m also doing Honours in English at Tongi Govt College.'},
  {k:["experience","job","intern","barista","teach"],a:'I\'m the founder and application developer at Averroes AI. Before that I was a barista at swich caffe, ran Hidayah Shop BD, founded Hidayah Blood Bank and Hidayah United Foundation, interned at Programming Hero and Code Biruni, and trained students in IELTS.'},
  {k:["hidayah","blood","foundation","volunteer"],a:'I founded Hidayah Blood Bank in 2017 to connect blood donors with patients in Bangladesh, and later the Hidayah United Foundation for community work.'},
  {k:["hire","freelance","service","price","cost","package","available","work with","quote","fiverr","upwork"],a:'Yes, I\'m available for freelance projects, internships and part-time roles. See fixed-price <a href="#services">packages</a>, my <a href="#cv">one-page résumé</a>, or message me on <a href="https://wa.me/60178151865" target="_blank" rel="noopener">WhatsApp</a>.'},
  {k:["contact","email","phone","reach","whatsapp","linkedin"],a:'Email me at yeasinarafat272003@gmail.com or call +60 17 815 1865. All my links are on the <a href="#contact">Contact</a> page.'},
  {k:["where","location","live","based","malaysia"],a:'I\'m based in Shah Alam, Selangor, Malaysia, and I work with clients worldwide.'},
  {k:["hi","hello","salam","assalamu","hey","kemon","কেমন"],a:'Hi! Ask me about my skills, projects, awards or how to contact me.'},
];

// Suggested chatbot questions.
const CHIPS=["What services do you offer?","How much does a website cost?","Show me your projects","How can I contact you?"];


// ============================================================
// Service pages for Google. Each entry becomes its own page at
// /services/<slug>/ so a search like "e-commerce website developer"
// can land straight on the matching service, not just the home page.
// After editing, run:  node tools/build-service-pages.mjs
// work: [title, image in /img, link, one line]. pkg: "dev" or "design" (from PACKAGES).
// bn: an optional Bangla section, so Bangla searches match too.
// ============================================================
const SERVICE_PAGES = [
  {slug:"app-development",nav:"Apps",
   title:"App Developer · Mobile & Web App Development (Android, iOS, PWA)",
   h1:"Mobile and web apps people keep on their home screen",
   desc:"Hire Yeasin Arafat for mobile and web app development: Android, iOS and installable web apps with logins, databases, payments, offline mode and AI features. Founder of Averroes AI.",
   meta:"Mobile and web app development by Yeasin Arafat: Android, iOS and web apps with logins, payments, offline mode and AI features.",
   kw:"app developer, mobile app developer, web app development, PWA developer, Android app developer, iOS app, app developer Malaysia, app developer Bangladesh, Firebase developer, AI app developer, অ্যাপ তৈরি, মোবাইল অ্যাপ ডেভেলপার",
   intro:"I build apps that install on Android, iPhone and desktop from one codebase, work offline, and grow with you: accounts, dashboards, payments, notifications and AI features when you need them. My own apps, Amalnama and Averroes Code, are used daily.",
   points:["Installable apps for Android, iOS and desktop (PWA)","Logins, user accounts, dashboards and admin tools","Firebase, Node.js, PostgreSQL or MySQL backends","Push notifications, offline mode and several languages","AI features such as chat assistants and smart search"],
   work:[["Amalnama","dev-amalnama.webp","https://uowyeasin-cyber.github.io/AmalnamaForever/","An Islamic companion app with an AI assistant, offline in 6 languages."],["Averroes Code","dev-averroes-code.webp","https://uowyeasin-cyber.github.io/averroes-code/","An offline code editor and compiler with 23 courses."],["CampusEarn","dev-campusearn.webp","/demo/campusearn.html","A student job marketplace with three workspaces."],["Restaurant ordering app UI","hgs-app-demo-poster.jpg","/#p-halal-gyro-spot","A branded ordering app prototype with menu, cart and checkout."]],
   pkg:"apps",
   faq:[["Can one app work on both Android and iPhone?","Yes. I build progressive web apps that install on Android, iPhone and computers from a single codebase, which keeps cost and updates low."],["Can you add AI to my app?","Yes. Amalnama has an AI assistant built on Gemini through Firebase, and I can add chat, search or automation features to your app the same way."],["Will the app work without internet?","It can. Amalnama and Averroes Code both work offline, and I can design your app the same way when it makes sense."]],
   bn:{h:"মোবাইল অ্যাপ বা ওয়েব অ্যাপ বানাতে চান?",p:"Android, iPhone ও কম্পিউটারে ইনস্টল করা যায় এমন অ্যাপ তৈরি করি: লগইন, ড্যাশবোর্ড, পেমেন্ট, নোটিফিকেশন, অফলাইন মোড এবং AI ফিচারসহ। আমার নিজের অ্যাপ Amalnama ও Averroes Code প্রতিদিন মানুষ ব্যবহার করছে।",
     faq:[["একটি অ্যাপ কি Android ও iPhone দুটোতেই চলবে?","হ্যাঁ। একটাই অ্যাপ Android, iPhone ও কম্পিউটারে চলবে, তাই খরচ ও আপডেট দুটোই কম।"],["অ্যাপে AI যোগ করা যাবে?","হ্যাঁ। চ্যাট অ্যাসিস্ট্যান্ট, স্মার্ট সার্চ বা অটোমেশনের মতো AI ফিচার যোগ করে দিতে পারি।"]]}},
  {slug:"website-development",nav:"Websites",
   title:"Website Developer in Malaysia & Bangladesh · Business Website Design",
   h1:"Business websites that load fast and get found on Google",
   desc:"Hire Yeasin Arafat to design and build your business website: fast, mobile-first, SEO-ready and deployed on your own domain. Serving Malaysia, Bangladesh and clients worldwide.",
   meta:"Business website design and development by Yeasin Arafat: fast, mobile-first and SEO-ready, for Malaysia, Bangladesh and worldwide.",
   kw:"website developer, website design, business website, web developer Malaysia, web developer Bangladesh, website developer Shah Alam, freelance web developer, Next.js developer, landing page design, website banano, ওয়েবসাইট তৈরি",
   intro:"I design and build websites for shops, restaurants, schools, clubs and small businesses. Every site is mobile-first, loads quickly, is set up for Google search, and goes live on your own domain with hosting sorted for you.",
   points:["Business sites, landing pages and multi-page company websites","Next.js, React or plain HTML, whichever suits the job","Contact form, WhatsApp button, maps and Google Analytics","SEO setup: titles, sitemap, structured data and Search Console","Hosting, domain and SSL set up for you"],
   work:[["Sunnah Store","dev-sunnah.webp","https://sunnahstore.vercel.app/","A live online shop with payments, courier tracking and 4 languages."],["Campus Islamic Society website","dev-cis.webp","/demo/campus-islamic-society.html","A community website with a live prayer clock, events and a join form."],["This portfolio","dev-portfolio.webp","/","A two-theme personal site with case studies and a private editor."],["CampusEarn","dev-campusearn.webp","/demo/campusearn.html","A student jobs platform with student, employer and admin areas."]],
   pkg:"dev",
   faq:[["How long does a business website take?","A landing page usually takes a few days and a multi-page business site one to three weeks, depending on how quickly content and feedback arrive. You get a fixed timeline with the quote."],["Will my website show up on Google?","Every site is built with SEO basics in place: page titles, descriptions, a sitemap, structured data and Search Console setup. Nobody can promise a number-one ranking, but your site starts with everything Google needs."],["Can I update the website myself?","Yes. I can add a simple editor so you can change text and images without touching code, or hand over the code if you have a developer."]],
   bn:{h:"আপনার ব্যবসার জন্য ওয়েবসাইট দরকার?",p:"দোকান, রেস্টুরেন্ট, প্রতিষ্ঠান বা ব্যক্তিগত ব্যবসার জন্য দ্রুত, মোবাইল-ফ্রেন্ডলি এবং গুগলে খুঁজে পাওয়ার উপযোগী (SEO) ওয়েবসাইট তৈরি করে দিই। ডোমেইন, হোস্টিং এবং লাইভ করা পর্যন্ত সব কাজ আমি করে দিই। বাংলাদেশ, মালয়েশিয়া এবং বিদেশের ক্লায়েন্টদের সাথে কাজ করি।",
     faq:[["ওয়েবসাইট বানাতে কত দিন লাগে?","ল্যান্ডিং পেজ সাধারণত কয়েক দিনে, আর কয়েক পেজের বিজনেস ওয়েবসাইট ১ থেকে ৩ সপ্তাহে হয়ে যায়। কোটেশনের সাথেই নির্দিষ্ট সময় জানিয়ে দিই।"],["কিভাবে অর্ডার করব?","WhatsApp বা ইমেইলে আপনার কাজের বিবরণ পাঠান। ২৪ ঘণ্টার মধ্যে উত্তর ও কোটেশন দিই।"]]}},
  {slug:"ecommerce-website",nav:"E-commerce",
   title:"E-commerce Website Developer · Online Store with bKash, Stripe & PayPal",
   h1:"Online stores that take payments and ship orders",
   desc:"Get a complete e-commerce website: product catalogue, cart, card, PayPal, bKash or Nagad payments, courier tracking and an admin panel. Built by Yeasin Arafat, the developer of Sunnah Store.",
   meta:"E-commerce website development: catalogue, cart, card, PayPal, bKash and Nagad payments, courier tracking and admin panel.",
   kw:"e-commerce website developer, online store developer, ecommerce website Bangladesh, ecommerce website Malaysia, bKash payment website, Stripe integration, Next.js ecommerce, online shop website, ই-কমার্স ওয়েবসাইট, অনলাইন শপ ওয়েবসাইট",
   intro:"I build online stores from the storefront to the admin panel: products, cart, checkout, payments, orders, delivery tracking and reports. Sunnah Store, my own live shop, runs on the same stack I use for clients.",
   points:["Storefront, cart and checkout that work well on phones","Payments by card, PayPal, Stripe, bKash, Nagad or cash on delivery","Admin panel for products, orders, offers and stock","Courier booking and order tracking emails","Multi-language shops, including Bangla and Arabic"],
   work:[["Sunnah Store","dev-sunnah.webp","https://sunnahstore.vercel.app/","Next.js, Prisma and PostgreSQL, with Stripe, PayPal and SSLCommerz."],["CloudEats · Nasi Lemak Paradise","dev-cloudeats.webp","/demo/cloudeats.html","A food ordering storefront on a microservices backend."],["Online Food Ordering System","dev-food-ordering.webp","/demo/food-ordering.html","Menu, cart, checkout and order tracking."],["Restaurant ordering app UI","hgs-app-demo-poster.jpg","/#p-halal-gyro-spot","An ordering prototype in a restaurant's own brand."]],
   pkg:"dev",
   faq:[["Which payment methods can my store accept?","Cards and FPX through Stripe, PayPal, and bKash, Nagad and cards in Bangladesh through SSLCommerz, plus cash on delivery. Orders are marked paid only after the payment provider confirms them."],["Can you connect a courier?","Yes. Sunnah Store books Steadfast deliveries in Bangladesh and tracks international parcels automatically, and I can set up the same for your shop."],["Do I need to know coding to run the store?","No. You manage products, prices, orders and offers from an admin panel."]],
   bn:{h:"অনলাইন শপ বা ই-কমার্স ওয়েবসাইট দরকার?",p:"প্রোডাক্ট, কার্ট, চেকআউট, বিকাশ/নগদ/কার্ড/ক্যাশ অন ডেলিভারি পেমেন্ট, কুরিয়ার ট্র্যাকিং আর অ্যাডমিন প্যানেলসহ পূর্ণাঙ্গ ই-কমার্স ওয়েবসাইট বানিয়ে দিই। আমার নিজের লাইভ শপ Sunnah Store এই একই প্রযুক্তিতে চলছে।",
     faq:[["বিকাশ দিয়ে পেমেন্ট নেওয়া যাবে?","হ্যাঁ। বিকাশ, নগদ, কার্ড, PayPal এবং ক্যাশ অন ডেলিভারি সব যোগ করা যায়।"],["অর্ডার ও প্রোডাক্ট কিভাবে ম্যানেজ করব?","একটি সহজ অ্যাডমিন প্যানেল থেকে প্রোডাক্ট, দাম, অর্ডার ও অফার নিজেই ম্যানেজ করতে পারবেন, কোডিং লাগবে না।"]]}},
  {slug:"ui-ux-design",nav:"UI/UX design",
   title:"UI/UX Designer · App & Website Design in Figma",
   h1:"App and website design that people find easy to use",
   desc:"UI/UX design by Yeasin Arafat: wireframes, clickable prototypes, app screens, website layouts and design systems in Figma, designed by a developer so they can actually be built.",
   meta:"UI/UX design by Yeasin Arafat: wireframes, prototypes, app screens and design systems in Figma, built by a developer.",
   kw:"UI/UX designer, UI designer, UX designer, app design, website design, Figma designer, wireframe, prototype, design system, UI UX designer Malaysia, UI UX designer Bangladesh, ইউআই ইউএক্স ডিজাইন",
   intro:"I design screens before any code is written, so you can see and click through your app or website first. Because I also build what I design, every layout is realistic to develop and consistent across phone, tablet and desktop.",
   points:["Wireframes and clickable prototypes","Mobile app screens and website layouts","Design systems: colours, type, buttons and components","Designs that match your brand","Developer-ready handoff, or I build it for you"],
   work:[["Restaurant ordering app UI","hgs-app-demo-poster.jpg","/#p-halal-gyro-spot","A clickable ordering prototype for The Halal Gyro Spot."],["Animated login & sign-up","demo-login.jpg","/demo/login.html","A sliding login and registration screen."],["Community website design","dev-cis.webp","/demo/campus-islamic-society.html","Prayer times, events and a clear call to join."],["Portfolio website","dev-portfolio.webp","/","A two-theme layout with case studies and a résumé page."]],
   pkg:"uiux",
   faq:[["What do I get from a UI/UX project?","Wireframes, final screens for phone and desktop, a clickable prototype and the design files, plus a style guide if you need one."],["Can you also build the design?","Yes. I'm a developer too, so I can turn the design into a working website or app."]],
   bn:{h:"অ্যাপ বা ওয়েবসাইটের ডিজাইন দরকার?",p:"Figma-তে ওয়্যারফ্রেম, ক্লিক করে দেখা যায় এমন প্রোটোটাইপ, অ্যাপ স্ক্রিন ও ওয়েবসাইট লেআউট ডিজাইন করি। আমি নিজেও ডেভেলপার, তাই ডিজাইনটা পরে বাস্তবে বানানোও সহজ হয়।",
     faq:[["ডিজাইনের পর অ্যাপ/ওয়েবসাইটও বানিয়ে দেবেন?","হ্যাঁ। ডিজাইন থেকে পুরো ওয়েবসাইট বা অ্যাপ তৈরিও করে দিই।"]]}},
  {slug:"seo-services",nav:"SEO",
   title:"SEO Services · Get Your Website Found on Google",
   h1:"SEO that helps customers find you on Google",
   desc:"SEO services by Yeasin Arafat: technical SEO, keyword research, on-page optimisation, Google Search Console and Google Business Profile for businesses in Malaysia, Bangladesh and worldwide.",
   meta:"SEO services by Yeasin Arafat: technical SEO, keyword research, on-page SEO, Search Console and Google Business Profile.",
   kw:"SEO services, SEO expert, SEO Malaysia, SEO Bangladesh, local SEO, Google ranking, technical SEO, Google Business Profile, website SEO, এসইও সার্ভিস, গুগলে র‍্যাংক",
   intro:"A website only brings customers if people can find it. I set up the technical side so Google can read your site properly, find the words your customers actually search for, and improve your pages for them, then report what changed each month.",
   points:["Keyword research for your market and language","Titles, descriptions, headings and internal links","Sitemap, robots.txt and structured data (rich results)","Google Search Console and Google Business Profile setup","Page speed and Core Web Vitals fixes","Monthly reports in plain words"],
   work:[["This portfolio","dev-portfolio.webp","/","Service pages, structured data, sitemap and Search Console, all set up."],["Sunnah Store","dev-sunnah.webp","https://sunnahstore.vercel.app/","A fast Next.js shop with product pages built for search."]],
   pkg:"seo",
   faq:[["Can you guarantee the first position on Google?","No honest SEO can. Google decides rankings. What I can promise is a site Google can read properly, pages targeting the right searches, and clear monthly reports on what improved."],["How long does SEO take to work?","Technical fixes are picked up in days to weeks. Rankings for competitive searches usually take two to six months of steady work."],["Do you do local SEO for shops and restaurants?","Yes. I set up and improve your Google Business Profile so you show up on Google Maps for searches in your area."]],
   bn:{h:"গুগলে আপনার ওয়েবসাইট খুঁজে পাওয়া যায় না?",p:"কীওয়ার্ড রিসার্চ, অন-পেজ SEO, সাইটম্যাপ, স্ট্রাকচার্ড ডাটা, Google Search Console ও Google Business Profile সেটআপ করে দিই, যাতে মানুষ গুগলে সার্চ করলে আপনার ব্যবসা খুঁজে পায়। প্রতি মাসে সহজ ভাষায় রিপোর্ট দিই।",
     faq:[["গুগলে ১ নম্বরে আনার গ্যারান্টি দেন?","না, কেউই সৎভাবে এটা দিতে পারে না। তবে আপনার সাইট যেন গুগল ঠিকভাবে বোঝে এবং সঠিক সার্চে আসে, সেই কাজ নিশ্চিত করি।"],["SEO তে কত দিন লাগে?","টেকনিক্যাল কাজের ফল কয়েক দিন থেকে কয়েক সপ্তাহে দেখা যায়। প্রতিযোগিতামূলক কীওয়ার্ডে সাধারণত ২ থেকে ৬ মাস লাগে।"]]}},
  {slug:"ai-automation",nav:"AI agents & automation",
   title:"AI Agents, AI Assistants & Automation for Businesses",
   h1:"AI agents and automation that run the busy work for you",
   desc:"AI agents, AI assistants and business automation by Yeasin Arafat, founder of Averroes AI: agents that take bookings and orders, chat assistants for websites and WhatsApp, and automated workflows with Gemini and OpenAI.",
   meta:"AI agents, AI assistants and automation by Yeasin Arafat: agents that book, order and follow up, plus WhatsApp chatbots.",
   kw:"AI agent, AI agent developer, AI assistant, AI automation, agentic AI, AI chatbot, AI chatbot for website, WhatsApp chatbot, business automation, workflow automation, AI developer, Gemini developer, OpenAI developer, AI agent Malaysia, AI automation Bangladesh, এআই এজেন্ট, এআই অটোমেশন, এআই চ্যাটবট",
   intro:"I'm the founder of Averroes AI. I build three kinds of AI for businesses: assistants that answer your customers day and night, agents that go further and take real actions such as booking a table, placing an order or updating your CRM, and automations that run routine work on their own. Try the live AI agent prototype below to see every step it takes.",
   points:["AI agents that use your tools: bookings, orders, payments, CRM","AI assistants for your website or WhatsApp, in English, Bangla and Malay","Answers based on your own products, prices and FAQs","Automations: replies, follow-ups, reminders and daily reports","Connects forms, Google Sheets, email, WhatsApp and your database","Safe by design: hands over to a person whenever it isn't sure"],
   work:[["AI Agent Front Desk","dev-ai-agent.webp","/demo/ai-agent.html","A live prototype: an AI agent that books tables, takes orders, tracks deliveries and runs automations."],["Amalnama AI assistant","dev-amalnama.webp","https://uowyeasin-cyber.github.io/AmalnamaForever/","An AI assistant (Gemini through Firebase) that answers with references."],["This portfolio's chatbot","dev-portfolio.webp","/","A site assistant that answers questions about services, prices and projects."]],
   pkg:"ai",
   faq:[["What is the difference between an AI assistant, an AI agent and AI automation?","An AI assistant answers questions. An AI agent also takes actions, such as booking a table, creating an order or updating your CRM. AI automation runs a fixed workflow on its own, such as sending a reminder or a nightly report. Most businesses use a mix of all three."],["What can AI automation do for a small business?","Answer common customer questions instantly, take bookings or orders, send follow-ups, sort messages and produce daily or weekly reports, so you spend time on the work only you can do."],["Will the chatbot give wrong answers?","It is set up to answer from your own information and to hand over to you when it isn't sure. You review and approve its answers before launch."],["Is my data safe?","Your data stays in your own accounts, and only the information the assistant needs is shared with the AI model."]],
   bn:{h:"ব্যবসায় AI এজেন্ট, অ্যাসিস্ট্যান্ট বা অটোমেশন চান?",p:"আপনার ওয়েবসাইট বা WhatsApp এর জন্য AI চ্যাটবট বানিয়ে দিই, যা ২৪ ঘণ্টা কাস্টমারের প্রশ্নের উত্তর দেবে। অর্ডার, বুকিং, ফলো-আপ মেসেজ ও রিপোর্টের মতো রুটিন কাজ অটোমেটিক করে দিই, যাতে আপনার সময় বাঁচে।",
     faq:[["AI চ্যাটবট কি বাংলায় উত্তর দিতে পারবে?","হ্যাঁ। বাংলা, ইংরেজিসহ একাধিক ভাষায় উত্তর দিতে পারে।"],["চ্যাটবট ভুল উত্তর দিলে?","এটি শুধু আপনার দেওয়া তথ্য থেকে উত্তর দেয়, আর নিশ্চিত না হলে আপনার কাছে পাঠিয়ে দেয়।"]]}},
  {slug:"portfolio-website",nav:"Portfolio sites",
   title:"Portfolio Website Design · Personal Portfolio for Students, Developers & Designers",
   h1:"A portfolio website that gets you hired",
   desc:"Get a personal portfolio website like yeasinarafatbd.vercel.app: light and dark themes, case studies, résumé page, Google-ready SEO and a private editor to update it yourself. Ready in about a week.",
   meta:"Personal portfolio website with light and dark themes, case studies, résumé page, SEO and a private editor. Ready in a week.",
   kw:"portfolio website, portfolio website design, personal website, portfolio for students, developer portfolio, designer portfolio, resume website, CV website, portfolio website developer, পোর্টফোলিও ওয়েবসাইট",
   intro:"Your portfolio is often the first thing a recruiter or client sees. I build personal sites that show your work properly, explain what you do in plain words, and let you update everything yourself from a private editor.",
   points:["Light and dark themes that look right on every screen","Case studies, galleries, projects and a one-page résumé with PDF download","Private owner editor: change text and images without code","Google-ready SEO, sitemap and social sharing previews","Your own domain, deployed and live in about a week"],
   work:[["This portfolio","dev-portfolio.webp","/","The site you are on: two themes, case studies, résumé and an owner editor."],["Community website design","dev-cis.webp","/demo/campus-islamic-society.html","A calm, readable layout for a student society."],["Animated login & sign-up","demo-login.jpg","/demo/login.html","A sliding sign-in screen with smooth CSS transitions."]],
   pkg:"dev",
   faq:[["Who is a portfolio website for?","Students applying for internships, developers, designers, photographers, teachers and freelancers: anyone who wants one link that shows their work and how to contact them."],["Can I edit my portfolio after it is live?","Yes. You get a private login where you can edit text, add projects and change images, then publish without touching code."],["How long does it take?","About a week once I have your content: photos, projects and a short bio."]],
   bn:{h:"নিজের পোর্টফোলিও ওয়েবসাইট চান?",p:"চাকরি, ইন্টার্নশিপ বা ক্লায়েন্ট পাওয়ার জন্য এই সাইটের মতো একটি প্রফেশনাল পোর্টফোলিও ওয়েবসাইট বানিয়ে দিই: লাইট ও ডার্ক থিম, প্রজেক্ট, রেজুমে ডাউনলোড, গুগল SEO এবং নিজে আপডেট করার জন্য প্রাইভেট এডিটর। সাধারণত এক সপ্তাহে লাইভ হয়ে যায়।",
     faq:[["পোর্টফোলিও ওয়েবসাইট কাদের জন্য?","শিক্ষার্থী, ডেভেলপার, ডিজাইনার, ফ্রিল্যান্সার, শিক্ষক: যে কেউ যিনি এক লিংকে নিজের কাজ দেখাতে চান।"],["পরে নিজে এডিট করতে পারব?","হ্যাঁ। প্রাইভেট লগইন দিয়ে লেখা, ছবি ও প্রজেক্ট নিজেই বদলাতে পারবেন, কোড লাগবে না।"]]}},
  {slug:"logo-design",nav:"Logo & branding",
   title:"Logo Designer · Logo & Brand Identity Design",
   h1:"Logos and brand identities that people remember",
   desc:"Logo and brand identity design by Yeasin Arafat: logos, monograms, badges, colour and type systems for restaurants, shops, startups and community groups in the USA, Malaysia and Bangladesh.",
   meta:"Logo and brand identity design by Yeasin Arafat: logos, monograms, badges, colours and type for shops, restaurants and startups.",
   kw:"logo designer, logo design, brand identity design, branding designer, business logo, restaurant logo, monogram logo, logo design Bangladesh, logo design Malaysia, লোগো ডিজাইন, লোগো ডিজাইনার, ব্র্যান্ডিং",
   intro:"A good logo works as a tiny app icon and on a shop sign. I design the mark, the colours and the type together, so everything you print or post afterwards already looks like one brand.",
   points:["Logo, wordmark, monogram or badge","2 to 3 concepts to choose from","Colour palette and font pairing","Versions for light, dark and single-colour use","Print and web files, plus source files"],
   work:[["The Halal Gyro Spot badge","hgs-badge-logo.webp","/#p-halal-gyro-spot","A badge logo and full brand system for a Florida restaurant."],["Panjabi Emporium","pe-logo.webp","/#p-panjabi-emporium","A logo for a clothing and lifestyle shop."],["Hidayah Shop","hid-shop-logo.webp","/#p-hidayah","Logo for an online store in Bangladesh."],["Halal Gyro Spot wordmark","hgs-wordmark.webp","/#p-halal-gyro-spot","A wordmark that matches the badge."]],
   pkg:"design",
   faq:[["How many logo concepts do I get?","Two concepts in the Starter package and more in the Brand kit, with two to three rounds of revisions."],["Will I own the logo?","Yes. Once paid, the logo and its files are yours, including the source files when your package includes them."]],
   bn:{h:"আপনার ব্যবসার জন্য লোগো দরকার?",p:"দোকান, রেস্টুরেন্ট, অনলাইন পেজ বা প্রতিষ্ঠানের জন্য প্রফেশনাল লোগো ও ব্র্যান্ড আইডেন্টিটি ডিজাইন করি: লোগো, রঙ, ফন্ট এবং প্রিন্ট ও সোশ্যাল মিডিয়ার জন্য সব ফাইল।",faq:[["লোগো ডিজাইনে কত দিন লাগে?","সাধারণত ২ থেকে ৫ দিনে প্রথম কনসেপ্ট পেয়ে যাবেন।"]]}},
  {slug:"menu-design",nav:"Menu & print design",
   title:"Restaurant Menu Design · Brochure & Print Design",
   h1:"Restaurant menus and print design that sell more",
   desc:"Restaurant menu design and print design by Yeasin Arafat: multi-page menus, takeaway brochures, flyers, certificates and forms, print-ready for restaurants, cafes and shops.",
   meta:"Restaurant menu and print design by Yeasin Arafat: menus, takeaway brochures, flyers and certificates, print-ready.",
   kw:"restaurant menu design, menu designer, cafe menu design, takeaway menu, brochure design, flyer design, print design, tri-fold brochure, মেনু ডিজাইন, রেস্টুরেন্ট মেনু ডিজাইন, ব্রোশিওর ডিজাইন",
   intro:"A menu is your best salesperson. I lay out menus so customers find dishes fast, see prices clearly and notice what you most want to sell, then deliver files your printer can use straight away.",
   points:["Multi-page dine-in and takeaway menus","Z-fold and tri-fold brochures","Flyers, posters and certificates","Print-ready PDFs with bleed","Matching digital versions for social media"],
   work:[["The Halal Gyro Spot menu","hgs-menu-cover.webp","/#p-halal-gyro-spot","A six-page menu for a Florida restaurant."],["Z-fold brochure","hgs-brochure-inside.webp","/#p-halal-gyro-spot","A takeaway brochure in three panels."],["Spring Hill Deli menu","shd-menu-cover.webp","/#p-spring-hill-deli","A printed deli menu with clear price pills."]],
   pkg:"design",
   faq:[["Can you print the menus for me?","I deliver print-ready files that any local printer can use, and I can advise on paper and finish."],["Can I update prices later?","Yes. I can send an editable version or update prices for you quickly."]],
   bn:{h:"রেস্টুরেন্টের মেনু বা প্রিন্ট ডিজাইন দরকার?",p:"রেস্টুরেন্ট ও ক্যাফের মেনু, টেকঅ্যাওয়ে ব্রোশিওর, ফ্লায়ার ও পোস্টার ডিজাইন করি, প্রিন্টের জন্য একদম রেডি ফাইলসহ।",faq:[["মেনুর দাম পরে বদলানো যাবে?","হ্যাঁ, পরে দাম বা আইটেম বদলে দিতে পারি।"]]}},
  {slug:"led-menu-board",nav:"LED menu boards",
   title:"Digital LED Menu Board Design for Restaurants",
   h1:"LED and TV menu boards that read from the queue",
   desc:"Digital menu board design by Yeasin Arafat: LED and TV menu screens for restaurants and cafes, laid out so prices and combos are easy to read from across the counter.",
   meta:"Digital LED and TV menu board design by Yeasin Arafat for restaurants and cafes, easy to read from across the counter.",
   kw:"LED menu board design, digital menu board, TV menu design, restaurant menu screen, digital signage design, menu board designer, ডিজিটাল মেনু বোর্ড, LED মেনু ডিজাইন",
   intro:"A counter screen has a few seconds to help a customer decide. I design LED and TV menus with big readable prices, clear categories and photos that make people hungry, sized exactly for your screens.",
   points:["1080p and 4K layouts for any screen","Single screens or multi-screen walls","Still menus or looping promo slides","Easy price updates"],
   work:[["The Halal Gyro Spot LED menu","hgs-led-menu.webp","/#p-halal-gyro-spot","A landscape LED board over the counter."],["Spring Hill Deli LED menu","shd-led-menu.webp","/#p-spring-hill-deli","A digital board for a deli counter."],["Display video","hgs-display-poster.jpg","/#p-halal-gyro-spot","A looping display video for in-store screens."]],
   pkg:"design",
   faq:[["What size should my menu board be?","Tell me your screen model or resolution and I'll design to fit it exactly, including multi-screen setups."]],
   bn:{h:"দোকানের জন্য LED বা TV মেনু বোর্ড চান?",p:"রেস্টুরেন্ট ও ক্যাফের LED/TV স্ক্রিনের জন্য মেনু বোর্ড ডিজাইন করি, যাতে লাইনে দাঁড়িয়েই কাস্টমার দাম ও আইটেম পরিষ্কার দেখতে পায়।",faq:[["আমার স্ক্রিনের মাপে হবে?","হ্যাঁ, আপনার স্ক্রিনের সাইজ অনুযায়ী ডিজাইন করি।"]]}},
  {slug:"social-media-design",nav:"Social media design",
   title:"Social Media Post Design · Facebook & Instagram Designer",
   h1:"Social media posts that make your page look professional",
   desc:"Social media design by Yeasin Arafat: Facebook and Instagram posts, covers, ads, stories and reels that keep your page looking like one brand, for businesses and creators.",
   meta:"Social media design by Yeasin Arafat: Facebook and Instagram posts, covers, ads, stories and reels for one consistent brand.",
   kw:"social media post design, Facebook post design, Instagram post design, social media designer, Facebook cover design, ad design, reels design, ফেসবুক পোস্ট ডিজাইন, সোশ্যাল মিডিয়া ডিজাইন, ফেসবুক কভার ডিজাইন",
   intro:"Your page is often the first place customers see you. I design posts, covers, ads and reels in one consistent style so your feed looks professional and every post is easy to recognise.",
   points:["1:1 and 4:5 feed posts","Stories and 9:16 reels covers","Facebook and YouTube covers","Ad creatives and launch campaigns","Templates you can reuse"],
   work:[["Gyro platters post","hgs-social-platters.webp","/#p-halal-gyro-spot","A feed post for a Florida restaurant."],["Order now post","hgs-social-order-now.webp","/#p-halal-gyro-spot","A delivery campaign post."],["Panjabi Emporium Facebook cover","pe-fb-cover.webp","/#p-panjabi-emporium","A shop cover for Facebook."],["Clothing promo","hid-clothing-promo.webp","/#p-hidayah","A promo post for an online store."]],
   pkg:"design",
   faq:[["Do you also post and manage the page?","My focus is design, but I can prepare a month of posts with captions and hashtags ready for you to schedule."]],
   bn:{h:"ফেসবুক/ইনস্টাগ্রাম পোস্ট ডিজাইন দরকার?",p:"ফেসবুক ও ইনস্টাগ্রামের পোস্ট, কভার, অ্যাড ও রিলস ডিজাইন করি, যাতে আপনার পেজ একটা প্রফেশনাল ব্র্যান্ডের মতো দেখায়।",faq:[["মাসিক প্যাকেজে পোস্ট ডিজাইন করেন?","হ্যাঁ, মাসে নির্দিষ্ট সংখ্যক পোস্ট ক্যাপশনসহ ডিজাইন করে দিতে পারি।"]]}},
  {slug:"video-editing",nav:"Video editing",
   title:"Video Editor · Promo Videos, Reels & Motion Graphics",
   h1:"Promo videos and reels that stop the scroll",
   desc:"Video editing by Yeasin Arafat: promo videos, reels, shorts, in-store display videos, YouTube thumbnails and motion text for restaurants, shops and creators.",
   meta:"Video editing by Yeasin Arafat: promo videos, reels, shorts, display videos, YouTube thumbnails and motion text.",
   kw:"video editor, promo video editing, reels editing, YouTube video editor, short video editing, motion graphics, product video, restaurant promo video, ভিডিও এডিটিং, ভিডিও এডিটর, রিলস এডিটিং",
   intro:"I edit short promos, reels and longer display videos with motion text, music and sound, cut to the length each platform likes and branded to match the rest of your design.",
   points:["Promo videos and product videos","Reels, Shorts and TikToks (9:16)","In-store display loops","YouTube thumbnails and motion text"],
   work:[["Chicken Gyro on Pita promo","gyro-pita-poster.jpg","/#work","A 30-second food promo."],["Halal Gyro Spot display video","hgs-display-poster.jpg","/#p-halal-gyro-spot","A looping in-store display video."],["YouTube thumbnail","edu-youtube-thumb.webp","/#p-education","A thumbnail for an education channel."]],
   pkg:"design",
   faq:[["What do I need to send?","Your clips, photos and logo, or I can build a promo from photos and motion graphics alone."]],
   bn:{h:"প্রোমো ভিডিও বা রিলস এডিট করাতে চান?",p:"প্রোমো ভিডিও, রিলস, শর্টস, দোকানের ডিসপ্লে ভিডিও ও ইউটিউব থাম্বনেইল তৈরি করি, মোশন টেক্সট ও মিউজিকসহ।",faq:[["ছবি দিয়ে ভিডিও বানানো যাবে?","হ্যাঁ, শুধু ছবি ও লোগো দিয়েও প্রোমো ভিডিও বানানো যায়।"]]}},
  {slug:"graphic-design",nav:"Graphic design",
   title:"Graphic Designer · Logo, Menu, Social Media & Brand Design",
   h1:"Logos, menus and social media design for growing brands",
   desc:"Graphic design by Yeasin Arafat: logos, brand identity, restaurant menus, LED menu boards, brochures, social media posts and promo videos for businesses in the USA, Malaysia and Bangladesh.",
   meta:"Graphic design by Yeasin Arafat: logos, branding, menus, LED menu boards, brochures, social posts and promo videos.",
   kw:"graphic designer, logo design, brand identity, restaurant menu design, social media design, LED menu board, brochure design, banner design, freelance graphic designer, লোগো ডিজাইন, গ্রাফিক ডিজাইনার, মেনু ডিজাইন",
   intro:"I've designed complete brands for restaurants, shops and community groups: the logo, the menu, the shop screen and the social posts, all in one consistent style. Clients include The Halal Gyro Spot in Florida and Spring Hill Deli.",
   points:["Logo, monogram and full brand identity","Restaurant menus, brochures and print-ready files","LED and TV menu boards","Social media posts, covers and reels","Promo videos and motion graphics"],
   work:[["The Halal Gyro Spot logo","hgs-badge-logo.webp","/#p-halal-gyro-spot","A badge logo and full brand system for a Florida restaurant."],["Restaurant menu","hgs-menu-cover.webp","/#p-halal-gyro-spot","Multi-page print menu, ready for the printer."],["LED menu board","hgs-led-menu.webp","/#work","A counter screen menu that reads from the queue."],["Social media post","hgs-social-platters.webp","/#work","Feed posts that keep the brand consistent."]],
   pkg:"design",
   faq:[["What files will I receive?","Print-ready PDFs, PNG and JPG files for web and social media, and source files when the package includes them."],["How many revisions do I get?","Two or three rounds depending on the package, so you can fine-tune the design until it is right."]],
   bn:{h:"লোগো, মেনু বা সোশ্যাল মিডিয়া ডিজাইন দরকার?",p:"লোগো, ব্র্যান্ড আইডেন্টিটি, রেস্টুরেন্ট মেনু, LED মেনু বোর্ড, ব্রোশিওর, ফেসবুক পোস্ট/কভার ও প্রোমো ভিডিও ডিজাইন করি। আমেরিকা, মালয়েশিয়া ও বাংলাদেশের ব্যবসার জন্য কাজ করেছি।",
     faq:[["কী কী ফাইল পাব?","প্রিন্টের জন্য PDF, ওয়েব ও সোশ্যাল মিডিয়ার জন্য PNG/JPG, আর প্যাকেজে থাকলে সোর্স ফাইল।"]]}},
];
