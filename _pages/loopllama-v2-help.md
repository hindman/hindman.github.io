---
title: 'LoopLlama Help'
permalink: /loopllama/v2/help/
layout: single
published: true
toc: true
toc_label: 'Contents'
toc_icon: 'guitar'
---

<!--

## Quick start {#quick-start}
## Videos
## Sections
## Chapters
## Marks
## Loops
### Saved loops
### Scratch loop
### Scratch operation {#scratch-loop}
### Scratch loop edit mode
### Scratch loop nudges
### Scratch loop sources
## Time and navigation
### The visual timeline
### More navigation
### Time input formats
## Data management
## Cloud storage and sign-in {#why-sign-in}
## App menu
## Miscellaneous
### Privacy policy {#privacy-policy}
### Terms of service {#terms-of-service}
### Contact
### The LoopLlama banner

-->

LoopLlama is a browser-based YouTube controller for close study of video
content. If you want to loop a passage, slow down or speed up a video, mark
moments to return to, or annotate a video's structure, LoopLlama is built for
that. A common use case is learning from instructional or performance videos —
a musician working through a song, for instance — but the app is not specific
to music or any other domain.

The keyboard-first design means you can drive the app efficiently:
Vim-inspired [key bindings](/loopllama/v2/keybindings/) cover every operation.
For those who prefer a mouse, the usual menus, buttons, and other controls,
plus a clickable visual timeline, provide the same access.

## Quick start {#quick-start}

<span class="ll-phead">Load URL</span>. To load a YouTube video into
LoopLlama, see the **Video › Load URL** menu item. Notice its two key
bindings: `vl` or `y`. When you run the operation, you can paste either a full
URL or just the YouTube video ID (an example to try: `QQ5XMmV7-bY`). After the
video loads, notice that video name and YouTube ID are shown in the
**Current** panel.

<span class="ll-phead">Basic controls</span>. Operations to play, pause, seek,
and adjust the playback speed are available in familiar buttons, text boxes,
and dropdowns in the app's main controls. Key bindings for the most common
actions are the following:

| Key     | Operation
| ------- | ---------------------
| `Space` | Play/pause
| `Left`  | Seek: backward
| `Right` | Seek: forward
| `Down`  | Seek delta: decrease
| `Up`    | Seek delta: increase
| `-`     | Speed: decrease
| `=`     | Speed: increase
| `jj`    | Jump to a time

<span class="ll-phead">Basic looping</span>. The controls in the **Scratch
Loop** area allow you to loop a specific part of a video. If looping is
toggled on, video playback and seek will adhere to the loop bounds: when the
playhead reaches the end it will wrap around to the loop start; and seek
movements will be confined to the loop boundaries. Here are the most important
key bindings:

| Key   | Scratch loop operation
| ----- | ------------------------------
| `xx`  | Toggle looping on/off
| `[[`  | Set loop start to current time
| `]]`  | Set loop end to current time

<span class="ll-phead">Informational elements</span>. The app provides
information in various ways.

  - **Current panel**: lists information about the current video.

  - **Timeline**: mimics the YouTube progress bar and provides a visual
    overview of the information the user has attached to the video; supports
    hover for information and click to jump.

  - **Controls**: hover to display labels and key bindings.

  - **Message footer**: displays informational, warning, and error messages,
    along with key binding continuation information.

<span class="ll-phead">Gotcha: app focus</span>. If you click anywhere in the
YouTube frame, the LoopLlama app loses focus and its key bindings become
inactive. When that occurs, a warning is shown in the footer. The fix is
simple: click anywhere in the app outside of the YouTube frame. The clickable
LoopLlama timeline makes clicking in the YouTube frame rarely necessary.

<span class="ll-phead">Entities: the next step</span>. For many users — those
who simply want to have a tool to loop or change the speed of YouTube videos
using an efficient user interface — everything you need to know has been
covered. But if you work with some videos in depth (for example, transcribing
a musical performance), being able to attach additional information to the
video is powerful. That information is organized around five types of
entities: videos, sections, chapters, marks, and loops.

## Videos

The first entity is obvious: videos. Once you open a YouTube video in
LoopLlama, the app remembers the video and how you last left it: the current
playhead position, the playback speed, the scratch loop endpoints, and any
other information about the entities that a video can have.

<span class="ll-phead">Load examples</span>. Use `he` for **Help › Load
examples**, which will load two example videos pre-configured with various
sections, chapters, marks, and loops. You can use those examples along with
the help documentation to learn how the app works.

| Example | Video          | Description
| ------- | -------------- | ------------------------------
| Ex1     | Catfish blues  | Song with all entities
| Ex2     | Edith Pageaud  | Concert with songs as chapters

<span class="ll-phead">Open</span>. Use `vo` for **Video › Open** to open a
video you loaded previously into LoopLlama.

<div class="notice--primary" markdown="1">

  **Key binding overview**. Bindings follow a 2-character system: (a) the
  first character is an entity prefix; (b) the second a mnemonic for the
  operation. For example, `vo` for **Video › Open** or `ce` for **Chapter ›
  Edit**. The most common operations also have shortcut bindings for easier
  typing (see the **Video** and **App** menus for several examples). The help
  documentation mainly use the formal two-character bindings.

</div>

<span class="ll-phead">Edit</span>. Use `ve` for **Video › Edit** to change
the video name (by default, the title provided by the YouTube player) or to
set custom start and end times for the video — for example, to exclude filler
material that you rarely watch when looping or zooming a video or when using
`Enter` to jump to its start.

<span class="ll-phead">Zoom</span>. Use `vz` for **Video › Zoom** to focus the
timeline view to a video's custom start-end range, if you have set one.

<span class="ll-phead">Scratch</span>. Use `vx` for **Video › Scratch** to
loop an entire video (or the range defined by its custom start/end values).
The [scratch operation](#scratch-loop) loads the start and end times into the
scratch loop — the app's work area for looping.

<span class="ll-phead">Info</span>. Use `vi` for **Video › Info** to see all
of the LoopLlama information about a video.

<span class="ll-phead">Delete</span>. Use `vd` for **Video › Delete**, which
allows you to select a video for deletion. The app also provides an operation
to [delete data in bulk](#bulk-delete) and an [unstash
operation](#video-unstash) to restore a previously deleted video.

<a id="video-unstash"></a><span class="ll-phead">Unstash</span>. Use `vu` for
**Video › Unstash**, which restores a video from a stashed copy. A stash is
created whenever a video is deleted (via **Video › Delete** or **Data ›
Delete**) or replaced (via **Data › Import**, **Data › Read from cloud**, a
prior **Video › Unstash**, or loading a share URL for a video already in your
library). The picker lists all stashed video copies, both for videos that
still exist in your library and for those that do not (the latter are marked
in the picker). For videos still in the library, the unstash is a swap: the
stashed copy becomes current and the current copy is saved as the new stash.

## Sections

Sections provide a way to divide a video into non-overlapping parts. What
those segments represent is up to you: a musician might label them Intro,
Verse, Chorus, Solo; someone studying a lecture might label them by topic; a
language learner might use them to mark speaker turns.

<span class="ll-phead">Create</span>. Use `ss` for **Section › Create**, which
creates a new section with its start at the playhead position. After creating
a section, notice the visual change in the timeline. The section end is
inferred from the start of the next section (or the video end).

<span class="ll-phead">Edit</span>. Use `se` for **Section › Edit**, mainly to
give the current section a name or to adjust its start/end values. The section
name will appear in the timeline area, below the blue progress bar.

<span class="ll-phead">Scratch</span>. Use `sx` for **Section › Scratch**,
which loads the section's start and end into the scratch loop.

<span class="ll-phead">Jump</span>. Use `sj` for **Section › Jump**, which
allows you to select any section and jump the playhead to its start.

<span class="ll-phead">Zoom</span>. Use `sz` for **Section › Zoom**, which
will focus the timeline on the current section. Use `sz` again to toggle the
section-zoom off (or `az` for **App › Zoom off** to turn off any kind of
zooming).

<span class="ll-phead">Fix end</span>. Use `sf` for **Section › Fix end**.
Although rarely needed, this operation converts the current section's end
point from an inferred value to an explicit value. This feature is needed only
if you want to organize a video into sections, but do not want the entire
video to be exhaustively covered by the sections you define. One consequence
of fixing a section's end is that the section will be protected from further
subdivision via `ss` for **Section › Create**.

<span class="ll-phead">Delete</span>. Use `sd` for **Section › Delete**,
which allows you to select a section for deletion.

<div class="notice--primary" markdown="1">

  **Menu ellipses**. On the Section menu, notice that **Delete** and **Jump**
  have trailing ellipses. That convention conveys that the operation will
  occur through an interactive picker where you first select the section to be
  deleted or jumped to. The other menu items have no ellipses, because they
  operate on the current section — meaning the one where the playhead sits.

</div>

## Chapters

Chapters are similar to sections: they divide a video into non-overlapping
parts; they support the same operations; and their key bindings are directly
parallel to the section bindings, but with the `c` prefix rather than `s`.

So if you understand sections, you also understand chapters. But there are two
differences worth pointing out:

<span class="ll-phead">Default timeline view</span>. By default, the timeline
area shows sections, not chapters. That view can be toggled via `at` for **App
› Toggle timeline**. LoopLlama will remember each video's most recent setting.
Regardless of the timeline's current display status, the current chapter and
section, if defined, are both listed in the **Current** panel.

<span class="ll-phead">Design intent</span>. The app was built with the
premise that chapters are bigger (for example, songs in a concert) and
sections are smaller (for example, the parts of a song), but you are not
required to follow that model.

## Marks

Marks are the simplest entities — nothing more than a time point. They are
displayed as yellow dots in the timeline, below the sections/chapters. The
operations and key bindings are simple and follow the conventions already
established for sections and chapters (see the **Mark** menu).

## Loops

The entity tour postponed loops until the end because they sit at the center
of the app's mission. There are several sub-topics to cover.

### Saved loops

Saved loops are similar to chapters and sections in that they define a range
via their start and end. They are more generic because their purpose is not to
partition a video into non-overlapping parts: saved loops can overlap. They
are displayed at the bottom of the timeline area as brown line segments (below
sections, chapters, and marks).

The key bindings and menu items for saved loops are similar to those for
sections and chapters.

<span class="ll-phead">Create</span>. Use `ll` for **Loop › Create**, which
creates a new saved loop using the current bounds of the scratch loop.

<span class="ll-phead">Edit</span>. Use `le` for **Loop › Edit** to edit the
current loop's name or adjust its bounds. As with other entities, current is
defined by playhead position.

<span class="ll-phead">Jump</span>. Use `lj` for **Loop › Jump** to select
a saved loop and move the playhead to its start.

<span class="ll-phead">Zoom</span>. Use `lz` for **Loop › Zoom** to focus
the timeline on the bounds of the current saved loop.

<span class="ll-phead">Delete</span>. Use `ld` for **Loop › Delete** to
select a saved loop for deletion.

<span class="ll-phead">Scratch</span>. Use `lx` for **Loop › Scratch** to load
the current loop's bounds into the scratch loop — our next topic.

### Scratch loop

As noted above, the scratch loop is the active working area for looping. The
main looping controls were covered in the [Quick start](#quick-start).

When the scratch loop bounds produce a valid loop — meaning start less than
end — the text boxes display the values in regular font. When the bounds are
invalid, the font is red and the app disallows toggling looping on or creating
a new saved loop based on those bounds.

### Scratch operation {#scratch-loop}

As mentioned in the documentation for sections, chapters, and saved loops,
entities with a start and end support the scratch operation, which loads the
bounds of a saved entity into the scratch loop work area.

Although the terminology is idiosyncratic, the app's menu labeling and key
binding scheme benefit from keeping a clear distinction between saved loops
and the scratch loop.

| Loop type     | Menu      | Binding prefix
| ------------- | --------- | --------------
| Saved loop    | Loop      | `l`
| Scratch loop  | Scratch   | `x`

### Scratch loop edit mode

Although you can edit bounds directly via the scratch loop controls, LoopLlama
also provides a special keyboard mode to make such adjustments. The mode can
be invoked via `xe` for **Scratch › Edit**.

After the mode is invoked, the scratch loop's start point will have focus
(notice the yellow border). In the message footer, the available key bindings
are listed, with the most important controls being the following:

| Key           | Operation
| ------------- | ------------------------------
| `Left`        | Decrease active bound
| `Right`       | Increase active bound
| `Down`        | Decrease left/right delta
| `Up`          | Increase left/right delta
| `Tab`         | Toggle focus between start/end
| `Space`       | Play/pause near active bound
| `Enter`       | Exit edit mode
| `Esc`         | Exit edit mode

As noted, `Space` will play/pause the video near the active bound. The purpose
is to allow you to adjust a boundary, then play the video to assess whether
more fine-tuning is needed.

### Scratch loop nudges

In addition to scratch loop edit mode, the app also supports a coherent set of
key bindings to make quick adjustments to the loop bounds. If you hover over
the **Now** buttons, notice that `[[` is the binding to set the start to the
playhead position and `]]` sets the end. The nudge key bindings build on that
convention: `[` is the prefix for start, `]` for end. See the [nudge key
bindings](/loopllama/v2/keybindings/#nudge-bindings) for a full listing. The
most commonly used bindings are these:

| Key    | Operation
| ------ | ---------------------
| `[-`   | Start: nudge decrease
| `[=`   | Start: nudge increase
| `]-`   | End: nudge decrease
| `]=`   | End: nudge increase

The nudge operation has one special wrinkle to support the rapid creation of
loops. This behavior is best explained via an example.

1. <span class="ll-phead">Initial</span>. The scratch loop start and end are a
   short distance apart, near the beginning of a video. The playhead is near
   the video end.

2. <span class="ll-phead">Set start</span>. To create a short loop starting at
   the playhead, press `[[` to set the scratch loop start.

3. <span class="ll-phead">Regular nudge</span>. Consider what happens if the
   user presses `]=` to perform a nudge increase on the end. A regular nudge
   would shift the end to the right, leaving an invalid loop (assume the delta
   is at a typical value like 5s).

4. <span class="ll-phead">Relative nudge</span>. This operation applies the
   delta relative to the loop's other bound. In our example, the end nudge
   would be applied relative to the start. The result would be a legal loop,
   so the app would apply this nudge.

        _____________________________
          S     E              ^        (1) Initial

        _____________________________
                E              S        (2) Set start


        _____________________________
                    E          S        (3) Regular nudge: invalid loop


        _____________________________
                               S   E    (4) Relative nudge: valid loop

The key intuition is that nudges have a bias toward creating legal loops. The
app calculates the result for both regular and relative nudges and stops at
the first method that produces a valid loop. The methods are attempted in this
order: regular, then relative, with fallback to regular if both methods result
in invalid loops.

### Scratch loop sources

As mentioned above, the **Scratch** operation loads the bounds of a saved
entity into the scratch loop. Using Ex1, navigate to section "A1" and then
press `sx` to scratch the current section. There are several things to notice:

  - <span class="ll-phead">Looping</span>. Toggled on.

  - <span class="ll-phead">Current Panel</span>. Indicates the name and range
    of the scratch loop source.

  - <span class="ll-phead">Scratch bounds larger than source</span>. The
    scratch loop bounds are set slightly larger than the source bounds. This
    is done to provide a small bit of lead-in and lead-out time as you play
    the loop. Loop padding is done for sections and chapters, but not for
    saved loops. You can adjust the padding via [Options](#app-options).

  - <span class="ll-phead">Yellow bound when playhead outside source</span>.
    Press `Space` to play the video and then `Enter` to jump to the loop
    start. After you do that, notice that whenever the playhead sits in the
    padded region beyond the source bounds, the relevant scratch loop bound is
    highlighted yellow.

  - <span class="ll-phead">Yellow **Current** panel range when scratch and
    source diverge</span>. If you modify the scratch loop bounds, notice that
    the time range in the **Current** panel is displayed in yellow font.

When the scratch loop has a source, additional operations are available:

  - <span class="ll-phead">Save to source</span>. Press `xs` to update the
    source entity's bounds based on the current scratch loop bounds (after
    controlling for padding, where applicable).

  - <span class="ll-phead">Reset to source</span>. Press `xr` to return the
    scratch loop bounds to match those of the source.

  - <span class="ll-phead">Unlink source</span>. Press `xu` to remove the
    source linkage: after that the scratch loop will have no connection to the
    source and it will behave as if you had set the bounds manually.

## Time and navigation

### The visual timeline

The timeline sits below the video and provides a visual overview of the
information attached to it. It has four horizontal zones stacked top to
bottom. Both for the progress bar and saved entities — sections, chapters,
marks, and loops — hover to display name and time information.

<span class="ll-phead">Playhead zone</span>. Mimics the YouTube progress bar:
a thick line with a dot marking the playhead. The elapsed portion is blue, the
remainder gray.

<span class="ll-phead">Section/chapter zone</span>. Displays sections or
chapters as shaded regions. Press `at` for **App › Toggle timeline** to change
the display.

<span class="ll-phead">Mark zone</span>. Displays marks as yellow dots.

<span class="ll-phead">Loop zone</span>. Displays loops as colored line
segments: blue for the scratch loop, brown for saved loops.

### More navigation

Basic playback and navigation is available in the app's main controls and was
covered in the [Quick Start](#quick-start): play, pause, speed control,
seeking, and jumping to specific times or entities. LoopLlama supports a few
other navigational methods:

<span class="ll-phead">Jump to start</span>. Press `Enter` to jump the
playhead to the "start", which is contextual: start of scratch loop, if
looping; start of zoom, if zoomed; otherwise, start of video.

<span class="ll-phead">Jump to previous/next entity</span>. Near the app's
seek controls are buttons and a dropdown to support navigation by entity. The
dropdown (accessible via the `/` binding) controls the entity type. The
previous/next buttons surrounding the dropdown (or the `,` and `.` bindings)
allow you to navigate efficiently to the start of the previous/next chapter,
section, loop, or mark.

<a id="jump-history"></a><span class="ll-phead">Jump history</span>.
Navigational jumps of more than 15 seconds are stored in a jump history that
you can traverse. Although the history holds up to the last 40 jumps for a
video, the primary intent is to allow a user to return to their prior location
after an inadvertent jump. The jump history operations and key bindings are
listed on the **App** menu.

<span class="ll-phead">Super slow motion</span>. To examine a video in super
slow motion, a useful technique is to pause the video, set the seek-duration
to 0.1 seconds, and then "watch" the video (without sound) using the
`Left`/`Right` arrows.

### Time input formats

LoopLlama supports various time input styles:

| Format           | Example   | Note
| ---------------- | --------- | -----------
| mm:ss            | 32:45     | .
| hh:mm:ss         | 1:13:28   | .
| Raw mm:ss        | 73:44     | 1:13:44
| Raw seconds      | 245       | 4:05
| Decimal seconds  | 34:43.2   | 1 digit max
| Forward slash    | 7/44      | 7:44

## Data management

LoopLlama provides several ways to share your LoopLlama data with others,
backup your data to your computer, sync your data across multiple browsers and
devices, or perform bulk deletions.

<span class="ll-phead">Share video</span>. Use `dv` for **Data › Share video**
to copy a LoopLlama sharing URL to your clipboard. Anyone with the URL can get
a copy of your data for that video loaded into their LoopLlama. If the URL
recipient already has the same video in their library, the app will warn them
and offer a chance to skip the URL or replace their video information with the
shared information. If the recipient selects replace, their video information
is first stashed, allowing them to review your shared data and later use
**Video › Unstash** to return to their prior data.

<span class="ll-phead">Share scratch loop</span>. Use `dx` for **Data › Share
scratch loop**, which is like **Share video**, but the data covers only the
scratch loop bounds.

<span class="ll-phead">Export</span>. Use `de` for **Data › Export** to save
your LoopLlama data as a JSON file. If you understand how to use the app, the
data in the file will make sense.

<span class="ll-phead">Import</span>. Use `di` for **Data › Import**, which
performs that process in reverse: load the data from an exported JSON file
into LoopLlama — for example on a different browser or computer (see [data
review](#data-review)). The export-import operations can also be used to
create a snapshot of your LoopLlama data before making experimental edits that
you might want to reverse in bulk.

<div class="notice--primary" markdown="1">

  <a id="data-review"></a>**Data review**. Before applying **Import**, **Save
  to cloud**, and **Read from cloud**, LoopLlama opens a review dialog with a
  full inventory of your videos. Each video is classified into one of five
  categories based on whether it exists in the source, the destination, or
  both — and if both, which copy carries the more recent last-modified
  timestamp. The categorties are: source only, source newer, destination only,
  destination newer, and same last-modified. Each category has a toggle
  controlling whether the operation acts on those videos, with defaults biased
  toward keeping newer data over older. You can review, adjust any toggle, and
  apply the operation or cancel. Any time the operation replaces a video,
  LoopLlama stashes a copy of the prior version for recovery (see
  [Unstash](#video-unstash)).

</div>

<span class="ll-phead">Inspect</span>. Use `dI` for **Data › Inspect**,
which displays your LoopLlama data directly in the browser.

<a id="bulk-delete"></a><span class="ll-phead">Bulk deletion</span>. Use `d⌫`
for **Data › Delete** to delete data in bulk — either entire videos or the
entities within a single video. Deleted videos can be restored via
[Unstash](#video-unstash).

## Cloud storage and sign-in {#why-sign-in}

<span class="ll-phead">Sign-in is optional</span>. LoopLlama does not require
sign in, but signing in with Google or GitHub lets you back up your LoopLlama
data to the cloud — providing a more convenient insurance mechanism against
lost data (for example, caused by clearing your browser cache) and a simpler
way to coordinate LoopLlama usage across multiple browsers or devices.

<span class="ll-phead">Cloud as hard drive</span>. LoopLlama's cloud storage
is a backup-restore facility, not a true multi-device sync. The correct mental
model for this feature is cloud as hard drive: the browser's localStorage is
your working copy; the cloud is a saved copy. Multi-device users can use
LoopLlama successfully if they organize their saves and reads to align with
their device switches.

<span class="ll-phead">Save to cloud</span>. Use `ds` for **Data › Save to
cloud**, which writes library data to the cloud (see [data
review](#data-review)).

<span class="ll-phead">Read from cloud</span>. Use `dr` for **Data › Read
from cloud**, which writes cloud data to your library (see [data
review](#data-review)).

<span class="ll-phead">Compare</span>. Use `dc` for **Data › Compare**, which
opens an informational review showing an inventory of your videos across the
same five categories as the [data review](#data-review) — without any toggles
or action.

<span class="ll-phead">Remove cloud data</span>. See **Account** menu to sign
out and remove all of your cloud data.

## App menu

The **App** menu contains a variety of operations and settings. [Jump
history](#jump-history) has already been covered. The others are the
following:

<span class="ll-phead">Undo</span>. Use `au` for **App › Undo** to reverse a
prior edit to the current video. LoopLlama stores data snapshots for the 20
most recent edits. Snapshotting covers explicit changes to the current video —
its attributes and edits to its chapters, sections, loops, and marks. It does
not cover routine navigation or adjustments to playback and looping controls
(current location and speed, jump history, navigation settings, scratch loop
bounds), even though those settings are remembered per video. Changing the
current video clears the edit history.

<span class="ll-phead">Redo</span>. Use `ar` for **App › Redo** to apply an
edit that was undone.

<span class="ll-phead">Clear history</span>. Use `a⌫` for **App › Clear
history** to discard the undo and redo stacks entirely. This operation is
not undoable.

<span class="ll-phead">Recall message</span>. Use `am` for **App › Recall
message** to recall the most recent message emitted in the message footer.

<span class="ll-phead">Copy time</span>. Use `ac` for **App › Copy time** to
copy the current playhead time to the clipboard.

<span class="ll-phead">Toggle timeline</span>. Use `at` for **App › Toggle
timeline** to change whether the timeline displays sections or chapters.

<span class="ll-phead">Zoom off</span>. Use `az` for **App › Zoom off** to
turn off any type of timeline zoom (video, chapter, section, saved loop, or
scratch loop).

<a id="app-options"></a><span class="ll-phead">Options</span>. Use `ao` for
**App › Options** to customize various settings. Three of the settings are
per-video defaults: applied when you first load a new video, then remembered
per video.

  - Seek delta default: the number of seconds used when seeking
    backward/forward.

  - Loop nudge delta default: the number of seconds used when nudging the
    bounds of the scratch loop.

  - Speed delta default: the number of percentage points applied when
    decreasing/increasing playback speed.

The other options are global:

  - Seek delta choices: the values in the seek delta dropdown.

  - Loop nudge delta choices: the values in the loop nudge delta dropdown.

  - Loop pad start/end: the number of extra seconds added before and after a
    section or chapter when you load it into the scratch loop.

## Miscellaneous

### Privacy policy {#privacy-policy}

<span class="ll-phead">Personal project</span>. LoopLlama is a personal
project managed and designed by me, Monty Hindman. I wrote the v1 code; v2
code was written entirely by Claude Code. Although simply a personal project,
it is nonetheless serious: a great deal of care was put into planning its
features, designing its user experience, and checking that the app functions
correctly.

<span class="ll-phead">Hosting</span>. The project is hosted by GitHub, as
part of its GitHub Pages feature.

<span class="ll-phead">YouTube handles the videos</span>. YouTube provides and
streams all video content via its standard embed API. LoopLlama simply uses
that API.

<span class="ll-phead">Browser storage by default</span>. Your LoopLLama data
is stored only in your web browser, in [localStorage][localStorage]. The app
does not use cookies.

<span class="ll-phead">Transparent</span>. The data that LoopLlama stores can
be viewed directly via `de` for **Data › Export**. The resulting JSON file
provides an accurate representation of your LoopLLama data.

<span class="ll-phead">Cloud backup is optional</span>. If you sign-in via
Google or GitHub, LoopLLama backs up your data in the cloud, using
[Supabase][supabase], which offers a free database service for small projects
like LoopLLama.

<span class="ll-phead">Authentication via known, reliable
third-parties</span>. LoopLLama does not manage user authentication or know
anything about your credentials. Those details are handled by the
authentication provider you choose — Google or GitHub.

<span class="ll-phead">LoopLLama does not store your email address</span>.
None of the LoopLLama database tables contain your email address. The table
holding a backup copy of your LoopLLama data does have an ID that can be
linked to a Supabase table holding your email address (Supabase needs to store
that email to ensure that only the properly authenticated user can access your
data). But the LoopLLama project will never issue queries linking your email
address and your cloud backup, other than to investigate problems or requests
initiated by you.

<span class="ll-phead">Cloud data is not shared</span>. The copy of your
LoopLLama data stored in the cloud requires valid authentication to access.
That means other internet users cannot access it, unless you share your
credentials with them.

<span class="ll-phead">Cloud data can be accessed by infrastructure
staff</span>. The LoopLLama app, and developers on the LoopLLama project, can
access your data. But the project commits to access this information only for
the purpose of allowing the app to function or to investigate specific
problems or requests submitted by you to the LoopLLama team. Similarly, some
Supabase staff can access the data in the LoopLLama database, but their access
is governed in similar ways by Supabase policies.

<span class="ll-phead">User-driven access to your cloud data</span>. The
LoopLLama app interacts with your cloud data only in response to your explicit
requests to save your browser data to the cloud or to read data from the cloud
into your browser.

<span class="ll-phead">Cloud data can be removed</span>. You can remove your
cloud data at any time (see the **Account** menu).

<span class="ll-phead">No user-data tracking</span>. LoopLLama does not use
cookies and does not sell, share, or transfer your data to any third parties —
other than backing up your data in Supabase, as noted above. The application
does track some events for the purpose of collecting aggregate metrics for the
project, specifically (1) when a user starts a new LoopLLama session and (2)
when a user loads a new YouTube URL. In that data, the user is represented by
a client ID, which is simply a random ID stored in your browser that helps us
count approximate unique visitors. That ID is not linked to your identity.
Further, in the data that holds the URL for newly loaded YouTube videos, the
app purposely omits the client ID.

<span class="ll-phead">Shared data is publicly available, but opaque</span>.
If you ask LoopLLama to create a URL to share either a video or a scratch
loop, the shared data can be accessed by anyone with the correct URL. That URL
includes a random ID generated by the app, so it is not something anyone can
guess or tie to your identity.

<span class="ll-phead">LoopLlama is free</span>. We do not charge to use the
app and do not rely on advertising. The project has no commercial
relationships of any kind. Cloud backup is provided via a free tier from
Supabase. If the volume of cloud usage becomes prohibitively large — very
unlikely — the app might need to charge for cloud backup in the future, but
the project has every intention to avoid that scenario.

### Terms of service {#terms-of-service}

LoopLlama is provided as-is, free of charge, with no warranty of any kind. By
using LoopLlama, you agree to these terms: (1) the author makes no guarantees
about uptime, data retention, or continued availability; (2) you are
responsible for maintaining your own backups of any data you care about; and
(3) misuse of the service — such as attempts to access other users' data — is
prohibited.

### Contact

If you have questions, comments, problems to report, or features to request
you can file an issue via the project's [GitHub codebase][github_code]. You
can also contact Monty Hindman directly, as [detailed here][mh_contact].

### The LoopLlama banner

The colored banner at the top of the page is a composite drawn from the visual
traditions of movements that fought against fascism and authoritarianism. The
color order reads as a loose narrative arc, from the darkest symbols of
resistance toward warmer symbols of hope.

<span class="ll-phead">Black</span>. Anarchism and anarcho-syndicalism, the
oldest visual language of anti-fascist organizing.

<span class="ll-phead">Deep red</span>. Organized labor and the socialist
left, broadly construed — a color that runs through more anti-authoritarian
traditions than any other.

<span class="ll-phead">Purple</span>. The Second Spanish Republic, whose
defense drew volunteers from dozens of countries — perhaps the broadest
anti-fascist coalition before World War II.

<span class="ll-phead">White</span>. Peace and nonviolent resistance — the
center band, as a pivot between the harder symbols and the warmer ones.

<span class="ll-phead">Gold</span>. The German democratic tradition — colors
the Nazis rejected and the Federal Republic later reclaimed.

<span class="ll-phead">Forest green</span>. Pan-African resistance and the
struggle against colonial and racial authoritarianism.

<span class="ll-phead">Blue</span>. The liberal democratic tradition — from
the Enlightenment through the American and French revolutions, upheavals that
shared the conviction that legitimate power derives from the consent of the
governed, not the will of a ruler.

In the past quarter century, the long trend toward democratization has slowed
or reversed, most notably in the United States — not only my own country but
also the nation that most symbolized democratic governance, due to its
pioneering liberal-democratic revolution and its economic, military, and
cultural dominance since World War I. Authoritarian politics is not inherently
a phenomenon of the right, but recent anti-democratic movements have come
predominantly from the populist right. The LoopLlama banner is intended as a
symbolic gesture of resistance — to authoritarianism generally, and to its
modern rightwing variants specifically.

--------

[localStorage]: https://en.wikipedia.org/wiki/Web_storage
[supabase]: https://supabase.com/
[github_code]: https://github.com/hindman/hindman.github.io
[mh_contact]: https://hindman.github.io/about/#contact

