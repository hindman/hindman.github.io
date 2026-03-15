---
title: 'LoopLlama v2 — Key Bindings'
permalink: /loopllama/v2/keybindings/
layout: single
published: false
toc: true
toc_label: 'Contents'
toc_icon: 'guitar'
---

    Videos:

        vu | Switch to YouTube video via a URL [url-input-modal]
        vo | Open video [video-picker]
        y  | Synonym for `vo`.
        vv | Synonym for `vo`.
        ve | Edit current video [edit-video-modal]
        vd | Delete video [via picker]
        vi | Video info [video-info-modal]
        vl | Loop: makes current video the scratch-loop source

    Playing:

        <Space>  | Play/pause current video
        -        | Speed: slower by 5 pct poins
        =        | Speed: faster by 5 pct poins
        <Bspace> | Reset speed to 100%

    Navigation:

        <Right> | Seek forward
        <Left>  | Seek backward
        <Down>  | Seek delta: reduce
        <Up>    | Seek delta: increase
        ,       | Previous entity
        /       | Activate entity-type dropdown
        .       | Next entity
        <Enter> | Jump: to start (of loop if looping, else video)
        jj      | Jump: by time [activates current-time text box]
        jc      | Jump: to chapter via picker
        js      | Jump: to section via picker
        jl      | Jump: to loop via picker
        jm      | Jump: to mark via picker
        jh      | Jump: within jump-history via jump-history-picker
        jb      | Jump: backward within jump-history
        jf      | Jump: forward within jump-history

    Looping:

        ll     | Toggle looping on/off
        lo     | Open: opens/loads a saved-loop into scratch-loop [loops-picker]
        ln     | Save-new: a new loop [save-loop-modal]
        lb     | Save-back: save scratch-loop endpoints back to source Loop
        le     | Edit: scratch-loop [edit-scratch-loop-mode]
        \      | Synonym for `le`
        lv     | Loop current video (synonym for `vl`)
        lc     | Loop current chapter (synonym for `cl`)
        ls     | Loop current section (synonym for `sl`)
        l<bsp> | Unlink loop source [severs connection to source]
        l=     | Reset loop to equal source
        ld     | Delete loop [via picker]
        lz     | Toggle timline zoom, using current loop
        --------------------------------------------------
        [[     | Loop start: set to current time
        [<bsp> | Loop start: reset to video start
        [-     | Loop start: nudge: decrease
        [=     | Loop start: nudge: increase
        [\     | Loop start: edit [activate loop-start text box]
        --------------------------------------------------
        ]]     | Loop end: set to current time
        ]<bsp> | Loop end: reset to video end
        ]-     | Loop end: nudge: decrease
        ]=     | Loop end: nudge: increase
        ]\     | Loop end: edit [activate loop-end text box]
        --------------------------------------------------
        []     | Nudge_delta: activate dropdown
        ][     | Synonym for `[]`

    Chapters:

        cc | Create new chapter [new-chapter-modal, using scratch-loop start/end]
        co | Open chapter [via picker => populate scratch-loop start/end]
        ce | Edit current chapter
        cf | Fix: toggle chapter-fixed status.
        cl | Loop: makes current chapter the scratch-loop source
        cd | Delete chapter [via picker]
        cz | Toggle timline zoom, using current chapter

    Sections:

        ss | Set: sets a new section divider at current time
        se | Edit: edit current section [edit-section-modal]
        sl | Loop: makes current section the scratch-loop source
        sf | Fix: toggle section-fixed status.
        so | Open section [via picker => populate scratch-loop]
        sd | Delete section [via picker]
        sz | Toggle timline zoom, using current section

    Marks:

        mm   | Set mark at current time
        me   | Edit mark [via picker]
        md   | Delete mark [via picker]

    Timeline:

        tt | Toggle timline to show sections or chapters

    Undo and help:

        u  | Undo: most recent edit
        U  | Redo: reverses an Undo
        hh | Help: general
        hk | Help: key bindings
        ?  | Synonym for `hk`      [should this point to general help instead?]
        o  | Options-modal

    Data:

        dd | Delete: delete-data-modal
        de | Export: app data as JSON
        di | Import: app data from JSON
        dI | Inspect: app data as JSON [bottom of web page]
        dv | Share: video [via share-URL]
        dl | Share: scratch-loop [via share-URL]
        dr | Read: app data from cloud
        ds | Save: app data to cloud

    Edit-scratch-loop-mode:

        <Tab>          | Toggle focus between start or end
        <Left> <right> | Move start/end
        <Up> <down>    | Change the move delta
        <Space>        | Play/pause the video at the relevant spot
        <Backspace>    | Reset: start to video-start or end to video-end
        <Enter>        | Submit

