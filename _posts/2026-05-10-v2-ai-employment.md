---
title: "AI and mass unemployment: a skeptical take"
excerpt: >
  Like mechanization, computerization might make us
  more prosperous, not unemployed. Lessons from economic
  history and LoopLlama.
tags:
  - loopllama
  - software
  - llm
published: false
---

<!--

## They took our jobs!
## Mechanization
## LoopLlama as an illustration
## Computerization might be different
## The worst case might be good indeed

-->

I've been following the AI-employment debate with some interest — namely, the
idea that AI will to large-scale unemployment. I have an academic background
in economic history and recently finished a software project,
[LoopLlama][/loopllama/v2], using an AI coding agent. Below I offer several
observations drawing on that background. None of them are particularly
original, but collectively they suggest that our AI future could be brighter —
or at least more uncertain — than typical doom-and-gloom presentations of this
topic in popular discourse often suggest.

## They took our jobs!

<span class="phead">The fear is intuitive.</span> If AI can do most cognitive
work faster and cheaper than humans, employers will use AI instead. Several
leaders of major frontier AI labs have claimed that they expect this to
happen, and some macroeconomists take the idea seriously. [get citations].

<span class="phead">And based on a fallacy.</span> Many economists and
historians would also point out that the fear — at least when expressed simply
— rests on the [lump of labor fallacy][lump_of_labor]: the assumption that
there is a fixed amount of work to be done, so if machines take some of it,
humans get less.

## Mechanization

<span class="phead">Mechanization is is obvious historical parallel.</span>
The industrial revolution started automating physical work starting in the
mid-18th century and reached a peak with assembly-line production in the
mid-20th. Like AI, it was a general-purpose technology applicable across
industries; like AI, it compressed costs dramatically and enabled previously
impossible things. The main difference is that mechanization operated in the
physical realm, AI in the cognitive.

<span class="phead">Agriculture illustrates the scale of change.</span> Over
50 percent of the US labor force worked in agriculture in 1870; today the
figure is under 2 percent. Viewed one way, the mechanization of agriculture —
and many other sectors — destroyed most jobs that existed in the past.

<span class="phead">Contemporary observers saw catastrophe coming.</span> The
Luddites were skilled textile workers who famously destroyed machinery in the
1810s, fearing displacement. David Ricardo, one of the most influential
economists from that period, witnessed the effects of mechanization and
reversed his earlier position, acknowledging that machinery could permanently
harm workers, triggering a debate among classical economists that ran for
decades. [add citation: Principles (1821): 3rd edition: added a chapter "On
Machinery"] The parallels to current AI discourse are hard to miss.

<span class="phead">Prosperity, not catastrophe.</span> Mechanization produced
neither mass unemployment nor impoverishment. By almost any material measure,
people living in countries with modern, developed countries are vastly more
prosperous than their 19th-century ancestors. As one example among many, US
household spending on necessities — food, clothing, housing — fell from
roughly 80 percent of budgets in 1900 to under 50 percent today, even as the
quanity, quality, and variety of those necessity goods expanded substantially.

<span class="phead">Employment shifted rather than collapsing.</span> Old jobs
were genuinely destroyed — those farming jobs simply do not exist. But new
jobs emerged to meet an expanded set of wants and ambitions, in sectors like
education, healthcare, government, finance, media, and, of course, various
engineering and technical fields to create and maintain the ever-growing
roster of machinery. Work also became less brutal: fewer injuries, less
drudgery, shorter hours. Labor was not a lump: human employment was not fixed;
it evolved as we became more mechanized and more prosperous.

## LoopLlama as an illustration

<span class="phead">Massive boost in productivity.</span> LoopLlama v2 runs to
over 11,000 lines of code, built in roughly two months of part-time effort —
typically an hour or two per day. More importantly, the AI did not merely
speed up work I would have done anyway. I am a software engineer, but not a
web developer — its own domain of expertise, one I had no interest in
acquiring. Without an AI coding agent, v2 would not have existed.

<span class="phead">And ambition.</span> As an example, consider the
application's cloud backup feature, which was originally raised fairly late in
the coding process, as a speculative idea for a future v3. Exercising such
caution was how I was trained to think as a software engineer, because adding
a major feature late in a development cycle is one way software projects fail.
But the premise behind that old wisdom — namely, that generating code is
costly — had evaporated. Even though the move felt a bit crazy in the moment,
we decided to add the feature and the app is much better for it. More
generally, cloud backup is just one example among many where the existence of
the AI significantly expanded the scope of my ambition for the project.
[Footnote: Andy Hall on AI and academic research, plus a brief comment that I
can only imagine how AI would have expanded my own research when I worked in
academia.]

<span class="phead">Employment did not disappear — it shifted.</span> My old
job, writing code, largely evaporated. What replaced it? Planning the
architecture and features, directing the AI through implementation, assessing
what it produced, identifying gaps and inconsistencies, then planning and
directing again. The human effort moved upward, toward judgment about the
whole project rather than execution of individual coding tasks.

<span class="phead">AI as a genius junior engineer.</span> An AI coding agent
is like a new hire who has not just RTFM but memorized it: encyclopedic
knowledge of APIs, frameworks, and coding patterns; work ethic out the wazoo;
and rarely stumped by a well-specified task. But like talented junior
engineers, AIs tend toward myopia. Given a bug or design problem, the AI
sometimes offered a fix that resolved the immediate issue while quietly
introducing trouble elsewhere. Had I passively accepted every short-term fix
the AI proposed — in the style of "vibe coding", where you simply tell a
computer what you want and it happens — the result would have been much less
coherent. The success of v2 derived from human-AI collaboration, not one type
of intelligence or the other.

## Computerization might be different

<span class="phead">But the limits I observed may be temporary.</span> The AI
I worked with was genuinely impressive within a well-scoped task, but
struggled with the larger picture: it couldn't hold the whole codebase in
mind, rarely anticipated downstream consequences, and had no real agenda of
its own. I supplied the vision and judgment; it supplied the execution. That
division of labor is what made the mechanization analogy feel apt. But AI is
different from a loom or an assembly line in one critical respect: it is a
cognitive technology running on computers, which means it can, in principle,
be turned on itself. We already see this happening — frontier AI labs report
that AI is materially accelerating progress toward better AI. If that loop
continues, the limits I observed are not a ceiling; they are a snapshot.

<span class="phead">Capable enough to do it all.</span> Extrapolate the trend
far enough, and you reach a threshold where AI agents can not only execute
tasks but generate the plans, goals, and judgments that humans currently
supply. At that point the analogy to mechanization starts to break down. When
the spinning jenny put hand-spinners out of work, those workers could
eventually find employment in other sectors — factory floor jobs, clerical
work, professions — because mechanization was physical and cognitive work
remained a human advantage. But if AI is capable enough to handle virtually
any cognitive task, new cognitive jobs that emerge are still best suited to
AI. The refuge that cognitive work offered during the industrial era would
simply not exist.

<span class="phead">The mechanization trend reversed.</span> The historical
arc of industrialization made work progressively less physical and more
mental: the farm laborer became the factory worker, the factory worker became
the office worker, and so on. AI-plus-robotics inverts that arc. Physical
jobs, long viewed as lower-status and more vulnerable to automation, could
ironically be among the last refuges of employment — because the combination
of AI handling cognitive work and robots handling physical work closes off
both escape routes simultaneously. That is a genuinely different situation
from any prior wave of automation, and it is at least worth taking seriously
even if the timeline remains deeply uncertain.

## The worst case might be good indeed

<span class="phead">The doom scenario undermines itself.</span> Assume the
most extreme version: AI handles virtually all cognitive work, robots handle
most physical work, and mass unemployment follows. But mass unemployment in
that scenario is also mass productivity — an economy generating an enormous
quantity of goods and services with a tiny fraction of the labor previously
required. That translates directly into vastly greater wealth and income, at
least in the aggregate. The scenario that is supposed to be catastrophic for
humanity implies, by its own logic, that humanity has never been materially
richer. Something has to give.

<span class="phead">What gives is the distribution mechanism.</span> Labor in
a market economy serves two distinct functions. It is a factor of production
— labor makes things. But it is also the primary mechanism by which income
reaches the population: wages give workers the purchasing power to buy what
the economy produces. Normally these functions are bundled; employment links
them. Extreme automation severs the bundle. Production continues; wages do
not. And a capitalist economy has no automatic substitute for wages as a
distribution mechanism. The wealth implied by all that productivity has
nowhere to go.

<span class="phead">Which produces two very different worlds.</span> One
possibility is broadly shared prosperity — shorter work weeks, work as
vocation rather than necessity, material comfort without drudgery — but only
if some mechanism replaces wages as the means by which income reaches people:
broad capital ownership, profit-sharing, a universal basic income, public
ownership of productive capacity, or some equivalent. The other possibility is
stagnation despite technological abundance: AI systems and factories capable
of producing anything, but no consumers with money to buy it. A factory that
can produce everything and sell to no one is not actually valuable, and wealth
without a functioning exchange system to give it meaning is largely inert.

<span class="phead">Even the good outcome has a painful transition.</span>
Mechanization's long-run result was broadly shared prosperity, but the road
was not smooth — real mills closed, real households were disrupted, real
communities hollowed out, and the political battles over redistribution were
long and often brutal. The same would hold for a highly automated future, even
one that ends well in aggregate. This is part of what makes the politics
central: transition costs are where actual people live, and managing them well
requires deliberate policy, not just confidence in long-run outcomes.

<span class="phead">Which world we get is a political question.</span> The
standard pessimistic read is familiar: those who control the technology will
resist redistribution, accumulate disproportionate wealth and power, and the
rest of humanity loses. History lends the pessimists some support. But the
extreme scenario also closes off exit routes that normally let the wealthy
avoid the consequences of inequality. If automation is global and
comprehensive, there are no intact consumer economies to export to, no
untouched labor markets to arbitrage. The owners of the robots are trapped
inside the same macroeconomic logic as everyone else, and hoarding becomes
self-defeating not just in aggregate but eventually for each individual
hoarder. The historical pattern — elite resistance, building crisis,
redistribution under duress — has played out before, and it does not require
universal elite buy-in, only enough defections from the blocking coalition.
Whether that happens early or late, smoothly or catastrophically, is the real
open question — not whether advanced AI produces enough wealth to go around.

--------

[lump_of_labor]: https://en.wikipedia.org/wiki/Lump_of_labour_fallacy

