---
title: "AI and mass unemployment: doom in three acts"

excerpt: >

  The fear that AI will cause mass unemployment is intuitive, historically
  informed, and — in its simplest form — incoherent. Are we doomed? An
  exploration in three acts.

tags:
  - AI
  - economics
  - history
  - employment
  - loopllama

published: false
---

<!--

## Prologue: they took our jobs!
## Doom averted: what happened last time
## Interlude: the case of LoopLlama
## Doom reconsidered: this time might actually be different
## Doom inverted: the worst case might be great

-->

I have been following the AI-employment debate with some interest. I have an
academic background in economic history and recently finished a software
project, [LoopLlama](/loopllama/v2), using an AI coding agent. Below I draw on
both to offer some ideas that are well-known to economists and historians but
underrepresented in popular discourse — and, on balance, more reassuring.

## Prologue: they took our jobs!

<span class="phead">The fear is intuitive.</span> If AI can do most cognitive
work faster and cheaper than humans, employers will use AI instead. Several
[leaders][amodei_adolescence] of major frontier [AI labs][gpts_are_gpts] have
claimed that they expect this to happen, and and the question is [seriously
debated][frey_osborne] among [macroeconomists][acemoglu].

<span class="phead">And based on a fallacy.</span> Many economists and
historians would also point out that the fear — at least when expressed simply
— rests on the [lump of labor fallacy][wiki_lump_of_labor]: the assumption
that there is a fixed amount of work to be done, so if machines take some of
it, humans get less.

## Doom averted: what happened last time

<span class="phead">Mechanization is the obvious historical parallel.</span>
The [industrial revolution][wiki_ind_rev] started automating physical work
starting in the mid-18th century and reached a peak with
[assembly-line][wiki_assembly] production in the mid-20th. Like AI, it was a
general-purpose technology applicable across industries; like AI, it
compressed costs dramatically and enabled previously impossible things. The
main difference is that mechanization operated in the physical realm, AI in
the cognitive.

<span class="phead">Agriculture illustrates the scale of change.</span> Over
[50 percent][hsus_ag_labor] of the US labor force worked in agriculture in
1870; today the figure is under [2 percent][wb_ag_labor]. Viewed one way, the
mechanization of agriculture — and many other sectors — destroyed most jobs
that existed in the past.

<span class="phead">Contemporary observers saw catastrophe coming.</span> The
[Luddites][wiki_luddite] were skilled textile workers who famously destroyed
machinery in the 1810s, fearing displacement. David Ricardo, one of the most
influential economists from that period, witnessed the effects of
mechanization and [reversed his earlier position][ricardo_machinery_retro],
acknowledging that machinery could permanently harm workers, triggering a
debate among classical economists that ran for decades. The parallels to
current AI discourse are hard to miss.

<span class="phead">Prosperity, not catastrophe.</span> Mechanization produced
neither mass unemployment nor impoverishment. By almost any material measure,
people living in countries with modern, developed countries are vastly more
prosperous than their 19th-century ancestors. As one example among many, US
household spending on necessities — food, clothing, housing — fell from
roughly 80 percent of budgets in 1900 to under 50 percent today, even as the
quanity, quality, and variety of those necessity goods expanded
substantially.[^1]

<span class="phead">Employment shifted rather than collapsing.</span> Old jobs
were genuinely destroyed — those farming jobs simply do not exist. But new
jobs emerged to meet an expanded set of wants and ambitions, in sectors like
education, healthcare, government, finance, media, and, of course, various
engineering and technical fields to create and maintain the ever-growing
roster of machinery. Work also became less brutal: [fewer
injuries][bls_occup_safety], less drudgery, [shorter][us_work_week1]
[hours][us_work_week2]. Labor was not a lump: human employment was not fixed;
it evolved as we became more mechanized and more prosperous.

## Interlude: the case of LoopLlama

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
the AI significantly expanded the scope of my ambition for the project.[^2]

<span class="phead">Employment did not disappear — it shifted.</span> My old
job, writing code, largely evaporated. What replaced it? Planning the
architecture and features, directing the AI through implementation, assessing
what it produced, identifying gaps and inconsistencies, then planning and
directing again. The human effort moved upward, toward judgment about the
whole project rather than execution of individual coding tasks.

<span class="phead">It shifted because AI has limits.</span> An AI coding
agent is like a genius new hire who has not just [RTFM][wiki_rtfm] but
memorized it: encyclopedic knowledge of APIs, frameworks, and coding patterns;
work ethic out the wazoo; and rarely stumped by a well-specified task. But
like talented junior engineers, AIs tend toward myopia. Given a bug or design
problem, the AI sometimes offered a fix that resolved the immediate issue
while quietly introducing trouble elsewhere. Had I passively accepted every
short-term fix the AI proposed — in the style of [vibe
coding][wiki_vibe_coding], where you simply tell a computer what you want and
it happens — the result would have been much less coherent. The success of v2
derived from human-AI collaboration, not one type of intelligence or the
other.

## Doom reconsidered: this time might actually be different

<span class="phead">AI limits might be temporary.</span> AI is different from
a loom or an assembly line in one critical respect: it is a cognitive
technology running on computers, which means it can, in principle, be turned
on itself. We already see this happening in limited ways, with frontier AI
labs reporting, or at least predicting, that AI is accelerating progress
toward better AI.[^3] If that loop continues, the limits I observed —
difficulty with larger or open-ended tasks, mypopia regarding downstream
consquences, failures when weighing tradeoffs among project goals, and
inability to generate out-of-the-box solutions in those situations — those
limits might represent a snapshot rather than a ceiling.

<span class="phead">No escape valve.</span> Extrapolate the trend, and perhaps
AI agents will not only execute tasks but generate the plans, goals, and
judgments that humans currently supply — while robotics extends automation
further into physical work. At that point, the reassuring analogy to
mechanization breaks down. As mechanization proceeded in the 19th and 20th
centuries, employment shifted toward office and professional jobs. But the
combination of increasingly capable AIs for cognitive work and machines for
physical work leaves no obvious employment realm where human labor holds a
structural advantage.

## Doom inverted: the worst case might be great

<span class="phead">The doom scenario leads to contraction.</span> Assume the
most extreme version: AIs and machines handle virtually all work, and mass
unemployment follows. But that scenario also implies mass productivity — an
economy generating an enormous quantity of goods and services with a tiny
fraction of the labor previously required. That translates into vastly greater
wealth, at least in the aggregate. But who among the jobless will purchase
this river of goods and services?

<span class="phead">Door #1: the problem of distribution.</span> Labor in a
market economy serves two distinct functions. It is a factor of production —
labor makes and does things. It is also the primary mechanism by which income
reaches the population: wages give workers the purchasing power to buy what
the economy produces. Employment bundles those two functions, but extreme
automation severs the bundle: no employment, no wages, no demand, no reason to
engage the capable AIs and machines in the first place. The gears grind to a
halt. Down this branch of the thought experiment lies one extreme outcome:
supreme technological capability amid system-wide impoverishment.

<span class="phead">Door #2: seizing the means of distribution.</span> Down
this branch lies broad prosperity that mimics or even dwarfs what occurred
during mechanization: shorter work weeks, material abundance without drudgery,
labor as vocation rather than necessity — each of us crafting our own
LoopLlamas. For that to happen, one or more mechanisms must replace wages as
the means by which income reaches people: broad capital ownership,
profit-sharing, a [universal basic income][wiki_ubi] (UBI), public ownership
of productive capacity.

<span class="phead">The pessimist's objection.</span> Very few regular folks
find talk of UBI and broadly shared AI prosperity reassuring. The default
stance I observe in the US is pessimistic: those who control the technology
will resist redistribution, accumulate disproportionate wealth and power, and
the rest of humanity will suffer. History offers plenty of examples of elites
doing exactly that.

<span class="phead">Elites without an exit strategy.</span> Extreme automation
closes off the escape routes that normally let the wealthy insulate themselves
from inequality's consequences. If automation is global and comprehensive,
there are no intact consumer economies to export to, no untouched labor
markets to arbitrage. The owners of the AIs and robots are trapped inside the
same macroeconomic logic as everyone else, and hoarding becomes
self-defeating. History offers a partial answer to the pessimist's objection:
[redistributive reforms][wiki_new_deal] have [occurred before][wiki_prog_era],
driven not by universal elite buy-in but by popular pressure combined with
defections from enough elites to break the blocking coalition. Whether that
happens early or late, smoothly or catastrophically, is the real open question
— not whether advanced AI and machines can produce enough wealth to make us
all prosperous.

--------

[amodei_adolescence]: https://www.darioamodei.com/essay/the-adolescence-of-technology#4-player-piano
[gpts_are_gpts]: https://arxiv.org/pdf/2303.10130
[frey_osborne]: https://oms-www.files.svdcdn.com/production/downloads/academic/The_Future_of_Employment.pdf
[acemoglu]: https://economics.mit.edu/sites/default/files/2024-04/The%20Simple%20Macroeconomics%20of%20AI.pdf
[wiki_lump_of_labor]: https://en.wikipedia.org/wiki/Lump_of_labour_fallacy
[wiki_ind_rev]: https://en.wikipedia.org/wiki/Industrial_Revolution
[wiki_assembly]: https://en.wikipedia.org/wiki/Assembly_line
[hsus_ag_labor]: https://hsus.cambridge.org/HSUSWeb/toc/treeTablePathIdBa814-830.html
[wb_ag_labor]: https://data.worldbank.org/indicator/SL.AGR.EMPL.ZS?locations=US
[wiki_luddite]: https://en.wikipedia.org/wiki/Luddite
[ricardo_machinery_retro]: https://www.aeaweb.org/articles?id=10.1257%2Fjep.33.2.229
[bls_consumer_spending]: https://www.bls.gov/opub/100-years-of-u-s-consumer-spending.pdf
[bls_occup_safety]: https://www.bls.gov/opub/btn/volume-9/nearly-50-years-of-occupational-safety-and-health-data.htm
[us_work_week1]: https://eh.net/encyclopedia/hours-of-work-in-u-s-history/
[us_work_week2]: https://ourworldindata.org/grapher/annual-working-hours-per-worker?country=~USA
[hsus_main]: https://hsus.cambridge.org/HSUSWeb/HSUSEntryServlet
[www_ipums]: https://www.ipums.org/
[diss_rfwt]: https://deepblue.lib.umich.edu/handle/2027.42/78949
[hall_research_ambition]: https://freesystems.substack.com/p/the-100x-research-institution
[hall_polit_super]: https://freesystems.substack.com/p/building-political-superintelligence
[wiki_rtfm]: https://en.wikipedia.org/wiki/RTFM
[wiki_vibe_coding]: https://en.wikipedia.org/wiki/Vibe_coding
[amodei_loving]: https://darioamodei.com/essay/machines-of-loving-grace
[claude_write_claude1]: https://x.com/lennysan/status/1930711568385466577
[claude_write_claude2]: https://www.nytimes.com/2026/02/24/opinion/ezra-klein-podcast-jack-clark.html
[wiki_ubi]: https://en.wikipedia.org/wiki/Universal_basic_income
[wiki_new_deal]: https://en.wikipedia.org/wiki/New_Deal
[wiki_prog_era]: https://en.wikipedia.org/wiki/Progressive_Era

[^1]: See the BLS report, [100 Years of U.S. Consumer
    Spending][bls_consumer_spending], notably Chart 1, page 3.

[^2]: I often wonder about the impact that our current AI technology would
    have had on the largest research projects of my academic career, such as
    [Historical Statistics of the United States][hsus_main],
    [IPUMS][www_ipums], and my [dissertation][diss_rfwt] on the history of US
    state taxation. In every case, I think the multiplier would have been
    large, substantially increasing what my teams and I could have
    accomplished. The political scientist Andy Hall writes frequently on such
    matters and encourages academics to figure out how to use AI to scale up
    the [ambition of their research agenda][hall_research_ambition] and, more
    directly in political science itself, to scale up our ambitions for
    [democracy itself][hall_polit_super].

[^3]: See [Dario Amodei][amodei_loving] for predictions. In
    [various][claude_write_claude1] interviews, employees at Anthropic
    [report][claude_write_claude2] that most of the code in Claude Code is
    now written by the AI model, with human management and judgement now as
    the gating factor on the rate of progress — similar to the description of
    my role in LoopLlama v2.

