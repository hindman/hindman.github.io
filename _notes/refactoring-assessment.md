
# Refactoring assessment

## Assessment prompt

Let's perform a refactoring assessment of the LoopLlama v2 codebase. This is a
diagnostic exercise: do not make code changes yet.

We already performed this assessement once, making several changes (the
section called "DONE: Assessment: Round 1"). But I want to repeat the
exercise, both because prior refactoring can exposed new refactoring
opportunities and because I added a couple more things to look for.

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

## DONE: Assessment: Round 1

### Implementation

Session 1 | state.js       | Items 2, 9              | done
Session 2 | llama-app.js   | Items 1, 3, 4, 5, 7, 11 | done
Session 3 | Modal files    | Items 6, 10             | done
Session 4 | llama-controls | Item 8                  | done

### 1. Video categorization logic duplicated 3-4x

Category: Structural duplication
Severity: High

Description: The five-bucket video categorization algorithm (srcOnly, srcNewer,
destOnly, destNewer, same — comparing last_modified timestamps across two video
maps) is written out nearly identically in `_dataSave()`, `_dataRead()`,
`_importFromJson()`, and a fourth near-duplicate in `_dataCompare()`. Each block
is 15-25 lines of the same nested-loop/Map logic, differing only in which set is
"source" and which is "dest". A future policy change — e.g. adding a sixth
category, changing how ties are broken, or altering the default toggle values —
would require four simultaneous, coordinated edits.

Fix: Extract a pure utility function `categorizeVideos(srcVideos, destVideos)`
that returns `{ srcOnly, srcNewer, destOnly, destNewer, same }` (arrays of video
objects). Each of the three operation handlers calls it with (local, cloud),
(cloud, local), or (import, local) as appropriate. `_dataCompare()` would use the
same function and translate names as needed.

Risk: Low. The function is pure (no side effects, no state), so extracting it is
mechanical and the result is trivially testable. The merge-application logic that
follows the categorization step stays in each handler as it is now, since it
differs meaningfully between operations.

### 2. Section and chapter divider model implemented twice in state.js

Category: Structural duplication / layer violation
Severity: High

Description: Sections and chapters are the same data structure (divider-based
ranges: `{ id, name, start, end? }`). The following function pairs in `state.js`
are identical in structure, differing only in variable names:

- `nearestSectionLeft` / `nearestChapterLeft` (also `nearestLoopLeft` by
  a slightly different field name `time` vs `start`)
- `getSectionBounds` / `getChapterBounds` — identical logic, 15 lines each
- `fixSectionEnd` / `fixChapterEnd` — identical logic, 5 lines each
- `addSection` / `addChapterDivider` — structurally identical, ~10 lines each

Any change to the divider-based range algorithm (e.g. modifying the gap-zone
rule, the proximity threshold, or the derived-end logic) must be applied to both
types.

Fix: Extract shared helpers that work on generic divider arrays, e.g.
`nearestDividerLeft(entities, time)`, `getDividerBounds(entities, time, dur)`,
`fixDividerEnd(entities, id, dur)`, `addDivider(entities, time, name)`. The
type-specific functions become thin wrappers or are removed entirely.

Risk: Medium. These functions are called throughout `llama-app.js` and from the
timeline component. Each call site is straightforward to update, but there are
~20 call sites total, and one subtle difference: sections use `.time` vs
`.start` was already unified (that migration is in the schema history). The
main hazard is missing a call site. A grep-based audit before and after
provides adequate coverage.

### 3. Loop source state bundle cleared manually in 7+ places

Category: Duplicated policy logic
Severity: High

Description: The scratch loop's source linkage is represented as five separate
reactive properties: `loopSource`, `loopSourceLabel`, `loopSourceType`,
`loopSourceStart`, `loopSourceEnd`. Any operation that clears the source must
null all five individually. This pattern appears 7+ times in `llama-app.js`:

- `_syncFromVideo()` (line ~406)
- `_applySnapshot()` — two distinct clearing sites within the same function
- `_onDeleteVideo()` (line ~1629)
- `_onDeleteData()` mode=videos (line ~2690)
- `_onDeleteLoop()` (line ~1919)
- `unlinkLoopSource` handler (line ~927)

If a sixth property is ever added to the source linkage bundle (e.g.
`loopSourceName` to disambiguate from `loopSourceLabel`), every one of these
sites must be updated, with no compiler or linter enforcement.

Fix: Add a private helper `_clearLoopSource()` that zeroes all five props.
Replace all 7+ clearing sites with the helper call. Alternatively, collapse
the five props into a single `loopSource` object `{ id, label, type, start,
end }` or null, which eliminates the possibility of partial clears entirely.
The object approach also reduces the number of reactive properties by four,
which is a secondary benefit.

Risk: Low for the helper approach. Medium for the object approach — it requires
updating every read site, but the reads are concentrated and the change is
mechanical. The greatest risk in either case is an overlooked clearing site
that leaves stale source data visible.

### 4. Dead count variables in _dataSave, _dataRead, and _importFromJson

Category: Dead code
Severity: Medium

Description: All three data-operation handlers declare and populate `added`,
`updated`, `unchanged`, `skipped`, and `deleted` counters. In `_dataSave()`
and `_dataRead()`, none of these variables are ever read after assignment. In
`_importFromJson()`, `skipNote` and `deletedNote` are derived from `skipped`
and `deleted`, but neither note is incorporated into the final status message
(`this.statusMsg = 'Data: imported.'`). This is seven variables and two derived
strings that are computed and discarded on every data operation.

Fix: Delete the dead variables. If future messaging policy calls for a summary
(e.g. "Data: imported. 3 added, 1 skipped."), add them back when the message
is actually wired up.

Risk: None. Pure deletion of unreferenced variables.

### 5. Dead methods: _onSetSection, _onSetMark, videoPickerAlpha handler

Category: Dead code
Severity: Medium

Description:
- `_onSetSection()` and `_onSetMark()` in `llama-app.js` are instance methods
  whose logic duplicates the corresponding keyboard handler closures (`setSection`
  and `setMark` in `_makeHandlers()`). No `@ll-set-section` or `@ll-set-mark`
  events are wired in the render template, and no other code calls them. They
  appear to be residue from an earlier event-driven architecture.
- The `videoPickerAlpha` handler is defined in `_makeHandlers()` and opens the
  video picker in alpha-sort mode, but no key binding in `BINDINGS` and no menu
  item in `MENUS` references it. It is unreachable.

Fix: Delete `_onSetSection()`, `_onSetMark()`, and `videoPickerAlpha` from
`llama-app.js`.

Risk: Low. Confirm with a grep that nothing calls these before deleting. The
alpha-sort picker code in llama-video-picker.js may still be worth keeping if
alpha sort is a planned future option; only the handler and any dead picker logic
need removal.

### 6. _fmtTime() duplicated in four edit modal files

Category: Structural duplication
Severity: Medium

Description: An identical private `_fmtTime(secs)` function (format seconds as
`m:ss`, rounds to nearest second) appears as a module-level function in four
separate files:
- `llama-edit-section-modal.js`
- `llama-edit-chapter-modal.js`
- `llama-save-loop-modal.js`
- `llama-edit-video-modal.js`

The CSS for `.field-row` and `.field-label` is also copy-pasted across all four,
and `_renderField()` is nearly identical in the three files that define it
(chapter, video, save-loop modals; the section modal uses a slightly different
inline pattern). `_onKeyDown()` (Enter → save) is identical in all four.

Fix: Extract `_fmtTime()` to a shared utility module (e.g. `src/format.js`) and
import it. The CSS and `_renderField()` duplication is harder to address under
Lit's Shadow DOM model but could be handled via a shared CSS template literal
imported into each component.

Risk: Low for `_fmtTime()` extraction — it's a pure function with no
dependencies. Medium for the CSS/template extraction — it requires care to
preserve per-component behavior, and Lit's `adoptedStyleSheets` or `css`
tagged templates make sharing styles straightforward but non-trivial to set up.

### 7. toggleLoop logic duplicated in keyboard handler and UI event handler

Category: Duplicated policy logic
Severity: Medium

Description: The scratch-loop toggle policy (check for valid range, toggle the
boolean, seek if enabling, emit status message) is implemented in two places in
`llama-app.js`:

- The `toggleLoop` closure in `_makeHandlers()` (~line 818), invoked by the
  `xx` keyboard binding.
- `_onToggleLoop()` (~line 1770), invoked by the `sl-change` event on the
  loop switch in `llama-controls`.

The two implementations are near-identical but differ slightly in their
no-video guard (one uses the `noVideo()` closure, the other checks
`this.currentVideoId` directly) and in that the keyboard handler emits a
status message while `_onToggleLoop()` also emits one. If the toggle policy
changes (e.g. a new pre-condition or a different status message), both must
be updated.

Fix: Extract a `_toggleLoop()` method containing the shared logic. Both the
keyboard handler and the UI event handler call it.

Risk: Low. The extraction is mechanical and the two paths are clearly
distinguishable.

### 8. Menu hint strings not derived from BINDINGS

Category: Scattered / magic values
Severity: Medium

Description: The key binding hints shown in menu items (e.g. `"vo · vv"`,
`"xx"`) are hardcoded string literals in the `MENUS` constant in
`llama-controls.js`. They are not derived from the `BINDINGS` map in
`keyboardController.js`, which is the canonical source of truth for key
sequences. A binding change requires two simultaneous edits: one in
`BINDINGS` and one in the corresponding `MENUS` entry. This already caused
a manual coordination step during the binding reorganization. Similarly,
the action strings in `MENUS` (which must match handler method names in
`llama-app.js`) are magic strings with no enforcement — a stale action
string silently does nothing at runtime.

Fix: For hint strings, derive them from `BINDINGS` at build or render time
rather than hardcoding. This could be as simple as a lookup helper
`hintFor(key)` that reads `BINDINGS` and formats the display string.
The action string issue is structural to the dispatch pattern and would
require a handler registry to fix properly; a lower-cost partial fix is a
startup assertion that validates all MENUS action strings against the
registered handler set.

Risk: Medium for hint derivation — requires understanding the MENUS
rendering pipeline and ensuring the derived format matches the existing
display. Low for the startup assertion, which adds safety without
behavioral change.

### 9. Inconsistent proximity threshold across dividers and marks

Category: Scattered / magic values / inconsistent policy
Severity: Medium

Description: Three entity types guard against accidental creation at an
already-occupied position, but use different thresholds and mechanisms:

- Sections: `Math.abs(s.start - time) < 2` — strict 2-second window
- Chapters: `Math.abs(c.start - time) < 2` — strict 2-second window
- Marks: `Math.round(m.time) === Math.round(time)` — asymmetric ~0.5–1.0s
  window depending on fractional position

The threshold is a fat-finger guard against accidental creation when the
playhead is already near an existing entity. 2 seconds is more conservative
than necessary and can block legitimate intent (e.g. a boundary 1.5 seconds
from an existing one). Marks use an inconsistent mechanism that produces a
non-obvious and non-uniform window.

Fix: Unify all three to `Math.abs(x - time) < 1` with a named constant
`export const MIN_ENTITY_GAP = 1` in `state.js`. For marks, replace the
`Math.round` equality check with the same `Math.abs` form. If the divider
functions are unified (see item 2 above), the divider sites collapse to one.

Risk: Low. The policy change (2s → 1s for dividers, rounding → abs for
marks) is a deliberate loosening of the guard, not a tightening, so no
previously-valid state becomes invalid. The mark change makes the window
symmetric and explicit rather than implicitly asymmetric.

### 10. `this._mode = 'edit'` in llama-edit-chapter-modal is dead

Category: Dead code
Severity: Low

Description: In `llama-edit-chapter-modal.js`, `showEdit()` assigns
`this._mode = 'edit'`. The field `_mode` is not declared as a Lit reactive
property, is never read elsewhere in the file, and has no effect on rendering
or behavior. It is residue from an earlier design where the modal may have
supported both create and edit modes (the save-loop modal still does this via
`_editId`).

Fix: Delete the assignment.

Risk: None.

### 11. Speed clamping bounds repeated in two places

Category: Scattered / magic values
Severity: Low

Description: The speed range `[0.25, 2.0]` appears twice in `llama-app.js`:
- `_speedChange()` (line ~513): `Math.max(0.25, Math.min(2.0, next))`
- Speed change event handler inline in `render()` (line ~2937):
  `Math.max(0.25, Math.min(2.0, e.detail.value))`

Fix: Name the constants `MIN_SPEED = 0.25` and `MAX_SPEED = 2.0` in
`llama-app.js`, or extract a `_clampSpeed(v)` helper. The latter also removes
the duplicated clamping expression from the render template.

Risk: None.

## Assessment: Round 2

### 1. Unit tests broken by MIN_ENTITY_GAP change

Category: Testing gap (broken tests)
Severity: High

Description: Round 1 Item 9 changed the proximity threshold from 2 seconds to
`MIN_ENTITY_GAP = 1` and changed marks from `Math.round` equality to
`Math.abs(x - time) < MIN_ENTITY_GAP`. The implementation is correct, but the
unit tests in `state.test.js` were never updated to match.

Broken tests:

- `addSection`: "rejects a section within 2 seconds of an existing divider start"
  — tests `addSection(sections, 31)` and `addSection(sections, 29)` (both 1 second
  away from start=30), expecting `toBeNull()`. With `< 1`, `Math.abs(30-31) = 1`,
  `1 < 1` is false, so these return non-null. Test FAILS.

- `addSection`: "accepts a section exactly 2 seconds away" — tests at distance 2.
  With new threshold, distance 1 would be the boundary. Tests pass but the
  description is wrong and the critical boundary (distance=1) is untested.

- `addChapterDivider`: same pattern — tests at 1-second distances expecting null
  rejection; both FAIL with the new threshold.

- `addMark`: tests pass, but "rejects a mark within 0.5s that rounds to the same
  second" describes the old `Math.round` mechanism. The actual reason for
  rejection is now `0.4 < MIN_ENTITY_GAP = 1`. The description is stale and the
  old Math.round edge cases are no longer tested.

Fix: Update test descriptions and boundary values to match `MIN_ENTITY_GAP = 1`.
For section/chapter: test at 0.5-second distances (should reject), test at exactly
1.0s (boundary: should NOT reject), test at 1.5s (should NOT reject). For marks:
update the description and add a test explicitly at the 1.0s boundary.

Risk: None. Pure test changes with no code impact.

### 2. Floor-based `_fmtTime` duplicated in 7 files

Category: Structural duplication (incomplete Round 1 fix)
Severity: Medium

Description: Round 1 Item 6 extracted `fmtTime` (rounds to nearest second,
returns `''` for null) to `format.js` and updated the four edit-modal files.
However, a second flavor — floor-based, returns `'?'` for null — was not
extracted and remains independently defined in:

- `llama-loop-picker.js`      (`_fmtTime`)
- `llama-sections-picker.js`  (`_fmtTime`)
- `llama-chapter-picker.js`   (`_fmtTime`)
- `llama-marks-picker.js`     (`_fmtTime`)
- `llama-jump-history-picker.js` (`_fmtTime`)
- `llama-edit-mark-modal.js`  (`_fmtTime`) — also missed in Round 1
- `llama-app.js`              (`_fmtTimePlain`, module-level, line ~2989)

`llama-current.js` has `_fmtDuration()` which is functionally the same (floor,
no null guard but used only when value is known non-null). Seven redundant
definitions of the same function.

Fix: Export `fmtTimePlain(secs)` (floor-based, returns `'?'` for null/NaN)
from `format.js`. Replace all seven local definitions with an import.
The distinction from `fmtTime` (round-based, `''` for null) is intentional:
edit modals need rounding for display in text fields; pickers and message
formatting want truncation and a visible `?` fallback.

Risk: Low. Pure function with no dependencies. Verify that the rounding vs.
floor distinction is correct for `llama-edit-mark-modal.js` — it is the only
modal that still uses floor-based formatting, which may be an oversight from
Round 1 (the other edit modals all use `fmtTime` from `format.js`).

### 3. Section/chapter handler pairs structurally identical in llama-app.js

Category: Structural duplication
Severity: Medium

Description: Now that the data-model layer was unified (Round 1 Item 2), five
handler-layer pairs in `llama-app.js` are line-for-line identical modulo
entity-type names:

- `scratchSection` / `scratchChapter`: get bounds, apply pad, set loopStart/
  loopEnd/looping/loopSrc, emit status.
- `setSection` / `setChapter`: guard no-video, call addSection/addChapterDivider,
  handle reject cases, emit status.
- `fixSection` / `fixChapter`: find current entity, call fixSectionEnd/
  fixChapterEnd, toggle explicit-end flag, emit status.
- `zoomSection` / `zoomChapter`: toggle zoom based on entity bounds.
- `_editCurrentSection` / `_editCurrentChapter`: find nearest, get bounds,
  compute derivedEnd, find index, build validator, call show on modal.

Any policy change to one of these flows — e.g., different padding behavior for
sections vs chapters, or a new pre-condition check — requires parallel edits in
two places with no enforcement that both are kept in sync.

Fix: The most pragmatic fix is a parameterized private helper for each pair,
e.g., `_scratchDivider(type, entities, getBoundsFn, nearestFn)`. The type name
drives the message string and `loopSrc.type`. The function references
(`getBoundsFn`, `nearestFn`) can be passed as arguments or resolved from a
lookup table keyed by entity type.

Risk: Medium. Each pair has subtle differences in message strings and API
names that require careful parameterization. With ~5 helpers to extract, there
are ~10 call sites to update. The risk is a missed special case.

### 4. Scratch loop conflated with named loops in schema and code

Category: Inconsistency between code and documentation / structural duplication
Severity: Medium

Description: The scratch loop and named loops are fundamentally different
entities with different data needs, different operations, and different
semantics, but the schema conflates them into one `video.loops[]` array
distinguished by an `is_scratch: true` flag. This created several problems:

- `loop.source` was documented as "ID of the Section or Loop this was loaded
  from, or null. Non-null only on the scratch loop." Both `createLoop()` and
  `createScratchLoop()` initialize it to null. No code ever writes a non-null
  value — source tracking is entirely in the ephemeral `this.loopSrc` reactive
  property, which is not persisted. The user's last scratch loop source is
  therefore lost on page reload, violating the broader policy of remembering
  where a user left a video.

- Named loops don't have or need a source concept at all; the field is noise
  on every named loop in exports.

- `is_scratch` guards pollute every loop-related query in the codebase
  (`loops.filter(l => !l.is_scratch)`, `loops.find(l => l.is_scratch)`).

- The scratch loop's `looping` boolean lives at the top level of the Video
  object (`video.looping`) rather than with the scratch loop state, even
  though it is conceptually part of that state.

Fix: Separate the two entities in the data model:

- `video.scratchLoop` — a single always-present object:
  `{ start, end, looping, sourceId, sourceType }`
  where `sourceId` and `sourceType` are persisted (replacing the ephemeral
  `loopSrc` reactive prop's source data), and `looping` moves here from the
  top level of the Video object.

- `video.loops[]` — named loops only: `{ id, name, start, end }`.
  No `source`, no `is_scratch`.

The ephemeral `loopSrc` reactive prop (`{ id, label, type, start, end }`)
remains in `llama-app.js` but is now derived at `_syncFromVideo()` time by
looking up `scratchLoop.sourceId` in the appropriate entity array. If the
source entity no longer exists (deleted since last session), `loopSrc` is set
to null and the persisted IDs are cleared. Label and bounds are always derived
from the live entity, so they stay current after renames or edits.

Migration (SCHEMA_VERSION → 11): For each video, extract the `is_scratch`
loop's `start`/`end` and the top-level `video.looping` into a new
`video.scratchLoop` object (with `sourceId: null`, `sourceType: null`).
Remove the `is_scratch` entry from `video.loops[]`. Remove top-level
`video.looping`.

Risk: Medium. Touches `state.js`, `storage.js` (migration + import/export),
`llama-app.js` (sync, save, all handler reads), both test files, and
`architecture-notes.md`. The changes are mechanical and localized, but the
surface area is broad. The reactive-prop layer (`this.looping`,
`this.loopStart`, `this.loopEnd`) absorbs most of the change invisibly —
app code reading those props is unaffected.

### 5. `categorizeVideos` untested and in the wrong layer

Category: Layer violation / testing gap
Severity: Medium

Description: `categorizeVideos(srcVideos, destVideos)` is a module-level pure
function in `llama-app.js` (not exported) that implements a five-bucket
comparison algorithm used by `_dataSave`, `_dataRead`, `_importFromJson`, and
`_dataCompare`. Being inside the top-level UI component, it cannot be imported
by `storage.test.js` and therefore has no unit tests, despite being one of
the most policy-sensitive functions in the codebase — it determines which
videos get overwritten during cloud sync and import.

Fix: Move `categorizeVideos` to `storage.js` (or a new `dataUtils.js`) and
export it. Add unit tests to `storage.test.js` covering the five buckets and
the tie-breaking policy (same `last_modified` = same bucket).

Risk: Low. The function is pure and the move is mechanical. The import in
`llama-app.js` replaces the module-level definition.

### 6. Picker filter/navigation behavior duplicated across 5 components

Category: Structural duplication
Severity: Medium

Description: All five entity picker components
(`llama-chapter-picker`, `llama-sections-picker`, `llama-loop-picker`,
`llama-marks-picker`, `llama-jump-history-picker`) contain identical
implementations of:

- `_onFilterInput(e)` — clear and reset `_selIdx`
- `_onFilterKeyDown(e)` — arrow-up/down scroll, Enter to select
- `_scrollSelectedIntoView()` — `updateComplete.then(...)` scroll logic
- `show(mode)` / `hide()` — delegate to `llama-modal`

These ~30 lines are copy-pasted verbatim in five places, differing only in
the CSS class names used for the list and row selectors in
`_scrollSelectedIntoView`. Any change to the keyboard navigation policy (e.g.
wrapping at the bottom, page-up/down support) must be applied five times.

Fix: Implement a `FilterPickerMixin` (a LitElement mixin or a shared
controller) that provides these four methods and the `_filter`/`_selIdx`
state. Each picker extends or uses the mixin and overrides only the CSS class
name for `_scrollSelectedIntoView`.

Risk: Medium. Lit mixins are straightforward but the CSS class coupling in
`_scrollSelectedIntoView` requires either a parameterized class name or a
convention that all pickers use the same class names (`.list`, `.row`). A
simpler alternative is to add a `_listSelector` / `_rowSelector` getter that
each subclass overrides.

### 7. `loopSrc` re-decomposed into individual props at the render boundary

Category: Structural duplication (incomplete Round 1 fix)
Severity: Low

Description: Round 1 Item 3 collapsed five separate reactive props
(`loopSource`, `loopSourceLabel`, `loopSourceType`, `loopSourceStart`,
`loopSourceEnd`) into one `loopSrc` object `{id, label, type, start, end}`.
This eliminated the scattered 5-field clearing sites. However, `render()` in
`llama-app.js` (lines ~2761-2800) immediately decomposes `loopSrc` back into
individual props when passing to `llama-controls` and `llama-current`:

    .loopSourceType=${this.loopSrc?.type ?? null}
    .loopSourceStart=${this.loopSrc?.start ?? null}
    .loopSourceEnd=${this.loopSrc?.end ?? null}

Both child components still receive 3-4 separate props. The object boundary is
leaky: the simplification didn't propagate to the consumers.

Fix: Change `llama-controls` and `llama-current` to accept a single `.loopSrc`
object prop (or null). Remove the decomposition in `render()`.

Risk: Low-medium. Requires updating both child components' `static properties`,
all internal reads of the individual props, and the `render()` call site in
`llama-app.js`. The change is mechanical but touches two more files.

### 8. `showEdit` vs `show` API naming inconsistency in edit modals

Category: Inconsistent naming
Severity: Low

Description: The two structurally identical edit modals for divider entities
expose different show APIs:

- `llama-edit-chapter-modal.js`: `showEdit(chapter, derivedEnd, validator)`
- `llama-edit-section-modal.js`: `show(section, derivedEnd, validator)`

The section modal also accepts the section via a reactive `section` prop
(with `static properties` declaration); the chapter modal does not. The callers
in `llama-app.js` use `showEdit` for chapters and `show` for sections, which
adds an asymmetry that would confuse anyone working on both at once or
introducing a third divider type.

Fix: Rename `showEdit` to `show` in `llama-edit-chapter-modal.js` and update
the two call sites in `llama-app.js`. Optionally align the `section`/`chapter`
prop declaration pattern across both.

Risk: None beyond the rename and two call site updates.

### Implementation

    Session | Focus                    | Items            | Status
    ----------------------------------------------------------------
    1       | Tests + shared utilities | R2-1, R2-2, R2-8 | .
    2       | Scratch loop separation  | R2-4, R2-7       | .
    3       | Data layer               | R2-5             | .
    4       | Handler pairs            | R2-3             | .
    5       | Picker mixin             | R2-6             | .

Session 1 — state.test.js fix (R2-1), fmtTimePlain extraction to format.js
and replacement in 7 files (R2-2), showEdit→show rename in
llama-edit-chapter-modal.js (R2-8).

Session 2 — Separate scratch loop from named loops (R2-4). New
`video.scratchLoop` object `{ start, end, looping, sourceId, sourceType }`
replaces the `is_scratch` entry in `video.loops[]` and the top-level
`video.looping` field. Files: state.js (factories), storage.js (migration v11
+ import/export), llama-app.js (_syncFromVideo, _saveCurrentState, handler
reads), test files, architecture-notes.md. Also clean up the loopSrc render
boundary (R2-7): pass `loopSrc` as a single object prop to llama-controls and
llama-current, removing the per-field decomposition in render(). These belong
together — both are part of the same loopSrc story and Session 2 already
touches all the relevant files.

Session 3 — Move `categorizeVideos` to storage.js, export it, add unit tests
to storage.test.js.

Session 4 — Unify the five section/chapter handler pairs in llama-app.js
(scratchSection/Chapter, setSection/Chapter, fixSection/Chapter,
zoomSection/Chapter, _editCurrentSection/Chapter) via parameterized private
helpers.

Session 5 — Shared filter/keyboard navigation behavior for the five picker
components (FilterPickerMixin or equivalent).

