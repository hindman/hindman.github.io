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
//
// Ordering policy for menu hints (hintFor in llama-controls.js): within each
// prefix block, the intended primary binding must appear before any synonyms.
// Single-key synonyms always come after two-key completions.
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
  'y':          { handler: 'videoUrl',      desc: 'Switch to YouTube URL (synonym: vl)' },
  '\\':         { handler: 'editScratch',   desc: 'Edit scratch loop (synonym: xe)' },

  // --- Single-key synonyms ---

  'u':          { handler: 'undo',        desc: 'Undo (synonym: au)' },
  'U':          { handler: 'redo',        desc: 'Redo (synonym: ar)' },
  't':          { handler: 'toggleZone2', desc: 'Toggle timeline (synonym: at)' },
  'h':          { handler: 'helpGeneral', desc: 'General help (synonym: ah)' },
  'k':          { handler: 'helpKeys',    desc: 'Key bindings (synonym: ak)' },
  'o':          { handler: 'options',     desc: 'Options (synonym: ao)' },
  'z':          { handler: 'zoomOff',    desc: 'Zoom off (synonym: az)' },

  // --- Prefix-key bindings ---

  '[': { completions: {
    '[':         { handler: 'setLoopStart',       desc: 'Set now' },
    'Backspace': { handler: 'resetLoopStart',     desc: 'Reset' },
    '\\':        { handler: 'focusLoopStart',     desc: 'Edit' },
    '-':         { handler: 'nudgeStartDown',     desc: 'Nudge decrease' },
    '=':         { handler: 'nudgeStartUp',       desc: 'Nudge increase' },
    ']':         { handler: 'focusLoopNudgeDelta', desc: 'Nudge dropdown' },
  }},

  ']': { completions: {
    ']':         { handler: 'setLoopEnd',         desc: 'Set now' },
    'Backspace': { handler: 'resetLoopEnd',       desc: 'Reset' },
    '\\':        { handler: 'focusLoopEnd',       desc: 'Edit' },
    '-':         { handler: 'nudgeEndDown',       desc: 'Nudge decrease' },
    '=':         { handler: 'nudgeEndUp',         desc: 'Nudge increase' },
    '[':         { handler: 'focusLoopNudgeDelta', desc: 'Nudge dropdown' },
  }},

  'v': { completions: {
    'l': { handler: 'videoUrl',          desc: 'Load URL' },
    'o': { handler: 'videoPickerRecent', desc: 'Open' },
    'v': { handler: 'videoPickerRecent', desc: 'Open' },
    'e': { handler: 'editVideo',         desc: 'Edit' },
    'x': { handler: 'scratchVideo',      desc: 'Scratch' },
    'z': { handler: 'zoomVideo',         desc: 'Zoom' },
    'd': { handler: 'deleteVideo',       desc: 'Delete' },
    'u': { handler: 'restoreVideo',      desc: 'Unstash' },
    'i': { handler: 'videoInfo',         desc: 'Info' },
  }},

  'j': { completions: {
    'j': { handler: 'jumpTime',    desc: 'Jump by time' },
    'h': { handler: 'jumpHistory', desc: 'Jump history' },
    'b': { handler: 'jumpBack',    desc: 'Back' },
    'f': { handler: 'jumpForward', desc: 'Forward' },
  }},

  'l': { completions: {
    'l': { handler: 'saveLoop',    desc: 'Create' },
    'e': { handler: 'editLoop',    desc: 'Edit' },
    'x': { handler: 'scratchLoop', desc: 'Scratch' },
    'j': { handler: 'jumpLoop',    desc: 'Jump' },
    'z': { handler: 'zoomLoop',    desc: 'Zoom' },
    'd': { handler: 'deleteLoop',  desc: 'Delete' },
  }},

  'x': { completions: {
    'x': { handler: 'toggleLoop',       desc: 'Toggle' },
    'e': { handler: 'editScratch',       desc: 'Edit mode' },
    'z': { handler: 'zoomScratch',       desc: 'Zoom' },
    's': { handler: 'saveBack',          desc: 'Save to source' },
    'r': { handler: 'resetLoopToSource', desc: 'Reset to source' },
    'u': { handler: 'unlinkLoopSource',  desc: 'Unlink source' },
  }},

  'c': { completions: {
    'c': { handler: 'setChapter',     desc: 'Create' },
    'e': { handler: 'editChapter',    desc: 'Edit' },
    'x': { handler: 'scratchChapter', desc: 'Scratch' },
    'j': { handler: 'jumpChapter',    desc: 'Jump' },
    'z': { handler: 'zoomChapter',    desc: 'Zoom' },
    'f': { handler: 'fixChapter',     desc: 'Fix end' },
    'd': { handler: 'deleteChapter',  desc: 'Delete' },
  }},

  's': { completions: {
    's': { handler: 'setSection',     desc: 'Create' },
    'e': { handler: 'editSection',    desc: 'Edit' },
    'x': { handler: 'scratchSection', desc: 'Scratch' },
    'j': { handler: 'jumpSection',    desc: 'Jump' },
    'z': { handler: 'zoomSection',    desc: 'Zoom' },
    'f': { handler: 'fixSection',     desc: 'Fix end' },
    'd': { handler: 'deleteSection',  desc: 'Delete' },
  }},

  '`': { completions: {
    'v': { handler: 'openMenuVideo',   desc: 'Video' },
    'c': { handler: 'openMenuChapter', desc: 'Chapter' },
    's': { handler: 'openMenuSection', desc: 'Section' },
    'l': { handler: 'openMenuLoop',    desc: 'Loop' },
    'x': { handler: 'openMenuScratch', desc: 'Scratch' },
    'm': { handler: 'openMenuMark',    desc: 'Mark' },
    'd': { handler: 'openMenuData',    desc: 'Data' },
    'a': { handler: 'openMenuApp',     desc: 'App' },
  }},

  'a': { completions: {
    'u': { handler: 'undo',         desc: 'Undo' },
    'r': { handler: 'redo',         desc: 'Redo' },
    'Backspace': { handler: 'clearHistory', desc: 'Clear history' },
    'm': { handler: 'msgRecall',    desc: 'Recall message' },
    'c': { handler: 'copyTime',     desc: 'Copy time' },
    't': { handler: 'toggleZone2',  desc: 'Toggle timeline' },
    'z': { handler: 'zoomOff',      desc: 'Zoom off' },
    'o': { handler: 'options',      desc: 'Options' },
    'h': { handler: 'helpGeneral',  desc: 'Help' },
    'k': { handler: 'helpKeys',     desc: 'Key bindings' },
    'e': { handler: 'loadExamples', desc: 'Load examples' },
  }},

  'm': { completions: {
    'm': { handler: 'setMark',    desc: 'Create' },
    'e': { handler: 'editMark',   desc: 'Edit' },
    'j': { handler: 'jumpMark',   desc: 'Jump' },
    'd': { handler: 'deleteMark', desc: 'Delete' },
  }},

  'd': { completions: {
    'v': { handler: 'shareVideo',  desc: 'Share video' },
    'x': { handler: 'shareLoop',   desc: 'Share scratch loop' },
    'e': { handler: 'exportAll',   desc: 'Export' },
    'i': { handler: 'importData',  desc: 'Import' },
    'I': { handler: 'inspectData', desc: 'Inspect' },
    's': { handler: 'dataSave',    desc: 'Save to cloud' },
    'd': { handler: 'dataSave',    desc: 'Save to cloud' },
    'r': { handler: 'dataRead',    desc: 'Read from cloud' },
    'c': { handler: 'dataCompare', desc: 'Compare' },
    'Backspace': { handler: 'deleteData', desc: 'Delete' },
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
