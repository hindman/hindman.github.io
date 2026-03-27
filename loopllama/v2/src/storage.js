// storage.js -- localStorage persistence, JSON export/import, and Supabase cloud sync.

import { APP_VERSION, SCHEMA_VERSION } from './state.js';
import { BUILD_NUM } from './version.js';
import { supabase } from './supabase.js';

const STORAGE_KEY = 'loopllama-v2';

// ---------------------------------------------------------------------------
// Migration
// ---------------------------------------------------------------------------

// Apply all needed migrations to a single video object in place.
// Used when importing videos that may come from older app versions.
// Videos no longer carry their own schema_version (removed in v8).
export function migrateVideo(video) {
  if ('version' in video) {
    const v = video.version ?? 1;
    if (v < 2) {
      // v1 → v2: title becomes name (overwriting), then drop title.
      if (video.title) video.name = video.title;
      delete video.title;
    }
    delete video.version;
  }
  // Strip any lingering schema_version from the video object.
  delete video.schema_version;
  return video;
}

// Apply all needed migrations to the full app state in place.
// Returns the (mutated) state.
function _migrateAppState(state) {
  // Old data used `version`; new data uses `schema_version`. Run all
  // pre-v5 migrations from the old field, then rename it.
  if ('version' in state) {
    if (!state.version) state.version = 1;
    if (state.version < 2) {
      // v1 → v2: title → name migration for videos.
      for (const video of state.videos ?? []) {
        const v = video.version ?? 1;
        if (v < 2) {
          if (video.title) video.name = video.title;
          delete video.title;
          video.version = 2;
        }
      }
      state.version = 2;
    }
    if (state.version < 3) {
      // v2 → v3: rename section_loop_pad_* → loop_pad_* in options.
      const o = state.options ?? {};
      if ('section_loop_pad_start' in o) { o.loop_pad_start = o.section_loop_pad_start; delete o.section_loop_pad_start; }
      if ('section_loop_pad_end'   in o) { o.loop_pad_end   = o.section_loop_pad_end;   delete o.section_loop_pad_end;   }
      state.version = 3;
    }
    if (state.version < 4) {
      // v3 → v4: rename section.time → section.start; drop chapterId from
      // sections, marks, and loops.
      for (const video of state.videos ?? []) {
        for (const s of video.sections ?? []) {
          if ('time' in s) { s.start = s.time; delete s.time; }
          delete s.chapterId;
        }
        for (const m of video.marks ?? []) delete m.chapterId;
        for (const l of video.loops ?? []) delete l.chapterId;
      }
      state.version = 4;
    }
    // v4 → v5: rename `version` → `schema_version` on state and all videos.
    for (const video of state.videos ?? []) migrateVideo(video);
    state.schema_version = SCHEMA_VERSION;
    delete state.version;
  }
  // v5 → v6: add last_modified to each video (0 = unknown, treated as oldest);
  //           bump video schema_version to 6.
  if ((state.schema_version ?? 0) < 6) {
    for (const video of state.videos ?? []) {
      if (!('last_modified' in video)) video.last_modified = 0;
      video.schema_version = 6;
    }
    state.schema_version = 6;
  }
  // v6 → v7: move ever_logged_in → options.cloud_backup; drop ever_logged_in.
  if ((state.schema_version ?? 0) < 7) {
    if (!('cloud_backup' in (state.options ?? {}))) {
      state.options.cloud_backup = state.ever_logged_in === true;
    }
    delete state.ever_logged_in;
    state.schema_version = 7;
  }
  // v7 → v8: remove schema_version from individual video objects.
  if ((state.schema_version ?? 0) < 8) {
    for (const video of state.videos ?? []) {
      delete video.schema_version;
    }
    state.schema_version = 8;
  }
  // v8 → v9: add stashes dict for replace-recovery.
  if ((state.schema_version ?? 0) < 9) {
    if (!state.stashes) state.stashes = {};
    state.schema_version = 9;
  }
  return state;
}

// ---------------------------------------------------------------------------
// Canonical ordering for export / inspect
// ---------------------------------------------------------------------------

// Rebuild a video object with a consistent key order:
// single-value fields first, then collections.
function _reorderVideo(v) {
  const { id, url, name, last_modified, duration, time, start, end,
          speed, seek_delta, speed_delta, looping,
          chapters, sections, loops, marks, jumps } = v;
  // Preserve any unexpected extra keys between scalars and collections.
  const known = new Set(['id','url','name','last_modified','duration','time',
    'start','end','speed','seek_delta','speed_delta','looping',
    'chapters','sections','loops','marks','jumps','schema_version','version']);
  const extra = Object.fromEntries(Object.entries(v).filter(([k]) => !known.has(k)));
  return { id, url, name, last_modified, duration, time, start, end,
           speed, seek_delta, speed_delta, looping,
           ...extra,
           chapters, sections, loops, marks, jumps };
}

// Rebuild the app state object with a consistent key order:
// single-value fields first, then options, then videos.
function _reorderState(state) {
  const { schema_version, currentVideoId, options, videos } = state;
  // stashes is local-only; excluded from export/inspect via the known set.
  const known = new Set(['schema_version','currentVideoId','options','videos','stashes']);
  const extra = Object.fromEntries(Object.entries(state).filter(([k]) => !known.has(k)));
  return { schema_version, currentVideoId, ...extra, options,
           videos: (videos ?? []).map(_reorderVideo) };
}

// ---------------------------------------------------------------------------
// Load / save
// ---------------------------------------------------------------------------

// Load app state from localStorage. Runs migrations if the stored schema
// version is older than the current version, then re-saves.
// Returns null if nothing is stored or if the stored data cannot be parsed.
export function load() {
  const raw = localStorage.getItem(STORAGE_KEY);
  if (!raw) return null;
  try {
    const state = JSON.parse(raw);
    const origVersion = state.schema_version ?? state.version;
    _migrateAppState(state);
    if (state.schema_version !== origVersion) {
      console.log(`LoopLlama: migrated stored data from schema v${origVersion} to v${state.schema_version}`);
      save(state);
    }
    return state;
  } catch (e) {
    console.error('LoopLlama: failed to parse stored data', e);
    return null;
  }
}

// Save app state to localStorage.
export function save(state) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

// Return a pretty-printed JSON string of all app data, with canonical key
// ordering. app_version and build_num are injected at export time.
export function exportAll(state) {
  const ordered = _reorderState(state);
  return JSON.stringify({ app_version: APP_VERSION, build_num: BUILD_NUM, ...ordered }, null, 2);
}

// Return a pretty-printed JSON string for a single video.
// Wrapped in a versioned envelope so the importer can migrate if needed:
//   { app_version, build_num, schema_version, videos: [video] }
export function exportVideo(state, videoId) {
  const video = state.videos.find(v => v.id === videoId);
  if (!video) throw new Error(`exportVideo: no video with id "${videoId}"`);
  return JSON.stringify({
    app_version: APP_VERSION, build_num: BUILD_NUM,
    schema_version: SCHEMA_VERSION,
    videos: [_reorderVideo(video)],
  }, null, 2);
}

// ---------------------------------------------------------------------------
// Cloud sync (Supabase)
// ---------------------------------------------------------------------------

// The `users` table has columns: id (uuid, = auth.uid()), data (jsonb).
// We upsert on save; we fetch the single row on load.

// Fetch app state from Supabase for the given user.
// Returns the stored state object, null if no row exists, or false on error.
export async function loadFromCloud(userId) {
  try {
    const { data, error } = await supabase
      .from('users')
      .select('app_state')
      .eq('id', userId)
      .maybeSingle();
    if (error) throw error;
    return data?.app_state ?? null;
  } catch (e) {
    console.error('LoopLlama: loadFromCloud failed', e);
    return false;
  }
}

// Write app state to Supabase for the given user (upsert).
// Returns true on success, false on error. Errors are also logged to console.
export async function saveToCloud(state, userId) {
  try {
    const { error } = await supabase
      .from('users')
      .upsert({ id: userId, app_state: state });
    if (error) throw error;
    return true;
  } catch (e) {
    console.error('LoopLlama: saveToCloud failed', e);
    return false;
  }
}

// Delete the user's row from Supabase (used by "sign out and remove cloud data").
// Errors are logged but not re-thrown.
export async function deleteFromCloud(userId) {
  try {
    const { error } = await supabase
      .from('users')
      .delete()
      .eq('id', userId);
    if (error) throw error;
  } catch (e) {
    console.error('LoopLlama: deleteFromCloud failed', e);
  }
}

// ---------------------------------------------------------------------------
// Import / export
// ---------------------------------------------------------------------------

// Parse a LoopLlama JSON string and return a migrated array of video objects.
// Supports two formats:
//   - Full app state: { currentVideoId, videos: [...] }
//   - Single video:   { id, name, ... }
// Throws on parse error or unrecognized format.
export function parseImport(jsonStr) {
  const data = JSON.parse(jsonStr);
  let incoming;
  if (Array.isArray(data.videos)) {
    incoming = data.videos;
  } else if (data.id && typeof data.id === 'string') {
    incoming = [data];
  } else {
    throw new Error('Unrecognized format: expected a LoopLlama export.');
  }
  return incoming.map(migrateVideo);
}

// Simple merge of a JSON string into state: imported video wins (add or overwrite).
// Returns { added, updated } counts. Throws on parse/format error.
export function importData(jsonStr, state) {
  const incoming = parseImport(jsonStr);
  let added = 0, updated = 0;
  for (const video of incoming) {
    if (!video.id) continue;
    const idx = state.videos.findIndex(v => v.id === video.id);
    if (idx === -1) { state.videos.push(video);    added++;   }
    else            { state.videos[idx] = video;   updated++; }
  }
  return { added, updated };
}
