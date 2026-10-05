/**
 * ALPHA RHYTHMS — OFFICIAL BAND WEBSITE
 * Complete Interactive Logic & Tiara-Style Intro Loader
 * Est. 2021
 */

// Guarantee starting at the hero section on every load & reload
if ('scrollRestoration' in history) {
  history.scrollRestoration = 'manual';
}
window.scrollTo(0, 0);
document.documentElement.scrollTop = 0;
document.body.scrollTop = 0;

if (window.location.hash) {
  history.replaceState(null, null, window.location.pathname + window.location.search);
}

window.addEventListener('beforeunload', () => {
  window.scrollTo(0, 0);
});

window.addEventListener('pageshow', () => {
  window.scrollTo(0, 0);
  document.documentElement.scrollTop = 0;
  document.body.scrollTop = 0;
});

function initAlphaBandApp() {

  // ==========================================================
  // STATE MANAGEMENT
  // ==========================================================
  const state = {
    isLoading: true,
    loadProgress: 0,
    activeLogoSrc: 'assets/logo_shield_black_transparent.png',
    liquidColor: '#f59e0b',
    isPlayingAudio: false,
    audioInitialized: false,
    currentTrackIndex: 0,
    cart: [],
    selectedTourIndex: 0,
    ticketTierPrice: 25,
    ticketQty: 1,
    currentGalleryIndex: 0
  };

  // Pin scroll position strictly to top while loading is active
  function lockScrollWhileLoading() {
    if (state.isLoading) {
      window.scrollTo(0, 0);
    }
  }
  window.addEventListener('scroll', lockScrollWhileLoading, { passive: true });

  // Music Tracks Data
  const tracks = [
    {
      title: "Rhythm of Fire",
      album: "Rhythm of Fire LP (2024)",
      duration: "3:42",
      durationSec: 222,
      art: "assets/album_cover.jpg",
      lyrics: `[Verse 1]
Walking through the static haze
Midnight city catches ablaze
Six strings screaming in the dark
Every heartbeat strikes a spark

[Chorus]
Feel the rhythm of the fire!
Higher, higher, burning higher!
We are the pulse that shakes the ground
Alpha Rhythms, hear the sound!

[Verse 2]
Thunder rolling down our veins
Broken locks and shattered chains
Amplifiers push the red
Bring the restless from the dead

[Guitar Solo - Liam Cruz]

[Chorus]
Feel the rhythm of the fire!
Higher, higher, burning higher!
We are the pulse that shakes the ground
Alpha Rhythms, hear the sound!`
    },
    {
      title: "Neon Shadows",
      album: "Rhythm of Fire LP (2024)",
      duration: "4:15",
      durationSec: 255,
      art: "assets/hero_concert.jpg",
      lyrics: `[Verse 1]
Echoes bouncing off the glass
Moments ticking, let them pass
Neon shadows on the wall
We won't answer when they call...`
    },
    {
      title: "Midnight Reverie",
      album: "Rhythm of Fire LP (2024)",
      duration: "3:18",
      durationSec: 198,
      art: "assets/guitarist.jpg",
      lyrics: `[Verse 1]
Acoustic breeze beneath the stars
Counting headlights, counting scars
Let the melody take flight
Into the velvet of the night...`
    },
    {
      title: "Tiara Thunder (Live Cut)",
      album: "Tiara Fest Special Edition",
      duration: "5:02",
      durationSec: 302,
      art: "assets/drummer.jpg",
      lyrics: `[Live Intro]
Mangalore, are you ready to ignite?!
Alpha Rhythms on stage at Tiara!

[Heavy Drum Breakdown - Dev Malhotra]
[Crushing Riffs]`
    }
  ];

  // Tour Data
  const tourStops = [
    { city: "Bangalore, Karnataka", venue: "Sunburn Union Arena", date: "OCT 18, 2026", status: "VIP Selling Fast" },
    { city: "Mangalore, Karnataka", venue: "Tiara Fest Arena (SJEC Campus)", date: "OCT 24, 2026", status: "Special Headline Act" },
    { city: "Mumbai, Maharashtra", venue: "Phoenix Marketcity Amphitheatre", date: "NOV 02, 2026", status: "Selling Fast" },
    { city: "Delhi NCR", venue: "CyberHub Rock Stage", date: "NOV 12, 2026", status: "Tickets Available" },
    { city: "Vagator, Goa", venue: "Hilltop Amphitheatre", date: "NOV 28, 2026", status: "Tour Finale" }
  ];

  // DOM Elements
  const loaderEl = document.getElementById('tiara-loader');
  const appContentEl = document.getElementById('app-content');
  const yellowOutlineImg = document.getElementById('yellow-outline-img');
  const whiteInnerImg = document.getElementById('white-inner-img');
  const shockwaveRing = document.getElementById('shockwave-ring');
  const loadPercentEl = document.getElementById('load-percent');
  const meterFillEl = document.getElementById('meter-fill');
  const hudStatusEl = document.getElementById('hud-status-text');
  const skipIntroBtn = document.getElementById('skip-intro-btn');
  const replayIntroBtn = document.getElementById('replay-intro-btn');
  const footerReplayBtn = document.getElementById('footer-replay-btn');
  const mobileReplayBtn = document.getElementById('mobile-replay-btn');

  // Nav & controls
  const mainHeader = document.getElementById('main-header');
  const mobileToggleBtn = document.getElementById('mobile-toggle-btn');
  const mobileMenu = document.getElementById('mobile-menu');
  const audioToggleBtn = document.getElementById('audio-toggle-btn');
  const audioIcon = document.getElementById('audio-icon');

  // Music Player Elements
  const vinylDisc = document.getElementById('vinyl-disc');
  const mainPlayBtn = document.getElementById('main-play-btn');
  const mainPlayIcon = document.getElementById('main-play-icon');
  const currentTrackTitle = document.getElementById('current-track-title');
  const currentTrackArtist = document.getElementById('current-track-artist');
  const trackTimeCurrent = document.getElementById('track-time-current');
  const trackTimeTotal = document.getElementById('track-time-total');
  const seekBar = document.getElementById('seek-bar');
  const seekProgress = document.getElementById('seek-progress');
  const prevTrackBtn = document.getElementById('prev-track-btn');
  const nextTrackBtn = document.getElementById('next-track-btn');
  const volumeSlider = document.getElementById('volume-slider');
  const tracklistContainer = document.getElementById('tracklist-container');
  const teaserPlayBtn = document.getElementById('teaser-play-btn');
  const teaserBars = document.getElementById('teaser-bars');
  const heroRiffBtn = document.getElementById('hero-riff-btn');

  // Toast Container
  const toastContainer = document.getElementById('toast-container');

  // ==========================================================
  // 1. COSMIC STARFIELD GENERATOR (TIARA STYLE)
  // ==========================================================
  function initCosmicStarfield() {
    const twinkleContainer = document.getElementById('twinkle-container');
    const shootingContainer = document.getElementById('shooting-container');
    if (!twinkleContainer || !shootingContainer) return;

    twinkleContainer.innerHTML = '';
    shootingContainer.innerHTML = '';

    // Create 32 sparkling stars in red, gold, and white
    const colors = ['white', 'red', 'gold', 'white'];
    for (let i = 0; i < 32; i++) {
      const star = document.createElement('div');
      const color = colors[Math.floor(Math.random() * colors.length)];
      star.className = `twinkle-star ${color}`;
      
      const size = Math.floor(Math.random() * 8) + 6; // 6px - 14px
      const top = Math.random() * 95;
      const left = Math.random() * 95;
      const duration = (Math.random() * 2 + 1.5).toFixed(1);
      const delay = (Math.random() * 2).toFixed(1);

      star.style.width = `${size}px`;
      star.style.height = `${size}px`;
      star.style.top = `${top}%`;
      star.style.left = `${left}%`;
      star.style.animationDuration = `${duration}s`;
      star.style.animationDelay = `${delay}s`;

      twinkleContainer.appendChild(star);
    }

    // Create 6 shooting stars with staggered delays
    for (let i = 0; i < 6; i++) {
      const shoot = document.createElement('div');
      shoot.className = `shooting-star ${i % 2 === 0 ? 'red' : 'white'}`;
      shoot.style.top = `${Math.random() * 50}%`;
      shoot.style.left = `${Math.random() * 70 + 30}%`;
      shoot.style.animationDelay = `${(i * 1.4).toFixed(1)}s`;
      shoot.style.animationDuration = `${(Math.random() * 1.5 + 2).toFixed(1)}s`;
      shootingContainer.appendChild(shoot);
    }
  }

  initCosmicStarfield();

  // ==========================================================
  // 2. TIARA INTRO LOADER ANIMATION LIFECYCLE & INTERACTIVITY
  // ==========================================================
  const hudStatuses = [
    "Injecting dual-frequency resonance...",
    "Yellow outline descending from crown...",
    "White rhythm matrix ascending from base...",
    "Harmonics colliding at nexus...",
    "Natural colors united • Locked in resonance...",
    "Full band power ignited • 100% resonance!",
    "Alpha Rhythms portal opening..."
  ];

  let loaderInterval = null;
  let loaderRaf = null;
  let loaderBoost = 0;

  // Cosmic Synth Chime (Disabled per request)
  function playCosmicChime(freq = 523.25) {}

  // Micro tactile tick (Disabled per request)
  function playClickTick() {}

  function createClickRipple(x, y) {
    const wave = document.createElement('div');
    wave.className = 'click-ripple-wave';
    wave.style.left = `${x}px`;
    wave.style.top = `${y}px`;
    document.body.appendChild(wave);
    setTimeout(() => wave.remove(), 700);
  }

  function createChargeBadge(x, y, text) {
    const badge = document.createElement('div');
    badge.className = 'click-charge-badge';
    badge.textContent = text;
    badge.style.left = `${x}px`;
    badge.style.top = `${y}px`;
    document.body.appendChild(badge);
    setTimeout(() => badge.remove(), 850);
  }

  function superchargeLoader(x, y) {
    if (!state.isLoading || state.loadProgress >= 100) return;
    initAudioContext();
    
    // Play cosmic chime
    playCosmicChime(440 + Math.random() * 260);

    // Ripple wave
    createClickRipple(x, y);

    // Boost progress
    const boost = Math.floor(Math.random() * 5) + 12; // 12-16%
    loaderBoost += boost;
    createChargeBadge(x, y, `+${boost}% FREQUENCY CHARGED! ⚡`);

    // Aura flare
    const aura = document.getElementById('loader-aura');
    if (aura) {
      aura.style.transform = 'scale(1.4)';
      aura.style.opacity = '1';
      setTimeout(() => {
        aura.style.transform = '';
        aura.style.opacity = '';
      }, 400);
    }
  }

  function runTiaraLoader() {
    state.isLoading = true;
    state.loadProgress = 0;
    loaderBoost = 0;
    if (loaderEl) {
      loaderEl.style.display = 'flex';
      loaderEl.style.opacity = '1';
      loaderEl.style.visibility = 'visible';
      loaderEl.classList.remove('fade-out', 'portal-active', 'shutters-opening');
    }
    document.body.classList.add('loading-locked');
    document.documentElement.classList.add('loading-locked');
    window.scrollTo(0, 0);
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
    if (appContentEl) {
      appContentEl.classList.remove('ready', 'portal-revealing');
    }

    // Reset hero entrance classes
    const heroBandImg = document.getElementById('hero-band-photo');
    const mainHeader = document.getElementById('main-header');
    const mobileCrest = document.getElementById('hero-mobile-crest');
    const heroDock = document.querySelector('.hero-stage-dock');
    if (heroBandImg) heroBandImg.classList.remove('hero-entrance');
    if (mainHeader) mainHeader.classList.remove('hero-entrance');
    if (mobileCrest) mobileCrest.classList.remove('hero-entrance');
    if (heroDock) heroDock.classList.remove('hero-entrance');

    if (shockwaveRing) shockwaveRing.classList.remove('pulse');

    // Reset yellow outline (descends from above: initially inset 100% from bottom)
    if (yellowOutlineImg) yellowOutlineImg.style.clipPath = 'inset(0 0 100% 0)';
    if (whiteInnerImg) whiteInnerImg.style.clipPath = 'inset(100% 0 0 0)';

    if (meterFillEl) meterFillEl.style.width = `0%`;
    if (loadPercentEl) loadPercentEl.textContent = '0';
    if (hudStatusEl) hudStatusEl.textContent = hudStatuses[0];

    if (loaderRaf) cancelAnimationFrame(loaderRaf);
    if (loaderInterval) clearInterval(loaderInterval);

    const startTime = performance.now();
    const targetDuration = 1800; // Snappy 1.8s progress

    // Fallback Watchdog: Guarantee opening within 2.5s maximum under ANY circumstances
    setTimeout(() => {
      if (state.isLoading) {
        triggerStageOpening();
      }
    }, 2500);

    function tickLoader(currentTime) {
      if (!state.isLoading) return;
      const elapsed = currentTime - startTime;
      const rawProgress = (elapsed / targetDuration) * 100;
      const progress = Math.min(100, rawProgress + loaderBoost);
      
      state.loadProgress = Math.floor(progress);
      if (loadPercentEl) loadPercentEl.textContent = state.loadProgress;

      // Sub-pixel smooth updates without integer stair-stepping
      const pClamped = Math.max(0, Math.min(100, progress));
      if (meterFillEl) meterFillEl.style.width = `${pClamped.toFixed(2)}%`;

      // 1. Yellow Outline reveals from top to bottom (descends from above)
      if (yellowOutlineImg) {
        yellowOutlineImg.style.clipPath = `inset(0 0 ${(100 - pClamped).toFixed(2)}% 0)`;
      }

      // 2. White Inner Art reveals from bottom to top (ascends from below)
      if (whiteInnerImg) {
        whiteInnerImg.style.clipPath = `inset(${(100 - pClamped).toFixed(2)}% 0 0 0)`;
      }

      // Update status text
      const statusIndex = Math.min(hudStatuses.length - 1, Math.floor((progress / 100) * hudStatuses.length));
      if (hudStatusEl && hudStatusEl.textContent !== hudStatuses[statusIndex]) {
        hudStatusEl.textContent = hudStatuses[statusIndex];
      }

      if (progress < 100) {
        loaderRaf = requestAnimationFrame(tickLoader);
      } else {
        // Complete 100%
        state.loadProgress = 100;
        if (loadPercentEl) loadPercentEl.textContent = '100';
        if (meterFillEl) meterFillEl.style.width = '100%';
        if (yellowOutlineImg) yellowOutlineImg.style.clipPath = 'inset(0 0 0 0)';
        if (whiteInnerImg) whiteInnerImg.style.clipPath = 'inset(0 0 0 0)';

        // Trigger luminous shockwave pulse
        if (shockwaveRing) {
          shockwaveRing.classList.remove('pulse');
          void shockwaveRing.offsetWidth; // trigger reflow
          shockwaveRing.classList.add('pulse');
        }

        // Distinct brief hold at 100% so user sees full load
        setTimeout(() => {
          triggerStageOpening();
        }, 200);
      }
    }

    loaderRaf = requestAnimationFrame(tickLoader);
  }

  function triggerStageOpening() {
    state.isLoading = false;
    if (loaderRaf) cancelAnimationFrame(loaderRaf);
    if (loaderInterval) clearInterval(loaderInterval);
    window.removeEventListener('scroll', lockScrollWhileLoading);
    document.body.classList.remove('loading-locked');
    document.documentElement.classList.remove('loading-locked');
    // Explicitly clear any height constraints so Lenis and the browser
    // recalculate full document height correctly after the loader exits
    document.body.style.height = '';
    document.body.style.maxHeight = '';
    document.documentElement.style.height = '';
    document.documentElement.style.maxHeight = '';

    // Guarantee beginning strictly at the Hero section.
    // Always use native scrollTo for the reset — Lenis.scrollTo with immediate:true
    // can inadvertently stop the Lenis engine. We then call lenis.resize/start
    // to sync Lenis with the new scroll position.
    window.scrollTo(0, 0);
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
    if (window.__alphaLenis) {
      window.__alphaLenis.resize();
      window.__alphaLenis.start();
    }

    // Header starts transparent on hero — scrolled class removed.
    // syncHeaderScrollState + updateScrollMetrics handle it from here on scroll.
    if (mainHeader) mainHeader.classList.remove('scrolled');

    // Lenis resize passes so it re-measures the full document height
    // once all entrance animations have settled.
    setTimeout(() => { if (window.__alphaLenis) window.__alphaLenis.resize(); }, 450);
    setTimeout(() => { if (window.__alphaLenis) window.__alphaLenis.resize(); }, 950);

    // 1. Part the arena stage shutters with golden laser beam
    if (loaderEl) {
      loaderEl.classList.remove('portal-active');
      loaderEl.classList.add('shutters-opening');
      // Wait for the full shutter transition (0.88s) to complete before hiding.
      // Setting display:none before the transition ends kills it mid-way.
      setTimeout(() => {
        loaderEl.style.opacity = '0';
        loaderEl.style.visibility = 'hidden';
        loaderEl.style.pointerEvents = 'none';
        loaderEl.style.display = 'none';
        loaderEl.classList.add('fade-out');
      }, 920);
    }

    // 2. Trigger the Awwwards-style hero section entrance
    if (appContentEl) {
      appContentEl.classList.remove('portal-revealing');
      appContentEl.classList.add('ready');
    }

    const heroBandImg = document.getElementById('hero-band-photo');
    const headerEl = document.getElementById('main-header');
    const mobileCrest = document.getElementById('hero-mobile-crest');
    const heroDock = document.querySelector('.hero-stage-dock');

    if (heroBandImg) {
      heroBandImg.classList.remove('hero-entrance');
      void heroBandImg.offsetWidth;
      heroBandImg.classList.add('hero-entrance');
    }
    if (headerEl) {
      headerEl.classList.remove('hero-entrance', 'scrolled');
      void headerEl.offsetWidth;
      headerEl.classList.add('hero-entrance');
      // Remove hero-entrance after animation fully completes (0.85s duration + 0.15s delay = 1s).
      // setTimeout is reliable; animationend can fail if the class is removed mid-play.
      setTimeout(() => {
        headerEl.classList.remove('hero-entrance');
      }, 1050);
    }
    if (mobileCrest) {
      mobileCrest.classList.remove('hero-entrance');
      void mobileCrest.offsetWidth;
      mobileCrest.classList.add('hero-entrance');
    }
    if (heroDock) {
      heroDock.classList.remove('hero-entrance');
      void heroDock.offsetWidth;
      heroDock.classList.add('hero-entrance');
    }

    // 3. Once the shutters have completely cleared (920ms — matches shutter hide above):
    // Nothing more needed here; loader is already hidden by the 920ms timeout above.

    showToast("Welcome to Alpha Rhythms!", "fa-bolt");
  }

  // Backward compatibility alias
  const triggerPortalOpening = triggerStageOpening;

  // Skip Intro
  if (skipIntroBtn) {
    skipIntroBtn.addEventListener('click', () => {
      if (loaderRaf) cancelAnimationFrame(loaderRaf);
      if (loaderInterval) clearInterval(loaderInterval);
      state.loadProgress = 100;
      if (loadPercentEl) loadPercentEl.textContent = '100';
      if (meterFillEl) meterFillEl.style.width = '100%';
      if (yellowOutlineImg) yellowOutlineImg.style.clipPath = 'inset(0 0 0 0)';
      if (whiteInnerImg) whiteInnerImg.style.clipPath = 'inset(0 0 0 0)';
      if (shockwaveRing) shockwaveRing.classList.add('pulse');
      triggerStageOpening();
    });
  }

  // Replay Triggers
  function replayLoader() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    initCosmicStarfield();
    runTiaraLoader();
  }

  if (replayIntroBtn) replayIntroBtn.addEventListener('click', replayLoader);
  if (footerReplayBtn) footerReplayBtn.addEventListener('click', replayLoader);
  if (mobileReplayBtn) {
    mobileReplayBtn.addEventListener('click', () => {
      if (mobileMenu) mobileMenu.classList.remove('open');
      replayLoader();
    });
  }

  // Loader Interactive Canvas & Equalizer Bars
  function initLoaderInteractivity() {
    const canvas = document.getElementById('loader-interactive-canvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    window.addEventListener('resize', () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    });

    const particles = [];

    function addParticles(x, y, count = 3) {
      for (let i = 0; i < count; i++) {
        particles.push({
          x: x + (Math.random() - 0.5) * 16,
          y: y + (Math.random() - 0.5) * 16,
          vx: (Math.random() - 0.5) * 2.5,
          vy: (Math.random() - 0.5) * 2.5 - 0.5,
          size: Math.random() * 3.5 + 1.5,
          color: Math.random() > 0.4 ? '#f59e0b' : '#38bdf8',
          alpha: 1,
          decay: Math.random() * 0.025 + 0.015
        });
      }
    }

    const handleLoaderMove = (clientX, clientY) => {
      addParticles(clientX, clientY, 3);
      const emblemBox = document.getElementById('loader-emblem-box');
      if (emblemBox) {
        const cx = window.innerWidth / 2;
        const cy = window.innerHeight / 2;
        const dx = (clientX - cx) / cx;
        const dy = (clientY - cy) / cy;
        emblemBox.style.transform = `perspective(800px) rotateY(${dx * 14}deg) rotateX(${-dy * 14}deg)`;
      }
    };

    loaderEl.addEventListener('mousemove', (e) => {
      handleLoaderMove(e.clientX, e.clientY);
    });

    loaderEl.addEventListener('touchmove', (e) => {
      if (e.touches && e.touches[0]) {
        handleLoaderMove(e.touches[0].clientX, e.touches[0].clientY);
      }
    }, { passive: true });

    loaderEl.addEventListener('mouseleave', () => {
      const emblemBox = document.getElementById('loader-emblem-box');
      if (emblemBox) {
        emblemBox.style.transform = 'perspective(800px) rotateY(0deg) rotateX(0deg)';
      }
    });

    loaderEl.addEventListener('touchend', () => {
      const emblemBox = document.getElementById('loader-emblem-box');
      if (emblemBox) {
        emblemBox.style.transform = 'perspective(800px) rotateY(0deg) rotateX(0deg)';
      }
    });

    function renderLoaderCanvas() {
      if (!state.isLoading) {
        ctx.clearRect(0, 0, width, height);
        return;
      }
      ctx.clearRect(0, 0, width, height);

      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;
        p.alpha -= p.decay;
        p.size *= 0.98;

        if (p.alpha <= 0 || p.size <= 0.2) {
          particles.splice(i, 1);
          continue;
        }

        ctx.save();
        ctx.globalAlpha = p.alpha;
        ctx.fillStyle = p.color;
        ctx.shadowColor = p.color;
        ctx.shadowBlur = 8;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }

      requestAnimationFrame(renderLoaderCanvas);
    }
    renderLoaderCanvas();

    // Equalizer bars interaction (Desktop mouse + Mobile touch)
    const eqBars = document.querySelectorAll('.hud-tagline-bars span');
    const pentatonicNotes = [293.66, 349.23, 392.00, 440.00, 523.25]; // D4, F4, G4, A4, C5
    eqBars.forEach((bar, idx) => {
      bar.addEventListener('mouseenter', () => {
        initAudioContext();
        playGuitarTone(pentatonicNotes[idx % pentatonicNotes.length], 0.22, 0);
      });
      const triggerBar = (clientX, clientY) => {
        initAudioContext();
        playGuitarTone(pentatonicNotes[idx % pentatonicNotes.length], 0.35, 0);
        superchargeLoader(clientX, clientY);
      };
      bar.addEventListener('click', (e) => {
        e.stopPropagation();
        triggerBar(e.clientX, e.clientY);
      });
      bar.addEventListener('touchstart', (e) => {
        e.stopPropagation();
        if (e.touches && e.touches[0]) {
          triggerBar(e.touches[0].clientX, e.touches[0].clientY);
        }
      }, { passive: true });
    });
  }

  initLoaderInteractivity();

  // Start initial loader
  runTiaraLoader();

  // ==========================================================
  // 3. LOGO CUSTOMIZER & RUNTIME IMAGE SWAPPER
  // ==========================================================
  const swapLogoBtn = document.getElementById('swap-logo-btn');
  const mobileSwapBtn = document.getElementById('mobile-swap-btn');
  const logoSwapModal = document.getElementById('logo-swap-modal');
  const logoSwapClose = document.getElementById('logo-swap-close');
  const logoDropzone = document.getElementById('logo-dropzone');
  const logoFileInput = document.getElementById('logo-file-input');
  const activeLogoPreview = document.getElementById('active-logo-preview');
  const applyLogoBtn = document.getElementById('apply-logo-btn');
  const resetDefaultLogoBtn = document.getElementById('reset-default-logo-btn');
  const themeBtns = document.querySelectorAll('.theme-btn');
  const navBrandLogo = document.getElementById('nav-brand-logo');

  // ==========================================================
  // UNIVERSAL MODAL CONTROLLER & DIALOGUE ANIMATION ENGINE
  // ==========================================================
  function alphaOpenModal(modalEl) {
    if (!modalEl) return;
    modalEl.classList.remove('hidden');
    document.body.classList.add('modal-open');
    if (window.__alphaLenis) {
      window.__alphaLenis.stop();
    }
  }

  function alphaCloseModal(modalEl) {
    if (!modalEl) return;
    modalEl.classList.add('hidden');
    const remainingOpen = document.querySelectorAll('.modal-backdrop:not(.hidden)');
    if (remainingOpen.length === 0) {
      document.body.classList.remove('modal-open');
      if (window.__alphaLenis) {
        window.__alphaLenis.start();
      }
    }
  }

  function alphaCloseAllModals() {
    document.querySelectorAll('.modal-backdrop:not(.hidden)').forEach(m => {
      m.classList.add('hidden');
    });
    document.body.classList.remove('modal-open');
    if (window.__alphaLenis) {
      window.__alphaLenis.start();
    }
  }

  // Universal ESC key dismissal for all modals and dialogs
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      alphaCloseAllModals();
    }
  });

  // Universal backdrop click to close
  document.querySelectorAll('.modal-backdrop').forEach(backdrop => {
    backdrop.addEventListener('click', (e) => {
      if (e.target === backdrop) {
        alphaCloseModal(backdrop);
      }
    });
  });

  // Universal close button click
  document.querySelectorAll('.modal-close-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const modal = btn.closest('.modal-backdrop');
      if (modal) {
        alphaCloseModal(modal);
      }
    });
  });

  function openLogoModal() {
    alphaOpenModal(logoSwapModal);
  }

  function closeLogoModal() {
    alphaCloseModal(logoSwapModal);
  }

  if (swapLogoBtn) swapLogoBtn.addEventListener('click', openLogoModal);
  if (mobileSwapBtn) {
    mobileSwapBtn.addEventListener('click', () => {
      if (mobileMenu) mobileMenu.classList.remove('open');
      openLogoModal();
    });
  }
  if (logoSwapClose) logoSwapClose.addEventListener('click', closeLogoModal);
  if (logoSwapModal) {
    logoSwapModal.addEventListener('click', (e) => {
      if (e.target === logoSwapModal) closeLogoModal();
    });
  }

  // Dropzone handling
  if (logoDropzone && logoFileInput) {
    logoDropzone.addEventListener('click', () => logoFileInput.click());
    
    logoDropzone.addEventListener('dragover', (e) => {
      e.preventDefault();
      logoDropzone.classList.add('dragover');
    });

    logoDropzone.addEventListener('dragleave', () => {
      logoDropzone.classList.remove('dragover');
    });

    logoDropzone.addEventListener('drop', (e) => {
      e.preventDefault();
      logoDropzone.classList.remove('dragover');
      if (e.dataTransfer.files && e.dataTransfer.files[0]) {
        handleLogoFile(e.dataTransfer.files[0]);
      }
    });
  }

  logoFileInput.addEventListener('change', (e) => {
    if (e.target.files && e.target.files[0]) {
      handleLogoFile(e.target.files[0]);
    }
  });

  function handleLogoFile(file) {
    if (!file.type.startsWith('image/')) {
      showToast("Please upload an image file (JPG or PNG)", "fa-triangle-exclamation");
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      const dataUrl = e.target.result;
      state.activeLogoSrc = dataUrl;
      activeLogoPreview.src = dataUrl;
      showToast("New band logo loaded into preview!", "fa-check");
    };
    reader.readAsDataURL(file);
  }

  // Liquid Theme Selection
  themeBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      themeBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const color = btn.dataset.color;
      state.liquidColor = color;
      document.documentElement.style.setProperty('--liquid-theme-color', color);
      
      // Update wave crest SVG fill dynamically
      const encodedColor = encodeURIComponent(color);
      const waveSvg = `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='40' preserveAspectRatio='none'%3E%3Cpath d='M0 40 Q 40 0 80 20 T 160 20 L160 40 Z' fill='${encodedColor}'/%3E%3C/svg%3E`;
      const waveStyle = document.createElement('style');
      waveStyle.innerHTML = `.tiara-mark-fill::before { background-image: url("${waveSvg}") !important; }`;
      document.head.appendChild(waveStyle);
    });
  });

  applyLogoBtn.addEventListener('click', () => {
    // Update logo mask & display
    if (yellowOutlineImg) yellowOutlineImg.src = state.activeLogoSrc;
    if (whiteInnerImg) whiteInnerImg.src = state.activeLogoSrc;
    const baseLogo = document.getElementById('loader-base-logo');
    if (baseLogo) baseLogo.src = state.activeLogoSrc;
    navBrandLogo.src = state.activeLogoSrc;
    const heroInteractiveLogo = document.getElementById('hero-interactive-logo');
    if (heroInteractiveLogo) heroInteractiveLogo.src = state.activeLogoSrc;

    // Also update all mockup logos across the site
    document.querySelectorAll('.mockup-logo, .footer-logo, .epass-logo').forEach(img => {
      img.src = state.activeLogoSrc;
    });

    closeLogoModal();
    showToast("Band logo updated! Replaying intro...", "fa-wand-magic-sparkles");
    replayLoader();
  });

  resetDefaultLogoBtn.addEventListener('click', () => {
    state.activeLogoSrc = 'assets/logo_shield_black_transparent.png';
    activeLogoPreview.src = state.activeLogoSrc;
    if (yellowOutlineImg) yellowOutlineImg.src = 'assets/logo_outline_yellow.png';
    if (whiteInnerImg) whiteInnerImg.src = 'assets/logo_inner_white.png';
    const baseLogo = document.getElementById('loader-base-logo');
    if (baseLogo) baseLogo.src = 'assets/logo_shield_black_transparent.png';
    if (navBrandLogo) navBrandLogo.src = 'assets/logo_shield_black_transparent.png';
    const heroInteractiveLogo = document.getElementById('hero-interactive-logo');
    if (heroInteractiveLogo) heroInteractiveLogo.src = 'assets/logo_shield_black_transparent.png';
    document.querySelectorAll('.mockup-logo, .footer-logo, .epass-logo').forEach(img => {
      img.src = 'assets/logo_shield_black_transparent.png';
    });
    showToast("Reset to Alpha Rhythms official logo", "fa-rotate-left");
  });

  // ==========================================================
  // 4. AUDIO SYSTEM (SILENT / REMOVED PER USER INSTRUCTION)
  // ==========================================================
  function initAudioContext() {}
  function playGuitarTone() {}
  function playDrumSound() {}
  function playAlphaRhythmsRiff() {}
  function playClickTick() {}
  function startAudioPlayback() {}
  function pauseAudioPlayback() {}
  function toggleAudio() {}

  // Animate Equalizer Bars in Hero Teaser
  function animateVisualizer() {
    if (!teaserBars) return;
    const bars = teaserBars.querySelectorAll('span');
    bars.forEach(bar => {
      const height = Math.floor(Math.random() * 85) + 15;
      bar.style.height = `${height}%`;
    });
  }

  // Playback Progress Simulation
  let simulatedSeconds = 0;
  function updatePlaybackProgress() {
    const curTrack = tracks[state.currentTrackIndex];
    simulatedSeconds = (simulatedSeconds + 0.3) % curTrack.durationSec;
    const pct = (simulatedSeconds / curTrack.durationSec) * 100;
    seekProgress.style.width = `${pct}%`;

    const mins = Math.floor(simulatedSeconds / 60);
    const secs = Math.floor(simulatedSeconds % 60).toString().padStart(2, '0');
    trackTimeCurrent.textContent = `${mins}:${secs}`;
  }

  // Seek bar click
  if (seekBar) seekBar.addEventListener('click', (e) => {
    const rect = seekBar.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const pct = Math.max(0, Math.min(1, clickX / rect.width));
    seekProgress.style.width = `${pct * 100}%`;
    simulatedSeconds = pct * tracks[state.currentTrackIndex].durationSec;
  });

  // Tracklist rendering
  function renderTracklist() {
    if (!tracklistContainer) return;
    tracklistContainer.innerHTML = '';
    tracks.forEach((track, i) => {
      const li = document.createElement('li');
      li.className = `track-item ${i === state.currentTrackIndex ? 'active' : ''}`;
      li.innerHTML = `
        <div class="track-item-left">
          <span class="track-num">${(i + 1).toString().padStart(2, '0')}</span>
          <div class="track-name-box">
            <strong>${track.title}</strong>
            <small>${track.album}</small>
          </div>
        </div>
        <span class="track-duration">${track.duration}</span>
      `;
      li.addEventListener('click', () => {
        selectTrack(i);
      });
      tracklistContainer.appendChild(li);
    });
  }

  function selectTrack(index) {
    state.currentTrackIndex = index;
    const track = tracks[index];
    if (currentTrackTitle) currentTrackTitle.textContent = track.title;
    currentTrackArtist.textContent = `Alpha Rhythms • ${track.album}`;
    if (trackTimeTotal) trackTimeTotal.textContent = track.duration;
    simulatedSeconds = 0;
    renderTracklist();
    if (!state.isPlayingAudio) {
      startAudioPlayback();
    }
  }

  if (prevTrackBtn) prevTrackBtn.addEventListener('click', () => {
    const nextIdx = (state.currentTrackIndex - 1 + tracks.length) % tracks.length;
    selectTrack(nextIdx);
  });

  if (nextTrackBtn) nextTrackBtn.addEventListener('click', () => {
    const nextIdx = (state.currentTrackIndex + 1) % tracks.length;
    selectTrack(nextIdx);
  });

  renderTracklist();

  // Lyrics Modal
  const lyricsModal = document.getElementById('lyrics-modal');
  const lyricsModalBtn = document.getElementById('lyrics-modal-btn');
  const lyricsModalClose = document.getElementById('lyrics-modal-close');
  const lyricsTitle = document.getElementById('lyrics-title');
  const lyricsContent = document.getElementById('lyrics-content');

  if (lyricsModalBtn) lyricsModalBtn.addEventListener('click', () => {
    const track = tracks[state.currentTrackIndex];
    lyricsTitle.textContent = track.title;
    lyricsContent.textContent = track.lyrics;
    alphaOpenModal(lyricsModal);
  });

  if (lyricsModalClose) lyricsModalClose.addEventListener('click', () => {
    alphaCloseModal(lyricsModal);
  });
  if (lyricsModal) lyricsModal.addEventListener('click', (e) => {
    if (e.target === lyricsModal) alphaCloseModal(lyricsModal);
  });

  // ==========================================================
  // THE LINEUP: KINETIC STAGE ACCORDION & EDITORIAL GALLERY
  // ==========================================================
  const lineupAccordion = document.getElementById('lineup-stage-accordion');
  const stagePillars = document.querySelectorAll('.stage-pillar');
  let clickedPillar = null;

  // Guarantee NO section is expanded by default
  stagePillars.forEach(p => p.classList.remove('active'));

  stagePillars.forEach((pillar) => {
    // Hover: expand this pillar and collapse all others
    pillar.addEventListener('mouseenter', () => {
      stagePillars.forEach(p => p.classList.remove('active'));
      pillar.classList.add('active');
    });

    // Click: toggle active or switch to this pillar
    pillar.addEventListener('click', (e) => {
      e.stopPropagation();
      initAudioContext();
      playClickTick();

      if (clickedPillar === pillar && pillar.classList.contains('active')) {
        // Toggle off: collapse back so no section is expanded
        pillar.classList.remove('active');
        clickedPillar = null;
      } else {
        stagePillars.forEach(p => p.classList.remove('active'));
        pillar.classList.add('active');
        clickedPillar = pillar;
      }
    });

    pillar.addEventListener('focus', () => {
      stagePillars.forEach(p => p.classList.remove('active'));
      pillar.classList.add('active');
    });

    pillar.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        pillar.click();
      }
    });
  });

  // When mouse leaves the entire accordion, collapse back to default (no section expanded)
  if (lineupAccordion) {
    lineupAccordion.addEventListener('mouseleave', () => {
      if (!clickedPillar) {
        stagePillars.forEach(p => p.classList.remove('active'));
      }
    });
  }

  // Click outside collapses back to default (no section expanded)
  document.addEventListener('click', (e) => {
    if (clickedPillar && lineupAccordion && !lineupAccordion.contains(e.target)) {
      stagePillars.forEach(p => p.classList.remove('active'));
      clickedPillar = null;
    }
  });

  // Escape key collapses back to default
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && clickedPillar) {
      stagePillars.forEach(p => p.classList.remove('active'));
      clickedPillar = null;
    }
  });

  // Mobile Deck Carousel Controls, Quick Ribbon & Dot Synchronization
  const mobileDeck = document.getElementById('lineup-mobile-deck');
  const mobileCards = Array.from(document.querySelectorAll('.mobile-member-card'));
  const mobileRibbonTrack = document.getElementById('mobile-ribbon-track');
  const ribbonBtns = Array.from(document.querySelectorAll('.ribbon-avatar-btn'));
  const mobileDots = Array.from(document.querySelectorAll('.mobile-dot'));
  const mobilePrev = document.getElementById('mobile-lineup-prev');
  const mobileNext = document.getElementById('mobile-lineup-next');

  if (mobileDeck && mobileCards.length > 0) {
    let currentMobileIndex = 0;

    function scrollMobileDeckToIndex(index, smooth = true) {
      if (index < 0 || index >= mobileCards.length) return;
      currentMobileIndex = index;
      const targetCard = mobileCards[index];
      if (!targetCard) return;

      const targetLeft = targetCard.offsetLeft - (mobileDeck.clientWidth - targetCard.clientWidth) / 2;
      mobileDeck.scrollTo({
        left: Math.max(0, targetLeft),
        behavior: smooth ? 'smooth' : 'auto'
      });

      updateMobileActiveStates(index);
    }

    function updateMobileActiveStates(activeIndex) {
      // 1. Update Cards
      mobileCards.forEach((c, idx) => {
        c.classList.toggle('active', idx === activeIndex);
      });

      // 2. Update Dots
      mobileDots.forEach((d, idx) => {
        d.classList.toggle('active', idx === activeIndex);
      });

      // 3. Update Ribbon Avatars & Auto-Scroll Ribbon
      ribbonBtns.forEach((btn, idx) => {
        const isActive = idx === activeIndex;
        btn.classList.toggle('active', isActive);
        btn.setAttribute('aria-selected', isActive ? 'true' : 'false');
        if (isActive && mobileRibbonTrack) {
          const ribbonLeft = btn.offsetLeft - (mobileRibbonTrack.clientWidth - btn.clientWidth) / 2;
          mobileRibbonTrack.scrollTo({
            left: Math.max(0, ribbonLeft),
            behavior: 'smooth'
          });
        }
      });
    }

    // Scroll listener on mobile deck with center-point detection
    let isScrollDebouncing = false;
    mobileDeck.addEventListener('scroll', () => {
      if (isScrollDebouncing) return;
      isScrollDebouncing = true;
      requestAnimationFrame(() => {
        const deckCenter = mobileDeck.scrollLeft + mobileDeck.clientWidth / 2;
        let closestIdx = 0;
        let minDiff = Infinity;

        mobileCards.forEach((card, idx) => {
          const cardCenter = card.offsetLeft + card.clientWidth / 2;
          const diff = Math.abs(deckCenter - cardCenter);
          if (diff < minDiff) {
            minDiff = diff;
            closestIdx = idx;
          }
        });

        if (closestIdx !== currentMobileIndex) {
          currentMobileIndex = closestIdx;
          updateMobileActiveStates(closestIdx);
        }
        isScrollDebouncing = false;
      });
    }, { passive: true });

    // Quick Ribbon Avatar click
    ribbonBtns.forEach((btn, idx) => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        initAudioContext();
        playClickTick();
        scrollMobileDeckToIndex(idx, true);
      });
    });

    // Dot navigation click
    mobileDots.forEach((dot, idx) => {
      dot.addEventListener('click', (e) => {
        e.preventDefault();
        initAudioContext();
        playClickTick();
        scrollMobileDeckToIndex(idx, true);
      });
    });

    // Prev / Next button click
    if (mobilePrev) {
      mobilePrev.addEventListener('click', (e) => {
        e.preventDefault();
        initAudioContext();
        playClickTick();
        const prevIdx = Math.max(0, currentMobileIndex - 1);
        scrollMobileDeckToIndex(prevIdx, true);
      });
    }

    if (mobileNext) {
      mobileNext.addEventListener('click', (e) => {
        e.preventDefault();
        initAudioContext();
        playClickTick();
        const nextIdx = Math.min(mobileCards.length - 1, currentMobileIndex + 1);
        scrollMobileDeckToIndex(nextIdx, true);
      });
    }

    // Card tap interaction
    mobileCards.forEach((card, idx) => {
      card.addEventListener('click', () => {
        initAudioContext();
        if (idx !== currentMobileIndex) {
          playClickTick();
          scrollMobileDeckToIndex(idx, true);
        } else {
          // Play a light signature note when tapping the active card
          playGuitarTone(293.66 + idx * 32, 0.22, 0);
          card.style.transform = 'scale(0.97)';
          setTimeout(() => { card.style.transform = ''; }, 200);
        }
      });
    });
  }

  // ==========================================================
  // 5. TOUR TICKETS BOOKING MODAL
  // ==========================================================
  const ticketModal = document.getElementById('ticket-modal');
  const ticketModalClose = document.getElementById('ticket-modal-close');
  const modalTourTitle = document.getElementById('modal-tour-title');
  const modalTourSub = document.getElementById('modal-tour-sub');
  const ticketTierOptions = document.querySelectorAll('.ticket-tier-option');
  const qtyMinus = document.getElementById('qty-minus');
  const qtyPlus = document.getElementById('qty-plus');
  const qtyDisplay = document.getElementById('qty-display');
  const ticketTotalPrice = document.getElementById('ticket-total-price');
  const confirmTicketBtn = document.getElementById('confirm-ticket-btn');
  const epassCard = document.getElementById('epass-card');
  const epassDoneBtn = document.getElementById('epass-done-btn');
  const passEventName = document.getElementById('pass-event-name');
  const passEventLoc = document.getElementById('pass-event-loc');
  const passTier = document.getElementById('pass-tier');
  const passQty = document.getElementById('pass-qty');

  function openTourModal(idx) {
    initAudioContext();
    playClickTick();
    state.selectedTourIndex = idx;
    const stop = tourStops[idx];

    modalTourTitle.textContent = `${stop.venue} — ${stop.city}`;
    modalTourSub.textContent = `Date: ${stop.date} • ${stop.status}`;
    state.ticketQty = 1;
    qtyDisplay.textContent = '1';
    updateTicketTotal();

    epassCard.classList.add('hidden');
    document.querySelector('.ticket-selection-body').classList.remove('hidden');
    alphaOpenModal(ticketModal);
  }

  // Open ticket modal via ticket buttons
  document.querySelectorAll('.btn-ticket').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const idx = parseInt(btn.dataset.tourIndex, 10);
      openTourModal(idx);
    });
  });

  // Open ticket modal by clicking/tapping anywhere on the tour row (Mobile & Desktop friendly)
  document.querySelectorAll('.tour-row').forEach(row => {
    row.addEventListener('click', () => {
      const btn = row.querySelector('.btn-ticket');
      if (btn) {
        const idx = parseInt(btn.dataset.tourIndex, 10);
        openTourModal(idx);
      }
    });
  });

  ticketTierOptions.forEach(opt => {
    opt.addEventListener('click', () => {
      ticketTierOptions.forEach(o => o.classList.remove('active'));
      opt.classList.add('active');
      state.ticketTierPrice = parseInt(opt.dataset.price, 10);
      updateTicketTotal();
    });
  });

  qtyMinus.addEventListener('click', () => {
    if (state.ticketQty > 1) {
      state.ticketQty--;
      qtyDisplay.textContent = state.ticketQty;
      updateTicketTotal();
    }
  });

  qtyPlus.addEventListener('click', () => {
    if (state.ticketQty < 10) {
      state.ticketQty++;
      qtyDisplay.textContent = state.ticketQty;
      updateTicketTotal();
    }
  });

  function updateTicketTotal() {
    const total = state.ticketTierPrice * state.ticketQty;
    ticketTotalPrice.textContent = `$${total.toFixed(2)}`;
  }

  confirmTicketBtn.addEventListener('click', () => {
    const stop = tourStops[state.selectedTourIndex];
    const activeTierName = document.querySelector('.ticket-tier-option.active .tier-info strong').textContent;

    passEventName.textContent = stop.venue;
    passEventLoc.textContent = `${stop.city} • ${stop.date}`;
    passTier.textContent = activeTierName;
    passQty.textContent = `${state.ticketQty} Pass${state.ticketQty > 1 ? 'es' : ''}`;

    document.querySelector('.ticket-selection-body').classList.add('hidden');
    epassCard.classList.remove('hidden');
    showToast("Tickets Confirmed! E-Pass generated.", "fa-ticket");
  });

  epassDoneBtn.addEventListener('click', () => {
    alphaCloseModal(ticketModal);
  });

  ticketModalClose.addEventListener('click', () => {
    alphaCloseModal(ticketModal);
  });
  ticketModal.addEventListener('click', (e) => {
    if (e.target === ticketModal) alphaCloseModal(ticketModal);
  });

  // ==========================================================
  // 6. GALLERY & LIGHTBOX
  // ==========================================================
  const galleryItems = Array.from(document.querySelectorAll('.gallery-item'));
  const filterTabs = document.querySelectorAll('.filter-tab');
  const lightboxModal = document.getElementById('lightbox-modal');
  const lightboxImg = document.getElementById('lightbox-img');
  const lightboxCaption = document.getElementById('lightbox-caption');
  const lightboxClose = document.getElementById('lightbox-close');
  const lightboxPrev = document.getElementById('lightbox-prev');
  const lightboxNext = document.getElementById('lightbox-next');

  filterTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      filterTabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      const cat = tab.dataset.filter;

      galleryItems.forEach(item => {
        if (cat === 'all' || item.dataset.category === cat) {
          item.style.display = 'block';
        } else {
          item.style.display = 'none';
        }
      });
    });
  });

  galleryItems.forEach((item, i) => {
    item.addEventListener('click', () => {
      state.currentGalleryIndex = i;
      openLightbox(i);
    });
  });

  function openLightbox(index) {
    const item = galleryItems[index];
    lightboxImg.src = item.dataset.full;
    lightboxCaption.textContent = item.dataset.caption;
    lightboxModal.classList.remove('hidden');
  }

  if (lightboxClose) lightboxClose.addEventListener('click', () => lightboxModal.classList.add('hidden'));
  if (lightboxPrev) lightboxPrev.addEventListener('click', () => {
    state.currentGalleryIndex = (state.currentGalleryIndex - 1 + galleryItems.length) % galleryItems.length;
    openLightbox(state.currentGalleryIndex);
  });
  if (lightboxNext) lightboxNext.addEventListener('click', () => {
    state.currentGalleryIndex = (state.currentGalleryIndex + 1) % galleryItems.length;
    openLightbox(state.currentGalleryIndex);
  });

  document.addEventListener('keydown', (e) => {
    if (lightboxModal.classList.contains('hidden')) return;
    if (e.key === 'Escape') lightboxModal.classList.add('hidden');
    if (e.key === 'ArrowLeft') lightboxPrev.click();
    if (e.key === 'ArrowRight') lightboxNext.click();
  });

  // ==========================================================
  // 7. MERCHANDISE & CART SYSTEM
  // ==========================================================
  const cartDrawer = document.getElementById('cart-drawer');
  const cartDrawerBtn = document.getElementById('cart-drawer-btn');
  const cartCloseBtn = document.getElementById('cart-close-btn');
  const cartCounter = document.getElementById('cart-counter');
  const drawerCartCount = document.getElementById('drawer-cart-count');
  const cartItemsContainer = document.getElementById('cart-items-container');
  const cartSubtotal = document.getElementById('cart-subtotal');
  const checkoutBtn = document.getElementById('checkout-btn');

  function openCart() {
    cartDrawer.classList.add('open');
    cartDrawer.setAttribute('aria-hidden', 'false');
  }

  function closeCart() {
    cartDrawer.classList.remove('open');
    cartDrawer.setAttribute('aria-hidden', 'true');
  }

  if (cartDrawerBtn) cartDrawerBtn.addEventListener('click', openCart);
  if (cartCloseBtn) cartCloseBtn.addEventListener('click', closeCart);

  document.querySelectorAll('.btn-add-cart').forEach(btn => {
    btn.addEventListener('click', () => {
      const id = btn.dataset.id;
      const name = btn.dataset.name;
      const price = parseFloat(btn.dataset.price);
      const img = btn.dataset.img;

      const existing = state.cart.find(item => item.id === id);
      if (existing) {
        existing.qty++;
      } else {
        state.cart.push({ id, name, price, img, qty: 1 });
      }

      updateCartUI();
      openCart();
      showToast(`Added ${name} to cart!`, "fa-bag-shopping");
    });
  });

  function updateCartUI() {
    const totalItems = state.cart.reduce((sum, item) => sum + item.qty, 0);
    if (cartCounter) cartCounter.textContent = totalItems;
    if (drawerCartCount) drawerCartCount.textContent = totalItems;

    if (state.cart.length === 0) {
      cartItemsContainer.innerHTML = `
        <div class="empty-cart-state">
          <i class="fa-solid fa-compact-disc fa-spin"></i>
          <p>Your cart is empty. Grab some tour gear!</p>
        </div>
      `;
      cartSubtotal.textContent = "$0.00";
      return;
    }

    cartItemsContainer.innerHTML = '';
    let total = 0;

    state.cart.forEach((item, index) => {
      total += item.price * item.qty;
      const row = document.createElement('div');
      row.className = 'cart-row-item';
      row.innerHTML = `
        <img src="${item.img}" alt="${item.name}" class="cart-row-thumb">
        <div class="cart-row-details">
          <strong>${item.name}</strong>
          <span>$${item.price.toFixed(2)} × ${item.qty}</span>
        </div>
        <button class="cart-remove-btn" data-index="${index}" title="Remove"><i class="fa-solid fa-trash-can"></i></button>
      `;
      cartItemsContainer.appendChild(row);
    });

    cartSubtotal.textContent = `$${total.toFixed(2)}`;

    // Hook remove buttons
    cartItemsContainer.querySelectorAll('.cart-remove-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const idx = parseInt(btn.dataset.index, 10);
        state.cart.splice(idx, 1);
        updateCartUI();
      });
    });
  }

  if (checkoutBtn) checkoutBtn.addEventListener('click', () => {
    if (state.cart.length === 0) {
      showToast("Your cart is empty!", "fa-circle-exclamation");
      return;
    }
    showToast("Order Placed! Thank you for supporting Alpha Rhythms.", "fa-circle-check");
    state.cart = [];
    updateCartUI();
    closeCart();
  });

  // ==========================================================
  // 8. FORMS & HEADER INTERACTIVITY
  // ==========================================================
  // Header background theme controller:
  // - Hero (Section 1): Transparent background (no white bg)
  // - Performances (Section 2) & all following sections (Tour, Band, Contact): White background
  function updateHeaderTheme() {
    if (!mainHeader) return;
    const perfSection = document.getElementById('performances');
    if (perfSection) {
      const rect = perfSection.getBoundingClientRect();
      // When the top of Section 2 reaches the header (within 70px of viewport top)
      // rect.top <= 70 is TRUE when entering Section 2, throughout Section 2, and throughout all later sections!
      if (rect.top <= 70) {
        mainHeader.classList.add('scrolled');
      } else {
        mainHeader.classList.remove('scrolled');
      }
    } else {
      const heroSection = document.getElementById('hero');
      const heroHeight = heroSection ? heroSection.offsetHeight : window.innerHeight;
      const scrollY = window.__alphaLenis ? window.__alphaLenis.scroll : (window.scrollY || window.pageYOffset || 0);
      if (scrollY >= heroHeight - 70) {
        mainHeader.classList.add('scrolled');
      } else {
        mainHeader.classList.remove('scrolled');
      }
    }
  }

  window.addEventListener('scroll', updateHeaderTheme, { passive: true });

  // Mobile menu toggle
  mobileToggleBtn.addEventListener('click', () => {
    mobileMenu.classList.toggle('open');
  });

  document.querySelectorAll('.mobile-link').forEach(link => {
    link.addEventListener('click', () => {
      mobileMenu.classList.remove('open');
    });
  });

  // Booking Form Submission (if form is present)
  const bookingForm = document.getElementById('booking-form');
  const bookingSuccess = document.getElementById('booking-success');

  if (bookingForm) {
    bookingForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('book-name').value;
      bookingForm.reset();
      if (bookingSuccess) bookingSuccess.classList.remove('hidden');
      showToast(`Booking inquiry sent for ${name}!`, "fa-envelope");
      setTimeout(() => {
        if (bookingSuccess) bookingSuccess.classList.add('hidden');
      }, 6000);
    });
  }

  // Newsletter Form (if present)
  const newsletterForm = document.getElementById('newsletter-form');
  const newsletterMsg = document.getElementById('newsletter-msg');
  if (newsletterForm) {
    newsletterForm.addEventListener('submit', (e) => {
      e.preventDefault();
      newsletterForm.reset();
      if (newsletterMsg) newsletterMsg.textContent = "✓ You are now subscribed to the Alpha Inner Circle!";
      showToast("Subscribed to Alpha Rhythms newsletter!", "fa-circle-check");
      setTimeout(() => {
        if (newsletterMsg) newsletterMsg.textContent = "";
      }, 5000);
    });
  }


  // EPK Download (Real File Generation & Download across all devices)
  const epkBtn = document.getElementById('download-epk-btn');
  if (epkBtn) {
    epkBtn.addEventListener('click', (e) => {
      e.preventDefault();
      initAudioContext();
      playClickTick();

      const epkContent = `=====================================================
ALPHA RHYTHMS — OFFICIAL ELECTRONIC PRESS KIT (EPK)
Est. 2021 | The Sound of Power
=====================================================

1. BIOGRAPHY & MISSION
Alpha Rhythms is a relentless powerhouse live concert band known for electrifying stadium, college festival, and arena stages. Converging searing dual-guitar leads, explosive polyrhythms, atmospheric synth arpeggios, and floor-shaking low-end bass rumble.

2. THE LINEUP
• Shawn — Founder & Drummer
• Keerthan — Lead Male Vocalist
• Vinisha — Lead Female Vocalist
• Hans — Lead Guitarist
• Joyston — Bass Guitarist
• Ashton — Keyboardist & Synthesizers
• Kenneth — Percussionist

3. LIVE REPERTOIRE HIGHLIGHTS
• Rhythm of Fire (Original Power Track)
• Neon Shadows
• Midnight Reverie
• Tiara Thunder (SJEC Headline Live Cut)

4. STAGE TECHNICAL RIDER & REQUIREMENTS
• FOH: Minimum 48-channel digital audio console (DiGiCo / Yamaha / Avid)
• Monitoring: 4 stereo wireless IEM mixes with dedicated stage rack
• Drum Setup: Dedicated drum riser with isolated kick, snare, toms, and overhead mic feeds
• Backline: 100W Tube Guitar Half-stack + 800W Bass Rig + Direct XLR DI outs
• Visuals: Volumetric concert haze, warm front wash, moving-head spotlights, dynamic strobe

5. OFFICIAL BOOKING & PRESS CONTACTS
• Management & Tour Bookings: bandalpharhythms@gmail.com
• Phone / WhatsApp: +91 734 909 9787
• Press & Media: bandalpharhythms@gmail.com
• Official Instagram: @alpha.rhythms
• Live Experience: https://alpha-rhythms-band.vercel.app/

© 2026 ALPHA RHYTHMS BAND. ALL RIGHTS RESERVED.`;

      const blob = new Blob([epkContent], { type: 'text/plain;charset=utf-8' });
      const blobUrl = URL.createObjectURL(blob);
      const tempLink = document.createElement('a');
      tempLink.href = blobUrl;
      tempLink.download = 'Alpha_Rhythms_Official_EPK_2026.txt';
      document.body.appendChild(tempLink);
      tempLink.click();
      document.body.removeChild(tempLink);
      URL.revokeObjectURL(blobUrl);

      showToast("Electronic Press Kit (EPK) downloaded! 📄", "fa-file-pdf");
    });
  }

  // ==========================================================
  // 10. HERO ARENA STAGE (INTERACTIVE SPOTS, SOLOS, EMBERS, MOODS & 3D PARALLAX)
  // ==========================================================
  function initHeroArenaStage() {
    const heroSection = document.getElementById('hero');
    const heroBandPhoto = document.getElementById('hero-band-photo');
    const heroInteractiveLogo = document.getElementById('hero-interactive-logo');
    const spotlightBeam = document.getElementById('hero-spotlight-beam');

    if (!heroSection) return;

    // Interactive Mobile Top Crest Logo
    const heroMobileCrest = document.getElementById('hero-mobile-crest');
    if (heroMobileCrest) {
      heroMobileCrest.addEventListener('click', (e) => {
        if (e) e.stopPropagation();
        heroMobileCrest.classList.remove('crest-pulse-active');
        void heroMobileCrest.offsetWidth;
        heroMobileCrest.classList.add('crest-pulse-active');
        showToast("ALPHA RHYTHMS — Est. 2021", "fa-bolt");
      });
    }

    // Interactive Dock & Crest Logo
    const heroDock = document.getElementById('hero-dock-interactive') || document.querySelector('.hero-stage-dock');
    if (heroInteractiveLogo) {
      heroInteractiveLogo.addEventListener('click', (e) => {
        if (e) e.stopPropagation();
        showToast("Alpha Rhythms — Official Band", "fa-shield-halved");
      });
    }
    if (heroDock) {
      heroDock.addEventListener('click', (e) => {
        if (e.target !== heroInteractiveLogo) {
          showToast("Alpha Rhythms — Official Band", "fa-shield-halved");
        }
      });
    }

    // Soft Spotlight tracking mouse
    if (spotlightBeam) {
      heroSection.addEventListener('mousemove', (e) => {
        const rect = heroSection.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width) * 100;
        const y = ((e.clientY - rect.top) / rect.height) * 100;
        spotlightBeam.style.background = `radial-gradient(circle 380px at ${x.toFixed(1)}% ${y.toFixed(1)}%, rgba(255, 255, 255, 0.2) 0%, rgba(255, 255, 255, 0.04) 50%, transparent 80%)`;
      });
    }

    // 8. 3D Mouse & Touch Parallax on Band Photo
    let targetX = 0;
    let targetY = 0;
    let currentX = 0;
    let currentY = 0;
    let isParallaxActive = false;

    heroSection.addEventListener('mousemove', (e) => {
      const rect = heroSection.getBoundingClientRect();
      targetX = (e.clientX - rect.left) / rect.width - 0.5;
      targetY = (e.clientY - rect.top) / rect.height - 0.5;
      if (!isParallaxActive) {
        isParallaxActive = true;
        animateParallax();
      }
    });

    heroSection.addEventListener('touchmove', (e) => {
      if (e.touches && e.touches[0]) {
        const touch = e.touches[0];
        const rect = heroSection.getBoundingClientRect();
        targetX = (touch.clientX - rect.left) / rect.width - 0.5;
        targetY = (touch.clientY - rect.top) / rect.height - 0.5;
        if (!isParallaxActive) {
          isParallaxActive = true;
          animateParallax();
        }
        if (spotlightBeam) {
          const x = ((touch.clientX - rect.left) / rect.width) * 100;
          const y = ((touch.clientY - rect.top) / rect.height) * 100;
          spotlightBeam.style.background = `radial-gradient(circle 380px at ${x.toFixed(1)}% ${y.toFixed(1)}%, rgba(255, 230, 160, 0.45) 0%, rgba(245, 158, 11, 0.14) 50%, transparent 80%)`;
        }
      }
    }, { passive: true });

    heroSection.addEventListener('mouseleave', () => {
      targetX = 0;
      targetY = 0;
    });

    // Mobile device tilt / orientation support
    if (window.DeviceOrientationEvent && 'ontouchstart' in window) {
      window.addEventListener('deviceorientation', (e) => {
        if (e.gamma !== null && e.beta !== null) {
          targetX = Math.max(-0.4, Math.min(0.4, e.gamma / 45));
          targetY = Math.max(-0.4, Math.min(0.4, (e.beta - 40) / 45));
          if (!isParallaxActive) {
            isParallaxActive = true;
            animateParallax();
          }
        }
      }, { passive: true });
    }

    function animateParallax() {
      currentX += (targetX - currentX) * 0.06;
      currentY += (targetY - currentY) * 0.06;

      if (heroBandPhoto) {
        heroBandPhoto.style.transform = `perspective(1000px) rotateY(${currentX * 3}deg) rotateX(${-currentY * 2.5}deg) translate3d(${currentX * -8}px, ${currentY * -5}px, 0)`;
      }

      if (Math.abs(targetX - currentX) > 0.001 || Math.abs(targetY - currentY) > 0.001) {
        requestAnimationFrame(animateParallax);
      } else {
        isParallaxActive = false;
      }
    }
  }

  // Initialize the Hero Band Showcase!
  initHeroArenaStage();

  // ==========================================================
  // PERFORMANCES SHOWCASE
  // ==========================================================
  function initPerformancesShowcase() {
    const section = document.getElementById('performances');
    const cards = Array.from(document.querySelectorAll('.perf-card'));
    const dots = Array.from(document.querySelectorAll('.p-dot'));
    const mobilePrevBtn = document.getElementById('perf-mobile-prev-btn');
    const mobileNextBtn = document.getElementById('perf-mobile-next-btn');
    const mobileCounter = document.getElementById('perf-mobile-counter');
    const bgCanvas = document.getElementById('performances-bg');
    const progressFill = document.getElementById('perf-progress-fill');

    if (!section || cards.length === 0) return;

    let activeIdx = 0;
    let timerRaf = null;
    let progressStartTime = performance.now();
    let currentElapsed = 0;
    let isPaused = false;
    let pauseTimeout = null;
    const CYCLE_DURATION = 3500; // 3.5s per card

    function setActivePerformance(idx, playSound = false) {
      if (idx < 0) idx = cards.length - 1;
      if (idx >= cards.length) idx = 0;
      activeIdx = idx;

      cards.forEach((card, i) => {
        if (i === activeIdx) {
          card.classList.add('perf-spotlight');
          card.classList.add('mobile-active');
        } else {
          card.classList.remove('perf-spotlight');
          card.classList.remove('mobile-active');
        }
      });

      dots.forEach((dot, i) => {
        dot.textContent = `${i + 1}`;
        if (i === activeIdx) {
          dot.classList.add('active');
        } else {
          dot.classList.remove('active');
        }
      });

      if (mobileCounter) {
        mobileCounter.textContent = `CARD ${activeIdx + 1} OF ${cards.length}`;
      }

      if (playSound && typeof playClickTick === 'function') {
        playClickTick();
      }

      resetProgressTimer();
    }

    let autoCycleTimer = null;

    function resetProgressTimer() {
      if (autoCycleTimer) clearInterval(autoCycleTimer);
      autoCycleTimer = setInterval(() => {
        if (!isPaused) {
          setActivePerformance(activeIdx + 1, false);
        }
      }, CYCLE_DURATION);
    }

    // Initialize Card 1
    setActivePerformance(0, false);

    // Only allow hover pause on true pointer devices (desktop with mouse)
    const canHover = window.matchMedia && window.matchMedia('(hover: hover) and (pointer: fine)').matches;

    if (canHover) {
      cards.forEach((card) => {
        card.addEventListener('mouseenter', () => {
          isPaused = true;
          if (pauseTimeout) clearTimeout(pauseTimeout);
          // Auto-resume after 5 seconds even if mouse stays hovered
          pauseTimeout = setTimeout(() => { isPaused = false; }, 5000);
        });
        card.addEventListener('mouseleave', () => {
          isPaused = false;
          if (pauseTimeout) clearTimeout(pauseTimeout);
          resetProgressTimer();
        });
      });
    }

    cards.forEach((card, idx) => {
      card.addEventListener('click', (e) => {
        const isMobile = window.innerWidth < 992;
        if (isMobile && activeIdx !== idx) {
          e.preventDefault();
          isPaused = false;
          setActivePerformance(idx, true);
        } else {
          isPaused = false;
          setActivePerformance(idx, true);
        }
      });
    });

    // Dots Click Handler
    dots.forEach((dot, idx) => {
      dot.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        isPaused = false;
        if (typeof initAudioContext === 'function') initAudioContext();
        setActivePerformance(idx, true);
      });
    });

    // Mobile Navigation Controls
    if (mobilePrevBtn) {
      mobilePrevBtn.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        isPaused = false;
        if (typeof initAudioContext === 'function') initAudioContext();
        setActivePerformance(activeIdx - 1, true);
      });
    }

    if (mobileNextBtn) {
      mobileNextBtn.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        isPaused = false;
        if (typeof initAudioContext === 'function') initAudioContext();
        setActivePerformance(activeIdx + 1, true);
      });
    }

    // Touch swipe for mobile spotlight
    let touchStartX = 0;
    let touchStartY = 0;
    section.addEventListener('touchstart', (e) => {
      if (e.touches && e.touches[0]) {
        touchStartX = e.touches[0].clientX;
        touchStartY = e.touches[0].clientY;
      }
    }, { passive: true });

    section.addEventListener('touchend', (e) => {
      if (e.changedTouches && e.changedTouches[0]) {
        const deltaX = e.changedTouches[0].clientX - touchStartX;
        const deltaY = e.changedTouches[0].clientY - touchStartY;
        if (Math.abs(deltaX) > 40 && Math.abs(deltaX) > Math.abs(deltaY)) {
          isPaused = false;
          if (deltaX < 0) {
            setActivePerformance(activeIdx + 1, true);
          } else {
            setActivePerformance(activeIdx - 1, true);
          }
        }
      }
    }, { passive: true });

    // Subtle background parallax on scroll
    window.addEventListener('scroll', () => {
      if (!bgCanvas) return;
      const rect = section.getBoundingClientRect();
      if (rect.top < window.innerHeight && rect.bottom > 0) {
        const progress = (window.innerHeight - rect.top) / (window.innerHeight + rect.height);
        bgCanvas.style.transform = `scale(${1.05 - progress * 0.05}) translateY(${progress * 25}px)`;
      }
    }, { passive: true });
  }

  
  /* ========================================================
     SECTION 3: REAL-TIME LIVE BOOKING CALENDAR ENGINE
     Matches official @alpha.rhythms Instagram December 2026 poster:
     - Red cells: Days 12, 25, 26, 28, 30 (Locked & Booked)
     - Yellow cells: Available dates (Tap to Lock & Reserve)
     - WhatsApp direct band manager inquiry
     ======================================================== */
  function initLiveBookingCalendar() {
    const calDaysGrid = document.getElementById('cal-days-grid');
    if (!calDaysGrid) return;

    // Official Dec 2026 baseline bookings from Instagram poster
    const OFFICIAL_BOOKINGS = {
      '2026-12-12': {
        date: '2026-12-12',
        title: 'Grand Wedding Headline Act',
        client: 'Mangalore VIP Wedding Gala',
        city: 'Mangalore, Karnataka',
        venue: 'Ocean View Grounds',
        status: 'Official Dec 2026 Schedule',
        isOfficial: true
      },
      '2026-12-25': {
        date: '2026-12-25',
        title: 'Christmas Arena Gala',
        client: 'Bangalore Concert Showcase',
        city: 'Bangalore, Karnataka',
        venue: 'Whitefield Arena',
        status: 'Official Dec 2026 Schedule',
        isOfficial: true
      },
      '2026-12-26': {
        date: '2026-12-26',
        title: 'Grand Wedding Extravaganza',
        client: 'Grand Wedding Reception',
        city: 'Udupi, Karnataka',
        venue: 'Manipal Country Club',
        status: 'Official Dec 2026 Schedule',
        isOfficial: true
      },
      '2026-12-28': {
        date: '2026-12-28',
        title: 'Luxury Sangeet & Reception',
        client: 'Goa Coastal Celebration',
        city: 'Goa',
        venue: 'Vagator Grand Ballroom',
        status: 'Official Dec 2026 Schedule',
        isOfficial: true
      },
      '2026-12-30': {
        date: '2026-12-30',
        title: 'Pre-New Year Festival Concert',
        client: 'Coastal Karnataka Festival',
        city: 'Coastal Karnataka',
        venue: 'Main Festival Stage',
        status: 'Official Dec 2026 Schedule',
        isOfficial: true
      }
    };

    const MONTH_NAMES = [
      'JANUARY', 'FEBRUARY', 'MARCH', 'APRIL', 'MAY', 'JUNE',
      'JULY', 'AUGUST', 'SEPTEMBER', 'OCTOBER', 'NOVEMBER', 'DECEMBER'
    ];

    const DAY_NAMES = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

    // Start on December 2026 (Month 11 in 0-indexed JS Date)
    let currentYear = 2026;
    let currentMonth = 11;

    // Elements
    const monthTitleEl = document.getElementById('cal-month-title');
    const bannerMonthEl = document.getElementById('cal-banner-month');
    const scheduleTagEl = document.getElementById('cal-schedule-tag');
    const prevBtn = document.getElementById('cal-prev-btn');
    const nextBtn = document.getElementById('cal-next-btn');

    // Modals
    const bookingModal = document.getElementById('calendar-booking-modal');
    const bookingCloseBtn = document.getElementById('cal-booking-close');
    const bookingCancelBtn = document.getElementById('cal-booking-cancel');
    const bookingTitleEl = document.getElementById('cal-booking-title');
    const bookingSubEl = document.getElementById('cal-booking-sub');

    const lockedModal = document.getElementById('calendar-locked-modal');
    const lockedCloseBtn = document.getElementById('cal-locked-close');
    const lockedTitleEl = document.getElementById('cal-locked-title');
    const lockedDateBadge = document.getElementById('locked-date-badge');
    const lockedEventName = document.getElementById('locked-event-name');
    const lockedCityName = document.getElementById('locked-city-name');
    const lockedStatusText = document.getElementById('locked-status-text');
    const lockedWhatsAppLink = document.getElementById('locked-whatsapp-link');

    // Format Date string helper
    function formatDateDisplay(year, month, day) {
      const dateObj = new Date(year, month, day);
      const dayName = DAY_NAMES[dateObj.getDay()];
      const monthName = MONTH_NAMES[month];
      return {
        year,
        month,
        day,
        monthName,
        dayName,
        full: `${monthName} ${day}, ${year}`,
        withDay: `${dayName}, ${monthName} ${day}, ${year}`,
        iso: `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`
      };
    }

    // Open Direct Contact Modal for an available date
    function openBookingModal(dateInfo) {
      if (bookingTitleEl) bookingTitleEl.textContent = dateInfo.full.toUpperCase();
      if (bookingSubEl) {
        bookingSubEl.innerHTML = `<strong>${dateInfo.withDay}</strong> is currently <strong class="text-gold">AVAILABLE</strong>.`;
      }
      const waBtn = document.getElementById('cal-booking-wa-btn');
      if (waBtn) {
        const msg = encodeURIComponent(`Hi Alpha Rhythms, I am inquiring to book the band for ${dateInfo.full} (${dateInfo.withDay}). Please confirm availability and lock the date.`);
        waBtn.href = `https://wa.me/917349099787?text=${msg}`;
      }
      const callBtn = document.getElementById('cal-booking-call-btn');
      if (callBtn) {
        callBtn.href = 'tel:+917349099787';
      }
      if (bookingModal) {
        alphaOpenModal(bookingModal);
      }
    }

    function closeBookingModal() {
      if (bookingModal) {
        alphaCloseModal(bookingModal);
      }
    }

    // Open Locked Modal for inspecting booked date
    function openLockedModal(dateInfo, booking) {
      if (lockedTitleEl) lockedTitleEl.textContent = dateInfo.full;
      if (lockedDateBadge) lockedDateBadge.textContent = dateInfo.withDay.toUpperCase();
      if (lockedEventName) lockedEventName.textContent = (booking && booking.title) ? booking.title : 'Wedding Headline & Arena Set';
      if (lockedCityName) lockedCityName.textContent = (booking && (booking.city || booking.venue)) ? `${booking.city || booking.venue}` : 'Mangalore / Bangalore';
      if (lockedStatusText) {
        lockedStatusText.textContent = (booking && booking.status) ? booking.status : 'Confirmed Booking (Dec 2026 Schedule)';
      }

      if (lockedWhatsAppLink) {
        const text = encodeURIComponent(`Hi Alpha Rhythms, I saw that ${dateInfo.full} is booked for an event. Are there nearby dates or alternate slots available?`);
        lockedWhatsAppLink.href = `https://wa.me/917349099787?text=${text}`;
      }

      if (lockedModal) {
        alphaOpenModal(lockedModal);
      }
    }

    function closeLockedModal() {
      if (lockedModal) {
        alphaCloseModal(lockedModal);
      }
    }

    // Bind event listeners to existing static or newly rendered cells
    function bindGridCellListeners() {
      const cells = calDaysGrid.querySelectorAll('.cal-day-cell');
      cells.forEach(cell => {
        if (cell.classList.contains('cal-day-empty')) return;
        const dateIso = cell.getAttribute('data-date');
        if (!dateIso) return;

        const parts = dateIso.split('-');
        if (parts.length !== 3) return;
        const y = parseInt(parts[0], 10);
        const m = parseInt(parts[1], 10) - 1;
        const d = parseInt(parts[2], 10);
        const dateInfo = formatDateDisplay(y, m, d);

        // Replace click handler cleanly
        cell.onclick = (e) => {
          e.preventDefault();
          if (cell.classList.contains('cal-day-booked')) {
            const booking = OFFICIAL_BOOKINGS[dateIso] || {
              title: cell.querySelector('.cal-day-event')?.textContent || 'Wedding Performance',
              city: 'Mangalore / Bangalore',
              status: 'Confirmed Booking'
            };
            openLockedModal(dateInfo, booking);
          } else {
            openBookingModal(dateInfo);
          }
        };

        // Keyboard enter / space support
        cell.onkeydown = (e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            cell.click();
          }
        };
      });
    }

    // Render Calendar for currentYear & currentMonth
    function renderCalendar() {
      const monthName = MONTH_NAMES[currentMonth];
      if (monthTitleEl) monthTitleEl.textContent = `${monthName} ${currentYear}`;
      if (bannerMonthEl) bannerMonthEl.textContent = `${monthName} ${currentYear}`;

      if (scheduleTagEl) {
        if (currentYear === 2026 && currentMonth === 11) {
          scheduleTagEl.innerHTML = '<i class="fa-solid fa-circle-check"></i> WEDDING SCHEDULE';
          scheduleTagEl.style.color = 'var(--accent-gold)';
        } else {
          scheduleTagEl.innerHTML = '<i class="fa-solid fa-calendar-check"></i> TOUR & BOOKING DATES';
          scheduleTagEl.style.color = '#38bdf8';
        }
      }

      calDaysGrid.innerHTML = '';

      const firstDayIndex = new Date(currentYear, currentMonth, 1).getDay();
      const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();

      // Leading empty padding cells for preceding month days
      for (let i = 0; i < firstDayIndex; i++) {
        const emptyCell = document.createElement('div');
        emptyCell.className = 'cal-day-cell cal-day-empty';
        emptyCell.setAttribute('aria-hidden', 'true');
        calDaysGrid.appendChild(emptyCell);
      }

      // Populate Month Days
      for (let day = 1; day <= daysInMonth; day++) {
        const dateInfo = formatDateDisplay(currentYear, currentMonth, day);
        const dateKey = dateInfo.iso;
        const booking = OFFICIAL_BOOKINGS[dateKey];
        const isBooked = !!booking;

        const cell = document.createElement('div');
        cell.className = 'cal-day-cell ' + (isBooked ? 'cal-day-booked' : 'cal-day-available');
        cell.setAttribute('role', 'button');
        cell.setAttribute('tabindex', '0');
        cell.setAttribute('data-date', dateKey);

        if (isBooked) {
          cell.setAttribute('aria-label', `${dateInfo.withDay} - Booked: ${booking.title}`);
          cell.innerHTML = `
            <div class="cal-day-header">
              <span class="cal-day-num">${day}</span>
              <span class="cal-lock-icon"><i class="fa-solid fa-circle-check"></i></span>
            </div>
            <div class="cal-day-bottom">
              <span class="cal-day-badge"><i class="fa-solid fa-circle-check"></i> <span class="badge-text-full">BOOKED</span><span class="badge-text-short">BOOKED</span></span>
              <span class="cal-day-event" title="${booking.title}">${booking.title}</span>
            </div>
          `;
          cell.addEventListener('click', (e) => {
            e.preventDefault();
            openLockedModal(dateInfo, booking);
          });
        } else {
          cell.setAttribute('aria-label', `${dateInfo.withDay} - Available for Booking`);
          cell.innerHTML = `
            <div class="cal-day-header">
              <span class="cal-day-num">${day}</span>
            </div>
            <div class="cal-day-bottom">
              <span class="cal-day-badge"><span class="badge-text-full">AVAILABLE</span><span class="badge-text-short">OPEN</span></span>
              <span class="cal-day-action-hint"><i class="fa-solid fa-arrow-pointer"></i> Tap to Lock</span>
            </div>
          `;
          cell.addEventListener('click', (e) => {
            e.preventDefault();
            openBookingModal(dateInfo);
          });
        }

        cell.addEventListener('keydown', (e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            cell.click();
          }
        });

        calDaysGrid.appendChild(cell);
      }
    }

    // Modal Close Events
    if (bookingCloseBtn) bookingCloseBtn.addEventListener('click', closeBookingModal);
    if (bookingCancelBtn) bookingCancelBtn.addEventListener('click', closeBookingModal);
    if (bookingModal) {
      bookingModal.addEventListener('click', (e) => {
        if (e.target === bookingModal) closeBookingModal();
      });
    }

    if (lockedCloseBtn) lockedCloseBtn.addEventListener('click', closeLockedModal);
    if (lockedModal) {
      lockedModal.addEventListener('click', (e) => {
        if (e.target === lockedModal) closeLockedModal();
      });
    }

    // Navigation Controls
    if (prevBtn) {
      prevBtn.addEventListener('click', () => {
        currentMonth--;
        if (currentMonth < 0) {
          currentMonth = 11;
          currentYear--;
        }
        renderCalendar();
      });
    }

    if (nextBtn) {
      nextBtn.addEventListener('click', () => {
        currentMonth++;
        if (currentMonth > 11) {
          currentMonth = 0;
          currentYear++;
        }
        renderCalendar();
      });
    }

    // Keyboard ESC to close modals
    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        closeBookingModal();
        closeLockedModal();
      }
    });

    // Check if grid already has static cells populated
    const existingDays = calDaysGrid.querySelectorAll('.cal-day-cell:not(.cal-day-empty)');
    if (existingDays.length === 31) {
      bindGridCellListeners();
    } else {
      renderCalendar();
    }
  }

  // Initialize Live Booking Calendar in 3rd Section!
  initLiveBookingCalendar();


  /* ========================================================
     SMOOTH SCROLLING & SECTION ENTRY REVEAL ENGINE
     Features:
     - Lenis momentum smooth scrolling synced with RAF
     - Glowing top progress bar
     - Hero -> Section 2 stage horizon light flare transition
     - High-performance IntersectionObserver section entry reveals
     - Smooth anchor link navigation with deceleration curves
     ======================================================== */
  function initSmoothScrollAndSectionEntryEngine() {
    const progressBar = document.getElementById('scroll-progress-bar');
    const heroSection = document.getElementById('hero');
    const perfSection = document.getElementById('performances');

    // 1. Lenis Smooth Scroll Initialization with Zero-Lag Momentum
    let lenis = null;
    if (typeof Lenis !== 'undefined') {
      try {
        lenis = new Lenis({
          lerp: 0.08, // Silky smooth inertia glide
          wheelMultiplier: 1.0,
          touchMultiplier: 1.5,
          smoothWheel: true,
          smoothTouch: false,
          autoResize: true
        });

        function raf(time) {
          lenis.raf(time);
          requestAnimationFrame(raf);
        }
        requestAnimationFrame(raf);
        window.__alphaLenis = lenis;

        // Sync with scroll progress bar
        lenis.on('scroll', (e) => {
          updateScrollMetrics(e.scroll);
        });
      } catch (err) {
        console.warn('Lenis initialization skipped:', err);
      }
    }

    // Scroll tracker - update header, nav, and progress metrics unconditionally.
    // When Lenis is active, use its internal scroll position (e.scroll) which is
    // authoritative. The native window scroll event fires with a lagging window.scrollY
    // that can be behind Lenis's virtual position — reading Lenis directly avoids the
    // race condition where one handler adds 'scrolled' and the other removes it.
    window.addEventListener('scroll', () => {
      const y = window.__alphaLenis ? window.__alphaLenis.scroll : window.scrollY;
      updateScrollMetrics(y);
    }, { passive: true });

    // Initial check on load
    updateScrollMetrics(window.scrollY || 0);

    let cachedHeroBottom = 0;
    function cacheLayoutMetrics() {
      if (heroSection) {
        cachedHeroBottom = heroSection.offsetTop + heroSection.offsetHeight;
      }
    }
    cacheLayoutMetrics();
    window.addEventListener('resize', cacheLayoutMetrics, { passive: true });

    function updateActiveNavLink() {
      const sectionIds = ['contact', 'band', 'tour', 'performances', 'hero'];
      let activeId = 'hero';

      for (const id of sectionIds) {
        const sec = document.getElementById(id);
        if (sec) {
          const rect = sec.getBoundingClientRect();
          if (rect.top <= 160 && rect.bottom > 80) {
            activeId = id;
            break;
          }
        }
      }

      const desktopNavLinks = document.querySelectorAll('.desktop-nav .nav-link');
      desktopNavLinks.forEach(link => {
        const href = link.getAttribute('href');
        if (href === `#${activeId}`) {
          link.classList.add('active');
        } else {
          link.classList.remove('active');
        }
      });
    }

    function updateScrollMetrics(scrollY) {
      const currentScroll = typeof scrollY === 'number' ? scrollY : (window.scrollY || window.pageYOffset || document.documentElement.scrollTop || 0);

      // Header white/transparent state: transparent on hero, white on Section 2 and all following sections
      updateHeaderTheme();

      // Synchronize active link to current section
      updateActiveNavLink();

      // 1. Progress Bar
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (docHeight > 0 && progressBar) {
        const pct = Math.min(100, Math.max(0, (currentScroll / docHeight) * 100));
        progressBar.style.width = pct + '%';
      }
    }

    // 2. IntersectionObserver for Section Entry Animations (immediate reveal, no waiting)
    const revealSections = document.querySelectorAll('.reveal-section');
    function syncSectionVisibility() {
      const vh = window.innerHeight || document.documentElement.clientHeight;
      revealSections.forEach(sec => {
        if (!sec.classList.contains('section-visible')) {
          const rect = sec.getBoundingClientRect();
          if (rect.top < vh + 120 && rect.bottom > -100) {
            sec.classList.add('section-visible');
          }
        }
      });
      if (perfSection) {
        const rect = perfSection.getBoundingClientRect();
        if (rect.top < vh && rect.bottom > 0) {
          perfSection.classList.add('perf-in-view');
        }
      }
    }

    if ('IntersectionObserver' in window) {
      const sectionObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('section-visible');
            observer.unobserve(entry.target);
          }
        });
      }, {
        threshold: 0.05,
        rootMargin: '0px 0px 50px 0px'
      });

      revealSections.forEach(sec => sectionObserver.observe(sec));

      // Also observe Performances section entry
      if (perfSection) {
        const perfObserver = new IntersectionObserver((entries) => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              perfSection.classList.add('perf-in-view');
            } else {
              perfSection.classList.remove('perf-in-view');
            }
          });
        }, { threshold: 0.08 });
        perfObserver.observe(perfSection);
      }
    } else {
      revealSections.forEach(sec => sec.classList.add('section-visible'));
    }

    // Run synchronous check on scroll & load, plus fail-safe timer
    syncSectionVisibility();
    window.addEventListener('scroll', syncSectionVisibility, { passive: true });
    setTimeout(() => {
      revealSections.forEach(sec => sec.classList.add('section-visible'));
    }, 1200);

    // 3. Smooth Anchor Link Scrolling (Lenis + Native fallback)
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', (e) => {
        const href = anchor.getAttribute('href');
        if (!href || href === '#' || href.length < 2) return;
        const targetEl = document.querySelector(href);
        if (targetEl) {
          e.preventDefault();
          const targetOffset = (href === '#hero' || href === '#top') ? 0 : -70;

          // Immediate header background toggle on nav click
          if (mainHeader) {
            if (href === '#hero' || href === '#top') {
              mainHeader.classList.remove('scrolled');
            } else {
              mainHeader.classList.add('scrolled');
            }
          }

          // Update active nav indicator on click
          document.querySelectorAll('.desktop-nav .nav-link').forEach(link => {
            link.classList.toggle('active', link.getAttribute('href') === href);
          });

          if (lenis) {
            lenis.scrollTo(targetEl, {
              offset: targetOffset,
              duration: 1.2,
              easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t))
            });
          } else {
            const top = (href === '#hero' || href === '#top') ? 0 : targetEl.getBoundingClientRect().top + window.pageYOffset - 70;
            window.scrollTo({
              top: Math.max(0, top),
              behavior: 'smooth'
            });
          }

          // If mobile drawer open, close it
          const mobileMenu = document.getElementById('mobile-menu');
          const mobileToggle = document.getElementById('mobile-toggle-btn');
          if (mobileMenu && mobileMenu.classList.contains('open')) {
            mobileMenu.classList.remove('open');
            if (mobileToggle) mobileToggle.classList.remove('active');
            document.body.classList.remove('menu-locked');
          }
        }
      });
    });

    // Run initial sync
    setTimeout(() => {
      updateScrollMetrics(window.scrollY || 0);
    }, 100);
  }


  // Initialize Smooth Scrolling & Section Entry Engine!
  initSmoothScrollAndSectionEntryEngine();

    // Initialize Performances Section!
  initPerformancesShowcase();

  // Universal Audio Unlock on First Touch / Click on Any Mobile & Desktop Device
  const unlockAudio = () => {
    initAudioContext();
  };
  window.addEventListener('touchstart', unlockAudio, { once: true, passive: true });
  window.addEventListener('click', unlockAudio, { once: true, passive: true });

  // Universal Tactile Feedback (Click & Touch) on All Action Buttons Across All Devices
  const interactiveSelectors = [
    '.btn',
    '.social-pill',
    '#mobile-toggle-btn',
    '#audio-toggle-btn',
    '#skip-intro-btn',
    '#replay-intro-btn',
    '#mobile-replay-btn',
    '#footer-replay-btn',
    '#swap-logo-btn',
    '#mobile-swap-btn',
    '.theme-btn',
    '.modal-close-btn',
    '#qty-minus',
    '#qty-plus',
    '#confirm-ticket-btn',
    '#epass-done-btn',
    '.nav-link',
    '.mobile-link',
    '.brand-link'
  ];

  document.querySelectorAll(interactiveSelectors.join(',')).forEach(el => {
    el.addEventListener('click', () => {
      initAudioContext();
      playClickTick();
    });
  });

  // Screen Orientation Lock for Mobile View
  try {
    if (screen.orientation && typeof screen.orientation.lock === 'function') {
      screen.orientation.lock('portrait').catch(() => {});
    }
  } catch (_) {}

}
 
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initAlphaBandApp);
} else {
  initAlphaBandApp();
}

