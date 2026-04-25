// divider-edit-mixin.js -- shared logic for editing divider entities
// (sections and chapters).
//
// Subclasses must implement three getters:
//   get _eventName()   -- custom event to fire on save (e.g. 'll-update-section')
//   get _entityLabel() -- lowercase entity name for error messages (e.g. 'section')
//   get _modalLabel()  -- modal title string (e.g. 'Edit section')
//
// API (provided by mixin):
//   show(entity, derivedEnd?, validator?) -- pre-fill from entity object
//   hide()

import { html } from 'lit';
import { parseTime as _parseTime } from '../parseTime.js';
import { fmtTime } from '../format.js';
import { renderField } from './modal-styles.js';

export const DividerEditMixin = (superClass) => class extends superClass {
  static properties = {
    _name:         { state: true },
    _start:        { state: true },
    _end:          { state: true },
    _derivedEnd:   { state: true },
    _error:        { state: true },
    _startEdited:  { state: true },
    _endEdited:    { state: true },
  };

  constructor(...args) {
    super(...args);
    this._entityId      = null;
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

  // entity: section or chapter object
  // derivedEnd: the end that would be used if entity.end stays null
  //   (next divider's start, or video duration). Used for placeholder hint.
  // validator: optional (start, end) => boolean -- returns false to block save.
  show(entity, derivedEnd = null, validator = null) {
    this._entityId      = entity.id;
    this._name          = entity.name || '';
    this._start         = fmtTime(entity.start);
    this._end           = fmtTime(entity.end);
    this._originalStart = entity.start;
    this._originalEnd   = entity.end;
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
    if (!this._entityId) return;
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
      this._error = `Edit would eliminate a neighbor ${this._entityLabel}.`;
      return;
    }
    this._error = '';
    this.dispatchEvent(new CustomEvent(this._eventName, {
      detail: { id: this._entityId, name: this._name.trim(), start, end },
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
      <llama-modal label=${this._modalLabel} @ll-modal-initial-focus=${this._onInitialFocus}>
        ${renderField('Name', 'name', this._name, 'Name',
            e => { this._name = e.target.value; }, this._onKeyDown)}
        ${renderField('Start', 'start', this._start, 'Start',
            e => { this._start = e.target.value; this._startEdited = true; }, this._onKeyDown)}
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
};
