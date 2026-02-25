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
with no labels. In v2, the primary identifier is a user-defined name.
Names are optional: if the user does not name an entity, the UI assigns
a computed display label based on rank order within its type (e.g., "#2"
for the second loop by start time). This label is not stored -- it is
derived on the fly from current sort order. Users who find the instability
of auto-numbers (caused by insertions or deletions) annoying have a clear
remedy: name the entity.

The digit shortcut system from v1 (assigning a number to an entity for
fast keyboard access) is dropped. All entity access goes through the
picker or prefix-key bindings.

### 4. UI and Keyboard Philosophy

The app serves two kinds of users:

- Keyboard-first users (holding an instrument): need fast, memorable key
  bindings for all core operations. Vim-style single-key and multi-key
  bindings are supported. The fewer hand movements required, the better.
- Mouse-oriented users: need standard web controls (buttons, text inputs,
  pickers) for all operations. No feature should be keyboard-only.

For operations that require input (naming a mark, setting a time value),
the app uses proper modals or inline editors -- never browser `prompt()`.
For keyboard-triggered navigation of named entities, a picker UI is
supported: the user invokes a picker, types a few characters of the name,
the list narrows, and they press Enter.

Multi-key sequences (e.g., `ll` to toggle looping, `lo` to open the
loops picker) are supported via a pending-key buffer: on the first key,
wait briefly (~500ms) for a second key before dispatching. The design
rule is that any key used as a multi-key prefix must not also have a
standalone binding -- this avoids the ambiguity that would otherwise force
a delay on single-key actions. In practice this means following the same
sensible principles used in Vim keybinding design.

When a modal or editor is open, keyboard events must be captured by the
modal, not the global keyboard controller. This requires explicit focus
management in the component architecture.

### Which-key overlay

When the user presses a prefix key (`m`, `s`, `l`, etc.) and the
pending-key buffer is waiting for a second key, the app displays a small
overlay listing the available continuations for that prefix. The overlay
disappears when the second key is pressed or on Escape. This is the
which-key pattern (named after the Neovim plugin).

Implementation: the keyboard controller is already in a pending-key state
at this point; displaying the overlay is a reactive state change that
triggers a Lit component to render. The binding definitions double as the
data source for the overlay text.

Design notes:
- Show the overlay after a short delay (~300-400ms) rather than
  instantly, so fast typists who know the binding never see it.
- Use a fixed bar at the bottom of the app rather than a popup -- keeps
  placement predictable.
- One overlay per prefix key; the two-level binding scheme maps cleanly
  to this without needing nested overlays.

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

## Undo

Metadata undo is supported. Before any destructive or modifying operation
(delete mark/loop/section, set endpoints, rename, edit attributes), the
current video state is pushed onto an undo stack. Undo restores the
previous state. Redo is a second stack.

Implementation: snapshot approach. The video metadata object is small
enough that storing ~20 snapshots costs nothing. No need for a command
pattern or per-action undo logic -- just snapshot and restore.

Scope: metadata changes only. Playback state (current time, speed, loop
on/off) is not undoable.

Persistence: undo stack is session-only. No need to persist across
sessions.

Confirmation dialogs for destructive operations are not needed; undo
covers the same safety concern without interrupting flow.

Binding: `u` for undo.

---

## Time Input Formats

Time values appear in jump inputs, loop endpoint fields, mark/section
time fields, and the jumps-picker. All contexts support the same formats.

Separators: colon `:` is standard; forward slash `/` is an easy-to-type
alternative (no Shift required). Both are always treated as separators,
never as decimal points.

    5:13  or  5/13       5 minutes 13 seconds
    1:13:44  or  1/13/44  1 hour 13 minutes 44 seconds
    73:44  or  73/44      condensed form: 73 minutes 44 seconds

Bare integer: always raw seconds. `245` = 4 minutes 5 seconds.

Decimal: period `.` is reserved exclusively for sub-second precision.
One decimal digit is sufficient (human perception limit). `33.5` = 33.5
seconds. `5:13.5` or `5/13.5` = 5 minutes 13.5 seconds.

Comma `,` was considered as an alternative separator but rejected: in
European locales comma is the decimal separator, which would create
ambiguity for some users.

---

## Open Items

- Drag-to-edit on the timeline: aspirational, not committed.
- Marks-to-loop feature: allow defining a loop from two marks (TBD).
- Command palette (VS Code-style): mentioned, not committed.
- Cross-device sync: punted to a future version.

---

## Sections Model

### Divider-based structure

A section is defined by a divider: a time point with an optional label.
Sections are the regions between consecutive dividers. The user plants
dividers at meaningful musical boundaries; the regions between them are
the sections.

Labels are optional. The user can plant all dividers quickly by ear
(purely positional work) and name them later or never. All section
operations -- loop current section, jump to next/previous -- work on
position alone without requiring labels.

### Non-exhaustive coverage

Sections do not need to cover the whole video. Regions before the first
divider and after the last are simply uncharted. There is no requirement
to start at t=0.

### Marking the end of relevant material

To cap the last musically relevant region, the user plants an anonymous
(unlabeled) divider at that point. This creates a real section to the
right of that divider; all section operations apply to it equally. No
special-casing for unnamed sections.

### Current section

The current section is the region bracketed by the two dividers nearest
the playhead (one to the left, one to the right). It is undefined when
the playhead is before the first divider or after the last.

### Looping a section

Activating loop-current-section loads the section's start and end into
the scratch loop (following the same scratch loop model as named loops).
If the current section has no right divider (it is the last and
open-ended), the video's effective end serves as the fallback right
boundary.

### Operations

- Set: plant a new divider at the current playhead position.
- Edit: edit the divider to the left of the current playhead (adjust its
  time, set or change its label).
- Loop: load the current section into the scratch loop.
- Delete: remove the divider to the left of the current playhead.
- Jump next/previous: move the playhead to the next or previous divider.

### Schema note

Section = id + time (required) + label (optional). End time is derived
(next divider's time, or video effective end for the last section). May
be stored as a convenience cache but is not a primary attribute.

---

## Looping Model

### The scratch loop

The active loop is always the scratch loop -- a single unnamed Loop entity
that is the working surface for all looping activity. The scratch loop's
endpoints are what the player actually uses when looping is enabled.

Setting endpoints manually (quick-set keys for start and end) always
writes directly to the scratch loop. Loading a saved Loop or Section
copies its endpoints into the scratch loop; the saved entity is untouched.
All endpoint editing applies to the scratch loop only. It makes no sense
to edit a saved loop's endpoints in the abstract -- the loop must be
active (in the scratch loop) so the user can hear the effect of changes
in real time. The workflow is always: load into scratch, edit, then
optionally save back.

### Operations and their targets

Scratch-loop operations:
- Edit endpoints: interactive mode where the user nudges start/end and
  hears the result immediately. Start point is the one most often fussed
  with; end point less so.
- Save-back: if the scratch loop was loaded from a named entity, a direct
  binding pushes the current endpoints back to that source. No UI needed;
  happens immediately.

Saved-loop operations (act on named Loop entities):
- Load: picker -- select a saved loop, copy its endpoints into the scratch
  loop. The picker is load-only; it is not combined with delete.
- Delete: picker -- select a saved loop, delete it.
- Save: modal -- save the scratch loop's current endpoints as a new named
  loop. Requires user input (name).
- Rename / edit attributes: modal.

### Dirty indicator

If the scratch loop was loaded from a named entity and its endpoints have
since been modified, the UI shows a dirty indicator (e.g., on the
timeline marker) to remind the user that the scratch loop and its source
have diverged.

---

## Data schema

Video:

- id: YouTube video ID; the authoritative key used internally

- url: stored as supplied by the user; kept for display and JSON
  readability, not reconstructed from id.

- duration: from YouTube API

- time: current time. Useful so that when you return to the video
  later, the app remembers where you were.

- start: user-adjustable effective start of the video; defaults to 0.
  Useful for skipping filler intros. Distinct from the active loop start.

- end: user-adjustable effective end of the video; defaults to duration.
  Useful for skipping filler outros.

- name: short user label for the video (replaces the Favorites concept)

- title:
    - longer user-editable title
    - empty until set my user
    - auto-population from YouTube metadata requires the YouTube Data API

- looping:
    - ID of the active Section or Loop entity (null if not looping).
    - Scratch loop policy:
        - When the user sets loop endpoints manually, a scratch loop is
          created -- a single unnamed Loop that persists in the loops list
          until named or discarded.
        - Activating a named Loop or Section copies its endpoints into the
          scratch loop; the named entity is untouched.
        - All endpoint edits apply to the scratch loop only.
        - A dedicated "save back" binding pushes the scratch loop's current
          endpoints to the source entity.
        - If the scratch loop was loaded from a named entity and has since
          been modified, the UI shows a dirty indicator (e.g., on the timeline
          marker) to prompt the user to commit or discard.

- speed: playback speed; defaults to 1.0

- seek_delta: controls <Left>/<Right> seeks; defaults to 5 sec.

- sections: array of Section entities

- loops: array of Loop entities (includes the scratch loop if present)

- marks: array of Mark entities

- jumps:
    - Persisted list of non-small navigational jumps, used for go-back
      navigation.
    - Persisted across sessions.
    - Stored on the video object.

- version: version number of current metadata scheme

Section

- id: generated unique identifier

- name: user label (e.g., "Intro", "Verse", "Solo"); optional. If absent, the
  UI displays a computed rank-order label (e.g., "#1") derived from position
  in timeline order. Not stored.

- time: the divider point (seconds); start of this section

- end: end time (seconds); derived from the next divider's time, or the
  video's effective end for the last section. May be cached for convenience.

Loop

- id: generated unique identifier

- name: user label (e.g., "outro-lick"); optional. If absent, the UI displays
  a computed rank-order label (e.g., "#2"). Not stored. The scratch loop is
  displayed distinctly (e.g., "scratch"), not numbered.

- start: start time (seconds)

- end: end time (seconds)

- source: ID of the Section or Loop this was loaded from, or null if manually
  created. Present on the scratch loop only; enables the save-back operation
  and the dirty indicator.

Mark

- id: generated unique identifier

- name: user label; optional. If absent, the UI displays a computed rank-order
  label (e.g., "#1") derived from position in timeline order. Not stored.

- time: time point (seconds)

