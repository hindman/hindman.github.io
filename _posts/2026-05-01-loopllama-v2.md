---
title: "LoopLlama v2"
tags:
  - loopllama
  - guitar
  - software
published: false
---

<!--

## What v1 was
## What v2 is
## Building it with an LLM
### The LLM wrote code, not design
### Experience matters on your side
### Bugs survive refactoring
### The process was iterative, not generative
### Separating UI text from code
### The context window is the real constraint
## Links

-->


## What v1 was

LoopLlama v1 was a single vanilla JavaScript file — no build step, no UI
framework. User input came through the browser's built-in `prompt()` dialogs:
functional, but crude. The core operations were simple: load a YouTube video,
loop a range of it, adjust playback speed. It was a working prototype that
proved the concept, not a finished tool.


## What v2 is

v2 is a complete rewrite. No code carried forward from v1. The stack is
modern: Lit web components, Shoelace UI primitives, Vite as the build tool.
More importantly, the feature set expanded dramatically.

The app organizes information around five entity types that you can attach to
any video:

- Sections and chapters annotate structure — dividing a video into named,
  non-overlapping parts. The design intent is that chapters are larger
  (songs in a concert) and sections are smaller (parts of a song), but
  you can use them however you like.
- Marks are simple time points — the lightest-weight way to note a moment.
- Saved loops are named, reusable ranges that can overlap each other.
- The scratch loop is the live working area: the bounds you're actively
  experimenting with.

Other features worth naming:

- A clickable, hoverable visual timeline that shows all entities at once.
- Zooming: constrains both the timeline view and the playhead to a range
  (video, section, chapter, loop, or scratch loop).
- Keyboard-first design with Vim-style two-character bindings for every
  operation, alongside full mouse support.
- Data management: export/import as JSON, share a video or scratch loop
  via URL.
- Optional cloud backup via Google or GitHub sign-in.
- Undo/redo, jump history, and per-video settings.

The help documentation covers all of this in detail. The summary here is
just to give a sense of the distance traveled from v1.


## Building it with an LLM

[This section may or may not belong in the post. Notes below.]

The privacy policy for LoopLlama states the situation plainly: I wrote the
v1 code; the v2 code was written entirely by Claude Code. That is an unusual
thing to put in a privacy policy, but it is accurate, and I think it is worth
being honest about.

What follows are some observations from the experience — not a
how-to, but a practitioner's notes on what the collaboration actually
looked like.


### The LLM wrote code, not design

The architecture, the entity model, the keyboard scheme, the data model, the
UX vision — all of that came from me. The LLM implemented a spec; it did not
generate one. That distinction is important and often gets blurred in
discussions of AI-assisted development. The tool is a capable implementer.
It is not, in my experience, a capable designer.


### Experience matters on your side

A less seasoned developer might accept whatever the LLM produces. Having
spent 20+ years writing software professionally, I could push back on
complexity, recognize wrong approaches before they were built, specify
constraints precisely, and catch errors during review. The quality of the
output tracks the quality of the human's direction. That is probably not
surprising, but it is easy to miss in the hype around these tools.


### Bugs survive refactoring

During a testing pass late in the project, I caught a bug where a function
was replacing local data with itself — the wrong variable — instead of
substituting the incoming cloud version. The bug had survived multiple
rounds of refactoring. LLMs introduce subtle logic errors during complex
multi-file changes, and those errors don't announce themselves. Manual
testing caught it; automated tests would not have, because the tests did
not cover runtime behavior in a browser.


### The process was iterative, not generative

This was not a "write a prompt and ship the result" project. It involved
phases, stages, multiple refactoring rounds, testing passes, and schema
migrations. The development arc looked more like traditional software
development than anything novel about AI. What changed was the speed of
implementation, not the nature of the process. Maintaining continuity
across sessions required real effort: project notes, architecture
documentation, a canonical reference for UI text, and a memory system
baked into the tooling.


### Separating UI text from code

One deliberate practice that paid off: keeping a canonical document that
listed every user-facing message, menu item, modal label, and tooltip in the
app, separate from the code. That made it possible to review the UX copy as
a coherent whole — checking for consistency, tone, and completeness — rather
than hunting for strings scattered across dozens of source files. It also
gave the LLM a reliable reference when generating or revising messages.


### The context window is the real constraint

The practical limit on this kind of collaboration is not what the LLM can
do in a single exchange — it is what it can hold in memory across a long
project. Context windows are large but not infinite. Long sessions degrade.
State needs to be externalized in documents the LLM can read back. Managing
that was a real engineering problem, and solving it was as much the user's
responsibility as the tool's.


## Links

- [LoopLlama v2](/loopllama/v2/)
- [Help documentation](/loopllama/v2/help/)
- [Key bindings reference](/loopllama/v2/keybindings/)
