// format.js -- shared formatting utilities.

// Format seconds as m:ss (rounds to nearest second). Returns '' for null/NaN.
// Pass tenths=true for m:ss.t format (floors to 0.1s) when precision matters.
// Use in edit modals where the value populates a text field.
export function fmtTime(secs, tenths = false) {
  if (secs == null || isNaN(secs)) return '';
  if (tenths) {
    const f = Math.floor(secs * 10) / 10;
    const m = Math.floor(f / 60);
    const s = (f % 60).toFixed(1);
    return `${m}:${s.padStart(4, '0')}`;
  }
  const r = Math.round(secs);
  return `${Math.floor(r / 60)}:${String(r % 60).padStart(2, '0')}`;
}

// Format seconds as m:ss (rounds to nearest second). Returns '?' for null/NaN.
// Use in pickers and status messages where a visible fallback is preferred.
export function fmtTimePlain(secs) {
  if (secs == null || isNaN(secs)) return '?';
  const r = Math.round(secs);
  return `${Math.floor(r / 60)}:${String(r % 60).padStart(2, '0')}`;
}
