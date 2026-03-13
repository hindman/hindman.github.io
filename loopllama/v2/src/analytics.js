import { supabase } from './supabase.js';

// Returns a persistent UUID for this browser/device, creating one if needed.
function getClientId() {
  const key = 'll_client_id';
  let id = localStorage.getItem(key);
  if (!id) {
    id = crypto.randomUUID();
    localStorage.setItem(key, id);
  }
  return id;
}

// Returns a UUID for this page session, creating one if needed.
function getSessionId() {
  const key = 'll_session_id';
  let id = sessionStorage.getItem(key);
  if (!id) {
    id = crypto.randomUUID();
    sessionStorage.setItem(key, id);
  }
  return id;
}

// Inserts one row into the events table.
// Errors are logged to the console but never thrown -- analytics must not
// affect app behavior.
async function logEvent(eventType, extras = {}) {
  const row = { event_type: eventType, session_id: getSessionId(), ...extras };
  const { error } = await supabase.from('events').insert(row);
  if (error) console.warn('analytics logEvent failed:', error.message);
}

// Log app open. Carries client_id for approximate unique-user counting.
export function logSessionStart() {
  logEvent('session_start', { client_id: getClientId() });
}

// Log video load. Carries video_id but NOT client_id (privacy: no watch history).
export function logVideoLoad(videoId) {
  logEvent('video_load', { video_id: videoId });
}
