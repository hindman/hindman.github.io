---
title: "Fingerstyle rhythmic rudiments: a systematic approach"
tags:
  - fingerstyle guitar
  - right hand
  - rudiments
---

## Second-hand knowledge

Guitar instruction is organized around the left hand. Chord charts, scale
diagrams, fretboard maps — the bulk of what gets taught is about where the
left hand goes. That makes intuitive sense. Watch someone play and the left
hand looks like where the action is: fingers moving across the neck, chord
shapes forming, notes changing. The right hand appears to just be triggering
what the left hand prepared.

Of course, the right hand isn't ignored entirely. Teachers address technique —
how to hold the pick, where to anchor the hand, how classical players shape
their nails and control the angle of attack. Intermediate students working on
speed spend real time on right-hand mechanics: alternate picking, economy
picking, general shredding. But this attention tends to cluster at the
extremes — foundational setup on one end, advanced facility on the other.

Fingerstyle guitar, our genre, does devote some early energy to the right hand
in the form of picking patterns, notably various Travis or roll-based
patterns. A student might learn a few of these or perhaps even a dozen of
them. What tends not to happen, at least outside of classical guitar
education, is a systematic approach to right-hand rhythmic coordination:
developing the ability to play melody notes at any point in a measure while
keeping a desired bass rhythm chugging along.

This post tries to fill that gap with 256 exercises — a number every software
engineer loves. That volume might seem excessive, a kind of completist
insanity. All I can tell you is that some of the most obvious gains I've made
as a fingerstyle player have followed periods of deliberate right-hand work,
most notably the very exercises presented here. Later I'll say more about how
I worked on this material.

Collectively, the exercises pose this challenge: can you play any rhythmic
combination of melody 8th notes while keeping a typical alternating bass
going. Drummers build these kinds of coordination skills by practicing
"rudiments" — the foundational sticking patterns and rhythmic figures they
need to play a variety of musical styles. This collection of fingerstyle
rudiments has a similar goal. If you can play all of them, you will have the
core skills to quickly learn almost any fingerstyle pattern or melody within
an alternating or steady-bass context on an 8th-note grid.[^1] That's a deep
and broad musical terrain.

## The rudiments

The bass is the same across all of the rudiments: the thumb plays alternating
quarter notes, cycling through the root and fifth of whatever chord is
underneath. That's the backbone.

Also constant is the harmony and structure. Every rudiment consists of eight
bars: two bars each of Am, Dm, E7, and Am again. The chord voicings are
deliberately easy — open chords you already know — and the melody notes are
simple, just two or three notes played on the upper strings. The intent is to
assign a little bit of work to the left hand, but not much. Fingerstyle
players ranging from beginners through intermediates will benefit from the
coordination skills that the rudiments build, but for people closer to the
beginner end of the spectrum one useful simplification is to reduce the melody
to a single upper string rather than strictly following the notation in the
Guitar Pro files.

Here is an example — Ex3.13, the Classic Travis pattern — to give you a sense
of what a rudiment looks like:

{% include figure image_path="/assets/images/rhythmic-rudiments-ex3.13.jpg"
   alt="Ex3.13: Classic Travis picking pattern"
   caption="Ex3.13: Classic Travis picking pattern" %}

The rudiments are organized by how many times the fingers play per measure.
Call that value N. There is a Guitar Pro file for every value of N from 0
through 8.

When N equals 1, the fingers play a melody note exactly once per bar. There
are eight possible positions for that single note: any of the on-beats (1, 2,
3, or 4) or the off-beats (1&, 2&, 3&, or 4&). Thus the file
rhythmic-rudiments-ex1.gp contains eight rudiments, Ex1.1 through Ex1.8.

When N equals 2, the fingers play twice per bar. As you might recall from
math class, the number of possible combinations grows rapidly, giving us
Ex2.1 through Ex2.28. The number of combinations peaks when N equals 4 and
then declines in a mirror-like fashion. At the extremes — N=0 and N=8 —
there is only one possible arrangement. Here is the full tally:

    N     | Rudiments
    -----------------
    0     | 1
    1     | 8
    2     | 28
    3     | 56
    4     | 70
    5     | 56
    6     | 28
    7     | 8
    8     | 1
    -----------------
    Total | 256

## How to eat an elephant

Nobody picks up a guitar to drill rudiments — we come for the songs. I
approach skill-building in small increments: about five minutes of focused
technique work at the start of each practice session, whatever the current
project happens to be. The first time I worked through these rudiments
systematically, I probably spent a few months on them. At the time I was
somewhere in the beginner-to-intermediate range for fingerstyle guitar, so
someone starting from scratch would need to budget more time per rudiment
than I did.

Some of these exercises are easy — a session or two and they're done. Others
might take several days. My advice is not to grind on any single one for too
long. Work on it for a bit, set it aside if you're not yet fluent, and come
back the next day. You will almost certainly be a little better. The brain and
hands continue consolidating motor skills during sleep. Be patient and give
them the time to do their work. Small bits of steady, focused practice can
accomplish more than most people expect.

## What if I'm not crazy enough to eat a whole elephant?

When I worked through these rudiments a second time, in preparation for writing
this post, I kept a running list of the exercises that seemed most musically
interesting or promising. If 256 rudiments sounds like more than you're willing
to take on, there are a couple of ways to reduce the scope without losing the
essential benefit.

The first is a bare minimum: five exercises that represent the essential core,
drawn from the family of Travis picking patterns. The second is a larger
personal selection — roughly a quarter of the full set — consisting of the
exercises I found most musically rewarding. Both are described below.

## Essential core: the Travis picking family

Some of these rudiments correspond to picking patterns that are genuinely
famous in the fingerstyle world. The clearest example is the Travis picking
family.

Start with Ex3.13, which most players would recognize as the quintessential
Travis picking pattern.[^2] Strip one melody note away and you get Ex2.3 — a
minimal Travis variant that is useful precisely because it isolates the
defining characteristics of the style: a melody note on beat 1 paired with a
syncopated melody note on beat 2&. That's the heart of Travis picking.

Going the other direction — adding a melody note — gives us Ex4.30, the
rhythmic shape of the picking pattern used in songs like "Dust in the Wind."
Each addition is another syncopated note.

Take one more step and add the final syncopated melody note, on beat 1&, and
you arrive at Ex5.15. I've seen this called the London pattern in some
instructional materials, though I've come to prefer the name Busy Travis.[^3]

As a final variation, drop the melody note on beat 1 from that pattern and
you get Ex4.50 — the rhythmic shape of the outside-inside and inside-outside
patterns described in Mark Hanson's "The Art of Solo Fingerpicking."

These five exercises form a connected family, each a single step from the
next. If you learn nothing else from this collection, learn these:

    Exercise | Melodic rhythm | Picking pattern
    ----------------------------------------------------------
    Ex2.3    | 1 2&           | Minimal Travis
    Ex3.13   | 1 2& 3&        | Classic Travis
    Ex4.30   | 1 2& 3& 4&     | Dust
    Ex5.15   | 1 1& 2& 3& 4&  | London / Busy Travis
    Ex4.50   | 1& 2& 3& 4&    | Outside-inside; Inside-outside

## A quarter of an elephant: personal favorites

The following list is subjective. As I worked through the rudiments the second
time, I kept notes on exercises that seemed most musically viable — the ones
that were fun to play, that had clear connections to known picking patterns,
or that struck me as having real musical potential.

Not every rudiment makes this list. Some are musically quite dull: play a
melody note on every downbeat and you get something mechanical, almost robotic.
Others, as N grows large, feel more like hand calisthenics than music. I worked
through all of them and believe they were useful, but a fair number felt more
like chores.

One important caveat: absence from this list should not be read as a negative
verdict. These exercises use a static melody, and a static melody combined with
a repetitive rhythm will always tend toward boredom. Some truly wonderful
picking patterns — Ex5.15 and Ex4.50 among them — sound unremarkable in the
context of a static-melody rudiment but come alive when the melody moves. Keep
that in mind when you encounter exercises here that leave you cold.

    GP file | Personal favorites
    -------------------------------------------------------
    Ex1     | 1 2 4
    Ex2     | 1 3 5 8 9 13 16 17 19 20 21 22 27
    Ex3     | 2 4 6 12 13 14 15 27 31 33 35 36 45 49 50
    Ex4     | 6 8 9 13 14 24 30 31 37 44 46 48 49 50 67 69
    Ex5     | 9 15 18 24 32 34 41 45 54
    Ex6     | 4 5 8 11 13 14 17 19 24 26

A different way to reduce scope is to focus on the lower values of N. Whether
you aim to practice all 256 rudiments or just the favorites listed above, the
greatest return per exercise tends to come from the first few Guitar Pro files.
As N increases, the melody becomes increasingly dense, which reduces musical
usefulness in proportional terms.

That said, I found real value in working through the higher-N rudiments as
well. As the number of melody notes increases, a key challenge shifts: you are
no longer training your hands to play — you are training them not to play.
With larger N, the difficulty is protecting the spaces between notes and
resisting the pull toward rhythmic patterns already internalized from the
lower-N exercises. That is a distinct and useful skill.

## Find the music in them

Whether you tackle all 256 or just a subset, treat each rudiment as a musical
performance, not a drill. Dynamics, articulation, sustain, and palm muting are
all available — use them. Some rhythms work well with a flowing, sustaining
approach. Others sound too busy that way; aggressive muting or staccato can
clarify them. Occasionally a rudiment that feels uninspiring when plucked in
a standard fingerstyle manner becomes interesting when the melody notes are
played with more of a strumming motion — Ex2.27 is one example among many.

At moments approaching chord changes, strategic muting or staccato can convert
something that sounds clumsy into something that sounds intentional. This is
especially relevant for melody notes on beat 4 and beat 4& — both of which can
feel awkward at the bar line. It is no accident that the Classic Travis pattern
contains no 4& melody note. The players who developed these patterns were
practical musicians, and they knew what they were doing.

## When to say when

When have you finished a rudiment? My approach was to set a target tempo and
stop when I could play the exercise with control and accuracy at that speed.
The Guitar Pro files are set at 120 BPM, which is generally where I stopped.

For exercises that were more musically appealing I sometimes raised the bar.
For those that felt more like physical exercises I tended not to push much
beyond the baseline. The right tempo target depends on your goals. Speed was
not a primary concern for me — I've never been drawn to particularly fast
playing styles, and my main objective was basic hand coordination. When raw
speed is needed for a specific song, I tend to address it in context rather
than in the abstract.

## Variations to consider

One could extend this work in several directions: single melody notes rather
than intervals, swing eighth notes rather than straight, a steady bass rather
than alternating, or a different chord progression.

The first variation — reducing to a single melody note — is the best
simplification for beginners and worth considering if the written notation
feels like too much to track at first.

I'm less certain about the other variations. I did not practice these rudiments
with swing eighths, though I play a fair amount of music with swing rhythm.
My rough sense is that work in straight time has translated without much
friction when swing was needed. The coordination skills seem to transfer.

Regarding steady bass: it is probably a poor allocation of effort. The harder
coordination challenge is the alternating bass, and if you can maintain rhythmic
independence against an alternating thumb, a steady bass will largely take care
of itself.

Different chord progressions are a more reasonable variation, but I'm not sure
they're worth pursuing exhaustively. The progression here already covers the
primary bass-picking motions that appear in much blues, rock, and traditional
fingerstyle music: an Am and a C chord involve the same bass motion; an E7 and
a D chord in drop-D tuning share the same motion. The key skills here are
rhythmic. Once you have the coordination, applying it to new chords is a
left-hand problem — and left-hand problems tend to sort themselves out
relatively quickly once the right hand is doing its job.

## The goods

Here are the Guitar Pro files: [Ex0][ex0-gp], [Ex1][ex1-gp], [Ex2][ex2-gp],
[Ex3][ex3-gp], [Ex4][ex4-gp], [Ex5][ex5-gp], [Ex6][ex6-gp], [Ex7][ex7-gp],
[Ex8][ex8-gp].

If Guitar Pro is outside your budget there are several applications and web
sites that can read and play these files. One worth mentioning explicitly,
because it is open-source and free, is [TuxGuitar][tux]. It handles most or
all of the core things Guitar Pro does. Both are fine tools, as are many of
the alternatives.

[ex0-gp]: /assets/downloads/rrs/rhythmic-rudiments-ex0.gp
[ex1-gp]: /assets/downloads/rrs/rhythmic-rudiments-ex1.gp
[ex2-gp]: /assets/downloads/rrs/rhythmic-rudiments-ex2.gp
[ex3-gp]: /assets/downloads/rrs/rhythmic-rudiments-ex3.gp
[ex4-gp]: /assets/downloads/rrs/rhythmic-rudiments-ex4.gp
[ex5-gp]: /assets/downloads/rrs/rhythmic-rudiments-ex5.gp
[ex6-gp]: /assets/downloads/rrs/rhythmic-rudiments-ex6.gp
[ex7-gp]: /assets/downloads/rrs/rhythmic-rudiments-ex7.gp
[ex8-gp]: /assets/downloads/rrs/rhythmic-rudiments-ex8.gp
[tux]: https://www.tuxguitar.app/

[^1]: I say "almost" because some musical material involves right-hand
    fingering combinations that can feel challenging or counterintuitive. But
    examples like this are not particularly common once you've achieved the
    ability to play the rudiments presented here.

[^2]: Travis picking as a named technique is somewhat a modern construct. My
    rough understanding is that the historical Merle Travis did not play using
    exactly the patterns now called Travis picking — the label came later and
    the patterns were codified by others.

[^3]: The naming gets confusing here. Dan Thorpe, who teaches a pattern he
    calls the London pattern (named after Ralph McTell's "Streets of London"),
    uses that name for what I call the Dust pattern — Ex4.30. "Streets of
    London" mostly uses what I call the London pattern, but does use the Dust
    pattern in some bars.
