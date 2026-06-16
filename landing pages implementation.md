# Implementation Plan — Premium LED Screen Landing Page

We will rewrite the LED Screen / Video Wall landing page at [led-screen-video-wall-landing.html](file:///d:/claude%20rams/rams-audiovisuals/directions/led-screen-video-wall-landing.html) to make it highly professional, clean, premium, and fully optimized for mobile devices. We will use Tailwind CSS and Alpine.js, matching the style and functionality of the reference page [fico-landing-page.html](file:///d:/claude%20rams/rams-audiovisuals/directions/fico-landing-page.html).

## User Review Required

> [!IMPORTANT]
> - We are switching to Tailwind CSS and Alpine.js loaded via CDN (just like the reference `fico-landing-page.html` file) to build a premium, clean, responsive UI with smooth transitions and modal integrations.
> - The equipment and package pricing will be sourced from `data/claudeData.js` dynamically where possible, but with hardcoded UI fallbacks to ensure it works instantly and matches the requested visual layouts perfectly.

## Proposed Changes

### Landing Page Customization

#### [MODIFY] [led-screen-video-wall-landing.html](file:///d:/claude%20rams/rams-audiovisuals/directions/led-screen-video-wall-landing.html)
We will completely rewrite this file with the following components and sections:

1. **Header System**:
   - Fixed, glassmorphic top header (`backdrop-blur-md bg-white/80`).
   - Left: Rams AudioVisuals logo.
   - Right: Clickable phone number (`+91 97000 33342`) and a premium pill-shaped "Book Now" button with hover animations.
   - Click handler toggling an Alpine.js modal state (`showModal = true`).

2. **Main Headline**:
   - A bold, elegant banner below the header introducing the services: "Premium LED Screen & Video Wall Rentals in Hyderabad".

3. **Hero Section**:
   - Layout matching the `fico-landing-page.html` configuration:
     - On desktop: Left side (70%) shows a gorgeous, auto-rotating slider of event photos (`RAV-21.webp` through `RAV-25.webp`) with bottom-left overlay buttons for Call and WhatsApp. Right side (30%) displays a clean callback form.
     - On mobile: Stacks so the callback form is at the top (order-1) for high conversion, and the image slider is below it (order-2).
   - Callback form:
     - Prominently states "Get A Call Back in 10 Minutes" or "Book Your Free Quote".
     - Name field (text).
     - Phone / WhatsApp field (numeric input with strict 10-digit validation: `pattern="[0-9]{10}" maxlength="10"` and JavaScript filters).
     - Submit button linking to the Hyderabad WhatsApp API or form processing.

4. **Equipment Cards (Horizontal Scroll)**:
   - Contains 2 cards for ID 2 (Custom Size) and ID 5 (8x12 ft) as specified in data.
   - Visual styling matching the user's second screenshot:
     - White card background, thin outline, soft box-shadow.
     - Star rating text: `★ 4.7 (92 rentals)` or `★ 4.9 (900 rentals)`.
     - Large bold title: `LED Wall (8×12 ft)` / `LED Wall (Custom Size)`.
     - Subtitle: `P3.9 LED wall` / `P2.9 & P3.9 LED panels`.
     - Large price layout: `₹8544/day` / `₹89-119/sq.ft`.
     - Bold green line: `Additional day at ₹7999` / `Additional day at ₹79-99/sq.ft`.
     - Two blue badges at the bottom:
       - `Fast Setup` with a lightning bolt icon.
       - `Support Incl.` with an info circle icon.
     - Primary button: "Quick WhatsApp" linking to the WhatsApp conversation with event details pre-filled.

5. **Packages Section (Horizontal Scroll)**:
   - Uses IDs 21-28 from `claudeData.js`.
   - All 8 package cards will render the image `../public/equipment/combo 3(complete presentation).png`.
   - Cards will replicate the premium card layout of the equipment cards (ratings, pricing, and actions).

6. **Google Reviews Carousel**:
   - Clean, auto-scrolling horizontal review slider with user reviews.

7. **Gallery Grid (2x3 Grid on Mobile)**:
   - Title: "Professionalism Delivered with Perfection".
   - Underneath, a grid of 6 rounded-corner images (`RAV-21.webp` to `RAV-26.webp`) in 2 columns on mobile, matching the screenshot layout.
   - Hover and tap visual feedback.

8. **Footer**:
   - Dark theme footer containing quick links, city numbers, and logo.

9. **Floating Action Buttons**:
   - Bottom-right floating Call (blue receiver circle) and WhatsApp (lime green circle) buttons.

10. **Book Now Modal**:
    - Clean, minimalist popup form.
    - Fields: Name, Phone (strictly validated to 10 digits).
    - Close button (times/cross icon) in the top-right corner.

## Verification Plan

### Manual Verification
- Deploy the landing page locally and test responsiveness on mobile viewport sizes (320px to 480px, tablets, and desktop).
- Verify the form validation works (rejects non-numeric characters and phone numbers that are not exactly 10 digits).
- Check that all CTA buttons link to WhatsApp with the correct pre-filled message.
- Verify the layout stacks the form at the top on mobile.
