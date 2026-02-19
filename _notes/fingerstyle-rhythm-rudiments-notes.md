
# Fingerstyle Rhythmic Rudiments: Raw Notes

## Git branches

master:

    ./
        favicon.ico
        Gemfile.lock
        google58358ed2c1865cff.html
        index.html
        loopllama/
            favicon.ico
            loopllama.html
            loopllama.js
            notes.txt
            scripts/
                loopllama*
        notes/
            loopllama-v2-plan.md
            old-chat-planning/
                loopllama-chat-text.md
                loopllama-chat.json
        README.md

v1.5:

    ./
        _config.yml
        _data/
            navigation.yml
        _drafts/
        _includes/
            head/
                custom.html
        _notes/
            project-notes.md
        _pages/
            404.md
            about.md
            category-archive.md
            debug.md
            loopllama-v1.md
            tag-archive.md
            year-archive.md
        _posts/
            2025-10-30-post-demo.md
        assets/
            css/
                custom.css
                main.scss
            images/
                juan-gris-guitar-color.jpg
        favicon.ico
        Gemfile
        Gemfile.lock
        google58358ed2c1865cff.html
        index.html
        loopllama/
            index.html
            v1/
                favicon.ico
                index.html
                loopllama.js
                notes.txt
                scripts/
                    loopllama*
        README.md

## Research: what experts have said about right-hand rudiments

The strongest precedent for this approach is Giuliani's Op. 1
(120 Right-Hand Studies). It's essentially the same idea:
systematically enumerate right-hand arpeggio patterns over simple
chord changes. Written in 1812, still standard pedagogy. These
exercises do for rhythmic placement what Giuliani did for arpeggio
fingerings.

Classical pedagogues who explicitly argue right-hand primacy:

- Aaron Shearer: his method introduces right-hand free strokes
  before the left hand touches the fretboard. His position is
  that conventional teaching over-emphasizes left-hand note-finding
  at the expense of right-hand tone and rhythm.

- Abel Carlevaro: called the right hand the "voice" of the guitar
  (controls tone, dynamics, articulation). His Serie Didactica
  Cuaderno No. 4 is entirely right-hand work.

- Scott Tennant (Pumping Nylon): has stated that intermediate
  players who plateau usually have a right-hand problem, not a
  left-hand one. His arpeggio chapter enumerates p-i-m-a
  permutations systematically.

- Charles Duncan (The Art of Classical Guitar Playing): argues
  right-hand neglect happens partly because the motions are small,
  less visible, harder to self-diagnose.

- Julio Sagreras (Las Lecciones de Guitarra): early volumes use
  minimal left-hand movement while cycling through dozens of
  right-hand arpeggio figurations -- the implicit pedagogical
  argument being that the right hand needs to become automatic
  before adding left-hand complexity.

- Emilio Pujol (Escuela Razonada de la Guitarra): transmitted
  the Tarrega school's emphasis on right-hand tone quality as
  the defining characteristic of a guitarist's musical identity.

- Ricardo Iznaola (Kitharologus: The Path to Virtuosity): treats
  right-hand development as a distinct technical domain requiring
  its own dedicated practice regimen.

- Christopher Parkening (Guitar Method): structures early lessons
  with heavy emphasis on right-hand exercises before combining
  hands.

Travis picking pedagogy supports the approach directly:

- Mark Hanson (The Art of Contemporary Travis Picking): drills
  thumb alone for weeks before adding melody fingers. The thumb
  must be automatic first.

- Chet Atkins: "the thumb is the drummer." Universal advice from
  Travis teachers: don't rush past the thumb.

- Tommy Emmanuel: describes his practice as largely right-hand
  pattern drilling; his musical vocabulary is fundamentally a
  vocabulary of right-hand patterns.

On the "rudiments" framing specifically: the term is borrowed from
percussion and isn't commonly used in guitar pedagogy, but the
concept is everywhere -- Giuliani's Op. 1, Tennant's permutation
exercises, Sagreras's early volumes. The exercises name something
that has existed unnamed.

The structural argument: most popular guitar instruction is
organized around chords, scales, and songs -- all left-hand-forward.
The right hand is treated as "just strums" or "just picks."
Classical pedagogy does better but still tends toward
repertoire-driven teaching. These exercises address a genuine gap:
systematic, exhaustive right-hand rhythmic drilling in a fingerstyle
context.

## Ideas for intro/motivation

A few distinct angles, each with a sketch of how it could open the
post:

---

3. The diagnosis angle

When a fingerstyle player's timing feels loose, the instinct is to
slow down and work through the chord changes more carefully. That's
usually the wrong diagnosis. The left hand can almost always get to
the right fret in time. The problem is that the right hand doesn't
know exactly when "in time" is. That distinction -- between knowing
the notes and knowing where in the beat they land -- is what these
exercises are designed to expose and correct.

This is concrete and practical. It names a specific failure mode and
positions the exercises as the solution.

---

5. The "what you're actually practicing" angle

When you're working through a piece of music, you're solving several
problems at once: where the left hand goes, what the right hand does,
how the two synchronize, and whether the whole thing holds together
rhythmically. That's a lot to track simultaneously, and it makes it
hard to know which problem is causing the breakdown when something
goes wrong. These exercises strip most of that away. The chord
voicings are simple enough to ignore. The only question is whether
the right-hand rhythm is where you think it is.

This justifies the design choice of using simple chords -- the
deliberate de-emphasis of the left hand.

## Key concept: thumb-finger independence

Independence — the overarching concept your exercises are building.
"Thumb-finger independence" is the standard term for the ability to maintain a
steady thumb pattern while the fingers operate freely against it. This is what
"the thumb is the drummer" is pointing at.

Polyphonic texture / two-voice texture — the musical result of what you're
doing. Bass and melody are two independent voices. Some teachers use
"contrapuntal" loosely in this context. Classical pedagogy talks about
bringing out the melody voice while subordinating the bass, which presupposes
they're genuinely independent.

## network anaysis

Edit python program to emit just section titles.

Analyse the titles to create a graph.

Travis pick examples in a kind of lineal graph: parent-child, where
a child has all of the parent's beats.

Also possible are siblings: where they have the same N but 1 beat is
shifted 1 step.

Beats on which melody notes are played, space delimited.

    Ex0.1
    Ex1.1  1
    Ex1.2  1&
    Ex1.3  2
    Ex1.4  2&
    Ex1.5  3
    Ex1.6  3&
    Ex1.7  4
    Ex1.8  4&
    Ex2.1  1  1&
    Ex2.2  1  2
    Ex2.3  1  2&
    Ex2.4  1  3
    Ex2.5  1  3&
    Ex2.6  1  4
    Ex2.7  1  4&
    Ex2.8  1& 2
    Ex2.9  1& 2&
    Ex2.10 1& 3
    Ex2.11 1& 3&
    Ex2.12 1& 4
    Ex2.13 1& 4&
    Ex2.14 2  2&
    Ex2.15 2  3
    Ex2.16 2  3&
    Ex2.17 2  4
    Ex2.18 2  4&
    Ex2.19 2& 3
    Ex2.20 2& 3&
    Ex2.21 2& 4
    Ex2.22 2& 4&
    Ex2.23 3  3&
    Ex2.24 3  4
    Ex2.25 3  4&
    Ex2.26 3& 4
    Ex2.27 3& 4&
    Ex2.28 4  4&
    Ex3.1  1  1& 2
    Ex3.2  1  1& 2&
    Ex3.3  1  1& 3
    Ex3.4  1  1& 3&
    Ex3.5  1  1& 4
    Ex3.6  1  1& 4&
    Ex3.7  1  2  2&
    Ex3.8  1  2  3
    Ex3.9  1  2  3&
    Ex3.10 1  2  4
    Ex3.11 1  2  4&
    Ex3.12 1  2& 3
    Ex3.13 1  2& 3&
    Ex3.14 1  2& 4
    Ex3.15 1  2& 4&
    Ex3.16 1  3  3&
    Ex3.17 1  3  4
    Ex3.18 1  3  4&
    Ex3.19 1  3& 4
    Ex3.20 1  3& 4&
    Ex3.21 1  4  4&
    Ex3.22 1& 2  2&
    Ex3.23 1& 2  3
    Ex3.24 1& 2  3&
    Ex3.25 1& 2  4
    Ex3.26 1& 2  4&
    Ex3.27 1& 2& 3
    Ex3.28 1& 2& 3&
    Ex3.29 1& 2& 4
    Ex3.30 1& 2& 4&
    Ex3.31 1& 3  3&
    Ex3.32 1& 3  4
    Ex3.33 1& 3  4&
    Ex3.34 1& 3& 4
    Ex3.35 1& 3& 4&
    Ex3.36 1& 4  4&
    Ex3.37 2  2& 3
    Ex3.38 2  2& 3&
    Ex3.39 2  2& 4
    Ex3.40 2  2& 4&
    Ex3.41 2  3  3&
    Ex3.42 2  3  4
    Ex3.43 2  3  4&
    Ex3.44 2  3& 4
    Ex3.45 2  3& 4&
    Ex3.46 2  4  4&
    Ex3.47 2& 3  3&
    Ex3.48 2& 3  4
    Ex3.49 2& 3  4&
    Ex3.50 2& 3& 4
    Ex3.51 2& 3& 4&
    Ex3.52 2& 4  4&
    Ex3.53 3  3& 4
    Ex3.54 3  3& 4&
    Ex3.55 3  4  4&
    Ex3.56 3& 4  4&
    Ex4.1  1  1& 2  2&
    Ex4.2  1  1& 2  3
    Ex4.3  1  1& 2  3&
    Ex4.4  1  1& 2  4
    Ex4.5  1  1& 2  4&
    Ex4.6  1  1& 2& 3
    Ex4.7  1  1& 2& 3&
    Ex4.8  1  1& 2& 4
    Ex4.9  1  1& 2& 4&
    Ex4.10 1  1& 3  3&
    Ex4.11 1  1& 3  4
    Ex4.12 1  1& 3  4&
    Ex4.13 1  1& 3& 4
    Ex4.14 1  1& 3& 4&
    Ex4.15 1  1& 4  4&
    Ex4.16 1  2  2& 3
    Ex4.17 1  2  2& 3&
    Ex4.18 1  2  2& 4
    Ex4.19 1  2  2& 4&
    Ex4.20 1  2  3  3&
    Ex4.21 1  2  3  4
    Ex4.22 1  2  3  4&
    Ex4.23 1  2  3& 4
    Ex4.24 1  2  3& 4&
    Ex4.25 1  2  4  4&
    Ex4.26 1  2& 3  3&
    Ex4.27 1  2& 3  4
    Ex4.28 1  2& 3  4&
    Ex4.29 1  2& 3& 4
    Ex4.30 1  2& 3& 4&
    Ex4.31 1  2& 4  4&
    Ex4.32 1  3  3& 4
    Ex4.33 1  3  3& 4&
    Ex4.34 1  3  4  4&
    Ex4.35 1  3& 4  4&
    Ex4.36 1& 2  2& 3
    Ex4.37 1& 2  2& 3&
    Ex4.38 1& 2  2& 4
    Ex4.39 1& 2  2& 4&
    Ex4.40 1& 2  3  3&
    Ex4.41 1& 2  3  4
    Ex4.42 1& 2  3  4&
    Ex4.43 1& 2  3& 4
    Ex4.44 1& 2  3& 4&
    Ex4.45 1& 2  4  4&
    Ex4.46 1& 2& 3  3&
    Ex4.47 1& 2& 3  4
    Ex4.48 1& 2& 3  4&
    Ex4.49 1& 2& 3& 4
    Ex4.50 1& 2& 3& 4&
    Ex4.51 1& 2& 4  4&
    Ex4.52 1& 3  3& 4
    Ex4.53 1& 3  3& 4&
    Ex4.54 1& 3  4  4&
    Ex4.55 1& 3& 4  4&
    Ex4.56 2  2& 3  3&
    Ex4.57 2  2& 3  4
    Ex4.58 2  2& 3  4&
    Ex4.59 2  2& 3& 4
    Ex4.60 2  2& 3& 4&
    Ex4.61 2  2& 4  4&
    Ex4.62 2  3  3& 4
    Ex4.63 2  3  3& 4&
    Ex4.64 2  3  4  4&
    Ex4.65 2  3& 4  4&
    Ex4.66 2& 3  3& 4
    Ex4.67 2& 3  3& 4&
    Ex4.68 2& 3  4  4&
    Ex4.69 2& 3& 4  4&
    Ex4.70 3  3& 4  4&
    Ex5.1  1  1& 2  2& 3
    Ex5.2  1  1& 2  2& 3&
    Ex5.3  1  1& 2  2& 4
    Ex5.4  1  1& 2  2& 4&
    Ex5.5  1  1& 2  3  3&
    Ex5.6  1  1& 2  3  4
    Ex5.7  1  1& 2  3  4&
    Ex5.8  1  1& 2  3& 4
    Ex5.9  1  1& 2  3& 4&
    Ex5.10 1  1& 2  4  4&
    Ex5.11 1  1& 2& 3  3&
    Ex5.12 1  1& 2& 3  4
    Ex5.13 1  1& 2& 3  4&
    Ex5.14 1  1& 2& 3& 4
    Ex5.15 1  1& 2& 3& 4&
    Ex5.16 1  1& 2& 4  4&
    Ex5.17 1  1& 3  3& 4
    Ex5.18 1  1& 3  3& 4&
    Ex5.19 1  1& 3  4  4&
    Ex5.20 1  1& 3& 4  4&
    Ex5.21 1  2  2& 3  3&
    Ex5.22 1  2  2& 3  4
    Ex5.23 1  2  2& 3  4&
    Ex5.24 1  2  2& 3& 4
    Ex5.25 1  2  2& 3& 4&
    Ex5.26 1  2  2& 4  4&
    Ex5.27 1  2  3  3& 4
    Ex5.28 1  2  3  3& 4&
    Ex5.29 1  2  3  4  4&
    Ex5.30 1  2  3& 4  4&
    Ex5.31 1  2& 3  3& 4
    Ex5.32 1  2& 3  3& 4&
    Ex5.33 1  2& 3  4  4&
    Ex5.34 1  2& 3& 4  4&
    Ex5.35 1  3  3& 4  4&
    Ex5.36 1& 2  2& 3  3&
    Ex5.37 1& 2  2& 3  4
    Ex5.38 1& 2  2& 3  4&
    Ex5.39 1& 2  2& 3& 4
    Ex5.40 1& 2  2& 3& 4&
    Ex5.41 1& 2  2& 4  4&
    Ex5.42 1& 2  3  3& 4
    Ex5.43 1& 2  3  3& 4&
    Ex5.44 1& 2  3  4  4&
    Ex5.45 1& 2  3& 4  4&
    Ex5.46 1& 2& 3  3& 4
    Ex5.47 1& 2& 3  3& 4&
    Ex5.48 1& 2& 3  4  4&
    Ex5.49 1& 2& 3& 4  4&
    Ex5.50 1& 3  3& 4  4&
    Ex5.51 2  2& 3  3& 4
    Ex5.52 2  2& 3  3& 4&
    Ex5.53 2  2& 3  4  4&
    Ex5.54 2  2& 3& 4  4&
    Ex5.55 2  3  3& 4  4&
    Ex5.56 2& 3  3& 4  4&
    Ex6.1  1  1& 2  2& 3  3&
    Ex6.2  1  1& 2  2& 3  4
    Ex6.3  1  1& 2  2& 3  4&
    Ex6.4  1  1& 2  2& 3& 4
    Ex6.5  1  1& 2  2& 3& 4&
    Ex6.6  1  1& 2  2& 4  4&
    Ex6.7  1  1& 2  3  3& 4
    Ex6.8  1  1& 2  3  3& 4&
    Ex6.9  1  1& 2  3  4  4&
    Ex6.10 1  1& 2  3& 4  4&
    Ex6.11 1  1& 2& 3  3& 4
    Ex6.12 1  1& 2& 3  3& 4&
    Ex6.13 1  1& 2& 3  4  4&
    Ex6.14 1  1& 2& 3& 4  4&
    Ex6.15 1  1& 3  3& 4  4&
    Ex6.16 1  2  2& 3  3& 4
    Ex6.17 1  2  2& 3  3& 4&
    Ex6.18 1  2  2& 3  4  4&
    Ex6.19 1  2  2& 3& 4  4&
    Ex6.20 1  2  3  3& 4  4&
    Ex6.21 1  2& 3  3& 4  4&
    Ex6.22 1& 2  2& 3  3& 4
    Ex6.23 1& 2  2& 3  3& 4&
    Ex6.24 1& 2  2& 3  4  4&
    Ex6.25 1& 2  2& 3& 4  4&
    Ex6.26 1& 2  3  3& 4  4&
    Ex6.27 1& 2& 3  3& 4  4&
    Ex6.28 2  2& 3  3& 4  4&
    Ex7.1  1  1& 2  2& 3  3& 4
    Ex7.2  1  1& 2  2& 3  3& 4&
    Ex7.3  1  1& 2  2& 3  4  4&
    Ex7.4  1  1& 2  2& 3& 4  4&
    Ex7.5  1  1& 2  3  3& 4  4&
    Ex7.6  1  1& 2& 3  3& 4  4&
    Ex7.7  1  2  2& 3  3& 4  4&
    Ex7.8  1& 2  2& 3  3& 4  4&
    Ex8.1  1  1& 2  2& 3  3& 4 4&

