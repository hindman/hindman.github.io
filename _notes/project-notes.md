
In this chat we are planning for v2 of LoopLlama. Please take a look through
the _notes/v2-planning subdirectory, which has this structure:

_notes/v2-planning/
    loopllama-v2-plan.md
    old-gpt-chats/
        loopllama-chat-text.md
        loopllama-chat.json
    schematic-mockup.txt

The old-gpt-chats/ directory contains the full dump of a long set of chats I
had with ChatGPT about the topic of v2. The file loopllama-v2-plan.md is a
Claude Code summary of that material, with some very minor edits by me. The
schematic-mockup.txt is an ascii-style visual mockup of the v2 page, with some
(possibly cryptic) notes on what UI element the new design would have.

Don't assume that any of this material is definitive yet: we are in the
planning process and can change our minds. Also, the various notes were
created at different times and thinking might have evolved along the way.

One example is the envisioned section titled "### Step 1: Restructure Project
for Growth". The proposed directory tree might not be exactly correct given
that our current (ie master branch) loopllama area now has a v1/ subdirectory,
implying that our project layout might support the deployment of multiple
versions at once. Perhaps that level of complexity won't be worth it, but the
issue illustrates that some of the plans might need updating.

A second example is the super-incrementalist mentality of the rollout plan.
That is mostly an artifact of my experience coding with ChatGPT, a web-based
LLM that posed some challenges in keep the code and the LLM in sync. With
Claude Code (and maybe with the potential for v1/ and v2/ subdirectories) my
need for incrementalism might be drastically reduced.

With those caveats in mind, let's start by assessing the plan. I probably
won't pose all of the questions that need asking, but here are a few. Are any
of our tech decisions bad ideas? Are any goals of the project unclear? Are we
missing anything important regarding LoopLlama's features? What should our
implementation plan be in terms of organizing the work into important stages?

========

Good picture now. Here's my assessment.

Tech Decisions

Lit + Vite: no objections. Lit is an honest choice for a solo app: Web
Components, reactive properties, no JSX, close to the browser. You won't hit a
wall with it for this scope. Vite is the obvious build tool.

One gap in the tech plan: CSS strategy. The plan says "visual overhaul" and
"polished UI" but says nothing about how you'll get there. Flexbox/Grid is
layout, not design. Will you hand-roll all styles? Use a design system?
Something minimal like open-props or a utility framework? This needs a
decision before you start building components, because it affects how every
component is structured.

One tech concern: the incremental adoption approach. The plan describes
embedding Lit components into the existing HTML incrementally. Given Claude
Code, that rationale disappears -- you don't need the LLM to stay synced with
an evolving partial codebase. A clean v2 implementation in loopllama/v2/ is
simpler than a hybrid approach, and v1 stays live at loopllama/v1/. The
incremental plan was a ChatGPT workaround, not an architectural preference.

Unclear Goals

Sections vs. marks. The plan treats sections as a distinct concept (labeled
time ranges: intro, verse, solo...) but marks are point-in-time. That's a
meaningful distinction -- sections have two endpoints and a label, marks are a
named timestamp. The section-labeling workflow ("mark the start of every
section") blurs this. You need to decide: are sections just pairs of marks
with labels? Are they stored separately? How do they appear on the timeline
vs. how marks appear?

Named marks and loops. v1 has m1-m9 (nine marks) and L1-L9 (nine saved loops),
keyed by number for keyboard access. v2 wants "user-defined labels." If you
add arbitrary string names, how does keyboard access work? You can't bind one
key per mark if there are 20 marks. This either requires a new navigation
paradigm (fuzzy search by name? numbered access with names as display labels
only?) or a cap on quantity. This design gap will affect the data model.

The prompt() problem isn't mentioned explicitly. v1 uses browser prompt()
dialogs everywhere: setting marks, setting loop points, entering URLs,
managing favorites. These are intrusive and ugly. The plan says "editable via
standard web controls" but doesn't lay out a concrete UX model for
keyboard-triggered operations. Do you open a modal? An inline editor on the
timeline? A command input field at the bottom of the screen? This is the most
important UX design decision in v2 and needs explicit thought.

Missing Items

- Duration detection bug. The GPT chat documented a real v1 bug: getDuration()
  called too early returns an unreliable value for long videos. v2 should fix
  this properly using onStateChange to delay duration reads until actual
  playback begins.
- Keyboard focus management. When a modal is open (for editing a mark, say),
  keyboard events need to go to the modal, not the main keyboard controller.
  This is a non-trivial coordination problem in a keyboard-first app. It needs
  explicit handling.
- URL sharing with named marks. v1 encodes all video state into a share URL.
  If v2 adds named marks, labeled sections, and more state, that URL gets
  unwieldy. Is URL-based sharing still worth supporting in v2? Worth deciding.
- The sync feature is scope-creepy. The URL-to-remote-JSON sync idea is
  interesting but adds CORS complexity, requires the user to host their own
  JSON file, and is a long way from the core value. Flag it as a post-v2 idea
  and don't let it influence the data model.

Implementation Stages

Given Claude Code:

1. Project scaffolding. Create loopllama/v2/, initialize Vite + Lit, get a
   "hello world" rendering. Establish the CSS approach. Settle the
   directory/hosting plan (v1 stays at v1/, v2 goes live at v2/ or eventually
   replaces the root).
2. State and storage modules. Port vi, favs, DEFAULTS, and localStorage logic.
   Update the data model for named marks if that's the direction. This is pure
   JS, no UI, fully testable.
3. YouTube API integration. Port videoController.js logic. Fix the
   getDuration() bug via onStateChange. Wrap in a Promise-based loader as the
   plan specifies.
4. Basic working UI -- no timeline, no modals. Video iframe + live display of
   current time, loop, speed, marks. Keyboard controller ported and working.
   At this point you have a functional v2 that matches v1 behavior.
5. Timeline component. This is the centerpiece visual feature and the biggest
   new engineering work. Get it right before touching modals.
6. Modal UX design and implementation. Marks editor, favorites, settings,
   history, help. The UX pattern for keyboard-triggered modal operations needs
   to be locked down before building any of these.
7. Persistence improvements. File picker for import, session resume, polish
   the export filename.
8. Navigation safety. Seek stack / go-back.
9. Polish and deploy. Replace loopllama/index.html or update it to point to
   v2.

Before starting to code, I'd resolve: (a) CSS strategy, (b) the
sections-vs-marks data model, and (c) the keyboard-triggered modal UX pattern.
Those three will shape almost everything else.

## TODO

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

Two-repo setup [TWOREPO].
    - Is this necessary?

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

Purpose: keeping pre-publication materials out of the publicly visible Git
repo.

Details, if needed.

    https://chatgpt.com/g/g-p-69012377fdf08191894a49cb05e01da6-ghp-writing/c/6909abee-d9ac-8327-89b9-544602e510be

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

