
## TODO: LoopLlama v2

Text elements: messages:

```

Context            | Type | Message
------------------------------------------------------------------
ST                 | I    | [DROP] Initializing...
PLAYER READY       | I    | [DROP] Player ready. Enter a YouTube URL or video ID above.
ST: prior video    | I    | [DROP] Video cued: {name or id}
VIDEO SWITCH       | I    | [DROP] Loading: {id}
VIDEO ENDED        | I    | [DROP] Ended
------------------------------------------------------------------
ST-SL              | I    | Shared loop loaded.
ST: old v2 share   | I    | Shared loop loaded.
ST-SV              | I    | Shared video loaded.
ST-SV, skipped     | I    | [DROP] Skipped: "{name}" already in your library.
ST-SC error        | E    | Share URL: could not load[: {error_message}]
ST-SL bad URL      | E    | Shared loop: invalid URL.
ST-SV bad URL      | E    | Shared video: invalid URL.
SIGN IN            | I    | Signed in.
SIGN IN (no vids)  | I    | [DROP] Signed in. No local videos — use dr to load from cloud.
WINDOW FOCUS LOST  | W    | Key bindings inactive.
------------------------------------------------------------------
cc                 | I    | Chapter: created.
cc (fixed chapter) | W    | Cannot create chapter: inside a fixed chapter.
ce (no chapter)    | W    | No current chapter.
ce (modal confirm) | I    | Chapter: edited.
ce (modal confirm) | W    | [IN_MODAL] Edit would eliminate a neighbor chapter.
cx (no bounds)     | W    | No current chapter.
cx                 | I    | Chapter: scratched.
cj (no chapters)   | W    | No chapters.
cz (no bounds)     | W    | No current chapter.
cz (was off)       | I    | Chapter: zoomed.
cz (was on)        | I    | Zoom: off.
cf (no chapter)    | W    | No current chapter.
cf (no duration)   | E    | Cannot fix chapter end: video duration unknown.
cf                 | I    | Chapter: end {fixed           | unfixed}.
cd (no chapters)   | W    | No chapters.
cd                 | I    | Chapter: deleted.
==================================================================       ## __HERE__
ss                 | I    | Section created
ss (fixed section) | W    | Cannot set section inside a fixed section.
se (modal confirm) | I    | Section updated
se (no section)    | W    | No section at current position.
se (modal confirm) | W    | Edit would eliminate a neighbor section.
sx                 | I    | Scratch: section.
sx (no section)    | W    | No section at current position.
sj (no sections)   | W    | No sections set.
sz (was on)        | I    | Section zoom off.
sz (was off)       | I    | Section zoom on.
sf (end was fixed) | I    | Section end unfixed.
sf (end was float) | I    | Section end fixed.
sz (no section)    | W    | No section at current position.
sf (no duration)   | E    | Video duration not yet known.
sf (no section)    | W    | No section at current position.
sd                 | I    | Section deleted
sd (no sections)   | W    | No sections set.
------------------------------------------------------------------
vo (no videos)     | W    | No videos.
vv (no videos)     | W    | No videos.
vd (no videos)     | W    | No videos.
vr (no stashes)    | W    | No stashed videos.
vl                 | W    | Invalid YouTube URL or ID.
y                  | W    | Invalid YouTube URL or ID.
Space (no video)   | W    | No video loaded.
xx (no video)      | W    | No video loaded.
vz (no video)      | W    | No video loaded.
vz (no offsets)    | W    | Video zoom: no custom start/end times.
vx (no duration)   | E    | Video scratch: duration not yet known.
vx                 | I    | Scratch: full video.
vz (was on)        | I    | Video zoom off.
vz (was off)       | I    | Video zoom on.
vd                 | I    | Video deleted.
vr                 | I    | Restored: "{name}".
------------------------------------------------------------------
jb (no history)    | W    | No jump history.
jb (at oldest)     | W    | At oldest jump.
jf (at newest)     | W    | At current position.
jb                 | I    | Jump back: {m:ss}
jf                 | I    | Jump forward: {m:ss}
jf (to oldest)     | I    | Returned to current position.
------------------------------------------------------------------
xx                 | W    | Invalid loop range: start must be before end.
ll (bad range)     | W    | Set a valid scratch loop before saving.
EXPLICIT_JUMP      | I    | Looping off.
ll                 | I    | Loop created
lj (no loops)      | W    | No saved loops.
ld (no loops)      | W    | No saved loops.
le                 | W    | No saved loop at current position.
lx                 | W    | No saved loop at current position.
le (modal confirm) | I    | Loop updated.
ld                 | I    | Loop deleted
------------------------------------------------------------------
lx                 | I    | Scratch: loop[ – {name}].
xs (no source)     | W    | No source to save back to.
xs (bad range)     | W    | Scratch loop is invalid (start must be before end).
xs (source gone)   | W    | Source loop not found.
xs (source gone)   | W    | Source section not found.
xs (source gone)   | W    | Source chapter not found.
xs                 | W    | Padded range too small — cannot compute valid entity bounds.
xs (neighbor elim) | W    | Save-back would eliminate a neighbor section.
xs (neighbor elim) | W    | Save-back would eliminate a neighbor chapter.
xs (loop → loop)   | I    | Loop updated
xs (section)       | I    | Section saved back.
xs (chapter)       | I    | Chapter saved back.
xr (no source)     | W    | No source to reset to.
xr                 | I    | Loop reset to source.
xu (no source)     | W    | No source to unlink.
xu                 | I    | Loop source unlinked.
lz (bad range)     | W    | No valid scratch loop to zoom.
lz (full video)    | W    | Loop spans full video; zoom has no effect.
lz (was on)        | I    | Loop zoom off.
lz (was off)       | I    | Loop zoom on.
------------------------------------------------------------
mm (dup time)      | W    | Mark already exists at this time.
me (no mark)       | W    | No mark at or before current position.
mj                 | W    | No marks set.
md                 | W    | No marks set.
mm                 | I    | Mark created
md                 | I    | Mark deleted
me (modal confirm) | I    | Mark updated
------------------------------------------------------------------
zo (no zoom)       | W    | No zoom active.
zo                 | I    | Zoom off.
------------------------------------------------------------------
u (nothing)        | W    | Nothing to undo.
U (nothing)        | W    | Nothing to redo.
u                  | I    | Undone: {description}
U                  | I    | Redone: {description}
------------------------------------------------------------------
ac (CB OK)         | I    | Time copied: {m:ss}
ac (CB blocked)    | W    | Clipboard write failed.
am (no prior)      | W    | No recent message.
ao (confirm)       | I    | Options saved.
ae                 | I    | Example videos: {N} loaded; {N} already in library.
at                 | I    | Timeline displaying: sections | chapters.
LOOP START/END     | W    | Invalid time format.
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
------------------------------------------------------------------
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
EDIT SCRATCH       | WK   | Edit scratch loop bindings
PREFIX KEY         | WK   | Completions for current prefix
COUNT DIGIT TYPED  | WK   | Count: {N}

Policy:

    - Messages should:
      - End with periods.
      - Be compact/brief.
      - Be consistent across similar operations.
      - Be restructured to avoid the need for pluralization logic.

    - Always keep messages for:
      - Failures/errors.
      - Blocked actions.
      - Mode changes.
      - For operations with uncertain or non-obvious completion (cloud,
        import/export, sharing), err toward keeping confirmation messages even
        when the outcome has visual indicators.

    - But without those, drop messages that:
      - Are pure narration without supplying additional info (eg which entity).
      - Or that have their own obvious and complete visual consequences.

    - Message structures: use when feasible:

      Info    | "ENTITY: PAST-VERB" | Chapter: created.
      Warning | "COMPACT_REASON"    | No chapters.
      Warning | "CANNOT[: REASON]"  | Cannot fix chapter end: video duration is unknown.

Context:

    ST    | STARTUP
    ST-SL | STARTUP shared loop
    ST-SV | STARTUP shared video
    ST-SC | STARTUP shared content
    CB    | Clipboard

Message types:

    I     | Info
    W     | Warning
    E     | Error
    WK    | Which key (regular, edit-scratch-loop, or count-prefix)

Message:

    [DROP] | Drop the message.

Other Notes:

  - EXPLICIT_JUMP: fires when looping=true and user requests an explicit jump
    outside the loop.

```

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

