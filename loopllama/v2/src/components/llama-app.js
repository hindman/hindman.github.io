// llama-app.js -- top-level component.

import { LitElement, html, css } from 'lit';
import { createVideoController }    from '../videoController.js';
import { createKeyboardController } from '../keyboardController.js';
import { DEFAULT_OPTIONS }          from '../state.js';
import './llama-whichkey.js';
import './llama-controls.js';

class LlamaApp extends LitElement {
  static styles = css`
    :host {
      display: block;
      font-family: var(--ll-font-sans, sans-serif);
      color: var(--ll-text, #e0e0e0);
    }

    /* --- Header --- */
    .app-header {
      display: flex;
      align-items: center;
      padding: var(--ll-pad, 0.5rem) var(--ll-pad-lg, 1rem);
      background: var(--ll-surface-raised, #2a2a2a);
      border-top: 3px solid var(--ll-accent, #7ec8e3);
      border-bottom: 1px solid var(--ll-border, #444);
    }

    .app-title {
      font-size: var(--ll-text-xl, 1.4rem);
      font-weight: bold;
      color: var(--ll-text, #e0e0e0);
      white-space: nowrap;
    }

    .header-nav {
      margin-left: auto;
      display: flex;
      align-items: center;
      gap: var(--ll-gap, 0.5rem);
      font-size: var(--ll-text-base, 1.05rem);
    }

    .nav-link {
      color: var(--ll-text-dim, #aaa);
      text-decoration: none;
    }

    .nav-link:hover {
      color: var(--ll-accent, #7ec8e3);
    }

    .nav-sep {
      color: var(--ll-text-muted, #666);
    }

    /* --- URL bar (temporary until url-input-modal, Stage 9a) --- */
    .url-bar {
      display: flex;
      align-items: center;
      gap: var(--ll-gap, 0.5rem);
      padding: var(--ll-gap, 0.5rem) var(--ll-pad-lg, 1rem);
      background: var(--ll-surface, #252525);
      border-bottom: 1px solid var(--ll-border, #444);
    }

    .url-input {
      flex: 1;
      max-width: 500px;
      padding: 0.3rem 0.5rem;
      background: var(--ll-surface-raised, #333);
      border: 1px solid var(--ll-border, #444);
      color: var(--ll-text, #e0e0e0);
      border-radius: var(--ll-radius, 3px);
      font-size: var(--ll-text-sm, 0.85rem);
    }

    .url-input:focus {
      outline: none;
      border-color: var(--ll-accent, #7ec8e3);
    }

    /* --- Body --- */
    .app-body {
      display: flex;
      flex-direction: column;
      gap: var(--ll-gap, 0.5rem);
      padding: var(--ll-pad, 0.5rem);
    }

    /* --- Main row: video + message --- */
    .app-main {
      display: flex;
      gap: var(--ll-gap, 0.5rem);
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
      background: var(--ll-surface, #252525);
      border: 1px solid var(--ll-border, #444);
      border-radius: var(--ll-radius, 3px);
      padding: var(--ll-pad, 0.5rem);
      font-size: var(--ll-text-sm, 0.85rem);
      color: var(--ll-text-dim, #aaa);
    }

    /* --- Placeholder areas --- */
    .timeline-placeholder {
      height: 40px;
      background: var(--ll-surface, #252525);
      border: 1px solid var(--ll-border, #444);
      border-radius: var(--ll-radius, 3px);
      padding: 0 0.75rem;
      font-size: var(--ll-text-sm, 0.85rem);
      color: var(--ll-text-muted, #555);
      display: flex;
      align-items: center;
    }
  `;

  static properties = {
    currentTime:   { type: Number },
    duration:      { type: Number },
    speed:         { type: Number },
    isPlaying:     { type: Boolean },
    statusMsg:     { type: String },
    wkPrefix:      { type: String },
    wkCompletions: { type: Object },
    windowFocused: { type: Boolean },
  };

  constructor() {
    super();
    this.currentTime   = 0;
    this.duration      = null;
    this.speed         = 1;
    this.isPlaying     = false;
    this.statusMsg     = 'Initializing...';
    this.wkPrefix      = null;
    this.wkCompletions = null;
    this.windowFocused = true;
    this._vc           = null;
    this._kb           = null;
    this._pollId       = null;
    this.seekDelta     = DEFAULT_OPTIONS.seek_delta_default;
    this.speedDelta    = DEFAULT_OPTIONS.speed_delta;
  }

  // Clamp speed to [0.25, 2.0] and set it. Rounds to avoid float drift.
  _speedChange(delta) {
    const current = this._vc?.getPlaybackRate() ?? 1;
    const next    = Math.round((current + delta) * 100) / 100;
    const clamped = Math.max(0.25, Math.min(2.0, next));
    this._vc?.setPlaybackRate(clamped);
    this.speed = clamped;
  }

  // Handlers for Stage 5+. Core playback handlers implemented in Stage 6e.
  _makeHandlers() {
    const stub = (name) => () => console.log(`[kb] ${name}`);
    return {
      playPause:     () => this._onPlayPause(),
      speedDown:     () => this._speedChange(-this.speedDelta),
      speedUp:       () => this._speedChange(this.speedDelta),
      speedReset:    () => { this._vc?.setPlaybackRate(1.0); this.speed = 1.0; },
      seekForward:   () => this._onSeekForward(),
      seekBack:      () => this._onSeekBack(),
      seekDeltaDown: stub('seekDeltaDown'),
      seekDeltaUp:   stub('seekDeltaUp'),
      prevEntity:    stub('prevEntity'),
      entityType:    stub('entityType'),
      nextEntity:    stub('nextEntity'),
      jumpToStart:   () => this._vc?.seekTo(0),
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

    // Restore and auto-load the last video (dev convenience; removed in Stage 9a).
    const lastUrl = localStorage.getItem('ll_last_url');
    if (lastUrl) {
      this.renderRoot.querySelector('.url-input').value = lastUrl;
      this._load();
    }

    // Poll playback state every 500ms to keep the controls display live.
    this._pollId = setInterval(() => {
      this.currentTime = this._vc.getCurrentTime();
      this.isPlaying   = this._vc.isPlaying();
      this.speed       = this._vc.getPlaybackRate();
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
    localStorage.setItem('ll_last_url', raw);
  }

  _seek(delta) {
    this._vc?.seekTo((this._vc.getCurrentTime() ?? 0) + delta);
  }

  _onPlayPause() {
    if (this._vc?.isPlaying()) {
      this._vc.pause();
    } else {
      this._vc?.play();
    }
  }

  _onSeekForward() {
    this._seek(this.seekDelta);
  }

  _onSeekBack() {
    this._seek(-this.seekDelta);
  }

  render() {
    return html`
      <header class="app-header">
        <span class="app-title">LoopLlama</span>
        <nav class="header-nav">
          <a class="nav-link" href="https://hindman.github.io/" target="_blank" rel="noopener">The Fifth Fret</a>
          <span class="nav-sep">|</span>
          <a class="nav-link" href="https://github.com/hindman/hindman.github.io/tree/master/loopllama" target="_blank" rel="noopener">Code</a>
        </nav>
      </header>

      <div class="url-bar">
        <input
          class="url-input"
          type="text"
          placeholder="YouTube URL or video ID"
          @keydown=${(e) => e.key === 'Enter' && this._load()}
        />
        <button @click=${this._load}>Load</button>
      </div>

      <div class="app-body">
        <div class="app-main">
          <div class="video-area">
            <div id="player-container"></div>
          </div>
          <div class="message-area">
            <div>${this.statusMsg}</div>
          </div>
        </div>

        <div class="timeline-placeholder">Timeline — Stage 8</div>
        <llama-controls
          .currentTime=${this.currentTime}
          .duration=${this.duration}
          .speed=${this.speed}
          .isPlaying=${this.isPlaying}
          @ll-play-pause=${this._onPlayPause}
          @ll-seek-forward=${this._onSeekForward}
          @ll-seek-back=${this._onSeekBack}
        ></llama-controls>
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
