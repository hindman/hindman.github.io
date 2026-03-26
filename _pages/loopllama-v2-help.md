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
## Entities: Videos, Chapters, Sections, Loops, Marks
### Video
### Section
### Loop
### Mark
### Chapter
## The Scratch Loop
### Source tracking
### Nudging endpoints
## The Visual Timeline
### Play zone
### Chapter/Section zone
### Mark zone
### Loop zone

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

## Entities: Videos, Chapters, Sections, Loops, Marks

LoopLlama organizes your work around five entity types. Understanding
them is the key to using the app effectively.

### Video

A YouTube video plus all the data you've attached to it: sections,
chapters, loops, marks, speed, and position. Adding a video means
giving LoopLlama a YouTube URL; the app stores the metadata, not the
video itself.

### Section

Sections divide a video into named, non-overlapping segments. What
those segments represent is up to you: a musician might label them
Intro, Verse, Chorus, Solo; someone studying a lecture might label
them by topic; a language learner might use them to mark speaker
turns. The "current section" is always whichever one contains the
playhead.

A section needs only a start point -- its end is inferred from the
next section's start (or the video end). You can also set an end
explicitly if needed.

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

### Chapter

Chapters are for videos that contain more material than you intend to study on
one time. Where sections divide the content you care about, chapters first
zoom in on the part you care about. Example: a three-hour compilation video
where you want to focus on two segments. Define each as a chapter, then zoom
the timeline into one and work within it using sections and loops as you
normally would.

Like sections, chapters divide the timeline without overlapping, and
a chapter's end is inferred from the next chapter's start. Most users
won't need chapters at all.

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

