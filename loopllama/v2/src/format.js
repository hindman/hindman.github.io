// format.js -- shared formatting utilities.

// Format seconds as m:ss (rounds to nearest second).
export function fmtTime(secs) {
  if (secs == null || isNaN(secs)) return '';
  const r = Math.round(secs);
  return `${Math.floor(r / 60)}:${String(r % 60).padStart(2, '0')}`;
}
