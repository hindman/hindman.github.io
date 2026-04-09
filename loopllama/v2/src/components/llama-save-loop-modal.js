// llama-save-loop-modal.js -- modal to save the scratch loop as a named loop,
// or to edit an existing named loop.
//
// Props:
//   loopStart: Number -- current scratch-loop start (seconds); used as default
//   loopEnd:   Number -- current scratch-loop end (seconds); used as default
//
// Events fired (composed, bubbling):
//   ll-save-loop    { name, start, end }     -- create mode
//   ll-update-loop  { id, name, start, end } -- edit mode
//
// API:
//   show(loop?)  -- no arg = create; loop object = edit
//   hide()

import { LitElement, html, css } from 'lit';
import { parseTime as _parseTime } from '../parseTime.js';
import '@shoelace-style/shoelace/dist/components/button/button.js';
import '@shoelace-style/shoelace/dist/components/input/input.js';
import './llama-modal.js';

class LlamaSaveLoopModal extends LitElement {
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
    .error {
      font-size: var(--ll-text-sm, 0.85rem);
      color: var(--ll-danger, #e05a5a);
      margin-bottom: 0.5rem;
    }
  `;

  static properties = {
    loopStart:    { type: Number },
    loopEnd:      { type: Number },
    _editId:      { state: true },
    _name:        { state: true },
    _start:       { state: true },
    _end:         { state: true },
    _error:       { state: true },
    _startEdited: { state: true },
    _endEdited:   { state: true },
  };

  constructor() {
    super();
    this.loopStart      = 0;
    this.loopEnd        = 0;
    this._editId        = null;
    this._name          = '';
    this._start         = '';
    this._end           = '';
    this._error         = '';
    this._startEdited   = false;
    this._endEdited     = false;
    this._originalStart = null;
    this._originalEnd   = null;
  }

  show(loop = null) {
    if (loop) {
      this._editId        = loop.id;
      this._name          = loop.name || '';
      this._start         = _fmtTime(loop.start);
      this._end           = _fmtTime(loop.end);
      this._originalStart = loop.start;
      this._originalEnd   = loop.end;
    } else {
      this._editId        = null;
      this._name          = '';
      this._start         = _fmtTime(this.loopStart);
      this._end           = _fmtTime(this.loopEnd);
      this._originalStart = this.loopStart;
      this._originalEnd   = this.loopEnd;
    }
    this._error       = '';
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
    const start = this._startEdited ? _parseTime(this._start) : this._originalStart;
    const end   = this._endEdited   ? _parseTime(this._end)   : this._originalEnd;
    if (start === null || end === null) {
      this._error = 'Start and end are required.';
      return;
    }
    if (end <= start) {
      this._error = 'End must be after start.';
      return;
    }
    this._error = '';
    const name = this._name.trim();
    if (this._editId) {
      this.dispatchEvent(new CustomEvent('ll-update-loop', {
        detail: { id: this._editId, name, start, end },
        bubbles:  true,
        composed: true,
      }));
    } else {
      this.dispatchEvent(new CustomEvent('ll-save-loop', {
        detail: { name, start, end },
        bubbles:  true,
        composed: true,
      }));
    }
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
    const title  = this._editId ? 'Edit Loop' : 'Save Loop';
    const btnLabel = this._editId ? 'Update' : 'Save';
    return html`
      <llama-modal label=${title} @ll-modal-initial-focus=${this._onInitialFocus}>
        ${this._renderField('Name (optional)', 'name', this._name,
            'Short label (e.g. "outro lick")',
            e => { this._name = e.target.value; })}
        ${this._renderField('Start', 'start', this._start,
            'm:ss',
            e => { this._start = e.target.value; this._startEdited = true; })}
        ${this._renderField('End', 'end', this._end,
            'm:ss',
            e => { this._end = e.target.value; this._endEdited = true; })}
        ${this._error ? html`<div class="error">${this._error}</div>` : ''}
        <div slot="footer">
          <sl-button @click=${this.hide}>Cancel</sl-button>
          <sl-button variant="primary" @click=${this._save}>${btnLabel}</sl-button>
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

customElements.define('llama-save-loop-modal', LlamaSaveLoopModal);
