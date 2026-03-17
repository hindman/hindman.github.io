// llama-dropdown.js -- reusable dropdown menu component.
//
// A thin wrapper around Shoelace sl-dropdown / sl-menu / sl-menu-item.
//
// Properties:
//   label: String -- button label shown on the trigger
//   items: Array  -- [{ label, action?, disabled? } | { type: 'divider' }]
//
// Fires (bubbles + composed):
//   ll-menu-select -- { action, label }

import { LitElement, html, css } from 'lit';
import '@shoelace-style/shoelace/dist/components/dropdown/dropdown.js';
import '@shoelace-style/shoelace/dist/components/menu/menu.js';
import '@shoelace-style/shoelace/dist/components/menu-item/menu-item.js';
import '@shoelace-style/shoelace/dist/components/divider/divider.js';

class LlamaDropdown extends LitElement {
  static styles = css`
    :host {
      display: inline-block;
    }

    .trigger-btn {
      padding: 0.25rem 0.7rem;
      background: var(--ll-surface-raised, #2a2a2a);
      border: 1px solid var(--ll-border, #444);
      border-radius: var(--ll-radius, 3px);
      color: var(--ll-text, #e0e0e0);
      font-size: var(--ll-text-sm, 0.85rem);
      cursor: pointer;
    }

    .trigger-btn:hover {
      border-color: var(--ll-accent, #7ec8e3);
      color: var(--ll-accent, #7ec8e3);
    }

    .caret {
      font-size: 0.7em;
      margin-left: 0.3em;
      opacity: 0.65;
    }
  `;

  static properties = {
    label: { type: String },
    items: { type: Array },
  };

  constructor() {
    super();
    this.label = '';
    this.items = [];
  }

  _onSelect(e) {
    const action = e.detail.item.value;
    const label  = e.detail.item.textContent.trim();
    this.dispatchEvent(new CustomEvent('ll-menu-select', {
      bubbles:  true,
      composed: true,
      detail:   { action, label },
    }));
  }

  render() {
    return html`
      <sl-dropdown @sl-select=${this._onSelect}>
        <button slot="trigger" class="trigger-btn" part="trigger">
          ${this.label}<span class="caret">▾</span>
        </button>
        <sl-menu>
          ${this.items.map(item =>
            item.type === 'divider'
              ? html`<sl-divider></sl-divider>`
              : html`
                <sl-menu-item
                  value=${item.action ?? ''}
                  ?disabled=${item.disabled ?? false}
                >${item.label}</sl-menu-item>
              `
          )}
        </sl-menu>
      </sl-dropdown>
    `;
  }
}

customElements.define('llama-dropdown', LlamaDropdown);
