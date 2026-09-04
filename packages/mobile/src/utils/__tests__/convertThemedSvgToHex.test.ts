import type { ThemeVars } from '@coinbase/cds-common/core/theme';

import { convertThemedSvgToHex } from '../convertThemedSvgToHex';

const palette: { [key in ThemeVars.IllustrationColor]: string } = {
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
  accent2: 'rgba(93, 226, 248, 0.5)',
  accent3: 'rgb(237, 112, 47)',
  accent4: 'rgb(115, 162, 255)',
  invert: 'rgb(10, 11, 14)',
  invert2: 'rgb(255, 255, 254)',
};

describe('convertThemedSvgToHex', () => {
  it('replaces a single var(--illustration-*) token with its hex value', () => {
    const svg = '<path fill="var(--illustration-primary)"/>';
    expect(convertThemedSvgToHex(svg, palette)).toBe('<path fill="#0052ff"/>');
  });

  it('replaces multiple different tokens in one pass', () => {
    const svg =
      '<path fill="var(--illustration-primary)"/><path fill="var(--illustration-black)"/>';
    expect(convertThemedSvgToHex(svg, palette)).toBe(
      '<path fill="#0052ff"/><path fill="#0a0b0d"/>',
    );
  });

  it('normalises hyphenated tokens: accent-1 maps to accent1, gray-4 maps to gray4', () => {
    const svg =
      '<path fill="var(--illustration-accent-1)"/><path fill="var(--illustration-gray-4)"/>';
    expect(convertThemedSvgToHex(svg, palette)).toBe(
      '<path fill="#ffd200"/><path fill="#c8cbd2"/>',
    );
  });

  it('converts rgba() to hex (alpha channel is dropped by colorToHex)', () => {
    // All real illustration palette values use rgb(), not rgba().
    // colorToHex drops the alpha channel and returns a 6-digit hex.
    const svg = '<path fill="var(--illustration-accent-2)"/>';
    const result = convertThemedSvgToHex(svg, palette);
    expect(result).toMatch(/^<path fill="#[0-9a-f]{6}"\/>/);
    expect(result).toBe('<path fill="#5de2f8"/>');
  });

  it('leaves the var() intact when the token is not in the palette', () => {
    const svg = '<path fill="var(--illustration-unknown)"/>';
    expect(convertThemedSvgToHex(svg, palette)).toBe('<path fill="var(--illustration-unknown)"/>');
  });

  it('is case-insensitive for the var() pattern', () => {
    const svg = '<path fill="VAR(--illustration-primary)"/>';
    expect(convertThemedSvgToHex(svg, palette)).toBe('<path fill="#0052ff"/>');
  });

  it('does not modify SVG without any illustration vars', () => {
    const svg = '<path fill="#ff0000"/>';
    expect(convertThemedSvgToHex(svg, palette)).toBe(svg);
  });

  it('replaces all occurrences of the same token', () => {
    const svg =
      '<path fill="var(--illustration-primary)"/><path stroke="var(--illustration-primary)"/>';
    expect(convertThemedSvgToHex(svg, palette)).toBe(
      '<path fill="#0052ff"/><path stroke="#0052ff"/>',
    );
  });
});
