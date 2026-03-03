// llama-controls.js -- playback controls display.
//
// Receives:
//   currentTime: Number   -- current playback position (seconds)
//   duration:    Number   -- total video duration (seconds), or null
//   speed:       Number   -- playback speed (e.g. 1.0 = 100%)
//   isPlaying:   Boolean  -- true while the video is playing
//   looping:     Boolean  -- true when looping is active
//   loopStart:   Number   -- scratch-loop start (seconds)
//   loopEnd:     Number   -- scratch-loop end (seconds)
//   sections:    Array    -- array of Section objects { id, time, name }
//   marks:       Array    -- array of Mark objects { id, time, name }
//
// Fires (bubbles + composed):
//   ll-play-pause           -- toggle play/pause
//   ll-seek-forward         -- seek forward by current seek delta
//   ll-seek-back            -- seek back by current seek delta
//   ll-toggle-loop          -- toggle looping on/off
//   ll-set-loop-start-now   -- set loop start to current time
//   ll-set-loop-end-now     -- set loop end to current time
//   ll-loop-start-change    -- user edited start; detail.value = seconds
//   ll-loop-end-change      -- user edited end; detail.value = seconds
//   ll-set-section          -- set a section divider at current time
//   ll-delete-section       -- delete a section; detail.id = section id
//   ll-set-mark             -- set a mark at current time
//   ll-delete-mark          -- delete a mark; detail.id = mark id
//   ll-save-loop            -- save scratch as named loop; detail.name = string
//   ll-load-loop            -- load a named loop; detail.id = loop id
//   ll-delete-loop          -- delete a named loop; detail.id = loop id

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
    }

    .btn-loop-toggle {
      min-width: 5.5rem;
    }

    .btn-loop-toggle.active {
      border-color: var(--ll-accent, #7ec8e3);
      color: var(--ll-accent, #7ec8e3);
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

    .time-input {
      font-family: var(--ll-font-mono, monospace);
      font-size: var(--ll-text-sm, 0.85rem);
      width: 6ch;
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

    .marks-list {
      display: flex;
      flex-wrap: wrap;
      gap: 0.3rem;
      flex: 1;
    }

    .mark-chip {
      display: inline-flex;
      align-items: center;
      gap: 0.2rem;
      background: var(--ll-surface-raised, #2a2a2a);
      border: 1px solid var(--ll-border, #444);
      border-radius: var(--ll-radius, 3px);
      padding: 0.1rem 0.35rem;
      font-size: var(--ll-text-sm, 0.85rem);
    }

    .mark-chip .mark-label {
      color: var(--ll-text-dim, #aaa);
    }

    .mark-chip .mark-time {
      font-family: var(--ll-font-mono, monospace);
      color: var(--ll-accent, #7ec8e3);
    }

    .mark-chip .btn-delete {
      padding: 0 0.2rem;
      background: transparent;
      border: none;
      color: var(--ll-text-muted, #666);
      font-size: 0.8rem;
      line-height: 1;
      cursor: pointer;
      margin-left: 0.1rem;
    }

    .mark-chip .btn-delete:hover {
      color: var(--ll-text, #e0e0e0);
      border-color: transparent;
    }

    .mark-chip.loaded {
      border-color: var(--ll-accent, #7ec8e3);
    }

    .loop-name-input {
      font-family: var(--ll-font-mono, monospace);
      font-size: var(--ll-text-sm, 0.85rem);
      width: 8ch;
      padding: 0.2rem 0.4rem;
      background: var(--ll-surface-raised, #2a2a2a);
      border: 1px solid var(--ll-border, #444);
      border-radius: var(--ll-radius, 3px);
      color: var(--ll-text, #e0e0e0);
    }

    .loop-name-input:focus {
      outline: none;
      border-color: var(--ll-accent, #7ec8e3);
    }
  `;

  static properties = {
    currentTime: { type: Number },
    duration:    { type: Number },
    speed:       { type: Number },
    isPlaying:   { type: Boolean },
    looping:     { type: Boolean },
    loopStart:   { type: Number },
    loopEnd:     { type: Number },
    sections:    { type: Array },
    marks:       { type: Array },
    namedLoops:  { type: Array },
    loopSource:  { type: String },
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
    this.sections    = [];
    this.marks       = [];
    this.namedLoops  = [];
    this.loopSource  = null;
    this._startRef    = createRef();
    this._endRef      = createRef();
    this._loopNameRef = createRef();
  }

  _fmt(secs) {
    if (secs == null) return '?';
    const m = Math.floor(secs / 60);
    const s = Math.floor(secs % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
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
    if (this._startRef.value) this._startRef.value.value = this._fmt(this.loopStart);
    if (this._endRef.value)   this._endRef.value.value   = this._fmt(this.loopEnd);
  }

  // Sync inputs when loopStart/loopEnd change from outside (keyboard or Now
  // button), but only when loopStart/loopEnd actually changed -- so a poll
  // re-render (which only changes currentTime) never disturbs a user mid-edit.
  updated(changedProps) {
    if (changedProps.has('loopStart') && this._startRef.value) {
      this._startRef.value.value = this._fmt(this.loopStart);
    }
    if (changedProps.has('loopEnd') && this._endRef.value) {
      this._endRef.value.value = this._fmt(this.loopEnd);
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

  _onSaveLoopClick() {
    const name = this._loopNameRef.value?.value?.trim() ?? '';
    this._emit('ll-save-loop', { name });
    if (this._loopNameRef.value) this._loopNameRef.value.value = '';
  }

  _submitEnd() {
    const val = this._parseTime(this._endRef.value?.value ?? '');
    if (val !== null) {
      this._emit('ll-loop-end-change', { value: val });
    } else if (this._endRef.value) {
      this._endRef.value.value = this._fmt(this.loopEnd);
    }
  }

  render() {
    const speedPct = `${(this.speed * 100).toFixed(0)}%`;
    return html`
      <div class="controls-wrap">
        <div class="controls-row">
          <button @click=${() => this._emit('ll-seek-back')}>← Back</button>
          <button class="btn-play-pause" @click=${() => this._emit('ll-play-pause')}>
            ${this.isPlaying ? 'Pause' : 'Play'}
          </button>
          <button @click=${() => this._emit('ll-seek-forward')}>Fwd →</button>
          <span class="sep">|</span>
          <span class="time-display">
            ${this._fmt(this.currentTime)} / ${this._fmt(this.duration)}
          </span>
          <span class="sep">|</span>
          <span class="speed-display">${speedPct}</span>
        </div>

        <div class="controls-row">
          <button
            class="btn-loop-toggle ${this.looping ? 'active' : ''}"
            @click=${() => this._emit('ll-toggle-loop')}
          >Loop: ${this.looping ? 'ON' : 'OFF'}</button>
          <span class="sep">|</span>
          <span class="label">Start:</span>
          <input
            ${ref(this._startRef)}
            class="time-input"
            type="text"
            @keydown=${(e) => e.key === 'Enter' && this._submitStart()}
            @blur=${() => this._submitStart()}
          />
          <button @click=${() => this._emit('ll-set-loop-start-now')}>Now</button>
          <span class="sep">|</span>
          <span class="label">End:</span>
          <input
            ${ref(this._endRef)}
            class="time-input"
            type="text"
            @keydown=${(e) => e.key === 'Enter' && this._submitEnd()}
            @blur=${() => this._submitEnd()}
          />
          <button @click=${() => this._emit('ll-set-loop-end-now')}>Now</button>
        </div>

        <div class="controls-row">
          <span class="label">Sections:</span>
          <button @click=${() => this._emit('ll-set-section')}>Set here</button>
          ${this.sections.length === 0
            ? html`<span class="sep">none</span>`
            : html`
              <div class="marks-list">
                ${this.sections.map((s, i) => html`
                  <span class="mark-chip">
                    <span class="mark-label">${s.name || `#${i + 1}`}</span>
                    <span class="mark-time">${this._fmt(s.time)}</span>
                    <button
                      class="btn-delete"
                      title="Delete section"
                      @click=${() => this._emit('ll-delete-section', { id: s.id })}
                    >×</button>
                  </span>
                `)}
              </div>
            `}
        </div>

        <div class="controls-row">
          <span class="label">Marks:</span>
          <button @click=${() => this._emit('ll-set-mark')}>Set here</button>
          ${this.marks.length === 0
            ? html`<span class="sep">none</span>`
            : html`
              <div class="marks-list">
                ${this.marks.map((m, i) => html`
                  <span class="mark-chip">
                    <span class="mark-label">${m.name || `#${i + 1}`}</span>
                    <span class="mark-time">${this._fmt(m.time)}</span>
                    <button
                      class="btn-delete"
                      title="Delete mark"
                      @click=${() => this._emit('ll-delete-mark', { id: m.id })}
                    >×</button>
                  </span>
                `)}
              </div>
            `}
        </div>

        <div class="controls-row">
          <span class="label">Loops:</span>
          <input
            ${ref(this._loopNameRef)}
            class="loop-name-input"
            type="text"
            placeholder="name"
          />
          <button @click=${this._onSaveLoopClick}>Save</button>
          ${this.namedLoops.length === 0
            ? html`<span class="sep">none</span>`
            : html`
              <div class="marks-list">
                ${this.namedLoops.map((l, i) => html`
                  <span class="mark-chip ${l.id === this.loopSource ? 'loaded' : ''}">
                    <span class="mark-label">${l.name || `#${i + 1}`}</span>
                    <span class="mark-time">${this._fmt(l.start)}–${this._fmt(l.end)}</span>
                    <button
                      class="btn-delete"
                      title="Load loop"
                      @click=${() => this._emit('ll-load-loop', { id: l.id })}
                    >load</button>
                    <button
                      class="btn-delete"
                      title="Delete loop"
                      @click=${() => this._emit('ll-delete-loop', { id: l.id })}
                    >×</button>
                  </span>
                `)}
              </div>
            `}
        </div>
      </div>
    `;
  }
}

customElements.define('llama-controls', LlamaControls);
