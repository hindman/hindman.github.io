
## CURRENT SESSION

Current stage to implement:

The plan: _notes/v2-planning/loopllama-v2-plan.md. Speak up if things are unclear or need adjustment.

## TODO

V2 implementation:

    8b-1. Mechanical fixes:
        - Enter in start/end input: submit then blur, returning focus to the
          app (not leaving focus stuck in the text box).
        - Back/Fwd buttons: replace "Back" / "Fwd" text with arrow symbols
          (e.g., ◀ / ▶).
        - Edit-scratch delta choices: change constant to [0.1, 1, 5, 10, 30].

    g c -am '8b-1. Mechanical fixes'

    =====================

    /rename loopllama-v2-stage-8b-2

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

    g c -am '8b-2. Visual polish and state logic'

    =====================

    /rename loopllama-v2-stage-8b-3

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

    g c -am '8b-3. Layout grouping and edit-scratch visual indicator'

    =====================

    /rename loopllama-v2-stage-8b-4

    8b-4. Direct time entry in edit-scratch mode:
        - When in edit-scratch-loop mode, pressing a digit, colon, or forward
          slash focuses the active text input (start or end), letting the
          browser handle text entry normally.
        - Enter in the focused input submits the value and blurs the input,
          returning to keyboard nudge mode within edit-scratch-loop mode.
        - A subsequent Enter or Esc (when no input is focused) exits
          edit-scratch-loop mode entirely.

    g c -am '8b-4. Direct time entry in edit-scratch mode'

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

