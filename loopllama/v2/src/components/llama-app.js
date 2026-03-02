// llama-app.js -- top-level component.

import { LitElement, html, css } from 'lit';
import { createVideoController }    from '../videoController.js';
import { createKeyboardController } from '../keyboardController.js';
import './llama-whichkey.js';

class LlamaApp extends LitElement {
  static styles = css`
    :host {
      display: block;
      font-family: sans-serif;
      color: #e0e0e0;
    }

    /* --- Header --- */
    .app-header {
      display: flex;
      align-items: center;
      gap: 0.75rem;
      padding: 0.5rem 1rem;
      background: #2a2a2a;
      border-bottom: 1px solid #444;
    }

    .app-title {
      font-size: 1.1rem;
      font-weight: bold;
      color: #fff;
      white-space: nowrap;
    }

    .url-input {
      flex: 1;
      max-width: 500px;
      padding: 0.3rem 0.5rem;
      background: #333;
      border: 1px solid #555;
      color: #e0e0e0;
      border-radius: 3px;
      font-size: 0.9rem;
    }

    .url-input:focus {
      outline: none;
      border-color: #7ec8e3;
    }

    /* --- Body --- */
    .app-body {
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
      padding: 0.5rem;
    }

    /* --- Main row: video + message --- */
    .app-main {
      display: flex;
      gap: 0.5rem;
    }

    .video-area {
      flex: 1;
      min-width: 0;
    }

    #player-container {
      width: 100%;
      aspect-ratio: 16 / 9;
      background: #000;
    }

    .message-area {
      width: 220px;
      flex-shrink: 0;
      background: #252525;
      border: 1px solid #444;
      border-radius: 3px;
      padding: 0.5rem;
      font-size: 0.85rem;
      color: #aaa;
    }

    .message-time {
      margin-top: 0.5rem;
      font-family: monospace;
      font-size: 0.9rem;
      color: #7ec8e3;
    }

    /* --- Placeholder areas --- */
    .timeline-placeholder,
    .controls-placeholder {
      background: #252525;
      border: 1px solid #444;
      border-radius: 3px;
      padding: 0 0.75rem;
      font-size: 0.8rem;
      color: #555;
      display: flex;
      align-items: center;
    }

    .timeline-placeholder {
      height: 40px;
    }

    .controls-placeholder {
      height: 80px;
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
        this.statusMsg = 'Player ready. Enter a YouTube URL or video ID above.';
      },
      onStateChange: (state) => {
        const labels = {
          '-1': 'Unstarted', 0: 'Ended', 1: 'Playing',
          2: 'Paused', 3: 'Buffering', 5: 'Cued',
        };
        this.statusMsg = labels[state] ?? `State: ${state}`;
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

  // Parse a YouTube URL or bare video ID.
  // Returns { id, startTime } or null if the input is not recognizable.
  _parseVideoInput(str) {
    str = str.trim();
    if (!str) return null;

    // Check for bare video ID first (11 YouTube-valid chars). Must come
    // before URL parsing: new URL('https://' + bareId) succeeds because
    // the browser treats the ID as a valid hostname.
    if (/^[A-Za-z0-9_-]{11}$/.test(str)) {
      return { id: str, startTime: 0 };
    }

    let url;
    try {
      url = new URL(str.startsWith('http') ? str : 'https://' + str);
    } catch (_) {
      return null;
    }

    const params    = url.searchParams;
    const startTime = this._parseTimeParam(params.get('t') ?? '');

    // watch?v=ID  (standard watch URL)
    let id = params.get('v') ?? null;

    if (!id) {
      // youtu.be/ID  |  youtube.com/shorts/ID  |  youtube.com/embed/ID
      const parts = url.pathname.split('/').filter(Boolean);
      id = parts[parts.length - 1] ?? null;
    }

    return id ? { id, startTime } : null;
  }

  // Parse a YouTube `t` parameter to seconds.
  // Handles plain numbers ("354") and hms notation ("1h23m45s").
  _parseTimeParam(t) {
    if (!t) return 0;
    const n = Number(t);
    if (!isNaN(n)) return n;
    let total = 0;
    const h = t.match(/(\d+)h/);
    const m = t.match(/(\d+)m/);
    const s = t.match(/(\d+(?:\.\d+)?)s/);
    if (h) total += parseInt(h[1]) * 3600;
    if (m) total += parseInt(m[1]) * 60;
    if (s) total += parseFloat(s[1]);
    return total;
  }

  _load() {
    const input = this.renderRoot.querySelector('.url-input');
    const raw = input.value.trim();
    if (!raw) return;

    const parsed = this._parseVideoInput(raw);
    if (!parsed) {
      this.statusMsg = 'Could not parse a YouTube video ID from that input.';
      return;
    }

    this._vc.loadVideo(parsed.id, parsed.startTime);
    this.duration  = null;
    this.statusMsg = `Loading: ${parsed.id}`;
  }

  _seek(delta) {
    this._vc?.seekTo((this._vc.getCurrentTime() ?? 0) + delta);
  }

  _fmt(secs) {
    if (secs == null) return '?';
    const m = Math.floor(secs / 60);
    const s = Math.floor(secs % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
  }

  render() {
    return html`
      <header class="app-header">
        <span class="app-title">LoopLlama</span>
        <input
          class="url-input"
          type="text"
          placeholder="YouTube URL or video ID"
          @keydown=${(e) => e.key === 'Enter' && this._load()}
        />
        <button @click=${this._load}>Load</button>
      </header>

      <div class="app-body">
        <div class="app-main">
          <div class="video-area">
            <div id="player-container"></div>
          </div>
          <div class="message-area">
            <div>${this.statusMsg}</div>
            <div class="message-time">
              ${this._fmt(this.currentTime)} / ${this._fmt(this.duration)}
            </div>
          </div>
        </div>

        <div class="timeline-placeholder">Timeline — Stage 8</div>
        <div class="controls-placeholder">Controls — Stage 6c</div>
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
