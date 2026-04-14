// llama-edit-video-modal.js -- modal to edit current video metadata.
//
// Props:
//   video: Video object | null  -- the current video to edit
//
// Events fired (composed, bubbling):
//   ll-update-video  { id, name, start, end }
//
// API:
//   show() / hide()
//
// Time fields (start, end) accept the same formats as loop inputs:
//   m:ss, h:mm:ss, raw seconds (e.g. "73", "1:13:44").

import { LitElement, html, css } from 'lit';
import { parseTime as _parseTime } from '../parseTime.js';
import '@shoelace-style/shoelace/dist/components/button/button.js';
import '@shoelace-style/shoelace/dist/components/input/input.js';
import './llama-modal.js';

class LlamaEditVideoModal extends LitElement {
  static styles = css`
    .field-row {
      display: flex;
      flex-direction: column;
      gap: 0.2rem;
      margin-bottom: 0.7rem;
    }
    .field-label {
      font-size: var(--ll-text-sm, 0.85rem);
      color: var(--ll-text-dim, #aaa);
    }
    .video-id {
      font-family: monospace;
      color: var(--ll-text-muted, #666);
      font-size: var(--ll-text-sm, 0.85rem);
      padding: 0.2rem 0;
    }
  `;

  static properties = {
    video:        { type: Object },
    _name:        { state: true },
    _start:       { state: true },
    _end:         { state: true },
    _startEdited: { state: true },
    _endEdited:   { state: true },
  };

  constructor() {
    super();
    this.video          = null;
    this._name          = '';
    this._start         = '';
    this._end           = '';
    this._startEdited   = false;
    this._endEdited     = false;
    this._originalStart = null;
    this._originalEnd   = null;
  }

  show() {
    const v = this.video;
    if (v) {
      this._name          = v.name  || '';
      this._start         = v.start > 0   ? _fmtTime(v.start) : '';
      this._end           = v.end != null ? _fmtTime(v.end)   : '';
      this._originalStart = v.start ?? 0;
      this._originalEnd   = v.end   ?? null;
    }
    this._startEdited = false;
    this._endEdited   = false;
    this.renderRoot.querySelector('llama-modal')?.show();
  }

  hide() {
    this.renderRoot.querySelector('llama-modal')?.hide();
  }

  _onInitialFocus() {
    this.renderRoot.querySelector('sl-input[data-field="name"]')?.focus();
  }

  _save() {
    if (!this.video) return;
    const start = this._startEdited ? (_parseTime(this._start) ?? 0) : this._originalStart;
    const end   = this._endEdited
      ? (this._end.trim() ? (_parseTime(this._end) ?? null) : null)
      : this._originalEnd;
    this.dispatchEvent(new CustomEvent('ll-update-video', {
      detail: {
        id:    this.video.id,
        name:  this._name.trim(),
        start,
        end,
      },
      bubbles: true,
      composed: true,
    }));
    this.hide();
  }

  _onKeyDown(e) {
    if (e.key === 'Enter') {
      e.preventDefault();
      this._save();
    }
  }

  _renderField(label, field, value, placeholder, onInput) {
    return html`
      <div class="field-row">
        <span class="field-label">${label}</span>
        <sl-input autocomplete="off"
          data-field=${field}
          placeholder=${placeholder}
          .value=${value}
          @sl-input=${onInput}
          @keydown=${this._onKeyDown}
        ></sl-input>
      </div>
    `;
  }

  render() {
    return html`
      <llama-modal label="Edit video" @ll-modal-initial-focus=${this._onInitialFocus}>
        ${this._renderField('Name', 'name', this._name,
            'Name',
            e => { this._name = e.target.value; })}
        ${this._renderField('Start', 'start', this._start,
            'Custom start',
            e => { this._start = e.target.value; this._startEdited = true; })}
        ${this._renderField('End', 'end', this._end,
            'Custom end',
            e => { this._end = e.target.value; this._endEdited = true; })}
        <div class="field-row">
          <span class="field-label">Video ID</span>
          <div class="video-id">${this.video?.id ?? ''}</div>
        </div>
        <div slot="footer">
          <sl-button @click=${this.hide}>Cancel</sl-button>
          <sl-button variant="primary" @click=${this._save}>Save</sl-button>
        </div>
      </llama-modal>
    `;
  }
}

// Format seconds as m:ss (rounds to nearest second).
function _fmtTime(secs) {
  if (secs == null || isNaN(secs)) return '';
  const r = Math.round(secs);
  return `${Math.floor(r / 60)}:${String(r % 60).padStart(2, '0')}`;
}

customElements.define('llama-edit-video-modal', LlamaEditVideoModal);
