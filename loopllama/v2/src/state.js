// state.js -- factory functions for all app entities.
//
// App state is held reactively by the top-level <llama-app> component.
// These factories produce plain objects matching the v2 data schema.
// Mutation functions will be added in later stages as needed.

export const APP_VERSION    = 2;
export const SCHEMA_VERSION = 9;

export const JUMP_HISTORY_MAX = 40;   // max persisted jump entries per video
export const JUMP_THRESHOLD   = 15;   // seconds; smaller moves are not stored

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
export function createVideo(url, youtubeId) {
  return {
    id:          youtubeId,
    url,
    duration:    null,    // set by the YouTube API after loading
    time:        0,       // last-known playback position; used to resume
    start:       0,       // user-adjustable effective start
    end:         null,    // user-adjustable effective end; null = use duration
    name:        '',
    looping:     false,
    speed:       1.0,
    seek_delta:  DEFAULT_OPTIONS.seek_delta_default,
    chapters:    [],
    sections:    [],
    loops:       [createScratchLoop()],  // always one scratch loop
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
  return { id: createId(), name, start, end, source: null, is_scratch: false };
}

// Create the scratch loop. One exists per video at all times.
// Endpoints default to 0/0; they are set when the user loads a loop or
// manually sets start/end points.
export function createScratchLoop() {
  return { id: createId(), name: '', start: 0, end: 0, source: null, is_scratch: true };
}

// Create a Mark.
export function createMark(time, name = '') {
  return { id: createId(), time, name };
}

// Remove a chapter by id.
export function deleteChapterById(chapters, id) {
  const idx = chapters.findIndex(c => c.id === id);
  if (idx !== -1) chapters.splice(idx, 1);
}

// Update chapter fields by id. fields: { name?, start?, end? }
export function updateChapter(chapters, id, fields) {
  const chapter = chapters.find(c => c.id === id);
  if (!chapter) return;
  Object.assign(chapter, fields);
  chapters.sort((a, b) => a.start - b.start);
}

// Add a mark at the given time to the marks array (sorted by time).
// Returns the new mark, or null if a mark at the same second already exists.
export function addMark(marks, time, name = '') {
  const rounded = Math.round(time);
  if (marks.some(m => Math.round(m.time) === rounded)) return null;
  const mark = createMark(time, name);
  marks.push(mark);
  marks.sort((a, b) => a.time - b.time);
  return mark;
}

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

// Add a section divider at the given time (sorted by start).
// Rejects if the time falls inside a fixed section (one with an explicit end),
// or if any existing divider starts within 2 seconds of the new time.
// Returns the new section, or null if rejected.
export function addSection(sections, time, name = '') {
  const containing = nearestSectionLeft(sections, time);
  if (containing && containing.end != null && time <= containing.end) return null;
  if (sections.some(s => Math.abs(s.start - time) < 2)) return null;
  const section = createSection(time, name);
  sections.push(section);
  sections.sort((a, b) => a.start - b.start);
  return section;
}

// Remove the section with the given id from the sections array.
export function deleteSectionById(sections, sectionId) {
  const idx = sections.findIndex(s => s.id === sectionId);
  if (idx !== -1) sections.splice(idx, 1);
}

// Find the section divider with the largest start at or before the given time.
// Returns the section or null. Assumes sections are sorted by start.
export function nearestSectionLeft(sections, time) {
  let result = null;
  for (const s of sections) {
    if (s.start <= time) result = s;
    else break;
  }
  return result;
}

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

// Nudge the loop start point by delta seconds.
// Returns the new start value; does not mutate state.
// All results are clamped to [0, duration ?? Infinity].
//
// Goal: support a 2-action loop-setting workflow -- user places one endpoint,
// then nudges the other into position to produce a legal loop (start < end).
// The relative nudge handles the common case where the loop is currently
// inverted (start >= end) and the nudge direction would fix it, but the
// regular nudge does not reach far enough to clear the other endpoint.
//
// Decision rules (SELF = start, OTHER = end):
//   Step 1 -- regular nudge: SELF + delta. If legal (result < end), use it.
//   Step 2 -- relative nudge: OTHER + delta. If legal (result < end), use it.
//   Step 3 -- fallback: return the Step 1 result even though it is illegal.
//             Caller is responsible for the looping guard:
//               looping=on  -> refuse the edit entirely.
//               looping=off -> apply it; the loop remains broken but harmless
//                              until the user completes the intended edit.
export function nudgeLoopStart(delta, { loopStart, loopEnd, duration }) {
  const maxT = duration ?? Infinity;
  const regular = Math.max(0, Math.min(loopStart + delta, maxT));
  if (regular < loopEnd) return regular;
  const relative = Math.max(0, Math.min(loopEnd + delta, maxT));
  if (relative < loopEnd) return relative;
  return regular;
}

// Nudge the loop end point by delta seconds.
// Returns the new end value; does not mutate state.
// All results are clamped to [0, duration ?? Infinity].
//
// Goal and decision rules mirror nudgeLoopStart (SELF = end, OTHER = start):
//   Step 1 -- regular nudge: SELF + delta. If legal (start < result), use it.
//   Step 2 -- relative nudge: OTHER + delta. If legal (start < result), use it.
//   Step 3 -- fallback: return the Step 1 result even though it is illegal.
//             Caller is responsible for the looping guard:
//               looping=on  -> refuse the edit entirely.
//               looping=off -> apply it; the loop remains broken but harmless
//                              until the user completes the intended edit.
export function nudgeLoopEnd(delta, { loopStart, loopEnd, duration }) {
  const maxT = duration ?? Infinity;
  const regular = Math.max(0, Math.min(loopEnd + delta, maxT));
  if (loopStart < regular) return regular;
  const relative = Math.max(0, Math.min(loopStart + delta, maxT));
  if (loopStart < relative) return relative;
  return regular;
}

// Get the effective start/end bounds of the section containing the given time.
// Returns { start, end } or null if the playhead is outside any section
// (before the first divider, or in a gap zone created by an explicit section.end).
// videoDuration: used as end fallback for the last open-ended section.
export function getSectionBounds(sections, time, videoDuration) {
  if (!sections.length) return null;

  let left  = null;
  let right = null;
  for (const s of sections) {
    if (s.start <= time) left = s;
    else { right = s; break; }
  }

  if (!left) return null;   // before first divider

  // Compute end: stored explicit end overrides derived end.
  const derivedEnd  = right ? right.start : (videoDuration ?? null);
  const sectionEnd  = (left.end != null) ? left.end : derivedEnd;

  // If time is in a gap zone (past the section's explicit end, before the
  // next divider), there is no current section.
  if (left.end != null && time > left.end) return null;

  return { start: left.start, end: sectionEnd };
}

// Find the chapter divider with the largest start at or before the given time.
// Returns the chapter or null. Assumes chapters are sorted by start.
export function nearestChapterLeft(chapters, time) {
  let result = null;
  for (const c of chapters) {
    if (c.start <= time) result = c;
    else break;
  }
  return result;
}

// Get the effective start/end bounds of the chapter containing the given time.
// Same divider logic as getSectionBounds.
export function getChapterBounds(chapters, time, videoDuration) {
  if (!chapters.length) return null;

  let left  = null;
  let right = null;
  for (const c of chapters) {
    if (c.start <= time) left = c;
    else { right = c; break; }
  }

  if (!left) return null;   // before first divider

  const derivedEnd  = right ? right.start : (videoDuration ?? null);
  const chapterEnd  = (left.end != null) ? left.end : derivedEnd;

  if (left.end != null && time > left.end) return null;

  return { start: left.start, end: chapterEnd };
}

// Set a section's end to its derived end (next section's start, or videoDuration).
// Returns true if found and updated, false if not found.
export function fixSectionEnd(sections, id, videoDuration) {
  const idx = sections.findIndex(s => s.id === id);
  if (idx === -1) return false;
  const next = sections[idx + 1];
  sections[idx].end = next ? next.start : (videoDuration ?? null);
  return true;
}

// Set a chapter's end to its derived end (next chapter's start, or videoDuration).
// Returns true if found and updated, false if not found.
export function fixChapterEnd(chapters, id, videoDuration) {
  const idx = chapters.findIndex(c => c.id === id);
  if (idx === -1) return false;
  const next = chapters[idx + 1];
  chapters[idx].end = next ? next.start : (videoDuration ?? null);
  return true;
}

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

// Add a chapter divider at the given time (sorted by start).
// Rejects if the time falls inside a fixed chapter (one with an explicit end),
// or if any existing divider starts within 2 seconds of the new time.
// Returns the new chapter, or null if rejected.
export function addChapterDivider(chapters, time, name = '') {
  const containing = nearestChapterLeft(chapters, time);
  if (containing && containing.end != null && time <= containing.end) return null;
  if (chapters.some(c => Math.abs(c.start - time) < 2)) return null;
  const chapter = createChapter(name, time, null);
  chapters.push(chapter);
  chapters.sort((a, b) => a.start - b.start);
  return chapter;
}
