# Refactoring Assessment Prompt

## MH notes

Get help docs and dev-docs in good shape first.

Augment the instructions to have the agent read the docs alongside the code.

Have the agent report any gaps/inconsistencies.

## Claude Code settings

No special flags needed. Submit as a normal prompt. Do NOT use ultrathink
or extended thinking -- the bottleneck for this task is reading breadth,
not reasoning depth. Do NOT use the Explore agent (read-only, no editing).
Use the default general-purpose agent or just the main chat.

Before submitting, confirm the dev server is NOT running -- no changes
will be made, but there's no reason to have it up.

---

## The prompt

I want a refactoring assessment of the LoopLlama v2 codebase. This is a
diagnostic exercise only -- do not make any code changes.

Read the CLAUDE.md project instructions first, then read every source
file under `loopllama/v2/src/` before forming any conclusions. Do not
report findings file by file as you go; read everything first, then
produce a single consolidated report.

What to look for -- in priority order:

1. Duplicated policy logic: the same rule or invariant encoded in
   multiple places, such that a future policy change would require
   simultaneous edits in several spots. This is the highest-priority
   category because it's the most likely source of real bugs.

2. Scattered or magic values: numeric thresholds, string literals, or
   flag names that appear in multiple places without a named constant.

3. Inconsistent naming: the same concept referred to by different names
   across files or methods (e.g., an entity type called "loop" in one
   place and "namedLoop" in another).

4. Structural duplication: blocks of code that do the same thing and
   could be consolidated into a shared helper -- but only flag this if
   the duplication is non-trivial and the consolidation would have a
   clear single name and purpose.

What NOT to report:

- Style or formatting issues.
- Minor one-line cleanups.
- Abstractions that would be purely aesthetic ("this could be a helper")
  without a clear policy/maintenance benefit.
- Anything already noted in CLAUDE.md or the planning docs as a known
  deferred item.

Output format:

Produce a prioritized list of findings. For each item:
- Category (from the list above)
- Severity: High (likely to cause a real bug on the next policy change),
  Medium (adds friction but unlikely to cause bugs), Low (worth noting)
- A concrete description: what the duplication or inconsistency is,
  and which files/methods are involved
- One sentence on what a fix would look like (no code needed)

End with a brief overall assessment: is the codebase in good shape with
a few isolated issues, or is there a pattern of structural problems that
warrants a dedicated refactoring pass before further feature work?
