// llama-app.js -- top-level component.

import { LitElement, html, css } from 'lit';
import { UndoManager } from '../undo-manager.js';
import { DataOpsManager, parseVideoInput } from '../data-ops-manager.js';
import { fmtTimePlain } from '../format.js';
import { createVideoController }    from '../videoController.js';
import { createKeyboardController } from '../keyboardController.js';
import {
  DEFAULT_OPTIONS,
  JUMP_HISTORY_MAX, JUMP_THRESHOLD,
  createVideo, createAppState,
  addMark, deleteMarkById, nearestMarkLeft,
  addSection, deleteSectionById, getSectionBounds, nearestSectionLeft,
  fixSectionEnd,
  addLoop, deleteLoopById, updateLoop,
  deleteChapterById,
  addChapterDivider, nearestChapterLeft, getChapterBounds, fixChapterEnd,
  propagateEntityChange, validateEntityChange,
  nudgeLoopStart, nudgeLoopEnd,
  deriveDividerEnd,
} from '../state.js';
import { EXAMPLES } from '../examples.js';
import { load, save, exportAll } from '../storage.js';
import { logSessionStart, logVideoLoad } from '../analytics.js';
import { getUser, onAuthStateChange, signInWithGoogle, signInWithGitHub, signOut } from '../auth.js';
import './llama-shared-video-conflict-modal.js';
import './llama-whichkey.js';
import { HELP_MENU_ITEMS } from './llama-controls.js';
import './llama-timeline.js';
import './llama-url-input-modal.js';
import './llama-video-picker.js';
import './llama-edit-video-modal.js';
import './llama-save-loop-modal.js';
import './llama-loop-picker.js';
import './llama-marks-picker.js';
import './llama-edit-mark-modal.js';
import './llama-sections-picker.js';
import './llama-edit-section-modal.js';
import './llama-chapter-picker.js';
import './llama-edit-chapter-modal.js';
import './llama-current.js';
import './llama-video-info-modal.js';
import './llama-jump-history-picker.js';
import './llama-options-modal.js';
import './llama-delete-data-modal.js';
import './llama-inspect-modal.js';
import './llama-cloud-status-modal.js';
import './llama-data-op-modal.js';
import './llama-load-examples-modal.js';


const QUIP_INTERVAL_MS = 6000;

const MIN_SPEED = 0.25;
const MAX_SPEED = 2.0;


const QUIPS = [
  "Freedom isn't free — but looping is.",
  "How about a little something, you know, for the effort?",
  "I have two speeds: loop and scratch.",
  "It's loops all the way down.",
  "Keep on loopin' in the free world!",
  "Time is a flat circle — so a loop.",
  "The Llama abides.",
  "Hey, baby, scratch my ears.",
  "¿Cómo se Llama?",
  "Need loops? No probllama.",
  "Dream ticket: Millard Fillmore & Barack \"Murphy\" O'Llama.",
  "Which side of The Llama has the most fleece? The outside.",
  "Top productivity hack: an allama clock.",
  "What's two llamas next to the Liberty Bell? Llama llama ding dong.",
  "Never doubt The Llama.",
  "If life gives you lemons, make Llamonade."
];

class LlamaApp extends LitElement {
  static styles = css`
    :host {
      display: block;
      font-family: var(--ll-font-sans, sans-serif);
      color: var(--ll-text, #e0e0e0);
      --ll-header-font: #a0a0e8;
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

    .header-llama {
      height: 1.8rem;
      width: auto;
      margin-left: 0.5rem;
      filter: invert(1);
      cursor: pointer;
    }

    .header-flag {
      height: 1.8rem;
      width: auto;
    }

    .app-title {
      font-size: var(--ll-text-xl, 1.4rem);
      font-weight: bold;
      color: var(--ll-header-font);
      white-space: nowrap;
    }

    .header-llama-wrap {
      position: relative;
      display: inline-flex;
      align-items: center;
    }

    .header-quip {
      position: absolute;
      top: calc(100% + 0.3rem);
      left: 0;
      font-size: var(--ll-text-xs, 0.78rem);
      font-style: italic;
      color: var(--ll-text-dim, #aaa);
      width: max-content;
      max-width: 28rem;
      text-align: left;
      background: var(--ll-surface-raised, #2a2a2a);
      border: 1px solid var(--ll-border, #444);
      border-radius: 4px;
      padding: 0.2rem 0.5rem;
      z-index: 20;
      pointer-events: none;
      opacity: 0;
      transition: opacity 0.3s ease;
    }

    .header-quip.visible {
      opacity: 1;
    }

    .header-nav {
      margin-left: auto;
      display: flex;
      align-items: center;
      gap: var(--ll-gap, 0.5rem);
      font-size: var(--ll-text-base, 1.05rem);
    }

    .nav-link {
      color: var(--ll-header-font);
      text-decoration: none;
    }

    .nav-link:hover {
      color: var(--ll-accent, #7ec8e3);
    }

    .nav-sep {
      color: var(--ll-text-muted, #666);
    }

    .header-nav llama-dropdown::part(trigger) {
      padding: 0;
      background: none;
      border: none;
      color: var(--ll-header-font, #a0a0e8);
      font-size: inherit;
    }

    .header-nav llama-dropdown::part(trigger):hover {
      color: var(--ll-accent, #7ec8e3);
    }

    /* --- Body --- */
    .app-body {
      display: flex;
      flex-direction: column;
      gap: var(--ll-gap, 0.5rem);
      padding: var(--ll-pad, 0.5rem);
    }

    /* --- Main row: video only (narrow) --- */
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

    .player-wrap {
      position: relative;
      width: 100%;
      aspect-ratio: 16 / 9;
    }

    #player-container {
      width: 100%;
      height: 100%;
      background: #000;
    }

    .player-overlay {
      position: absolute;
      inset: 0;
      background: #000;
      pointer-events: none;
    }

    /* --- Short viewport: cap video height so controls stay visible --- */
    @media (max-height: 920px) {
      .player-wrap {
        max-height: 63vh;
      }
    }

    /* --- Wide layout: cap video height to keep controls in view --- */
    @media (min-width: 768px) {
      .player-wrap {
        max-height: calc(100svh - 280px);
      }
    }

    /* --- Small screens: hide decorative header elements --- */
    @media (max-width: 480px) {
      .header-llama { display: none; }
      .header-flag  { display: none; }
      .header-nav > span:first-of-type { display: none; }
    }

    /* --- Wide layout: CSS grid puts current panel as right column --- */
    @media (min-width: 768px) {
      .app-body {
        display: grid;
        grid-template-areas:
          "main    current"
          "controls current";
        grid-template-columns: 1fr 220px;
        grid-template-rows: auto auto;
        gap: var(--ll-gap, 0.5rem);
      }

      .app-main      { grid-area: main; }
      llama-controls { grid-area: controls; }
      llama-current  { grid-area: current; }
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
    jumps:           { type: Array },
    loopSrc:         { type: Object },
    statusMsg:       { type: String },
    wkPrefix:        { type: String },
    wkCompletions:   { type: Object },
    wkCount:         { type: Number },
    windowFocused:   { type: Boolean },
    currentUser:     { type: Object },
    editScratchActive:  { type: Boolean },
    editScratchFocus:   { type: String },
    videos:             { type: Array },
    stashes:            { type: Object },
    currentVideoId:     { type: String },
    activeEntityType:   { type: String },
    chapters:           { type: Array },
    zoomSource:         { type: Object },
    warningMsg:         { type: String },
    errorMsg:           { type: String },
    loopNudgeDelta:     { type: Number },
    seekDelta:          { type: Number },
    zone2Mode:          { type: String },
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
    this.jumps         = [];
    this.loopSrc       = null;
    this.statusMsg     = null;
    this._skipSignOutMsg = false;
    this.wkPrefix            = null;
    this.wkCompletions       = null;
    this.wkCount             = null;
    this.windowFocused       = true;
    this.currentUser         = null;
    this.editScratchActive   = false;
    this.editScratchFocus    = 'start';
    this._appState           = load() ?? createAppState();
    this.videos              = this._appState.videos;
    this.stashes             = this._appState.stashes ?? {};
    this.currentVideoId      = this._appState.currentVideoId;
    this.activeEntityType    = 'any';
    this.chapters            = [];
    this.zoomSource          = null;
    this.warningMsg          = null;
    this.errorMsg            = null;
    this.zone2Mode           = 'sections';
    this._quip               = '';
    this._quipDeck           = [];
    this._quipPos            = 0;
    this._quipInterval       = null;
    this._pendingNewVideoId  = null;
    this._warnTimeout        = null;
    this._statusTimeout      = null;
    this._errorTimeout       = null;
    this._lastMsg            = null;
    this._vc                 = null;
    this._kb                 = null;
    this._pollId             = null;
    this._editScratchHandler = null;

    this._urlInputModalEl    = null;
    this._videoPickerEl      = null;
    this._editVideoModalEl   = null;
    this._saveLoopModalEl    = null;
    this._loopPickerEl       = null;
    this._marksPickerEl      = null;
    this._editMarkModalEl    = null;
    this._sectionsPickerEl   = null;
    this._editSectionModalEl = null;
    this._chapterPickerEl      = null;
    this._editChapterModalEl   = null;
    this._videoInfoModalEl     = null;
    this._jumpHistoryPickerEl  = null;
    this._optionsModalEl       = null;
    this._deleteDataModalEl    = null;
    this._cloudStatusModalEl   = null;
    this._fileInputEl          = null;
    this._jumpIdx              = -1;   // -1 = at current/live position
    this._jumpFromTime         = null; // saved position when jb first invoked
    this._suppressJumpPush     = false;
    this._undoMgr = new UndoManager({
      getSnapshot:   () => {
        this._saveCurrentState();
        const vid = this._appState.videos.find(v => v.id === this.currentVideoId);
        return {
          video:          JSON.parse(JSON.stringify(vid)),
          currentVideoId: this.currentVideoId,
        };
      },
      applySnapshot: (snap) => this._applySnapshot(snap),
      onUndo:        (n, desc) => { this.statusMsg = n > 1 ? `Undone: ${n} edits.` : `Undone › ${desc}.`; },
      onRedo:        (n, desc) => { this.statusMsg = n > 1 ? `Redone: ${n} edits.` : `Redone › ${desc}.`; },
      onEmpty:       (dir)  => this._setWarning(`Cannot ${dir}: no edit history.`),
    });
    this._dataMgr         = new DataOpsManager(this);
    this.seekDelta        = DEFAULT_OPTIONS.seek_delta_default;
    this.speedDelta       = DEFAULT_OPTIONS.speed_delta;
    this.loopNudgeDelta   = DEFAULT_OPTIONS.loop_nudge_delta_default;
  }

  // Auto-clear transient messages after 5s whenever they are set.
  // Also capture each new message in _lastMsg for dm recall.
  updated(changedProps) {
    if (changedProps.has('statusMsg') && this.statusMsg) {
      clearTimeout(this._statusTimeout);
      this._statusTimeout = setTimeout(() => { this.statusMsg = null; }, 5000);
      if (this.statusMsg !== this._lastMsg?.text) this._lastMsg = { text: this.statusMsg, type: 'status' };
    }
    if (changedProps.has('warningMsg') && this.warningMsg) {
      clearTimeout(this._warnTimeout);
      this._warnTimeout = setTimeout(() => { this.warningMsg = null; }, 5000);
      if (this.warningMsg !== this._lastMsg?.text) this._lastMsg = { text: this.warningMsg, type: 'warning' };
    }
    if (changedProps.has('errorMsg') && this.errorMsg) {
      clearTimeout(this._errorTimeout);
      this._errorTimeout = setTimeout(() => { this.errorMsg = null; }, 5000);
      if (this.errorMsg !== this._lastMsg?.text) this._lastMsg = { text: this.errorMsg, type: 'error' };
    }
  }

  // Sync per-video state from a Video object into reactive props.
  _syncFromVideo(video) {
    this.chapters   = [...(video.chapters ?? [])];
    this.sections   = [...(video.sections ?? [])];
    this.marks      = [...(video.marks    ?? [])];
    this.namedLoops = [...(video.loops    ?? [])];
    this.jumps      = [...(video.jumps    ?? [])];
    this._jumpIdx       = -1;
    this._jumpFromTime  = null;
    const scratch   = video.scratchLoop;
    this.loopStart  = scratch?.start   ?? 0;
    this.loopEnd    = scratch?.end     ?? 0;
    this.looping    = scratch?.looping ?? false;
    // Derive loopSrc from persisted sourceId/sourceType; clear stale IDs if entity gone.
    const derived = _deriveLoopSrc(video, scratch?.sourceId, scratch?.sourceType);
    if (!derived && scratch?.sourceId && scratch) {
      scratch.sourceId = null; scratch.sourceType = null;
    }
    this.loopSrc         = derived;
    this.speed              = video.speed ?? 1.0;
    this._vc?.setPlaybackRate(this.speed);
    this.seekDelta          = video.seek_delta   ?? DEFAULT_OPTIONS.seek_delta_default;
    this.loopNudgeDelta     = video.nudge_delta  ?? DEFAULT_OPTIONS.loop_nudge_delta_default;
    this.activeEntityType   = video.entity_type  ?? 'any';
    this.zoomSource = null;
    this.zone2Mode  = video.zone2_mode ?? 'sections';
  }

  // Clear all reactive state tied to the current video and mark no video loaded.
  // Call when the current video is deleted or the user returns to a no-video state.
  _clearCurrentVideoState() {
    this._undoMgr.clear();
    this._vc?.pause();
    this._appState.currentVideoId = null;
    this.currentVideoId = null;
    this.sections   = [];
    this.marks      = [];
    this.namedLoops = [];
    this.chapters   = [];
    this.loopStart  = 0;
    this.loopEnd    = 0;
    this.looping    = false;
    this.loopSrc    = null;
    this.duration   = null;
  }

  // Push a jump-history entry if the move is large enough.
  // fromTime: where the user was; toTime: where they're going.
  // Skipped when _suppressJumpPush is true (jb/jf navigation).
  // Resets the jb/jf cursor so any subsequent jb starts from the newest entry.
  _maybePushJump(fromTime, toTime) {
    if (this._suppressJumpPush) return;
    if (Math.abs(toTime - fromTime) <= JUMP_THRESHOLD) return;
    const video = this._appState?.videos.find(v => v.id === this.currentVideoId);
    if (!video) return;
    video.jumps.push(fromTime);
    if (video.jumps.length > JUMP_HISTORY_MAX) video.jumps.shift();
    this.jumps         = [...video.jumps];
    this._jumpIdx      = -1;
    this._jumpFromTime = null;
    this._save();
  }

  // Persist current reactive state back to the current video and save to
  // localStorage. Call after any mutation to sections, marks, or namedLoops.
  _saveCurrentState() {
    const video = this._appState?.videos.find(v => v.id === this.currentVideoId);
    if (!video) return;
    video.chapters = [...this.chapters];
    video.sections = [...this.sections];
    video.marks    = [...this.marks];
    video.jumps    = [...this.jumps];
    video.time     = this.currentTime;
    // Update scratch loop from reactive state; persist loopSrc identity.
    if (!video.scratchLoop) video.scratchLoop = { start: 0, end: 0, looping: false, sourceId: null, sourceType: null };
    video.scratchLoop.start      = this.loopStart;
    video.scratchLoop.end        = this.loopEnd;
    video.scratchLoop.looping    = this.looping;
    video.scratchLoop.sourceId   = this.loopSrc?.id   ?? null;
    video.scratchLoop.sourceType = this.loopSrc?.type ?? null;
    video.loops         = [...this.namedLoops];
    video.speed         = this.speed;
    video.seek_delta    = this.seekDelta;
    video.nudge_delta   = this.loopNudgeDelta;
    video.entity_type   = this.activeEntityType;
    video.zone2_mode    = this.zone2Mode;
    video.last_modified = Date.now();
    this._save();
  }

  // Apply an options object: update reactive delta props. If the current
  // seekDelta or loopNudgeDelta is not in the new choices, reset to default.
  // Also backfills any keys missing from older saved states.
  _applyOptions(options) {
    if (!options) return;
    // Backfill keys added after the initial schema (older saved states won't
    // have loop_nudge_delta_* until the user opens Options and saves).
    if (options.loop_nudge_delta_default == null)
      options.loop_nudge_delta_default = DEFAULT_OPTIONS.loop_nudge_delta_default;
    if (options.loop_nudge_delta_choices == null)
      options.loop_nudge_delta_choices = DEFAULT_OPTIONS.loop_nudge_delta_choices;
    const seekChoices  = options.seek_delta_choices;
    const nudgeChoices = options.loop_nudge_delta_choices;
    if (!seekChoices.includes(this.seekDelta))
      this.seekDelta = options.seek_delta_default;
    if (!nudgeChoices.includes(this.loopNudgeDelta))
      this.loopNudgeDelta = options.loop_nudge_delta_default;
    this.speedDelta = options.speed_delta;
  }

  // Handle ll-options-saved from the options modal.
  _onOptionsSaved(e) {
    const { options } = e.detail;
    this._appState.options = options;
    this._applyOptions(options);
    this._save();
    this.statusMsg = 'Options: saved.';
  }

  // Load a Video object: save current state, switch to new video, restore state.
  _loadVideoObject(video, startTime = null, loadMsg = 'Video: loaded.') {
    this._undoMgr.clear();
    this._saveCurrentState();
    video.last_opened = Date.now();
    this._appState.currentVideoId = video.id;
    this.currentVideoId = video.id;
    this._syncFromVideo(video);
    const _startAt = startTime ?? (this.looping && this.loopStart < this.loopEnd ? this.loopStart : video.time ?? 0);
    this._vc.cueVideo(video.id, _startAt);
    this.duration  = null;
    this.statusMsg = loadMsg;
    this._save();
    logVideoLoad(video.id);
  }

  // Clamp speed to [0.25, 2.0] and set it. Rounds to avoid float drift.
  _speedChange(delta) {
    const current = this._vc?.getPlaybackRate() ?? 1;
    const next    = Math.round((current + delta) * 100) / 100;
    const clamped = Math.max(MIN_SPEED, Math.min(MAX_SPEED, next));
    this._vc?.setPlaybackRate(clamped);
    this.speed = clamped;
    this._saveCurrentState();
  }

  // Flash a yellow border on the affected control after a keyboard action.
  _flash(target, mode = 'timed') {
    this.renderRoot.querySelector('llama-controls')?.flash(target, mode);
  }

  // --- Undo / Redo ---

  // Snapshot the full video registry and current video ID.
  // Playback state (speed, looping, scratch loop) is not included.
  // Call after setting statusMsg, before the mutation.
  // _appState.video has current array state (sections/marks/etc.) but scratch
  // loop may lag if nudge was the last op (nudge skips _saveCurrentState).
  // Inject reactive scratch loop state directly so the snapshot is accurate.
  _pushUndoSnapshot() {
    const vid = this._appState.videos.find(v => v.id === this.currentVideoId);
    if (!vid) return;
    const desc = (this.statusMsg ?? '').replace(/\.$/, '');
    const videoSnap = JSON.parse(JSON.stringify(vid));
    videoSnap.scratchLoop = {
      start:      this.loopStart,
      end:        this.loopEnd,
      looping:    this.looping,
      sourceId:   this.loopSrc?.id   ?? null,
      sourceType: this.loopSrc?.type ?? null,
    };
    this._undoMgr.push({
      video:          videoSnap,
      currentVideoId: this.currentVideoId,
      desc,
    });
  }

  _applySnapshot(snap) {
    const idx = this._appState.videos.findIndex(v => v.id === snap.currentVideoId);
    if (idx === -1) return;
    this._appState.videos[idx] = JSON.parse(JSON.stringify(snap.video));
    this.videos = [...this._appState.videos];
    this._syncFromVideo(this._appState.videos[idx]);
    this._save();
  }

  // Handlers for Stage 5+. Core playback handlers implemented in Stage 6e.
  _makeHandlers() {
    const stub = (name) => () => console.log(`[kb] ${name}`);
    // Guard for handlers that require a loaded video. Returns true if the
    // action should be blocked (no current video).
    const noVideo = () => {
      if (this.currentVideoId) return false;
      this._setWarning('No current video.');
      return true;
    };
    return {
      playPause:     () => { if (noVideo()) return; this._onPlayPause(); this._flash('playPause'); },
      speedDown:     (count = 1) => { this._speedChange(-this.speedDelta * count); this._flash('speed'); },
      speedUp:       (count = 1) => { this._speedChange(this.speedDelta * count); this._flash('speed'); },
      speedReset:    () => { this._vc?.setPlaybackRate(1.0); this.speed = 1.0; this._saveCurrentState(); this._flash('speed'); },
      seekForward:   (count = 1) => { if (noVideo()) return; this._seek(this.seekDelta * count); this._flash('time'); },
      seekBack:      (count = 1) => { if (noVideo()) return; this._seek(-this.seekDelta * count); this._flash('time'); },
      seekDeltaDown: () => {
        const choices = this._appState?.options.seek_delta_choices ?? DEFAULT_OPTIONS.seek_delta_choices;
        const idx = choices.indexOf(this.seekDelta);
        this.seekDelta = choices[Math.max(idx - 1, 0)];
        this._flash('seekDelta');
      },
      seekDeltaUp: () => {
        const choices = this._appState?.options.seek_delta_choices ?? DEFAULT_OPTIONS.seek_delta_choices;
        const idx = choices.indexOf(this.seekDelta);
        this.seekDelta = choices[Math.min(idx + 1, choices.length - 1)];
        this._flash('seekDelta');
      },
      prevEntity:    (count = 1) => { this._navigateEntity('prev', count); },
      entityType:    () => { this.renderRoot.querySelector('llama-controls')?.focusEntitySelect(); this._flash('entitySelect', 'until-blur'); },
      nextEntity:    (count = 1) => { this._navigateEntity('next', count); },
      jumpToStart:   () => {
        if (noVideo()) return;
        const video  = this._appState?.videos.find(v => v.id === this.currentVideoId);
        const target = this.looping ? this.loopStart : (video?.start ?? 0);
        this._maybePushJump(this._vc?.getCurrentTime() ?? 0, target);
        this._vc?.seekTo(target);
        this._flash('time');
      },
      setLoopStart:  () => { if (noVideo()) return; this.loopStart = this._vc?.getCurrentTime() ?? 0; this._autoDisableLoopIfInvalid(); this._flash('loopStart'); },
      setLoopEnd:    () => { if (noVideo()) return; this.loopEnd   = this._vc?.getCurrentTime() ?? 0; this._autoDisableLoopIfInvalid(); this._flash('loopEnd'); },
      resetLoopStart: () => { if (noVideo()) return; this.loopStart = 0; this._autoDisableLoopIfInvalid(); this._flash('loopStart'); },
      resetLoopEnd:   () => { if (noVideo()) return; this.loopEnd = this.duration ?? 0; this._autoDisableLoopIfInvalid(); this._flash('loopEnd'); },
      nudgeStartDown: (count = 1) => {
        if (noVideo()) return;
        const state = { loopStart: this.loopStart, loopEnd: this.loopEnd, duration: this.duration };
        this.loopStart = nudgeLoopStart(-this.loopNudgeDelta * count, state);
        this._autoDisableLoopIfInvalid();
        this._flash('loopStart');
      },
      nudgeStartUp: (count = 1) => {
        if (noVideo()) return;
        const state = { loopStart: this.loopStart, loopEnd: this.loopEnd, duration: this.duration };
        this.loopStart = nudgeLoopStart(+this.loopNudgeDelta * count, state);
        this._autoDisableLoopIfInvalid();
        this._flash('loopStart');
      },
      nudgeEndDown: (count = 1) => {
        if (noVideo()) return;
        const state = { loopStart: this.loopStart, loopEnd: this.loopEnd, duration: this.duration };
        this.loopEnd = nudgeLoopEnd(-this.loopNudgeDelta * count, state);
        this._autoDisableLoopIfInvalid();
        this._flash('loopEnd');
      },
      nudgeEndUp: (count = 1) => {
        if (noVideo()) return;
        const state = { loopStart: this.loopStart, loopEnd: this.loopEnd, duration: this.duration };
        this.loopEnd = nudgeLoopEnd(+this.loopNudgeDelta * count, state);
        this._autoDisableLoopIfInvalid();
        this._flash('loopEnd');
      },
      focusLoopNudgeDelta: () => { this.renderRoot.querySelector('llama-controls')?.focusNudgeDeltaSelect(); this._flash('nudgeDelta', 'until-blur'); },
      focusLoopStart:     () => { this.renderRoot.querySelector('llama-controls')?.focusStartInput(); this._flash('loopStart', 'until-blur'); },
      focusLoopEnd:       () => { this.renderRoot.querySelector('llama-controls')?.focusEndInput(); this._flash('loopEnd', 'until-blur'); },
      copyTime:      () => {
        const t = this.currentTime ?? 0;
        const m = Math.floor(t / 60);
        const s = Math.floor(t % 60).toString().padStart(2, '0');
        const text = `${m}:${s}`;
        navigator.clipboard.writeText(text).then(
          ()  => { this.statusMsg = `Time copied: ${text}.`; },
          ()  => this._setWarning('Cannot copy current time: clipboard blocked.'),
        );
      },
      undo:          (count) => this._undoMgr.undo(count),
      redo:          (count) => this._undoMgr.redo(count),
      clearHistory:  () => { this._undoMgr.clear(); this.statusMsg = 'Edit history: cleared.'; },
      helpKeys:      () => window.open(`${_siteOrigin()}/loopllama/v2/keybindings/`, '_blank'),
      options:       () => this._optionsModalEl?.show(this._appState?.options),
      videoUrl:      () => this._urlInputModalEl?.show(),
      videoPickerRecent: () => {
        if (!this._appState?.videos.length) { this._setWarning('No videos.'); return; }
        this._videoPickerEl?.show('switch', 'recent');
      },
      editVideo: () => {
        if (!this.currentVideoId) { this._setWarning('No current video.'); return; }
        this._editVideoModalEl?.show();
      },
      scratchVideo: () => {
        if (this.duration == null) {
          this._setError('Cannot scratch video: video duration unknown.');
          return;
        }
        const video = this._appState?.videos.find(v => v.id === this.currentVideoId);
        const start = video?.start ?? 0;
        const end   = video?.end   ?? this.duration;
        this._clearZoomIfOutside(start, end);
        this.loopStart       = start;
        this.loopEnd         = end;
        this.looping         = true;
        this.loopSrc         = null;
        this.statusMsg       = 'Video: scratched.';
      },
      zoomVideo: () => {
        if (this.zoomSource?.trigger === 'video') {
          this.zoomSource = null;
          this.statusMsg  = 'Zoom: off.';
          return;
        }
        const video = this._appState?.videos.find(v => v.id === this.currentVideoId);
        if (!video) { this._setWarning('No current video.'); return; }
        const start = video.start ?? 0;
        const end   = video.end   ?? this.duration;
        if (start === 0 && (end == null || end >= this.duration)) {
          this._setWarning('Cannot zoom a range spanning entire video.');
          return;
        }
        this.zoomSource = { start, end, trigger: 'video' };
        this.statusMsg  = 'Video: zoomed.';
        this._seekIntoZoomIfNeeded();
      },
      deleteVideo: () => {
        if (!this._appState?.videos.length) { this._setWarning('No videos.'); return; }
        this._videoPickerEl?.show('delete');
      },
      restoreVideo: () => {
        if (!Object.keys(this._appState.stashes ?? {}).length) { this._setWarning('No stashed videos.'); return; }
        this._videoPickerEl?.show('restore');
      },
      jumpTime:      () => { this.renderRoot.querySelector('llama-controls')?.focusTimeInput(); this._flash('time', 'until-blur'); },
      jumpSection:   () => { this._openSectionsPicker('jump'); },
      jumpLoop:      () => { this._openLoopsPicker('jump'); },
      jumpMark:      () => { this._openMarksPicker('jump'); },
      jumpChapter:   () => { this._openChapterPicker('jump'); },
      jumpHistory:   () => {
        if (!this.jumps.length) { this._setWarning('No jump history.'); return; }
        this._jumpHistoryPickerEl?.show();
      },
      jumpBack: () => {
        if (!this.jumps.length) { this._setWarning('Cannot jump: no jump history.'); return; }
        if (this._jumpIdx === -1) {
          // First jb: save current position, go to most recent entry.
          this._jumpFromTime = this._vc?.getCurrentTime() ?? 0;
          this._jumpIdx      = this.jumps.length - 1;
        } else if (this._jumpIdx > 0) {
          this._jumpIdx--;
        } else {
          this._setWarning('Cannot jump: at oldest position.'); return;
        }
        const t = this.jumps[this._jumpIdx];
        this._suppressJumpPush = true;
        this._vc?.seekTo(t);
        this._suppressJumpPush = false;
        this._flash('time');
      },
      jumpForward: () => {
        if (!this.jumps.length) { this._setWarning('Cannot jump: no jump history.'); return; }
        if (this._jumpIdx === -1) { this._setWarning('Cannot jump: at newest position.'); return; }
        if (this._jumpIdx < this.jumps.length - 1) {
          this._jumpIdx++;
          const t = this.jumps[this._jumpIdx];
          this._suppressJumpPush = true;
          this._vc?.seekTo(t);
          this._suppressJumpPush = false;
          this._flash('time');
        } else {
          // At most recent entry; jump forward to where jb was first invoked.
          this._jumpIdx = -1;
          const t = this._jumpFromTime ?? 0;
          this._jumpFromTime = null;
          this._suppressJumpPush = true;
          this._vc?.seekTo(t);
          this._suppressJumpPush = false;
          this._flash('time');
        }
      },
      toggleLoop: () => { if (noVideo()) return; this._toggleLoop(); },
      saveLoop: () => {
        if (this.loopEnd <= this.loopStart) {
          this._setWarning('Cannot create loop: invalid range.');
          return;
        }
        this.statusMsg = 'Loop: created.';
        this._pushUndoSnapshot();
        addLoop(this.namedLoops, this.loopStart, this.loopEnd);
        this.namedLoops = [...this.namedLoops];
        this._saveCurrentState();
      },
      saveBack: () => {
        if (!this.loopSrc) {
          this._setWarning('Cannot save: no scratch loop source.');
          return;
        }
        if (this.loopStart >= this.loopEnd) {
          this._setWarning('Cannot save: invalid scratch loop range.');
          return;
        }

        if (this.loopSrc.type === 'loop') {
          const idx = this.namedLoops.findIndex(l => l.id === this.loopSrc.id);
          if (idx === -1) {
            this._setWarning('Cannot save: scratch loop source not found.');
            return;
          }
          this.statusMsg         = 'Scratch loop: saved back to source.';
          this._pushUndoSnapshot();
          this.namedLoops[idx].start = this.loopStart;
          this.namedLoops[idx].end   = this.loopEnd;
          this.namedLoops        = [...this.namedLoops];
          this.loopSrc           = { ...this.loopSrc, start: this.loopStart, end: this.loopEnd };
          this._saveCurrentState();
          return;
        }

        if (this.loopSrc.type === 'section' || this.loopSrc.type === 'chapter') {
          const isSection = this.loopSrc.type === 'section';
          const label     = isSection ? 'section' : 'chapter';
          const entities  = isSection ? this.sections : this.chapters;
          const idx       = entities.findIndex(e => e.id === this.loopSrc.id);
          if (idx === -1) {
            this._setWarning('Cannot save: scratch loop source not found.');
            return;
          }

          const padStart = this._appState?.options.loop_pad_start ?? DEFAULT_OPTIONS.loop_pad_start;
          const padEnd   = this._appState?.options.loop_pad_end   ?? DEFAULT_OPTIONS.loop_pad_end;
          const newStart = this.loopStart + padStart;
          const newEnd   = this.loopEnd   - padEnd;

          if (newStart >= newEnd) {
            this._setWarning('Cannot save: invalid scratch loop range.');
            return;
          }

          if (!validateEntityChange(entities, idx, newStart, newEnd, this.duration)) {
            this._setWarning('Cannot save: would eliminate a neighboring source.');
            return;
          }

          this.statusMsg = 'Scratch loop: saved back to source.';
          this._pushUndoSnapshot();
          propagateEntityChange(entities, idx, newStart, newEnd);
          if (isSection) {
            this.sections = [...this.sections];
          } else {
            this.chapters = [...this.chapters];
          }
          this.loopSrc = { ...this.loopSrc, start: newStart, end: newEnd };
          this._saveCurrentState();
          return;
        }

        this._setWarning('Cannot save: no scratch loop source.');
      },
      resetLoopToSource: () => {
        if (!this.loopSrc) {
          this._setWarning('Cannot reset: no scratch loop source.');
          return;
        }
        const padStart = (this.loopSrc.type !== 'loop')
          ? (this._appState?.options.loop_pad_start ?? DEFAULT_OPTIONS.loop_pad_start) : 0;
        const padEnd = (this.loopSrc.type !== 'loop')
          ? (this._appState?.options.loop_pad_end   ?? DEFAULT_OPTIONS.loop_pad_end)   : 0;
        const srcEnd   = this.loopSrc.end ?? this.duration ?? Infinity;
        this.loopStart = Math.max(0, this.loopSrc.start - padStart);
        this.loopEnd   = Math.min(this.duration ?? Infinity, srcEnd + padEnd);
        this._clearZoomIfOutside(this.loopStart, this.loopEnd);
        this._autoDisableLoopIfInvalid();
        this.statusMsg = 'Scratch loop: reset to source.';
      },
      unlinkLoopSource: () => {
        if (!this.loopSrc) {
          this._setWarning('Cannot unlink: no scratch loop source.');
          return;
        }
        this.loopSrc   = null;
        this.statusMsg = 'Scratch loop: source unlinked.';
      },
      editScratch: () => this._enterEditScratch(),
      editLoop: () => {
        const loop = this.namedLoops.find(l => this.currentTime >= l.start && this.currentTime <= l.end);
        if (!loop) { this._setWarning('No current loop.'); return; }
        this._saveLoopModalEl?.show(loop);
      },
      scratchLoop: () => {
        const loop = this.namedLoops.find(l => this.currentTime >= l.start && this.currentTime <= l.end);
        if (!loop) { this._setWarning('No current loop.'); return; }
        this._clearZoomIfOutside(loop.start, loop.end);
        this.loopStart = loop.start;
        this.loopEnd   = loop.end;
        this.looping   = true;
        this.loopSrc   = { id: loop.id, label: loop.name || null, type: 'loop', start: loop.start, end: loop.end };
        this.statusMsg = 'Loop: scratched.';
      },
      deleteLoop: () => this._openLoopsPicker('delete'),
      zoomLoop: () => {
        if (this.zoomSource?.trigger === 'loop') {
          this.zoomSource = null;
          this.statusMsg  = 'Zoom: off.';
          return;
        }
        const loop = this.namedLoops.find(l =>
          this.currentTime >= l.start && this.currentTime <= l.end);
        if (!loop) {
          this._setWarning('No current loop.');
          return;
        }
        if (loop.start === 0 && loop.end === this.duration) {
          this._setWarning('Cannot zoom a range spanning entire video.');
          return;
        }
        this.zoomSource = { start: loop.start, end: loop.end, trigger: 'loop' };
        this.statusMsg  = 'Loop: zoomed.';
        this._seekIntoZoomIfNeeded();
      },
      zoomScratch: () => {
        if (this.zoomSource?.trigger === 'scratch') {
          this.zoomSource = null;
          this.statusMsg  = 'Zoom: off.';
          return;
        }
        if (!this._isLoopValid()) {
          this._setWarning('Cannot zoom scratch loop: invalid range.');
          return;
        }
        if (this.loopStart === 0 && this.loopEnd === this.duration) {
          this._setWarning('Cannot zoom a range spanning entire video.');
          return;
        }
        this.zoomSource = { start: this.loopStart, end: this.loopEnd, trigger: 'scratch' };
        this.statusMsg  = 'Scratch loop: zoomed.';
        this._seekIntoZoomIfNeeded();
      },
      zoomSection:    () => this._zoomDivider('section'),
      setSection:     () => this._setDivider('section'),
      editSection:    () => this._editCurrentDivider('section'),
      scratchSection: () => this._scratchDivider('section'),
      deleteSection:  () => this._openSectionsPicker('delete'),
      fixSection:     () => this._fixDivider('section'),
      setMark: () => {
        const time = this._vc?.getCurrentTime() ?? 0;
        if (!addMark(this.marks, time)) {
          this._setWarning('Cannot create mark: mark exists at current time.');
          return;
        }
        this.statusMsg = 'Mark: created.';
        this._pushUndoSnapshot();
        this.marks = [...this.marks];
        this._saveCurrentState();
      },
      editMark:   () => this._editCurrentMark(),
      deleteMark: () => this._openMarksPicker('delete'),
      setChapter:     () => this._setDivider('chapter'),
      editChapter:    () => this._editCurrentDivider('chapter'),
      scratchChapter: () => this._scratchDivider('chapter'),
      deleteChapter:  () => this._openChapterPicker('delete'),
      fixChapter:     () => this._fixDivider('chapter'),
      toggleZone2: () => {
        this.zone2Mode = this.zone2Mode === 'sections' ? 'chapters' : 'sections';
        this.statusMsg = `Timeline displaying: ${this.zone2Mode}.`;
        this._saveCurrentState();
      },
      zoomChapter:    () => this._zoomDivider('chapter'),
      zoomOff: () => {
        if (!this.zoomSource) { this._setWarning('No current zoom.'); return; }
        this.zoomSource = null;
        this.statusMsg  = 'Zoom: off.';
      },
      videoInfo:     () => this._videoInfoModalEl?.show(),
      helpGeneral:   () => window.open(`${_siteOrigin()}/loopllama/v2/help/`, '_blank'),
      siteHome:      () => window.open('https://hindman.github.io/', '_blank'),
      siteCode:      () => window.open('https://github.com/hindman/hindman.github.io/tree/master/loopllama', '_blank'),
      siteIssues:    () => window.open('https://github.com/hindman/hindman.github.io/issues', '_blank'),
      deleteData: () => {
        const video = this._appState?.videos.find(v => v.id === this.currentVideoId);
        this._deleteDataModalEl?.show({
          videos:           this._appState?.videos ?? [],
          currentVideoId:   this.currentVideoId,
          currentVideoName: video?.name || video?.id || null,
          sections:         this.sections,
          namedLoops:       this.namedLoops,
          marks:            this.marks,
          chapters:         this.chapters,
        });
      },
      exportAll:     () => this._dataMgr.exportAll(),
      importData:    () => this._fileInputEl?.click(),
      inspectData:   () => this._inspectModalEl?.show(JSON.parse(exportAll(this._appState))),
      shareVideo:    () => this._dataMgr.createVideoShare(),
      shareLoop:     () => this._dataMgr.createLoopShare(),
      dataSave:      () => this._dataMgr.dataSave(),
      dataRead:      () => this._dataMgr.dataRead(),
      dataCompare:   () => this._dataMgr.dataCompare(),
      loadExamples:  () => {
        const newVideos      = EXAMPLES.filter(e => !this._appState.videos.find(v => v.id === e.id));
        const existingVideos = EXAMPLES.filter(e =>  this._appState.videos.find(v => v.id === e.id));
        this._loadExamplesResolve = null;
        const p = new Promise(resolve => { this._loadExamplesResolve = resolve; });
        this._loadExamplesModalEl?.show({
          newVideos:      newVideos.map(e => e.name),
          existingVideos: existingVideos.map(e => e.name),
        });
        p.then(result => {
          if (!result) return;
          let changed = false;
          if (result.addNew) {
            for (const video of newVideos) {
              this._appState.videos.push(video);
              changed = true;
            }
          }
          if (result.replaceExisting) {
            for (const video of existingVideos) {
              const idx = this._appState.videos.findIndex(v => v.id === video.id);
              if (idx !== -1) { this._appState.videos[idx] = video; changed = true; }
            }
          }
          if (changed) {
            this.videos = [...this._appState.videos];
            this._save();
          }
          this.statusMsg = 'Examples: loaded.';
        });
      },
      msgRecall:     () => {
        if (!this._lastMsg) { this._setWarning('No recent message.'); return; }
        const { text, type } = this._lastMsg;
        if (type === 'warning') this.warningMsg = text;
        else if (type === 'error') this.errorMsg = text;
        else this.statusMsg = text;
      },

      openMenuVideo:   () => this.renderRoot.querySelector('llama-controls')?.openMenu('Video'),
      openMenuChapter: () => this.renderRoot.querySelector('llama-controls')?.openMenu('Chapter'),
      openMenuSection: () => this.renderRoot.querySelector('llama-controls')?.openMenu('Section'),
      openMenuLoop:    () => this.renderRoot.querySelector('llama-controls')?.openMenu('Loop'),
      openMenuScratch: () => this.renderRoot.querySelector('llama-controls')?.openMenu('Scratch'),
      openMenuMark:    () => this.renderRoot.querySelector('llama-controls')?.openMenu('Mark'),
      openMenuData:    () => this.renderRoot.querySelector('llama-controls')?.openMenu('Data'),
      openMenuApp:     () => this.renderRoot.querySelector('llama-controls')?.openMenu('App'),
    };
  }

  _save() {
    save(this._appState);
  }

  async firstUpdated() {
    logSessionStart();

    const container = this.renderRoot.querySelector('#player-container');

    this._vc = createVideoController({
      onError: () => {
        this._setError('YouTube failed to load video.');
        if (this._pendingNewVideoId) {
          this._appState.videos = this._appState.videos.filter(
            v => v.id !== this._pendingNewVideoId);
          this.videos = [...this._appState.videos];
          this._pendingNewVideoId = null;
        }
      },
      onReady: () => {},
      onStateChange: (state) => {
        // Suppress state-change messages; outcomes are visually obvious.

        // Auto-name: on the first PLAYING or CUED event after a video loads,
        // grab the YT title and store it if the video has no name yet.
        if (state === 1 || state === 5) {
          const video = this._appState.videos.find(v => v.id === this.currentVideoId);
          if (video && !video.name) {
            const title = this._vc.getVideoTitle();
            if (title) {
              video.name = title;
              this.videos = [...this._appState.videos];
              this._save();
            }
          }
        }
      },
    });
    await this._vc.initialize(container);

    this._handlers = this._makeHandlers();
    this._kb = createKeyboardController(
      this._handlers,
      {
        onPendingKey: (prefix, completions) => {
          this.wkPrefix      = prefix;
          this.wkCompletions = completions;
        },
        onCountChange: (n) => {
          this.wkCount = n;
        },
      }
    );

    this._urlInputModalEl  = this.renderRoot.querySelector('llama-url-input-modal');
    this._videoPickerEl    = this.renderRoot.querySelector('llama-video-picker');
    this._editVideoModalEl = this.renderRoot.querySelector('llama-edit-video-modal');
    this._saveLoopModalEl  = this.renderRoot.querySelector('llama-save-loop-modal');
    this._loopPickerEl     = this.renderRoot.querySelector('llama-loop-picker');
    this._marksPickerEl      = this.renderRoot.querySelector('llama-marks-picker');
    this._editMarkModalEl    = this.renderRoot.querySelector('llama-edit-mark-modal');
    this._sectionsPickerEl   = this.renderRoot.querySelector('llama-sections-picker');
    this._editSectionModalEl = this.renderRoot.querySelector('llama-edit-section-modal');
    this._chapterPickerEl    = this.renderRoot.querySelector('llama-chapter-picker');
    this._editChapterModalEl = this.renderRoot.querySelector('llama-edit-chapter-modal');
    this._videoInfoModalEl    = this.renderRoot.querySelector('llama-video-info-modal');
    this._jumpHistoryPickerEl = this.renderRoot.querySelector('llama-jump-history-picker');
    this._optionsModalEl      = this.renderRoot.querySelector('llama-options-modal');
    this._deleteDataModalEl   = this.renderRoot.querySelector('llama-delete-data-modal');
    this._inspectModalEl      = this.renderRoot.querySelector('llama-inspect-modal');
    this._cloudStatusModalEl  = this.renderRoot.querySelector('llama-cloud-status-modal');
    this._sharedVideoConflictModalEl = this.renderRoot.querySelector('llama-shared-video-conflict-modal');
    this._dataOpModalEl       = this.renderRoot.querySelector('llama-data-op-modal');
    this._loadExamplesModalEl = this.renderRoot.querySelector('llama-load-examples-modal');
    this._fileInputEl         = this.renderRoot.querySelector('#import-file-input');

    // Sync delta values from persisted options (may differ from compile-time defaults).
    this._applyOptions(this._appState.options);

    window.addEventListener('blur',  () => { this.windowFocused = false; });
    window.addEventListener('focus', () => { this.windowFocused = true; });

    // Initialize auth state: get current user, then subscribe to changes.
    this.currentUser = await getUser();
    if (this.currentUser) await this._dataMgr.handleSignIn(this.currentUser);
    this._unsubscribeAuth = onAuthStateChange(async user => {
      const wasSignedOut = !this.currentUser;
      this.currentUser = user;
      if (user && wasSignedOut) await this._dataMgr.handleSignIn(user);
      if (!user && !wasSignedOut) {
        if (!this._skipSignOutMsg) this.statusMsg = 'Signed out.';
        this._skipSignOutMsg = false;
      }
    });

    // Check for a share URL (?share=id) or legacy loop URL (?v=id&s=start&e=end).
    // If present, load the shared content and skip normal restore.
    const didLoadShare = await this._dataMgr.handleStartupShare();

    // Otherwise restore the last-used video on startup -- cue without auto-playing.
    if (!didLoadShare && this._appState.currentVideoId) {
      const video = this._appState.videos.find(v => v.id === this._appState.currentVideoId);
      if (video) {
        this._syncFromVideo(video);
        const _startAt = this.looping && this.loopStart < this.loopEnd ? this.loopStart : video.time ?? 0;
        this._vc.cueVideo(video.id, _startAt);
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

      // Zoom boundary enforcement: pause at zoom end; snap to zoom start
      // if playhead lands before it (e.g. on resume with an active zoom).
      if (this.zoomSource && t !== null) {
        if (t >= this.zoomSource.end) {
          if (this.looping && this.loopStart < this.loopEnd) {
            // Respect loop start if it's within the zoom; otherwise fall back
            // to zoom start.
            this._vc.seekTo(Math.max(this.zoomSource.start, this.loopStart));
          } else if (this.looping) {
            this._vc.seekTo(this.zoomSource.start);
          } else {
            this._vc.pause();
          }
        } else if (t < this.zoomSource.start) {
          this._vc.seekTo(this.zoomSource.start);
        }
      }

      // Loop enforcement: when looping is on and playhead reaches the end
      // point, seek back to the start point (clamped to zoom start if active).
      if (this.looping && this.loopStart < this.loopEnd
          && t !== null && t >= this.loopEnd) {
        const target = this.zoomSource
          ? Math.max(this.zoomSource.start, this.loopStart)
          : this.loopStart;
        this._vc.seekTo(target);
      }
    }, 500);

    // Expose for console testing in dev mode.
    if (import.meta.env.DEV) {
      window._ll.state            = this._appState;
      window._ll.vc               = this._vc;
      window._ll.kb               = this._kb;
      window._ll.createVideoShare = () => this._dataMgr.createVideoShare();
      window._ll.createLoopShare  = () => this._dataMgr.createLoopShare();
      window._ll.auth = { signInWithGoogle, signInWithGitHub, signOut, getUser };
      window._ll.currentUser = () => this.currentUser;
    }
  }

  _enterEditScratch() {
    this._kb.disable();
    this.editScratchActive   = true;
    this.editScratchFocus    = 'start';
    this._editScratchHandler = (e) => this._editScratchKeyDown(e);
    // Blur any focused element (including deep inside shadow DOM) so that
    // Shoelace dropdown triggers don't intercept arrow keys.
    let el = document.activeElement;
    while (el?.shadowRoot?.activeElement) el = el.shadowRoot.activeElement;
    el?.blur();
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
      const delta = (key === 'ArrowRight' ? 1 : -1) * this.loopNudgeDelta;
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
      const choices = [...(this._appState?.options.loop_nudge_delta_choices ?? DEFAULT_OPTIONS.loop_nudge_delta_choices)].sort((a, b) => a - b);
      const idx = choices.indexOf(this.loopNudgeDelta);
      if (key === 'ArrowUp') {
        this.loopNudgeDelta = choices[Math.min(idx + 1, choices.length - 1)];
      } else {
        this.loopNudgeDelta = choices[Math.max(idx - 1, 0)];
      }
      return;
    }

    if (key === ' ') {
      event.preventDefault();
      const seekTo = this.editScratchFocus === 'start'
        ? this.loopStart
        : Math.max(0, this.loopEnd - 3);
      this._vc?.seekTo(seekTo);
      if (!this._vc?.isPlaying()) this._vc?.play();
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

  disconnectedCallback() {
    super.disconnectedCallback();
    clearInterval(this._pollId);
    clearTimeout(this._warnTimeout);
    clearTimeout(this._statusTimeout);
    clearTimeout(this._errorTimeout);
    this._kb?.destroy();
    if (this._editScratchHandler) {
      document.removeEventListener('keydown', this._editScratchHandler);
    }
    this._unsubscribeAuth?.();
  }


  _loadUrl(raw) {
    raw = raw.trim();
    if (!raw) return;

    const parsed = parseVideoInput(raw);
    if (!parsed) {
      this._setWarning('Invalid YouTube URL or ID.');
      return;
    }

    // Find or create a video entry in the registry.
    let video = this._appState.videos.find(v => v.id === parsed.id);
    if (!video) {
      video = createVideo(raw, parsed.id);
      this._appState.videos.push(video);
      this.videos = [...this._appState.videos];
      this._pendingNewVideoId = parsed.id;
    } else {
      this._pendingNewVideoId = null;
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
    this._loadVideoObject(video, null, 'Video: opened.');
    this.videos = [...this._appState.videos];
  }

  // Handle ll-update-video from the edit-video-modal.
  _onUpdateVideo(e) {
    const { id, name, start, end } = e.detail;
    const video = this._appState?.videos.find(v => v.id === id);
    if (!video) return;
    this.statusMsg = 'Video: edited.';
    this._pushUndoSnapshot();
    video.name  = name;
    video.start = start;
    video.end   = end;
    this.videos = [...this._appState.videos];
    this._save();
  }

  // Handle ll-delete-video from the edit-video-modal or video picker (delete mode).
  _onDeleteVideo(e) {
    const { id } = e.detail;
    const idx = this._appState?.videos.findIndex(v => v.id === id);
    if (idx == null || idx === -1) return;
    this.statusMsg = 'Video: deleted.';
    this._appState.stashes[id] = JSON.parse(JSON.stringify(this._appState.videos[idx]));
    this._appState.videos.splice(idx, 1);
    if (this.currentVideoId === id) {
      this._clearCurrentVideoState();
    }
    this.stashes = { ...this._appState.stashes };
    this.videos  = [...this._appState.videos];
    this._save();
  }

  // Handle ll-restore-video from the video picker (restore mode).
  // Unstash a video. If the video is still in the library, swap (current → stash,
  // stash → library). If it was deleted, re-add the stash at end and drop the entry.
  _onRestoreVideo(e) {
    const { id } = e.detail;
    const stash = this._appState.stashes?.[id];
    if (!stash) return;
    this.statusMsg = 'Video: unstashed.';
    const idx = this._appState.videos.findIndex(v => v.id === id);
    if (idx !== -1) {
      const current = JSON.parse(JSON.stringify(this._appState.videos[idx]));
      this._appState.stashes[id] = current;
      this._appState.videos[idx] = stash;
      if (this.currentVideoId === id) this._syncFromVideo(stash);
    } else {
      this._appState.videos.push(stash);
      delete this._appState.stashes[id];
    }
    this.stashes = { ...this._appState.stashes };
    this.videos  = [...this._appState.videos];
    this._save();
  }

  // Show a transient warning; auto-clears after 4 seconds (via updated()).
  _setWarning(msg) {
    this.warningMsg = msg;
  }

  // Show a transient error; auto-clears after 4 seconds (via updated()).
  _setError(msg) {
    this.errorMsg = msg;
  }

  // Clamp to zoom, then seek. Used by all user-initiated jumps
  // (seek delta, timeline clicks).
  _jumpTo(t) {
    if (this.zoomSource) {
      t = Math.max(this.zoomSource.start, Math.min(this.zoomSource.end, t));
    }
    this._maybePushJump(this._vc?.getCurrentTime() ?? 0, t);
    this._vc?.seekTo(t);
  }

  // Like _jumpTo, but for explicit user jumps (entity navigation, pickers,
  // jump-by-time). Clears looping only if the target falls outside the
  // current scratch loop bounds; leaves looping on if the target is inside.
  _jumpToExplicit(t) {
    if (this.zoomSource) {
      t = Math.max(this.zoomSource.start, Math.min(this.zoomSource.end, t));
    }
    if (this.looping && this.loopStart < this.loopEnd
        && (t < this.loopStart || t > this.loopEnd)) {
      this._clearLoopingIfActive();
    }
    this._maybePushJump(this._vc?.getCurrentTime() ?? 0, t);
    this._vc?.seekTo(t);
  }

  _seek(delta) {
    let t = (this._vc?.getCurrentTime() ?? 0) + delta;
    if (this.looping && this.loopStart < this.loopEnd) {
      t = Math.max(this.loopStart, Math.min(this.loopEnd, t));
    }
    this._jumpTo(t);
  }

  _onPlayPause() {
    if (!this.currentVideoId) return;
    if (this._vc?.isPlaying()) {
      this._vc.pause();
    } else {
      // If zoomed and playhead is at/past zoom end, restart from zoom start
      // (mirrors the virtual-video model: play-at-end restarts from beginning).
      if (this.zoomSource && this.currentTime >= this.zoomSource.end) {
        const restartAt = (this.looping && this.loopStart < this.loopEnd)
          ? Math.max(this.zoomSource.start, this.loopStart)
          : this.zoomSource.start;
        this._vc?.seekTo(restartAt);
      }
      this._vc?.play();
    }
  }

  _onSeekForward() {
    if (!this.currentVideoId) return;
    this._seek(this.seekDelta);
  }

  _onSeekBack() {
    if (!this.currentVideoId) return;
    this._seek(-this.seekDelta);
  }

  _isLoopValid() {
    return this.loopStart < this.loopEnd;
  }

  _autoDisableLoopIfInvalid() {
    if (this.looping && !this._isLoopValid()) this.looping = false;
  }

  // Clear zoomSource if the given range doesn't fit within it.
  // Called before any operation that sets new scratch-loop bounds.
  _clearZoomIfOutside(start, end) {
    if (!this.zoomSource) return;
    if (start < this.zoomSource.start || end > this.zoomSource.end) {
      this.zoomSource = null;
    }
  }

  // If playhead is outside the active zoom range, seek to the zoom start.
  _seekIntoZoomIfNeeded() {
    if (!this.zoomSource) return;
    const t = this._vc?.getCurrentTime() ?? this.currentTime;
    if (t < this.zoomSource.start || t > this.zoomSource.end) {
      this._vc?.seekTo(this.zoomSource.start);
    }
  }

  // When looping is just enabled, seek to loopStart if the playhead is
  // outside [loopStart, loopEnd].
  _seekIntoLoopIfNeeded() {
    const t = this._vc?.getCurrentTime();
    if (t == null) return;
    if (t < this.loopStart || t >= this.loopEnd) {
      this._vc.seekTo(this.loopStart);
    }
  }

  _clearLoopingIfActive() {
    if (this.looping) {
      this.looping = false;
      this._saveCurrentState();
      this.statusMsg = 'Looping off.';
    }
  }

  _toggleLoop() {
    if (!this.looping && !this._isLoopValid()) {
      this._setWarning('Cannot activate scratch loop: invalid range.');
      return;
    }
    this.looping = !this.looping;
    if (this.looping) this._seekIntoLoopIfNeeded();
    this.statusMsg = `Scratch loop: ${this.looping ? 'on' : 'off'}.`;
  }

  _onToggleLoop() {
    if (!this.currentVideoId) return;
    this._toggleLoop();
  }

  _onSetLoopStartNow() {
    if (!this.currentVideoId) return;
    this.loopStart = this.currentTime;
    this._autoDisableLoopIfInvalid();
  }

  _onSetLoopEndNow() {
    if (!this.currentVideoId) return;
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

  // Collect all entity time points for the given type, deduped and sorted.
  // 'any' combines all types.
  _getEntityTimes(type) {
    const times = new Set();
    const add = (t) => { if (t != null && isFinite(t)) times.add(t); };
    if (type === 'any' || type === 'section') this.sections.forEach(s => add(s.start));
    if (type === 'any' || type === 'loop')    this.namedLoops.forEach(l => add(l.start));
    if (type === 'any' || type === 'mark')    this.marks.forEach(m => add(m.time));
    if (type === 'any' || type === 'chapter') this.chapters.forEach(c => add(c.start));

    return [...times].sort((a, b) => a - b);
  }

  // Seek to the previous or next entity of the active type.
  // Uses a small epsilon so that being near an entity's time doesn't get stuck.
  _navigateEntity(direction, count = 1) {
    const time  = this._vc?.getCurrentTime() ?? this.currentTime;
    const times = this._getEntityTimes(this.activeEntityType);
    if (!times.length) return;
    // Larger epsilon for prev: skip entities within 2s behind the playhead,
    // so that pressing prev while playing jumps to the entity before the current
    // one rather than snapping back a fraction of a second.
    const EPS = direction === 'prev' ? 2.0 : 0.1;
    let target = null;
    if (direction === 'prev') {
      const candidates = times.filter(t => t < time - EPS);
      if (candidates.length) target = candidates[Math.max(candidates.length - count, 0)];
    } else {
      const candidates = times.filter(t => t > time + EPS);
      if (candidates.length) target = candidates[Math.min(count - 1, candidates.length - 1)];
    }
    if (target != null) this._jumpToExplicit(target);
  }

  _onEntityTypeChange(e) {
    this.activeEntityType = e.detail.value;
  }

  _onDeleteSection(e) {
    this.statusMsg = 'Section: deleted.';
    this._pushUndoSnapshot();
    deleteSectionById(this.sections, e.detail.id);
    this.sections = [...this.sections];
    if (this.loopSrc?.id === e.detail.id) this.loopSrc = null;
    if (this.zoomSource?.trigger === 'section') this.zoomSource = null;
    this._saveCurrentState();
  }

  _onDeleteMark(e) {
    this.statusMsg = 'Mark: deleted.';
    this._pushUndoSnapshot();
    deleteMarkById(this.marks, e.detail.id);
    this.marks = [...this.marks];
    if (this.loopSrc?.id === e.detail.id) this.loopSrc = null;
    this._saveCurrentState();
  }


  // Handle ll-update-loop from save-loop modal (edit mode): update the loop
  // in place, trigger re-render, and persist.
  _onUpdateLoop(e) {
    this.statusMsg = 'Loop: edited.';
    this._pushUndoSnapshot();
    updateLoop(this.namedLoops, e.detail.id, {
      name:  e.detail.name,
      start: e.detail.start,
      end:   e.detail.end,
    });
    this.namedLoops = [...this.namedLoops];
    this._saveCurrentState();
  }

  // Handle ll-activate-loop from timeline zone click: jump to loop start.
  _onActivateLoop(e) {
    const loop = this.namedLoops.find(l => l.id === e.detail.id);
    if (!loop) return;
    this._jumpToExplicit(loop.start);
  }

  // Handle ll-jump-loop from loop picker (mode='jump').
  _onJumpLoop(e) {
    this._jumpToExplicit(e.detail.start);
  }

  _onSeekTo(e) {
    this._jumpToExplicit(e.detail.time);
  }

  _onDeleteLoop(e) {
    this.statusMsg = 'Loop: deleted.';
    this._pushUndoSnapshot();
    deleteLoopById(this.namedLoops, e.detail.id);
    this.namedLoops = [...this.namedLoops];
    if (this.loopSrc?.id === e.detail.id) this.loopSrc = null;
    this._saveCurrentState();
  }

  // Open the loop picker in the given mode, with a guard for empty list.
  _openLoopsPicker(mode) {
    if (!this.namedLoops.length) {
      this._setWarning('No loops.');
      return;
    }
    this._loopPickerEl?.show(mode);
  }

  // Open the marks picker in the given mode, with a guard for empty list.
  _openMarksPicker(mode) {
    if (!this.marks.length) {
      this._setWarning('No marks.');
      return;
    }
    this._marksPickerEl?.show(mode);
  }

  // Handle ll-jump-mark from marks picker (mode='jump').
  _onJumpMark(e) {
    this._jumpToExplicit(e.detail.time);
  }

  // Edit the current mark (me): find mark nearest to left, open edit modal.
  _editCurrentMark() {
    const mark = nearestMarkLeft(this.marks, this.currentTime);
    if (!mark) { this._setWarning('No current mark.'); return; }
    this._editMarkModalEl?.show(mark);
  }

  // Handle ll-update-mark from edit-mark-modal.
  _onUpdateMark(e) {
    const { id, name, time } = e.detail;
    const mark = this.marks.find(m => m.id === id);
    if (!mark) return;
    this.statusMsg = 'Mark: edited.';
    this._pushUndoSnapshot();
    mark.name = name;
    mark.time = time;
    this.marks = [...this.marks].sort((a, b) => a.time - b.time);
    this._saveCurrentState();
  }

  // Open the sections picker in the given mode, with a guard for empty list.
  _openSectionsPicker(mode) {
    if (!this.sections.length) {
      this._setWarning('No sections.');
      return;
    }
    this._sectionsPickerEl?.show(mode);
  }

  // Returns entity-type configuration for section/chapter handler helpers.
  _getDividerCtx(type) {
    if (type === 'section') {
      return {
        entities:    this.sections,
        setEntities: (v) => { this.sections = v; },
        modalEl:     this._editSectionModalEl,
        label:       'Section',
        addFn:       addSection,
        nearestFn:   nearestSectionLeft,
        getBoundsFn: getSectionBounds,
        fixEndFn:    fixSectionEnd,
      };
    }
    return {
      entities:    this.chapters,
      setEntities: (v) => { this.chapters = v; },
      modalEl:     this._editChapterModalEl,
      label:       'Chapter',
      addFn:       addChapterDivider,
      nearestFn:   nearestChapterLeft,
      getBoundsFn: getChapterBounds,
      fixEndFn:    fixChapterEnd,
    };
  }

  // Unified handlers for the five section/chapter action pairs (R2-3).
  // Each method accepts a type string ('section' or 'chapter') and
  // dispatches to the appropriate data functions via _getDividerCtx.

  _scratchDivider(type) {
    const { entities, label, nearestFn, getBoundsFn } = this._getDividerCtx(type);
    const bounds = getBoundsFn(entities, this.currentTime, this.duration);
    if (!bounds || bounds.end == null) {
      this._setWarning(`No current ${label.toLowerCase()}.`);
      return;
    }
    const entity   = nearestFn(entities, this.currentTime);
    const padStart = this._appState?.options.loop_pad_start ?? DEFAULT_OPTIONS.loop_pad_start;
    const padEnd   = this._appState?.options.loop_pad_end   ?? DEFAULT_OPTIONS.loop_pad_end;
    const newStart = Math.max(0, bounds.start - padStart);
    const newEnd   = Math.min(this.duration ?? Infinity, bounds.end + padEnd);
    this._clearZoomIfOutside(newStart, newEnd);
    this.loopStart = newStart;
    this.loopEnd   = newEnd;
    this.looping   = true;
    this.loopSrc   = { id: entity?.id ?? null, label: entity?.name || null, type, start: bounds.start, end: bounds.end };
    this.statusMsg = `${label}: scratched.`;
  }

  _setDivider(type) {
    const { entities, setEntities, label, addFn, nearestFn } = this._getDividerCtx(type);
    const lbl  = label.toLowerCase();
    const time = this._vc?.getCurrentTime() ?? 0;
    const containing = nearestFn(entities, time);
    if (containing && containing.end != null && time <= containing.end) {
      this._setWarning(`Cannot create ${lbl}: inside a fixed ${lbl}.`);
      return;
    }
    const entity = addFn(entities, time);
    if (!entity) {
      this._setWarning(`Cannot create ${lbl}: too close to an existing one.`);
      return;
    }
    this.statusMsg = `${label}: created.`;
    this._pushUndoSnapshot();
    setEntities([...entities]);
    this._saveCurrentState();
  }

  _fixDivider(type) {
    const { entities, setEntities, label, nearestFn, fixEndFn } = this._getDividerCtx(type);
    const lbl    = label.toLowerCase();
    const entity = nearestFn(entities, this.currentTime);
    if (!entity) {
      this._setWarning(`No current ${lbl}.`);
      return;
    }
    if (entity.end != null) {
      this.statusMsg = `${label}: end unfixed.`;
      this._pushUndoSnapshot();
      entity.end = null;
    } else {
      if (this.duration == null) {
        this._setError(`Cannot fix ${lbl} end: video duration unknown.`);
        return;
      }
      this.statusMsg = `${label}: end fixed.`;
      this._pushUndoSnapshot();
      fixEndFn(entities, entity.id, this.duration);
    }
    setEntities([...entities]);
    this._saveCurrentState();
  }

  _zoomDivider(type) {
    const { entities, label, getBoundsFn } = this._getDividerCtx(type);
    if (this.zoomSource?.trigger === type) {
      this.zoomSource = null;
      this.statusMsg  = 'Zoom: off.';
      return;
    }
    const bounds = getBoundsFn(entities, this.currentTime, this.duration);
    if (!bounds || bounds.end == null) {
      this._setWarning(`No current ${label.toLowerCase()}.`);
      return;
    }
    this.zoomSource = { start: bounds.start, end: bounds.end, trigger: type };
    this.statusMsg  = `${label}: zoomed.`;
    this._seekIntoZoomIfNeeded();
  }

  // Edit the divider nearest the playhead without a picker (se/ce bindings).
  _editCurrentDivider(type) {
    const { entities, label, nearestFn, getBoundsFn, modalEl } = this._getDividerCtx(type);
    const entity = nearestFn(entities, this.currentTime);
    if (!entity) {
      this._setWarning(`No current ${label.toLowerCase()}.`);
      return;
    }
    const bounds     = getBoundsFn(entities, entity.start, this.duration);
    const derivedEnd = (entity.end == null) ? (bounds?.end ?? null) : null;
    const idx        = entities.findIndex(e => e.id === entity.id);
    const validator  = (start, end) => validateEntityChange(entities, idx, start, end, this.duration);
    modalEl?.show(entity, derivedEnd, validator);
  }

  // Open the chapter picker in the given mode, with a guard for empty list.
  _openChapterPicker(mode) {
    if (!this.chapters.length) {
      this._setWarning('No chapters.');
      return;
    }
    this._chapterPickerEl?.show(mode);
  }

  // Handle ll-jump-chapter from chapter picker (mode='jump').
  _onJumpChapter(e) {
    this._jumpToExplicit(e.detail.time);
  }


  // Handle ll-update-chapter from edit-chapter-modal.
  _onUpdateChapter(e) {
    const { id, name, start, end } = e.detail;
    const idx = this.chapters.findIndex(c => c.id === id);
    if (idx === -1) return;
    this.statusMsg = 'Chapter: edited.';
    this._pushUndoSnapshot();
    this.chapters[idx].name = name;
    propagateEntityChange(this.chapters, idx, start, end);
    this.chapters  = [...this.chapters];
    this._saveCurrentState();
  }

  // Handle ll-delete-chapter from chapter picker (mode='delete').
  _onDeleteChapter(e) {
    this.statusMsg = 'Chapter: deleted.';
    this._pushUndoSnapshot();
    deleteChapterById(this.chapters, e.detail.id);
    this.chapters = [...this.chapters];
    if (this.loopSrc?.id === e.detail.id) this.loopSrc = null;
    if (this.zoomSource?.trigger === 'chapter') this.zoomSource = null;
    this._saveCurrentState();
  }

  // Handle ll-jump-history from jump-history-picker.
  _onJumpHistory(e) {
    this._jumpToExplicit(e.detail.time);
  }

  // Thin wrappers for modal event handlers used in render() that delegate to
  // DataOpsManager. The actual logic and promise resolution live in _dataMgr.
  _onFileImport(e)          { this._dataMgr.onFileImport(e); }
  _onDataOpResult(e)        { this._dataMgr.onDataOpResult(e); }
  _onShareConflictReplace() { this._dataMgr.onShareConflictReplace(); }
  _onShareConflictSkip()    { this._dataMgr.onShareConflictSkip(); }

  _onLoadExamplesResult(e) {
    this._loadExamplesResolve?.(e.detail);
    this._loadExamplesResolve = null;
  }

  // Handle ll-jump-section from sections picker (mode='jump').
  _onJumpSection(e) {
    this._jumpToExplicit(e.detail.start);
  }

  // Handle ll-update-section from edit-section-modal.
  _onUpdateSection(e) {
    const { id, name, start, end } = e.detail;
    const idx = this.sections.findIndex(s => s.id === id);
    if (idx === -1) return;
    this.statusMsg = 'Section: edited.';
    this._pushUndoSnapshot();
    this.sections[idx].name = name;
    propagateEntityChange(this.sections, idx, start, end);
    this.sections = [...this.sections];
    this._saveCurrentState();
  }

  // Handle ll-delete-data from the delete-data-modal.
  _onDeleteData(e) {
    const { mode } = e.detail;

    if (mode === 'videos') {
      const { videoIds } = e.detail;
      this.statusMsg = 'Data: deleted.';
      const deletedSet = new Set(videoIds);
      for (const v of this._appState.videos) {
        if (deletedSet.has(v.id)) {
          this._appState.stashes[v.id] = JSON.parse(JSON.stringify(v));
        }
      }
      this._appState.videos = this._appState.videos.filter(v => !deletedSet.has(v.id));
      if (deletedSet.has(this.currentVideoId)) {
        this._clearCurrentVideoState();
      }
      this.stashes = { ...this._appState.stashes };
      this.videos  = [...this._appState.videos];
      this._save();

    } else {
      // mode === 'current'
      const { sections, loops, marks, chapters } = e.detail;
      this.statusMsg = 'Data: deleted.';
      this._pushUndoSnapshot();
      this.sections   = this.sections.filter(s => !sections.includes(s.id));
      this.namedLoops = this.namedLoops.filter(l => !loops.includes(l.id));
      this.marks      = this.marks.filter(m => !marks.includes(m.id));
      this.chapters   = this.chapters.filter(c => !chapters.includes(c.id));
      // Clear stale loop source if the named loop it pointed to was removed.
      if (this.loopSrc?.type === 'loop' && !this.namedLoops.find(l => l.id === this.loopSrc.id)) {
        this.loopSrc = null;
      }
      this._saveCurrentState();
    }
  }

  // Handle ll-menu-select from llama-controls menus.
  // Dispatches to the same handlers used by keyboard bindings.
  _onMenuSelect(e) {
    const handler = this._handlers?.[e.detail.action];
    if (handler) handler();
  }

  // Build the Account dropdown items based on current auth state.
  _accountMenuItems() {
    const items = [];
    if (this.currentUser) {
      items.push({ label: this.currentUser.email, action: '', disabled: true });
      items.push({ type: 'divider' });
      items.push({ label: 'Sign out',                       action: 'signOut'       });
      items.push({ label: 'Sign out and remove cloud data', action: 'signOutRemove' });
    } else {
      items.push({ label: 'Sign in with Google', action: 'signInGoogle' });
      items.push({ label: 'Sign in with GitHub', action: 'signInGitHub' });
    }
    items.push({ type: 'divider' });
    items.push({ label: 'Why sign in?',   action: 'whySignIn'     });
    items.push({ label: 'Privacy policy', action: 'privacyPolicy' });
    return items;
  }

  _onAccountMenuSelect(e) {
    const { action } = e.detail;
    if (action === 'signInGoogle')  signInWithGoogle();
    if (action === 'signInGitHub')  signInWithGitHub();
    if (action === 'signOut')       signOut();
    if (action === 'signOutRemove') this._dataMgr.signOutAndRemoveCloudData();
    if (action === 'whySignIn')     window.open(`${_siteOrigin()}/loopllama/v2/help/#why-sign-in`, '_blank');
    if (action === 'privacyPolicy') window.open(`${_siteOrigin()}/loopllama/v2/help/#privacy-policy`, '_blank');
  }

  _nextQuip() {
    if (this._quipPos >= this._quipDeck.length) {
      const lastIdx = this._quipDeck[this._quipDeck.length - 1];
      this._quipDeck = _shuffleQuipDeck(lastIdx);
      this._quipPos = 0;
    }
    this._quip = QUIPS[this._quipDeck[this._quipPos++]];
    this.requestUpdate();
  }

  _onQuipEnter() {
    this._quipDeck = _shuffleQuipDeck();
    this._quipPos = 0;
    this._nextQuip();
    this._quipInterval = setInterval(() => this._nextQuip(), QUIP_INTERVAL_MS);
  }

  _onQuipLeave() {
    clearInterval(this._quipInterval);
    this._quipInterval = null;
    this._quip = '';
    this.requestUpdate();
  }

  _isLoopDirty() {
    if (!this.loopSrc) return false;
    const padStart = (this.loopSrc.type !== 'loop')
      ? (this._appState?.options.loop_pad_start ?? DEFAULT_OPTIONS.loop_pad_start) : 0;
    const padEnd = (this.loopSrc.type !== 'loop')
      ? (this._appState?.options.loop_pad_end   ?? DEFAULT_OPTIONS.loop_pad_end)   : 0;
    const expectedStart = Math.max(0, this.loopSrc.start - padStart);
    const expectedEnd   = Math.min(this.duration ?? Infinity, this.loopSrc.end + padEnd);
    return this.loopStart !== expectedStart || this.loopEnd !== expectedEnd;
  }

  render() {
    const currentVideo   = this._appState?.videos.find(v => v.id === this.currentVideoId) ?? null;
    const currentChapter = nearestChapterLeft(this.chapters, this.currentTime);
    const currentSection = nearestSectionLeft(this.sections, this.currentTime);
    const loopDirty      = this._isLoopDirty();
    const zoomLabel = (() => {
      if (!this.zoomSource) return null;
      const { trigger, start, end } = this.zoomSource;
      if (trigger === 'loop') {
        const loop = this.namedLoops.find(l => l.start === start && l.end === end);
        return loop?.name ? `Loop: ${loop.name}` : `Loop: ${fmtTimePlain(start)} – ${fmtTimePlain(end)}`;
      }
      if (trigger === 'scratch') {
        return `Scratch loop: ${fmtTimePlain(start)} – ${fmtTimePlain(end)}`;
      }
      if (trigger === 'section') {
        const sec = nearestSectionLeft(this.sections, start);
        return sec?.name ? `Section: ${sec.name}` : `Section: ${fmtTimePlain(start)}`;
      }
      if (trigger === 'chapter') {
        const ch = this.chapters.find(c => c.start === start);
        return ch?.name ? `Chapter: ${ch.name}` : `Chapter: ${fmtTimePlain(start)}`;
      }
      if (trigger === 'video') {
        const video = this._appState?.videos.find(v => v.id === this.currentVideoId);
        return video?.name ? `Video: ${video.name}` : `Video: ${fmtTimePlain(start)} – ${fmtTimePlain(end)}`;
      }
      return null;
    })();
    return html`
      <header class="app-header">
        <span class="app-title">LoopLlama</span>
        <div class="header-llama-wrap">
          <img src="${import.meta.env.BASE_URL}llama-mascot.png" class="header-llama" alt=""
            @mouseenter=${this._onQuipEnter}
            @mouseleave=${this._onQuipLeave}
          >
          <span class="header-quip ${this._quip ? 'visible' : ''}">${this._quip}</span>
        </div>
        <nav class="header-nav">
          <img src="${import.meta.env.BASE_URL}flag-golden.svg" class="header-flag" alt="">
          <span class="nav-sep">|</span>
          <llama-dropdown
            label="Help"
            .items=${HELP_MENU_ITEMS}
            @ll-menu-select=${this._onMenuSelect}
          ></llama-dropdown>
          <span class="nav-sep">|</span>
          <llama-dropdown
            label="Account"
            .items=${this._accountMenuItems()}
            @ll-menu-select=${this._onAccountMenuSelect}
          ></llama-dropdown>
        </nav>
      </header>

      <div class="app-body">
        <div class="app-main">
          <div class="video-col">
            <div class="player-wrap">
              <div id="player-container"></div>
              ${!this.currentVideoId ? html`<div class="player-overlay"></div>` : ''}
            </div>
            <llama-timeline
              .videoId=${this.currentVideoId}
              .currentTime=${this.currentTime}
              .duration=${this.duration}
              .sections=${this.sections}
              .chapters=${this.chapters}
              .zone2Mode=${this.zone2Mode}
              .marks=${this.marks}
              .namedLoops=${this.namedLoops}
              .loopStart=${this.loopStart}
              .loopEnd=${this.loopEnd}
              .zoomed=${!!this.zoomSource}
              .scopeStart=${this.zoomSource?.start ?? null}
              .scopeEnd=${this.zoomSource?.end ?? null}
              @ll-seek-to=${this._onSeekTo}
              @ll-activate-loop=${this._onActivateLoop}
            ></llama-timeline>
          </div>
        </div>
        <llama-controls
          .currentTime=${this.currentTime}
          .speed=${this.speed}
          .isPlaying=${this.isPlaying}
          .looping=${this.looping}
          .loopStart=${this.loopStart}
          .loopEnd=${this.loopEnd}
          .loopSrc=${this.loopSrc}
          .seekDelta=${this.seekDelta}
          .seekDeltaChoices=${this._appState?.options.seek_delta_choices ?? DEFAULT_OPTIONS.seek_delta_choices}
          .loopNudgeDelta=${this.loopNudgeDelta}
          .loopNudgeDeltaChoices=${this._appState?.options.loop_nudge_delta_choices ?? DEFAULT_OPTIONS.loop_nudge_delta_choices}
          .editScratchActive=${this.editScratchActive}
          .editScratchFocus=${this.editScratchFocus}
          .activeEntityType=${this.activeEntityType}
          @ll-play-pause=${this._onPlayPause}
          @ll-seek-to=${(e) => this._jumpToExplicit(e.detail.value)}
          @ll-seek-forward=${this._onSeekForward}
          @ll-seek-back=${this._onSeekBack}
          @ll-seek-delta-change=${(e) => { this.seekDelta = e.detail.value; }}
          @ll-loop-nudge-delta-change=${(e) => { this.loopNudgeDelta = e.detail.value; }}
          @ll-toggle-loop=${this._onToggleLoop}
          @ll-set-loop-start-now=${this._onSetLoopStartNow}
          @ll-set-loop-end-now=${this._onSetLoopEndNow}
          @ll-loop-start-change=${this._onLoopStartChange}
          @ll-loop-end-change=${this._onLoopEndChange}
          @ll-speed-change=${(e) => { const v = Math.max(MIN_SPEED, Math.min(MAX_SPEED, e.detail.value)); this._vc?.setPlaybackRate(v); this.speed = v; this._saveCurrentState(); }}
          @ll-prev-entity=${() => this._navigateEntity('prev')}
          @ll-next-entity=${() => this._navigateEntity('next')}
          @ll-entity-type-change=${this._onEntityTypeChange}
          @ll-invalid-time=${() => this._setWarning('Invalid time.')}
          @ll-menu-select=${this._onMenuSelect}
          @ll-menu-open=${() => this._kb?.disable()}
          @ll-menu-close=${() => { if (!this.editScratchActive) this._kb?.enable(); }}
        ></llama-controls>

        <llama-current
          .videoName=${currentVideo?.name ?? ''}
          .videoId=${currentVideo?.id ?? null}
          .chapterName=${currentChapter?.name ?? null}
          .sectionName=${currentSection?.name ?? null}
          .loopSrc=${this.loopSrc}
          .loopDirty=${loopDirty}
          .duration=${this.duration}
          .zoomLabel=${zoomLabel}
          .zone2Mode=${this.zone2Mode}
        ></llama-current>
      </div>


      <llama-url-input-modal
        @ll-modal-open=${() => this._kb?.disable()}
        @ll-modal-close=${() => this._kb?.enable()}
        @ll-load-url=${this._onLoadUrl}
      ></llama-url-input-modal>

      <llama-video-picker
        .videos=${this.videos}
        .stashes=${this.stashes}
        .currentVideoId=${this.currentVideoId}
        @ll-modal-open=${() => this._kb?.disable()}
        @ll-modal-close=${() => this._kb?.enable()}
        @ll-pick-video=${this._onPickVideo}
        @ll-delete-video=${this._onDeleteVideo}
        @ll-restore-video=${this._onRestoreVideo}
      ></llama-video-picker>

      <llama-edit-video-modal
        .video=${currentVideo}
        @ll-modal-open=${() => this._kb?.disable()}
        @ll-modal-close=${() => this._kb?.enable()}
        @ll-update-video=${this._onUpdateVideo}
        @ll-delete-video=${this._onDeleteVideo}
      ></llama-edit-video-modal>

      <llama-save-loop-modal
        @ll-modal-open=${() => this._kb?.disable()}
        @ll-modal-close=${() => this._kb?.enable()}
        @ll-update-loop=${this._onUpdateLoop}
      ></llama-save-loop-modal>

      <llama-loop-picker
        .namedLoops=${this.namedLoops}
        .loopSource=${this.loopSrc?.id ?? null}
        @ll-modal-open=${() => this._kb?.disable()}
        @ll-modal-close=${() => this._kb?.enable()}
        @ll-jump-loop=${this._onJumpLoop}
        @ll-delete-loop=${this._onDeleteLoop}
      ></llama-loop-picker>

      <llama-marks-picker
        .marks=${this.marks}
        @ll-modal-open=${() => this._kb?.disable()}
        @ll-modal-close=${() => this._kb?.enable()}
        @ll-jump-mark=${this._onJumpMark}
        @ll-delete-mark=${this._onDeleteMark}
      ></llama-marks-picker>

      <llama-edit-mark-modal
        @ll-modal-open=${() => this._kb?.disable()}
        @ll-modal-close=${() => this._kb?.enable()}
        @ll-update-mark=${this._onUpdateMark}
      ></llama-edit-mark-modal>

      <llama-sections-picker
        .sections=${this.sections}
        .activeSectionId=${nearestSectionLeft(this.sections, this.currentTime)?.id ?? null}
        @ll-modal-open=${() => this._kb?.disable()}
        @ll-modal-close=${() => this._kb?.enable()}
        @ll-jump-section=${this._onJumpSection}
        @ll-delete-section=${this._onDeleteSection}
      ></llama-sections-picker>

      <llama-edit-section-modal
        @ll-modal-open=${() => this._kb?.disable()}
        @ll-modal-close=${() => this._kb?.enable()}
        @ll-update-section=${this._onUpdateSection}
      ></llama-edit-section-modal>

      <llama-chapter-picker
        .chapters=${this.chapters}
        .activeChapterId=${nearestChapterLeft(this.chapters, this.currentTime)?.id ?? null}
        @ll-modal-open=${() => this._kb?.disable()}
        @ll-modal-close=${() => this._kb?.enable()}
        @ll-jump-chapter=${this._onJumpChapter}
        @ll-delete-chapter=${this._onDeleteChapter}
      ></llama-chapter-picker>

      <llama-edit-chapter-modal
        @ll-modal-open=${() => this._kb?.disable()}
        @ll-modal-close=${() => this._kb?.enable()}
        @ll-update-chapter=${this._onUpdateChapter}
      ></llama-edit-chapter-modal>

      <llama-video-info-modal
        .video=${currentVideo}
        .chapters=${this.chapters}
        .sections=${this.sections}
        .namedLoops=${this.namedLoops}
        .marks=${this.marks}
        .duration=${this.duration}
        .undoCount=${this._undoMgr.undoCount}
        .redoCount=${this._undoMgr.redoCount}
        .stash=${this.stashes[this.currentVideoId] ?? null}
        @ll-modal-open=${() => this._kb?.disable()}
        @ll-modal-close=${() => this._kb?.enable()}
      ></llama-video-info-modal>

      <llama-jump-history-picker
        .jumps=${this.jumps}
        @ll-modal-open=${() => this._kb?.disable()}
        @ll-modal-close=${() => this._kb?.enable()}
        @ll-jump-history=${this._onJumpHistory}
      ></llama-jump-history-picker>

      <input
        id="import-file-input"
        type="file"
        accept=".json"
        style="display:none"
        @change=${this._onFileImport}
      >

      <llama-options-modal
        @ll-modal-open=${() => this._kb?.disable()}
        @ll-modal-close=${() => this._kb?.enable()}
        @ll-options-saved=${this._onOptionsSaved}
      ></llama-options-modal>

      <llama-delete-data-modal
        @ll-modal-open=${() => this._kb?.disable()}
        @ll-modal-close=${() => this._kb?.enable()}
        @ll-delete-data=${this._onDeleteData}
      ></llama-delete-data-modal>

      <llama-inspect-modal
        @ll-modal-open=${() => this._kb?.disable()}
        @ll-modal-close=${() => this._kb?.enable()}
      ></llama-inspect-modal>

      <llama-cloud-status-modal
        @ll-modal-open=${() => this._kb?.disable()}
        @ll-modal-close=${() => this._kb?.enable()}
      ></llama-cloud-status-modal>

      <llama-shared-video-conflict-modal
        @ll-modal-open=${() => this._kb?.disable()}
        @ll-share-conflict-replace=${this._onShareConflictReplace}
        @ll-share-conflict-skip=${this._onShareConflictSkip}
        @ll-modal-close=${() => this._kb?.enable()}
      ></llama-shared-video-conflict-modal>

      <llama-data-op-modal
        @ll-modal-open=${() => this._kb?.disable()}
        @ll-data-op-result=${this._onDataOpResult}
        @ll-modal-close=${() => this._kb?.enable()}
      ></llama-data-op-modal>

      <llama-load-examples-modal
        @ll-modal-open=${() => this._kb?.disable()}
        @ll-load-examples-result=${this._onLoadExamplesResult}
        @ll-modal-close=${() => this._kb?.enable()}
      ></llama-load-examples-modal>

      <llama-whichkey
        .prefix=${this.wkPrefix}
        .completions=${this.wkCompletions}
        .count=${this.wkCount}
        .windowFocused=${this.windowFocused}
        .editScratchActive=${this.editScratchActive}
        .warningMsg=${this.warningMsg}
        .errorMsg=${this.errorMsg}
        .statusMsg=${this.statusMsg}
      ></llama-whichkey>
    `;
  }
}

// Fisher-Yates shuffle of QUIPS indices into a fresh deck.
// avoidFirst: if set, swap deck[0] to avoid repeating the last quip
// of the previous cycle at position 0.
function _shuffleQuipDeck(avoidFirst = null) {
  const deck = QUIPS.map((_, i) => i);
  for (let i = deck.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [deck[i], deck[j]] = [deck[j], deck[i]];
  }
  if (avoidFirst !== null && deck[0] === avoidFirst && deck.length > 1) {
    [deck[0], deck[1]] = [deck[1], deck[0]];
  }
  return deck;
}

/// Reconstruct the ephemeral loopSrc object from persisted sourceId/sourceType
// and the current video's entity arrays. Returns { id, label, type, start, end }
// or null if the entity is not found or inputs are missing.
// For sections/chapters, end may be null when duration is not yet known.
function _deriveLoopSrc(video, sourceId, sourceType) {
  if (!sourceId || !sourceType) return null;
  if (sourceType === 'loop') {
    const loop = (video.loops ?? []).find(l => l.id === sourceId);
    if (!loop) return null;
    return { id: loop.id, label: loop.name || null, type: 'loop', start: loop.start, end: loop.end };
  }
  if (sourceType === 'section') {
    const sections = video.sections ?? [];
    const idx = sections.findIndex(s => s.id === sourceId);
    if (idx === -1) return null;
    const s   = sections[idx];
    const end = deriveDividerEnd(sections, idx);
    return { id: s.id, label: s.name || null, type: 'section', start: s.start, end };
  }
  if (sourceType === 'chapter') {
    const chapters = video.chapters ?? [];
    const idx = chapters.findIndex(c => c.id === sourceId);
    if (idx === -1) return null;
    const c   = chapters[idx];
    const end = deriveDividerEnd(chapters, idx);
    return { id: c.id, label: c.name || null, type: 'chapter', start: c.start, end };
  }
  return null;
}

// Return the base URL for The Fifth Fret site. When running under the Vite
// dev server (port 5173), the Jekyll site is on port 4000 instead.
function _siteOrigin() {
  return window.location.port === '5173'
    ? 'http://127.0.0.1:4000'
    : window.location.origin;
}

customElements.define('llama-app', LlamaApp);
