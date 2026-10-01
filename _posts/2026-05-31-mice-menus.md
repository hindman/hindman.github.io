---
title: "Of mice and menus: an interface tragedy"

excerpt: >

  The mouse was never the right tool for issuing routine commands, a point its
  inventors understood. The early history of computing produced a better
  alternative: modal, multi-key, grammar-based keyboard systems.

---

<!--

## The trouble with mice
## The command-line and its constraints
## Raskin's case against modes
## The Canon Cat: theory meets practice
## There will be modes
## Modes all the way down
## The Llama
## The tragedy

-->

Since the 1980s the dominant interface model has been the same: reach, point,
scroll, click. Many common operations have keyboard shortcuts and most users
stop after learning a handful of basics like copy, paste, and print. Some push
further, but even the office Excel expert hits a ceiling. Only so many
arbitrary `Ctrl-Alt` combinations fit in memory.

I recently completed [LoopLlama][llv2], a browser-based tool for close study
of YouTube videos. The application has menus and familiar mouse-oriented
controls such as buttons, dropdowns, and toggles. But at its core, LoopLlama
has a keyboard-first design: my goal was to control everything with simple key
presses while holding a guitar and wearing a thumb pick. Building it sharpened
my convictions. The application is a distilled example of a better interface —
one with strong historical precedents that computing culture ignored as it
solidified in the late twentieth century.

## The trouble with mice

The mouse is tuned for spatial actions like pointing, dragging, or drawing.
Routine commands like move-to-start, save-file, undo-change, or toggle-setting
do not require aiming at anything. Reaching for a mouse to do them is slower
than pressing a key or two. The costs are small one at a time, but they add
up.

The problem was recognized early in computing history. Two examples will
suffice:

  - [Douglas Engelbart][douglas_engelbart] led the Augmentation Research
    Center in SRI International during the 1960s. In 1968, Engelbart and other
    ARC staffers presented their [oN-Line System][nls] (NLS), which introduced
    many of the elements of modern, interactive computing, including the
    computer mouse. The presentation was so striking to subsequent observers
    that it became known as [The Mother of All Demos][mother_demos]. Aiming to
    make knowledge work more powerful, Engelbart and his team understood the
    division of labor sketched above. NLS paired the mouse with the keyboard:
    the mouse for spatial tasks, the keyboard for text entry and commands.[^1]
    Only the pointing half of that vision survived contact with the
    marketplace.

  - Later in the 1980s and 1990s, human-computer interface expert [Jef
    Raskin][jef_raskin] put the case in more rigorous terms, drawing on
    empirical models of human motor performance and task completion time.[^2]
    Applied to command input, they confirmed and quantified the argument:
    mouse operations are slower than keyboard equivalents for commands.

## The command-line and its constraints

Although the consumer market would become dominated by mouse-and-menus, an
older tradition — Unix and the command-line world — had built a culture around
keyboard primacy. Since command-line computing became powerful before the
mouse existed as a widely available device, the mouse could only augment it at
the margins.

Applications in that computing tradition faced an unavoidable constraint:
their large command vocabularies exceeded the keyboard's limited real estate.
A typical modern keyboard has about 50 keys producing regular characters, and
only 26 of them (the letters) have obvious mnemonic potential. LoopLlama, for
example, is a rich application for its purpose, but it is tiny compared to the
software that computer users spend the most time with: word processors,
spreadsheet applications, web browsers, and many others. LoopLlama has roughly
100 bindings to cover its operations — already twice the keyboard's raw
capacity.

The dominant answer to that constraint was keyboard expansion, along two
pathways. One was additive: function keys, a dedicated row of extra keys above
the main keyboard, provided 12 new binding slots.

The second was multiplicative: modifier keys. A keyboard's default behavior is
to emit a character on each key press; a modifier intercepts that signal and
redirects it, allowing the same key to serve double duty. As modifiers
accumulated over time — `Ctrl` in early terminals, `Alt` from the IBM PC,
`Cmd` and `Option` from the Mac — the available binding space grew
accordingly.

By the end of the 1990s, a keyboard-oriented user had not only more keys —
function keys, arrows, a navigational cluster, and a number keypad — but also
several modifiers. The net effect was substantial. Applications running in
those environments had hundreds of available binding slots, roughly 800 by my
back-of-the-envelope calculation.

Although the expansion of key binding real estate was impressive in raw
numbers, most of that terrain turned out to be useless in practice, because
humans cannot remember the bindings. The letter component of a binding can
carry meaning: `Ctrl-p` for print, `Ctrl-s` for save, `Ctrl-c` for copy. But the
modifiers themselves are abstractions. Any given operation might use `Ctrl`,
`Ctrl-Shift`, `Ctrl-Alt`, or something more elaborate. Under favorable
conditions, a well-designed application could group bindings thematically
under different modifier combinations to reduce the mnemonic burden. In
practice, the logic behind the binding schemes of many major applications is
somewhere between opaque and non-existent.

The other problem with the modifier strategy is physical. Although `Shift`
sits at the natural extension of the pinky, the primary modifiers for issuing
commands are ergonomic disasters, involving either awkward stretches to reach
a single modifier or full shifts out of typing position to press more than
one.

In the consumer market, a third pathway emerged. For many operations, there
would simply be no key binding. Most users learned a handful of keyboard
shortcuts and stopped there. The rest of their command vocabulary lived behind
menus and long days of point and click.

One response to those constraints was a call to embrace expertise — to stop
complaining about the difficulty of keyboard mastery and invest the effort to
achieve it. No one made that case more vividly than [Neal
Stephenson][stephenson_essay] in the 1999 essay, "In the Beginning... Was the
Command Line", which portrayed Linux as a freely available tank, Windows as a
breakdown-prone station wagon, and Mac as an elegant but confining sports car.
Stephenson understood why so many users opted for the initial ease and
reassurance of purchasing from a friendly dealer, but he upheld the virtues of
the few who would invest the time to learn how to drive and maintain a tank.

Stephenson's case addresses a minority; a related question about expertise
applies broadly. Because their needs do not justify it, most people will never
invest that heavily in most of the software they use. But most people have at
least one application they use often enough to warrant such investment: the
person who spends a significant chunk of every workday in Word, Excel, or
Outlook; the retiree who manages a photo collection in Lightroom; the teacher
who assembles lecture slides in PowerPoint. Additional expertise would pay
off, but if the route to expertise goes through a thicket of modifier-based
key bindings, few will make the journey.

## Raskin's case against modes

Interface expert Jef Raskin had long criticized both computing paradigms on
offer. On one pole was the expert-oriented computing tradition of Unix and the
command-line. Although powerful, this user interface provided poor visual
feedback and was too demanding for ordinary computer users. Since it had
already lost any claim on the mainstream, it was not his primary target.
Meanwhile, the [GUI][wiki_gui] systems from Microsoft and Apple had become
almost as opaque as the command-line systems they replaced, with deep menu
hierarchies that required users to know where to look when trying to perform a
task — a mnemonic burden in a new form.

In 2000, Raskin published [*The Humane Interface*][humane_interface], which
brought together critiques he had been developing since the 1980s. The book's
guiding claims were that interfaces should prioritize alignment with human
cognition rather than computer internals and that design should aim to
increase efficiency for all users, not just dedicated experts.

Both cognitive science and everyday experience show that practiced actions
become automatic: driving, typing, using a TV remote, riding a bicycle. A
central idea in Raskin's work is that good interfaces should aim to support
automaticity — for users to stop consciously deciding and simply to act. By
contrast, interfaces that change from version to version; that have different
behaviors in different contexts, forcing users to track state; that provide
insufficient feedback or have large delays between action and response; that
have high error costs (for example, no undo) — such traits force users to act
consciously rather than automatically.

Raskin identified modes as the most systematic of these failures. A mode is a
state of the interface in which the same user action produces different
results. The computing environment of the 1980s and 1990s supplied vivid
examples: the `Caps Lock` key, inherited from the typewriter, which silently
converted letter key presses to uppercase; word processors that toggled
between inserting and overwriting text; image editors and presentation tools
that required the user to track which drawing tool was active; and vi, the
command-line world's dominant text editor, built on a modal foundation. In
each case, the same action — a key press or a mouse click — produced different
results depending on application state that the user had to remember.

In such interfaces, mode errors can occur any time the user becomes too
preoccupied or rushed. Such errors were bothersome for novice users, but
Raskin's deeper critique emphasized how experts are especially vulnerable:
they work fast, so mistakes pile up before a mode error is noticed.

Raskin's prescription followed from the diagnosis: modes should be eliminated
whenever possible. Where they could not be, his preferred alternative was the
quasimode — a held key, active only while pressed. Unlike a persistent mode, a
quasimode cannot be easily forgotten because it is tactile.

## The Canon Cat: theory meets practice

Although Raskin had played a leading role in an early phase of the Macintosh
project, he was disappointed by the result — mouse-heavy, dependent on menus,
prone to modal interruptions. In 1987, he led the design of an alternative: the
[Canon Cat][wiki_canon_cat], a word-processing computer that put into practice
the [interface principles][cat_promo] he would later codify in *The Humane
Interface*.

Following those principles, the Cat's design rejected two of the three
keyboard real estate strategies: the surrender approach, which exiled
low-priority operations to menus; and modes, his primary target. That left
keyboard expansion, specifically with modifiers. The [Cat
innovated][cat_keyboard] on that approach in two ways:

  - The first was a pair of `USE FRONT` keys, positioned on the left and right
    sides of the spacebar, replacing the usual modifier keys in those spots.
    The `USE FRONT` keys activated a quasimode: holding the key changed the
    keyboard's behavior. The payload was printed on the front edges of the
    keys — Copy, Calc, Print, Bold, Indent, Spell Checker, and so on. The
    hardware documented the software.

  - The second was a pair of `LEAP` keys, positioned below the spacebar for
    thumb operation — a significant ergonomic improvement over the usual
    modifiers. Holding `LEAP` while typing a literal string moved the cursor
    dynamically through the document as each character was entered — in
    effect, an incremental search. The same mechanism supported text
    selection: position the cursor at one endpoint, `LEAP` to the other, and
    then press both `LEAP` keys simultaneously to select the text between.
    Like `USE FRONT`, the `LEAP` keys were quasimodal, active only while held,
    so their effect on the keyboard's behavior was always explicit and
    tactile.

The Cat sold poorly and was discontinued after [six months][cat_six_months] on
the market. That failure could be attributed to bad timing or business
strategy, but my judgment is that the Cat was built on a deeply flawed vision.
Three problems stand out:

The first flaw was that the Cat ultimately embraced the surrender strategy.
The GUI market surrendered by exiling lower-priority operations to menus. The
Cat avoided that move, but only by restricting what the device could do. It
was primarily a word-processing appliance, not a general-purpose computer. It
had computing at the margins — a calculator accessible via the Calc key, and a
lower-level toolchain for [Forth][wiki_forth] and [assembly][wiki_assembly] —
but it had no support for third-party software. The operation catalog could
fit on the front edges of the keys precisely because the domain had been so
thoroughly narrowed.

The second flaw was that `LEAP`, as the Cat's sole navigation primitive, failed
both ends of the user spectrum, leaving it in an interface sour spot:

- For beginners, the Cat was an [RTFM][wiki_rtfm] device from the start. It
  had no arrow keys, leaving novices stranded. The `LEAP` keys could move the
  cursor one character at a time (called "creeping"), but the manual
  admonished users not to rely on creeping as a crutch. After a user learned
  to leap, the physical tax was permanent, because every navigation required
  holding `LEAP` while typing a search string. That is the inescapable cost of
  the quasimode approach — the same cost paid by every modifier scheme — but
  magnified to include entire query strings. Finally, although the promotional
  video made the Cat look effortless, for less frequent operations the user
  manual told a different story: the instructions took real effort to
  decipher, and the key sequences seemed balky.

- For intermediate and expert users, the ceiling was low. Leaping was literal
  text search: no wildcards, [regular expressions][wiki_regex], or text
  objects.[^3] GUI word processors had long offered at least wildcards and
  navigational support for words and paragraphs. Command-line editors went
  much farther on both fronts. The best the user manual could offer was
  approximate literal-search workarounds for some text objects.

The Cat's third flaw cut deepest, because it was a theory violation, not just
a limit. Its cursor had two states — wide and narrow — that controlled the
direction of text erasure and whether typing would insert or replace existing
text. By Raskin's own definition, this is a mode — and not a peripheral one.
More striking still: the same behavior is found in vi, the command-line text
editor proudly standing on the opposite side of the modes debate. Vi users
switch between normal mode, insert mode, and replace mode — distinctions
conveyed via cursor shape, just like the Cat. The most determined opponent of
modes in computing built them into his signature product.

## There will be modes

The Cat's cursor mode is a clear violation of Raskin's own theory and a clue
that wisdom lies in the recognition that modes are unavoidable.

<span class="phead">Applications required</span>. The logical case begins with
the inevitability of applications. To modern computer users, that is a
puzzling place to start — a claim so obvious as to be hardly worth making. But
Raskin's writing and the Cat's advertising material sometimes conveyed the
idea that computer users should not have to bother with pesky details like
applications, desktops, directories, and even files. At the same time, a
[promotional video][cat_promo] for the Cat explicitly mentions spreadsheets
and database applications running on the device. The admission was compelled
because, by 1987, such applications were becoming standard in office
computing. The video glosses over the contradiction: was the Cat an appliance
optimized for editing text or a general-purpose computer? Anyone who has spent
serious time in a spreadsheet application knows how fanciful that vision is. A
spreadsheet is not a word processor, and a database application is not a
spreadsheet. Each involves different data, different tasks, and thus different
interfaces. Cramming Excel into a text editor will not cut it.

<span class="phead">Applications are modes</span>. Each application's
interface is a mode — a state in which the same keyboard and mouse inputs
produce different results. To grant that different applications require their
own interfaces — and there is no plausible argument against it — is to grant
that some modes are unavoidable.

<span class="phead">Modes within applications</span>. The same reasoning
applies at the next level down. Many applications need to support multiple
kinds of work. Mapping applications have searching and exploring, but also
direct navigation to a destination. Presentation software is used to create
slides and present them. More relevant for our purposes, many applications —
notably, word processors, text editors, and spreadsheets — need to support at
least two types of work: directly typing text versus issuing commands for
editing and navigation. The more distinct the tasks, the stronger the case for
distinct interfaces. Modes enter the scene again.

<span class="phead">Refutation by counterexample: QED</span>. If computing
operates with at least two irreducible layers of modes — applications and then
major task interfaces within them — a blanket prohibition cannot stand. In
fairness, Raskin's views were not that rigid, but he did make strong claims
about the harmfulness of modes and his goal to eliminate them. At this point,
however, a strong anti-modes stance has lost its footing: the debate is no
longer whether modes are harmful or should exist; it shifts to sharper
questions.

Those questions concern what makes modes cognitively manageable and worth
having. Several criteria matter:

  - Visibility. A hidden mode will be forgotten, leading to errors. A clear
    indicator keeps the current mode in peripheral awareness without demanding
    attention.

  - Task clarity. The mode should correspond to work the user recognizes as
    meaningfully distinct. Modes organized around clear task differences give
    users a mental model: they implicitly know the current mode because they
    know what they are doing.

  - Switching cost-benefit. Changing mode should be effortless when intended
    and hard to trigger by accident. And a mode's value should justify the
    keyboard real estate its entry binding costs.

  - Risk. Some mode errors are easily reversed; others can destroy work.

We can apply those criteria to two classic examples from the modes literature:

  - `Caps Lock` fails on most of them. Its indicator — at most a small LED —
    is easy to overlook. Sitting on prime keyboard real estate, it is often
    triggered by mistake. And its task, sustained all-caps typing, is rare and
    has easy alternatives in most editors. Valuable real estate, frequent
    mistakes, uncommon task: the cost-benefit is badly skewed.

  - Vi's insert and normal modes tell the other story. The task distinction is
    meaningful: typing text versus issuing commands. Switching cost is low:
    one key press in each direction. The risk from mode errors is real but
    substantially mitigated by vi's strong undo system. The main shortcoming
    is visibility: a cursor-shape change alone — the mechanism used by the Cat
    — is too subtle. On balance, these modes earn their place.

Raskin's automaticity concern — that tracking the current mode would stop
frequent actions from becoming habits — holds for poorly designed modes, but
gets the causation backward for well-designed ones. A mode built around a
clear task distinction doesn't burden the user's cognition; it becomes part of
it, an organizing hook like the conceptual structure supplied by applications
at a higher level.

## Modes all the way down

Accepting that modes are inevitable and cognitively sound closes the case
against them and reopens the keyboard real estate strategy Raskin had
foreclosed: using modes to solve the problem directly. Once text entry has its
own mode, letters, digits, and punctuation become available as bindings
everywhere else.

That expansion is the first step; the second adds structure to the binding
scheme, making it more meaningful and memorable. Vi's normal mode, for
example, rests on a small vocabulary of atoms governed by a grammar. There are
verbs for operations, such as `d` for delete, `y` for yank (copy), and `c` for
change. Nouns name text objects or navigation targets: for example, `w` for
word start, `ap` for a paragraph and the blank lines following it, or `L` for
the last line on the screen. Quantifiers are optional numeric prefixes that
scale the verb, the noun, or both. Users learn those atoms and can combine
them according to the grammar: `dw` deletes a word; `d5w` deletes five; `3yap`
yanks three paragraphs starting with the current.

The arithmetic is striking. A modifier strategy starting with 26 letters and
adding `Shift` yields only 52 binding slots. A multi-key strategy using the
same 26 letters as two-character sequences produces 676 (plus another 676 if
we bother with `Shift`). But the raw count understates the advantage, because
the two approaches differ not just in quantity but in mnemonic quality. A
modified binding requires two key presses but only one of them carries
meaning. In a multi-key scheme, both keys can do so: the first key is a prefix
that organizes a family of related commands; the second identifies the
specific operation within that family.

Finally, a multi-key scheme dominates a modifier scheme not just
quantitatively but ergonomically: no awkward stretches, hand shifts, or
simultaneous presses.

## The Llama

LoopLlama is built on those principles: a modal keyboard, an intuitive
grammar, and multi-key bindings.

<span class="phead">Mnemonic atoms</span>. The grammar's elements are directly
mnemonic whenever possible. The language has nouns, such as `v` for video, `c`
for chapter, `s` for section, or `m` for mark. And it has verbs like `e` for
edit, `j` for jump, `d` for delete, or `z` for zoom.

<span class="phead">Noun then verb</span>. With the vocabulary in place, the
combinations are predictable: for example, `ve` to edit the current video,
`mj` to jump to a mark, or `sd` to delete a section.

<span class="phead">Doubles are prime real estate</span>. The most frequent
operations get the double-key bindings — the easiest sequence to type. For
example, creating a new entity uses its prefix key doubled: `cc` for chapter,
`ss` for section, `ll` for loop, and `mm` for mark.

<span class="phead">Mnemonic exceptions, thoughtfully done</span>. As ever,
real estate is precious. For example, with the `s` and `l` prefixes already
claimed by sections and saved loops, the scratch loop (the application's work
area for looping) needed a different prefix. The letter `x` was chosen, in
part, because it carries the connotation of "scratch out." A related example
is the collection of bindings for the looping start and end points. Each point
has a prefix — `[` for start and `]` for end — and the bracket pair carries
the connotation of an enclosed loop. Although direct mnemonic connections are
preferred, indirect ones serve when necessary.

<span class="phead">Multi-key structure enables discoverability</span>. When
the user presses any binding prefix, a compact display of available
completions appears at the bottom of the screen — contextual help during use.
This is the scalable version of what the Canon Cat attempted with its printed
key labels.

The cognitive demands of learning LoopLlama's binding system are lower than
those of learning its features — which the user has to master regardless. The
bindings come nearly for free once the vocabulary is in place.

## The tragedy

A specific mode for direct typing, a vocabulary of nouns and verbs, and
multi-key sequences organized by grammar produce an input system that is more
capacious, memorable, and ergonomic than the mouse-menus-modifiers paradigm
can deliver. LoopLlama is evidence that the approach can be taken to its
logical conclusion. Vi is evidence that it can sustain millions of users
across decades.

Lock-in to suboptimal technologies is common enough in history. What converts
this outcome from unfortunate to tragic is how thoroughly experimentation
stopped. The early period of personal computing was genuinely exploratory.
Engelbart's NLS paired mouse and keyboard on principled lines. The [Unix
philosophy][raymond_unix] of small, composable tools demonstrated the power of
keyboard-first computing — a system architecture as much as an interface. Vi
brought modal, grammar-based editing to Unix in the late 1970s. Even the
mouse-and-menus of the Mac — although a prime target of this essay's critique
— was truly innovative. Raskin responded by designing the Canon Cat and
eventually writing *The Humane Interface*. Those efforts had their flaws, but
at least the field was alive to the problem. Then the Windows and Mac
operating systems won commercially, and the exploration largely ended.

Processing power, storage, networking, displays, software distribution, and
application domains have all been transformed since the 1980s. The direct
question of how the user tells the computer what to do has not. A better
approach was visible from the beginning. We looked away.

--------

[llv2]: /loopllama/
[douglas_engelbart]: https://en.wikipedia.org/wiki/Douglas_Engelbart
[nls]: https://en.wikipedia.org/wiki/NLS_(computer_system)
[mother_demos]: https://en.wikipedia.org/wiki/The_Mother_of_All_Demos
[chorded_keyboard]: https://en.wikipedia.org/wiki/Chorded_keyboard
[jef_raskin]: https://en.wikipedia.org/wiki/Jef_Raskin
[fitts_law]: https://en.wikipedia.org/wiki/Fitts%27s_law
[keystroke_model]: https://en.wikipedia.org/wiki/Keystroke-level_model
[stephenson_essay]: https://web.stanford.edu/class/cs81n/command.txt
[wiki_gui]: https://en.wikipedia.org/wiki/Graphical_user_interface
[humane_interface]: https://raskincenter.org/jef/humane-interface/
[wiki_canon_cat]: https://en.wikipedia.org/wiki/Canon_Cat
[cat_promo]: https://www.youtube.com/watch?v=o_TlE_U_X3c
[cat_keyboard]: https://vintagecomputer.ca/wp-content/uploads/2016/04/Canon-Cat-keyboard.jpg
[cat_six_months]: https://raskincenter.org/jef/published/cat-manual/
[wiki_forth]: https://en.wikipedia.org/wiki/Forth_(programming_language)
[wiki_assembly]: https://en.wikipedia.org/wiki/Assembly_language
[wiki_rtfm]: https://en.wikipedia.org/wiki/RTFM
[wiki_regex]: https://en.wikipedia.org/wiki/Regular_expression
[raymond_unix]: http://www.catb.org/~esr/writings/taoup/html/ch01s06.html

[^1]: NLS included both a regular keyboard and a [chorded
    keyboard][chorded_keyboard] — a five-key device held in the non-dominant
    hand, used as a dedicated command interface while the mouse hand was
    occupied.

[^2]: [Fitts's Law][fitts_law] says pointing takes longer the farther or
    smaller the target is. The [Keystroke-Level Model][keystroke_model]
    predicts the time for an expert user to complete a task by adding up the
    times for its smaller steps (keystrokes, mouse moves, and so forth).

[^3]: A text object is a structural element such as a word, line, sentence,
    paragraph, parenthesized expression, quoted string, or indented block.
    They allow a user to perform an edit or navigation without selecting the
    object's boundaries explicitly.

