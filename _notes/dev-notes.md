
## dev notes

Resources:
    - https://github.com/mmistakes/minimal-mistakes

Initial Ruby setup:
    - Intalled Ruby via Homebrew (see computer-setup).

Initial project setup:
    - Declare dependencies: via Gemfile.
    - Install gems in the Homebrew ruby:
        gem install bundler
        gem install jekyll
    - Install dependencies for project.
        bundle install

Serving the website locally:

    bundle exec jekyll serve
    open http://127.0.0.1:4000/

    # To see draft post and/or unpublished pages.
    bundle exec jekyll serve --drafts --unpublished

TOC icons:

    leaf
    tree
    seedling
    sprout
    feather-alt
    sun
    water
    droplet

LoopLlama: running tests:

    cd loopllama/v2

    # Basic.
    npm tests

    # Detailed output.
    npm test -- --reporter=verbose

    # Output in browser with lots of details.
    npx vitest --ui

LoopLlama: building the site:

    inv build [--add]

Testing scenario for user data persistence:

    - Brave and Safari: synced in known-good-state:
        - Brave:
            - de: export
            - Add a couple of videos you don't care about.
            - Make a couple of inconsequential edits.
            - di:
                - check modal to confirm correctness
                - do brute-force replacement
            - ds
                - check modal to confirm correctness
                - do brute-force replacement
        - Safari:
            - dr
                - check modal to confirm correctness
                - do brute-force replacement

    - Safari:
        - Add two new vids:
            - https://www.youtube.com/watch?v=AEP7xP4ClTE
            - https://www.youtube.com/watch?v=PaEXjpIzMhs
        - Edit 3 existing vids:
            - dune
            - hit the road jack
            - catfish blues dsp
        - Delete 1 vid:
            - ??

    - Brave:
        - Add two new vids:
            - https://www.youtube.com/watch?v=iZMZ_xk2big
            - https://www.youtube.com/watch?v=nfGmcUCJ9uI
        - Edit 2 existing vids:
            - long cool woman
            - hairy the dog
        - Delete 1 vid:
            - ??
        - dc: ok
        - dr: message accurate; chose No
        - ds: ditto
        - dr: chose yes-but-skip
        - ds: ok
        - dc: Brave and DB now in sync

    - Safari:
        - Similar process:
            - First check messages/prompts for dc, dr, ds: chosing No
            - Then did dr and ds for real.
            - dc: Safari and DB now in sync

LoopLlama: where the built site lives:

    Dev:

        $ npm run dev

        Vite runs a local HTTP server. When your browser requests a file, Vite
        reads the source, transforms it on the fly (bundling imports, compiling
        etc.), and serves it. Nothing is written to disk. The `outDir` setting is
        irrelevant. The `dist/` value in the config is just a placeholder to
        suppress the warning.

    Deployed:

        $ npm run build     # Then git commit/push

        Vite reads the source, bundles everything into a small set of files,
        and writes them to disk at loopllama/v2/.

        loopllama/v2/index.html            | Entry point, with corrected asset paths
        loopllama/v2/assets/index-XYZ.js   | JS bundled and minified
        loopllama/v2/assets/index-XYZ.css  | CSS bundled
        loopllama/v2/llama-mascot.png etc. | Copied from public/

        Those files get committed to git and GitHub Pages serves them as
        static files. No Node, no Vite, no build step happens on GitHub's end
        — it just serves what's in the repo.

        The hash in the asset filenames (`index-D8aSR4kO.js`) is a
        cache-buster: it changes whenever the file contents change, so
        browsers always fetch the latest version.

Testing Supabase down:

    Dev Tools =>
    The "..." menu =>
    More Tools =>
    Request conditions =>
    Block =>
    Pattern =>  *://*.supabase.co/*

## How The Fifth Fret and LoopLlama v2 are served

Jekyll (`bundle exec jekyll serve`) builds the whole site: it processes
Markdown, Liquid templates, and the Minimal Mistakes theme into static HTML
files, then serves them locally. LoopLlama v1 is just a static HTML+JS file
sitting in `loopllama/v1/` — Jekyll serves it as-is, no processing needed.

Vite (`npm run dev`) is a completely separate dev server, purpose-built for
modern JS development. It serves only the `loopllama/v2/` subtree, handles ES
module imports on the fly, and provides HMR. It has no knowledge of Jekyll or
the rest of the site.

So the two are independent. Two separate servers, two separate ports (Jekyll
on 4000, Vite on 5173). During v2 development we only need Vite running.

Where they eventually converge: the build step. When v2 is ready to ship, we
will run `npm run build`. Vite compiles and bundles everything into a `dist/`
folder — static HTML, JS, and CSS with hashed filenames, ready to deploy
anywhere. We then commit those built files under `loopllama/v2/` and GitHub
Pages serves them as plain static files — no Node, no Vite, no npm at
runtime. Jekyll continues to handle the rest of the site exactly as before.

So the dependency on Node/Vite is purely a development-time thing. The
deployed artifact is just files.

Edits requiring an `npm run dev` restart:
    - vite.config.js
    - package.json


## Supabase: identity providers

### GitHub ID provider

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

    - Sumit the form.

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

### Google ID provider

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
        - Let led me eventually to Google Search Console.
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

## V3+ Ideas: Other Video Sources

### Vimeo

Vimeo has a well-documented Player API (postMessage-based, similar in
structure to YouTube's IFrame API). It supports play, pause, seek,
get/set duration, playback rate, and events -- everything LL needs.
A meaningful amount of music lesson content lives on Vimeo.

Feasibility: moderate. Would require a second video controller adapter
(`VimeoController`) alongside the existing `YouTubeController`. The
current `videoController.js` wrapping pattern would need to become a
formal adapter interface, with source type detected from the URL.

Verdict: doable, less compelling than local video (below). Deferred.

### Other Online Platforms

Twitch (live-stream focused), Dailymotion, Facebook Video, TikTok,
Instagram: none have usable programmatic APIs for the kind of
seek/loop/rate control LL needs. Not worth pursuing.

### Local Video Files (Most Compelling V3 Feature)

Many users -- especially the primary use case -- have guitar lesson
videos on their computers: purchased downloads, DVD rips, saved
YouTube videos, etc. These can't use the YouTube IFrame API, but they
can use the HTML5 `<video>` element, which natively supports
everything LL needs:

- `play()`, `pause()`, `currentTime` (seek), `duration`,
  `playbackRate` -- all native, synchronous, no API handshake
- MP4, WebM, and MOV (macOS) all work
- Implementation is simpler than YouTube, not harder

Serving local files: run a simple HTTP server from a directory of
symlinks pointing at the actual video files (e.g. `python3 -m
http.server 8080`). Startup automation (an `inv` task or ~/bin
script) handles both launching the server and generating a JSON
manifest of available videos.

Manifest format -- a bare list of URLs, nothing more:

    { "videos": ["http://localhost:8080/my-solo.mp4", ...] }

The URL is the identity key for each video. LL derives a default
display name from the filename (extension stripped,
hyphens/underscores replaced with spaces); the user can refine it
via the existing edit-video modal.

On startup, LL fetches the manifest from a configured URL (default:
`http://localhost:8080/manifest.json`). Any video URL not already in
the library is added silently; duplicates are skipped. If the fetch
fails (server not running), LL does nothing -- no error, no message.
This is the normal case when running against YouTube.

New videos land in `_appState.videos` like any other video, persist
to localStorage, and can be synced to the cloud via ds/dr.

Architecture: `videoController.js` becomes an adapter interface.
LL detects the source type from the URL (YouTube domain → YouTube
adapter; localhost or video file extension → HTML5 adapter) and
instantiates the right controller via a dual-controller pattern
(both initialized at startup; active one shown based on video type).
The rest of the app -- loops, marks, sections, speed, timeline --
is unchanged.

This effort would also include a metadata migration to add a
video.type attribute, which would hold either "youtube" or "local".

This is also the key enabler for a proper open-source release (see
next section): users who run LL locally get full LL features on
their own video library without any cloud dependency.

### Open-Source LL Project

Currently LL lives inside the hindman.github.io blog repo: the code
is public but the project isn't structured for outside contributors
or users. A proper open-source release would involve:

- Separate repo (e.g. github.com/mhindman/loopllama)
- README with install steps: clone, `npm install`, configure `.env`,
  `npm run dev`
- LICENSE file (MIT is the natural choice)
- `.env.example` committed as a template showing required variable
  names without real values -- standard convention for projects using
  env vars

The local video feature makes this more immediately useful: a user
who clones LL and runs it locally gets full LL functionality on their
own video files, with no YouTube dependency, no Supabase account
needed for basic use (localStorage-only mode already works).

Supabase for contributors: anyone wanting the full persistence and
sharing features would need their own Supabase project. A setup guide
would be required. This is a manageable ask for a small community.

## Security: Supabase Credentials and RLS Policy

### What is and isn't in the public repo

- `.env.development` and `.env.production` are listed in `.gitignore`
  and are not tracked by git. They never appear in the public repo.
- Anyone who clones the repo gets no Supabase credentials and cannot
  connect to either the dev or prod database.

### The anon key is designed to be public

Vite bakes `import.meta.env.VITE_*` values into the JS bundle at
build time. The deployed production app therefore contains the
Supabase URL and anon key in its JavaScript -- readable by anyone
who opens DevTools or inspects the bundle.

This is correct and expected behavior. Supabase's anon (publishable)
key is analogous to a Firebase apiKey or a Stripe publishable key:
explicitly designed to live in browser code. The key is not a secret;
keeping it out of the bundle is neither possible nor necessary.

### What the anon key does and doesn't allow

The anon key grants access to whatever the RLS policies permit for
unauthenticated users -- no more. A determined person with the key
and URL can make Supabase API calls, but they are bounded by policy:

- They can INSERT into the `events` table (session_start,
  video_load). This is the intended behavior for anonymous app users.
  Abuse (e.g. flooding the table with fake events) is possible but
  only degrades analytics quality; it doesn't expose user data.
- They cannot SELECT, UPDATE, or DELETE events. No read access to
  other users' data.
- They cannot access tables with no anon policy at all.
- They cannot escalate to service-role access from the browser.

The one key that would be a real problem in the bundle is the
`service_role` key, which bypasses RLS entirely. That key lives
only in server-side or dashboard contexts and is never put in
browser code.

### Mitigation if abuse occurs

The current policy is reasonable for a small project. If flooding
or abuse of the anon INSERT permission became a concern:

- Supabase has configurable rate limiting (requests per second per
  IP) that can be tightened without any code changes.
- The events table INSERT policy could be tightened: for example,
  require a valid session_id format, or reject rows with unusual
  field values.
- In an extreme case the anon INSERT permission could be revoked
  entirely, at the cost of losing the Phase 1 metrics.

For the current scale and audience, none of these measures are
needed. The architecture is sound; the mitigations exist and are
tunable if conditions change.

## Backend Persistence

### Supabase: how it works for users

Users authenticate through LoopLlama using a "Sign in with X" button
(e.g., Google). Supabase orchestrates the OAuth handshake with the
chosen identity provider. Users never create a Supabase account --
Supabase is invisible to them. They just need an account with whatever
identity provider LL offers.

Once signed in, a user's LL data is stored in the Supabase database
and tied to their identity. It is accessible from any browser or device
they sign into.

### How it works for LL

LL (i.e., the developer) holds the Supabase project. The app is
initialized with a project URL and an anon key -- both embeddable in
client-side code, as this is the standard Supabase pattern. The anon key
is intentionally public; what controls data access is Row Level Security
(RLS) configured in Supabase, which ensures each user can only read and
write their own data.

### Identity providers

Multiple sign-in options can be offered simultaneously (e.g., Google and
GitHub). Each is configured in the Supabase dashboard.

### Benefits and features

Three categories of value, in rough order of implementation complexity:

1. Metrics and telemetry (no user auth required)
   - Total users, active users, retention
   - Which videos are being loaded
   - Which features are used (loops vs. marks vs. sections vs. chapters)
   - Informs future development priorities based on actual usage
   - Supabase's built-in dashboard handles basic reporting without
     any additional reporting code

2. Shareable setups (no user auth required)
   - A user can share a video setup (sections, loops, marks) via a URL
   - Recipient clicks the link and LL loads that setup directly --
     no JSON file exchange
   - Setups can be stored as public anonymous records in Supabase
   - Enables a community library over time: users contribute setups
     for songs, others discover and load them

3. Per-user data backup and sync (requires auth)
   - User's LL data stored in Supabase, tied to their identity
   - Accessible from any browser or device after signing in
   - Eliminates the risk of data loss from clearing browser storage
   - Cross-device sync happens automatically, no manual export/import

Privacy note: video_id and client_id are deliberately never stored
together. A per-user watch history -- even pseudonymous -- is contrary
to the intent of this data collection. Counts per video are sufficient
for the "popular videos" use case; linking them to device identities
is not needed and is avoided.

client_id lifecycle: generated once as a UUID, stored in localStorage.
Survives across sessions on the same device/browser. Does not survive
clearing browser storage. Is not connected to any real-world identity
unless the user later creates an account

session_id lifecycle: generated once per page load, stored in
sessionStorage. Cleared when the tab is closed.

### User data persistence: cloud storage and multi-device issues

LL does not attempt true multi-device sync. Cloud storage is a backup/restore
facility, not a live sync. The mental model: localStorage is your working
copy; the cloud is your saved copy, like a hard drive.

Each video object carries a last_modified timestamp (ms since epoch), updated
whenever the video's data changes.

Cloud read/write are explicit user operations (`dr` / `ds` / `dc`), not automatic.
This keeps the system honest: you control exactly when data moves to or from
the cloud.

Sign-in: authentication only. No automatic read or write. The user decides
whether to ds or dr after signing in. Exception: if the user signs in on a
device with no local videos, the app suggests a dr (but does not force it).

Options include a cloud_backup flag (default false). Controls whether the
app nudges the user to sign in when signed out. The lifecycle:

- New user, never signed in: cloud_backup false, no nudging.
- First sign-in: cloud_backup set to true.
- Signed out after normal use: cloud_backup remains true; app nudges the
  user to sign back in (prompt on load, visual indicator on Account menu).
- Sign out and remove cloud data (SORCD): cloud_backup set to false; no
  more nudging. User has made a deliberate choice to leave the cloud.
- User unchecks cloud_backup in options: nudging stops. Cloud ops (ds/dr)
  still available manually; the flag only controls the nudge.

Multi-device advice: ds and dr are safe to use across devices because all
transfers go through the per-video conflict check. The one scenario to avoid
is being signed in and using ds on two devices without a dr in between on
the second device -- you could overwrite the first device's cloud save. Best
practice: ds before switching devices; dr after switching.

Decision tables for ds, dr, and di:

    ds (local → cloud)

    Videos      | Edit in cloud
    -----------------------------------------------
    local-only  | Added
    local-newer | Replaced
    same        | No change
    cloud-newer | Replaced, or skipped — after prompt
    cloud-only  | Deleted, or kept — after prompt

    dr (cloud → local)

    Videos      | Edit locally
    -----------------------------------------------
    cloud-only  | Added
    cloud-newer | Replaced
    same        | No change
    local-newer | Replaced, or skipped — after prompt
    local-only  | Deleted, or kept — after prompt

    di (JSON → local): just like dr with JSON=cloud

    Videos      | Edit locally
    -----------------------------------------------
    JSON-only   | Added
    JSON-newer  | Replaced
    same        | No change
    local-newer | Replaced, or skipped — after prompt
    local-only  | Deleted, or kept — after prompt

## LoopLlama Menu Philosophy

NOUN → VERB structure

The menu label names the entity (the noun); menu items are verbs that act on
it. This makes the hierarchy meaningful rather than just a grouping
convenience.

Ellipsis = picker required

An ellipsis suffix signals that a picker or selection step will appear before
the action executes. No ellipsis means the action operates on the
current/implied entity immediately. This is a narrower use of the convention
than HIG — it does not apply to every dialog, only to operations that
require the user to select which entity to act on.

Menu context reduces label verbosity

Because the menu label establishes the noun, item labels need only be the
verb. "Delete video" becomes "Delete..." under the Video menu. Redundant
qualifiers ("current", "video", "section") are dropped.

Entity ownership resolves duplication

When an action could appear in multiple menus, it belongs in the menu whose
label names the primary noun. "Loop current section" belongs under Section,
not Loop. This eliminates cross-menu duplication and gives each menu a
coherent identity.

The Loop menu's noun is the scratch loop

Unlike other entity menus, Loop is centered on the scratch loop as its primary
subject. Named loops are accessed via Open... and Delete..., but Edit, Zoom,
and the source-management block all act on the scratch loop directly.

Footer messages carry explanatory load

Short or ambiguous labels (e.g. "Toggle timeline") are acceptable when the
footer provides context at the moment of use. Labels don't need to be
self-contained documentation.

Real estate is a constraint

Eight menus across a narrow header is the practical limit. The Help menu was
folded into App to preserve horizontal space. Brevity in labels serves the
same goal.

Menus do not duplicate main controls

Menu items do not perform actions that are directly available via the app's
main controls: play/pause; toggle looping; previous/next entity; etc.

## Mardown notes

Notice syntax/styles:

  - Simple marker before the target paragraph.

      gray/blue-gray | {: .notice}          | .
      forest/teal    | {: .notice--primary} | info items
      steel-blue     | {: .notice--info}    | .
      brown/amber    | {: .notice--warning} | .
      red            | {: .notice--danger}  | warnings
      green          | {: .notice--success} | success advice

  - Enclose multiple paragraphs as the target:

      <div class="notice--primary" markdown="1">
      Blah blah
      </div>

Linking:

  - Link to headings:

      Anchor | ### Foo-bar heading {#blort-x}
      Link   | [see foo-bar](#blort-x)

  - Anchor on raw paragraphs: must use HTML directly:

      <a id="blort-x"></a> Blort-X. Blah blah
      blah blah.

## Entity actions: summary

    Action    | Video | Chapter | Section | Loop | Mark
    ----------------------------------------------------
    Create    | .     | cc      | ss      | ll   | mm
    Edit      | ve    | ce      | se      | le   | me
    Scratch   | vx    | cx      | sx      | lx   | .
    Jump...   | .     | cj      | sj      | lj   | mj
    Zoom      | vz    | cz      | sz      | lz   | .
    Fix-end   | .     | cf      | sf      | .    | .
    Delete... | vd    | cd      | sd      | ld   | md

## Menus

    Video:
        Load URL   | vl  y
        Open...    | vo  vv
        Edit       | ve
        Scratch    | vx
        Zoom       | vz
        Delete...  | vd
        Unstash... | vu
        Info       | vi

    Chapter:
        Create    | cc
        Edit      | ce
        Scratch   | cx
        Jump...   | cj
        Zoom      | cz
        Fix end   | cf
        Delete... | cd

    Section:
        Create    | ss
        Edit      | se
        Scratch   | sx
        Jump...   | sj
        Zoom      | sz
        Fix end   | sf
        Delete... | sd

    Loop:
        Create    | ll
        Edit      | le
        Scratch   | lx
        Jump...   | lj
        Zoom      | lz
        Delete... | ld

    Scratch:
        Toggle          | xx
        Edit mode       | xe  \
        Zoom            | xz
        --------------------------------
        Save to source  | xs
        Reset to source | xr
        Unlink source   | xu

    Mark:
        Create    | mm
        Edit      | me
        Jump...   | mj
        Delete... | md

    Data:
        Share video        | dv
        Share scratch loop | dx
        --------------------------------
        Export             | de
        Import             | di
        Inspect            | dI
        --------------------------------
        Save to cloud      | ds  dd
        Read from cloud    | dr
        Compare            | dc
        --------------------------------
        Delete...          | d⌫

    App:
        Jump history... | jh
        Back            | jb
        Forward         | jf
        --------------------------------
        Undo            | au  u
        Redo            | ar  U
        Recall message  | am
        --------------------------------
        Copy time       | ac
        Toggle timeline | at  t
        Zoom off        | az  z
        --------------------------------
        Options         | ao  o
        Help            | ah  h
        Key bindings    | ak  k
        Load examples   | ae

## Text elements

### Pickers

    video-open     | Open video
    video-delete   | Delete video
    video-unstash  | Unstash video
    chapter-jump   | Jump to chapter
    chapter-delete | Delete chapter
    section-jump   | Jump to section
    section-delete | Delete section
    loop-jump      | Jump to loop
    loop-delete    | Delete loop
    mark-jump      | Jump to mark
    mark-delete    | Delete mark
    jump-history   | Jump history

### Modals

    video-load-url        | Load Video
    video-edit            | Edit Video
    video-info            | Video Info
    chapter-edit          | Edit Chapter
    section-edit          | Edit Section
    loop-edit             | Edit Loop
    mark-edit             | Edit Mark
    data-inspect          | Inspect data
    data-compare          | Compare data: local and cloud
    data-delete-bulk      | Delete data
    app-options           | Options
    shared-video-conflict | Review conflict: shared video
    data-op (di)          | Review conflict: import data
    data-op (dr)          | Review conflict: cloud read
    data-op (ds)          | Review conflict: cloud save

### Current panel

Elements:
  - Name
  - Video ID
  - Duration
  - Timeline display
  - Chapter
  - Section
  - Scratch loop source
  - Zoom [if active]

### Timeline: hovers

Elements:
  - Playback.
  - Chapters.
  - Sections.
  - Marks.
  - Loops.

### Which-key

Elements:
  - Scratch-edit mode.
  - Count prefix.
  - Binding prefixes:

        v | Video
        c | Chapter
        s | Section
        l | Loop
        x | Scratch
        m | Mark
        d | Data
        a | App
        j | Jump
        ` | Open menu
        [ | Loop start
        ] | Loop end

### Messages

Policy:

    - Messages should:
      - End with periods.
      - Be consistent across similar operations.
      - Be restructured to avoid the need for pluralization logic.

    - Always keep messages for:
      - Failures/errors.
      - Blocked actions.
      - Mode changes.
      - For operations with uncertain or non-obvious completion (cloud,
        import/export, sharing), err toward keeping confirmation messages even
        when the outcome has visual indicators.

    - But without those features, drop messages that:
      - Are pure narration without additional info (eg which entity).
      - Or that have their own obvious and complete visual consequences.

    - Message structures:
      - Use the approach below, when feasible.
      - For warning/error, avoid structures that scan like "ENTITY: VERB".

          Type    | Structure           | Example
          -----------------------------------------------------------------
          Info    | "ENTITY: VERB"      | Chapter: created.
          Warning | "BRIEF_PROBLEM"     | No chapters.
          Warning | "PROBLEM[: REASON]" | Cannot fix chapter end: video duration is unknown.

Abbreviations:

    Context:

        ST       | STARTUP
        ST-SL    | STARTUP shared loop
        ST-SV    | STARTUP shared video
        ST-SC    | STARTUP shared content
        CB       | Clipboard

    Message types:

        I     | Info
        W     | Warning
        E     | Error

    Other:

        - EXPLICIT_JUMP: fires when looping=true and user requests an explicit
          jump outside the loop.

        - NO_VIDEO: message when there is no current video and user uses one
          of the app's main controls that required a video (play, seek,
          jump/navigate, scratch bounds).

        - BAD_TIME: message when user enters an invalid time in a main control
          (current time, scratch loop bounds).

```
Context            | Type | Message
------------------------------------------------------------------
ST-SL              | I    | Shared loop: loaded.
ST: old v2 share   | I    | Shared loop: loaded.
ST-SV              | I    | Shared video: loaded.
ST-SC: error       | E    | Could not load share URL[: {error_message}].
ST-SL: bad URL     | E    | Invalid URL: shared loop.
ST-SV: bad URL     | E    | Invalid URL: shared video.
SIGN-IN            | I    | Signed in.
SIGN-OUT           | I    | Signed out.
CLOUD: deleted     | I    | Cloud data: deleted.
CLOUD: deleted     | E    | Cannot delete cloud data: {err_message}.
APP: focus lost    | W    | Key bindings inactive.
NO_VIDEO           | W    | No current video.
EXPLICIT_JUMP      | I    | Looping off.
BAD_TIME           | W    | Invalid time.
------------------------------------------------------------------
vl                 | I    | Video: loaded.
vl                 | W    | Invalid YouTube URL or ID.
vl                 | E    | YouTube failed to load video.
vo                 | I    | Video: opened.
vo: no videos      | W    | No videos.
ve                 | I    | Video: edited.
ve                 | W    | No current video.
vx                 | I    | Video: scratched.
vx: no duration    | E    | Cannot scratch video: video duration unknown.
vz: was off        | I    | Video: zoomed.
vz: was on         | I    | Zoom: off.
vz: no video       | W    | No current video.
vz: full video     | W    | Cannot zoom a range spanning entire video.
vd                 | I    | Video: deleted.
vd: no videos      | W    | No videos.
vu                 | I    | Video: unstashed.
vu: no stashes     | W    | No stashed videos.
------------------------------------------------------------------
cc                 | I    | Chapter: created.
cc: fixed chap     | W    | Cannot create chapter: inside a fixed chapter.
ce                 | I    | Chapter: edited.
ce: no chapter     | W    | No current chapter.
cx                 | I    | Chapter: scratched.
cx                 | W    | No current chapter.
cj: no chapters    | W    | No chapters.
cz: was off        | I    | Chapter: zoomed.
cz: was on         | I    | Zoom: off.
cz: no chapter     | W    | No current chapter.
cf                 | I    | Chapter: end {fixed/unfixed}.
cf: no chapter     | W    | No current chapter.
cf: no duration    | E    | Cannot fix chapter end: video duration unknown.
cd                 | I    | Chapter: deleted.
cd: no chapters    | W    | No chapters.
------------------------------------------------------------------
ss                 | I    | Section: created.
ss                 | W    | Cannot create section: inside a fixed section.
se                 | I    | Section: edited.
se: no section     | W    | No current section.
sx                 | I    | Section: scratched.
sx: no section     | W    | No current section.
sj: no sections    | W    | No sections.
sz: was off        | I    | Section: zoomed.
sz: was on         | I    | Zoom: off.
sz: no section     | W    | No current section.
sf                 | I    | Section: end {fixed/unfixed}.
sf: no section     | W    | No current section.
sf: no duration    | E    | Cannot fix section end: video duration unknown.
sd                 | I    | Section: deleted.
sd: no sections    | W    | No sections.
------------------------------------------------------------------
ll                 | I    | Loop: created.
ll: bad range      | W    | Cannot create loop: invalid range.
le                 | I    | Loop: edited.
le                 | W    | No current loop.
lx                 | I    | Loop: scratched.
lx                 | W    | No current loop.
lj: no loops       | W    | No loops.
lz: was off        | I    | Loop: zoomed.
lz: was on         | I    | Zoom: off.
lz: no loop        | W    | No current loop.
lz: full video     | W    | Cannot zoom a range spanning entire video.
ld                 | I    | Loop: deleted.
ld: no loops       | W    | No loops.
------------------------------------------------------------------
xx                 | I    | Scratch loop: {on/off}.
xx                 | W    | Cannot activate scratch loop: invalid range.
xx: no video       | W    | No current video.
xz: was off        | I    | Scratch loop: zoomed.
xz: was on         | I    | Zoom: off.
xz: bad loop       | W    | Cannot zoom scratch loop: invalid range.
xz: full video     | W    | Cannot zoom a range spanning entire video.
xs                 | I    | Scratch loop: saved back to source.
xs: no source      | W    | Cannot save: no scratch loop source.
xs: bad range      | W    | Cannot save: invalid scratch loop range.
xs: source gone    | W    | Cannot save: scratch loop source not found.
xs: too small      | W    | Cannot save: invalid scratch loop range.
xs: neighbor elim  | W    | Cannot save: would eliminate a neighboring source.
xr                 | I    | Scratch loop: reset to source.
xr: no source      | W    | Cannot reset: no scratch loop source.
xu                 | I    | Scratch loop: source unlinked.
xu: no source      | W    | Cannot unlink: no scratch loop source.
------------------------------------------------------------
mm                 | I    | Mark: created.
mm: dup time       | W    | Cannot create mark: mark exists at current time.
me                 | I    | Mark: edited.
me: no mark        | W    | No current mark.
mj                 | W    | No marks.
md                 | I    | Mark: deleted.
md                 | W    | No marks.
------------------------------------------------------------------
dv                 | I    | Shared video: URL copied to clipboard.
dv: no video       | W    | No current video.
dv: CB blocked     | E    | Cannot provide shared video URL: clipboard blocked.
dv: error          | E    | Cannot provide shared video URL: {err_message}.
dx                 | I    | Shared scratch loop: URL copied to clipboard.
dx: no video       | W    | No current video.
dx: bad range      | W    | Cannot provide shared scratch loop URL: invalid range.
dx: CB blocked     | E    | Cannot provide shared scratch loop URL: clipboard blocked.
dx: error          | E    | Cannot provide shared scratch loop URL: {err_message}.
de                 | I    | Data: exported.
di                 | I    | Data: imported.
di: parse error    | E    | Cannot import data: {err_message}.
ds                 | I    | Data: saved to cloud.
ds: not signed in  | W    | Cannot save data to cloud: you must be signed in.
ds: cloud error    | E    | Cannot save data to cloud: cloud request failed.
dr                 | I    | Data: read from cloud.
dr: not signed in  | W    | Cannot read data from cloud: you must be signed in.
dr: no cloud data  | W    | Cannot read data from cloud: no cloud data found.
dr: cloud error    | E    | Cannot read data from cloud: cloud request failed.
dc: not signed in  | W    | Cannot compare local and cloud data: you must be signed in.
dc: cloud error    | E    | Cannot compare local and cloud data: cloud request failed.
d⌫:                | I    | Data: deleted.
------------------------------------------------------------------
jh                 | W    | No jump history.
jb: no history     | W    | Cannot jump: no jump history.
jb: at oldest      | W    | Cannot jump: at oldest position.
jf: no history     | W    | Cannot jump: no jump history.
jf: at newest      | W    | Cannot jump: at newest position.
au                 | I    | Undone: ({prior_edit_msg}).
au: nothing        | W    | Cannot undo.
ar                 | I    | Redone: ({prior_edit_msg}).
ar: nothing        | W    | Cannot redo.
am: no prior       | W    | No recent message.
ac                 | I    | Time copied: {time}.
ac: CB blocked     | W    | Cannot copy current time: clipboard blocked.
at                 | I    | Timeline displaying: {sections/chapters}.
az                 | I    | Zoom: off.
az: no zoom        | W    | No current zoom.
ao                 | I    | Options: saved.
ae                 | I    | Examples: loaded.
```

