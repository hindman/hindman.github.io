// llama-edit-section-modal.js -- modal to edit a section's name, start, and end.
//
// Props:
//   section: Section object | null  -- the section being edited
//
// Events fired (composed, bubbling):
//   ll-update-section  { id, name, start, end }
//     end is null when left blank (open-ended / derive from next divider)
//
// API:
//   show(section?, derivedEnd?) / hide()
//   Pass the section directly to show(). derivedEnd (seconds | null) is used
//   as placeholder hint text when section.end is not set explicitly.

import { LitElement, html, css } from 'lit';
import { parseTime as _parseTime } from '../parseTime.js';
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
    .error {
      font-size: var(--ll-text-sm, 0.85rem);
      color: var(--ll-danger, #e05a5a);
      margin-bottom: 0.5rem;
    }
  `;

  static properties = {
    section:      { type: Object },
    _name:        { state: true },
    _time:        { state: true },
    _end:         { state: true },
    _derivedEnd:  { state: true },
    _error:       { state: true },
    _timeEdited:  { state: true },
    _endEdited:   { state: true },
  };

  constructor() {
    super();
    this.section        = null;
    this._name          = '';
    this._time          = '';
    this._end           = '';
    this._derivedEnd    = null;
    this._error         = '';
    this._timeEdited    = false;
    this._endEdited     = false;
    this._originalTime  = null;
    this._originalEnd   = null;
  }

  // derivedEnd: the end that would be used if section.end stays null
  // (i.e. next section's start, or video duration). Used for placeholder hint.
  show(section, derivedEnd = null) {
    const s = section ?? this.section;
    if (s) {
      this.section        = s;
      this._name          = s.name || '';
      this._time          = _fmtTime(s.start);
      this._end           = _fmtTime(s.end);
      this._originalTime  = s.start;
      this._originalEnd   = s.end;
      this._derivedEnd    = derivedEnd;
      this._error         = '';
    }
    this._timeEdited = false;
    this._endEdited  = false;
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
    const start = this._timeEdited ? _parseTime(this._time) : this._originalTime;
    if (start === null) {
      this._error = 'Start is required.';
      return;
    }
    let end = null;
    if (this._endEdited ? this._end.trim() : this._originalEnd != null) {
      end = this._endEdited ? _parseTime(this._end) : this._originalEnd;
      if (end === null) {
        this._error = 'Invalid end time.';
        return;
      }
      if (end <= start) {
        this._error = 'End must be after start.';
        return;
      }
    }
    this._error = '';
    this.dispatchEvent(new CustomEvent('ll-update-section', {
      detail: { id: this.section.id, name: this._name.trim(), start, end },
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
    const endPlaceholder = this._derivedEnd != null
      ? `${_fmtTime(this._derivedEnd)} (derived)`
      : '';

    return html`
      <llama-modal label="Edit section" @ll-modal-initial-focus=${this._onInitialFocus}>
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
          <span class="field-label">Start</span>
          <sl-input autocomplete="off"
            data-field="time"
            placeholder="Start"
            .value=${this._time}
            @sl-input=${e => { this._time = e.target.value; this._timeEdited = true; }}
            @keydown=${this._onKeyDown}
          ></sl-input>
        </div>
        <div class="field-row">
          <span class="field-label">End</span>
          <sl-input autocomplete="off"
            data-field="end"
            placeholder=${endPlaceholder}
            .value=${this._end}
            @sl-input=${e => { this._end = e.target.value; this._endEdited = true; }}
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

// Format seconds as m:ss (rounds to nearest second).
function _fmtTime(secs) {
  if (secs == null || isNaN(secs)) return '';
  const r = Math.round(secs);
  return `${Math.floor(r / 60)}:${String(r % 60).padStart(2, '0')}`;
}

customElements.define('llama-edit-section-modal', LlamaEditSectionModal);
