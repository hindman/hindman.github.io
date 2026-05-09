---
title: "AI and mass unemployment: an optimistic take"
tags:
  - loopllama
  - software
  - llm
published: false
---

<!--

__HERE__

## The problem with AI
## Economic history says the unemployment concerns are confused
### Mass unemployment explained
### Mechanization as a comparative case study
### LL v2 as a case study
### MISC
#### How it started
#### Not vibe coding
#### A case study: cloud backup
#### The legacy of scarce developer time
#### The LLM wrote code, not design
#### Genius junior engineers
### Biggest gains came for smaller, well-specified tasks
## Deeper AI limits may not be solvable in current paradign
### The static framing is the error
### complications
### LL v2 as a micro-level illustration
### Induced demand and task transformation
### Andy Hall's research as a second example
### Writer's block: another example of the same dynamic
## Why AI might be different
### Flywheel of improvement
### Qualification: transition costs are always difficult
### How far does the current AI paradigm go?
## The worst case might be good indeed

-->

## The problem with AI

Two core concerns dominate US media and policy discussion:
  - Alignment: AI going rogue.
  - Employment: AI destroys jobs, leading to extreme inequality and
    large-scale unemployment.

This essay focuses on the second concern.
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
    production, most famously in the auto industry.
  - Mechanization substantially changed employment in the US.
  - Like AI, mechanization was a general purpose technology.
    - Able to compress costs dramatically.
    - And to enable previously impossible things.

US agriculture: helpful example to appreciate the scale of the change:
  - Consider the percentage of labor force working in agriculture:

        1870 | > 50
        1900 | 40
        1940 | 17
        1960 | 8
        Now  | < 2

        [Need to source this. Check HSUS]

  - Viewed through one lens, that looks like the destruction of fully half of
    the jobs that existed in the mid 19c.
  - To put it crudely, were tractors the AI of farming?

Contemporary worries about mechanization paralleled our AI debates:
  - Observers of mechanization during its early phases:
    - Such matters were discussed on both popular and intellectual levels.

  - Luddites (1811–16) are as famous case:
    - Skilled textile workers destroying machinery, fearing displacement.

  - David Ricardo:
    - [need to confirm citation]
    - Principles (1821): 3rd edition: added a chapter "On Machinery".
    - Reversed his earlier position and acknowledging that machinery could
      permanently harm workers.
    - Triggered a serious "compensation debate" among classical economists
      that ran for decades.

On mechanization, if not AI, we have the benefit of hindsight:

  - Yes, mechanization led to massive productivity gains.
  - Yes, many types of jobs were destroyed or radically changed:
    - Agriculture illustrates this.
    - The old farming jobs simply don't exist.

  - Mass unemployment did not occur:
    - Footnote:
      - Specifically, durable unemployment did not occur.
      - Cyclic events -- recessions and, most notably, the Great Depression --
        were common, of course.

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

  - We elevated and expanded our goals and wants:
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
    - Some reduction in labor hours.
      - [get stats]
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
  - I was a manager, a planner — the person with the vision and goals — and a
    QA tester.

I was not a web developer in any meaningful sense. I had cobbled
together a primitive v1, but I lacked both the expertise and the desire
to acquire the expertise necessary to create v2. The AI let me realize
a vision for an application that did not otherwise exist. And achieving
that vision was not labor-free: months of work, in small chunks, but
overall a lot of time and effort. Human labor did not disappear. It
became different. I was not plowing the field (writing code); I was
directing a tractor from the comfort of my office.

The architecture, the entity model, the keyboard scheme, the data model, the
UX vision — the key insights for LoopLlama v2 mostly came from me. The LLM
implemented specs; it did not generate them.

#### How it started

After a couple of years of v1 usage, I had accumulated a lot of ideas
about what a better version would need. Communicating all of that to
the LLM was itself a project — many rounds of back-and-forth to
establish the concept, discuss tech choices, and sort through
tradeoffs. Early in that process, the LLM suggested creating a static
mockup of the app before writing any real code. That turned out to be
a good call.

More features in v2 than envisioned:
  - cloud backup, sharing, zooming, chapters

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
hand you a great solution.

That said, LLMs are quite useful as an intellectual partner or sounding board
for exploring tentative plans: finding gaps, brainstorming solutions, pushing
thinking toward something more coherent. They won't give you a great answer
for free, but they help you ask sharper questions and work incrementally
toward a solid plan.

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

Pretty quickly, I began to think we had opened a pallet load of worm cans.
Questions started multiplying. What should happen the first time a user signs
in? What if the local library is empty but the cloud has data? What if both
have data and they conflict? What does "conflict" even mean at the video
level? If you use two devices alternately without coordinating, how do you
avoid overwriting your own work? Should the app remind a signed-out user to
sign back in, and if so, how persistently?

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

Developer time used to be the scarcest resource on any project. An entire
industry of books, blog posts, conference talks, and consultants emerged to
help teams rank features, manage technical debt, and weigh competing
priorities. All of this thinking assumed implementation was expensive and
slow, because it was.

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
not just RTFM but memorized it. Encyclopedic knowledge of
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

An LLM with a genuinely encyclopedic context — one that could hold the full
history of a long project in working memory — would be a qualitatively
different partner. The potential in software engineering, research, writing,
journalism seems large.

### Biggest gains came for smaller, well-specified tasks

  - AI is very good at implementing small-to-medium, well-defined tasks.
  - It's also quite good at generating prose with similar characteristics:
    small to medium scale, with clear goals and criteria.
  - Gains were more mixed — sometimes non-existent — for larger-scale or
    open-ended problems:
    - AI could not create a good v2 plan.
    - Nor could it write the posts on my behalf.
      - Even given a pile of raw notes, ideas, and points, it could not
        organize them into a well structured essay outline.

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

## Deeper AI limits may not be solvable in current paradign

Genius without good ideas, widsom, insight:
  - You would think that an entity with encyclopedic grasp of all human
    knowledge would be better and coming up with good ideas, or writing
    interesting essays.
  - But I have not observed that.
  - So there still seems to be something "missing".
    - AIs may be -- and maybe become -- better than most humans and most
      cognitive jobs involing small-to-medium tasks with well-defined
      criteria and goals.
    - But our biggest challenges are not those.

Ability to learn:
  - This is also missing.
  - AI models are trained on a massive corpus.
  - But after that, they are static.
  - That's a real difference:
    - Humans become wise over time, even if their raw cognitive powers
      wane a bit.
    - Better able to see the full picture, to notice opportunites for
      good ideas, to have good taste for quality, coherence, the
      weighing of trade-offs.

### The static framing is the error

If AIs can do a lot of existing tasks, that sounds bad if you think of
employment in static terms:

  - Current jobs exist.
  - AI can do them more cheaply.
  - Thus, AI will do the job, not a human.
  - That looks like job destruction.

That framing misses the thing that economic history most clearly shows:
economies are not static. The list of jobs, industries, goods, and
services is not fixed.

### complications

Type of work:

  - Mechanization replaced physical and manual labor.
  - Displaced workers retreated into cognitive, creative, and social work.

  - AI encroaches on cognitive tasks.
  - Perhaps the combo -- AI for mental work, machine and robots for physical
    -- leaves no escape value for new employment opportunities.

Speed:
  - Mechanization: call it 180 years: 1760-1940.
  - AI: call it 85 years so far: 1941-2026.
    - Footnote:
      - 1941: Zuse Z3
      - 1945: ENIAC.
  - Some might object to my AI dating:
    - But that would apply different historical dating criteria to these two
      general purpose technologies.
    - Mechanization in the 1700s, as impressive as it was, looked nothing like
      the Ford assembly lines.
  - It's true that computerization might be progressing notably faster than
    mechanization did.
      - But the different is closer to 2x than 10x.
      - Computerization has happened over decades, not years.

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

AI did not destroy a job; it enabled a project that would not otherwise
have existed.

### Induced demand and task transformation

LL v2:
  - AI lowers the cost of software creation.
  - That enables new demand that couldn't have materialized before (I
    build v2).
  - Human labor is still required, just transformed: planning, design,
    QA instead of coding.

Econ terms:
  - Induced demand: cheaper supply creates demand that didn't exist.
  - Task transformation: labor shifts rather than disappears.
  - "Technology displaces tasks, not workers":
    - [cite this and/or figure out precisely what it means]

### Andy Hall's research as a second example

Andy Hall's research on LLMs and political science: using the
productivity boost from AI to create more bold and expansive research
agendas.
  - [get citation; add detail]

My own research background confirms this point:
  - Dissertation.
  - Historical Statistics of the United States.
  - MPC: IPUMS, etc
  - All of the biggest projects in my academic career could have been
    substantially helped by AIs. My team and I would have done more and
    done it faster.

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

Perhaps such limits are accurate but misleading. If AI starts to
improve AI, the agents could become powerful enough that it becomes
difficult to envision any white-collar job that would not be done
better by a computer.

In that world: even as we increase our ambitions, the new jobs that
emerge will just be best suited for more AIs. Paradoxically, only jobs
in the physical world would be AI-proof — the reverse of the
mechanization trend, which typically caused employment to become less
physical, more mental.

Counter-note: Mechanization had similar waves of mutually reinforcing dynamics
that, for a time, accelerated progress. Eventually the limits of the paradigm
began to hit. The flywheel didn't keep flywheeling forever. But mechanization
couldn't improve mechanization; AI might be able to do exactly that. [This
counter-note deserves more thought.]
  - This part is thin.
  - Unlike steam power, AI could plausibly improve AI directly. That
    distinction is worth addressing honestly.

### Qualification: transition costs are always difficult

The economic effects of mechanization were inaraguably positive
over the long term and in the aggregate.

But in short term and local contexts, real jobs were destroyed,
real households and communities disrupted.

Even if computerization has similar long run aggregate effects,
the transition will not be smooth or painless without good
social policy.

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

In a world where computers can do all cognitive tasks and robots can
perform most physical tasks:

  - That is a post-scarcity society.
  - It can be a dystopian hellscape with extreme inequality.
  - Or it can be something where most humans need not labor to satisfy
    material desires — even shorter work weeks, or work as an
    opt-in activity.

  - I don't expect that kind of outcome -- in effect, the sort of
    post-scarcity world in Star Trek.
  - But I know from the study of hsitory and economics that inequality is
    always downstream from our political systems and the choices behind them.

  - If we invent super-capable machines, it's up to us (absent T2 alignment
    problems) to decide how the prosperity and wealth implied by that new
    technology is distributed.

