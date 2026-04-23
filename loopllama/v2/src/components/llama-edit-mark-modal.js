// llama-edit-mark-modal.js -- modal to edit a mark's name and time.
//
// Props:
//   mark: Mark object | null  -- the mark being edited
//
// Events fired (composed, bubbling):
//   ll-update-mark  { id, name, time }
//
// API:
//   show(mark?) / hide()
//   Pass the mark directly to show() or set the .mark prop first.

import { LitElement, html, css } from 'lit';
import { fmtTime } from '../format.js';
import { parseTime as _parseTime } from '../parseTime.js';
import '@shoelace-style/shoelace/dist/components/button/button.js';
import '@shoelace-style/shoelace/dist/components/input/input.js';
import './llama-modal.js';

class LlamaEditMarkModal extends LitElement {
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
    mark:        { type: Object },
    _name:       { state: true },
    _time:       { state: true },
    _timeEdited: { state: true },
    _error:      { state: true },
  };

  constructor() {
    super();
    this.mark          = null;
    this._name         = '';
    this._time         = '';
    this._timeEdited   = false;
    this._error        = '';
    this._originalTime = null;
  }

  show(mark) {
    const m = mark ?? this.mark;
    if (m) {
      this.mark          = m;
      this._name         = m.name || '';
      this._time         = fmtTime(m.time);
      this._originalTime = m.time;
    }
    this._timeEdited = false;
    this._error      = '';
    this.renderRoot.querySelector('llama-modal')?.show();
  }

  hide() {
    this.renderRoot.querySelector('llama-modal')?.hide();
  }

  _onInitialFocus() {
    this.renderRoot.querySelector('sl-input[data-field="name"]')?.focus();
  }

  _save() {
    if (!this.mark) return;
    const time = this._timeEdited ? _parseTime(this._time) : this._originalTime;
    if (time === null) {
      this._error = 'Time is required.';
      return;
    }
    this._error = '';
    this.dispatchEvent(new CustomEvent('ll-update-mark', {
      detail: { id: this.mark.id, name: this._name.trim(), time },
      bubbles: true, composed: true,
    }));
    this.hide();
  }

  _onKeyDown(e) {
    if (e.key === 'Enter') {
      e.preventDefault();
      this._save();
    }
  }

  render() {
    return html`
      <llama-modal label="Edit mark" @ll-modal-initial-focus=${this._onInitialFocus}>
        <div class="field-row">
          <span class="field-label">Name</span>
          <sl-input autocomplete="off"
            data-field="name"
            placeholder="Name"
            .value=${this._name}
            @sl-input=${e => { this._name = e.target.value; }}
            @keydown=${this._onKeyDown}
          ></sl-input>
        </div>
        <div class="field-row">
          <span class="field-label">Time</span>
          <sl-input autocomplete="off"
            data-field="time"
            placeholder="Time"
            .value=${this._time}
            @sl-input=${e => { this._time = e.target.value; this._timeEdited = true; }}
            @keydown=${this._onKeyDown}
          ></sl-input>
        </div>
        <div class="error" style=${this._error ? '' : 'visibility: hidden'}>${this._error || '\u00a0'}</div>
        <div slot="footer">
          <sl-button @click=${this.hide}>Cancel</sl-button>
          <sl-button variant="primary" @click=${this._save}>Save</sl-button>
        </div>
      </llama-modal>
    `;
  }
}


customElements.define('llama-edit-mark-modal', LlamaEditMarkModal);
