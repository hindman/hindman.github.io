---
title: "AI and mass unemployment: an optimistic take"
tags:
  - loopllama
  - software
  - llm
published: false
---

<!--

## The problem with AI

## Economic history says the unemployment concerns are confused
### Mass unemployment explained
### AI might increase worker productivity substantially
#### How it started
#### Not vibe coding
#### A case study: cloud backup
#### The legacy of scarce developer time
#### The LLM wrote code, not design
#### Genius junior engineers
### Biggest gains came for smaller, well-specified tasks

## Economic history is never static
### The static framing is the error
### 19th-century debates on mechanization
### The farming example
### What happened: elevated goals and new jobs
### LL v2 as a micro-level illustration
### Induced demand and task transformation (not Jevon's Paradox)
### Andy Hall's research as a second example
### Writer's block: another example of the same dynamic

## Why AI might be different
### Rate of change
### Flywheel of improvement
### How far does the current AI paradigm go?
## The worst case might be good indeed

## Editorial notes (not for publication)

-->

## The problem with AI

- Two core concerns dominate US media and policy discussion:
  - Alignment: AI going rogue.
  - Employment: AI destroys jobs, leading to extreme inequality and
    large-scale unemployment.

- This essay focuses on the second concern.
  - No claim to a definitive answer.
  - But a background in economic history and direct experience building LL v2
    with an AI coding agent make me skeptical of the typical worries.

## Economic history says the unemployment concerns are confused

### Mass unemployment explained

The employment fear is understandable and intuitive:

  - AI is cognitive in nature.
  - If it becomes more competant than the typical knowlege worker for most
    tasks, AI will do most of that work, because it will be faster, cheaper.
  - That sure looks like job destruction.
  - And not just in one sector, but on a massive scale.

### Mechanization as a comparative case study

Mechanization overview:

  - The industrial revolution started mid 1700s in England.
  - Spread to other areas, including the US, in the early 19th century.
  - Reached a kind of peak in mid 20th with the development of assembly line
    production in auto production: Ford motor plants, etc.
  - Drastically changed employment.

US agriculture: helpful example to appreciate the scale of the change:
  - Consider the percentage of labor force working in agriculture:

        1870 | > 50%
        1900 | 40%
        1940 | 17%
        1960 | 8%
        Now  | < 2%

        [Need to source this. Check HSUS]

  - Viewed through one lens, that looks like the destruction of fully half of
    the jobs that existed in the mid 19c.
  - To put it crudely, were tractors the AI of farming?

Contemporary worries about mechanization paralleled our AI debates:

  - Luddites (1811–16) are as famous case:
    - Skilled textile workers destroying machinery, fearing displacement.

  - David Ricardo:
    - [need to confirm citation]
    - Principles (1821): 3rd edition: added a chapter "On Machinery".
    - Reversed his earlier position and acknowledging that machinery could
      permanently harm workers.
    - Triggered a serious "compensation debate" among classical economists
      that ran for decades.

The parallels between AI and mechanization have other commonalities:
  - Both are GPTs: general purpose technologies.
  - Both compressed costs dramatically and enabled previously impossible things.

Mechanization review:
  - Mechanization led to massive productivity gains.
  - Many types of jobs were destroyed or radically changed:
    - Agriculture illustrates this.
    - The old jobs don't exist.

  - Mass unemployment did not occur:
    - Footnote: Meaning durable: Great Depression and lesser events did occur.

  - Nor did impoverishment:
    - The opposite occured.
    - Modern Americans are undeniably prosperous in economic terms.
      - More goods.
      - More services.
      - More leisure time.
    - A illustrative metric:
      - Percent of household spending on necessities:
      - Necessity means: food, clothing, housing.

            1900  | 80%
            Today | < 50%

            [confirm data; get cite]

      - Necessity consumption:
        - Smaller share of budget.
        - Even as it increased in volume, variety, and quality level.
        - Footnote: On average, of course.

Why not disaster?
  - Why didn't job destruction lead to mass unemployment and poverty?
  - We elevated and expanded our goals and wants:"
    - Products exist that didn't before.
    - Same for services.
    - We do a lot more:
      - More knowledge production of many kinds:
        - Academic 
        - journalism
        - government data
      - More administrative and similar work.
      - [need other examples]

  - Adjustments occurred along a few dimensions:
    - New jobs to meet an expanded set of needs and goals.
    - Some reduction in labor hours. [get stats]
    - Improvements in employment conditions:
      - Less drudgery and otherwise unpleasant work.
      - Fewer injuries and medical side effects.
      - [other examples?]

### LL v2 as a case study

  __HERE__

### MISC

My work with an AI coding agent on LL v2 is illustrative: overview:

  - AI massively increased my productivity as a software creator:

  - Speed:
    - Over 11K LOC.
    - 2 months of calendar time.
    - My effort was consistent (most days each week) but partial: 1 to 3
      hours was typical.

  - Scope:
    - The domain (web programming) was outside my expertise.
    - The result far exceeded my plans and hopes.
      - Better aesthetics.
      - Many more features than initially planned/expected.

That framing is understandable but naive:
  - It treats the jobs as fixed, with AI checking them off one by one.
  - Lump of Labor Fallacy.
  - But that's just economic theory:
    - How can we back that up with examples?


My experience with LL v2:
  - I wrote no code; I edited no code.
  - I did do a lot of work: planning, testing, revising flawed plans,
    reassessing the app as the LLM and I made progress.

I was not a web developer in any meaningful sense. I had cobbled
together a primitive v1, but I lacked both the expertise and the desire
to acquire the expertise necessary to create v2. The AI let me realize
a vision for an application that did not otherwise exist. And achieving
that vision was not labor-free: months of work, in small chunks, but
overall a lot of time and effort. Human labor did not disappear. It
became different. I was not plowing the field (writing code); I was
directing a tractor from the comfort of my office.

#### How it started

After a couple of years of v1 usage, I had accumulated a lot of ideas
about what a better version would need. Communicating all of that to
the LLM was itself a project — many rounds of back-and-forth to
establish the concept, discuss tech choices, and sort through
tradeoffs. Early in that process, the LLM suggested creating a static
mockup of the app before writing any real code. That turned out to be
a good call.

cloud backup, sharing, zooming, chapters

Those doubts didn't last. The first minimally functioning
implementation looked good. I had specified a dark theme, but most of
the visual choices — the blue button colors, the spacing, the component
styling — just appeared without design direction from me. Each of those
early moments had the same quality: a kind of relieved surprise that
this might actually work and look like a real app.

#### Not vibe coding

The media narrative around LLM-assisted development often sounds like
this: "I told the AI what I wanted, it wrote the code, and look at
this neat app." A few prompts, a working product, minimal friction.
That framing has a name now — vibe coding — and it describes something
real for simple one-off tools.

LoopLlama v2 was not that. The process felt much more like working on
a software team — with the genuinely remarkable difference that
implementation was nearly instantaneous. Where a small team might spend
a sprint writing and integrating code, the LLM could produce a working
draft in minutes. That is a real and significant change.

But everything else was familiar from my years on software teams. Long
discussions about design, policy, and tradeoffs. Careful thought about
what would be intuitive and what would surprise or frustrate a user.
Plans that looked good on paper, got built, and then turned out to be
half-baked. Return trips to the drawing board.

The core insight — easy to miss in the hype — is that making software
hard to use is easy, and making it work well is hard. That remains true
when code is cheap. If anything, cheap code removes one excuse and
leaves the design problems more exposed.

The LLM was not great at generating strong ideas or coherent plans for
medium-to-large problems. For a narrow task, yes — an LLM can create
a solid plan and then generate workable code. But for anything bigger,
a full essay or a medium-to-large software project, the LLM will not
hand you a great solution. That said, LLMs are quite useful as an
intellectual partner or sounding board for exploring tentative plans:
finding gaps, brainstorming solutions, pushing thinking toward
something more coherent. They won't give you a great answer for free,
but they help you ask sharper questions and work incrementally toward
a solid plan.

#### A case study: cloud backup

Cloud backup is a good illustration of what the process actually felt
like.

It started as a speculative idea — maybe something for a hypothetical
v3. I raised it casually, and the LLM's response got me genuinely
excited. Supabase looked like an ideal fit: a free hosted database with
a JavaScript client, built-in authentication via Google and GitHub, and
an API that the LLM clearly knew well. So after a while on the back
burner, I decided to dive in.

The Supabase database setup was easy. Then came configuring Google and
GitHub as OAuth providers. Nothing about it was technically difficult,
but it required navigating several developer consoles, registering
applications, managing callback URLs, and handling credentials across
both development and production environments. The LLM helped a great
deal, but it was still far from trivial.

Pretty quickly, I began to think we had opened a pallet load of worm
cans. Questions started multiplying. What should happen the first time
a user signs in? What if the local library is empty but the cloud has
data? What if both have data and they conflict? What does "conflict"
even mean at the video level? If you use two devices alternately
without coordinating, how do you avoid overwriting your own work?

Some of these questions had clear answers once you thought them
through. Others required committing to a design position and living
with the tradeoffs. A few led to dead ends: we built a dirty indicator
and a beforeunload browser prompt, then removed it after concluding the
UX problems outweighed the benefit. The conflict detection went through
at least one simpler version before arriving at the five-bucket
categorization with per-category toggles that shipped.

The breakthrough was landing on a simple mental model: cloud equals
hard drive. Your hard drive does not do things automatically. It does
not make decisions on your behalf. But if you use it deliberately —
save before you switch machines, read when you arrive — it keeps things
aligned without requiring magic. Once that framing was in place, the
rest of the design followed naturally.

During that middle stretch I had a feeling I recognized immediately. It
was the feeling of being on a software team where the project has
gotten itself into a difficult situation: each proposed fix creates new
problems, the edge cases keep multiplying, nothing seems to fully hold
together. "Right," I thought. "Even with AI, software is still really
difficult at times."

#### The legacy of scarce developer time

Developer time used to be the scarcest resource on any project. An
entire industry of books, blog posts, and conference talks emerged to
help teams rank features, justify technical debt, and manage competing
priorities. All of this thinking assumed implementation was expensive
and slow, because it was.

That assumption is baked into the LLM's training corpus, and it shows
up in unexpected ways. Ask whether feature X is feasible, and the LLM
will often respond with careful hedging: "doable, but not trivial —
possibly not worth the cost." That is exactly the right answer for a
world where implementation is expensive. It is a less useful answer
when the LLM can deliver a working solution in ninety seconds.

Both I and the LLM carried the mental legacy of old-world software
engineering. This theme appeared in many planning discussions: "not a
trivial change — maybe not worth it." But then the code appeared in
a couple of minutes. It took several rounds of this pattern before I
started to realize — sometimes dragging the LLM along with me — that
old habits of mind needed adjusting.

#### The LLM wrote code, not design

The architecture, the entity model, the keyboard scheme, the data
model, the UX vision — the key design insights for LoopLlama v2 mostly
came from me. The LLM implemented specs; it did not generate them.

This is not self-congratulation or a knock on the LLM. It is just an
accurate account of where the design work happened. And it maps neatly
onto something I noticed about my own career as a software engineer:
the parts I liked most were the planning phases — designing new
systems, working through difficult problems. The parts I liked least
were the long implementation slogs, the insufficient test coverage, the
managers asking when it would ship.

LLMs seem capable of radically compressing the work I disliked. That
is not a small thing.

The LLM was also genuinely valuable as a sounding board — not a
replacement for an optimal human expert, but a widely-knowledgeable
partner that is available whenever you need it. Ask a well-framed
question and it will help you think through tradeoffs, catch blind
spots, and push your thinking toward something more coherent. That
combination — skilled implementer plus available intellectual partner —
is a meaningful new tool.

#### Genius junior engineers

The best analogy for working with the LLM: a junior engineer who has
not just read the manual but memorized it. Encyclopedic knowledge of
technology, APIs, coding patterns, and best practices. Fast, tireless,
and almost never stumped by a well-specified task.

But junior engineers, however talented, are often myopic. They solve
the problem in front of them without fully weighing wider implications —
other parts of the codebase, consistency with existing patterns, the
coherence of the system as a whole. The LLM has the same tendency.
Many times during v2, I identified a bug or a design problem, and the
LLM offered a fix that would genuinely resolve the immediate issue
while quietly introducing a new inconsistency or undermining a broader
goal.

The myopia is largely downstream of context window limits. The LLM
cannot hold the entire project in mind at once — and, just as
important in many policy contexts, the history of the project and the
accumulated reasoning behind its decisions. That is a real constraint
today, and also one that seems likely to improve.

### Biggest gains came for smaller, well-specified tasks

  - AI is very good at implementing small-to-medium, well-defined tasks.
  - It's also quite good at generating prose with similar characteristics:
    small to medium scale, with clear goals and criteria.
  - Gains were more mixed — sometimes non-existent — for larger-scale or
    open-ended problems:
    - AI could not create a good v2 architecture plan.
    - Nor could it write the posts on my behalf.
  - But most jobs — even well-paid professional positions — are full of
    small-to-medium tasks with clear criteria.
    - My software career had many tasks like that.
  - So yes: large productivity gains are plausible.

Part of the "small task" limitation appears tractable in the short term.
Often those LLM lapses were downstream of context window limits. As
those limits expand, one can envision an LLM with equally expansive
knowledge and memory for an entire codebase — and for the project's
development history and the reasoning behind it. That LLM would be a
much better problem solver, less drawn to myopic quick-fixes and more
likely to suggest solutions aligned with larger goals.

## Economic history is never static

### The static framing is the error

If AIs can do a lot of existing tasks, that sounds bad if you think of
employment in static terms:

  - Current jobs exist.
  - AI can do them more cheaply.
  - That looks like job destruction.

That framing misses the thing that economic history most clearly shows:
economies are not static. The list of jobs, industries, goods, and
services is not fixed.

### 19th-century debates on mechanization

The parallel with 19th-century mechanization is real and instructive.

The Luddites (1811–16) are the famous case: skilled textile workers
destroying machinery, fearing displacement. More interesting
intellectually: David Ricardo added a chapter "On Machinery" to the
third edition of his Principles (1821), reversing his earlier position
and acknowledging that machinery could permanently harm workers. This
triggered a serious "compensation debate" among classical economists
that ran for decades. So the fears rhymed closely with what we hear
today about AI.

Where the mechanization comparison holds well:

  - Both are general-purpose technologies (economists' term: GPTs),
    applying across many industries rather than one.
  - Both raised displacement fears that proved, in aggregate, unfounded —
    new industries and new kinds of work emerged.
  - Both compressed costs dramatically and enabled previously impossible
    things.

Where it gets complicated:

  The key disanalogy is which tasks are being automated. Mechanization
  replaced physical and manual labor. Displaced workers retreated into
  cognitive, creative, and social work — which machines couldn't touch.
  That was the historical escape valve. AI encroaches on cognitive tasks
  directly. If AI substitutes for the very domain workers historically
  fled to, the analogy weakens. This is the honest "this time might be
  different" argument, and it has more force than the usual technophobic
  version.

  A second complication: speed. The industrial revolution unfolded over
  50–100 years, giving labor markets and social institutions time to
  adapt — badly and painfully at first, but eventually. AI capabilities
  are advancing on a timescale of years.

  Bottom line: The mechanization analogy is a strong argument for
  cautious optimism, not certainty. Acknowledging the disanalogies
  openly would make the argument stronger, not weaker.

### The farming example

One of many examples where mechanization destroyed jobs in a sectoral
sense without destroying employment or prosperity:

  - 1900: ~40% of US labor force in agriculture
  - 1940: ~17%
  - 1960: ~8%
  - 1980: ~3–4%
  - Today: ~1.5% or below

In a specific case, yes: individual farm laborers were displaced. In an
aggregate structural sense, yes: agriculture is now a tiny employment
sector. But did jobs and prosperity get destroyed overall? Definitely
not. Modern people in middle-income and higher countries are prosperous
to a level that 19th-century ancestors probably could not have imagined.

### What happened: elevated goals and new jobs

  - Society elevated its goals and wants.
    - Products exist that didn't before.
    - Same for services.
    - We do substantially more: more knowledge production of many kinds
      (academic research, journalism, government data), more leisure,
      more of nearly everything.
  - New jobs emerged to fulfill the new ambitions.
  - On aggregate, total work hours declined as well — more time for
    non-work activities, a different form of prosperity.

### LL v2 as a micro-level illustration

My productivity was massively boosted. That didn't make me idle. It
radically increased the goals:

  - v2 is much more ambitious than I ever envisioned a v2 being.
  - The work was difficult and challenging.
  - But the work was different:
    - Planning.
    - Testing and checking.
    - Revising flawed plans.
    - Expanding the feature list.
    - Fine-tuning: making things simpler, more consistent, more coherent.
    - And no coding.

On a personal level this was rewarding. In my career as a software
engineer, I most enjoyed the problem-solving part: seeing a need,
developing a good plan to solve it. The actual implementation work —
and the many less-glamorous tasks associated with it — were much less
satisfying, more of a grind. On LL v2, the AI did the parts of my
former career that I liked least, letting me focus on higher-level and
more rewarding tasks. Even more important, it let me increase my
ambitions.

AI did not destroy a job; it enabled a project that would not otherwise
have existed.

### Induced demand and task transformation (not Jevon's Paradox)

Note: I initially thought Jevon's Paradox captured this, but it doesn't.
JP is specifically about resource consumption: efficiency improvements
paradoxically increase consumption of the very resource being made
efficient (coal use, highway capacity). My LL v2 argument has a
different shape:

  - AI lowers the cost of software creation.
  - That enables new demand that couldn't have materialized before (I
    build v2).
  - Human labor is still required, just transformed: planning, design,
    QA instead of coding.

The right terms are:
  - Induced demand: cheaper supply creates demand that didn't exist.
  - Task transformation: labor shifts rather than disappears.
  - "Technology displaces tasks, not workers" — the tractors-and-farm-
    labor argument I'm already making.

(JP would fit only if my claim were: "AI makes coding cheaper →
developers produce vastly more code per hour → net coding labor
paradoxically increases." That's a plausible argument, but not the one
I'm making.)

### Andy Hall's research as a second example

Andy Hall's research on LLMs and political science: using the
productivity boost from AI to create more bold and expansive research
agendas.

My own research background confirms this point:

  - Dissertation.
  - Historical Statistics of the United States.
  - All of the biggest projects in my academic career could have been
    substantially helped by AIs. My team and I would have done more and
    done it faster.

[Development needed: flesh out the Hall reference with enough detail
that a reader unfamiliar with him gets the point. Either develop it or
cut it — as a bare citation it reads as name-dropping.]

### Writer's block: another example of the same dynamic

A brief meta-observation: this post itself illustrates how LLMs are
useful when staring at a blank page.

Many writers say the hardest part of writing is the transition from
nothing to something — even a crappy something. LLMs change that
picture. Give the LLM a disorderly brain dump of ideas, notions,
phrases, and concepts and it can quickly convert it into something
resembling a rough outline or first draft. The task shifts from de-novo
creation to editing, reworking, culling, and rethinking.

Ninety minutes before a particular paragraph in this post, the post was
a dread. No structure, no draft — just a vague sense that something
should be written. Raw notes went into the LLM. The LLM converted each
batch into rough but coherent prose. At each step, the task felt more
tractable. Ideas accumulated. The blank page filled. The new problem:
too much material, requiring editing and pruning rather than generation.

This maps onto the same induced demand / task transformation pattern:
cheaper generation enables more ambitious work; human effort shifts
rather than disappears.

## Why AI might be different

### Rate of change

The claim that AI is moving at unprecedented speed relative to
mechanization uses two inconsistent dating standards:

  - For mechanization, the standard is expansive: roughly 1760–1940,
    covering 180+ years of cumulative change.
  - For AI, the standard is myopic: ChatGPT to today, a few years.

A similarly expansive dating for AI would cover the full history of
computing. Mechanization didn't start with Ford's assembly line; it
started with very small, incremental steps. Same with computing and AI:
decades of work doing simple things first.

So is the rate of change faster for AI? Not in the radical way that
naive historical dating would suggest. Perhaps in a modest way — maybe
2x as fast in the invention phase (150 years vs. 75).
  - computers 1941 (Zuse Z3) or 1945 (ENIAC).

However, there is a more defensible version of the speed concern: the
deployment phase may be faster for AI than it was for mechanization.
Steam power required building factories, railways, and entirely new
physical infrastructure. AI runs on existing internet infrastructure
and can be deployed via API. The diffusion curve is steeper even if the
invention curve isn't.

That's a more defensible version of the speed argument, but also a
less alarming one — it's about the pace of adjustment, not the
unprecedented nature of the technology itself.

### Flywheel of improvement

AI, because it is cognitive and computer-based, might have the ability
to begin improving itself. We see this already in the full history of
computing:

  - Early computers could do very little.
  - Now AI is visibly speeding up progress toward better AIs.
    - The big AI labs are reporting and demonstrating this.

So perhaps the limits of AI that I observed:

  - Inability to solve large problems on its own.
  - Inability to come up with good plans and ideas.
  - Confusion as context grows large.

— perhaps such limits are accurate but misleading. If AI starts to
improve AI, the agents could become powerful enough that it becomes
difficult to envision any white-collar job that would not be done
better by a computer.

In that world: even as we increase our ambitions, the new jobs that
emerge will just be best suited for more AIs. Paradoxically, only jobs
in the physical world would be AI-proof — the reverse of the
mechanization trend, which typically caused employment to become less
physical, more mental.

Counter-note: Mechanization had similar waves of mutually reinforcing
dynamics that, for a time, accelerated progress. Eventually the limits
of the paradigm began to hit. The flywheel didn't keep flywheeling
forever. But mechanization couldn't improve mechanization; AI might be
able to do exactly that. [This counter-note deserves more thought.]

### How far does the current AI paradigm go?

Some AI limits I observed on LL v2 seem tractable within the current
framework:

  - Many were linked to limits on context window size.
  - I can envision current technologies improving substantially on that
    front.
  - That will increase the scale of tasks that AIs can handle well.

But the deeper limits seem less tractable within the current framework:

  - An entity with encyclopedic grasp of all human knowledge might be
    expected to produce better ideas or more interesting essays. I have
    not observed that.
  - There still seems to be something "missing."
  - AIs may be — and may become — better than most humans at cognitive
    jobs involving small-to-medium tasks with well-defined criteria.
    But our biggest challenges are not those.

One thing that is clearly missing: the ability to learn post-training.

  - AI models are trained on a massive corpus, then static.
  - Humans become wiser over time, even as raw cognitive powers wane:
    better able to see the full picture, notice opportunities, exercise
    good taste, weigh tradeoffs.
  - That's a real difference — and not obviously fixable within the
    current LLM paradigm.

## The worst case might be good indeed

Assume I'm wrong: AIs become something close to the extreme
capabilities seen in fiction — Data in Star Trek.

The mass unemployment story ignores the full implications of its own
scenario:

  - The unemployment, if it happens, also means massive productivity.
  - More economically useful goods and services with fewer inputs.
  - That translates directly — mathematically, even — into more income,
    wealth, and prosperity.

One possibility is extreme inequality: poverty for many, wealth and
power for a few. But that is a political outcome, not an economic
necessity.

Consider: I said mechanization did not lead to mass unemployment. That
is partly imprecise.

  - The work week was substantially shortened.
  - Modern people in prosperous societies are wealthy in material goods
    and services relative to their 19th-century ancestors; they also
    have more leisure time.
  - That shorter work week was itself a form of distributed prosperity —
    a share of the productivity gains taken as time rather than money.

In a world where computers can do all cognitive tasks and robots can
perform most physical tasks:

  - That is a post-scarcity society.
  - It can be a dystopian hellscape with extreme inequality.
  - Or it can be something where most humans need not labor to satisfy
    material desires — even shorter work weeks, or work as an
    opt-in activity.

I don't expect the Star Trek outcome. But I know from studying history
and economics that inequality is always downstream from political
systems and the choices embedded in them. If we invent super-capable
machines, it is up to us (absent Terminator-style alignment problems)
to decide how the prosperity and wealth they imply get distributed.

## Editorial notes (not for publication)

These are structural concerns flagged during the drafting process:

1. Three overlapping hedges: "history says it's fine" + "but AI might
   be different" + "but the worst case is manageable." Each is
   defensible, but strung together they risk muddying the thesis.
   The hierarchy of these three positions needs to be explicit,
   probably in the opening frame.

2. LL v2 illustration: "I wrote no code" could sound like labor
   disappeared — when the argument is that it transformed. That
   distinction needs to be crisp early.

3. Andy Hall reference: develop it or cut it. As a bare citation it
   reads as name-dropping; as a paragraph it becomes a corroborating
   data point.

4. Transition costs: the outline doesn't address short-term
   displacement pain. Even if the long-run outcome is positive,
   the disruption period is genuinely hard for affected workers.
   A brief acknowledgment would pre-empt the obvious objection that
   the argument is glib about real near-term suffering.

5. Flywheel section: the mechanization-also-had-waves counter-argument
   is thin. Unlike steam power, AI could plausibly improve AI
   directly. That distinction is worth addressing honestly.

# OLD MATERIAL

- What I did on LL v2:
    - I wrote no code; I edited no code.
    - I did do a lot of planning, testing/checking, revising of plans,
      reassessments of the app as the LLM and I made progress.
  
- The biggest gains came for smaller tasks, more tractable things:
  - AI is very good at implmenting small-to-medium, well-specified tasks.
  - It's also quite good at generating prose with similar characteristics:
    - Small to medium scale.
    - With clear goals and criteria.
  - The gains were more mixed -- in some cases non-existent -- on things
    larger-scale or where the goals are not yet clear.
    - AI could not create a good v2 plan
    - Nor could it write posts on my behalf.
  
- Most jobs have many small-to-medium tasks with clear goals and criteria.
  - My jobs as a software engineer had many tasks like that.

- It AIs can do a lot of existing tasks, that sounds bad if you think of
  employment in relatively static terms.
  - Current jobs exist.
  - If AI can do a job more cheaply, the AI will do the job, not a human.
  - That sure looks like job destruction.

- On a micro-level, LL v2 illustrates this:
  - My productivity was massively boosted.
  - That didn't make me idle.
  - It radically increased the goals:
    - v2 is much more ambitious than ever envisioned.
    - It was difficult/challenging work.
    - But the work was different:
      - Planning.
      - Testing.
      - Revising flawed plans.
      - Expanding the list of features.
      - Fine tuning, making things simpler, more consistent, more coherent.
      - And no coding.
  - On a personal level, this was rewarding:
    - In my career as a software engineer, I most enjoyed the problem
      solving part of the job: seeing a problem or need; developing a good
      plan to solve it.
    - The actual implementation work -- and the many less glamorous tasks
      associated with implementation (eg testing) -- were much less
      satisfying, much more of a grind at times.
    - On LL v2, the AI did the parts of my former career that I liked least,
      letting me focus on higher level and more rewarding tasks.
    - Even more important, it allow me to increase my ambitions.

  - Another example:
    - Andy Hall's research on LLMs and polical science research.
    - Using the productivity boost from AI to create more bold and expansive
      research agendas.
    - My own research background confirms this:
      - Dissertation.
      - MPC
      - HSUS
      - All of the biggest projects in my academic career could have be
        substantially helped by AIs. I and my team would have done more and
        done it faster.

  - In economic lingo:
    - induced demand: it expanded ambitions
    - task transfer: generated a need for labor of a different kind.
    - technology displaces tasks, not workers (source of this concept?)

Why AI might be different:

  - Rate of change is faster now:
    - Mechanization took decades.
    - AI seems to have appeared out of nowhere.

    - I'm skeptical of that. The argument uses two very different historical
      dating standards.
      - For mech, the standard is inclusive/expansive: eg 1760-1940 [figure out plausible dates]
      - For AI, is mypopic: ChatGPT to today.

      - But a similarly expansive dating for AI would cover the whole history
        of computing.
        - Mechanization didn't start with Ford's assembly line.
        - It started with very small, incremental steps.

        - Same with computing and AI.
          - Decades of work doing simple things first.

    - So, is the rate of change faster for AI?
      - Not in the radical way that naive historical dating would suggest.
      - But maybe in a small way: ie, 2x as fast (150 years vs 75).

  - Flywheel of improvement:
    - AI, because it is cognitive and computer-based, might have the ability
      to begin improving itself.
    - We see this already in the full history of computing that my prior
      points insisted we must include.
      - Early computers could do very little.
      - Now AI is speeding up the progress toward better AIs.
        - The big AI labs are reporting and demonstrating that.

    - So perhaps the limits of AI that I observed:
      - Inability to solve large problems on its own.
      - Inability to come up with good plans and ideas.
      - Confusion as scale grows large.

      - Maybe such limits are accurate but misleading.
      - If AI starts to improve AI, the agents could become so powerful that
        it becomes difficult to envision any white collar job that would not
        be done better by a computer.

      - So, even if we increase our ambitions, the new jobs that emerge from
        that will just be best suited for more AIs.
      - Paradoxically, only jobs in the physical world will be AI-proof. The
        reverse of the mechanization trend, which typically caused employment
        to become less physical, more mental.

    - But mechanization had similar waves of mutually-reinforcing dynamics
      that, for a time, accellerated progess.
      - Eventually, however, the limits of the paradigm began to hit.
      - The flywheel didn't keep flywheeling forever.

  - We dont' know how far the current AI paradigm will go:
    
    - Some AI limits I observed on LL v2 strike me as tractable within the
      current AI frameworks.
      - Many were linked to limits on the context window.
      - I can envision current tech to make more improvement on that front.
      - That will increase the scale of tasks that AIs are high capable of
        doing.

    - But the deeper limits seem less solvable within the current framework:
      - You would think that an entity with encyclopedic grasp of all human
        knowledge would be better and coming up with good ideas, or writing
        interesting essays.
      - But I have not observed that.
      - So there still seems to be something "missing".
        - AIs may be -- and maybe become -- better than most humans and most
          cognitive jobs involing small-to-medium tasks with well-defined
          criteria and goals.
        - But our biggest challenges are not those.

      - One thing we know is missing:
        - The ability to learn.
        - AI models are trained on a massive corpus.
        - But after that, they are static.
        - That's a real difference:
          - Humans become wise over time, even if their raw cognitive powers
            wane a bit.
          - Better able to see the full picture, to notice opportunites for
            good ideas, to have good taste for quality, coherence, the
            weighing of trade-offs.

The worst case might be good indeed.

  - Assume that I'm wrong: AIs become something close to the extreme
    capabilities seen in fiction: Data in Star Trek.

  - The thing about the mass unemployment story is that ignores the full
    implications.

    - The unemployment, if it happens, will also mean massive productivity.
    - That means the ability to generate more economically useful goods and
      services with fewer inputs.

    - That translates directly -- mathmatically, even -- into more income,
      wealth, and prosperity.

    - One possibility is extreme inequality:
      - Poverty for many.
      - Wealth and power for a few.

    - But that's a political outcome, not an economic necessity.

      - I said that mechanization did not lead to mass unemployment.
      - But that's partly false.
        - The work week was shortened.
        - Modern humans in prosperous societies are wealthy not only in
          material goods and luxurious services relative to their 19c
          ancestors; they also have more leisure time.

      - In a world where a computer can do all cognitive tasks and robots can
        perform most physical tasks.
        - That's a post-scarcity society.
        - It can be a dystopian hellscape with extreme inequality.

        - Or it can be something where most humans do not have a labor to
          satisfy material desires.
        - Things like "working" to meet needs might become less important (ie
          even shorter work weeks) or might disappear.

        - I don't expect that kind of outcome -- in effect, the sort of
          post-scarcity world in Star Trek.
        - But I know from the study of hsitory and economics that inequality
          is always downstream from our political systems and the choices
          behind them.

        - If we invent super-capable machines, it's up to us (absent T2
          alignment problems) to decide how the prosperity and wealth implied
          by that new technology is distributed.

## Compact summary of the main points

- LLMs compress first-draft time dramatically — for code and prose alike.

- Old habits of mind (code is costly; developer time is scarce) die slowly —
  and the LLM reinforces them, because that worldview is baked into its
  training corpus.

- This wasn't vibe coding. Implementation became near-instant, but design work
  — tradeoffs, planning, rethinking — remained just as hard.

- Cheap code removes one excuse and leaves design problems more exposed.
  Making software work well is still hard.

- The LLM wrote code, not design. Architecture, entity model, UX vision came
  from the author. The LLM implemented specs; it did not generate them.

- The LLM as sounding board: widely knowledgeable, always available, useful
  for surfacing tradeoffs and blind spots — though not a substitute for domain
  expertise.

- Best analogy: genius junior engineer. Encyclopedic and tireless, but often
  myopic — solving the problem in front of it without weighing the broader
  implications.

- That myopia is largely a context window problem: the LLM cannot hold the
  full project history and its accumulated policies in mind at once. This
  seems likely to improve.

- AI did not destroy a job; it enabled a project that would not otherwise have
  existed.

- Cloud backup as a case study: real software difficulty persists even with
  AI. The breakthrough was a simple mental model (cloud = hard drive) that
  made the design fall into place.

- Writer's block analog: LLMs convert disorderly brain dumps into workable
  prose; the task shifts from de-novo creation to editing.

## Framing idea

I wonder if the econ history framing is the right way to start/motivate/frame
the post. Will AI destroy jobs or do something else? Many of the other bullet
points in our summary can flow from that starting frame.

- Did not destroy a job so much as make the impossible feasible.
- Not vibe coding: still a lot of work, etc.
- Not immediate solutions (junior dev myopia problem): again, human
  judgement/taste/vision was still required.

Leading to an optimistic point. AI, if used well, can support higher
ambitions, bigger projects, and the focusing of human effort on more rewarding
tasks (planning, vision, confirmation, revision) rather than mundane/routine
stuff (coding, manual labor on the farm, etc)

Andy Hall's work on how academics can use AI to expand their research
ambition aligns with my points.

----

I'm probably misusing Jevon's Paradox. Based on an internet search, it seems
oriented toward resource consumption framings: coal use effciency improved =>
use even more coal.

My LL example is more like: software-generation efficiency improved => demand
for more abitious software increases => more software is created => still
requiring quite a lot of human labor, but no longer in the form of writing
code. Is that JP or something else?

You're right to question it. JP is specifically about resource consumption:
efficiency improvements paradoxically increase consumption of the very
resource being made efficient (coal, highway capacity, etc.). The paradox is
that you expect efficiency to reduce consumption, but it raises it instead.

Your LL argument has a different shape:

- AI lowers the cost of software creation
- That enables new demand that couldn't have materialized before (Monty builds
  v2)
- Human labor is still required, just transformed — planning, design, QA
  instead of coding

That's closer to induced demand (cheaper supply creates demand that didn't
exist) plus task transformation (labor shifts rather than disappears).
Historians of technology usually call the combination something like
"technology displaces tasks, not workers" — the tractors-and-farm-labor
argument you're already making.

JP would fit better if your claim were: "AI makes coding cheaper →
developers produce vastly more code per hour → net coding labor
paradoxically increases." That's a plausible argument, but it's not the one
you're making.

I'd drop the JP reference and just name the mechanism directly: AI lowered the
cost of software creation enough to make previously impossible projects
viable. That's the point, and it doesn't need an economic label.

----

## Mechanization and AI

Get Robert Gordon's estimate about the % of jobs in the 19th century that had
"poor working conditions". People in that era witnessing increasing
mechanization might have made arguments that rhymed with those made today
about AI: [They might have, but did they? If not, why not?]

  - Most jobs are manual labor.
  - Mechanization has the potential to be general purpose.
  - Mechanization will eliminate most jobs.
  - The result will be mass unemployment and poverty.

The first two points were true, the third happened, but the fourth absolutely
did not. Why not? Society set higher goals and new kinds of employment
emerged. The old jobs did disappear. But new jobs took their place. (And total
work hours probably declined as well, leading to more time for non-work
activities — a different form of prosperity.)

Does this comparison work: mechanization and AI? Is that apples-to-apples?

Did 19th century people make those arguments?

  Yes, prominently. The Luddites (1811–16) are the famous case — skilled textile workers
  destroying machinery, fearing displacement. More interesting intellectually: David Ricardo
  added a chapter "On Machinery" to the third edition of his Principles (1821), reversing his
   earlier position and acknowledging that machinery could permanently harm workers. This
  triggered a serious "compensation debate" among classical economists that ran for decades.
  So the parallel is real — the fears rhymed closely.

  Does the comparison work?

  Partly, and the limits are worth knowing before you commit to it.

  Where it holds well:
  - Both are general-purpose technologies (economists' term: GPTs), applying across many
  industries rather than one.
  - Both raised displacement fears that proved, in aggregate, unfounded — new industries and
  new kinds of work emerged.
  - Both compressed costs dramatically and enabled previously impossible things.

  Where it gets complicated:

  The key disanalogy is which tasks are being automated. Mechanization replaced physical and
  manual labor. Displaced workers retreated into cognitive, creative, and social work — which
   machines couldn't touch. That's the historical escape valve. AI encroaches on cognitive
  tasks directly. If AI substitutes for the very domain workers historically fled to, the
  analogy weakens. This is the honest "this time might be different" argument, and it has
  more force than the usual technophobic version.

  A second issue: speed. The industrial revolution unfolded over 50–100 years, giving labor
  markets and social institutions time to adapt — badly and painfully at first, but
  eventually. AI capabilities are advancing on a timescale of years, not decades. Whether
  adaptation can keep pace is genuinely uncertain.

  Bottom line for the essay:

  The mechanization analogy is a strong argument for cautious optimism, not certainty. The
  historical pattern is real and reassuring. But AI's reach into cognitive work is a
  genuinely new challenge the analogy doesn't fully resolve. Acknowledging that openly would
  make the argument stronger, not weaker — it shows you've thought past the easy version.

✻ Crunched for 39s

❯ Good questions.

  Why does mechanization get a wide-angle chronology (50-100 years), while AI's
  underpinnings (the history of computing) gets ignored in the speed assessment?

⏺ That's a fair challenge. If you date AI's origins to the 1950s (Turing, early neural nets)
  or even the 1980s (expert systems, early ML), the trajectory is decades long — comparable
  in length to mechanization. The "AI is moving at unprecedented speed" framing implicitly
  dates the clock from the ChatGPT moment, which is cherry-picking the steepest part of the
  curve.

  The honest version of the speed concern is narrower: the deployment phase — the point at
  which the technology reaches mass adoption and begins displacing workers at scale — may be
  faster for AI than it was for mechanization. Steam power required building factories,
  railways, and entirely new infrastructure. AI runs on existing internet infrastructure and
  can be deployed via API. The diffusion curve is steeper even if the invention curve isn't.

  That's a more defensible version of the speed argument, but it's also a less alarming one —
   it's about the pace of adjustment, not the unprecedented nature of the technology.


## First drafts come fast

LLMs radically reduce the cost and time required to generate both
code and prose.

Ex 1. Both I and the LLM carried the mental legacy of old-thinking about
software engineering: developer time is scarce; code is costly. This theme
appeared in many planning disussions with the LLM: "not a trivial change --
maybe not worth it". But then the computer writes the code in a couple
minutes. It tooks several rounds of this pattern before I started to realize
-- sometimes dragging the LLM advisor with me -- that my old habits of mind
needed adjusting.

Ex 2. Writer's block. Many writers say that one of the most difficult part of
writing is the transition from nothing to something -- even a crappy
something. LLMs change that picuture. Give an LLM a disorderly brain dump of
ideas, notions, phrases, and concepts and the LLM can quickly convert it into
something resembling either a rough outline or first draft. Now your job has
become easier: editing, reworking, culling, rethinking, rather than de-novo
creation.

## Not exactly vibe coding

But the LLMs have obvious limits.

Not great at generating strong ideas or coherent plans for medium-to-large
things.

    For a narrow task, yes, an LLM can create a solid plan and then
    generate workable prose or correct code. But for anything bigger -- a full
    essay, a medium-to-large software project -- the LLM will not hand you a great
    solution.

    That said -- and similar to the comments about LLMs as a
    writers-block-buster -- LLMs are quite useful as an intellectual partner
    or sounding bound to explore you tentative plans, find gaps or holes in
    them, brainstorm solutions. They won't give you a great answer for free,
    but they can help you ask sharper and more questions and thus incrementally
    work your way toward a solid plan.

Often myopic: the genius junior engineer.

    Eager to help, willing to work endless hours, never annoyed. But also
    prone to quick-fix thinking.

## Signs of near-term progress

Part of that problem appears tractable in the short term.

    Often those kinds of LLM lapses were downstream of the limits of its
    contexts window. As noted, LLMs have encyclopedic knowledge of many
    things. If enough tech changes occur over the next few years, one can
    envision equally expansive knowledge and memory for your entire code base
    and -- just as important for policy decisions -- the project's development
    history and the reasoning behind it. An LLM with that kind of contextual
    coverage would be a much better problem solver: one less drawn to a mypoic
    quick-fix and more likely to suggest solutions that are more in line with
    larger goals and policy.

## Building it with an LLM

I wrote the v1 code; the v2 code was written entirely by Claude Code. Unlike
all of my prior (and much smaller) coding projects using AI tools, on LL v2 I
never wrote or even read the code. I was a manager, a planner — the person
with the vision and goals — and a QA tester.

Jevon's Paradox [not quite]. V2 is an illustration. Conversations about AI
focus a lot on the question of jobs: will their existence lead to
unemployment? Historians of technogical change will point out that these
questions are not new. Every major technical change in human history has
destroyed jobs in some sense. In the 19th century US, X percent [get number]
of the labor force worked in agriculture; now only Y percent do [get number].
Did tractors destroy farmer jobs — more accurately, farm laborer jobs?

  - 1900: ~40% of the US labor force in agriculture
  - 1940: ~17%
  - 1960: ~8%
  - 1980: ~3-4%
  - Today: ~1.5% or below

In some
specific case, absolutely yes. Also yes in an aggregate sectoral or structural
sense. But did job and prosperity generally get destroyed? Definitely not. We
don't know with certainty whether AI, due to its general-purpose character,
will somehow be different in that regard. But LL v2 is an illustration of the
point that the existence of AI did not destroy a job so much as make a
previously impossible thing actually happen. I was not a web developer. I
cobbled together a primitive v1, but I lacked the expertise — and more
importantly the desire to attain that expertise — to create v2. The AI allowed
me to realize a vision I had for an application that did not exist. And
achieving that vision was not labor-free: I worked on the project for a few
months, not full time, but in small chunks of time. Overall, it was a lot of
time and effort, so human labor did not disappear. But it become different: I
was not plowing in the fields (writing code); I was remotely directing a
tractor from the comfort of my office.

That's closer to induced demand (cheaper supply creates demand that didn't
exist) plus task transformation (labor shifts rather than disappears).
Historians of technology usually call the combination something like
"technology displaces tasks, not workers" — the tractors-and-farm-labor
argument you're already making.

### How it started

After a couple of years of v1 usage, I had accumulated a lot of ideas about
what a better version would need. Communicating all of that to an LLM was
itself a project — many rounds of back-and-forth to establish the concept,
discuss tech choices, and sort through tradeoffs. Early in that process, the
LLM suggested creating a static mockup of the app before writing any real
code. That turned out to be a good call.

![LoopLlama v2 prototype mockup](/assets/images/v2-prototype.jpg)

The screenshot above is that original mockup. Looking at it now alongside
the finished app, the early vision held up reasonably well. Features were
added along the way that had no place in the mockup — cloud backup,
sharing, zooming, chapters — but the layout, the panel structure, the
general feel of the interface is recognizable.

What I remember from that moment: seeing the mockup for the first time got
me excited in a specific way. "If we can build something that looks like
that," I thought, "I'll be happy." The real app is considerably better than
the mockup. That was somewhat surprising, because LLMs cannot see in the
way a human designer can — I had real doubts about how the visual design
would land.

Those doubts didn't last. The first minimally functioning implementation
looked good. I had specified a dark theme, but most of the visual choices
— the blue button colors, the spacing, the component styling — just
appeared without any design direction from me. The LLM made those calls,
and they worked. Adding Shoelace as a UI component library was a similar
moment: suddenly the dialogs and controls looked polished in a way that
would have taken me considerable effort to achieve on my own. Each of those
early moments had the same quality: a kind of relieved surprise that this
might actually work and look like a real app.

### Not vibe coding

The media narrative around LLM-assisted development often sounds something
like this: "I told the AI what I wanted, it wrote the code, and look at
this neat app." A few prompts, a working product, minimal friction. That
framing has a name now — vibe coding — and it describes something real for
simple one-off tools.

LoopLlama v2 was not that. The process felt much more like working on a
software team — with the genuinely remarkable difference that implementation
was nearly instantaneous. Where a small team might spend a sprint writing
and integrating code, the LLM could produce a working draft in minutes.
That is a real and significant change.

But everything else was familiar from my years on software teams. Long
discussions about design, policy, and tradeoffs. Careful thought about what
would be intuitive and what would surprise or frustrate a user. Plans that
looked good on paper, got built, and then turned out to be half-baked.
Return trips to the drawing board.

The core insight — easy to miss in the hype — is that making software hard
to use is easy, and making it work well is hard. That remains true when code
is cheap. If anything, cheap code removes one excuse and leaves the design
problems more exposed.

### A case study: cloud backup

Cloud backup is a good illustration of what the process actually felt like.

It started as a speculative idea — maybe something for a hypothetical v3.
I raised it casually, and the LLM's response got me genuinely excited.
Supabase looked like an ideal fit: a free hosted database with a JavaScript
client, built-in authentication via Google and GitHub, and an API that the
LLM clearly knew well. It sounded feasible, cool, and useful. So after a
while on the back burner, I decided to dive in.

The Supabase database setup was easy. Then came configuring Google and GitHub
as OAuth providers. Nothing about it was technically difficult, but it
required navigating several developer consoles, registering applications,
managing callback URLs, and handling credentials across both development and
production environments. The LLM helped a great deal, but it was still
far from trivial — and it opened my eyes. This cloud-backup idea was not
going to be free.

We got things working at a basic level. Then, pretty quickly, I began to think
we had opened a pallet load of worm cans.

I remember trying to use `ds` and `dr` to keep my development and production
data in sync, and getting myself confused more than once. The questions
started multiplying. What should happen the first time a user signs in —
should the app automatically read from the cloud, or wait for an explicit
command? What if the local library is empty but the cloud has data? What if
both have data and they conflict? What does "conflict" even mean at the
video level — which video wins when both copies have been modified? If you
use two devices alternately without coordinating, how do you avoid
overwriting your own work? Should signing out remove your cloud data, or
just end the session? Should the app remind a signed-out user to sign back
in, and if so, how persistently?

Some of these questions had clear answers once you thought them through.
Others required committing to a design position and living with the tradeoffs.
A few led to dead ends: we built a dirty indicator and a `beforeunload`
browser prompt — the standard "you have unsaved changes, are you sure you
want to leave?" warning — and then removed it after concluding the UX
problems outweighed the benefit. The conflict detection went through at
least one simpler version before arriving at the five-bucket categorization
with per-category toggles that shipped.

During that middle stretch, while the code and the design bounced around
across multiple implementations, I had a feeling I recognized immediately. It
was the feeling of being on a software team where the project has gotten
itself into a difficult situation that seems intractable — where each proposed
fix creates new problems, where the edge cases keep multiplying, where nothing
seems to fully hold together. "Right," I thought. "even with vibe coding,
software is still really difficult at times."

The breakthrough — whether it came all at once or accumulated gradually, I
cannot quite recall — was landing on a simple mental model: cloud equals hard
drive. Your hard drive does not do things automatically. It does not make
decisions on your behalf. But if you use it deliberately — save before you
switch machines, read when you arrive — it keeps things aligned across devices
without requiring magic. Once that framing was in place, the rest of the
design followed more naturally. The explicit `ds` and `dr` operations, the
preference for user-initiated actions over automatic behavior, and the
acceptance of practical limitations (the feature does not aim to be a
video-level live syncing mechanism) — all of it fits the mental model.
(general bucketing into five groups, plus information about

### The legacy of scarce developer time

One thing the LLM brought to the table that I had not anticipated: the
accumulated wisdom — and baggage — of decades of software engineering
culture.

Developer time used to be the scarcest resource on any project. An entire
industry of books, blog posts, conference talks, and consultants emerged to
help teams answer questions like: how do you rank features and bug fixes?
How do you decide whether to fix, migrate, or replace a codebase? How do
you justify the cost of addressing technical debt? All of this thinking
assumed that implementation was expensive and slow, because it was.

That assumption is baked into the LLM's corpus, and it shows up in unexpected
ways. Ask whether feature X is feasible, and the LLM will often respond with
careful hedging: "doable, but not trivial — possibly not worth the cost." That
is exactly the right answer for a world where implementation is expensive. It
is a less useful answer when the LLM can deliver a working solution in ninety
seconds. The feasibility warnings are honest, but they carry an old-world
price tag that no longer applies. That is an adjustment that takes some
getting used to.

### The LLM wrote code, not design — and did not solve the big problems

The architecture, the entity model, the keyboard scheme, the data model, the
UX vision — the key insights for LoopLlama v2 mostly came from me. The LLM
implemented specs; it did not generate them.

I don't intend that as self-congratulation, or as a knock on the LLM.
It is just an accurate account of where the design work happened. And it
maps neatly onto something I noticed about my own experience as a software
engineer: the parts of the work I liked most were the planning phases —
designing new systems from scratch, working through difficult problems in
existing ones. That is where the creativity and deep thinking live. The
parts I liked least were the long implementation slogs: developers asking
for more time, managers asking when it would ship, the codebase
insufficiently tested and everyone knowing the resources to fix that would
never materialize.

LLMs seem capable of radically compressing the work I disliked. That is
not a small thing.

The LLM was also genuinely valuable as a sounding board — not a
replacement for an optimal human expert with specific domain knowledge, but
a widely-knowledgeable partner that is available whenever you need it. Ask
a well-framed question, and it will help you think through tradeoffs, catch
blind spots, and push your thinking toward something more coherent. That
combination — skilled implementer plus available intellectual partner — is
a meaningful new tool.

### Genius junior engineers

The best analogy I have for working with the LLM is a junior engineer who has
not just RTFM but memorized it. The LLM's knowledge of technology, APIs,
coding patterns, and best practices is encyclopedic. It is fast, tireless, and
almost never stumped by a well-specified task.

But junior engineers, however talented, are often myopic. They solve the
problem in front of them without fully weighing the wider implications —
other parts of the codebase, consistency with existing patterns, the
coherence of the system as a whole. The LLM has the same tendency. Many
times during v2, I identified a bug or a design problem, and the LLM
offered a fix that would genuinely resolve the immediate issue while
quietly introducing a new inconsistency or undermining a broader goal.

A related instance: during a late testing pass, I found a bug where a
function was replacing local data with itself — the wrong variable — instead
of the incoming cloud version. The bug had survived multiple rounds of
refactoring, invisible because the LLM was moving quickly across many files
at once.

The myopia, I think, is largely downstream of context window limits. The LLM
cannot hold the entire project in mind at once -- and, just as important in
many policy contexts, the history of project, its accumalted policies and
their reasons -- so its attention is always partial. That is a real constraint
today, and also one that seems likely to improve. An LLM with a genuinely
encyclopedic context — one that could hold the full history of a long project
in working memory — would be a qualitatively different partner. The potential
in software engineering, research, writing, journalism seems large.

### For writer's block, too

A brief meta-observation: this post itself is an example of how useful
LLMs are when you are staring at a blank page.

Ninety minutes before writing this paragraph, the post was a dread. I had
no idea what I wanted to say, no structure, no draft — just a vague sense
that something should be written about the new version. I started by typing
raw notes into the LLM: unpolished memories, half-formed observations,
things I wanted to remember to mention. The LLM converted each batch of
musings into rough but coherent prose. At each step, the task felt more
tractable. Ideas accumulated. The blank page filled.

The new problem is that there is now too much material. The task has shifted
from generation to editing and pruning. Writer's block is gone — replaced by
a different, more manageable kind of work.

## Code generation vs software creation

People often predict that AI will "write all code" within the coming months or a
few years. But code generation is only one part of software creation.

## CC top level reaction to outline

Here are my top-level reactions.

    **The argument is coherent and the arc is sound.** Skeptical of mass
    unemployment fears → honest about AI's novelty → "worst case is still
    politically manageable" is a defensible through-line for the
    contrarian-but-humble framing you want.

    **The strongest move** is the "worst case might be good" section.
    Reframing mass unemployment as implying massive productivity, and then
    shifting the inequality question from economic necessity to political
    choice — that's genuinely sharp and underappreciated. It also gives the
    essay a landing spot that isn't pessimistic or naively optimistic.

    **The trickiest structural problem**: you have three overlapping hedges
    — "history says it's fine," "but AI might be different," "but even the
    worst case isn't as bad as feared." Each is defensible, but strung
    together they risk making the reader unsure what the essay's actual claim
    is. You'll want to make the hierarchy of those three positions explicit,
    probably in the opening framing. Something like: "Here's the historical
    baseline, here's why AI might diverge from it, here's why even the
    divergence isn't the catastrophe people fear."

    **The LL v2 micro-level illustration** is the essay's most original
    contribution. But note a tension in your outline: "I wrote no code" could
    sound like your labor disappeared — when the rest of the outline makes
    clear it transformed into planning, design, and QA. That distinction needs
    to be crisp early, or readers will think you're proving the wrong point.

    **The Andy Hall reference** needs development or removal. As a bare
    citation it reads as name-dropping; as a paragraph it could become a
    strong corroborating data point.

    **One gap worth noting**: the outline doesn't address transition costs.
    Even if the long-run outcome of mechanization was good, the short-run
    displacement was genuinely painful — Ricardo worried about this
    explicitly. You don't need to dwell on it, but a brief acknowledgment
    would inoculate the argument against the obvious objection that you're
    being glib about real suffering in the near term.

    **The flywheel section** is your most speculative, and the
    counter-argument ("mechanization also had self-reinforcing dynamics that
    eventually plateaued") is thinner than it appears. Unlike steam power, AI
    could plausibly improve AI directly. You can still make the argument —
    we don't know how far this paradigm goes — but the historical parallel
    isn't as reassuring there as elsewhere.

    Overall: plausible and coherent. The main work is tightening the hierarchy
    of claims and sharpening the LL v2 illustration.

