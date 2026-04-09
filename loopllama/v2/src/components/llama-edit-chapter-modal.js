// llama-edit-chapter-modal.js -- modal to edit an existing chapter.
//
// API:
//   showEdit(chapter, derivedEnd?) -- pre-filled from chapter object
//   hide()
//
// Events fired (composed, bubbling):
//   ll-update-chapter  { id, name, start, end }

import { LitElement, html, css } from 'lit';
import { parseTime as _parseTime } from '../parseTime.js';
import '@shoelace-style/shoelace/dist/components/button/button.js';
import '@shoelace-style/shoelace/dist/components/input/input.js';
import './llama-modal.js';

class LlamaEditChapterModal extends LitElement {
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
  }

  // derivedEnd: the end that would be used if chapter.end stays null
  // (i.e. next chapter's start, or video duration). Used for placeholder hint.
  showEdit(chapter, derivedEnd = null) {
    this._mode          = 'edit';
    this._id            = chapter.id;
    this._name          = chapter.name || '';
    this._start         = _fmtTime(chapter.start);
    this._end           = _fmtTime(chapter.end);
    this._originalStart = chapter.start;
    this._originalEnd   = chapter.end;
    this._derivedEnd    = derivedEnd;
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
    const title = 'Edit Chapter';
    const endPlaceholder = (this._derivedEnd != null)
      ? `${_fmtTime(this._derivedEnd)} (derived — leave blank to keep open-ended)`
      : 'Leave blank to derive from next chapter';
    return html`
      <llama-modal label=${title} @ll-modal-initial-focus=${this._onInitialFocus}>
        ${this._renderField('Name (optional)', 'name', this._name,
            'e.g. "Verse", "Bridge"',
            e => { this._name = e.target.value; })}
        ${this._renderField('Start', 'start', this._start,
            'm:ss',
            e => { this._start = e.target.value; this._startEdited = true; })}
        ${this._renderField('End — optional', 'end', this._end,
            endPlaceholder,
            e => { this._end = e.target.value; this._endEdited = true; })}
        ${this._error ? html`<div class="error">${this._error}</div>` : ''}
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

customElements.define('llama-edit-chapter-modal', LlamaEditChapterModal);
