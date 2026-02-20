// A minimal fractional indexing implementation (based on the algorithm by David Greenspan)
const DIGITS = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';

function digitToInt(d: string): number {
  return DIGITS.indexOf(d);
}

function intToDigit(i: number): string {
  return DIGITS[i];
}

function midpoint(a: string, b: string): string {
  let res = '';
  let i = 0;
  while (i < a.length && i < b.length && a[i] === b[i]) {
    res += a[i];
    i++;
  }
  if (i < a.length && i < b.length) {
    const aCode = digitToInt(a[i]);
    const bCode = digitToInt(b[i]);
    const mid = Math.floor((aCode + bCode) / 2);
    if (mid === aCode) {
      res += a[i];
      i++;
      while (i < a.length) {
        res += a[i];
        i++;
      }
      return res;
    } else {
      return res + intToDigit(mid);
    }
  } else if (i < a.length) {
    res += a[i];
    i++;
    while (i < a.length) {
      res += a[i];
      i++;
    }
    return res;
  } else {
    return res;
  }
}

export function generateKeyBetween(prev: string | null, next: string | null): string {
  if (prev === null && next === null) {
    return 'a0';
  }
  if (prev === null) {
    // Insert before next
    let i = 0;
    while (next![i] === 'a') i++;
    const nextChar = next![i];
    return next!.slice(0, i) + 'a' + intToDigit(digitToInt(nextChar) - 1);
  }
  if (next === null) {
    // Insert after prev
    let i = 0;
    while (prev[i] === 'z') i++;
    const prevChar = prev[i];
    return prev.slice(0, i) + 'z' + intToDigit(digitToInt(prevChar) + 1);
  }
  return midpoint(prev, next);
}