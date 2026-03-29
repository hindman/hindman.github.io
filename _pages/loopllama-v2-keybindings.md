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
    Create    | .     | cc      | ss      | .    | mm
    Edit      | ve    | ce      | se      | le   | me
    Loop      | vl    | cl      | sl      | .    | .
    Jump...   | .     | cj      | sj      | lj   | mj
    Zoom      | vz    | cz      | sz      | lz   | .
    Fix-end   | .     | cf      | sf      | .    | .
    Delete... | vd    | cd      | sd      | ld   | md

---

## Menus

    Video:
        Load URL   | vu  y
        Open...    | vo  vv
        Edit       | ve
        Loop       | vl
        Zoom       | vz
        Delete...  | vd
        Unstash... | vr
        Info       | vi

    Chapter:
        Create    | cc
        Edit      | ce
        Loop      | cl
        Jump...   | cj
        Zoom      | cz
        Fix end   | cf
        Delete... | cd

    Section:
        Create    | ss
        Edit      | se
        Loop      | sl
        Jump...   | sj
        Zoom      | sz
        Fix end   | sf
        Delete... | sd

    Loop:
        Jump...         | lj
        Delete...       | ld
        --------------------------------
        Edit            | le  \
        Zoom            | lz
        --------------------------------
        Save new        | ln
        Save to source  | ls
        Reset to source | lr
        Unlink source   | lu

    Mark:
        Create    | mm
        Edit      | me
        Jump...   | mj
        Delete... | md

    Jump:
        History... | jh
        Back       | jb
        Forward    | jf

    Data:
        Share video     | dv
        Share loop      | dl
        --------------------------------
        Export          | de
        Import          | di
        Inspect         | dI
        --------------------------------
        Save to cloud   | ds  dd
        Read from cloud | dr
        Compare         | dc
        --------------------------------
        Delete...       | dx

    App:
        Copy time       | ac
        --------------------------------
        Undo            | au  u
        Redo            | ar  U
        --------------------------------
        Toggle timeline | at  t
        Zoom off        | az  z
        --------------------------------
        Recall message  | am
        --------------------------------
        Options         | ao  o
        --------------------------------
        Help            | ah  h
        Key bindings    | ak  k

---

## Key bindings

    Video:

        vu | Load URL
        vo | Open...
        ve | Edit
        vl | Loop
        vz | Zoom
        vd | Delete...
        vr | Restore...
        vi | Info
        --------------------------------
        y  | vu synonym
        vv | vo synonym

    Chapter:

        cc | Create
        ce | Edit
        cl | Loop
        cj | Jump...
        cz | Zoom
        cf | Fix end
        cd | Delete...

    Section:

        ss | Create
        se | Edit
        sl | Loop
        sj | Jump...
        sz | Zoom
        sf | Fix end
        sd | Delete...

    Loop:

        ll | Toggle
        le | Edit
        lj | Jump...
        lz | Zoom
        ld | Delete...
        --------------------------------
        ln | Save new
        ls | Save to source
        lr | Reset to source
        lu | Unlink source
        --------------------------------
        \  | le synonym

    Loop bounds:

        [[     | Start: set now
        [<bsp> | Start: reset to video start
        [-     | Start: nudge: decrease
        [=     | Start: nudge: increase
        [\     | Start: edit
        --------------------------------
        ]]     | End: set now
        ]<bsp> | End: reset to video end
        ]-     | End: nudge: decrease
        ]=     | End: nudge: increase
        ]\     | End: edit
        --------------------------------
        []     | Nudge_delta: activate dropdown
        ][     | [] synonym

    Mark:

        mm | Create
        me | Edit
        mj | Jump...
        md | Delete...

    Jump:

        jj      | By time
        <enter> | To start (loop or video)
        --------------------------------
        jh      | History...
        jb      | Backward
        jf      | Forward

    Data:

        dv | Share video
        dl | Share loop
        --------------------------------
        de | Export
        di | Import
        dI | Inspect
        --------------------------------
        ds | Save to cloud
        dr | Read from cloud
        dc | Compare
        --------------------------------
        dx | Delete...
        --------------------------------
        dd | ds synonym

    App:

        au | Undo
        ar | Redo
        --------------------------------
        at | Toggle timeline
        az | Zoom off
        --------------------------------
        am | Recall message
        --------------------------------
        ao | Options
        --------------------------------
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
        <bsp>   | Speed: reset to 100%

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
        `m | Mark
        `j | Jump
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
        <bsp>   | Reset: start/end
        --------------------------------
        <enter> | Exit mode
        <esc>   | Exit mode

