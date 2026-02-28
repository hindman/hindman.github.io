
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
a name/label as their primary identifier.

Marks are named time points for quick navigation. They are the most generic
entity: any moment the user wants to return to quickly.

### 3. Data Model for Marks and Loops

In v1, marks and loops were identified by a fixed number (m1-m9, L1-L9), with
no labels. In v2, the primary identifier is a user-defined name. Names are
optional: if the user does not name an entity, the UI assigns a computed
display label based on rank order within its type (e.g., "#2" for the second
loop by start time). This label is not stored -- it is derived on the fly from
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

6. Minimal working app: wire together stages 3-5 into a functional app
   -- video iframe, basic controls area (time, speed, seek), URL
   loading, and core key bindings (play/pause, speed, seek,
   jump-to-start). No entities yet. End state: app handles basic
   playback at least as well as v1.

7. Three entities -- data and controls: implement the full data model
   for Sections, Marks, and scratch-loop/Loops. Add the controls area
   display (name/time boxes for each entity type). Add all keyboard
   bindings for entity operations. Add inline editing modes
   (edit-scratch-loop-mode, edit-section-mode, edit-mark-mode). End
   state: all entity operations work via keyboard; entities visible in
   controls area.

8. Timeline component: horizontal timeline displaying sections,
   scratch-loop range, marks, and playhead. Click-to-jump. Drag-to-edit
   is aspirational and can be deferred.

9. Pickers and modals: build the full modal/picker UX: url-input-mode,
   video-picker, jumps-picker, loops-picker, save-loop-modal,
   edit-video-modal. All must be keyboard-triggerable and follow
   consistent exit-key conventions (Esc/Enter).

10. Undo: snapshot-based undo/redo. Push a video state snapshot before
    each destructive or modifying operation. Implement `u`/`U` bindings.
    Session-only; no persistence needed.

11. Persistence: export all data as JSON (full dump and per-video scope).
    Import via file picker. URL loop sharing (encode video ID + start +
    end as query params).

12. Navigation safety: persist the jump list (video.jumps). Push
    user-initiated seeks above the threshold. Implement go-back via
    the jumps-picker's `j,` grammar.

13. Ancillary modals: options-modal (seek delta, speed delta, section
    padding), help-modal (key bindings reference), delete-data-modal
    (checkboxes for selective data clearing).

14. Deploy: update `loopllama/index.html` to route to v2. Verify on
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
time fields, and the jumps-picker. All contexts support the same formats.

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

A section is defined by a divider: a time point with an optional label.
Sections are the regions between consecutive dividers. The user plants
dividers at meaningful musical boundaries; the regions between them are
the sections.

Labels are optional. The user can plant all dividers quickly by ear
(purely positional work) and name them later or never. All section
operations -- loop current section, jump to next/previous -- work on
position alone without requiring labels.

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
open-ended), the video's effective end serves as the fallback right
boundary.

### Operations

- Set: plant a new divider at the current playhead position.
- Edit: edit the divider to the left of the current playhead (adjust its
  time, set or change its label).
- Loop: load the current section into the scratch-loop.
- Delete: remove the divider to the left of the current playhead.
- Jump next/previous: move the playhead to the next or previous divider.

### Schema note

Section = id + time (required) + label (optional) + end (optional).
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

Note that save-back applies only when the scratch-loop's source was a Loop,
not a Section. The reason is that section-start markers are fairly precise:
the point where, for example, the Outro really starts. But when you loop that
section, you want the scratch-loop to start a bit before the exact section
start and continue a bit after the next section end (those padding amounts
might be customizable; TBD). So a save-back when the scratch-loop source is a
Section is a bit awkward due to the padding issue. But it's even more awkward
because Sections don't have their own end (at least not strictly); rather, the
end is derived from the next section start. So a save-back operation in this
context could alter a Section that isn't the source for the scratch-loop.
Rather than trying to explain all of that to users, the policy will be that
save-back applies only to source loops, not source sections.

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

- looping: boolean; whether looping is currently enabled. The scratch-loop's
  endpoints are always what the player uses when this is true. See the
  Looping Model section for the full scratch-loop policy.

- speed: playback speed; defaults to 1.0

- seek_delta: controls <Left>/<Right> seeks; defaults to 5 sec.

- sections: array of Section entities

- loops: array of Loop entities (includes the scratch-loop if present)

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

- end: end time (seconds); optional. If stored, the section ends here and
  a gap zone exists between this point and the next divider (shown as gray
  on the timeline). If absent, end is derived at runtime from the next
  divider's time (or the video's effective end for the last section).
  Constraint: stored end must not exceed the next section's time.

Loop

- id: generated unique identifier

- name: user label (e.g., "outro-lick"); optional. If absent, the UI displays
  a computed rank-order label (e.g., "#2"). Not stored. The scratch-loop is
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

- name: user label; optional. If absent, the UI displays a computed rank-order
  label (e.g., "#1") derived from position in timeline order. Not stored.

- time: time point (seconds)

---

## Key bindings

Videos:

    vu | Switch to YouTube video via a URL [url-input-mode]
    y  | YouTube: short synonym for `vu`.
    vv | Switch to video [video-picker]
    ve | Edit video attributes [edit-video-modal]

Playing:

    <Space>  | Play/pause current video
    -        | Speed: slower by .05
    =        | Speed: faster by .05
    <Bspace> | Reset speed to 1.0

Navigation:

    <Right> | Seek forward
    <Left>  | Seek backward
    <Down>  | Seek delta: reduce
    <Up>    | Seek delta: increase
    <Enter> | Jump: to start (of loop or video)
    j       | Jump [jumps-picker]

Looping:

    ll   | Toggle looping on/off
    [    | Set scratch-loop start to current time
    ]    | Set scratch-loop end to current time
    lo   | Open: opens/loads a saved-loop into scratch-loop [loops-picker]
    ls   | Save-new: a new loop [save-loop-modal]
    lb   | Save-back: save scratch-loop endpoints back to source Loop
    le   | Edit: scratch-loop [edit-scratch-loop-mode]

Sections:

    ss | Set: sets a new section divider at current time
    se | Edit: edit current section [edit-section-mode]
    sl | Loop: makes current section the scratch-loop source
    sd | Delete: the current section [delete section-divider to the left]
    .  | Jump: next section
    ,  | Jump: previous section

Marks:

    mm   | Set mark at current time
    me   | Edit: nearest mark (to the left) [edit-mark-mode]
    md   | Delete: nearest mark (to the left)

Undo and help:

    u | Undo: most recent edit
    U | Redo: reverses an Undo
    h | Help-modal
    o | Options-modal

Data:

    dd | Delete: delete-data-modal
    de | Export: app data as JSON
    di | Import: app data from JSON
    dv | Share: video data as JSON
    dl | Share: scratch-loop [via URL]
    dI | Inspect: app data as JSON [bottom of web page]

---

## Modals, pickers, and other UI elements

Video-info-modal:
    - Informational model.
    - User-oriented display of all data about the current video.

URL-input-mode:
    - Puts focus on the URL text box with the full URL selected, so the user
      can easily paste to replace the old URL.
    - Pressing Esc or Enter returns focus to the main app.
    - Text box should:
        - Handle common YouTube URL flavors (eg, watch?v=, youtu.be/, etc).
        - Accept just a video ID (eg, zP4lYpsfL8c).
        - Respect the `t` query parameter (eg, ?t=354).
        - Not be tripped up by other YouTube query parameters.

Video-picker:
    - Typical picker interface listing the known videos.
    - Displays name, title, maybe duration, maybe YouTube ID.
    - Filters on "NAME TITLE".

Edit-video-modal:
    - Basic modal to edit URL, name, title, start, end.
    - Also a delete-video button.

Jumps-picker:
    - Picker items include:
        - video start
        - back (most recent jumplist entry)
        - sections
        - loops
        - marks
        - jumplist entries
    - Supports a command-line grammar.
    - Supports some immediate-select behavior (Enter press not needed).

        TIME    | Jump to a specific time
        QUERY   | Regular picker behavior
        X QUERY | Pre-filter picker items to just type X
        X,      | Jump to previous entity of type X [immediately]
        X.      | Jump to next entity of type X [immediately]

        Where X can take these values:

            l   | Loops
            s   | Sections
            m   | Marks
            j   | Jumplist

Loops-picker:
    - Typical picker.

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
      if on end, starts 5 sec before end.

    <Tab>          | Toggle focus between start or end
    <Left> <right> | Move start/end
    <Up> <down>    | Change the move delta
    <Space>        | Play/pause the video at the relevant spot
    <Backspace>    | Reset to start or end of video
    <Enter>        | Submit

Edit-section-mode:
    - Barely a mode because section name and start are already on the page and
      don't requires special key bindings to support edits.
    - Selects the section name so the user can edit it.
    - The tab-order should be arranged so that <Tab> takes the user to the
      Section time if edits are desired.
    - In the future, might become a true modal if there end up being more
      Section attributes.

Edit-mark-mode:
    - Barely a mode since current mark's name/time are on the page.
    - Could become a true modal in future.

Help-modal:
    - Displays the main help text explaining the basics:
        - What LoopLlama is.
        - Getting started.
        - Basic concepts.
        - Etc.
    - To see key bindings the user can press one of these to list the relevant
      bindings (either all or for a specific topic).
    - The main help modal should communicate a cheat sheet for the bindings.

        k | All
        v | Videos
        p | Playing
        n | Navigatation
        l | Loops
        s | Sections
        m | Marks
        a | Application

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
    LoopLlama [image]                     The Fifth Fret | Code | Help | Settings
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

This is an open space, tentatively reserved as an area for warning/error
messages and perhaps context-based cheat-sheet information.

Alternatively, or in addition, it could become extra real estate if we are
struggling to fit all of the controls on one typical computer screen.

If the browser window is made small (or on smaller devices) this area would
need to be pushed farther down the page.

### Timeline

Real estate will be tight in this area, so most visual indicators will
come in the form of small marks/symbols indicating various start times (for
sections and marks) and ranges (for the scratch-loop).

The names of the underlying entities (Section, Loop, Mark) will be visible
on mouse hover and, if feasible, editable via click.

Whether the time points in the timeline are editable via dragging is an open
question. In my v1 experience, I don't think editing via dragging would have
been very effective. Typically one wants to set time points while
viewing/listening to the video. Dragging, by contrast, is sort of a blind
operation.

Elements shown in the timeline:

    video        | current time
    sections     | starts
    scratch-loop | range
    marks        | time

### Controls area

Currently, many elements below are listed as generic "button". The result
would be a page with a proliferation of buttons. Here are some options and
factors that could help:

- Some of the buttons (eg, seek forward/reverse) are small.
- Combine some element pairs into specialized controls
    - up/down, increase/decrease, next/previous
    - closely related elements: loop start and set start to current time
- Combine some buttons into multi-step interfaces (eg, "Save" loop button
  might then offer choice between "new" or "modify source").
- Action dropdowns.
- Buttons styled to look like text and thus visually compact.

Video:

    url    | text box
    name   | text box
    title  | text box
    edit   | button

Play / Navigation:

    play/pause    | button
    time          | text box
    speed         | drop-down
    seek: back    | button
    seek: forward | button
    seek_delta    | drop-down
    jump          | button

Section:

    name     | text box
    start    | text box
    edit     | button
    loop     | button
    new      | button
    next     | button
    previous | button

Mark:

    name | text box
    time | text box
    new  | button

Loop:

    looping: on/off | toggle
    start           | text box
    start: set here | button
    end             | text box
    end: set here   | button
    source          | informational
    open            | button
    save-new        | button
    save-back       | button

App:

    undo | button
    redo | button
    help | button

Data:

    delete  | button
    export  | button
    import  | button
    display | button
    share   | button => choose video/loop

