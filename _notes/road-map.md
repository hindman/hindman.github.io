
Our problem is that some of other entity conventions are more complex as it
relates to looping. Let's review the other entity operations. In these
notes "current" always means "current based on playhead position", which
is the meaning of current for other entities.

- Create.
  - We have it, but currently call it "Save new".
  - We could fix this situation and increase parallelism by using "Create".
  - But the binding, based on prior conventions, would be `ll`, which is
    already claimed (see below).

- Edit: there are two flavors:
  - Edit-current: we lack this and it's a real problem.
  - Edit-scratch-loop mode.

- Loop: again two flavors:
  - Loop-current: we lack this; the binding, based on prior conventions, would
    be `ll` (but see next).
  - Loop-scratch: we have; uses `ll`.

- Jump:
  - We have: no problem.

- Zoom:
  - zoom-scratch: we have.
  - zoom-current: we lack.

- Delete:
  - We have: no problem.

A lot of the confusion stems from comingling saved loops and the scratch loop.
If we rigorously separate them (maybe even on two menus?) the thinking clarifies.
The extra clarity helps. I still don't have a great idea for a good key
binding scheme (a lot of competition for the the coveted `ll`).

  Loop:
    Create
    Edit
    Loop
    Jump
    Delete

  Scratch:
    Toggle
    Edit mode
    Zoom
    Save to source
    Reset to source
    Unlike source

## TODO: LoopLlama v2

User docs: help text: draft

User docs: banner text: draft

Text elements: messages: info, warning, error, which-key.

Text elements: Modals: titles, labels, headings, placeholders, hovers.

Text elements: Pickers: titles

Text elements: Timeline: hovers

Text elements: Current panel

Code review and refactor.

Dev docs:
  - data-schema.md
  - dev-notes.md
  - architecture-notes.md: have CC summarize how the code is organized and how it works

Real-world usage and testing.

User docs: F5 post: draft

User docs: edit, wrap up (help, banner text, F5 post).

Launch: Make v2 the offial version.

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

## CC: Editing area

