---
title: 'LoopLlama v2 — Key Bindings'
permalink: /loopllama/v2/keybindings/
layout: single
published: false
toc: true
toc_label: 'Contents'
toc_icon: 'guitar'
---

## Implementation items

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

Implement the new plan for menus and menu items.
  - Details below.
  - The plan implies various changes and deletions.

Implement the new plan for key bindings:
  - Details below.
  - The plan implies various changes, deletions, and additions.

---

## Summary of operations common to multiple entity types:

    Action    | Video | Chapter | Section | Loop | Mark
    ----------------------------------------------------
    Create    | .     | cc      | ss      | .    | mm
    Edit      | ve    | ce      | se      | le   | me
    Loop      | vl    | cl      | sl      | .    | .
    Zoom      | .     | cz      | sz      | lz   | .
    Fix-end   | .     | cf      | sf      | .    | .
    Delete... | vd    | cd      | sd      | ld   | md

---

## Menus

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

---

## Key bindings

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

        ll | Toggle
        le | Edit
        lz | Zoom
        ld | Delete...
        -------------------
        ln | Save new
        lb | Save to source
        lr | Reset to source
        lu | Unlink source
        -------------------
        \  | le synonym

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
        <enter> | To start (loop or video)
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
        dD | Delete...
        -------------------
        dd | ds synonym

    App:

        au | Undo
        ar | Redo
        -------------------
        at | Toggle timeline
        am | Recall message
        -------------------
        ao | Options
        -------------------
        ah | Help
        ak | Key bindings
        -------------------
        u  | au synonym
        U  | ar synonym
        t  | at synonym
        h  | ah synonym
        k  | ak synonym

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
        -------------------
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
        -------------------
        <right> | Increase: start/end
        <left>  | Decrease: start/end
        -------------------
        <up>    | Increase: nudge-delta
        <down>  | Decrease: nudge-delta
        -------------------
        <space> | Play/pause near start/end
        <bsp>   | Reset: start/end
        -------------------
        <enter> | Exit mode
        <esc>   | Exit mode

---

## Implementation stages

Stage 1: Drop Open for sub-video entities.
  - llama-controls.js MENUS array: remove these items:
    - Chapter menu: { action: 'openChapter' }
    - Section menu: { action: 'openSection' }
    - Loop menu: { action: 'openLoop' }
  - keyboardController.js BINDINGS: remove these completions:
    - 'c': remove 'o' (openChapter)
    - 's': remove 'o' (openSection)
    - 'l': remove 'o' (openLoop)
    - 'l': also remove 'v' (loopVideo synonym), 's' (loopSection synonym),
      'c' (loopChapter synonym) -- no longer needed per NOUN->VERB principle
  - llama-app.js: remove handlers: openChapter, openSection, openLoop.
    Search for those handler names to find dispatch cases.

Stage 2: Update menus (coordinate with stage 3 -- land together).
  - llama-controls.js MENUS array -- full rewrite of all entries:
    - Add Chapter as a new top-level menu (currently Chapter items live
      inside the Video menu after a divider; extract them).
    - Video menu: rename and reorder to:
        Load URL (vu · y), Open... (vo · vv), Edit (ve), Loop (vl),
        Delete... (vd), Info (vi)
    - Chapter menu: Create (cc), Edit (ce), Loop (cl), Zoom (cz),
        Fix end (cf), Delete... (cd)
    - Section menu: Create (ss), Edit (se), Loop (sl), Zoom (sz),
        Fix end (sf), Delete... (sd)
    - Loop menu: Edit (le · \), Zoom (lz), Delete... (ld), [divider],
        Save new (ln), Save to source (lb), Reset to source (lr),
        Unlink source (lu)
    - Mark menu: Create (mm), Edit (me), Delete... (md)
    - Jump menu: Chapter... (jc), Section... (js), Loop... (jl),
        Mark... (jm), [divider], History... (jh), Back (jb), Forward (jf)
    - Data menu: Share video (dv), Share loop (dl), [divider],
        Export (de), Import (di), Inspect (dI), [divider],
        Save to cloud (dd · ds), Read from cloud (dr), Compare (dc),
        [divider], Delete... (dD)
    - App menu: Undo (au · u), Redo (ar · U), [divider],
        Toggle timeline (at · t), Recall message (am), [divider],
        Options (ao · o), [divider], Help (ah · h), Key bindings (ak · k)
    - Drop Help as a top-level menu entirely.
    - Hint string format: use mid-dot (·) between official binding and
      synonym, not slash. No hint for items with no binding or synonym.
  - Open video -- currently two pickers: videoPickerRecent (vv) and
    videoPickerAlpha (vo). New plan has one Open... item. Decide before
    coding: consolidate to one picker, or keep both under one menu item?

Stage 3: Rework key bindings (coordinate with stage 2 -- land together).
  - keyboardController.js BINDINGS:
    - Remove single-key entries: 'u' (undo), 'U' (redo), '?' (helpKeys),
      'o' (options).
    - Remove prefix groups: 't' (was tt/toggleZone2), 'h' (was hh/hk).
    - Add prefix group 'a': au (undo), ar (redo), at (toggleZone2),
      am (msgRecall), ao (options), ah (helpGeneral), ak (helpKeys).
    - Add single-key synonyms: u→undo, U→redo, t→toggleZone2,
      h→helpGeneral, k→helpKeys, o→options.
    - 'l' completions: rename '=' → 'r' (resetLoopToSource),
      rename 'Backspace' → 'u' (unlinkLoopSource).
    - 'd' completions: change 'd' from deleteData → dataSave,
      add 'D' → deleteData.
    - 'v' completions: reconcile vv/vo after Open video decision above.

Stage 4: Menu activation bindings (backtick+letter).
  - New functionality: `v, `c, `s, `l, `m, `j, `d, `a open the
    corresponding menu dropdown via keyboard.
  - keyboardController.js: add backtick (`` ` ``) as a new prefix group
    with completions v, c, s, l, m, j, d, a. Each fires a new handler
    (e.g. openMenuVideo, openMenuChapter, ...) or a single handler
    receiving the menu name.
  - llama-controls.js: expose a method to programmatically open a named
    menu dropdown. Check whether llama-dropdown already supports this;
    if not, add an `open()` method.
  - llama-app.js: wire the new handler(s) to call that method on
    llama-controls.

Stage 5: Tolerant navigation.
  - llama-app.js: add a helper _clearLoopingIfActive() that:
      if (this._appState.looping) {
        this._appState = { ...this._appState, looping: false };
        this._save();
        this._showMsg('Looping off.');
      }
  - Call it at the top of these handlers (before their existing logic):
      prevEntity, nextEntity, jumpTime, jumpChapter, jumpSection,
      jumpLoop, jumpMark, jumpHistory.
  - Do NOT call it in: seekForward, seekBack (still enforce bounds).
  - Also propagate looping=false to the video controller so playback
    actually stops enforcing bounds immediately.

Stage 6: Toggle timeline footer messages.
  - llama-app.js toggleZone2 handler: after toggling zone2 state,
    call this._showMsg() with:
      "Timeline displaying: sections" or "Timeline displaying: chapters"
    based on the new state value.

