// modal-styles.js -- shared styles and field renderer for edit modals.

import { html, css } from 'lit';

export const modalFieldStyles = css`
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

export function renderField(label, field, value, placeholder, onInput, onKeyDown) {
  return html`
    <div class="field-row">
      <span class="field-label">${label}</span>
      <sl-input autocomplete="off"
        data-field=${field}
        placeholder=${placeholder}
        .value=${value}
        @sl-input=${onInput}
        @keydown=${onKeyDown}
      ></sl-input>
    </div>
  `;
}
