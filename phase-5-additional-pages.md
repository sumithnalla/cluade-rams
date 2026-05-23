# Additional Pages — Events, Corporate & Offers
## Rams AudioVisuals

### Setup context
- These are 3 standalone static HTML pages
- They use the exact same `main.css`, `main.js`, `navbarHTML()`, `footerHTML()`, `headHTML()`, `closingHTML()`, and `equipCardHTML()` helper functions already defined in `build.js`
- Add one build function per page inside `build.js` and call each from the `main()` function at the bottom
- Output paths: `public/events-we-serve.html`, `public/corporate.html`, `public/offers.html`
- All three pages are also Google Ads landing pages — every section must contain the primary keyword naturally, WhatsApp CTAs must be prominent, and pages must load fast with no unnecessary elements

---

## Page 1 — Events page

**File:** `public/events-we-serve.html`
**Function name in build.js:** `buildEventsPage()`
**Primary keyword:** "AV equipment for rent for events"
**Secondary keywords:** projector for rent for wedding, sound system for birthday party, AV equipment for corporate event, mic for rent for school event
**Purpose:** Captures people searching by event type rather than equipment type. Ranks for long-tail event-based keywords. Also used as a Google Ads landing page for event-type ad groups.

**Section 1 — Hero**
H1: "AV equipment for rent for every event in India"
Subheading: Weddings, corporate events, birthday parties, school functions, outdoor events and product launches — projectors, sound systems, mics, LED screens and combo packages delivered and set up.
Two buttons: "WhatsApp us now" (primary) and "Browse equipment" linking to `/equipment.html` (secondary).
Below buttons: city phone strip showing all 5 city numbers as clickable `tel:` links in one line.

**Section 2 — Event type cards grid**
Six cards in a 3-column grid (2-column on mobile). Each card has an emoji icon, event type name as H3, one sentence describing what equipment is typically needed, and a WhatsApp CTA button with a pre-filled message specific to that event type.
Cards:
- Wedding — "Projector + LED wall + PA system + cordless mics for ceremonies and receptions"  — WhatsApp message: "Hi, I need AV equipment for a wedding."
- Corporate event — "Projector, screen, audio mixer, speakers and presentation setup for conferences and meetings" — WhatsApp message: "Hi, I need AV equipment for a corporate event."
- Birthday party — "Bluetooth speakers, wireless mics, TV screens and combo packages for indoor and outdoor parties" — WhatsApp message: "Hi, I need AV equipment for a birthday party."
- School / College — "Projectors, mics, PA systems and sound systems for annual days, fests and seminars" — WhatsApp message: "Hi, I need AV equipment for a school or college event."
- Outdoor event — "High-brightness projectors, LED walls, powerful PA speakers for outdoor gatherings and screenings" — WhatsApp message: "Hi, I need AV equipment for an outdoor event."
- Product launch — "LED walls, professional sound systems, presentation projectors and complete AV setups for brand events" — WhatsApp message: "Hi, I need AV equipment for a product launch."

**Section 3 — How we serve your event**
H2: "How it works"
Three horizontal steps same as the homepage how-it-works section. Step 1: Tell us your event type and date. Step 2: We suggest the right equipment and confirm pricing. Step 3: We deliver, set up, and collect after your event.

**Section 4 — Popular equipment for events**
H2: "Most booked equipment for events"
Pull the top 4 items by `bookedCount` from `equipData.js` and render them using `equipCardHTML()`. These are generic cards not filtered by city — WhatsApp number defaults to Hyderabad main number.

**Section 5 — CTA banner**
H2: "Tell us about your event — get a quote in minutes"
Subtext: Free delivery, professional setup, and collection included. Serving Hyderabad, Bangalore, Mumbai, Chennai and Pune.
Single WhatsApp button: pre-filled message "Hi, I need AV equipment for my event. Can you help?"

**SEO requirements for this page:**
- Title tag: "AV Equipment for Rent for Events — Weddings, Corporate, Birthday & More | Rams AudioVisuals"
- Meta description: "Rent projectors, sound systems, mics, LED screens and combo packages for weddings, corporate events, birthday parties, school functions and outdoor events. Free delivery and setup in 5 cities."
- Canonical: `/events-we-serve.html`
- Schema: FAQPage with 3 questions — "What AV equipment do I need for a wedding?", "What sound system is best for an outdoor event?", "Do you provide AV setup for corporate events?"
- H2s must contain event type names naturally

---

## Page 2 — Corporate page

**File:** `public/corporate.html`
**Function name in build.js:** `buildCorporatePage()`
**Primary keyword:** "corporate AV equipment rental"
**Secondary keywords:** projector for rent for office, sound system for conference, AV equipment for corporate event in Hyderabad/Bangalore, GST invoice AV rental
**Purpose:** Targets corporate clients — offices, event agencies, HR teams — who search specifically for professional AV rental with GST billing and reliable service. Higher average order value. Also used as a Google Ads landing page for corporate-intent keywords.

**Section 1 — Hero**
H1: "Corporate AV equipment rental — professional setups for offices and events"
Subheading: Conference room projectors, PA systems, LED walls, presentation screens and complete AV setups for corporate events — with GST invoice, same-day delivery and dedicated support across Hyderabad, Bangalore, Mumbai, Chennai and Pune.
Two buttons: "Request a corporate quote" as WhatsApp CTA (pre-filled: "Hi, I need AV equipment for a corporate event. Please share pricing and availability.") and "Browse equipment" secondary button.
Below buttons: Email address `support@ramsaudiovisuals.com` displayed visibly for corporate clients who prefer email.

**Section 2 — What we offer corporate clients**
H2: "Complete AV solutions for corporate events"
Four cards in a 2x2 grid. Each card has icon, title as H3, and 2-line description:
- Conference room setup — "Projector, screen, wireless mics and speaker system for meetings and presentations of any size"
- Large venue sound — "Professional PA system with mixer, powered speakers, stands and cordless mics for auditoriums and halls"
- LED walls and displays — "Custom-size LED walls and large-format TV screens for brand visibility and presentations"
- Complete presentation kit — "Projector, screen, audio mixer, 2 speakers, laptop and slide changer — everything in one booking"

**Section 3 — Why corporates choose Rams AudioVisuals**
H2: "Why corporate clients trust us"
Bullet list with blue checkmarks — 6 points:
- GST invoice provided for every rental
- Bulk and multi-day rental discounts available
- Same-day and next-day delivery in all 5 cities
- Professional setup and sound check before your event starts
- Dedicated WhatsApp support throughout your event
- Equipment collected after your event — no coordination needed from your side

**Section 4 — Equipment for corporate events**
H2: "Equipment suited for corporate rentals"
Filter and render equipment cards from `equipData.js` — show only items with `category` of `projector`, `sound`, or `combo`. Use `equipCardHTML()`. WhatsApp pre-filled message: "Hi, I need this equipment for a corporate event."

**Section 5 — CTA banner**
H2: "Request a corporate AV quote"
Subtext: Share your event date, venue, and city — we'll send a detailed quote with GST breakdown within the hour. Available in Hyderabad, Bangalore, Mumbai, Chennai and Pune.
WhatsApp button pre-filled: "Hi, I need a corporate AV equipment quote. Event date: [date]. Venue: [venue]. City: [city]."
Below the button: Email line — "Prefer email? Write to support@ramsaudiovisuals.com"

**SEO requirements for this page:**
- Title tag: "Corporate AV Equipment Rental — Projectors, Sound Systems & LED Walls | Rams AudioVisuals"
- Meta description: "Professional AV equipment rental for corporate events — projectors, PA systems, LED walls and complete presentation setups with GST invoice. Available in Hyderabad, Bangalore, Mumbai, Chennai and Pune."
- Canonical: `/corporate.html`
- Schema: LocalBusiness with serviceType "Corporate AV Equipment Rental" and FAQPage with 3 questions — "Do you provide GST invoice for AV rentals?", "Can you handle AV setup for large corporate conferences?", "What is the minimum booking for corporate rentals?"
- H2s and bullet points must contain the keyword "corporate" naturally

---

## Page 3 — Offers page

**File:** `public/offers.html`
**Function name in build.js:** `buildOffersPage()`
**Primary keyword:** "AV equipment rental offers"
**Secondary keywords:** projector rental discount, cheap AV equipment for rent, affordable sound system rental, combo package offer
**Purpose:** Captures deal-seeking searchers and converts Google Ads clicks from price-sensitive audiences. Shows 3 hardcoded deals that are easy to update manually. Honest in tone — no fake countdown timers or false urgency.

**Section 1 — Hero**
H1: "AV equipment rental offers — get more for less"
Subheading: Current deals on projector rental, sound system packages, combo rentals and multi-day bookings. Available in Hyderabad, Bangalore, Mumbai, Chennai and Pune.
One button: "WhatsApp to claim an offer" — pre-filled: "Hi, I saw your rental offers and would like to know more."
Below button: Small honest note in muted text — "Offers are updated seasonally. WhatsApp us to confirm current availability."

**Section 2 — Active offer cards**
H2: "Current rental offers"
Three offer cards in a 3-column grid (1-column on mobile). Each card has a badge ("Limited time" / "Best value" / "Multi-day deal"), offer title as H3, description of what's included, the discounted price or saving clearly shown, and a WhatsApp CTA button.

Card 1 — Combo saver deal
Title: "Projector + Screen + Speaker — combo package"
Description: Book our most popular combo package and save compared to renting each item separately. Includes delivery, setup, and 2 cordless mics.
Price display: "From ₹2,999/day" with a line showing "Saves up to ₹1,000 vs individual rental"
WhatsApp message: "Hi, I'm interested in the combo package offer."

Card 2 — Multi-day discount
Title: "Multi-day rental — 20% off from day 2"
Description: Book any equipment for 2 or more days and get 20% off from the second day onwards. Ideal for conferences, exhibitions, and multi-day events.
Price display: "20% off day 2 onwards"
WhatsApp message: "Hi, I need AV equipment for multiple days and want the multi-day discount."

Card 3 — First booking offer
Title: "First-time customer offer"
Description: New to Rams AudioVisuals? Mention this offer when you WhatsApp us and get a special discount on your first rental in any city.
Price display: "Special price for first booking"
WhatsApp message: "Hi, I'm a new customer and would like the first booking offer."

**Section 3 — CTA banner**
H2: "Ready to book at the best price?"
Subtext: WhatsApp us your event date and city — we'll apply the best available offer to your booking automatically.
WhatsApp button pre-filled: "Hi, I want to book AV equipment and claim an offer."
Below the button: City phone numbers strip — all 5 cities listed with `tel:` links.

**SEO requirements for this page:**
- Title tag: "AV Equipment Rental Offers & Deals — Projectors, Sound Systems & Combos | Rams AudioVisuals"
- Meta description: "Current AV equipment rental offers — combo package deals, multi-day discounts and first booking offers on projectors, sound systems, mics and TVs in Hyderabad, Bangalore, Mumbai, Chennai and Pune."
- Canonical: `/offers.html`
- Schema: FAQPage with 3 questions — "Do you offer discounts on AV equipment rental?", "Is there a discount for multi-day rentals?", "How do I claim a rental offer?"
- Keyword "offer" and "rental" must appear in H1, at least two H2s, and each offer card title
