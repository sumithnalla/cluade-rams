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

const servicePhotoMap = {
  projector: 'projectors',
  sound: 'sound systems',
  mic: 'microphones',
  tv: 'televisions',
  speaker: 'speakers',
  screen: 'LED',
  combo: 'combos'
};

const homeGalleryTiles = {
  feature: {
    eyebrow: 'Full event setups',
    title: 'Book polished AV setups without the usual stress',
    description: 'From projector kits to LED walls and complete presentation bundles, we keep events looking sharp and running smoothly.'
  },
  squares: [
    {
      eyebrow: 'Projection',
      title: 'Projectors and screens',
      description: 'Bright visuals for meetings, launches, and screenings.'
    },
    {
      eyebrow: 'Audio',
      title: 'Sound and speakers',
      description: 'Clear, room-filling sound for every audience size.'
    },
    {
      eyebrow: 'Speech-ready',
      title: 'Microphones and PA',
      description: 'Reliable mic systems for speeches, panels, and stages.'
    },
    {
      eyebrow: 'Display',
      title: 'TVs and combo kits',
      description: 'Flexible display options for seminars and celebrations.'
    }
  ]
};

const cityGalleryTemplates = [
  {
    eyebrow: 'Corporate events',
    title: (city) => `Presentation-ready setups in ${city.name}`,
    description: (city) => `Projectors, TVs, and screens for meetings, seminars, and launches across ${city.name}.`
  },
  {
    eyebrow: 'Celebrations',
    title: () => 'Clear sound for every moment',
    description: () => 'Speakers, mixers, and microphones tuned for weddings, parties, and private celebrations.'
  },
  {
    eyebrow: 'Large-format impact',
    title: (city) => `LED walls and bundled AV support in ${city.name}`,
    description: () => 'Premium visuals and complete AV packages for launches, conferences, and high-energy events.'
  }
];

const galleryImageFiles = readdirSync(join(__dirname, 'public', 'photos', 'gallery'))
  .filter((fileName) => /\.(avif|gif|jpe?g|png|webp)$/i.test(fileName))
  .sort((left, right) => left.localeCompare(right, undefined, { numeric: true, sensitivity: 'base' }));

const avSolutionCards = [
  {
    icon: 'screen',
    title: 'Equipment Rental',
    description: 'Premium LED walls, projectors, sound systems, speakers, microphones, and event backdrops for any occasion.',
    items: ['LED Screens & Walls', 'Sound Systems', 'Projectors', 'Microphones']
  },
  {
    icon: 'truck',
    title: 'Delivery & Setup',
    description: 'Professional delivery, installation, and configuration of all equipment at your venue.',
    items: ['Safe Transportation', 'Professional Setup', 'Equipment Testing', 'Venue Assessment']
  },
  {
    icon: 'headset',
    title: 'On-Site Support',
    description: 'Experienced technicians available throughout your event to ensure everything runs smoothly.',
    items: ['Technical Assistance', 'Troubleshooting', 'Real-time Monitoring', 'Emergency Support']
  },
  {
    icon: 'calendar',
    title: 'Event Types',
    description: 'We cater to various events with customized AV solutions tailored to your specific needs.',
    items: ['Corporate Events', 'Private Celebrations', 'Weddings', 'Conferences']
  }
];

const whyChooseCards = [
  {
    icon: 'shield',
    title: 'Premium Quality Equipment',
    description: 'Latest technology AV equipment from top brands, regularly maintained and upgraded.'
  },
  {
    icon: 'clock',
    title: '24/7 Customer Support',
    description: 'Round-the-clock assistance for any queries or emergency support during events.'
  },
  {
    icon: 'users',
    title: 'Experienced Technicians',
    description: 'Certified professionals with 5+ years experience in event AV management.'
  },
  {
    icon: 'rupee',
    title: 'Competitive Pricing',
    description: 'Transparent pricing with no hidden charges. Best value for premium services.'
  }
];

const aboutServiceCards = [
  {
    icon: 'screen',
    title: 'Visual Solutions',
    items: [
      'LED Screens & Walls',
      'High-Definition Projectors',
      'Event Backdrops & Drapes',
      'Video Conferencing Systems'
    ]
  },
  {
    icon: 'speaker',
    title: 'Audio Solutions',
    items: [
      'Professional Sound Systems',
      'Wireless & Wired Microphones',
      'PA Systems & Speakers',
      'Mixers & Audio Consoles'
    ]
  },
  {
    icon: 'truck',
    title: 'Support Services',
    items: [
      'Equipment Delivery',
      'Professional Installation',
      'On-Site Technical Support',
      'Post-Event Pack-up'
    ]
  }
];

const aboutEventTypes = [
  { icon: 'briefcase', title: 'Corporate Events' },
  { icon: 'party', title: 'Private Parties' },
  { icon: 'presentation', title: 'Conferences' },
  { icon: 'seminar', title: 'Seminars' },
  { icon: 'music', title: 'Concerts' }
];

const eventLandingCards = [
  {
    emoji: '&#128141;',
    title: 'Wedding',
    description: 'Projector + LED wall + PA system + cordless mics for ceremonies and receptions',
    message: 'Hi, I need AV equipment for a wedding.'
  },
  {
    emoji: '&#128188;',
    title: 'Corporate event',
    description: 'Projector, screen, audio mixer, speakers and presentation setup for conferences and meetings',
    message: 'Hi, I need AV equipment for a corporate event.'
  },
  {
    emoji: '&#127881;',
    title: 'Birthday party',
    description: 'Bluetooth speakers, wireless mics, TV screens and combo packages for indoor and outdoor parties',
    message: 'Hi, I need AV equipment for a birthday party.'
  },
  {
    emoji: '&#127891;',
    title: 'School / College',
    description: 'Projectors, mics, PA systems and sound systems for annual days, fests and seminars',
    message: 'Hi, I need AV equipment for a school or college event.'
  },
  {
    emoji: '&#127957;',
    title: 'Outdoor event',
    description: 'High-brightness projectors, LED walls, powerful PA speakers for outdoor gatherings and screenings',
    message: 'Hi, I need AV equipment for an outdoor event.'
  },
  {
    emoji: '&#128640;',
    title: 'Product launch',
    description: 'LED walls, professional sound systems, presentation projectors and complete AV setups for brand events',
    message: 'Hi, I need AV equipment for a product launch.'
  }
];

const corporateLandingCards = [
  {
    icon: 'presentation',
    title: 'Conference room setup',
    description: 'Projector, screen, wireless mics and speaker system for meetings and presentations of any size'
  },
  {
    icon: 'speaker',
    title: 'Large venue sound',
    description: 'Professional PA system with mixer, powered speakers, stands and cordless mics for auditoriums and halls'
  },
  {
    icon: 'screen',
    title: 'LED walls and displays',
    description: 'Custom-size LED walls and large-format TV screens for brand visibility and presentations'
  },
  {
    icon: 'briefcase',
    title: 'Complete presentation kit',
    description: 'Projector, screen, audio mixer, 2 speakers, laptop and slide changer - everything in one booking'
  }
];

const corporateTrustPoints = [
  'GST invoice provided for every corporate rental',
  'Bulk and multi-day discounts available for corporate events',
  'Same-day and next-day delivery for corporate AV requirements in all 5 cities',
  'Professional setup and sound check before your corporate event starts',
  'Dedicated WhatsApp support throughout your corporate event',
  'Equipment collected after your corporate event - no coordination needed from your side'
];

const offerLandingCards = [
  {
    badge: 'Best value',
    title: 'Combo rental offer - Projector + Screen + Speaker',
    description: 'Book our most popular combo package and save compared to renting each item separately. Includes delivery, setup, and 2 cordless mics.',
    price: 'From &#8377;2,999/day',
    detail: 'Saves up to &#8377;1,000 vs individual rental',
    message: "Hi, I'm interested in the combo package offer."
  },
  {
    badge: 'Multi-day deal',
    title: 'Multi-day rental offer - 20% off from day 2',
    description: 'Book any equipment for 2 or more days and get 20% off from the second day onwards. Ideal for conferences, exhibitions, and multi-day events.',
    price: '20% off day 2 onwards',
    detail: 'Perfect for conferences, exhibitions, and back-to-back event schedules',
    message: 'Hi, I need AV equipment for multiple days and want the multi-day discount.'
  },
  {
    badge: 'Limited time',
    title: 'First booking rental offer',
    description: 'New to Rams AudioVisuals? Mention this offer when you WhatsApp us and get a special discount on your first rental in any city.',
    price: 'Special price for first booking',
    detail: 'Available for new customers across Hyderabad, Bangalore, Mumbai, Chennai, and Pune',
    message: "Hi, I'm a new customer and would like the first booking offer."
  }
];

const landingPageFaqs = {
  events: [
    [
      'What AV equipment do I need for a wedding?',
      'Most wedding bookings include a projector or LED wall, a PA system, and cordless microphones so speeches, visuals, and music are all covered in one setup.'
    ],
    [
      'What sound system is best for an outdoor event?',
      'Outdoor events usually need higher-output PA speakers, a mixer, and wireless microphones so the audio stays clear across a larger open space.'
    ],
    [
      'Do you provide AV setup for corporate events?',
      'Yes. We provide complete AV equipment delivery, setup, sound check, and collection for corporate events in all five cities we serve.'
    ]
  ],
  corporate: [
    [
      'Do you provide GST invoice for AV rentals?',
      'Yes. Every corporate AV equipment rental can be billed with a GST invoice for easier internal approvals and reimbursements.'
    ],
    [
      'Can you handle AV setup for large corporate conferences?',
      'Yes. We support conference rooms, auditoriums, and large venues with projectors, LED walls, sound systems, microphones, and on-site technical support.'
    ],
    [
      'What is the minimum booking for corporate rentals?',
      'The minimum corporate rental is usually one day, and we also support multi-day bookings with discounts for longer schedules.'
    ]
  ],
  offers: [
    [
      'Do you offer discounts on AV equipment rental?',
      'Yes. We regularly run AV equipment rental offers on combo packages, multi-day bookings, and first-time customer rentals.'
    ],
    [
      'Is there a discount for multi-day rentals?',
      'Yes. Our current multi-day rental offer gives you 20% off from the second day onwards on eligible bookings.'
    ],
    [
      'How do I claim a rental offer?',
      'Just WhatsApp us with your event date and city, mention the offer you want, and we will confirm the best applicable price for your booking.'
    ]
  ]
};

const iconPaths = {
  screen: '<rect x="3" y="4" width="18" height="12" rx="2"></rect><path d="M8 20h8"></path><path d="M12 16v4"></path>',
  speaker: '<path d="M5 9v6"></path><path d="M9 7v10"></path><path d="M13 5v14"></path><path d="M17 8a4 4 0 0 1 0 8"></path><path d="M19 6a7 7 0 0 1 0 12"></path>',
  truck: '<path d="M10 17H6a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h8v11z"></path><path d="M14 10h3l3 3v4h-6z"></path><circle cx="7.5" cy="17.5" r="1.5"></circle><circle cx="17.5" cy="17.5" r="1.5"></circle>',
  headset: '<path d="M4 13a8 8 0 0 1 16 0"></path><path d="M6 14H5a2 2 0 0 0-2 2v2a2 2 0 0 0 2 2h1z"></path><path d="M18 14h1a2 2 0 0 1 2 2v2a2 2 0 0 1-2 2h-1z"></path><path d="M12 19v2"></path>',
  calendar: '<rect x="3" y="4" width="18" height="17" rx="2"></rect><path d="M8 2v4"></path><path d="M16 2v4"></path><path d="M3 10h18"></path><path d="M8 14h3"></path><path d="M8 18h8"></path>',
  shield: '<path d="M12 3l7 3v5c0 5-3.5 8.5-7 10-3.5-1.5-7-5-7-10V6l7-3z"></path><path d="m9.5 12 1.8 1.8 3.7-3.8"></path>',
  clock: '<circle cx="12" cy="12" r="9"></circle><path d="M12 7v5l3 2"></path>',
  users: '<path d="M16 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="3"></circle><path d="M22 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 4.13a3 3 0 0 1 0 5.74"></path>',
  rupee: '<path d="M6 5h10"></path><path d="M6 9h10"></path><path d="M8 13h4a4 4 0 0 0 0-8"></path><path d="m8 13 8 8"></path>',
  briefcase: '<rect x="3" y="7" width="18" height="13" rx="2"></rect><path d="M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path><path d="M3 13h18"></path>',
  party: '<path d="m5 20 14-14"></path><path d="m15 5 4 4"></path><path d="M7 7h.01"></path><path d="M4 10h.01"></path><path d="M14 3h.01"></path><path d="M19 8h.01"></path><path d="M11 4h.01"></path>',
  presentation: '<rect x="4" y="3" width="16" height="12" rx="2"></rect><path d="M8 21h8"></path><path d="M12 15v6"></path><path d="m8 8 2.5 2.5L16 7"></path>',
  seminar: '<path d="M4 5h16"></path><path d="M4 12h16"></path><path d="M4 19h10"></path><path d="M18 16v6"></path><path d="m15 19 3-3 3 3"></path>',
  music: '<path d="M9 18V5l10-2v13"></path><circle cx="6" cy="18" r="3"></circle><circle cx="16" cy="16" r="3"></circle>',
  phone: '<path d="M22 16.92v3a2 2 0 0 1-2.18 2A19.79 19.79 0 0 1 11.19 18.85 19.5 19.5 0 0 1 5.15 12.81 19.79 19.79 0 0 1 2.08 4.18 2 2 0 0 1 4.06 2h3a2 2 0 0 1 2 1.72c.12.89.35 1.75.67 2.57a2 2 0 0 1-.45 2.11L8.09 9.59a16 16 0 0 0 6.32 6.32l1.19-1.19a2 2 0 0 1 2.11-.45c.82.32 1.68.55 2.57.67A2 2 0 0 1 22 16.92z"></path>',
  mail: '<rect x="3" y="5" width="18" height="14" rx="2"></rect><path d="m4 7 8 6 8-6"></path>',
  check: '<path d="m6 12 4 4 8-8"></path>'
};

function iconHTML(name) {
  const markup = iconPaths[name] || iconPaths.check;
  return `<span class="feature-icon" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round">${markup}</svg></span>`;
}

function featureListHTML(items = []) {
  return `
  <ul class="feature-list">
    ${items.map(item => `<li>${iconHTML('check')}<span>${item}</span></li>`).join('')}
  </ul>`;
}

function infoPanelHTML(panel, extraClass = '') {
  return `
  <article class="info-panel${extraClass ? ` ${extraClass}` : ''}">
    <div class="info-panel__icon">${iconHTML(panel.icon)}</div>
    <h3 class="info-panel__title">${panel.title}</h3>
    ${panel.description ? `<p class="info-panel__copy">${panel.description}</p>` : ''}
    ${panel.items ? featureListHTML(panel.items) : ''}
  </article>`;
}

function eventCardHTML(event) {
  return `
  <article class="event-card">
    <div class="event-card__icon">${iconHTML(event.icon)}</div>
    <h3 class="event-card__title">${event.title}</h3>
  </article>`;
}

function pickGalleryImages(startIndex, count, altBase) {
  if (!galleryImageFiles.length) {
    return Array.from({ length: count }, (_, index) => ({
      src: '/photos/h.webp',
      alt: `${altBase} ${index + 1}`
    }));
  }

  return Array.from({ length: count }, (_, index) => {
    const fileName = galleryImageFiles[(startIndex + index) % galleryImageFiles.length];
    const imageNumberMatch = fileName.match(/(\d+)/);
    const imageNumber = imageNumberMatch ? imageNumberMatch[1] : String(index + 1);

    return {
      src: `/photos/gallery/${fileName}`,
      alt: `${altBase} ${imageNumber}`
    };
  });
}

function chunkItems(items, size) {
  const chunks = [];

  for (let index = 0; index < items.length; index += size) {
    chunks.push(items.slice(index, index + size));
  }

  return chunks;
}

function galleryTileHTML(tile, className = '', showOnlyTitle = false) {
  const media = tile.images.map((image, index) => `
    <img
      src="${image.src}"
      alt="${image.alt}"
      class="rotating-gallery__image${index === 0 ? ' is-active' : ''}"
      loading="${index === 0 ? 'eager' : 'lazy'}"
      decoding="async"
    />`).join('');

  return `
  <article class="gallery-tile ${className}" data-rotating-tile aria-label="${tile.title}">
    ${media}
    <div class="gallery-tile__content">
      ${!showOnlyTitle && tile.eyebrow ? `<span class="gallery-tile__eyebrow">${tile.eyebrow}</span>` : ''}
      <h3>${tile.title}</h3>
      ${!showOnlyTitle && tile.description ? `<p>${tile.description}</p>` : ''}
    </div>
  </article>`;
}

function homeGallerySectionHTML() {
  const imageGroups = chunkItems(
    pickGalleryImages(0, 20, "Ram's Audio Visuals home gallery image"),
    4
  );
  const featureTile = { ...homeGalleryTiles.feature, images: imageGroups[0] || [] };
  const squareTiles = homeGalleryTiles.squares.map((tile, index) => ({
    ...tile,
    images: imageGroups[index + 1] || []
  }));

  return `
  <section class="section gallery-section" aria-label="Gallery">
    <div class="container">
      <div class="section-header">
        <span class="badge badge--blue">Gallery</span>
        <h2>AV setups built for every kind of event</h2>
        <p>A quick look at the combinations and categories our clients book most often.</p>
      </div>
      <div class="gallery-hscroll">
        <div class="gallery-mosaic">
          ${galleryTileHTML(featureTile, 'gallery-tile--feature', true)}
          ${squareTiles.map((tile) => galleryTileHTML(tile, 'gallery-tile--square', true)).join('')}
        </div>
      </div>
    </div>
  </section>`;
}

function cityGallerySectionHTML(city) {
  const cityIndex = cities.findIndex((entry) => entry.slug === city.slug);
  const cityStartIndex = galleryImageFiles.length ? (20 + (cityIndex * 12)) % galleryImageFiles.length : 0;
  const imageGroups = chunkItems(
    pickGalleryImages(cityStartIndex, 12, `${city.name} AV gallery image`),
    4
  );
  const cityTiles = cityGalleryTemplates.map((tile, index) => ({
    eyebrow: tile.eyebrow,
    title: typeof tile.title === 'function' ? tile.title(city) : tile.title,
    description: typeof tile.description === 'function' ? tile.description(city) : tile.description,
    images: imageGroups[index] || []
  }));

  return `
  <section class="section gallery-section" aria-label="Gallery from ${city.name}">
    <div class="container">
      <div class="section-header">
        <span class="badge badge--blue">Gallery</span>
        <h2>Event-ready AV setups in ${city.name}</h2>
        <p>Three popular setup directions our clients ask for in ${city.name}.</p>
      </div>
      <div class="grid grid--3 gallery-grid">
        ${cityTiles.map((tile) => galleryTileHTML(tile, 'gallery-tile--wide', true)).join('')}
      </div>
    </div>
  </section>`;
}

function reviewCarouselSectionHTML(reviews = googleReviews, title = 'What clients say about us') {
  const cards = [...reviews, ...reviews].map(review => `
        <article class="review-card">
          <div class="review-card__top">
            <img src="/photos/google.webp" alt="Google" class="review-card__google" loading="lazy" width="40" height="40"/>
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

function faqPageEntity(faqs = []) {
  return {
    "@type": "FAQPage",
    "mainEntity": faqs.map(([question, answer]) => ({
      "@type": "Question",
      "name": question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": answer
      }
    }))
  };
}

function localBusinessEntity({ description, serviceType }) {
  return {
    "@type": "LocalBusiness",
    "name": "Rams AudioVisuals",
    "url": "https://www.ramsaudiovisuals.com",
    "email": "support@ramsaudiovisuals.com",
    "telephone": cities[0].phone,
    "description": description,
    "serviceType": serviceType,
    "areaServed": cities.map(city => city.name),
    "contactPoint": cities.map(city => ({
      "@type": "ContactPoint",
      "telephone": city.phone,
      "contactType": "customer service",
      "areaServed": city.name
    }))
  };
}

function cityPhoneStripHTML(extraClass = '') {
  return `
  <div class="landing-phone-strip${extraClass ? ` ${extraClass}` : ''}">
    ${cities.map(city => `
      <a href="tel:${city.phone}">
        <span>${city.name}</span>
        ${city.phoneDisplay}
      </a>`).join('')}
  </div>`;
}

function actionLinkHTML(action) {
  if (!action) return '';
  const attrs = action.external ? ' target="_blank" rel="noopener"' : '';
  return `<a href="${action.href}" class="${action.className}"${attrs}>${action.label}</a>`;
}

function landingHeroHTML({
  badge,
  title,
  description,
  primaryAction,
  secondaryAction,
  supportContent = '',
  mainImageSrc,
  mainImageAlt,
  accentImageSrc = '',
  accentImageAlt = '',
  tags = [],
  ariaLabel = 'Hero'
}) {
  return `
  <section class="section hero-section hero-section--landing" aria-label="${ariaLabel}">
    <div class="container">
      <div class="landing-hero">
        <div class="landing-hero__content">
          <span class="badge badge--blue landing-hero__badge">${badge}</span>
          <h1>${title}</h1>
          <p>${description}</p>
          <div class="landing-hero__actions">
            ${actionLinkHTML(primaryAction)}
            ${actionLinkHTML(secondaryAction)}
          </div>
          ${supportContent ? `<div class="landing-hero__support">${supportContent}</div>` : ''}
        </div>
        <div class="landing-hero__visual" aria-hidden="true">
          <div class="landing-hero__glow landing-hero__glow--one"></div>
          <div class="landing-hero__glow landing-hero__glow--two"></div>
          <div class="landing-hero__media">
            ${tags.length ? `<div class="landing-hero__tags">${tags.map(tag => `<span class="landing-hero__tag">${tag}</span>`).join('')}</div>` : ''}
            <img src="${mainImageSrc}" alt="${mainImageAlt}" class="landing-hero__image" loading="eager" decoding="async" />
          </div>
          ${accentImageSrc ? `
          <div class="landing-hero__accent">
            <img src="${accentImageSrc}" alt="${accentImageAlt}" class="landing-hero__accent-image" loading="eager" decoding="async" />
          </div>` : ''}
        </div>
      </div>
    </div>
  </section>`;
}

function howItWorksSectionHTML({ title, description, steps }) {
  const stepImages = ['/photos/step1.webp', '/photos/step2.webp', '/photos/step3.webp'];

  return `
  <section class="section" style="background:var(--card); border-top:1px solid var(--border);" aria-label="${title}">
    <div class="container">
      <div class="section-header">
        <span class="badge badge--blue">How it works</span>
        <h2>${title}</h2>
        <p>${description}</p>
      </div>
      <div class="grid grid--3">
        ${steps.map((step, index) => `
        <div class="how-step">
          <img src="${stepImages[index] || stepImages[stepImages.length - 1]}" alt="Step ${index + 1}" class="how-step__img" loading="lazy" decoding="async">
          <div class="how-step__title">${step.title}</div>
          <div class="how-step__desc">${step.description}</div>
        </div>`).join('')}
      </div>
    </div>
  </section>`;
}

function eventTypeCardHTML(card) {
  const waNumber = cities[0].whatsapp;
  const waMessage = encodeURIComponent(card.message);

  const imageMap = {
    'wedding': 'wedding.webp',
    'corporate event': 'corporate.webp',
    'birthday party': 'birthday.webp',
    'school / college': 'college.webp',
    'outdoor event': 'outdoor event.webp',
    'product launch': 'product launch.webp'
  };
  const photoName = imageMap[card.title.toLowerCase()] || '';
  const photoUrl = `/photos/${encodeURIComponent(photoName)}`;

  return `
  <article class="event-type-card">
    <div class="event-type-card__image-container">
      <img src="${photoUrl}" alt="${card.title} AV rental" class="event-type-card__img" loading="lazy">
    </div>
    <div class="event-type-card__info">
      <h3>${card.title}</h3>
      <p>${card.description}</p>
    </div>
    <a href="https://wa.me/${waNumber}?text=${waMessage}" class="btn btn--whatsapp btn--sm btn--full" target="_blank" rel="noopener">
      WhatsApp for ${card.title.toLowerCase()}
    </a>
  </article>`;
}

function offerCardHTML(offer) {
  const waNumber = cities[0].whatsapp;
  const waMessage = encodeURIComponent(offer.message);

  return `
  <article class="offer-card">
    <span class="badge badge--blue offer-card__badge">${offer.badge}</span>
    <h3>${offer.title}</h3>
    <p>${offer.description}</p>
    <div class="offer-card__price">${offer.price}</div>
    <div class="offer-card__detail">${offer.detail}</div>
    <a href="https://wa.me/${waNumber}?text=${waMessage}" class="btn btn--whatsapp btn--full" target="_blank" rel="noopener">
      Claim this offer
    </a>
  </article>`;
}

function equipCardHTMLLegacy(item, citySlug) {
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

function equipCardHTML(item, citySlug, options = {}) {
  const waCity = citySlug ? cities.find(c => c.slug === citySlug) : null;
  const waNum = options.whatsappNumber || (waCity ? waCity.whatsapp : '919700033342');
  const defaultMessage = `Hi, I'd like to enquire about "${item.name}" rental${waCity ? ` in ${waCity.name}` : ''}.`;
  const waMsg = encodeURIComponent(options.message || defaultMessage);
  const ctaLabel = options.ctaLabel || 'WhatsApp to book';
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
    ${ctaLabel}
  </a>
</div>`;
}

function navbarHTML(activePage = '') {
  const navItems = [
    { key: 'home', href: '/index.html', label: 'Home' },
    { key: 'equipment', href: '/equipment.html', label: 'Equipment' },
    { key: 'offers', href: '/offers.html', label: 'Offers' },
    { key: 'events', href: '/events-we-serve.html', label: 'Events' },
    { key: 'corporate', href: '/corporate.html', label: 'Corporate' },
    { key: 'contact', href: '/contact.html', label: 'Contact' }
  ];
  const desktopLinks = navItems
    .map(item => `<li><a href="${item.href}"${activePage === item.key ? ' class="active" aria-current="page"' : ''}>${item.label}</a></li>`)
    .join('\n        ');
  const mobileLinks = navItems
    .map(item => `<a href="${item.href}" role="menuitem"${activePage === item.key ? ' class="active" aria-current="page"' : ''}>${item.label}</a>`)
    .join('\n    ');

  return `
<nav class="navbar" role="navigation" aria-label="Main navigation">
  <div class="container">
    <div class="navbar__inner">
      <a href="/index.html" class="navbar__logo"><img src="/photos/logo new.webp" alt="Rams AudioVisuals Logo" class="navbar__logo-img"></a>
      <ul class="navbar__links" role="list">
        ${desktopLinks}
      </ul>
      <button class="navbar__hamburger" type="button" aria-label="Toggle menu" aria-expanded="false" aria-controls="mobile-menu">
        <span></span><span></span><span></span>
      </button>
    </div>
    <div class="navbar__mobile" id="mobile-menu" role="menu">
      ${mobileLinks}
    </div>
  </div>
</nav>`;
}

function footerHTML() {
  const cityLinks = cities.map(c => `<a href="/${c.slug}/index.html">${c.name}</a>`).join('\n        ');
  return `
<footer class="footer" role="contentinfo">
  <div class="container">
    <div class="footer__inner">
      <div class="footer__brand">
        <a href="/index.html" class="footer__logo"><img src="/photos/logo-footer.webp" alt="Rams AudioVisuals Logo" class="footer__logo-img"></a>
        <p class="footer__tagline">Professional AV equipment on rent across 5 major Indian cities. Delivered, set up, and collected — hassle free.</p>
      </div>
      <div class="footer__col">
        <div class="footer__col-title">Cities</div>
        <div class="footer__links">${cityLinks}</div>
      </div>
      <div class="footer__col">
        <div class="footer__col-title">Equipment</div>
        <div class="footer__links">
          <a href="/equipment.html#projector">Projectors</a>
          <a href="/equipment.html#sound">Sound systems</a>
          <a href="/equipment.html#mic">Microphones</a>
          <a href="/equipment.html#tv">Televisions</a>
          <a href="/equipment.html#combo">Combo packages</a>
        </div>
      </div>
      <div class="footer__col">
        <div class="footer__col-title">Company</div>
        <div class="footer__links">
          <a href="/about.html">About us</a>
          <a href="/contact.html">Contact</a>
          <a href="/privacy-policy.html">Privacy policy</a>
          <a href="mailto:support@ramsaudiovisuals.com">support@ramsaudiovisuals.com</a>
        </div>
      </div>
    </div>
    <div class="footer__bottom">
      <span>© ${new Date().getFullYear()} Rams AudioVisuals. All rights reserved.</span>
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
  <link rel="icon" type="image/webp" href="/photos/favicon.webp" />
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

function closingHTML(jsPath = '/js/main.js', waConfig = {}) {
  const separator = jsPath.includes('?') ? '&' : '?';
  const waNumber = waConfig.number || '919700033342';
  const waMsg = encodeURIComponent(waConfig.message || 'Hi, I need AV equipment for my event.');
  const floatBtn = `
<a href="https://wa.me/${waNumber}?text=${waMsg}" class="wa-float" target="_blank" rel="noopener" aria-label="Chat on WhatsApp">
  <svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg"><path d="M16 .5C7.44.5.5 7.44.5 16c0 2.74.72 5.41 2.09 7.77L.5 31.5l8-2.06A15.44 15.44 0 0016 31.5C24.56 31.5 31.5 24.56 31.5 16S24.56.5 16 .5zm0 28.22a13.65 13.65 0 01-6.96-1.9l-.5-.3-5.19 1.36 1.38-5.04-.32-.52A13.72 13.72 0 1116 28.72zm7.57-10.27c-.41-.21-2.44-1.21-2.82-1.35s-.65-.21-.93.21-1.07 1.35-1.31 1.63-.48.31-.89.1a11.23 11.23 0 01-3.3-2.04 12.38 12.38 0 01-2.28-2.83c-.24-.41 0-.63.18-.84s.41-.48.62-.72a2.82 2.82 0 00.41-.69.76.76 0 000-.72c-.1-.21-.93-2.24-1.28-3.06s-.67-.69-.93-.69h-.79a1.51 1.51 0 00-1.1.52 4.64 4.64 0 00-1.45 3.44 8.05 8.05 0 001.69 4.27 18.45 18.45 0 007.07 6.24 23.47 23.47 0 002.35.87 5.64 5.64 0 002.59.16 4.27 4.27 0 002.79-1.97 3.44 3.44 0 00.24-1.97c-.1-.17-.38-.28-.79-.49z"/></svg>
</a>`;
  return `${floatBtn}\n<script src="${jsPath}${separator}v=${assetVersion}"></script>\n</body>\n</html>`;
}

/* ---- copy static assets ---- */
function copyAssets() {
  mkdirSync('public/css', { recursive: true });
  mkdirSync('public/js', { recursive: true });
  copyFileSync('src/css/main.css', 'public/css/main.css');
  copyFileSync('src/js/main.js', 'public/js/main.js');
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
        "logo": "https://www.ramsaudiovisuals.com/photos/logo%20new.webp",
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
  <div class="service-card__icon"><img src="/photos/${c.slug}.webp" alt="${c.name}" class="service-card__img" loading="lazy"></div>
  <div class="service-card__name">${c.name}</div>
</a>`).join('');

  const serviceStrip = services.map(s => `
<a href="/equipment.html#${s.category}" class="service-card">
  <div class="service-card__icon"><img src="/photos/${servicePhotoMap[s.icon]}.webp" alt="${s.name}" class="service-card__img" loading="lazy"></div>
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
  <section class="section hero-section" aria-label="Hero">
    <div class="container">
      <div class="hero-card hero-card--home">
        <div class="hero-card__content">
          <div class="badge badge--blue hero-card__badge">Premium AV Rentals</div>
          <h1>"Professional <span class="highlight-accent">AV equipment<svg class="hand-drawn-circle" viewBox="0 0 100 100" preserveAspectRatio="none"><path d="M5,50 C5,15 95,15 95,50 C95,85 8,85 5,55 C4,35 12,25 22,22" /></svg></span> for rent<br>and <span class="highlight-underline">delivered & set<svg class="hand-drawn-underline" viewBox="0 0 100 10" preserveAspectRatio="none"><path d="M 2,8 C 30,5 70,9 98,6" /></svg></span>"</h1>
          <div class="hero-card__actions">
            <a href="https://wa.me/919700033342?text=Hi%2C%20I%20need%20AV%20equipment%20for%20my%20event." class="btn btn--primary" target="_blank" rel="noopener">
              Book Now
            </a>
            <a href="/equipment.html" class="btn btn--secondary">
              View Equipment
            </a>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- CITIES -->
  <section class="section--sm" aria-label="Cities we serve">
    <div class="container">
      <div class="section-header cities-section-header" style="margin-bottom: 32px;">
        <h2>Select your city</h2>
        <div class="cities-nav" aria-label="Cities navigation">
          <button class="cities-nav__btn cities-nav__btn--prev" aria-label="Previous city" id="cities-prev-btn">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="15 18 9 12 15 6"></polyline></svg>
          </button>
          <button class="cities-nav__btn cities-nav__btn--next" aria-label="Next city" id="cities-next-btn">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>
          </button>
        </div>
      </div>
      <div class="cities-hscroll">
        <div class="grid grid--5" role="list" aria-label="Available cities">
          ${cityCards}
        </div>
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
      <div class="grid grid--4 stats-grid">
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
      <div class="how-hscroll">
        <div class="grid grid--3">
          <div class="how-step">
            <img src="/photos/step1.webp" alt="Step 1" class="how-step__img">
            <div class="how-step__title">Choose your equipment</div>
            <div class="how-step__desc">Browse our catalogue. Select the items you need for your event type and size.</div>
          </div>
          <div class="how-step">
            <img src="/photos/step2.webp" alt="Step 2" class="how-step__img">
            <div class="how-step__title">WhatsApp or call us</div>
            <div class="how-step__desc">Share your event date, venue, and city. We confirm availability and pricing within minutes.</div>
          </div>
          <div class="how-step">
            <img src="/photos/step3.webp" alt="Step 3" class="how-step__img">
            <div class="how-step__title">We deliver and set up</div>
            <div class="how-step__desc">Our team arrives before your event, sets everything up, and collects after. Zero hassle.</div>
          </div>
        </div>
      </div>
    </div>
  </section>

${homeGallerySectionHTML()}

  <!-- POPULAR EQUIPMENT -->
  <section class="section" aria-label="Popular equipment">
    <div class="container">
      <div class="section-header">
        <span class="badge badge--blue">Most booked</span>
        <h2>Popular equipment</h2>
        <p>Our most rented items — trusted by hundreds of events across India.</p>
      </div>
      <div class="equip-hscroll">
        <div class="grid grid--3">
          ${popularCards}
        </div>
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
${closingHTML('/js/main.js', { number: '919700033342', message: 'Hi, I need AV equipment for my event.' })}`;

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
${closingHTML('/js/main.js', { number: '919700033342', message: 'Hi, I need AV equipment for my event.' })}`

  writePage('public/equipment.html', html);
}
function buildAbout() {
  const serviceCards = aboutServiceCards.map(card => infoPanelHTML(card)).join('');
  const eventCards = aboutEventTypes.map(eventCardHTML).join('');
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
    <div class="container">
      <nav class="breadcrumb" aria-label="Breadcrumb">
        <a href="/index.html">Home</a>
        <span class="breadcrumb__sep" aria-hidden="true">›</span>
        <span aria-current="page">About us</span>
      </nav>
      <div class="section-header" style="text-align:left; margin-bottom:32px">
        <span class="badge badge--blue">About the founder</span>
        <h1 style="margin-top:12px; margin-bottom:12px">Founder &amp; CEO - Ram's Audio Visuals</h1>
        <p style="max-width:700px; margin:0">Meet the person behind Ram's Audio Visuals and the service-first approach that powers events across India.</p>
      </div>
      <div class="founder-card">
        <div class="founder-card__media">
          <img src="/photos/ceo.webp" alt="Ramavath Ramesh, Founder and CEO of Ram's Audio Visuals" class="founder-card__image" loading="lazy" decoding="async" />
        </div>
        <div class="founder-card__content">
          <p>Mr. Ramavath Ramesh is the Founder &amp; CEO of Ram's Audio Visuals, based in Hyderabad. With strong dedication and vision, he has built the company into a trusted provider of projector rentals and audio-visual solutions for events, corporate meetings, and presentations.</p>
          <p>His commitment to quality service, customer satisfaction, and professional execution has helped Ram's Audio Visuals grow steadily in the industry.</p>
          <div class="founder-card__signature">
            <div class="founder-card__name">Ramavath Ramesh</div>
            <div class="founder-card__role">Founder &amp; CEO</div>
            <div class="founder-card__company">Ram's Audio Visuals</div>
            <p class="founder-card__tagline">Delivering professional AV solutions across India</p>
          </div>
        </div>
      </div>
    </div>
  </section>

  <section class="section" style="background:var(--card); border-top:1px solid var(--border);">
    <div class="container">
      <div class="section-header">
        <span class="badge badge--blue">What we do</span>
        <h2>Complete audio-visual solutions for unforgettable events.</h2>
      </div>
      <div class="quote-card">
        <blockquote>"At Ram's Audio Visual Services, we exist to make events easier, more engaging, and memorable by providing reliable, high-quality AV equipment and professional support. We believe that great technology should enhance experiences, not complicate them."</blockquote>
      </div>
      <div class="grid grid--3 mt-32">
        ${serviceCards}
      </div>
    </div>
  </section>

  <section class="section">
    <div class="container">
      <div class="section-header">
        <span class="badge badge--blue">Events We Serve</span>
        <h2>Flexible AV support for business events, celebrations, and live experiences</h2>
      </div>
      <div class="event-grid">
        ${eventCards}
      </div>
    </div>
  </section>

  <section class="section" style="padding-top:0">
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
${closingHTML('/js/main.js', { number: '919700033342', message: 'Hi, I need AV equipment for my event.' })}`

  writePage('public/about.html', html);
}

function buildContact() {
  const cityOptions = cities.map(c => `
            <option value="${c.slug}" data-city-name="${c.name}" data-city-whatsapp="${c.whatsapp}">${c.name}</option>`).join('');

  const cityPills = cities
    .map(c => `<span class="contact-aside__city">${c.name}</span>`)
    .join('');

  const cityCards = cities.map(c => {
    const areaPreview = c.areas.split(',').slice(0, 3).map(area => area.trim()).join(', ');
    return `
          <article class="contact-city-card">
            <div class="contact-city-card__eyebrow">City team</div>
            <div class="contact-city-card__top">
              <h3>${c.name}</h3>
              <span class="contact-city-card__badge">Live support</span>
            </div>
            <a href="tel:${c.phone}" class="contact-city-card__phone">${c.phoneDisplay}</a>
            <p class="contact-city-card__copy">Fast AV rental support across ${areaPreview} and more.</p>
            <div class="contact-city-card__actions">
              <a href="https://wa.me/${c.whatsapp}?text=Hi%2C%20I%20need%20AV%20equipment%20in%20${c.name}." class="contact-city-card__action contact-city-card__action--primary" target="_blank" rel="noopener">WhatsApp</a>
              <a href="/${c.slug}/index.html" class="contact-city-card__action">View city page</a>
            </div>
          </article>`;
  }).join('');

  const html = `${headHTML({ title: 'Contact Rams AudioVisuals — Get a Quote Today', description: 'Contact Rams AudioVisuals for AV equipment rental in Hyderabad, Bangalore, Mumbai, Chennai and Pune. WhatsApp or call your city number for an instant quote.', canonical: '/contact.html' })}
${navbarHTML('contact')}
<main>
  <section class="section contact-page">
    <div class="container">
      <nav class="breadcrumb" aria-label="Breadcrumb">
        <a href="/index.html">Home</a>
        <span class="breadcrumb__sep" aria-hidden="true">›</span>
        <span aria-current="page">Contact</span>
      </nav>

      <div class="contact-page__intro">
        <span class="badge badge--blue">Contact</span>
        <h1>Let&apos;s plan the right AV setup for your event</h1>
        <p>Share your city and requirement once. We&apos;ll route you to the right Rams team with a quick quote.</p>
      </div>

      <div class="contact-shell">
        <div class="contact-form-card">
          <div class="contact-form-card__header">
            <p class="contact-form-card__eyebrow">Send us a message</p>
            <h2>Get a quote in minutes</h2>
            <p>Enter your details and we&apos;ll open the correct city WhatsApp with your enquiry pre-filled.</p>
          </div>

          <form class="contact-form" data-contact-form>
            <div class="contact-input-grid">
              <label class="contact-field">
                <span>Name</span>
                <input type="text" name="name" placeholder="Your full name" autocomplete="name" required>
              </label>

              <label class="contact-field">
                <span>Email</span>
                <input type="email" name="email" placeholder="you@example.com" autocomplete="email" required>
              </label>

              <label class="contact-field">
                <span>Phone number</span>
                <div class="contact-phone-input">
                  <span class="contact-phone-input__prefix">+91</span>
                  <input type="tel" name="phone" placeholder="10-digit mobile number" inputmode="numeric" autocomplete="tel-national" maxlength="10" minlength="10" pattern="[0-9]{10}" title="Please enter exactly 10 digits" data-phone-input required>
                </div>
              </label>

              <label class="contact-field">
                <span>City</span>
                <select name="city" data-city-select required>
                  <option value="" selected disabled>Select your city</option>${cityOptions}
                </select>
              </label>

              <label class="contact-field contact-field--full">
                <span>Message</span>
                <textarea name="message" placeholder="Event date, venue, equipment list, or anything else we should know." rows="4" required></textarea>
              </label>
            </div>

            <div class="contact-form__footer">
              <p class="contact-form__hint">Your message will open in WhatsApp for the selected city team.</p>
              <div class="contact-form__actions">
                <button type="submit" class="btn btn--primary contact-submit">Send message</button>
                <p class="contact-form__status" data-contact-status aria-live="polite" hidden></p>
              </div>
            </div>
          </form>
        </div>

        <aside class="contact-aside">
          <p class="contact-aside__eyebrow">Always here to help</p>
          <h2>Quick replies and city-specific support.</h2>
          <p class="contact-aside__copy">For bookings, bulk rentals, or planning help, we&apos;ll connect you with the right team fast.</p>

          <div class="contact-aside__stack">
            <div class="contact-aside__item">
              <div class="contact-aside__icon">${iconHTML('phone')}</div>
              <div>
                <span class="contact-aside__label">Fastest route</span>
                <strong>Choose a city to open the right WhatsApp team.</strong>
                <p>Best for fast pricing and availability checks.</p>
              </div>
            </div>

            <div class="contact-aside__item">
              <div class="contact-aside__icon">${iconHTML('mail')}</div>
              <div>
                <span class="contact-aside__label">General email</span>
                <a href="mailto:support@ramsaudiovisuals.com">support@ramsaudiovisuals.com</a>
                <p>Best for partnerships and larger quote requests.</p>
              </div>
            </div>

            <div class="contact-aside__item">
              <div class="contact-aside__icon">${iconHTML('clock')}</div>
              <div>
                <span class="contact-aside__label">Business hours</span>
                <strong>Monday - Sunday, 8:00 AM - 9:00 PM</strong>
                <p>WhatsApp is monitored till 10:00 PM.</p>
              </div>
            </div>
          </div>

          <div class="contact-aside__cities">
            <span class="contact-aside__cities-label">Serving all 5 cities</span>
            <div class="contact-aside__city-list">${cityPills}</div>
          </div>
        </aside>
      </div>

      <div class="contact-city-section">
        <div class="section-header contact-city-section__header">
          <span class="badge badge--grey">Direct city lines</span>
          <h2>Prefer contacting a city team directly?</h2>
          <p>Use the local lines below for the fastest call-back and on-ground coordination.</p>
        </div>
        <div class="contact-city-grid">${cityCards}</div>
      </div>
    </div>
  </section>
</main>
${footerHTML()}
${closingHTML('/js/main.js', { number: '919700033342', message: 'Hi, I need AV equipment for my event.' })}`

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
      <p style="margin-bottom:16px"><strong>Last updated:</strong> ${new Date().toLocaleDateString('en-IN', { year: 'numeric', month: 'long', day: 'numeric' })}</p>

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
${closingHTML('/js/main.js', { number: '919700033342', message: 'Hi, I need AV equipment for my event.' })}`

  writePage('public/privacy-policy.html', html);
}

function buildCityPages() {
  cities.forEach(city => {
    const serviceCards = services.map(s => `
<a href="/${city.slug}/${s.slug}.html" class="service-card service-card--detailed">
  <div class="service-card__icon"><img src="/photos/${servicePhotoMap[s.icon]}.webp" alt="${s.name}" class="service-card__img" loading="lazy"></div>
  <div class="service-card__name">${s.name}</div>
  <div class="service-card__desc">Delivered and set up in ${city.name}</div>
  <div class="service-card__arrow">Explore options</div>
</a>`).join('');

    const popularInCity = [...equipment].sort((a, b) => b.bookedCount - a.bookedCount).slice(0, 4).map(item => equipCardHTML(item, city.slug)).join('');
    const solutionCards = avSolutionCards.map(card => infoPanelHTML(card)).join('');
    const whyCards = whyChooseCards.map(card => infoPanelHTML(card, 'info-panel--compact')).join('');

    const cityReviews = city.testimonials.map(t => {
      const initials = t.name.split(' ').map(part => part.charAt(0)).join('').replace('.', '').slice(0, 2).toUpperCase();
      return { name: t.name, location: `${t.area}, ${city.name}`, rating: 5, initials, comment: t.text };
    }).concat(googleReviews);

    const faqData = [
      [`What AV equipment can I rent in ${city.name}?`, `We offer projectors, LED screens, sound systems, speakers, microphones, TVs, and combo packages for rent in ${city.name} — all with free delivery and professional setup.`],
      [`Do you deliver to all areas in ${city.name}?`, `Yes, we deliver across ${city.name} including ${city.areas.split(',').slice(0, 4).join(', ')} and more. WhatsApp us your venue address for confirmation.`],
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

      <div class="city-hero-header" style="display:grid; grid-template-columns:1fr auto; gap:24px; align-items:start; margin-bottom:40px">
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
      <div class="grid grid--4 city-cats-grid">
        ${serviceCards}
        <a href="/equipment.html" class="view-all-card">
          <span class="view-all-card__icon">📦</span>
          <span>View All<br>Equipment →</span>
        </a>
      </div>
    </div>
  </section>

  <section class="section--sm" style="background:var(--card); border-top:1px solid var(--border);">
    <div class="container">
      <div class="section-header">
        <span class="badge badge--blue">Most booked in ${city.name}</span>
        <h2>Popular in ${city.name}</h2>
      </div>
      <div class="city-equip-hscroll">
        <div class="grid grid--4">${popularInCity}</div>
      </div>
    </div>
  </section>

${cityGallerySectionHTML(city)}

  <section class="section" style="background:var(--card); border-top:1px solid var(--border);">
    <div class="container">
      <div class="section-header">
        <span class="badge badge--blue">Complete Audio-Visual Solutions</span>
        <h2>From equipment rental to on-site support - we handle it all</h2>
      </div>
      <div class="grid grid--2 info-panels-2col">
        ${solutionCards}
      </div>
    </div>
  </section>

  <section class="section">
    <div class="container">
      <div class="section-header">
        <span class="badge badge--blue">Our Support Team</span>
        <h2>Why Choose Ram's AV Services</h2>
        <p>Trusted by 500+ events across India</p>
      </div>
      <div class="grid grid--4 info-panels-4col">
        ${whyCards}
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
${closingHTML('/js/main.js', { number: city.whatsapp, message: `Hi, I need AV equipment in ${city.name}.` })}`;

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
    'projector-for-rent': 'Corporate presentations, conferences, outdoor film screenings, school events, wedding slideshows, product launches, training sessions',
    'sound-system-for-rent': 'Weddings, corporate events, birthday parties, outdoor concerts, product launches, college fests, religious gatherings',
    'mic-for-rent': 'Speeches, wedding ceremonies, corporate meetings, school events, stage performances, seminars, interviews',
    'tv-for-rent': 'Digital menus, wedding receptions, exhibitions, trade shows, conference rooms, brand activations',
    'speaker-for-rent': 'Birthday parties, outdoor events, corporate gatherings, DJ setups, karaoke nights, school functions',
    'led-screen-for-rent': 'Weddings, concerts, product launches, corporate conferences, outdoor screenings, exhibitions, sports viewings',
    'combo-packages': 'Complete event setups, corporate conferences, wedding audio-visual packages, product launches, graduation ceremonies'
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
      const otherSvcSameCity = services.filter(s => s.slug !== service.slug).slice(0, 3).map(s => `<a href="/${city.slug}/${s.slug}.html" class="related-link">${s.name} in ${city.name}</a>`).join('');

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
      <div class="city-hero-header" style="display:grid; grid-template-columns:1fr auto; gap:24px; align-items:start; margin-bottom:40px">
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
          ? `<div class="grid grid--2 subcat-equip-grid">${equipCards}</div>`
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
${closingHTML('/js/main.js', { number: city.whatsapp, message: `Hi, I need ${service.name} for rent in ${city.name}.` })}`;

      writePage(`public/${city.slug}/${service.slug}.html`, html);
    });
  });
}

function buildEventsPage() {
  const topEventEquipment = [...equipment]
    .sort((left, right) => right.bookedCount - left.bookedCount)
    .slice(0, 4)
    .map(item => equipCardHTML(item, null, {
      message: `Hi, I need ${item.name} for my event. Can you help?`,
      ctaLabel: 'WhatsApp for this setup'
    }))
    .join('');

  const eventCards = eventLandingCards.map(eventTypeCardHTML).join('');
  const schema = JSON.stringify({
    "@context": "https://schema.org",
    "@graph": [faqPageEntity(landingPageFaqs.events)]
  });

  const html = `${headHTML({
    title: 'AV Equipment for Rent for Events - Weddings, Corporate, Birthday & More | Rams AudioVisuals',
    description: 'Rent projectors, sound systems, mics, LED screens and combo packages for weddings, corporate events, birthday parties, school functions and outdoor events. Free delivery and setup in 5 cities.',
    canonical: '/events-we-serve.html',
    schema
  })}
${navbarHTML('events')}
<main>
  ${landingHeroHTML({
    badge: 'Event AV rentals',
    title: 'AV equipment for rent for every event in India',
    description: 'Weddings, corporate events, birthday parties, school functions, outdoor events and product launches - projectors, sound systems, mics, LED screens and combo packages delivered and set up.',
    primaryAction: {
      href: 'https://wa.me/919700033342?text=Hi%2C%20I%20need%20AV%20equipment%20for%20my%20event.%20Can%20you%20help%3F',
      label: 'WhatsApp us now',
      className: 'btn btn--whatsapp',
      external: true
    },
    secondaryAction: {
      href: '/equipment.html',
      label: 'Browse equipment',
      className: 'btn btn--secondary'
    },
    supportContent: `<p class="landing-hero__support-copy">Call your city team directly for AV equipment for rent for events.</p>${cityPhoneStripHTML()}`,
    mainImageSrc: '/photos/projectors.webp',
    mainImageAlt: 'Projector and screen setup for event rentals',
    accentImageSrc: '/photos/microphones.webp',
    accentImageAlt: 'Wireless microphones for event rentals',
    tags: ['Weddings', 'Corporate events', 'Birthday parties'],
    ariaLabel: 'AV equipment for rent for every event in India'
  })}

  <section class="section" aria-label="Event types we serve">
    <div class="container">
      <div class="section-header">
        <span class="badge badge--blue">Event types</span>
        <h2>AV equipment for rent for events across weddings, corporate events, birthday parties and school functions</h2>
        <p>Choose the event type below and get the fastest WhatsApp quote for AV equipment for rent for events in Hyderabad, Bangalore, Mumbai, Chennai, or Pune.</p>
      </div>
      <div class="landing-event-grid">
        ${eventCards}
      </div>
    </div>
  </section>

  ${howItWorksSectionHTML({
    title: 'How it works for weddings, corporate events and parties',
    description: 'Booking AV equipment for rent for events is simple - share your event details, approve the quote, and let us handle delivery, setup, and collection.',
    steps: [
      {
        title: 'Tell us your event type and date',
        description: 'Share whether you need AV equipment for a wedding, corporate event, birthday party, school function, outdoor event, or product launch.'
      },
      {
        title: 'We suggest the right equipment and confirm pricing',
        description: 'We recommend the best AV equipment for rent for events based on your venue size, audience, and budget.'
      },
      {
        title: 'We deliver, set up, and collect after your event',
        description: 'Our team handles the complete event setup, testing, and post-event collection so you can focus on the experience.'
      }
    ]
  })}

  <section class="section" aria-label="Most booked event equipment">
    <div class="container">
      <div class="section-header">
        <span class="badge badge--blue">Most booked</span>
        <h2>Most booked AV equipment for weddings, corporate events and parties</h2>
        <p>These are the four setups clients book most often when they need AV equipment for rent for events across India.</p>
      </div>
      <div class="grid grid--4">
        ${topEventEquipment}
      </div>
    </div>
  </section>

  <section class="section--sm" aria-label="Event quote CTA">
    <div class="container">
      <div class="cta-banner">
        <h2>Tell us about your event - get a quote in minutes</h2>
        <p>Free delivery, professional setup, and collection included. Serving Hyderabad, Bangalore, Mumbai, Chennai and Pune with AV equipment for rent for events.</p>
        <a href="https://wa.me/919700033342?text=Hi%2C%20I%20need%20AV%20equipment%20for%20my%20event.%20Can%20you%20help%3F" class="btn btn--whatsapp" target="_blank" rel="noopener">
          WhatsApp us now
        </a>
      </div>
    </div>
  </section>
</main>
${footerHTML()}
${closingHTML('/js/main.js', { number: '919700033342', message: 'Hi, I need AV equipment for my event. Can you help?' })}`

  writePage('public/events-we-serve.html', html);
}

function buildCorporatePage() {
  const corporateEquipment = [...equipment]
    .filter(item => ['projector', 'sound', 'combo'].includes(item.category))
    .sort((left, right) => right.bookedCount - left.bookedCount)
    .map(item => equipCardHTML(item, null, {
      message: 'Hi, I need this equipment for a corporate event.',
      ctaLabel: 'WhatsApp for corporate pricing'
    }))
    .join('');

  const solutionCards = corporateLandingCards
    .map(card => infoPanelHTML(card, 'info-panel--compact'))
    .join('');

  const corporateDescription = 'Professional AV equipment rental for corporate events - projectors, PA systems, LED walls and complete presentation setups with GST invoice. Available in Hyderabad, Bangalore, Mumbai, Chennai and Pune.';
  const schema = JSON.stringify({
    "@context": "https://schema.org",
    "@graph": [
      localBusinessEntity({
        description: corporateDescription,
        serviceType: 'Corporate AV Equipment Rental'
      }),
      faqPageEntity(landingPageFaqs.corporate)
    ]
  });

  const html = `${headHTML({
    title: 'Corporate AV Equipment Rental - Projectors, Sound Systems & LED Walls | Rams AudioVisuals',
    description: corporateDescription,
    canonical: '/corporate.html',
    schema
  })}
${navbarHTML('corporate')}
<main>
  ${landingHeroHTML({
    badge: 'Corporate AV rental',
    title: 'Corporate AV equipment rental - professional setups for offices and events',
    description: 'Conference room projectors, PA systems, LED walls, presentation screens and complete AV setups for corporate events - with GST invoice, same-day delivery and dedicated support across Hyderabad, Bangalore, Mumbai, Chennai and Pune.',
    primaryAction: {
      href: 'https://wa.me/919700033342?text=Hi%2C%20I%20need%20AV%20equipment%20for%20a%20corporate%20event.%20Please%20share%20pricing%20and%20availability.',
      label: 'Request a corporate quote',
      className: 'btn btn--whatsapp',
      external: true
    },
    secondaryAction: {
      href: '/equipment.html',
      label: 'Browse equipment',
      className: 'btn btn--secondary'
    },
    supportContent: '<p class="landing-hero__support-copy">Prefer email for your corporate AV equipment rental?</p><a href="mailto:support@ramsaudiovisuals.com" class="landing-email-line">support@ramsaudiovisuals.com</a>',
    mainImageSrc: '/photos/sound systems.webp',
    mainImageAlt: 'Corporate sound system rental setup',
    accentImageSrc: '/photos/LED.webp',
    accentImageAlt: 'LED wall rental for corporate events',
    tags: ['GST invoice', 'Same-day delivery', 'Dedicated support'],
    ariaLabel: 'Corporate AV equipment rental'
  })}

  <section class="section" aria-label="Corporate AV solutions">
    <div class="container">
      <div class="section-header">
        <span class="badge badge--blue">Corporate solutions</span>
        <h2>Complete corporate AV solutions for corporate events</h2>
        <p>From boardroom presentations to large-format launches, our corporate AV equipment rental service covers every part of the event setup.</p>
      </div>
      <div class="grid grid--2 info-panels-2col">
        ${solutionCards}
      </div>
    </div>
  </section>

  <section class="section" style="background:var(--card); border-top:1px solid var(--border);" aria-label="Why corporate clients trust us">
    <div class="container">
      <div class="section-header">
        <span class="badge badge--blue">Why us</span>
        <h2>Why corporate clients trust us</h2>
        <p>Our corporate AV equipment rental process is designed for fast approvals, reliable execution, and zero confusion on event day.</p>
      </div>
      <div class="landing-check-panel">
        ${featureListHTML(corporateTrustPoints)}
      </div>
    </div>
  </section>

  <section class="section" aria-label="Corporate rental equipment">
    <div class="container">
      <div class="section-header">
        <span class="badge badge--blue">Corporate-ready equipment</span>
        <h2>Equipment suited for corporate rentals</h2>
        <p>Browse the projector, sound, and combo setups most often used in our corporate AV equipment rental bookings.</p>
      </div>
      <div class="grid grid--3">
        ${corporateEquipment}
      </div>
    </div>
  </section>

  <section class="section--sm" aria-label="Corporate quote CTA">
    <div class="container">
      <div class="cta-banner">
        <h2>Request a corporate AV quote</h2>
        <p>Share your event date, venue, and city - we will send a detailed quote with GST breakdown within the hour. Available in Hyderabad, Bangalore, Mumbai, Chennai and Pune.</p>
        <a href="https://wa.me/919700033342?text=Hi%2C%20I%20need%20a%20corporate%20AV%20equipment%20quote.%20Event%20date%3A%20%5Bdate%5D.%20Venue%3A%20%5Bvenue%5D.%20City%3A%20%5Bcity%5D." class="btn btn--whatsapp" target="_blank" rel="noopener">
          Request a corporate quote
        </a>
        <p class="landing-email-cta">Prefer email? Write to <a href="mailto:support@ramsaudiovisuals.com">support@ramsaudiovisuals.com</a></p>
      </div>
    </div>
  </section>
</main>
${footerHTML()}
${closingHTML('/js/main.js', { number: '919700033342', message: 'Hi, I need AV equipment for a corporate event. Please share pricing and availability.' })}`;

  writePage('public/corporate.html', html);
}

function buildOffersPage() {
  const offerCards = offerLandingCards.map(offerCardHTML).join('');
  const schema = JSON.stringify({
    "@context": "https://schema.org",
    "@graph": [faqPageEntity(landingPageFaqs.offers)]
  });

  const html = `${headHTML({
    title: 'AV Equipment Rental Offers & Deals - Projectors, Sound Systems & Combos | Rams AudioVisuals',
    description: 'Current AV equipment rental offers - combo package deals, multi-day discounts and first booking offers on projectors, sound systems, mics and TVs in Hyderabad, Bangalore, Mumbai, Chennai and Pune.',
    canonical: '/offers.html',
    schema
  })}
${navbarHTML('offers')}
<main>
  ${landingHeroHTML({
    badge: 'Seasonal pricing',
    title: 'AV equipment rental offers - get more for less',
    description: 'Current deals on projector rental, sound system packages, combo rentals and multi-day bookings. Available in Hyderabad, Bangalore, Mumbai, Chennai and Pune.',
    primaryAction: {
      href: 'https://wa.me/919700033342?text=Hi%2C%20I%20saw%20your%20rental%20offers%20and%20would%20like%20to%20know%20more.',
      label: 'WhatsApp to claim an offer',
      className: 'btn btn--whatsapp',
      external: true
    },
    supportContent: '<p class="landing-note">Offers are updated seasonally. WhatsApp us to confirm current availability.</p>',
    mainImageSrc: '/photos/combos.webp',
    mainImageAlt: 'AV combo rental offer equipment',
    accentImageSrc: '/photos/projectors.webp',
    accentImageAlt: 'Projector rental offer visual',
    tags: ['Combo rental offer', 'Multi-day rental offer', 'Affordable packages'],
    ariaLabel: 'AV equipment rental offers'
  })}

  <section class="section" aria-label="Current rental offers">
    <div class="container">
      <div class="section-header">
        <span class="badge badge--blue">Active offers</span>
        <h2>Current rental offers</h2>
        <p>These AV equipment rental offers are straightforward, honest, and easy to claim over WhatsApp without any fake urgency.</p>
      </div>
      <div class="grid grid--3 landing-offer-grid">
        ${offerCards}
      </div>
    </div>
  </section>

  <section class="section--sm" aria-label="Claim your rental offer">
    <div class="container">
      <div class="cta-banner">
        <h2>Ready to book with the best rental offer?</h2>
        <p>WhatsApp us your event date and city - we will apply the best available offer to your booking automatically.</p>
        <a href="https://wa.me/919700033342?text=Hi%2C%20I%20want%20to%20book%20AV%20equipment%20and%20claim%20an%20offer." class="btn btn--whatsapp" target="_blank" rel="noopener">
          WhatsApp to claim an offer
        </a>
        ${cityPhoneStripHTML('landing-phone-strip--centered')}
      </div>
    </div>
  </section>
</main>
${footerHTML()}
${closingHTML('/js/main.js', { number: '919700033342', message: 'Hi, I want to book AV equipment and claim an offer.' })}`

  writePage('public/offers.html', html);
}

/* ---- sitemap ---- */
function buildSitemap() {
  const baseUrl = 'https://www.ramsaudiovisuals.com';
  const today = new Date().toISOString().split('T')[0];
  const staticPages = [
    { url: '/', priority: '1.0', freq: 'weekly' },
    { url: '/equipment.html', priority: '0.9', freq: 'weekly' },
    { url: '/events-we-serve.html', priority: '0.8', freq: 'weekly' },
    { url: '/corporate.html', priority: '0.8', freq: 'weekly' },
    { url: '/offers.html', priority: '0.7', freq: 'weekly' },
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
  console.log('\n🛠️ Building Rams AudioVisuals...\n');
  mkdirSync('public', { recursive: true });
  copyAssets();
  buildHomepage();
  buildEquipmentHub();
  buildAbout();
  buildContact();
  buildPrivacyPolicy();
  buildCityPages();
  buildCityServicePages();
  buildEventsPage();
  buildCorporatePage();
  buildOffersPage();
  buildSitemap();
  buildRobots();
  console.log('\n✅ Build complete.\n');
})();

/* export helpers for use in later phases */
export { headHTML, closingHTML, navbarHTML, footerHTML, equipCardHTML, writePage, cities, services, equipment, capitalize, renderStars };

