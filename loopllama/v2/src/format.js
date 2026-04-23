// format.js -- shared formatting utilities.

// Format seconds as m:ss (rounds to nearest second). Returns '' for null/NaN.
// Use in edit modals where the value populates a text field.
export function fmtTime(secs) {
  if (secs == null || isNaN(secs)) return '';
  const r = Math.round(secs);
  return `${Math.floor(r / 60)}:${String(r % 60).padStart(2, '0')}`;
}

// Format seconds as m:ss (floors to nearest second). Returns '?' for null/NaN.
// Use in pickers and status messages where a visible fallback is preferred.
export function fmtTimePlain(secs) {
  if (secs == null || isNaN(secs)) return '?';
  const s = Math.floor(secs);
  return `${Math.floor(s / 60)}:${String(s % 60).padStart(2, '0')}`;
}
