import { buildFractionPartsWithSubscript } from './subscript';

export type NumberPart = { type: string; value: number | string };
export type KeyedNumberPart = { key: string } & NumberPart;

export type IntlNumberParts = {
  pre: KeyedNumberPart[];
  integer: KeyedNumberPart[];
  fraction: KeyedNumberPart[];
  post: KeyedNumberPart[];
  formatted: string;
};

const splitDigitsIntoParts = (digitsStr: string, type: 'integer' | 'fraction'): NumberPart[] => {
  return digitsStr.split('').map((d) => ({ type, value: parseInt(d) }));
};

const keyParts = (
  parts: NumberPart[],
  generateKey: (type: string) => string,
  direction: 'rtl' | 'ltr',
): KeyedNumberPart[] => {
  const seq = direction === 'rtl' ? [...parts].reverse() : parts;
  const keyed = seq.map((p) => ({ ...p, key: generateKey(p.type) }));
  return direction === 'rtl' ? keyed.reverse() : keyed;
};

/**
 * Lightweight wrapper around the built-in Intl.NumberFormat that standardizes
 * number formatting across CDS and provides a structure optimized for animated
 * rendering in RollingNumber components.
 *
 * Responsibilities:
 * - Create and cache an Intl.NumberFormat instance for given value, options, and locale
 * - Expose a simple `format()` that returns the fully formatted string
 * - Expose `formatToParts()` that returns logically grouped and keyed parts
 *   (pre/integer/fraction/post) so UI layers can animate digits and symbols
 * - Optionally supports subscript notation for leading fractional zeros
 *
 * Notes:
 * - Keys produced by `formatToParts()` are stable and direction-aware so that
 *   animations (e.g., per-digit transitions) can be deterministic
 * - If the environment lacks `Intl.NumberFormat.prototype.formatToParts`, the
 *   method will throw and callers should polyfill it.
 */
export class IntlNumberFormat {
  value: number;
  formatOptions?: Intl.NumberFormatOptions;
  locale?: Intl.LocalesArgument;
  formatter: Intl.NumberFormat;

  constructor(props: {
    value: number;
    format?: Intl.NumberFormatOptions;
    locale?: Intl.LocalesArgument;
  }) {
    this.value = props.value;
    this.formatOptions = props.format;
    this.locale = props.locale;

    this.formatter = new Intl.NumberFormat(this.locale, this.formatOptions);
  }

  /**
   * Returns the formatted string.
   */
  format(): string {
    return this.formatter.format(this.value);
  }

  /**
   * Returns the number parts for RollingNumber with groupings and keys for animations
   * Examples
   *
   * Example 1 — basic currency
   * Input:
   * ```json
   * {
   *   "value": 98345.67,
   *   "format": {
   *     "style": "currency",
   *     "currency": "USD",
   *     "minimumFractionDigits": 2,
   *     "maximumFractionDigits": 5
   *   },
   *   "locale": "en-US",
   *   "prefix": "+",
   *   "suffix": " BTC"
   * }
   * ```
   *
   * Output:
   * ```json
   * {
   *   "pre": [
   *     { "type": "currency", "value": "$", "key": "currency:0" }
   *   ],
   *   "integer": [
   *     { "type": "integer", "value": 9, "key": "integer:4" },
   *     { "type": "integer", "value": 8, "key": "integer:3" },
   *     { "type": "group",   "value": ",", "key": "group:0" },
   *     { "type": "integer", "value": 3, "key": "integer:2" },
   *     { "type": "integer", "value": 4, "key": "integer:1" },
   *     { "type": "integer", "value": 5, "key": "integer:0" }
   *   ],
   *   "fraction": [
   *     { "type": "decimal",   "value": ".", "key": "decimal:0" },
   *     { "type": "fraction",  "value": 6,   "key": "fraction:0" },
   *     { "type": "fraction",  "value": 7,   "key": "fraction:1" }
   *   ],
   *   "post": [],
   * }
   * ```
   *
   * Example 2 — subscript notation enabled
   * Input:
   * ```json
   * {
   *   "value": 1e-10,
   *   "format": {
   *     "minimumFractionDigits": 2,
   *     "maximumFractionDigits": 25
   *   },
   *   "locale": "en-US",
   *   "enableSubscriptNotation": true
   * }
   * ```
   *
   * Output:
   * ```json
   * {
   *   "pre": [],
   *   "integer": [
   *     { "type": "integer", "value": 0, "key": "integer:0" }
   *   ],
   *   "fraction": [
   *     { "type": "decimal",   "value": ".", "key": "decimal:0" },
   *     { "type": "fraction",  "value": 0,   "key": "fraction:0" },
   *     { "type": "subscript", "value": "₉", "key": "subscript:0" },
   *     { "type": "fraction",  "value": 1,   "key": "fraction:1" }
   *   ],
   *   "post": [],
   * }
   * ```
   */
  formatToParts({ enableSubscriptNotation }: { enableSubscriptNotation?: boolean } = {}): {
    pre: KeyedNumberPart[];
    integer: KeyedNumberPart[];
    fraction: KeyedNumberPart[];
    post: KeyedNumberPart[];
  } {
    if (!Intl.NumberFormat.prototype.formatToParts) {
      throw new Error(
        'Intl.NumberFormat.prototype.formatToParts is undefined, please ensure Intl.NumberFormat is polyfilled.',
      );
    }

    const parts: Array<Intl.NumberFormatPart> = this.formatter.formatToParts(this.value);

    const pre: KeyedNumberPart[] = [];
    const integerUnkeyed: NumberPart[] = [];
    const fractionUnkeyed: NumberPart[] = [];
    const post: KeyedNumberPart[] = [];

    const counts: Partial<Record<string, number>> = {};
    const generateKey = (type: string) => `${type}:${(counts[type] = (counts[type] ?? -1) + 1)}`;

    let didParseNumberPart = false;
    for (const part of parts) {
      const { type, value } = part;

      switch (type) {
        case 'integer': {
          didParseNumberPart = true;
          integerUnkeyed.push(...splitDigitsIntoParts(value, type));
          break;
        }
        case 'fraction': {
          didParseNumberPart = true;
          const fractionParts = enableSubscriptNotation
            ? buildFractionPartsWithSubscript(value)
            : splitDigitsIntoParts(value, type);
          fractionUnkeyed.push(...fractionParts);
          break;
        }
        case 'group': {
          didParseNumberPart = true;
          integerUnkeyed.push({ type, value });
          break;
        }
        case 'decimal': {
          didParseNumberPart = true;
          fractionUnkeyed.push({ type, value });
          break;
        }
        default: {
          (didParseNumberPart ? post : pre).push({
            type,
            value,
            key: generateKey(type),
          });
          break;
        }
      }
    }

    const integer = keyParts(integerUnkeyed, generateKey, 'rtl');
    const fraction = keyParts(fractionUnkeyed, generateKey, 'ltr');

    return { pre, integer, fraction, post };
  }
}
