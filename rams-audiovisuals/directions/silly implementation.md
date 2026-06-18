# Implementation Plan - Website Updates

This plan outlines the steps to perform the requested updates to the Rams AudioVisuals website, including updating equipment images and categories, commenting out outdated packages, displaying new equipment packages on the offers and events pages, updating the company email address, and adding social media icons to the footer.

## Proposed Changes

---

### Equipment Data & Build Script

#### [MODIFY] [claudeData.js](file:///d:/claude rams/rams-audiovisuals/data/claudeData.js)
- Comment out equipment items with IDs 18, 19, and 20.
- For items with IDs 21 to 31, update their `category` field from `"package"` to `"combo"`.
- Update the `image` path of items with IDs 21 to 31 to point to their new images in `/equipment/` directory:
  - ID 21: `/equipment/meeting essential.png`
  - ID 22: `/equipment/presentation pro.png`
  - ID 23: `/equipment/pa system package.png`
  - ID 24: `/equipment/conference package.png`
  - ID 25: `/equipment/led display package.png`
  - ID 26: `/equipment/event audio.png`
  - ID 27: `/equipment/premium event av.png`
  - ID 28: `/equipment/custom av.png`
  - ID 29: `/equipment/projector screen combo.png`
  - ID 30: `/equipment/projector sound combo.png`
  - ID 31: `/equipment/complete event combo.png`

#### [MODIFY] [build.js](file:///d:/claude rams/rams-audiovisuals/build.js)
- Update `coreEquipment` filter logic to include the new packages (IDs 21 to 31) so they display under the "Combo Packages" category:
  ```javascript
  const coreEquipment = equipment.filter(item => item.id <= 17 || (item.id >= 21 && item.id <= 31));
  ```
- In `buildEventsPage`, render a new section after the "Event types" section showing the packages (IDs 21 to 31) as visual cards using `equipCardHTML`.
- In `buildOffersPage`, render a new section showing the packages (IDs 21 to 31) as visual cards using `equipCardHTML`.
- Update all occurrences of `support@ramsaudiovisuals.com` to `contact@ramsaudiovisuals.com` (including JSON-LD schema, footer mailto links, contact page links, etc.).
- Update `footerHTML` to include LinkedIn, Instagram, and Facebook social media icons linked to the respective URLs in the `.footer__brand` container.

---

### Styling

#### [MODIFY] [main.css](file:///d:/claude rams/rams-audiovisuals/src/css/main.css)
- Add CSS rules for `.footer__socials`, `.footer__social-link`, and their hover states to style the social media icons dynamically with smooth hover effects.

---

### Regeneration

- Run `node build.js` to regenerate all 35 static HTML pages with the new structure, data, styling, and email.

## Verification Plan

### Manual Verification
- Run the build script using `node build.js` and verify it finishes successfully with `✓` status.
- Inspect the generated files in `public/` (specifically `public/equipment.html`, `public/offers.html`, `public/events-we-serve.html`, `public/contact.html`, and city subpages) to ensure the email addresses and links are updated correctly.
- Verify the layout of the new packages section on both the offers and events pages.
- Verify the footer has the social icons with correct links.
