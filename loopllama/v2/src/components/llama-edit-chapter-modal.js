// llama-edit-chapter-modal.js -- modal to edit an existing chapter.
//
// API:
//   show(chapter, derivedEnd?) -- pre-filled from chapter object
//   hide()
//
// Events fired (composed, bubbling):
//   ll-update-chapter  { id, name, start, end }

import { LitElement, html } from 'lit';
import { parseTime as _parseTime } from '../parseTime.js';
import { fmtTime } from '../format.js';
import { modalFieldStyles, renderField } from './modal-styles.js';
import '@shoelace-style/shoelace/dist/components/button/button.js';
import '@shoelace-style/shoelace/dist/components/input/input.js';
import './llama-modal.js';

class LlamaEditChapterModal extends LitElement {
  static styles = modalFieldStyles;

  static properties = {
    _id:           { state: true },  // chapter id being edited
    _name:         { state: true },
    _start:        { state: true },
    _end:          { state: true },
    _derivedEnd:   { state: true },
    _error:        { state: true },
    _startEdited:  { state: true },
    _endEdited:    { state: true },
  };

  constructor() {
    super();
    this._id            = null;
    this._name          = '';
    this._start         = '';
    this._end           = '';
    this._derivedEnd    = null;
    this._error         = '';
    this._startEdited   = false;
    this._endEdited     = false;
    this._originalStart = null;
    this._originalEnd   = null;
    this._validator     = null;
  }

  // derivedEnd: the end that would be used if chapter.end stays null
  // (i.e. next chapter's start, or video duration). Used for placeholder hint.
  // validator: optional (start, end) => boolean — called on save; returns false
  //   to block with an inline error message.
  show(chapter, derivedEnd = null, validator = null) {
    this._id            = chapter.id;
    this._name          = chapter.name || '';
    this._start         = fmtTime(chapter.start);
    this._end           = fmtTime(chapter.end);
    this._originalStart = chapter.start;
    this._originalEnd   = chapter.end;
    this._derivedEnd    = derivedEnd;
    this._error         = '';
    this._startEdited   = false;
    this._endEdited     = false;
    this._validator     = validator;
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
      this._error = 'Edit would eliminate a neighbor chapter.';
      return;
    }
    this._error = '';
    this.dispatchEvent(new CustomEvent('ll-update-chapter', {
      detail: { id: this._id, name: this._name.trim(), start, end },
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
    const title = 'Edit chapter';
    const endPlaceholder = this._derivedEnd != null
      ? `${fmtTime(this._derivedEnd)} (derived)`
      : '';
    return html`
      <llama-modal label=${title} @ll-modal-initial-focus=${this._onInitialFocus}>
        ${renderField('Name', 'name', this._name,
            'Name',
            e => { this._name = e.target.value; }, this._onKeyDown)}
        ${renderField('Start', 'start', this._start,
            'Start',
            e => { this._start = e.target.value; this._startEdited = true; }, this._onKeyDown)}
        ${renderField('End', 'end', this._end,
            endPlaceholder,
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

customElements.define('llama-edit-chapter-modal', LlamaEditChapterModal);
