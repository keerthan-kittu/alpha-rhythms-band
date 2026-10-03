# ALPHA RHYTHMS — Official Band Website Experience

A high-performance, dynamic web experience for the band **ALPHA RHYTHMS**, inspired by festival-grade interactive portals.

---

## 📁 Project Location
Your project files are located on your Desktop:
```
/Users/mac/Desktop/alpha-rhythms-band/
```

### Directory Structure
```
alpha-rhythms-band/
├── index.html          # Semantic HTML5 master document & all section structures
├── styles.css          # Vanilla CSS design system, typography, animations, dark mode
├── app.js              # Complete JavaScript application logic, audio synth, and interactions
├── README.md           # Project documentation and guide
└── assets/             # Brand logos, concert photography, band members, and masks
    ├── logo_outline_yellow.png  # Official yellow/gold outer contour
    ├── logo_inner_white.png     # Official white inner artwork & lettering
    ├── logo_transparent.png     # Official full Alpha Rhythms emblem
    ├── logo_white.png           # Pure white base emblem
    ├── hero_concert.jpg         # Stage concert imagery
    ├── album_cover.jpg          # Album artwork
    ├── guitarist.jpg            # Lead guitarist profile
    ├── drummer.jpg              # Percussionist profile
    └── ...
```

---

## ⚡ How to Run Locally
The project is currently running live on port `3000`:
- **Live Local URL**: http://localhost:3000

If you ever need to restart the server manually:
```bash
cd /Users/mac/Desktop/alpha-rhythms-band
python3 -m http.server 3000
```
Then open `http://localhost:3000` in any web browser.

---

## 🌟 What Has Been Built (Full Project Overview)

### 1. 🔒 Locked Intro Loader (`#tiara-loader`)
- **Cosmic Starfield**: Twinkling multi-colored cosmic stars and shooting star trails.
- **Natural Opposing Dual-Direction Reveal**:
  - **Yellow Outer Contour**: Uncovers cleanly from top to bottom (descending from above).
  - **White Inner Artwork**: Uncovers cleanly from bottom to top (ascending from below) concurrently.
  - Zero horizontal bars or lines covering the artwork.
  - Zero dark murky drop-shadows; ultra-light, crisp presentation.
- **Aperture Zoom Portal**: Seamless transition into the main website upon 100% completion.

### 2. 🎸 Hero Section (`#hero`)
- Stadium concert backdrop with ambient lighting effects.
- Dynamic animated typography with sound wave indicators.
- **Interactive Riff Button**: Real-time synthesized rock audio riff using Web Audio API.
- Direct quick links to music and upcoming live shows.

### 3. 🎵 Music & Interactive Audio Player (`#music`)
- Spinning vinyl disc with groove reflections and turntable tonearm animation.
- Web Audio API synthesizer engine playing interactive ambient and rhythm tracks.
- Real-time animated canvas waveform frequency visualizer.
- Interactive tracklist with play/pause, seek bar, time counters, and volume slider.

### 4. 🎟️ Tour Schedule & VIP E-Pass Generator (`#tour`)
- Upcoming global tour dates with city, venue, and status badges.
- **Live Interactive VIP Pass**: Enter your name to generate a personalized backstage laminate card in real-time.
- Interactive ticket booking checkout modal.

### 5. 👥 Band Members Section (`#band`)
- High-definition portrait cards for each band member.
- Instrument spotlights, musician roles, bios, and gear specifications.
- Micro-interactions with tilt and spotlight effects on hover.

### 6. 📸 Media & Photo Gallery (`#gallery`)
- Masonry-style concert photo grid with stage lighting, crowds, and backstage action.
- Fullscreen responsive modal lightbox for viewing photos up close.

### 7. 🛍️ Merchandise Store (`#merch`)
- Interactive merchandise showcase (tour shirts, hoodies, vinyl records, enamel pins).
- Interactive cart drawer with item counter and checkout summary.
- **Dynamic Logo Swapper**: Upload any custom logo to see it previewed across all band merch in real-time!

### 8. 📬 Contact & Booking (`#contact`)
- Booking inquiry form with validation and instant feedback.
- Press kit download links, management contacts, and social media channels.
- Interactive footer with intro replay trigger.
