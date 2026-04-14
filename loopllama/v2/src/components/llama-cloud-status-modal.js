// llama-cloud-status-modal.js -- read-only modal comparing local vs cloud state.
//
// API:
//   show({ localOnly, localNewer, cloudOnly, cloudNewer, sameCount })
//     Each of localOnly/localNewer/cloudOnly/cloudNewer is an array of
//     display name strings. sameCount is an integer.
//   hide()

import { LitElement, html, css } from 'lit';
import '@shoelace-style/shoelace/dist/components/button/button.js';
import './llama-modal.js';

class LlamaCloudStatusModal extends LitElement {
  static styles = css`
    .status-body {
      display: flex;
      flex-direction: column;
      gap: 1rem;
      max-height: 65vh;
      overflow-y: auto;
    }
    .status-section {
      display: flex;
      flex-direction: column;
      gap: 0.25rem;
    }
    .status-label {
      font-size: var(--ll-text-sm, 0.85rem);
      color: var(--ll-text-muted, #888);
      text-transform: uppercase;
      letter-spacing: 0.05em;
    }
    .status-list {
      list-style: none;
      margin: 0;
      padding: 0 0 0 0.75rem;
      display: flex;
      flex-direction: column;
      gap: 0.1rem;
    }
    .status-list li {
      color: var(--ll-text, #e0e0e0);
    }
    .status-empty {
      color: var(--ll-text-muted, #888);
      font-style: italic;
      padding-left: 0.75rem;
    }
    .status-count {
      color: var(--ll-text-muted, #888);
      padding-left: 0.75rem;
    }
  `;

  static properties = {
    _data: { state: true },
  };

  constructor() {
    super();
    this._data = null;
  }

  show(data) {
    this._data = data;
    this.renderRoot.querySelector('llama-modal')?.show();
  }

  hide() {
    this.renderRoot.querySelector('llama-modal')?.hide();
  }

  _onInitialFocus() {
    this.renderRoot.querySelector('sl-button')?.focus();
  }

  _renderSection(label, names) {
    return html`
      <div class="status-section">
        <div class="status-label">${label}</div>
        ${names.length > 0
          ? html`<ul class="status-list">${names.map(n => html`<li>${n}</li>`)}</ul>`
          : html`<div class="status-empty">None</div>`}
      </div>
    `;
  }

  render() {
    const d = this._data;
    return html`
      <llama-modal
        label="Compare data: local and cloud"
        width="44rem"
        @ll-modal-initial-focus=${this._onInitialFocus}
      >
        ${d ? html`
          <div class="status-body">
            ${this._renderSection('Local only', d.localOnly)}
            ${this._renderSection('Local newer', d.localNewer)}
            ${this._renderSection('Cloud only', d.cloudOnly)}
            ${this._renderSection('Cloud newer', d.cloudNewer)}
            <div class="status-section">
              <div class="status-label">In sync</div>
              <div class="status-count">
                ${d.sameCount} video${d.sameCount !== 1 ? 's' : ''}
              </div>
            </div>
          </div>
        ` : ''}
        <div slot="footer">
          <sl-button variant="primary" @click=${() => this.hide()}>Close</sl-button>
        </div>
      </llama-modal>
    `;
  }
}

customElements.define('llama-cloud-status-modal', LlamaCloudStatusModal);
