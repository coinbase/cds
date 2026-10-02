import { fillContainer, renderEsmModule } from '../artifacts/modules';
import {
  arrayLiteral,
  objectLiteral,
  propertyKey,
  stringLiteral,
  stringUnionType,
} from '../artifacts/source';
import { buildDescriptionMap, renderDescriptionMap } from '../artifacts/typescriptData';
import type { Illustration } from '../illustration';

/** Artifact helpers are content-only; the sink tests cover how they land on disk. */

const illustration = (overrides: Partial<Illustration>): Illustration => ({
  nodeId: '1:1',
  type: 'spotIcon',
  name: '2fa',
  description: '2fa, two factor, security',
  hash: 'hash',
  version: 1,
  width: 32,
  height: 32,
  createdAt: '2022-01-01T00:00:00.000Z',
  lastUpdated: '2022-01-01T00:00:00.000Z',
  ...overrides,
});

describe('module artifacts', () => {
  it('makes an ES module SVG fill its container unless a width is already set', () => {
    expect(fillContainer('<svg viewBox="0 0 8 8"/>')).toBe(
      '<svg width="100%" height="100%" viewBox="0 0 8 8"/>',
    );
    expect(fillContainer('<svg width="8" viewBox="0 0 8 8"/>')).toBe(
      '<svg width="8" viewBox="0 0 8 8"/>',
    );
    expect(renderEsmModule('<svg/>')).toBe('export default `<svg width="100%" height="100%"/>`;\n');
  });
});

describe('source printer', () => {
  it('quotes keys and strings the way prettier does', () => {
    expect(propertyKey('wallet')).toBe('wallet');
    expect(propertyKey('2fa')).toBe("'2fa'");
    expect(propertyKey('two factor')).toBe("'two factor'");
    expect(propertyKey('ℹ️')).toBe('ℹ️');
    expect(stringLiteral("we don't like waiting")).toBe(`"we don't like waiting"`);
    expect(stringLiteral('say "hi"')).toBe(`'say "hi"'`);
  });

  it('inlines arrays and objects that fit and breaks them otherwise', () => {
    expect(arrayLiteral(["'a'", "'b'"], { prefix: 'const x = ', suffix: ';' })).toBe(
      "const x = ['a', 'b'];",
    );
    expect(objectLiteral([['a', '1']], { prefix: 'const x = ', suffix: ';' })).toBe(
      'const x = { a: 1 };',
    );
    const long = Array.from({ length: 30 }, (_, i) => `'name${i}'`);
    expect(arrayLiteral(long, { prefix: 'const x = ', suffix: ';' }).split('\n').length).toBe(32);
  });

  it('prints a string union on one line or one member per line', () => {
    expect(stringUnionType('Name', ['a', 'b'])).toBe("export type Name = 'a' | 'b';");
    const members = Array.from({ length: 20 }, (_, i) => `longIllustrationName${i}`);
    expect(stringUnionType('Name', members)).toMatch(
      /^export type Name =\n {2}\| 'longIllustrationName0'\n/,
    );
  });
});

describe('description map', () => {
  it('maps every comma-separated keyword to the illustrations carrying it, without duplicates', () => {
    expect(
      buildDescriptionMap([
        illustration({}),
        illustration({ name: 'wallet', description: 'wallet, security' }),
        illustration({ name: 'wallet', description: 'wallet,wallet' }),
      ]),
    ).toEqual({
      '2fa': ['2fa'],
      'two factor': ['2fa'],
      security: ['2fa', 'wallet'],
      wallet: ['wallet'],
    });
  });

  it('renders keywords with prettier quoting', () => {
    const rendered = renderDescriptionMap(
      [illustration({ description: "we don't like waiting, ℹ️, two factor" })],
      { type: 'spotIcon', header: '// header' },
    );
    expect(rendered).toContain(`"we don't like waiting": ['2fa'],`);
    expect(rendered).toContain(`ℹ️: ['2fa'],`);
    expect(rendered).toContain(`'two factor': ['2fa'],`);
  });
});
