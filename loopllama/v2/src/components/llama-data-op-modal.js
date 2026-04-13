// llama-data-op-modal.js -- unified data-operation prompt for ds/dr/di.
//
// API:
//   show({ operation, conflicts, orphans, conflictsHeader?, orphansHeader?,
//          conflictsTooltip?, orphansTooltip? })
//     operation:        Label for modal title (e.g. 'Save to cloud').
//     conflicts:        Array of video name strings with version conflicts.
//     orphans:          Array of video name strings present only at destination.
//     conflictsHeader:  Optional section heading. Default: 'Version conflicts'
//     orphansHeader:    Optional section heading. Default: 'Destination-only videos'
//     conflictsTooltip: Optional tooltip text for the conflicts heading icon.
//     orphansTooltip:   Optional tooltip text for the orphans heading icon.
//
//   Each section is only rendered when its array is non-empty. Caller
//   should ensure at least one array is non-empty before calling show().
//
//   hide()
//
// Event fired (bubbles + composed) after dialog closes:
//   ll-data-op-result
//     detail: { conflictChoice: 'replace'|'skip', orphanChoice: 'delete'|'keep' }
//             or null if user cancelled.
//
//   conflictChoice defaults to 'skip'; orphanChoice defaults to 'keep'.
//   If a section is not shown its choice still carries the default value.

import { LitElement, html, css } from 'lit';
import { createRef, ref } from 'lit/directives/ref.js';
import './llama-modal.js';
import '@shoelace-style/shoelace/dist/components/button/button.js';
import '@shoelace-style/shoelace/dist/components/switch/switch.js';
import '@shoelace-style/shoelace/dist/components/tooltip/tooltip.js';

class LlamaDataOpModal extends LitElement {
  static styles = css`
    .body {
      display: flex;
      flex-direction: column;
      gap: 1.25rem;
      max-height: 80vh;
      overflow-y: auto;
    }
    .section {
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
    }
    .section-heading {
      display: flex;
      align-items: center;
      gap: 0.35rem;
      font-size: var(--ll-text-sm, 0.85rem);
      color: var(--ll-text-muted, #888);
      text-transform: uppercase;
      letter-spacing: 0.05em;
    }
    .help-icon {
      font-size: var(--ll-text-xs, 0.75rem);
      color: var(--ll-text-dim, #aaa);
    }
    .section-heading sl-tooltip::part(body) {
      text-transform: none;
      letter-spacing: normal;
    }
    .name-list {
      list-style: disc;
      margin: 0;
      padding: 0 0 0 1.4rem;
      display: flex;
      flex-direction: column;
      gap: 0.1rem;
      max-height: 16rem;
      overflow-y: auto;
    }
    .name-list li {
      color: var(--ll-text, #e0e0e0);
      font-size: 0.9rem;
    }
  `;

  static properties = {
    _operation:       { state: true },
    _conflicts:       { state: true },
    _orphans:         { state: true },
    _conflictsHeader: { state: true },
    _orphansHeader:   { state: true },
    _conflictsTooltip: { state: true },
    _orphansTooltip:  { state: true },
    _conflictChoice:  { state: true },
    _orphanChoice:    { state: true },
  };

  constructor() {
    super();
    this._operation        = '';
    this._conflicts        = [];
    this._orphans          = [];
    this._conflictsHeader  = 'Version conflicts';
    this._orphansHeader    = 'Destination-only videos';
    this._conflictsTooltip = '';
    this._orphansTooltip   = '';
    this._conflictChoice   = 'skip';
    this._orphanChoice     = 'keep';
    this._answer           = null;
    this._cancelRef        = createRef();
  }

  show({
    operation        = '',
    conflicts        = [],
    orphans          = [],
    conflictsHeader  = 'Version conflicts',
    orphansHeader    = 'Destination-only videos',
    conflictsTooltip = '',
    orphansTooltip   = '',
  }) {
    this._operation        = operation;
    this._conflicts        = conflicts;
    this._orphans          = orphans;
    this._conflictsHeader  = conflictsHeader;
    this._orphansHeader    = orphansHeader;
    this._conflictsTooltip = conflictsTooltip;
    this._orphansTooltip   = orphansTooltip;
    this._conflictChoice   = 'skip';
    this._orphanChoice     = 'keep';
    this._answer           = null;
    this.renderRoot.querySelector('llama-modal')?.show();
  }

  hide() {
    this.renderRoot.querySelector('llama-modal')?.hide();
  }

  _onApply() {
    this._answer = {
      conflictChoice: this._conflictChoice,
      orphanChoice:   this._orphanChoice,
    };
    this.hide();
  }

  _onCancel() {
    this._answer = null;
    this.hide();
  }

  _onInitialFocus() {
    this._cancelRef.value?.focus();
  }

  _onAfterHide() {
    this.dispatchEvent(new CustomEvent('ll-data-op-result', {
      detail: this._answer,
      bubbles: true,
      composed: true,
    }));
    this._answer = null;
  }

  _renderHeading(label, tooltip) {
    return html`
      <div class="section-heading">
        ${label}
        ${tooltip ? html`
          <sl-tooltip content=${tooltip}>
            <span class="help-icon">ⓘ</span>
          </sl-tooltip>
        ` : ''}
      </div>
    `;
  }

  _renderConflictsSection() {
    if (this._conflicts.length === 0) return '';
    return html`
      <div class="section">
        ${this._renderHeading(this._conflictsHeader, this._conflictsTooltip)}
        <sl-switch
          ?checked=${this._conflictChoice === 'replace'}
          @sl-change=${e => { this._conflictChoice = e.target.checked ? 'replace' : 'skip'; }}
        >Replace</sl-switch>
        <ul class="name-list">
          ${this._conflicts.map(n => html`<li>${n}</li>`)}
        </ul>
      </div>
    `;
  }

  _renderOrphansSection() {
    if (this._orphans.length === 0) return '';
    return html`
      <div class="section">
        ${this._renderHeading(this._orphansHeader, this._orphansTooltip)}
        <sl-switch
          ?checked=${this._orphanChoice === 'delete'}
          @sl-change=${e => { this._orphanChoice = e.target.checked ? 'delete' : 'keep'; }}
        >Delete</sl-switch>
        <ul class="name-list">
          ${this._orphans.map(n => html`<li>${n}</li>`)}
        </ul>
      </div>
    `;
  }

  render() {
    const title = this._operation
      ? `Review conflict: ${this._operation}`
      : 'Review conflict';
    return html`
      <llama-modal
        label=${title}
        width="47.5rem"
        @ll-modal-close=${this._onAfterHide}
        @ll-modal-initial-focus=${this._onInitialFocus}
      >
        <div class="body">
          ${this._renderConflictsSection()}
          ${this._renderOrphansSection()}
        </div>
        <div slot="footer" style="display:flex; gap:0.5rem; justify-content:flex-end">
          <sl-button variant="primary" @click=${this._onApply}>Apply</sl-button>
          <sl-button ${ref(this._cancelRef)} @click=${this._onCancel}>Cancel</sl-button>
        </div>
      </llama-modal>
    `;
  }
}

customElements.define('llama-data-op-modal', LlamaDataOpModal);
