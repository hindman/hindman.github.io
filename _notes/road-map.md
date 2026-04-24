
Honest assessment of the main cost drivers:

  1. llama-app.js is the biggest problem.
  At 36K+ tokens, it can't even be read in one shot. Every session that touches it burns
  tokens on multiple Grep/Read calls just to navigate it. R2-4 touched it in ~8 places. This
  file alone is likely responsible for a large fraction of your session costs. The
  architectural fix is splitting it — moving handler groups, module-level helpers, and render
   logic into separate files. That's essentially R2-3 territory but the payoff would extend
  well beyond that refactor.

  2. Cross-cutting changes are inherently expensive.
  R2-4 touched 9 files. There's not much you can do about that organizationally — the schema
  change was genuinely cross-cutting. But sessions that are bounded to 2–3 files will cost a
  lot less.

  3. The compressed summary grows with session scope.
  The context that gets carried forward into the next session is proportional to what was
  done. A session that edits 9 files produces a large summary. Tighter sessions produce
  smaller ones.

  What's actionable:

  - Consider splitting llama-app.js as a standalone task before continuing other refactoring.
   It would pay for itself within 1–2 sessions.
  - For sessions like R2-5 (moving categorizeVideos) and R2-3 (handler unification), keep
  them file-count-bounded and don't bundle extras.
  - The MEMORY.md content is about as lean as it can be — that's not a significant factor.

  The global CLAUDE.md (your full user profile) is also loaded every session, but that's
  fixed overhead you likely want there. The real variable cost is llama-app.js.

❯ In our current plan for the rest of Round 2 we just have 3 more sessions to go: R2-5;
  R2-3; then R2-6. You are essentially suggesting a new refactoring tasks: splitting up
  llama-app.js. Should that split be done before or after the rest of Round 2?

Current session: 2.

Let me know if anything is unclear, needs further discussion, or
should be subdivided into smaller stages of work. If not, please
implement.

## Assessment: Round 2

## TODO: LoopLlama v2

Code refactor:
  x refactoring-assessment.md
  x round 1
  - round 2
  - app: basic tests: all operations

User docs: final read:
    - MH
    - CC review

Dev docs: final edits:
  - dev-notes.md
  - architecture-notes.md

Launch:
  - User docs: F5 post: draft
  - Make v2 the offial version.

## TODO: The Fifth Fret

Posts:
  - RH rudiments #2: Giuliani
  - Practicing right-hand rudiments: muting
  - Blues turnarounds: a systematic approach
  - Add-a-beat. https://chatgpt.com/c/69056e95-7910-8326-bee6-dae0c53cc18b
  - Triads: lots to say.
  - 76 reasons why the filibuster is a bad idea
  - MTG and Linda Litzke: https://chatgpt.com/c/691bca59-15ac-832b-b9de-8d1f38ddd596
  - Skepticism of the science of music practice: https://chatgpt.com/c/692dd380-d5d0-832c-ad74-a768b049c47b
  - Tommy Emmanuel vs Music Practice Inc [see writing-notes]

