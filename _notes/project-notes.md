
I have edited loopllama-v2-plan.md, notably these sections:

    ## Key bindings
    ## Modals, pickers, and other UI elements
    ## Mockup of page layout and UI controls

The biggest changes were:

(1) Substantially reduced the number of buttons and other controls on the main
page, restricting to the frequently-used operations. Everything else is nested
under dropdown menus.

(2) Initially I organized the menus around verbs (Save/set, Edit, Delete,
Jump) but decided that users might find the system more intuitive if the
organization were mostly noun-based: Video, Section, Loop, Mark, Jump, App,
Help.

(3) Dropped the jumps-picker and its overly fancy command-line grammar.

(4) Adjusted the keybindings accordingly.

(5) Decided to move the loop-source up to the messages area with the other
informational items like video name and title.

(6) Decided to make the timeline have two zones, one for clicking to jump to a
time in the video and one for clicking to edit entities in the timeline.

Please read the document, focusing especially on those sections. Let me know
if there are questions that need resolving, conflicts, things that will seem
to confusing to users, bad ideas, or any other problems.

=============

Good set of changes overall. The dropdown-first approach reads clearly in the
controls spec, and the noun-based menu grouping is more intuitive than
verb-based. Several issues worth resolving:

**Stale modal descriptions (significant)**

`Edit-section-mode` and `Edit-mark-mode` both say the relevant fields are
"already on the page" — but with the new design they're not. Those modes
need rethinking: since section name/start and mark name/time are no longer in
the controls area, editing them has to be triggered from the timeline click.
Probably means these become proper modals (or inline popovers), not modes. The
descriptions should be updated to reflect that.

**`ld | Delete: current loop-source` — ambiguous**

What happens when the scratch-loop was loaded from a Section rather than a
named Loop? There's no "loop source" to delete. Should probably be `ld |
Delete: source loop (only available when source is a Loop)` and the behavior
when source is a Section is either a no-op or an error message.

**`jj | Jump: by time` — no modal documented**

The key binding exists but there's no entry in the Modals section describing
what happens. Presumably a simple one-field time input modal. Worth adding a
brief entry.

**Speed: decimal vs. percentage inconsistency**

Key bindings adjust speed by `.05` (decimal). The controls spec says `clamp:
25 - 200, increments of 5` (percentage). They're the same increment (5% =
0.05) but the display format is unresolved. Pick one and use it throughout —
percentage (25–200%) is probably more user-friendly in the text box.

**`jh | Jump: within jump-history via picker` — intentional?**

You said the jumps-picker was dropped, but `jh` still references a picker. Is
`jh` a retained picker specifically for jump history, or is this a leftover
that should be removed now that `jb`/`jf` handle history navigation?

**`Loops-picker` appears twice in Modals**

Once under "Jump pickers" and once as its own entry. The standalone entry can
be removed.

**"Select section to loop" appears in both Section and Loop dropdowns**

Is this intentional duplication, or should it live in only one place? Section
dropdown seems like the natural home.

Nothing here is a bad idea — these are mostly incomplete descriptions and a
few edge cases that need decisions before implementation.

## TODO

V2 planning:
    - Check for consistency and coherence: x Key bindings. x UI
      controls/menus.
        - Modals/modes.
            - make edits based on CC reply above
    - before advancing to implementation
        - to facilitate our (ie, your) implementation work going
          forward, should the plan be altered, reorganized, or
          copied-and-condensed to a different file?
        - what about unit and automated testing?

V2 implementation:
    - advance to #2

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

