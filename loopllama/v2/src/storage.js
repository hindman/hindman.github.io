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
