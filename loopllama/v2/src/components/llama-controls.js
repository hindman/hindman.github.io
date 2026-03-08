// llama-controls.js -- playback controls display.
//
// Receives:
//   currentTime:          Number   -- current playback position (seconds)
//   speed:                Number   -- playback speed (e.g. 1.0 = 100%)
//   isPlaying:            Boolean  -- true while the video is playing
//   looping:              Boolean  -- true when looping is active
//   loopStart:            Number   -- scratch-loop start (seconds)
//   loopEnd:              Number   -- scratch-loop end (seconds)
//   seekDelta:            Number   -- current seek delta (seconds)
//   seekDeltaChoices:     Array    -- available seek delta values
//   loopNudgeDelta:       Number   -- current loop nudge delta (seconds)
//   loopNudgeDeltaChoices: Array   -- available loop nudge delta values
//   activeEntityType:     String   -- 'any'|'section'|'loop'|'mark'|'chapter'|'video'
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

// Menu definitions for the seven action menus.
// Each item: { label, action } or { type: 'divider' }.
const MENUS = [
  {
    label: 'Video',
    items: [
      { label: 'Load URL',     action: 'videoUrl'    },
      { label: 'Open video',   action: 'videoPicker' },
      { label: 'Edit current', action: 'editVideo'   },
      { label: 'Video info',   action: 'videoInfo'   },
      { label: 'Delete video', action: 'deleteVideo' },
      { type: 'divider' },
      { label: 'Create chapter',       action: 'setChapter'    },
      { label: 'Open chapter',         action: 'openChapter'   },
      { label: 'Edit chapter',         action: 'editChapter'   },
      { label: 'Delete chapter',       action: 'deleteChapter' },
      { label: 'Zoom current chapter', action: 'zoomChapter'   },
    ],
  },
  {
    label: 'Section',
    items: [
      { label: 'Set section here',     action: 'setSection'    },
      { label: 'Edit current section', action: 'editSection'   },
      { label: 'Loop current section', action: 'loopSection'   },
      { label: 'Delete section',       action: 'deleteSection' },
      { label: 'Zoom current section', action: 'zoomSection' },
    ],
  },
  {
    label: 'Loop',
    items: [
      { label: 'Open loop',                action: 'openLoop'    },
      { label: 'Save new loop',            action: 'saveLoop'    },
      { label: 'Save back to loop source', action: 'saveBack'    },
      { label: 'Delete loop',              action: 'deleteLoop'  },
      { label: 'Zoom current loop',        action: 'zoomLoop' },
      { type: 'divider' },
      { label: 'Edit scratch loop', action: 'editScratch' },
    ],
  },
  {
    label: 'Mark',
    items: [
      { label: 'Set mark here', action: 'setMark'    },
      { label: 'Edit mark',     action: 'editMark'   },
      { label: 'Delete mark',   action: 'deleteMark' },
    ],
  },
  {
    label: 'Jump',
    items: [
      { label: 'Jump to Section', action: 'jumpSection' },
      { label: 'Jump to Loop',    action: 'jumpLoop'    },
      { label: 'Jump to Mark',    action: 'jumpMark'    },
      { type: 'divider' },
      { label: 'Jump history',  action: 'jumpHistory' },
      { label: 'Jump Back',     action: 'jumpBack'    },
      { label: 'Jump Forward',  action: 'jumpForward' },
    ],
  },
  {
    label: 'App',
    items: [
      { label: 'Undo',  action: 'undo' },
      { label: 'Redo',  action: 'redo' },
      { type: 'divider' },
      { label: 'Share loop URL', action: 'shareLoop' },
      { type: 'divider' },
      { label: 'Export current video', action: 'shareVideo' },
      { label: 'Export all data',      action: 'exportAll'  },
      { label: 'Import data',          action: 'importData' },
      { label: 'Inspect JSON',         action: 'inspectData' },
      { type: 'divider' },
      { label: 'Bulk data delete', action: 'deleteData' },
      { label: 'Options',          action: 'options' },
    ],
  },
  {
    label: 'Help',
    items: [
      { label: 'General help', action: 'helpGeneral', disabled: true },
      { label: 'Key bindings', action: 'helpKeys',    disabled: true },
    ],
  },
];

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

    .speed-input {
      font-family: var(--ll-font-mono, monospace);
      font-size: var(--ll-text-sm, 0.85rem);
      width: 5ch;
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
  `;

  static properties = {
    currentTime:         { type: Number },
    speed:               { type: Number },
    isPlaying:           { type: Boolean },
    looping:             { type: Boolean },
    loopStart:           { type: Number },
    loopEnd:             { type: Number },
    seekDelta:           { type: Number },
    seekDeltaChoices:    { type: Array },
    loopNudgeDelta:      { type: Number },
    loopNudgeDeltaChoices: { type: Array },
    editScratchActive:   { type: Boolean },
    editScratchFocus:    { type: String },
    editScratchDelta:    { type: Number },
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
    this.seekDelta            = DEFAULT_OPTIONS.seek_delta_default;
    this.seekDeltaChoices     = DEFAULT_OPTIONS.seek_delta_choices;
    this.loopNudgeDelta       = DEFAULT_OPTIONS.loop_nudge_delta_default;
    this.loopNudgeDeltaChoices = DEFAULT_OPTIONS.loop_nudge_delta_choices;
    this.editScratchActive = false;
    this.editScratchFocus  = 'start';
    this.editScratchDelta  = 1;
    this.activeEntityType  = 'any';
    this._timeRef         = createRef();
    this._timeFocused     = false;
    this._startRef        = createRef();
    this._endRef          = createRef();
    this._speedRef        = createRef();
    this._entitySelectRef   = createRef();
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
    if (this.editScratchDelta < 1) {
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
    if (this._speedRef.value) this._speedRef.value.value = `${(this.speed * 100).toFixed(0)}%`;
  }

  // Sync inputs when values change from outside (keyboard or Now button).
  // Time input is only synced when not focused (user may be mid-edit).
  // Loop endpoint inputs are guarded similarly via blur/submit handlers.
  updated(changedProps) {
    if (changedProps.has('currentTime') && this._timeRef.value && !this._timeFocused) {
      this._timeRef.value.value = this._fmt(this.currentTime);
    }
    if ((changedProps.has('loopStart') || changedProps.has('editScratchDelta'))
        && this._startRef.value) {
      this._startRef.value.value = this._fmtLoop(this.loopStart);
    }
    if ((changedProps.has('loopEnd') || changedProps.has('editScratchDelta'))
        && this._endRef.value) {
      this._endRef.value.value = this._fmtLoop(this.loopEnd);
    }
    if (changedProps.has('speed') && this._speedRef.value) {
      this._speedRef.value.value = `${(this.speed * 100).toFixed(0)}%`;
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
      this._speedRef.value.value = `${(this.speed * 100).toFixed(0)}%`;
    }
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

  focusNudgeDeltaSelect() {
    this._nudgeDeltaRef.value?.focus();
  }

  render() {
    return html`
      <div class="controls-wrap ${this.editScratchActive ? 'edit-scratch-active' : ''}">

        <div class="ctrl-groups">

          <div class="ctrl-group">
            <span class="ctrl-group-label">Play</span>
            <div class="ctrl-group-body">
              <button class="btn-play-pause" @click=${() => this._emit('ll-play-pause')}>
                ${this.isPlaying ? 'Pause' : 'Play'}
              </button>
              <input
                ${ref(this._timeRef)}
                class="time-input-play"
                type="text"
                @focus=${() => { this._timeFocused = true; this._timeRef.value?.select(); }}
                @blur=${() => { this._timeFocused = false; if (this._timeRef.value) this._timeRef.value.value = this._fmt(this.currentTime); }}
                @keydown=${this._onTimeKeyDown}
              />
            </div>
          </div>

          <div class="ctrl-group">
            <span class="ctrl-group-label">Speed</span>
            <div class="ctrl-group-body">
              <input
                ${ref(this._speedRef)}
                class="speed-input"
                type="text"
                @keydown=${(e) => { if (e.key === 'Enter') { this._submitSpeed(); e.target.blur(); } }}
                @blur=${() => this._submitSpeed()}
              />
            </div>
          </div>

          <div class="ctrl-group">
            <span class="ctrl-group-label">Navigate</span>
            <div class="ctrl-group-body">
              <div class="btn-group">
                <button class="btn-accent" @click=${() => this._emit('ll-seek-back')}>◀</button>
                <select
                  class="delta-select"
                  @change=${(e) => { this._emit('ll-seek-delta-change', { value: Number(e.target.value) }); e.target.blur(); }}
                >
                  ${this.seekDeltaChoices.map(n => html`
                    <option value=${n} ?selected=${this.seekDelta === n}>${this._fmtDelta(n)}</option>
                  `)}
                </select>
                <button class="btn-accent" @click=${() => this._emit('ll-seek-forward')}>▶</button>
              </div>
              <div class="btn-group">
                <button class="btn-accent" @click=${() => this._emit('ll-prev-entity')}>⏮</button>
                <select
                  ${ref(this._entitySelectRef)}
                  class="entity-type-select"
                  @change=${(e) => { this._emit('ll-entity-type-change', { value: e.target.value }); e.target.blur(); }}
                  @keydown=${(e) => { if (e.key === 'Enter' || e.key === 'Escape') e.target.blur(); }}
                >
                  <option value="any"     ?selected=${this.activeEntityType === 'any'}>Any</option>
                  <option value="section" ?selected=${this.activeEntityType === 'section'}>Section</option>
                  <option value="loop"    ?selected=${this.activeEntityType === 'loop'}>Loop</option>
                  <option value="mark"    ?selected=${this.activeEntityType === 'mark'}>Mark</option>
                  <option value="chapter" ?selected=${this.activeEntityType === 'chapter'}>Chapter</option>
                  <option value="video"   ?selected=${this.activeEntityType === 'video'}>Video</option>
                </select>
                <button class="btn-accent" @click=${() => this._emit('ll-next-entity')}>⏭</button>
              </div>
            </div>
          </div>

          <div class="ctrl-group looping-group">
            <span class="ctrl-group-label">Looping</span>
            <div class="ctrl-group-body">
              <sl-switch
                class="loop-switch"
                ?checked=${this.looping}
                @sl-change=${() => this._emit('ll-toggle-loop')}
              ></sl-switch>
              <div class="btn-group">
                <button
                  class="btn-now"
                  @click=${() => this._emit('ll-set-loop-start-now')}
                >Now</button>
                <input
                  ${ref(this._startRef)}
                  class="time-input align-left ${this.editScratchActive && this.editScratchFocus === 'start' ? 'loop-edit-focus' : ''} ${this.loopStart >= this.loopEnd ? 'loop-invalid' : ''}"
                  type="text"
                  @keydown=${(e) => { if (e.key === 'Enter') { this._submitStart(); e.target.blur(); } else if (e.key === 'Escape') { e.target.value = this._fmtLoop(this.loopStart); e.target.blur(); } }}
                  @blur=${() => this._submitStart()}
                />
              </div>
              <select
                ${ref(this._nudgeDeltaRef)}
                class="delta-select"
                @change=${(e) => { this._emit('ll-loop-nudge-delta-change', { value: Number(e.target.value) }); e.target.blur(); }}
                @keydown=${(e) => { if (e.key === 'Enter' || e.key === 'Escape') e.target.blur(); }}
              >
                ${this.loopNudgeDeltaChoices.map(n => html`
                  <option value=${n} ?selected=${this.loopNudgeDelta === n}>${this._fmtDelta(n)}</option>
                `)}
              </select>
              <div class="btn-group">
                <input
                  ${ref(this._endRef)}
                  class="time-input ${this.editScratchActive && this.editScratchFocus === 'end' ? 'loop-edit-focus' : ''} ${this.loopStart >= this.loopEnd ? 'loop-invalid' : ''}"
                  type="text"
                  @keydown=${(e) => { if (e.key === 'Enter') { this._submitEnd(); e.target.blur(); } else if (e.key === 'Escape') { e.target.value = this._fmtLoop(this.loopEnd); e.target.blur(); } }}
                  @blur=${() => this._submitEnd()}
                />
                <button
                  class="btn-now"
                  @click=${() => this._emit('ll-set-loop-end-now')}
                >Now</button>
              </div>
            </div>
          </div>

        </div>

        <div class="controls-row menus-row">
          <span class="ctrl-group-label">Actions</span>
          ${MENUS.map(menu => html`
            <llama-dropdown .label=${menu.label} .items=${menu.items}></llama-dropdown>
          `)}
        </div>

      </div>
    `;
  }
}

customElements.define('llama-controls', LlamaControls);
