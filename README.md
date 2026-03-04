# Task 5 — Responsive Tech Product Landing Page (Light/Dark Toggle) + Three.js Hero Animation

## Introduction
This project is **Task 5** of my **Elevvo Front-End Web Development Tasks** series.  
It’s a modern, responsive landing page for a fictional tech/SaaS product called **NovaFlow**—styled to feel like a real startup website with sections like Features, How it Works, Testimonials, Pricing, FAQ, and CTA.

The page also includes two “bonus-level” enhancements:
1) A **Light/Dark theme toggle** with persistence (saved in `localStorage`)  
2) An animated **Three.js hero background** (particle-wave) that also syncs with the active theme.

## Key Features / Functions
### 1) Fully Responsive Landing Page (Bootstrap + Custom UI)
- Clean marketing layout with:
  - Hero + product messaging
  - Logo strip
  - Feature cards + highlight panel
  - Step-by-step “How it works”
  - Testimonials section
  - Pricing cards (with featured plan emphasis)
  - FAQ accordion
  - CTA signup form
- Uses **Bootstrap 5 grid + utilities** for quick responsiveness, plus custom CSS for a premium look.

### 2) Theme Toggle (Persisted)
- Toggle between **dark** and **light** modes.
- Automatically initializes based on:
  - saved user preference (`localStorage`)
  - or `prefers-color-scheme`
- Updates the toggle icon (sun/moon) dynamically.
- Theme variables are controlled via CSS custom properties and `data-theme` attribute on `<html>`.

### 3) Reveal-on-Scroll Animations
- Uses **IntersectionObserver** to add `.in` class and animate sections into view.
- Keeps motion subtle and readable; reduced-motion friendly.

### 4) Scroll Progress Accent Bar
- A slim gradient progress bar at the top updates as the user scrolls the page.
- Uses document scroll percentage to set width dynamically.

### 5) CTA Interaction (Demo)
- CTA button checks if an email value exists.
- If empty:
  - focuses input
  - adds a temporary invalid style (micro-interaction)
- If valid:
  - shows a demo success alert (front-end only, no backend).

### 6) Demo Workflow Micro-Interaction
- “Run demo workflow” button plays a short step-by-step simulation in a toast/status line:
  - Trigger → AI summarization → ticket creation → completed
- Button disables during the sequence to prevent double-click spam.

### 7) Three.js Hero Background (Particle Wave)
- Renders a grid of points using `THREE.Points` + `BufferGeometry`.
- Animates a wave pattern by updating the Z position per point each frame.
- Respects accessibility:
  - Checks `prefers-reduced-motion` and reduces animation accordingly.
- **Theme-synced rendering:**
  - Uses a `MutationObserver` to react to `data-theme` changes
  - Adjusts particle color/opacity depending on light vs dark theme

## Tech Stack / Tools Used
- **HTML5**
- **CSS3**
  - CSS variables + theme via `data-theme`
  - Custom components + modern glass/blur styling
  - Reduced-motion support
- **JavaScript (Vanilla)**
  - Theme persistence using `localStorage`
  - IntersectionObserver (scroll reveals)
  - Scroll progress calculations
  - Micro-interactions for CTA + demo workflow
  - MutationObserver to sync UI theme with Three.js
- **Bootstrap 5** — responsive grid/components
- **Bootstrap Icons** — icon set
- **Three.js (module via CDN)**
  - WebGL renderer + scene/camera
  - Animated particle-wave effect in hero section

## How to Run Locally
1. Clone/download the repository.
2. Open `index.html` in a modern browser (internet required for CDN dependencies like Bootstrap and Three.js).
3. Try:
   - switching theme
   - scrolling through sections (reveal animations + scroll progress bar)
   - running the demo workflow button
   - interacting with the CTA email field

## Notes
- This is a **front-end-only** landing page demo (no real signup or integrations).
- The hero animation can be tuned by changing grid density and wave parameters in `app.js`.

---
✅ *Completed as part of the Elevvo internship front-end task set.*
