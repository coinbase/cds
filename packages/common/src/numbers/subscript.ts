import type { NumberPart } from './IntlNumberFormat';

const numberSubscriptMap: Record<string, string> = {
  '0': '₀',
  '1': '₁',
  '2': '₂',
  '3': '₃',
  '4': '₄',
  '5': '₅',
  '6': '₆',
  '7': '₇',
  '8': '₈',
  '9': '₉',
};

export const toSubscriptNumber = (n: number) =>
  String(n)
    .split('')
    .map((d) => numberSubscriptMap[d] ?? d)
    .join('');

/**
 * Builds parts for the fractional digits with subscript applied to leading zeros.
 */
export function buildFractionPartsWithSubscript(fractionDigits: string): NumberPart[] {
  const match = /^(0+)(.*)$/.exec(fractionDigits);
  if (!match) {
    return fractionDigits.split('').map((d) => ({ type: 'fraction', value: parseInt(d, 10) }));
  }
  const [, matchedZeros, restOfDigits] = match;
  // no need to add subscript for single zero or no zeros, 0.0 -> 0.0, 0.912 -> 0.912
  if (matchedZeros.length <= 1) {
    return fractionDigits.split('').map((d) => ({ type: 'fraction', value: parseInt(d, 10) }));
  }
  const parts: NumberPart[] = [];
  parts.push({ type: 'fraction', value: 0 });
  parts.push({ type: 'subscript', value: toSubscriptNumber(matchedZeros.length) });

  for (let i = 0; i < restOfDigits.length; i++) {
    parts.push({ type: 'fraction', value: parseInt(restOfDigits[i], 10) });
  }
  return parts;
}
