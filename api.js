/* ============================================================
   VAELTHAR — Supabase Client
   /js/core/api.js | v1.0
   
   Single source of truth for all Supabase access.
   Import this everywhere — never create a second client.
   ============================================================ */

import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/+esm';

/* ----------------------------------------------------------
   CONFIG
---------------------------------------------------------- */

const SUPABASE_URL  = 'https://habvhkikvmxtyjcdxnbn.supabase.co';
const SUPABASE_ANON = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhhYnZoa2lrdm14dHlqY2R4bmJuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODIxNDI4NzYsImV4cCI6MjA5NzcxODg3Nn0.LsNqcppODWujAs7BovKnsCjlKLF1xDnsoH5H_o9whjo';

/* ----------------------------------------------------------
   CLIENT — singleton
---------------------------------------------------------- */

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON, {
  auth: {
    autoRefreshToken:    true,
    persistSession:      true,
    detectSessionInUrl:  true,
    storageKey:          'vaelthar_session',
  },
  realtime: {
    params: {
      eventsPerSecond: 10,
    },
  },
});


/* ----------------------------------------------------------
   AUTH HELPERS
   Thin wrappers — throw on error so callers don't need to
   inspect { data, error } everywhere.
---------------------------------------------------------- */

/**
 * Sign up with email + password.
 * Returns the new user object.
 */
export async function signUp(email, password) {
  const { data, error } = await supabase.auth.signUp({ email, password });
  if (error) throw error;
  return data.user;
}

/**
 * Sign in with email + password.
 * Returns the session object.
 */
export async function signIn(email, password) {
  const { data, error } = await supabase.auth.signInWithPassword({ email, password });
  if (error) throw error;
  return data.session;
}

/**
 * Sign out current user.
 */
export async function signOut() {
  const { error } = await supabase.auth.signOut();
  if (error) throw error;
}

/**
 * Returns the currently authenticated user, or null.
 */
export async function getUser() {
  const { data } = await supabase.auth.getUser();
  return data?.user ?? null;
}

/**
 * Returns the current session, or null.
 */
export async function getSession() {
  const { data } = await supabase.auth.getSession();
  return data?.session ?? null;
}

/**
 * Listen for auth state changes.
 * Callback receives (event, session).
 * Returns the unsubscribe function.
 *
 * @example
 * const unsub = onAuthChange((event, session) => {
 *   if (event === 'SIGNED_IN') router.push('/dashboard.html');
 * });
 */
export function onAuthChange(callback) {
  const { data: { subscription } } = supabase.auth.onAuthStateChange(callback);
  return () => subscription.unsubscribe();
}


/* ----------------------------------------------------------
   DB HELPERS
   Generic wrappers for common query patterns.
   Tables are passed as strings — keeps callers readable.
---------------------------------------------------------- */

/**
 * Fetch a single row by id.
 * @param {string} table
 * @param {string|number} id
 * @param {string} [select='*']
 */
export async function getById(table, id, select = '*') {
  const { data, error } = await supabase
    .from(table)
    .select(select)
    .eq('id', id)
    .single();
  if (error) throw error;
  return data;
}

/**
 * Fetch rows matching a filter object.
 * @param {string} table
 * @param {Object} filters    — { column: value, ... }
 * @param {string} [select]
 * @param {Object} [options]  — { order: { column, ascending }, limit }
 */
export async function getWhere(table, filters = {}, select = '*', options = {}) {
  let query = supabase.from(table).select(select);

  for (const [col, val] of Object.entries(filters)) {
    query = query.eq(col, val);
  }

  if (options.order) {
    query = query.order(options.order.column, {
      ascending: options.order.ascending ?? true,
    });
  }

  if (options.limit) {
    query = query.limit(options.limit);
  }

  const { data, error } = await query;
  if (error) throw error;
  return data;
}

/**
 * Insert one or more rows. Returns inserted data.
 * @param {string} table
 * @param {Object|Object[]} payload
 */
export async function insert(table, payload) {
  const { data, error } = await supabase
    .from(table)
    .insert(payload)
    .select();
  if (error) throw error;
  return data;
}

/**
 * Upsert (insert or update by primary key).
 * @param {string} table
 * @param {Object|Object[]} payload
 */
export async function upsert(table, payload) {
  const { data, error } = await supabase
    .from(table)
    .upsert(payload)
    .select();
  if (error) throw error;
  return data;
}

/**
 * Update rows matching a filter.
 * @param {string} table
 * @param {Object} filters
 * @param {Object} updates
 */
export async function update(table, filters, updates) {
  let query = supabase.from(table).update(updates);
  for (const [col, val] of Object.entries(filters)) {
    query = query.eq(col, val);
  }
  const { data, error } = await query.select();
  if (error) throw error;
  return data;
}

/**
 * Delete rows matching a filter.
 * @param {string} table
 * @param {Object} filters
 */
export async function remove(table, filters) {
  let query = supabase.from(table).delete();
  for (const [col, val] of Object.entries(filters)) {
    query = query.eq(col, val);
  }
  const { error } = await query;
  if (error) throw error;
}


/* ----------------------------------------------------------
   STORAGE HELPERS
   Bucket operations for avatar uploads, KYC docs, etc.
---------------------------------------------------------- */

/**
 * Upload a file to a storage bucket.
 * @param {string} bucket   — e.g. 'avatars', 'kyc'
 * @param {string} path     — path inside the bucket, e.g. 'user_id/avatar.jpg'
 * @param {File}   file
 * @param {Object} [opts]   — supabase upload options (upsert, cacheControl, etc.)
 * @returns {string} public URL
 */
export async function uploadFile(bucket, path, file, opts = {}) {
  const { error } = await supabase.storage
    .from(bucket)
    .upload(path, file, { upsert: true, ...opts });
  if (error) throw error;

  const { data } = supabase.storage.from(bucket).getPublicUrl(path);
  return data.publicUrl;
}

/**
 * Delete a file from a bucket.
 * @param {string}   bucket
 * @param {string[]} paths
 */
export async function deleteFiles(bucket, paths) {
  const { error } = await supabase.storage.from(bucket).remove(paths);
  if (error) throw error;
}


/* ----------------------------------------------------------
   REALTIME HELPERS
   Wrappers for Supabase Realtime channels.
---------------------------------------------------------- */

/**
 * Subscribe to INSERT/UPDATE/DELETE events on a table.
 * Returns an object with an unsubscribe() method.
 *
 * @param {string}   table
 * @param {Function} callback  — receives { eventType, new: row, old: row }
 * @param {Object}   [filter]  — { column, value } for row-level filter
 *
 * @example
 * const sub = subscribeTable('chat_messages', ({ new: msg }) => {
 *   renderMessage(msg);
 * }, { column: 'guild_id', value: myGuildId });
 * // later:
 * sub.unsubscribe();
 */
export function subscribeTable(table, callback, filter = null) {
  let channelConfig = {
    event:  '*',
    schema: 'public',
    table,
  };

  if (filter) {
    channelConfig.filter = `${filter.column}=eq.${filter.value}`;
  }

  const channel = supabase
    .channel(`table:${table}:${Date.now()}`)
    .on('postgres_changes', channelConfig, callback)
    .subscribe();

  return {
    unsubscribe: () => supabase.removeChannel(channel),
  };
}


/* ----------------------------------------------------------
   TABLE NAMES — single source of truth
   Import these constants rather than typing strings inline.
   Typos in table names are caught at import time.
---------------------------------------------------------- */

export const TABLES = {
  USERS:               'users',
  PROFILES:            'profiles',
  ROLES:               'roles',
  USER_ROLES:          'user_roles',
  QUESTS:              'quests',
  USER_QUESTS:         'user_quests',
  HABITS:              'habits',
  HABIT_LOGS:          'habit_logs',
  EXP_LOGS:            'exp_logs',
  SEASONS:             'seasons',
  GUILDS:              'guilds',
  GUILD_MEMBERS:       'guild_members',
  GUILD_TERRITORIES:   'guild_territories',
  PARTIES:             'parties',
  PARTY_MEMBERS:       'party_members',
  CHAT_MESSAGES:       'chat_messages',
  FRIENDS:             'friends',
  FRIEND_REQUESTS:     'friend_requests',
  MOOD_LOGS:           'mood_logs',
  SHOP_ITEMS:          'shop_items',
  USER_INVENTORY:      'user_inventory',
  MARKET_LISTINGS:     'market_listings',
  MARKET_TRANSACTIONS: 'market_transactions',
  TOPUP_REQUESTS:      'topup_requests',
  KYC_SUBMISSIONS:     'kyc_submissions',
  BLACKLIST:           'blacklist',
  REPORTS:             'reports',
  ACHIEVEMENTS:        'achievements',
  USER_ACHIEVEMENTS:   'user_achievements',
  CHECKINS:            'checkins',
  NOTIFICATIONS:       'notifications',
  GIFTS:               'gifts',
  SUBSCRIPTIONS:       'subscriptions',
  TOURNAMENTS:         'tournaments',
  TOURNAMENT_ENTRIES:  'tournament_entries',
  RANKING_SNAPSHOTS:   'ranking_snapshots',
};


/* ----------------------------------------------------------
   STORAGE BUCKETS
---------------------------------------------------------- */

export const BUCKETS = {
  AVATARS:  'avatars',
  KYC:      'kyc',
  ITEMS:    'shop-items',
  MARKET:   'market-listings',
};


export default supabase;
