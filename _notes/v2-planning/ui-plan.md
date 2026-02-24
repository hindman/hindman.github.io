
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
    - The latter takes the user to the edit-video-modal with the URL
      pre-populated.

Video-picker:
    - Typical picker interface listing the known videos.
    - Displays name, title, maybe duration, maybe YouTube ID.
    - Filters on "NAME TITLE".

Edit-video-modal:
    - Basic modal to edit URL, name, title, start, end.
    - Also a delete-video button.

Jumps-picker:
    - Picker items include: sections, loops, marks, and jumplist times.
    - Supports a command-line grammar.
    - Supports some immediate-select behavior (Enter press not needed).

        T       | Jump to a specific time
        QUERY   | Regular picker behavior
        X QUERY | Pre-filter picker items to just type X
        X,      | Jump to previous entity of type X [immediately]
        X.      | Jump to next entity of type X [immediately]

        Where X can take these values:

            l   | Loops
            s   | Sections
            m   | Marks
            j   | Jumplist

        Where T is any valid time. If T parses as a time, it's a time,
        not a QUERY.

Loops-picker:
    - Typical picker.

Save-loop-modal:
    - Simple modal to edit name, start, end.
    - Defaults to start/end of scratch-loop.

Edit-scratch-loop-modal:
    - Modal to edit start/end.
    - For play/pause if focus in on start, play starts at the loop beginning;
      if on end, starts 5 sec before end.
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
    - TBD
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

## Mockup of page layout and UI controls

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

