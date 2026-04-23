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

import { LitElement, html } from 'lit';
import { parseTime as _parseTime } from '../parseTime.js';
import { fmtTime } from '../format.js';
import { modalFieldStyles, renderField } from './modal-styles.js';
import '@shoelace-style/shoelace/dist/components/button/button.js';
import '@shoelace-style/shoelace/dist/components/input/input.js';
import './llama-modal.js';

class LlamaEditSectionModal extends LitElement {
  static styles = modalFieldStyles;

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
    this._validator     = null;
  }

  // derivedEnd: the end that would be used if section.end stays null
  // (i.e. next section's start, or video duration). Used for placeholder hint.
  // validator: optional (start, end) => boolean — called on save; returns false
  //   to block with an inline error message.
  show(section, derivedEnd = null, validator = null) {
    const s = section ?? this.section;
    if (s) {
      this.section        = s;
      this._name          = s.name || '';
      this._time          = fmtTime(s.start);
      this._end           = fmtTime(s.end);
      this._originalTime  = s.start;
      this._originalEnd   = s.end;
      this._derivedEnd    = derivedEnd;
      this._error         = '';
    }
    this._timeEdited = false;
    this._endEdited  = false;
    this._validator  = validator;
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
    if (this._validator && !this._validator(start, end)) {
      this._error = 'Edit would eliminate a neighbor section.';
      return;
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
      ? `${fmtTime(this._derivedEnd)} (derived)`
      : '';

    return html`
      <llama-modal label="Edit section" @ll-modal-initial-focus=${this._onInitialFocus}>
        ${renderField('Name', 'name', this._name, 'Name',
            e => { this._name = e.target.value; }, this._onKeyDown)}
        ${renderField('Start', 'time', this._time, 'Start',
            e => { this._time = e.target.value; this._timeEdited = true; }, this._onKeyDown)}
        ${renderField('End', 'end', this._end, endPlaceholder,
            e => { this._end = e.target.value; this._endEdited = true; }, this._onKeyDown)}
        <div class="error" style=${this._error ? '' : 'visibility: hidden'}>${this._error || '\u00a0'}</div>
        <div slot="footer">
          <sl-button @click=${this.hide}>Cancel</sl-button>
          <sl-button variant="primary" @click=${this._save}>Save</sl-button>
        </div>
      </llama-modal>
    `;
  }
}

customElements.define('llama-edit-section-modal', LlamaEditSectionModal);
