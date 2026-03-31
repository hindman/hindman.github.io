---
title: 'LoopLlama v2 — Help raw material'
permalink: /loopllama/v2/help-raw-material/
layout: single
published: false
toc: true
---

<!--

## Visual Timeline
## Flexible Time Inputs
## Operations
## The scratch-loop
## Why sign in? {#why-sign-in}
## Privacy Policy {#privacy-policy}
## Terms of Service {#terms-of-service}
## The LoopLlama banner
### Color fidelity notes
### Wikipedia links
### Notes on political associations
## Backend Persistence
### Supabase: how it works for users
### How it works for LL
### Identity providers
### Benefits and features
### User data persistence: cloud storage and multi-device issues
## LoopLlama Menu Philosophy

-->

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

LoopLlama is a browser-based YouTube music practice tool. Use it to loop
sections, set marks, and control playback while keeping your hands on the
guitar.

## Why sign in? {#why-sign-in}

Signing in with Google or GitHub lets you back up your videos, loops,
and marks to the cloud and restore them on any device. Your data is
stored privately — only you can access it.

Without signing in, everything is saved locally in your browser.
Local data persists across sessions but is tied to that browser and
device.

## Privacy Policy {#privacy-policy}

Last updated: March 2026

LoopLlama is a personal project hosted at hindman.github.io. This
policy describes how your data is handled.

**What we collect**

- If you sign in, we receive your email address and basic profile
  information from Google or GitHub (OAuth). This is used only to
  identify your account.
- Your app data (videos, loops, marks) is stored in your browser's
  localStorage and, if you choose to back up, in a private Supabase
  database associated with your account.

**What we don't do**

- We do not sell, share, or transfer your data to third parties.
- We do not use your data for advertising or analytics.
- We do not store payment information (The Llama will always be free!).

**Third-party services**

- Google and GitHub handle authentication. Their privacy policies
  apply to the sign-in process.
- Supabase stores cloud backups. See supabase.com/privacy for their
  policy.
- YouTube videos are played via the YouTube IFrame API. Google's
  privacy policy applies to video playback.

**Data deletion**

You can delete your cloud data at any time using the "Sign out and
remove cloud data" option in the Account menu. Local data can be
cleared via your browser's storage settings.

**Contact**

Questions? Open an issue at the
[project repository](https://github.com/mhindman/hindman.github.io)
or use the site contact page.

## Terms of Service {#terms-of-service}

Last updated: March 2026

LoopLlama is provided as-is, free of charge, with no warranty of
any kind. Use it at your own risk.

- The author makes no guarantees about uptime, data retention, or
  continued availability.
- You are responsible for maintaining your own backups of any data
  you care about.
- Misuse of the service (e.g., attempts to access other users' data)
  is prohibited.

By using LoopLlama, you agree to these terms.

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

## Backend Persistence

### Supabase: how it works for users

Users authenticate through LoopLlama using a "Sign in with X" button
(e.g., Google). Supabase orchestrates the OAuth handshake with the
chosen identity provider. Users never create a Supabase account --
Supabase is invisible to them. They just need an account with whatever
identity provider LL offers.

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

### Identity providers

Multiple sign-in options can be offered simultaneously (e.g., Google and
GitHub). Each is configured in the Supabase dashboard.

### Benefits and features

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

Privacy note: video_id and client_id are deliberately never stored
together. A per-user watch history -- even pseudonymous -- is contrary
to the intent of this data collection. Counts per video are sufficient
for the "popular videos" use case; linking them to device identities
is not needed and is avoided.

client_id lifecycle: generated once as a UUID, stored in localStorage.
Survives across sessions on the same device/browser. Does not survive
clearing browser storage. Is not connected to any real-world identity
unless the user later creates an account

session_id lifecycle: generated once per page load, stored in
sessionStorage. Cleared when the tab is closed.

### User data persistence: cloud storage and multi-device issues

LL does not attempt true multi-device sync. Cloud storage is a backup/restore
facility, not a live sync. The mental model: localStorage is your working
copy; the cloud is your saved copy, like a hard drive.

Each video object carries a last_modified timestamp (ms since epoch), updated
whenever the video's data changes.

Cloud read/write are explicit user operations (`dr` / `ds` / `dc`), not automatic.
This keeps the system honest: you control exactly when data moves to or from
the cloud.

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

Decision tables for ds, dr, and di:

    ds (local → cloud)

    Videos      | Edit in cloud
    -----------------------------------------------
    local-only  | Added
    local-newer | Replaced
    same        | No change
    cloud-newer | Replaced, or skipped — after prompt
    cloud-only  | Deleted, or kept — after prompt

    dr (cloud → local)

    Videos      | Edit locally
    -----------------------------------------------
    cloud-only  | Added
    cloud-newer | Replaced
    same        | No change
    local-newer | Replaced, or skipped — after prompt
    local-only  | Deleted, or kept — after prompt

    di (JSON → local): just like dr with JSON=cloud

    Videos      | Edit locally
    -----------------------------------------------
    JSON-only   | Added
    JSON-newer  | Replaced
    same        | No change
    local-newer | Replaced, or skipped — after prompt
    local-only  | Deleted, or kept — after prompt

## LoopLlama Menu Philosophy

NOUN → VERB structure

The menu label names the entity (the noun); menu items are verbs that act on
it. This makes the hierarchy meaningful rather than just a grouping
convenience.

Ellipsis = picker required

An ellipsis suffix signals that a picker or selection step will appear before
the action executes. No ellipsis means the action operates on the
current/implied entity immediately. This is a narrower use of the convention
than HIG — it does not apply to every dialog, only to operations that
require the user to select which entity to act on.

Menu context reduces label verbosity

Because the menu label establishes the noun, item labels need only be the
verb. "Delete video" becomes "Delete..." under the Video menu. Redundant
qualifiers ("current", "video", "section") are dropped.

Entity ownership resolves duplication

When an action could appear in multiple menus, it belongs in the menu whose
label names the primary noun. "Loop current section" belongs under Section,
not Loop. This eliminates cross-menu duplication and gives each menu a
coherent identity.

The Loop menu's noun is the scratch loop

Unlike other entity menus, Loop is centered on the scratch loop as its primary
subject. Named loops are accessed via Open... and Delete..., but Edit, Zoom,
and the source-management block all act on the scratch loop directly.

Footer messages carry explanatory load

Short or ambiguous labels (e.g. "Toggle timeline") are acceptable when the
footer provides context at the moment of use. Labels don't need to be
self-contained documentation.

Real estate is a constraint

Eight menus across a narrow header is the practical limit. The Help menu was
folded into App to preserve horizontal space. Brevity in labels serves the
same goal.

Menus do not duplicate main controls

Menu items do not perform actions that are directly available via the app's
main controls: play/pause; toggle looping; previous/next entity; etc.

