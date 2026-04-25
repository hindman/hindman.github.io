
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

## Assessment: Round 3

### R3-1 (MED) — Edit-section and edit-chapter modals are near-identical

Category: Structural duplication.

`llama-edit-section-modal.js` and `llama-edit-chapter-modal.js` share
almost all of their logic: the same four reactive state fields, the same
`show(entity, derivedEnd, validator)` signature, near-identical `_save()`
validation and dispatch, the same `_onKeyDown(Enter)`, and the same
`render()` template. Differences are only: the event name
(`ll-update-section` vs `ll-update-chapter`), the inline error message
wording, and the modal title. The internal field alias differs (`_time`
in section vs `_start` in chapter), but they hold the same data and are
used identically.

Fix: Extract a shared `DividerEditMixin` (or base component) parameterized
by entity type, event name, and modal label. Each specific modal becomes a
thin wrapper.

Risk: Medium. Modals are UI-heavy and require manual testing; but the
duplication is a direct copy, so extraction is mechanical. Low risk of
behavioral change.


### R3-2 (MED) — `dataRead` and `importFromJson` merge loops duplicated

Category: Structural duplication.

In `data-ops-manager.js`, `dataRead` and `importFromJson` each contain a
~35-line loop that: iterates the incoming video array, compares
`last_modified` timestamps three ways (srcNewer, destNewer, same), stashes
the displaced local video, and replaces the local entry. The two loops are
structurally identical; only the variable names differ (`cv`/`iv` for
incoming). Both methods also share the post-loop pattern: re-sync the
current video if replaced, call `app._save()`.

Fix: Extract a private `_mergeIncomingVideos(incomingVideos, result)`
helper on `DataOpsManager`; call it from both `dataRead` and
`importFromJson`. The `result.deleteDestOnly` guard (local-only video
removal before the merge) is also identical and can fold in.

Risk: Low. The logic is well-covered by manual flows, and the refactor is
a pure extraction with no behavioral change.


### R3-3 (MED) — `parseVideoInput` has no unit tests

Category: Testing gap.

`parseVideoInput` (in `data-ops-manager.js`) is a multi-format parser for
YouTube URLs and bare video IDs. It handles standard watch URLs, youtu.be
short links, shorts and embed paths, bare 11-character IDs, and the `t`
parameter in both plain-seconds and hms (`1h23m45s`) notation. The parser
is the entry point for every video the user loads; a regression here silently
loses all videos from that URL format. Despite being non-trivial algorithmic
code, it has no tests.

Fix: Add a `data-ops-manager.test.js` with parametrized cases covering each
URL pattern, bare IDs, `t` parameter formats, and invalid inputs.

Risk: None; test addition only.


### R3-4 (LOW) — Video picker duplicates FilterPickerMixin

Category: Structural duplication.

`llama-video-picker.js` has inline implementations of `_onFilterInput`,
`_onFilterKeyDown`, `_scrollSelectedIntoView`, `show()`, and `hide()` that
are functionally identical to what `FilterPickerMixin` provides. All five
other pickers (loop, marks, sections, chapter, jump-history) use the mixin.
The video picker predates the mixin; it was never migrated.

The picker has two complications that don't prevent mixin use: sort modes
(`_sortedAlpha`, `_sortedRecent`) — which are purely additive — and an
`_onInitialFocus` that also resets scroll position. Both can be handled by
extending mixin behavior rather than replacing it.

Fix: Extend `FilterPickerMixin`. Override `_onInitialFocus` to add the
scroll reset. Keep the sort-mode logic in the subclass.

Risk: Low. The mixin is proven across five pickers; this is a mechanical
migration.


### R3-5 (LOW) — `updateChapter` is dead code in state.js

Category: Dead code.

`updateChapter(chapters, id, fields)` is exported from `state.js` but is
never imported anywhere. `llama-app.js` updates chapters inline via
`propagateEntityChange` (not via this helper), which was added later and
superseded the function. The import list in `llama-app.js` confirms the
omission.

Fix: Delete `updateChapter` from `state.js`.

Risk: Minimal. Confirm with a grep before deleting.


### R3-6 (LOW) — `_reorderVideo` key list diverges from `createVideo`

Category: Scattered/magic values.

In `storage.js`, `_reorderVideo` explicitly names the scalar fields to
control export key ordering. But two fields from `createVideo` are
missing — `zone2_mode` and `last_opened` — so they fall into the `extra`
catch-all and appear after the collection fields in exports rather than in
the scalar block. Also, `speed_delta` appears in the `known` exclusion set
but is not in the current schema (stale entry from an earlier version).

Fix: Add `zone2_mode` and `last_opened` to the explicit destructuring in
`_reorderVideo`; remove `speed_delta` from `known`.

Risk: Minimal. Only affects key ordering in exported JSON, not behavior.


### R3-7 (LOW) — `_deriveLoopSrc` duplicates section/chapter end derivation

Category: Layer violation / duplication.

`_deriveLoopSrc` in `llama-app.js` computes the effective end of a section
or chapter manually:

    const end = s.end ?? sections[idx + 1]?.start ?? null;

This is the same derivation performed inside the private
`getDividerBounds` helper in `state.js`. If the derivation rule ever
changes, `_deriveLoopSrc` would need a separate update. The full
`getSectionBounds` / `getChapterBounds` cannot be used directly here
(they check for the gap zone), but a thin exported `deriveDividerEnd(entities, idx)`
helper would unify the shared calculation.

Fix: Add `deriveDividerEnd(entities, idx)` to `state.js`; use it in both
`getDividerBounds` and `_deriveLoopSrc`.

Risk: Low; straightforward extraction.


### R3-8 (LOW) — `_clearCurrentVideoState` pattern duplicated in llama-app.js

Category: Structural duplication.

The same block that nulls all current-video reactive state appears three
times in `llama-app.js`:

    this._vc?.pause();
    this._appState.currentVideoId = null;
    this.currentVideoId = null;
    this.sections = []; this.marks = []; this.namedLoops = [];
    this.chapters = []; this.loopStart = 0; this.loopEnd = 0;
    this.looping = false; this.loopSrc = null; this.duration = null;

Occurs in `_onDeleteVideo`, `_onDeleteData` (mode='videos'), and
`_applySnapshot` (no-video restore). Each time the fields match; only the
surrounding context differs.

Fix: Extract `_clearCurrentVideoState()` as a private helper.

Risk: Low; mechanical extraction.


### R3-9 (LOW) — Documentation error in text-elements.md

Category: Doc inconsistency.

The message table contains:

    ss | W | Cannot create chapter: too close to an existing one.

The context column (`ss`) refers to Section › Create, but the message
text says "chapter" instead of "section". The code correctly emits
"Cannot create section: too close to an existing one." via the template
in `_setDivider`. The doc is wrong.

Fix: Correct the table row.

Risk: None.


---

### Implementation

    Session  | Focus                         | Items             | Status
    -----------------------------------------------------------------------
    1        | Quick wins                    | R3-5, R3-6, R3-9  | done
    2        | Dead code + small duplication | R3-5 (updateChap) | done
             |                               | R3-8 (clearState) | done
    3        | Data-ops merge helper         | R3-2              | done
    4        | Testing: parseVideoInput      | R3-3              | done
    5        | Video picker mixin            | R3-4              | done
    6        | Edit modal unification        | R3-1              | done
    7        | deriveDividerEnd              | R3-7              | done

