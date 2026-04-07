// llama-controls.js -- playback controls display.
//
// Receives:
//   currentTime:          Number   -- current playback position (seconds)
//   speed:                Number   -- playback speed (e.g. 1.0 = 100%)
//   isPlaying:            Boolean  -- true while the video is playing
//   looping:              Boolean  -- true when looping is active
//   loopStart:            Number   -- scratch-loop start (seconds)
//   loopEnd:              Number   -- scratch-loop end (seconds)
//   loopSourceType:       String   -- 'section'|'chapter'|'loop'|null
//   loopSourceStart:      Number   -- source entity start (seconds); null if no source
//   loopSourceEnd:        Number   -- source entity end (seconds); null if no source
//   seekDelta:            Number   -- current seek delta (seconds)
//   seekDeltaChoices:     Array    -- available seek delta values
//   loopNudgeDelta:       Number   -- current loop nudge delta (seconds)
//   loopNudgeDeltaChoices: Array   -- available loop nudge delta values
//   activeEntityType:     String   -- 'any'|'section'|'loop'|'mark'|'chapter'
//
// Fires (bubbles + composed):
//   ll-play-pause             -- toggle play/pause
//   ll-seek-to                -- time textbox committed; detail.value = seconds
//   ll-seek-forward           -- seek forward by current seek delta
//   ll-seek-back              -- seek back by current seek delta
//   ll-seek-delta-change      -- seek delta dropdown changed; detail.value = seconds
//   ll-loop-nudge-delta-change -- nudge delta dropdown changed; detail.value = seconds
//   ll-toggle-loop            -- toggle looping on/off
//   ll-set-loop-start-now     -- set loop start to current time
//   ll-set-loop-end-now       -- set loop end to current time
//   ll-loop-start-change      -- user edited start; detail.value = seconds
//   ll-loop-end-change        -- user edited end; detail.value = seconds
//   ll-speed-change           -- user edited speed; detail.value = decimal (e.g. 0.75)
//   ll-prev-entity            -- navigate to previous entity
//   ll-next-entity            -- navigate to next entity
//   ll-entity-type-change     -- entity type changed; detail.value = type string
//   ll-menu-select            -- menu item clicked; detail.action, detail.label

import { LitElement, html, css } from 'lit';
import { createRef, ref } from 'lit/directives/ref.js';
import { parseTime } from '../parseTime.js';
import { DEFAULT_OPTIONS } from '../state.js';
import './llama-dropdown.js';
import '@shoelace-style/shoelace/dist/components/switch/switch.js';
import '@shoelace-style/shoelace/dist/components/tooltip/tooltip.js';

// Menu definitions for the seven action menus.
// Each item: { label, action, hint? } or { type: 'divider' }.
// hint: key binding shown right-aligned (matches BINDINGS in keyboardController.js).
const MENUS = [
  {
    label: 'Video',
    items: [
      { label: 'Load URL',   action: 'videoUrl',          hint: 'vl · y'  },
      { label: 'Open...',    action: 'videoPickerRecent',  hint: 'vo · vv' },
      { label: 'Edit',       action: 'editVideo',          hint: 've'      },
      { label: 'Scratch',    action: 'scratchVideo',       hint: 'vx'      },
      { label: 'Zoom',       action: 'zoomVideo',          hint: 'vz'      },
      { label: 'Delete...',  action: 'deleteVideo',        hint: 'vd'      },
      { label: 'Unstash...', action: 'restoreVideo',       hint: 'vu'      },
      { label: 'Info',       action: 'videoInfo',          hint: 'vi'      },
    ],
  },
  {
    label: 'Chapter',
    items: [
      { label: 'Create',    action: 'setChapter',     hint: 'cc' },
      { label: 'Edit',      action: 'editChapter',    hint: 'ce' },
      { label: 'Scratch',   action: 'scratchChapter', hint: 'cx' },
      { label: 'Jump...',   action: 'jumpChapter',    hint: 'cj' },
      { label: 'Zoom',      action: 'zoomChapter',    hint: 'cz' },
      { label: 'Fix end',   action: 'fixChapter',     hint: 'cf' },
      { label: 'Delete...', action: 'deleteChapter',  hint: 'cd' },
    ],
  },
  {
    label: 'Section',
    items: [
      { label: 'Create',    action: 'setSection',     hint: 'ss' },
      { label: 'Edit',      action: 'editSection',    hint: 'se' },
      { label: 'Scratch',   action: 'scratchSection', hint: 'sx' },
      { label: 'Jump...',   action: 'jumpSection',    hint: 'sj' },
      { label: 'Zoom',      action: 'zoomSection',    hint: 'sz' },
      { label: 'Fix end',   action: 'fixSection',     hint: 'sf' },
      { label: 'Delete...', action: 'deleteSection',  hint: 'sd' },
    ],
  },
  {
    label: 'Loop',
    items: [
      { label: 'Create',    action: 'saveLoop',   hint: 'll' },
      { label: 'Edit',      action: 'editLoop',   hint: 'le' },
      { label: 'Scratch',   action: 'scratchLoop', hint: 'lx' },
      { label: 'Jump...',   action: 'jumpLoop',   hint: 'lj' },
      { label: 'Zoom',      action: 'zoomLoop',   hint: 'lz' },
      { label: 'Delete...', action: 'deleteLoop', hint: 'ld' },
    ],
  },
  {
    label: 'Scratch',
    items: [
      { label: 'Toggle',          action: 'toggleLoop',        hint: 'xx'      },
      { label: 'Edit mode',       action: 'editScratch',       hint: 'xe · \\' },
      { label: 'Zoom',            action: 'zoomLoop',          hint: 'xz'      },
      { type: 'divider' },
      { label: 'Save to source',  action: 'saveBack',          hint: 'xs'      },
      { label: 'Reset to source', action: 'resetLoopToSource', hint: 'xr'      },
      { label: 'Unlink source',   action: 'unlinkLoopSource',  hint: 'xu'      },
    ],
  },
  {
    label: 'Mark',
    items: [
      { label: 'Create',    action: 'setMark',    hint: 'mm' },
      { label: 'Edit',      action: 'editMark',   hint: 'me' },
      { label: 'Jump...',   action: 'jumpMark',   hint: 'mj' },
      { label: 'Delete...', action: 'deleteMark', hint: 'md' },
    ],
  },
  {
    label: 'Data',
    items: [
      { label: 'Share video', action: 'shareVideo', hint: 'dv' },
      { label: 'Share scratch loop',  action: 'shareLoop',  hint: 'dx' },
      { type: 'divider' },
      { label: 'Export',  action: 'exportAll',   hint: 'de' },
      { label: 'Import',  action: 'importData',  hint: 'di' },
      { label: 'Inspect', action: 'inspectData', hint: 'dI' },
      { type: 'divider' },
      { label: 'Save to cloud',   action: 'dataSave',    hint: 'ds · dd' },
      { label: 'Read from cloud', action: 'dataRead',    hint: 'dr'      },
      { label: 'Compare',         action: 'dataCompare', hint: 'dc'      },
      { type: 'divider' },
      { label: 'Delete...', action: 'deleteData', hint: 'd⌫' },
    ],
  },
  {
    label: 'App',
    items: [
      { label: 'Jump history...', action: 'jumpHistory', hint: 'jh' },
      { label: 'Back',            action: 'jumpBack',    hint: 'jb' },
      { label: 'Forward',         action: 'jumpForward', hint: 'jf' },
      { type: 'divider' },
      { label: 'Undo', action: 'undo', hint: 'au · u' },
      { label: 'Redo', action: 'redo', hint: 'ar · U' },
      { type: 'divider' },
      { label: 'Recall message',  action: 'msgRecall',   hint: 'am'      },
      { type: 'divider' },
      { label: 'Copy time',       action: 'copyTime',    hint: 'ac'      },
      { label: 'Toggle timeline', action: 'toggleZone2', hint: 'at · t'  },
      { label: 'Zoom off',        action: 'zoomOff',     hint: 'az · z'  },
      { type: 'divider' },
      { label: 'Options',       action: 'options',      hint: 'ao · o' },
      { label: 'Help',          action: 'helpGeneral',  hint: 'ah · h' },
      { label: 'Key bindings',  action: 'helpKeys',     hint: 'ak · k' },
      { label: 'Load examples', action: 'loadExamples', hint: 'ae'     },
    ],
  },
];

// Tooltip content with a muted key binding suffix.
// Uses sl-tooltip's content slot so we can style the two parts independently.
function ttip(desc, binding) {
  return html`<span slot="content">${desc}<span style="color:#888;margin-left:0.75em;">${binding}</span></span>`;
}

class LlamaControls extends LitElement {
  static styles = css`
    :host {
      display: block;
    }

    .controls-wrap {
      display: flex;
      flex-direction: column;
      background: var(--ll-surface, #252525);
      border: 1px solid var(--ll-border, #444);
      border-radius: var(--ll-radius, 3px);
    }

    /* --- Labeled control groups row --- */

    .ctrl-groups {
      display: flex;
      flex-wrap: wrap;
      align-items: stretch;
    }

    .ctrl-group {
      display: flex;
      flex-direction: column;
      gap: 0.2rem;
      padding: 0.35rem 0.75rem;
      border-right: 1px solid var(--ll-border, #444);
    }

    .ctrl-group:last-child {
      border-right: none;
    }

    .ctrl-group-label {
      font-size: 0.7rem;
      color: var(--ll-text-muted, #666);
      text-transform: uppercase;
      letter-spacing: 0.05em;
      line-height: 1;
    }

    .ctrl-group-body {
      display: flex;
      align-items: center;
      gap: 0.4rem;
    }

    /* --- Button groups: zero-gap connected controls --- */

    .btn-group {
      display: flex;
      align-items: center;
      gap: 0;
    }

    .btn-group > * {
      border-radius: 0;
    }

    .btn-group > * + * {
      margin-left: -1px;
    }

    .btn-group > *:first-child {
      border-radius: var(--ll-radius, 3px) 0 0 var(--ll-radius, 3px);
    }

    .btn-group > *:last-child {
      border-radius: 0 var(--ll-radius, 3px) var(--ll-radius, 3px) 0;
    }

    /* Bring the active/hovered element's border to the front. */
    .btn-group > *:hover,
    .btn-group > *:focus {
      position: relative;
      z-index: 1;
    }

    /* sl-tooltip inside btn-group must not generate a box of its own,
       so the border-radius / margin rules still target the inner button. */
    .btn-group > sl-tooltip {
      display: contents;
    }

    /* --- Menus row --- */

    .controls-row {
      display: flex;
      align-items: center;
      gap: var(--ll-gap, 0.5rem);
      padding: var(--ll-pad, 0.5rem) var(--ll-pad-lg, 1rem);
      border-top: 1px solid var(--ll-border, #444);
    }

    .menus-row {
      flex-wrap: wrap;
    }

    /* --- Buttons --- */

    button {
      padding: 0.25rem 0.7rem;
      background: var(--ll-surface-raised, #2a2a2a);
      border: 1px solid var(--ll-border, #444);
      border-radius: var(--ll-radius, 3px);
      color: var(--ll-text, #e0e0e0);
      font-size: var(--ll-text-sm, 0.85rem);
      line-height: 1;
      cursor: pointer;
    }

    button:hover {
      border-color: var(--ll-accent, #7ec8e3);
      color: var(--ll-accent, #7ec8e3);
    }

    .btn-play-pause {
      min-width: 4rem;
      background: var(--ll-accent, #7ec8e3);
      border-color: var(--ll-accent, #7ec8e3);
      color: #1a1a1a;
    }

    .btn-play-pause:hover {
      background: #9fd5e8;
      border-color: #9fd5e8;
      color: #1a1a1a;
    }

    /* Accent-colored buttons: Play/Pause, Now, and nav/seek buttons. */
    .btn-now,
    .btn-accent {
      background: var(--ll-accent, #7ec8e3);
      border-color: var(--ll-accent, #7ec8e3);
      color: #1a1a1a;
    }

    .btn-now:hover,
    .btn-accent:hover {
      background: #9fd5e8;
      border-color: #9fd5e8;
      color: #1a1a1a;
    }

    /* Loop toggle switch. */
    .loop-switch {
      --sl-color-primary-600: var(--ll-accent, #7ec8e3);
      --sl-color-primary-500: var(--ll-accent, #7ec8e3);
      --sl-color-primary-400: #9fd5e8;
      font-size: var(--ll-text-sm, 0.85rem);
      color: var(--ll-text-dim, #aaa);
    }

    /* --- Text displays and inputs --- */

    /* Standalone time textbox in the Play group. */
    .time-input-play {
      font-family: var(--ll-font-mono, monospace);
      font-size: var(--ll-text-sm, 0.85rem);
      width: 7ch;
      padding: 0.2rem 0.4rem;
      background: var(--ll-surface-raised, #2a2a2a);
      border: 1px solid var(--ll-border, #444);
      border-radius: var(--ll-radius, 3px);
      color: var(--ll-accent, #7ec8e3);
      text-align: left;
    }

    .time-input-play:focus {
      outline: none;
      border-color: var(--ll-accent, #7ec8e3);
    }

    /* Delta dropdowns (seek_delta, loop_nudge_delta). */
    select.delta-select {
      padding: 0.2rem 0.4rem;
      background: var(--ll-surface-raised, #2a2a2a);
      border: 1px solid var(--ll-border, #444);
      border-radius: var(--ll-radius, 3px);
      color: var(--ll-text, #e0e0e0);
      font-size: var(--ll-text-sm, 0.85rem);
      cursor: pointer;
    }

    select.delta-select:focus {
      outline: none;
      border-color: var(--ll-accent, #7ec8e3);
    }

    .time-input {
      font-family: var(--ll-font-mono, monospace);
      font-size: var(--ll-text-sm, 0.85rem);
      width: 7ch;
      padding: 0.2rem 0.4rem;
      background: var(--ll-surface-raised, #2a2a2a);
      border: 1px solid var(--ll-border, #444);
      color: var(--ll-text, #e0e0e0);
      text-align: right;
    }

    .time-input:focus {
      outline: none;
      border-color: var(--ll-accent, #7ec8e3);
    }

    .time-input.align-left {
      text-align: left;
    }

    .time-input.loop-edit-focus {
      border-color: var(--ll-accent-warm, #e3a857);
      box-shadow: 0 0 0 1px var(--ll-accent-warm, #e3a857);
    }

    .time-input.loop-invalid {
      color: var(--ll-danger, #e05a5a);
    }

    .time-input.source-outside {
      color: var(--ll-accent-warm, #e3a857);
    }

    .speed-input {
      font-family: var(--ll-font-mono, monospace);
      font-size: var(--ll-text-sm, 0.85rem);
      width: 3.5ch;
      padding: 0.2rem 0.4rem;
      background: var(--ll-surface-raised, #2a2a2a);
      border: 1px solid var(--ll-border, #444);
      border-radius: var(--ll-radius, 3px);
      color: var(--ll-text-dim, #aaa);
      text-align: left;
    }

    .speed-input:focus {
      outline: none;
      border-color: var(--ll-accent, #7ec8e3);
    }

    .speed-preset {
      appearance: none;
      -webkit-appearance: none;
      font-size: var(--ll-text-sm, 0.85rem);
      width: 1.6rem;
      padding: 0.2rem 0;
      background: var(--ll-surface-raised, #2a2a2a);
      border: 1px solid var(--ll-border, #444);
      border-radius: var(--ll-radius, 3px);
      color: var(--ll-text-dim, #aaa);
      cursor: pointer;
      text-align: center;
    }

    .speed-preset:focus {
      outline: none;
      border-color: var(--ll-accent, #7ec8e3);
    }

    select.entity-type-select {
      padding: 0.2rem 0.4rem;
      background: var(--ll-surface-raised, #2a2a2a);
      border: 1px solid var(--ll-border, #444);
      border-radius: var(--ll-radius, 3px);
      color: var(--ll-text, #e0e0e0);
      font-size: var(--ll-text-sm, 0.85rem);
      cursor: pointer;
    }

    select.entity-type-select:focus {
      outline: none;
      border-color: var(--ll-accent, #7ec8e3);
    }

    /* --- Edit-scratch mode --- */

    /* Highlight the Looping group; dim everything else. */
    .controls-wrap.edit-scratch-active .ctrl-group:not(.looping-group) {
      opacity: 0.35;
    }

    .controls-wrap.edit-scratch-active .looping-group {
      background: rgba(227, 168, 87, 0.07);
      box-shadow: inset 3px 0 0 var(--ll-accent-warm, #e3a857);
    }

    .controls-wrap.edit-scratch-active .menus-row {
      opacity: 0.35;
    }

    /* Temporary highlight when a keyboard binding modifies a control. */
    .kb-flash {
      border-color: var(--ll-accent-warm, #f0c040) !important;
      box-shadow: 0 0 0 1px var(--ll-accent-warm, #f0c040) !important;
      position: relative;
      z-index: 1;
    }
  `;

  static properties = {
    currentTime:         { type: Number },
    speed:               { type: Number },
    isPlaying:           { type: Boolean },
    looping:             { type: Boolean },
    loopStart:           { type: Number },
    loopEnd:             { type: Number },
    loopSourceType:      { type: String },
    loopSourceStart:     { type: Number },
    loopSourceEnd:       { type: Number },
    seekDelta:           { type: Number },
    seekDeltaChoices:    { type: Array },
    loopNudgeDelta:      { type: Number },
    loopNudgeDeltaChoices: { type: Array },
    editScratchActive:   { type: Boolean },
    editScratchFocus:    { type: String },
    activeEntityType:    { type: String },
  };

  constructor() {
    super();
    this.currentTime          = 0;
    this.speed                = 1;
    this.isPlaying            = false;
    this.looping              = false;
    this.loopStart            = 0;
    this.loopEnd              = 0;
    this.loopSourceType       = null;
    this.loopSourceStart      = null;
    this.loopSourceEnd        = null;
    this.seekDelta            = DEFAULT_OPTIONS.seek_delta_default;
    this.seekDeltaChoices     = DEFAULT_OPTIONS.seek_delta_choices;
    this.loopNudgeDelta       = DEFAULT_OPTIONS.loop_nudge_delta_default;
    this.loopNudgeDeltaChoices = DEFAULT_OPTIONS.loop_nudge_delta_choices;
    this.editScratchActive = false;
    this.editScratchFocus  = 'start';
    this.activeEntityType  = 'any';
    this._playPauseRef    = createRef();
    this._timeRef         = createRef();
    this._timeFocused     = false;
    this._startRef        = createRef();
    this._endRef          = createRef();
    this._speedRef        = createRef();
    this._entitySelectRef   = createRef();
    this._seekDeltaRef      = createRef();
    this._nudgeDeltaRef     = createRef();
  }

  _fmt(secs) {
    if (secs == null) return '?';
    const m = Math.floor(secs / 60);
    const s = Math.floor(secs % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
  }

  _fmtDelta(secs) {
    if (secs < 60) return `${secs}s`;
    return `${secs / 60}m`;
  }

  // Format for loop-endpoint inputs: uses m:ss.t when sub-second delta is
  // active (delta < 1); falls back to m:ss otherwise.
  _fmtLoop(secs) {
    if (secs == null) return '?';
    if (this.loopNudgeDelta < 1) {
      const rounded = Math.round(secs * 10) / 10;
      const m = Math.floor(rounded / 60);
      const rawS = rounded % 60;
      return `${m}:${rawS.toFixed(1).padStart(4, '0')}`;
    }
    return this._fmt(secs);
  }

  _parseTime(str) { return parseTime(str); }

  // Parse a speed string: accepts "75", "75%", "0.75". Returns decimal or null.
  _parseSpeed(str) {
    str = str.trim().replace(/%$/, '');
    const n = parseFloat(str);
    if (isNaN(n) || n <= 0) return null;
    // Treat values > 4 as a percentage (e.g. "75" → 0.75); otherwise decimal.
    return n > 4 ? n / 100 : n;
  }

  _emit(name, detail) {
    this.dispatchEvent(new CustomEvent(name, { bubbles: true, composed: true, detail }));
  }

  firstUpdated() {
    if (this._timeRef.value)  this._timeRef.value.value  = this._fmt(this.currentTime);
    if (this._startRef.value) this._startRef.value.value = this._fmtLoop(this.loopStart);
    if (this._endRef.value)   this._endRef.value.value   = this._fmtLoop(this.loopEnd);
    if (this._speedRef.value) this._speedRef.value.value = `${(this.speed * 100).toFixed(0)}`;
  }

  // Sync inputs when values change from outside (keyboard or Now button).
  // Time input is only synced when not focused (user may be mid-edit).
  // Loop endpoint inputs are guarded similarly via blur/submit handlers.
  updated(changedProps) {
    if (changedProps.has('currentTime') && this._timeRef.value && !this._timeFocused) {
      this._timeRef.value.value = this._fmt(this.currentTime);
    }
    if ((changedProps.has('loopStart') || changedProps.has('loopNudgeDelta'))
        && this._startRef.value) {
      this._startRef.value.value = this._fmtLoop(this.loopStart);
    }
    if ((changedProps.has('loopEnd') || changedProps.has('loopNudgeDelta'))
        && this._endRef.value) {
      this._endRef.value.value = this._fmtLoop(this.loopEnd);
    }
    if (changedProps.has('speed') && this._speedRef.value) {
      this._speedRef.value.value = `${(this.speed * 100).toFixed(0)}`;
    }
    if (changedProps.has('loopNudgeDelta') && this._nudgeDeltaRef.value) {
      this._nudgeDeltaRef.value.value = String(this.loopNudgeDelta);
    }
  }

  _submitStart() {
    const val = this._parseTime(this._startRef.value?.value ?? '');
    if (val !== null) {
      this._emit('ll-loop-start-change', { value: val });
    } else if (this._startRef.value) {
      this._startRef.value.value = this._fmtLoop(this.loopStart);
      this._emit('ll-invalid-time', {});
    }
  }

  _submitEnd() {
    const val = this._parseTime(this._endRef.value?.value ?? '');
    if (val !== null) {
      this._emit('ll-loop-end-change', { value: val });
    } else if (this._endRef.value) {
      this._endRef.value.value = this._fmtLoop(this.loopEnd);
      this._emit('ll-invalid-time', {});
    }
  }

  _submitSpeed() {
    const val = this._parseSpeed(this._speedRef.value?.value ?? '');
    if (val !== null) {
      this._emit('ll-speed-change', { value: val });
    } else if (this._speedRef.value) {
      this._speedRef.value.value = `${(this.speed * 100).toFixed(0)}`;
    }
  }

  _onSpeedPreset(e) {
    const pct = parseInt(e.target.value);
    e.target.selectedIndex = 0;           // reset select back to "▾"
    e.target.blur();
    if (isNaN(pct)) return;
    if (this._speedRef.value) this._speedRef.value.value = `${pct}`;
    this._emit('ll-speed-change', { value: pct / 100 });
  }

  // Public: called by llama-app for the `jj` binding to focus the time textbox.
  focusTimeInput() {
    const input = this._timeRef.value;
    if (input) { input.focus(); input.select(); }
  }

  _onTimeKeyDown(e) {
    if (e.key === 'Enter') {
      const val = this._parseTime(this._timeRef.value?.value ?? '');
      if (val !== null) this._emit('ll-seek-to', { value: val });
      e.target.blur();
    } else if (e.key === 'Escape') {
      e.target.blur();
    }
  }

  // Public: called by llama-app during edit-scratch mode to focus an endpoint
  // input for direct time entry. Selects all so the first typed character
  // replaces the current value.
  focusStartInput() {
    this._startRef.value?.focus();
    this._startRef.value?.select();
  }

  focusEndInput() {
    this._endRef.value?.focus();
    this._endRef.value?.select();
  }

  focusEntitySelect() {
    this._entitySelectRef.value?.focus();
  }

  openMenu(label) {
    const dropdowns = this.renderRoot.querySelectorAll('llama-dropdown');
    for (const dd of dropdowns) {
      if (dd.label === label) { dd.open(); return; }
    }
  }

  focusNudgeDeltaSelect() {
    this._nudgeDeltaRef.value?.focus();
  }

  // Public: highlight a control with a yellow border when a keyboard binding
  // modifies it. Repeated calls cancel any pending timer or blur listener.
  // target: 'time'|'speed'|'seekDelta'|'loopStart'|'loopEnd'|'nudgeDelta'|'entitySelect'
  // mode:   'timed' (default) -- remove after 1.5s
  //         'until-blur'      -- remove when the element loses focus
  flash(target, mode = 'timed') {
    const refs = {
      playPause:    this._playPauseRef,
      time:         this._timeRef,
      speed:        this._speedRef,
      seekDelta:    this._seekDeltaRef,
      loopStart:    this._startRef,
      loopEnd:      this._endRef,
      nudgeDelta:   this._nudgeDeltaRef,
      entitySelect: this._entitySelectRef,
    };
    const el = refs[target]?.value;
    if (!el) return;
    this._flashTimers    ??= {};
    this._flashListeners ??= {};
    // Cancel any previous flash for this target.
    clearTimeout(this._flashTimers[target]);
    if (this._flashListeners[target]) {
      el.removeEventListener('blur', this._flashListeners[target]);
      this._flashListeners[target] = null;
    }
    el.classList.add('kb-flash');
    if (mode === 'until-blur') {
      const handler = () => {
        el.classList.remove('kb-flash');
        this._flashListeners[target] = null;
      };
      this._flashListeners[target] = handler;
      el.addEventListener('blur', handler, { once: true });
    } else {
      this._flashTimers[target] = setTimeout(() => el.classList.remove('kb-flash'), 1500);
    }
  }

  render() {
    return html`
      <div class="controls-wrap ${this.editScratchActive ? 'edit-scratch-active' : ''}">

        <div class="ctrl-groups">

          <div class="ctrl-group">
            <span class="ctrl-group-label">Play</span>
            <div class="ctrl-group-body">
              <sl-tooltip>${ttip('Play / pause', 'Space')}
                <button class="btn-play-pause" ${ref(this._playPauseRef)} @click=${() => this._emit('ll-play-pause')}>
                  ${this.isPlaying ? 'Pause' : 'Play'}
                </button>
              </sl-tooltip>
              <sl-tooltip>${ttip('Seek to time', 'jj')}
                <input
                  ${ref(this._timeRef)}
                  class="time-input-play"
                  type="text"
                  @focus=${() => { this._timeFocused = true; this._timeRef.value?.select(); }}
                  @blur=${() => { this._timeFocused = false; if (this._timeRef.value) this._timeRef.value.value = this._fmt(this.currentTime); }}
                  @keydown=${this._onTimeKeyDown}
                />
              </sl-tooltip>
            </div>
          </div>

          <div class="ctrl-group">
            <span class="ctrl-group-label">Speed</span>
            <div class="ctrl-group-body">
              <div class="btn-group">
                <sl-tooltip>${ttip('Speed', '- / =')}
                  <input
                    ${ref(this._speedRef)}
                    class="speed-input"
                    type="text"
                    @keydown=${(e) => { if (e.key === 'Enter') { this._submitSpeed(); e.target.blur(); } }}
                    @blur=${() => this._submitSpeed()}
                  />
                </sl-tooltip>
                <select class="speed-preset" @change=${this._onSpeedPreset}>
                  <option value="">▾</option>
                  ${[25,30,40,50,60,70,75,80,85,90,95,100,110,125,150,200].map(v => html`<option value="${v}">${v}</option>`)}
                </select>
              </div>
            </div>
          </div>

          <div class="ctrl-group">
            <span class="ctrl-group-label">Navigate</span>
            <div class="ctrl-group-body">
              <div class="btn-group">
                <sl-tooltip>${ttip('Seek back', '←')}
                  <button class="btn-accent" @click=${() => this._emit('ll-seek-back')}>◀</button>
                </sl-tooltip>
                <sl-tooltip>${ttip('Seek delta', '↓ / ↑')}
                  <select
                    ${ref(this._seekDeltaRef)}
                    class="delta-select"
                    @change=${(e) => { this._emit('ll-seek-delta-change', { value: Number(e.target.value) }); e.target.blur(); }}
                  >
                    ${[...this.seekDeltaChoices].sort((a, b) => b - a).map(n => html`
                      <option value=${n} ?selected=${this.seekDelta === n}>${this._fmtDelta(n)}</option>
                    `)}
                  </select>
                </sl-tooltip>
                <sl-tooltip>${ttip('Seek forward', '→')}
                  <button class="btn-accent" @click=${() => this._emit('ll-seek-forward')}>▶</button>
                </sl-tooltip>
              </div>
              <div class="btn-group">
                <sl-tooltip>${ttip('Prev entity', ',')}
                  <button class="btn-accent" @click=${() => this._emit('ll-prev-entity')}>⏮</button>
                </sl-tooltip>
                <sl-tooltip>${ttip('Entity type', '/')}
                  <select
                    ${ref(this._entitySelectRef)}
                    class="entity-type-select"
                    @change=${(e) => { this._emit('ll-entity-type-change', { value: e.target.value }); e.target.blur(); }}
                    @keydown=${(e) => { if (e.key === 'Enter' || e.key === 'Escape') e.target.blur(); }}
                  >
                    <option value="any"     ?selected=${this.activeEntityType === 'any'}>Any</option>
                    <option value="chapter" ?selected=${this.activeEntityType === 'chapter'}>Chapter</option>
                    <option value="section" ?selected=${this.activeEntityType === 'section'}>Section</option>
                    <option value="loop"    ?selected=${this.activeEntityType === 'loop'}>Loop</option>
                    <option value="mark"    ?selected=${this.activeEntityType === 'mark'}>Mark</option>
                  </select>
                </sl-tooltip>
                <sl-tooltip>${ttip('Next entity', '.')}
                  <button class="btn-accent" @click=${() => this._emit('ll-next-entity')}>⏭</button>
                </sl-tooltip>
              </div>
            </div>
          </div>

          <div class="ctrl-group looping-group">
            <span class="ctrl-group-label">Scratch loop</span>
            <div class="ctrl-group-body">
              <sl-tooltip>${ttip('Toggle looping', 'll')}
                <sl-switch
                  class="loop-switch"
                  ?checked=${this.looping}
                  @sl-change=${() => this._emit('ll-toggle-loop')}
                ></sl-switch>
              </sl-tooltip>
              <div class="btn-group">
                <sl-tooltip>${ttip('Set loop start to now', '[[')}
                  <button
                    class="btn-now"
                    @click=${() => this._emit('ll-set-loop-start-now')}
                  >Now</button>
                </sl-tooltip>
                <sl-tooltip>${ttip('Edit loop start', '[\\')}
                  <input
                    ${ref(this._startRef)}
                    class="time-input align-left ${this.editScratchActive && this.editScratchFocus === 'start' ? 'loop-edit-focus' : ''} ${this.loopStart >= this.loopEnd ? 'loop-invalid' : ''} ${this.loopSourceType && this.currentTime < this.loopSourceStart ? 'source-outside' : ''}"
                    type="text"
                    @keydown=${(e) => { if (e.key === 'Enter') { this._submitStart(); e.target.blur(); } else if (e.key === 'Escape') { e.target.value = this._fmtLoop(this.loopStart); e.target.blur(); } }}
                    @blur=${() => this._submitStart()}
                  />
                </sl-tooltip>
              </div>
              <sl-tooltip>${ttip('Nudge delta', '[]')}
                <select
                  ${ref(this._nudgeDeltaRef)}
                  class="delta-select"
                  @change=${(e) => { this._emit('ll-loop-nudge-delta-change', { value: Number(e.target.value) }); e.target.blur(); }}
                  @keydown=${(e) => { if (e.key === 'Enter' || e.key === 'Escape') e.target.blur(); }}
                >
                  ${[...this.loopNudgeDeltaChoices].sort((a, b) => b - a).map(n => html`
                    <option value=${n} ?selected=${this.loopNudgeDelta === n}>${this._fmtDelta(n)}</option>
                  `)}
                </select>
              </sl-tooltip>
              <div class="btn-group">
                <sl-tooltip>${ttip('Edit loop end', ']\\' )}
                  <input
                    ${ref(this._endRef)}
                    class="time-input ${this.editScratchActive && this.editScratchFocus === 'end' ? 'loop-edit-focus' : ''} ${this.loopStart >= this.loopEnd ? 'loop-invalid' : ''} ${this.loopSourceType && this.currentTime > this.loopSourceEnd ? 'source-outside' : ''}"
                    type="text"
                    @keydown=${(e) => { if (e.key === 'Enter') { this._submitEnd(); e.target.blur(); } else if (e.key === 'Escape') { e.target.value = this._fmtLoop(this.loopEnd); e.target.blur(); } }}
                    @blur=${() => this._submitEnd()}
                  />
                </sl-tooltip>
                <sl-tooltip>${ttip('Set loop end to now', ']]')}
                  <button
                    class="btn-now"
                    @click=${() => this._emit('ll-set-loop-end-now')}
                  >Now</button>
                </sl-tooltip>
              </div>
            </div>
          </div>

        </div>

        <div class="controls-row menus-row">
          ${MENUS.map(menu => html`
            <llama-dropdown .label=${menu.label} .items=${menu.items}></llama-dropdown>
          `)}
        </div>

      </div>
    `;
  }
}

customElements.define('llama-controls', LlamaControls);
