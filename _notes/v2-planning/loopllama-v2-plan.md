# LoopLlama v2 — Design Plan Summary

Summary of design discussions from:
- ChatGPT "JavaScript Project Workflow" conversation (July-August 2025)
- Claude Code session (February 2026)

---

## What LoopLlama Is

A browser-based YouTube video controller for music practice. Core use case:
hold a guitar and control video playback via single-key Vim-style bindings --
loop sections, set marks, adjust speed, navigate quickly.

- v1 tech: Single vanilla JS file (loopllama.js) + YouTube IFrame API
- Hosting: GitHub Pages (hindman.github.io/loopllama/)
- Storage: localStorage for per-video settings, favorites, marks, loops
- Users: Primarily personal; small guitar-learning community audience

---

## v2 Goals

### 1. Visual Design Overhaul

- Make the app look good while retaining keyboard-first control.
- All settings and state (current time, loop endpoints, favorites, speed)
  should be displayed in a polished UI and also editable via standard web
  controls (text boxes, toggles, checkboxes) for mouse-oriented users.
- No more reliance on browser `prompt()` dialogs for any operation.
  Replace with proper modals and inline editing controls.

### 2. Three First-Class Entities: Sections, Loops, and Marks

These are distinct concepts sharing some overlapping traits. All three are
displayed on the visual timeline.

Sections are musical structural elements: Intro, Verse, A section, B
section, Outro, Vamp, Solo, etc. They correspond to the actual structure
of the musical piece. Sections have a start and end point and can be
activated as the current loop. The typical first step when setting up a
new song is to mark the start of each section.

Loops are named, loopable time ranges that do not have to correspond to
musical structure. They are more generic than sections: a user might
create a loop called "outro-lick" to isolate a specific phrase for
practice. Loops have a name/label as their primary identifier.

Marks are named time points for quick navigation. They are the most
generic entity: any moment the user wants to return to quickly. Possible
future feature: allow a pair of marks to define a loop (TBD).

### 3. Data Model for Marks and Loops

In v1, marks and loops were identified by a fixed number (m1-m9, L1-L9),
with no labels. In v2, the primary identifier is a user-defined name or
label. Numbers become optional metadata: the user can assign a
single-digit shortcut number to any mark or loop, enabling fast keyboard
access (e.g., `L7` to activate loop 7). Numbers are not required; they
simply enable the fastest keyboard path.

### 4. UI and Keyboard Philosophy

The app serves two kinds of users:

- Keyboard-first users (holding an instrument): need fast, memorable key
  bindings for all core operations. Vim-style single-key and multi-key
  bindings (e.g., `L7`, `m3`) are supported. The fewer hand movements
  required, the better.
- Mouse-oriented users: need standard web controls (buttons, text inputs,
  pickers) for all operations. No feature should be keyboard-only.

For operations that require input (naming a mark, setting a time value),
the app uses proper modals or inline editors -- never browser `prompt()`.
For keyboard-triggered navigation of named entities, a picker UI is
supported: the user invokes a picker, types a few characters of the name,
the list narrows, and they press Enter.

Multi-key sequences (e.g., `L7` to activate saved loop 7, `LL` to toggle
looping) are supported via a pending-key buffer: on the first key, wait
briefly (~500ms) for a second key before dispatching. The design rule is
that any key used as a multi-key prefix must not also have a standalone
binding -- this avoids the ambiguity that would otherwise force a delay on
single-key actions. In practice this means following the same sensible
principles used in Vim keybinding design.

When a modal or editor is open, keyboard events must be captured by the
modal, not the global keyboard controller. This requires explicit focus
management in the component architecture.

### 5. Visual Timeline

Display the video as a horizontal timeline showing:

- Sections as labeled regions spanning their time range.
- Loops as labeled regions (visually distinct from sections).
- Marks as labeled point indicators.
- The active loop's start/end endpoints.
- A playhead showing current position.

Timeline should support click-to-jump and ideally drag-to-edit.

### 6. Idiomatic, Maintainable JavaScript

- Replace the flat, procedural, global-variable codebase with modular,
  modern JS.
- Use reactive state management so the UI stays in sync with app data
  without manual DOM updates.

### 7. Responsive Layout

- YouTube iframe and surrounding UI should resize properly when the
  browser window resizes (CSS Flexbox/Grid, percentage-based sizing).

### 8. Persistence

- Export: Download all app data as a JSON file (polish the current
  approach).
- Import: Replace copy-paste-textarea with a proper file picker
  (`<input type="file">`).
- Cross-device sync: Punted. No backend for v2. Users manage their own
  data via export/import.

### 9. Sharing

Two use cases, two mechanisms, a clear line between them:

- Share a whole song: JSON export scoped to a single video (not the full
  localStorage dump). The recipient imports it. Covers sections, loops,
  marks, and all other per-video metadata. The export-single-song
  operation should be distinct in the UI from export-all-data.
- Share just a loop: URL encoding video ID + loop start + end. Compact,
  linkable, works in any messaging platform. The recipient clicks the
  link and LoopLlama opens with that loop ready.

These two cover the known important use cases without ambiguity about
where to draw the line. No other sharing variants are planned for v2.

### 10. Navigation Safety

- Seek stack / go-back: When the user accidentally jumps elsewhere in a
  long video, a "go back" function (bound to a key like `b`) returns to
  the prior position. Implemented as a small ring buffer (~10 entries).
- Selective push: Only push on user-initiated seeks (not loop re-entry).
  Use a threshold (e.g., >5 seconds) to avoid clutter.
- Session persistence: Periodically save current playback position per
  video to localStorage so the user can resume where they left off.

---

## Technology Decisions

UI framework: Lit. Web-standard components, small footprint (~5-10 KB),
HTML template literals instead of JSX, close to native browser APIs, good
fit for learning modern JS without heavy framework abstractions.

Rejected alternatives: Alpine.js (too HTML-centric), React (JSX
everywhere, framework-specific idioms), Svelte (viable but less standard).

Build tool: Vite. Modern, fast, minimal config, good Lit support,
provides dev server with hot reload.

Module system: ES modules (import/export with type="module"). Standard,
supported by all modern browsers, enables clean code splitting.

Storage: localStorage for v2. Simple, sufficient for current scale.
Cross-device sync punted to a future version.

CSS strategy: Shoelace for UI primitives (modals, buttons, text inputs,
toggles, etc.), hand-rolled CSS with CSS custom properties for
app-specific layout (timeline, page structure, video container). A small
set of CSS custom properties defined once serves as design tokens shared
by both Shoelace theming and custom styles. Tailwind was considered and
rejected due to friction with Lit's Shadow DOM.

---

## Known v1 Bugs to Fix in v2

Duration detection: `getDuration()` called too early returns unreliable
values for long videos (e.g., 15 minutes reported for a 55-minute video).
Fix by using the `onStateChange` event to delay reading duration until
actual playback has begun, rather than locking in the first value seen.

---

## Directory Structure

v1 remains live at `loopllama/v1/`. v2 is a clean new implementation
at `loopllama/v2/`, not an incremental refactor of the v1 HTML.

Note: `hindman.github.io/index.html` is the site homepage and lives at
the repo root, separate from the app.

Target structure for `loopllama/v2/`:

```
v2/
├── index.html                  # App entry point
├── src/
│   ├── main.js                 # App bootstrap
│   ├── state.js                # Reactive app state
│   ├── storage.js              # localStorage load/save/export/import
│   ├── videoController.js      # YouTube API: load, play, seek, speed
│   ├── keyboardController.js   # Key dispatch
│   └── components/
│       ├── llama-timeline.js   # Visual timeline
│       ├── llama-controls.js   # Playback controls display
│       ├── llama-sections.js   # Sections editor modal
│       ├── llama-loops.js      # Loops editor modal
│       ├── llama-marks.js      # Marks editor modal
│       ├── llama-favorites.js  # Favorites editor modal
│       ├── llama-settings.js   # Settings modal
│       ├── llama-history.js    # Navigation history modal
│       └── llama-help.js       # Keyboard reference modal
├── styles/
│   └── app.css
└── assets/
```

---

## Implementation Stages

1. Project scaffolding: create `loopllama/v2/`, initialize Vite + Lit,
   verify a basic component renders. Finalize CSS strategy.

2. State and storage modules: port `vi`, `favs`, `DEFAULTS`, and
   localStorage logic. Update data model for named marks and loops with
   optional numeric shortcuts.

3. YouTube API integration: port videoController logic. Fix the duration
   detection bug via `onStateChange`.

4. Basic working UI -- no timeline, no modals: video iframe + live
   display of current time, loop, speed, marks. Keyboard controller
   ported and working. At this point v2 matches v1 behavior in a clean
   new codebase.

5. Timeline component: the centerpiece visual feature. Sections, loops,
   marks, and playhead all displayed. Click-to-jump. Drag-to-edit is
   aspirational.

6. Modal UX: sections, loops, marks, favorites, settings, navigation
   history, help. The keyboard-triggered modal/picker pattern must be
   consistent across all of these.

7. Persistence polish: file picker for import, JSON export, session
   resume.

8. Navigation safety: seek stack / go-back.

9. Deploy: update `loopllama/index.html` to route to v2 (or replace
   the root redirect).

---

## Open Items

- Drag-to-edit on the timeline: aspirational, not committed.
- Marks-to-loop feature: allow defining a loop from two marks (TBD).
- Command palette (VS Code-style): mentioned, not committed.
- Cross-device sync: punted to a future version.

