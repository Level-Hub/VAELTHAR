/* ============================================================
   VAELTHAR — Local State Management
   /js/core/storage.js | v1.0

   Handles:
   - Typed localStorage wrappers (JSON-safe, no silent failures)
   - In-memory reactive store for runtime state
   - Per-key TTL (time-to-live) expiry
   - Namespaced keys — all prefixed with "vthr:"
   - Session-scoped store (cleared on signOut)
   ============================================================ */


/* ----------------------------------------------------------
   NAMESPACE & KEY REGISTRY
   All storage keys live here — never hardcode strings outside.
---------------------------------------------------------- */

const NS = 'vthr:';

export const KEYS = {
  /* Auth */
  SESSION_USER:       'session_user',      // cached user object
  SESSION_PROFILE:    'session_profile',   // cached profile object

  /* UI preferences */
  SIDEBAR_COLLAPSED:  'sidebar_collapsed', // boolean
  THEME:              'theme',             // 'default' | 'gold' | 'forest'
  LAST_ROUTE:         'last_route',        // last visited page path

  /* Game state (light cache — real data lives in Supabase) */
  ACTIVE_ROLE:        'active_role',       // current role object
  ACTIVE_SEASON:      'active_season',     // current season object
  DAILY_QUEST_RESET:  'quest_reset_at',    // ISO string — next midnight reset
  WEATHER:            'weather',           // last fetched weather object

  /* Onboarding */
  ONBOARDING_STEP:    'onboarding_step',   // number — last completed step

  /* Notifications */
  NOTIF_LAST_SEEN:    'notif_last_seen',   // ISO string

  /* Economy */
  PENDING_TOPUP:      'pending_topup',     // topup request id awaiting admin
};


/* ----------------------------------------------------------
   LOCALSTORAGE — typed, namespaced, TTL-aware
---------------------------------------------------------- */

function _key(name) {
  return NS + name;
}

/**
 * Store a value in localStorage.
 * Automatically JSON-serialises. Supports optional TTL.
 *
 * @param {string} name         — use a KEYS constant
 * @param {*}      value        — any JSON-serialisable value
 * @param {number} [ttlMs]      — time-to-live in milliseconds
 */
export function set(name, value, ttlMs = null) {
  try {
    const payload = {
      v: value,
      t: ttlMs ? Date.now() + ttlMs : null,
    };
    localStorage.setItem(_key(name), JSON.stringify(payload));
  } catch (e) {
    console.warn(`[storage] set("${name}") failed:`, e.message);
  }
}

/**
 * Retrieve a value from localStorage.
 * Returns defaultValue if missing, expired, or parse fails.
 *
 * @param {string} name
 * @param {*}      [defaultValue=null]
 */
export function get(name, defaultValue = null) {
  try {
    const raw = localStorage.getItem(_key(name));
    if (raw === null) return defaultValue;

    const payload = JSON.parse(raw);

    /* TTL check */
    if (payload.t !== null && Date.now() > payload.t) {
      localStorage.removeItem(_key(name));
      return defaultValue;
    }

    return payload.v ?? defaultValue;
  } catch {
    return defaultValue;
  }
}

/**
 * Remove a key from localStorage.
 * @param {string} name
 */
export function remove(name) {
  localStorage.removeItem(_key(name));
}

/**
 * Check whether a key exists and hasn't expired.
 * @param {string} name
 */
export function has(name) {
  return get(name) !== null;
}

/**
 * Clear all vthr: keys from localStorage.
 * Called on logout to wipe session-related data.
 */
export function clearAll() {
  const toDelete = [];
  for (let i = 0; i < localStorage.length; i++) {
    const k = localStorage.key(i);
    if (k?.startsWith(NS)) toDelete.push(k);
  }
  toDelete.forEach(k => localStorage.removeItem(k));
}

/**
 * Clear only session-sensitive keys (safe to call on sign-out).
 * Keeps UI preferences like sidebar state and theme.
 */
export function clearSession() {
  const sessionKeys = [
    KEYS.SESSION_USER,
    KEYS.SESSION_PROFILE,
    KEYS.ACTIVE_ROLE,
    KEYS.ACTIVE_SEASON,
    KEYS.DAILY_QUEST_RESET,
    KEYS.PENDING_TOPUP,
    KEYS.ONBOARDING_STEP,
    KEYS.NOTIF_LAST_SEEN,
  ];
  sessionKeys.forEach(k => remove(k));
}


/* ----------------------------------------------------------
   IN-MEMORY REACTIVE STORE
   A lightweight pub/sub state container for runtime state
   that doesn't need to survive page reloads.

   Usage:
     store.set('questCount', 3);
     store.get('questCount');             // 3
     const unsub = store.watch('questCount', (val) => { ... });
     unsub(); // stop watching
---------------------------------------------------------- */

class ReactiveStore {
  constructor() {
    this._data      = new Map();
    this._listeners = new Map(); // key → Set of callbacks
  }

  /**
   * Set a value and notify watchers.
   * @param {string} key
   * @param {*}      value
   */
  set(key, value) {
    const prev = this._data.get(key);
    this._data.set(key, value);
    if (prev !== value) {
      this._emit(key, value, prev);
    }
  }

  /**
   * Get a value from the in-memory store.
   * @param {string} key
   * @param {*}      [defaultValue]
   */
  get(key, defaultValue = undefined) {
    return this._data.has(key) ? this._data.get(key) : defaultValue;
  }

  /**
   * Delete a key and notify watchers with undefined.
   * @param {string} key
   */
  delete(key) {
    const prev = this._data.get(key);
    this._data.delete(key);
    this._emit(key, undefined, prev);
  }

  /**
   * Subscribe to changes on a specific key.
   * Callback fires immediately with current value, then on every change.
   *
   * @param {string}   key
   * @param {Function} callback  — (newValue, oldValue) => void
   * @returns {Function}         — unsubscribe
   */
  watch(key, callback) {
    if (!this._listeners.has(key)) {
      this._listeners.set(key, new Set());
    }
    this._listeners.get(key).add(callback);

    /* Fire immediately with current value */
    if (this._data.has(key)) {
      try { callback(this._data.get(key), undefined); } catch { /* isolate */ }
    }

    return () => {
      this._listeners.get(key)?.delete(callback);
    };
  }

  /**
   * Subscribe to any key change.
   * @param {Function} callback  — (key, newValue, oldValue) => void
   * @returns {Function}         — unsubscribe
   */
  watchAll(callback) {
    const WILDCARD = '__*__';
    if (!this._listeners.has(WILDCARD)) {
      this._listeners.set(WILDCARD, new Set());
    }
    this._listeners.get(WILDCARD).add(callback);
    return () => {
      this._listeners.get(WILDCARD)?.delete(callback);
    };
  }

  /** Clear all in-memory state */
  clear() {
    this._data.clear();
    /* Don't clear listeners — components may still be mounted */
  }

  _emit(key, next, prev) {
    /* Key-specific listeners */
    this._listeners.get(key)?.forEach(fn => {
      try { fn(next, prev); } catch { /* isolate */ }
    });
    /* Wildcard listeners */
    this._listeners.get('__*__')?.forEach(fn => {
      try { fn(key, next, prev); } catch { /* isolate */ }
    });
  }
}

/** Singleton reactive store — import and use directly */
export const store = new ReactiveStore();


/* ----------------------------------------------------------
   STORE KEYS — well-known runtime state keys
   Use these constants with store.set / store.get / store.watch.
---------------------------------------------------------- */

export const STATE = {
  /* Auth */
  USER:             'user',
  PROFILE:          'profile',
  IS_ADMIN:         'is_admin',

  /* UI */
  SIDEBAR_OPEN:     'sidebar_open',
  MODAL_OPEN:       'modal_open',
  LOADING:          'loading',

  /* Game */
  QUEST_LIST:       'quest_list',
  HABIT_LIST:       'habit_list',
  ACTIVE_ROLE:      'active_role',
  ACTIVE_SEASON:    'active_season',
  UNREAD_NOTIFS:    'unread_notifs',
  UNREAD_CHAT:      'unread_chat',

  /* Economy */
  EXP:              'exp',
  LEVEL:            'level',
  GOLD:             'gold',
  CRYSTAL:          'crystal',

  /* Social */
  GUILD:            'guild',
  PARTY:            'party',
  ONLINE_FRIENDS:   'online_friends',

  /* Weather */
  WEATHER:          'weather',
  WEATHER_THEME:    'weather_theme',
};


/* ----------------------------------------------------------
   CONVENIENCE HELPERS — currency shortcuts
   These are read/written often enough to deserve wrappers.
---------------------------------------------------------- */

/**
 * Seed the store from a profile object (call after login / profile load).
 * @param {Object} profile
 */
export function hydrateFromProfile(profile) {
  if (!profile) return;
  store.set(STATE.PROFILE,  profile);
  store.set(STATE.IS_ADMIN, profile.is_admin ?? false);
  store.set(STATE.EXP,      profile.exp     ?? 0);
  store.set(STATE.LEVEL,    profile.level   ?? 1);
  store.set(STATE.GOLD,     profile.gold    ?? 0);
  store.set(STATE.CRYSTAL,  profile.crystal ?? 0);
}

/**
 * Add EXP to the in-memory store.
 * Does not write to DB — that's exp.js's job.
 * @param {number} amount
 */
export function addExp(amount) {
  const current = store.get(STATE.EXP, 0);
  store.set(STATE.EXP, current + amount);
}

/**
 * Deduct gold from in-memory store.
 * Returns false if insufficient balance.
 * @param {number} amount
 */
export function spendGold(amount) {
  const current = store.get(STATE.GOLD, 0);
  if (current < amount) return false;
  store.set(STATE.GOLD, current - amount);
  return true;
}

/**
 * Deduct crystal from in-memory store.
 * Returns false if insufficient balance.
 * @param {number} amount
 */
export function spendCrystal(amount) {
  const current = store.get(STATE.CRYSTAL, 0);
  if (current < amount) return false;
  store.set(STATE.CRYSTAL, current - amount);
  return true;
}


/* ----------------------------------------------------------
   PERSIST HELPERS
   Sync specific store keys to localStorage and back.
---------------------------------------------------------- */

/**
 * Persist a store value to localStorage.
 * @param {string} stateKey   — STATE constant
 * @param {string} storageKey — KEYS constant
 * @param {number} [ttlMs]
 */
export function persist(stateKey, storageKey, ttlMs = null) {
  const value = store.get(stateKey);
  if (value !== undefined) set(storageKey, value, ttlMs);
}

/**
 * Rehydrate a store key from localStorage.
 * @param {string} storageKey — KEYS constant
 * @param {string} stateKey   — STATE constant
 */
export function rehydrate(stateKey, storageKey) {
  const value = get(storageKey);
  if (value !== null) store.set(stateKey, value);
}

/**
 * Watch a store key and auto-persist every change to localStorage.
 * Returns unsubscribe function.
 *
 * @param {string} stateKey
 * @param {string} storageKey
 * @param {number} [ttlMs]
 */
export function autoPersist(stateKey, storageKey, ttlMs = null) {
  return store.watch(stateKey, (value) => {
    if (value !== undefined) set(storageKey, value, ttlMs);
    else remove(storageKey);
  });
}


/* ----------------------------------------------------------
   SIDEBAR STATE SHORTCUT
   Used by sidebar.js and every page shell.
---------------------------------------------------------- */

export function getSidebarCollapsed() {
  return get(KEYS.SIDEBAR_COLLAPSED, false);
}

export function setSidebarCollapsed(collapsed) {
  set(KEYS.SIDEBAR_COLLAPSED, collapsed);
  store.set(STATE.SIDEBAR_OPEN, !collapsed);
}


export default {
  /* localStorage */
  set, get, remove, has, clearAll, clearSession,
  KEYS,
  /* Reactive store */
  store, STATE,
  /* Helpers */
  hydrateFromProfile,
  addExp, spendGold, spendCrystal,
  persist, rehydrate, autoPersist,
  getSidebarCollapsed, setSidebarCollapsed,
};
