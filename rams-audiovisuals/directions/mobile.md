# 📱 Mobile Optimization Plan — Rams AudioVisuals

> **Strategy**: 95% of users are on mobile. We treat every page as a mobile-first experience.
> All changes go into `public/css/main.css` (and corresponding `src/css/main.css`).
> HTML changes go into the actual public HTML files + the `build.js` source templates.
> We do NOT break laptop layout — we add mobile styles only inside media queries.

---

## 🗂️ Page Inventory & Classification

### Phase 1 — Primary Pages (Highest Traffic)
| Page | File | Why |
|------|------|-----|
| Homepage | `public/index.html` | Entry point for most visitors |
| City Landing Pages | `public/{city}/index.html` × 5 | SEO traffic landing pages |
| Equipment Catalogue | `public/equipment.html` | Product browsing, conversion-critical |

### Phase 2 — Secondary Pages (Moderate Traffic)
| Page | File | Why |
|------|------|-----|
| City Sub-category pages | `public/{city}/{service}-for-rent.html` × 35 | Equipment detail pages |
| Offers Page | `public/offers.html` | Deals and packages |
| Events Page | `public/events-we-serve.html` | Event type browsing |
| Corporate Page | `public/corporate.html` | B2B audience |
| Contact Page | `public/contact.html` | Conversion endpoint |

### Phase 3 — Least Important Pages
| Page | File | Why |
|------|------|-----|
| About | `public/about.html` | Low traffic, informational |
| Privacy Policy | `public/privacy-policy.html` | Legal only |
| 404 | `public/404.html` | Error page |

---

## 🔍 Current Mobile Problems (Observed from CSS audit)

1. **Hero Card** — background image with text on side works on desktop, but on mobile `background-position: 62% center` causes the person/product to cover the text awkwardly
2. **Cities Section** — `grid--5` (5 columns) on mobile becomes 1-column via `grid--2,.grid--3 { grid-template-columns: 1fr }` — but grid--5 is NOT in those media queries, so it wraps badly
3. **Services/Category Grid** — `services-grid` uses `flex-wrap` — okay-ish but 7 items wrap messily on small screens
4. **Stats Row** — `grid--4` on mobile becomes `grid--2` at 1024px, then `1fr` at 480px — but the 2-col at 768px is missing
5. **Equipment Cards** — `grid--3` becomes `1fr` at 768px — shows only 1 card per row but no horizontal scroll pattern
6. **Gallery Mosaic** — at 480px collapses to 1 col (correct) but feature tile loses its special layout advantage
7. **How It Works** — `grid--3` → `1fr`, 3 steps stacked — workable but could use horizontal scroll
8. **Review Carousel** — already auto-scrolls; review card width `280px` on mobile is fine
9. **Category subcategory grids** (city service pages) — `grid--4` becomes `grid--2` at 1024px → single col at 768px
10. **Footer** — collapses to 1 col at 768px — looks decent but cramped
11. **Navbar** — hamburger appears at 992px — good, but mobile menu items could use larger tap targets
12. **Filter Tabs** (equipment page) — `flex-wrap` causes wrapping, tabs are small, hard to tap
13. **CTA Banner** — okay but padding too large on mobile
14. **Hero Header** (city pages) — `grid-template-columns: 1fr auto` with WhatsApp button — button wraps awkwardly on small screens
15. **Info Panels** (city pages) — `grid--2` → `1fr` at 768px — okay but icon+text layout needs tightening
16. **Contact Form** — already goes 1-col at 768px — generally good
17. **Landing Hero** — complex 2-col layout → 1-col at 1024px — generally good already

---

## 📐 Mobile Patterns We'll Implement

### A. Horizontal Scroll Strip
- Used for: city chips, equipment categories, "How It Works" steps
- Implementation: `overflow-x: auto; display: flex; flex-wrap: nowrap; scroll-snap-type: x mandatory; -webkit-overflow-scrolling: touch;`
- Each item: `scroll-snap-align: start; flex-shrink: 0;`
- Hide scrollbar but keep functionality

### B. Subcategory Grid = 3 Items + "View All →" Button
- Used for: equipment categories on home, city service cards
- On mobile: `grid-template-columns: repeat(2, 1fr)` showing 3 real items + 1 "View All" card
- The "View All →" card is a new CSS-styled element: `.view-all-card`
- Implementation: via CSS `.mobile-show-viewall` display class toggled at ≤768px

### C. Peek Pattern
- Used for: equipment card grids, gallery tiles
- Shows 2.2 cards wide so user can see there's more to scroll
- Horizontal scroll container with `padding-right: 20px` on last item

### D. Sticky WhatsApp CTA Button
- Fixed bottom bar on mobile only: a persistent "WhatsApp to Book" button
- Always visible, no interference with desktop
- `position: fixed; bottom: 0; left: 0; right: 0;` at `≤768px`
- Adds `padding-bottom: 80px` to `<body>` on mobile so content isn't hidden behind it

### E. Compact Hero on Mobile
- Hero card: stack content vertically, reduce image prominence
- City hero header: WhatsApp button becomes full-width below the title
- Large h1 trimmed for mobile (`clamp` already handles this)

### F. Filter Tab Scroll
- Equipment page filter tabs: horizontal scroll strip on mobile
- No wrapping — single row, scroll horizontally

---

## 🛠️ Implementation Strategy

### File Changes
- **`public/css/main.css`** — Add new mobile styles at the bottom (after line 1849)
- **`src/css/main.css`** — Mirror same changes (this is the source file)
- **`public/index.html`** — Add sticky WA button HTML + mobile view-all card
- **`public/{city}/index.html`** × 5 — Update hero layout + add sticky WA button
- **`public/equipment.html`** — Fix filter tabs, add horizontal scroll for cards on mobile
- **`build.js`** — Update templates for city sub-pages (service pages)

---

## ✅ PHASE 1 EXECUTION LOG

### Step 1.1 — Global Mobile CSS Foundation
**Target file**: `public/css/main.css` + `src/css/main.css`
**What to add:**
- Sticky WhatsApp bottom bar (`.mobile-wa-bar`)
- Horizontal scroll container (`.h-scroll-row`)
- Mobile grid peek pattern (`.mobile-peek-grid`)
- View All card (`.view-all-card`)
- Touch-friendly tap sizes
- Better spacing for mobile sections

**Status**: [ ] Not started

---

### Step 1.2 — Homepage (`index.html`)
**Sections to optimize:**

**A. Hero Section**
- Currently: background image with text overlay, `min-height: 470px`
- Mobile: stack to full-width hero, reduce height to 340px, overlay gradient for text readability, buttons full-width
- Add a visible "Book Now" WhatsApp CTA prominently above the fold

**B. Cities Section**
- Currently: `grid--5` (5 columns) — NOT responsive properly
- Mobile: horizontal scroll strip with city cards (`h-scroll-row`)
- Each city card ~140px wide, scrollable

**C. Browse by Category Section**
- Currently: `services-grid` flex-wrap with 7 items
- Mobile: Show only 3 items in `2+1` grid layout, 4th slot = "View All →" card linking to `/equipment.html`
- The remaining 3 items hidden on mobile

**D. Stats Section**
- Currently: `grid--4` → goes to `grid--2` at 1024px, but stays `grid--2` at 768px when it should be 2x2
- Fix: ensure `grid--4` becomes `grid--2` cleanly at 768px (currently done via 480px rule)
- Mobile: 2×2 grid, more compact padding

**E. How It Works Section**
- Currently: `grid--3` → stacks to 1-col
- Mobile: horizontal scroll strip, 3 steps side by side, peek at 3rd step

**F. Gallery Section**
- Currently: 4-col mosaic → 2-col at 992px → 1-col at 480px
- Mobile: horizontal scroll of gallery tiles
- Feature tile stays first, full width within its card

**G. Popular Equipment Section**
- Currently: `grid--3` → 1-col at 768px
- Mobile: horizontal peek-scroll (2.2 items visible), so users can see there's more

**H. Reviews Carousel**
- Already auto-scrolling — good. Minor: ensure review cards are 260px on smallest screens

**I. FAQ Section**
- Already good accordion. Minor: ensure tap area is 52px+ height

**J. CTA Banner**
- Already goes full-width. Fix button to be full-width on mobile

**K. Footer**
- Currently 1-col on mobile but 4 sections are cramped
- Fix: 2-col grid for footer links sections, brand full-width

**L. Sticky WhatsApp Bar**
- Add fixed bottom bar with green WhatsApp button
- Shows only on `≤768px`

**Status**: [ ] Not started

---

### Step 1.3 — City Landing Pages (`/hyderabad/`, `/bangalore/`, etc.)
**Structure**: Same across all 5 cities — update once, apply to all

**A. Hero / Page Header**
- Currently: `grid-template-columns: 1fr auto` (title + WA button side by side)
- Mobile: Stack — title full width, then WhatsApp button full width below
- Phone number inline, prominent

**B. Equipment Categories Grid**
- Currently: `grid--4` (service-card--detailed with 7 items)
- Mobile: Show 3 cards + "View All" 4th card → `grid--2` 2-col layout
- Cards: 3 visible items (best sellers) + 1 view-all in a 2×2 grid

**C. Popular Equipment Grid**
- Currently: `grid--4` with 4 equipment cards
- Mobile: Horizontal peek scroll (2.3 cards wide)

**D. Gallery Section**
- Currently: `grid--3 gallery-grid` with wide tiles
- Mobile: Stacked single-column, each tile ~260px height, full width

**E. Info Panels (Services section)**
- Currently: `grid--2` with 4 info panels
- Mobile: stacks to 1-col — already okay, but tighten padding and icon size

**F. Why Choose Us (compact panels)**
- Currently: `grid--4` → `grid--2` at 1024px
- Mobile: `grid--2` at 768px (2 compact panels), keep them small

**G. FAQ Section**
- Fine as-is, just verify 52px tap height

**Status**: [ ] Not started

---

### Step 1.4 — Equipment Catalogue (`equipment.html`)
**A. Filter Tabs**
- Currently: `flex-wrap` which wraps onto 2 rows
- Mobile: Single horizontal scroll row, `overflow-x: auto`, no wrapping
- Tabs stay tall enough (44px) for easy tapping

**B. Equipment Grid**
- Currently: `grid--3` → 1-col at 768px
- Mobile: 2-col grid (2 cards side by side), smaller cards
- OR horizontal peek scroll — decision: use **2-col grid** (easier to browse for ecommerce)

**C. City Links Panel**
- Currently: flex-wrap pill links
- Fine on mobile, just reduce padding slightly

**D. CTA Banner at bottom**
- Full-width button — already handled by existing CSS mostly

**Status**: [ ] Not started

---

## ✅ PHASE 2 EXECUTION LOG

### Step 2.1 — City Sub-category Pages (35 pages via `build.js`)
**Pages**: `/{city}/{service}-for-rent.html` — projector, sound, mic, speaker, LED, TV, combo

**Structure of each page**: 
- Page header with breadcrumb, h1, description, phone
- Equipment grid (6-8 items)
- Info panels
- FAQ
- CTA banner

**A. Page Header**
- Mobile: Compact, stacked. Phone number as tappable link
- WhatsApp button full-width below description

**B. Equipment Grid**
- Currently varies: uses `page-with-sidebar` layout (1fr + 300px sidebar)
- Mobile: Sidebar goes below content (already handled by `position: static` at 1024px)
- Equipment cards: 2-col grid on mobile for product browsing

**C. Sidebar (Category Links)**
- Already goes static at 1024px
- Mobile: Convert to horizontal scroll pill links instead of vertical list

**Status**: [ ] Not started

### Step 2.2 — Offers Page (`offers.html`)
**Status**: [ ] Not started

### Step 2.3 — Events Page (`events-we-serve.html`)
**Status**: [ ] Not started

### Step 2.4 — Corporate Page (`corporate.html`)
**Status**: [ ] Not started

### Step 2.5 — Contact Page (`contact.html`)
**Status**: [ ] Not started

---

## ✅ PHASE 3 EXECUTION LOG

### Step 3.1 — About Page (`about.html`)
**Status**: [ ] Not started

### Step 3.2 — Privacy Policy (`privacy-policy.html`)
**Status**: [ ] Not started

### Step 3.3 — 404 Page (`404.html`)
**Status**: [ ] Not started

---

## 📏 Breakpoints Used

| Breakpoint | Target |
|------------|--------|
| `≤992px` | Hamburger menu appears |
| `≤768px` | Full mobile layout kicks in (primary breakpoint) |
| `≤480px` | Small phones (iPhone SE, older Androids) |

---

## 🔧 CSS Architecture Notes

- All new mobile CSS appended to `main.css` under a `/* ===== PHASE 1 MOBILE ===== */` comment block
- No existing rules modified (to avoid breaking desktop)
- New utility classes added: `.h-scroll-row`, `.h-scroll-row__item`, `.mobile-wa-bar`, `.view-all-card`, `.mobile-peek-grid`
- Both `public/css/main.css` AND `src/css/main.css` kept in sync (they appear to be the same file/copy)

---

## 🔄 Progress Tracker

- [x] Codebase audit complete
- [x] mobile.md plan written
- [x] Phase 1 CSS foundation added
- [x] Phase 1.2 — Homepage complete
- [x] Phase 1.3 — City pages complete
- [x] Phase 1.4 — Equipment page complete
- [x] Phase 2.1 — Sub-category pages complete (build.js update)
- [x] Phase 2.2-2.5 — Secondary pages complete
- [x] Phase 3 — Tertiary pages complete
