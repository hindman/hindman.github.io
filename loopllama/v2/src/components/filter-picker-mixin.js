// filter-picker-mixin.js -- shared filter + keyboard navigation for picker modals.
//
// Provides: _filter, _selIdx reactive state, _onInitialFocus, _onFilterInput,
// _onFilterKeyDown, _scrollSelectedIntoView (parameterized via _listClass /
// _rowClass getters), show(mode), hide.
//
// Subclasses must implement:
//   _filtered()       -- returns the filtered item array
//   _select(item)     -- handles the selected item
//   get _listClass()  -- CSS class of the scrollable list container
//   get _rowClass()   -- CSS class of a row item

export const FilterPickerMixin = (superClass) => class extends superClass {
  static properties = {
    _filter: { state: true },
    _selIdx: { state: true },
  };

  constructor(...args) {
    super(...args);
    this._filter = '';
    this._selIdx = 0;
  }

  get _listClass() { return 'list'; }
  get _rowClass()  { return 'row'; }

  show(mode) {
    if (mode) this.mode = mode;
    this._filter = '';
    this._selIdx = 0;
    this.renderRoot.querySelector('llama-modal')?.show();
  }

  hide() {
    this.renderRoot.querySelector('llama-modal')?.hide();
  }

  _onInitialFocus() {
    this.renderRoot.querySelector('sl-input')?.focus();
  }

  _onFilterInput(e) {
    this._filter = e.target.value;
    this._selIdx = 0;
  }

  _onFilterKeyDown(e) {
    const filtered = this._filtered();
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      this._selIdx = Math.min(this._selIdx + 1, filtered.length - 1);
      this._scrollSelectedIntoView();
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      this._selIdx = Math.max(this._selIdx - 1, 0);
      this._scrollSelectedIntoView();
    } else if (e.key === 'Enter') {
      const target = filtered[this._selIdx] ?? filtered[0];
      if (target) this._select(target);
    }
  }

  _scrollSelectedIntoView() {
    this.updateComplete.then(() => {
      const list = this.renderRoot.querySelector(`.${this._listClass}`);
      const row  = list?.querySelector(`.${this._rowClass}.selected`);
      row?.scrollIntoView({ block: 'nearest' });
    });
  }
};
