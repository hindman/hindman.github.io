
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

