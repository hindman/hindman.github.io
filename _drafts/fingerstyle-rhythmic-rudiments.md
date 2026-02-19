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

Of course, the right hand isn't ignored entirely. Teachers address technique:
how to hold the pick, where to anchor the hand, how classical players shape
their nails and control the angle of attack. Intermediate students working on
speed spend real time on right-hand mechanics: alternate picking, economy
picking, general shredding. But this attention tends to cluster at the
extremes — foundational setup on one end, advanced facility on the other.

Fingerstyle guitar, our genre, does devote some early energy to the right-hand
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
"rudiments", the foundational sticking patterns and rhythmic patterns they
need to play a variety of musical styles. This collection of fingerstyle
rudiments has a similar goal. If you can play all of them, you will have the
core skills to quickly learn almost any fingerstyle pattern or melody within
an alternating or steady-bass context on an 8th-note grid.[^1] That's a deep
and broad musical terrain.

## The rudiments explained

The bass is the same across all of the rudiments: the thumb plays alternating
quarter notes, cycling through the root and fifth of whatever chord is
underneath. That's the backbone.

Also constant is the harmony and structure. Every rudiment consists of eight
bars: two bars each of Am, Dm, E7, and Am again. The chord voicings are
deliberately easy (open chord you already know) and the melody notes are
simple, just two or three notes played on the upper strings. The intent is to
assign a little bit of work to the left hand, but not much. Fingerstyle
players ranging from beginners through intermediates will benefit from the
coordination skills that the rudiments build, but for people closer to the
beginner side of the spectrum one obvious simplification is to reduce the
melody notes to one upper string rather than strictly following the notation
in the Guitar Pro files.

The rudiments are organized by how many times the fingers play per measure.
Call that value N. There's a Guitar Pro file for every value from N from 0
through 8.

For example, when N equals 1, the fingers play melody notes exactly once per
bar, and there are eight possible positions for that single note to occur: it
could happen on any of the on-beats (1, 2, 3, or 4) or the off-beats (1&, 2&,
3&, or 4&). Thus, the file rhythmic-rudiments-ex1.gp contains eight rudiments,
Ex1.1 through Ex1.8.

When N equals 2, the fingers play melody notes twice per bar. As you might
recall from math class, the number of possible combinations grow rapidly,
giving us Ex2.1 through Ex2.28. The number of combinations peaks when N equals
4 and then declines in a mirror-like fashion. At the extremes (N=0 and N=8)
there is only one possible way to arrange the melody notes.

Here is the full tally sheet:

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

And here is an example of one of the rudiments, an important one we will
discuss below:

{%
    include figure
    image_path="/assets/images/rhythmic-rudiments-ex3.13.jpg"
    alt="Ex3.13: Classic Travis pattern"
    caption="Ex3.13: Classic Travis picking pattern"
%}

## How to eat an elephant

- Nobody chooses a musical hobby to drill rudiments: we come for the songs.
- I approach skill building like this in very small steps.
- At the start of each practice session I tend to work for about 5 minutes on
  whatever my current technique project happens to be.
- I probably spent a few months on these rudiments the first time I worked
  through them systematically.
- At the time I was probably in the beginner-to-intermediate skill range for
  fingerstyle guitar, so someone in the beginning stage would need to spend
  more time per rudiment than I did.
- In any case, some of the rudiments are easy and can be checked off you list
  after a session or two.
- Others might takes several days of practice.
- I don't recommend that you grind on any single exercise for a long time.
  Work on one for a little while. If you are not fluent yet, that's fine. Come
  back the next day and you will probably be a bit better at it. Your brain
  and hands do work over night. Be patient and give them the time to perform
  their magic.
- Small bits of steady, focused work can accomplish a lot more than you might
  think at first.

## If a whole elephant is too much

- I worked through these exercises a second time when preparing to write this
  post.
- During that second pass, I collected a list the rudiments that were my
  favorites or that seemed most promising musically.
- If you're looking for a less daunting program, I offer a few ideas below.
  One is a bare minimum: "Five picking patterns you MUST know" in the jargon
  of our time.
- The other my subjective listing of favorites, which whittles the job down to
  about a quarter of its size.
- Let's start with the bare minimum.

## Essential core: Travis picking patterns

- The rhythmic structures of some of these rudiments are found in some of the
  most famous fingerstyle patterns.
- For example, let's focus on "Travis picking".
- Footnote: my rough understanding is that Travis picking is a bit of a modern
  construct and that the historical Merle Travis did not play using the
  patterns that are now called Travis picking. https://www.youtube.com/watch?v=vjwFhqJCVe0
- Start with Ex3.13, which aligns with the picking pattern many people would
  call the quintessential Travis pattern.
- We can substract one melody note to get Ex2.3, which could be described as a
  minimal variant of Travis picking. This exercise is useful to study because
  it helps you understand that the defining characteristics of Travis picking
  are (a) the melody note on beat 1 and (2) the syncopated melody note on beat
  2&. That's the heart of it.
- We can go the other direction and add another note to the classic Travis
  pattern. That gives use Ex4.30, which has the rhythmic shape of the well
  known picking pattern used in songs like Dust in the Wind. This pattern also
  clues you into what we are doing as we augment classic Travis: we are adding
  another syncopated note.
- Take one more step in that direction and we can add the final syncopated
  melody note (1&), producing Ex5.15 which at various points in my notes I
  have either called the London pattern or the Busy Travis pattern. Lately, I
  lean toward the latter name.
- Footnote on my naming vs Thorpe's naming: his London pattern is my Dust
  pattern. The song "Streets of London" seems to mostly use my London pattern,
  but does use my Dust pattern for some bars.
- As a final variation to connect these Travis-related patterns to each other,
  we can drop the melody note on beat 1, giving us the rhythmic shape of
  Ex4.50. That rhythm aligns with the Outside-inside and Inside-outside
  picking patterns I learned in my introduction to fingerstyle guitar: Mark
  Hanson's "The Art of Solo Fingerpicking".
- All 5 of these patterns are essential. If you learn nothing else, learn
  them. See table below.

    Exercise | Melodic rhythm | Picking pattern
    ----------------------------------------------------------
    Ex2.3    | 1 2&           | Minimal Travis
    Ex3.13   | 1 2& 3&        | Classic Travis
    Ex4.30   | 1 2& 3& 4&     | Dust
    Ex5.15   | 1 1& 2& 3& 4&  | Busy Travis
    Ex4.50   | 1& 2& 3& 4&    | Outside-inside; Inside-outside

## Quarter elephant: my favorites

- As I worked through the rudiments the second time I kept a list of the
  exercises that seemed the most musically promising.
- As you'll discover, some of the exercises are musically quite dull: for
  example, play a melody note on every downbeat, robot style.
- Others are so busy (as N gets large) that you feel a bit like you are
  doing hand calisthenics more than playing music.
- I doggedly practiced them all and think they have helped me in building
  skill. But a fair number of the exercises felt more like chores.
- The list below is most not that. They are the rudiments that were fun to
  play, that have known connections to famous picking patterns (the Travis
  examples discussed already), or that stuck me as having real musical
  potential.
- I should emphasize that a rudiment's absense from this list of favorites
  should not be interpreted as a negative verdict on its musical
  potential.
- Remember that these exercises use a static melody. When you combine a
  static melody with a robotically predictable rhythm, you create boredom.
  But some truly great picking patterns (eg Ex5.15 or London and Ex4.50 or
  Outside-inside) sound quite dull in the context of static-melody
  rudiments but absolutely beautiful when the melody is more active.

    GP file | Favorites
    -------------------------------------------------------
    Ex1     | 1 2 4
    Ex2     | 1 3 5 8 9 13 16 17 19 20 21 22 27
    Ex3     | 2 4 6 12 13 14 15 27 31 33 35 36 45 49 50
    Ex4     | 6 8 9 13 14 24 30 31 37 44 46 48 49 50 67 69
    Ex5     | 9 15 18 24 32 34 41 45 54
    Ex6     | 4 5 8 11 13 14 17 19 24 26

## Another cut at the problem

- A diferent way to reduce the number of rudiments is less daunting
  proportions is to focus on smaller values of N.
- Whether your aim is to practice all of the rudiments or just the favorites
  listed above, your greatest bang-per-rudiment will tend to come from the
  first few Guitar Pro files.
- As N gets larger, melodic zone can easily become too busy, reducing musical
  usefulness.
- As noted, I worked diligently through all of them and think they provided a
  useful mental and physical challenge.
- For example, as the number of melodic notes rises, a key difficuly is
  training your mind and hands not to play. With larger N, the challenge
  become protecting the spaces between the notes and avoiding the trap of
  falling into some of the rhythmic grooves you have interalized from learning
  the less busy rudiments.

## Finding the music

- Whether you tackle all 256 rudiments or just a selected list, try to make
  each one as musical as you can.
- Treat the dynamics, the melody articulation, sustain, and palm muting as
  dials that you can turn to get as much music as you can out of each
  exercise.
- Some of the rhythms work fine when played with a flowing, sustaining style.
- Others might sound too busy that way, but aggressive muting or staccato at
  various points can revive them musically.
- Sometimes a rudiment might be uninspiring when plucked in typical
  fingerstyle fashion, but becomes interesting if the melody notes are played
  in more of a strumming fashion with the fingers (Ex2.27 is one of many such
  examples).
- Especially at moments before chord changes, a bit of strategic muting or
  staccato can turn something that sounds clumsy into purposeful musical
  decisions.
- In that regard, melody notes on beats 4 and especially 4& can be tricky, a
  point that lends to explanatory power to the absence of 4& in the Classic
  Travis picking pattern: the masters were practical and knew what they were
  doing!

## When to say when

- When have you finished a rudiment?
- My general approach was to select a target BPM and stop working on a
  rudiment when I felt like I could play it controlled and accurate manner.
- The Guitar Pro files are set at 120 BPM, and that's generally where I tended
  to stop.
- For rudiments that were more appealing musically I probably raised the bar a
  bit. For rudiments that felt like mere physical exercises, I tended not to
  push much beyond the target.
- What BPM should you select? It depends on your goals. I've never been very
  attracted to super-fast musical styles, so raw speed was not a key goal for
  me.
- My primary goal was to achieve basic hand coordination. If I need raw speed
  I tend to deal with it in a case-by-case way whenever a specific song part
  demands it.

## Variations to consider or reject

- One could practice rudiments like these with variations such as:
    - Single melody notes rather than intervals/triads.
    - Swing 8ths rather than straight.
    - Steady bass rather than alternating.
    - A different chord progression.
- As mentioned above, I think the first variation is an excellent
  simplification for beginners.
- I'm less certain about the other variations, however.
- I did not practice the rudiments with swing 8ths. Such work would clearly be
  within the rhythmic focus of these exercises. That said, many of the tunes I
  play have swing rhythm. My rough sense is that my work on the rudiments in
  straight time has translated without much friction into swing rhythm when I
  needed it.
- Regarding steady bass, think that might be a poor allocation of effort.
- The key benefit from these rudiments is to increase your rhythmic
  coordination and right-hand control.
- If you can do that with alternating bass, doing it during a steady bass song
  won't be a difficult adjustment. If you master these skill with alternating
  bass, steady bass will mostly come along for free.
- I did not work through this material with other chord progressions but
  that's not an unreasonable idea.
- That said, different chords mostly pose a left-hand challenge and my focus
  here has been mainly on the right hand.
- The current chords (Am, Dm, E7) already covers the primary fingerstyle bass
  picking motions that one tends to see in a lot of blues, rock, and
  traditional fingerstyle songs. Switching to a C chord, for example, involves
  the same bass picking motion as the Am chord; ditto for a D chord in drop-D
  tuning (same bass motion as E7). 
- All of which is to say that an exhaustive approach to different chords might
  not be worth the time. The key skills are rhythmic. Changing the left hand
  chords doesn't help much with that. Once you have the coordination, you can
  apply it as needed to songs with other chords.

## The goods

At last, here are the Guitar Pro files: [Ex0][ex0-gp], [Ex1][ex1-gp],
[Ex2][ex2-gp], [Ex3][ex3-gp], [Ex4][ex4-gp], [Ex5][ex5-gp], [Ex6][ex6-gp],
[Ex7][ex7-gp], [Ex8][ex8-gp].

If Guitar Pro is outside your budget there are several applications and web
sites that can read and play these files. One that I will mention explicitly,
because it is open-source software and free, is [TuxGuitar][tux]. It can do
most (maybe all) of the core things that Guitar Pro can do. In fact, I don't
precisely remember which features drove me to switch. Both apps are fine, as
are many of the alternatives.

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

[^1]: I say "almost" because some musical material involves different
    combinations of right hand fingering that can feel challenging or
    counterintuitive. But examples like this are not particularly common once
    you've achieved the ability to play the rudiments presented here.

