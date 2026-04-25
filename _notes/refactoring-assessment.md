
# Refactoring assessment

## Assessment prompt

Let's perform a refactoring assessment of the LoopLlama v2 codebase. This is a
diagnostic exercise: do not make code changes yet.

We already performed this assessement in two prior rounds, making several
changes (archived in _notes/archive/refactoring-assessment.done.md). But I
want to repeat the exercise. Both of the prior rounds revealed significant
items worth addressing and my plan is to repeat this process until we think
we've reached a sensible stopping point.

Do not report findings file by file as you go; read everything first, then
produce a single consolidated report. Here are the key files to read:

 - CLAUDE.md project instructions.

 - The following user-facing and dev-facing documents:

        loopllama-v2-help.md        | Help docs
        loopllama-v2-keybindings.md | Key bindings
        dev-notes.md                | Dev notes: common tasks, markdown notes, v3, etc
        architecture-notes.md       | Overview of software, architecture, schema, etc
        text-elements.md            | Listing of the app's text elements
        create_db.sql               | Create/configure Supabase tables

 - Source code under loopllama/v2/src.

What to look for:

  1. Duplicated policy logic: the same rule or invariant encoded in multiple
     places, such that a future policy change would require simultaneous edits
     in several spots.

  2. Scattered or magic values: numeric thresholds, string literals, or flag
     names that appear in multiple places without a named constant.

  3. Inconsistent naming: the same concept referred to by different names
     across files or methods.

  4. Structural duplication: blocks of code that do the same thing and could
     be consolidated into a shared helper.

  5. Dead code or unreachable paths.

  6. Oversized or overloaded modules. A component, module, or function that
     has accumulated too many distinct responsibilities, such that future
     changes to one concern require navigating unrelated code. The prime
     candidate here is llama-app.js. It was over 3000 lines. In Round 2 we got
     it down to 2367 -- some progress, but the file remains unusually large
     relative to the rest of the source code. I don't want to shink the file
     for artificial reasons, but I do want to end up with a sensible code base
     as well as one that doesn't blowout my token budget whenever we have to
     work with this file.

  7. Layer violations. Logic that has migrated to the wrong architectural
     layer (e.g., business rules inside a UI component).

  8. Inconsistency in concepts/language between the code and the project's
     primary documents (those listed in the table above). The loop-vs-scratch
     distinction is a likely culprit, since our thinking evolved and sharpened
     over time. There might be other areas as well, but that one is most
     prominent in my memory.

  9. Testing gaps. We have some unit tests for algorithmic, pure-function
     operations. But a lot of coding occurred since we set that up. Are
     any obvious targets for testing missing?

What NOT to report:

  - Style or formatting issues.
  - Minor one-line cleanups.
  - Abstractions that would be purely aesthetic without a clear policy or
    maintenance benefit.

Output format: a prioritized list of possible refactoring targets:

  - Category: what kind of refactoring is it?

  - Severity: high (likely to cause a real bug on the next policy change),
    medium (adds friction but unlikely to cause bugs), low (worth noting).

  - A concrete description: what the duplication or inconsistency is, and
    which files/methods are involved

  - A brief description of the fix.

  - A brief assessment of the riskiness of applying the fix (ie, might the fix
    cause other bugs or require extensive manual testing of the app the guard
    against that risk).

