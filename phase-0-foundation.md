# Phase 0 — Foundation
## What this phase does
Sets up the entire project skeleton: folder structure, data files (cities + equipment), the shared design token CSS, the shared components (navbar + footer as JS strings), and the Node.js build script that generates all 45 pages. **Nothing visible yet — this is the engine.**

---

## Step 1 — Create this exact folder structure

```
rams-audiovisuals/
├── data/
│   ├── cities.js
│   └── equipData.js
├── src/
│   ├── templates/
│   │   ├── index.html          ← homepage template
│   │   ├── equipment.html      ← equipment hub template
│   │   ├── about.html
│   │   ├── contact.html
│   │   ├── privacy-policy.html
│   │   ├── city.html           ← city landing template
│   │   └── city-service.html   ← city+service template
│   ├── css/
│   │   └── main.css
│   └── js/
│       └── main.js
├── public/                     ← BUILD OUTPUT (do not edit manually)
├── build.js                    ← Node.js build script
└── package.json
```

---

## Step 2 — Create `package.json`

```json
{
  "name": "rams-audiovisuals",
  "version": "1.0.0",
  "description": "Rams AudioVisuals static site",
  "scripts": {
    "build": "node build.js",
    "watch": "node build.js --watch"
  },
  "engines": {
    "node": ">=16.0.0"
  }
}
```

---

## Step 3 — Create `data/cities.js`

```js
export const cities = [
  {
    slug: "hyderabad",
    name: "Hyderabad",
    phone: "9700033342",
    phoneDisplay: "+91 97000 33342",
    whatsapp: "919700033342",
    areas: "Banjara Hills, Jubilee Hills, Gachibowli, Madhapur, Hitech City, Kondapur, Kukatpally, Secunderabad, Begumpet, Ameerpet",
    established: "2016",
    eventsServed: "200+",
    tagline: "Your trusted AV partner across Hyderabad",
    testimonials: [
      { name: "Ravi K.", area: "Gachibowli", text: "Excellent setup for our corporate event. Delivered on time and everything worked perfectly." },
      { name: "Priya S.", area: "Banjara Hills", text: "Rented projector and sound system for a wedding. Professional team, great equipment." }
    ],
    metaDescription: "AV equipment for rent in Hyderabad — projectors, sound systems, mics, TVs, LED screens & combo packages. Delivered & set up. Call 9700033342."
  },
  {
    slug: "bangalore",
    name: "Bangalore",
    phone: "9553703737",
    phoneDisplay: "+91 95537 03737",
    whatsapp: "919553703737",
    areas: "Koramangala, HSR Layout, Whitefield, Electronic City, Indiranagar, Marathahalli, Jayanagar, JP Nagar, Hebbal, Yeshwanthpur",
    established: "2017",
    eventsServed: "180+",
    tagline: "Trusted AV rentals across Bangalore",
    testimonials: [
      { name: "Anand M.", area: "Whitefield", text: "Best projector rental in Bangalore. Setup was quick and the team was very professional." },
      { name: "Sneha R.", area: "Koramangala", text: "Rented sound system for a product launch. Crystal clear audio, zero issues." }
    ],
    metaDescription: "AV equipment for rent in Bangalore — projectors, sound systems, mics, TVs, LED screens & combo packages. Delivered & set up. Call 9553703737."
  },
  {
    slug: "mumbai",
    name: "Mumbai",
    phone: "9553073030",
    phoneDisplay: "+91 95530 73030",
    whatsapp: "919553073030",
    areas: "Andheri, Bandra, Powai, Malad, Goregaon, Borivali, Thane, Navi Mumbai, Kurla, Dadar",
    established: "2018",
    eventsServed: "150+",
    tagline: "Premium AV rentals across Mumbai",
    testimonials: [
      { name: "Rahul D.", area: "Andheri", text: "Reliable service for our office conference. Equipment was top-notch and delivery was on time." },
      { name: "Meena P.", area: "Bandra", text: "Used their combo package for a birthday party. Great value and excellent sound quality." }
    ],
    metaDescription: "AV equipment for rent in Mumbai — projectors, sound systems, mics, TVs, LED screens & combo packages. Delivered & set up. Call 9553073030."
  },
  {
    slug: "chennai",
    name: "Chennai",
    phone: "9014885749",
    phoneDisplay: "+91 90148 85749",
    whatsapp: "919014885749",
    areas: "Anna Nagar, T. Nagar, Velachery, Adyar, Tambaram, Porur, Mogappair, Guindy, Chromepet, Sholinganallur",
    established: "2019",
    eventsServed: "120+",
    tagline: "Reliable AV rentals across Chennai",
    testimonials: [
      { name: "Karthik V.", area: "Anna Nagar", text: "Projector and screen for our school event. Everything was set up perfectly on time." },
      { name: "Lakshmi N.", area: "T. Nagar", text: "Great mic and speaker rental for our family function. Very professional service." }
    ],
    metaDescription: "AV equipment for rent in Chennai — projectors, sound systems, mics, TVs, LED screens & combo packages. Delivered & set up. Call 9014885749."
  },
  {
    slug: "pune",
    name: "Pune",
    phone: "9133033004",
    phoneDisplay: "+91 91330 33004",
    whatsapp: "919133033004",
    areas: "Hinjewadi, Wakad, Baner, Aundh, Kothrud, Viman Nagar, Hadapsar, Magarpatta, Shivajinagar, Pimpri-Chinchwad",
    established: "2019",
    eventsServed: "110+",
    tagline: "Quality AV rentals across Pune",
    testimonials: [
      { name: "Sanjay B.", area: "Hinjewadi", text: "Used projector and sound system for a tech meetup. Flawless experience from booking to setup." },
      { name: "Pooja K.", area: "Baner", text: "Reliable rental service. Equipment quality was exactly as described. Will use again." }
    ],
    metaDescription: "AV equipment for rent in Pune — projectors, sound systems, mics, TVs, LED screens & combo packages. Delivered & set up. Call 9133033004."
  }
];

export const services = [
  { slug: "projector-for-rent",     name: "Projectors & Screens", category: "projector", icon: "projector", h1suffix: "Projector for rent",     metaSuffix: "projectors & LED screens for rent" },
  { slug: "sound-system-for-rent",  name: "Sound Systems",        category: "sound",     icon: "sound",     h1suffix: "Sound system for rent",    metaSuffix: "sound systems for rent" },
  { slug: "mic-for-rent",           name: "Microphones",          category: "mic",       icon: "mic",       h1suffix: "Microphone for rent",      metaSuffix: "microphones for rent" },
  { slug: "tv-for-rent",            name: "Televisions",          category: "tv",        icon: "tv",        h1suffix: "TV for rent",              metaSuffix: "TVs & displays for rent" },
  { slug: "speaker-for-rent",       name: "Speakers",             category: "sound",     icon: "speaker",   h1suffix: "Speaker for rent",         metaSuffix: "speakers for rent" },
  { slug: "led-screen-for-rent",    name: "LED Screens",          category: "projector", icon: "screen",    h1suffix: "LED screen for rent",      metaSuffix: "LED walls & screens for rent" },
  { slug: "combo-packages",         name: "Combo Packages",       category: "combo",     icon: "combo",     h1suffix: "AV combo packages",        metaSuffix: "AV combo packages" }
];
```

---

## Step 4 — Create `data/equipData.js`

```js
export const equipment = [
  {
    id: 1,
    category: "projector",
    subcategory: "screen",
    image: "https://5.imimg.com/data5/JC/LO/AL/SELLER-29628542/liberty-tripod-projector-screen-6-x-8-.jpg",
    badge: "New",
    name: "Tripod Screen",
    model: "Liberty projection screen",
    price: "1,199",
    extraPrice: "799",
    bookedCount: 85,
    rating: 4.8
  },
  {
    id: 2,
    category: "projector",
    subcategory: "screen",
    image: "https://sc04.alicdn.com/kf/Hbccb8bc8d6414a3482c5373f9dc0e5b0r.jpg",
    badge: "Popular",
    name: "LED Wall (Custom Size)",
    model: "P2.9 & P3.9 LED panels",
    price: "89–119 / sq.ft",
    extraPrice: "79–99 / sq.ft",
    bookedCount: 900,
    rating: 4.9
  },
  {
    id: 3,
    category: "projector",
    subcategory: "projector",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQkdZ2UJvUaNetg7jrgBBXEjANxto3mmfRe_Q&s",
    badge: "Compact & Bright",
    name: "Panasonic PT-VMZ51S",
    model: "5200 lm laser projector",
    price: "2,999",
    extraPrice: "2,499",
    bookedCount: 64,
    rating: 5.0
  },
  {
    id: 4,
    category: "projector",
    subcategory: "projector",
    image: "https://mediaserver.goepson.com/ImConvServlet/imconv/1c8eda8cecc529167b67332c3ba9d45b79729d96/1200Wx1200H?use=banner&hybrisId=B2C&assetDescr=972_Ad_No.2",
    badge: "Trending",
    name: "Epson PowerLite 107",
    model: "3LCD 3900 lm projector",
    price: "1,800",
    extraPrice: "1,200",
    bookedCount: 210,
    rating: 4.5
  },
  {
    id: 5,
    category: "projector",
    subcategory: "screen",
    image: "https://www.hawaiiledscreen.com/dynamic/Blog/LED_screen_display_in_kerala.jpg",
    badge: "New Arrival",
    name: "LED Wall (8×12 ft)",
    model: "P3.9 outdoor LED wall",
    price: "8,544",
    extraPrice: "7,999",
    bookedCount: 92,
    rating: 4.7
  },
  {
    id: 6,
    category: "sound",
    subcategory: "speaker",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSXBhTDsHI3nMx3QGm02s0FjtprPUV2jAq3vA&s",
    badge: "Best for Everyone",
    name: "Power X Monitors",
    model: "400W high-bass speaker",
    price: "1,999",
    extraPrice: "1,499",
    bookedCount: 300,
    rating: 4.9
  },
  {
    id: 7,
    category: "sound",
    subcategory: "speaker",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSSQEs24A25eNvtGGgjzblbgV0JOVMl6U2aYw&s",
    badge: "Compact Setup",
    name: "Clarion JM DC 1520",
    model: "Party speaker",
    price: "1,499",
    extraPrice: "999",
    bookedCount: 145,
    rating: 4.6
  },
  {
    id: 8,
    category: "sound",
    subcategory: "speaker",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRFrPUDjhSJzLQMClrQRNNmNjiYZgagIXbinA&s",
    badge: "Premium Audio",
    name: "JBL PRX412M",
    model: "2-way passive speaker",
    price: "1,699",
    extraPrice: "1,299",
    bookedCount: 88,
    rating: 4.8
  },
  {
    id: 9,
    category: "sound",
    subcategory: "speaker",
    image: "https://cdn.dotpe.in/longtail/item_category/compressed/8087000/E0AG6G8U.webp",
    badge: "Portable",
    name: "Samcon 1202 Karaoke Trolley",
    model: "120W portable speaker",
    price: "1,299",
    extraPrice: "899",
    bookedCount: 112,
    rating: 4.7
  },
  {
    id: 10,
    category: "sound",
    subcategory: "mixer",
    image: "https://develectronics.com/cdn/shop/files/Untitleddesign-2023-05-12T233009.810.jpg?v=1683914436&width=1445",
    badge: "Best Seller",
    name: "Studiomaster AiR 12 Mixer",
    model: "12-channel mixer, EQ & effects",
    price: "2,499",
    extraPrice: "1,499",
    bookedCount: 245,
    rating: 4.8
  },
  {
    id: 11,
    category: "mic",
    subcategory: "system",
    image: "https://m.media-amazon.com/images/I/71JMd9qdevL._AC_UF1000,1000_QL80_.jpg",
    badge: "All-in-One",
    name: "PA System",
    model: "2 speakers, stand, mixer & 2 cordless mics",
    price: "3,999",
    extraPrice: "2,999",
    bookedCount: 165,
    rating: 5.0
  },
  {
    id: 12,
    category: "mic",
    subcategory: "wireless",
    image: "https://m.media-amazon.com/images/I/717pMFmDYXL.jpg",
    badge: "Most Used",
    name: "Studiomaster Dual Wireless Mic",
    model: "2 handheld UHF wireless mics",
    price: "1,199",
    extraPrice: "799",
    bookedCount: 502,
    rating: 4.6
  },
  {
    id: 13,
    category: "mic",
    subcategory: "wireless",
    image: "https://images.sharepal.in/categories/audio-visual-equipment/mics/ahuja-dualhand-mic/ahuja-dual-hand-wireless-microphone-on-rent-sharepal-1.webp",
    badge: "Reliable Choice",
    name: "Ahuja AWM-495V2 Dual Mic",
    model: "Dual handheld mics, 200ft range",
    price: "499",
    extraPrice: "299",
    bookedCount: 78,
    rating: 4.9
  },
  {
    id: 14,
    category: "mic",
    subcategory: "wearable",
    image: "https://parasproaudio.com/wp-content/uploads/2022/02/Ahuja-ABW-400UL.jpg.webp",
    badge: "Hands-Free",
    name: "Ahuja Collar / Headband Mic",
    model: "Wireless collar & headband mic",
    price: "599",
    extraPrice: "399",
    bookedCount: 132,
    rating: 4.7
  },
  {
    id: 15,
    category: "tv",
    subcategory: "led",
    image: "https://img-prd-pim.poorvika.com/product/samsung-full-hd-led-smart-tv-t5410-43-inch-left-view.png",
    badge: "Smart Display",
    name: "Samsung 43\" LED Smart TV",
    model: "Full HD Smart TV",
    price: "1,999",
    extraPrice: "1,499",
    bookedCount: 198,
    rating: 4.4
  },
  {
    id: 16,
    category: "tv",
    subcategory: "qled",
    image: "https://m.media-amazon.com/images/I/81Exwf8E5PL.jpg",
    badge: "Pro Display",
    name: "VU 55\" QLED Google TV",
    model: "4K Ultra HD Pro Series",
    price: "2,499",
    extraPrice: "1,999",
    bookedCount: 132,
    rating: 4.7
  },
  {
    id: 17,
    category: "tv",
    subcategory: "qled",
    image: "https://m.media-amazon.com/images/I/81zfb2wGNeL._AC_UF1000,1000_QL80_.jpg",
    badge: "Pro Display",
    name: "VU 65\" QLED Google TV",
    model: "4K Ultra HD Pro Series",
    price: "2,999",
    extraPrice: "2,499",
    bookedCount: 132,
    rating: 4.7
  },
  {
    id: 18,
    category: "combo",
    subcategory: "standard",
    image: "https://5.imimg.com/data5/XD/TD/RN/SELLER-1875763/pa-audio-system-250x250.jpg",
    badge: "Super Saver",
    name: "Projector + Screen + Speaker",
    model: "Projector, tripod screen, speaker & 2 cordless mics",
    price: "2,999",
    extraPrice: "2,499",
    bookedCount: 423,
    rating: 4.9
  },
  {
    id: 19,
    category: "combo",
    subcategory: "pa",
    image: "https://5.imimg.com/data5/XD/TD/RN/SELLER-1875763/pa-audio-system-250x250.jpg",
    badge: "Elite Package",
    name: "PA System Package",
    model: "Mixer, 2 powered speakers, stands & 2 cordless mics",
    price: "3,999",
    extraPrice: "2,999",
    bookedCount: 132,
    rating: 4.5
  },
  {
    id: 20,
    category: "combo",
    subcategory: "pro",
    image: "https://5.imimg.com/data5/XD/TD/RN/SELLER-1875763/pa-audio-system-250x250.jpg",
    badge: "Pro",
    name: "Complete Presentation Setup",
    model: "Projector, screen, mixer, 2 speakers, laptop & slide changer",
    price: "5,999",
    extraPrice: "4,999",
    bookedCount: 198,
    rating: 4.7
  }
];
```

---

## Step 5 — Create `src/css/main.css`

```css
/* ============================================
   RAMS AUDIOVISUALS — DESIGN TOKENS & BASE
   ============================================ */

:root {
  --bg:          #F4F6F9;
  --card:        #FFFFFF;
  --blue:        #3B82F6;
  --blue-light:  #EFF6FF;
  --blue-dark:   #1D4ED8;
  --text-primary:   #1A1A2E;
  --text-secondary: #6B7280;
  --text-muted:     #9CA3AF;
  --border:      #E5E7EB;
  --border-strong: #D1D5DB;
  --success:     #10B981;
  --radius-sm:   8px;
  --radius-md:   12px;
  --radius-lg:   16px;
  --radius-xl:   24px;
  --shadow-card: 0 1px 3px rgba(0,0,0,0.06), 0 1px 2px rgba(0,0,0,0.04);
  --shadow-hover: 0 4px 12px rgba(0,0,0,0.10);
  --font: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  --transition: 0.2s ease;
  --max-width: 1200px;
  --nav-height: 64px;
}

/* ===== RESET ===== */
*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
html { scroll-behavior: smooth; -webkit-text-size-adjust: 100%; }
body {
  font-family: var(--font);
  background: var(--bg);
  color: var(--text-primary);
  line-height: 1.6;
  font-size: 16px;
  -webkit-font-smoothing: antialiased;
}
img { max-width: 100%; height: auto; display: block; }
a { color: inherit; text-decoration: none; }
ul { list-style: none; }
button { cursor: pointer; border: none; background: none; font-family: var(--font); }

/* ===== TYPOGRAPHY ===== */
h1 { font-size: clamp(1.75rem, 5vw, 2.5rem); font-weight: 700; line-height: 1.2; letter-spacing: -0.02em; }
h2 { font-size: clamp(1.35rem, 3.5vw, 1.875rem); font-weight: 600; line-height: 1.3; letter-spacing: -0.01em; }
h3 { font-size: clamp(1.1rem, 2.5vw, 1.25rem); font-weight: 600; line-height: 1.4; }
h4 { font-size: 1rem; font-weight: 600; }
p  { color: var(--text-secondary); line-height: 1.7; }

/* ===== LAYOUT ===== */
.container { width: 100%; max-width: var(--max-width); margin: 0 auto; padding: 0 20px; }
.section { padding: 64px 0; }
.section--sm { padding: 40px 0; }

/* ===== NAVBAR ===== */
.navbar {
  position: sticky; top: 0; z-index: 100;
  height: var(--nav-height);
  background: rgba(255,255,255,0.92);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border-bottom: 1px solid var(--border);
}
.navbar__inner {
  display: flex; align-items: center; justify-content: space-between;
  height: 100%;
}
.navbar__logo {
  font-size: 1.125rem; font-weight: 700;
  color: var(--text-primary);
  display: flex; align-items: center; gap: 8px;
}
.navbar__logo span { color: var(--blue); }
.navbar__links {
  display: flex; align-items: center; gap: 32px;
}
.navbar__links a {
  font-size: 0.9rem; font-weight: 500;
  color: var(--text-secondary);
  transition: color var(--transition);
}
.navbar__links a:hover, .navbar__links a.active { color: var(--blue); }
.navbar__cta {
  background: var(--blue); color: #fff;
  padding: 10px 20px; border-radius: var(--radius-sm);
  font-size: 0.875rem; font-weight: 600;
  transition: background var(--transition), transform var(--transition);
  display: flex; align-items: center; gap: 6px;
}
.navbar__cta:hover { background: var(--blue-dark); transform: translateY(-1px); }
.navbar__hamburger {
  display: none;
  flex-direction: column; gap: 5px;
  width: 24px; height: 20px;
  background: none; border: none; cursor: pointer; padding: 0;
}
.navbar__hamburger span {
  display: block; width: 100%; height: 2px;
  background: var(--text-primary);
  border-radius: 2px;
  transition: all var(--transition);
}
.navbar__mobile {
  display: none;
  position: absolute; top: var(--nav-height); left: 0; right: 0;
  background: var(--card);
  border-bottom: 1px solid var(--border);
  padding: 16px 20px 20px;
  flex-direction: column; gap: 4px;
}
.navbar__mobile a {
  display: block; padding: 12px 0;
  font-size: 1rem; font-weight: 500;
  color: var(--text-primary);
  border-bottom: 1px solid var(--border);
}
.navbar__mobile a:last-child { border-bottom: none; }
.navbar__mobile.open { display: flex; }

/* ===== BUTTONS ===== */
.btn {
  display: inline-flex; align-items: center; gap: 8px;
  padding: 14px 28px; border-radius: var(--radius-sm);
  font-size: 1rem; font-weight: 600;
  transition: all var(--transition);
  white-space: nowrap;
}
.btn--primary { background: var(--blue); color: #fff; }
.btn--primary:hover { background: var(--blue-dark); transform: translateY(-1px); box-shadow: 0 4px 16px rgba(59,130,246,0.35); }
.btn--secondary { background: var(--card); color: var(--text-primary); border: 1.5px solid var(--border-strong); }
.btn--secondary:hover { border-color: var(--blue); color: var(--blue); }
.btn--whatsapp { background: #25D366; color: #fff; }
.btn--whatsapp:hover { background: #1ebe5a; transform: translateY(-1px); }
.btn--sm { padding: 10px 20px; font-size: 0.875rem; }
.btn--full { width: 100%; justify-content: center; }

/* ===== CARDS ===== */
.card {
  background: var(--card);
  border: 1px solid var(--border);
  border-radius: var(--radius-md);
  overflow: hidden;
  transition: box-shadow var(--transition), transform var(--transition);
}
.card:hover { box-shadow: var(--shadow-hover); transform: translateY(-2px); }

/* ===== EQUIPMENT CARD ===== */
.equip-card { display: flex; flex-direction: column; }
.equip-card__image {
  position: relative; aspect-ratio: 4/3; overflow: hidden;
  background: var(--bg);
}
.equip-card__image img {
  width: 100%; height: 100%; object-fit: cover;
  transition: transform 0.4s ease;
}
.equip-card:hover .equip-card__image img { transform: scale(1.04); }
.equip-card__badge {
  position: absolute; top: 10px; left: 10px;
  background: var(--blue); color: #fff;
  font-size: 0.7rem; font-weight: 700;
  padding: 4px 10px; border-radius: 20px;
  letter-spacing: 0.03em;
}
.equip-card__body { padding: 16px; flex: 1; display: flex; flex-direction: column; gap: 6px; }
.equip-card__name { font-size: 0.975rem; font-weight: 600; color: var(--text-primary); line-height: 1.3; }
.equip-card__model { font-size: 0.8rem; color: var(--text-muted); }
.equip-card__meta {
  display: flex; align-items: center; justify-content: space-between;
  margin-top: auto; padding-top: 10px;
  border-top: 1px solid var(--border);
}
.equip-card__price { font-size: 1rem; font-weight: 700; color: var(--text-primary); }
.equip-card__price span { font-size: 0.75rem; font-weight: 400; color: var(--text-muted); }
.equip-card__rating {
  display: flex; align-items: center; gap: 4px;
  font-size: 0.8rem; font-weight: 600; color: var(--text-secondary);
}
.equip-card__rating::before { content: "★"; color: #F59E0B; }
.equip-card__cta {
  margin: 0 16px 16px;
  background: var(--blue-light); color: var(--blue);
  padding: 10px; border-radius: var(--radius-sm);
  font-size: 0.875rem; font-weight: 600;
  text-align: center;
  transition: background var(--transition), color var(--transition);
  display: block;
}
.equip-card__cta:hover { background: var(--blue); color: #fff; }

/* ===== BADGE / PILL ===== */
.badge { display: inline-block; font-size: 0.75rem; font-weight: 600; padding: 4px 12px; border-radius: 20px; }
.badge--blue { background: var(--blue-light); color: var(--blue); }
.badge--green { background: #ECFDF5; color: #059669; }
.badge--grey { background: var(--bg); color: var(--text-secondary); border: 1px solid var(--border); }

/* ===== SECTION HEADER ===== */
.section-header { text-align: center; margin-bottom: 48px; }
.section-header .badge { margin-bottom: 12px; }
.section-header h2 { margin-bottom: 12px; }
.section-header p { max-width: 560px; margin: 0 auto; }

/* ===== GRID SYSTEMS ===== */
.grid { display: grid; gap: 20px; }
.grid--2 { grid-template-columns: repeat(2, 1fr); }
.grid--3 { grid-template-columns: repeat(3, 1fr); }
.grid--4 { grid-template-columns: repeat(4, 1fr); }
.grid--auto { grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); }

/* ===== CITY CARD ===== */
.city-card {
  background: var(--card); border: 1px solid var(--border);
  border-radius: var(--radius-md); padding: 24px;
  display: flex; flex-direction: column; gap: 12px;
  transition: all var(--transition);
  cursor: pointer;
}
.city-card:hover { border-color: var(--blue); box-shadow: 0 0 0 3px var(--blue-light), var(--shadow-hover); }
.city-card__name { font-size: 1.125rem; font-weight: 700; }
.city-card__phone { font-size: 0.875rem; color: var(--text-secondary); display: flex; align-items: center; gap: 6px; }
.city-card__link { font-size: 0.875rem; font-weight: 600; color: var(--blue); display: flex; align-items: center; gap: 4px; }

/* ===== SERVICE CARD ===== */
.service-card {
  background: var(--card); border: 1px solid var(--border);
  border-radius: var(--radius-md); padding: 24px 20px;
  display: flex; flex-direction: column; align-items: flex-start; gap: 10px;
  transition: all var(--transition); cursor: pointer;
}
.service-card:hover { border-color: var(--blue); transform: translateY(-2px); box-shadow: var(--shadow-hover); }
.service-card__icon {
  width: 48px; height: 48px; background: var(--blue-light);
  border-radius: var(--radius-sm);
  display: flex; align-items: center; justify-content: center;
  font-size: 1.375rem;
}
.service-card__name { font-size: 0.975rem; font-weight: 600; }
.service-card__desc { font-size: 0.8rem; color: var(--text-secondary); }
.service-card__arrow { font-size: 0.875rem; color: var(--blue); font-weight: 600; margin-top: auto; }

/* ===== STAT CARD ===== */
.stat-card {
  background: var(--card); border: 1px solid var(--border);
  border-radius: var(--radius-md); padding: 24px;
  text-align: center;
}
.stat-card__number { font-size: 2rem; font-weight: 700; color: var(--blue); }
.stat-card__label { font-size: 0.875rem; color: var(--text-secondary); margin-top: 4px; }

/* ===== HOW IT WORKS ===== */
.how-step {
  display: flex; flex-direction: column; align-items: center;
  text-align: center; gap: 12px;
}
.how-step__number {
  width: 48px; height: 48px; border-radius: 50%;
  background: var(--blue); color: #fff;
  display: flex; align-items: center; justify-content: center;
  font-size: 1.125rem; font-weight: 700;
}
.how-step__title { font-size: 1rem; font-weight: 600; }
.how-step__desc { font-size: 0.875rem; color: var(--text-secondary); }

/* ===== TESTIMONIAL CARD ===== */
.testimonial-card {
  background: var(--card); border: 1px solid var(--border);
  border-radius: var(--radius-md); padding: 24px;
}
.testimonial-card__quote { font-size: 0.9rem; color: var(--text-secondary); line-height: 1.7; margin-bottom: 16px; font-style: italic; }
.testimonial-card__author { font-size: 0.875rem; font-weight: 600; }
.testimonial-card__location { font-size: 0.8rem; color: var(--text-muted); }

/* ===== FAQ ===== */
.faq-item {
  background: var(--card); border: 1px solid var(--border);
  border-radius: var(--radius-sm); overflow: hidden; margin-bottom: 8px;
}
.faq-item__question {
  width: 100%; display: flex; align-items: center; justify-content: space-between;
  padding: 18px 20px; font-size: 0.975rem; font-weight: 600;
  text-align: left; background: none; border: none; cursor: pointer;
  color: var(--text-primary); font-family: var(--font);
  transition: color var(--transition);
}
.faq-item__question:hover { color: var(--blue); }
.faq-item__icon { font-size: 1.25rem; color: var(--blue); transition: transform var(--transition); font-style: normal; }
.faq-item.open .faq-item__icon { transform: rotate(45deg); }
.faq-item__answer { padding: 0 20px; max-height: 0; overflow: hidden; transition: max-height 0.35s ease, padding 0.35s ease; }
.faq-item.open .faq-item__answer { max-height: 200px; padding: 0 20px 18px; }
.faq-item__answer p { font-size: 0.9rem; color: var(--text-secondary); }

/* ===== CTA BANNER ===== */
.cta-banner {
  background: var(--blue); border-radius: var(--radius-lg);
  padding: 48px 32px; text-align: center; color: #fff;
}
.cta-banner h2 { color: #fff; margin-bottom: 12px; }
.cta-banner p { color: rgba(255,255,255,0.85); margin-bottom: 28px; }
.cta-banner .btn--whatsapp { background: #fff; color: #1A1A2E; }
.cta-banner .btn--whatsapp:hover { background: rgba(255,255,255,0.9); }

/* ===== BREADCRUMB ===== */
.breadcrumb { display: flex; align-items: center; gap: 8px; font-size: 0.8rem; color: var(--text-muted); margin-bottom: 24px; }
.breadcrumb a { color: var(--text-muted); transition: color var(--transition); }
.breadcrumb a:hover { color: var(--blue); }
.breadcrumb__sep { color: var(--border-strong); }

/* ===== SIDEBAR ===== */
.sidebar-sticky {
  position: sticky; top: calc(var(--nav-height) + 20px);
  background: var(--card); border: 1px solid var(--border);
  border-radius: var(--radius-md); overflow: hidden;
}
.sidebar-sticky__title { padding: 16px 20px; font-size: 0.8rem; font-weight: 700; color: var(--text-muted); letter-spacing: 0.06em; text-transform: uppercase; border-bottom: 1px solid var(--border); }
.sidebar-link {
  display: flex; align-items: center; justify-content: space-between;
  padding: 14px 20px; font-size: 0.9rem; font-weight: 500;
  color: var(--text-primary); border-bottom: 1px solid var(--border);
  transition: all var(--transition);
}
.sidebar-link:last-child { border-bottom: none; }
.sidebar-link:hover, .sidebar-link.active { background: var(--blue-light); color: var(--blue); }
.sidebar-link__arrow { font-size: 0.75rem; color: var(--text-muted); }
.sidebar-phone { padding: 16px 20px; border-top: 1px solid var(--border); }
.sidebar-phone__label { font-size: 0.75rem; color: var(--text-muted); margin-bottom: 4px; }
.sidebar-phone__num { font-size: 1rem; font-weight: 700; color: var(--text-primary); margin-bottom: 12px; }

/* ===== FOOTER ===== */
.footer {
  background: var(--text-primary); color: rgba(255,255,255,0.75);
  padding: 48px 0 24px;
}
.footer__grid { display: grid; grid-template-columns: 2fr 1fr 1fr 1fr; gap: 40px; margin-bottom: 40px; }
.footer__brand { display: flex; flex-direction: column; gap: 12px; }
.footer__logo { font-size: 1.125rem; font-weight: 700; color: #fff; }
.footer__logo span { color: var(--blue); }
.footer__desc { font-size: 0.875rem; line-height: 1.7; }
.footer__email { font-size: 0.875rem; color: #fff; }
.footer__col-title { font-size: 0.8rem; font-weight: 700; color: #fff; letter-spacing: 0.06em; text-transform: uppercase; margin-bottom: 16px; }
.footer__links { display: flex; flex-direction: column; gap: 10px; }
.footer__links a { font-size: 0.875rem; transition: color var(--transition); }
.footer__links a:hover { color: #fff; }
.footer__bottom { border-top: 1px solid rgba(255,255,255,0.1); padding-top: 24px; display: flex; align-items: center; justify-content: space-between; font-size: 0.8rem; }
.footer__bottom a { transition: color var(--transition); }
.footer__bottom a:hover { color: #fff; }

/* ===== FILTER TABS ===== */
.filter-tabs { display: flex; gap: 8px; flex-wrap: wrap; margin-bottom: 32px; }
.filter-tab {
  padding: 10px 20px; border-radius: 24px;
  font-size: 0.875rem; font-weight: 500;
  border: 1.5px solid var(--border); color: var(--text-secondary);
  background: var(--card); cursor: pointer;
  transition: all var(--transition);
}
.filter-tab:hover { border-color: var(--blue); color: var(--blue); }
.filter-tab.active { background: var(--blue); color: #fff; border-color: var(--blue); }

/* ===== HERO ===== */
.hero { padding: 80px 0; }
.hero__tag { margin-bottom: 16px; }
.hero__h1 { margin-bottom: 16px; }
.hero__sub { font-size: 1.1rem; max-width: 600px; margin-bottom: 32px; }
.hero__actions { display: flex; gap: 12px; flex-wrap: wrap; }
.hero__phone { display: flex; align-items: center; gap: 8px; font-size: 0.9rem; color: var(--text-secondary); margin-top: 20px; }
.hero__phone a { font-weight: 700; color: var(--text-primary); }
.hero__phone a:hover { color: var(--blue); }

/* ===== LAYOUT: PAGE WITH SIDEBAR ===== */
.page-with-sidebar { display: grid; grid-template-columns: 1fr 300px; gap: 32px; align-items: start; }

/* ===== RELATED LINKS ===== */
.related-links { display: flex; flex-wrap: wrap; gap: 8px; }
.related-link {
  padding: 8px 16px; border-radius: 24px;
  font-size: 0.8rem; font-weight: 500;
  background: var(--card); border: 1px solid var(--border);
  color: var(--text-secondary); transition: all var(--transition);
}
.related-link:hover { border-color: var(--blue); color: var(--blue); }

/* ===== UTILITY ===== */
.text-blue { color: var(--blue); }
.text-muted { color: var(--text-secondary); }
.text-center { text-align: center; }
.mt-8  { margin-top: 8px; }
.mt-12 { margin-top: 12px; }
.mt-16 { margin-top: 16px; }
.mt-24 { margin-top: 24px; }
.mt-32 { margin-top: 32px; }
.mb-8  { margin-bottom: 8px; }
.mb-16 { margin-bottom: 16px; }
.mb-24 { margin-bottom: 24px; }
.mb-32 { margin-bottom: 32px; }
.hidden { display: none; }

/* ===== RESPONSIVE — TABLET (≤1024px) ===== */
@media (max-width: 1024px) {
  .footer__grid { grid-template-columns: 1fr 1fr; }
  .grid--4 { grid-template-columns: repeat(2, 1fr); }
  .page-with-sidebar { grid-template-columns: 1fr; }
  .sidebar-sticky { position: static; }
}

/* ===== RESPONSIVE — MOBILE (≤768px) ===== */
@media (max-width: 768px) {
  :root { --nav-height: 56px; }
  .container { padding: 0 16px; }
  .section { padding: 48px 0; }
  .navbar__links { display: none; }
  .navbar__cta.desktop-only { display: none; }
  .navbar__hamburger { display: flex; }
  .grid--2, .grid--3 { grid-template-columns: 1fr; }
  .grid--auto { grid-template-columns: 1fr; }
  .hero { padding: 48px 0; }
  .hero__actions { flex-direction: column; }
  .hero__actions .btn { width: 100%; justify-content: center; }
  .footer__grid { grid-template-columns: 1fr; gap: 32px; }
  .footer__bottom { flex-direction: column; gap: 8px; text-align: center; }
  .filter-tabs { gap: 6px; }
  .filter-tab { padding: 8px 14px; font-size: 0.8rem; }
  .cta-banner { padding: 32px 20px; }
  .cta-banner .btn { width: 100%; justify-content: center; }
  .stat-card__number { font-size: 1.5rem; }
}

/* ===== RESPONSIVE — SMALL MOBILE (≤480px) ===== */
@media (max-width: 480px) {
  h1 { font-size: 1.6rem; }
  h2 { font-size: 1.25rem; }
  .grid--4 { grid-template-columns: 1fr; }
  .related-links { gap: 6px; }
}
```

---

## Step 6 — Create `src/js/main.js`

```js
/* ============================================
   RAMS AUDIOVISUALS — SHARED JS
   ============================================ */

/* ----- Navbar hamburger ----- */
(function () {
  const hamburger = document.querySelector('.navbar__hamburger');
  const mobileMenu = document.querySelector('.navbar__mobile');
  if (!hamburger || !mobileMenu) return;
  hamburger.addEventListener('click', () => {
    mobileMenu.classList.toggle('open');
    const isOpen = mobileMenu.classList.contains('open');
    hamburger.setAttribute('aria-expanded', isOpen);
  });
  document.addEventListener('click', (e) => {
    if (!hamburger.contains(e.target) && !mobileMenu.contains(e.target)) {
      mobileMenu.classList.remove('open');
    }
  });
})();

/* ----- FAQ accordion ----- */
(function () {
  document.querySelectorAll('.faq-item__question').forEach((btn) => {
    btn.addEventListener('click', () => {
      const item = btn.closest('.faq-item');
      const isOpen = item.classList.contains('open');
      document.querySelectorAll('.faq-item').forEach(i => i.classList.remove('open'));
      if (!isOpen) item.classList.add('open');
    });
  });
})();

/* ----- Equipment filter tabs ----- */
(function () {
  const tabs = document.querySelectorAll('.filter-tab');
  const cards = document.querySelectorAll('.equip-card-wrapper');
  if (!tabs.length || !cards.length) return;
  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      const filter = tab.dataset.filter;
      cards.forEach(card => {
        const show = filter === 'all' || card.dataset.category === filter;
        card.style.display = show ? '' : 'none';
      });
    });
  });
})();

/* ----- Smooth scroll for anchor links ----- */
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', (e) => {
    const target = document.querySelector(link.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

/* ----- Lazy load images ----- */
if ('IntersectionObserver' in window) {
  const lazyImages = document.querySelectorAll('img[data-src]');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.src = img.dataset.src;
        img.removeAttribute('data-src');
        observer.unobserve(img);
      }
    });
  }, { rootMargin: '200px' });
  lazyImages.forEach(img => observer.observe(img));
}
```

---

## Step 7 — Create `build.js` (the page generator)

```js
import { readFileSync, writeFileSync, mkdirSync, copyFileSync, readdirSync, statSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import { cities, services } from './data/cities.js';
import { equipment } from './data/equipData.js';

const __dirname = dirname(fileURLToPath(import.meta.url));

/* ---- helpers ---- */
function capitalize(s) { return s.charAt(0).toUpperCase() + s.slice(1); }

function renderStars(rating) {
  const full = Math.floor(rating);
  return '★'.repeat(full) + (rating % 1 >= 0.5 ? '½' : '');
}

function equipCardHTML(item, citySlug) {
  const waCity = citySlug ? cities.find(c => c.slug === citySlug) : null;
  const waNum  = waCity ? waCity.whatsapp : '919700033342';
  const waMsg  = encodeURIComponent(`Hi, I'd like to enquire about "${item.name}" rental${waCity ? ` in ${waCity.name}` : ''}.`);
  return `
<div class="equip-card-wrapper card equip-card" data-category="${item.category}">
  <div class="equip-card__image">
    <img data-src="${item.image}" src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 400 300'%3E%3C/svg%3E" alt="${item.name} for rent${waCity ? ` in ${waCity.name}` : ''}" loading="lazy" width="400" height="300"/>
    <span class="equip-card__badge">${item.badge}</span>
  </div>
  <div class="equip-card__body">
    <div class="equip-card__name">${item.name}</div>
    <div class="equip-card__model">${item.model}</div>
    <div class="equip-card__meta">
      <div class="equip-card__price">₹${item.price}<span>/day</span></div>
      <div class="equip-card__rating">${item.rating}</div>
    </div>
  </div>
  <a href="https://wa.me/${waNum}?text=${waMsg}" class="equip-card__cta" target="_blank" rel="noopener">
    WhatsApp to book
  </a>
</div>`;
}

function navbarHTML(activePage = '') {
  return `
<nav class="navbar" role="navigation" aria-label="Main navigation">
  <div class="container">
    <div class="navbar__inner">
      <a href="/index.html" class="navbar__logo">Rams <span>Audio</span>Visuals</a>
      <ul class="navbar__links" role="list">
        <li><a href="/index.html" ${activePage==='home'?'class="active"':''}>Home</a></li>
        <li><a href="/equipment.html" ${activePage==='equipment'?'class="active"':''}>Equipment</a></li>
        <li><a href="/about.html" ${activePage==='about'?'class="active"':''}>About</a></li>
        <li><a href="/contact.html" ${activePage==='contact'?'class="active"':''}>Contact</a></li>
      </ul>
      <a href="https://wa.me/919700033342" class="navbar__cta desktop-only btn" target="_blank" rel="noopener">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/><path d="M12 0C5.373 0 0 5.373 0 12c0 2.123.554 4.117 1.528 5.845L.057 23.18a.75.75 0 00.914.914l5.335-1.471A11.943 11.943 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.896 0-3.676-.498-5.217-1.369l-.374-.22-3.866 1.067 1.067-3.866-.22-.374A9.944 9.944 0 012 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z"/></svg>
        WhatsApp us
      </a>
      <button class="navbar__hamburger" aria-label="Open menu" aria-expanded="false" aria-controls="mobile-menu">
        <span></span><span></span><span></span>
      </button>
    </div>
  </div>
  <div class="navbar__mobile" id="mobile-menu" role="menu">
    <a href="/index.html" role="menuitem">Home</a>
    <a href="/equipment.html" role="menuitem">Equipment</a>
    <a href="/about.html" role="menuitem">About us</a>
    <a href="/contact.html" role="menuitem">Contact</a>
    <a href="https://wa.me/919700033342" role="menuitem" style="color:var(--blue)">WhatsApp us</a>
  </div>
</nav>`;
}

function footerHTML() {
  const cityLinks = cities.map(c => `<a href="/${c.slug}/index.html">${c.name}</a>`).join('\n        ');
  return `
<footer class="footer" role="contentinfo">
  <div class="container">
    <div class="footer__grid">
      <div class="footer__brand">
        <div class="footer__logo">Rams <span>Audio</span>Visuals</div>
        <p class="footer__desc">Professional AV equipment on rent across 5 major Indian cities. Delivered, set up, and collected — hassle free.</p>
        <a href="mailto:support@ramsaudiovisuals.com" class="footer__email">support@ramsaudiovisuals.com</a>
      </div>
      <div>
        <div class="footer__col-title">Cities</div>
        <div class="footer__links">${cityLinks}</div>
      </div>
      <div>
        <div class="footer__col-title">Equipment</div>
        <div class="footer__links">
          <a href="/equipment.html#projector">Projectors</a>
          <a href="/equipment.html#sound">Sound systems</a>
          <a href="/equipment.html#mic">Microphones</a>
          <a href="/equipment.html#tv">Televisions</a>
          <a href="/equipment.html#combo">Combo packages</a>
        </div>
      </div>
      <div>
        <div class="footer__col-title">Company</div>
        <div class="footer__links">
          <a href="/about.html">About us</a>
          <a href="/contact.html">Contact</a>
          <a href="/privacy-policy.html">Privacy policy</a>
        </div>
      </div>
    </div>
    <div class="footer__bottom">
      <span>© ${new Date().getFullYear()} Rams AudioVisuals. All rights reserved.</span>
      <a href="/privacy-policy.html">Privacy policy</a>
    </div>
  </div>
</footer>`;
}

function headHTML({ title, description, canonical, schema = '' }) {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8"/>
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>${title}</title>
  <meta name="description" content="${description}"/>
  <link rel="canonical" href="https://www.ramsaudiovisuals.com${canonical}"/>
  <meta property="og:title" content="${title}"/>
  <meta property="og:description" content="${description}"/>
  <meta property="og:type" content="website"/>
  <meta property="og:url" content="https://www.ramsaudiovisuals.com${canonical}"/>
  <meta name="twitter:card" content="summary"/>
  <link rel="preconnect" href="https://fonts.googleapis.com"/>
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin/>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet"/>
  <link rel="stylesheet" href="/css/main.css"/>
  ${schema ? `<script type="application/ld+json">${schema}</script>` : ''}
</head>
<body>`;
}

function closingHTML(jsPath = '/js/main.js') {
  return `<script src="${jsPath}"></script>\n</body>\n</html>`;
}

/* ---- copy static assets ---- */
function copyAssets() {
  mkdirSync('public/css', { recursive: true });
  mkdirSync('public/js',  { recursive: true });
  copyFileSync('src/css/main.css', 'public/css/main.css');
  copyFileSync('src/js/main.js',   'public/js/main.js');
}

/* ---- write file utility ---- */
function writePage(filePath, html) {
  mkdirSync(dirname(filePath), { recursive: true });
  writeFileSync(filePath, html, 'utf8');
  console.log('✓', filePath);
}

/* ============================================
   BUILD FUNCTIONS — one per template type
   These are stubs. Phase 1–3 will fill them.
   ============================================ */

function buildHomepage()       { console.log('⏭  Homepage — build in Phase 1'); }
function buildEquipmentHub()   { console.log('⏭  Equipment hub — build in Phase 1'); }
function buildAbout()          { console.log('⏭  About — build in Phase 2'); }
function buildContact()        { console.log('⏭  Contact — build in Phase 2'); }
function buildPrivacyPolicy()  { console.log('⏭  Privacy — build in Phase 2'); }
function buildCityPages()      { console.log('⏭  City pages — build in Phase 2'); }
function buildCityServicePages(){ console.log('⏭  City+service pages — build in Phase 3'); }

/* ---- sitemap ---- */
function buildSitemap() {
  const baseUrl = 'https://www.ramsaudiovisuals.com';
  const today = new Date().toISOString().split('T')[0];
  const staticPages = [
    { url: '/', priority: '1.0', freq: 'weekly' },
    { url: '/equipment.html', priority: '0.9', freq: 'weekly' },
    { url: '/about.html', priority: '0.6', freq: 'monthly' },
    { url: '/contact.html', priority: '0.7', freq: 'monthly' },
  ];
  const cityPageUrls = cities.map(c => ({ url: `/${c.slug}/`, priority: '0.8', freq: 'weekly' }));
  const servicePageUrls = cities.flatMap(c =>
    services.map(s => ({ url: `/${c.slug}/${s.slug}.html`, priority: '0.9', freq: 'weekly' }))
  );
  const allPages = [...staticPages, ...cityPageUrls, ...servicePageUrls];
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allPages.map(p => `  <url>
    <loc>${baseUrl}${p.url}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${p.freq}</changefreq>
    <priority>${p.priority}</priority>
  </url>`).join('\n')}
</urlset>`;
  writeFileSync('public/sitemap.xml', xml, 'utf8');
  console.log('✓ public/sitemap.xml');
}

/* ---- robots.txt ---- */
function buildRobots() {
  const txt = `User-agent: *\nAllow: /\nSitemap: https://www.ramsaudiovisuals.com/sitemap.xml\n`;
  writeFileSync('public/robots.txt', txt, 'utf8');
  console.log('✓ public/robots.txt');
}

/* ---- MAIN ---- */
(async function main() {
  console.log('\n🔨 Building Rams AudioVisuals...\n');
  mkdirSync('public', { recursive: true });
  copyAssets();
  buildHomepage();
  buildEquipmentHub();
  buildAbout();
  buildContact();
  buildPrivacyPolicy();
  buildCityPages();
  buildCityServicePages();
  buildSitemap();
  buildRobots();
  console.log('\n✅ Build complete.\n');
})();

/* export helpers for use in later phases */
export { headHTML, closingHTML, navbarHTML, footerHTML, equipCardHTML, writePage, cities, services, equipment, capitalize, renderStars };
```

---

## Step 8 — Run to verify setup works

```bash
node build.js
```

Expected output — all lines prefixed with `⏭` (stubs) and `✓` for CSS, JS, sitemap, robots. No errors. The `public/` folder should contain: `css/main.css`, `js/main.js`, `sitemap.xml`, `robots.txt`.

---

## Phase 0 is complete when:
- [ ] All folders exist as shown in Step 1
- [ ] `node build.js` runs without errors
- [ ] `public/css/main.css` exists
- [ ] `public/sitemap.xml` lists 45+ URLs
- [ ] `public/robots.txt` exists
