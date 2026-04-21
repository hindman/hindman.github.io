
<!--

# Architecture Notes: The Fifth Fret and LoopLlama v2
## Overview
## The Fifth Fret
### Purpose
### Tech Stack
### How It Works
### Key Directories
## LoopLlama v2
### Purpose
### Tech Stack
## LoopLlama v2: Build and Deployment
### Development
### Production Build
## LoopLlama v2: Application Architecture
### Component Model
### Component Tree
### Non-Component Modules
### Menu System
### Which-Key Overlay
### Key Source Files
## LoopLlama v2: Data Model
### Top-Level App State
### Options
### Video
### Chapter
### Section
### Loop
### Mark
## LoopLlama v2: Storage and Persistence
### localStorage (Working Copy)
### Supabase Cloud (Saved Copy)
### Conflict Detection
### Stashes
### Analytics
### Sharing
## LoopLlama v2: Auth and Security
### Authentication
### Supabase Credentials
### Row Level Security
### Identity Providers
#### GitHub
#### Google
## LoopLlama v2: Performance Considerations

-->

# Architecture Notes: The Fifth Fret and LoopLlama v2

## Overview

This document is a high-level technical reference for two systems that live
together in the `hindman.github.io` repo:

- The Fifth Fret (F5): a personal Jekyll blog hosted on GitHub Pages.
- LoopLlama v2 (LL): a browser-based YouTube practice tool, hosted as a
  subdirectory of the same GitHub Pages site.

The two systems are independent in their build processes and development
workflows, but they share a single repo and a single GitHub Pages deployment.

---

## The Fifth Fret

### Purpose

A personal blog covering guitar technique, music theory, US politics,
economics, and other topics. Audience: personal use plus a small community
of guitar learners.

Live site: https://hindman.github.io/
Local dev:  http://127.0.0.1:4000/

### Tech Stack

- Jekyll: static site generator. Processes Markdown posts, Liquid templates,
  and YAML front matter into static HTML.
- Minimal Mistakes: Jekyll theme providing layout, navigation, and styling.
- GitHub Pages: hosts the built site; serves static files directly from
  the repo (master branch, root directory).
- Ruby/Bundler: manages Jekyll and theme dependencies (Gemfile).

### How It Works

Running `bundle exec jekyll serve` builds the full site into `_site/` and
serves it locally on port 4000. Jekyll processes Markdown posts in `_posts/`,
pages in `_pages/`, and theme templates in `_layouts/` and `_includes/`.

On GitHub Pages there is no `jekyll serve` step -- GitHub Pages runs Jekyll
automatically when a push lands on master and serves the resulting static
files. The `_site/` directory is the build output and is not committed to
the repo.

### Key Directories

    _posts/     | Blog posts (Markdown with YAML front matter)
    _pages/     | Standalone pages (About, LoopLlama help, etc.)
    _notes/     | Dev-only notes; not published
    _data/      | YAML data files (navigation, etc.)
    assets/     | Images, CSS overrides, other static assets
    _config.yml | Jekyll and theme configuration

---

## LoopLlama v2

### Purpose

A browser-based YouTube controller for close study of video content: looping
passages, adjusting speed, marking moments, annotating structure, and storing
per-video setups. Keyboard-first (Vim-inspired bindings), with full mouse
support. Not domain-specific, though learning from instructional video is
the primary use case.

For a user-facing overview, see the help doc at `_pages/loopllama-v2-help.md`
or the live site. A new developer should read that before diving into the code.

Live site: https://hindman.github.io/loopllama/v2/
Local dev:  http://localhost:5173/

### Tech Stack

- Lit: lightweight web components library. Provides reactive state and
  declarative HTML templates with minimal framework overhead.
- Vite: build tool and dev server. Handles ES module bundling, HMR in
  development, and production minification.
- Shoelace: accessible UI component library (menus, modals, dialogs,
  dropdowns). Provides consistent, theme-able UI primitives so that none
  of the foundational UI work lives in custom code.
- Supabase: backend-as-a-service providing PostgreSQL, authentication
  (OAuth), and a REST/JS client. LL uses it for optional cloud backup
  and user auth. No custom server-side code.

---

## LoopLlama v2: Build and Deployment

### Development

Vite runs a local HTTP server on port 5173. Source files are served directly;
imports are resolved and transpiled on the fly. Nothing is written to disk.
HMR (hot module replacement) reflects code changes in the browser without a
full reload.

Jekyll and Vite are completely independent. During LL development only Vite
needs to be running. The two dev servers use separate ports and have no
knowledge of each other. See `tasks.py` for the `inv serve` and related
commands.

### Production Build

Running `npm run build` (via `inv deploy`) bundles all source into a small
set of files and writes them directly into `loopllama/v2/`:

    loopllama/v2/index.html           | Entry point; asset paths corrected
    loopllama/v2/assets/index-XYZ.js  | All JS bundled and minified
    loopllama/v2/assets/index-XYZ.css | All CSS bundled
    loopllama/v2/llama-mascot.png ... | Static assets copied from public/

These built files are committed to the repo. GitHub Pages serves them as
plain static files -- no Node, no Vite, no CI build step at serve time.
The hash in the asset filenames is a cache buster.

See `tasks.py` (invoked via `inv`) for the full deploy workflow.

---

## LoopLlama v2: Application Architecture

### Component Model

LL is built as a tree of Lit web components. All application state lives in
the root component, `<llama-app>`. Child components receive state as
properties and communicate back to `<llama-app>` by firing custom DOM events.
Components use Lit's reactive properties to re-render when state changes.

Lit components use the Shadow DOM, which scopes styles and prevents CSS
leakage. One consequence: DOM element references must be passed directly
rather than by ID when crossing the shadow boundary (relevant for the YouTube
IFrame API).

### Component Tree

`<llama-app>` is the root. It owns all state and renders the full UI. Its
direct children make up the main layout and all modals/pickers:

    Layout:
      llama-controls                    | Header bar: menus, status message, account
      llama-timeline                    | Scrubber bar with entity overlays
      llama-current                     | Current entity info panel
      llama-whichkey                    | Which-key overlay for multi-key bindings

    Pickers (entity selection):
      llama-video-picker                | Open a video from the library
      llama-loop-picker                 | Jump to / delete a loop
      llama-marks-picker                | Jump to / delete a mark
      llama-sections-picker             | Jump to / delete a section
      llama-chapter-picker              | Jump to / delete a chapter
      llama-jump-history-picker         | Navigate jump history

    Modals (create / edit / info):
      llama-url-input-modal             | Load video by URL or ID
      llama-edit-video-modal            | Edit video name/bounds
      llama-video-info-modal            | Display video metadata
      llama-save-loop-modal             | Save scratch loop as saved loop
      llama-edit-mark-modal             | Create or edit a mark
      llama-edit-section-modal          | Create or edit a section
      llama-edit-chapter-modal          | Create or edit a chapter

    Data / cloud:
      llama-inspect-modal               | Inspect raw app state JSON
      llama-cloud-status-modal          | Show local vs. cloud comparison
      llama-data-op-modal               | Data operation review modal (ds/dr/di)
      llama-delete-data-modal           | Bulk delete videos/data
      llama-load-examples-modal         | Load example video library

    App:
      llama-options-modal               | App options
      llama-shared-video-conflict-modal | Conflict on shared video load

### Non-Component Modules

Two key controllers live outside the component tree:

- `videoController.js`: wraps the YouTube IFrame API. Handles player
  lifecycle, time polling, duration detection, and playback rate. Fires
  callbacks (onTimeUpdate, onStateChange, onDurationReady, onError) that
  `<llama-app>` wires up on initialization. Because of Shadow DOM, the
  YouTube player is initialized by passing the DOM element directly rather
  than an element ID.

- `keyboardController.js`: captures keyboard events globally. Implements
  the multi-key binding system (e.g., `v` then `o` for "video open"),
  count prefixes, and scratch-edit mode. Uses `event.composedPath()[0]`
  for focus checks to work correctly across shadow boundaries. Dispatches
  named actions to `<llama-app>`.

### Menu System

Menus follow a NOUN → VERB structure: the menu label names the entity;
menu items are the verbs that act on it. This makes the hierarchy
meaningful rather than a flat grouping.

An ellipsis on a menu item signals that a picker or selection step will
appear before the action runs -- the user must choose which entity to act
on. No ellipsis means the action operates on the current or implied entity
immediately. This is a narrower use of the convention than the HIG
standard, which applies it to any dialog.

Menu items do not duplicate actions available via the app's main controls
(play/pause, toggle looping, previous/next entity, etc.).

Menus are opened via backtick + letter (e.g., `` `v `` for the Video menu)
or by clicking the menu button in the header. Eight menus: Video, Chapter,
Section, Loop, Scratch, Mark, Data, App. Eight is the practical limit
across the narrow header; the Help menu was folded into App to preserve
horizontal space.

### Which-Key Overlay

When the user types a binding prefix (e.g., `v`), the which-key overlay
appears and lists the completions. It also shows scratch-edit mode status
and count prefixes. Implemented in `llama-whichkey.js`.

### Key Source Files

    src/main.js                      | Entry point; bootstraps the app
    src/state.js                     | Entity factories and pure data functions
    src/storage.js                   | localStorage load/save; cloud read/write;
                                     | import/export; schema migration
    src/keyboardController.js        | Multi-key binding engine
    src/videoController.js           | YouTube IFrame API wrapper
    src/auth.js                      | Supabase auth helpers (sign in/out, user)
    src/supabase.js                  | Supabase client initialization
    src/sharing.js                   | Share URL creation and fetching
    src/analytics.js                 | Anonymous event logging to Supabase
    src/examples.js                  | Built-in example video library

    src/components/llama-app.js      | Root component; all app state lives here
    src/components/llama-controls.js | Header bar and menus
    src/components/llama-timeline.js | Timeline scrubber
    src/components/llama-current.js  | Current entity panel
    src/components/llama-whichkey.js | Which-key overlay

---

## LoopLlama v2: Data Model

All app state is serialized as a single JSON object and stored in
localStorage under one key. The schema version is tracked via the
`SCHEMA_VERSION` constant in `state.js`. Migrations are handled in
`storage.js`.

### Top-Level App State

    schema_version  | Integer; used to detect and run migrations on load
    options         | App-wide settings (see Options below)
    videos          | Array of Video objects
    stashes         | Object keyed by video ID; one stash entry per video;
                    | holds a prior video snapshot for the Unstash operation;
                    | local-only, never synced to the cloud
    currentVideoId  | YouTube ID of the currently loaded video, or null

### Options

    seek_delta_default        | Default seek step in seconds (arrow keys)
    seek_delta_choices        | Available seek step values
    loop_nudge_delta_default  | Default loop nudge step in seconds
    loop_nudge_delta_choices  | Available nudge step values
    speed_delta               | Amount +/- keys change playback speed
    loop_pad_start            | Seconds of padding before loop start
                              | when scratching a section into a loop
    loop_pad_end              | Same, after loop end
    cloud_backup              | Boolean; controls whether the app nudges
                              | the user to sign in when signed out.
                              | Set to true on first sign-in; set to false
                              | on Sign Out and Remove Cloud Data (SORCD).

### Video

Each video stores all its per-video state in a single object:

    id             | YouTube video ID; authoritative internal key
    url            | Full URL as supplied by the user (display/export only)
    duration       | Video duration in seconds; set by YouTube API after load
    time           | Last-known playback position; used to resume on reopen
    start          | User-adjustable effective start (seconds); default 0
    end            | User-adjustable effective end; null means use duration
    name           | User-set display label; empty until set
    looping        | Boolean; whether looping is currently active
    speed          | Playback speed; default 1.0
    seek_delta     | Per-video seek step; initialized from seek_delta_default
    nudge_delta    | Per-video loop nudge step; from loop_nudge_delta_default
    entity_type    | Which entity type the app is tracking: any/chapter/
                   | section/loop/mark. Controls picker filter behavior.
    zone2_mode     | Whether the timeline's second zone shows sections or
                   | chapters; value: 'sections' | 'chapters'
    last_modified  | Timestamp (ms since epoch); updated on every save;
                   | used for cloud conflict detection
    last_opened    | Timestamp (ms) of last time video was opened; used
                   | for recency sort in the video picker
    chapters       | Array of Chapter objects (sorted by start)
    sections       | Array of Section objects (sorted by start)
    loops          | Array of Loop objects (sorted by start); includes the
                   | one scratch loop
    marks          | Array of Mark objects (sorted by time)
    jumps          | Array of jump history entries (max 40); persisted across
                   | sessions; stores non-trivial navigational jumps for
                   | the jb/jf (back/forward) commands

### Section

Sections are sub-chapter structural dividers. Each section's start is a
divider point; its end is either derived from the next divider or
explicitly stored by the user.

    id     | Generated unique identifier
    name   | User label (optional; UI shows rank-order "#N" if absent)
    start  | Divider time point (seconds)
    end    | Explicit end time, or null. If null, end is derived at runtime
           | from the next divider's start (or video end for the last
           | section). If stored, a gap zone exists between this end and
           | the next divider (shown gray on the timeline).

### Chapter

Chapters are top-level structural dividers. They use the same divider-based
model as sections.

    id     | Generated unique identifier
    name   | User-defined label (required)
    start  | Divider time point (seconds)
    end    | Explicit end time, or null (derived from next chapter's start)

### Loop

Saved loops are user-defined reusable ranges. The scratch loop is a special
loop stored in the same array.

    id          | Generated unique identifier
    name        | User label (optional; UI shows "#N" if absent)
    start       | Loop start (seconds)
    end         | Loop end (seconds)
    source      | ID of the Section or Loop this was loaded from, or null.
                | Non-null only on the scratch loop. Enables the save-back
                | operation (xs: save scratch back to source).
    is_scratch  | Boolean; true on the one scratch-loop entity. Needed
                | because source can be null on a manually-created scratch
                | loop, making source alone insufficient to identify it.

The scratch loop model: every video always has exactly one scratch loop.
It is the active loop bounds when looping is enabled. Saved loops are
immutable until explicitly edited; scratch is the working copy. Loading a
section or saved loop into scratch sets source; saving back (xs) writes
the scratch bounds back to that source entity.

### Mark

    id    | Generated unique identifier
    name  | User label (optional; UI shows "#N" if absent)
    time  | Time point (seconds)

---

## LoopLlama v2: Storage and Persistence

### localStorage (Working Copy)

The entire app state is serialized as JSON and written to a single
localStorage key on every meaningful state change (`_saveCurrentState()`
in `llama-app.js`). On load, the stored object is read, migrated if needed,
and used to initialize the root component's reactive state.

This approach serializes and rewrites the full state on every save. For
libraries up to a few hundred videos this is fine. See the Performance
section for what happens at larger scale.

### Supabase Cloud (Saved Copy)

Cloud storage is an explicit backup/restore facility, not automatic sync.
The mental model: localStorage is your working copy; Supabase is your saved
copy (like a save file).

Cloud read and write are user-initiated operations:

    ds  | Save to cloud: writes current localStorage state to Supabase
    dr  | Read from cloud: reads Supabase state into localStorage
    dc  | Compare: shows local vs. cloud side by side before committing

Sign-in is authentication only -- it does not automatically read or write
data. After signing in the user decides whether to ds or dr. Exception:
if the user signs in on a device with no local videos, the app suggests
a dr but does not force it.

The `cloud_backup` option controls whether the app nudges a signed-out
user to sign back in. Lifecycle:

- New user, never signed in: cloud_backup false; no nudging.
- First sign-in: cloud_backup set to true.
- Signed out after normal use: cloud_backup remains true; app nudges the
  user to sign back in (prompt on load, indicator on Account menu).
- Sign out and remove cloud data (SORCD): cloud_backup set to false; no
  more nudging. User has made a deliberate choice to leave the cloud.
- User unchecks cloud_backup in options: nudging stops. Cloud ops (ds/dr)
  remain available manually; the flag controls only the nudge.

Multi-device use: ds and dr are safe across devices because all transfers
go through the per-video conflict check. The scenario to avoid is running
ds on two devices without a dr in between on the second device -- the
first device's cloud save could be overwritten. Best practice: ds before
switching devices; dr after.

### Conflict Detection

Each Video object carries a `last_modified` timestamp (ms since epoch),
updated on every save. Before ds, dr, or di (JSON import) takes effect,
LL presents a review modal (`llama-data-op-modal.js`) showing a full
inventory of all affected videos grouped into five categories:

    Source only    | Videos present in source but not destination
    Source newer   | Videos in both; source has a later last_modified
    Dest only      | Videos present in destination but not in source
    Dest newer     | Videos in both; destination has a later last_modified
    Same           | Videos in both with equal last_modified

Each category has a toggle (Add / Replace / Delete, depending on the
category) controlling whether the action applies. Defaults reflect a
prefer-newer-data posture: source-only and source-newer are on by default;
dest-only, dest-newer, and same are off. The user can adjust any toggle
before confirming.

### Stashes

The `stashes` object on app state holds one prior snapshot per video (keyed
by YouTube ID). Used by the Unstash operation (vu) to restore a previous
state of a video. Stashes are local-only and are never synced to the cloud.

### Analytics

LL logs two anonymous events to Supabase via `analytics.js`: `session_start`
(on page load) and `video_load` (each time a video is opened). No user auth
is required; these are INSERT-only operations permitted by the anon RLS
policy. Supabase's built-in dashboard provides basic reporting without any
additional reporting code.

Privacy: `video_id` and `client_id` are never stored together. A per-user
watch history -- even pseudonymous -- is contrary to the intent of this
data collection.

`client_id` lifecycle: generated once as a UUID, stored in localStorage.
Survives across sessions on the same device and browser. Does not survive
clearing browser storage. Not connected to any real-world identity unless
the user later signs in.

`session_id` lifecycle: generated once per page load, stored in
sessionStorage. Cleared when the tab is closed.

### Sharing

Users can share a video setup via URL using `dv` (share video: sections,
loops, marks) or `dx` (share current scratch loop). The share URL is
copied to the clipboard. `sharing.js` handles creation and fetching of
share payloads, which are stored as public anonymous records in Supabase.
When a recipient opens a share URL, LL fetches the payload on startup and
loads the shared setup.

---

## LoopLlama v2: Auth and Security

### Authentication

Users sign in via OAuth through Supabase (currently Google and GitHub).
Supabase orchestrates the OAuth handshake; users never create a Supabase
account and Supabase is invisible to them. Once signed in, LL data is
stored in Supabase and accessible from any signed-in browser.

Auth state is managed in `auth.js`. `<llama-app>` subscribes to auth state
changes via `onAuthStateChange()` and updates the UI accordingly.

### Supabase Credentials

LL is initialized with a Supabase project URL and an anon (publishable) key.
Vite bakes these into the JS bundle at build time via `import.meta.env.VITE_*`
variables read from `.env.development` / `.env.production`. Those env files
are gitignored and never appear in the public repo.

The anon key is intentionally public -- it is analogous to a Firebase
apiKey or Stripe publishable key, explicitly designed to live in browser
code. What controls data access is Row Level Security (RLS) in Supabase,
not key secrecy.

The `service_role` key (which bypasses RLS entirely) never appears in browser
code. It lives only in the Supabase dashboard and server-side contexts.

### Row Level Security

RLS policies ensure each authenticated user can only read and write their
own data. The anon key grants access to whatever the RLS policies permit
for unauthenticated users -- no more. Specifically:

- Anon users can INSERT into the `events` table (session_start,
  video_load). This is the intended behavior for anonymous app users.
  Abuse (e.g. flooding the table) is possible but only degrades analytics
  quality; it does not expose user data.
- Anon users cannot SELECT, UPDATE, or DELETE events.
- Anon users cannot access tables with no anon policy.
- Anon users cannot escalate to service-role access from the browser.

If flooding or abuse of the anon INSERT permission became a concern:

- Supabase has configurable rate limiting (per IP) that can be tightened
  without any code changes.
- The events INSERT policy could be tightened (e.g., require a valid
  session_id format, or reject rows with unusual field values).
- In an extreme case the anon INSERT permission could be revoked entirely,
  at the cost of losing analytics.

For the current scale and audience none of these measures are needed.

### Identity Providers

Steps to configure a new OAuth identity provider in Supabase.

#### GitHub

Supabase:

  - Select DB: dev or prod.
  - Authentication => Sign in / Providers:
    - GitHub.
      - Enable.
      - Copy the callback URL.

            dev  | https://zatiaqhwoxnukhlowyys.supabase.co/auth/v1/callback
            prod | https://wasdctencljkzoefqznp.supabase.co/auth/v1/callback

      - Leave the panel open for now.

GitHub:

  - Settings => Developer settings => OAuth Apps:
    - New OAuth App

          Application name        | LoopLlama Dev/Prod
          Homepage URL dev        | http://localhost:5173/loopllama/v2/
          "        "   prod       | https://hindman.github.io/loopllama/v2/
          Application description | LoopLlama: dev/prod environment
          Callback URL            | <copied from Supabase panel>
          Enable device flow      | No

    - Submit the form.

    - Copy the Client ID:
      - Paste into my pws-file.

    - Generate new client secret:
      - GitHub asks for a totp: supply it.
      - Copy the secret.
      - Paste into my pws-file.

Supabase panel:
  - Use the client ID and secret to fill out the form.
  - Save.

Supabase: URL setup:
  - Authentication => URL Configuration:
  - Set both of these to the same value:

        dev  | http://localhost:5173
        prod | https://hindman.github.io/loopllama/v2/

#### Google

Supabase:
  - Same process (leave nonce and no-email toggles off).
  - Same callback URLs.
  - As before, leave the panel open for now.

Google Cloud Console
  - APIs & Services
    - Create Project => LoopLlama Dev|Prod => Create
    - Configure project:

          App Name      | LoopLlama Dev / LoopLlama Prod
          Support email | montyhindman@gmail.com
          Audience      | external
          Contact email | montyhindman@gmail.com

  - APIs & Services
    - Credentials =>
    - Create Credentials =>
    - OAuth client ID =>
    - Web application:

          Name                          | LoopLlama Dev / LoopLlama
          Authorized JavaScript origins | http://localhost:5173
          "          "          "       | https://hindman.github.io
          Authorized redirect URIs      | <supabase callback URL: see above>

    - Create.
    - Copy the Client ID and secret:
      - Paste into my pws-file.
      - Also download the JSON file.

  - APIs & Services
    - OAuth consent screen =>
    - Branding:

          App name           | LoopLlama
          User support email | montyhindman@gmail.com
          App home page      | https://hindman.github.io/loopllama/v2/
          Privacy policy     | https://hindman.github.io/loopllama/v2/help/#privacy-policy
          Terms of service   | https://hindman.github.io/loopllama/v2/help/#terms-of-service

    - Have Google verify my branding:
      - Verification status:
        - Click view issues.
        - Led me eventually to Google Search Console.
        - Long story but after putting this file at the repo root I'm the
          verified owner of the site.

              google58358ed2c1865cff.html

  - APIs & Services
    - OAuth consent screen =>
    - Audience:
      - Publish.

Supabase panel:
  - Use the client ID and secret to fill out the form.
  - Save.

Supabase: URL setup:
  - Same process as above.

---

## LoopLlama v2: Performance Considerations

Rough performance envelope for the video library:

- Comfortable: up to ~500 videos. No noticeable issues expected.
- Caution zone: 500-1000 videos. Probably fine, but some users may notice
  sluggishness on saves, especially on slower hardware.
- Theoretical ceiling: ~5000 videos at ~1KB average per video (localStorage
  5MB limit), but real-world friction appears well before that.

The primary bottleneck at scale is `_saveCurrentState()`, which serializes
and writes the entire app state on every save. The highest-leverage fix,
if this becomes a complaint, is per-video localStorage keys: only the
changed video gets rewritten. Debouncing saves is a lower-effort complement.

The more likely complaint at scale is UI usability: pickers with 500+ videos
become unwieldy even if not technically slow. The existing recency sort and
text filtering help. The modals that enumerate many videos at once (data
delete, inspect, cloud save/read/compare) would be the biggest UI problem
at scale.
