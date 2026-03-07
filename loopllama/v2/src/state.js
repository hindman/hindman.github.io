// state.js -- factory functions for all app entities.
//
// App state is held reactively by the top-level <llama-app> component.
// These factories produce plain objects matching the v2 data schema.
// Mutation functions will be added in later stages as needed.

export const SCHEMA_VERSION = 2;

function createId() {
  return Math.random().toString(36).slice(2, 9);
}

// App-wide defaults. Also used to initialize per-video seek/speed deltas.
export const DEFAULT_OPTIONS = {
  seek_delta_default:  5,
  seek_delta_choices:  [0.1, 1, 5, 10, 30, 60, 300, 1800],
  speed_delta:         0.05,
  section_loop_pad_start: 2,
  section_loop_pad_end:   2,
};

// Top-level app state (persisted to localStorage as one object).
export function createAppState() {
  return {
    version:        SCHEMA_VERSION,
    options:        { ...DEFAULT_OPTIONS },
    videos:         [],
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
    speed_delta: DEFAULT_OPTIONS.speed_delta,
    chapters:    [],
    sections:    [],
    loops:       [createScratchLoop()],  // always one scratch loop
    marks:       [],
    jumps:       [],
    version:     SCHEMA_VERSION,
  };
}

// Create a Chapter.
// name is required; start/end are times in seconds.
export function createChapter(name, start, end) {
  return { id: createId(), name, start, end };
}

// Create a Section divider.
// time: the divider point in seconds (required).
// name: optional user label (e.g., "Verse", "Solo").
// end is not included here; it is either derived at runtime or set later
// via direct property assignment when the user explicitly limits the section.
export function createSection(time, name = '') {
  return { id: createId(), chapterId: null, time, name };
}

// Create a named Loop.
export function createLoop(start, end, name = '') {
  return { id: createId(), chapterId: null, name, start, end, source: null, is_scratch: false };
}

// Create the scratch loop. One exists per video at all times.
// Endpoints default to 0/0; they are set when the user loads a loop or
// manually sets start/end points.
export function createScratchLoop() {
  return { id: createId(), name: '', start: 0, end: 0, source: null, is_scratch: true };
}

// Create a Mark.
export function createMark(time, name = '') {
  return { id: createId(), chapterId: null, time, name };
}

// Add a chapter (sorted by start time). Returns the new chapter.
export function addChapter(chapters, name, start, end) {
  const chapter = createChapter(name, start, end);
  chapters.push(chapter);
  chapters.sort((a, b) => a.start - b.start);
  return chapter;
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
// Returns the new mark.
export function addMark(marks, time, name = '') {
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

// Add a section divider at the given time (sorted by time).
// Returns the new section.
export function addSection(sections, time, name = '') {
  const section = createSection(time, name);
  sections.push(section);
  sections.sort((a, b) => a.time - b.time);
  return section;
}

// Remove the section with the given id from the sections array.
export function deleteSectionById(sections, sectionId) {
  const idx = sections.findIndex(s => s.id === sectionId);
  if (idx !== -1) sections.splice(idx, 1);
}

// Find the section divider with the largest time at or before the given time.
// Returns the section or null. Assumes sections are sorted by time.
export function nearestSectionLeft(sections, time) {
  let result = null;
  for (const s of sections) {
    if (s.time <= time) result = s;
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

// Get the effective start/end bounds of the section containing the given time.
// Returns { start, end } or null if the playhead is outside any section
// (before the first divider, or in a gap zone created by an explicit section.end).
// videoDuration: used as end fallback for the last open-ended section.
export function getSectionBounds(sections, time, videoDuration) {
  if (!sections.length) return null;

  let left  = null;
  let right = null;
  for (const s of sections) {
    if (s.time <= time) left = s;
    else { right = s; break; }
  }

  if (!left) return null;   // before first divider

  // Compute end: stored explicit end overrides derived end.
  const derivedEnd  = right ? right.time : (videoDuration ?? null);
  const sectionEnd  = (left.end != null) ? left.end : derivedEnd;

  // If time is in a gap zone (past the section's explicit end, before the
  // next divider), there is no current section.
  if (left.end != null && time > left.end) return null;

  return { start: left.time, end: sectionEnd };
}
