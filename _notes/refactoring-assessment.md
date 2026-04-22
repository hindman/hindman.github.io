
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

---

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

---

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

---

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

---

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

---

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

---

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

---

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

---

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

---

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

---

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

---

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

---

## Implementation

Session 1 | state.js         | Items 2, 9
Session 2 | llama-app.js     | Items 1, 3, 4, 5, 7, 11
Session 3 | Modal files      | Items 6, 10
Session 4 | llama-controls   | Item 8

