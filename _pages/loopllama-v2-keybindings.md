---
title: 'LoopLlama v2 — Key Bindings'
permalink: /loopllama/v2/keybindings/
layout: single
published: false
toc: true
toc_label: 'Contents'
toc_icon: 'guitar'
---

More tolerant navigation when looping=true.
  - Enforce loop bounds.
    - Playing the video
    - Seek
  - Toggle looping off (only if needed) to allow the navigation:
    - Navigate to previous/next entity
    - Jump by time (via `jj` or timeline click)
    - Jump to entity (via picker)

Drop Open for chapters, sections, loops:
  - Not helpful:
    - It's a halfway step to looping the entity.
    - User can jump-to then loop-current.
  - Drop menu items and bindings and code.

Summary of operations common to multiple entity types:

    Action    | Video | Chapter | Section | Loop | Mark
    ----------------------------------------------------
    Create    | .     | Y       | Y       | .    | Y
    Edit      | Y     | Y       | Y       | Y    | Y
    Loop      | Y     | Y       | Y       | .    | .
    Zoom      | .     | Y       | Y       | Y    | .
    Fix-end   | .     | Y       | Y       | .    | .
    Delete... | Y     | Y       | Y       | Y    | Y

New menus:

    Video:
        Load URL
        Open...
        Edit
        Loop
        Delete...
        Info

    Chapter:
        Create
        Edit
        Loop
        Zoom
        Fix end
        Delete...

    Section:
        Create
        Edit
        Loop
        Zoom
        Fix end
        Delete...

    Loop:
        Edit
        Zoom
        Delete...
        ----------------
        Save new
        Save to source
        Reset to source
        Unlink source

    Mark:
        Create
        Edit
        Delete...

    Jump:
        Chapter...
        Section...
        Loop...
        Mark...
        ----------------
        History...
        Back
        Forward

    Data:
        Share video
        Share loop
        ----------------
        Export
        Import
        Inspect
        ----------------
        Save to cloud
        Read from cloud
        Compare
        ----------------
        Delete...

    App:
        Undo
        Redo
        ----------------
        Toggle timeline
        Recall message
        ----------------
        Options
        ----------------
        Help
        Key bindings

Key bindings:

    Video:

        vu | Load URL
        vo | Open...
        ve | Edit
        vl | Loop
        vd | Delete...
        vi | Info
        ------------
        y  | vu synonym
        vv | vo synonym

    Chapter:

        cc | Create
        ce | Edit
        cl | Loop
        cz | Zoom
        cf | Fix end
        cd | Delete...

    Section:

        ss | Create
        se | Edit
        sl | Loop
        sz | Zoom
        sf | Fix end
        sd | Delete...

    Loop:

        ll     | Toggle
        le     | Edit
        lz     | Zoom
        ld     | Delete...
        -------------------
        ln     | Save new
        lb     | Save to source
        l=     | Reset to source
        l<bsp> | Unlink source
        -------------------
        \      | le synonym

    Loop bounds:

        [[     | Start: set now
        [<bsp> | Start: reset to video start
        [-     | Start: nudge: decrease
        [=     | Start: nudge: increase
        [\     | Start: edit
        --------------
        ]]     | End: set now
        ]<bsp> | End: reset to video end
        ]-     | End: nudge: decrease
        ]=     | End: nudge: increase
        ]\     | End: edit
        -------------------
        []     | Nudge_delta: activate dropdown
        ][     | [] synonym

    Mark:

        mm | Create
        me | Edit
        md | Delete...

    Jump:

        jj      | By time
        <Enter> | To start
        -------------------
        jc      | Chapter...
        js      | Section...
        jl      | Loop...
        jm      | Mark...
        -------------------
        jh      | History...
        jb      | Backward
        jf      | Forward

    Data:

        dv | Share video
        dl | Share loop
        -------------------
        de | Export
        di | Import
        dI | Inspect
        -------------------
        ds | Save to cloud
        dr | Read from cloud
        dc | Compare
        -------------------
        dd | Delete...

    App:

        u  | Undo
        U  | Redo
        -------------------
        tt | Toggle timeline
        dm | Recall message
        -------------------
        o  | Options
        -------------------
        hh | Help
        hk | Key bindings
        ?  | hk synonym

    Playback:

        <Space>  | Play/pause
        -        | Speed: slower
        =        | Speed: faster
        <Bspace> | Speed: reset to 100%

    Navigation:

        <Right> | Seek forward
        <Left>  | Seek backward
        <Down>  | Seek delta: reduce
        <Up>    | Seek delta: increase
        -------------------
        ,       | Previous entity
        /       | Entity-type dropdown
        .       | Next entity

    Edit-loop mode:

        <Tab>       | Toggle focus: start/end
        -------------------
        <Right>     | Increase: start/end
        <Left>      | Decrease: start/end
        -------------------
        <Up>        | Increase: nudge-delta
        <Down>      | Decrease: nudge-delta
        -------------------
        <Space>     | Play/pause near start/end
        <Backspace> | Reset: start/end
        -------------------
        <Enter>     | Exit mode
        <Esc>       | Exit mode

    Menu activation:

        `v | Video
        `c | Chapter
        `s | Section
        `l | Loop
        `m | Mark
        `j | Jump
        `d | Data
        `a | App

