// state.js -- factory functions for all app entities.
//
// App state is held reactively by the top-level <llama-app> component.
// These factories produce plain objects matching the v2 data schema.
// Mutation functions will be added in later stages as needed.

const SCHEMA_VERSION = 1;

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
    title:       '',
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
