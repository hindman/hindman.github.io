
## CURRENT SESSION

## TODO: LoopLlama v2

Somewhat narrow browser window:
    - Long quips cause layout to shift
        - reduce font a bit; let it wrap and occupy two lines
    - If window too narrow: no quips?

Persistence:
    x phase 1: metrics
        x dev
        x prod
    - phase 2: __
    - phase 3: __

Current tasks:

    - invoke:
        x build
        - deploy
            - add build number: srv/version.js
        - serve individually:
            - bundle exec jekyll serve --drafts --unpublished
            - npm run dev
        - serve all to log files:
            - spin up LL and F5 locally, with output to logs
            - follow command
            - kill command

    - Help text: draft
    - Banner write up.
    - Real-world usage and testing: phase 2.
    - Try on other devices: iPad, phone, JK machines

Pending tasks:

    - Text elements: edit/organize [see below].
    - Code review and refactor.
    - Real-world usage and testing: phase 3.
    - Launch: Make v2 the offial version.

Text elements: edit/organize: DETAILS:
    - Menus:
        - Edit
        - Add: Chapter, Data
    - Messages:
        - status/info
        - warning
        - error
        - which key
    - Modals:
        - titles, labels
        - messages
    - Pickers:
        - titles
    - Timeline:
        - Hovers
    - Current panel

## TODO: The Fifth Fret

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

