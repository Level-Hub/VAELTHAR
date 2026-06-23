/* ============================================================
   VAELTHAR — Icon Registry
   icons.js | v1.2 — added vaelthar_mark + vaelthar_logo (Runic Sigil)
   
   Usage:
     import { icon } from '/js/ui/icons.js';
     element.innerHTML = icon('sword');
     element.innerHTML = icon('shield', 20, 'icon--gold');
   ============================================================ */

const ICONS = {

  /* ----------------------------------------------------------
     BRAND — VAELTHAR Logo (Version A — Runic Sigil)
     Usage:
       icon('vaelthar_mark')        — symbol only (sidebar collapsed, favicon)
       icon('vaelthar_logo', 160)   — full lockup with wordmark (login, landing)
  ---------------------------------------------------------- */

  /* Mark only — hexagonal frame + bind-rune V, scales cleanly from 16px to 200px */
  vaelthar_mark: `<svg viewBox="0 0 100 100" fill="none" stroke="currentColor">
    <polygon points="50,4 92,27 92,73 50,96 8,73 8,27" stroke-width="2.5" opacity="0.35"/>
    <polygon points="50,12 84,31 84,69 50,88 16,69 16,31" stroke-width="1" opacity="0.15"/>
    <path d="M28 26 L50 68" stroke-width="5.5" stroke-linecap="round"/>
    <path d="M72 26 L50 68" stroke-width="5.5" stroke-linecap="round"/>
    <line x1="33" y1="42" x2="67" y2="42" stroke-width="3" stroke-linecap="round"/>
    <line x1="21" y1="26" x2="35" y2="26" stroke-width="3" stroke-linecap="round"/>
    <line x1="65" y1="26" x2="79" y2="26" stroke-width="3" stroke-linecap="round"/>
    <circle cx="50" cy="68" r="3" fill="currentColor" stroke="none"/>
  </svg>`,

  /* Full logo lockup — mark + wordmark side by side (use at 160px+ width) */
  vaelthar_logo: `<svg viewBox="0 0 280 80" fill="none">
    <g stroke="currentColor">
      <polygon points="40,3.2 73.6,22.4 73.6,58.4 40,76.8 6.4,58.4 6.4,22.4" stroke-width="2" opacity="0.35"/>
      <polygon points="40,9.6 67.2,24.8 67.2,55.2 40,70.4 12.8,55.2 12.8,24.8" stroke-width="0.8" opacity="0.15"/>
      <path d="M22 21 L40 54" stroke-width="4.4" stroke-linecap="round"/>
      <path d="M58 21 L40 54" stroke-width="4.4" stroke-linecap="round"/>
      <line x1="26" y1="33.6" x2="53.6" y2="33.6" stroke-width="2.4" stroke-linecap="round"/>
      <line x1="16" y1="21" x2="28" y2="21" stroke-width="2.4" stroke-linecap="round"/>
      <line x1="52" y1="21" x2="64" y2="21" stroke-width="2.4" stroke-linecap="round"/>
      <circle cx="40" cy="54" r="2.4" fill="currentColor" stroke="none"/>
    </g>
    <text x="90" y="44"
      font-family="Cinzel, Georgia, serif"
      font-size="22"
      font-weight="700"
      letter-spacing="6"
      fill="currentColor"
      dominant-baseline="middle">VAELTHAR</text>
    <text x="91" y="62"
      font-family="Inter, system-ui, sans-serif"
      font-size="7.5"
      font-weight="400"
      letter-spacing="4.5"
      fill="currentColor"
      opacity="0.5"
      dominant-baseline="middle">QUEST PLATFORM</text>
  </svg>`,

  /* ----------------------------------------------------------
     NAVIGATION
  ---------------------------------------------------------- */

  home: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">
    <path d="M3 9.5L12 3l9 6.5V20a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V9.5z"/>
    <path d="M9 21V12h6v9"/>
  </svg>`,

  compass: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">
    <circle cx="12" cy="12" r="9"/>
    <polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76" fill="currentColor" opacity="0.3"/>
    <polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76"/>
  </svg>`,

  map: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">
    <polygon points="1 6 1 22 8 18 16 22 23 18 23 2 16 6 8 2 1 6"/>
    <line x1="8" y1="2" x2="8" y2="18"/>
    <line x1="16" y1="6" x2="16" y2="22"/>
  </svg>`,

  sidebar_open: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">
    <rect x="3" y="3" width="18" height="18" rx="2"/>
    <line x1="9" y1="3" x2="9" y2="21"/>
    <path d="M13 9l3 3-3 3"/>
  </svg>`,

  sidebar_close: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">
    <rect x="3" y="3" width="18" height="18" rx="2"/>
    <line x1="9" y1="3" x2="9" y2="21"/>
    <path d="M15 9l-3 3 3 3"/>
  </svg>`,

  chevron_right: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
    <path d="M9 18l6-6-6-6"/>
  </svg>`,

  chevron_left: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
    <path d="M15 18l-6-6 6-6"/>
  </svg>`,

  chevron_down: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
    <path d="M6 9l6 6 6-6"/>
  </svg>`,

  chevron_up: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
    <path d="M18 15l-6-6-6 6"/>
  </svg>`,

  arrow_right: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">
    <path d="M5 12h14M12 5l7 7-7 7"/>
  </svg>`,

  arrow_left: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">
    <path d="M19 12H5M12 19l-7-7 7-7"/>
  </svg>`,

  external_link: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">
    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
    <polyline points="15 3 21 3 21 9"/>
    <line x1="10" y1="14" x2="21" y2="3"/>
  </svg>`,

  /* ----------------------------------------------------------
     GAME — CORE
  ---------------------------------------------------------- */

  sword: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">
    <polyline points="14.5 17.5 3 6 3 3 6 3 17.5 14.5"/>
    <line x1="13" y1="19" x2="19" y2="13"/>
    <line x1="16" y1="16" x2="20" y2="20"/>
    <line x1="19" y1="21" x2="21" y2="19"/>
  </svg>`,

  /* shield — kite shield with horizontal bar, distinct from warden hex and paladin cross */
  shield: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">
    <path d="M12 21l-7-5V4l7-2 7 2v12z"/>
    <line x1="5" y1="10" x2="19" y2="10"/>
  </svg>`,

  crown: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">
    <path d="M2 20h20"/>
    <path d="M4 20l2-8 6 5 6-5 2 8"/>
    <circle cx="4" cy="10" r="1.5" fill="currentColor"/>
    <circle cx="12" cy="7" r="1.5" fill="currentColor"/>
    <circle cx="20" cy="10" r="1.5" fill="currentColor"/>
  </svg>`,

  star: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
  </svg>`,

  star_filled: `<svg viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
  </svg>`,

  exp: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">
    <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/>
  </svg>`,

  level: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">
    <polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/>
    <polyline points="17 6 23 6 23 12"/>
  </svg>`,

  trophy: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">
    <polyline points="8 21 12 17 16 21"/>
    <line x1="12" y1="17" x2="12" y2="13"/>
    <path d="M7 4H4v5a5 5 0 0 0 5 5h6a5 5 0 0 0 5-5V4h-3"/>
    <rect x="7" y="2" width="10" height="4" rx="1"/>
  </svg>`,

  /* badge — hexagonal medal tag with a small ring at top, distinct from star-based achievement */
  badge: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">
    <circle cx="12" cy="5" r="2"/>
    <path d="M12 7v1"/>
    <path d="M8 9h8l1 2-2 2v4l-3 2-3-2v-4L7 11z"/>
    <line x1="10" y1="15" x2="14" y2="15"/>
  </svg>`,

  /* scroll — horizontal rolled parchment with curl ends, distinct from flat document terms */
  scroll: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">
    <path d="M19 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h12"/>
    <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2"/>
    <path d="M5 5a2 2 0 0 0-2 2v0a2 2 0 0 0 2 2"/>
    <path d="M5 19a2 2 0 0 1-2-2v0a2 2 0 0 1 2-2"/>
    <line x1="9" y1="9" x2="15" y2="9"/>
    <line x1="9" y1="13" x2="15" y2="13"/>
  </svg>`,

  quest: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">
    <circle cx="12" cy="12" r="10"/>
    <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/>
    <line x1="12" y1="17" x2="12.01" y2="17" stroke-width="2.5"/>
  </svg>`,

  flame: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">
    <path d="M8.5 14.5A4.5 4.5 0 0 0 12 19a4.5 4.5 0 0 0 4.5-4.5c0-1.5-.6-3-1.8-4.2L12 8l-2.7 2.3C8.1 11.5 8.5 13 8.5 14.5z"/>
    <path d="M12 8c0-3-2-5-2-7 3 1 6 4 6 9"/>
  </svg>`,

  dice: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">
    <rect x="2" y="2" width="20" height="20" rx="3"/>
    <circle cx="8" cy="8" r="1.2" fill="currentColor"/>
    <circle cx="16" cy="8" r="1.2" fill="currentColor"/>
    <circle cx="8" cy="16" r="1.2" fill="currentColor"/>
    <circle cx="16" cy="16" r="1.2" fill="currentColor"/>
    <circle cx="12" cy="12" r="1.2" fill="currentColor"/>
  </svg>`,

  crystal: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">
    <polygon points="12 2 19 8 19 16 12 22 5 16 5 8 12 2"/>
    <line x1="12" y1="2" x2="12" y2="22"/>
    <line x1="5" y1="8" x2="19" y2="8"/>
    <line x1="5" y1="16" x2="19" y2="16"/>
  </svg>`,

  coin: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">
    <circle cx="12" cy="12" r="9"/>
    <path d="M12 7v1m0 8v1M9.5 9.5c.5-1 1.5-1.5 2.5-1.5s2.5.5 2.5 2c0 2-5 2-5 4s2 2.5 5 2"/>
  </svg>`,

  /* season — hourglass with orbiting ring, suggests a timed cycle */
  season: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">
    <path d="M5 3h14"/>
    <path d="M5 21h14"/>
    <path d="M5 3l7 9-7 9"/>
    <path d="M19 3l-7 9 7 9"/>
    <ellipse cx="12" cy="12" rx="4" ry="1.5"/>
  </svg>`,

  /* ----------------------------------------------------------
     ROLE ICONS — every shape is distinct
  ---------------------------------------------------------- */

  /* scholar — open book with bookmark */
  scholar: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">
    <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/>
    <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/>
    <line x1="8" y1="7" x2="16" y2="7"/>
    <line x1="8" y1="11" x2="14" y2="11"/>
  </svg>`,

  /* warlord — crossed axes (distinct from sword) */
  warlord: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">
    <path d="M4 4l16 16M20 4L4 20"/>
    <path d="M4 4c0 0 2-2 4 0s0 4 0 4"/>
    <path d="M20 4c0 0 2 2 0 4s-4 0-4 0"/>
    <path d="M4 20c0 0-2 2 0 4"/>
    <path d="M20 20c0 0 2 2 0 4"/>
  </svg>`,

  /* warden — true hexagon ring with a leaf inside (nature guardian) */
  warden: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">
    <path d="M12 2l8.66 5v10L12 22l-8.66-5V7z"/>
    <path d="M12 8c-2 3-1 6 2 7-1-2 0-5 3-6-2 0-4 1-5-1z"/>
    <line x1="12" y1="15" x2="12" y2="19"/>
  </svg>`,

  /* culinart — chef's knife over a cutting board */
  culinart: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">
    <path d="M3 20h18"/>
    <path d="M5 20V10l7-7 7 7v10"/>
    <path d="M9 20v-5h6v5"/>
    <path d="M12 6v4"/>
  </svg>`,

  /* artisan — paint palette with brush */
  artisan: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">
    <path d="M12 2C6.48 2 2 6.48 2 12c0 5 3.5 8 6 8 1.5 0 2-1 2-2 0-.5-.1-1-.1-1.5 0-1 .7-1.5 1.6-1.5H13c3.3 0 6-2.7 6-6 0-4.41-3.13-7-7-7z"/>
    <circle cx="6.5" cy="11.5" r="1" fill="currentColor"/>
    <circle cx="9.5" cy="7.5" r="1" fill="currentColor"/>
    <circle cx="14.5" cy="7.5" r="1" fill="currentColor"/>
    <circle cx="17.5" cy="11.5" r="1" fill="currentColor"/>
  </svg>`,

  /* merchant — coin stack with upward arrow */
  merchant: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">
    <ellipse cx="12" cy="18" rx="7" ry="2"/>
    <ellipse cx="12" cy="14" rx="7" ry="2"/>
    <path d="M5 14v4"/>
    <path d="M19 14v4"/>
    <ellipse cx="12" cy="10" rx="7" ry="2"/>
    <path d="M5 10v4"/>
    <path d="M19 10v4"/>
    <path d="M12 2v5M9.5 4.5L12 2l2.5 2.5"/>
  </svg>`,

  /* envoy — two hands reaching toward each other */
  envoy: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">
    <path d="M4 12v-1a3 3 0 0 1 3-3h2"/>
    <path d="M20 12v-1a3 3 0 0 0-3-3h-2"/>
    <path d="M2 15c0 1.7 1.3 3 3 3h5"/>
    <path d="M22 15c0 1.7-1.3 3-3 3h-5"/>
    <line x1="9" y1="18" x2="15" y2="18"/>
    <circle cx="7" cy="5" r="2"/>
    <circle cx="17" cy="5" r="2"/>
  </svg>`,

  /* ascetic — lotus / seated silhouette with aura rings */
  ascetic: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">
    <circle cx="12" cy="6" r="2"/>
    <path d="M8 22c0-4 8-4 8 0"/>
    <path d="M6 14c0-3 2-5 6-5s6 2 6 5"/>
    <path d="M3 18c1-5 4-8 9-8s8 3 9 8"/>
  </svg>`,

  /* pathfinder — footsteps trail on a path */
  pathfinder: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">
    <path d="M3 20c4-8 14-8 18 0"/>
    <ellipse cx="8" cy="13" rx="1.5" ry="2" transform="rotate(-20 8 13)" fill="currentColor" opacity="0.5"/>
    <ellipse cx="12" cy="11" rx="1.5" ry="2" transform="rotate(20 12 11)" fill="currentColor" opacity="0.5"/>
    <ellipse cx="16" cy="13" rx="1.5" ry="2" transform="rotate(-20 16 13)" fill="currentColor" opacity="0.5"/>
    <circle cx="12" cy="5" r="2"/>
    <path d="M12 7v2"/>
  </svg>`,

  /* chronicler — camera shutter with film frame */
  chronicler: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">
    <rect x="2" y="6" width="20" height="14" rx="2"/>
    <circle cx="12" cy="13" r="4"/>
    <circle cx="12" cy="13" r="1.5" fill="currentColor"/>
    <path d="M8 6V4h8v2"/>
    <line x1="17" y1="10" x2="19" y2="10"/>
  </svg>`,

  /* forgemaster — hammer striking an anvil */
  forgemaster: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">
    <rect x="3" y="16" width="14" height="4" rx="1"/>
    <path d="M3 16h14"/>
    <path d="M7 16V12h6v4"/>
    <rect x="13" y="8" width="7" height="4" rx="1"/>
    <line x1="10" y1="12" x2="14" y2="9"/>
    <line x1="14" y1="6" x2="16" y2="4"/>
  </svg>`,

  /* bard — lute / harp silhouette */
  bard: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">
    <path d="M9 18V5l12-2v13"/>
    <circle cx="6" cy="18" r="3"/>
    <circle cx="18" cy="16" r="3"/>
  </svg>`,

  /* sage — open scroll being held, with reading lines */
  sage: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">
    <path d="M12 20H5a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v5"/>
    <line x1="7" y1="9" x2="17" y2="9"/>
    <line x1="7" y1="13" x2="13" y2="13"/>
    <path d="M15 17l2 2 4-4"/>
  </svg>`,

  /* herald — wing on a foot / speed streaks */
  herald: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">
    <path d="M13 3l-8 9h7l-2 9 10-12h-7l3-6z"/>
    <line x1="2" y1="8" x2="5" y2="8"/>
    <line x1="2" y1="12" x2="4" y2="12"/>
    <line x1="2" y1="16" x2="5" y2="16"/>
  </svg>`,

  /* paladin — heater-cut shield (flat top, pointed bottom) with cross inside */
  paladin: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">
    <path d="M4 4h16v10c0 3.5-4 6-8 8-4-2-8-4.5-8-8V4z"/>
    <line x1="12" y1="8" x2="12" y2="17"/>
    <line x1="8" y1="11.5" x2="16" y2="11.5"/>
  </svg>`,

  /* ----------------------------------------------------------
     SOCIAL
  ---------------------------------------------------------- */

  /* guild — castle turret */
  guild: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">
    <path d="M3 21h18"/>
    <path d="M5 21V7l7-4 7 4v14"/>
    <path d="M9 21v-4a3 3 0 0 1 6 0v4"/>
    <rect x="10" y="9" width="4" height="4"/>
  </svg>`,

  /* party — plus sign inside a group ring (invite / join) */
  party: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">
    <circle cx="9" cy="7" r="3"/>
    <path d="M3 21v-2a5 5 0 0 1 5-5h1"/>
    <circle cx="17" cy="7" r="3" stroke-dasharray="2 2"/>
    <path d="M17 13v6M14 16h6"/>
  </svg>`,

  /* chat — speech bubble with three dots */
  chat: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">
    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
    <circle cx="9" cy="10" r=".8" fill="currentColor"/>
    <circle cx="12" cy="10" r=".8" fill="currentColor"/>
    <circle cx="15" cy="10" r=".8" fill="currentColor"/>
  </svg>`,

  /* friend — heart outline (bonds, not groups) */
  friend: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">
    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
  </svg>`,

  /* gift — wrapped box with ribbon */
  gift: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">
    <polyline points="20 12 20 22 4 22 4 12"/>
    <rect x="2" y="7" width="20" height="5"/>
    <line x1="12" y1="22" x2="12" y2="7"/>
    <path d="M12 7H7.5a2.5 2.5 0 0 1 0-5C11 2 12 7 12 7z"/>
    <path d="M12 7h4.5a2.5 2.5 0 0 0 0-5C13 2 12 7 12 7z"/>
  </svg>`,

  /* mood — face with arched brows and neutral mouth that changes */
  mood: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">
    <circle cx="12" cy="12" r="10"/>
    <path d="M8 14s1.5 2 4 2 4-2 4-2"/>
    <line x1="9" y1="9" x2="9.01" y2="9" stroke-width="2.5"/>
    <line x1="15" y1="9" x2="15.01" y2="9" stroke-width="2.5"/>
  </svg>`,

  /* global — globe with latitude/longitude lines */
  global: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">
    <circle cx="12" cy="12" r="10"/>
    <line x1="2" y1="12" x2="22" y2="12"/>
    <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
  </svg>`,

  /* ----------------------------------------------------------
     ECONOMY
  ---------------------------------------------------------- */

  /* shop — storefront awning */
  shop: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">
    <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/>
    <line x1="3" y1="6" x2="21" y2="6"/>
    <path d="M16 10a4 4 0 0 1-8 0"/>
  </svg>`,

  /* market — two-arrow trade symbol inside a tag */
  market: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">
    <path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"/>
    <circle cx="7" cy="7" r="1.5" fill="currentColor"/>
    <path d="M14 9l-4 4"/>
    <path d="M16 13l-2-2"/>
  </svg>`,

  /* topup — credit card with plus */
  topup: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">
    <rect x="1" y="4" width="22" height="16" rx="2"/>
    <line x1="1" y1="10" x2="23" y2="10"/>
    <line x1="15" y1="15" x2="19" y2="15"/>
    <line x1="17" y1="13" x2="17" y2="17"/>
  </svg>`,

  /* subscription — recurring arrows forming a cycle */
  subscription: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">
    <path d="M17 2l4 4-4 4"/>
    <path d="M3 11V9a4 4 0 0 1 4-4h14"/>
    <path d="M7 22l-4-4 4-4"/>
    <path d="M21 13v2a4 4 0 0 1-4 4H3"/>
  </svg>`,

  /* ----------------------------------------------------------
     TRUST & SAFETY
  ---------------------------------------------------------- */

  /* kyc — identity card with checkmark */
  kyc: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">
    <rect x="2" y="5" width="20" height="14" rx="2"/>
    <circle cx="8" cy="12" r="2.5"/>
    <line x1="13" y1="10" x2="19" y2="10"/>
    <line x1="13" y1="14" x2="17" y2="14"/>
  </svg>`,

  /* verified — star with inner checkmark (distinct from kyc card) */
  verified: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">
    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
    <path d="M9 12l2 2 4-4" stroke-width="1.8"/>
  </svg>`,

  /* blacklist — user with a diagonal bar */
  blacklist: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">
    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
    <circle cx="9" cy="7" r="4"/>
    <line x1="22" y1="3" x2="16" y2="9"/>
    <line x1="16" y1="3" x2="22" y2="9"/>
  </svg>`,

  /* report — flag on a pole */
  report: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">
    <path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z"/>
    <line x1="4" y1="22" x2="4" y2="15"/>
  </svg>`,

  lock: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">
    <rect x="3" y="11" width="18" height="11" rx="2"/>
    <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
  </svg>`,

  unlock: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">
    <rect x="3" y="11" width="18" height="11" rx="2"/>
    <path d="M7 11V7a5 5 0 0 1 9.9-1"/>
  </svg>`,

  eye: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">
    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
    <circle cx="12" cy="12" r="3"/>
  </svg>`,

  eye_off: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">
    <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94"/>
    <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19"/>
    <line x1="1" y1="1" x2="23" y2="23"/>
  </svg>`,

  /* ----------------------------------------------------------
     UI — GENERAL
  ---------------------------------------------------------- */

  user: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
    <circle cx="12" cy="7" r="4"/>
  </svg>`,

  settings: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">
    <circle cx="12" cy="12" r="3"/>
    <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/>
  </svg>`,

  notification: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">
    <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/>
    <path d="M13.73 21a2 2 0 0 1-3.46 0"/>
  </svg>`,

  /* notification_dot — bell with a filled red dot indicator */
  notification_dot: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">
    <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/>
    <path d="M13.73 21a2 2 0 0 1-3.46 0"/>
    <circle cx="18" cy="5" r="3" fill="#e74c3c" stroke="#0a0a0f" stroke-width="2"/>
  </svg>`,

  search: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">
    <circle cx="11" cy="11" r="8"/>
    <line x1="21" y1="21" x2="16.65" y2="16.65"/>
  </svg>`,

  filter: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">
    <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"/>
  </svg>`,

  sort: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">
    <line x1="3" y1="6" x2="21" y2="6"/>
    <line x1="6" y1="12" x2="21" y2="12"/>
    <line x1="9" y1="18" x2="21" y2="18"/>
    <path d="M3 12l-1.5 1.5L3 15"/>
    <path d="M3 18l-1.5-3 3 0"/>
  </svg>`,

  close: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
    <line x1="18" y1="6" x2="6" y2="18"/>
    <line x1="6" y1="6" x2="18" y2="18"/>
  </svg>`,

  check: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
    <polyline points="20 6 9 17 4 12"/>
  </svg>`,

  plus: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
    <line x1="12" y1="5" x2="12" y2="19"/>
    <line x1="5" y1="12" x2="19" y2="12"/>
  </svg>`,

  minus: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
    <line x1="5" y1="12" x2="19" y2="12"/>
  </svg>`,

  edit: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">
    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
    <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
  </svg>`,

  trash: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">
    <polyline points="3 6 5 6 21 6"/>
    <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/>
    <path d="M10 11v6M14 11v6"/>
    <path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2"/>
  </svg>`,

  copy: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">
    <rect x="9" y="9" width="13" height="13" rx="2"/>
    <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/>
  </svg>`,

  upload: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">
    <polyline points="16 16 12 12 8 16"/>
    <line x1="12" y1="12" x2="12" y2="21"/>
    <path d="M20.39 18.39A5 5 0 0 0 18 9h-1.26A8 8 0 1 0 3 16.3"/>
  </svg>`,

  download: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">
    <polyline points="8 17 12 21 16 17"/>
    <line x1="12" y1="12" x2="12" y2="21"/>
    <path d="M20.88 18.09A5 5 0 0 0 18 9h-1.26A8 8 0 1 0 3 16.29"/>
  </svg>`,

  logout: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">
    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/>
    <polyline points="16 17 21 12 16 7"/>
    <line x1="21" y1="12" x2="9" y2="12"/>
  </svg>`,

  info: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">
    <circle cx="12" cy="12" r="10"/>
    <line x1="12" y1="16" x2="12" y2="12"/>
    <line x1="12" y1="8" x2="12.01" y2="8" stroke-width="2.5"/>
  </svg>`,

  /* ----------------------------------------------------------
     WEATHER
  ---------------------------------------------------------- */

  sun: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">
    <circle cx="12" cy="12" r="4"/>
    <line x1="12" y1="2" x2="12" y2="4"/>
    <line x1="12" y1="20" x2="12" y2="22"/>
    <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/>
    <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>
    <line x1="2" y1="12" x2="4" y2="12"/>
    <line x1="20" y1="12" x2="22" y2="12"/>
    <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/>
    <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
  </svg>`,

  /* cloud — puffy cloud, no rain lines */
  cloud: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">
    <path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z"/>
  </svg>`,

  /* rain — cloud + three vertical drop lines below */
  rain: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">
    <line x1="16" y1="13" x2="16" y2="21"/>
    <line x1="8" y1="13" x2="8" y2="21"/>
    <line x1="12" y1="15" x2="12" y2="23"/>
    <path d="M20 16.58A5 5 0 0 0 18 7h-1.26A8 8 0 1 0 4 15.25"/>
  </svg>`,

  /* storm — cloud + lightning bolt (bolt is distinct from exp bolt) */
  storm: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">
    <path d="M19 16.9A5 5 0 0 0 18 7h-1.26a8 8 0 1 0-11.62 9"/>
    <polyline points="13 11 9 17 15 17 11 23"/>
  </svg>`,

  /* fog — three horizontal dashed lines of different widths */
  fog: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">
    <line x1="3" y1="7" x2="21" y2="7"/>
    <line x1="6" y1="12" x2="18" y2="12"/>
    <line x1="2" y1="17" x2="14" y2="17"/>
  </svg>`,

  /* ----------------------------------------------------------
     GPS / LOCATION
  ---------------------------------------------------------- */

  /* pin — teardrop map marker with inner dot */
  pin: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
    <circle cx="12" cy="10" r="3"/>
  </svg>`,

  /* gps — crosshair with pulsing outer ring (distinct from pin teardrop) */
  gps: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">
    <circle cx="12" cy="12" r="3"/>
    <circle cx="12" cy="12" r="7" stroke-dasharray="3 2"/>
    <line x1="12" y1="2" x2="12" y2="5"/>
    <line x1="12" y1="19" x2="12" y2="22"/>
    <line x1="2" y1="12" x2="5" y2="12"/>
    <line x1="19" y1="12" x2="22" y2="12"/>
  </svg>`,

  /* territory — flag staked into ground with boundary lines */
  territory: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">
    <line x1="4" y1="22" x2="4" y2="4"/>
    <path d="M4 4l14 4-14 4"/>
    <path d="M2 22h20"/>
    <path d="M8 22v-4"/>
    <path d="M16 22v-4"/>
  </svg>`,

  /* ----------------------------------------------------------
     ADMIN
  ---------------------------------------------------------- */

  /* analytics — bar chart with upward trend line */
  analytics: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">
    <line x1="18" y1="20" x2="18" y2="10"/>
    <line x1="12" y1="20" x2="12" y2="4"/>
    <line x1="6" y1="20" x2="6" y2="14"/>
    <line x1="2" y1="20" x2="22" y2="20"/>
  </svg>`,

  /* users_admin — three overlapping silhouettes */
  users_admin: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">
    <circle cx="9" cy="7" r="3"/>
    <path d="M3 21v-2a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v2"/>
    <circle cx="17" cy="6" r="2.5"/>
    <path d="M21 20v-1.5a3.5 3.5 0 0 0-2.5-3.36"/>
  </svg>`,

  /* world_boss — skull-like geometric threat symbol */
  world_boss: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">
    <circle cx="12" cy="10" r="7"/>
    <path d="M9 17v2a1 1 0 0 0 1 1h4a1 1 0 0 0 1-1v-2"/>
    <line x1="10" y1="19" x2="10" y2="21"/>
    <line x1="14" y1="19" x2="14" y2="21"/>
    <circle cx="9.5" cy="9" r="1.5" fill="currentColor"/>
    <circle cx="14.5" cy="9" r="1.5" fill="currentColor"/>
    <path d="M9 13h6"/>
  </svg>`,

  /* ranking — podium with ascending columns + crown on top */
  ranking: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">
    <rect x="2" y="13" width="5" height="8"/>
    <rect x="9" y="9" width="6" height="12"/>
    <rect x="17" y="16" width="5" height="5"/>
    <path d="M9 9V7l3-3 3 3v2"/>
  </svg>`,

  /* support — headset / earphone silhouette */
  support: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">
    <path d="M3 18v-6a9 9 0 0 1 18 0v6"/>
    <path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3z"/>
    <path d="M3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z"/>
  </svg>`,

  /* habit — calendar grid with a check, distinct from achievement (which has a ribbon) */
  habit: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">
    <rect x="3" y="4" width="18" height="18" rx="2"/>
    <line x1="16" y1="2" x2="16" y2="6"/>
    <line x1="8" y1="2" x2="8" y2="6"/>
    <line x1="3" y1="10" x2="21" y2="10"/>
    <path d="M9 16l2 2 4-4"/>
  </svg>`,

  /* achievement — rosette / multi-pointed star with inner ring */
  achievement: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">
    <path d="M12 2l2.09 6.26H21l-5.47 3.97 2.09 6.26L12 14.5l-5.62 4 2.09-6.27L3 8.26h6.91L12 2z"/>
    <circle cx="12" cy="12" r="3"/>
  </svg>`,

  /* terms — document with ruled lines and a corner fold */
  terms: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
    <polyline points="14 2 14 8 20 8"/>
    <line x1="16" y1="13" x2="8" y2="13"/>
    <line x1="16" y1="17" x2="8" y2="17"/>
    <line x1="10" y1="9" x2="8" y2="9"/>
  </svg>`,

  /* privacy — eye inside a lock body (data privacy concept, no shield shape) */
  privacy: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">
    <rect x="3" y="10" width="18" height="12" rx="2"/>
    <path d="M7 10V7a5 5 0 0 1 10 0v3"/>
    <path d="M8 16s1.3 2 4 2 4-2 4-2"/>
    <circle cx="12" cy="16" r="1.5" fill="currentColor"/>
  </svg>`,

  /* tournament — cup with two side handles and a bracket line */
  tournament: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">
    <path d="M6 9H3V4h18v5h-3"/>
    <path d="M6 4v7a6 6 0 0 0 12 0V4"/>
    <line x1="12" y1="17" x2="12" y2="21"/>
    <line x1="8" y1="21" x2="16" y2="21"/>
  </svg>`,

  /* onboarding — compass rose / direction indicator for "getting started" */
  onboarding: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">
    <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"/>
    <circle cx="12" cy="12" r="4"/>
    <circle cx="12" cy="12" r="1.5" fill="currentColor"/>
  </svg>`,

};

/* ============================================================
   PUBLIC API
   ============================================================ */

/**
 * Returns an SVG string for the given icon name.
 * @param {string} name       - Icon key from the ICONS registry
 * @param {number} [size=20]  - Width and height in px
 * @param {string} [cls='']   - Extra CSS classes to add to the svg element
 * @returns {string}          - SVG markup string
 */
export function icon(name, size = 20, cls = '') {
  const svg = ICONS[name];
  if (!svg) {
    console.warn(`[VAELTHAR icons] Unknown icon: "${name}"`);
    return '';
  }
  return svg.replace(
    '<svg ',
    `<svg width="${size}" height="${size}" class="icon${cls ? ' ' + cls : ''}" aria-hidden="true" focusable="false" `
  );
}

/**
 * Injects an icon directly into a DOM element.
 * @param {HTMLElement} el  - Target element
 * @param {string} name     - Icon key
 * @param {number} [size]   - Size in px
 * @param {string} [cls]    - Extra CSS classes
 */
export function renderIcon(el, name, size = 20, cls = '') {
  if (!el) return;
  el.innerHTML = icon(name, size, cls);
}

/**
 * Returns all registered icon names.
 * @returns {string[]}
 */
export function listIcons() {
  return Object.keys(ICONS);
}

export default { icon, renderIcon, listIcons };
