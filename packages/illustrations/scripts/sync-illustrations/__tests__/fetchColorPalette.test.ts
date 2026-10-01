import type {
  GetLocalVariablesResponse,
  GetPublishedVariablesResponse,
} from '@figma/rest-api-spec';

import { buildColorPalette, rgbaToHex } from '../source/fetchColorPalette';

import localFixture from './__fixtures__/getLocalVariables.json';
import publishedFixture from './__fixtures__/getPublishedVariables.json';

const local = localFixture as unknown as GetLocalVariablesResponse;
const published = publishedFixture as unknown as GetPublishedVariablesResponse;

describe('buildColorPalette', () => {
  const palette = buildColorPalette(local, published, 'illustration');

  it('resolves every published illustration variable to its light and dark hex values', () => {
    expect(palette).toEqual([
      { name: 'accent-1', light: '#FFD200', dark: '#ECD069' },
      { name: 'accent-2', light: '#5DE2F8', dark: '#45D9F5' },
      { name: 'accent-3', light: '#ED702F', dark: '#F07836' },
      { name: 'accent-4', light: '#73A2FF', dark: '#84AAFD' },
      { name: 'black', light: '#0A0B0D', dark: '#0A0B0D' },
      { name: 'gray', light: '#CED2DB', dark: '#464B55' },
      { name: 'gray-2', light: '#0A0B0F', dark: '#464B55' },
      { name: 'gray-3', light: '#CED2DC', dark: '#FFFFFF' },
      { name: 'gray-4', light: '#C8CBD2', dark: '#FFFFFF' },
      { name: 'invert', light: '#0A0B0E', dark: '#FFFFFF' },
      { name: 'invert-2', light: '#FFFFFE', dark: '#0A0B0D' },
      { name: 'negative', light: '#E13947', dark: '#F0616D' },
      { name: 'positive', light: '#3CC28A', dark: '#44C28D' },
      { name: 'primary', light: '#0052FF', dark: '#578BFA' },
      { name: 'white', light: '#FFFFFF', dark: '#FFFFFF' },
    ]);
  });

  it('follows variable aliases to the concrete color', () => {
    const primary = local.meta.variables['VariableID:1412:298'];
    expect(primary.valuesByMode['1223:0']).toEqual({
      type: 'VARIABLE_ALIAS',
      id: 'VariableID:1229:62',
    });
    expect(palette.find(({ name }) => name === 'primary')?.light).toBe('#0052FF');
  });

  it('ignores variables outside the prefix, including the remote "illo/" collection', () => {
    expect(Object.values(local.meta.variables).some(({ name }) => name.startsWith('illo/'))).toBe(
      true,
    );
    expect(palette.map(({ name }) => name)).not.toContain(expect.stringMatching(/^illo/));
  });

  it('ignores unpublished variables', () => {
    const unpublished = {
      ...published,
      meta: {
        ...published.meta,
        variables: Object.fromEntries(
          Object.entries(published.meta.variables).filter(([id]) => id !== 'VariableID:1412:298'),
        ),
      },
    };
    expect(
      buildColorPalette(local, unpublished, 'illustration').map(({ name }) => name),
    ).not.toContain('primary');
  });

  it('fails when a variable has no value for one of the modes', () => {
    const broken = JSON.parse(JSON.stringify(local)) as GetLocalVariablesResponse;
    delete broken.meta.variables['VariableID:1412:298'].valuesByMode['1223:1'];
    expect(() => buildColorPalette(broken, published, 'illustration')).toThrow(
      'has no dark color value',
    );
  });
});

describe('rgbaToHex', () => {
  it('formats opaque colors as uppercase 6-digit hex', () => {
    expect(rgbaToHex({ r: 0, g: 0.32156863, b: 1, a: 1 })).toBe('#0052FF');
    expect(rgbaToHex({ r: 1, g: 1, b: 1, a: 1 })).toBe('#FFFFFF');
  });

  it('appends the alpha channel when not opaque', () => {
    expect(rgbaToHex({ r: 0, g: 0, b: 0, a: 0.5 })).toBe('#00000080');
  });
});
