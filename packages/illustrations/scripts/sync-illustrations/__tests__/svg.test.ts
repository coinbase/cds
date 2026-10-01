import fs from 'node:fs';
import path from 'node:path';

import { replacePaletteColors, toCssVariableSvg, toDarkSvg } from '../artifacts/paletteColors';
import { hashSvg } from '../hashSvg';
import type { ColorPalette } from '../illustration';
import { getSvgSize, normalizeHexColor, optimizeSvg } from '../optimizeSvg';

const fixture = (name: string) =>
  fs.readFileSync(path.join(__dirname, '__fixtures__', name), 'utf-8').trimEnd();

/** The palette recorded in manifest.json at the time the expected fixtures were generated. */
const palette: ColorPalette = [
  { name: 'accent-1', light: '#FFD200', dark: '#ECD069' },
  { name: 'accent-2', light: '#5DE2F8', dark: '#45D9F5' },
  { name: 'black', light: '#0A0B0D', dark: '#0A0B0D' },
  { name: 'gray', light: '#CED2DB', dark: '#464B55' },
  { name: 'gray-3', light: '#CED2DC', dark: '#FFFFFF' },
  { name: 'invert', light: '#0A0B0E', dark: '#FFFFFF' },
  { name: 'positive', light: '#3CC28A', dark: '#44C28D' },
  { name: 'primary', light: '#0052FF', dark: '#578BFA' },
  { name: 'white', light: '#FFFFFF', dark: '#FFFFFF' },
];

describe('optimizeSvg', () => {
  it('produces the exact light SVG previous syncs published', () => {
    expect(optimizeSvg(fixture('figma-export-spotIcon-2fa.svg'))).toBe(
      fixture('expected-spotIcon-2fa-1-light.svg'),
    );
    expect(optimizeSvg(fixture('figma-export-heroSquare-leverage.svg'))).toBe(
      fixture('expected-heroSquare-leverage-4-light.svg'),
    );
  });

  it('handles gradients: url() fills pass through, named stop colors become hex and get themed', () => {
    // usdj is the first illustration with gradient fills; its raw export uses `white` as a
    // fill and stop-color and references gradients with url(#paint0_linear_…).
    const raw = fixture('figma-export-heroSquare-usdj.svg');
    expect(raw).toContain('stop-color="white"');
    expect(raw).toContain('fill="url(#paint0_linear_31587_43)"');

    const light = optimizeSvg(raw);
    expect(light).toBe(fixture('expected-heroSquare-usdj-0-light.svg'));
    expect(light).toContain('fill="url(#b)"');
    expect(light).toContain('stop-color="#FFFFFF"');
    expect(light).not.toMatch(/"white"/);

    const dark = toDarkSvg(light, palette);
    expect(dark).toBe(fixture('expected-heroSquare-usdj-0-dark.svg'));
    // Gradient stops outside the palette are left alone; palette stops are themed like any fill.
    expect(dark).toContain('stop-color="#8585AD"');
    expect(toCssVariableSvg(light, palette, 'illustration')).toContain(
      'stop-color="var(--illustration-white)"',
    );
  });

  it('normalizes every color to uppercase 6-digit hex and leaves non-colors alone', () => {
    expect(normalizeHexColor('#abc')).toBe('#AABBCC');
    expect(normalizeHexColor('#a1b2c3')).toBe('#A1B2C3');
    expect(normalizeHexColor('none')).toBe('none');
    expect(normalizeHexColor('url(#gradient)')).toBe('url(#gradient)');

    const gradient = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 8 8"><defs><linearGradient id="g"><stop stop-color="white"/><stop offset="1" stop-color="#abc"/></linearGradient></defs><rect width="8" height="8" fill="url(#g)"/></svg>`;
    const optimized = optimizeSvg(gradient);
    expect(optimized).toContain('fill="url(#a)"');
    expect(optimized).toContain('stop-color="#FFFFFF"');
    expect(optimized).toContain('stop-color="#AABBCC"');
  });

  it('reads the intrinsic size from the viewBox', () => {
    expect(getSvgSize(fixture('expected-spotIcon-2fa-1-light.svg'))).toEqual({
      width: 32,
      height: 32,
    });
    expect(() => getSvgSize('<svg/>')).toThrow('viewBox');
  });
});

describe('palette color replacement', () => {
  const light = fixture('expected-spotIcon-2fa-1-light.svg');

  it('swaps palette colors for their dark counterparts', () => {
    expect(toDarkSvg(light, palette)).toBe(fixture('expected-spotIcon-2fa-1-dark.svg'));
  });

  it('swaps palette colors for CSS variables', () => {
    const themeable = toCssVariableSvg(light, palette, 'illustration');
    expect(fixture('expected-spotIcon-2fa-1-themeable.cjs.js')).toContain(themeable);
    expect(themeable).toContain('fill="var(--illustration-primary)"');
    expect(themeable).not.toMatch(/#0052FF/);
  });

  it('lets a sink choose any representation for a palette color', () => {
    expect(
      replacePaletteColors('<svg fill="#0052FF"/>', palette, ({ name }) => `@color/${name}`),
    ).toBe('<svg fill="@color/primary"/>');
  });

  it('leaves colors outside the palette untouched', () => {
    const svg = '<svg><path fill="#123456"/><path fill="#0052FF"/></svg>';
    expect(toDarkSvg(svg, palette)).toBe('<svg><path fill="#123456"/><path fill="#578BFA"/></svg>');
  });

  it('does not re-replace a color produced by another substitution', () => {
    const chained: ColorPalette = [
      { name: 'a', light: '#111111', dark: '#222222' },
      { name: 'b', light: '#222222', dark: '#333333' },
    ];
    expect(toDarkSvg('<svg fill="#111111"/>', chained)).toBe('<svg fill="#222222"/>');
  });

  it('does not touch 8-digit hex colors that merely start with a palette color', () => {
    expect(toDarkSvg('<svg fill="#0052FF80"/>', palette)).toBe('<svg fill="#0052FF80"/>');
  });
});

describe('hashSvg', () => {
  it('reproduces the hashes recorded in manifest.json by previous syncs', () => {
    expect(hashSvg('4390:695', fixture('expected-spotIcon-2fa-1-light.svg'))).toBe(
      '+HFlT7G2zpSP0fCciMg4XqPz/Dokzg+/VBntWB6dnwY=',
    );
    expect(hashSvg('2:33979', fixture('expected-heroSquare-leverage-4-light.svg'))).toBe(
      'gPwBO7SxTvDffKHFIemCqEqQ+q1QX2Ux4M95p9R8zvE=',
    );
  });
});
