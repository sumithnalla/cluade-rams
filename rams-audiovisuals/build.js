import { readFileSync, writeFileSync, mkdirSync, copyFileSync, readdirSync, statSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import { cities, services } from './data/cities.js';
import { equipment } from './data/equipData.js';

const __dirname = dirname(fileURLToPath(import.meta.url));
const assetVersion = Date.now().toString(36);

/* ---- helpers ---- */
function capitalize(s) { return s.charAt(0).toUpperCase() + s.slice(1); }

function renderStars(rating) {
  const full = Math.floor(rating);
  return '★'.repeat(full) + (rating % 1 >= 0.5 ? '½' : '');
}

const googleReviews = [
  { name: 'Ravi K.', location: 'Gachibowli', rating: 5, initials: 'RK', comment: 'Excellent setup for our corporate event. Delivered on time and everything worked perfectly.' },
  { name: 'Priya S.', location: 'Banjara Hills', rating: 5, initials: 'PS', comment: 'Rented projector and sound system for a wedding. Professional team, great equipment.' },
  { name: 'Anand M.', location: 'Whitefield', rating: 5, initials: 'AM', comment: 'Best projector rental in Bangalore. Setup was quick and the team was very professional.' },
  { name: 'Sneha R.', location: 'Koramangala', rating: 5, initials: 'SR', comment: 'Rented sound system for a product launch. Crystal clear audio, zero issues.' },
  { name: 'Rahul D.', location: 'Andheri', rating: 5, initials: 'RD', comment: 'Reliable service for our office conference. Equipment was top-notch and delivery was on time.' },
  { name: 'Meena P.', location: 'Bandra', rating: 5, initials: 'MP', comment: 'Used their combo package for a birthday party. Great value and excellent sound quality.' },
  { name: 'Karthik V.', location: 'Anna Nagar', rating: 5, initials: 'KV', comment: 'Projector and screen for our school event. Everything was set up perfectly on time.' },
  { name: 'Pooja K.', location: 'Baner', rating: 5, initials: 'PK', comment: 'Reliable rental service. Equipment quality was exactly as described. Will use again.' }
];

function reviewCarouselSectionHTML(reviews = googleReviews, title = 'What clients say about us') {
  const cards = [...reviews, ...reviews].map(review => `
        <article class="review-card">
          <div class="review-card__top">
            <img src="/photos/google.png" alt="Google" class="review-card__google" loading="lazy" width="40" height="40"/>
            <div class="review-card__stars" aria-label="${review.rating} out of 5 stars">${'&#9733;'.repeat(review.rating)}</div>
          </div>
          <p class="review-card__comment">"${review.comment}"</p>
          <div class="review-card__footer">
            <div class="review-card__avatar">${review.initials}</div>
            <div>
              <div class="review-card__name">${review.name}</div>
              <div class="review-card__meta">${review.location} &bull; AV Services</div>
            </div>
          </div>
        </article>`).join('');

  return `
  <section class="section review-section" aria-label="Client reviews">
    <div class="container">
      <div class="section-header">
        <h2>${title}</h2>
      </div>
      <div class="review-carousel" aria-label="${title}">
        <div class="review-carousel__track">
${cards}
        </div>
      </div>
    </div>
  </section>`;
}

function equipCardHTMLLegacy(item, citySlug) {
  const waCity = citySlug ? cities.find(c => c.slug === citySlug) : null;
  const waNum  = waCity ? waCity.whatsapp : '919700033342';
  const waMsg  = encodeURIComponent(`Hi, I'd like to enquire about "${item.name}" rental${waCity ? ` in ${waCity.name}` : ''}.`);
  return `
<div class="equip-card-wrapper card equip-card" data-category="${item.category}">
  <div class="equip-card__image">
    <img data-src="${item.image}" src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 400 300'%3E%3C/svg%3E" alt="${item.name} for rent${waCity ? ` in ${waCity.name}` : ''}" loading="lazy" width="400" height="300"/>
  </div>
  <div class="equip-card__body">
    <div class="equip-card__name">${item.name}</div>
    <div class="equip-card__price equip-card__price--primary">&#8377;${item.price}<span>/day</span></div>
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

function equipCardHTML(item, citySlug) {
  const waCity = citySlug ? cities.find(c => c.slug === citySlug) : null;
  const waNum = waCity ? waCity.whatsapp : '919700033342';
  const waMsg = encodeURIComponent(`Hi, I'd like to enquire about "${item.name}" rental${waCity ? ` in ${waCity.name}` : ''}.`);
  return `
<div class="equip-card-wrapper card equip-card" data-category="${item.category}">
  <div class="equip-card__image">
    <img data-src="${item.image}" src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 400 300'%3E%3C/svg%3E" alt="${item.name} for rent${waCity ? ` in ${waCity.name}` : ''}" loading="lazy" width="400" height="300"/>
  </div>
  <div class="equip-card__body">
    <div class="equip-card__name">${item.name}</div>
    <div class="equip-card__price equip-card__price--primary">&#8377;${item.price}<span>/day</span></div>
    <div class="equip-card__model">${item.model}</div>
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
      <a href="/index.html" class="navbar__logo"><img src="/photos/logo new.png" alt="Rams AudioVisuals Logo" class="navbar__logo-img"></a>
      <ul class="navbar__links" role="list">
        <li><a href="/index.html" ${activePage==='home'?'class="active"':''}>Home</a></li>
        <li><a href="/equipment.html" ${activePage==='equipment'?'class="active"':''}>Equipment</a></li>
        <li><a href="/about.html" ${activePage==='about'?'class="active"':''}>About</a></li>
        <li><a href="/contact.html" ${activePage==='contact'?'class="active"':''}>Contact</a></li>
      </ul>
      <a href="https://wa.me/919700033342" class="navbar__cta desktop-only btn" target="_blank" rel="noopener">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path></svg>
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
        <a href="/index.html" class="footer__logo"><img src="/photos/logo new.png" alt="Rams AudioVisuals Logo" class="footer__logo-img"></a>
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
  <link rel="icon" type="image/png" href="/photos/favicon.png" />
  <link rel="canonical" href="https://www.ramsaudiovisuals.com${canonical}"/>
  <meta property="og:title" content="${title}"/>
  <meta property="og:description" content="${description}"/>
  <meta property="og:type" content="website"/>
  <meta property="og:url" content="https://www.ramsaudiovisuals.com${canonical}"/>
  <meta name="twitter:card" content="summary"/>
  <link rel="preconnect" href="https://fonts.googleapis.com"/>
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin/>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet"/>
  <link rel="stylesheet" href="/css/main.css?v=${assetVersion}"/>
  ${schema ? `<script type="application/ld+json">${schema}</script>` : ''}
</head>
<body>`;
}

function closingHTML(jsPath = '/js/main.js') {
  const separator = jsPath.includes('?') ? '&' : '?';
  return `<script src="${jsPath}${separator}v=${assetVersion}"></script>\n</body>\n</html>`;
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

function buildHomepage() {
  const topEquip = [...equipment].sort((a, b) => b.bookedCount - a.bookedCount).slice(0, 6);

  const schema = JSON.stringify({
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "LocalBusiness",
        "name": "Rams AudioVisuals",
        "url": "https://www.ramsaudiovisuals.com",
        "logo": "https://www.ramsaudiovisuals.com/images/logo.png",
        "email": "support@ramsaudiovisuals.com",
        "description": "Professional AV equipment rental — projectors, sound systems, mics, TVs, and combo packages across Hyderabad, Bangalore, Mumbai, Chennai and Pune.",
        "areaServed": cities.map(c => c.name),
        "contactPoint": cities.map(c => ({
          "@type": "ContactPoint",
          "telephone": c.phone,
          "contactType": "customer service",
          "areaServed": c.name
        }))
      },
      {
        "@type": "FAQPage",
        "mainEntity": [
          { "@type": "Question", "name": "Which cities does Rams AudioVisuals serve?", "acceptedAnswer": { "@type": "Answer", "text": "We serve Hyderabad, Bangalore, Mumbai, Chennai, and Pune." } },
          { "@type": "Question", "name": "Do you provide setup along with the equipment?", "acceptedAnswer": { "@type": "Answer", "text": "Yes, all rentals include free delivery, professional setup, and collection after your event." } },
          { "@type": "Question", "name": "What is the minimum rental duration?", "acceptedAnswer": { "@type": "Answer", "text": "Minimum rental is for 1 day. We also offer hourly rentals for certain equipment — WhatsApp us for details." } },
          { "@type": "Question", "name": "What types of AV equipment can I rent?", "acceptedAnswer": { "@type": "Answer", "text": "We rent projectors, LED screens, sound systems, speakers, microphones, TVs, and combo packages." } },
          { "@type": "Question", "name": "How do I book AV equipment?", "acceptedAnswer": { "@type": "Answer", "text": "Simply WhatsApp or call your city's number. Share your event date, type, and venue — we'll confirm availability and pricing instantly." } }
        ]
      }
    ]
  });

  const cityCards = cities.map(c => `
<a href="/${c.slug}/index.html" class="service-card">
  <div class="service-card__icon"><img src="/photos/${c.slug}.png" alt="${c.name}" class="service-card__img" loading="lazy"></div>
  <div class="service-card__name">${c.name}</div>
</a>`).join('');

  const serviceIcons = { projector: 'projectors', sound: 'sound systems', mic: 'microphones', tv: 'televisions', speaker: 'speakers', screen: 'LED', combo: 'combos' };
  const serviceStrip = services.map(s => `
<a href="/equipment.html#${s.category}" class="service-card">
  <div class="service-card__icon"><img src="/photos/${serviceIcons[s.icon]}.png" alt="${s.name}" class="service-card__img" loading="lazy"></div>
  <div class="service-card__name">${s.name}</div>
</a>`).join('');

  const popularCards = topEquip.map(item => equipCardHTML(item, null)).join('');

  const faqs = [
    ['Which cities does Rams AudioVisuals serve?', 'We serve Hyderabad, Bangalore, Mumbai, Chennai, and Pune with free delivery and setup.'],
    ['Do you provide setup along with the equipment?', 'Yes — every rental includes professional delivery, setup, and collection after your event at no extra cost.'],
    ['What is the minimum rental duration?', 'Minimum is 1 day. We also accommodate half-day and multi-day rentals — WhatsApp us for pricing.'],
    ['What types of AV equipment can I rent?', 'Projectors, LED screens, sound systems, speakers, microphones, TVs, and combo packages.'],
    ['How do I book?', 'WhatsApp or call your city number. Share your event date and venue — we confirm in minutes.']
  ].map(([q, a]) => `
<div class="faq-item" itemscope itemprop="mainEntity" itemtype="https://schema.org/Question">
  <button class="faq-item__question" itemprop="name">${q}<i class="faq-item__icon" aria-hidden="true">+</i></button>
  <div class="faq-item__answer" itemscope itemprop="acceptedAnswer" itemtype="https://schema.org/Answer">
    <p itemprop="text">${a}</p>
  </div>
</div>`).join('');

  const html = `${headHTML({ title: 'AV Equipment for Rent | Projectors, Sound Systems, Mics & More — Rams AudioVisuals', description: 'Rent projectors, sound systems, microphones, LED screens, TVs & combo packages in Hyderabad, Bangalore, Mumbai, Chennai & Pune. Free setup & delivery. Call now.', canonical: '/', schema })}
${navbarHTML('home')}

<main>
  <!-- HERO -->
  <section class="section hero-section" aria-label="Hero" style="padding-top: 40px; padding-bottom: 24px;">
    <div class="container">
      <div class="hero-card hero-card--home">
        <div class="hero-card__content">
          <div class="badge badge--blue" style="margin-bottom: 16px; align-self: flex-start; background: rgba(255,255,255,0.8); color: var(--blue-dark);">Premium AV Rentals</div>
          <h1>Professional AV equipment<br>for rent — delivered &amp; set up</h1>
          <p>Projectors, sound systems, microphones, LED screens, TVs &amp; combo packages across Hyderabad, Bangalore, Mumbai, Chennai &amp; Pune.</p>
          <div style="display:flex; gap:16px; flex-wrap:wrap; margin-top:16px;">
            <a href="https://wa.me/919700033342?text=Hi%2C%20I%20need%20AV%20equipment%20for%20my%20event." class="btn btn--primary" style="padding:16px 32px; font-size:1.1rem; box-shadow: 0 8px 24px rgba(37,99,235,0.4);" target="_blank" rel="noopener">
              Book Now
            </a>
            <a href="/equipment.html" class="btn btn--secondary" style="padding:16px 32px; font-size:1.1rem; background: rgba(255,255,255,0.7); border-color: transparent;">
              View Equipment
            </a>
          </div>
          <div class="hero__phone">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.81a19.79 19.79 0 01-3.07-8.67A2 2 0 012 1h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 8.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/></svg>
            <span>Hyd: <a href="tel:9700033342" style="font-weight:700; color:var(--text-primary);">9700033342</a> &nbsp;|&nbsp; Blr: <a href="tel:9553703737" style="font-weight:700; color:var(--text-primary);">9553703737</a></span>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- CITIES -->
  <section class="section--sm" aria-label="Cities we serve">
    <div class="container">
      <div class="section-header" style="margin-bottom: 32px;">
        <h2>Select your city</h2>
      </div>
      <div class="grid grid--5" role="list" aria-label="Available cities">
        ${cityCards}
      </div>
    </div>
  </section>

  <!-- SERVICES STRIP -->
  <section class="section" style="background:var(--card); border-top:1px solid var(--border-strong); border-bottom:1px solid var(--border-strong);" aria-label="Equipment categories">
    <div class="container">
      <div class="section-header">
        <h2>Browse by Category</h2>
        <p>From single-item rentals to complete setups — all delivered and installed.</p>
      </div>
      <div class="services-grid">
        ${serviceStrip}
      </div>
    </div>
  </section>

  <!-- STATS -->
  <section class="section--sm" aria-label="Our track record">
    <div class="container">
      <div class="grid grid--4">
        <div class="stat-card"><div class="stat-card__number">500+</div><div class="stat-card__label">Events served</div></div>
        <div class="stat-card"><div class="stat-card__number">5</div><div class="stat-card__label">Cities covered</div></div>
        <div class="stat-card"><div class="stat-card__number">20+</div><div class="stat-card__label">Equipment types</div></div>
        <div class="stat-card"><div class="stat-card__number">4.8★</div><div class="stat-card__label">Average rating</div></div>
      </div>
    </div>
  </section>

  <!-- HOW IT WORKS -->
  <section class="section" style="background:var(--card); border-top:1px solid var(--border);" aria-label="How to book">
    <div class="container">
      <div class="section-header">
        <h2>How it works</h2>
        <p>Three simple steps from enquiry to event-ready setup.</p>
      </div>
      <div class="grid grid--3">
        <div class="how-step">
          <img src="/photos/step1.png" alt="Step 1" class="how-step__img">
          <div class="how-step__title">Choose your equipment</div>
          <div class="how-step__desc">Browse our catalogue. Select the items you need for your event type and size.</div>
        </div>
        <div class="how-step">
          <img src="/photos/step2.png" alt="Step 2" class="how-step__img">
          <div class="how-step__title">WhatsApp or call us</div>
          <div class="how-step__desc">Share your event date, venue, and city. We confirm availability and pricing within minutes.</div>
        </div>
        <div class="how-step">
          <img src="/photos/step-2.png" alt="Step 3" class="how-step__img">
          <div class="how-step__title">We deliver and set up</div>
          <div class="how-step__desc">Our team arrives before your event, sets everything up, and collects after. Zero hassle.</div>
        </div>
      </div>
    </div>
  </section>

  <!-- POPULAR EQUIPMENT -->
  <section class="section" aria-label="Popular equipment">
    <div class="container">
      <div class="section-header">
        <span class="badge badge--blue">Most booked</span>
        <h2>Popular equipment</h2>
        <p>Our most rented items — trusted by hundreds of events across India.</p>
      </div>
      <div class="grid grid--3">
        ${popularCards}
      </div>
      <div class="text-center mt-32">
        <a href="/equipment.html" class="btn btn--secondary">View all 20 items</a>
      </div>
    </div>
  </section>

${reviewCarouselSectionHTML(googleReviews, 'What clients say about us')}

  <!-- FAQ -->
  <section class="section" style="background:var(--card); border-top:1px solid var(--border);" aria-label="Frequently asked questions">
    <div class="container" style="max-width:720px">
      <div class="section-header">
        <h2>Frequently asked questions</h2>
      </div>
      ${faqs}
    </div>
  </section>

  <!-- CTA BANNER -->
  <section class="section--sm" aria-label="Contact us">
    <div class="container">
      <div class="cta-banner">
        <h2>Ready to book your AV setup?</h2>
        <p>WhatsApp us your event details and get a quote in minutes. Free delivery and setup included.</p>
        <a href="https://wa.me/919700033342?text=Hi%2C%20I%20need%20AV%20equipment%20for%20my%20event." class="btn btn--whatsapp" target="_blank" rel="noopener">
          WhatsApp us now
        </a>
      </div>
    </div>
  </section>
</main>

${footerHTML()}
${closingHTML()}`;

  writePage('public/index.html', html);
}
function buildEquipmentHub() {
  const categories = ['all', 'projector', 'sound', 'mic', 'tv', 'combo'];
  const catLabels = { all: 'All equipment', projector: 'Projectors & Screens', sound: 'Sound Systems', mic: 'Microphones', tv: 'Televisions', combo: 'Combo Packages' };

  const tabs = categories.map(c => `
<button class="filter-tab ${c === 'all' ? 'active' : ''}" data-filter="${c}" aria-pressed="${c === 'all'}">${catLabels[c]}</button>`).join('');

  const cards = equipment.map(item => equipCardHTML(item, null)).join('');

  const cityAvailability = cities.map(c => `<a href="/${c.slug}/index.html" class="related-link">${c.name}</a>`).join('');

  const schema = JSON.stringify({
    "@context": "https://schema.org",
    "@type": "ItemList",
    "name": "AV Equipment for Rent — Rams AudioVisuals",
    "numberOfItems": equipment.length,
    "itemListElement": equipment.map((item, i) => ({
      "@type": "ListItem",
      "position": i + 1,
      "name": item.name,
      "description": item.model
    }))
  });

  const html = `${headHTML({ title: 'AV Equipment for Rent — Projectors, Sound Systems, Mics, TVs & Combos | Rams AudioVisuals', description: 'Browse our full catalogue of AV equipment for rent — projectors, LED screens, sound systems, microphones, TVs and combo packages. Available in 5 cities.', canonical: '/equipment.html', schema })}
${navbarHTML('equipment')}

<main>
  <section class="section">
    <div class="container">
      <nav class="breadcrumb" aria-label="Breadcrumb">
        <a href="/index.html">Home</a>
        <span class="breadcrumb__sep" aria-hidden="true">›</span>
        <span aria-current="page">Equipment</span>
      </nav>

      <div class="section-header" style="text-align:left; margin-bottom:32px">
        <span class="badge badge--blue">20 items available</span>
        <h1 style="margin-top:8px">AV equipment for rent</h1>
        <p style="max-width:none">Professional projectors, sound systems, microphones, LED screens, TVs and combo packages — available in Hyderabad, Bangalore, Mumbai, Chennai and Pune. All rentals include delivery and setup.</p>
      </div>

      <div class="filter-tabs" role="tablist" aria-label="Filter by category">
        ${tabs}
      </div>

      <div class="grid grid--3" id="equip-grid">
        ${cards}
      </div>

      <div class="mt-32" style="padding:32px; background:var(--card); box-shadow:var(--shadow-card); border-radius:var(--radius-md);">
        <h3 style="margin-bottom:8px">Available in these cities</h3>
        <p style="margin-bottom:16px">All equipment listed here is available for rent in all five cities with free delivery and setup.</p>
        <div class="related-links">${cityAvailability}</div>
      </div>
    </div>
  </section>

  <section class="section--sm" aria-label="Book now">
    <div class="container">
      <div class="cta-banner">
        <h2>Need help choosing the right equipment?</h2>
        <p>Tell us your event type, venue size, and date — we'll suggest the perfect setup.</p>
        <a href="https://wa.me/919700033342?text=Hi%2C%20I%20need%20help%20choosing%20AV%20equipment%20for%20my%20event." class="btn btn--whatsapp" target="_blank" rel="noopener">
          WhatsApp for a free recommendation
        </a>
      </div>
    </div>
  </section>
</main>

${footerHTML()}
${closingHTML()}`;

  writePage('public/equipment.html', html);
}
function buildAbout() {
  const cityPhones = cities.map(c => `
<div class="city-card">
  <div class="city-card__name">${c.name}</div>
  <div class="city-card__phone">
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.81a19.79 19.79 0 01-3.07-8.67A2 2 0 012 1h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 8.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/></svg>
    <a href="tel:${c.phone}">${c.phoneDisplay}</a>
  </div>
  <a href="/${c.slug}/index.html" class="city-card__link">View ${c.name} equipment →</a>
</div>`).join('');

  const html = `${headHTML({ title: 'About Rams AudioVisuals — Your Trusted AV Rental Partner', description: 'Rams AudioVisuals provides professional AV equipment for rent across Hyderabad, Bangalore, Mumbai, Chennai and Pune since 2016. Learn about our story and team.', canonical: '/about.html' })}
${navbarHTML('about')}
<main>
  <section class="section">
    <div class="container" style="max-width:800px">
      <nav class="breadcrumb" aria-label="Breadcrumb">
        <a href="/index.html">Home</a>
        <span class="breadcrumb__sep" aria-hidden="true">›</span>
        <span aria-current="page">About us</span>
      </nav>
      <span class="badge badge--blue">Our story</span>
      <h1 style="margin-top:8px; margin-bottom:16px">About Rams AudioVisuals</h1>
      <p style="font-size:1.1rem; margin-bottom:24px">Rams AudioVisuals started in Hyderabad in 2016 with one mission: make professional audio-visual equipment accessible to everyone — from small birthday parties to large corporate conferences.</p>
      <p>What began as a single-city operation has grown into a trusted AV rental partner across 5 major Indian cities. We've set up projectors in boardrooms, sound systems at weddings, LED walls at product launches, and microphone rigs at school events. Every setup is handled by our trained team — we don't just drop off equipment, we make sure everything works perfectly before we leave.</p>
    </div>
  </section>

  <section class="section--sm" style="background:var(--card); border-top:1px solid var(--border);">
    <div class="container">
      <div class="grid grid--4">
        <div class="stat-card"><div class="stat-card__number">500+</div><div class="stat-card__label">Events served</div></div>
        <div class="stat-card"><div class="stat-card__number">5</div><div class="stat-card__label">Cities</div></div>
        <div class="stat-card"><div class="stat-card__number">8+</div><div class="stat-card__label">Years operating</div></div>
        <div class="stat-card"><div class="stat-card__number">4.8★</div><div class="stat-card__label">Average rating</div></div>
      </div>
    </div>
  </section>

  <section class="section">
    <div class="container">
      <div class="section-header">
        <h2>Cities we serve</h2>
        <p>Local teams in every city ensure fast delivery and on-the-ground support.</p>
      </div>
      <div class="grid grid--auto">${cityPhones}</div>
    </div>
  </section>

  <section class="section--sm">
    <div class="container">
      <div class="cta-banner">
        <h2>Have a question or need a quote?</h2>
        <p>Our team responds within minutes on WhatsApp.</p>
        <a href="https://wa.me/919700033342?text=Hi%2C%20I%20have%20a%20question%20about%20Rams%20AudioVisuals." class="btn btn--whatsapp" target="_blank" rel="noopener">WhatsApp us</a>
      </div>
    </div>
  </section>
</main>
${footerHTML()}
${closingHTML()}`;

  writePage('public/about.html', html);
}

function buildContact() {
  const cityCards = cities.map(c => `
<div class="card" style="padding:24px">
  <h3 style="margin-bottom:8px">${c.name}</h3>
  <a href="tel:${c.phone}" style="font-size:1.25rem; font-weight:700; color:var(--text-primary); display:block; margin-bottom:12px">${c.phoneDisplay}</a>
  <a href="https://wa.me/${c.whatsapp}?text=Hi%2C%20I%20need%20AV%20equipment%20in%20${c.name}." class="btn btn--whatsapp btn--sm btn--full" target="_blank" rel="noopener">
    WhatsApp ${c.name}
  </a>
</div>`).join('');

  const html = `${headHTML({ title: 'Contact Rams AudioVisuals — Get a Quote Today', description: 'Contact Rams AudioVisuals for AV equipment rental in Hyderabad, Bangalore, Mumbai, Chennai and Pune. WhatsApp or call your city number for an instant quote.', canonical: '/contact.html' })}
${navbarHTML('contact')}
<main>
  <section class="section">
    <div class="container" style="max-width:900px">
      <nav class="breadcrumb" aria-label="Breadcrumb">
        <a href="/index.html">Home</a>
        <span class="breadcrumb__sep" aria-hidden="true">›</span>
        <span aria-current="page">Contact</span>
      </nav>
      <div class="section-header" style="text-align:left; margin-bottom:40px">
        <h1>Contact us</h1>
        <p>Choose your city below and reach us directly. We respond within minutes on WhatsApp.</p>
      </div>
      <div class="grid grid--3" style="margin-bottom:40px">${cityCards}</div>

      <div class="card" style="padding:28px">
        <h3 style="margin-bottom:4px">General enquiries</h3>
        <p style="margin-bottom:16px">For general questions, partnerships, or bulk rental queries:</p>
        <a href="mailto:support@ramsaudiovisuals.com" style="font-size:1rem; font-weight:600; color:var(--blue)">support@ramsaudiovisuals.com</a>
      </div>

      <div class="card mt-16" style="padding:28px">
        <h3 style="margin-bottom:4px">Business hours</h3>
        <p>Monday – Sunday: 8:00 AM – 9:00 PM</p>
        <p style="margin-top:4px; font-size:0.875rem; color:var(--text-muted)">WhatsApp messages are monitored till 10:00 PM.</p>
      </div>
    </div>
  </section>
</main>
${footerHTML()}
${closingHTML()}`;

  writePage('public/contact.html', html);
}

function buildPrivacyPolicy() {
  const html = `${headHTML({ title: 'Privacy Policy — Rams AudioVisuals', description: 'Privacy policy for Rams AudioVisuals. Learn how we handle your data when you contact us for AV equipment rental.', canonical: '/privacy-policy.html' })}
${navbarHTML('')}
<main>
  <section class="section">
    <div class="container" style="max-width:720px">
      <nav class="breadcrumb" aria-label="Breadcrumb">
        <a href="/index.html">Home</a>
        <span class="breadcrumb__sep" aria-hidden="true">›</span>
        <span aria-current="page">Privacy policy</span>
      </nav>
      <h1 style="margin-bottom:24px">Privacy policy</h1>
      <p style="margin-bottom:16px"><strong>Last updated:</strong> ${new Date().toLocaleDateString('en-IN', { year:'numeric', month:'long', day:'numeric' })}</p>

      <h2 style="font-size:1.125rem; margin:24px 0 8px">1. Information we collect</h2>
      <p>When you contact us via WhatsApp, phone, or email, we collect your name, phone number, and event details solely to process your rental enquiry.</p>

      <h2 style="font-size:1.125rem; margin:24px 0 8px">2. How we use your information</h2>
      <p>Your contact details are used only to respond to your enquiry, confirm bookings, and coordinate delivery and setup logistics. We do not use your data for marketing without your explicit consent.</p>

      <h2 style="font-size:1.125rem; margin:24px 0 8px">3. Data sharing</h2>
      <p>We do not sell, trade, or share your personal information with third parties.</p>

      <h2 style="font-size:1.125rem; margin:24px 0 8px">4. Cookies</h2>
      <p>This website does not use tracking cookies or analytics at this time.</p>

      <h2 style="font-size:1.125rem; margin:24px 0 8px">5. Contact</h2>
      <p>For any privacy-related questions, email us at <a href="mailto:support@ramsaudiovisuals.com" style="color:var(--blue)">support@ramsaudiovisuals.com</a>.</p>
    </div>
  </section>
</main>
${footerHTML()}
${closingHTML()}`;

  writePage('public/privacy-policy.html', html);
}

function buildCityPages() {
  cities.forEach(city => {
    const serviceCards = services.map(s => `
<a href="/${city.slug}/${s.slug}.html" class="service-card">
  <div class="service-card__icon" aria-hidden="true">${({projector:'📽',sound:'🔊',mic:'🎤',tv:'📺',speaker:'🔈',screen:'🖥',combo:'📦'})[s.icon]||'📋'}</div>
  <div class="service-card__name">${s.name}</div>
  <div class="service-card__desc">Delivered &amp; set up in ${city.name}</div>
  <div class="service-card__arrow">Rent now →</div>
</a>`).join('');

    const popularInCity = [...equipment].sort((a,b) => b.bookedCount - a.bookedCount).slice(0,4).map(item => equipCardHTML(item, city.slug)).join('');

    const cityReviews = city.testimonials.map(t => {
      const initials = t.name.split(' ').map(part => part.charAt(0)).join('').replace('.', '').slice(0, 2).toUpperCase();
      return { name: t.name, location: `${t.area}, ${city.name}`, rating: 5, initials, comment: t.text };
    }).concat(googleReviews);

    const faqData = [
      [`What AV equipment can I rent in ${city.name}?`, `We offer projectors, LED screens, sound systems, speakers, microphones, TVs, and combo packages for rent in ${city.name} — all with free delivery and professional setup.`],
      [`Do you deliver to all areas in ${city.name}?`, `Yes, we deliver across ${city.name} including ${city.areas.split(',').slice(0,4).join(', ')} and more. WhatsApp us your venue address for confirmation.`],
      [`What is the minimum rental duration in ${city.name}?`, `Minimum rental is 1 day. We accommodate multi-day rentals at reduced rates. Contact us for a custom quote.`],
      [`How do I book AV equipment in ${city.name}?`, `WhatsApp or call us at ${city.phoneDisplay}. Share your event date, venue, and equipment requirements — we confirm in minutes.`],
      [`Do you provide setup service in ${city.name}?`, `Yes — every rental in ${city.name} includes free professional setup, testing, and collection after your event.`]
    ];

    const faqs = faqData.map(([q, a]) => `
<div class="faq-item" itemscope itemprop="mainEntity" itemtype="https://schema.org/Question">
  <button class="faq-item__question" itemprop="name">${q}<i class="faq-item__icon" aria-hidden="true">+</i></button>
  <div class="faq-item__answer" itemscope itemprop="acceptedAnswer" itemtype="https://schema.org/Answer">
    <p itemprop="text">${a}</p>
  </div>
</div>`).join('');

    const otherCities = cities.filter(c => c.slug !== city.slug).map(c => `<a href="/${c.slug}/index.html" class="related-link">${c.name}</a>`).join('');

    const schema = JSON.stringify({
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "LocalBusiness",
          "name": `Rams AudioVisuals ${city.name}`,
          "url": `https://www.ramsaudiovisuals.com/${city.slug}/`,
          "telephone": city.phone,
          "email": "support@ramsaudiovisuals.com",
          "areaServed": city.name,
          "description": city.metaDescription
        },
        {
          "@type": "BreadcrumbList",
          "itemListElement": [
            { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://www.ramsaudiovisuals.com/" },
            { "@type": "ListItem", "position": 2, "name": city.name, "item": `https://www.ramsaudiovisuals.com/${city.slug}/` }
          ]
        },
        {
          "@type": "FAQPage",
          "mainEntity": faqData.map(([q, a]) => ({
            "@type": "Question", "name": q,
            "acceptedAnswer": { "@type": "Answer", "text": a }
          }))
        }
      ]
    });

    const html = `${headHTML({ title: `AV Equipment for Rent in ${city.name} — Projectors, Sound Systems, Mics & More | Rams AudioVisuals`, description: city.metaDescription, canonical: `/${city.slug}/`, schema })}
${navbarHTML('')}
<main>
  <section class="section">
    <div class="container">
      <nav class="breadcrumb" aria-label="Breadcrumb">
        <a href="/index.html">Home</a>
        <span class="breadcrumb__sep" aria-hidden="true">›</span>
        <span aria-current="page">${city.name}</span>
      </nav>

      <div style="display:grid; grid-template-columns:1fr auto; gap:24px; align-items:start; margin-bottom:40px">
        <div>
          <span class="badge badge--blue">${city.name}</span>
          <h1 style="margin-top:8px; margin-bottom:12px">AV equipment for rent in ${city.name}</h1>
          <p style="font-size:1.05rem; max-width:600px">Projectors, sound systems, microphones, LED screens, TVs and combo packages — delivered and set up anywhere in ${city.name}.</p>
          <div class="hero__phone mt-16">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.81a19.79 19.79 0 01-3.07-8.67A2 2 0 012 1h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 8.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/></svg>
            Call us: <a href="tel:${city.phone}">${city.phoneDisplay}</a>
          </div>
        </div>
        <a href="https://wa.me/${city.whatsapp}?text=Hi%2C%20I%20need%20AV%20equipment%20in%20${city.name}." class="btn btn--whatsapp" target="_blank" rel="noopener" style="white-space:nowrap">
          WhatsApp ${city.name}
        </a>
      </div>

      <h2 style="margin-bottom:20px">Equipment available in ${city.name}</h2>
      <div class="grid grid--4">${serviceCards}</div>
    </div>
  </section>

  <section class="section--sm" style="background:var(--card); border-top:1px solid var(--border);">
    <div class="container">
      <div class="section-header">
        <span class="badge badge--blue">Most booked in ${city.name}</span>
        <h2>Popular in ${city.name}</h2>
      </div>
      <div class="grid grid--4">${popularInCity}</div>
    </div>
  </section>

  <section class="section">
    <div class="container">
      <div class="grid grid--2" style="gap:32px; align-items:start">
        <div>
          <h2 style="margin-bottom:16px">Why customers trust us in ${city.name}</h2>
          <ul style="display:flex; flex-direction:column; gap:12px">
            <li style="display:flex; gap:10px; align-items:flex-start"><span style="color:var(--blue); font-weight:700; font-size:1.1rem">✓</span><span>Serving ${city.name} since ${city.established} — ${city.eventsServed} events completed</span></li>
            <li style="display:flex; gap:10px; align-items:flex-start"><span style="color:var(--blue); font-weight:700; font-size:1.1rem">✓</span><span>Delivery across ${city.areas.split(',').slice(0,5).join(', ')} and all major areas</span></li>
            <li style="display:flex; gap:10px; align-items:flex-start"><span style="color:var(--blue); font-weight:700; font-size:1.1rem">✓</span><span>Professional setup and testing before every event</span></li>
            <li style="display:flex; gap:10px; align-items:flex-start"><span style="color:var(--blue); font-weight:700; font-size:1.1rem">✓</span><span>Equipment collected after your event — zero hassle</span></li>
          </ul>
        </div>
        <div>
          <h2 style="margin-bottom:16px">Delivery areas in ${city.name}</h2>
          <p>We deliver to all areas of ${city.name} including ${city.areas}. Not sure if we cover your venue? Just WhatsApp us the address.</p>
        </div>
      </div>
    </div>
  </section>

${reviewCarouselSectionHTML(cityReviews, `What our ${city.name} clients say`)}

  <section class="section" aria-label="FAQ">
    <div class="container" style="max-width:720px">
      <div class="section-header"><h2>Frequently asked questions — ${city.name}</h2></div>
      ${faqs}
    </div>
  </section>

  <section class="section--sm">
    <div class="container">
      <div style="margin-bottom:24px">
        <h3 style="margin-bottom:12px">We also serve</h3>
        <div class="related-links">${otherCities}</div>
      </div>
      <div class="cta-banner">
        <h2>Book AV equipment in ${city.name} today</h2>
        <p>WhatsApp us your event details for an instant quote. Free delivery and setup included.</p>
        <a href="https://wa.me/${city.whatsapp}?text=Hi%2C%20I%20need%20AV%20equipment%20in%20${city.name}." class="btn btn--whatsapp" target="_blank" rel="noopener">
          WhatsApp ${city.name}: ${city.phoneDisplay}
        </a>
      </div>
    </div>
  </section>
</main>
${footerHTML()}
${closingHTML()}`;

    writePage(`public/${city.slug}/index.html`, html);
  });
}
function buildCityServicePages() {

  /* FAQ templates per service type */
  const faqTemplates = {
    'projector-for-rent': (city) => [
      [`Where can I rent a projector in ${city.name}?`, `Rams AudioVisuals offers projector rental in ${city.name} with free delivery and professional setup. Call or WhatsApp us at ${city.phoneDisplay}.`],
      [`What is the projector rental price per day in ${city.name}?`, `Projector rental in ${city.name} starts from ₹1,800 per day for standard models and goes up to ₹2,999 for high-brightness laser projectors. Prices include delivery and setup.`],
      [`Do you provide a projector screen with the projector in ${city.name}?`, `Yes — we offer tripod screens and LED walls separately, and as part of combo packages. You can rent them together at a discounted rate in ${city.name}.`],
      [`Which projector is best for outdoor events in ${city.name}?`, `For outdoor events in ${city.name}, we recommend the Panasonic PT-VMZ51S (5200 lm) or the LED Wall options, which perform well in bright conditions.`],
      [`How early should I book a projector in ${city.name}?`, `For weekends and peak event seasons, we recommend booking at least 3–5 days in advance in ${city.name}. Last-minute bookings are also accepted subject to availability.`]
    ],
    'sound-system-for-rent': (city) => [
      [`Where can I rent a sound system in ${city.name}?`, `Rams AudioVisuals provides sound system rental in ${city.name} with delivery, setup, and testing included. Reach us at ${city.phoneDisplay}.`],
      [`What types of sound systems are available for rent in ${city.name}?`, `We offer portable party speakers, professional PA speakers (JBL PRX412M), powered speaker pairs with stands, and complete audio mixer setups in ${city.name}.`],
      [`How much does sound system rental cost in ${city.name}?`, `Sound system rental in ${city.name} starts from ₹1,299/day for portable speakers and goes up to ₹2,499/day for a full audio mixer setup with multiple speakers.`],
      [`Is setup included with sound system rental in ${city.name}?`, `Yes — every sound system rental in ${city.name} includes professional setup, cable management, sound check, and collection after your event.`],
      [`What events is a sound system suitable for in ${city.name}?`, `Our sound systems are used for corporate meetings, weddings, birthday parties, product launches, school events, and outdoor gatherings across ${city.name}.`]
    ],
    'mic-for-rent': (city) => [
      [`Where can I rent a microphone in ${city.name}?`, `Rams AudioVisuals rents wireless and wired microphones in ${city.name} with delivery and setup. Contact us at ${city.phoneDisplay}.`],
      [`What types of microphones are available for rent in ${city.name}?`, `We offer dual wireless handheld mics, collar mics (lavalier), headband mics, and complete PA systems with integrated microphones in ${city.name}.`],
      [`How much does microphone rental cost in ${city.name}?`, `Microphone rental in ${city.name} starts from ₹499/day for a dual wireless set and goes up to ₹3,999/day for a complete PA system with speakers and mics.`],
      [`Do wireless microphones work reliably in ${city.name}?`, `Yes — we use professional UHF wireless systems that are interference-free and reliable for events with up to 200ft range in ${city.name}.`],
      [`Can I rent just a microphone without speakers in ${city.name}?`, `Absolutely. You can rent microphones as standalone items in ${city.name}. We also offer combo packages if you need speakers and mics together at a discounted price.`]
    ],
    'tv-for-rent': (city) => [
      [`Where can I rent a TV in ${city.name}?`, `Rams AudioVisuals provides TV rental in ${city.name} including 43", 55", and 65" options. Free delivery and setup. Call ${city.phoneDisplay}.`],
      [`What TV sizes are available for rent in ${city.name}?`, `We have 43" Full HD Smart TVs, 55" QLED 4K TVs, and 65" QLED 4K TVs available for rent in ${city.name}.`],
      [`How much does TV rental cost in ${city.name}?`, `TV rental in ${city.name} starts from ₹1,999/day for a 43" Smart TV and goes up to ₹2,999/day for a 65" 4K QLED TV. Delivery and setup included.`],
      [`What is a TV rental used for at events in ${city.name}?`, `TVs are commonly rented in ${city.name} for digital menus at restaurants and caterers, presentation displays at conferences, reception screens at weddings, and product display at exhibitions.`],
      [`Do the rental TVs have HDMI and screen mirroring in ${city.name}?`, `Yes — all rental TVs support HDMI input, screen mirroring (Chromecast/Miracast), and USB playback. Smart TVs also support WiFi for streaming in ${city.name}.`]
    ],
    'speaker-for-rent': (city) => [
      [`Where can I rent speakers in ${city.name}?`, `Rams AudioVisuals offers speaker rental in ${city.name} with professional setup included. WhatsApp or call ${city.phoneDisplay}.`],
      [`What speaker options are available for rent in ${city.name}?`, `We offer portable karaoke speakers, 400W powered monitor speakers, JBL PRX412M professional speakers, and full speaker-and-stand setups in ${city.name}.`],
      [`How much does speaker rental cost in ${city.name}?`, `Speaker rental in ${city.name} starts from ₹1,299/day for portable speakers and goes up to ₹1,999/day for professional 400W powered monitors.`],
      [`Are the rental speakers suitable for outdoor events in ${city.name}?`, `Yes — our 400W Power X Monitors and JBL PRX412M speakers are suitable for both indoor and outdoor events with up to 300 attendees in ${city.name}.`],
      [`Do speakers come with stands and cables in ${city.name}?`, `Yes — all speaker rentals in ${city.name} include stands, cables, and a free sound check before your event starts.`]
    ],
    'led-screen-for-rent': (city) => [
      [`Where can I rent an LED screen or LED wall in ${city.name}?`, `Rams AudioVisuals provides LED screen and LED wall rental in ${city.name}. We supply P2.9 and P3.9 panels in custom sizes. Call ${city.phoneDisplay}.`],
      [`What LED screen sizes are available for rent in ${city.name}?`, `We offer a fixed 8×12 ft LED wall and custom-size LED walls using P2.9 & P3.9 panels priced per square foot, available across ${city.name}.`],
      [`How much does LED wall rental cost in ${city.name}?`, `LED screen rental in ${city.name} is priced from ₹79/sq.ft to ₹119/sq.ft depending on panel type. The 8×12 ft LED wall package starts at ₹7,999 for a full day.`],
      [`What events are LED walls used for in ${city.name}?`, `LED walls are popular in ${city.name} for weddings, corporate conferences, product launches, outdoor concerts, exhibitions, and sports screenings.`],
      [`Are LED walls suitable for outdoor use in ${city.name}?`, `Yes — our P3.9 LED panels are designed for both indoor and outdoor events in ${city.name} and remain clearly visible in bright ambient light conditions.`]
    ],
    'combo-packages': (city) => [
      [`What AV combo packages are available for rent in ${city.name}?`, `We offer three combo packages in ${city.name}: Projector + Screen + Speaker (₹2,999), PA System Package (₹3,999), and Complete Presentation Setup (₹5,999).`],
      [`Are combo packages cheaper than renting items separately in ${city.name}?`, `Yes — combo packages in ${city.name} save you 15–25% compared to renting the same items individually. They also simplify booking and setup coordination.`],
      [`What is included in the Complete Presentation Setup in ${city.name}?`, `The Complete Presentation Setup includes a projector, tripod screen, audio mixer, 2 powered speakers, a laptop, and a slide clicker — everything for a full conference or corporate event in ${city.name}.`],
      [`Can I customise a combo package for my event in ${city.name}?`, `Absolutely. WhatsApp us your event requirements and we can build a custom combo package tailored to your venue size, event type, and budget in ${city.name}.`],
      [`How do I book a combo package in ${city.name}?`, `WhatsApp or call us at ${city.phoneDisplay} with your event date and venue. We'll confirm availability, finalise the package, and schedule delivery in ${city.name}.`]
    ]
  };

  /* Events served list per service (for SEO) */
  const eventsServed = {
    'projector-for-rent':    'Corporate presentations, conferences, outdoor film screenings, school events, wedding slideshows, product launches, training sessions',
    'sound-system-for-rent': 'Weddings, corporate events, birthday parties, outdoor concerts, product launches, college fests, religious gatherings',
    'mic-for-rent':          'Speeches, wedding ceremonies, corporate meetings, school events, stage performances, seminars, interviews',
    'tv-for-rent':           'Digital menus, wedding receptions, exhibitions, trade shows, conference rooms, brand activations',
    'speaker-for-rent':      'Birthday parties, outdoor events, corporate gatherings, DJ setups, karaoke nights, school functions',
    'led-screen-for-rent':   'Weddings, concerts, product launches, corporate conferences, outdoor screenings, exhibitions, sports viewings',
    'combo-packages':        'Complete event setups, corporate conferences, wedding audio-visual packages, product launches, graduation ceremonies'
  };

  cities.forEach(city => {
    services.forEach(service => {

      const cityEquipment = equipment.filter(item => item.category === service.category);
      const faqData = (faqTemplates[service.slug] || faqTemplates['projector-for-rent'])(city);

      const equipCards = cityEquipment.map(item => equipCardHTML(item, city.slug)).join('');

      const faqs = faqData.map(([q, a]) => `
<div class="faq-item" itemscope itemprop="mainEntity" itemtype="https://schema.org/Question">
  <button class="faq-item__question" itemprop="name">${q}<i class="faq-item__icon" aria-hidden="true">+</i></button>
  <div class="faq-item__answer" itemscope itemprop="acceptedAnswer" itemtype="https://schema.org/Answer">
    <p itemprop="text">${a}</p>
  </div>
</div>`).join('');

      /* Sidebar — other services in this city */
      const sidebarLinks = services.filter(s => s.slug !== service.slug).map(s => `
<a href="/${city.slug}/${s.slug}.html" class="sidebar-link ${s.category === service.category ? 'active' : ''}">
  <span>${s.name}</span>
  <span class="sidebar-link__arrow">→</span>
</a>`).join('');

      /* Related links — same service other cities + other services this city */
      const sameSvcOtherCities = cities.filter(c => c.slug !== city.slug).map(c => `<a href="/${c.slug}/${service.slug}.html" class="related-link">${service.name} in ${c.name}</a>`).join('');
      const otherSvcSameCity = services.filter(s => s.slug !== service.slug).slice(0,3).map(s => `<a href="/${city.slug}/${s.slug}.html" class="related-link">${s.name} in ${city.name}</a>`).join('');

      const h1 = `${capitalize(service.h1suffix)} in ${city.name}`;
      const pageTitle = `${capitalize(service.h1suffix)} in ${city.name} | Rams AudioVisuals`;
      const metaDesc = `Rent ${service.metaSuffix} in ${city.name} with free delivery and professional setup. Starting from ₹499/day. Call ${city.phoneDisplay} or WhatsApp for an instant quote.`;

      const schema = JSON.stringify({
        "@context": "https://schema.org",
        "@graph": [
          {
            "@type": "Service",
            "name": `${service.name} for Rent in ${city.name}`,
            "provider": { "@type": "LocalBusiness", "name": "Rams AudioVisuals", "telephone": city.phone },
            "areaServed": city.name,
            "description": metaDesc
          },
          {
            "@type": "BreadcrumbList",
            "itemListElement": [
              { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://www.ramsaudiovisuals.com/" },
              { "@type": "ListItem", "position": 2, "name": city.name, "item": `https://www.ramsaudiovisuals.com/${city.slug}/` },
              { "@type": "ListItem", "position": 3, "name": service.name, "item": `https://www.ramsaudiovisuals.com/${city.slug}/${service.slug}.html` }
            ]
          },
          {
            "@type": "FAQPage",
            "mainEntity": faqData.map(([q, a]) => ({
              "@type": "Question", "name": q,
              "acceptedAnswer": { "@type": "Answer", "text": a }
            }))
          }
        ]
      });

      const html = `${headHTML({ title: pageTitle, description: metaDesc, canonical: `/${city.slug}/${service.slug}.html`, schema })}
${navbarHTML('')}
<main>
  <section class="section">
    <div class="container">
      <nav class="breadcrumb" aria-label="Breadcrumb">
        <a href="/index.html">Home</a>
        <span class="breadcrumb__sep" aria-hidden="true">›</span>
        <a href="/${city.slug}/index.html">${city.name}</a>
        <span class="breadcrumb__sep" aria-hidden="true">›</span>
        <span aria-current="page">${service.name}</span>
      </nav>

      <!-- HERO -->
      <div style="display:grid; grid-template-columns:1fr auto; gap:24px; align-items:start; margin-bottom:40px">
        <div>
          <span class="badge badge--blue">${city.name}</span>
          <h1 style="margin-top:8px; margin-bottom:12px">${h1}</h1>
          <p style="font-size:1.05rem; max-width:600px; margin-bottom:16px">Professional ${service.name.toLowerCase()} delivered and set up anywhere in ${city.name}. Starting from ₹499/day — all rentals include setup, testing, and collection.</p>
          <div class="hero__phone">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.81a19.79 19.79 0 01-3.07-8.67A2 2 0 012 1h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 8.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/></svg>
            Call: <a href="tel:${city.phone}">${city.phoneDisplay}</a>
          </div>
        </div>
        <a href="https://wa.me/${city.whatsapp}?text=Hi%2C%20I%20need%20${encodeURIComponent(service.name)}%20for%20rent%20in%20${city.name}." class="btn btn--whatsapp" target="_blank" rel="noopener" style="white-space:nowrap">
          WhatsApp to book
        </a>
      </div>

      <!-- MAIN CONTENT + SIDEBAR -->
      <div class="page-with-sidebar">
        <!-- Equipment cards -->
        <div>
          <h2 style="margin-bottom:20px">${service.name} available in ${city.name}</h2>
          ${cityEquipment.length > 0
            ? `<div class="grid grid--2">${equipCards}</div>`
            : `<div class="card" style="padding:32px; text-align:center"><p>Contact us for current ${service.name.toLowerCase()} availability in ${city.name}.</p><a href="https://wa.me/${city.whatsapp}" class="btn btn--whatsapp mt-16" target="_blank" rel="noopener">WhatsApp us</a></div>`
          }

          <!-- Pricing info -->
          <div class="card mt-24" style="padding:24px">
            <h3 style="margin-bottom:16px">Rental details</h3>
            <div style="display:grid; grid-template-columns:1fr 1fr; gap:16px">
              <div><div style="font-size:0.8rem; color:var(--text-muted); margin-bottom:2px">Minimum rental</div><div style="font-weight:600">1 day</div></div>
              <div><div style="font-size:0.8rem; color:var(--text-muted); margin-bottom:2px">Delivery in ${city.name}</div><div style="font-weight:600">Free</div></div>
              <div><div style="font-size:0.8rem; color:var(--text-muted); margin-bottom:2px">Setup</div><div style="font-weight:600">Included</div></div>
              <div><div style="font-size:0.8rem; color:var(--text-muted); margin-bottom:2px">Security deposit</div><div style="font-weight:600">Refundable</div></div>
            </div>
          </div>

          <!-- How to book -->
          <div class="card mt-16" style="padding:24px">
            <h3 style="margin-bottom:16px">How to book in ${city.name}</h3>
            <div style="display:flex; flex-direction:column; gap:12px">
              <div style="display:flex; gap:12px; align-items:flex-start">
                <div style="width:28px; height:28px; background:var(--blue); border-radius:50%; display:flex; align-items:center; justify-content:center; color:#fff; font-size:0.8rem; font-weight:700; flex-shrink:0">1</div>
                <div><strong>Choose your equipment</strong> — browse the options above and note what you need</div>
              </div>
              <div style="display:flex; gap:12px; align-items:flex-start">
                <div style="width:28px; height:28px; background:var(--blue); border-radius:50%; display:flex; align-items:center; justify-content:center; color:#fff; font-size:0.8rem; font-weight:700; flex-shrink:0">2</div>
                <div><strong>WhatsApp or call us</strong> — share your event date, venue in ${city.name}, and requirements</div>
              </div>
              <div style="display:flex; gap:12px; align-items:flex-start">
                <div style="width:28px; height:28px; background:var(--blue); border-radius:50%; display:flex; align-items:center; justify-content:center; color:#fff; font-size:0.8rem; font-weight:700; flex-shrink:0">3</div>
                <div><strong>We deliver and set up</strong> — our team arrives before your event and handles everything</div>
              </div>
            </div>
          </div>

          <!-- Events we serve -->
          <div class="card mt-16" style="padding:24px">
            <h3 style="margin-bottom:8px">Events we serve in ${city.name}</h3>
            <p style="font-size:0.9rem">${eventsServed[service.slug] || eventsServed['projector-for-rent']}</p>
          </div>
        </div>

        <!-- Sidebar -->
        <aside aria-label="Other services in ${city.name}">
          <div class="sidebar-sticky">
            <div class="sidebar-sticky__title">More in ${city.name}</div>
            ${sidebarLinks}
            <div class="sidebar-phone">
              <div class="sidebar-phone__label">${city.name} direct line</div>
              <a href="tel:${city.phone}" class="sidebar-phone__num">${city.phoneDisplay}</a>
              <a href="https://wa.me/${city.whatsapp}?text=Hi%2C%20I%20need%20${encodeURIComponent(service.name)}%20in%20${city.name}." class="btn btn--whatsapp btn--sm btn--full" target="_blank" rel="noopener">
                WhatsApp now
              </a>
            </div>
          </div>
        </aside>
      </div>
    </div>
  </section>

  <!-- FAQ -->
  <section class="section" style="background:var(--card); border-top:1px solid var(--border);" aria-label="FAQ">
    <div class="container" style="max-width:720px">
      <div class="section-header">
        <h2>Frequently asked questions — ${service.name} in ${city.name}</h2>
      </div>
      ${faqs}
    </div>
  </section>

  <!-- RELATED LINKS -->
  <section class="section--sm" aria-label="Related pages">
    <div class="container">
      <h3 style="margin-bottom:12px">${service.name} in other cities</h3>
      <div class="related-links mb-24">${sameSvcOtherCities}</div>
      <h3 style="margin-bottom:12px">Other equipment in ${city.name}</h3>
      <div class="related-links">${otherSvcSameCity}</div>
    </div>
  </section>

  <!-- CTA -->
  <section class="section--sm" aria-label="Book now">
    <div class="container">
      <div class="cta-banner">
        <h2>Book ${service.name.toLowerCase()} in ${city.name} today</h2>
        <p>Free delivery and setup anywhere in ${city.name}. Get an instant quote on WhatsApp.</p>
        <a href="https://wa.me/${city.whatsapp}?text=Hi%2C%20I%20need%20${encodeURIComponent(service.name)}%20for%20rent%20in%20${city.name}." class="btn btn--whatsapp" target="_blank" rel="noopener">
          WhatsApp ${city.phoneDisplay}
        </a>
      </div>
    </div>
  </section>
</main>
${footerHTML()}
${closingHTML()}`;

      writePage(`public/${city.slug}/${service.slug}.html`, html);
    });
  });
}

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
