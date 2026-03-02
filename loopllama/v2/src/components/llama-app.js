import { LitElement, html, css } from 'lit';

class LlamaApp extends LitElement {
  static styles = css`
    :host {
      display: block;
      font-family: sans-serif;
      padding: 1rem;
    }
    h1 {
      font-size: 1.5rem;
    }
  `;

  render() {
    return html`
      <h1>LoopLlama v2</h1>
      <p>Scaffolding OK — Lit component rendering.</p>
    `;
  }
}

customElements.define('llama-app', LlamaApp);
