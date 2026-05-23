# Mobile Optimization — Rams AudioVisuals

95% of users are on mobile. The site looks great on laptop but has serious layout issues on phones. This plan retrofits proper mobile-first UX without touching the laptop layout.

## User Review Required

> [!IMPORTANT]
> **Sticky WhatsApp Bar**: I plan to add a fixed green "WhatsApp to Book" bar at the bottom of every page on mobile (≤768px). This will be the primary conversion CTA. It adds ~80px bottom padding so content isn't obscured. Let me know if you'd prefer it only on specific pages.

> [!IMPORTANT]
> **Equipment Grid on Mobile**: For the main Equipment page, I'll show a **2-column card grid** instead of 1-column (easier to browse like an ecommerce shop). For city pages' "Popular Equipment" section, I'll use a **horizontal peek scroll** (2.3 cards visible). Both approaches are different to suit their context.

> [!NOTE]
> **No desktop changes**: All modifications are inside `@media (max-width: 768px)` and `@media (max-width: 480px)` blocks only. Laptop layout is untouched.

## Open Questions

> [!WARNING]
> **"View All →" card pattern**: For the "Browse by Category" (7 items) and city equipment grid (7 items), on mobile I'll show 3 items in a `2+1` grid, and the 4th slot becomes a "View All →" styled card. The 4 hidden items won't be accessible without tapping View All. Is this acceptable UX, or do you want all 7 always visible (scrollable)?

> [!NOTE]
> **build.js regeneration**: Phase 2 requires changes to `build.js` templates which then requires running `node build.js` to regenerate 35 sub-pages. This is quick but need your confirmation before running.

---

## Proposed Changes

### Phase 1 — Primary Pages (Highest Impact)

---

#### [MODIFY] main.css (public/css/ and src/css/)
Add ~400 lines of mobile CSS at bottom of file under new comment block:
- `.mobile-wa-bar` — sticky fixed WhatsApp CTA at bottom, mobile only
- `.h-scroll-row` / `.h-scroll-row__item` — horizontal scroll containers
- `.mobile-peek-grid` — 2.3-wide card peek scroll
- `.view-all-card` — the 4th "View All →" slot in category grids
- Fix `grid--5` on mobile (currently not in responsive rules → wraps badly)
- Fix city hero header stacking on mobile
- Filter tabs as horizontal scroll strip (no wrapping)
- Equipment cards: 2-col on mobile
- How-it-works: horizontal scroll on mobile
- Gallery: single column with good heights on mobile
- Section padding tightened on mobile

---

#### [MODIFY] [index.html](file:///d:/claude%20rams/rams-audiovisuals/public/index.html)
- **Hero**: Overlay gradient for text readability, content centered, both buttons full-width stacked
- **Cities**: `grid--5` → horizontal scroll strip with city cards (140px each)
- **Browse by Category**: 3 items + "View All →" card in 2×2 grid
- **Stats**: Clean 2×2 grid on mobile
- **How It Works**: Horizontal scroll strip (3 steps, peek at 3rd)
- **Gallery**: Horizontal scroll with 280px-wide tiles
- **Popular Equipment**: Horizontal peek scroll (2.3 cards)
- **Reviews**: Already auto-scrolling, minor width fix
- **CTA Banner**: Full-width button
- **Add**: Sticky WhatsApp bottom bar HTML element

---

#### [MODIFY] City Landing Pages (hyderabad, bangalore, mumbai, chennai, pune `/index.html`)
5 files, all same structure — each modified individually:
- **Hero header**: Stack title + WhatsApp button vertically, button full-width
- **Equipment categories grid**: 2×2 showing 3 cards + "View All →"
- **Popular Equipment**: Horizontal peek scroll
- **Gallery**: Single-column, full-width tiles
- **Info Panels**: Single-column, compact
- **Why Choose Us**: 2×2 compact panels
- **Add**: Sticky WhatsApp bottom bar

---

#### [MODIFY] [equipment.html](file:///d:/claude%20rams/rams-audiovisuals/public/equipment.html)
- **Filter tabs**: Horizontal scroll strip, single row, no wrapping
- **Equipment grid**: 2-column card grid on mobile (better for browsing)
- **Cards**: Slightly more compact on mobile (image smaller, text tighter)
- **CTA Banner**: Full-width button
- **Add**: Sticky WhatsApp bottom bar

---

### Phase 2 — Secondary Pages

---

#### [MODIFY] build.js + 35 sub-category pages
Each city has 7 sub-pages (projector, sound, mic, speaker, LED, TV, combo).
Changes via `build.js` template update, then `node build.js` to regenerate:
- **Page header**: Stacked on mobile, phone number as big tappable link
- **Equipment grid**: 2-col on mobile (`page-with-sidebar` already drops sidebar at 1024px)
- **Sidebar links**: Convert to horizontal pill-scroll on mobile
- **CTA sections**: Full-width buttons

---

#### [MODIFY] [offers.html](file:///d:/claude%20rams/rams-audiovisuals/public/offers.html)
- Offer cards: single column, padding tightened
- CTA buttons full-width

#### [MODIFY] [events-we-serve.html](file:///d:/claude%20rams/rams-audiovisuals/public/events-we-serve.html)
- Event type grid: 2-col on mobile
- Page hero: compact, stacked

#### [MODIFY] [corporate.html](file:///d:/claude%20rams/rams-audiovisuals/public/corporate.html)
- Landing hero: already goes 1-col at 1024px, fix padding
- Info panels: single col

#### [MODIFY] [contact.html](file:///d:/claude%20rams/rams-audiovisuals/public/contact.html)
- Already largely optimized; fix city cards grid, tighten form spacing

---

### Phase 3 — Tertiary Pages

---

#### [MODIFY] [about.html](file:///d:/claude%20rams/rams-audiovisuals/public/about.html)
- Founder card: single col, photo above content
- Minor padding fixes

#### [MODIFY] [privacy-policy.html](file:///d:/claude%20rams/rams-audiovisuals/public/privacy-policy.html)
- Font size comfortable, padding fixed

#### [MODIFY] [404.html](file:///d:/claude%20rams/rams-audiovisuals/public/404.html)
- Button full-width, centered layout

---

## Verification Plan

### After Phase 1 CSS:
- Open `index.html` in browser DevTools → toggle mobile view (375px, 390px, 414px)
- Check each section visually

### After Each Page:
- Test on 375px (iPhone SE) and 390px (iPhone 14) viewport widths
- Verify: no horizontal overflow, all CTAs tappable (≥44px), text readable (≥14px body)
- Check that sticky WA bar doesn't obscure bottom content

### After build.js:
- Open one sub-page in DevTools and verify mobile layout
- Confirm all 5 cities × 7 pages regenerated correctly
