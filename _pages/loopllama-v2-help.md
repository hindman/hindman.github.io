---
title: 'LoopLlama v2 — Help'
permalink: /loopllama/v2/help/
layout: single
published: true
toc: true
toc_label: 'Contents'
toc_icon: 'guitar'
---

<!--

__HERE__
### Cloud Storage and Sign-In {#why-sign-in}

__MENU_ARROW__
Video › Scratch


Notice syntax/styles:

  - Simple marker before the target paragraph.

      gray/blue-gray | {: .notice}          | .
      forest/teal    | {: .notice--primary} | info items
      steel-blue     | {: .notice--info}    | .
      brown/amber    | {: .notice--warning} | .
      red            | {: .notice--danger}  | warnings
      green          | {: .notice--success} | success advice

  - Enclose multiple paragraphs as the target:

      <div class="notice--primary" markdown="1">
      Blah blah
      </div>

Linking:

  - Link to headings:

      ### Foo-bar heading {#blort-x}

      Later ... blah blah, see [foo-bar](#blort-x)

  - Link to raw paragraphs: must use HTML directly:

      <a id="blort-x"></a> Blort-X. Blah blah
      blah blah.

-->

## What is LoopLlama?

LoopLlama is a browser-based YouTube controller for close study of video
content. If you want to loop a passage, slow down or speed up a video, mark
moments to return to, or annotate a video's structure, LoopLlama is built for
that. A common use case is learning from instructional or performance videos —
a musician working through a song, for instance — but the app is not specific
to music or any other domain.

The keyboard-first design means you can drive the app efficiently:
Vim-inspired key bindings cover every operation. For those who prefer a mouse,
the usual menus, buttons, and other controls, plus a clickable visual
timeline, provide the same access.

## Quick start {#quick-start}

<span class="ll-phead">Load URL</span>. To load a YouTube video into
LoopLlama, see the **Video › Load URL** menu item. Notice its two key
bindings: `vl` or `y`. When you run the operation, you can paste either a full
URL or just the YouTube video ID (an example to try: `QQ5XMmV7-bY`). After the
video loads, notice that video name and YouTube ID are shown in the Current
panel.

<span class="ll-phead">Basic controls</span>. Operations to play, pause, seek,
and adjust the playback speed are available in familiar buttons, text boxes,
and dropdowns in the app's main controls. Key bindings for the most common
actions are the following:

| Keys    | Operation
| ------- | ---------------------
| `Space` | Play/pause
| `Left`  | Seek: backward
| `Right` | Seek: forward
| `Down`  | Seek delta: decrease
| `Up`    | Seek delta: increase
| `-`     | Speed: decrease
| `=`     | Speed: increase
| `jj`    | Jump to a time

<span class="ll-phead">Basic looping</span>. The controls in the Scratch Loop
area allow you to loop a specific part of a video. If looping is toggled on,
video playback and seek will adhere to the loop bounds: when the playhead
reaches the end it will wrap around to the loop start; and seek movements will
be confined to the loop boundaries. Here are the most important key bindings:

| Keys  | Scratch loop operation
| ----- | ------------------------------
| `xx`  | Toggle looping
| `[[`  | Set loop start to current time
| `]]`  | Set loop end to current time

<span class="ll-phead">Informational elements</span>. The app provides
information in various ways.

  - Current panel: lists information about the current video.

  - Timeline: mimics the YouTube progress bar and provides a visual overview
    of the information the user has attached to the video; supports hover for
    information and click to jump.

  - Controls: hover to display labels and key bindings.

  - Message footer: displays informational, warning, and error messages, along
    with key binding continuation information.

<span class="ll-phead">Gotcha: app focus</span>. If you click anywhere in the
YouTube frame, the LoopLlama app loses focus and its key binding become
inactive. When that occurs, a warning is shown in the footer. The fix is
simple: click anywhere in the app outside of the YouTube frame. The clickable
LoopLlama timeline makes clicking in the YouTube frame rarely necessary.

## Entities

For many users — those who simply want to have tool to loop or change the
speed of YouTube videos using an efficient user interface — everything you
need to know was covered in the Quick Start. But if you need to work with a
video in-depth (for example, transcribing a musical performance) being able to
attach additional information to the video is powerful. That information is
organized around five types of entities: videos, sections, chapters, marks,
and loops.

### Videos

The first entity is obvious: videos. Once you open a YouTube video in
LoopLlama, the app remembers the video and how you last left it: the current
playhead position, the playback speed, the scratch loop endpoints, and any
other information about the entities that a video can have.

To load some example videos pre-configured with various entities press `ae`
for **App › Load examples**.

| Example | Description
| ------- | --------------------------------
| Ex1     | One song, with sections
| Ex2     | Concert, with songs as chapters

<span class="ll-phead">Open</span>. Use `vo` for **Video › Open** to open a
video you loaded previously into LoopLlama.

<div class="notice--primary" markdown="1">

  **Key binding overview**. Bindings follow a 2-character system: (a) the
  first character an entity prefix; (b) the second a mmenomic for the
  operation. For example, `vo` for **Video › Open** and `ae` for **App › Load
  examples**. The most common operations also have shortcut bindings for
  easier typing (see the Video and App menus for several examples). The help
  documentation will tend to use the formal two-character bindings.

</div>

<span class="ll-phead">Edit</span>. By default the video name is set to the
title provided by the YouTube player. Use `ve` for **Video › Edit** to change
the name or to set custom start and end times for the video — for example, to
exclude filler material that you rarely need to watch.

<span class="ll-phead">Zoom</span>. If a video has custom values for start or
end, you can use `vz` for **Video › Zoom** to focus the timeline view to that
range.

<span class="ll-phead">Scratch</span>. Use `vx` for **Video › Scratch** to
loop an entire video (or the range defined by its custom start/end values).
The [Scratch operation](#scratch-loop) loads the start and end times into the
scratch loop — the app's work area for looping.

<span class="ll-phead">Info</span>. Use `vi` for **Video › Info** to see all
of the LoopLlama information about a video.

<span class="ll-phead">Delete</span>. Use `vd` for **Video › Delete**, which
allows you to select a video for deletion. The app also provide an operation
to [delete data in bulk](#bulk-delete).

<span class="ll-phead">Unstash</span>. See the discussion on [cloud
backups](#unstash-operation) for details.

### Sections

Sections provide a way to divide a video into non-overlapping parts. What
those segments represent is up to you: a musician might label them Intro,
Verse, Chorus, Solo; someone studying a lecture might label them by topic; a
language learner might use them to mark speaker turns.

<span class="ll-phead">Create</span>. Creating a section is done by
positioning the playhead at it start and pressing `ss` for **Section ›
Create**. The section now exists (notice the visual change in the timeline).
The section end is inferred from the start of the next section (or the video
end).

<span class="ll-phead">Edit</span>. Use `se` for **Section › Edit**, mainly
to give the current secton a name or to adjust its start/end values. The
section name will appear in the timeline area, below the blue progress bar.

<span class="ll-phead">Scratch</span>. Use `sx` for **Section › Scratch**,
which loads the sections start and end into the scratch loop. Give that a try
with Ex1: navigate the playhead anywhere within a section, press `sx`, and
then press `xx` to toggle looping on.

<span class="ll-phead">Jump</span>. Use `sj` for **Section › Jump**, which
allows you to select any section and jump the playhead to its start.

<span class="ll-phead">Zoom</span>. To study a section in depth, use `sz` for
**Section › Zoom**, which will focus the timeline on the current section.
Use `sz` again to toggle the section-zoom off (or `az` to turn off any kind of
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

  **Menu elipses**. On the Section menu, notice that **Delete** and **Jump**
  have a trailing elipses. That convention conveys that the operation will
  occur though an interactive picker where you first select the section to be
  deleted or jumped to. The other menu items have no elipses, because they
  operate on the current section — meaning the one where the playhead sits.

</div>

### Chapters

Chapters are similar to sections: they divide a video into non-overlapping
parts; they support the same operations; and their key bindings are directly
parallel to the section bindings, but with the `c` prefix rather than `s`.

So if you understand sections, you also understand chapters. But there are two
differences worth pointing out:

<span class="ll-phead">Default timeline view</span>. By default, the timeline
area shows sections, not chapters. That view can be toggled via `at` and
LoopLlama will remember each video's most recent setting. Switch to Ex2.
Notice that regardless of the timeline's current display, the current chapter
and section, if defined, are both listed in the Current panel.

<span class="ll-phead">Design intent</span>. The app was built with the
premise that chapters are bigger (for example, songs in a concert) and
sections are smaller (for example, the parts of a song), but you are not
required to follow that model.

### Marks

Marks are the simplest entities — nothing more than a time point. They are
displayed as yellow dots in the timeline, below the sections/chapters. The
operations and key bindings are simple and follow the conventions already
established for sections and chapters (see the Mark menu).

### Loops

The entity tour postponed loops until the end because they sit at the center
of the app's mission. There are several sub-topics to cover.

#### Saved loops

Saved loops are similar to chapters and sections in that they define a range
via their start and end. They are more generic because their purpose is not to
partition a video into non-overlapping parts: saved loops can overlap. They
are displayed at the bottom of the the timeline area as brown line segments
(below sections, chapters, and marks).

The key bindings and menu items for saved loops are similar to those for
sections and chapters.

<span class="ll-phead">Create</span>. Use `ll` for **Loop › Create**, which
creates a new saved loop using the current bounds of the scratch loop.

<span class="ll-phead">Edit</span>. Use `le` for **Loop › Edit** to edit the
current loop's name or adjust its bounds. As with other entities, current is
defined by playhead position.

<span class="ll-phead">Jump</span>. Use `lj` for **Loop › Jump**, to select
a saved loop and move the playhead to its start.

<span class="ll-phead">Zoom</span>. Use `lz` for **Loop › Zoom**, to focus
the timeline on the bounds of the current saved loop.

<span class="ll-phead">Delete</span>. Use `ld` for **Loop › Delete**, to
select a saved loop for deletion.

<span class="ll-phead">Scratch</span>. Use `lx` for **Loop › Scratch**,
which will load the current loop's bounds into the scratch loop — our next
topic.

#### Scratch loop

As noted above, the scratch loop is the active working area for looping. The
main looping controls were convered in the [Quick start](#quick-start).

When the scratch loop bounds produce a valid loop — meaning start less than
end — the text boxes display the values in regular font. When the bounds are
invalid, the font is red and the app disallows toggling looping on or creating
a new saved loop based on those bounds.

#### Scratch operation {#scratch-loop}

As mentioned in the documentation for sections, chapters, and saved loops,
entities with a start and end support the scratch operation, which loads the
bounds of a saved entity into the scratch loop work area.

Although the terminology is idiosyncratic, the app's menu labeling and key
binding scheme benefit from keeping a clear distinction between saved loops
and the scratch loop.

| Loop type     | Menu      | Binding prefix
| ------------- | --------- | --------------
| Saved loop    | Loop      | l
| Scratch loop  | Scratch   | x

#### Scratch loop edit mode

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

#### Scratch loop nudges

In addition to scratch loop edit mode, the app also supports a coherent set of
key bindings to make quick adjustments to the loop bounds. If you hover over
the **Now** buttons, notice that `[[` is the binding to set the start to the
playhead position and `]]` sets the end. The nudge key bindings build on that
convention: `[` is the prefix for start, `]` for end. See the nudge [key
bindings][/loopllama/v2/keybindings/#nudge-bindings] for a full listing. The
most commonly used bindings are these:

| Key    | Operation
| ------ | ---------------------
| `[-`   | Start: nudge decrease
| `[=`   | Start: nudge increase
| `]-`   | End: nudge decrease
| `]=`   | End: nudge increase

The nudge operation has one special wrinkle to support the rapid creation of
loops. This behavior is best explained via an example.

1. Initially, the scratch loop start and end are a short distance apart, near
   the beginning of a video. The playhead is near the video end.

2. To create a short loop starting at the playhead, you can press `[[` to set
   the scratch loop start.

3. Consider what happens if the user presses `]=` to perform a nudge increase
   on the end. A *regular nudge* would shift the end to the right, leaving an
   invalid loop (assume the delta is at a typical value like 5s).

4. But a *relative nudge* is different: it applies the delta relative to the
   loop's other bound. In our example, the end nudge would be applied relative
   to the start. The result would be a legal loop, so the app would apply this
   nudge.

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

#### Scratch loop sources

As mentioned above, the **Scratch** operation loads the bounds of a saved
entity into the scratch loop. Using Ex2, press `sx` to scratch the current
section. There are several things to notice:

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

  - <span class="ll-phead">Yellow Current Panel range when scratch and source
    diverge</span>. If you modify the scratch loop bounds, notice that the
    time range in the Current Panel is displayed in yellow font.

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
marks, and loops — hover to display time and name information.

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

<span class="ll-phead">Jump to previous/next entity</span>. To the right of
the app's seek controls are buttons and a dropdown to support navigation by
entity. The dropdown (accessible via the `/` binding) controls the entity
type. The previous/next buttons surrounding the dropdown (or the `,` and `.`
bindings) allow you to navigate efficiently to the start of the previous/next
chapter, section, loop, or mark.

<span class="ll-phead">Jump history</span>. Navigational jumps of more than 15
seconds are stored in a jump history that you can traverse. Although the
history holds up to the last 40 jumps for a video, the primary intent is to
allow a user to return to their prior location after an inadvertent jump. The
jump history operations and key bindings are listed on the App menu.

### Time input formats

LoopLlama supports various time input styles:

| Format           | Example   | Note
| ---------------- | --------- | -----------
| mm:ss            | 32:45     | .
| hh:mm:ss         | 1:13:28   | .
| condensed forms  | 73:44     | 1:13:44
| raw seconds      | 245       | 4:05
| decimal seconds  | 34:43.2   | 1 digit max
| forward slash    | 7/44      | 7:44

## Data management

LoopLlama provides several ways to share your LoopLlama data with others,
backup your data to your computer, sync your data across multiple browsers and
devices, or perform bulk deletions.

### Sharing

You can share your LoopLlama data for either a complete video or the scratch
loop:

| Binding | Data operation
| ------- | ------------------
| `dv`    | Share video
| `dx`    | Share scratch loop

Those operations copy a LoopLlama sharing URL to your clipboard. Give the URL
to someone else and they can use it to open the video and see the data you
shared. Their version of that data is an indepenent copy: nothing they do will
alter your LoopLlama data or affect the data stored to support the sharing
URL.

### Export, Import, Unstash {#unstash-operation}

<span class="ll-phead">Export</span>. Use `de` for **Data › Export** to save
your your LoopLlama data as a JSON file. If you understand how to use the app,
the data in the file will make sense.

<span class="ll-phead">Import</span>. Use `di` for **Data › Import**, which
performs that process in reverse: load the data from an exported JSON file
into LoopLlama — for example on a different browser or computer. To
understand the import process, you first need to know that LoopLlama stores a
last-updated time for all videos in your collection. During the import,
LoopLlama checks whether any of the videos in the JSON you are trying to
import have an older last-updated time than the corresponding time currently
stored in your browser. If any cases like that are detected, the app prompts
you to decide how to handle the situation. The default is to skip the affected
videos. Alternatively, you can choose to replace those videos, using the older
data from the JSON file. Additionally, any time an import overwrites a video
with a different last-modified time, the app "stashes" a copy of the video
before overwriting occurs.

<span class="ll-phead">Unstash</span>. Use `du` for **Data › Unstash**, which
allows you to retrieve a stashed copy (as just discussed).

<span class="ll-phead">Inspect</span>. Use `dI` for **Data › Inspect**, which
displays your LoopLlama data directly in the browser.

### Cloud Storage and Sign-In {#why-sign-in}

LoopLlama does not require sign in. But signing in with Google or GitHub lets
you back up your LoopLlama data to the cloud — providing a more convenient
insurance mechanism against lost data (for example, caused by clearing your
browser cache) and a simpler way to coordinate LoopLlama usage across multiple
browsers or devices.

LoopLlama does not attempt true multi-device sync. Cloud storage is a
backup/restore facility, not a live sync. The correct mental model for this
feature is to view the cloud as if it were a hard drive: the browser's
localStorage is your working copy; the cloud is a saved copy. Multi-device
users can use LoopLlama successfully if they treat the cloud as a hard drive
and organize their ds/dr operations to align with their device switches.

- Writing to the cloud or reading data from it are diven by user operations
  (`ds` for Save to cloud, `dr` for Read from cloud, and `dc` for Compare).

- The save and read operations use the last-modified time comparisons
  described when disussing `di`, Data import. The app performs a
  video-by-video check and prompts the user before overwriting any newer data.
  And video data is stashed before being overwritten.

- The Account menu allows you to sign out and delete all LoopLlama cloud data.

### Bulk deletion {#bulk-delete}

The "Delete" operation on the Data menu (via `d⌫`) allows you to delete
data in bulk — either entire videos or the entities within a single video.

## App menu

The app menu is a bit of a catch-all for various operations and settings. The
jump history operations have already been covered, and the two help items are
self-evident.

### Edit history: undo/redo

LoopLlama tracks edits to your data and support undo and redo operations, via the
`au` and `ar` bindings (also `u` and `U`). Undo reverses a prior edit; redo
reapplies it.

Undo and redo support are limited to the 20 most recent edits.

Undo and redo cover explicit changes to your library data — videos, chapters,
sections, loops, and marks. They do not cover routine navigation or
adjustments to playback and looping controls (current location and speed, jump
history, navigation settings, scratch loop bounds), even though those settings
are remembered per video.

### Recall last message

The `am` binding recalls that most recent message emitted in the message
footer, in cases you did not have time to read it fully.

### Timeline operations

The App menu has a few items relating to the timeline:

- Copy time. Copies the current playhead time to the clipboard.

- Toggle timeline. Toggles the timeline to display either chapters or
  sections.

- Zoom off. Turns off any type of timeline zoom (video, chapter, section,
  saved loop, or scratch loop).

### Options {#app-options}

LoopLlama has a few options than can be customized via the `ao` binding.
For details, see the Options modal, which provides hover text for
each setting to explain their meaning:

- Seek delta.
- Scratch loop nudge delta.
- Speed delta.
- Loop padding for sections and chapters.

## Miscellaneous

### Privacy Policy {#privacy-policy}

Personal project. LoopLlama is a personal project managed and designed by me,
Monty Hindman. I wrote the v1 code; v2 code was written entirely by Claude
Code. Although simply a personal project, it is nonetheless serious: a great
deal of care was put into planning its features, designing its user
experience, and checking that the app functions correctly.

Hosting. The project is hosted by GitHub, as part of its GitHub Pages feature.

YouTube handles the videos. YouTube provides and streams all video content via
its standard embed API. LoopLlama simply uses that API.

Browser storage by default. Your LoopLLama data is stored only in your web
browser, in [localStorage][localStorage]. The app does not use cookies.

Transparent. The data that LoopLlama stores can be viewed directly via the
`de` binding (Data => Export). The resulting JSON file provides an accurate
representation of your LoopLLama data.

Cloud backup is optional. If you sign-in via Google or GitHub, LoopLLama backs
up your data in the cloud, using [Supabase][supabase], which offers a free
database service for small projects like LoopLLama.

Authentication via known, reliable third-parties. LoopLLama does not manage
user authentication or know anything about your credentials. Those details are
handled by the authentication provide you choose — either Google or GitHub.

LoopLLama does not store your email address. None of the LoopLLama database
tables contain your email address. The table holding a backup copy of your
LoopLLama data does have an ID which can be linked to a Supabase table holding
your email address (Supabase needs to store that email to ensure that only the
properly authenticated user can access your data). But the LoopLLama project
will never issue queries linking your email address and your cloud backup
other than to investigate problems or requests initiated by you.

Cloud data is not shared. The copy of your LoopLLama data stored in the cloud
requires valid authentication to access. That means other internet users
cannot access it, unless you share your credentials with them.

Cloud data can be accessed by infrastructure staff. The LoopLLama app, and
developers on the LoopLLama project, can access your data. But the project
commits to access this information only for the purpose of allowing the app to
function or to investigate specific problems or requests sumitted by you to
the LoopLLama team. Similarly, some Supabase staff can access the data in the
LoopLLama database, but their access is governed in similar ways by Supabase
policies.

User-driven access to your cloud data. The LoopLLama app interacts with your
cloud data only in response to your explicit requests to save your browser
data to the cloud or to read data from the cloud into your browser.

Cloud data can be deleted. You can delete your cloud data at any time using
the "Sign out and remove cloud data" item on the Account menu.

No user-data tracking. LoopLLama does not use cookies and does not sell,
share, or tranfer your data to any third parties — other than backing up your
data in Supabase, as noted above. The application does track a some events for
the purpose of collecting aggregate metrics for the project, specifically (1)
when a user starts a new LoopLLama session and (2) when a user loads a new
YouTube URL. In that data, the user is represented by a client ID, which is
simply a random ID stored in your browser that helps us count approximate
unique visitors. That ID is not linked to your identity. Further, in the data
that holds the URL for newly loaded YouTube videos, the app purposely omits
the client ID.

Shared data is publicly available, but opaque. If you ask LoopLLama to create
a URL to share either a video or a loop, the shared data can be accessed by
anyone with the correct URL. That URL includes a random ID generated by the
app, so it is not something anyone can guess or tie to your identity.

LoopLlama is free. We do not charge to use the app and do not rely on
advertising. The project has no commercial relationships of any kind. Cloud
backup is provided via a free tier from Supabase. If the volume of cloud usage
becomes prohibitively large — very unlikely — the app might need to charge for
cloud backup in the future, but the project has every intention to avoid that
scenario.

### Terms of Service {#terms-of-service}

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

### The LoopLlama Banner

The colored banner at the top of the page is a composite drawn from the visual
traditions of movements that fought against fascism and authoritarianism. The
color order reads as a loose narrative arc, from the darkest symbols of
resistance toward warmer symbols of hope:

  - Black. Anarchism and anarcho-syndicalism, the oldest visual language of
    anti-fascist organizing.

  - Deep red. Organized labor and the socialist left, broadly construed — a
    color that runs through more anti-authoritarian traditions than any other.

  - Purple. The Second Spanish Republic, whose defense drew volunteers from
    dozens of countries — perhaps the broadest anti-fascist coalition before
    World War II.

  - White. Peace and nonviolent resistance — the center band, as a pivot
    between the harder symbols and the warmer ones.

  - Gold. The German democratic tradition — colors the Nazis rejected and the
    Federal Republic later reclaimed.

  - Forest green. Pan-African resistance and the struggle against colonial and
    racial authoritarianism.

  - Blue. The liberal democratic tradition — from the Enlightenment through
    the American and French revolutions, upheavals that shared the conviction
    that legitimate power derives from the consent of the governed, not the
    will of a ruler.

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


