
## TODO: LoopLlama v2

Text elements: modals:

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
  shared-video-conflict | Review conflict: shared video | done
  data-op (di)          | Review conflict: import data  | .
  data-op (dr)          | Review conflict: cloud read   | .
  data-op (ds)          | Review conflict: cloud save   | .

  - TODO:

    data-op (di) | Review conflict: import data
    data-op (dr) | Review conflict: cloud read
    data-op (ds) | Review conflict: cloud save

    - shared-video-conflict URL:
      http://localhost:5173/loopllama/v2/?share=9J3X8AB_yP

Text elements: messages:

  ```

  Context                         | Type      | Message
  ------------------------------------------------------------------
  --- SYSTEM ---
  STARTUP                         | info      | Initializing...
  PLAYER READY                    | info      | Player ready. Enter a YouTube URL or video ID above.
  STARTUP: prior video restored   | info      | Video cued: {name or id}
  VIDEO SWITCH                    | info      | Loading: {id}
  VIDEO ENDED                     | info      | Ended

  --- VIDEO ---
  vo · vv · vd (no videos)        | warning   | No videos saved.
  vr (no stashes)                 | warning   | No stashed videos.
  vl · y / URL input (bad URL)    | warning   | Could not parse a YouTube video ID from that input.
  Space · xx (no video)           | warning   | No video loaded.
  vz (no video)                   | warning   | No video loaded.
  vz (no offsets set)             | warning   | Video has no start/end offsets set; zoom has no effect.
  vx (no duration yet)            | error     | Video duration not yet known.
  vx                              | info      | Scratch: full video.
  vz (was on)                     | info      | Video zoom off.
  vz (was off)                    | info      | Video zoom on.
  vd                              | info      | Video deleted.
  vr                              | info      | Restored: "{name}".

  --- JUMP ---
  jb (no history)                 | warning   | No jump history.
  jb (at oldest)                  | warning   | At oldest jump.
  jf (not in history)             | warning   | At current position.
  SEEK: outside active loop       | warning   | Outside active loop range.
  jb                              | info      | Jump back: {m:ss}
  jf                              | info      | Jump forward: {m:ss}
  jf (return from oldest)         | info      | Returned to current position.

  --- LOOPING ---
  xx · LOOP CHECKBOX (bad range)  | warning   | Invalid loop range: start must be before end.
  ll (bad range)                  | warning   | Set a valid scratch loop before saving.
  EXPLICIT NAV (see note 1)       | info      | Looping off.
  ll                              | info      | Loop created
  lj · ld (no loops)              | warning   | No saved loops.
  le · lx (no loop at playhead)   | warning   | No saved loop at current position.
  le (modal confirm)              | info      | Loop updated.
  ld                              | info      | Loop deleted

  --- SCRATCH ---
  lx                              | info      | Scratch: loop – {name}.  [or: Scratch: loop.]
  xs (no source)                  | warning   | No source to save back to.
  xs (bad scratch range)          | warning   | Scratch loop is invalid (start must be before end).
  xs (source loop gone)           | warning   | Source loop not found.
  xs (source section gone)        | warning   | Source section not found.
  xs (source chapter gone)        | warning   | Source chapter not found.
  xs (padded range too small)     | warning   | Padded range too small — cannot compute valid entity bounds.
  xs (neighbor elim: section)     | warning   | Save-back would eliminate a neighbor section.
  xs (neighbor elim: chapter)     | warning   | Save-back would eliminate a neighbor chapter.
  xs (loop → loop)                | info      | Loop updated
  xs (loop → section)             | info      | Section saved back.
  xs (loop → chapter)             | info      | Chapter saved back.
  xr (no source)                  | warning   | No source to reset to.
  xr                              | info      | Loop reset to source.
  xu (no source)                  | warning   | No source to unlink.
  xu                              | info      | Loop source unlinked.
  lz (bad scratch range)          | warning   | No valid scratch loop to zoom.
  lz (full video span)            | warning   | Loop spans full video; zoom has no effect.
  lz (was on)                     | info      | Loop zoom off.
  lz (was off)                    | info      | Loop zoom on.

  --- SECTION ---
  ss (inside fixed section)       | warning   | Cannot set section inside a fixed section.
  se (no section)                 | warning   | No section at current position.
  sx (no bounds)                  | warning   | No section at current position.
  sf (no section)                 | warning   | No section at current position.
  sz (no bounds)                  | warning   | No section at current position.
  sf (no duration)                | error     | Video duration not yet known.
  sj · sd (no sections)           | warning   | No sections set.
  ss                              | info      | Section created
  sx                              | info      | Scratch: section.
  sf (end was fixed → float)      | info      | Section end unfixed.
  sf (end was float → fixed)      | info      | Section end fixed.
  sd                              | info      | Section deleted
  sz (was on)                     | info      | Section zoom off.
  sz (was off)                    | info      | Section zoom on.
  se (modal confirm)              | info      | Section updated

  --- CHAPTER ---
  cc (inside fixed chapter)       | warning   | Cannot set chapter inside a fixed chapter.
  ce (no chapter)                 | warning   | No chapter at current position.
  cx (no bounds)                  | warning   | No chapter at current position.
  cf (no chapter)                 | warning   | No chapter at current position.
  cz (no bounds)                  | warning   | No chapter at current position.
  cf (no duration)                | error     | Video duration not yet known.
  cj · cd (no chapters)           | warning   | No chapters set.
  cc                              | info      | Chapter created
  cx                              | info      | Scratch: chapter.
  cf (end was fixed → float)      | info      | Chapter end unfixed.
  cf (end was float → fixed)      | info      | Chapter end fixed.
  cd                              | info      | Chapter deleted
  cz (was on)                     | info      | Chapter zoom off.
  cz (was off)                    | info      | Chapter zoom on.
  ce (modal confirm)              | info      | Chapter updated

  --- MARK ---
  mm (duplicate time)             | warning   | Mark already exists at this time.
  me (no mark at or before)       | warning   | No mark at or before current position.
  mj · md (no marks)              | warning   | No marks set.
  mm                              | info      | Mark created
  md                              | info      | Mark deleted
  me (modal confirm)              | info      | Mark updated

  --- ZOOM ---
  zo (no zoom active)             | warning   | No zoom active.
  zo                              | info      | Zoom off.

  --- UNDO/REDO ---
  u (nothing)                     | warning   | Nothing to undo.
  U (nothing)                     | warning   | Nothing to redo.
  u                               | info      | Undone: {description}
  U                               | info      | Redone: {description}

  --- APP / MISC ---
  ac (clipboard OK)               | info      | Time copied: {m:ss}
  ac (clipboard blocked)          | warning   | Clipboard write failed.
  am (no prior message)           | warning   | No recent message.
  ao (confirm)                    | info      | Options saved.
  ae                              | info      | Example videos: {N} loaded; {N} already in library.
  at · t                          | info      | Timeline displaying: sections.  [or: ...chapters.]
  LOOP START/END INPUT: bad value | warning   | Invalid time format.

  --- DATA ---
  ds (not signed in)              | warning   | Sign in to save data to cloud.
  ds (cloud error)                | error     | Cloud request failed.
  ds                              | info      | Saved to cloud: {N} added, {N} updated, {N} unchanged[, {N} skipped][, {N} deleted].
  dr (not signed in)              | warning   | Sign in to read data from cloud.
  dr (cloud error)                | error     | Cloud request failed.
  dr (no cloud data)              | warning   | No cloud data found.
  dr                              | info      | Read from cloud: {N} added, {N} updated, {N} unchanged[, {N} skipped][, {N} deleted].
  dc (not signed in)              | warning   | Sign in to compare local vs cloud data.
  dc (cloud error)                | error     | Cloud request failed — compare unavailable.
  de                              | info      | Exported all data.
  di (parse error)                | error     | Import failed: {error message}
  di                              | info      | Imported: {N} added, {N} updated, {N} unchanged[, {N} skipped][, {N} deleted].
  d⌫ (delete videos)              | info      | Deleted {N} video[s].
  d⌫ (delete current-video items) | info      | Deleted {N} item[s].

  --- SHARE ---
  dv (no video)                   | warning   | No video loaded.
  dv (clipboard OK)               | info      | Video share URL copied to clipboard.
  dv (clipboard blocked)          | info      | Video share URL ready (clipboard unavailable).
  dv (error)                      | error     | Share failed: {error message}
  dx (no video)                   | warning   | No video loaded.
  dx (bad scratch range)          | warning   | Set a valid scratch loop first.
  dx (clipboard OK)               | info      | Loop share URL copied to clipboard.
  dx (clipboard blocked)          | info      | Loop share URL ready (clipboard unavailable).
  dx (error)                      | error     | Share failed: {error message}
  STARTUP: shared loop            | info      | Shared loop loaded: {name or time range}
  STARTUP: legacy ?v=&s=&e= URL   | info      | Shared loop loaded: {m:ss} → {m:ss}
  STARTUP: shared video           | info      | Shared video loaded: {name}
  STARTUP: shared video, skipped  | info      | Skipped: "{name}" already in your library.
  STARTUP: shared content error   | error     | Could not load shared content: {error message}
  STARTUP: shared loop bad URL    | error     | Shared loop: could not parse video URL.
  STARTUP: shared video bad URL   | error     | Shared video: could not parse video URL.
  SIGN IN (no local videos)       | info      | Signed in. No local videos — use dr to load from cloud.

  --- FOOTER BAR STATE ---
  WINDOW FOCUS LOST               | warning   | Key bindings inactive
  EDIT SCRATCH ACTIVE             | other     | "Edit Loop" cheatsheet (Tab / ←→ / ↑↓ / Space / ⌫ / 0-9 / Enter·Esc)
  PREFIX KEY (after 300ms)        | which-key | Completions for current prefix
  COUNT DIGIT TYPED               | other     | Count: {N}

  ```

  **Notes:**

  1. EXPLICIT NAV: "Looping off." fires from `,` (prevEntity), `.`
     (nextEntity), and all picker-based jump handlers (`cj`, `sj`, `lj`, `mj`)
     when looping was active.

  2. "Video duration not yet known." appears for `vx`, `sf`, and `cf` — all
     operations that need a known duration to compute an endpoint.

  3. Inconsistent trailing periods: create/delete messages (`Loop created`,
     `Mark deleted`, etc.) have no period; most status confirmations do.
     Probably worth standardizing.

  4. "Loop updated" (no period) is from `xs` saving scratch back to a named
     loop; "Loop updated." (with period) is from the `le` edit modal. Same
     surface message, different punctuation.

  5. The `"Shared loop loaded:"` message appears in two contexts: the modern
     Supabase share system (startup) and the legacy `?v=&s=&e=` URL params —
     both produce the same prefix but different formatting of the time range.

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

