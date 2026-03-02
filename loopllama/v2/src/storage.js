// storage.js -- localStorage persistence and JSON export/import.

const STORAGE_KEY = 'loopllama-v2';

// Load app state from localStorage. Returns null if nothing is stored
// or if the stored data cannot be parsed.
export function load() {
  const raw = localStorage.getItem(STORAGE_KEY);
  if (!raw) return null;
  try {
    return JSON.parse(raw);
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
export function exportAll(state) {
  return JSON.stringify(state, null, 2);
}

// Return a pretty-printed JSON string for a single video.
export function exportVideo(state, videoId) {
  const video = state.videos.find(v => v.id === videoId);
  if (!video) throw new Error(`exportVideo: no video with id "${videoId}"`);
  return JSON.stringify(video, null, 2);
}

// Stub: merge imported JSON into current state.
// TODO (Stage 11): parse, validate schema version, merge videos.
export function importData(jsonStr, state) {
  console.warn('importData: not yet implemented');
}
