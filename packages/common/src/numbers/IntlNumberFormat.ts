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

export class IntlNumberFormat {
  value: number | bigint;
  formatOptions?: Intl.NumberFormatOptions;
  locale?: Intl.LocalesArgument;
  formatter: Intl.NumberFormat;

  constructor(props: {
    value: number | bigint;
    format?: Intl.NumberFormatOptions;
    locale?: Intl.LocalesArgument;
  }) {
    this.value = props.value;
    this.formatOptions = props.format;
    this.locale = props.locale;

    this.formatter = new Intl.NumberFormat(this.locale, this.formatOptions);
  }

  /**
   * Returns the accessible formatted string (prefix/suffix included only when strings).
   *  we don't output subscript notation here since subscript notation is bad for accessibility announcements.
   */
  format({ prefix = '', suffix = '' }: { prefix?: string; suffix?: string } = {}): string {
    const numberValue = Number(this.value);
    const formattedCore = this.formatter.format(numberValue);
    const withPrefixSuffix = prefix + formattedCore + suffix;
    return withPrefixSuffix;
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
        'Intl.NumberFormat.prototype.formatToParts is undefined, please ensure Intl is polyfilled or always provide formattedValue.',
      );
    }

    const numberValue = Number(this.value);
    const parts: Array<Intl.NumberFormatPart> = this.formatter.formatToParts(numberValue);

    const pre: KeyedNumberPart[] = [];
    const integerUnkeyed: NumberPart[] = [];
    const fractionUnkeyed: NumberPart[] = [];
    const post: KeyedNumberPart[] = [];

    const counts: Partial<Record<string, number>> = {};
    const generateKey = (type: string) => `${type}:${(counts[type] = (counts[type] ?? -1) + 1)}`;

    let seenNumber = false;
    for (const part of parts) {
      const { type } = part;

      if (type === 'integer') {
        seenNumber = true;
        integerUnkeyed.push(...splitDigitsIntoParts(part.value, type));
      } else if (type === 'fraction') {
        seenNumber = true;
        if (enableSubscriptNotation) {
          fractionUnkeyed.push(...buildFractionPartsWithSubscript(part.value));
        } else {
          fractionUnkeyed.push(...splitDigitsIntoParts(part.value, type));
        }
      } else if (type === 'group') {
        seenNumber = true;
        integerUnkeyed.push({ type, value: part.value });
      } else if (type === 'decimal') {
        seenNumber = true;
        fractionUnkeyed.push({
          type,
          value: part.value,
        });
      } else {
        (seenNumber ? post : pre).push({
          type,
          value: part.value,
          key: generateKey(type),
        });
      }
    }

    const integer = keyParts(integerUnkeyed, generateKey, 'rtl');
    const fraction = keyParts(fractionUnkeyed, generateKey, 'ltr');

    return { pre, integer, fraction, post };
  }
}
