---
title: "Visualize the fretboard through triads"

excerpt: >

  Placeholder. An essay on why triads are the best lens for seeing and
  navigating the guitar fretboard.

---

## Source material

Existing notes: the `writing-vft` section of
`~/00_docs/misc/guitar/notes/guitar-notes.txt` ("Visualize the fretboard
through triads [VFT]"). Its content and form are not decisive. It mixes
three genres:

1. Personal testimony and the "why": 40 years with two Am grips, then 9
   practical shapes that now organize how the fretboard is seen. The
   strongest writing in the section and already close to finished.

2. A conceptual primer: intervals, scales, chord types, building triads,
   harmonizing the major scale. Much of this can be handed off to links
   (Marco Carillo, Alex Farran), as the notes themselves suggest.

3. A practice method: inversions, string sets, stacks, cycles, etudes,
   dom7 voicings derived from triads. Tutorial material and the least
   settled part.

## Why this essay comes first

The triads essay should precede the CAGED essay
(`_drafts/caged-critiques.md`).

- The CAGED essay ends by saying "learn triads instead." That advice is
  much stronger if it points to a finished piece. Without one, the critique
  is all teardown, which is the diatribe risk.

- The CAGED essay gets shorter. Its benchmark section and coda can each be
  a few lines plus a link, instead of explaining triads inside a critique.

- Much of the "why triads" argument has migrated into the CAGED notes and
  belongs here instead: the generative rule behind every shape; triads
  teach the locations of 1, 3, and 5 rather than only roots; one-note
  moves to other chord qualities (sus, 6, 7); physical echoing (many of
  those voicings are the same shapes as known triads); triad stacks as
  neck regions. Moving that material here gives this essay its argument
  and slims the CAGED one.

Scope: this essay should be a "why" essay about triads as a way of seeing
the neck, built from genre 1 plus the material moved over from the CAGED
notes. The practice method (genre 3) belongs in a later tutorial, or can be
handled by linking to existing lessons for now. Writing "why" and "how"
together is the bloat risk for this piece.

The dependency is loose. The CAGED essay only needs the triad rule stated
in about three lines, which works without a separate essay. If CAGED is
finished first, publish it and add the link later. Keeping each essay to
one genre matters more than the order.

Detail to reconcile: the VFT notes say 9 distinct shapes per triad quality
(shapes on strings 6-5-4 repeat those on 5-4-3); the CAGED comparison table
says "12 per quality." Both are right (12 placements, 9 shapes to learn).
The CAGED table should probably say 9, since the learning burden is the
point.

## Insights from the Brooks Robertson etudes

Motivation: theory is easy to present and grasp on a mental plane. The
hard part is fluency, moving up and down the neck playing triads and stacks
musically. No set of etudes has been found that is both doable and musical
enough to draw a learner into real practice time. Brooks Robertson's
TrueFire course on right-hand rolls did that for a physical skill: the
etudes were musically compelling, and the music, not the abstract benefit,
was the magnet for weeks of daily practice.

Two etudes examined (Guitar Pro exports, MusicXML):

- Forward Motion: key of C, 189 bpm, Intro / A / A / Outro. Forward roll
  (p-i-m) throughout.

- Backward Funk: key of B minor, 196 bpm, A B A C D A B C D A B, Outro.
  Backward roll (high to low).

Key finding: they are triad etudes in disguise. Nearly everything the left
hand plays is a three-note shape on one adjacent string set (mostly 4-3-2
or 3-2-1). Examples:

- Forward Motion intro: triads on 4-3-2 move under an open high E (an F
  triad plus E gives an Fmaj7 sound), with a creeping bass on string 4.

- Forward Motion bars 15-18: an F triad held while the top string
  alternates D and E (F6 and Fmaj7 colors from one moving note).

- Backward Funk section B: B-D-F# becomes Bb-D-F# (minor to augmented by
  one note, a line cliche).

- Backward Funk section D: a G triad alternates with G-Bb-C#, a
  diminished sound acting as a rootless A7b9. One-note moves set to a
  groove.

### What makes them compelling

1. Each etude is a tune: title, style, sectional form, intro and outro, an
   ending.

2. One fixed right-hand pattern; the left hand carries the variety.
   Repetition is built in without boredom.

3. Groove from rhythmic variety, not a plodding stream of eighth notes. The
   main devices:

   - 3+3+2 grouping of a three-note roll in 4/4, so accents shift.

   - Anticipations: a note on the and-of-4 tied over the bar line, so the
     chord change arrives early (the push).

   - Rests and stabs: bars that break off on beat 3 or 3.5; held block
     chords as punctuation.

   - Off-grid figures: grace-note slides that shift following notes onto
     sixteenth-note offbeats; an occasional triplet.

   The right-hand pattern is constant, but its placement in the bar keeps
   changing. Listening again confirmed this is a main source of the
   appeal.

4. Open-string pedals and drones give small shapes big harmony (maj7, add9,
   sus colors).

5. Small left-hand moves: chromatic bass lines and line cliches change one
   or two notes at a time. Little finger travel, sophisticated harmony
   (diminished and augmented passing chords included).

6. Melody on top: a top-string note lands with the bass on the downbeat and
   is held while the roll fills in, giving a melody-plus-accompaniment
   illusion from one pattern.

7. Short repeated sections (4-8 bars), learned in chunks.

8. Rationed ornaments: a few slides, hammer-ons, grace notes.

9. A tempo worth reaching: sounds fine slow, exciting at speed.

### The harder problem for triad etudes

Robertson's etudes develop a physical skill (rolls), so he had free rein
over harmony. Triad etudes develop a mental and visual skill (seeing and
knowing shapes), and the student can't be assumed to know all triads and
quasi-triad forms (E6, E7, etc.) yet. So the early etudes are necessarily
constrained harmonically: the harmony is the curriculum.

What still works under that constraint:

- Groove, form, pushes, rests, stabs, and drones are independent of shape
  knowledge.

- Harmony from context: a plain triad over a pedal sounds richer with no
  new shape (B over open E suggests Emaj9; A over open E suggests a sus
  sound).

- I, IV, V, vi with major and minor triads cover a lot of folk and pop.

- Each etude should make one shape family salient (e.g., the same chords
  in two inversion regions), with musical interest carried by the
  shape-independent dimensions.

A possible sequence:

1. Early: one key, one string set, major and minor triads only (I, IV, V,
   vi), moving through inversions; color from pedals and rhythm.

2. Middle: more string sets and stacks; add ii and iii.

3. Later: diminished and augmented triads.

4. Last: one-note-move quasi-triads (6, 7, sus) and line cliches.

### Etude experiments so far

Two 8-bar A sections were drafted as MusicXML. Generator scripts and output
are in `tmp/triads/` (`etude_a.py`, `etude_early.py`, plus `mxl2txt.py`,
which converts MusicXML to readable text tab). Usage:
`python3 etude_early.py out.xml`.

- `triad-etude-a.xml`: E major, strings 3-2-1, line cliche E, E+, E6, E7,
  then A, Am, B, B7 over E and A pedals. Judged "not bad," but it assumes
  knowledge of quasi-triads, so it belongs late in the sequence.

- `triad-etude-early-a.xml`: E, B, C#m, A (I-V-vi-IV) on strings 3-2-1 in
  two inversion regions, open-string pedals, four rotating rhythm
  templates. Lower musical appeal, as expected given the constraints.

Takeaway: making early, harmonically constrained etudes compelling is the
open problem. Experimentation paused here.

Technical note: Guitar Pro's MusicXML import reads the notation staff, not
the tab staff's string and fret numbers. A notation staff written an
octave up needs a `<transpose>` with `<octave-change>-1</octave-change>`,
as in Guitar Pro's own exports; without it, notes land an octave high on
the wrong strings.
