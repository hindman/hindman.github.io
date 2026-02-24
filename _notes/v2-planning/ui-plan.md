
# LoopLlama v2 — UI

---

## Key bindings

Videos:

    vu | Switch to video via a URL [url-input]
    vv | Switch to video [video-picker]
    ve | Edit video attributes [edit-video modal]

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
    ls   | Save: a new loop [save-loop modal]
    lb   | Save-back: save scratch-loop endpoints back to source entity
    le   | Edit: scratch-loop [edit-scratch-loop modal]

Sections:

    ss | Set: sets a new section divider at current time [edit-section modal]
    se | Edit: edit current section [edit-section modal]
    sl | Loop: makes current section the scratch-loop source
    sd | Delete: the current section [delete section-divider to the left]
    .  | Jump: next section
    ,  | Jump: previous section

Marks:

    mm   | Set mark at current times [edit-mark modal]
    me   | Edit: nearest mark [edit-mark modal]
    md   | Delete: nearest mark

Undo and help:

    u | Undo: most recent edit
    U | Redo: reverses an Undo
    h | Help modal

Data:

    de | Export: app data as JSON
    di | Import: app data from JSON
    dv | Share: video data as JSON
    dl | Share: current loop [via URL]
    dc | Clear: app data [clear-data modal]
    dd | Display: app data as JSON [bottom of web page]

---

## Modals, pickers, and other UI elements

URL-input:
    - A basic text box input.
    - But with two sumbit buttons: Open and Edit.
    - The latter takes the user to the edit-video modal.

Video-picker:
    - Typical picker interface.
    - Lists all known videos.

Edit-video modal:
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

Save-loop modal:
    - Simple modal to edit name, start, end.
    - Defaults to start/end of scratch-loop.

Edit-scratch-loop modal:
    - Modal to edit start/end.
    - Key bindings:
        - Space: toggle focus between start or end.
        - Arrows: to change start/end, just like navigation controls
            - Left/right to move.
            - Up/down to change the delta.
        - Space: play/pause the video at the relevant spot.
        - Backspace: reset to start or end of video.
        - Enter: submit.

Edit-section modal:
    - Simple modal to edit name and start.

Edit-mark modal:
    - Simple modal to edit name and time.
    - Also offers Delete button.

Help modal:
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

Clear-data modal:
    - Modal with checkboxes to select subsets of the data to clear.

Time inputs:
    - When users input time values, v2 should support various input styles.
    - Standard mm:ss and hh:mm:ss inputs: 5:13, 32:45, 1:13:28, etc.
    - Condensed forms: eg 73:44 rather than 1:13:44.
    - Raw seconds: 245 rather than 4:05.
    - In those forms, they can used a period separator rather than a colon.
    - Second values can be floats, but with only 1 decimal digit.
    - So 33.20 is a synonym for 33:20 but 33.2 means 0:33.2.

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

