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
  `;

  static properties = {
    mark:   { type: Object },
    _name:  { state: true },
    _time:  { state: true },
  };

  constructor() {
    super();
    this.mark  = null;
    this._name = '';
    this._time = '';
  }

  show(mark) {
    const m = mark ?? this.mark;
    if (m) {
      this.mark  = m;
      this._name = m.name || '';
      this._time = _fmtTime(m.time);
    }
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
    const time = _parseTime(this._time);
    if (time === null) {
      // Leave the field highlighted; user must fix it.
      return;
    }
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
      <llama-modal label="Edit Mark" @ll-modal-initial-focus=${this._onInitialFocus}>
        <div class="field-row">
          <span class="field-label">Name</span>
          <sl-input
            data-field="name"
            placeholder="Optional label (e.g. "Bridge start")"
            .value=${this._name}
            @sl-input=${e => { this._name = e.target.value; }}
            @keydown=${this._onKeyDown}
          ></sl-input>
        </div>
        <div class="field-row">
          <span class="field-label">Time (m:ss)</span>
          <sl-input
            data-field="time"
            placeholder="e.g. 1:23"
            .value=${this._time}
            @sl-input=${e => { this._time = e.target.value; }}
            @keydown=${this._onKeyDown}
          ></sl-input>
        </div>
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

customElements.define('llama-edit-mark-modal', LlamaEditMarkModal);
