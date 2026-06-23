/* ============================================================
   VAELTHAR — Router
   /js/core/router.js | v1.0

   Lightweight client-side router for a multi-page app (MPA).
   VAELTHAR uses .html files per page, not a true SPA —
   so this router handles:

   - Programmatic navigation with history pushState
   - Back/forward support
   - Route metadata (title, auth requirements, accent color)
   - Navigation guards (runs auth check before transitions)
   - Page transition animation (fade)
   - Active link highlighting in the sidebar
   - Scroll restoration
   ============================================================ */

import { initAuth, requireAuth, requireGuest, requireAdmin } from './auth.js';


/* ----------------------------------------------------------
   ROUTE DEFINITIONS
   Every page is listed here.
   guard: 'auth' | 'guest' | 'admin' | null
---------------------------------------------------------- */

export const ROUTES = {

  /* --- Public / Guest --- */
  '/index.html': {
    title:  'VAELTHAR',
    guard:  'guest',
    accent: '#ff9500',
  },
  '/': {
    title:  'VAELTHAR',
    guard:  'guest',
    accent: '#ff9500',
  },
  '/login.html': {
    title:  'Sign In — VAELTHAR',
    guard:  'guest',
    accent: '#7c3aed',
  },
  '/register.html': {
    title:  'Create Account — VAELTHAR',
    guard:  'guest',
    accent: '#ff006e',
  },

  /* --- Onboarding (auth required, no onboarding check) --- */
  '/onboarding.html': {
    title:  'Getting Started — VAELTHAR',
    guard:  'auth-no-onboarding-check',
    accent: '#00f5ff',
  },

  /* --- In-App (auth required) --- */
  '/dashboard.html': {
    title:  'Dashboard — VAELTHAR',
    guard:  'auth',
    accent: '#00f5ff',
  },
  '/profile.html': {
    title:  'Profile — VAELTHAR',
    guard:  'auth',
    accent: '#0066ff',
  },
  '/quest.html': {
    title:  'Quests — VAELTHAR',
    guard:  'auth',
    accent: '#ffee00',
  },
  '/habit.html': {
    title:  'Habits — VAELTHAR',
    guard:  'auth',
    accent: '#00f5ff',
  },
  '/role.html': {
    title:  'Role — VAELTHAR',
    guard:  'auth',
    accent: '#00f5ff',
  },
  '/shop.html': {
    title:  'Shop — VAELTHAR',
    guard:  'auth',
    accent: '#00e5cc',
  },
  '/topup.html': {
    title:  'Top Up — VAELTHAR',
    guard:  'auth',
    accent: '#00e5cc',
  },
  '/guild.html': {
    title:  'Guild — VAELTHAR',
    guard:  'auth',
    accent: '#ffd700',
  },
  '/party.html': {
    title:  'Party — VAELTHAR',
    guard:  'auth',
    accent: '#00f5ff',
  },
  '/ranking.html': {
    title:  'Ranking — VAELTHAR',
    guard:  'auth',
    accent: '#ff9500',
  },
  '/chat.html': {
    title:  'Chat — VAELTHAR',
    guard:  'auth',
    accent: '#ff6eb0',
  },
  '/market.html': {
    title:  'Market — VAELTHAR',
    guard:  'auth',
    accent: '#00e5cc',
  },
  '/kyc.html': {
    title:  'Verify Identity — VAELTHAR',
    guard:  'auth',
    accent: '#6644ff',
  },
  '/blacklist.html': {
    title:  'Blacklist — VAELTHAR',
    guard:  null,   /* public — no auth required */
    accent: '#ff003c',
  },
  '/achievement.html': {
    title:  'Achievements — VAELTHAR',
    guard:  'auth',
    accent: '#c0c0c0',
  },
  '/mood.html': {
    title:  'Mood — VAELTHAR',
    guard:  'auth',
    accent: '#00f5ff',
  },
  '/checkin.html': {
    title:  'Check In — VAELTHAR',
    guard:  'auth',
    accent: '#00ff88',
  },
  '/friend.html': {
    title:  'Friends — VAELTHAR',
    guard:  'auth',
    accent: '#00f5ff',
  },
  '/gift.html': {
    title:  'Gifts — VAELTHAR',
    guard:  'auth',
    accent: '#00f5ff',
  },
  '/notification.html': {
    title:  'Notifications — VAELTHAR',
    guard:  'auth',
    accent: '#00f5ff',
  },
  '/season.html': {
    title:  'Season — VAELTHAR',
    guard:  'auth',
    accent: '#00f5ff',
  },
  '/tournament.html': {
    title:  'Tournament — VAELTHAR',
    guard:  'auth',
    accent: '#00f5ff',
  },
  '/support.html': {
    title:  'Support — VAELTHAR',
    guard:  'auth',
    accent: '#00f5ff',
  },
  '/terms.html': {
    title:  'Terms of Service — VAELTHAR',
    guard:  null,
    accent: '#00f5ff',
  },
  '/privacy.html': {
    title:  'Privacy Policy — VAELTHAR',
    guard:  null,
    accent: '#00f5ff',
  },
  '/pvp.html': {
    title:  'PvP — VAELTHAR',
    guard:  'auth',
    accent: '#ff003c',
  },

  /* --- Admin --- */
  '/admin/index.html': {
    title:  'Admin Dashboard — VAELTHAR',
    guard:  'admin',
    accent: '#ff9500',
  },
  '/admin/users.html': {
    title:  'Users — Admin',
    guard:  'admin',
    accent: '#ff9500',
  },
  '/admin/quests.html': {
    title:  'Quests — Admin',
    guard:  'admin',
    accent: '#ff9500',
  },
  '/admin/topup.html': {
    title:  'Top-Up Approvals — Admin',
    guard:  'admin',
    accent: '#ff9500',
  },
  '/admin/reports.html': {
    title:  'Reports — Admin',
    guard:  'admin',
    accent: '#ff9500',
  },
  '/admin/kyc-review.html': {
    title:  'KYC Review — Admin',
    guard:  'admin',
    accent: '#ff9500',
  },
  '/admin/blacklist.html': {
    title:  'Blacklist — Admin',
    guard:  'admin',
    accent: '#ff9500',
  },
  '/admin/analytics.html': {
    title:  'Analytics — Admin',
    guard:  'admin',
    accent: '#ff9500',
  },
  '/admin/season.html': {
    title:  'Season — Admin',
    guard:  'admin',
    accent: '#ff9500',
  },
  '/admin/events.html': {
    title:  'Events — Admin',
    guard:  'admin',
    accent: '#ff9500',
  },
};


/* ----------------------------------------------------------
   ROUTER STATE
---------------------------------------------------------- */

let _currentPath  = window.location.pathname;
let _transitioning = false;
const _scrollCache = new Map(); /* path → scrollY */


/* ----------------------------------------------------------
   NAVIGATE
   The main entry point. Call this from any link or button.

   @param {string}  path        — absolute path, e.g. '/dashboard.html'
   @param {Object}  [options]
   @param {boolean} [options.replace=false]  — use replaceState instead of push
   @param {Object}  [options.state={}]       — extra state stored in history
---------------------------------------------------------- */

export async function navigate(path, { replace = false, state = {} } = {}) {
  if (_transitioning) return;
  if (path === _currentPath) return;

  _transitioning = true;

  /* 1. Save scroll position of current page */
  _scrollCache.set(_currentPath, window.scrollY);

  /* 2. Run guard for destination */
  const allowed = await _runGuard(path);
  if (!allowed) {
    _transitioning = false;
    return;
  }

  /* 3. Page-out animation */
  await _fadeOut();

  /* 4. Push / replace history */
  const historyState = { path, ...state };
  if (replace) {
    history.replaceState(historyState, '', path);
  } else {
    history.pushState(historyState, '', path);
  }

  /* 5. Navigate (MPA — full page load at new URL) */
  window.location.href = path;
}

/**
 * Go back one step in history.
 */
export function back() {
  history.back();
}

/**
 * Go forward one step in history.
 */
export function forward() {
  history.forward();
}

/**
 * Replace current entry without adding to history stack.
 * @param {string} path
 */
export function replace(path) {
  return navigate(path, { replace: true });
}


/* ----------------------------------------------------------
   INIT
   Call once on DOMContentLoaded on every page.
   Sets page title, applies accent colour, highlights active
   sidebar links, and wires up all [data-link] anchors.

   @example
   import { initRouter } from '/js/core/router.js';
   document.addEventListener('DOMContentLoaded', () => initRouter());
---------------------------------------------------------- */

export async function initRouter() {
  await initAuth();

  const path  = window.location.pathname;
  const route = _getRoute(path);

  /* Set document title */
  if (route?.title) document.title = route.title;

  /* Apply accent colour to :root --accent if not already set by page CSS */
  if (route?.accent) {
    const root = document.documentElement;
    if (!root.style.getPropertyValue('--accent')) {
      root.style.setProperty('--accent', route.accent);
    }
  }

  /* Highlight active links */
  _updateActiveLinks(path);

  /* Wire data-link anchors */
  _bindLinks();

  /* Restore scroll position if navigating back */
  const saved = _scrollCache.get(path);
  if (saved) window.scrollTo(0, saved);

  /* Handle browser back/forward */
  window.addEventListener('popstate', _onPopState);

  /* Fade in */
  _fadeIn();
}


/* ----------------------------------------------------------
   ACTIVE LINK HIGHLIGHTING
   Marks sidebar links with .nav-link--active when their
   href matches the current path.
---------------------------------------------------------- */

export function _updateActiveLinks(path) {
  document.querySelectorAll('[data-nav-link]').forEach(el => {
    const href = el.getAttribute('href') || el.dataset.href;
    const isActive = href && (href === path || path.startsWith(href.replace('.html', '')));
    el.classList.toggle('nav-link--active', isActive);
    el.setAttribute('aria-current', isActive ? 'page' : 'false');
  });
}


/* ----------------------------------------------------------
   LINK INTERCEPTION
   Intercepts clicks on elements with [data-link] or
   standard <a> tags pointing to same-origin pages.
   Prevents full reload when within MPA context.
---------------------------------------------------------- */

function _bindLinks() {
  document.addEventListener('click', (e) => {
    const anchor = e.target.closest('a[href], [data-link]');
    if (!anchor) return;

    const href = anchor.getAttribute('href') || anchor.dataset.link;
    if (!href) return;

    /* Only intercept same-origin, non-hash, non-external links */
    if (
      href.startsWith('http') ||
      href.startsWith('mailto') ||
      href.startsWith('#') ||
      anchor.target === '_blank'
    ) return;

    e.preventDefault();
    navigate(href);
  });
}


/* ----------------------------------------------------------
   GUARDS — internal
---------------------------------------------------------- */

async function _runGuard(path) {
  const route = _getRoute(path);
  if (!route) return true; /* Unknown route — let it load */

  switch (route.guard) {
    case 'auth': {
      const state = await requireAuth();
      return state !== null;
    }
    case 'auth-no-onboarding-check': {
      /* Auth required but skip the onboarding redirect loop */
      const { getSession } = await import('./api.js');
      const session = await getSession();
      if (!session) { window.location.href = '/login.html'; return false; }
      return true;
    }
    case 'guest': {
      const state = await requireGuest();
      return state !== null;
    }
    case 'admin': {
      const state = await requireAdmin();
      return state !== null;
    }
    default:
      return true;
  }
}


/* ----------------------------------------------------------
   PAGE TRANSITIONS — CSS-driven fade
---------------------------------------------------------- */

function _fadeOut() {
  return new Promise(resolve => {
    const el = document.getElementById('page-root') || document.body;
    el.style.transition = 'opacity 120ms ease-in';
    el.style.opacity    = '0';
    setTimeout(resolve, 130);
  });
}

function _fadeIn() {
  const el = document.getElementById('page-root') || document.body;
  el.style.opacity    = '0';
  el.style.transition = 'opacity 220ms ease-out';
  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      el.style.opacity = '1';
    });
  });
}


/* ----------------------------------------------------------
   POPSTATE — back / forward button
---------------------------------------------------------- */

async function _onPopState(e) {
  const path = window.location.pathname;

  const allowed = await _runGuard(path);
  if (!allowed) return;

  _currentPath = path;
  _updateActiveLinks(path);

  /* Restore scroll */
  const saved = _scrollCache.get(path);
  if (saved !== undefined) window.scrollTo(0, saved);
}


/* ----------------------------------------------------------
   UTILITIES
---------------------------------------------------------- */

/**
 * Returns the route definition for a given path.
 * Falls back to prefix-matching for dynamic paths.
 */
function _getRoute(path) {
  if (ROUTES[path]) return ROUTES[path];

  /* Prefix match — e.g. /admin/anything → /admin/ */
  for (const [routePath, route] of Object.entries(ROUTES)) {
    if (routePath.endsWith('/') && path.startsWith(routePath)) {
      return route;
    }
  }

  return null;
}

/**
 * Returns the current pathname.
 */
export function currentPath() {
  return window.location.pathname;
}

/**
 * Returns true if the given path matches the current location.
 * @param {string} path
 */
export function isActive(path) {
  return window.location.pathname === path;
}

/**
 * Append query params to a path.
 * @param {string} path
 * @param {Object} params
 * @returns {string}
 *
 * @example
 * withQuery('/profile.html', { id: 'abc123' })
 * // → '/profile.html?id=abc123'
 */
export function withQuery(path, params) {
  const qs = new URLSearchParams(params).toString();
  return qs ? `${path}?${qs}` : path;
}

/**
 * Parse query string from current URL.
 * @returns {Object}
 */
export function getQuery() {
  return Object.fromEntries(new URLSearchParams(window.location.search));
}


export default {
  navigate, back, forward, replace,
  initRouter, currentPath, isActive,
  withQuery, getQuery,
  ROUTES,
};
