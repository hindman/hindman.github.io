# LoopLlama v2 — Design Plan Summary

Summary of design discussions from the ChatGPT "JavaScript Project Workflow"
conversation (July-August 2025), distilled for use when resuming v2 work.

---

## What LoopLlama Is

A browser-based YouTube video controller for music practice. Core use case:
hold a guitar and control video playback via single-key Vim-style bindings --
loop sections, set marks, adjust speed, navigate quickly.

- v1 tech: Single vanilla JS file (loopllama.js) + YouTube IFrame API
- Hosting: GitHub Pages (hindman.github.io/loopllama/)
- Storage: localStorage for per-video settings, favorites, marks, loops
- Users: Primarily personal; not commercially hosted

---

## v2 Goals

### 1. Visual Design Overhaul

- Make the app look good while retaining keyboard-first control.
- All settings and state (current time, loop endpoints, favorites, speed)
  should be displayed in a polished UI and also editable via standard web
  controls (text boxes, toggles, checkboxes) for mouse-oriented users.

### 2. Visual Timeline with Sections, Marks, and Loops

- Display the video as a horizontal timeline showing:
  - Sections (intro, verse, vamp, solo, outro, etc.) as labeled regions.
  - Marks (named jump points within the video, analogous to Vim marks).
  - Loop start/end indicators for the current loop.
  - A playhead showing current position.
- First workflow step for a new song: mark the start of every section.
- Marks and loops should support user-defined labels (v1 had only abstract
  numbered entities with no mnemonics).
- Timeline should support click-to-jump and ideally drag-to-edit.

### 3. Idiomatic, Maintainable JavaScript

- Replace the flat, procedural, global-variable codebase with modular, modern
  JS.
- Use reactive state management so the UI stays in sync with app data without
  crude manual DOM updates.

### 4. Responsive Layout

- YouTube iframe and surrounding UI should resize properly when the browser
  window resizes (CSS Flexbox/Grid, percentage-based sizing).

### 5. Persistence Improvements

- Import: Replace the copy-paste-into-textarea import with a proper file
  picker (`<input type="file">`) and optionally drag-and-drop.
- Export: Keep the existing download-as-JSON approach; polish filename.
- Power-user sync: Allow configuring a URL to a user-hosted JSON settings file
  (e.g., on GitHub Pages) that LoopLlama fetches at startup, enabling settings
  to be shared across machines/browsers.

### 6. Navigation Safety

- Seek stack / go-back: When the user accidentally jumps elsewhere in a long
  video, provide a "go back" function (bound to a key like `u`) that returns
  to the prior position. Implemented as a small stack (ring buffer, ~10
  entries).
- Selective push: Only push to the stack on user-initiated seeks (not loop
  re-entry or autoplay). Use a threshold (e.g., >5 seconds of movement) to
  avoid clutter.
- Session persistence: Periodically save the current playback position per
  video to localStorage, so the user can resume where they left off.

---

## Technology Decisions

UI framework: Lit. Web-standard components, small footprint (~5-10 KB), HTML
template literals instead of JSX, close to native browser APIs, good fit for
learning modern JS without heavy framework abstractions.

Rejected alternatives: Alpine.js (too HTML-centric), React (JSX everywhere,
framework-specific idioms / "React-isms"), Svelte (viable but less standard).

Build tool: Vite. Modern, fast, minimal config, good Lit support, provides dev
server with hot reload.

Module system: ES modules (import/export with type="module"). Standard,
supported by all modern browsers, enables clean code splitting.

Storage: localStorage for now. Simple, sufficient for current scale.
localForage or IndexedDB noted as future options if data grows complex.

---

## Incremental Refactor Plan

The agreed approach is evolutionary, not big-bang. Lit's Web Component model
supports gradual adoption -- individual components can be dropped into the
existing HTML page without rewriting everything at once.

### Step 1: Restructure Project for Growth

Reorganize the flat codebase into modules. No behavior changes -- just prepare
the foundation.

Target structure:

```
loopllama/
├── loopllama.html             # App entry (loads src/main.js as type="module")
├── src/
│   ├── main.js                # App bootstrap, init, updateStatus
│   ├── videoController.js     # YouTube API: load, play, pause, seek, speed, loop
│   ├── keyboardController.js  # Vim-style key dispatch
│   ├── state.js               # Shared app state (vi, favs, DEFAULTS)
│   ├── storage.js             # localStorage load/save/export/import
│   └── ui/
│       ├── updateHtml.js      # DOM rendering functions
│       └── utils.js           # Helpers: time formatting, bounded(), URL parsing
├── styles/
│   └── app.css
└── assets/                    # Icons, images (optional)
```

Key migration detail -- YouTube API:

- Move the inline script that injects the YouTube IFrame API into
  videoController.js, wrapped in a Promise-based loader.
- Replace the global onYouTubeIframeAPIReady callback with a loadYouTubeAPI()
  function that resolves when the API is ready.
- loopllama.html becomes clean: just a `<div id="player">` and a `<script
  type="module" src="./src/main.js">`.

Note on index.html: This file lives at the repo root
(hindman.github.io/index.html), not inside loopllama/. It is the GitHub Pages
homepage and is separate from the app.

### Step 2: First Lit Component

Start small -- e.g., `<llama-time-display>` showing current video time. Embed
it in the existing HTML alongside non-Lit code. This validates the Lit + Vite
setup without forcing a full rewrite.

### Step 3: Migrate UI Zones Incrementally

Convert functional areas into Lit components one at a time:

- `<llama-timeline>` -- the visual timeline with marks, loops, sections
- `<llama-controls>` -- playback controls
- `<llama-marks>` -- marks/loops list editor
- `<llama-help>` -- keyboard shortcuts reference

Each component initially reads from the existing global state. Over
time, state is centralized and passed more formally.

### Step 4: Centralize State and Keyboard Logic

- Extract input handling into a clean module consumed by components.
- Build a central reactive state store that components subscribe to.

---

## Open Items / Future Considerations

- Command palette (VS Code-style) for power users -- mentioned but not
  committed to.
- Whether to use localForage or IndexedDB if data complexity grows.
- Drag-and-drop editing on the timeline.
- Possible section-labeling workflow (mark section starts, then name them).

