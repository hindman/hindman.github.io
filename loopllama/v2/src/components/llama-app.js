// llama-app.js -- top-level component.

import { LitElement, html, css } from 'lit';
import { createVideoController }    from '../videoController.js';
import { createKeyboardController } from '../keyboardController.js';
import {
  DEFAULT_OPTIONS,
  createVideo, createAppState, createScratchLoop,
  addMark, deleteMarkById,
  addSection, deleteSectionById, getSectionBounds,
  addLoop, deleteLoopById,
} from '../state.js';
import { load, save } from '../storage.js';
import './llama-whichkey.js';
import './llama-controls.js';
import './llama-timeline.js';
import './llama-url-input-modal.js';
import './llama-video-picker.js';
import './llama-edit-video-modal.js';
import './llama-save-loop-modal.js';
import './llama-loop-picker.js';

const EDIT_SCRATCH_DELTAS = [0.1, 1, 5, 10, 30];

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

    .video-col {
      flex: 1;
      min-width: 0;
      display: flex;
      flex-direction: column;
      gap: var(--ll-gap, 0.5rem);
    }

    #player-container {
      width: 100%;
      aspect-ratio: 16 / 9;
      max-height: 40vh;     /* temporary: cap height so controls stay visible */
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

    /* --- Edit-scratch-loop mode panel (shown in message area) --- */
    .edit-mode-panel {
      display: flex;
      flex-direction: column;
      gap: 0.25rem;
    }

    .edit-mode-title {
      font-weight: bold;
      color: var(--ll-accent-warm, #e3a857);
      margin-bottom: 0.1rem;
    }

    .edit-mode-focus {
      color: var(--ll-accent-warm, #e3a857);
      font-weight: bold;
    }

    .edit-mode-keys {
      margin-top: 0.3rem;
      line-height: 1.7;
      color: var(--ll-text-muted, #666);
    }

  `;

  static properties = {
    currentTime:     { type: Number },
    duration:        { type: Number },
    speed:           { type: Number },
    isPlaying:       { type: Boolean },
    looping:         { type: Boolean },
    loopStart:       { type: Number },
    loopEnd:         { type: Number },
    sections:        { type: Array },
    marks:           { type: Array },
    namedLoops:      { type: Array },
    loopSource:      { type: String },
    statusMsg:       { type: String },
    wkPrefix:        { type: String },
    wkCompletions:   { type: Object },
    windowFocused:   { type: Boolean },
    editScratchActive:  { type: Boolean },
    editScratchFocus:   { type: String },
    editScratchDelta:   { type: Number },
    loopViolation:      { type: Boolean },
    videos:             { type: Array },
    currentVideoId:     { type: String },
  };

  constructor() {
    super();
    this.currentTime   = 0;
    this.duration      = null;
    this.speed         = 1;
    this.isPlaying     = false;
    this.looping       = false;
    this.loopStart     = 0;
    this.loopEnd       = 0;
    this.sections      = [];
    this.marks         = [];
    this.namedLoops    = [];
    this.loopSource    = null;
    this.statusMsg     = 'Initializing...';
    this.wkPrefix            = null;
    this.wkCompletions       = null;
    this.windowFocused       = true;
    this.editScratchActive   = false;
    this.editScratchFocus    = 'start';
    this.editScratchDelta    = EDIT_SCRATCH_DELTAS[2];
    this.loopViolation       = false;
    this.videos              = [];
    this.currentVideoId      = null;
    this._vc                 = null;
    this._kb                 = null;
    this._pollId             = null;
    this._editScratchHandler = null;
    this._appState           = null;
    this._urlInputModalEl    = null;
    this._videoPickerEl      = null;
    this._editVideoModalEl   = null;
    this._saveLoopModalEl    = null;
    this._loopPickerEl       = null;
    this.seekDelta     = DEFAULT_OPTIONS.seek_delta_default;
    this.speedDelta    = DEFAULT_OPTIONS.speed_delta;
  }

  // Sync per-video state from a Video object into reactive props.
  _syncFromVideo(video) {
    this.sections   = [...(video.sections ?? [])];
    this.marks      = [...(video.marks    ?? [])];
    this.namedLoops = (video.loops ?? []).filter(l => !l.is_scratch);
    const scratch   = (video.loops ?? []).find(l => l.is_scratch);
    this.loopStart  = scratch?.start ?? 0;
    this.loopEnd    = scratch?.end   ?? 0;
    this.looping    = false;
    this.loopSource = null;
    this.speed      = video.speed ?? 1.0;
    this._vc?.setPlaybackRate(this.speed);
  }

  // Persist current reactive state back to the current video and save to
  // localStorage. Call after any mutation to sections, marks, or namedLoops.
  _saveCurrentState() {
    const video = this._appState?.videos.find(v => v.id === this.currentVideoId);
    if (!video) return;
    video.sections = this.sections;
    video.marks    = this.marks;
    video.time     = this.currentTime;
    // Update scratch loop endpoints.
    let scratch = video.loops?.find(l => l.is_scratch);
    if (!scratch) {
      scratch = createScratchLoop();
    }
    scratch.start = this.loopStart;
    scratch.end   = this.loopEnd;
    video.loops = [scratch, ...this.namedLoops];
    save(this._appState);
  }

  // Load a Video object: save current state, switch to new video, restore state.
  _loadVideoObject(video, startTime = null) {
    this._saveCurrentState();
    this._appState.currentVideoId = video.id;
    this.currentVideoId = video.id;
    this._syncFromVideo(video);
    this._vc.loadVideo(video.id, startTime ?? video.time ?? 0);
    this.duration  = null;
    this.statusMsg = `Loading: ${video.id}`;
    save(this._appState);
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
      jumpToStart:   () => this._vc?.seekTo(this.looping ? this.loopStart : 0),
      setLoopStart:  () => { this.loopStart = this._vc?.getCurrentTime() ?? 0; this._autoDisableLoopIfInvalid(); },
      setLoopEnd:    () => { this.loopEnd   = this._vc?.getCurrentTime() ?? 0; this._autoDisableLoopIfInvalid(); },
      undo:          stub('undo'),
      redo:          stub('redo'),
      helpKeys:      stub('helpKeys'),
      options:       stub('options'),
      videoUrl:      () => this._urlInputModalEl?.show(),
      videoPicker:   () => this._videoPickerEl?.show(),
      editVideo:     () => this._editVideoModalEl?.show(),
      deleteVideo:   stub('deleteVideo'),
      jumpTime:      stub('jumpTime'),
      jumpSection:   stub('jumpSection'),
      jumpLoop:      stub('jumpLoop'),
      jumpMark:      stub('jumpMark'),
      jumpHistory:   stub('jumpHistory'),
      jumpBack:      stub('jumpBack'),
      jumpForward:   stub('jumpForward'),
      toggleLoop: () => {
        if (!this.looping && !this._isLoopValid()) {
          this._flashLoopViolation();
          this.statusMsg = 'Invalid loop range: start must be before end.';
          return;
        }
        this.looping = !this.looping;
      },
      saveLoop: () => this._saveLoopModalEl?.show(),
      openLoop: () => {
        if (!this.namedLoops.length) {
          this.statusMsg = 'No saved loops.';
          return;
        }
        this._loopPickerEl?.show();
      },
      saveBack: () => {
        if (!this.loopSource) {
          this.statusMsg = 'No source loop to save back to.';
          return;
        }
        const idx = this.namedLoops.findIndex(l => l.id === this.loopSource);
        if (idx === -1) {
          this.statusMsg = 'Source loop not found.';
          return;
        }
        this.namedLoops[idx].start = this.loopStart;
        this.namedLoops[idx].end   = this.loopEnd;
        this.namedLoops = [...this.namedLoops];
        this.statusMsg  = 'Saved back to source loop.';
        this._saveCurrentState();
      },
      editScratch: () => this._enterEditScratch(),
      deleteLoop: () => { this.statusMsg = 'Loop delete: not yet implemented.'; },
      setSection: () => {
        addSection(this.sections, this._vc?.getCurrentTime() ?? 0);
        this.sections = [...this.sections];
        this._saveCurrentState();
      },
      editSection:   stub('editSection'),
      loopSection: () => {
        const bounds = getSectionBounds(this.sections, this.currentTime, this.duration);
        if (!bounds || bounds.end == null) {
          this.statusMsg = 'No section at current position.';
          return;
        }
        const padStart   = DEFAULT_OPTIONS.section_loop_pad_start;
        const padEnd     = DEFAULT_OPTIONS.section_loop_pad_end;
        this.loopStart   = Math.max(0, bounds.start - padStart);
        this.loopEnd     = bounds.end + padEnd;
        this.looping     = true;
        this.statusMsg   = 'Looping section.';
      },
      deleteSection: () => { this.statusMsg = 'Section delete: not yet implemented.'; },
      setMark: () => {
        addMark(this.marks, this._vc?.getCurrentTime() ?? 0);
        this.marks = [...this.marks];
        this._saveCurrentState();
      },
      editMark: stub('editMark'),
      deleteMark: () => { this.statusMsg = 'Mark delete: not yet implemented.'; },
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
    // Load persistent state.
    this._appState      = load() ?? createAppState();
    this.videos         = this._appState.videos;
    this.currentVideoId = this._appState.currentVideoId;

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

    this._urlInputModalEl  = this.renderRoot.querySelector('llama-url-input-modal');
    this._videoPickerEl    = this.renderRoot.querySelector('llama-video-picker');
    this._editVideoModalEl = this.renderRoot.querySelector('llama-edit-video-modal');
    this._saveLoopModalEl  = this.renderRoot.querySelector('llama-save-loop-modal');
    this._loopPickerEl     = this.renderRoot.querySelector('llama-loop-picker');

    window.addEventListener('blur',  () => { this.windowFocused = false; });
    window.addEventListener('focus', () => { this.windowFocused = true; });

    // Restore the last-used video on startup -- cue without auto-playing.
    if (this._appState.currentVideoId) {
      const video = this._appState.videos.find(v => v.id === this._appState.currentVideoId);
      if (video) {
        this._syncFromVideo(video);
        this._vc.cueVideo(video.id, video.time ?? 0);
        this.statusMsg = `Video cued: ${video.name || video.id}`;
      }
    }

    // Poll playback state every 500ms to keep the controls display live.
    this._pollId = setInterval(() => {
      const t = this._vc.getCurrentTime();
      this.currentTime = t;
      this.isPlaying   = this._vc.isPlaying();
      this.speed       = this._vc.getPlaybackRate();
      const dur = this._vc.getDuration();
      if (dur !== null) this.duration = dur;

      // Loop enforcement: when looping is on and playhead reaches the end
      // point, seek back to the start point.
      if (this.looping && this.loopStart < this.loopEnd
          && t !== null && t >= this.loopEnd) {
        this._vc.seekTo(this.loopStart);
      }
    }, 500);

    // Expose for console testing in dev mode.
    if (import.meta.env.DEV) {
      window._ll.vc = this._vc;
      window._ll.kb = this._kb;
    }
  }

  _enterEditScratch() {
    this._kb.disable();
    this.editScratchActive   = true;
    this.editScratchFocus    = 'start';
    this.editScratchDelta    = EDIT_SCRATCH_DELTAS[2];
    this._editScratchHandler = (e) => this._editScratchKeyDown(e);
    document.addEventListener('keydown', this._editScratchHandler);
  }

  _exitEditScratch() {
    document.removeEventListener('keydown', this._editScratchHandler);
    this._editScratchHandler = null;
    this.editScratchActive   = false;
    this._kb.enable();
  }

  _editScratchKeyDown(event) {
    const target = event.composedPath()[0];
    const tag    = target?.tagName;
    if (tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'SELECT') return;
    if (target?.isContentEditable) return;

    const key = event.key;

    // Digit, colon, or slash: focus the active endpoint input for direct
    // time entry. Don't preventDefault -- let the browser type the character
    // into the now-focused input.
    if (/^[0-9:/]$/.test(key)) {
      const controls = this.renderRoot.querySelector('llama-controls');
      if (this.editScratchFocus === 'start') {
        controls?.focusStartInput();
      } else {
        controls?.focusEndInput();
      }
      return;
    }

    if (key === 'Tab') {
      event.preventDefault();
      this.editScratchFocus = this.editScratchFocus === 'start' ? 'end' : 'start';
      return;
    }

    if (key === 'ArrowLeft' || key === 'ArrowRight') {
      event.preventDefault();
      const delta = (key === 'ArrowRight' ? 1 : -1) * this.editScratchDelta;
      const maxT  = this.duration ?? Infinity;
      if (this.editScratchFocus === 'start') {
        this.loopStart = Math.max(0, Math.min(this.loopStart + delta, maxT));
      } else {
        this.loopEnd = Math.max(0, Math.min(this.loopEnd + delta, maxT));
      }
      this._autoDisableLoopIfInvalid();
      return;
    }

    if (key === 'ArrowUp' || key === 'ArrowDown') {
      event.preventDefault();
      const idx = EDIT_SCRATCH_DELTAS.indexOf(this.editScratchDelta);
      if (key === 'ArrowUp') {
        this.editScratchDelta = EDIT_SCRATCH_DELTAS[Math.min(idx + 1, EDIT_SCRATCH_DELTAS.length - 1)];
      } else {
        this.editScratchDelta = EDIT_SCRATCH_DELTAS[Math.max(idx - 1, 0)];
      }
      return;
    }

    if (key === ' ') {
      event.preventDefault();
      const seekTo = this.editScratchFocus === 'start'
        ? this.loopStart
        : Math.max(0, this.loopEnd - 3);
      this._vc?.seekTo(seekTo);
      this._onPlayPause();
      return;
    }

    if (key === 'Backspace') {
      event.preventDefault();
      if (this.editScratchFocus === 'start') {
        this.loopStart = 0;
      } else {
        this.loopEnd = this.duration ?? 0;
      }
      this._autoDisableLoopIfInvalid();
      return;
    }

    if (key === 'Enter' || key === 'Escape') {
      event.preventDefault();
      this._exitEditScratch();
    }
  }

  _renderEditScratchPanel() {
    const focusLabel = this.editScratchFocus === 'start' ? 'Start' : 'End';
    return html`
      <div class="edit-mode-panel">
        <div class="edit-mode-title">Edit Loop</div>
        <div>Focus: <span class="edit-mode-focus">${focusLabel}</span></div>
        <div>Delta: ${this.editScratchDelta}s</div>
        <div class="edit-mode-keys">
          Tab: toggle focus<br>
          ←/→: nudge<br>
          ↑/↓: delta<br>
          Space: play/pause<br>
          Bsp: reset<br>
          0-9/: type time<br>
          Enter/Esc: done
        </div>
      </div>
    `;
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    clearInterval(this._pollId);
    this._kb?.destroy();
    if (this._editScratchHandler) {
      document.removeEventListener('keydown', this._editScratchHandler);
    }
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

  _loadUrl(raw) {
    raw = raw.trim();
    if (!raw) return;

    const parsed = this._parseVideoInput(raw);
    if (!parsed) {
      this.statusMsg = 'Could not parse a YouTube video ID from that input.';
      return;
    }

    // Find or create a video entry in the registry.
    let video = this._appState.videos.find(v => v.id === parsed.id);
    if (!video) {
      video = createVideo(raw, parsed.id);
      this._appState.videos.push(video);
      this.videos = [...this._appState.videos];
    }

    this._loadVideoObject(video, parsed.startTime);
  }

  _onLoadUrl(e) {
    this._loadUrl(e.detail.url);
  }

  // Handle ll-pick-video from the video picker.
  _onPickVideo(e) {
    const video = this._appState?.videos.find(v => v.id === e.detail.videoId);
    if (!video) return;
    this._loadVideoObject(video);
    this.videos = [...this._appState.videos];
  }

  // Handle ll-update-video from the edit-video-modal.
  _onUpdateVideo(e) {
    const { id, name, title, url, start, end } = e.detail;
    const video = this._appState?.videos.find(v => v.id === id);
    if (!video) return;
    video.name  = name;
    video.title = title;
    video.url   = url;
    video.start = start;
    video.end   = end;
    this.videos = [...this._appState.videos];
    save(this._appState);
  }

  // Handle ll-delete-video from the edit-video-modal.
  _onDeleteVideo(e) {
    const { id } = e.detail;
    const idx = this._appState?.videos.findIndex(v => v.id === id);
    if (idx == null || idx === -1) return;
    this._appState.videos.splice(idx, 1);
    if (this.currentVideoId === id) {
      this._appState.currentVideoId = null;
      this.currentVideoId = null;
      this.sections   = [];
      this.marks      = [];
      this.namedLoops = [];
      this.loopStart  = 0;
      this.loopEnd    = 0;
      this.looping    = false;
      this.loopSource = null;
      this.duration   = null;
      this.statusMsg  = 'Video deleted.';
    }
    this.videos = [...this._appState.videos];
    save(this._appState);
  }

  _flashLoopViolation() {
    this.loopViolation = true;
    setTimeout(() => { this.loopViolation = false; }, 600);
  }

  _seek(delta) {
    const t = (this._vc?.getCurrentTime() ?? 0) + delta;
    if (this.looping && this.loopStart < this.loopEnd
        && (t < this.loopStart || t > this.loopEnd)) {
      this._flashLoopViolation();
      return;
    }
    this._vc?.seekTo(t);
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

  _isLoopValid() {
    return this.loopStart < this.loopEnd;
  }

  _autoDisableLoopIfInvalid() {
    if (this.looping && !this._isLoopValid()) this.looping = false;
  }

  _onToggleLoop() {
    if (!this.looping && !this._isLoopValid()) {
      this._flashLoopViolation();
      this.statusMsg = 'Invalid loop range: start must be before end.';
      return;
    }
    this.looping = !this.looping;
  }

  _onSetLoopStartNow() {
    this.loopStart = this.currentTime;
    this._autoDisableLoopIfInvalid();
  }

  _onSetLoopEndNow() {
    this.loopEnd = this.currentTime;
    this._autoDisableLoopIfInvalid();
  }

  _onLoopStartChange(e) {
    this.loopStart = e.detail.value;
    this._autoDisableLoopIfInvalid();
  }

  _onLoopEndChange(e) {
    this.loopEnd = e.detail.value;
    this._autoDisableLoopIfInvalid();
  }

  _onSetSection() {
    addSection(this.sections, this._vc?.getCurrentTime() ?? 0);
    this.sections = [...this.sections];
    this._saveCurrentState();
  }

  _onDeleteSection(e) {
    deleteSectionById(this.sections, e.detail.id);
    this.sections = [...this.sections];
    this._saveCurrentState();
  }

  _onSetMark() {
    addMark(this.marks, this._vc?.getCurrentTime() ?? 0);
    this.marks = [...this.marks];
    this._saveCurrentState();
  }

  _onDeleteMark(e) {
    deleteMarkById(this.marks, e.detail.id);
    this.marks = [...this.marks];
    this._saveCurrentState();
  }

  _onSaveLoop(e) {
    const start = e.detail.start ?? this.loopStart;
    const end   = e.detail.end   ?? this.loopEnd;
    addLoop(this.namedLoops, start, end, e.detail.name);
    this.namedLoops = [...this.namedLoops];
    this.statusMsg  = `Loop saved: ${e.detail.name || 'unnamed'}`;
    this._saveCurrentState();
  }

  _onLoadLoop(e) {
    const loop = this.namedLoops.find(l => l.id === e.detail.id);
    if (!loop) return;
    this.loopStart  = loop.start;
    this.loopEnd    = loop.end;
    this.loopSource = loop.id;
    this.statusMsg  = `Loop loaded: ${loop.name || 'unnamed'}`;
    if (this.looping) this._vc?.seekTo(loop.start);
  }

  _onSeekTo(e) {
    const t = e.detail.time;
    if (this.looping && this.loopStart < this.loopEnd
        && (t < this.loopStart || t > this.loopEnd)) {
      this._flashLoopViolation();
      return;
    }
    this._vc?.seekTo(t);
  }

  _onDeleteLoop(e) {
    deleteLoopById(this.namedLoops, e.detail.id);
    this.namedLoops = [...this.namedLoops];
    if (this.loopSource === e.detail.id) this.loopSource = null;
    this._saveCurrentState();
  }

  render() {
    const currentVideo = this._appState?.videos.find(v => v.id === this.currentVideoId) ?? null;
    return html`
      <header class="app-header">
        <span class="app-title">LoopLlama</span>
        <nav class="header-nav">
          <a class="nav-link" href="https://hindman.github.io/" target="_blank" rel="noopener">The Fifth Fret</a>
          <span class="nav-sep">|</span>
          <a class="nav-link" href="https://github.com/hindman/hindman.github.io/tree/master/loopllama" target="_blank" rel="noopener">Code</a>
        </nav>
      </header>

      <div class="app-body">
        <div class="app-main">
          <div class="video-col">
            <div id="player-container"></div>
            <llama-timeline
              .currentTime=${this.currentTime}
              .duration=${this.duration}
              .sections=${this.sections}
              .marks=${this.marks}
              .loopStart=${this.loopStart}
              .loopEnd=${this.loopEnd}
              @ll-seek-to=${this._onSeekTo}
            ></llama-timeline>
          </div>
          <div class="message-area">
            ${this.editScratchActive
              ? this._renderEditScratchPanel()
              : html`<div>${this.statusMsg}</div>`}
          </div>
        </div>
        <llama-controls
          .currentTime=${this.currentTime}
          .duration=${this.duration}
          .speed=${this.speed}
          .isPlaying=${this.isPlaying}
          .looping=${this.looping}
          .loopStart=${this.loopStart}
          .loopEnd=${this.loopEnd}
          .editScratchActive=${this.editScratchActive}
          .editScratchFocus=${this.editScratchFocus}
          .editScratchDelta=${this.editScratchDelta}
          .loopViolation=${this.loopViolation}
          @ll-play-pause=${this._onPlayPause}
          @ll-seek-forward=${this._onSeekForward}
          @ll-seek-back=${this._onSeekBack}
          @ll-toggle-loop=${this._onToggleLoop}
          @ll-set-loop-start-now=${this._onSetLoopStartNow}
          @ll-set-loop-end-now=${this._onSetLoopEndNow}
          @ll-loop-start-change=${this._onLoopStartChange}
          @ll-loop-end-change=${this._onLoopEndChange}
          @ll-set-section=${this._onSetSection}
          @ll-set-mark=${this._onSetMark}
        ></llama-controls>
      </div>

      <llama-url-input-modal
        @ll-modal-open=${() => this._kb?.disable()}
        @ll-modal-close=${() => this._kb?.enable()}
        @ll-load-url=${this._onLoadUrl}
      ></llama-url-input-modal>

      <llama-video-picker
        .videos=${this.videos}
        .currentVideoId=${this.currentVideoId}
        @ll-modal-open=${() => this._kb?.disable()}
        @ll-modal-close=${() => this._kb?.enable()}
        @ll-pick-video=${this._onPickVideo}
      ></llama-video-picker>

      <llama-edit-video-modal
        .video=${currentVideo}
        @ll-modal-open=${() => this._kb?.disable()}
        @ll-modal-close=${() => this._kb?.enable()}
        @ll-update-video=${this._onUpdateVideo}
        @ll-delete-video=${this._onDeleteVideo}
      ></llama-edit-video-modal>

      <llama-save-loop-modal
        .loopStart=${this.loopStart}
        .loopEnd=${this.loopEnd}
        @ll-modal-open=${() => this._kb?.disable()}
        @ll-modal-close=${() => this._kb?.enable()}
        @ll-save-loop=${this._onSaveLoop}
      ></llama-save-loop-modal>

      <llama-loop-picker
        .namedLoops=${this.namedLoops}
        .loopSource=${this.loopSource}
        @ll-modal-open=${() => this._kb?.disable()}
        @ll-modal-close=${() => this._kb?.enable()}
        @ll-load-loop=${this._onLoadLoop}
      ></llama-loop-picker>

      <llama-whichkey
        .prefix=${this.wkPrefix}
        .completions=${this.wkCompletions}
        .windowFocused=${this.windowFocused}
      ></llama-whichkey>
    `;
  }
}

customElements.define('llama-app', LlamaApp);
