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

## What is LoopLlama?
## Quick start
## Entities
### Video
### Section
### Chapter
### Loop
### Mark
## The Scratch Loop
### Source tracking
### Nudging endpoints
## The Visual Timeline
### Play zone
### Chapter/Section zone
### Mark zone
### Loop zone

Notice syntax/styles:

      gray/blue-gray | {: .notice}          | .
      forest/teal    | {: .notice--primary} | info items
      steel-blue     | {: .notice--info}    | .
      brown/amber    | {: .notice--warning} | .
      red            | {: .notice--danger}  | warnings
      green          | {: .notice--success} | success advice

-->

## What is LoopLlama?

LoopLlama is a browser-based YouTube controller for close study of
video content. If you want to loop a passage, slow it down, mark
moments to return to, or annotate a video's structure, LoopLlama is
built for that. A common use case is learning from instructional or
performance videos -- a musician working through a song, for instance
-- but the app isn't specific to music or any other domain.

The keyboard-first design means you can drive the app without putting
down whatever is in your hands. Vim-style two-key bindings cover
nearly every operation. For those who prefer a mouse, menus, buttons,
pickers, and a visual timeline provide the same access. Both modes
are always available.

## Quick start

- Core usage: load video, play, and simple navigation:

  - Load a video via `y`. Give th user a URL to copy. The video has nothing: no
    metadata yet.

    - Notice that video.name and YT ID are in the Current panel

    - Basic controls:

          Action              | Keyboard | Mouse
          -------------------------------------------------------
          Play/pause          | Space    | .
          Seek: backward      | Left     | .
          Seek: forward       | Right    | .
          Seek time: decrease | Down     | .
          Seek time: increase | Up       | .
          Speed: decrease     | -        | .
          Speed: increase     | =        | .
          Jump to a time      | jj       | .

    - Basic controls via mouse:

      - All of those keyboard controls have buttons and dropdowns to perform
        the same operations: see the controls labeled Play, Speed, and
        Navigate.
      - Jump by time via by clickling the blue timeline (where the playhead
        is) or my clicking the current-time text box and entering a specific
        time.

    - App focus: a key guideline:

        - If you click anywhere in the YT frame to the LL app loses focus
        - Notice the warning in the footer: that's where all messages go
        - The fix/advice: click the app again, outside the YT frame; avoid
          clicking the YT frame (it's never needed with LL).

    - At this point the user can use LL to play videos, control speed, and do
      basic navigation.
      - On one hand, that's nothing more that YT can do already.
      - OTOH, it's valuable because the controls are easy, efficient.

- Basic looping:
  - `[[`/`]]` to set loop endpoints (or the Now buttons).
  - `ll` to toggle looping (or the toggle).
  - Video playback will now adhere to the loop bounds: when the playhead
    reaches the end it will wrap around to the loop start. Regular seek
    movements will be confined to the loop boundaries.

- Briefly point to the app's primary informational devices:
  - Current panel: lists current video and other information about the video.
  - Message footer: info/warning/error messages.
  - Control hovers: to see a brief label and the key binding.
  - Timeline hovers: to see current time and other details about information
    you have attached to the video.

- Brief note to user: two pathways (with anchor links) to read the help docs:
  - Entities: chapters, sections, loops, marks.
  - Efficient loop adjustment: loop nudging.
  - NOTE: I'm leaning toward dropping this comment. The document will have a
    TOC sidebar, so users can navigate anywhere they want; no need to state
    this obvious fact.

## Entities

In addition to offering efficient ways to play, loop, and control speed of YT
vids, LL allows you to attach infomation to the videos you are using. That
information is organized around five types of entities: videos, sections,
loops, marks, and chapters. Understanding them is the key to using the app
effectively.

### Video

The first entity is obvious: videos. Once you open a YouTube video in LL, the
app remembers the video and how you last left it: the current playhead
position, the playback speed, the loop endpoints, and any other information
about the entities that a video can have.

To illustrate some video behaviors open these two URLs which will load two
example videos into your LL data.

<!-- Two shared video examples: 

- example-video-1: basic song with sections
- example-video-2: concert video with song/chapters.

-->

You can open a video you've already loaded into LL via `vo`. Give that a
try with the example videos.

<!-- Info notice. LL keybindings. Most LL bindings follow a two-character
system, where the first letter is a prefix for the type of entity involved
(`v` for video or `s` for section) and the second letter is a mnemonic for the
operation: for example, `vo` for "Video => Open" or `vu` for "Video => Load
URL". Some of the most common operations also have synonym bindings that are
easier to type, either because they use a single letter or because they use
two of the same letter: for example, `y` as a synonym for `vu` (load a video
via a YouTube URL) or `vv` for `vo` (open an video the app has already seen).
Take a look at the Video menu and notice that both bindings are listed: first
the official binding, then the fast-typing synonym, if one exists. The help
documentation will tend to use the offical two-character bindings. See the
key-bindings page for a full listing.
-->

### Section

Sections provide a way to divide a video into non-overlapping parts. What
those segments represent is up to you: a musician might label them Intro,
Verse, Chorus, Solo; someone studying a lecture might label them by topic; a
language learner might use them to mark speaker turns.

**Create**. Creating a section is done by positioning the playhead at it start
and pressing `ss` -- that's it. The section now exists (notice the visual
change in the timeline). The section end is inferred from the start of the
next section (or the video end).

<!--

Info notice: the docs will focus on keybindings. Almost every operation can
also be perfomed via the mouse and menus.

-->

**Edit**. Once a section exists, you can edit it, mainly to give it a name
(via `se`). The section name will appear in the timeline area, just below the
blue progress bar.

Switch to the example-video-1 to illustrate what sections enable in LL.

**Loop**. Because a section has start and end points, it provides a way to
define a loop quickly (via `sl`). Give that a try with the example video:
navigate the playhead anywhere within a section; press `sl`; notice that
the loop end points are set to enclose the section; press `ll` to toggle
looping on.

<!-- Info notice. Technically, the loop will be a slightly larger than the
section. This is done to provide a small bit lead-in and lead-out time as you
play and loop the section. You can adjust the application's default loop
padding amount via "App => Options" in the menus). -->

**Jump**. Sections can also be used for efficient navigation: try `sj` to
jump to the start of a different section.

**Zoom**. To study a section in depth you can zoom the timeline to focus just
on the current section (via `sz`).

**Fix end**. Although rarely needed, this operation allows you to set a
section's endpoint explicitly -- in other words, fix the section's end point
(via `sf`) sooner than the end that would be inferred from the next section's
start (or the video end). This feature is needed only if you want to organize
a video into sections, but don't want the entire video to be exhaustively
covered by the sections you define.

**Delete**. Finally you can delete a section (via `sd).

<!-- Info notice. **Elipses and pickers**. Look at the Section menu. Notice
that "Delete..." has a trailing elipses. It conveys that the delete operation
will occur though an interactive picker where you first select the section to
be deleted. The "Jump..." item uses the same menu convention. But the other
items have no elipses, because they operate on the current section -- meaning
the one where the playhead sits. -->

### Chapter

Chapters are similar to sections: they divide a video into non-overlapping
parts; they support the same operations (compare the two menus); and their key
bindings are directly parallel to the section bindings, but using the `c`
prefix rather than `s`.

So if you understand sections, you also understand chapters. But there are two
differences worth pointing out:

**Default timeline view**. But default, the timeline area shows sections, not
chapters. That view can be toggled via `t`. Switch to example-video-2. Notice
that regardless of the timeline's current display, the current chapter and
section, if defined, are both listed in the Current panel.

**Design intent**. The app was built with the premise that chapters are bigger
(eg songs in a concert) and sections are smaller (eg the parts of a song).
You are not required to follow that model, but future versions of the app
might end up with features where this distinction becomes relevant.

### Loop

A named, loopable time range. Unlike sections, loops don't have to
align with the structure you've defined -- they're free-form. A loop
called "tricky-bit" might span parts of two sections. Loops can
overlap each other and sections freely.

The active (working) loop is always the scratch loop -- a single
unnamed loop that is the target of all looping activity. Named loops
are saved separately and loaded into the scratch loop when you want
to work on them. See The Scratch Loop for details.

### Mark

A named time point. The most lightweight entity -- just a position
you want to return to quickly. No range or structure implied.

## The Scratch Loop

The scratch loop is your active working loop -- the single loop the
player uses when looping is enabled. There is always exactly one
scratch loop. It has a start point and an end point, and that's it:
no name, no saved state.

All looping activity goes through the scratch loop:

- Setting loop endpoints directly (the `[[` and `]]` keys) always
  writes to the scratch loop.
- Loading a section or saved loop copies its endpoints into the
  scratch loop. The source entity is not modified.
- Editing loop endpoints always edits the scratch loop, regardless
  of where the endpoints came from.

The typical workflow is: load something into scratch, adjust the
endpoints until they're right, then optionally save.

### Source tracking

When you load a section or named loop into the scratch loop, the app
remembers the source. This gives you three additional operations in
the Loop menu:

- Save to source (`ls`): push the scratch loop's current endpoints
  back to the source entity, updating it.
- Reset to source (`lr`): restore the scratch loop's endpoints from
  the source, discarding your edits.
- Unlink source (`lu`): forget the source association without saving.

Save new (`ln`) creates a new named loop from the current scratch
loop endpoints, regardless of source.

### Nudging endpoints

The `[-` / `[=` keys nudge the loop start; `]-` / `]=` nudge the
end. Each nudge moves the endpoint by the current nudge delta (a
small time increment you can adjust).

One situation requires special handling: if a nudge would push an
endpoint past the other one, making an illegal loop (start >= end),
the app moves the endpoint relative to the other instead. So if you
nudge the end leftward past the start, the end lands just past the
start rather than crossing it.

If looping is currently active, the app will refuse an edit that
would make the loop illegal. If looping is off, the illegal state is
allowed temporarily -- useful when you're setting one endpoint first
and intend to fix the other next.

## The Visual Timeline

The timeline sits below the video and gives a visual overview of
everything attached to it. It has four horizontal zones stacked top
to bottom.

### Play zone

Mimics the familiar YouTube progress bar: a thick horizontal line
with a dot marking the playhead. The elapsed portion is colored; the
remaining portion is gray. Click anywhere in this zone to jump to
that time.

### Chapter/Section zone

Shows the video partitioned into named segments. Press `t` to toggle
between showing chapters and sections. Each segment is labeled;
hovering shows its name and time range. Clicking a segment jumps to
its start.

### Mark zone

Shows marks as dots along the timeline. Hover a dot to see the
mark's name and time.

### Loop zone

Has three lanes:

- Lane 1: the current scratch loop.
- Lanes 2 and 3: saved named loops.

Hovering a loop shows its name and time range.

