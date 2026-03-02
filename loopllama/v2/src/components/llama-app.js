// llama-app.js -- top-level component.
//
// NOTE: currently a minimal test harness for Stage 4 (YouTube API
// integration). Will be replaced with real UI in Stage 6.

import { LitElement, html, css } from 'lit';
import { createVideoController } from '../videoController.js';

class LlamaApp extends LitElement {
  static styles = css`
    :host {
      display: block;
      font-family: sans-serif;
      padding: 1rem;
      color: #e0e0e0;
    }
    #player-container {
      width: 640px;
      height: 360px;
      background: #000;
    }
    .controls {
      margin-top: 0.5rem;
      display: flex;
      gap: 0.5rem;
      align-items: center;
      flex-wrap: wrap;
    }
    .status {
      margin-top: 0.5rem;
      font-size: 0.9rem;
      color: #aaa;
    }
  `;

  static properties = {
    currentTime: { type: Number },
    duration:    { type: Number },
    statusMsg:   { type: String },
  };

  constructor() {
    super();
    this.currentTime = 0;
    this.duration    = null;
    this.statusMsg   = 'Initializing...';
    this._vc         = null;
    this._pollId     = null;
  }

  async firstUpdated() {
    const container = this.renderRoot.querySelector('#player-container');
    this._vc = createVideoController({
      onReady: () => {
        this.statusMsg = 'Player ready. Enter a YouTube video ID and click Load.';
      },
      onStateChange: (state) => {
        const labels = { '-1': 'unstarted', 0: 'ended', 1: 'playing',
                          2: 'paused', 3: 'buffering', 5: 'cued' };
        console.log('Player state:', labels[state] ?? state);
      },
    });
    await this._vc.initialize(container);

    // Expose for console testing in dev mode.
    if (import.meta.env.DEV) window._ll.vc = this._vc;

    // Poll playback position every 500ms to update the display.
    this._pollId = setInterval(() => {
      this.currentTime = this._vc.getCurrentTime();
      const dur = this._vc.getDuration();
      if (dur !== null) this.duration = dur;
    }, 500);
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    clearInterval(this._pollId);
  }

  _load() {
    const input = this.renderRoot.querySelector('#vid-input');
    const vid = input.value.trim();
    if (!vid) return;
    this._vc.loadVideo(vid);
    this.duration  = null;
    this.statusMsg = `Loading: ${vid}`;
  }

  _seek(delta) {
    this._vc?.seekTo((this._vc.getCurrentTime() ?? 0) + delta);
  }

  _fmt(secs) {
    if (secs == null) return '?';
    const m = Math.floor(secs / 60);
    const s = (secs % 60).toFixed(1).padStart(4, '0');
    return `${m}:${s}`;
  }

  render() {
    return html`
      <div id="player-container"></div>
      <div class="controls">
        <input id="vid-input" type="text" placeholder="YouTube video ID" size="20" />
        <button @click=${this._load}>Load</button>
        <button @click=${() => this._vc?.play()}>Play</button>
        <button @click=${() => this._vc?.pause()}>Pause</button>
        <button @click=${() => this._vc?.seekTo(0)}>|&#x25C0; Start</button>
        <button @click=${() => this._seek(-5)}>&#x25C2;&#x25C2; -5s</button>
        <button @click=${() => this._seek(5)}>+5s &#x25B8;&#x25B8;</button>
      </div>
      <div class="status">
        ${this.statusMsg}
        &nbsp;|&nbsp;
        ${this._fmt(this.currentTime)} / ${this._fmt(this.duration)}
      </div>
    `;
  }
}

customElements.define('llama-app', LlamaApp);
