import { createThemeCssVars } from '../createThemeCssVars';

const mockIllustrationColor = {
  primary: 'rgb(0, 82, 255)',
  black: 'rgb(10, 11, 13)',
  white: 'rgb(255, 255, 255)',
  gray: 'rgb(206, 210, 219)',
  gray2: 'rgb(10, 11, 15)',
  gray3: 'rgb(206, 210, 220)',
  gray4: 'rgb(200, 203, 210)',
  positive: 'rgb(60, 194, 138)',
  negative: 'rgb(225, 57, 71)',
  accent1: 'rgb(255, 210, 0)',
  accent2: 'rgb(93, 226, 248)',
  accent3: 'rgb(237, 112, 47)',
  accent4: 'rgb(115, 162, 255)',
  invert: 'rgb(10, 11, 14)',
  invert2: 'rgb(255, 255, 254)',
} as const;

describe('createThemeCssVars — illustrationColor', () => {
  it('emits --illustration-primary from illustrationColor.primary', () => {
    const result = createThemeCssVars({ illustrationColor: mockIllustrationColor });
    expect(result['--illustration-primary']).toBe('rgb(0, 82, 255)');
  });

  it('converts camelCase numeric suffix to kebab: accent1 → --illustration-accent-1', () => {
    const result = createThemeCssVars({ illustrationColor: mockIllustrationColor });
    expect(result['--illustration-accent-1']).toBe('rgb(255, 210, 0)');
    expect(result['--illustration-accent-2']).toBe('rgb(93, 226, 248)');
    expect(result['--illustration-accent-3']).toBe('rgb(237, 112, 47)');
    expect(result['--illustration-accent-4']).toBe('rgb(115, 162, 255)');
  });

  it('converts gray2/gray3/gray4 to --illustration-gray-2 / -gray-3 / -gray-4', () => {
    const result = createThemeCssVars({ illustrationColor: mockIllustrationColor });
    expect(result['--illustration-gray-2']).toBe('rgb(10, 11, 15)');
    expect(result['--illustration-gray-3']).toBe('rgb(206, 210, 220)');
    expect(result['--illustration-gray-4']).toBe('rgb(200, 203, 210)');
  });

  it('emits all 15 illustration tokens', () => {
    const result = createThemeCssVars({ illustrationColor: mockIllustrationColor });
    const illustrationKeys = Object.keys(result).filter((k) => k.startsWith('--illustration-'));
    expect(illustrationKeys).toHaveLength(15);
  });

  it('does not emit --illustration-* vars when illustrationColor is absent', () => {
    const result = createThemeCssVars({});
    const illustrationKeys = Object.keys(result).filter((k) => k.startsWith('--illustration-'));
    expect(illustrationKeys).toHaveLength(0);
  });

  it('does not emit --lightIllustrationColor-* or --darkIllustrationColor-* vars', () => {
    const result = createThemeCssVars({
      lightIllustrationColor: mockIllustrationColor,
      darkIllustrationColor: mockIllustrationColor,
    });
    const unwantedKeys = Object.keys(result).filter(
      (k) => k.startsWith('--lightIllustrationColor') || k.startsWith('--darkIllustrationColor'),
    );
    expect(unwantedKeys).toHaveLength(0);
  });
});
