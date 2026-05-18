# Phase 3 — City + Service Pages (35 Pages)

## What this phase does
Generates all 35 city+service pages (`/bangalore/projector-for-rent.html`, `/hyderabad/sound-system-for-rent.html`, etc.). This is the most important SEO phase — these are the pages that rank for the specific keywords people actually search.

Replace the stub in `build.js`:

---

## Step 1 — Replace `buildCityServicePages()` in `build.js`

```js
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
      [`Where can I rent a TV in ${city.name}?`, `Rams AudioVisuals provides TV rental in ${city.name} including 43\", 55\", and 65\" options. Free delivery and setup. Call ${city.phoneDisplay}.`],
      [`What TV sizes are available for rent in ${city.name}?`, `We have 43\" Full HD Smart TVs, 55\" QLED 4K TVs, and 65\" QLED 4K TVs available for rent in ${city.name}.`],
      [`How much does TV rental cost in ${city.name}?`, `TV rental in ${city.name} starts from ₹1,999/day for a 43\" Smart TV and goes up to ₹2,999/day for a 65\" 4K QLED TV. Delivery and setup included.`],
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
```

---

## Step 2 — Run the build

```bash
node build.js
```

Expected: 35 new files across 5 city folders. Each folder (`/bangalore/`, `/hyderabad/` etc.) should now contain `index.html` + 7 service `.html` files.

Spot-check these three manually:
- `public/hyderabad/projector-for-rent.html` — H1 should say "Projector for rent in Hyderabad", phone should be 9700033342
- `public/bangalore/sound-system-for-rent.html` — H1 "Sound system for rent in Bangalore", sidebar links to all other Bangalore services
- `public/mumbai/combo-packages.html` — FAQ questions should be Mumbai-specific

## Phase 3 is complete when:
- [ ] All 35 files exist in `public/`
- [ ] Each page has the correct city name in H1, title tag, and meta description
- [ ] Sidebar shows all 6 other services in the same city
- [ ] "Related links" section shows same service in other 4 cities
- [ ] FAQ questions contain the city name
- [ ] WhatsApp links on each page use that city's number
- [ ] Breadcrumb: Home → [City] → [Service]
- [ ] Equipment cards only show items matching that service's category
