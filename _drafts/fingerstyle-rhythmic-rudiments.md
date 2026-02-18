---
title: "Fingerstyle rhythmic rudiments: a systematic approach"
tags:
  - fingerstyle guitar
  - right hand
  - rudiments
---

## Right hand rhythmic coordination [drop heading or improve]

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
picking, general shredding. But this attention tends to cluster at
the extremes: foundational setup on one end, advanced facility on the other.

Fingerstyle guitar, our genre, does devote some early energy to the right-hand
in the form of picking patterns, notably various Travis or roll-based
patterns. A student might learn a few of these or perhaps even a dozen of
them. What tends not to happen, at least outside of classical guitar
education, is a systematic approach to right-hand rhythmic coordination:
developing the ability to play melody notes at any point in a measure while
keeping a desired bass rhythm chugging along.

This post tries to fill that gap with 256 exercises, a number every software
engineer loves. That volume might seem excessive — some form of completist
insanity. All I can tell you is that some of the most obvious gains I've made
as a fingerstyle player have followed periods of deliberate right-hand work,
most notably the very exercises presented here. Later I'll say more about how
I worked on this material and what it did for me.

Collectively, the exercises pose this challenge: can you play any rhythmic
combination of melody 8th notes while keeping a typical alternating bass
going. Drummers build these kinds of coordination skills by practicing
"rudiments", the foundational sticking patterns and rhythmic patterns they
need to play a variety of musical styles. This collection of fingerstyle
rudiments has a similar goal. If you can play all of them, you will have the
core skills to quickly learn almost any fingerstyle pattern or melody within
an alternating or steady-bass context on an 8th-note grid.[^1] That's a deep
and broad musical terrain.

## The exercises

The bass is the same across all of the exercises: the thumb plays alternating
quarter notes, cycling through the root and fifth of whatever chord is
underneath. That's the backbone.

Also constant is the harmony and structure. Every exercise consists of eight
bars: two of Am, two of Dm, two of E7, and two of Am. The chord voicings are
deliberately easy (open chord you already know) and the melody notes are
simple, just two or three notes played on the upper strings. The intent is to
assign a little bit of work to the left hand, but not much.

The exercises are organized by how many times the fingers play per measure.
Call that value N. There's a GuitarPro file for every value from N from 0
through 8.

For example, when N equals 1, the fingers play melody notes exactly once per
bar, and there are eight possible positions for that single note to occur: it
could happen on any of the on-beats (1, 2, 3, or 4) or the off-beats (1&, 2&,
3&, or 4&). Thus, the file rhythmic-rudiments-ex1.gp contains eight exercises,
Ex1.1 through Ex1.8.

When N equals 2, the fingers play melody notes twice per bar. As you might
recall from math class, the possible combos grow rapidly, giving us Ex2.1
through Ex2.28. The number of combinations peaks when N equals 4 and then
declines in a mirror-like fashion. At the extremes (N=0 and N=8) there is only
one possible way to arrange the melody notes. Here's the fully tally sheet:

    N     | Exercises
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

[^1]: I say almost because some musical material involves different
    combinations of right hand fingering that can feel challenging or
    counterintuitive. But examples like this are not particularly common once
    you've achieved the ability to play the rudiments presented here.

