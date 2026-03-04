// llama-edit-section-modal.js -- modal to edit a section's name and time.
//
// Props:
//   section: Section object | null  -- the section being edited
//
// Events fired (composed, bubbling):
//   ll-update-section  { id, name, time }
//
// API:
//   show(section?) / hide()
//   Pass the section directly to show() or set the .section prop first.

import { LitElement, html, css } from 'lit';
import '@shoelace-style/shoelace/dist/components/button/button.js';
import '@shoelace-style/shoelace/dist/components/input/input.js';
import './llama-modal.js';

class LlamaEditSectionModal extends LitElement {
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
    section: { type: Object },
    _name:   { state: true },
    _time:   { state: true },
  };

  constructor() {
    super();
    this.section = null;
    this._name   = '';
    this._time   = '';
  }

  show(section) {
    const s = section ?? this.section;
    if (s) {
      this.section = s;
      this._name   = s.name || '';
      this._time   = _fmtTime(s.time);
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
    if (!this.section) return;
    const time = _parseTime(this._time);
    if (time === null) {
      // Leave the field highlighted; user must fix it.
      return;
    }
    this.dispatchEvent(new CustomEvent('ll-update-section', {
      detail: { id: this.section.id, name: this._name.trim(), time },
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
      <llama-modal label="Edit Section" @ll-modal-initial-focus=${this._onInitialFocus}>
        <div class="field-row">
          <span class="field-label">Name</span>
          <sl-input
            data-field="name"
            placeholder="Optional label (e.g. "Verse", "Solo")"
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

// Parse time string to seconds. Returns null on failure.
// Supports: m:ss, h:mm:ss, raw seconds.
function _parseTime(str) {
  str = (str || '').trim().replace(/\//g, ':');
  if (!str) return null;
  const parts = str.split(':');
  if (parts.length === 2 || parts.length === 3) {
    const nums = parts.map(p => parseFloat(p));
    if (nums.some(isNaN)) return null;
    return parts.length === 2
      ? nums[0] * 60 + nums[1]
      : nums[0] * 3600 + nums[1] * 60 + nums[2];
  }
  const n = parseFloat(str);
  return !isNaN(n) && n >= 0 ? n : null;
}

customElements.define('llama-edit-section-modal', LlamaEditSectionModal);
