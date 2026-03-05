
## CURRENT SESSION

Current stage to implement:

The plan: _notes/v2-planning/loopllama-v2-plan.md. Speak up if things are unclear or need adjustment.

## TODO

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

URLS:

    https://www.youtube.com/watch?v=2iFn6ursFaE
    https://www.youtube.com/watch?v=zP4lYpsfL8c

DEFERRED:
    - Sub-group label positioning (above vs inline): revisit once all controls
      are on the page and the full layout is visible.
    - "Now" vs "Set here" language inconsistency.

Posts:
    x RH rudiments #1: alternating bass
    - RH rudiments #2: Giuliani
    - Practicing right-hand rudiments: muting
    - Blues turnarounds: a systematic approach
    - Add-a-beat. https://chatgpt.com/c/69056e95-7910-8326-bee6-dae0c53cc18b
    - Triads: lots to say.
    - 76 reasons why the filibuster is a bad idea
    - MTG and Linda Litzke: https://chatgpt.com/c/691bca59-15ac-832b-b9de-8d1f38ddd596
    - Skepticism of the science of music practice: https://chatgpt.com/c/692dd380-d5d0-832c-ad74-a768b049c47b

Tommy Emmanuel vs Music Practice Inc

    https://youtu.be/PLIZZ9lIlwg?t=587

    When I first heard this interview last year I really appreciated the emphasis
    on no free lunches: learning a song requires diligent effort; you have to
    grind it out, small bit by small bit. Get your ass to the woodshed and don't
    come out for a good long while.

    But what strikes me today is how Emmanuel's advice cuts sharply against the
    conventional wisdom on optimal practice strategy (Molly Gebrian, Noa Kageyama,
    Charles Szczepanek, and other teachers in the vein). I have learned a lot from
    their thinking (my post's title should be read as friendly teasing, not
    mockery), but I also know enough about quantitative research to see the weak
    foundation upon which many of their empirical claims rest. Academic quibbles
    aside, Tommy Emmanuel rejects one of their core pieces of advice – namely,
    interleaved rather than blocked practice (and related concepts).

    Emmanuel says screw all of that: when you learn a new song, it must consume
    you; your focus must be dogged, exclusive. Which approach is optimal? I have
    no idea. And I have serious doubts that Gebrian-style research on this subject
    proves very much. But Emmanuel's statement implies an essential aspect of
    mastery: if you want to learn something difficult, it must obsess you — a kind
    of mental illness channelled in productive directions.

    Where do I stand on all of this? Nowhere firm, but my working theory is that
    both sides of this debate can teach you important things. The right balance
    probably varies according to your personality and abilities.

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

TOC icons:

    leaf
    tree
    seedling
    sprout
    feather-alt
    sun
    water
    droplet

## Two repo setup

The workflow: write and build locally in the private repo, rsync the built
output to the public repo, push.

- `hindman-ghp-source` (private): the Jekyll source -- Markdown, templates,
  Gemfile, your writing
- `hindman.github.io` (public): only the compiled `_site/` output, with a
  `.nojekyll` flag telling GitHub not to run Jekyll server-side

Reasons for the split:

1. Keep pre-publication materials out of the publicly visible Git repo.

2. Plugin freedom. GitHub Pages' server-side Jekyll supports only a whitelist
   of plugins. If you build locally and push static files, you can use any
   Jekyll plugin you want.

3. Exact build environment control. You run your own Ruby/gem versions rather
   than whatever GitHub's Jekyll stack uses.

4. Cosmetic cleanliness. The public repo contains only HTML/CSS/JS -- no
   Jekyll machinery visible to anyone browsing it on GitHub.

None of those are compelling for my situation so far.

Create new repo: hindman-ghp-source
    - Make it private.
    - Make it empty [no README etc].

In the old repo: hindman.github.io

    # Add new repo as a remote.
    git remote add source git@github.com:hindman/hindman-ghp-source.git

    # Push v1.5 to master.
    git push --set-upstream source v1.5:master

    # Push v2 to v2.
    git push source v2:v2

In the new repo: hindman-ghp-source
    - Set its default branch to master [rather than main].
    - Make a fresh clone locally.
    - Check branches, files, history to verify success.

In the old repo: hindman.github.io

    # Drop the remote.
    git remote remove source

In hindman-ghp-source:
    - Build the static site

        bundle exec jekyll clean
        bundle exec jekyll build

    - Verify _site/ looks correct, both on file system and in a browser.

    - Ensure no _config.yml or Jekyll metadata is copied.

In hindman.github.io:

    - Delete all branches except master.

    - In master, delete all files/dirs except for the following. Preserve
      them somewhere outside the repo dir.

        .gitignore
        tmp/

    - Create one file:

        touch .gitignore

    - Commit the nearly-empty, master-only repo.

In hindman-ghp-source:

    - Sync: source to deployed site:

        rsync -a --delete _site/ ../hindman.github.io/

    - Later, I will encapsulate the sync process in a proper script.

In hindman.github.io:

    - Pull in the stuff tucked away above:

        .gitignore
        tmp/

    - Tell GHP not to use Jekyll:

        touch .nojekyll

    - Modify .gitignore to reflect the new role of the repo.

    - Commit, push.

    - Check https://hindman.github.io/

On github.com:

    - Confirm GHP settings for hindman.github.io.

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

