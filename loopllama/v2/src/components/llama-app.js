// llama-app.js -- top-level component.

import { LitElement, html, css } from 'lit';
import { createVideoController }    from '../videoController.js';
import { createKeyboardController } from '../keyboardController.js';
import {
  DEFAULT_OPTIONS,
  JUMP_HISTORY_MAX, JUMP_THRESHOLD,
  createVideo, createAppState, createScratchLoop,
  addMark, deleteMarkById,
  addSection, deleteSectionById, getSectionBounds, nearestSectionLeft,
  addLoop, deleteLoopById,
  addChapter, deleteChapterById, updateChapter,
  nudgeLoopStart, nudgeLoopEnd,
} from '../state.js';
import { load, save, exportAll, exportVideo, importData as mergeImport } from '../storage.js';
import './llama-whichkey.js';
import './llama-controls.js';
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
import './llama-jump-time-modal.js';
import './llama-chapter-picker.js';
import './llama-edit-chapter-modal.js';
import './llama-current.js';
import './llama-video-info-modal.js';
import './llama-jump-history-picker.js';

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

    .header-llama {
      height: 1.8rem;
      width: auto;
      margin-left: 0.5rem;
      filter: invert(1);
    }

    .header-flag {
      height: 1.8rem;
      width: auto;
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

    #player-container {
      width: 100%;
      aspect-ratio: 16 / 9;
      background: #000;
    }

    /* --- Short viewport: cap video height so controls stay visible --- */
    @media (max-height: 920px) {
      #player-container {
        max-height: 63vh;
      }
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

    /* --- Message footer --- */
    .app-footer {
      padding: 0.3rem var(--ll-pad-lg, 1rem);
      min-height: 1.6rem;
      font-size: var(--ll-text-sm, 0.85rem);
      border-top: 1px solid var(--ll-border, #444);
      color: var(--ll-text-dim, #aaa);
    }

    .app-footer.is-warning { color: var(--ll-warn,  #f0c040); }
    .app-footer.is-error   { color: var(--ll-error, #e87070); }

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
    loopSource:      { type: String },
    statusMsg:       { type: String },
    wkPrefix:        { type: String },
    wkCompletions:   { type: Object },
    windowFocused:   { type: Boolean },
    editScratchActive:  { type: Boolean },
    editScratchFocus:   { type: String },
    editScratchDelta:   { type: Number },
    videos:             { type: Array },
    currentVideoId:     { type: String },
    activeEntityType:   { type: String },
    chapters:           { type: Array },
    activeChapterId:    { type: String },
    zoomSource:         { type: Object },
    loopSourceLabel:    { type: String },
    loopSourceType:     { type: String },
    warningMsg:         { type: String },
    errorMsg:           { type: String },
    loopNudgeDelta:     { type: Number },
    seekDelta:          { type: Number },
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
    this.loopSource    = null;
    this.statusMsg     = 'Initializing...';
    this.wkPrefix            = null;
    this.wkCompletions       = null;
    this.windowFocused       = true;
    this.editScratchActive   = false;
    this.editScratchFocus    = 'start';
    this.editScratchDelta    = EDIT_SCRATCH_DELTAS[2];
    this.videos              = [];
    this.currentVideoId      = null;
    this.activeEntityType    = 'any';
    this.chapters            = [];
    this.activeChapterId     = null;
    this.zoomSource          = null;
    this.loopSourceLabel     = null;
    this.loopSourceType      = null;
    this.warningMsg          = null;
    this.errorMsg            = null;
    this._warnTimeout        = null;
    this._statusTimeout      = null;
    this._errorTimeout       = null;
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
    this._marksPickerEl      = null;
    this._editMarkModalEl    = null;
    this._sectionsPickerEl   = null;
    this._editSectionModalEl = null;
    this._jumpTimeModalEl    = null;
    this._chapterPickerEl      = null;
    this._editChapterModalEl   = null;
    this._videoInfoModalEl     = null;
    this._jumpHistoryPickerEl  = null;
    this._fileInputEl          = null;
    this._jumpIdx              = -1;   // -1 = at current/live position
    this._jumpFromTime         = null; // saved position when jb first invoked
    this._suppressJumpPush     = false;
    this._undoStack              = [];
    this._redoStack              = [];
    this.seekDelta        = DEFAULT_OPTIONS.seek_delta_default;
    this.speedDelta       = DEFAULT_OPTIONS.speed_delta;
    this.loopNudgeDelta   = 5;
  }

  // Auto-clear transient messages after 4s whenever they are set.
  updated(changedProps) {
    if (changedProps.has('statusMsg') && this.statusMsg) {
      clearTimeout(this._statusTimeout);
      this._statusTimeout = setTimeout(() => { this.statusMsg = null; }, 4000);
    }
    if (changedProps.has('warningMsg') && this.warningMsg) {
      clearTimeout(this._warnTimeout);
      this._warnTimeout = setTimeout(() => { this.warningMsg = null; }, 4000);
    }
    if (changedProps.has('errorMsg') && this.errorMsg) {
      clearTimeout(this._errorTimeout);
      this._errorTimeout = setTimeout(() => { this.errorMsg = null; }, 4000);
    }
  }

  // Sync per-video state from a Video object into reactive props.
  _syncFromVideo(video) {
    this.chapters   = [...(video.chapters ?? [])];
    this.sections   = [...(video.sections ?? [])];
    this.marks      = [...(video.marks    ?? [])];
    this.namedLoops = (video.loops ?? []).filter(l => !l.is_scratch);
    this.jumps      = [...(video.jumps    ?? [])];
    this._jumpIdx       = -1;
    this._jumpFromTime  = null;
    const scratch   = (video.loops ?? []).find(l => l.is_scratch);
    this.loopStart  = scratch?.start ?? 0;
    this.loopEnd    = scratch?.end   ?? 0;
    this.looping         = false;
    this.loopSource      = null;
    this.loopSourceLabel = null;
    this.loopSourceType  = null;
    this.speed           = video.speed ?? 1.0;
    this._vc?.setPlaybackRate(this.speed);
    this.zoomSource = null;
    if (this.activeChapterId) {
      this.activeChapterId = null;
    }
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
    save(this._appState);
  }

  // Persist current reactive state back to the current video and save to
  // localStorage. Call after any mutation to sections, marks, or namedLoops.
  _saveCurrentState() {
    const video = this._appState?.videos.find(v => v.id === this.currentVideoId);
    if (!video) return;
    video.chapters = this.chapters;
    video.sections = this.sections;
    video.marks    = this.marks;
    video.jumps    = this.jumps;
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
    this._undoStack = [];
    this._redoStack = [];
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

  // --- Undo / Redo ---

  // Snapshot the current metadata state (sections, marks, namedLoops, chapters).
  // Playback state (speed, looping, scratch loop) is not included.
  _pushUndoSnapshot(desc = '') {
    const snap = {
      sections:   JSON.parse(JSON.stringify(this.sections)),
      marks:      JSON.parse(JSON.stringify(this.marks)),
      namedLoops: JSON.parse(JSON.stringify(this.namedLoops)),
      chapters:   JSON.parse(JSON.stringify(this.chapters)),
      desc,
    };
    this._undoStack.push(snap);
    if (this._undoStack.length > 20) this._undoStack.shift();
    this._redoStack = [];
  }

  _currentSnapshot() {
    return {
      sections:   JSON.parse(JSON.stringify(this.sections)),
      marks:      JSON.parse(JSON.stringify(this.marks)),
      namedLoops: JSON.parse(JSON.stringify(this.namedLoops)),
      chapters:   JSON.parse(JSON.stringify(this.chapters)),
    };
  }

  _applySnapshot(snap) {
    this.sections   = snap.sections;
    this.marks      = snap.marks;
    this.namedLoops = snap.namedLoops;
    this.chapters   = snap.chapters;
    // Clear stale loop source if the named loop it pointed to was removed.
    if (this.loopSource && !this.namedLoops.find(l => l.id === this.loopSource)) {
      this.loopSource      = null;
      this.loopSourceLabel = null;
      this.loopSourceType  = null;
    }
    this._saveCurrentState();
  }

  _undo() {
    if (!this._undoStack.length) {
      this._setWarning('Nothing to undo.');
      return;
    }
    const snap = this._undoStack.pop();
    this._redoStack.push({ ...this._currentSnapshot(), desc: snap.desc });
    this._applySnapshot(snap);
    this.statusMsg = `Undone: ${snap.desc}`;
  }

  _redo() {
    if (!this._redoStack.length) {
      this._setWarning('Nothing to redo.');
      return;
    }
    const snap = this._redoStack.pop();
    this._undoStack.push({ ...this._currentSnapshot(), desc: snap.desc });
    this._applySnapshot(snap);
    this.statusMsg = `Redone: ${snap.desc}`;
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
      seekDeltaDown: () => {
        const choices = DEFAULT_OPTIONS.seek_delta_choices;
        const idx = choices.indexOf(this.seekDelta);
        this.seekDelta = choices[Math.max(idx - 1, 0)];
      },
      seekDeltaUp: () => {
        const choices = DEFAULT_OPTIONS.seek_delta_choices;
        const idx = choices.indexOf(this.seekDelta);
        this.seekDelta = choices[Math.min(idx + 1, choices.length - 1)];
      },
      prevEntity:    () => this._navigateEntity('prev'),
      entityType:    () => this.renderRoot.querySelector('llama-controls')?.focusEntitySelect(),
      nextEntity:    () => this._navigateEntity('next'),
      jumpToStart:   () => {
        const target = this.looping ? this.loopStart : 0;
        this._maybePushJump(this._vc?.getCurrentTime() ?? 0, target);
        this._vc?.seekTo(target);
      },
      setLoopStart:  () => { this.loopStart = this._vc?.getCurrentTime() ?? 0; this.loopSource = null; this.loopSourceLabel = null; this.loopSourceType = null; this._autoDisableLoopIfInvalid(); },
      setLoopEnd:    () => { this.loopEnd   = this._vc?.getCurrentTime() ?? 0; this.loopSource = null; this.loopSourceLabel = null; this.loopSourceType = null; this._autoDisableLoopIfInvalid(); },
      resetLoopStart: () => { this.loopStart = 0; this._autoDisableLoopIfInvalid(); },
      resetLoopEnd:   () => { this.loopEnd = this.duration ?? 0; this._autoDisableLoopIfInvalid(); },
      nudgeStartDown: () => {
        const state = { loopStart: this.loopStart, loopEnd: this.loopEnd, duration: this.duration };
        this.loopStart = nudgeLoopStart(-this.loopNudgeDelta, state);
        this._autoDisableLoopIfInvalid();
      },
      nudgeStartUp: () => {
        const state = { loopStart: this.loopStart, loopEnd: this.loopEnd, duration: this.duration };
        this.loopStart = nudgeLoopStart(+this.loopNudgeDelta, state);
        this._autoDisableLoopIfInvalid();
      },
      nudgeEndDown: () => {
        const state = { loopStart: this.loopStart, loopEnd: this.loopEnd, duration: this.duration };
        this.loopEnd = nudgeLoopEnd(-this.loopNudgeDelta, state);
        this._autoDisableLoopIfInvalid();
      },
      nudgeEndUp: () => {
        const state = { loopStart: this.loopStart, loopEnd: this.loopEnd, duration: this.duration };
        this.loopEnd = nudgeLoopEnd(+this.loopNudgeDelta, state);
        this._autoDisableLoopIfInvalid();
      },
      focusLoopNudgeDelta: () => this.renderRoot.querySelector('llama-controls')?.focusNudgeDeltaSelect(),
      focusLoopStart:     () => this.renderRoot.querySelector('llama-controls')?.focusStartInput(),
      focusLoopEnd:       () => this.renderRoot.querySelector('llama-controls')?.focusEndInput(),
      undo:          () => this._undo(),
      redo:          () => this._redo(),
      helpKeys:      stub('helpKeys'),
      options:       stub('options'),
      videoUrl:      () => this._urlInputModalEl?.show(),
      videoPicker:   () => this._videoPickerEl?.show(),
      editVideo:     () => this._editVideoModalEl?.show(),
      deleteVideo:   stub('deleteVideo'),
      jumpTime:      () => this.renderRoot.querySelector('llama-controls')?.focusTimeInput(),
      jumpSection:   () => this._openSectionsPicker('jump'),
      jumpLoop:      () => this._openLoopsPicker('jump'),
      jumpMark:      () => this._openMarksPicker('jump'),
      jumpHistory: () => this._jumpHistoryPickerEl?.show(),
      jumpBack: () => {
        if (!this.jumps.length) { this._setWarning('No jump history.'); return; }
        if (this._jumpIdx === -1) {
          // First jb: save current position, go to most recent entry.
          this._jumpFromTime = this._vc?.getCurrentTime() ?? 0;
          this._jumpIdx      = this.jumps.length - 1;
        } else if (this._jumpIdx > 0) {
          this._jumpIdx--;
        } else {
          this._setWarning('At oldest jump.'); return;
        }
        const t = this.jumps[this._jumpIdx];
        this._suppressJumpPush = true;
        this._vc?.seekTo(t);
        this._suppressJumpPush = false;
        this.statusMsg = `Jump back: ${_fmtTimePlain(t)}`;
      },
      jumpForward: () => {
        if (this._jumpIdx === -1) { this._setWarning('At current position.'); return; }
        if (this._jumpIdx < this.jumps.length - 1) {
          this._jumpIdx++;
          const t = this.jumps[this._jumpIdx];
          this._suppressJumpPush = true;
          this._vc?.seekTo(t);
          this._suppressJumpPush = false;
          this.statusMsg = `Jump forward: ${_fmtTimePlain(t)}`;
        } else {
          // At most recent entry; jump forward to where jb was first invoked.
          this._jumpIdx = -1;
          const t = this._jumpFromTime ?? 0;
          this._jumpFromTime = null;
          this._suppressJumpPush = true;
          this._vc?.seekTo(t);
          this._suppressJumpPush = false;
          this.statusMsg = 'Returned to current position.';
        }
      },
      toggleLoop: () => {
        if (!this.looping && !this._isLoopValid()) {
          this._setWarning('Invalid loop range: start must be before end.');
          return;
        }
        this.looping = !this.looping;
        if (this.looping) this._seekIntoLoopIfNeeded();
      },
      saveLoop: () => this._saveLoopModalEl?.show(),
      openLoop: () => this._openLoopsPicker('load'),
      saveBack: () => {
        if (!this.loopSource) {
          this._setWarning('No source loop to save back to.');
          return;
        }
        const idx = this.namedLoops.findIndex(l => l.id === this.loopSource);
        if (idx === -1) {
          this._setWarning('Source loop not found.');
          return;
        }
        this._pushUndoSnapshot('Loop updated');
        this.namedLoops[idx].start = this.loopStart;
        this.namedLoops[idx].end   = this.loopEnd;
        this.namedLoops = [...this.namedLoops];
        this.statusMsg  = 'Loop updated';
        this._saveCurrentState();
      },
      editScratch: () => this._enterEditScratch(),
      deleteLoop: () => this._openLoopsPicker('delete'),
      zoomLoop: () => {
        if (this.zoomSource?.trigger === 'loop') {
          this.zoomSource = null;
          this.statusMsg  = 'Loop zoom off.';
          return;
        }
        if (!this._isLoopValid()) {
          this._setWarning('No valid scratch loop to zoom.');
          return;
        }
        if (this.loopStart === 0 && this.loopEnd === this.duration) {
          this._setWarning('Loop spans full video; zoom has no effect.');
          return;
        }
        this.zoomSource = { start: this.loopStart, end: this.loopEnd, trigger: 'loop' };
        this.statusMsg  = 'Loop zoom on.';
        this._seekIntoZoomIfNeeded();
      },
      zoomSection: () => {
        if (this.zoomSource?.trigger === 'section') {
          this.zoomSource = null;
          this.statusMsg  = 'Section zoom off.';
          return;
        }
        const bounds = getSectionBounds(this.sections, this.currentTime, this.duration);
        if (!bounds || bounds.end == null) {
          this._setWarning('No section at current position.');
          return;
        }
        this.zoomSource = { start: bounds.start, end: bounds.end, trigger: 'section' };
        this.statusMsg  = 'Section zoom on.';
      },
      setSection: () => {
        this._pushUndoSnapshot('Section created');
        addSection(this.sections, this._vc?.getCurrentTime() ?? 0);
        this.sections = [...this.sections];
        this.statusMsg = 'Section created';
        this._saveCurrentState();
      },
      editSection:   () => this._editCurrentSection(),
      loopSection: () => {
        const bounds = getSectionBounds(this.sections, this.currentTime, this.duration);
        if (!bounds || bounds.end == null) {
          this._setWarning('No section at current position.');
          return;
        }
        const section    = nearestSectionLeft(this.sections, this.currentTime);
        const padStart   = DEFAULT_OPTIONS.section_loop_pad_start;
        const padEnd     = DEFAULT_OPTIONS.section_loop_pad_end;
        this.loopStart       = Math.max(0, bounds.start - padStart);
        this.loopEnd         = bounds.end + padEnd;
        this.looping         = true;
        this.loopSource      = null;
        this.loopSourceLabel = section?.name || null;
        this.loopSourceType  = 'section';
        this.statusMsg       = 'Looping section.';
      },
      deleteSection: () => this._openSectionsPicker('delete'),
      setMark: () => {
        this._pushUndoSnapshot('Mark created');
        addMark(this.marks, this._vc?.getCurrentTime() ?? 0);
        this.marks = [...this.marks];
        this.statusMsg = 'Mark created';
        this._saveCurrentState();
      },
      editMark:   () => this._openMarksPicker('edit'),
      deleteMark: () => this._openMarksPicker('delete'),
      setChapter: () => {
        if (!this._isLoopValid()) {
          this._setWarning('Set a valid scratch loop first (start must be before end).');
          return;
        }
        this._editChapterModalEl?.showCreate(this.loopStart, this.loopEnd);
      },
      openChapter:   () => this._openChapterPicker('open'),
      editChapter: () => {
        if (!this.activeChapterId) {
          this._setWarning('No active chapter. Open one first (co).');
          return;
        }
        const chapter = this.chapters.find(c => c.id === this.activeChapterId);
        if (!chapter) {
          this._setWarning('Active chapter not found.');
          return;
        }
        this._editChapterModalEl?.showEdit(chapter);
      },
      deleteChapter: () => this._openChapterPicker('delete'),
      zoomChapter: () => {
        if (this.zoomSource?.trigger === 'chapter') {
          this.zoomSource = null;
          this.statusMsg  = 'Chapter zoom off.';
          return;
        }
        if (!this.activeChapterId) {
          this._setWarning('No active chapter. Open one first (co).');
          return;
        }
        const chapter = this.chapters.find(c => c.id === this.activeChapterId);
        if (!chapter) {
          this._setWarning('Active chapter not found.');
          return;
        }
        this.zoomSource = { start: chapter.start, end: chapter.end, trigger: 'chapter' };
        this.statusMsg  = 'Chapter zoom on.';
        this._seekIntoZoomIfNeeded();
      },
      videoInfo:     () => this._videoInfoModalEl?.show(),
      helpGeneral:   stub('helpGeneral'),
      deleteData:    stub('deleteData'),
      exportAll:     () => this._exportAll(),
      importData:    () => this._fileInputEl?.click(),
      inspectData:   stub('inspectData'),
      shareVideo:    () => this._shareVideo(),
      shareLoop:     () => this._shareLoop(),
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
        // Playing (1), Paused (2), Buffering (3) are omitted: user can
        // see/hear the video. Only surface less-frequent states.
        const labels = { '-1': 'Unstarted', 0: 'Ended', 5: 'Cued' };
        const msg = labels[state];
        if (msg) this.statusMsg = msg;
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
    this._jumpTimeModalEl    = this.renderRoot.querySelector('llama-jump-time-modal');
    this._chapterPickerEl    = this.renderRoot.querySelector('llama-chapter-picker');
    this._editChapterModalEl = this.renderRoot.querySelector('llama-edit-chapter-modal');
    this._videoInfoModalEl    = this.renderRoot.querySelector('llama-video-info-modal');
    this._jumpHistoryPickerEl = this.renderRoot.querySelector('llama-jump-history-picker');
    this._fileInputEl         = this.renderRoot.querySelector('#import-file-input');

    window.addEventListener('blur',  () => { this.windowFocused = false; });
    window.addEventListener('focus', () => { this.windowFocused = true; });

    // Check for a shared loop URL (?v=id&s=start&e=end). If present,
    // load that video and set the scratch loop; skip normal restore.
    const didLoadSharedLoop = this._handleStartupUrlParams();

    // Otherwise restore the last-used video on startup -- cue without auto-playing.
    if (!didLoadSharedLoop && this._appState.currentVideoId) {
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
      this._setWarning('Could not parse a YouTube video ID from that input.');
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
    const { id, name, url, start, end } = e.detail;
    const video = this._appState?.videos.find(v => v.id === id);
    if (!video) return;
    video.name  = name;
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
      this.loopEnd         = 0;
      this.looping         = false;
      this.loopSource      = null;
      this.loopSourceLabel = null;
      this.loopSourceType  = null;
      this.duration        = null;
      this.statusMsg       = 'Video deleted.';
    }
    this.videos = [...this._appState.videos];
    save(this._appState);
  }

  // Show a transient warning; auto-clears after 4 seconds (via updated()).
  _setWarning(msg) {
    this.warningMsg = msg;
  }

  _flashLoopViolation() {
    this._setWarning('Outside active loop range.');
  }

  // Clamp to zoom, enforce loop boundaries, then seek. Used by all
  // user-initiated jumps (seek delta, entity navigation, picker jumps,
  // timeline clicks, jump-by-time).
  _jumpTo(t) {
    if (this.zoomSource) {
      t = Math.max(this.zoomSource.start, Math.min(this.zoomSource.end, t));
    }
    if (this.looping && this.loopStart < this.loopEnd
        && (t < this.loopStart || t > this.loopEnd)) {
      this._flashLoopViolation();
      return;
    }
    this._maybePushJump(this._vc?.getCurrentTime() ?? 0, t);
    this._vc?.seekTo(t);
  }

  _seek(delta) {
    this._jumpTo((this._vc?.getCurrentTime() ?? 0) + delta);
  }

  _onPlayPause() {
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

  _onToggleLoop() {
    if (!this.looping && !this._isLoopValid()) {
      this._setWarning('Invalid loop range: start must be before end.');
      return;
    }
    this.looping = !this.looping;
    if (this.looping) this._seekIntoLoopIfNeeded();
  }

  _onSetLoopStartNow() {
    this.loopStart       = this.currentTime;
    this.loopSource      = null;
    this.loopSourceLabel = null;
    this.loopSourceType  = null;
    this._autoDisableLoopIfInvalid();
  }

  _onSetLoopEndNow() {
    this.loopEnd         = this.currentTime;
    this.loopSource      = null;
    this.loopSourceLabel = null;
    this.loopSourceType  = null;
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
    if (type === 'any' || type === 'section') this.sections.forEach(s => add(s.time));
    if (type === 'any' || type === 'loop')    this.namedLoops.forEach(l => add(l.start));
    if (type === 'any' || type === 'mark')    this.marks.forEach(m => add(m.time));
    if (type === 'any' || type === 'chapter') this.chapters.forEach(c => add(c.start));
    if (type === 'any' || type === 'video') {
      const video = this._appState?.videos.find(v => v.id === this.currentVideoId);
      if (video) {
        add(video.start ?? 0);
        if (video.end != null) add(video.end);
        else if (this.duration != null) add(this.duration);
      }
    }
    return [...times].sort((a, b) => a - b);
  }

  // Seek to the previous or next entity of the active type.
  // Uses a small epsilon so that being near an entity's time doesn't get stuck.
  _navigateEntity(direction) {
    const time  = this._vc?.getCurrentTime() ?? this.currentTime;
    const times = this._getEntityTimes(this.activeEntityType);
    if (!times.length) return;
    // Larger epsilon for prev: skip entities within 2s behind the playhead,
    // so that pressing prev while playing jumps to the entity before the current
    // one rather than snapping back a fraction of a second.
    const EPS = direction === 'prev' ? 2.0 : 0.1;
    let target = null;
    if (direction === 'prev') {
      for (const t of times) {
        if (t < time - EPS) target = t;
        else break;
      }
    } else {
      target = times.find(t => t > time + EPS) ?? null;
    }
    if (target != null) this._jumpTo(target);
  }

  _onEntityTypeChange(e) {
    this.activeEntityType = e.detail.value;
  }

  _onSetSection() {
    this._pushUndoSnapshot('Section created');
    addSection(this.sections, this._vc?.getCurrentTime() ?? 0);
    this.sections = [...this.sections];
    this.statusMsg = 'Section created';
    this._saveCurrentState();
  }

  _onDeleteSection(e) {
    this._pushUndoSnapshot('Section deleted');
    deleteSectionById(this.sections, e.detail.id);
    this.sections = [...this.sections];
    this.statusMsg = 'Section deleted';
    this._saveCurrentState();
  }

  _onSetMark() {
    this._pushUndoSnapshot('Mark created');
    addMark(this.marks, this._vc?.getCurrentTime() ?? 0);
    this.marks = [...this.marks];
    this.statusMsg = 'Mark created';
    this._saveCurrentState();
  }

  _onDeleteMark(e) {
    this._pushUndoSnapshot('Mark deleted');
    deleteMarkById(this.marks, e.detail.id);
    this.marks = [...this.marks];
    this.statusMsg = 'Mark deleted';
    this._saveCurrentState();
  }

  _onSaveLoop(e) {
    this._pushUndoSnapshot('Loop saved');
    const start = e.detail.start ?? this.loopStart;
    const end   = e.detail.end   ?? this.loopEnd;
    addLoop(this.namedLoops, start, end, e.detail.name);
    this.namedLoops = [...this.namedLoops];
    this.statusMsg  = 'Loop saved';
    this._saveCurrentState();
  }

  _onLoadLoop(e) {
    const loop = this.namedLoops.find(l => l.id === e.detail.id);
    if (!loop) return;
    this.loopStart       = loop.start;
    this.loopEnd         = loop.end;
    this.loopSource      = loop.id;
    this.loopSourceLabel = loop.name || null;
    this.loopSourceType  = 'loop';
    this.statusMsg       = `Loop loaded: ${loop.name || 'unnamed'}`;
    if (this.looping) {
      this._maybePushJump(this._vc?.getCurrentTime() ?? 0, loop.start);
      this._vc?.seekTo(loop.start);
    }
  }

  // Handle ll-activate-loop from timeline zone click: activate named loop as
  // scratch and always seek to its start (unlike _onLoadLoop, no looping guard).
  _onActivateLoop(e) {
    const loop = this.namedLoops.find(l => l.id === e.detail.id);
    if (!loop) return;
    this.loopStart       = loop.start;
    this.loopEnd         = loop.end;
    this.loopSource      = loop.id;
    this.loopSourceLabel = loop.name || null;
    this.loopSourceType  = 'loop';
    this.statusMsg       = `Loop loaded: ${loop.name || 'unnamed'}`;
    this._maybePushJump(this._vc?.getCurrentTime() ?? 0, loop.start);
    this._vc?.seekTo(loop.start);
  }

  // Handle ll-jump-loop from loop picker (mode='jump').
  _onJumpLoop(e) {
    this._jumpTo(e.detail.start);
  }

  _onSeekTo(e) {
    this._jumpTo(e.detail.time);
  }

  _onDeleteLoop(e) {
    this._pushUndoSnapshot('Loop deleted');
    deleteLoopById(this.namedLoops, e.detail.id);
    this.namedLoops = [...this.namedLoops];
    if (this.loopSource === e.detail.id) { this.loopSource = null; this.loopSourceLabel = null; this.loopSourceType = null; }
    this.statusMsg = 'Loop deleted';
    this._saveCurrentState();
  }

  // Open the loop picker in the given mode, with a guard for empty list.
  _openLoopsPicker(mode) {
    if (!this.namedLoops.length) {
      this._setWarning('No saved loops.');
      return;
    }
    this._loopPickerEl?.show(mode);
  }

  // Open the marks picker in the given mode, with a guard for empty list.
  _openMarksPicker(mode) {
    if (!this.marks.length) {
      this._setWarning('No marks set.');
      return;
    }
    this._marksPickerEl?.show(mode);
  }

  // Handle ll-jump-mark from marks picker (mode='jump').
  _onJumpMark(e) {
    this._jumpTo(e.detail.time);
  }

  // Handle ll-pick-mark-edit from marks picker (mode='edit').
  // Looks up the mark and opens edit-mark-modal.
  _onPickMarkEdit(e) {
    const mark = this.marks.find(m => m.id === e.detail.id);
    if (!mark) return;
    this._editMarkModalEl?.show(mark);
  }

  // Handle ll-update-mark from edit-mark-modal.
  _onUpdateMark(e) {
    this._pushUndoSnapshot('Mark updated');
    const { id, name, time } = e.detail;
    const mark = this.marks.find(m => m.id === id);
    if (!mark) return;
    mark.name = name;
    mark.time = time;
    this.marks = [...this.marks].sort((a, b) => a.time - b.time);
    this.statusMsg = 'Mark updated';
    this._saveCurrentState();
  }

  // Open the sections picker in the given mode, with a guard for empty list.
  _openSectionsPicker(mode) {
    if (!this.sections.length) {
      this._setWarning('No sections set.');
      return;
    }
    this._sectionsPickerEl?.show(mode);
  }

  // Edit the current section (se): no picker — find section nearest to
  // the playhead and open the edit modal directly.
  _editCurrentSection() {
    const section = nearestSectionLeft(this.sections, this.currentTime);
    if (!section) {
      this._setWarning('No section at current position.');
      return;
    }
    this._editSectionModalEl?.show(section);
  }

  // Open the chapter picker in the given mode, with a guard for empty list.
  _openChapterPicker(mode) {
    if (!this.chapters.length) {
      this._setWarning('No chapters set.');
      return;
    }
    this._chapterPickerEl?.show(mode);
  }

  // Handle ll-open-chapter from chapter picker (mode='open').
  // Sets activeChapterId, loads chapter's range into scratch loop,
  // and seeks the player to chapter.start.
  _onOpenChapter(e) {
    const chapter = this.chapters.find(c => c.id === e.detail.id);
    if (!chapter) return;
    this.activeChapterId = chapter.id;
    this.loopStart       = chapter.start;
    this.loopEnd         = chapter.end;
    this.loopSource      = null;
    this.loopSourceLabel = chapter.name || null;
    this.loopSourceType  = 'chapter';
    this._autoDisableLoopIfInvalid();
    this._maybePushJump(this._vc?.getCurrentTime() ?? 0, chapter.start);
    this._vc?.seekTo(chapter.start);
    this.statusMsg = `Chapter: ${chapter.name || `${_fmtTimePlain(chapter.start)} → ${_fmtTimePlain(chapter.end)}`}`;
  }

  // Handle ll-create-chapter from edit-chapter-modal (create mode).
  _onCreateChapter(e) {
    this._pushUndoSnapshot('Chapter created');
    const { name, start, end } = e.detail;
    addChapter(this.chapters, name, start, end);
    this.chapters  = [...this.chapters];
    this.statusMsg = 'Chapter created';
    this._saveCurrentState();
  }

  // Handle ll-update-chapter from edit-chapter-modal (edit mode).
  _onUpdateChapter(e) {
    this._pushUndoSnapshot('Chapter updated');
    const { id, name, start, end } = e.detail;
    updateChapter(this.chapters, id, { name, start, end });
    this.chapters  = [...this.chapters];
    this.statusMsg = 'Chapter updated';
    this._saveCurrentState();
  }

  // Handle ll-delete-chapter from chapter picker (mode='delete').
  _onDeleteChapter(e) {
    this._pushUndoSnapshot('Chapter deleted');
    deleteChapterById(this.chapters, e.detail.id);
    this.chapters = [...this.chapters];
    this.statusMsg = 'Chapter deleted';
    if (this.activeChapterId === e.detail.id) {
      this.activeChapterId = null;
      if (this.zoomSource?.trigger === 'chapter') {
        this.zoomSource = null;
      }
    }
    this._saveCurrentState();
  }

  // Handle ll-jump-time from jump-time-modal.
  _onJumpTime(e) {
    this._jumpTo(e.detail.time);
  }

  // Handle ll-jump-history from jump-history-picker.
  _onJumpHistory(e) {
    this._jumpTo(e.detail.time);
  }

  // Export all app data as a downloadable JSON file.
  _exportAll() {
    _downloadJson(exportAll(this._appState), 'loopllama-all.json');
    this.statusMsg = 'Exported all data.';
  }

  // Export the current video as a downloadable JSON file (single-video share).
  _shareVideo() {
    if (!this.currentVideoId) {
      this._setWarning('No video loaded.');
      return;
    }
    const video    = this._appState.videos.find(v => v.id === this.currentVideoId);
    const safeName = (video?.name || this.currentVideoId)
      .replace(/[^A-Za-z0-9_-]/g, '-').replace(/-+/g, '-').replace(/^-|-$/g, '');
    _downloadJson(exportVideo(this._appState, this.currentVideoId), `loopllama-${safeName}.json`);
    this.statusMsg = 'Exported video data.';
  }

  // Copy a shareable loop URL to the clipboard: ?v=id&s=start&e=end
  _shareLoop() {
    if (!this.currentVideoId) {
      this._setWarning('No video loaded.');
      return;
    }
    if (!this._isLoopValid()) {
      this._setWarning('Set a valid scratch loop first.');
      return;
    }
    const url = new URL(window.location.href);
    url.searchParams.set('v', this.currentVideoId);
    url.searchParams.set('s', Math.round(this.loopStart * 10) / 10);
    url.searchParams.set('e', Math.round(this.loopEnd   * 10) / 10);
    navigator.clipboard.writeText(url.toString()).then(() => {
      this.statusMsg = 'Loop URL copied to clipboard.';
    }).catch(() => {
      this.statusMsg = `Loop URL: ${url.toString()}`;
    });
  }

  // Handle file-picker change: read JSON and merge into app state.
  _onFileImport(e) {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (evt) => {
      try {
        const result = mergeImport(evt.target.result, this._appState);
        this.videos = [...this._appState.videos];
        save(this._appState);
        this.statusMsg = `Imported: ${result.added} added, ${result.updated} updated.`;
      } catch (err) {
        this.errorMsg = `Import failed: ${err.message}`;
      }
    };
    reader.readAsText(file);
    e.target.value = '';   // reset so the same file can be re-imported
  }

  // Parse ?v=id&s=start&e=end startup URL params for loop sharing.
  // If all three are present and valid, loads the video and sets the scratch loop.
  // Returns true if a shared loop was applied, false otherwise.
  _handleStartupUrlParams() {
    const params = new URLSearchParams(window.location.search);
    const videoId = params.get('v');
    const start   = parseFloat(params.get('s'));
    const end     = parseFloat(params.get('e'));
    if (!videoId || isNaN(start) || isNaN(end) || start >= end) return false;

    // Find or create the video entry.
    let video = this._appState.videos.find(v => v.id === videoId);
    if (!video) {
      video = createVideo(videoId, videoId);
      this._appState.videos.push(video);
      this.videos = [...this._appState.videos];
    }

    this._appState.currentVideoId = video.id;
    this.currentVideoId = video.id;
    this._syncFromVideo(video);
    this.loopStart = start;
    this.loopEnd   = end;
    this._vc.cueVideo(video.id, start);
    this.statusMsg = `Shared loop loaded: ${_fmtTimePlain(start)} → ${_fmtTimePlain(end)}`;
    save(this._appState);

    // Remove the params from the URL bar without reloading the page.
    const clean = new URL(window.location.href);
    clean.searchParams.delete('v');
    clean.searchParams.delete('s');
    clean.searchParams.delete('e');
    history.replaceState(null, '', clean.toString());

    return true;
  }

  // Handle ll-jump-section from sections picker (mode='jump').
  _onJumpSection(e) {
    this._jumpTo(e.detail.time);
  }

  // Handle ll-pick-section-edit from sections picker (mode='edit').
  _onPickSectionEdit(e) {
    const section = this.sections.find(s => s.id === e.detail.id);
    if (!section) return;
    this._editSectionModalEl?.show(section);
  }

  // Handle ll-update-section from edit-section-modal.
  _onUpdateSection(e) {
    this._pushUndoSnapshot('Section updated');
    const { id, name, time } = e.detail;
    const section = this.sections.find(s => s.id === id);
    if (!section) return;
    section.name = name;
    section.time = time;
    this.sections = [...this.sections].sort((a, b) => a.time - b.time);
    this.statusMsg = 'Section updated';
    this._saveCurrentState();
  }

  // Handle ll-menu-select from llama-controls menus.
  // Dispatches to the same handlers used by keyboard bindings.
  _onMenuSelect(e) {
    const handler = this._handlers?.[e.detail.action];
    if (handler) handler();
  }

  render() {
    const currentVideo   = this._appState?.videos.find(v => v.id === this.currentVideoId) ?? null;
    const activeChapter  = this.activeChapterId
      ? this.chapters.find(c => c.id === this.activeChapterId) ?? null
      : null;
    const currentSection = nearestSectionLeft(this.sections, this.currentTime);
    const loopName       = this.loopSource
      ? (this.namedLoops.find(l => l.id === this.loopSource)?.name ?? null)
      : null;
    const zoomLabel = (() => {
      if (!this.zoomSource) return null;
      const { trigger, start, end } = this.zoomSource;
      if (trigger === 'loop') {
        return `Loop: ${_fmtTimePlain(start)} – ${_fmtTimePlain(end)}`;
      }
      if (trigger === 'section') {
        const sec = nearestSectionLeft(this.sections, start);
        return sec?.name ? `Section: ${sec.name}` : `Section: ${_fmtTimePlain(start)}`;
      }
      if (trigger === 'chapter') {
        const ch = this.chapters.find(c => c.id === this.activeChapterId);
        return ch?.name ? `Chapter: ${ch.name}` : `Chapter: ${_fmtTimePlain(start)}`;
      }
      return null;
    })();
    return html`
      <header class="app-header">
        <span class="app-title">LoopLlama</span>
        <img src="/llama-mascot.png" class="header-llama" alt="">
        <nav class="header-nav">
          <img src="/flag.svg" class="header-flag" alt="">
          <span class="nav-sep">|</span>
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
              .videoId=${this.currentVideoId}
              .currentTime=${this.currentTime}
              .duration=${this.duration}
              .sections=${this.sections}
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
          .seekDelta=${this.seekDelta}
          .loopNudgeDelta=${this.loopNudgeDelta}
          .editScratchActive=${this.editScratchActive}
          .editScratchFocus=${this.editScratchFocus}
          .editScratchDelta=${this.editScratchDelta}
          .activeEntityType=${this.activeEntityType}
          @ll-play-pause=${this._onPlayPause}
          @ll-seek-to=${(e) => this._jumpTo(e.detail.value)}
          @ll-seek-forward=${this._onSeekForward}
          @ll-seek-back=${this._onSeekBack}
          @ll-seek-delta-change=${(e) => { this.seekDelta = e.detail.value; }}
          @ll-loop-nudge-delta-change=${(e) => { this.loopNudgeDelta = e.detail.value; }}
          @ll-toggle-loop=${this._onToggleLoop}
          @ll-set-loop-start-now=${this._onSetLoopStartNow}
          @ll-set-loop-end-now=${this._onSetLoopEndNow}
          @ll-loop-start-change=${this._onLoopStartChange}
          @ll-loop-end-change=${this._onLoopEndChange}
          @ll-speed-change=${(e) => { const v = Math.max(0.25, Math.min(2.0, e.detail.value)); this._vc?.setPlaybackRate(v); this.speed = v; }}
          @ll-prev-entity=${() => this._navigateEntity('prev')}
          @ll-next-entity=${() => this._navigateEntity('next')}
          @ll-entity-type-change=${this._onEntityTypeChange}
          @ll-invalid-time=${() => this._setWarning('Invalid time format.')}
          @ll-menu-select=${this._onMenuSelect}
        ></llama-controls>

        <llama-current
          .videoName=${currentVideo?.name ?? ''}
          .chapterName=${activeChapter?.name ?? null}
          .sectionName=${currentSection?.name ?? null}
          .loopName=${loopName}
          .loopSourceLabel=${this.loopSourceLabel}
          .loopSourceType=${this.loopSourceType}
          .duration=${this.duration}
          .zoomLabel=${zoomLabel}
        ></llama-current>
      </div>

      ${(() => {
        const msg  = this.errorMsg ?? this.warningMsg ?? this.statusMsg ?? '';
        const type = this.errorMsg ? 'is-error' : this.warningMsg ? 'is-warning' : '';
        return html`<div class="app-footer ${type}">${msg}</div>`;
      })()}

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
        @ll-jump-loop=${this._onJumpLoop}
        @ll-load-loop=${this._onLoadLoop}
        @ll-delete-loop=${this._onDeleteLoop}
      ></llama-loop-picker>

      <llama-marks-picker
        .marks=${this.marks}
        @ll-modal-open=${() => this._kb?.disable()}
        @ll-modal-close=${() => this._kb?.enable()}
        @ll-jump-mark=${this._onJumpMark}
        @ll-pick-mark-edit=${this._onPickMarkEdit}
        @ll-delete-mark=${this._onDeleteMark}
      ></llama-marks-picker>

      <llama-edit-mark-modal
        @ll-modal-open=${() => this._kb?.disable()}
        @ll-modal-close=${() => this._kb?.enable()}
        @ll-update-mark=${this._onUpdateMark}
      ></llama-edit-mark-modal>

      <llama-sections-picker
        .sections=${this.sections}
        @ll-modal-open=${() => this._kb?.disable()}
        @ll-modal-close=${() => this._kb?.enable()}
        @ll-jump-section=${this._onJumpSection}
        @ll-pick-section-edit=${this._onPickSectionEdit}
        @ll-delete-section=${this._onDeleteSection}
      ></llama-sections-picker>

      <llama-edit-section-modal
        @ll-modal-open=${() => this._kb?.disable()}
        @ll-modal-close=${() => this._kb?.enable()}
        @ll-update-section=${this._onUpdateSection}
      ></llama-edit-section-modal>

      <llama-jump-time-modal
        @ll-modal-open=${() => this._kb?.disable()}
        @ll-modal-close=${() => this._kb?.enable()}
        @ll-jump-time=${this._onJumpTime}
      ></llama-jump-time-modal>

      <llama-chapter-picker
        .chapters=${this.chapters}
        .activeChapterId=${this.activeChapterId}
        @ll-modal-open=${() => this._kb?.disable()}
        @ll-modal-close=${() => this._kb?.enable()}
        @ll-open-chapter=${this._onOpenChapter}
        @ll-delete-chapter=${this._onDeleteChapter}
      ></llama-chapter-picker>

      <llama-edit-chapter-modal
        @ll-modal-open=${() => this._kb?.disable()}
        @ll-modal-close=${() => this._kb?.enable()}
        @ll-create-chapter=${this._onCreateChapter}
        @ll-update-chapter=${this._onUpdateChapter}
      ></llama-edit-chapter-modal>

      <llama-video-info-modal
        .video=${currentVideo}
        .chapters=${this.chapters}
        .sections=${this.sections}
        .namedLoops=${this.namedLoops}
        .marks=${this.marks}
        .duration=${this.duration}
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

      <llama-whichkey
        .prefix=${this.wkPrefix}
        .completions=${this.wkCompletions}
        .windowFocused=${this.windowFocused}
        .editScratchActive=${this.editScratchActive}
        .editScratchFocus=${this.editScratchFocus}
        .editScratchDelta=${this.editScratchDelta}
        .warningMsg=${this.warningMsg}
        .errorMsg=${this.errorMsg}
      ></llama-whichkey>
    `;
  }
}

// Format seconds as m:ss (for status messages).
function _fmtTimePlain(secs) {
  if (secs == null || isNaN(secs)) return '?';
  const s = Math.floor(secs);
  return `${Math.floor(s / 60)}:${String(s % 60).padStart(2, '0')}`;
}

// Trigger a JSON file download in the browser.
function _downloadJson(jsonStr, filename) {
  const blob = new Blob([jsonStr], { type: 'application/json' });
  const url  = URL.createObjectURL(blob);
  const a    = document.createElement('a');
  a.href     = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}

customElements.define('llama-app', LlamaApp);
