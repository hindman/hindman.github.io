// llama-controls.js -- playback controls display.
//
// Receives:
//   currentTime:      Number   -- current playback position (seconds)
//   duration:         Number   -- total video duration (seconds), or null
//   speed:            Number   -- playback speed (e.g. 1.0 = 100%)
//   isPlaying:        Boolean  -- true while the video is playing
//   looping:          Boolean  -- true when looping is active
//   loopStart:        Number   -- scratch-loop start (seconds)
//   loopEnd:          Number   -- scratch-loop end (seconds)
//   sections:         Array    -- array of Section objects { id, time, name }
//   marks:            Array    -- array of Mark objects { id, time, name }
//   activeEntityType: String   -- 'any'|'section'|'loop'|'mark'|'video'
//
// Fires (bubbles + composed):
//   ll-play-pause             -- toggle play/pause
//   ll-seek-forward           -- seek forward by current seek delta
//   ll-seek-back              -- seek back by current seek delta
//   ll-toggle-loop            -- toggle looping on/off
//   ll-set-loop-start-now     -- set loop start to current time
//   ll-set-loop-end-now       -- set loop end to current time
//   ll-loop-start-change      -- user edited start; detail.value = seconds
//   ll-loop-end-change        -- user edited end; detail.value = seconds
//   ll-set-section            -- set a section divider at current time
//   ll-set-mark               -- set a mark at current time
//   ll-prev-entity            -- navigate to previous entity
//   ll-next-entity            -- navigate to next entity
//   ll-entity-type-change     -- entity type changed; detail.value = type string

import { LitElement, html, css } from 'lit';
import { createRef, ref } from 'lit/directives/ref.js';

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

    .controls-row {
      display: flex;
      align-items: center;
      gap: var(--ll-gap, 0.5rem);
      padding: var(--ll-pad, 0.5rem) var(--ll-pad-lg, 1rem);
    }

    .controls-row + .controls-row {
      border-top: 1px solid var(--ll-border, #444);
    }

    button {
      padding: 0.25rem 0.7rem;
      background: var(--ll-surface-raised, #2a2a2a);
      border: 1px solid var(--ll-border, #444);
      border-radius: var(--ll-radius, 3px);
      color: var(--ll-text, #e0e0e0);
      font-size: var(--ll-text-sm, 0.85rem);
      cursor: pointer;
    }

    button:hover {
      border-color: var(--ll-accent, #7ec8e3);
      color: var(--ll-accent, #7ec8e3);
    }

    .btn-play-pause {
      min-width: 4.5rem;
      padding: 0.4rem 1.1rem;
      background: var(--ll-accent, #7ec8e3);
      border-color: var(--ll-accent, #7ec8e3);
      color: #1a1a1a;
      font-weight: bold;
      font-size: var(--ll-text-base, 1rem);
    }

    .btn-play-pause:hover {
      background: #9fd5e8;
      border-color: #9fd5e8;
      color: #1a1a1a;
    }

    .btn-loop-toggle {
      min-width: 5.5rem;
    }

    .btn-loop-toggle.active {
      background: var(--ll-accent, #7ec8e3);
      border-color: var(--ll-accent, #7ec8e3);
      color: #1a1a1a;
      font-weight: bold;
    }

    .btn-loop-toggle.active:hover {
      background: #9fd5e8;
      border-color: #9fd5e8;
      color: #1a1a1a;
    }

    @keyframes loop-violation-flash {
      0%   { border-color: var(--ll-warn, #e35b5b); color: var(--ll-warn, #e35b5b); }
      100% { border-color: var(--ll-border, #444);  color: var(--ll-text, #e0e0e0); }
    }

    .btn-loop-toggle.violation {
      animation: loop-violation-flash 0.6s ease-out forwards;
    }

    .sep {
      color: var(--ll-text-muted, #666);
    }

    .label {
      font-size: var(--ll-text-sm, 0.85rem);
      color: var(--ll-text-dim, #aaa);
    }

    .time-display {
      font-family: var(--ll-font-mono, monospace);
      font-size: var(--ll-text-sm, 0.85rem);
      color: var(--ll-accent, #7ec8e3);
      min-width: 11ch;
    }

    .speed-display {
      font-family: var(--ll-font-mono, monospace);
      font-size: var(--ll-text-sm, 0.85rem);
      color: var(--ll-text-dim, #aaa);
      min-width: 5ch;
      text-align: right;
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

    .time-input {
      font-family: var(--ll-font-mono, monospace);
      font-size: var(--ll-text-sm, 0.85rem);
      width: 7ch;
      padding: 0.2rem 0.4rem;
      background: var(--ll-surface-raised, #2a2a2a);
      border: 1px solid var(--ll-border, #444);
      border-radius: var(--ll-radius, 3px);
      color: var(--ll-text, #e0e0e0);
      text-align: right;
    }

    .time-input:focus {
      outline: none;
      border-color: var(--ll-accent, #7ec8e3);
    }

    .time-input.loop-edit-focus {
      border-color: var(--ll-accent-warm, #e3a857);
      box-shadow: 0 0 0 1px var(--ll-accent-warm, #e3a857);
    }

    /* Tight bordered group for each loop endpoint (label + input + Now). */
    .loop-endpoint-group {
      display: flex;
      align-items: center;
      gap: 0.2rem;
      border: 1px solid var(--ll-border, #444);
      border-radius: var(--ll-radius, 3px);
      padding: 0.1rem 0.4rem;
    }

    /* Edit-scratch active: accent bar + warm tint on loop row. */
    .controls-wrap.edit-scratch-active .loop-row {
      background: rgba(227, 168, 87, 0.07);
      box-shadow: inset 3px 0 0 var(--ll-accent-warm, #e3a857);
    }

    /* Edit-scratch active: dim all other rows. */
    .controls-wrap.edit-scratch-active .controls-row:not(.loop-row) {
      opacity: 0.35;
    }
  `;

  static properties = {
    currentTime:      { type: Number },
    duration:         { type: Number },
    speed:            { type: Number },
    isPlaying:        { type: Boolean },
    looping:          { type: Boolean },
    loopStart:        { type: Number },
    loopEnd:          { type: Number },
    editScratchActive:  { type: Boolean },
    editScratchFocus:   { type: String },
    editScratchDelta:   { type: Number },
    loopViolation:      { type: Boolean },
    activeEntityType:   { type: String },
  };

  constructor() {
    super();
    this.currentTime = 0;
    this.duration    = null;
    this.speed       = 1;
    this.isPlaying   = false;
    this.looping     = false;
    this.loopStart   = 0;
    this.loopEnd     = 0;
    this.editScratchActive = false;
    this.editScratchFocus  = 'start';
    this.loopViolation     = false;
    this.editScratchDelta  = 1;
    this.activeEntityType  = 'any';
    this._startRef       = createRef();
    this._endRef         = createRef();
    this._entitySelectRef = createRef();
  }

  _fmt(secs) {
    if (secs == null) return '?';
    const m = Math.floor(secs / 60);
    const s = Math.floor(secs % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
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

  // Parse a time string to seconds. Returns a Number or null if invalid.
  // Supports: mm:ss, hh:mm:ss, mm/ss, hh/mm/ss, raw seconds (int or decimal).
  _parseTime(str) {
    str = str.trim().replace(/\//g, ':');
    if (!str) return null;
    const parts = str.split(':');
    if (parts.length === 2 || parts.length === 3) {
      const nums = parts.map(p => parseFloat(p));
      if (nums.some(isNaN)) return null;
      return parts.length === 2
        ? nums[0] * 60 + nums[1]
        : nums[0] * 3600 + nums[1] * 60 + nums[2];
    }
    const n = parseFloat(str);
    return !isNaN(n) && n >= 0 ? n : null;
  }

  _emit(name, detail) {
    this.dispatchEvent(new CustomEvent(name, { bubbles: true, composed: true, detail }));
  }

  firstUpdated() {
    if (this._startRef.value) this._startRef.value.value = this._fmtLoop(this.loopStart);
    if (this._endRef.value)   this._endRef.value.value   = this._fmtLoop(this.loopEnd);
  }

  // Sync inputs when loopStart/loopEnd change from outside (keyboard or Now
  // button), but only when loopStart/loopEnd actually changed -- so a poll
  // re-render (which only changes currentTime) never disturbs a user mid-edit.
  // Also re-sync when editScratchDelta changes, since the format may change.
  updated(changedProps) {
    if ((changedProps.has('loopStart') || changedProps.has('editScratchDelta'))
        && this._startRef.value) {
      this._startRef.value.value = this._fmtLoop(this.loopStart);
    }
    if ((changedProps.has('loopEnd') || changedProps.has('editScratchDelta'))
        && this._endRef.value) {
      this._endRef.value.value = this._fmtLoop(this.loopEnd);
    }
  }

  _submitStart() {
    const val = this._parseTime(this._startRef.value?.value ?? '');
    if (val !== null) {
      this._emit('ll-loop-start-change', { value: val });
    } else if (this._startRef.value) {
      // Revert invalid input to the current value.
      this._startRef.value.value = this._fmt(this.loopStart);
    }
  }

  _submitEnd() {
    const val = this._parseTime(this._endRef.value?.value ?? '');
    if (val !== null) {
      this._emit('ll-loop-end-change', { value: val });
    } else if (this._endRef.value) {
      this._endRef.value.value = this._fmt(this.loopEnd);
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

  render() {
    const speedPct = `${(this.speed * 100).toFixed(0)}%`;
    return html`
      <div class="controls-wrap ${this.editScratchActive ? 'edit-scratch-active' : ''}">
        <div class="controls-row">
          <button @click=${() => this._emit('ll-seek-back')}>◀</button>
          <button class="btn-play-pause" @click=${() => this._emit('ll-play-pause')}>
            ${this.isPlaying ? 'Pause' : 'Play'}
          </button>
          <button @click=${() => this._emit('ll-seek-forward')}>▶</button>
          <span class="sep">|</span>
          <span class="time-display">
            ${this._fmt(this.currentTime)} / ${this._fmt(this.duration)}
          </span>
          <span class="sep">|</span>
          <span class="speed-display">${speedPct}</span>
          <span class="sep">|</span>
          <button @click=${() => this._emit('ll-prev-entity')}>⏮</button>
          <select
            ${ref(this._entitySelectRef)}
            class="entity-type-select"
            @change=${(e) => { this._emit('ll-entity-type-change', { value: e.target.value }); e.target.blur(); }}
          >
            <option value="any"     ?selected=${this.activeEntityType === 'any'}>Any</option>
            <option value="section" ?selected=${this.activeEntityType === 'section'}>Section</option>
            <option value="loop"    ?selected=${this.activeEntityType === 'loop'}>Loop</option>
            <option value="mark"    ?selected=${this.activeEntityType === 'mark'}>Mark</option>
            <option value="video"   ?selected=${this.activeEntityType === 'video'}>Video</option>
          </select>
          <button @click=${() => this._emit('ll-next-entity')}>⏭</button>
        </div>

        <div class="controls-row loop-row">
          <button
            class="btn-loop-toggle ${this.looping ? 'active' : ''} ${this.loopViolation ? 'violation' : ''}"
            @click=${() => this._emit('ll-toggle-loop')}
          >Loop: ${this.looping ? 'ON' : 'OFF'}</button>
          <span class="sep">|</span>
          <div class="loop-endpoint-group">
            <span class="label">Start:</span>
            <input
              ${ref(this._startRef)}
              class="time-input ${this.editScratchActive && this.editScratchFocus === 'start' ? 'loop-edit-focus' : ''}"
              type="text"
              @keydown=${(e) => { if (e.key === 'Enter') { this._submitStart(); e.target.blur(); } }}
              @blur=${() => this._submitStart()}
            />
            <button @click=${() => this._emit('ll-set-loop-start-now')}>Now</button>
          </div>
          <div class="loop-endpoint-group">
            <span class="label">End:</span>
            <input
              ${ref(this._endRef)}
              class="time-input ${this.editScratchActive && this.editScratchFocus === 'end' ? 'loop-edit-focus' : ''}"
              type="text"
              @keydown=${(e) => { if (e.key === 'Enter') { this._submitEnd(); e.target.blur(); } }}
              @blur=${() => this._submitEnd()}
            />
            <button @click=${() => this._emit('ll-set-loop-end-now')}>Now</button>
          </div>
        </div>

        <div class="controls-row">
          <span class="label">Sections:</span>
          <button @click=${() => this._emit('ll-set-section')}>Set here</button>
        </div>

        <div class="controls-row">
          <span class="label">Marks:</span>
          <button @click=${() => this._emit('ll-set-mark')}>Set here</button>
        </div>

      </div>
    `;
  }
}

customElements.define('llama-controls', LlamaControls);
