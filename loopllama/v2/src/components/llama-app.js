// llama-app.js -- top-level component.
//
// NOTE: video controls area is still a minimal Stage 4 test harness.
// Will be replaced with real UI in Stage 6.

import { LitElement, html, css } from 'lit';
import { createVideoController }    from '../videoController.js';
import { createKeyboardController } from '../keyboardController.js';
import './llama-whichkey.js';

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
    currentTime:   { type: Number },
    duration:      { type: Number },
    statusMsg:     { type: String },
    wkPrefix:      { type: String },
    wkCompletions: { type: Object },
    windowFocused: { type: Boolean },
  };

  constructor() {
    super();
    this.currentTime   = 0;
    this.duration      = null;
    this.statusMsg     = 'Initializing...';
    this.wkPrefix      = null;
    this.wkCompletions = null;
    this.windowFocused = true;
    this._vc           = null;
    this._kb           = null;
    this._pollId       = null;
  }

  // Stub handlers for Stage 5. Real implementations added in Stage 6+.
  _makeHandlers() {
    const stub = (name) => () => console.log(`[kb] ${name}`);
    return {
      playPause:     stub('playPause'),
      speedDown:     stub('speedDown'),
      speedUp:       stub('speedUp'),
      speedReset:    stub('speedReset'),
      seekForward:   stub('seekForward'),
      seekBack:      stub('seekBack'),
      seekDeltaDown: stub('seekDeltaDown'),
      seekDeltaUp:   stub('seekDeltaUp'),
      prevEntity:    stub('prevEntity'),
      entityType:    stub('entityType'),
      nextEntity:    stub('nextEntity'),
      jumpToStart:   stub('jumpToStart'),
      setLoopStart:  stub('setLoopStart'),
      setLoopEnd:    stub('setLoopEnd'),
      undo:          stub('undo'),
      redo:          stub('redo'),
      helpKeys:      stub('helpKeys'),
      options:       stub('options'),
      videoUrl:      stub('videoUrl'),
      videoPicker:   stub('videoPicker'),
      editVideo:     stub('editVideo'),
      deleteVideo:   stub('deleteVideo'),
      jumpTime:      stub('jumpTime'),
      jumpSection:   stub('jumpSection'),
      jumpLoop:      stub('jumpLoop'),
      jumpMark:      stub('jumpMark'),
      jumpHistory:   stub('jumpHistory'),
      jumpBack:      stub('jumpBack'),
      jumpForward:   stub('jumpForward'),
      toggleLoop:    stub('toggleLoop'),
      openLoop:      stub('openLoop'),
      saveLoop:      stub('saveLoop'),
      saveBack:      stub('saveBack'),
      editScratch:   stub('editScratch'),
      deleteLoop:    stub('deleteLoop'),
      setSection:    stub('setSection'),
      editSection:   stub('editSection'),
      loopSection:   stub('loopSection'),
      deleteSection: stub('deleteSection'),
      setMark:       stub('setMark'),
      editMark:      stub('editMark'),
      deleteMark:    stub('deleteMark'),
      helpGeneral:   stub('helpGeneral'),
      deleteData:    stub('deleteData'),
      exportAll:     stub('exportAll'),
      importData:    stub('importData'),
      inspectData:   stub('inspectData'),
      shareVideo:    stub('shareVideo'),
      shareLoop:     stub('shareLoop'),
    };
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

    this._kb = createKeyboardController(
      this._makeHandlers(),
      {
        onPendingKey: (prefix, completions) => {
          this.wkPrefix      = prefix;
          this.wkCompletions = completions;
        },
      }
    );

    window.addEventListener('blur',  () => { this.windowFocused = false; });
    window.addEventListener('focus', () => { this.windowFocused = true; });

    // Poll playback position every 500ms to update the display.
    this._pollId = setInterval(() => {
      this.currentTime = this._vc.getCurrentTime();
      const dur = this._vc.getDuration();
      if (dur !== null) this.duration = dur;
    }, 500);

    // Expose for console testing in dev mode.
    if (import.meta.env.DEV) {
      window._ll.vc = this._vc;
      window._ll.kb = this._kb;
    }
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    clearInterval(this._pollId);
    this._kb?.destroy();
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
      <llama-whichkey
        .prefix=${this.wkPrefix}
        .completions=${this.wkCompletions}
        .windowFocused=${this.windowFocused}
      ></llama-whichkey>
    `;
  }
}

customElements.define('llama-app', LlamaApp);
