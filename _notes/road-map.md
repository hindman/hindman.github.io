
## TODO: LoopLlama v2

Text elements: messages:

```

Context            | Type | Message
------------------------------------------------------------------
ST                 | I    | [DROP] Initializing...
PLAYER READY       | I    | [DROP] Player ready. Enter a YouTube URL or video ID above.
ST: prior video    | I    | [DROP] Video cued: {name or id}
VIDEO ENDED        | I    | [DROP] Ended
------------------------------------------------------------------
ST-SL              | I    | Shared loop: loaded.
ST: old v2 share   | I    | Shared loop: loaded.
ST-SV              | I    | Shared video: loaded.
ST-SV, skipped     | I    | [DROP] Skipped: "{name}" already in your library.
ST-SC error        | E    | Could not load share URL[: {error_message}].
ST-SL bad URL      | E    | Invalid URL: shared loop.
ST-SV bad URL      | E    | Invalid URL: shared video.
SIGN IN            | I    | Signed in.
SIGN OUT           | I    | [NEW: feasible? should we add?] Signed out.
CLOUD DELETED      | I    | [NEW: feasible? should we add?] Cloud data: deleted.
CLOUD DELETED      | E    | [NEW: feasible? should we add?] Delete of cloud data failed.
SIGN IN (no vids)  | I    | [DROP] Signed in. No local videos — use dr to load from cloud.
WINDOW FOCUS LOST  | W    | Key bindings inactive.
------------------------------------------------------------------
vl                 | I    | Video: loaded.
vl                 | W    | Invalid YouTube URL or ID.
vl                 | E    | YouTube failed to load video.
vo                 | I    | Video: opened.
vo (no videos)     | W    | No videos.
ve                 | I    | Video: edited.
ve                 | W    | No videos.
vx                 | I    | Video: scratched.
vx (no duration)   | E    | Cannot scratch video: video duration unknown.
vz (was off)       | I    | Video: zoomed.
vz (was on)        | I    | Zoom: off.
vz (no video)      | W    | No current video.
vz (full video)    | W    | Cannot zoom a range spanning entire video.
vd                 | I    | Video: deleted.
vd (no videos)     | W    | No videos.
vu                 | I    | Video: unstashed.
vu (no stashes)    | W    | No stashed videos.
------------------------------------------------------------------
cc                 | I    | Chapter: created.
cc (fixed chapter) | W    | Cannot create chapter: inside a fixed chapter.
ce (no chapter)    | W    | No current chapter.
ce (modal confirm) | I    | Chapter: edited.
ce (modal confirm) | W    | [IN_MODAL] Edit would eliminate a neighbor chapter.
cx (no bounds)     | W    | No current chapter.
cx                 | I    | Chapter: scratched.
cj (no chapters)   | W    | No chapters.
cz (was off)       | I    | Chapter: zoomed.
cz (was on)        | I    | Zoom: off.
cz (no chapter)    | W    | No current chapter.
cf                 | I    | Chapter: end {fixed/unfixed}.
cf (no chapter)    | W    | No current chapter.
cf (no duration)   | E    | Cannot fix chapter end: video duration unknown.
cd                 | I    | Chapter: deleted.
cd (no chapters)   | W    | No chapters.
------------------------------------------------------------------
ss                 | I    | Section: created.
ss (fixed section) | W    | Cannot create section: inside a fixed section.
se (no section)    | W    | No current section.
se (modal confirm) | I    | Section: edited.
se (modal confirm) | W    | [IN_MODAL] Edit would eliminate a neighbor section.
sx                 | I    | Section: scratched.
sj (no sections)   | W    | No sections.
sx (no section)    | W    | No current section.
sz (was off)       | I    | Section: zoomed.
sz (was on)        | I    | Zoom: off.
sz (no section)    | W    | No current section.
sf (end was fixed) | I    | Section: end {fixed/unfixed}.
sf (no section)    | W    | No current section.
sf (no duration)   | E    | Cannot fix section end: video duration unknown.
sd                 | I    | Section deleted
sd (no sections)   | W    | No sections.
------------------------------------------------------------------
ll                 | I    | Loop: created.
ll (bad range)     | W    | Cannot create loop: invalid range.
le (modal confirm) | I    | Loop: edited.
le                 | W    | No current loop.
lx                 | I    | Loop: scratched.
lx                 | W    | No current loop.
lj (no loops)      | W    | No loops.
lz (was off)       | I    | Loop: zoomed.
lz (was on)        | I    | Zoom: off.
lz (no loop)       | W    | No current loop.
lz (full video)    | W    | Cannot zoom a range spanning entire video.
ld                 | I    | Loop: deleted.
ld (no loops)      | W    | No loops.
------------------------------------------------------------
mm                 | I    | Mark: created
mm (dup time)      | W    | Cannot create mark: mark exists at current time.
me (modal confirm) | I    | Mark: edited.
me (no mark)       | W    | No current mark.
mj                 | W    | No marks.
md                 | I    | Mark: deleted.
md                 | W    | No marks.
------------------------------------------------------------------
xx                 | I    | Scratch loop: {on/off}.
xx                 | W    | Cannot activate scratch loop: invalid range.
xx (no video)      | W    | No video loaded.
xz (was off)       | I    | Scratch loop: zoomed.
xz (was on)        | I    | Zoom: off.
xz (bad loop)      | W    | Cannot zoom scratch loop: invalid range.
xz (full video)    | W    | Cannot zoom a range spanning entire video.
xs                 | I    | Scratch loop: saved back to source.
xs (no source)     | W    | Cannot save back: no scratch loop source.
xs (bad range)     | W    | Cannot save back: invalid range.
xs (source gone)   | W    | Cannot save back: source not found.
xs (too small)     | W    | Cannot save back: invalid range.
xs (neighbor elim) | W    | Cannot save back: would eliminate a neighboring source.
xr                 | I    | Scratch loop: reset to source.
xr (no source)     | W    | Cannot reset to scratch loop source: no source.
xu                 | I    | Scratch loop: source unlinked.
xu (no source)     | W    | Cannot unlink scratch loop source: no source.
==================================================================       ## __HERE__
------------------------------------------------------------------
ds (not signed in) | W    | Sign in to save data to cloud.
ds (cloud error)   | E    | Cloud save failed.
ds                 | I    | Saved to cloud: {N} added, {N} updated, {N} unchanged[, {N} skipped][, {N} deleted].
dr (not signed in) | W    | Sign in to read data from cloud.
dr (cloud error)   | E    | Cloud request failed.
dr (no cloud data) | W    | No cloud data found.
dr                 | I    | Read from cloud: {N} added, {N} updated, {N} unchanged[, {N} skipped][, {N} deleted].
dc (not signed in) | W    | Sign in to compare local vs cloud data.
dc (cloud error)   | E    | Cloud request failed — compare unavailable.
de                 | I    | Exported all data.
di (parse error)   | E    | Import failed: {error message}
di                 | I    | Imported: {N} added, {N} updated, {N} unchanged[, {N} skipped][, {N} deleted].
d⌫ (delete videos) | I    | Deleted {N} video[s].
d⌫ (delete items)  | I    | Deleted {N} item[s].
dv (no video)      | W    | No video loaded.
dv (CB OK)         | I    | Video share URL copied to clipboard.
dv (CB blocked)    | I    | Video share URL ready (clipboard unavailable).
dv (error)         | E    | Share failed: {error message}
dx (no video)      | W    | No video loaded.
dx (bad range)     | W    | Set a valid scratch loop first.
dx (CB OK)         | I    | Loop share URL copied to clipboard.
dx (CB blocked)    | I    | Loop share URL ready (clipboard unavailable).
dx (error)         | E    | Share failed: {error message}
------------------------------------------------------------------
jb (no history)    | W    | No jump history.
jb (at oldest)     | W    | At oldest jump.
jf (at newest)     | W    | At current position.
jb                 | I    | Jump back: {m:ss}
jf                 | I    | Jump forward: {m:ss}
jf (to oldest)     | I    | Returned to current position.
zo (no zoom)       | W    | No zoom active.
zo                 | I    | Zoom off.
u (nothing)        | W    | Nothing to undo.
U (nothing)        | W    | Nothing to redo.
u                  | I    | Undone: {description}
U                  | I    | Redone: {description}
ac (CB OK)         | I    | Time copied: {m:ss}
ac (CB blocked)    | W    | Clipboard write failed.
am (no prior)      | W    | No recent message.
ao (confirm)       | I    | Options saved.
ae                 | I    | Example videos: {N} loaded; {N} already in library.
at                 | I    | Timeline displaying: sections | chapters.
------------------------------------------------------------------
NO_VIDEO           | W    | No current video.
EXPLICIT_JUMP      | I    | Looping off.
BAD_TIME           | W    | Invalid time.

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

    - Message structures: use when feasible:

          Info    | "ENTITY: VERB"      | Chapter: created.
          Warning | "PROBLEM-BRIEF"     | No chapters.
          Warning | "PROBLEM[: REASON]" | Cannot fix chapter end: video duration is unknown.

      - For warning/error, avoid structures that scan like "ENTITY: VERB".

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

Message:

    [DROP] | Drop the message.
    [NEW]  | New message.

Other Notes:

  - EXPLICIT_JUMP: fires when looping=true and user requests an explicit jump
    outside the loop.

  - NO_VIDEO: message when there is no current video and user uses one of the
    app's main controls that required a video (play, seek, jump/navigate,
    scratch bounds).

  - BAD_TIME: message when user enters an invalid time in a main control
    (current time, scratch loop bounds).

```

Text elements: which-key:

  - Scratch-edit mode.
  - Count prefix.
  - Prefixes:

        v | Video
        j | Jump
        l | Loop
        x | Scratch
        c | Chapter
        s | Section
        m | Mark
        d | Data
        a | App
        ` | Open menu
        [ | Loop start
        ] | Loop end

Text elements: pickers: [done]

  video-open     | Open video      | .
  video-delete   | Delete video    | .
  video-unstash  | Unstash video   | .
  chapter-jump   | Jump to chapter | .
  chapter-delete | Delete chapter  | .
  section-jump   | Jump to section | .
  section-delete | Delete section  | .
  loop-jump      | Jump to loop    | .
  loop-delete    | Delete loop     | .
  mark-jump      | Jump to mark    | .
  mark-delete    | Delete mark     | .
  jump-history   | Jump history    | .

Text elements: modals: [done]

  video-load-url        | Load Video                    | done
  video-edit            | Edit Video                    | done
  video-info            | Video Info                    | done
  chapter-edit          | Edit Chapter                  | done
  section-edit          | Edit Section                  | done
  loop-edit             | Edit Loop                     | done
  mark-edit             | Edit Mark                     | done
  data-inspect          | Inspect data                  | done
  data-compare          | Compare data: local and cloud | done
  data-delete-bulk      | Delete data                   | done
  app-options           | Options                       | done
  shared-video-conflict | Review conflict: shared video | done http://localhost:5173/loopllama/v2/?share=9J3X8AB_yP
  data-op (di)          | Review conflict: import data  | done
  data-op (dr)          | Review conflict: cloud read   | done
  data-op (ds)          | Review conflict: cloud save   | done

Text elements: Current panel [checked; OK]
  - Name
  - Video ID
  - Duration
  - Timeline display
  - Chapter
  - Section
  - Scratch loop source
  - Zoom [if active]

Text elements: Timeline: hovers [checked; OK]

Code review and refactor.
  - See _notes/refactoring-prompt.md
  - App limits on N videos?

User docs: final read:
    - MH
    - CC review

Dev docs:
  - data-schema.md
  - dev-notes.md
  - architecture-notes.md: have CC summarize how the code is organized and how it works

Launch:
  - User docs: F5 post: draft
  - Make v2 the offial version.

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

