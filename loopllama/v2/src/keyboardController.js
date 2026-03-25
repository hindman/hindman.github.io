// keyboardController.js -- multi-key keyboard dispatch with which-key support.
//
// Usage:
//   const kb = createKeyboardController(handlers, { onPendingKey });
//   // later, when a modal opens:
//   kb.disable();
//   // when modal closes:
//   kb.enable();

// BINDINGS maps event.key values to binding definitions.
//
// Single-key: { handler: 'handlerName', desc: '...' }
// Prefix-key: { completions: { key: { handler, desc }, ... } }
//
// Design rule (from plan): any key used as a prefix must NOT also have a
// standalone binding. This keeps single-key actions instant -- no ambiguity
// means no forced delay waiting to see if a second key is coming.
export const BINDINGS = {

  // --- Single-key bindings ---

  ' ':          { handler: 'playPause',     desc: 'Play/pause' },
  '-':          { handler: 'speedDown',     desc: 'Speed: slower' },
  '=':          { handler: 'speedUp',       desc: 'Speed: faster' },
  'Backspace':  { handler: 'speedReset',    desc: 'Reset speed' },
  'ArrowRight': { handler: 'seekForward',   desc: 'Seek forward' },
  'ArrowLeft':  { handler: 'seekBack',      desc: 'Seek backward' },
  'ArrowDown':  { handler: 'seekDeltaDown', desc: 'Seek delta: reduce' },
  'ArrowUp':    { handler: 'seekDeltaUp',   desc: 'Seek delta: increase' },
  ',':          { handler: 'prevEntity',    desc: 'Previous entity' },
  '/':          { handler: 'entityType',    desc: 'Entity type dropdown' },
  '.':          { handler: 'nextEntity',    desc: 'Next entity' },
  'Enter':      { handler: 'jumpToStart',   desc: 'Jump to start' },
  'y':          { handler: 'videoUrl',      desc: 'Switch to YouTube URL (synonym: vu)' },
  '\\':         { handler: 'editScratch',   desc: 'Edit scratch loop (synonym: le)' },

  // --- Single-key synonyms ---

  'u':          { handler: 'undo',        desc: 'Undo (synonym: au)' },
  'U':          { handler: 'redo',        desc: 'Redo (synonym: ar)' },
  't':          { handler: 'toggleZone2', desc: 'Toggle timeline (synonym: at)' },
  'h':          { handler: 'helpGeneral', desc: 'General help (synonym: ah)' },
  'k':          { handler: 'helpKeys',    desc: 'Key bindings (synonym: ak)' },
  'o':          { handler: 'options',     desc: 'Options (synonym: ao)' },

  // --- Prefix-key bindings ---

  '[': { completions: {
    '[':         { handler: 'setLoopStart',        desc: 'Set loop start to current time' },
    'Backspace': { handler: 'resetLoopStart',       desc: 'Reset loop start to 0' },
    '-':         { handler: 'nudgeStartDown',       desc: 'Nudge start: decrease' },
    '=':         { handler: 'nudgeStartUp',         desc: 'Nudge start: increase' },
    ']':         { handler: 'focusLoopNudgeDelta',  desc: 'Loop nudge delta dropdown' },
    '\\':        { handler: 'focusLoopStart',       desc: 'Loop start: edit' },
  }},

  ']': { completions: {
    ']':         { handler: 'setLoopEnd',           desc: 'Set loop end to current time' },
    'Backspace': { handler: 'resetLoopEnd',         desc: 'Reset loop end to duration' },
    '-':         { handler: 'nudgeEndDown',         desc: 'Nudge end: decrease' },
    '=':         { handler: 'nudgeEndUp',           desc: 'Nudge end: increase' },
    '[':         { handler: 'focusLoopNudgeDelta',  desc: 'Loop nudge delta dropdown' },
    '\\':        { handler: 'focusLoopEnd',         desc: 'Loop end: edit' },
  }},

  'v': { completions: {
    'u': { handler: 'videoUrl',          desc: 'Switch to YouTube video via URL' },
    'o': { handler: 'videoPickerRecent', desc: 'Open video picker' },
    'v': { handler: 'videoPickerRecent', desc: 'Open video picker (synonym: vo)' },
    'e': { handler: 'editVideo',         desc: 'Edit video attributes' },
    'i': { handler: 'videoInfo',         desc: 'Video info' },
    'd': { handler: 'deleteVideo',       desc: 'Delete current video' },
    'l': { handler: 'loopVideo',         desc: 'Loop: full video as scratch loop' },
  }},

  'j': { completions: {
    'c': { handler: 'jumpChapter',  desc: 'Jump to chapter' },
    'j': { handler: 'jumpTime',     desc: 'Jump by time' },
    's': { handler: 'jumpSection',  desc: 'Jump to section' },
    'l': { handler: 'jumpLoop',     desc: 'Jump to loop' },
    'm': { handler: 'jumpMark',     desc: 'Jump to mark' },
    'h': { handler: 'jumpHistory',  desc: 'Jump history picker' },
    'b': { handler: 'jumpBack',     desc: 'Jump back in history' },
    'f': { handler: 'jumpForward',  desc: 'Jump forward in history' },
  }},

  'l': { completions: {
    'l': { handler: 'toggleLoop',        desc: 'Toggle looping' },
    'n': { handler: 'saveLoop',          desc: 'Save new loop' },
    'b': { handler: 'saveBack',          desc: 'Save back to loop source' },
    'r': { handler: 'resetLoopToSource', desc: 'Reset loop to source' },
    'u': { handler: 'unlinkLoopSource',  desc: 'Unlink loop source' },
    'e': { handler: 'editScratch',       desc: 'Edit scratch loop' },
    'd': { handler: 'deleteLoop',        desc: 'Delete a loop' },
    'z': { handler: 'zoomLoop',          desc: 'Toggle loop zoom' },
  }},

  'c': { completions: {
    'c': { handler: 'setChapter',    desc: 'Create chapter divider here' },
    'e': { handler: 'editChapter',   desc: 'Edit current chapter' },
    'l': { handler: 'loopChapter',   desc: 'Loop: current chapter as scratch loop' },
    'd': { handler: 'deleteChapter', desc: 'Delete a chapter' },
    'z': { handler: 'zoomChapter',   desc: 'Toggle chapter zoom' },
    'f': { handler: 'fixChapter',    desc: 'Fix chapter end to derived boundary' },
  }},

  's': { completions: {
    's': { handler: 'setSection',    desc: 'Set section divider here' },
    'e': { handler: 'editSection',   desc: 'Edit current section' },
    'l': { handler: 'loopSection',   desc: 'Loop current section' },
    'd': { handler: 'deleteSection', desc: 'Delete a section' },
    'z': { handler: 'zoomSection',   desc: 'Toggle section zoom' },
    'f': { handler: 'fixSection',    desc: 'Fix section end to derived boundary' },
  }},

  '`': { completions: {
    'v': { handler: 'openMenuVideo',   desc: 'Open Video menu' },
    'c': { handler: 'openMenuChapter', desc: 'Open Chapter menu' },
    's': { handler: 'openMenuSection', desc: 'Open Section menu' },
    'l': { handler: 'openMenuLoop',    desc: 'Open Loop menu' },
    'm': { handler: 'openMenuMark',    desc: 'Open Mark menu' },
    'j': { handler: 'openMenuJump',    desc: 'Open Jump menu' },
    'd': { handler: 'openMenuData',    desc: 'Open Data menu' },
    'a': { handler: 'openMenuApp',     desc: 'Open App menu' },
  }},

  'a': { completions: {
    'u': { handler: 'undo',        desc: 'Undo' },
    'r': { handler: 'redo',        desc: 'Redo' },
    't': { handler: 'toggleZone2', desc: 'Toggle timeline' },
    'm': { handler: 'msgRecall',   desc: 'Recall last message' },
    'o': { handler: 'options',     desc: 'Options' },
    'h': { handler: 'helpGeneral', desc: 'General help' },
    'k': { handler: 'helpKeys',    desc: 'Key bindings' },
  }},

  'm': { completions: {
    'm': { handler: 'setMark',    desc: 'Set mark here' },
    'e': { handler: 'editMark',   desc: 'Edit a mark' },
    'd': { handler: 'deleteMark', desc: 'Delete a mark' },
  }},

  'd': { completions: {
    's': { handler: 'dataSave',    desc: 'Save local data to cloud' },
    'd': { handler: 'dataSave',    desc: 'Save local data to cloud (synonym: ds)' },
    'D': { handler: 'deleteData',  desc: 'Delete data modal' },
    'r': { handler: 'dataRead',    desc: 'Read cloud data to local' },
    'c': { handler: 'dataCompare', desc: 'Compare local vs cloud' },
    'e': { handler: 'exportAll',   desc: 'Export data as JSON' },
    'i': { handler: 'importData',  desc: 'Import data from JSON' },
    'I': { handler: 'inspectData', desc: 'Inspect data as JSON' },
    'v': { handler: 'shareVideo',  desc: 'Share video as JSON' },
    'l': { handler: 'shareLoop',   desc: 'Share loop via URL' },
  }},
};

// Create the keyboard controller.
//
// handlers: { handlerName: fn, ... }
//   Handler names come from BINDINGS. Unknown names are logged and ignored,
//   making it safe to pass a partial handlers object during development.
//
// onPendingKey: (prefix, completions) => void
//   Called when entering pending state (prefix is a string, completions is
//   the completions object). Called with (null, null) when clearing.
//   Fires after a ~300ms delay so fast typists who know the binding never
//   see the overlay.
//
// onCountChange: (n) => void
//   Called when the pending count changes. n is a positive integer, or null
//   when the count is cleared.
export function createKeyboardController(handlers, { onPendingKey, onCountChange } = {}) {
  let enabled       = true;
  let pendingPrefix = null;
  let pendingCount  = '';   // accumulated digit string; '' means no count
  let overlayTimer  = null;

  function clearPending() {
    pendingPrefix = null;
    clearTimeout(overlayTimer);
    overlayTimer = null;
    onPendingKey?.(null, null);
  }

  function clearCount() {
    pendingCount = '';
    onCountChange?.(null);
  }

  function dispatch(handlerName, count) {
    const fn = handlers[handlerName];
    if (fn) {
      fn(count);
    } else {
      console.log(`[kb] no handler: ${handlerName}`);
    }
  }

  function handleKeyDown(event) {
    if (!enabled) return;

    // Use composedPath() to see the actual element through shadow DOM
    // boundaries -- event.target is retargeted and would give us the
    // shadow host element, not the focused input inside it.
    const target = event.composedPath()[0];
    const tag = target?.tagName;
    if (tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'SELECT') return;
    if (target?.isContentEditable) return;

    // Only ctrl/alt/meta combos are filtered. Shift is allowed because
    // some bindings use uppercase keys (U, ?, I) which have shiftKey=true
    // but distinct event.key values -- no extra checking needed.
    if (event.ctrlKey || event.altKey || event.metaKey) return;

    const key = event.key;

    if (pendingPrefix !== null) {
      // Awaiting second key of a two-key binding.
      // Ignore bare modifier keydowns so pressing Shift before an uppercase
      // completion (e.g. dI) doesn't clear the pending prefix.
      if (key === 'Shift' || key === 'Control' || key === 'Alt' || key === 'Meta') return;
      event.preventDefault();
      const completions = BINDINGS[pendingPrefix]?.completions;
      const binding = completions?.[key];
      const count = pendingCount ? parseInt(pendingCount, 10) : 1;
      clearPending();
      clearCount();
      if (key !== 'Escape' && binding) dispatch(binding.handler, count);
      return;
    }

    // Escape clears any pending count and returns to idle.
    if (key === 'Escape') {
      if (pendingCount) { event.preventDefault(); clearCount(); }
      return;
    }

    // Digit accumulation (Vim-style count prefix).
    // '0' is only a count digit after at least one other digit has been typed,
    // so it remains available as a standalone binding if ever needed.
    if (/^\d$/.test(key) && (key !== '0' || pendingCount !== '')) {
      event.preventDefault();
      pendingCount += key;
      onCountChange?.(parseInt(pendingCount, 10));
      return;
    }

    const binding = BINDINGS[key];
    if (!binding) return;

    event.preventDefault();

    if (binding.completions) {
      // Enter pending state awaiting a second key.
      // Count is NOT cleared here -- it carries through to the completion.
      pendingPrefix = key;
      overlayTimer = setTimeout(() => {
        onPendingKey?.(key, binding.completions);
      }, 300);
    } else {
      const count = pendingCount ? parseInt(pendingCount, 10) : 1;
      clearCount();
      dispatch(binding.handler, count);
    }
  }

  document.addEventListener('keydown', handleKeyDown);

  // enable/disable: modals and modes call these to take/release keyboard focus.
  function enable()  { enabled = true; }
  function disable() { enabled = false; clearPending(); clearCount(); }

  // destroy: call in disconnectedCallback to clean up the listener.
  function destroy() {
    document.removeEventListener('keydown', handleKeyDown);
    clearPending();
    clearCount();
  }

  return { enable, disable, destroy };
}
