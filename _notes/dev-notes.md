
<!--

## Overview of documents
## Project setup
## Common dev tasks
## Testing scenarios
### Creating a cloud-newer video
### Testing: Supabase down
## Markdown notes
## V3 ideas: other video sources
### Vimeo
### Other online platforms
### Local video files
### Open-source LoopLlama project

-->

## Overview of documents

    Document                    | Audience | Note
    --------------------------------------------------------------------------------
    loopllama-v2-help.md        | user     | Help docs
    loopllama-v2-keybindings.md | user     | Key bindings
    --------------------------------------------------------------------------------
    road-map.md                 | dev      | TODOs for LoopLlama and F5
    dev-notes.md                | dev      | Dev notes: common tasks, markdown notes, v3, etc
    tasks.py                    | dev      | Invoke code for common dev tasks
    architecture-notes.md       | dev      | Overview of software, architecture, schema, etc
    writing-notes.txt           | dev      | Rough notes for future F5 posts
    deployments.json            | dev      | Build numbers and artifacts for deployments
    text-elements.md            | dev      | Listing of the app's text elements
    jdiff-ll                    | dev      | Python to smart-diff LL data exports
    create_db.sql               | dev      | Create/configure Supabase tables
    select_user_video_count.sql | dev      | SQL snippets for manual queries in Supabase

## Project setup

Initial Ruby setup:
  - Installed Ruby via Homebrew (see computer-setup).

Initial project setup:
  - Declare dependencies: see Gemfile.
  - Install:

        gem install bundler
        gem install jekyll
        bundle install

## Common dev tasks

Serving websites locally:
  - Serves both LoopLlama v2 and The Fifth Fret.
  - For the latter, serves drafts and unpublished.
  - For PID and log files, see loopllama/v2/logs/.

        inv serve
        inv status
        inv follow
        inv kill
        inv clear

LoopLlama: deploying:
  - See tasks.py for details.

        inv deploy
        inv builds               # Optional: to see latest build number.
        git push origin master

        # Wait: monitor progress in GitHub Actions.
        # Check build number on LL production: `dI` (Data > Inspect).

LoopLlama: running tests:
  - These tests check several of the pure data functions.
  - Especially those with trickier logic or edge-case bugs.

        inv test

LoopLlama: lines of code:

        inv loc

## Testing scenarios

### Deleting all video stashes

    const LLKEY = 'loopllama-v2';
    const state = JSON.parse(localStorage.getItem(LLKEY));
    state.stashes = {};
    localStorage.setItem(LLKEY, JSON.stringify(state));

### Creating a cloud-newer video

Get a video ID for testing. Edit MVID and N_HOURS as needed.

Phase 1: backdate the local video by running this from dev console:

    // Setup.
    const LLKEY = 'loopllama-v2'
    const MVID = 'aYfwRktvFNc'
    const N_HOURS = 24;

    function checkVid() {
      let state = JSON.parse(localStorage.getItem(LLKEY));
      let vid = state.videos.find(v => v.id === MVID);
      console.log('VIDEO_NAME', vid.name);
      console.log('LAST_MODIFIED', new Date(vid.last_modified));
      return [state, vid];
    }

    // Backdate, write to localStorage, then confirm.
    let [state, vid] = checkVid();
    vid.last_modified -= 60 * 60 * 1000 * N_HOURS;
    localStorage.setItem(LLKEY, JSON.stringify(state));
    checkVid();

Phase 2. Check.
  - Hard reload from the console: CMD-SHIFT-R.
  - Run "Setup" code from above.
  - Run checkVid().
  - Close console.
  - Run `dc`: should see a cloud-newer video.

### Testing: Supabase down

Steps:

    Dev Tools =>
    The "..." menu =>
    More Tools =>
    Request conditions =>
    Block =>
    Pattern =>  *://*.supabase.co/*

## Markdown notes

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

## V3 ideas: other video sources

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

### Other online platforms

Twitch (live-stream focused), Dailymotion, Facebook Video, TikTok,
Instagram: none have usable programmatic APIs for the kind of
seek/loop/rate control LL needs. Not worth pursuing.

### Local video files

Many users -- especially the primary use case -- have guitar lesson videos on
their computers: purchased downloads, DVD rips, saved YouTube videos, etc.
These can't use the YouTube IFrame API, but they can use the HTML5 `<video>`
element, which natively supports everything LL needs:

- `play()`, `pause()`, `currentTime` (seek), `duration`, `playbackRate` -- all
  native, synchronous, no API handshake
- MP4, WebM, and MOV (macOS) all work
- Implementation is simpler than YouTube, not harder

Serving local files: run a simple HTTP server from a directory of symlinks
pointing at the actual video files (e.g. `python3 -m http.server 8080`).
Startup automation (an `inv` task or ~/bin script) handles both launching the
server and generating a JSON manifest of available videos.

Manifest format -- a bare list of URLs, nothing more:

    { "videos": ["http://localhost:8080/my-solo.mp4", ...] }

The URL is the identity key for each video. LL derives a default display name
from the filename (extension stripped, hyphens/underscores replaced with
spaces); the user can refine it via the existing edit-video modal.

On startup, LL fetches the manifest from a configured URL (default:
`http://localhost:8080/manifest.json`). Any video URL not already in the
library is added silently; duplicates are skipped. If the fetch fails (server
not running), LL does nothing -- no error, no message. This is the normal case
when running against YouTube.

New videos land in `_appState.videos` like any other video, persist to
localStorage, and can be synced to the cloud via ds/dr.

Architecture: `videoController.js` becomes an adapter interface. LL detects
the source type from the URL (YouTube domain → YouTube adapter; localhost or
video file extension → HTML5 adapter) and instantiates the right controller
via a dual-controller pattern (both initialized at startup; active one shown
based on video type). The rest of the app -- loops, marks, sections, speed,
timeline -- is unchanged.

This effort would also include a metadata migration to add a video.type
attribute, which would hold either "youtube" or "local".

This is also the key enabler for a proper open-source release (see next
section): users who run LL locally get full LL features on their own video
library without any cloud dependency.

### Open-source LoopLlama project

Currently LL lives inside the hindman.github.io blog repo: the code is public
but the project isn't structured for outside contributors or users. A proper
open-source release would involve:

- Separate repo (e.g. github.com/mhindman/loopllama)
- README with install steps: clone, `npm install`, etc.
- LICENSE file (MIT is the natural choice)
- `.env.example` committed as a template showing required variable names
  without real values -- standard convention for projects using env vars

The local video feature makes this more immediately useful: a user who clones
LL and runs it locally gets full LL functionality on their own video files,
with no YouTube dependency, no Supabase account needed for basic use
(localStorage-only mode already works).

Supabase for contributors: anyone wanting the full persistence and sharing
features would need their own Supabase project. A setup guide would be
required. This is a manageable ask for a small community.

