/* ============================================================
   VAELTHAR — Sidebar Navigation
   /js/ui/sidebar.js | v1.0

   Renders the shared sidebar on every in-app page.
   Reads auth state from storage.js (no extra DB call).
   Accent colour comes from each page's CSS --accent variable.

   Usage (every in-app page):
     import { initSidebar } from '/js/ui/sidebar.js';
     document.addEventListener('DOMContentLoaded', () => initSidebar());
   ============================================================ */

import { icon }                            from '/icons.js';
import { currentState, logout }            from '/auth.js';
import { store, STATE, getSidebarCollapsed, setSidebarCollapsed } from '/storage.js';
import { navigate, _updateActiveLinks }    from '/router.js';


/* ----------------------------------------------------------
   NAV ITEMS — in display order
   Grouped by section. Separator drawn between groups.
---------------------------------------------------------- */

const NAV = [
  /* --- Core --- */
  { key: 'dashboard',    label: 'Dashboard',    href: '/dashboard.html',    icon: 'home'         },
  { key: 'quest',        label: 'Quests',        href: '/quest.html',        icon: 'quest'        },
  { key: 'habit',        label: 'Habits',        href: '/habit.html',        icon: 'habit'        },
  { key: 'achievement',  label: 'Achievements',  href: '/achievement.html',  icon: 'achievement'  },

  { _sep: true },

  /* --- Social --- */
  { key: 'guild',        label: 'Guild',         href: '/guild.html',        icon: 'guild'        },
  { key: 'party',        label: 'Party',         href: '/party.html',        icon: 'party'        },
  { key: 'ranking',      label: 'Ranking',       href: '/ranking.html',      icon: 'ranking'      },
  { key: 'chat',         label: 'Chat',          href: '/chat.html',         icon: 'chat'         },
  { key: 'friend',       label: 'Friends',       href: '/friend.html',       icon: 'friend'       },

  { _sep: true },

  /* --- Economy --- */
  { key: 'shop',         label: 'Shop',          href: '/shop.html',         icon: 'shop'         },
  { key: 'market',       label: 'Market',        href: '/market.html',       icon: 'market'       },
  { key: 'topup',        label: 'Top Up',        href: '/topup.html',        icon: 'topup'        },

  { _sep: true },

  /* --- World --- */
  { key: 'checkin',      label: 'Check In',      href: '/checkin.html',      icon: 'pin'          },
  { key: 'season',       label: 'Season',        href: '/season.html',       icon: 'season'       },
  { key: 'tournament',   label: 'Tournament',    href: '/tournament.html',   icon: 'tournament'   },
  { key: 'mood',         label: 'Mood',          href: '/mood.html',         icon: 'mood'         },
];

/* Bottom-pinned items — always visible at foot of sidebar */
const NAV_BOTTOM = [
  { key: 'notification', label: 'Notifications', href: '/notification.html', icon: 'notification' },
  { key: 'support',      label: 'Support',       href: '/support.html',      icon: 'support'      },
  { key: 'settings',     label: 'Settings',      href: '/settings.html',     icon: 'settings'     },
];


/* ----------------------------------------------------------
   BADGE COUNTERS
   Keys watched on the reactive store → badge count on nav item.
   Value = 0 hides the badge.
---------------------------------------------------------- */

const BADGE_MAP = {
  notification: STATE.UNREAD_NOTIFS,
  chat:         STATE.UNREAD_CHAT,
};


/* ----------------------------------------------------------
   RENDER
---------------------------------------------------------- */

let _sidebarEl    = null;
let _collapsed    = false;
let _storeUnsubs  = [];

export async function initSidebar() {
  _collapsed = getSidebarCollapsed();

  const { user, profile } = currentState();
  if (!user || !profile) return; /* Guard — only render for authenticated users */

  _sidebarEl = _build(profile);
  document.body.prepend(_sidebarEl);

  _applyCollapsed(_collapsed);
  _updateActiveLinks(window.location.pathname);

  /* Watch store for badge updates */
  for (const [navKey, stateKey] of Object.entries(BADGE_MAP)) {
    const unsub = store.watch(stateKey, (count) => {
      _updateBadge(navKey, count || 0);
    });
    _storeUnsubs.push(unsub);
  }

  /* Watch profile changes (EXP, level, avatar) */
  const profileUnsub = store.watch(STATE.PROFILE, (p) => {
    if (p) _refreshProfile(p);
  });
  _storeUnsubs.push(profileUnsub);

  return _sidebarEl;
}


/* ----------------------------------------------------------
   BUILD DOM
---------------------------------------------------------- */

function _build(profile) {
  const sidebar = document.createElement('aside');
  sidebar.id        = 'sidebar';
  sidebar.className = 'sidebar';
  sidebar.setAttribute('aria-label', 'Main navigation');

  sidebar.innerHTML = `
    <!-- Logo + Toggle -->
    <div class="sidebar__header">
      <a href="/dashboard.html" class="sidebar__logo" aria-label="Go to Dashboard">
        <span class="sidebar__logo-icon">${icon('crown', 22)}</span>
        <span class="sidebar__logo-text font-display tracking-widest">VAELTHAR</span>
      </a>
      <button id="sidebar-toggle" class="btn-ghost sidebar__toggle" aria-label="Toggle sidebar">
        ${icon('sidebar_close', 18)}
      </button>
    </div>

    <!-- Player card -->
    <div class="sidebar__player" id="sidebar-player">
      ${_buildPlayerCard(profile)}
    </div>

    <!-- Nav -->
    <nav class="sidebar__nav" aria-label="Game navigation">
      <ul class="sidebar__list" role="list">
        ${_buildNavItems(NAV)}
      </ul>
    </nav>

    <!-- Bottom nav -->
    <div class="sidebar__bottom">
      <ul class="sidebar__list" role="list">
        ${_buildNavItems(NAV_BOTTOM)}
        <li class="sidebar__item">
          <button class="sidebar__link sidebar__link--logout" id="sidebar-logout" aria-label="Sign out">
            ${icon('logout', 18)}
            <span class="sidebar__label">Sign Out</span>
          </button>
        </li>
      </ul>
    </div>
  `;

  /* Bind toggle */
  sidebar.querySelector('#sidebar-toggle').addEventListener('click', _toggleCollapse);

  /* Bind logout */
  sidebar.querySelector('#sidebar-logout').addEventListener('click', async () => {
    const { confirm } = await import('./modal.js');
    const ok = await confirm('Sign Out?', 'You will be returned to the login page.', {
      confirmLabel: 'Sign Out',
      danger: true,
    });
    if (ok) logout();
  });

  /* Bind nav links */
  sidebar.querySelectorAll('.sidebar__link[data-href]').forEach(el => {
    el.addEventListener('click', (e) => {
      e.preventDefault();
      navigate(el.dataset.href);
    });
  });

  return sidebar;
}

function _buildPlayerCard(profile) {
  const level  = profile.level  ?? 1;
  const exp    = profile.exp    ?? 0;
  const expMax = _expToNextLevel(level);
  const pct    = Math.min(100, Math.round((exp / expMax) * 100));
  const name   = _escape(profile.display_name || 'Adventurer');

  return `
    <div class="sidebar__avatar-wrap">
      <img
        src="${profile.avatar_url || '/assets/default-avatar.png'}"
        alt="${name}'s avatar"
        class="avatar avatar--md sidebar__avatar"
        onerror="this.src='/assets/default-avatar.png'"
      />
      <span class="level-chip sidebar__level">${level}</span>
    </div>
    <div class="sidebar__player-info">
      <a href="/profile.html" class="sidebar__player-name" data-nav-link href="/profile.html">
        ${name}
      </a>
      <div class="exp-bar-wrap">
        <div class="exp-bar-track">
          <div class="exp-bar-fill" style="width:${pct}%" id="sidebar-exp-fill"></div>
        </div>
        <div class="row-between" style="margin-top:2px">
          <span class="text-xs text-muted font-data">${exp.toLocaleString()} EXP</span>
          <span class="text-xs text-muted font-data" id="sidebar-exp-max">${expMax.toLocaleString()}</span>
        </div>
      </div>
    </div>
  `;
}

function _buildNavItems(items) {
  return items.map(item => {
    if (item._sep) {
      return `<li class="sidebar__sep" role="separator"></li>`;
    }

    const hasBadge = item.key in BADGE_MAP;

    return `
      <li class="sidebar__item">
        <a
          class="sidebar__link"
          data-href="${item.href}"
          data-nav-link
          href="${item.href}"
          aria-label="${_escape(item.label)}"
          title="${_escape(item.label)}"
        >
          <span class="sidebar__icon">${icon(item.icon, 18)}</span>
          <span class="sidebar__label">${_escape(item.label)}</span>
          ${hasBadge ? `<span class="sidebar__badge" id="badge-${item.key}" hidden>0</span>` : ''}
        </a>
      </li>
    `;
  }).join('');
}


/* ----------------------------------------------------------
   COLLAPSE / EXPAND
---------------------------------------------------------- */

function _toggleCollapse() {
  _collapsed = !_collapsed;
  setSidebarCollapsed(_collapsed);
  _applyCollapsed(_collapsed);
}

function _applyCollapsed(collapsed) {
  if (!_sidebarEl) return;

  const toggleBtn = _sidebarEl.querySelector('#sidebar-toggle');
  const mainContent = document.querySelector('.main-content');

  _sidebarEl.classList.toggle('sidebar--collapsed', collapsed);
  mainContent?.classList.toggle('main-content--collapsed', collapsed);

  /* Swap toggle icon */
  if (toggleBtn) {
    toggleBtn.innerHTML = icon(collapsed ? 'sidebar_open' : 'sidebar_close', 18);
    toggleBtn.setAttribute('aria-label', collapsed ? 'Expand sidebar' : 'Collapse sidebar');
  }

  store.set(STATE.SIDEBAR_OPEN, !collapsed);
}


/* ----------------------------------------------------------
   BADGE UPDATES
---------------------------------------------------------- */

function _updateBadge(navKey, count) {
  if (!_sidebarEl) return;
  const badge = _sidebarEl.querySelector(`#badge-${navKey}`);
  if (!badge) return;

  if (count > 0) {
    badge.textContent = count > 99 ? '99+' : String(count);
    badge.hidden = false;
  } else {
    badge.hidden = true;
  }
}


/* ----------------------------------------------------------
   PROFILE REFRESH
---------------------------------------------------------- */

function _refreshProfile(profile) {
  const playerEl = _sidebarEl?.querySelector('#sidebar-player');
  if (playerEl) playerEl.innerHTML = _buildPlayerCard(profile);
}


/* ----------------------------------------------------------
   EXP CALCULATION (mirrors exp.js logic)
   Simple quadratic curve: level 1 → 100 EXP, scales up.
---------------------------------------------------------- */

function _expToNextLevel(level) {
  return Math.floor(100 * Math.pow(level, 1.5));
}


/* ----------------------------------------------------------
   STYLES
   Injected once — complements design-tokens.css layout vars.
---------------------------------------------------------- */

(function _injectStyles() {
  if (document.getElementById('vthr-sidebar-styles')) return;
  const s = document.createElement('style');
  s.id = 'vthr-sidebar-styles';
  s.textContent = `
    .sidebar {
      position: fixed;
      top: 0; left: 0;
      width: var(--sidebar-width);
      height: 100dvh;
      background: var(--color-surface-1);
      border-right: 1px solid var(--color-border);
      display: flex;
      flex-direction: column;
      z-index: var(--z-sidebar);
      transition: width var(--duration-base) var(--ease-out);
      overflow: hidden;
    }

    /* ---- Header ---- */
    .sidebar__header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: var(--space-5) var(--space-4);
      border-bottom: 1px solid var(--color-border);
      flex-shrink: 0;
    }

    .sidebar__logo {
      display: flex;
      align-items: center;
      gap: var(--space-3);
      color: var(--color-gold-bright);
      text-decoration: none;
      overflow: hidden;
      white-space: nowrap;
    }

    .sidebar__logo-text {
      font-size: var(--text-sm);
      font-weight: var(--weight-bold);
      letter-spacing: var(--tracking-widest);
      color: var(--color-gold-bright);
    }

    .sidebar__toggle {
      color: var(--color-text-muted);
      flex-shrink: 0;
      padding: var(--space-1);
    }
    .sidebar__toggle:hover { color: var(--color-text-primary); }

    /* ---- Player card ---- */
    .sidebar__player {
      display: flex;
      align-items: center;
      gap: var(--space-3);
      padding: var(--space-4);
      border-bottom: 1px solid var(--color-border);
      flex-shrink: 0;
      overflow: hidden;
    }

    .sidebar__avatar-wrap {
      position: relative;
      flex-shrink: 0;
    }

    .sidebar__level {
      position: absolute;
      bottom: -4px;
      right: -4px;
    }

    .sidebar__player-info {
      flex: 1;
      min-width: 0;
    }

    .sidebar__player-name {
      display: block;
      font-size: var(--text-sm);
      font-weight: var(--weight-semibold);
      color: var(--color-text-primary);
      text-decoration: none;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      margin-bottom: var(--space-2);
    }
    .sidebar__player-name:hover { color: var(--color-gold-bright); }

    /* ---- Nav ---- */
    .sidebar__nav {
      flex: 1;
      overflow-y: auto;
      overflow-x: hidden;
      padding: var(--space-3) 0;
      scrollbar-width: thin;
    }

    .sidebar__list {
      list-style: none;
      display: flex;
      flex-direction: column;
      gap: 2px;
      padding: 0 var(--space-2);
    }

    .sidebar__sep {
      height: 1px;
      background: var(--color-border);
      margin: var(--space-2) var(--space-2);
    }

    .sidebar__link {
      display: flex;
      align-items: center;
      gap: var(--space-3);
      padding: var(--space-2) var(--space-3);
      border-radius: var(--radius-md);
      color: var(--color-text-secondary);
      font-size: var(--text-sm);
      font-weight: var(--weight-medium);
      text-decoration: none;
      cursor: pointer;
      white-space: nowrap;
      transition:
        background var(--duration-fast) var(--ease-out),
        color var(--duration-fast) var(--ease-out);
      width: 100%;
      border: none;
      background: none;
      text-align: left;
    }

    .sidebar__link:hover {
      background: var(--color-surface-3);
      color: var(--color-text-primary);
    }

    .sidebar__link.nav-link--active {
      background: color-mix(in srgb, var(--accent, var(--color-gold)) 12%, transparent);
      color: var(--accent, var(--color-gold-bright));
    }

    .sidebar__link.nav-link--active .sidebar__icon {
      color: var(--accent, var(--color-gold-bright));
    }

    .sidebar__icon {
      flex-shrink: 0;
      display: flex;
      align-items: center;
      justify-content: center;
      color: inherit;
    }

    .sidebar__label {
      flex: 1;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    .sidebar__badge {
      flex-shrink: 0;
      background: var(--color-red-bright);
      color: #fff;
      font-size: 10px;
      font-weight: var(--weight-bold);
      font-family: var(--font-data);
      min-width: 18px;
      height: 18px;
      padding: 0 4px;
      border-radius: var(--radius-pill);
      display: flex;
      align-items: center;
      justify-content: center;
      line-height: 1;
    }

    .sidebar__link--logout {
      color: var(--color-text-muted);
    }
    .sidebar__link--logout:hover {
      color: var(--color-red-bright);
      background: var(--color-red-glow);
    }

    /* ---- Bottom ---- */
    .sidebar__bottom {
      flex-shrink: 0;
      border-top: 1px solid var(--color-border);
      padding: var(--space-2) 0;
    }

    /* ---- Collapsed state ---- */
    .sidebar--collapsed {
      width: var(--sidebar-collapsed);
    }

    .sidebar--collapsed .sidebar__logo-text,
    .sidebar--collapsed .sidebar__player-info,
    .sidebar--collapsed .sidebar__label,
    .sidebar--collapsed .sidebar__badge {
      opacity: 0;
      pointer-events: none;
      transition: opacity var(--duration-base) var(--ease-out);
    }

    .sidebar--collapsed .sidebar__link {
      justify-content: center;
      padding: var(--space-2);
    }

    .sidebar--collapsed .sidebar__logo {
      justify-content: center;
    }

    .sidebar--collapsed .sidebar__player {
      justify-content: center;
    }

    /* ---- Mobile overlay ---- */
    @media (max-width: 640px) {
      .sidebar {
        transform: translateX(-100%);
        transition:
          transform var(--duration-base) var(--ease-out),
          width var(--duration-base) var(--ease-out);
      }
      .sidebar.sidebar--mobile-open {
        transform: translateX(0);
        width: var(--sidebar-width);
        box-shadow: var(--shadow-xl);
      }
    }
  `;
  document.head.appendChild(s);
})();


/* ----------------------------------------------------------
   HELPERS
---------------------------------------------------------- */

function _escape(str) {
  if (!str) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

export default { initSidebar };
