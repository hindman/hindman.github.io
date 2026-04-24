// sharing.js -- Supabase-backed share creation and retrieval.

import { nanoid } from 'nanoid';
import { SCHEMA_VERSION } from './state.js';
import { supabase } from './supabase.js';

// ---------------------------------------------------------------------------
// URL helpers
// ---------------------------------------------------------------------------

// Build a share URL for the given share ID, derived from the current page
// location so it works in both dev and prod.
export function shareUrl(id) {
  const url = new URL(window.location.href);
  url.search = '';
  url.hash = '';
  url.searchParams.set('share', id);
  return url.toString();
}

// Return the share ID from the current page URL, or null if not present.
export function shareIdFromUrl() {
  return new URLSearchParams(window.location.search).get('share');
}

// ---------------------------------------------------------------------------
// Payload builders
// ---------------------------------------------------------------------------

// Build the JSONB payload for a 'video' share from a Video object.
export function buildVideoPayload(video) {
  const scratch = video.scratchLoop;
  return {
    schema_version: SCHEMA_VERSION,
    videoUrl:       video.url,
    videoTitle:     video.name || null,
    sections:       video.sections,
    namedLoops:     video.loops,
    marks:          video.marks,
    chapters:       video.chapters,
    speed:          video.speed,
    start:          video.start,
    end:            video.end,
    looping:        scratch?.looping ?? false,
    scratchLoop:    scratch ? { start: scratch.start, end: scratch.end } : null,
    last_modified:  video.last_modified ?? null,
  };
}

// Build the JSONB payload for a 'loop' share.
// start/end are the current scratch loop endpoints.
// name is the loop label (often '' for a scratch loop).
export function buildLoopPayload(video, start, end, name = '') {
  return {
    schema_version: SCHEMA_VERSION,
    videoUrl:       video.url,
    videoTitle:     video.name || null,
    loop:           { name, start, end },
    speed:          video.speed,
  };
}

// ---------------------------------------------------------------------------
// Write
// ---------------------------------------------------------------------------

// Insert a share row and return the new share ID.
// Throws on Supabase error (unlike analytics.js, the caller needs to know).
// type: 'loop' | 'video'
// payload: the data object to store
// videoUrl / videoTitle: denormalized for display; null for types that omit them.
export async function createShare(type, payload, videoUrl = null, videoTitle = null) {
  const id = nanoid(10);
  const row = { id, share_type: type, payload, video_url: videoUrl, video_title: videoTitle };
  const { error } = await supabase.from('shares').insert(row);
  if (error) throw new Error(`createShare failed: ${error.message}`);
  return id;
}

// ---------------------------------------------------------------------------
// Read
// ---------------------------------------------------------------------------

// Fetch a share row by ID. Returns the full row object.
// Throws if not found or on Supabase error.
export async function fetchShare(id) {
  const { data, error } = await supabase
    .from('shares')
    .select('*')
    .eq('id', id)
    .single();
  if (error) throw new Error(`fetchShare failed: ${error.message}`);
  return data;
}
