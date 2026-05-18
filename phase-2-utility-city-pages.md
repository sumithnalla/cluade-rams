# Phase 2 — Utility Pages & City Landing Pages

## What this phase does
Builds 5 utility pages (about, contact, privacy policy) and all 5 city landing pages (`/bangalore/`, `/hyderabad/` etc.). Replace the stub functions from Phase 0 in `build.js`.

---

## Step 1 — Replace `buildAbout()` in `build.js`

```js
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
```

---

## Step 2 — Replace `buildContact()` in `build.js`

```js
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
```

---

## Step 3 — Replace `buildPrivacyPolicy()` in `build.js`

```js
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
```

---

## Step 4 — Replace `buildCityPages()` in `build.js`

```js
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

    const testimonialCards = city.testimonials.map(t => `
<div class="testimonial-card">
  <p class="testimonial-card__quote">"${t.text}"</p>
  <div class="testimonial-card__author">${t.name}</div>
  <div class="testimonial-card__location">${t.area}, ${city.name}</div>
</div>`).join('');

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

  <section class="section--sm" style="background:var(--card); border-top:1px solid var(--border);">
    <div class="container">
      <div class="section-header"><h2>What our ${city.name} clients say</h2></div>
      <div class="grid grid--2">${testimonialCards}</div>
    </div>
  </section>

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
```

---

## Step 5 — Run the build

```bash
node build.js
```

Expected new files:
- `public/about.html`
- `public/contact.html`
- `public/privacy-policy.html`
- `public/hyderabad/index.html`
- `public/bangalore/index.html`
- `public/mumbai/index.html`
- `public/chennai/index.html`
- `public/pune/index.html`

## Phase 2 is complete when:
- [ ] All 8 pages build without errors
- [ ] Each city page shows correct phone number for that city
- [ ] WhatsApp links on city pages pre-fill the correct city name
- [ ] Breadcrumb shows correct path
- [ ] FAQs open and close correctly
- [ ] All 5 city pages link to each other via "We also serve" section
