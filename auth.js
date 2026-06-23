/* ============================================================
   VAELTHAR — Auth Module
   /js/core/auth.js | v1.0

   Handles:
   - Session management (get, refresh, listen)
   - Sign up flow (create user + seed profile)
   - Sign in / Sign out
   - Route guards (requireAuth, requireGuest)
   - Onboarding gate (redirect new users to onboarding)
   - Role-based guard for admin pages
   ============================================================ */

import {
  supabase,
  signUp   as apiSignUp,
  signIn   as apiSignIn,
  signOut  as apiSignOut,
  getUser,
  getSession,
  onAuthChange,
  insert,
  getWhere,
  upsert,
  TABLES,
} from '/api.js';


/* ----------------------------------------------------------
   ROUTE MAP — where to send users
---------------------------------------------------------- */

const ROUTES = {
  login:      '/login.html',
  register:   '/register.html',
  onboarding: '/onboarding.html',
  dashboard:  '/dashboard.html',
  index:      '/index.html',
  adminIndex: '/admin/index.html',
};

/* Pages that only guests should see (redirect away if logged in) */
const GUEST_ONLY_PAGES = [
  '/index.html', '/',
  '/login.html',
  '/register.html',
];

/* Admin pages — require is_admin flag on profile */
const ADMIN_PAGES = ['/admin/'];


/* ----------------------------------------------------------
   SESSION STATE — module-level cache
   Keeps one source of truth so guards don't double-fetch.
---------------------------------------------------------- */

let _session  = null;   // current Supabase session
let _user     = null;   // current Supabase auth user
let _profile  = null;   // row from profiles table
let _ready    = false;  // true once init() has resolved
let _listeners = [];    // external callbacks for state changes


/* ----------------------------------------------------------
   INIT
   Call once at the top of every page that needs auth context.
   Returns { session, user, profile } or { session: null }.
   Safe to call multiple times — resolves immediately after first call.
---------------------------------------------------------- */

/**
 * Initialise auth state. Must be awaited before calling guards.
 * Automatically called by requireAuth / requireGuest.
 */
export async function initAuth() {
  if (_ready) return currentState();

  const sessionData = await getSession();
  _session = sessionData;

  if (_session) {
    _user    = _session.user;
    _profile = await fetchProfile(_user.id);
  }

  _ready = true;

  /* Listen for future auth changes (tab focus token refresh, sign-out, etc.) */
  onAuthChange(async (event, session) => {
    _session = session;
    _user    = session?.user ?? null;

    if (_user) {
      _profile = await fetchProfile(_user.id);
    } else {
      _profile = null;
    }

    _notifyListeners(event, currentState());
  });

  return currentState();
}


/* ----------------------------------------------------------
   GUARDS
   Call at the top of a page's init script.
   They redirect immediately if the condition isn't met —
   so you can await them and know the rest of the script
   only runs for the correct user state.
---------------------------------------------------------- */

/**
 * Redirect to login if not authenticated.
 * Redirect to onboarding if profile is incomplete.
 *
 * @example
 * // dashboard.html
 * import { requireAuth } from '/auth.js';
 * const { user, profile } = await requireAuth();
 */
export async function requireAuth() {
  await initAuth();

  if (!_session) {
    redirect(ROUTES.login);
    return null;
  }

  /* New user — profile not set up yet */
  if (!_profile || !_profile.onboarding_complete) {
    const currentPath = window.location.pathname;
    if (currentPath !== ROUTES.onboarding) {
      redirect(ROUTES.onboarding);
      return null;
    }
  }

  return currentState();
}

/**
 * Redirect to dashboard if already authenticated.
 * Use on login / register / landing pages.
 *
 * @example
 * // login.html
 * import { requireGuest } from '/auth.js';
 * await requireGuest();
 */
export async function requireGuest() {
  await initAuth();

  if (_session) {
    redirect(ROUTES.dashboard);
    return null;
  }

  return currentState();
}

/**
 * Redirect to dashboard if user is not an admin.
 * Use on every /admin/ page.
 *
 * @example
 * // admin/index.html
 * import { requireAdmin } from '/auth.js';
 * await requireAdmin();
 */
export async function requireAdmin() {
  await initAuth();

  if (!_session) {
    redirect(ROUTES.login);
    return null;
  }

  if (!_profile?.is_admin) {
    redirect(ROUTES.dashboard);
    return null;
  }

  return currentState();
}


/* ----------------------------------------------------------
   SIGN UP
   Creates the auth user then seeds the profiles row.
   Returns { user, profile }.
---------------------------------------------------------- */

/**
 * Register a new account.
 * @param {string} email
 * @param {string} password
 * @param {string} displayName   — shown everywhere in the UI
 * @returns {{ user, profile }}
 */
export async function register(email, password, displayName, username) {
  /* 1. Create auth user
     DB trigger handle_new_user() fires automatically and creates the profiles row.
     display_name + username are passed via raw_user_meta_data so the trigger picks them up. */
  const user = await apiSignUp(email, password, {
    data: {
      display_name: displayName.trim(),
      username:     username ? username.toLowerCase().trim() : null,
    },
  });
  _user = user;

  /* 2. Wait briefly for trigger to fire, then fetch the created profile */
  await new Promise(r => setTimeout(r, 800));
  _profile = await fetchProfile(user.id);

  /* 3. Update session */
  _session = await getSession();
  _ready   = true;

  return { user: _user, profile: _profile };
}


/* ----------------------------------------------------------
   SIGN IN
   Returns { session, user, profile }.
---------------------------------------------------------- */

/**
 * Sign in and load profile.
 * @param {string} email
 * @param {string} password
 * @returns {{ session, user, profile }}
 */
export async function login(email, password) {
  const session = await apiSignIn(email, password);
  _session = session;
  _user    = session.user;
  _profile = await fetchProfile(_user.id);
  _ready   = true;

  /* Mark online */
  await _setOnlineStatus(true);

  return currentState();
}


/* ----------------------------------------------------------
   SIGN IN WITH USERNAME OR EMAIL
   Accepts either an email address or a username.
   If the input looks like an email, sign in directly.
   Otherwise query profiles for a matching username field,
   retrieve the associated email, then sign in normally.
   Returns { session, user, profile }.
---------------------------------------------------------- */

/**
 * Sign in with a username OR email, plus password.
 * @param {string} identifier   — email or username
 * @param {string} password
 * @returns {{ session, user, profile }}
 */
export async function loginWithIdentifier(identifier, password) {
  const trimmed = identifier.trim();
  const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed);

  if (isEmail) {
    /* Direct email login — same as original login() */
    return login(trimmed, password);
  }

  /* Username path — look up the email from profiles */
  let emailFromProfile;
  try {
    const rows = await getWhere(TABLES.PROFILES, { username: trimmed.toLowerCase() });
    if (!rows || rows.length === 0) {
      const err = new Error('ไม่พบ Username นี้ในระบบ');
      err.code  = 'username_not_found';
      throw err;
    }
    emailFromProfile = rows[0].email;
  } catch (e) {
    /* Re-throw lookup errors as-is */
    throw e;
  }

  if (!emailFromProfile) {
    const err = new Error('บัญชีนี้ไม่มีข้อมูล Email กรุณาติดต่อ Support');
    err.code  = 'email_missing';
    throw err;
  }

  return login(emailFromProfile, password);
}


/* ----------------------------------------------------------
   SIGN OUT
---------------------------------------------------------- */

/**
 * Sign out, mark offline, redirect to login.
 */
export async function logout() {
  if (_user) {
    await _setOnlineStatus(false);
  }

  await apiSignOut();

  _session = null;
  _user    = null;
  _profile = null;
  _ready   = false;

  redirect(ROUTES.login);
}


/* ----------------------------------------------------------
   ONBOARDING COMPLETE
   Call from onboarding.html when the user finishes setup.
---------------------------------------------------------- */

/**
 * Mark profile as onboarding complete, then go to dashboard.
 * @param {Object} updates   — any additional profile fields to save
 */
export async function completeOnboarding(updates = {}) {
  if (!_user) throw new Error('Not authenticated');

  const [updated] = await upsert(TABLES.PROFILES, {
    id:                  _user.id,
    onboarding_complete: true,
    ...updates,
  });

  _profile = { ..._profile, ...updated };

  redirect(ROUTES.dashboard);
}


/* ----------------------------------------------------------
   PROFILE HELPERS
   Exposed so pages can access the in-memory profile without
   an extra DB fetch.
---------------------------------------------------------- */

/** Returns the current in-memory state snapshot */
export function currentState() {
  return {
    session: _session,
    user:    _user,
    profile: _profile,
  };
}

/** Manually refresh the cached profile from the DB */
export async function refreshProfile() {
  if (!_user) return null;
  _profile = await fetchProfile(_user.id);
  return _profile;
}


/* ----------------------------------------------------------
   EVENT BUS
   Pages can subscribe to auth state changes.
---------------------------------------------------------- */

/**
 * Listen for auth state changes.
 * @param {Function} fn   — receives (event, { session, user, profile })
 * @returns {Function}    — call to unsubscribe
 */
export function onStateChange(fn) {
  _listeners.push(fn);
  return () => {
    _listeners = _listeners.filter(l => l !== fn);
  };
}


/* ----------------------------------------------------------
   PRIVATE HELPERS
---------------------------------------------------------- */

async function fetchProfile(userId) {
  try {
    const rows = await getWhere(TABLES.PROFILES, { id: userId });
    return rows?.[0] ?? null;
  } catch {
    return null;
  }
}

async function _setOnlineStatus(online) {
  if (!_user) return;
  try {
    await upsert(TABLES.PROFILES, {
      id:        _user.id,
      online,
      last_seen: new Date().toISOString(),
    });
  } catch {
    /* non-critical — don't throw */
  }
}

function redirect(path) {
  if (window.location.pathname !== path) {
    window.location.href = path;
  }
}

function _notifyListeners(event, state) {
  for (const fn of _listeners) {
    try { fn(event, state); } catch { /* isolate listener errors */ }
  }
}


/* ----------------------------------------------------------
   AUTO ONLINE/OFFLINE on tab visibility
   Marks user offline when tab is hidden for > 5 minutes,
   online again when they return.
---------------------------------------------------------- */

let _offlineTimer = null;
const OFFLINE_DELAY_MS = 5 * 60 * 1000;

document.addEventListener('visibilitychange', () => {
  if (!_user) return;

  if (document.hidden) {
    _offlineTimer = setTimeout(() => _setOnlineStatus(false), OFFLINE_DELAY_MS);
  } else {
    clearTimeout(_offlineTimer);
    _setOnlineStatus(true);
  }
});

window.addEventListener('beforeunload', () => {
  if (_user) _setOnlineStatus(false);
});


export default {
  initAuth,
  requireAuth,
  requireGuest,
  requireAdmin,
  register,
  login,
  loginWithIdentifier,
  logout,
  completeOnboarding,
  currentState,
  refreshProfile,
  onStateChange,
};
