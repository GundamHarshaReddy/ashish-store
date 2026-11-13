# ASHISH – Contemporary Luxury Streetwear

A high-fidelity frontend recreation of the contemporary luxury streetwear brand [BLUORNG](https://bluorng.com/), built with React 19, Vite, and Tailwind CSS v4.

## Features
- **Transparent Fixed Header with Floating Logo**: Header sits directly on top of the hero campaign banner and dynamically transitions to a solid background with dark typography when scrolled.
- **Full-Bleed Hero Section**: 100svh cinematic editorial streetwear campaign with minimal centered CTA.
- **Original AI-Generated Imagery**: Custom high-fashion photography, studio product flat lays, and brutalist retail store visuals.
- **Instagram-Style Story Highlights & Fullscreen Viewer**: Segmented timer progress bars, auto-play, pause, and direct shop links.
- **Latest Drop Collection**: 4-column responsive grid with dual-image hover flips and quick-add modal.
- **Luxury Leather Goods (Bags)**: Pebble-grain leather duffles, carryalls, and card cases with horizontal scroll.
- **Editorial Collection Cards**: 3:4 aspect ratio editorial showcases for Caps, Racing Club, Polo Club, and Outerwear.
- **Stores Across India**: Interactive city selector for physical flagship boutiques (Delhi, Gurugram, Mumbai, Hyderabad, Ahmedabad, Noida).
- **Interactive Drawers & Modals**:
  - Slide-out Explore navigation drawer with category taxonomy and color swatches.
  - Slide-over Cart drawer with real-time free-shipping calculation and item controls.
  - Predictive search modal with instant live filtering.
  - Product quick-view modal with size selection and add-to-bag feedback.
- **Mobile Floating Navigation**: Fixed curved bottom navigation bar for mobile devices.

## Tech Stack
- **Framework:** React 19 + Vite 6
- **Styling:** Tailwind CSS v4
- **Icons:** Lucide React
- **Fonts:** Anton & Inter / Neue Haas Grotesk

## Local Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Production Build

```bash
# Build for production
npm run build

# Preview production build
npm run preview
```

## Deployment on Vercel

This project is configured out-of-the-box for Vercel:
- **Framework Preset:** Vite
- **Build Command:** `npm run build`
- **Output Directory:** `dist`
- **Install Command:** `npm install`
