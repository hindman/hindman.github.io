
<!--

# CONTENTS (h2 headings only)

## What LoopLlama Is
## Entities: Sections, Loops, Marks, Chapters
## Visual Timeline
## App data
## Navigation Safety
## Editing safety
## Flexible Time Inputs
## Operations
## The scratch-loop
## Data schema
## Modals, pickers, and other UI elements
## Page layout
## Controls area
## The LoopLlama banner
## Backend Persistence (Future: v2 or v3)
##   Phase 1: Metrics (schema included)
##   Phase 2: Shareable setups
##   Phase 3: Per-user persistence
## V3+ Ideas: Other Video Sources
## Security: Supabase Credentials and RLS Policy

-->

---

## What LoopLlama Is

A browser-based YouTube video controller for music practice. Core use case:
hold a guitar and control video playback via Vim-style bindings -- loop
sections, set marks, adjust speed, navigate quickly.

The app serves two kinds of users:

- Keyboard-first users (holding an instrument): need fast, memorable key
  bindings for all core operations. Vim-style single-key and multi-key
  bindings are supported. The fewer hand movements required, the better.
- Mouse-oriented users: need standard web controls (buttons, text inputs,
  pickers) for nearly all operations.

## Entities: Sections, Loops, Marks, Chapters

Sections are musical structural elements: Intro, Verse, A section, B section,
Outro, Vamp, Solo, etc. They correspond to the actual structure of the musical
piece. Sections have a start time (and an end time derived from the the next
Section start). Sections cannot overlap.

Loops are named, loopable time ranges that do not have to correspond to
musical structure. They are more generic than sections: a user might create a
loop called "outro-lick" to isolate a specific phrase for practice.

Marks are named time points for quick navigation. They are the most generic
entity: any moment the user wants to return to quickly.

Chapters are a special purpose device when the material you are viewing
resides in a much larger video. They are like sections in providing a
way to partition the entire video into non-overlapping regions. Example
use case: a video that is a full concert, but you want to study 2 songs;
define each song as a chapter. Then you can zoom the timeline into one
of those chapters and further divide the song into sections.

Although chapters exist mainly with zooming in mind, the zoom feature is more
general than chapters. Any region can be zoomed: chapter, section, or loop.

Because they cannot overlap, sections and chapters can be created quickly
simply by setting a start point. The end point is inferred by the start
of the next section/chapter start (or the video end). If needed, the
user can also explicitly set a section/chapter end.

The "current" chapter/section is defined by the location of the playhead. The
current loop (also known as the scratch loop) is defined by the start/end set
in the Controls area. Even though other entities (video, chapter, section,
saved-loop) can be opened (or loaded) into the scratch-loop, after than
loading occurs the scratch-loop is independent of the source entity. You can,
however, perform a save-back operation after editing the scratch-loop
boundaries -- pushing those new bounds back to the source entity.

## Visual Timeline

Timeline has 4 zones:

- Play zone:
    - Mimics the YouTube timeline idiom: a thick horizontal line with a
      small circle/dot for the playhead.
    - Left portion (elapsed): colored; right (remaining): gray.
    - Click to jump to that time.

- Chapter-Section zone:
    - Shows the video as partitioned into sections or chapters (`tt` to toggle
      the display).

- Mark zone:
    - Shows marks as dots.

- Loop zone:
    - Has 3 lanes.
    - Lane 1: current scratch loop.
    - Lanes 2 and 3: saved loops.

Mouse interactions:
    - Play zone click: jump to that time.
    - Hover on any entity for info.
    - Click an entity: jump to section start.

## App data

Give users full access to their app data:
- Export: Download all app data (or a single video) as a JSON file.
- Import: Load that JSON into the app (eg to sync your LL data across
  different computers or browsers).
- Share: a single loop in a video, via URL.

## Navigation Safety

App remembers non-small navigational jump allowing you to jump back to
prior positions -- mainly to guard against inadvertent key presses.

## Editing safety

Strong support for undo/redo. Most non-routine edits are remembered
and reversible.

## Flexible Time Inputs

The app supports various input styles:

    mm:ss and hh:mm:ss | 5:13 or 32:45 or 1:13:28
    condensed forms    | 73:44 == 1:13:44
    raw seconds        | 245 == 4:05
    decimal seconds    | 99.7 or 34:43.2
    forward slash      | mm/ss and hh/mm/ss

The purpose of the forward slash as a synonym for colon is typing ease (no
need to press Shift).

## Operations

- Set: plant a new divider at the current playhead position.
- Edit: edit the divider to the left of the current playhead (adjust its
  start and sometimes end or set/edit its name).
- Loop: load the current section into the scratch-loop.
- Delete: remove the divider to the left of the current playhead.
- Jump next/previous: move the playhead to the next or previous divider.
- Open: opens/loads the entity.

## The scratch-loop

The active loop is always the scratch-loop -- a single unnamed Loop entity
that is the working surface for all looping activity. The scratch-loop's
endpoints are what the player actually uses when looping is enabled.

Setting endpoints manually (quick-set keys for start and end) always writes
directly to the scratch-loop. Loading a saved Loop or Section copies its
endpoints into the scratch-loop; the saved entity is untouched. All endpoint
editing applies to the scratch-loop only. The workflow is always: load into
scratch, edit, then optionally save back.

Loop nudges:

    An example to explain nudges. It focuses on nudging the loop-end, but the
    concepts apply in an analogous fashion to loop-start nudges.

    Initial state:
        start = 10
        end = 2
        nudge-delta = 5

    User does a loop-end nudge-increase:
        SELF = loop-end
        OTHER = loop-start

        Step 1: try a regular nudge:
            regular means apply delta directly to SELF.
            resulting loop: (10, 2 + 5)
            illegal => go to Step 2

        Step 2: try a relative nudge:
            relative means apply delta relative to OTHER
            resulting loop: (10, 10 + 5)
            legal => apply this edit and stop here

        Step 3:
            fallback to the result from Step 1
            if looping=on:
                refuse the edit
                cannot make an illegal loop while looping is on
            else:
                apply the edit even though the loop is still illegal
                causes no harm yet; maybe user knows what they ultimately want

    A core purpose of nudge is to support a speedy workflow like this:
        - User sets a loop start or end (but loop is currently illegal).
        - User does the needed nudge on the other boundary.
        - Thus, in 2 actions the user has a legal loop.

## Data schema

Options:

- seek_delta_default: N
- seek_delta_choices: [N1, N2, ...]
- loop_nudge_delta_default: N
- loop_nudge_delta_choices: [N1, N2, ...]
- speed_delta: N
- section_loop_pad_start: N
- section_loop_pad_end: N

Video:

- id: YouTube video ID; the authoritative key used internally

- url: stored as supplied by the user; kept for display and JSON
  readability, not reconstructed from id.

- duration: from YouTube API

- time: current time. Useful so that when you return to the video
  later, the app remembers where you were.

- name: label/title for the video
    - empty until set my user
    - auto-population from YouTube metadata requires the YouTube Data API

- looping: boolean; whether looping is currently enabled. The scratch-loop's
  endpoints are always what the player uses when this is true. See the
  Looping Model section for the full scratch-loop policy.

- speed: playback speed; defaults to 1.0

- seek_delta: controls <Left>/<Right> seeks; defaults to 5 sec.

- speed_delta: controls amount that -/= alter the speed.

- chapters: array of Chapter entities

- sections: array of Section entities

- loops: array of Loop entities (includes the scratch-loop if present)

- marks: array of Mark entities

- jumps:
    - Persisted list of non-small navigational jumps, used for go-back
      navigation.
    - Persisted across sessions.
    - Stored on the video object.
    - Jump history max size: 40 entries.

- version: version number of current metadata scheme

Chapter

- id: generated unique identifier

- name: user-defined label (e.g., "Windy and Warm"); required.

- start: start time (seconds)

- end: end time (seconds)

Section

- id: generated unique identifier

- chapterId: ID of the Chapter this section belongs to; nullable.

- name: user label (e.g., "Intro", "Verse", "Solo"); optional. If absent, the
  UI displays a computed rank-order name (e.g., "#1") derived from position
  in timeline order. Not stored.

- time: the divider point (seconds); start of this section

- end: end time (seconds); optional. If stored, the section ends here and
  a gap zone exists between this point and the next divider (shown as gray
  on the timeline). If absent, end is derived at runtime from the next
  divider's time (or the video's effective end for the last section).
  Constraint: stored end must not exceed the next section's time.

Loop

- id: generated unique identifier

- chapterId: ID of the Chapter this loop belongs to; nullable.

- name: user label (e.g., "outro-lick"); optional. If absent, the UI displays
  a computed rank-order name (e.g., "#2"). Not stored. The scratch-loop is
  displayed distinctly (e.g., "scratch"), not numbered.

- start: start time (seconds)

- end: end time (seconds)

- source: ID of the Section or Loop this was loaded from, or null if manually
  created. Present on the scratch-loop only; enables the save-back operation
  and the dirty indicator.

- is_scratch: boolean; true on the one scratch-loop entity. Needed because
  source can be null for a manually-created scratch-loop, making source alone
  insufficient to identify which Loop in the array is the scratch-loop.

Mark

- id: generated unique identifier

- chapterId: ID of the Chapter this mark belongs to; nullable.

- name: user label; optional. If absent, the UI displays a computed rank-order
  name (e.g., "#1") derived from position in timeline order. Not stored.

- time: time point (seconds)

## Modals, pickers, and other UI elements

Video-info-modal:
    - Informational ldisplay of all data about the current video.

URL-input-modal:
    - Simple modal to enter YouTube URL.

Standard entity pickers:
    - Used in contexts like jump and open.
    - videos-picker
    - chapters-picker
    - sections-picker
    - loops-picker
    - marks-picker
    - jump-history-picker

Edit-video-modal:
    - Basic modal to edit URL, name.

Save-loop-modal:
    - Modal to edit name, start, end.

Edit-scratch-loop-mode:
    - Mode to edit start/end.
    - Special key bindings to support that work.

Edit-section-modal:
    - Basic modal to edit section attributes.

Edit-mark-modal:
    - Basic modal to edit mark attributes.

Options-modal:
    - A modal where the user can customize app settings.

Delete-data-modal:
    - Modal to perform data deletions in bulk:
        - entire videos
        - or entities within the current video

## Page layout

Header:
    - App name
    - Mascot icon
    - Links to related material.

YouTube iframe:
    - The video.

Current panel:
    - Displays info about the current video and status.

Timeline:
    - Interactive visual display of the video timeline and the entities in the
      video (chapters, sections, loops, marks).

Controls area:
    - Core UI controls: buttons, text boxes, toggles, etc.
    - Actions menus for less-frequently needed operations.

Message footer:
    - Messages:
        - Info/status
        - Which-key info
        - Warnings
        - Errors

## Controls area

Play:

    play/pause    | button
    time          | text box

Speed:

    speed | text box [clamp: 25 - 200, increments of 5]

Navigate:

    seek: back    | button
    seek_delta    | dropdown
    seek: forward | button

    previous: entity | button
    entity: type     | dropdown
    next: entity     | button

Looping:

    looping: on/off  | toggle
    start: Now       | button
    start            | text box
    loop_nudge_delta | dropdown (same choices as seek_delta)
    end              | text box
    end: Now         | button

Actions:

    Video:
        - Load URL
        - Open video
        - Edit current
        - Delete video
        ----------------------------
        - Creater chapter
        - Open chapter
        - Edit chapter
        - Delete chapter
        - Zoom current chapter

    Section:
        - Open section
        - Set section here
        - Edit current section
        - Loop current section
        - Delete section
        - Zoom current section

    Loop:
        - Open loop
        - Save new loop
        - Save back to loop source
        - Reset loop to source
        - Unlink loop source
        - Delete loop
        - Zoom current loop
        ---------------------------
        - Edit scratch loop

    Mark:
        - Set mark here
        - Edit mark
        - Delete mark

    Jump:
        - Jump to Chapter
        - Jump to Section
        - Jump to Loop
        - Jump to Mark
        ----------------------------
        - Jump history
        - Jump Back
        - Jump Forward

    App:
        - Undo
        - Redo
        ----------------------------
        - Share video
        - Share loop
        ----------------------------
        - Export current video
        - Export all data
        - Import data
        - Inspect JSON
        ----------------------------
        - Bulk data delete
        - Options

    Help:
        - General help
        - Key bindings

## The LoopLlama banner

The header includes a thin horizontal strip of seven equal vertical
color bands, styled after the aesthetic of national and movement flags.
It is a deliberate political statement: an amalgam banner representing
the broad historical coalition that has fought fascism and
authoritarianism. The color order reads left to right as a narrative
arc -- from the hardest and darkest symbols of resistance, through a
breath of peace at center, toward hope and liberty on the right.

Band order and historical inspiration:

1. Black (#1a1a1a) -- Anarchism and anarcho-syndicalism, the oldest
   visual language of anti-fascist organizing. Black and red together
   predate World War II as the colors of resistance to state tyranny.

2. Deep red (#c0392b) -- The labor movement, international socialism,
   and the blood of martyrs. Red is the one color that appears in
   virtually every anti-authoritarian tradition.

3. Purple (#6c3483) -- The tricolor of the Second Spanish Republic
   (red, yellow, purple), whose defense drew volunteers from 53
   countries to the International Brigades -- perhaps the broadest
   anti-fascist coalition in history before the world war.

4. White (#f0f0f0) -- Peace, purity of purpose, and nonviolent
   resistance. Also the center band of the French tricolor (liberty
   and civic equality) and the white of the Polish Solidarity movement,
   one of the great nonviolent campaigns against authoritarian rule.
   Placed at the center as a pivot point between the darker symbols of
   struggle and the warmer colors of hope.

5. Gold (#d4ac0d) -- The gold of the German democratic tradition
   (schwarz-rot-gold), the colors of the Weimar Republic that the
   Nazis explicitly rejected and the Federal Republic later reclaimed.
   A color that carries the meaning: survived, endured, rebuilt.

6. Forest green (#1e8449) -- Pan-African resistance, drawn from
   Marcus Garvey's flag (black, red, green). Represents the struggle
   against colonial domination and racial authoritarianism -- a
   distinct but deeply related form of the same evil.

7. French blue (#2471a3) -- Liberty and the republic, from the French
   tricolor. The Resistance reclaimed these colors from Vichy
   collaboration. Also evokes the broader ideal of liberal democratic
   governance as the alternative to authoritarian rule.

### Color fidelity notes

None of the hex values are exact reproductions of an official flag color.
They are deliberate aesthetic choices -- a best-effort visual homage, not
a precise rendering. That framing is accurate and defensible.

Fidelity summary (official values sourced from Wikipedia flag infoboxes
and flagcolorcodes.com):

- Black (#1a1a1a): Anarchist black has no official specification; pure
  black is #000000. The near-black is an intentional softening.

- Deep red (#c0392b): No official spec exists for the generic socialist
  red; the symbolic color is typically bright red (~#FF0000). The chosen
  value reads as a darker, aged brick-red.

- Purple (#6c3483): The Spanish Republic purple (morado) is documented as
  approximately #630B57 -- a deeper, darker plum. The chosen value is
  noticeably lighter and more violet. Closest to matching the spirit of
  the color but not the tone.

- White (#f0f0f0): Trivially off-white. Fine.

- Gold (#d4ac0d): The German federal flag gold is documented as #FFCC00
  -- a bright, saturated heraldic gold. The chosen value is darker and
  more ochre, reading as "antique gold." Meaningful departure from the
  official value.

- Forest green (#1e8449): Excellent match. The Pan-African flag green is
  documented as approximately #12853F. The chosen value is nearly
  identical -- the closest color match in the set.

- French blue (#2471a3): The official French blue is a very dark navy
  (#000091). A lighter digital variant (~#002395) was introduced in 1976
  and is now common. The chosen value is substantially lighter than both
  -- a medium cornflower/steel blue. The largest departure from any
  official value in the set.

### Wikipedia links

- Anarchist black flag:
  https://en.wikipedia.org/wiki/Black_flag_(anarchism)

- Red flag (politics / labor / socialism):
  https://en.wikipedia.org/wiki/Red_flag_(politics)

- Flag of the Second Spanish Republic:
  https://en.wikipedia.org/wiki/Flag_of_the_Second_Spanish_Republic

- International Brigades:
  https://en.wikipedia.org/wiki/International_Brigades

- Flag of France:
  https://en.wikipedia.org/wiki/Flag_of_France

- Polish Solidarity movement:
  https://en.wikipedia.org/wiki/Solidarity_(Polish_trade_union)

- Flag of Germany (schwarz-rot-gold):
  https://en.wikipedia.org/wiki/Flag_of_Germany

- Pan-African flag (Garvey / UNIA):
  https://en.wikipedia.org/wiki/Pan-African_flag

- Marcus Garvey:
  https://en.wikipedia.org/wiki/Marcus_Garvey

### Notes on political associations

International Brigades / Spanish Republic (band 3): The Stalinist
dimension of the Brigades is real and well-documented, not a fringe
claim. The Brigades were recruited and directed by the Comintern (Stalin's
international apparatus). Soviet NKVD operatives were active in Republican
Spain and conducted purges of the non-Stalinist left -- suppressing the
POUM (Trotskyist militia) in 1937, arresting and killing anti-Stalinist
leftists and anarchists within Republican ranks. George Orwell documented
this firsthand in Homage to Catalonia. The cause itself -- an elected
republic defending against a fascist military coup backed by Hitler and
Mussolini -- is unambiguous. But the organizational apparatus behind the
Brigades was Stalin's. Informed readers will know this. The current text
cites the Brigades as a positive example, which is accurate in the anti-
fascist sense but sidesteps the Stalinist complication. Worth being
conscious of, though not a disqualifying association given the framing.

Marcus Garvey / Pan-African flag (band 6): The Garvey controversies are
real: in 1922 he met with the acting Imperial Wizard of the KKK, finding
common ground on racial separatism, which caused a major rupture with the
NAACP and W.E.B. Du Bois. He was convicted of mail fraud (1923) related
to his Black Star Line shipping venture and deported after Coolidge
commuted his sentence. However, the Pan-African flag (adopted by UNIA in
1920) has a life well beyond Garvey personally. It has been adopted by
African independence movements, the African Union, and Black liberation
movements worldwide -- including many with no sympathy for Garvey's
separatist views. The current text references the flag as a symbol of
Pan-African resistance and anti-colonial struggle, which is accurate and
mainstream. The connection is safe as framed.

Polish Solidarity (band 4): One of the cleanest symbols in the set. The
1980-89 movement was a genuine, broad-based nonviolent campaign against
Soviet-aligned authoritarianism. Post-1989 political fragmentation of the
Solidarity coalition (including eventual connection to nationalist and
PiS-adjacent politics) is largely irrelevant to what the symbol evokes.

---

## Backend Persistence

### Current state

v2 uses localStorage only. App state (videos, sections, loops, marks) is
stored in the browser. Cross-browser sync requires manual export/import
of a JSON file.

### Planned approach: Supabase

If and when backend persistence is added, the plan is to use Supabase.

Supabase is a hosted backend-as-a-service with a generous free tier.
It provides a database, authentication, and a REST API. No server to
host or maintain. The free tier is almost certainly sufficient for LL's
scale; exceeding it would be a welcome problem.

### How it works for users

Users authenticate through LoopLlama using a "Sign in with X" button
(e.g., Google). Supabase orchestrates the OAuth handshake with the
chosen identity provider. Users never create a Supabase account --
Supabase is invisible to them. They just need an account with whatever
provider LL offers (Google is the obvious default due to near-universal
coverage).

Once signed in, a user's LL data is stored in the Supabase database
and tied to their identity. It is accessible from any browser or device
they sign into.

### How it works for LL

LL (i.e., the developer) holds the Supabase project. The app is
initialized with a project URL and an anon key -- both embeddable in
client-side code, as this is the standard Supabase pattern. The anon key
is intentionally public; what controls data access is Row Level Security
(RLS) configured in Supabase, which ensures each user can only read and
write their own data.

### What changes in the app

The storage layer (storage.js) would gain a server-aware mode: if the
user is authenticated, reads and writes go to Supabase; otherwise the
app falls back to localStorage (so unauthenticated / guest use still
works). The rest of the app is unaffected -- the data schema is already
well-suited to this model. A small login/logout UI element would be
added to the app shell.

A decision is needed for the first-login experience: when a user signs
in for the first time on a device that already has localStorage data,
should that local data be migrated to their account, discarded, or
merged?

### Identity providers

Multiple sign-in options can be offered simultaneously (e.g., Google and
GitHub). Each is configured in the Supabase dashboard. The tradeoff: a
user who signs in with Google and later tries GitHub will have two
separate accounts with separate data, unless account-linking is
implemented (an advanced feature). Safest to start with one provider
(Google) and add more later if needed.

### Potential benefits and features

Three categories of value, in rough order of implementation complexity:

1. Metrics and telemetry (no user auth required)
   - Total users, active users, retention
   - Which videos are being loaded
   - Which features are used (loops vs. marks vs. sections vs. chapters)
   - Informs future development priorities based on actual usage
   - Supabase's built-in dashboard handles basic reporting without
     any additional reporting code

2. Shareable setups (no user auth required)
   - A user can share a video setup (sections, loops, marks) via a URL
   - Recipient clicks the link and LL loads that setup directly --
     no JSON file exchange
   - Setups can be stored as public anonymous records in Supabase
   - Enables a community library over time: users contribute setups
     for songs, others discover and load them

3. Per-user data backup and sync (requires auth)
   - User's LL data stored in Supabase, tied to their identity
   - Accessible from any browser or device after signing in
   - Eliminates the risk of data loss from clearing browser storage
   - Cross-device sync happens automatically, no manual export/import

### Implementation plan (rough sketch)

The three categories above map naturally to three phases. Each phase
is independently useful and can ship without the next one.

Phase 1 -- Metrics (foundation work)
- Create the Supabase project; add the JS client to the LL app
- Design and create an `events` table (event type, video ID,
  timestamp, anonymous session ID)
- Add event logging calls at key points in the app: video loaded,
  loop created, section created, mark created, speed changed, etc.
- No UI changes; no auth; no RLS complexity beyond insert-only policy

Phase 2 -- Shareable setups (builds on Phase 1 infrastructure)
- Design a `shares` table: video metadata plus the full
  sections/loops/marks payload as JSON, plus a generated share ID
- Add a Share button to the UI; on click, write setup to Supabase
  and surface a shareable URL to the user
- Add URL-based load path: if LL is opened with a share ID in the
  URL, fetch that setup and load it into the app
- Decide scope: share a single loop? A full video setup? Both?
- No user auth required; anonymous writes with a rate-limit policy

Phase 3 -- Per-user persistence (most complex)
- Configure Supabase Auth with Google as the identity provider
- Add login/logout UI to the app shell
- Rewrite storage.js to be server-aware: authenticated users read
  and write to Supabase; unauthenticated users fall back to
  localStorage
- Set up RLS policies so each user can only access their own data
- Design a `user_data` table: one row per user, full app state as
  a JSON blob (matches the existing localStorage structure)
- Decide and implement the first-login migration strategy: when a
  user signs in on a device with existing localStorage data, offer
  to upload it to their account

Sequencing note: Phase 1 is the prerequisite for everything -- it
creates the Supabase project and adds the client library. Phase 2
and Phase 3 are largely independent after that and could be done in
either order, though Phase 2 is smaller and delivers visible user
value quickly.

### Phase 1 schema: events table

One table covers all Phase 1 metrics. Feature-usage tracking is
intentionally excluded -- development roadmap is driven by vision,
not usage counts.

Table: `events`

| column       | type        | notes                                      |
|--------------|-------------|--------------------------------------------|
| id           | uuid        | primary key, auto-generated                |
| created_at   | timestamptz | auto-generated                             |
| event_type   | text        | 'session_start' or 'video_load'            |
| client_id    | text        | UUID in localStorage; present on           |
|              |             | session_start only (see privacy note)      |
| session_id   | text        | UUID in sessionStorage; groups events      |
|              |             | within one visit                           |
| video_id     | text        | YouTube video ID; present on               |
|              |             | video_load only; no client_id attached     |

Event types:

- session_start: fired when the app loads. Carries client_id and
  session_id. Enables approximate unique-user and session counts.

- video_load: fired when a video is loaded. Carries session_id and
  video_id, but NOT client_id. Enables per-video load counts without
  creating a per-user watch history.

Privacy note: video_id and client_id are deliberately never stored
together. A per-user watch history -- even pseudonymous -- is contrary
to the intent of this data collection. Counts per video are sufficient
for the "popular videos" use case; linking them to device identities
is not needed and is avoided.

RLS policy: anon role can INSERT only. No SELECT, UPDATE, or DELETE
for app clients. Supabase dashboard (service role) is used for all
reporting queries.

client_id lifecycle: generated once as a UUID, stored in localStorage.
Survives across sessions on the same device/browser. Does not survive
clearing browser storage. Is not connected to any real-world identity
unless the user later creates an account (Phase 3).

session_id lifecycle: generated once per page load, stored in
sessionStorage. Cleared when the tab is closed.

### Rework of user data persistence: cloud storage, multi-device issues

LL does not attempt true multi-device sync. Cloud storage is a backup/restore
facility, not a live sync. The mental model: localStorage is your working
copy; the cloud is your saved copy, like a hard drive.

Each video object carries a last_modified timestamp (ms since epoch), updated
whenever the video's data changes.

Cloud read/write are explicit user operations (`dr` / `ds`), not automatic.
This keeps the system honest: you control exactly when data moves to or from
the cloud. A dirty indicator shows unsaved cloud changes; a tab-close prompt
fires if there are unsaved changes.

ds (data save, local → cloud):

- Fetches current cloud state, compares per-video last_modified.
- Videos where local is newer/equal (or not in cloud): uploaded.
- Videos where cloud is stricly newer: conflict. User is shown a list of
  affected videos and prompted: proceed (local overwrites cloud for those
  videos) or cancel.
- Videos only in cloud (not local): left untouched in cloud.

dr (data read, cloud → local):

- Fetches current cloud state, compares per-video last_modified.
- Videos where cloud is newer/equal (or not in local): pulled in.
- Videos where local is strictly newer: conflict. User is shown a list of
  affected videos and prompted: proceed (cloud overwrites local for those
  videos) or cancel.
- Videos only in local (not in cloud): left untouched in local.

Per-video checkbox selection for conflict resolution is a possible future
enhancement; for now the prompt is all-or-nothing.

Sign-in: authentication only. No automatic read or write. The user decides
whether to ds or dr after signing in. Exception: if the user signs in on a
device with no local videos, the app suggests a dr (but does not force it).

Options include a cloud_backup flag (default false). Controls whether the
app nudges the user to sign in when signed out. The lifecycle:

- New user, never signed in: cloud_backup false, no nudging.
- First sign-in: cloud_backup set to true.
- Signed out after normal use: cloud_backup remains true; app nudges the
  user to sign back in (prompt on load, visual indicator on Account menu).
- Sign out and remove cloud data (SORCD): cloud_backup set to false; no
  more nudging. User has made a deliberate choice to leave the cloud.
- User unchecks cloud_backup in options: nudging stops. Cloud ops (ds/dr)
  still available manually; the flag only controls the nudge.

Multi-device advice: ds and dr are safe to use across devices because all
transfers go through the per-video conflict check. The one scenario to avoid
is being signed in and using ds on two devices without a dr in between on
the second device -- you could overwrite the first device's cloud save. Best
practice: ds before switching devices; dr after switching.

#### Implementation stages

Stage 3e -- Remove auto-save; add dirty tracking.
- Remove scheduleSaveToCloud, flushCloudSave from storage.js
- Remove the beforeunload flush listener from llama-app.js
- _save() reverts to localStorage only; cloud_backup check and schedule
  call removed
- Add cloudDirty reactive prop (integer count of saves since last ds/dr);
  incremented in _save() when user is signed in
- Add dirty indicator to UI (location TBD; something unobtrusive)
- beforeunload listener: prompt the browser's native "leave page?" dialog
  if cloudDirty > 0

Stage 3f -- Implement ds (data save, local → cloud)
- Add ds handler and key binding (under d prefix)
- Fetch current cloud state
- Compare per-video last_modified; collect cloud videos strictly newer
  than local counterpart
- If conflicts: prompt listing affected video names; user chooses proceed
  (full local state replaces cloud) or cancel
- If no conflicts: upsert full local state to cloud directly
- On success: reset cloudDirty to 0, show status message

Stage 3g -- Implement dr (data read, cloud → local)
- Add dr handler and key binding (under d prefix)
- Fetch current cloud state
- Compare per-video last_modified; collect local videos strictly newer
  than their cloud counterpart
- If conflicts: prompt listing affected video names; user chooses proceed
  (cloud versions replace local for all videos) or cancel
- If no conflicts: merge cloud into local (replace/add per-video; keep
  local-only videos untouched); save to localStorage; update reactive props
- On success: reset cloudDirty to 0, show status message

Stage 3h -- Simplify sign-in
- Strip _handleSignIn down to: set cloud_backup = true, save to
  localStorage
- If local has no videos: show a status message suggesting the user do dr
- Remove all auto-merge logic added in earlier stages

Stage 3i -- Nudge UI and account menu polish
- Visual indicator on Account menu when cloud_backup is true but user is
  signed out (dot, badge, or color change -- TBD)
- Prompt on page load if cloud_backup is true and user is not signed in
- Account menu aesthetic polish (deferred from Stage 3b)

---

## V3+ Ideas: Other Video Sources

### Vimeo

Vimeo has a well-documented Player API (postMessage-based, similar in
structure to YouTube's IFrame API). It supports play, pause, seek,
get/set duration, playback rate, and events -- everything LL needs.
A meaningful amount of music lesson content lives on Vimeo.

Feasibility: moderate. Would require a second video controller adapter
(`VimeoController`) alongside the existing `YouTubeController`. The
current `videoController.js` wrapping pattern would need to become a
formal adapter interface, with source type detected from the URL.

Verdict: doable, less compelling than local video (below). Deferred.

### Other Online Platforms

Twitch (live-stream focused), Dailymotion, Facebook Video, TikTok,
Instagram: none have usable programmatic APIs for the kind of
seek/loop/rate control LL needs. Not worth pursuing.

### Local Video Files (Most Compelling V3 Feature)

Many users -- especially the primary use case -- have guitar lesson
videos on their computers: purchased downloads, DVD rips, saved
YouTube videos, etc. These can't use the YouTube IFrame API, but they
can use the HTML5 `<video>` element, which natively supports
everything LL needs:

- `play()`, `pause()`, `currentTime` (seek), `duration`,
  `playbackRate` -- all native, synchronous, no API handshake
- MP4, WebM, and MOV (macOS) all work
- Implementation is simpler than YouTube, not harder

Serving local files: run a simple HTTP server from the video
directory (e.g. `python3 -m http.server 8080`), then point LL at
`http://localhost:8080/my-lesson.mp4`. This works naturally in the
Vite dev environment. No new server infrastructure required.

Architecture: `videoController.js` becomes an adapter interface.
LL detects the source type from the URL (YouTube domain → YouTube
adapter; `.mp4`/`.webm`/etc. → HTML5 adapter) and instantiates
the right controller. The rest of the app is unchanged.

This is also the key enabler for a proper open-source release (see
next section): users who run LL locally get full LL features on their
own video library without any cloud dependency.

### Open-Source LL Project

Currently LL lives inside the hindman.github.io blog repo: the code
is public but the project isn't structured for outside contributors
or users. A proper open-source release would involve:

- Separate repo (e.g. github.com/mhindman/loopllama)
- README with install steps: clone, `npm install`, configure `.env`,
  `npm run dev`
- LICENSE file (MIT is the natural choice)
- `.env.example` committed as a template showing required variable
  names without real values -- standard convention for projects using
  env vars

The local video feature makes this more immediately useful: a user
who clones LL and runs it locally gets full LL functionality on their
own video files, with no YouTube dependency, no Supabase account
needed for basic use (localStorage-only mode already works).

Supabase for contributors: anyone wanting the full persistence and
sharing features would need their own Supabase project. A setup guide
would be required. This is a manageable ask for a small community.

---

## Security: Supabase Credentials and RLS Policy

### What is and isn't in the public repo

- `.env.development` and `.env.production` are listed in `.gitignore`
  and are not tracked by git. They never appear in the public repo.
- Anyone who clones the repo gets no Supabase credentials and cannot
  connect to either the dev or prod database.

### The anon key is designed to be public

Vite bakes `import.meta.env.VITE_*` values into the JS bundle at
build time. The deployed production app therefore contains the
Supabase URL and anon key in its JavaScript -- readable by anyone
who opens DevTools or inspects the bundle.

This is correct and expected behavior. Supabase's anon (publishable)
key is analogous to a Firebase apiKey or a Stripe publishable key:
explicitly designed to live in browser code. The key is not a secret;
keeping it out of the bundle is neither possible nor necessary.

### What the anon key does and doesn't allow

The anon key grants access to whatever the RLS policies permit for
unauthenticated users -- no more. A determined person with the key
and URL can make Supabase API calls, but they are bounded by policy:

- They can INSERT into the `events` table (session_start,
  video_load). This is the intended behavior for anonymous app users.
  Abuse (e.g. flooding the table with fake events) is possible but
  only degrades analytics quality; it doesn't expose user data.
- They cannot SELECT, UPDATE, or DELETE events. No read access to
  other users' data.
- They cannot access tables with no anon policy at all.
- They cannot escalate to service-role access from the browser.

The one key that would be a real problem in the bundle is the
`service_role` key, which bypasses RLS entirely. That key lives
only in server-side or dashboard contexts and is never put in
browser code.

### Mitigation if abuse occurs

The current policy is reasonable for a small project. If flooding
or abuse of the anon INSERT permission became a concern:

- Supabase has configurable rate limiting (requests per second per
  IP) that can be tightened without any code changes.
- The events table INSERT policy could be tightened: for example,
  require a valid session_id format, or reject rows with unusual
  field values.
- In an extreme case the anon INSERT permission could be revoked
  entirely, at the cost of losing the Phase 1 metrics.

For the current scale and audience, none of these measures are
needed. The architecture is sound; the mitigations exist and are
tunable if conditions change.

