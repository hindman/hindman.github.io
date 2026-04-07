---
title: 'LoopLlama v2 — Key Bindings'
permalink: /loopllama/v2/keybindings/
layout: single
published: true
toc: true
toc_label: 'Contents'
toc_icon: 'guitar'
---

---

## Entity actions: summary

    Action    | Video | Chapter | Section | Loop | Mark
    ----------------------------------------------------
    Create    | .     | cc      | ss      | ll   | mm
    Edit      | ve    | ce      | se      | le   | me
    Scratch   | vx    | cx      | sx      | lx   | .
    Jump...   | .     | cj      | sj      | lj   | mj
    Zoom      | vz    | cz      | sz      | lz   | .
    Fix-end   | .     | cf      | sf      | .    | .
    Delete... | vd    | cd      | sd      | ld   | md

---

## Menus

    Video:
        Load URL   | vl  y
        Open...    | vo  vv
        Edit       | ve
        Scratch    | vx
        Zoom       | vz
        Delete...  | vd
        Unstash... | vu
        Info       | vi

    Chapter:
        Create    | cc
        Edit      | ce
        Scratch   | cx
        Jump...   | cj
        Zoom      | cz
        Fix end   | cf
        Delete... | cd

    Section:
        Create    | ss
        Edit      | se
        Scratch   | sx
        Jump...   | sj
        Zoom      | sz
        Fix end   | sf
        Delete... | sd

    Loop:
        Create    | ll
        Edit      | le
        Scratch   | lx
        Jump...   | lj
        Zoom      | lz
        Delete... | ld

    Scratch:
        Toggle          | xx
        Edit mode       | xe  \
        Zoom            | xz
        --------------------------------
        Save to source  | xs
        Reset to source | xr
        Unlink source   | xu

    Mark:
        Create    | mm
        Edit      | me
        Jump...   | mj
        Delete... | md

    Data:
        Share video        | dv
        Share scratch loop | dx
        --------------------------------
        Export             | de
        Import             | di
        Inspect            | dI
        --------------------------------
        Save to cloud      | ds  dd
        Read from cloud    | dr
        Compare            | dc
        --------------------------------
        Delete...          | d⌫

    App:
        Jump history... | jh
        Back            | jb
        Forward         | jf
        --------------------------------
        Undo            | au  u
        Redo            | ar  U
        Recall message  | am
        --------------------------------
        Copy time       | ac
        Toggle timeline | at  t
        Zoom off        | az  z
        --------------------------------
        Options         | ao  o
        Help            | ah  h
        Key bindings    | ak  k

---

## Key bindings

    Video:

        vl | Load URL
        vo | Open...
        ve | Edit
        vx | Scratch
        vz | Zoom
        vd | Delete...
        vu | Unstash...
        vi | Info
        --------------------------------
        y  | vl synonym
        vv | vo synonym

    Chapter:

        cc | Create
        ce | Edit
        cx | Scratch
        cj | Jump...
        cz | Zoom
        cf | Fix end
        cd | Delete...

    Section:

        ss | Create
        se | Edit
        sx | Scratch
        sj | Jump...
        sz | Zoom
        sf | Fix end
        sd | Delete...

    Loop:
        ll | Create
        le | Edit
        lx | Scratch
        lj | Jump...
        lz | Zoom
        ld | Delete...

    Scratch loop:
        xx | Toggle
        xe | Edit mode
        xz | Zoom
        xs | Save to source
        xr | Reset to source
        xu | Unlink source
        --------------------------------
        \  | xe synonym

    Scratch loop bounds: {#nudge-bindings}

        [[ | Start: set now
        [⌫ | Start: reset to video start
        [- | Start: nudge: decrease
        [= | Start: nudge: increase
        [\ | Start: edit
        --------------------------------
        ]] | End: set now
        ]⌫ | End: reset to video end
        ]- | End: nudge: decrease
        ]= | End: nudge: increase
        ]\ | End: edit
        --------------------------------
        [] | Nudge_delta: activate dropdown
        ][ | [] synonym

    Mark:

        mm | Create
        me | Edit
        mj | Jump...
        md | Delete...

    Data:

        dv | Share video
        dx | Share scratch loop
        --------------------------------
        de | Export
        di | Import
        dI | Inspect
        --------------------------------
        ds | Save to cloud
        dr | Read from cloud
        dc | Compare
        --------------------------------
        d⌫ | Delete...
        --------------------------------
        dd | ds synonym

    Jump:

        jj      | By time
        <enter> | To start (loop or video)
        --------------------------------
        jh      | Jump history...
        jb      | Backward
        jf      | Forward

    App:

        au | Undo
        ar | Redo
        am | Recall message
        --------------------------------
        ac | Copy time
        at | Toggle timeline
        az | Zoom off
        --------------------------------
        ao | Options
        ah | Help
        ak | Key bindings
        --------------------------------
        u  | au synonym
        U  | ar synonym
        t  | at synonym
        h  | ah synonym
        k  | ak synonym
        z  | az synonym

    Playback:

        <space> | Play/pause
        -       | Speed: slower
        =       | Speed: faster
        ⌫       | Speed: reset to 100%

    Navigation:

        <right> | Seek forward
        <left>  | Seek backward
        <down>  | Seek delta: reduce
        <up>    | Seek delta: increase
        --------------------------------
        ,       | Previous entity
        /       | Entity-type dropdown
        .       | Next entity

    Menu activation:

        `v | Video
        `c | Chapter
        `s | Section
        `l | Loop
        `x | Scratch
        `m | Mark
        `d | Data
        `a | App

    Edit-loop mode:

        <tab>   | Toggle focus: start/end
        --------------------------------
        <right> | Increase: start/end
        <left>  | Decrease: start/end
        --------------------------------
        <up>    | Increase: nudge-delta
        <down>  | Decrease: nudge-delta
        --------------------------------
        <space> | Play/pause near start/end
        ⌫       | Reset: start/end
        --------------------------------
        <enter> | Exit mode
        <esc>   | Exit mode

