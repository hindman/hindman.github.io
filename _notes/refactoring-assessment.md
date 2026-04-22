
# Refactoring assessment

## Assessment prompt

Let's perform a refactoring assessment of the LoopLlama v2 codebase. This is a
diagnostic exercise: do not make code changes yet.

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
     across files or methods. Example 1: an entity type called "loop" in one
     place and "namedLoop" in another. Example 2: confusion between scratch
     loop and saved loops, or confusion over the "scratch" operation.

  4. Structural duplication: blocks of code that do the same thing and could
     be consolidated into a shared helper.

  5. Dead code or unreachable paths.

  6. Oversized or overloaded modules. A component, module, or function that
     has accumulated too many distinct responsibilities, such that future
     changes to one concern require navigating unrelated code.

  7. Layer violations. Logic that has migrated to the wrong architectural
     layer (e.g., business rules inside a UI component).

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

## Assessment

[START REPORT HERE]

