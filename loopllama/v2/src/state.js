// state.js -- factory functions for all app entities.
//
// App state is held reactively by the top-level <llama-app> component.
// These factories produce plain objects matching the v2 data schema.
// Mutation functions will be added in later stages as needed.

export const APP_VERSION    = 2;
export const SCHEMA_VERSION = 11;
export const UNTITLED       = '(untitled)';

export const JUMP_HISTORY_MAX = 40;   // max persisted jump entries per video
export const JUMP_THRESHOLD   = 15;   // seconds; smaller moves are not stored

// Minimum distance (seconds) between two dividers or two marks.
// Guards against accidental creation when the playhead is near an existing entity.
export const MIN_ENTITY_GAP = 1;

function createId() {
  return Math.random().toString(36).slice(2, 9);
}

// App-wide defaults. Also used to initialize per-video seek/speed deltas.
export const DEFAULT_OPTIONS = {
  seek_delta_default:       5,
  seek_delta_choices:       [0.1, 1, 5, 10, 30, 60, 300, 1800],
  loop_nudge_delta_default: 5,
  loop_nudge_delta_choices: [1800, 300, 60, 30, 10, 5, 1, 0.1],
  speed_delta:              0.05,
  loop_pad_start:           2,
  loop_pad_end:             2,
  cloud_backup:             false,
};

// Top-level app state (persisted to localStorage as one object).
export function createAppState() {
  return {
    schema_version: SCHEMA_VERSION,
    options:        { ...DEFAULT_OPTIONS },
    videos:         [],
    stashes:        {},   // keyed by YouTube ID; one stash per video; local-only
    currentVideoId: null,
  };
}

// Create a new Video object.
// youtubeId: the bare YouTube video ID (e.g., "zP4lYpsfL8c").
// url: the full URL as supplied by the user (kept for display/export).
export function canonicalVideoUrl(id) {
  return `https://www.youtube.com/watch?v=${id}`;
}

export function createVideo(url, youtubeId) {
  return {
    id:          youtubeId,
    url:         canonicalVideoUrl(youtubeId),
    duration:    null,    // set by the YouTube API after loading
    time:        0,       // last-known playback position; used to resume
    start:       0,       // user-adjustable effective start
    end:         null,    // user-adjustable effective end; null = use duration
    name:        '',
    speed:       1.0,
    seek_delta:  DEFAULT_OPTIONS.seek_delta_default,
    scratchLoop: { start: 0, end: 0, looping: false, sourceId: null, sourceType: null },
    chapters:    [],
    sections:    [],
    loops:       [],      // named loops only; scratch loop is in scratchLoop
    marks:         [],
    jumps:         [],
    entity_type:   'any',
    nudge_delta:   DEFAULT_OPTIONS.loop_nudge_delta_default,
    zone2_mode:    'sections',
    last_modified: Date.now(),
    last_opened:   null,
  };
}

// Create a Chapter divider.
// start is the divider point; end starts as null and is either derived at
// runtime or explicitly set later (same model as sections).
export function createChapter(name, start, end) {
  return { id: createId(), name, start, end };
}

// Create a Section divider.
// start: the divider point in seconds (required).
// name: optional user label (e.g., "Verse", "Solo").
// end is not included here; it is either derived at runtime or set later
// via direct property assignment when the user explicitly limits the section.
export function createSection(start, name = '') {
  return { id: createId(), start, end: null, name };
}

// Create a named Loop.
export function createLoop(start, end, name = '') {
  return { id: createId(), name, start, end };
}

// Create a Mark.
export function createMark(time, name = '') {
  return { id: createId(), time, name };
}

// ---------------------------------------------------------------------------
// Shared divider helpers
//
// Sections and chapters share the same divider-based range model:
// { id, name, start, end? }. These private helpers implement the common
// logic; the public type-specific functions below are thin wrappers.
// ---------------------------------------------------------------------------

// Find the entity with the largest start at or before time.
// Returns the entity or null. Assumes entities are sorted by start.
function nearestDividerLeft(entities, time) {
  let result = null;
  for (const e of entities) {
    if (e.start <= time) result = e;
    else break;
  }
  return result;
}

// Returns the effective end for entities[idx]: the stored end if set, otherwise
// the next entity's start, otherwise null (no videoDuration fallback).
// Used by getDividerBounds and by _deriveLoopSrc in llama-app.js.
export function deriveDividerEnd(entities, idx) {
  const entity = entities[idx];
  return entity.end ?? entities[idx + 1]?.start ?? null;
}

// Get the effective start/end bounds of the divider range containing time.
// Returns { start, end } or null if time is before the first divider or in
// a gap zone (past an explicit entity.end, before the next divider).
// videoDuration: used as end fallback for the last open-ended range.
function getDividerBounds(entities, time, videoDuration) {
  if (!entities.length) return null;

  let leftIdx = -1;
  for (let i = 0; i < entities.length; i++) {
    if (entities[i].start <= time) leftIdx = i;
    else break;
  }

  if (leftIdx === -1) return null;   // before first divider

  const left      = entities[leftIdx];
  const entityEnd = deriveDividerEnd(entities, leftIdx) ?? videoDuration ?? null;

  // Gap zone: time is past the explicit end, before the next divider.
  if (left.end != null && time > left.end) return null;

  return { start: left.start, end: entityEnd };
}

// Set entities[id].end to its derived end (next entity's start, or videoDuration).
// Returns true if found and updated, false if not found.
function fixDividerEnd(entities, id, videoDuration) {
  const idx = entities.findIndex(e => e.id === id);
  if (idx === -1) return false;
  const next = entities[idx + 1];
  entities[idx].end = next ? next.start : (videoDuration ?? null);
  return true;
}

// Add a divider at the given time (sorted by start).
// Rejects if time falls inside a fixed range (entity with explicit end) or
// if any existing divider starts within MIN_ENTITY_GAP seconds of time.
// Returns the new entity { id, name, start, end }, or null if rejected.
function addDivider(entities, time, name = '') {
  const containing = nearestDividerLeft(entities, time);
  if (containing && containing.end != null && time <= containing.end) return null;
  if (entities.some(e => Math.abs(e.start - time) < MIN_ENTITY_GAP)) return null;
  const entity = { id: createId(), name, start: time, end: null };
  entities.push(entity);
  entities.sort((a, b) => a.start - b.start);
  return entity;
}

// ---------------------------------------------------------------------------
// Mark functions
// ---------------------------------------------------------------------------

// Remove the mark with the given id from the marks array.
export function deleteMarkById(marks, markId) {
  const idx = marks.findIndex(m => m.id === markId);
  if (idx !== -1) marks.splice(idx, 1);
}

// Find the mark with the largest time at or before the given time.
// Returns the mark or null. Assumes marks are sorted by time.
export function nearestMarkLeft(marks, time) {
  let result = null;
  for (const m of marks) {
    if (m.time <= time) result = m;
    else break;
  }
  return result;
}

// Add a mark at the given time to the marks array (sorted by time).
// Returns the new mark, or null if a mark within MIN_ENTITY_GAP seconds already exists.
export function addMark(marks, time, name = '') {
  if (marks.some(m => Math.abs(m.time - time) < MIN_ENTITY_GAP)) return null;
  const mark = createMark(time, name);
  marks.push(mark);
  marks.sort((a, b) => a.time - b.time);
  return mark;
}

// ---------------------------------------------------------------------------
// Section functions
// ---------------------------------------------------------------------------

// Add a section divider at the given time. Returns the new section or null.
export function addSection(sections, time, name = '') {
  return addDivider(sections, time, name);
}

// Remove the section with the given id from the sections array.
export function deleteSectionById(sections, sectionId) {
  const idx = sections.findIndex(s => s.id === sectionId);
  if (idx !== -1) sections.splice(idx, 1);
}

// Find the section divider with the largest start at or before time.
// Returns the section or null. Assumes sections are sorted by start.
export function nearestSectionLeft(sections, time) {
  return nearestDividerLeft(sections, time);
}

// Get the effective start/end bounds of the section containing time.
// Returns { start, end } or null. See getDividerBounds for full semantics.
export function getSectionBounds(sections, time, videoDuration) {
  return getDividerBounds(sections, time, videoDuration);
}

// Set a section's end to its derived end (next section's start, or videoDuration).
// Returns true if found and updated, false if not found.
export function fixSectionEnd(sections, id, videoDuration) {
  return fixDividerEnd(sections, id, videoDuration);
}

// ---------------------------------------------------------------------------
// Loop functions
// ---------------------------------------------------------------------------

// Returns the named loop whose start is <= time and greatest, or null.
// Assumes loops are sorted by start.
export function nearestLoopLeft(loops, time) {
  let result = null;
  for (const l of loops) {
    if (l.start <= time) result = l;
    else break;
  }
  return result;
}

// Add a named loop (sorted by start). Returns the new loop.
export function addLoop(loops, start, end, name = '') {
  const loop = createLoop(start, end, name);
  loops.push(loop);
  loops.sort((a, b) => a.start - b.start);
  return loop;
}

// Remove a named loop by id.
export function deleteLoopById(loops, id) {
  const idx = loops.findIndex(l => l.id === id);
  if (idx !== -1) loops.splice(idx, 1);
}

// Update named loop fields by id. fields: { name?, start?, end? }
export function updateLoop(loops, id, fields) {
  const loop = loops.find(l => l.id === id);
  if (loop) Object.assign(loop, fields);
}

// Shift the loop start by delta seconds, clamped to [0, duration ?? Infinity].
// Returns the new value; does not mutate state.
export function nudgeLoopStart(delta, { loopStart, duration }) {
  const maxT = duration ?? Infinity;
  return Math.max(0, Math.min(loopStart + delta, maxT));
}

// Shift the loop end by delta seconds, clamped to [0, duration ?? Infinity].
// Returns the new value; does not mutate state.
export function nudgeLoopEnd(delta, { loopEnd, duration }) {
  const maxT = duration ?? Infinity;
  return Math.max(0, Math.min(loopEnd + delta, maxT));
}

// ---------------------------------------------------------------------------
// Chapter functions
// ---------------------------------------------------------------------------

// Remove a chapter by id.
export function deleteChapterById(chapters, id) {
  const idx = chapters.findIndex(c => c.id === id);
  if (idx !== -1) chapters.splice(idx, 1);
}

// Find the chapter divider with the largest start at or before time.
// Returns the chapter or null. Assumes chapters are sorted by start.
export function nearestChapterLeft(chapters, time) {
  return nearestDividerLeft(chapters, time);
}

// Get the effective start/end bounds of the chapter containing time.
// Returns { start, end } or null. See getDividerBounds for full semantics.
export function getChapterBounds(chapters, time, videoDuration) {
  return getDividerBounds(chapters, time, videoDuration);
}

// Set a chapter's end to its derived end (next chapter's start, or videoDuration).
// Returns true if found and updated, false if not found.
export function fixChapterEnd(chapters, id, videoDuration) {
  return fixDividerEnd(chapters, id, videoDuration);
}

// Add a chapter divider at the given time. Returns the new chapter or null.
export function addChapterDivider(chapters, time, name = '') {
  return addDivider(chapters, time, name);
}

// ---------------------------------------------------------------------------
// Entity validation and propagation (shared by sections and chapters)
// ---------------------------------------------------------------------------

// Validate a proposed start/end change for entities[idx].
// Returns false if the change would eliminate an immediate neighbor:
//   newStart <= prev.start  (prev would reach zero or negative width)
//   newEnd   >= nextDerivedEnd  (next would reach zero or negative width)
// duration is needed to compute a derived end for the last entity.
export function validateEntityChange(entities, idx, newStart, newEnd, duration) {
  const entity = entities[idx];
  const prev   = entities[idx - 1];
  const next   = entities[idx + 1];

  if (newStart !== entity.start && prev && newStart <= prev.start) {
    return false;
  }

  if (newEnd != null && newEnd !== entity.end && next) {
    const nextDerivedEnd = next.end != null
      ? next.end
      : (entities[idx + 2]?.start ?? duration ?? null);
    if (nextDerivedEnd != null && newEnd >= nextDerivedEnd) return false;
  }

  return true;
}

// Apply new start/end to entities[idx] and propagate to immediate neighbors
// to resolve any overlap.
//
// Propagation rules:
//   start moved left past prev.start (any prev): entity.start = newStart, prev shrinks
//   start moved left past prev.end (prev has explicit end): prev.end = newStart
//   end moved right past next.start: next.start = newEnd
//
// Assumes validateEntityChange passed. Mutates the array in place, re-sorting as needed.
export function propagateEntityChange(entities, idx, newStart, newEnd) {
  const entity = entities[idx];
  const prev   = entities[idx - 1];
  const next   = entities[idx + 1];

  if (newStart !== entity.start) {
    if (prev && prev.end != null && newStart < prev.end) {
      prev.end = newStart;
    }
    entity.start = newStart;
    entities.sort((a, b) => a.start - b.start);
  }

  if (newEnd !== entity.end) {
    if (newEnd != null && next && newEnd > next.start) {
      next.start = newEnd;
      entities.sort((a, b) => a.start - b.start);
    }
    entity.end = newEnd;
  }
}
