
**Missing: go-back / seek-stack binding.** The planning doc specifies a
seek-stack go-back feature (earlier we mentioned binding it to something like
`b`). It doesn't appear anywhere in the key bindings. This was flagged as
important for instrument-in-hand use -- accidentally jumping somewhere and
needing to return quickly. Needs a binding.

**Missing: video effective start/end editing.** The data schema has per-video
`start` and `end` (for skipping filler intros/outros), but there's no UI path
to edit them. The edit-video-modal is the natural home for these.

**Missing: settings.** The seek delta choices are set via Up/Down during
navigation, but are they persistent across sessions? And is there a general
settings UI (the old schematic had one for navigation increments and layout)?
No settings modal or binding appears in the current plan.

**Jumps-picker: numbered entity ambiguity.** If the user types `2` in the
picker, does it mean "jump to 2 seconds" or "filter to unnamed entity #2"? The
parser needs a rule. Probably: bare integer with no other characters = time
jump; a query containing digits mixed with letters = filter. Worth making this
explicit in the picker spec.

**Edit-video-modal**: when the user arrives there from the URL-input (by
pressing Edit after typing a URL), the modal should pre-populate with that
URL. Implicit but worth stating.

**Video-picker**: what's displayed and filtered on per item? Presumably
name/label and title both. Worth specifying since it affects how useful the
fuzzy filter is.

**Clear-data-modal**: checkboxes for which subsets? The spec doesn't enumerate
them. At minimum: all data, current video only, sections/loops/marks only,
jumplist. Worth sketching out.

**Edit-scratch-loop-modal**: `<Space>` plays/pauses "at the relevant spot" --
worth clarifying that this means seek-to-focused-endpoint then play, so the
user hears the loop boundary in context.

**`dd` (display app data)**: this is a v1 debugging feature. Fine to keep, but
worth confirming it's intended for v2 users and not just a development tool
you'll eventually remove.


# LoopLlama v2 — UI

---

## Key bindings

Videos:

    vu | Switch to video via a URL [url-input]
    o  | Open: short synonym for `vu`.
    vv | Switch to video [video-picker]
    ve | Edit video attributes [edit-video-modal]

Playing:

    <Space>  | Play/pause current video
    -        | Speed: slower by .05
    =        | Speed: faster by .05
    <Bspace> | Reset speed to 1.0

Navigation:

    <Right> | Seek forward
    <Left>  | Seek backward
    <Down>  | Seek delta: reduce
    <Up>    | Seek delta: increase
    <Enter> | Jump: to start (of loop or video)
    j       | Jump [jumps-picker]

Looping:

    ll   | Toggle looping on/off
    [    | Set scratch-loop start to current time
    ]    | Set scratch-loop end to current time
    lo   | Open: opens/loads a saved-loop into scratch-loop [loops-picker]
    ld   | Delete: a saved-loop [loops-picker]
    ls   | Save: a new loop [save-loop-modal]
    lb   | Save-back: save scratch-loop endpoints back to source entity
    le   | Edit: scratch-loop [edit-scratch-loop-modal]

Sections:

    ss | Set: sets a new section divider at current time
    se | Edit: edit current section [edit-section-modal]
    sl | Loop: makes current section the scratch-loop source
    sd | Delete: the current section [delete section-divider to the left]
    .  | Jump: next section
    ,  | Jump: previous section

Marks:

    mm   | Set mark at current times
    me   | Edit: nearest mark (to the left) [edit-mark-modal]
    md   | Delete: nearest mark (to the left)

Undo and help:

    u | Undo: most recent edit
    U | Redo: reverses an Undo
    h | Help-modal

Data:

    de | Export: app data as JSON
    di | Import: app data from JSON
    dv | Share: video data as JSON
    dl | Share: current loop [via URL]
    dc | Clear: app data [clear-data-modal]
    dd | Display: app data as JSON [bottom of web page]

---

## Modals, pickers, and other UI elements

URL-input:
    - A basic text box input.
    - But with two sumbit buttons: Open and Edit.
    - The latter takes the user to the edit-video-modal.

Video-picker:
    - Typical picker interface.
    - Lists all known videos.

Edit-video-modal:
    - URL
    - key / label
    - title
    - Delete-video button

Jumps-picker:
    - Picker items include: sections, loops, marks, and jumplist times.
    - Supports a command-line grammar.
    - Supports some immediate-select behavior (Enter press not needed).

        <N>     | Jump to a specific time
        QUERY   | Regular picker behavior
        X QUERY | Pre-filter picker items to just type X
        X,      | Jump to previous entity of type X [immediately]
        X.      | Jump to next entity of type X [immediately]

        Where X can take these values:

            l   | Loops
            s   | Sections
            m   | Marks
            j   | Jumplist

Loops-picker:
    - Typical picker.

Save-loop-modal:
    - Simple modal to edit name, start, end.
    - Defaults to start/end of scratch-loop.

Edit-scratch-loop-modal:
    - Modal to edit start/end.
    - Key bindings:

        <Tab>          | Toggle focus between start or end
        <Left> <right> | Move start/end
        <Up> <down>    | Change the move delta
        <Space>        | Play/pause the video at the relevant spot
        <Backspace>    | Reset to start or end of video
        <Enter>        | Submit

Edit-section-modal:
    - Simple modal to edit name and start.

Edit-mark-modal:
    - Simple modal to edit name and time.
    - Also offers Delete button.

Help-modal:
    - Displays the main help text explaining the basics:
        - What LoopLlama is.
        - Getting started.
        - Basic concepts.
        - Etc.
    - To see key bindings the user can press one of these to list the relevant
      bindings (either all or for a specific topic).

        k | All
        v | Videos
        p | Playing
        n | Navigatation
        l | Loops
        s | Sections
        m | Marks
        a | Application

Clear-data-modal:
    - Modal with checkboxes to select subsets of the data to clear.

Time inputs:
    - When users input time values, v2 should support various input styles.

    mm:ss and hh:mm:ss | 5:13, 32:45, 1:13:28
    condensed forms    | 73:44 == 1:13:44
    raw seconds        | 245 == 4:05
    decimal seconds    | 99.7 or 34:43.2
    forward slash      | mm/ss and hh/mm/ss

Modal and picker exit keys:
    <Esc>   | Exit and take no action
    <Enter> | Submit or exit [varies by context]

Seek deltas:
    - Default: 5 sec.
    - Choices via <Up> and <Down>: 0.1, 1, 5, 10, 30, 60, 300, 1800.

---

## Schematic mockup of page layout and UI controls

TBD. This section is not up-to-date with the rest of the planning.

    ==============================================================================
    LoopLlama   [small-image]                                  Help|About|Settings
    ==============================================================================

      ---------------------------------------------------
      |                                                 |
      |                                                 |
      |                                                 |
      |                                                 |
      |                                                 |
      |                     YOUTUBE                     |
      |                                                 |
      |                                                 |
      |                                                 |
      |                                                 |
      |                                                 |
      |                                                 |
      |                                                 |
      ---------------------------------------------------

       _________________________________________________
       m______m______m___*_______m_______m______m_______          # Timline


        UI elements:

            url        | text
            time       | time [current]
            loop       | toggle
            start      | time [loop start]
            end        | time [loop end]
            speed      | pct
            play/pause | button
            share      | button

        Timeline info:

            Marks
            Current location
            Current loop endpoints, if any

        Modal: marks and loops

            Editing interface to manage

        Modal: favorites

            Editing interface to manage

        Modal: settings

            navigation increments
            layout: full width or compact

        Modal: navigation history

        Modal: help

