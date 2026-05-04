
## TODO

Launch:
  - deploy: to get reset start/end adjustments
  - User docs: F5 post: draft
  - Make v2 the official version.

Posts:
  - RH rudiments #2: Giuliani
  - Practicing right-hand rudiments: muting
  - Blues turnarounds: a systematic approach
  - Add-a-beat. https://chatgpt.com/c/69056e95-7910-8326-bee6-dae0c53cc18b
  - Triads: lots to say.
  - 76 reasons why the filibuster is a bad idea
  - Skepticism of the science of music practice: https://chatgpt.com/c/692dd380-d5d0-832c-ad74-a768b049c47b
  - Tommy Emmanuel vs Music Practice Inc [see writing-notes]

## TODO

    _posts/2026-05-01-v2-release.md

Summary looks good.

It took me a while to get here, but I think you were right. You said 2 essays,
I said 1. Now I'm thinking 3.

  - LL v2 announcement.
    - Summary of v1 and especially v2.
    - OK to provide a brief rundown.
    - Low-key promotion of the app.
    - Maybe a mention a few how-I-use it examples.
      - Different music learning tasks.
        - Transcribing.
        - Quick learning of an idea, lick, etc.
        - Super slow mo: for detailed investigation.
      - Shed building videos.
        - Noting key points I want to revisit.
    - Nothing earth shattering, but reasonable material.

  - Working with an LLM: deep thoughts

  - LoopLlama and the tragedy of computer UX

What do you think of that tentive plan?

    The split is right. The three topics are genuinely distinct in audience, tone,
    and purpose — combining them would dilute all three.

    A few observations:

    **Essay 1** is the easiest and closest to done. The use-case examples are a
    good addition — concrete and relatable for anyone who hasn't thought about
    why you'd want this kind of tool. Shed-building videos is a nice surprise; it
    signals the app is general-purpose without having to say so directly.

    **Essay 2** has the most polished existing material. The cloud-backup case
    study is already strong. "Deep thoughts" is the right ambition — LL as the
    occasion for the argument, not the subject of it. Worth asking: what's the
    through-line? The existing draft has several good observations but they don't
    yet add up to one sharp claim.

    **Essay 3** is the most intellectually interesting and the most work. The raw
    material is there but needs structural shaping. The risk: without care, it
    reads as curmudgeon-shaking-fist-at-cloud. The things that prevent that are
    (a) the realism qualifications, (b) the cognitive science grounding, and (c)
    the ecosystem argument — which shifts the blame from users to platform
    culture. All three are in the notes. How you sequence the argument will matter
    a lot.

    One question worth settling early: does Essay 3 use LL as the positive example
    throughout, or does it stand more independently? The answer affects how much
    explanation the reader needs to follow it.

============================

We're shifting from brainstorming to drafting:

    _posts/2026-05-01-v2-release.md

The doc contains plenty of detail and/or boasting-adjacent content
that needs to be cut, scaled back, or reframed.

But let's focus on top-level questions. My gut says the backstory details are
not interesting without a bigger motivacting element: a noteworthy point we
are trying to make. Let's name those points and try to built an essay around
that, not around anything that is merely a v2 narrative (or worse, clumsy
advertisement).

Please give it a read and see what jumps out to you.

    Three observations, roughly in order of importance.

    **The one genuinely sharp claim is buried mid-piece.** "Making software
    hard to use is easy, and making it work well is hard. That remains true
    when code is cheap." That's the essay. Everything else is setup for it, or
    illustration of it. Right now it gets one sentence in the "Not vibe
    coding" section and then gets dropped. It deserves to be the spine.

    **The "legacy of scarce developer time" section is the
    second-most-interesting thing** — and it's entirely absent from the first
    two-thirds of the post. The observation that LLMs carry implicit
    cost-assumptions from a world where implementation was expensive is
    original and counter-intuitive. That's the kind of insight readers can
    take somewhere. The v1/v2 feature tour doesn't set it up at all.

    **The first two sections are mostly product documentation.** They're not
    without value — the favorites-list example is vivid, the cloud-backup case
    study earns its length — but they're written to explain the app, not to
    make a point. If the essay is really about what changed and what didn't
    when an experienced engineer built something with an LLM, then the v1/v2
    material needs to be in service of that question, not its own narrative.

    My suggested reframe: lead with the thesis (design remains hard, code got
    cheap), use the v2 build as the case study, and let the "genius junior
    engineer" / context-window / old-world-cost-assumptions observations carry
    the weight. The v1 backstory probably shrinks to a paragraph. The v2
    feature tour might disappear entirely or move to the links section.

Yes, first two sections either need to be cut or reframed. My gut says that
the design/policy side of the app does have interest as related to topics like
"what should a well-designed app be/do?" The app's features, policy, UX
pattern gain interest if they can teach anything. Any thoughts along those
lines?

    Yes, a few of the design decisions are genuinely teachable.

    **The mental model is the design.** The cloud-backup section already has
    the clearest example: once "cloud = hard drive" clicked, a cascade of
    contested questions resolved themselves. That's not just a LoopLlama story
    — it's a pattern. A good mental model isn't documentation; it's a
    decision procedure. A lot of UX writing talks about affordances and flows,
    but the upstream thing is: does the user have a correct mental model of
    what the tool is?

    **The cost of friction is nonlinear.** The `ss` instant-section example
    illustrates this directly: if creating a section requires opening a form,
    filling fields, and confirming a dialog, users won't create sections for
    anything transient. That means they won't create sections at all, because
    most work is transient. Bureaucracy doesn't just slow people down — it
    changes what they do. This generalizes far beyond apps.

    **Metadata is navigational infrastructure, not decoration.** The
    favorites-list disaster (`cb | cbm | ab | jack...`) is the negative case.
    The positive case is a named loop called "turnaround lick" that is a
    navigational anchor, not just a time range to decode. The deeper point: an
    interface that only works for the person who built it, at the moment they
    built it, has a fundamental design failure. Naming is the difference
    between a tool and a personal puzzle.

    Those three could anchor a shorter, tighter version of the first two
    sections — each principle illustrated briefly by a v1 failure and a v2
    response. Maybe 300–400 words total, instead of the current ~900.

    The question is whether you want one essay (design remains hard when code
    gets cheap) or two (what the app taught me about design + what building
    with an LLM was like). They're related but not the same argument.

Not sure I feel that any of it is so strong as to stand on its own, so my
current/tenative vision, is just one essay that (a) performs a routine
function of announcing the app for the curious and adding another post to a
currently-threadbare web site, (b) talks a little about working on v2 led to
some not-original, but at least experience-backed, insights about making
software or solving problems generally. Also, I haven't abandoned hope that
our material cannot be stictched more tightly.

    That framing is right, and "not original but experience-backed" is
    actually a good thing to write to — it positions the observations
    honestly and keeps the tone from overclaiming.

    The stitching problem is that the two halves (app design, LLM
    collaboration) currently read as separate topics. But they're actually the
    same topic: where did the hard work live, and why? The app-design moments
    (naming, friction, cloud mental model) are examples of "design remained
    hard." The LLM observations (old-world cost assumptions, myopic fixes,
    context limits) are explaining why. That's a natural through-line.

    The tightest version might:
      - Open with what the app is and what v2 represents, briefly
      - Use 2–3 design moments as case studies — not a feature tour, but
        specific problems that required judgment
      - Transition: the LLM handled implementation; here's what that was
        actually like
      - Close on the honest summary: implementation got cheap, judgment didn't

    What I'd cut to get there: the full v1 feature inventory (keep the
    favorites-list example, drop the rest), the mockup/visual-design anecdote,
    and "For writer's block too" — that last section is charming but it's a
    different essay.

    The structure is close. It mostly needs to stop describing the app and
    start using the app as evidence.

