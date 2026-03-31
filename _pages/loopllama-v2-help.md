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
### Videos
### Sections
### Chapters
### Marks
### Loops
#### Saved loops
#### Scratch loop and the scratch operation
#### Scratch loop edit mode
#### Scratch loop nudges
#### Scratch loop sources

## The Visual Timeline
### Play zone
### Chapter/Section zone
### Mark zone
### Loop zone

## Time Input Formats

## Playback and Navigation
### Playback Controls
### Seek and Navigate

## Key Binding System
## Working with Each Entity
## Data: Export, Import, and Sharing
### Local data (localStorage)
### Export and Import
### Inspect
### Sharing
## Cloud Storage and Sign-In
### Why sign in?
### How cloud sync works
### ds / dr / dc operations
## Menu Philosophy
## App Options
## The LoopLlama Banner
## Privacy Policy
## Terms of Service

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

The keyboard-first design means you can drive the app without putting down
whatever is in your hands. Vim-inspired key bindings cover nearly every
operation. For those who prefer a mouse, the usual menus, buttons, pickers,
and a visual timeline provide the same access.

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

    - At this point the user can use LL to play videos, control speed, and do
      basic navigation.
      - On one hand, that's nothing more that YT can do already.
      - OTOH, it's valuable because the controls are easy, efficient.

- Basic looping:
  - `[[`/`]]` to set scratch loop endpoints (or the Now buttons).
  - `xx` to toggle looping (or the toggle).
  - Video playback will now adhere to the scratch loop bounds: when the playhead
    reaches the end it will wrap around to the loop start. Regular seek
    movements will be confined to the loop boundaries.

- Briefly point to the app's primary informational devices:
  - Current panel: lists current video and other information about the video.
  - Message footer: info/warning/error messages.
  - Control hovers: to see a brief label and the key binding.
  - Timeline: Mimics the familiar YouTube progress bar: a thick horizontal
    line with a dot marking the playhead. The elapsed portion is colored; the
    remaining portion is gray. Hover to see a time displa and click to jump to
    a specific time.
  - Timeline hovers: to see current time and other details about information
    you have attached to the video.

- App focus: a key guideline:
  - If you click anywhere in the YT frame to the LL app loses focus
  - Notice the warning in the footer.
  - The fix/advice: click the app again, outside the YT frame; avoid clicking
    the YT frame (it's rarely needed with LL, since LL provides a clickable
    timeline).

## Entities

For many users -- those who simply want to have tool to loop or change the
speed of YT videos using an efficient user interface -- everything you need to
know was covered in the Quick Start. But if you need to work with a video
in-depth (for example, transcribing a musical performance) being able to
attach additional information to the video is powerful. That information is
organized around five types of entities: videos, sections, chapters, marks,
and loops.

### Videos

The first entity is obvious: videos. Once you open a YouTube video in LL, the
app remembers the video and how you last left it: the current playhead
position, the playback speed, the scratch loop endpoints, and any other information
about the entities that a video can have.

To illustrate some video behaviors open these two URLs which will load two
example videos into your LL data.

<!-- Two shared video examples:

- example-video-1: song with no metadata yet
- example-video-2: basic song with sections
- example-video-3: concert video with song/chapters.

-->

You can open a video you've already loaded into LL via `vo`. Give that a
try with the example videos.

<!-- Info notice. Key bindings. Most LL bindings follow a two-character
system, where the first letter is a prefix for the type of entity involved
(`v` for video) and the second letter is a mnemonic for the operation: `vo`
for "Video => Open" or `vu` for "Video => Load URL". Some of the most common
operations also have synonym bindings that are easier to type. Look at the
Video menu to see examples. The help documentation will tend to use the formal
two-character bindings. -->

### Sections

Sections provide a way to divide a video into non-overlapping parts. What
those segments represent is up to you: a musician might label them Intro,
Verse, Chorus, Solo; someone studying a lecture might label them by topic; a
language learner might use them to mark speaker turns.

**Create**. Creating a section is done by positioning the playhead at it start
and pressing `ss` -- that's it. The section now exists (notice the visual
change in the timeline). The section end is inferred from the start of the
next section (or the video end).

<!-- Switch to example-video-1. -->

**Edit**. Once a section exists, you can edit it, mainly to give it a name
(via `se`). The section name will appear in the timeline area, just below the
blue progress bar.

<!-- Switch to the example-video-2. -->

**Scratch**. Because a section has start and end points, it provides a way to
define a scratch loop quickly (via `sx`). Give that a try with the example video:
navigate the playhead anywhere within a section; press `sx`; notice that the
loop end points are set to enclose the section; press `xx` to toggle looping
on.

<!-- Info notice. Why is the operation called "Scratch" rather than "Loop"?
See the help documentation for loops (add anchor link). -->

**Jump**. Sections can also be used for efficient navigation: try `sj` to
jump to the start of a different section.

**Zoom**. To study a section in depth you can zoom the timeline to focus just
on the current section (via `sz`). Use `sz` again to toggle the section-zoom
off (or `az` to turn off any kind of zooming).

**Fix end**. Although rarely needed, this operation allows you to set a
section's endpoint explicitly -- in other words, fix the section's end point
(via `sf`) sooner than the end that would be inferred from the next section's
start (or the video end). This feature is needed only if you want to organize
a video into sections, but don't want the entire video to be exhaustively
covered by the sections you define.

**Delete**. Finally you can delete a section (via `sd).

<!-- Info notice. **Menu elipses**. Look at the Section menu. Notice that
"Delete..." and "Jump..." have a trailing elipses. That conveys that the
operations will occur though an interactive picker where you first select the
section to be deleted or jumped to. The other menu items have no elipses,
because they operate on the current section -- meaning the one where the
playhead sits. -->

### Chapters

Chapters are similar to sections: they divide a video into non-overlapping
parts; they support the same operations (compare the two menus); and their key
bindings are directly parallel to the section bindings, but using the `c`
prefix rather than `s`.

So if you understand sections, you also understand chapters. But there are two
differences worth pointing out:

**Default timeline view**. But default, the timeline area shows sections, not
chapters. That view can be toggled via `at` and LL will remember each video's
most recent setting. Switch to example-video-3. Notice that regardless of the
timeline's current display, the current chapter and section, if defined, are
both listed in the Current panel.

**Design intent**. The app was built with the premise that chapters are bigger
(eg songs in a concert) and sections are smaller (eg the parts of a song), but
you are not required to follow that model.

### Marks

Marks are the simplest entities -- nothing more than a time point. The are
displayed visually as yellow dots in the timeline, below the
sections/chapters. The operations and key bindings are simple and follow the
conventions already established for sections and chapters (see the Mark menu).

### Loops

The entity tour postponed loops until the end because they sit at the center
of the app's mission. There are several topics to cover: saved loops, the
scratch loop and the scratch operaton; scratch loop edit mode; nudging scratch
loop boundaries; and scratch loop sources.

#### Saved loops

Saved loops are similar to chapters and sections in that they define a range
via their start and end. They are more generic because their purpose is not to
partition a video into non-overlapping parts: saved loops can overlap. They
are displayed at the bottom of the the timeline area (below sections,
chapters, and marks) as brown line segments.

The key binding and menu items for saved loops are similar to those for
sections and chapters. You can create a saved loop via `ll`. That loop's
bounds will be the same as those currently in the scratch loop start and end
text boxes. To edit the current saved loop — to give it a name or to adjust
its boundaries — you can use `le`. The binding `lz` will zoom the timeline to
the current loop's range (as usual, current is based on playhead position).
Also, like chapters and section, you can use `lj` to jump to the start of a
loop and `ld` to delete a loop. Finally, the Scratch operation, via `lx`, will
load the current loop's bounds into the scratch loop — our next topic.

#### Scratch loop and the scratch operation

The scratch loop is the active working area for looping a video. In the app's
main controls see the Scratch Loop area. You can toggle looping on and off,
directly edit the scratch loop's boundaries via text boxes, or use the "Now"
buttons to set a scratch loop boundary to the current playhead position.

As mentioned in the documentation for sections, chapters, and saved loops,
entities with a start and end support the "Scratch" operation. Although the
terminology is idiosyncratic, the app's menu labeling and key binding scheme
benefit from keeping a clear distinction between saved loops and the scratch
loop. Saved loop operations are found on the "Loop" menu and used `l` as the
prefix for their key bindings. Scratch loop operations are on the "Scratch"
menu and use `x` as the binding prefix. And the "Scratch" operation means
loading the bounds of a saved entity into the scratch loop work area.

When the scratch loop bounds produce a valid loop — meaning start less than
end — the text boxes display the values in regular font. When the bounds are
invalid, the font is red and the app disallows toggling looping on.

#### Scratch loop edit mode

Although you can edit bounds directly via the scratch loop controls, LoopLlama
also provides a special keyboard mode to make such adjustments. The mode can
be invoked via "Edit mode" on the "Scratch" menu or via the `xe` and `\`
bindings.

After the mode is invoked, the scratch loop's start point will have focus
(notice the yellow border). In the message footer, the available key bindings
are listed, but the most important controls are the following:

    left/right | Decrease/increase the active bound
    down/up    | Decrease/increase the delta (size of left/right adjustment)
    tab        | Toggle focus between start and end
    enter/esc  | Exit edit mode

Within scratch edit mode, the space key will play the video near the boundary
that currently has focus. The purpose is to allow you to adjust a boundary,
then play the video to assess whether more fine-tuning is needed.

#### Scratch loop nudges

In addition to scratch loop edit mode, the app also supports a coherent set of
key bindings to make quick adjustments to the loop bounds. If you hover over
the "Now" buttons, notice that `[[` is the binding to set the start to the
playhead position and `]]` sets the end. The nudge key bindings build on that
convention: `[` is the prefix for start, `]` for end. See the nudge key
bindings (add link) for a full listing, but the most commonly used bindings
are these four:

    [- [= | Start: nudge decrease/increase
    ]- ]= | End: nudge decrease/increase

The nudge operation has one special wrinkle to support the rapid creation of
loops. This behavior is best explained via a simple example. Initially, the
scratch loop start and end are a short distance apart, near the beginning of a
video, and the playhead is near the video end:

    ------------------------------------------------------------
      S     E                                      ^

To create a short loop starting at the playhead, you can press `[[`. Now the
situation looks like this:

    ------------------------------------------------------------
            E                                      S

Consider what happens if the user presses `]=` to perform a nudge increase on
the end. A *regular nudge* would shift the end to the right, leaving an
invalid loop (assume the delta is at a typical value like 5s).

    Regular nudge

    ------------------------------------------------------------
                E                                  S

But a *relative nudge* is different: it applies the delta to the loop's other
bound. In our example, the end nudge would be applied relative to the start.
The result would be a legal loop, so the app would apply this nudge:

    Relative nudge

    ------------------------------------------------------------
                                                   S   E

The key intuition is that nudges have a bias toward creating legal loops. The
app calculates the result for both regular and relative nudges and stops at
the first method that produces a valid loop. The methods are attempted in this
order: regular, then relative, with fallback to regular if both methods result
in invalid loops.

#### Scratch loop sources

As mentioned above, the Scratch operation loads the bounds of a saved
entity into the scratch loop. Using example-2, press `sx` to Scratch
the current section. There are several things to notice:

  - Looping is toggled on.

  - The Current panel indicates the name and range of the scratch loop source.

  - The scratch loop bounds are set slightly larger than the source bounds.
    This is done to provide a small bit of lead-in and lead-out time [is
    "lead-out" a real/correct term?] as you play the loop. Loop padding is
    done for sections and chapters, but not for saved loops. You can adjust
    the padding via Options (link).

  - Press `space` to play the video and then `enter` to jump to the loop
    start. After you do that, notice that whenever the playhead sits in
    the padded region beyond the source bounds, the relevant scratch loop
    bound is highlighted yellow.

  - If you modify the scratch loop bounds, either via a nudge operation or a
    direct edit to one of the text boxes, notices that the time range in the
    Current panel is displayed in yellow font, conveying that the scratch loop
    bounds and the source bounds have diverged.

If the scratch loop has a source, there are three operations available. You
can press `xs` (Save to source) to update the source entity's bounds based on
the current scratch loop bounds (after controlling for padding, where
applicable). You can press `xr` (Reset to source), which returns the scratch
loop bounds to match those of the source. Or you can press `xu` (Unlink
source) to remove the linkage source: after that the scratch loop will have no
connection to the source and it will behave as if you had set the bounds
manually.

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

## Time Input Formats

## Playback and Navigation

### Playback Controls

### Seek and Navigate

## Key Binding System

## Working with Each Entity

## Data: Export, Import, and Sharing

### Local data (localStorage)

### Export and Import

### Inspect

### Sharing

## Cloud Storage and Sign-In

### Why sign in?

### How cloud sync works

### ds / dr / dc operations

## Menu Philosophy

## App Options

## The LoopLlama Banner

## Privacy Policy

## Terms of Service

