
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
        Clear history   | a⌫
        --------------------------------
        Recall message  | am
        Copy time       | ac
        Toggle timeline | at  t
        Zoom off        | az  z
        --------------------------------
        Options         | ao  o

    Help:
        Help           | hh
        Key bindings   | hk
        Load examples  | he
        --------------------------------
        The Fifth Fret |
        Code           |
        Issues         |

    Account [NOT SIGNED IN]:
        [email]
        --------------------------------
        Sign out
        Sign out and remove cloud data
        --------------------------------
        Why sign in?
        Privacy policy

    Account [SIGNED IN]:
        Sign in with Google
        Sign in with GitHub
        --------------------------------
        Why sign in?
        Privacy policy

## Pickers

    video-open     | Open video
    video-delete   | Delete video
    video-unstash  | Unstash video
    chapter-jump   | Jump to chapter
    chapter-delete | Delete chapter
    section-jump   | Jump to section
    section-delete | Delete section
    loop-jump      | Jump to loop
    loop-delete    | Delete loop
    mark-jump      | Jump to mark
    mark-delete    | Delete mark
    jump-history   | Jump history

## Modals

    video-load-url        | Load Video
    video-edit            | Edit Video
    video-info            | Video Info
    chapter-edit          | Edit Chapter
    section-edit          | Edit Section
    loop-edit             | Edit Loop
    mark-edit             | Edit Mark
    data-inspect          | Inspect data
    data-compare          | Compare data: local and cloud
    data-delete-bulk      | Delete data
    app-options           | Options
    shared-video-conflict | Review conflict: shared video
    data-op (di)          | Review conflict: import data
    data-op (dr)          | Review conflict: cloud read
    data-op (ds)          | Review conflict: cloud save

## Current panel

Elements:
  - Name
  - Video ID
  - Duration
  - Timeline display
  - Chapter
  - Section
  - Scratch loop source
  - Zoom [if active]

## Timeline: hovers

Elements:
  - Playback.
  - Chapters.
  - Sections.
  - Marks.
  - Loops.

## Which-key

Elements:
  - Scratch-edit mode.
  - Count prefix.
  - Binding prefixes:

        v | Video
        c | Chapter
        s | Section
        l | Loop
        x | Scratch
        m | Mark
        d | Data
        a | App
        h | Help
        j | Jump
        ` | Open menu
        [ | Loop start
        ] | Loop end

## Messages

Policy:

    - Messages should:
      - End with periods.
      - Be consistent across similar operations.
      - Be restructured to avoid the need for pluralization logic.

    - Always keep messages for:
      - Failures/errors.
      - Blocked actions.
      - Mode changes.
      - For operations with uncertain or non-obvious completion (cloud,
        import/export, sharing), err toward keeping confirmation messages even
        when the outcome has visual indicators.

    - But without those features, drop messages that:
      - Are pure narration without additional info (eg which entity).
      - Or that have their own obvious and complete visual consequences.

    - Message structures:
      - Use the approach below, when feasible.
      - For warning/error, avoid structures that scan like "ENTITY: VERB".

          Type    | Structure           | Example
          -----------------------------------------------------------------
          Info    | "ENTITY: VERB"      | Chapter: created.
          Warning | "BRIEF_PROBLEM"     | No chapters.
          Warning | "PROBLEM[: REASON]" | Cannot fix chapter end: video duration is unknown.

Abbreviations:

    Context:

        ST       | STARTUP
        ST-SL    | STARTUP shared loop
        ST-SV    | STARTUP shared video
        ST-SC    | STARTUP shared content
        CB       | Clipboard

    Message types:

        I     | Info
        W     | Warning
        E     | Error

    Other:

        - EXPLICIT_JUMP: fires when looping=true and user requests an explicit
          jump outside the loop.

        - NO_VIDEO: message when there is no current video and user uses one
          of the app's main controls that required a video (play, seek,
          jump/navigate, scratch bounds).

        - BAD_TIME: message when user enters an invalid time in a main control
          (current time, scratch loop bounds).

```
Context            | Type | Message
------------------------------------------------------------------
ST-SL              | I    | Shared loop: loaded.
ST: old v2 share   | I    | Shared loop: loaded.
ST-SV              | I    | Shared video: loaded.
ST-SC: error       | E    | Could not load share URL[: {error_message}].
ST-SL: bad URL     | E    | Invalid URL: shared loop.
ST-SV: bad URL     | E    | Invalid URL: shared video.
SIGN-IN            | I    | Signed in.
SIGN-OUT           | I    | Signed out.
CLOUD: deleted     | I    | Cloud data: deleted.
CLOUD: deleted     | E    | Cannot delete cloud data: {err_message}.
APP: focus lost    | W    | Key bindings inactive.
NO_VIDEO           | W    | No current video.
EXPLICIT_JUMP      | I    | Looping off.
BAD_TIME           | W    | Invalid time.
------------------------------------------------------------------
vl                 | I    | Video: loaded.
vl                 | W    | Invalid YouTube URL or ID.
vl                 | E    | YouTube failed to load video.
vo                 | I    | Video: opened.
vo: no videos      | W    | No videos.
ve                 | I    | Video: edited.
ve                 | W    | No current video.
vx                 | I    | Video: scratched.
vx: no duration    | E    | Cannot scratch video: video duration unknown.
vz: was off        | I    | Video: zoomed.
vz: was on         | I    | Zoom: off.
vz: no video       | W    | No current video.
vz: full video     | W    | Cannot zoom a range spanning entire video.
vd                 | I    | Video: deleted.
vd: no videos      | W    | No videos.
vu                 | I    | Video: unstashed.
vu: no stashes     | W    | No stashed videos.
------------------------------------------------------------------
cc                 | I    | Chapter: created.
cc: fixed chap     | W    | Cannot create chapter: inside a fixed chapter.
ss                 | W    | Cannot create section: too close to an existing one.
ce                 | I    | Chapter: edited.
ce: no chapter     | W    | No current chapter.
cx                 | I    | Chapter: scratched.
cx                 | W    | No current chapter.
cj: no chapters    | W    | No chapters.
cz: was off        | I    | Chapter: zoomed.
cz: was on         | I    | Zoom: off.
cz: no chapter     | W    | No current chapter.
cf                 | I    | Chapter: end {fixed/unfixed}.
cf: no chapter     | W    | No current chapter.
cf: no duration    | E    | Cannot fix chapter end: video duration unknown.
cd                 | I    | Chapter: deleted.
cd: no chapters    | W    | No chapters.
------------------------------------------------------------------
ss                 | I    | Section: created.
ss                 | W    | Cannot create section: inside a fixed section.
ss                 | W    | Cannot create section: too close to an existing one.
se                 | I    | Section: edited.
se: no section     | W    | No current section.
sx                 | I    | Section: scratched.
sx: no section     | W    | No current section.
sj: no sections    | W    | No sections.
sz: was off        | I    | Section: zoomed.
sz: was on         | I    | Zoom: off.
sz: no section     | W    | No current section.
sf                 | I    | Section: end {fixed/unfixed}.
sf: no section     | W    | No current section.
sf: no duration    | E    | Cannot fix section end: video duration unknown.
sd                 | I    | Section: deleted.
sd: no sections    | W    | No sections.
------------------------------------------------------------------
ll                 | I    | Loop: created.
ll: bad range      | W    | Cannot create loop: invalid range.
le                 | I    | Loop: edited.
le                 | W    | No current loop.
lx                 | I    | Loop: scratched.
lx                 | W    | No current loop.
lj: no loops       | W    | No loops.
lz: was off        | I    | Loop: zoomed.
lz: was on         | I    | Zoom: off.
lz: no loop        | W    | No current loop.
lz: full video     | W    | Cannot zoom a range spanning entire video.
ld                 | I    | Loop: deleted.
ld: no loops       | W    | No loops.
------------------------------------------------------------------
xx                 | I    | Scratch loop: {on/off}.
xx                 | W    | Cannot activate scratch loop: invalid range.
xx: no video       | W    | No current video.
xz: was off        | I    | Scratch loop: zoomed.
xz: was on         | I    | Zoom: off.
xz: bad loop       | W    | Cannot zoom scratch loop: invalid range.
xz: full video     | W    | Cannot zoom a range spanning entire video.
xs                 | I    | Scratch loop: saved back to source.
xs: no source      | W    | Cannot save: no scratch loop source.
xs: bad range      | W    | Cannot save: invalid scratch loop range.
xs: source gone    | W    | Cannot save: scratch loop source not found.
xs: too small      | W    | Cannot save: invalid scratch loop range.
xs: neighbor elim  | W    | Cannot save: would eliminate a neighboring source.
xr                 | I    | Scratch loop: reset to source.
xr: no source      | W    | Cannot reset: no scratch loop source.
xu                 | I    | Scratch loop: source unlinked.
xu: no source      | W    | Cannot unlink: no scratch loop source.
------------------------------------------------------------
mm                 | I    | Mark: created.
mm: dup time       | W    | Cannot create mark: mark exists at current time.
me                 | I    | Mark: edited.
me: no mark        | W    | No current mark.
mj                 | W    | No marks.
md                 | I    | Mark: deleted.
md                 | W    | No marks.
------------------------------------------------------------------
dv                 | I    | Shared video: URL copied to clipboard.
dv: no video       | W    | No current video.
dv: CB blocked     | E    | Cannot provide shared video URL: clipboard blocked.
dv: error          | E    | Cannot provide shared video URL: {err_message}.
dx                 | I    | Shared scratch loop: URL copied to clipboard.
dx: no video       | W    | No current video.
dx: bad range      | W    | Cannot provide shared scratch loop URL: invalid range.
dx: CB blocked     | E    | Cannot provide shared scratch loop URL: clipboard blocked.
dx: error          | E    | Cannot provide shared scratch loop URL: {err_message}.
de                 | I    | Data: exported.
di                 | I    | Data: imported.
di: parse error    | E    | Cannot import data: {err_message}.
ds                 | I    | Data: saved to cloud.
ds: not signed in  | W    | Cannot save data to cloud: you must be signed in.
ds: cloud error    | E    | Cannot save data to cloud: cloud request failed.
dr                 | I    | Data: read from cloud.
dr: not signed in  | W    | Cannot read data from cloud: you must be signed in.
dr: no cloud data  | W    | Cannot read data from cloud: no cloud data found.
dr: cloud error    | E    | Cannot read data from cloud: cloud request failed.
dc: not signed in  | W    | Cannot compare local and cloud data: you must be signed in.
dc: cloud error    | E    | Cannot compare local and cloud data: cloud request failed.
d⌫:                | I    | Data: deleted.
------------------------------------------------------------------
jh                 | W    | No jump history.
jb: no history     | W    | Cannot jump: no jump history.
jb: at oldest      | W    | Cannot jump: at oldest position.
jf: no history     | W    | Cannot jump: no jump history.
jf: at newest      | W    | Cannot jump: at newest position.
au                 | I    | Undone › {prior_edit_msg}.
au: N edits        | I    | Undone: {N} edits.
au: nothing        | W    | Cannot undo: no edit history.
ar                 | I    | Redone › {prior_edit_msg}.
ar: N edits        | I    | Redone: {N} edits.
ar: nothing        | W    | Cannot redo: no edit history.
a⌫                 | I    | Edit history: cleared.
am: no prior       | W    | No recent message.
ac                 | I    | Time copied: {time}.
ac: CB blocked     | W    | Cannot copy current time: clipboard blocked.
at                 | I    | Timeline displaying: {sections/chapters}.
az                 | I    | Zoom: off.
az: no zoom        | W    | No current zoom.
ao                 | I    | Options: saved.
ae                 | I    | Examples: loaded.
```

