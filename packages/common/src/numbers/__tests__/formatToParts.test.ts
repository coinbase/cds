import { IntlNumberFormat } from '../IntlNumberFormat';

describe('formatToParts', () => {
  const locale = 'en-US';

  it('builds subscript fraction parts for small decimals (0.00009)', () => {
    const formatter = new IntlNumberFormat({
      value: 0.00009,
      locale,
      format: { maximumFractionDigits: 8 },
    });
    const { pre, integer, fraction, post } = formatter.formatToParts({
      enableSubscriptNotation: true,
    });
    const formatted = formatter.format();

    expect(pre.length).toBeGreaterThanOrEqual(0);
    expect(post.length).toBeGreaterThanOrEqual(0);

    expect(integer.map((p) => `${p.type}:${p.value}`)).toEqual(['integer:0']);

    expect(fraction.map((p) => `${p.type}:${p.value}`)).toEqual([
      'decimal:.',
      'fraction:0',
      'subscript:₄',
      'fraction:9',
    ]);

    expect(formatted).toBe('0.00009');
  });

  it('keeps trailing zeros with subscript when minimumFractionDigits forces them (0.00001200)', () => {
    const formatter = new IntlNumberFormat({
      value: 0.000012,
      locale,
      format: { minimumFractionDigits: 8, maximumFractionDigits: 8 },
    });
    const { fraction } = formatter.formatToParts({ enableSubscriptNotation: true });
    const formatted = formatter.format();

    expect(fraction.map((p) => `${p.type}:${p.value}`)).toEqual([
      'decimal:.',
      'fraction:0',
      'subscript:₄',
      'fraction:1',
      'fraction:2',
      'fraction:0',
      'fraction:0',
    ]);
    expect(formatted).toBe('0.00001200');
  });

  it('does not use subscript when disabled', () => {
    const formatter = new IntlNumberFormat({
      value: 0.00009,
      locale,
      format: { maximumFractionDigits: 8 },
    });
    const { fraction } = formatter.formatToParts({ enableSubscriptNotation: false });
    const formatted = formatter.format();

    expect(fraction.map((p) => `${p.type}:${p.value}`)).toEqual([
      'decimal:.',
      'fraction:0',
      'fraction:0',
      'fraction:0',
      'fraction:0',
      'fraction:9',
    ]);
    expect(formatted).toBe('0.00009');
  });

  it('works with currency formatting (USD, en-US)', () => {
    const formatter = new IntlNumberFormat({
      value: 0.00009,
      locale,
      format: { style: 'currency', currency: 'USD', maximumFractionDigits: 8 },
    });
    const { pre, fraction } = formatter.formatToParts({ enableSubscriptNotation: true });
    const formatted = formatter.format();

    const preStr = pre.map((p) => p.value).join('');
    expect(preStr).toContain('$');

    expect(fraction.map((p) => `${p.type}:${p.value}`)).toContain('subscript:₄');
    expect(formatted).toBe('$0.00009');
  });

  it('keys integer RTL and fraction LTR (no subscript)', () => {
    const formatter = new IntlNumberFormat({
      value: 123.45,
      locale,
      format: { maximumFractionDigits: 2 },
    });
    const { integer, fraction } = formatter.formatToParts({ enableSubscriptNotation: false });

    expect(integer.map((p) => p.value)).toEqual([1, 2, 3]);
    expect(integer.map((p) => p.key)).toEqual(['integer:2', 'integer:1', 'integer:0']);

    expect(fraction.map((p) => `${p.type}:${p.value}`)).toEqual([
      'decimal:.',
      'fraction:4',
      'fraction:5',
    ]);
    expect(fraction.map((p) => p.key)).toEqual(['decimal:0', 'fraction:0', 'fraction:1']);
  });

  it('keys subscript and fraction parts correctly when enabled', () => {
    const formatter = new IntlNumberFormat({
      value: 0.00009,
      locale,
      format: { maximumFractionDigits: 8 },
    });
    const { fraction } = formatter.formatToParts({ enableSubscriptNotation: true });

    expect(fraction.map((p) => `${p.type}:${p.value}`)).toEqual([
      'decimal:.',
      'fraction:0',
      'subscript:₄',
      'fraction:9',
    ]);
    expect(fraction.map((p) => p.key)).toEqual([
      'decimal:0',
      'fraction:0',
      'subscript:0',
      'fraction:1',
    ]);
  });

  it('handles zero without decimals', () => {
    const formatter = new IntlNumberFormat({
      value: 0,
      locale,
      format: { maximumFractionDigits: 0 },
    });
    const { integer, fraction, pre, post } = formatter.formatToParts({
      enableSubscriptNotation: true,
    });
    const formatted = formatter.format();
    expect(integer.map((p) => `${p.type}:${p.value}`)).toEqual(['integer:0']);
    expect(fraction.length).toBe(0);
    expect(pre.length + post.length).toBeGreaterThanOrEqual(0);
    expect(formatted).toBe('0');
  });

  it('handles negative values and places minus sign in pre', () => {
    const formatter = new IntlNumberFormat({
      value: -123.45,
      locale,
      format: { maximumFractionDigits: 2 },
    });
    const { pre, integer } = formatter.formatToParts({ enableSubscriptNotation: false });
    const formatted = formatter.format();
    expect(pre.some((p) => p.type === 'minusSign')).toBe(true);
    expect(integer.map((p) => p.value)).toEqual([1, 2, 3]);
    expect(formatted.startsWith('-')).toBe(true);
  });

  it('groups large integers and keys group parts', () => {
    const formatter = new IntlNumberFormat({
      value: 1234567,
      locale: 'en-US',
      format: { maximumFractionDigits: 0 },
    });
    const { integer } = formatter.formatToParts({ enableSubscriptNotation: false });
    const groups = integer.filter((p) => p.type === 'group');
    expect(groups.length).toBeGreaterThanOrEqual(2);
    expect(groups.map((g) => g.key)).toEqual(['group:1', 'group:0']);
    expect(integer.some((p) => p.type === 'integer' && p.value === 1)).toBe(true);
    expect(integer.some((p) => p.type === 'integer' && p.value === 7)).toBe(true);
  });

  it('uses post for currency symbol in a suffix-locale (de-DE)', () => {
    const formatter = new IntlNumberFormat({
      value: 0.00009,
      locale: 'de-DE',
      format: { style: 'currency', currency: 'USD', maximumFractionDigits: 5 },
    });
    const { pre, post } = formatter.formatToParts({ enableSubscriptNotation: true });
    const formatted = formatter.format();
    const preStr = pre.map((p) => p.value).join('');
    const postStr = post.map((p) => p.value).join('');
    expect(preStr.includes('$')).toBe(false);
    expect(postStr.includes('$')).toBe(true);
    expect(formatted.includes('$')).toBe(true);
  });

  it('no subscript if fraction does not start with zeros (0.1209)', () => {
    const formatter = new IntlNumberFormat({
      value: 0.1209,
      locale,
      format: { maximumFractionDigits: 4 },
    });
    const { fraction } = formatter.formatToParts({ enableSubscriptNotation: true });
    expect(fraction.map((p) => p.type)).not.toContain('subscript');
  });
});
