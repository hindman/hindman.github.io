// llama-edit-loop-modal.js -- modal to edit an existing named loop.
//
// API:
//   show(loop) / hide()
//
// Events fired (composed, bubbling):
//   ll-update-loop  { id, name, start, end }

import { LitElement, html } from 'lit';
import { parseTime as _parseTime } from '../parseTime.js';
import { fmtTime } from '../format.js';
import { modalFieldStyles, renderField } from './modal-styles.js';
import '@shoelace-style/shoelace/dist/components/button/button.js';
import '@shoelace-style/shoelace/dist/components/input/input.js';
import './llama-modal.js';

class LlamaEditLoopModal extends LitElement {
  static styles = modalFieldStyles;

  static properties = {
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

  show(loop, tenths = false) {
    this._editId        = loop.id;
    this._name          = loop.name || '';
    this._start         = fmtTime(loop.start, tenths);
    this._end           = fmtTime(loop.end, tenths);
    this._originalStart = loop.start;
    this._originalEnd   = loop.end;
    this._error         = '';
    this._startEdited   = false;
    this._endEdited     = false;
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
    this.dispatchEvent(new CustomEvent('ll-update-loop', {
      detail: { id: this._editId, name: this._name.trim(), start, end },
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

  render() {
    return html`
      <llama-modal label="Edit loop" @ll-modal-initial-focus=${this._onInitialFocus}>
        ${renderField('Name', 'name', this._name,
            'Name',
            e => { this._name = e.target.value; }, this._onKeyDown)}
        ${renderField('Start', 'start', this._start,
            'Start',
            e => { this._start = e.target.value; this._startEdited = true; }, this._onKeyDown)}
        ${renderField('End', 'end', this._end,
            'End',
            e => { this._end = e.target.value; this._endEdited = true; }, this._onKeyDown)}
        <div class="error" style=${this._error ? '' : 'visibility: hidden'}>${this._error || ' '}</div>
        <div slot="footer">
          <sl-button @click=${this.hide}>Cancel</sl-button>
          <sl-button variant="primary" @click=${this._save}>Save</sl-button>
        </div>
      </llama-modal>
    `;
  }
}

customElements.define('llama-edit-loop-modal', LlamaEditLoopModal);
