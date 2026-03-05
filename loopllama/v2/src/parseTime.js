// parseTime.js -- parse a user-supplied time string to seconds.
//
// Accepts:
//   - Plain non-negative number:      "90", "1.5"
//   - mm:ss or mm/ss:                 "1:30", "1/30"
//   - hh:mm:ss or hh/mm/ss:           "1:05:30", "1/05/30"
//
// Returns a non-negative Number, or null if the input is invalid.
// Rejects partial matches like "7xy" -- every segment must be pure
// digits with an optional decimal, and nothing else.

const NUMERIC = /^\d+(\.\d+)?$/;

export function parseTime(str) {
  str = (str || '').trim().replace(/\//g, ':');
  if (!str) return null;
  const parts = str.split(':');
  if (parts.length === 2 || parts.length === 3) {
    if (parts.some(p => !NUMERIC.test(p))) return null;
    const nums = parts.map(Number);
    return parts.length === 2
      ? nums[0] * 60 + nums[1]
      : nums[0] * 3600 + nums[1] * 60 + nums[2];
  }
  if (!NUMERIC.test(str)) return null;
  return Number(str);
}
