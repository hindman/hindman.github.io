// llama-controls.js -- playback controls display.
//
// Receives:
//   currentTime: Number   -- current playback position (seconds)
//   duration:    Number   -- total video duration (seconds), or null
//   speed:       Number   -- playback speed (e.g. 1.0 = 100%)
//   isPlaying:   Boolean  -- true while the video is playing
//
// Fires (bubbles + composed):
//   ll-play-pause    -- toggle play/pause
//   ll-seek-forward  -- seek forward by current seek delta
//   ll-seek-back     -- seek back by current seek delta

import { LitElement, html, css } from 'lit';

class LlamaControls extends LitElement {
  static styles = css`
    :host {
      display: block;
    }

    .controls {
      display: flex;
      align-items: center;
      gap: var(--ll-gap, 0.5rem);
      padding: var(--ll-pad, 0.5rem) var(--ll-pad-lg, 1rem);
      background: var(--ll-surface, #252525);
      border: 1px solid var(--ll-border, #444);
      border-radius: var(--ll-radius, 3px);
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

    .btn-play-pause {
      min-width: 4.5rem;
    }

    button:hover {
      border-color: var(--ll-accent, #7ec8e3);
      color: var(--ll-accent, #7ec8e3);
    }

    .sep {
      color: var(--ll-text-muted, #666);
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
  `;

  static properties = {
    currentTime: { type: Number },
    duration:    { type: Number },
    speed:       { type: Number },
    isPlaying:   { type: Boolean },
  };

  constructor() {
    super();
    this.currentTime = 0;
    this.duration    = null;
    this.speed       = 1;
    this.isPlaying   = false;
  }

  _fmt(secs) {
    if (secs == null) return '?';
    const m = Math.floor(secs / 60);
    const s = Math.floor(secs % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
  }

  _emit(name) {
    this.dispatchEvent(new CustomEvent(name, { bubbles: true, composed: true }));
  }

  render() {
    const speedPct = `${(this.speed * 100).toFixed(0)}%`;
    return html`
      <div class="controls">
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
    `;
  }
}

customElements.define('llama-controls', LlamaControls);
