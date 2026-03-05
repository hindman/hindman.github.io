// llama-save-loop-modal.js -- modal to save the scratch loop as a named loop.
//
// Props:
//   loopStart: Number -- current scratch-loop start (seconds); used as default
//   loopEnd:   Number -- current scratch-loop end (seconds); used as default
//
// Events fired (composed, bubbling):
//   ll-save-loop  { name, start, end }
//
// API:
//   show() / hide()

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
    loopStart: { type: Number },
    loopEnd:   { type: Number },
    _name:     { state: true },
    _start:    { state: true },
    _end:      { state: true },
    _error:    { state: true },
  };

  constructor() {
    super();
    this.loopStart = 0;
    this.loopEnd   = 0;
    this._name     = '';
    this._start    = '';
    this._end      = '';
    this._error    = '';
  }

  show() {
    this._name  = '';
    this._start = _fmtTime(this.loopStart);
    this._end   = _fmtTime(this.loopEnd);
    this._error = '';
    this.renderRoot.querySelector('llama-modal')?.show();
  }

  hide() {
    this.renderRoot.querySelector('llama-modal')?.hide();
  }

  _onInitialFocus() {
    this.renderRoot.querySelector('sl-input[data-field="name"]')?.focus();
  }

  _save() {
    const start = _parseTime(this._start);
    const end   = _parseTime(this._end);
    if (start === null || end === null) {
      this._error = 'Start and end are required.';
      return;
    }
    if (end <= start) {
      this._error = 'End must be after start.';
      return;
    }
    this._error = '';
    this.dispatchEvent(new CustomEvent('ll-save-loop', {
      detail: { name: this._name.trim(), start, end },
      bubbles:  true,
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
        <sl-input
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
      <llama-modal label="Save Loop" @ll-modal-initial-focus=${this._onInitialFocus}>
        ${this._renderField('Name (optional)', 'name', this._name,
            'Short label (e.g. "outro lick")',
            e => { this._name = e.target.value; })}
        ${this._renderField('Start', 'start', this._start,
            'm:ss',
            e => { this._start = e.target.value; })}
        ${this._renderField('End', 'end', this._end,
            'm:ss',
            e => { this._end = e.target.value; })}
        ${this._error ? html`<div class="error">${this._error}</div>` : ''}
        <div slot="footer">
          <sl-button @click=${this.hide}>Cancel</sl-button>
          <sl-button variant="primary" @click=${this._save}>Save</sl-button>
        </div>
      </llama-modal>
    `;
  }
}

// Format seconds as m:ss.
function _fmtTime(secs) {
  if (secs == null || isNaN(secs)) return '';
  const s = Math.floor(secs);
  return `${Math.floor(s / 60)}:${String(s % 60).padStart(2, '0')}`;
}

customElements.define('llama-save-loop-modal', LlamaSaveLoopModal);
