// storage.js -- localStorage persistence and JSON export/import.

import { APP_VERSION, SCHEMA_VERSION } from './state.js';

const STORAGE_KEY = 'loopllama-v2';

// ---------------------------------------------------------------------------
// Migration
// ---------------------------------------------------------------------------

// Apply all needed migrations to a single video object in place.
// Handles both old format (video.version) and new format (video.schema_version).
function _migrateVideo(video) {
  if ('version' in video || !video.schema_version) {
    const v = video.version ?? 1;
    if (v < 2) {
      // v1 → v2: title becomes name (overwriting), then drop title.
      if (video.title) video.name = video.title;
      delete video.title;
    }
    video.schema_version = SCHEMA_VERSION;
    delete video.version;
  }
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
    for (const video of state.videos ?? []) _migrateVideo(video);
    state.schema_version = SCHEMA_VERSION;
    delete state.version;
  }
  // Future schema_version migrations go here.
  return state;
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

// Return a pretty-printed JSON string of all app data.
// app_version is injected at export time; it is not stored in localStorage.
export function exportAll(state) {
  return JSON.stringify({ app_version: APP_VERSION, ...state }, null, 2);
}

// Return a pretty-printed JSON string for a single video.
// Wrapped in a versioned envelope so the importer can migrate if needed:
//   { app_version, schema_version, videos: [video] }
export function exportVideo(state, videoId) {
  const video = state.videos.find(v => v.id === videoId);
  if (!video) throw new Error(`exportVideo: no video with id "${videoId}"`);
  return JSON.stringify({ app_version: APP_VERSION, schema_version: SCHEMA_VERSION, videos: [video] }, null, 2);
}

// Merge imported JSON into current state. Supports two formats:
//   - Full app state: { currentVideoId, videos: [...] }
//   - Single video:   { id, name, ... }
// Videos are merged by ID: imported video wins (add or overwrite).
// Returns { added, updated } counts.
// Throws on parse error or unrecognized format.
export function importData(jsonStr, state) {
  const data = JSON.parse(jsonStr);

  let incoming;
  if (Array.isArray(data.videos)) {
    incoming = data.videos;
  } else if (data.id && typeof data.id === 'string') {
    incoming = [data];
  } else {
    throw new Error('Unrecognized format: expected a LoopLlama export.');
  }

  // Migrate each incoming video to the current schema before inserting.
  incoming = incoming.map(_migrateVideo);

  let added = 0, updated = 0;
  for (const video of incoming) {
    if (!video.id) continue;
    const idx = state.videos.findIndex(v => v.id === video.id);
    if (idx === -1) {
      state.videos.push(video);
      added++;
    } else {
      state.videos[idx] = video;
      updated++;
    }
  }
  return { added, updated };
}
