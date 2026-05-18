# Phase 4 — Hostinger Deployment & Final SEO

## What this phase does
Deploys the built site to Hostinger, configures URL redirects, adds the `.htaccess` file needed for clean URLs, and runs a final SEO verification checklist.

---

## Step 1 — Final build before deploy

```bash
node build.js
```

Confirm the `public/` folder structure is complete:
```
public/
├── index.html
├── equipment.html
├── about.html
├── contact.html
├── privacy-policy.html
├── sitemap.xml
├── robots.txt
├── css/
│   └── main.css
├── js/
│   └── main.js
├── hyderabad/
│   ├── index.html
│   ├── projector-for-rent.html
│   ├── sound-system-for-rent.html
│   ├── mic-for-rent.html
│   ├── tv-for-rent.html
│   ├── speaker-for-rent.html
│   ├── led-screen-for-rent.html
│   └── combo-packages.html
├── bangalore/   (same 8 files)
├── mumbai/      (same 8 files)
├── chennai/     (same 8 files)
└── pune/        (same 8 files)
```

Total count: 5 static pages + 5 city folders × 8 files = **45 HTML files** + CSS, JS, sitemap, robots.

---

## Step 2 — Create `.htaccess` in `public/`

Create the file `public/.htaccess` with this content:

```apache
Options -Indexes

# Force HTTPS
RewriteEngine On
RewriteCond %{HTTPS} off
RewriteRule ^(.*)$ https://%{HTTP_HOST}%{REQUEST_URI} [L,R=301]

# Force www (remove if you don't want www)
RewriteCond %{HTTP_HOST} !^www\. [NC]
RewriteRule ^(.*)$ https://www.%{HTTP_HOST}%{REQUEST_URI} [L,R=301]

# Clean trailing slashes for city folders — redirect /bangalore to /bangalore/
RewriteCond %{REQUEST_FILENAME} !-f
RewriteCond %{REQUEST_URI} !/$
RewriteCond %{REQUEST_FILENAME} -d
RewriteRule ^(.+)$ /$1/ [R=301,L]

# Custom 404 page
ErrorDocument 404 /404.html

# Cache static assets
<IfModule mod_expires.c>
  ExpiresActive On
  ExpiresByType text/css "access plus 1 month"
  ExpiresByType application/javascript "access plus 1 month"
  ExpiresByType image/jpeg "access plus 6 months"
  ExpiresByType image/png "access plus 6 months"
  ExpiresByType image/webp "access plus 6 months"
  ExpiresByType text/html "access plus 1 week"
</IfModule>

# Gzip compression
<IfModule mod_deflate.c>
  AddOutputFilterByType DEFLATE text/html text/css application/javascript text/plain
</IfModule>
```

---

## Step 3 — Create a simple `public/404.html`

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8"/>
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>Page not found — Rams AudioVisuals</title>
  <link rel="stylesheet" href="/css/main.css"/>
</head>
<body>
  <nav class="navbar">
    <div class="container">
      <div class="navbar__inner">
        <a href="/index.html" class="navbar__logo">Rams <span>Audio</span>Visuals</a>
      </div>
    </div>
  </nav>
  <main>
    <section class="section" style="text-align:center; min-height:60vh; display:flex; align-items:center;">
      <div class="container">
        <div style="font-size:5rem; font-weight:700; color:var(--blue); margin-bottom:16px">404</div>
        <h1 style="margin-bottom:12px">Page not found</h1>
        <p style="margin-bottom:28px">The page you're looking for doesn't exist or has been moved.</p>
        <div style="display:flex; gap:12px; justify-content:center; flex-wrap:wrap">
          <a href="/index.html" class="btn btn--primary">Go to homepage</a>
          <a href="/equipment.html" class="btn btn--secondary">Browse equipment</a>
        </div>
      </div>
    </section>
  </main>
</body>
</html>
```

---

## Step 4 — Upload to Hostinger

**Method A: File Manager (simpler)**
1. Log in to Hostinger hPanel
2. Go to **Files → File Manager**
3. Navigate to `public_html/`
4. Delete any existing default files (`index.html` placeholder etc.)
5. Upload all contents of your `public/` folder into `public_html/` — not the folder itself, the contents inside it
6. Make sure `.htaccess` is uploaded (it's a hidden file — enable "Show hidden files" in File Manager)

**Method B: FTP (faster for large uploads)**
1. In Hostinger hPanel → **Files → FTP Accounts**
2. Get your FTP credentials
3. Use FileZilla or any FTP client
4. Connect and upload everything from your local `public/` folder to the server's `public_html/` directory

---

## Step 5 — Submit to Google Search Console

1. Go to [search.google.com/search-console](https://search.google.com/search-console)
2. Add property: `https://www.ramsaudiovisuals.com`
3. Verify ownership (Hostinger supports HTML file upload method — use that)
4. After verification, go to **Sitemaps** in the left menu
5. Submit: `https://www.ramsaudiovisuals.com/sitemap.xml`
6. Google will begin crawling within 1–7 days

---

## Step 6 — Final SEO checklist (verify all before submitting sitemap)

Run these checks manually in a browser on the live site:

**Technical**
- [ ] `https://www.ramsaudiovisuals.com` loads (not HTTP, not without www)
- [ ] `https://www.ramsaudiovisuals.com/sitemap.xml` opens and lists all URLs
- [ ] `https://www.ramsaudiovisuals.com/robots.txt` is accessible
- [ ] All city folder URLs load: e.g. `ramsaudiovisuals.com/hyderabad/`
- [ ] No mixed content warnings in browser console

**Per-page SEO (spot-check 3–4 pages)**
- [ ] `<title>` tag is unique and contains the city + service keyword
- [ ] `<meta name="description">` exists and is under 160 characters
- [ ] `<link rel="canonical">` points to the correct URL
- [ ] One `<h1>` per page, no more
- [ ] Images have `alt` text
- [ ] Breadcrumb is visible and links work

**Performance (use browser DevTools → Lighthouse)**
- [ ] Performance score above 80 on mobile
- [ ] No render-blocking resources
- [ ] Images load lazily (check Network tab, scroll down to verify)

**Mobile (resize browser to 375px or use DevTools device emulation)**
- [ ] Navbar hamburger works, menu opens and closes
- [ ] Equipment cards stack to 1 column
- [ ] WhatsApp and call buttons are easily tappable (minimum 44px height)
- [ ] Text is readable (minimum 14px)
- [ ] No horizontal scrolling

---

## Step 7 — When you add a new city later (e.g. Delhi)

1. Open `data/cities.js`
2. Add a new object to the `cities` array following the exact same format as the 5 existing cities
3. Run `node build.js`
4. Upload only the new files to Hostinger — the `public/delhi/` folder + updated `sitemap.xml`, `robots.txt`, and `public/index.html` (homepage city cards)
5. Submit the updated sitemap in Google Search Console

That's it — 8 new pages generated automatically.
