
# Refactoring assessment

## Assessment prompt

Let's perform a refactoring assessment of the LoopLlama v2 codebase. This is a
diagnostic exercise: do not make code changes yet.

We already performed this assessement once, making several changes (archived
in _notes/archive/refactoring-assessment.done.md). But I want to repeat the
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

### 9. Migration coverage gaps across data ingestion paths

Category: Structural / latent correctness bug
Severity: High

Description: `_migrateAppState()` in storage.js is the authoritative migration
function but is only called by `load()` (the localStorage path). Three other
data ingestion paths have incomplete or missing migration:

- Cloud reads: `loadFromCloud()` returns raw state from Supabase with no
  migration applied. `_dataRead()` calls `migrateVideo()` per video as a
  partial fix; `_dataSave()` and `_dataCompare()` apply nothing at all.
  `migrateVideo()` covers only the v1→v2 rename (title→name); all schema
  changes from v6 onward are not covered.

- JSON import: `parseImport()` calls `migrateVideo()` per video and ignores
  the `schema_version` field sitting in the file envelope. Same gap as cloud
  reads.

- Share URL payloads (`_applyLoopShare`, `_applyVideoShare`): custom-shaped
  and reconstructed field-by-field. No raw video migration needed; these paths
  are fine.

There is also a latent bug in the v4→v5 transition block of `_migrateAppState()`
(line 74): it stamps `state.schema_version = SCHEMA_VERSION` (the current
version, 10) instead of 5. Any data still using the old `version` field would
skip all intermediate migrations (v6–v10). Dormant now — essentially no such
data exists in the wild — but structurally wrong.

The gaps are latent today because all existing data is at schema v10 and
cloud/import round-trips don't cross a schema boundary. They become real
correctness bugs as soon as R2-4 ships: a pre-v11 JSON export or a cloud state
stored before the v11 upgrade would arrive with a broken video object (`is_scratch`
loop still in `video.loops[]`, `video.looping` at the top level, no
`video.scratchLoop`). The app would silently work with malformed data.

Fix:
1. Rename `_migrateAppState` → `migrateAppState` (export it).
2. Call `migrateAppState()` on the cloud state inside `loadFromCloud()` before
   returning it. This covers all three cloud callers in one move. Remove
   `_dataRead()`'s existing `.map(migrateVideo)` call.
3. In `parseImport()`, after parsing the JSON, wrap the videos in a synthetic
   state `{ schema_version: data.schema_version ?? 0, videos: [...] }` and run
   `migrateAppState()` on it. Remove the per-video `migrateVideo()` calls.
4. Fix the v4→v5 line: `state.schema_version = 5`.
5. Update the `migrateVideo()` doc comment: it is now a cleanup utility only
   (strip stale per-video fields, canonicalize URL) — not a migration path.

Risk: Low. Changes are confined to storage.js and callers. Main verification:
import a v10 export (current format) before and after; videos should arrive
identical. The synthetic-state wrapper in parseImport() is the most novel change
but is straightforward — `migrateAppState()` only reads `schema_version` and
`videos` from the state object.

### Implementation

    Session | Focus                         | Items            | Status
    -------------------------------------------------------------------
    1       | Tests + shared utilities      | R2-1, R2-2, R2-8 | done
    2       | Scratch loop separation       | R2-4, R2-7, R2-9 | done
    3       | Data layer                    | R2-5             | done
    4       | Picker mixin                  | R2-6             | .
    5A      | llama-app.js: logic           | new              | .
    5B      | llama-app.js: undo/redo       | new              | .
    5C      | llama-app.js: cloud/data      | new              | .
    5D      | llama-app.js: section/chapter | R2-3             | .

Session 1 — state.test.js fix (R2-1), fmtTimePlain extraction to format.js
and replacement in 7 files (R2-2), showEdit→show rename in
llama-edit-chapter-modal.js (R2-8).

Session 2 — Three related items that all live in storage.js and its callers:

R2-9 first: fix migration architecture. Export `migrateAppState`, call it
inside `loadFromCloud()` so all cloud callers get fully-migrated state, rewrite
`parseImport()` to use the file envelope's `schema_version` and run
`migrateAppState()` on a synthetic state wrapper, fix the v4→v5 version-stamp
bug (line 74: 5, not SCHEMA_VERSION), update `migrateVideo()` doc comment to
reflect its new cleanup-only role.

Then R2-4: separate scratch loop from named loops. New `video.scratchLoop`
object `{ start, end, looping, sourceId, sourceType }` replaces the
`is_scratch` entry in `video.loops[]` and the top-level `video.looping` field.
Add v10→v11 migration block to `migrateAppState()`. Files: state.js
(factories), storage.js (migration + export), llama-app.js (_syncFromVideo,
_saveCurrentState, handler reads), both test files, architecture-notes.md.

Then R2-7: clean up the loopSrc render boundary — pass `loopSrc` as a single
object prop to llama-controls and llama-current, removing the per-field
decomposition in render(). Belongs in the same session: part of the same
loopSrc story, and Session 2 already touches all the relevant files.

R2-9 is done first within the session because it restructures the migration
plumbing that R2-4's v11 block will rely on.

Session 3 — Move `categorizeVideos` to storage.js, export it, add unit tests
to storage.test.js.

Session 4 — Shared filter/keyboard navigation behavior for the five picker
components (FilterPickerMixin or equivalent).

Session 5 - refactor llama-app.js into smaller components:

  - Stage A — pure logic extraction: Pull free functions that don't need this
    into modules. categorizeVideos (R2-5) is the main target; scan for others
    at the same time. Low risk, confirms the pattern.

  - Stage B — undo/redo module: _pushUndoSnapshot, _currentSnapshot,
    _applySnapshot, _undo, _redo are a coherent subsystem (~70 lines). Extract
    to a small UndoManager class that llama-app holds a reference to.

  - Stage C — cloud/data-ops handlers: The import/export/cloud cluster
    (_exportAll, _onFileImport, _showDataOp, _onDataOpResult, _applyLoopShare,
    and friends) is another coherent lump. This is where the most non-UI logic
    outside state.js/storage.js currently lives.

  - Stage D — section/chapter handler deduplication (R2-3): Once the file is
    smaller, this becomes a cleaner operation — either a shared mixin or a
    helper object injected by llama-app.

      - Old description (before adding 6A-6D): Unify the five section/chapter
        handler pairs in llama-app.js (scratchSection/Chapter,
        setSection/Chapter, fixSection/Chapter, zoomSection/Chapter,
        _editCurrentSection/Chapter) via parameterized private helpers.

