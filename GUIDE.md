# Rams AudioVisuals — Build Guide

## How many phases and what each does

**Phase 0 — Foundation** (do first, everything depends on it)
Sets up the folder structure, data files (`cities.js`, `equipData.js`), the shared CSS design system, shared JS, and the Node.js `build.js` script. Nothing visible yet — this is the engine that generates all 45 pages.

**Phase 1 — Homepage & Equipment Hub**
Builds `index.html` and `equipment.html`. These are your two highest-traffic pages. Equipment hub has live filter tabs (Projectors / Sound / Mics etc.) that filter the grid without reloading.

**Phase 2 — Utility Pages & City Landing Pages**
Builds About, Contact, Privacy Policy, and all 5 city landing pages (`/hyderabad/`, `/bangalore/` etc.). Each city page is unique — different phone number, delivery areas, testimonials, and FAQ questions.

**Phase 3 — City + Service Pages** (most important for SEO)
Generates all 35 city+service pages (`/bangalore/projector-for-rent.html` etc.). These are the pages Google ranks when someone searches "projector for rent in Bangalore". Each page has unique FAQs, correct city phone number, sidebar with other services, and internal links to same service in other cities.

**Phase 4 — Deployment**
Uploads `public/` folder to Hostinger, adds `.htaccess` for HTTPS, caching, and clean URLs, submits sitemap to Google Search Console.

---

## How desktop and mobile optimisation works

**Single CSS file with breakpoints — no separate mobile files.**

The CSS in `main.css` uses three breakpoints:
- Desktop (above 1024px): full multi-column grids, sticky sidebar, horizontal navbar
- Tablet (≤1024px): 2-column grids, sidebar stacks below content
- Mobile (≤768px): 1-column layout, hamburger menu, full-width buttons, no sidebar (stacks below)
- Small mobile (≤480px): tighter font sizes, single-column everything

Mobile-first rules applied:
- `clamp()` on all headings so font size scales smoothly with screen width
- Minimum touch target size 44px on all buttons and links
- `viewport` meta tag with `width=device-width`
- Images use `loading="lazy"` and explicit width/height to prevent layout shift
- No hover-only interactions — everything works on touch

---

## How the build script works

Run `node build.js` once. It reads `data/cities.js` and `data/equipData.js`, processes both template functions for each city and service combination, and writes completed HTML files into `public/`. You never edit files in `public/` manually — always edit the templates or data files and rebuild.

---

## How to add a new city

1. Add one entry to `data/cities.js` (copy the format of an existing city)
2. Run `node build.js`
3. Upload new files to Hostinger

That's all. The build script automatically generates 8 new pages (1 city landing + 7 service pages) and updates the homepage city cards, footer, sitemap, and robots.txt.

---

## How to update equipment

Edit `data/equipData.js` — change prices, add items, correct names. Then run `node build.js` and re-upload. The equipment cards across all pages update automatically.

---

## Why images are not included yet

All equipment images currently use external URLs (from existing sources). Once the website is live and confirmed working, replace each `image:` URL in `equipData.js` with your own hosted images. Best practice: upload images to `public/images/equipment/` on Hostinger, then update the URLs in `equipData.js` and rebuild.

For image file names, use the format: `projector-epson-powerlite-107.jpg` — lowercase, hyphens, descriptive. This helps image SEO.

---

## What makes this SEO-ready

- Every page has a unique `<title>`, `<meta description>`, and `<link rel="canonical">`
- H1 on every page contains the primary keyword (city + service)
- 5 FAQ questions per city+service page with FAQPage JSON-LD schema (Google can show these as rich results)
- Breadcrumb with BreadcrumbList schema on every page
- LocalBusiness schema on homepage and city pages with correct phone numbers
- Internal linking: every service page links to the same service in 4 other cities + 3 other services in the same city
- Sitemap lists all 45 URLs with priority weights
- robots.txt allows all crawlers and points to sitemap
- Images have descriptive alt text with city and product name
- No JavaScript required to see page content — Google crawls the full HTML

---

## Files the AI builder gets per phase

| File | What to do |
|------|-----------|
| `phase-0-foundation.md` | Create folders, paste all code blocks, run `node build.js` |
| `phase-1-homepage-equipment.md` | Replace 2 stub functions in `build.js`, run build, verify |
| `phase-2-utility-city-pages.md` | Replace 4 stub functions in `build.js`, run build, verify |
| `phase-3-city-service-pages.md` | Replace 1 stub function in `build.js`, run build, verify |
| `phase-4-deployment.md` | Create `.htaccess`, upload to Hostinger, submit sitemap |

Each phase is independent — complete and verify before moving to the next.
