
# LoopLlama v2 Plan

---

## What LoopLlama Is

A browser-based YouTube video controller for music practice. Core use case:
hold a guitar and control video playback via Vim-style bindings -- loop
sections, set marks, adjust speed, navigate quickly.

- v1 tech: Single vanilla JS file (loopllama.js) + YouTube IFrame API
- Hosting: GitHub Pages (hindman.github.io/loopllama/)
- Storage: localStorage for per-video settings, favorites, marks, loops
- Users: Primarily personal; small guitar-learning community audience

---

## v2 Goals

### 1. Visual Design Overhaul

- Make the app look good while retaining keyboard-first control.
- All settings and state (current time, loop endpoints, named videos, speed)
  should be displayed in a polished UI and also editable via standard web
  controls (text boxes, toggles, checkboxes) for mouse-oriented users.
- No more reliance on browser `prompt()` dialogs for any operation.
  Replace with proper modals and inline editing controls.

### 2. Timeline entities: Sections, Loops, and Marks

These are distinct concepts sharing some overlapping traits. All three are
displayed on the visual timeline.

Sections are musical structural elements: Intro, Verse, A section, B section,
Outro, Vamp, Solo, etc. They correspond to the actual structure of the musical
piece. Sections have a start time (and an end time derived from the the next
Section start). Sections cannot overlap. They can be activated as the
scratch-loop (when that occurs the loop's start/end points will include some
extra time or padding, eg 2 sec). The typical first step when setting up a new
song is to mark the start of each section.

Loops are named, loopable time ranges that do not have to correspond to
musical structure. They are more generic than sections: a user might create a
loop called "outro-lick" to isolate a specific phrase for practice. Loops have
a name as their primary identifier (intended to be a short label).

Marks are named time points for quick navigation. They are the most generic
entity: any moment the user wants to return to quickly.

### 3. Data Model for Marks and Loops

In v1, marks and loops were identified by a fixed number (m1-m9, L1-L9), with
no names. In v2, the primary identifier is a user-defined name. Names are
optional: if the user does not name an entity, the UI assigns a computed
display name based on rank order within its type (e.g., "#2" for the second
loop by start time). This name is not stored -- it is derived on the fly from
current sort order. Users who find the instability of auto-numbers (caused by
insertions or deletions) annoying have a clear remedy: name the entity.

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

When the user presses a prefix key (`m`, `s`, `l`, etc.) and the pending-key
buffer is waiting for a second key, the app displays a small which-key-style
overlay listing the available continuations for that prefix. The overlay
disappears when the second key is pressed or on Escape. This is the which-key
pattern (named after the Neovim plugin).

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

- Seek stack / jump-back: When the user accidentally jumps elsewhere in a long
  video, a jump-back function returns to the prior position. The jump list is
  persisted per video (stored in video.jumps); see Data Schema.
- Selective push: Only push on user-initiated seeks (not loop re-entry). Use a
  threshold (e.g., >5 seconds) to avoid clutter.
- Session persistence: Current playback position is saved per video to
  localStorage (stored in video.time) so the user can resume where they left
  off.

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

App-wide state: one top-level component (`<llama-app>`) holds all app
state as Lit reactive properties. Child components receive data as
properties ("props down") and signal changes by firing custom DOM events
("events up"). The top-level component catches those events, updates its
state via plain functions in `state.js`, and Lit re-renders whatever
depends on the changed data. No state-management library needed.
LoopLlama's component tree is shallow enough (timeline, video controls,
and entity panels are all direct children of `<llama-app>`) that prop
drilling is not a concern.

Testing: Vitest (Vite-native, near-zero setup, Jest-compatible syntax).
Unit tests only, added during Stage 3, covering pure logic: time input
parser, state mutation functions, and timeline coordinate math. Component
tests and end-to-end tests are not planned; the YouTube API and Lit
components are tested manually during development.

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
│       ├── llama-settings.js   # Settings modal
│       └── llama-help.js       # Keyboard reference modal
├── styles/
│   └── app.css
└── assets/
```

---

## Implementation Stages

### DONE

1. HTML/CSS prototype: build a static HTML file (no JavaScript) using
   Shoelace components and hand-rolled CSS to validate the page layout
   and controls grouping before writing any application code. This is
   the right time to resolve visual design questions (button
   proliferation, control organization, section sizing). The prototype
   can live outside the v2/ directory and be discarded or kept as
   reference.

2. Project scaffolding: create `loopllama/v2/`, initialize Vite + Lit,
   verify that a basic Lit component renders and hot reload works.

3. State and storage module: implement the data schema (Video, Section,
   Loop, Mark) as defined in the Data Schema section. Implement
   localStorage load/save and JSON export/import stubs. No UI yet --
   just the model and its persistence layer, verifiable via the browser
   console.

4. YouTube API integration: port the video controller logic from v1. Fix
   the duration detection bug via `onStateChange`. Verify that a video
   loads, plays, pauses, seeks, and reports current time correctly.

5. Keyboard controller: implement the multi-key pending-key buffer and
   key dispatch system. Add which-key overlay support (display available
   continuations after ~300ms delay when a prefix key is held). Add
   focus management so that modals and modes capture key events while
   the global controller is inactive.

6a. App shell: Replace the Stage 4 test harness in llama-app.js with a
    real layout structure (header, video area, controls placeholder,
    message area placeholder). Add a URL/ID text input to load videos
    and wire it to videoController. Goal: video loads and plays when
    user enters a URL.

6b. Design foundation: populate `styles/app.css` with CSS custom
    properties as design tokens (colors, spacing, typography). Apply
    Shoelace theme overrides to align component defaults with the app's
    design. Goal: a consistent visual baseline before components are
    built.

6c. Controls component: Create llama-controls.js with time display
    (current / duration), speed display, play/pause button, and
    seek-forward/back buttons. Wire to videoController via custom
    events in llama-app.js.

6d. Time polling: Add a setInterval in llama-app.js (or the controls
    component) that polls currentTime from videoController and updates
    the controls display. Goal: time readout stays live while video
    plays.

6e. Core key bindings: Replace the console.log stubs with real
    implementations for: play/pause (`Space`), speed up/down/reset
    (`=`, `-`, `Backspace`), seek forward/back (`Right`, `Left`), and
    jump-to-start (`Enter`). Goal: basic playback fully controllable
    via keyboard.

7a. Scratch-loop controls: Add scratch-loop display to controls area
    (start/end text boxes, looping toggle, set-start-now /
    set-end-now buttons). Wire `[`, `]`, `ll` key bindings.
    Goal: scratch-loop works via both keyboard and mouse.

7b. Marks: Implement Mark entity CRUD in state.js. Show a marks list
    in controls area (time, optional name). Wire `mm` (set) and `md`
    (delete) bindings. Goal: marks can be set and deleted via keyboard.

7c. Sections: Implement Section entity CRUD in state.js. Show a
    sections list in controls area. Wire `ss` (set), `sd` (delete),
    `sl` (loop current section) bindings. Goal: sections work via
    keyboard.

7d. Named loops: Implement Loop entity CRUD in state.js (save, load,
    delete, save-back). Wire `lo`, `ls`, `ld`, `lb` bindings.
    Goal: named loops can be saved and loaded via keyboard.

7e. Edit-scratch-loop-mode: Implement the mode where `Left`/`Right`
    nudge loop start/end; `Tab` toggles focus between start and end.
    Show mode indicator in message area. Goal: fine-tuning loop
    endpoints works without leaving the keyboard.

8a. Timeline component: horizontal timeline displaying sections,
    scratch-loop range, marks, and playhead. Click-to-jump.
    Drag-to-edit is aspirational and can be deferred.

8b-1. Mechanical fixes:
    - Enter in start/end input: submit then blur, returning focus to the
      app (not leaving focus stuck in the text box).
    - Back/Fwd buttons: replace "Back" / "Fwd" text with arrow symbols
      (e.g., ◀ / ▶).
    - Edit-scratch delta choices: change constant to [0.1, 1, 5, 10, 30].

8b-2. Visual polish and state logic:
    - Play/Pause: make it visually prominent (distinct color or size) as
      the primary action button on the page.
    - Loop button: improve toggle visual treatment (active vs. inactive
      styling clearly distinguishable) without Shoelace. A full toggle
      switch component is deferred until Shoelace is introduced.
    - Invalid loop: looping must never be true when loopStart >= loopEnd.
      Two enforcement points: (a) if the user tries to enable looping
      via `ll` or the button when the range is invalid, block it and
      show a warning -- state stays false; (b) if looping is currently
      true and the user edits endpoints so the range becomes invalid,
      auto-set looping to false. The button always reflects the actual
      state; no visual deception needed.
    - Sub-second display: when editScratchDelta is 0.1, format start/end
      in the text boxes as m:ss.t (one decimal place) so nudges are
      visible. Revert to m:ss when delta >= 1.

8b-3. Layout grouping and edit-scratch visual indicator:
    - Tight grouping: treat "Start label + input + Now button" and "End
      label + input + Now button" as visually cohesive units -- minimal
      or zero gap between the elements in each group, clearly separated
      from adjacent groups.
    - Also try bordered sub-groups as an alternative technique for
      thematic grouping across the full controls area. Assess whether
      it helps overall organization.
    - Edit-scratch mode indicator: when editScratchActive, add a colored
      border or background to the loop row and visually suppress (dim)
      the other control rows to draw focus to the loop controls.

8b-4. Direct time entry in edit-scratch mode:
    - When in edit-scratch-loop mode, pressing a digit, colon, or forward
      slash focuses the active text input (start or end), letting the
      browser handle text entry normally.
    - Enter in the focused input submits the value and blurs the input,
      returning to keyboard nudge mode within edit-scratch-loop mode.
    - A subsequent Enter or Esc (when no input is focused) exits
      edit-scratch-loop mode entirely.

9a. Base modal pattern: create a reusable Shoelace modal scaffolding
    and verify keyboard focus management (Esc/Enter exit, body scroll
    lock). Build url-input-modal as the first concrete modal. Wire
    `y`/`vu` binding.

9b. Video picker and edit-video-modal: video-picker (list of known
    videos, filter by name/title) and edit-video-modal (URL, name,
    title, start, end, delete button). Wire `vv` and `ve` bindings.

9c. Loop modals: save-loop-modal (name + start/end, defaults to
    scratch-loop) and loops-picker (load a saved loop). Wire `ls` and
    `lo` bindings.

9d. Code cleanup (delete/edit handlers): Replace the three wrong
    handler implementations that predate the picker-based delete/edit
    design: deleteSection (used nearestSectionLeft), deleteMark (used
    nearestMarkLeft), and deleteLoop (deleted source loop immediately).
    Convert all three to stubs that show a status message. Fix the
    stale desc strings in keyboardController for `sd`, `ld`, `me`,
    and `md`.

9e. Marks picker and modals: marks-picker component with a `mode`
    prop ('open' | 'delete') so it serves multiple callers. Wire `me`
    (picker → edit-mark-modal) and `md` (picker → delete). The
    marks-picker also serves `jm` (jump to mark), so wire that binding
    here as well. Build edit-mark-modal (name, time fields).

9f. Sections picker and edit modal: sections-picker component,
    same `mode` pattern as marks-picker. Wire `sd` (picker → delete)
    and `se` (edit current section via edit-section-modal -- no picker
    needed, current section is unambiguous). The sections-picker also
    serves `js` (jump to section), so wire that binding here as well.
    Build edit-section-modal (name, time fields).

9g. Loop delete: add a delete mode to the existing loops-picker
    (same `mode` pattern). Wire `ld` (picker → delete).

10. Jump to loop via picker: wire the `jl` binding to the existing
    loops-picker in 'open' mode. (`jm` and `js` were already wired
    in stages 9e/9f; no new component needed here.)

11. Jump by time: build a time-input modal (single field accepting
    mm:ss or raw seconds). Wire `jj` binding. Seek the player to
    the entered time and push a jump-history entry.

12. Entity-type navigation: add `activeEntityType` to app state
    (values: 'any' | 'video' | 'section' | 'loop' | 'mark'; default
    'any'). Build an entity-type picker that sets this value. Wire
    `/` to open the picker. Wire `,` and `.` to seek to the
    previous/next entity of the active type, using playhead position
    as reference. 'any' navigates across all entity types sorted by
    time position.

13a. Chapter state layer: add `activeChapterId` to app state. Add
    `createChapter` factory. Add CRUD helpers (`addChapter`,
    `updateChapter`, `deleteChapter`) to state.js. Wire `chapters`
    and `activeChapterId` as reactive properties in llama-app.js.
    Sync chapters in `_syncFromVideo` and `_saveCurrentState`.

13b. Chapter picker: build `llama-chapter-picker` (mode:
    'open' | 'delete'). Wire `co` to open picker in 'open' mode:
    sets `activeChapterId`, loads chapter's start/end into scratch
    loop, seeks player to chapter.start. Wire `cd` to 'delete' mode.

13c. Edit-chapter-modal: build `llama-edit-chapter-modal` (name,
    Edit-chapter-modal: build `llama-edit-chapter-modal` (name, start, end
    fields). Wire `cc` to open the modal in create mode, pre-filled with the
    current scratch-loop start/end (error if scratch loop is invalid). Wire `ce`
    to edit the active chapter (error message if no `activeChapterId`; no picker
    needed). Wire `cz` as a stub (real impl in 13d).

13d. Chapter zoom: implement `cz` (toggle chapter zoom). Add a
    `chapterZoom` boolean to app state. When true and
    `activeChapterId` is set, pass `scopeStart`/`scopeEnd` from
    the active chapter to `llama-timeline` to restrict the visible
    time range. Clearing `activeChapterId` also resets zoom.

13e. Chapter entity-type navigation: add 'chapter' to the valid
    values of `activeEntityType` (extending Stage 12's 'any' |
    'video' | 'section' | 'loop' | 'mark'). Add 'chapter' as an
    option in the entity-type picker. Ensure `,`/`.` navigation
    finds prev/next chapter by `chapter.start` relative to playhead.

14a. Dropdown component + controls layout: build the reusable dropdown
    component (thin wrapper around Shoelace sl-dropdown/sl-menu/
    sl-menu-item). Add all seven menu buttons to the controls area
    (Video, Section, Loop, Mark, Jump, App, Help). Populate all menu
    items but wire nothing yet -- every item stubs to console.log.
    Goal: layout proven, component working.

14b. Wire all menu items: connect each item to its existing handler,
    modal, or picker. Mark unimplemented items (Undo, Options,
    Export/Import, Help modals) as disabled stubs.

### TODO

15. Persistence: export all data as JSON (full dump and per-video scope).
    Import via file picker. URL loop sharing (encode video ID + start +
    end as query params). Moving this early to support safe testing: set
    up video metadata, export as backup, then experiment freely.

16. Revised Current area: repurpose the existing Messages area component
    into a focused "Current" area displaying top-level info about active
    entities: video name, video title, active chapter name (if any),
    current section name (if any), active loop name, and loop source
    (name of the saved Loop, Section, or Chapter the scratch loop was
    derived from; empty if manually created). Reactive: updates as app
    state changes. Responsive: side column on wide windows; below Actions
    area on narrow.

17. Revised Messages footer: expand the existing which-key footer to
    handle all message types: which-key list (during key-pending),
    edit-scratch-loop cheatsheet (during that mode), warnings (keyboard
    inactive, invalid loop range, etc.), and errors (red; serious
    problems only). Which-key and warnings are rarely needed at the same
    time; the main exception is edit-scratch-loop mode (cheatsheet +
    invalid-time-entry warning), which fits in two rows at typical
    widths. Verify the footer wraps gracefully on narrow windows.

18a. Revised Timeline -- zone skeleton + Play zone: replace the existing
    single-zone timeline component with a 3-zone skeleton (three equal-
    height rows, full video-frame width, zones distinguished by
    background color rather than explicit dividers). Implement the Play
    zone: thick horizontal line, small circle/dot playhead, elapsed/
    remaining color split. Wire click handler to jump to that time.
    Goal: the new skeleton renders and Play zone is fully functional;
    Section and Loop-mark zones are empty placeholders.

18b. Revised Timeline -- Section zone: draw section labels inside each
    section's span (show label only if it fits available width; omit
    entirely if the section is too narrow -- no truncation/ellipsis).
    Draw section divider lines (start of each section). Highlight the
    current section with a distinct color. Add hover tooltip showing
    section name and start time.

18c. Revised Timeline -- Loop-mark zone: render the scratch loop as a
    shaded region (color 1). Render named loop starts as vertical lines
    (color 2, related to color 1); hover tooltip shows name, start, end;
    loop ends are not drawn (deliberate, to reduce clutter). Render
    marks as a distinct symbol (diamond or similar -- not a circle, not
    a vertical line); hover tooltip shows name and time.

18d. Revised Timeline -- mouse clicks + chapter zoom: wire click
    handlers for Section zone (click = jump to section start), Loop-mark
    zone loops (click = jump to loop start + activate as scratch loop),
    and Loop-mark zone marks (click = jump to mark time). No click-to-
    edit; edit via keyboard or menus. Verify chapter zoom (Stage 13d)
    correctly scopes all three zones to chapter.start/end when active.

19. UI polish: with the full layout in place (video area, timeline,
    controls with menus), dial in sizing and proportions -- YouTube
    frame dimensions, spacing between page regions, visual hierarchy
    in the controls area, typography, and any remaining rough edges.

20. Header sizzle: add visual character to the header. Options: llama
    mascot image (preferred if a good image can be sourced via LLM or
    other means); multi-colored flag-style banner with hover quips
    ("Freedom to loop", "Keep on loopin' in the free world", etc.);
    colored typography. Decide and implement one approach.

21. Video-info modal: build llama-video-info-modal -- a generously
    sized, scrollable, formatted display of the current video and all
    its child entities (chapters, sections, loops, marks). Organized by
    entity type; read-only (editing goes through existing modals). Wire
    `vi` key binding. Add "Video info" item to the Video dropdown menu.

22. Undo: snapshot-based undo/redo. Push a video state snapshot before
    each destructive or modifying operation. Implement `u`/`U` bindings.
    Session-only; no persistence needed.

23. Navigation safety: persist the jump list (video.jumps). Push
    user-initiated seeks above the threshold. Implement `jb`/`jf`
    bindings.

24. Options-modal: seek delta, speed delta, and section padding
    settings. Wire `o` binding.

25. Help-modals: general help (via Menu, `hh`, and `?`) and
    key binding help (via Menu or `hk`).

26. Delete-data-modal: checkboxes for selective data clearing.
    Wire `dd` binding.

27. Deploy: update `loopllama/index.html` to route to v2. Verify on
    GitHub Pages.

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

---

## Time Input Formats

Time values appear in jump inputs, loop endpoint fields, mark/section
time fields, and jumping by time. All contexts support the same formats.

The app should support various input styles:

    mm:ss and hh:mm:ss | 5:13 or 32:45 or 1:13:28
    condensed forms    | 73:44 == 1:13:44
    raw seconds        | 245 == 4:05
    decimal seconds    | 99.7 or 34:43.2
    forward slash      | mm/ss and hh/mm/ss

The purpose of the forward slash as a synonym for colon is typing ease (no
need to press Shift). Periods and commas were considered but rejected because
they conflict with the need for decimal seconds or with European locales where
comma is a decimal separator.

---

## Sections Model

### Divider-based structure

A section is defined by a divider: a time point with an optional name.
Sections are the regions between consecutive dividers. The user plants
dividers at meaningful musical boundaries; the regions between them are
the sections.

Names are optional. The user can plant all dividers quickly by ear
(purely positional work) and name them later or never. All section
operations -- loop current section, jump to next/previous -- work on
position alone without requiring names.

### Non-exhaustive coverage and gap zones

Sections do not need to cover the whole video. Regions before the first
divider and after the last are naturally uncharted (shown as gray on the
timeline). There is no requirement to start at t=0.

Gap zones can also appear in the middle of the video. The motivating use
case: a user learning specific parts of a song but skipping material they
are not ready for (a difficult solo, an extended improvisation). They want
Verse and Outro as real sections, with the solo in between shown as an
unclaimed gray zone -- not a section, not numbered, not reachable via
next/previous navigation.

To support this, section `end` is an optional stored attribute. If absent,
the section's end is inferred from the next divider's time (the fast
workflow). If set explicitly, the section ends there and a gap zone exists
between that point and the next divider's time. The UI enforces that a
stored end cannot exceed the next section's start.

This makes the spurious-anonymous-divider workaround unnecessary: the user
does not need to plant a dummy divider just to end a section early.

### Current section

The current section is the region bracketed by the two dividers nearest
the playhead (one to the left, one to the right). It is undefined when
the playhead is before the first divider or after the last.

### Looping a section

Activating loop-current-section loads the section's start and end into
the scratch-loop (following the same scratch-loop model as named loops).
If the current section has no right divider (it is the last and
open-ended), the active chapter's end (if a chapter is active) or
the video's duration serves as the fallback right boundary.

### Operations

- Set: plant a new divider at the current playhead position.
- Edit: edit the divider to the left of the current playhead (adjust its
  start and sometimes end or set/edit its name).
- Loop: load the current section into the scratch-loop.
- Delete: remove the divider to the left of the current playhead.
- Jump next/previous: move the playhead to the next or previous divider.

### Schema note

Section = id + time (required) + name (optional) + end (optional).
End time is either stored explicitly (when the user has set it) or
derived at runtime (next divider's time, or video effective end for the
last section). A stored end creates a gap zone between it and the next
divider.

---

## Looping Model

### The scratch-loop

The active loop is always the scratch-loop -- a single unnamed Loop entity
that is the working surface for all looping activity. The scratch-loop's
endpoints are what the player actually uses when looping is enabled.

Setting endpoints manually (quick-set keys for start and end) always
writes directly to the scratch-loop. Loading a saved Loop or Section
copies its endpoints into the scratch-loop; the saved entity is untouched.
All endpoint editing applies to the scratch-loop only. It makes no sense
to edit a saved loop's endpoints in the abstract -- the loop must be
active (in the scratch-loop) so the user can hear the effect of changes
in real time. The workflow is always: load into scratch, edit, then
optionally save back.

The save-back and delete-source operations apply only when the scratch-loop's
source was a Loop, not a Source. Section-start markers are fairly precise: the
point where, for example, the Outro really starts. But when you loop that
section, you want the scratch-loop to start a bit before the exact section
start and continue a bit after the next section end (those padding amounts
might be customizable; TBD). So a save-back when the scratch-loop source is a
Section is a bit awkward due to the padding issue. But it's even more awkward
because Sections don't have their own end (at least not strictly); rather, the
end is derived from the next section start. So a save-back operation in this
context could alter a Section that isn't the source for the scratch-loop.
Rather than trying to explain all of that to users, the policy will be that
save-back applies only to source loops, not source sections. And the
delete-source operation will adopt a similar policy for parallelism.

### Operations and their targets

Scratch-loop operations:
- Edit endpoints: interactive mode where the user nudges start/end and
  hears the result immediately. Start point is the one most often fussed
  with; end point less so.
- Save-back: if the scratch-loop was loaded from a saved loop, a direct
  binding pushes the current endpoints back to that source. No UI needed;
  happens immediately.

Saved-loop operations (act on named Loop entities):
- Load: picker -- select a saved loop, copy its endpoints into the
  scratch-loop. The picker is load-only; it is not combined with delete.
- Delete: picker -- select a saved loop, delete it.
- Save: modal -- save the scratch-loop's current endpoints as a new named
  loop. Requires user input (name).
- Rename / edit attributes: modal.

### Dirty indicator

If the scratch-loop was loaded from a saved loop and its endpoints have
since been modified, the UI shows a dirty indicator (e.g., on the
timeline marker) to remind the user that the scratch-loop and its source
have diverged.

---

## Data schema

Options:

- seek_delta_default: N
- seek_delta_choices: [N1, N2, ...]
- speed_delta: N
- section_loop_pad_start: N
- section_loop_pad_end: N

Video:

- id: YouTube video ID; the authoritative key used internally

- url: stored as supplied by the user; kept for display and JSON
  readability, not reconstructed from id.

- duration: from YouTube API

- time: current time. Useful so that when you return to the video
  later, the app remembers where you were.

- name: short user label for the video (replaces the Favorites concept)

- title:
    - longer user-editable title
    - empty until set my user
    - auto-population from YouTube metadata requires the YouTube Data API

- looping: boolean; whether looping is currently enabled. The scratch-loop's
  endpoints are always what the player uses when this is true. See the
  Looping Model section for the full scratch-loop policy.

- speed: playback speed; defaults to 1.0

- seek_delta: controls <Left>/<Right> seeks; defaults to 5 sec.

- speed_delta: controls amount that -/= alter the speed.

- chapters: array of Chapter entities

- sections: array of Section entities

- loops: array of Loop entities (includes the scratch-loop if present)

- marks: array of Mark entities

- jumps:
    - Persisted list of non-small navigational jumps, used for go-back
      navigation.
    - Persisted across sessions.
    - Stored on the video object.
    - Jump history max size: 20 entries.

- version: version number of current metadata scheme

Chapter

- id: generated unique identifier

- name: user-defined label (e.g., "Windy and Warm"); required.

- start: start time (seconds)

- end: end time (seconds)

When a chapter is active, the timeline is scoped to chapter.start /
chapter.end. When no chapter is active, the timeline spans the full
video duration. Chapters are optional: a video with no chapters
behaves as if the whole video is in scope. The chapterId on
Section/Loop/Mark is nullable; null means the entity is not
associated with any chapter.

Section

- id: generated unique identifier

- chapterId: ID of the Chapter this section belongs to; nullable.

- name: user label (e.g., "Intro", "Verse", "Solo"); optional. If absent, the
  UI displays a computed rank-order name (e.g., "#1") derived from position
  in timeline order. Not stored.

- time: the divider point (seconds); start of this section

- end: end time (seconds); optional. If stored, the section ends here and
  a gap zone exists between this point and the next divider (shown as gray
  on the timeline). If absent, end is derived at runtime from the next
  divider's time (or the video's effective end for the last section).
  Constraint: stored end must not exceed the next section's time.

Loop

- id: generated unique identifier

- chapterId: ID of the Chapter this loop belongs to; nullable.

- name: user label (e.g., "outro-lick"); optional. If absent, the UI displays
  a computed rank-order name (e.g., "#2"). Not stored. The scratch-loop is
  displayed distinctly (e.g., "scratch"), not numbered.

- start: start time (seconds)

- end: end time (seconds)

- source: ID of the Section or Loop this was loaded from, or null if manually
  created. Present on the scratch-loop only; enables the save-back operation
  and the dirty indicator.

- is_scratch: boolean; true on the one scratch-loop entity. Needed because
  source can be null for a manually-created scratch-loop, making source alone
  insufficient to identify which Loop in the array is the scratch-loop.

Mark

- id: generated unique identifier

- chapterId: ID of the Chapter this mark belongs to; nullable.

- name: user label; optional. If absent, the UI displays a computed rank-order
  name (e.g., "#1") derived from position in timeline order. Not stored.

- time: time point (seconds)

---

## Delete and Edit UX Principles

### Delete operations

Delete is infrequent and destructive, so picker-based selection is the
right model for all entity types (marks, loops, sections, chapters,
videos). "Delete nearest/current" was considered but rejected:

- "Nearest mark" requires a subtle mental model of playhead position
  vs. mark positions -- not discoverable or learnable.
- "Current loop" is ambiguous: loops are not exclusive, so the playhead
  can sit inside multiple loops simultaneously.
- Destructive operations benefit from deliberateness. The extra step of
  a picker is a feature, not overhead, especially since delete is rare.

The `...` convention in menu labels (e.g., "Delete mark...") signals
that a picker selection step will follow before the action completes.

Bulk delete (e.g., checkboxes in the picker) is a natural extension
and can be added if a cleanup-pass use case arises.

### Edit operations

Edit-current is appropriate when "current" is unambiguous and the
operation is frequent:

- video: one current video; edit-current is clear
- section: sections are non-overlapping and exhaustive (divider-based),
  so the playhead is always inside exactly one section; edit-current
  is unambiguous
- chapter: same logic as section
- scratch-loop: one scratch-loop exists; editing it (start/end, label)
  is one of the most frequent operations

Edit-current is NOT used for:

- marks: "nearest mark" has the same ambiguity problem as delete
- named loops: "current loop" is ambiguous (multiple overlapping loops)

Named loop and mark editing goes through a picker instead.

### Scratch-loop and named loop operations

The scratch-loop is its own distinct object, not a proxy for any named
loop. The relationship between scratch-loop and named loops:

- `lo` (open): load a named loop's start/end into the scratch-loop
- `ls` (save-new): create a new named loop from the scratch-loop
- `lb` (save-back): copy the scratch-loop's current start/end back to
  the named loop it was loaded from; no modal, no picker -- immediate
  action on the source loop
- `le` (edit scratch-loop mode): interactive fine-tuning of start/end;
  this is a distinct mode, not a modal

Renaming a named loop (changing its label without adjusting endpoints)
goes through a picker. There is no "edit current named loop" keybinding.

### Non-current edits (video, section, chapter)

Editing an entity without first making it current (e.g., a metadata
cleanup pass) is a plausible use case but is deferred. Edit-current
keybindings are sufficient for now; a picker-based edit path can be
added if actual usage creates friction.

---

## Key bindings

Videos:

    vu | Switch to YouTube video via a URL [url-input-modal]
    y  | YouTube: short synonym for `vu`.
    vv | Switch to video [video-picker]
    ve | Edit current video [edit-video-modal]
    vd | Delete video [via picker]
    vi | Video info [video-info-modal]

Playing:

    <Space>  | Play/pause current video
    -        | Speed: slower by 5 pct poins
    =        | Speed: faster by 5 pct poins
    <Bspace> | Reset speed to 100%

Navigation:

    <Right> | Seek forward
    <Left>  | Seek backward
    <Down>  | Seek delta: reduce
    <Up>    | Seek delta: increase
    ,       | Previous entity
    /       | Activate entity-type dropdown
    .       | Next entity
    <Enter> | Jump: to start (of loop if looping, else video)
    jj      | Jump: by time
    js      | Jump: to section via picker
    jl      | Jump: to loop via picker
    jm      | Jump: to mark via picker
    jh      | Jump: within jump-history via jump-history-picker
    jb      | Jump: backward within jump-history
    jf      | Jump: forward within jump-history

Looping:

    ll   | Toggle looping on/off
    [    | Set scratch-loop start to current time
    ]    | Set scratch-loop end to current time
    lo   | Open: opens/loads a saved-loop into scratch-loop [loops-picker]
    ls   | Save-new: a new loop [save-loop-modal]
    lb   | Save-back: save scratch-loop endpoints back to source Loop
    le   | Edit: scratch-loop [edit-scratch-loop-mode]
    ld   | Delete loop [via picker]

Chapters:

    cc | Create new chapter [new-chapter-modal, using scratch-loop start/end]
    co | Open chapter [via picker => populate scratch-loop start/end]
    ce | Edit current chapter
    cd | Delete chapter [via picker]
    cz | Toggle chapter timline zoom status

Sections:

    ss | Set: sets a new section divider at current time
    se | Edit: edit current section [edit-section-modal]
    sl | Loop: makes current section the scratch-loop source
    sd | Delete section [via picker]

Marks:

    mm   | Set mark at current time
    me   | Edit mark [via picker]
    md   | Delete mark [via picker]

Undo and help:

    u  | Undo: most recent edit
    U  | Redo: reverses an Undo
    hh | Help: general
    hk | Help: key bindings
    ?  | Synonym for `hk`
    o  | Options-modal

Data:

    dd | Delete: delete-data-modal
    de | Export: app data as JSON
    di | Import: app data from JSON
    dI | Inspect: app data as JSON [bottom of web page]
    dv | Share: video data as JSON
    dl | Share: scratch-loop [via URL]

---

## Modals, pickers, and other UI elements

Video-info-modal:
    - Informational model.
    - User-oriented display of all data about the current video.

URL-input-modal:
    - Simple modal to enter YouTube URL.
    - Should:
        - Handle common YouTube URL flavors (eg, watch?v=, youtu.be/, etc).
        - Accept just a video ID (eg, zP4lYpsfL8c).
        - Respect the `t` query parameter (eg, ?t=354).
        - Not be tripped up by other YouTube query parameters.

Video-picker:
    - Typical picker interface listing the known videos.
    - Displays name, title, maybe duration, maybe YouTube ID.
    - Filters on "NAME TITLE".

Jump-time-modal:
    - Simple modal to enter a time.

Standard entity pickers:
    - Used in contexts like jump and open.
    - chapters-picker
    - sections-picker
    - loops-picker
    - marks-picker
    - jump-history-picker

Edit-video-modal:
    - Basic modal to edit URL, name, and title.
    - Also a delete-video button.

Save-loop-modal:
    - Modal to edit name, start, end.
    - With picker to set source, which populates start/end.
    - Defaults to scratch-loop attributes.

Edit-scratch-loop-mode:
    - Mode to edit start/end.
    - Needs visual indicators to communicate that the mode has changed, to
      focus attention on the scratch-loop, and to provide a cheatsheet for the
      mode's key bindings.
    - For play/pause if focus in on start, play starts at the loop beginning;
      if on end, starts 3 sec before end.

    <Tab>          | Toggle focus between start or end
    <Left> <right> | Move start/end
    <Up> <down>    | Change the move delta
    <Space>        | Play/pause the video at the relevant spot
    <Backspace>    | Reset: start to video-start or end to video-end
    <Enter>        | Submit

Edit-section-modal:
    - Basic modal to edit section attributes.

Edit-mark-modal:
    - Basic modal to edit mark attributes.

Help-modals:
    - Access via the `hh` and `hk` bindings or via Action menu.
    - General help (hh): explains the basics:
        - What LoopLlama is.
        - Getting started.
        - Basic concepts.
        - Etc.
    - Key bindings (hk):
        - Compact, well-organized info on bindings.

Options-modal:
    - A modal where the user can customize app settings:
        - seek delta:
            - default
            - list of choices
        - speed delta
        - section loop padding amounts
            - start
            - end

Delete-data-modal:
    - Modal with checkboxes to select subsets of the data to clear.
        - current entities:
            - video
            - section
            - loop
            - mark
        - individual entities:
            - videos
            - sections
            - loops
            - marks
        - maybe uber-checkboxes for "all" variants of the entities
        - all data

Modal, mode, and picker exit keys:
    <Esc>   | Exit and take no action
    <Enter> | Submit or exit [varies by context]

Seek deltas:
    - Default: 5 sec.
    - Choices via <Up> and <Down>: 0.1, 1, 5, 10, 30, 60, 300, 1800.

---

## Mockup of page layout and UI controls

### ASCII mockup of the main page areas

This section uses ASCII-art to mockup the page header and the general layout
of the page. At least for non-small browser windows on a regular computer
screen, the goal would be a layout where everything is visible on one screen
without forcing the user to scroll or page up/down.

    ==============================================================================
    LoopLlama [image]                                        The Fifth Fret | Code
    ==============================================================================

      ---------------------------------------------------      -----------------
      |                                                 |      |               |
      |                                                 |      |               |
      |                                                 |      |               |
      |                                                 |      |               |
      |                                                 |      |               |
      |                   YouTube area                  |      |   Message     |
      |                                                 |      |   area        |
      |                                                 |      |               |
      |                                                 |      |               |
      |                                                 |      |               |
      |                                                 |      |               |
      |                                                 |      |               |
      |                                                 |      |               |
      ---------------------------------------------------      -----------------

      ---------------------------------------------------
      |                 Timeline area                   |
      ---------------------------------------------------

      ---------------------------------------------------------------------------
      |                                                                         |
      |                                                                         |
      |                                                                         |
      |                      Controls and info area                             |
      |                                                                         |
      |                                                                         |
      |                                                                         |
      |                                                                         |
      ---------------------------------------------------------------------------

### Message area.

This area is used to show various kinds of information:
    - Current video name and title.
    - Loop source.
    - Contextual keyboard shortcut information:
        - During key pending.
        - During edit-scratch-loop-modal.
    - Confirmation messages about actions taken.
    - Warnings and error messages.

### Timeline

Real estate will be tight in this area, so most visual indicators will
come in the form of small marks/symbols indicating various start times (for
sections and marks) and ranges (for the scratch-loop).

The timeline will have two zones, thin rectangles stacked vertically on top of
each other, each the full width of the YouTube video's frame/timeline.
    - Video zone:
        - Like the YouTube timeline.
        - Shows the location of the playhead.
        - User can click this zone to change the playhead location.
    - Entity zone:
        - Sections:
            - Display section ranges.
            - Section names are shown if they fit in the space.
            - The current section's range is style differently.
            - Non-section regions are styled differently.
        - Scratch-loop:
            - Displays the range.
        - Marks:
            - Displays locations.
        - Mouse:
            - Hover: shows entity name
            - Click: to edit entity.

Drag to edit. This is deferred, at least for now. Whether the time points in
the timeline are editable via dragging is an open question. In my v1
experience, I don't think editing via dragging would have been very effective.
Typically one wants to set time points while viewing/listening to the video.
Dragging, by contrast, is sort of a blind operation.

### Controls area

Policy:
    - Direct controls only for frequently used operations.
    - Everything else is organized under menus.
    - Users annoyed by 2 clicks rather than 1 can learn the key bindings.
    - Controls are organized in labelled groups as documented below.

Play:

    play/pause    | button
    time          | text box

    Notes:
        - Make time a text box, not informational item.
        - The jump-by-time modal can be dropped.
        - Instead `jj` moves focus to the box.
        - And the "Jump to time" menu item can be dropped.
        - Mouse user can directly click to edit in the usual way.
        - Move video duration to Current Area.

Speed:

    speed | text box [clamp: 25 - 200, increments of 5]

Navigate:

    seek: back    | button
    seek_delta    | dropdown
    seek: forward | button

    previous: entity | button
    entity: type     | dropdown
    next: entity     | button

    Notes:
        - Seek controls now in this group [previously "Play" group]

Looping:

    looping: on/off  | toggle
    start            | text box
    start: Now       | button
    end              | text box
    end: Now         | button
    loop_nudge_delta | dropdown (same values as seek_delta)

    Notes:
        - Loop nudge dropdown is new.

Actions:

    Notes:
        - These are menus.
        - The plan below implies various changes:
            - Wording: indicated explicitly.
            - Grouping: use the ordering/grouping as listed.
            - Deletions implied:
                - Loop:
                    - Toggle loop
                    - Edit scratch loop
                - Jump:
                    - Jump by time

    Video:
        - Load URL
        - Open video [currently "Switch video"]
        - Edit current
        - Delete video
        ----------------------------
        - Creater chapter
        - Open chapter
        - Edit chapter
        - Delete chapter
        - Zoom chapter

    Section:
        - Set section here
        - Edit current section
        - Loop current section
        - Delete section

    Loop:
        - Open loop [currently called "Open saved loop"]
        - Save new loop
        - Delete loop
        - Save back to loop source [currently called "Save back"]

    Mark:
        - Set mark here
        - Edit mark
        - Delete mark

    Jump:
        - Jump to Section
        - Jump to Loop
        - Jump to Mark
        ----------------------------
        - Jump history
        - Jump Back
        - Jump Forward

    App:
        - Undo
        - Redo
        ----------------------------
        - Share: loop via URL
        - Share loop URL
        ----------------------------
        - Export current video [currently "Export this video"]
        - Export all data
        - Import data
        - Inspect JSON
        ----------------------------
        - Bulk data delete
        - Options

    Help:
        - General help
        - Key bindings

## Revised UI plan

Note: This section supersedes earlier UI descriptions where they conflict.
It reflects decisions made after hands-on evaluation of the v2 app.

### Current area (formerly Messages area)

Repurpose the Messages area into a focused "Current" area that shows
top-level info about the user's active entities:
    - Video name
    - Video title
    - Chapter name (LL Chapter entity, if any active)
    - Section name (if any current section)
    - Loop name (if any; the scratch loop's name or source name)
    - Loop source: name of the source entity (saved Loop, Section, or
      Chapter) from which the scratch loop was derived; empty if the
      scratch loop was created manually

Layout:
    - Wide window: Current area appears beside the YouTube video player,
      as in the original page mockup (the "Message area" column).
    - Narrow window (iPad or skinny browser): Current area moves below
      the controls/actions area. Full vertical stack order on narrow:
      Header > Video player > Controls > Actions > Current area >
      Messages footer.

### Messages footer (formerly Which-key area)

The footer was improvised during dev and proven effective. Expand its
purpose to handle all message types:
    - Which-key info: available key continuations during key-pending.
    - Scratch-loop-edit key bindings: cheatsheet shown while in
      edit-scratch-loop mode.
    - Warnings: keyboard control inactive, loop start/end violation, etc.
    - Errors: reserved (red color) for serious problems only.

Which-key and other messages are rarely needed simultaneously. The main
exception is edit-scratch-loop mode, where the which-key cheatsheet and
an invalid-time-entry warning may coexist. This fits comfortably in two
rows at typical window widths. The footer already wraps well on narrow
windows.

### Video-info modal

A new modal for viewing all information about the current video and its
child entities (chapters, sections, loops, marks). Intended as a
convenient information resource when setting up or reviewing a video.
    - Trigger: `vi` key binding; also available via the Video dropdown.
    - Design: generously sized, scrollable, nicely formatted for reading
      (not raw JSON). Organized by entity type.
    - Initially read-only; editing goes through the existing modals.

### Timeline

The existing timeline is a functional first draft but is cluttered and
confusing, especially for loops and marks. Replace with a 3-zone design.

Three zones stacked vertically, each the full width of the video frame,
each the same height (the current Play zone is too thin; all three
should be equal first-class citizens). Zone dividers may be implicit
(different background color) rather than explicit lines.

Play zone:
    - Mimics the YouTube timeline idiom: a thick horizontal line with a
      small circle/dot for the playhead.
    - Left portion (elapsed): colored; right (remaining): gray.
    - Click to jump to that time.

Section zone:
    - Section labels drawn inside each section's span.
    - Show label only if it fits the available width; show nothing if
      the section is too narrow (no truncated text with ellipsis).
    - Section start lines (dividers).
    - Current section: slightly different color.

Loop-mark zone:
    - Current scratch loop: shaded region (color 1); conveys extent.
    - Named loop starts: vertical lines (color 2, related to color 1).
      Loop ends are deliberately not shown to reduce clutter; hover
      reveals name, start, and end for any named loop.
    - Marks: distinct symbol (diamond or similar -- not a circle like
      the playhead, not a line like sections/loops).
    - No persistent zone labels; users discover purpose by using the app.

Mouse interactions:
    - Hover on any entity: tooltip showing name, start/end time.
    - Play zone click: jump to that time.
    - Section zone click: jump to section start.
    - Loop click: jump to loop start and activate as scratch loop.
    - Mark click: jump to mark time.
    - No click-to-edit (timing/UX conflict with single-click). Edit
      via keyboard bindings or the Action menus.

### Header

Layout (implemented):

    LoopLlama [mascot]                    [flag] | The Fifth Fret | Code

- App title on the left, immediately followed by the llama mascot image.
- Right side: the flag strip, then nav links separated by pipes.
- The flag and mascot are sized to 1.8rem height so they sit flush
  within the header content area without expanding it.
- Mascot is a PNG (black line art on white) rendered with
  CSS `filter: invert(1)` to flip it for the dark header background.
- Hover quips on the flag are planned but not yet implemented.

#### The Flag

The header includes a thin horizontal strip of seven equal vertical
color bands, styled after the aesthetic of national and movement flags.
It is a deliberate political statement: an amalgam flag representing
the broad historical coalition that has fought fascism and
authoritarianism. The color order reads left to right as a narrative
arc -- from the hardest and darkest symbols of resistance, through a
breath of peace at center, toward hope and liberty on the right.

Band order and historical inspiration:

1. Black (#1a1a1a) -- Anarchism and anarcho-syndicalism, the oldest
   visual language of anti-fascist organizing. Black and red together
   predate World War II as the colors of resistance to state tyranny.

2. Deep red (#c0392b) -- The labor movement, international socialism,
   and the blood of martyrs. Red is the one color that appears in
   virtually every anti-authoritarian tradition.

3. Purple (#6c3483) -- The tricolor of the Second Spanish Republic
   (red, yellow, purple), whose defense drew volunteers from 53
   countries to the International Brigades -- perhaps the broadest
   anti-fascist coalition in history before the world war.

4. White (#f0f0f0) -- Peace, purity of purpose, and nonviolent
   resistance. Also the center band of the French tricolor (liberty
   and civic equality) and the white of the Polish Solidarity movement,
   one of the great nonviolent campaigns against authoritarian rule.
   Placed at the center as a pivot point between the darker symbols of
   struggle and the warmer colors of hope.

5. Gold (#d4ac0d) -- The gold of the German democratic tradition
   (schwarz-rot-gold), the colors of the Weimar Republic that the
   Nazis explicitly rejected and the Federal Republic later reclaimed.
   A color that carries the meaning: survived, endured, rebuilt.

6. Forest green (#1e8449) -- Pan-African resistance, drawn from
   Marcus Garvey's flag (black, red, green). Represents the struggle
   against colonial domination and racial authoritarianism -- a
   distinct but deeply related form of the same evil.

7. French blue (#2471a3) -- Liberty and the republic, from the French
   tricolor. The Resistance reclaimed these colors from Vichy
   collaboration. Also evokes the broader ideal of liberal democratic
   governance as the alternative to authoritarian rule.

The flag is implemented as an SVG at public/flag.svg with a 700x100
viewBox (7:1 ratio), a thin inset border, and no text -- the colors
speak for themselves to anyone who recognizes them.

