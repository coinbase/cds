import { buildFractionPartsWithSubscript, toSubscriptNumber } from '../subscript';

describe('fraction subscript helpers', () => {
  it.each([
    ['00009', ['fraction:0', 'subscript:₄', 'fraction:9']],
    [
      '00001200',
      ['fraction:0', 'subscript:₄', 'fraction:1', 'fraction:2', 'fraction:0', 'fraction:0'],
    ],
    ['1', ['fraction:1']],
  ])('buildFractionPartsWithSubscript %s', (input, expected) => {
    const parts = buildFractionPartsWithSubscript(input).map((p: any) => `${p.type}:${p.value}`);
    expect(parts).toEqual(expected);
  });

  it.each<[string, string[]]>([
    ['', []],
    ['1', ['fraction:1']],
    ['0', ['fraction:0']],
    ['0000', ['fraction:0', 'subscript:₄']],
    ['09', ['fraction:0', 'fraction:9']],
    ['12003', ['fraction:1', 'fraction:2', 'fraction:0', 'fraction:0', 'fraction:3']],
    ['12345', ['fraction:1', 'fraction:2', 'fraction:3', 'fraction:4', 'fraction:5']],
    ['000000000000', ['fraction:0', 'subscript:₁₂']],
  ])('buildFractionPartsWithSubscript edge %s', (input, expected) => {
    const parts = buildFractionPartsWithSubscript(input).map((p: any) => `${p.type}:${p.value}`);
    expect(parts).toEqual(expected);
  });

  it('toSubscriptNumber works for multi-digits', () => {
    expect(toSubscriptNumber(12)).toBe('₁₂');
    expect(toSubscriptNumber(25)).toBe('₂₅');
  });

  it('toSubscriptNumber handles edge cases', () => {
    expect(toSubscriptNumber(0)).toBe('₀');
    expect(toSubscriptNumber(-12)).toBe('-₁₂');
    expect(toSubscriptNumber(1234567890)).toBe('₁₂₃₄₅₆₇₈₉₀');
    expect(toSubscriptNumber(3.14)).toBe('₃.₁₄');
  });
});
