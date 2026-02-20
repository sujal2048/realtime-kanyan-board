// Generate a rank between two strings (lexicographic midpoint)
// Inspired by https://github.com/rocicorp/fractional-indexing
const DIGITS = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';

export function getRankBetween(prev: string | null, next: string | null): string {
  if (prev === null && next === null) return 'a0';
  if (prev === null) return half('', next!);
  if (next === null) return half(prev, '');
  return half(prev, next);
}

function half(prev: string, next: string): string {
  let p = 0, n = 0, res = '';
  while (p < prev.length || n < next.length) {
    const pChar = p < prev.length ? prev.charCodeAt(p) : 0;
    const nChar = n < next.length ? next.charCodeAt(n) : 0;
    if (pChar === nChar) {
      res += prev[p];
      p++; n++;
      continue;
    }
    const mid = Math.floor((pChar + nChar) / 2);
    res += String.fromCharCode(mid);
    // If the midpoint equals the prev char, we need to continue
    if (mid === pChar) {
      p++;
      // prev has more chars? then we need to extend
    } else {
      break;
    }
  }
  return res;
}