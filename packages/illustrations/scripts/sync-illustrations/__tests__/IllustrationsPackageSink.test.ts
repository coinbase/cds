import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import sharp from 'sharp';

import type { ColorPalette, Illustration } from '../illustration';
import { IllustrationsPackageSink } from '../sinks/IllustrationsPackageSink';
import { includeTypes } from '../sinks/Sink';

/**
 * The package sink's layout and file contents, pinned to the files previous syncs committed to
 * `src/__generated__`.
 */

const fixture = (name: string) =>
  fs.readFileSync(path.join(__dirname, '__fixtures__', name), 'utf-8').trimEnd();

const twoFactor: Illustration = {
  nodeId: '4390:695',
  type: 'spotIcon',
  name: '2fa',
  description: '2fa, two factor, security',
  hash: 'hash',
  version: 1,
  width: 32,
  height: 32,
  createdAt: '2022-11-22T17:37:19.370Z',
  lastUpdated: '2026-06-08T19:45:06.046Z',
};

const wallet: Illustration = {
  ...twoFactor,
  nodeId: '1:1',
  name: 'wallet',
  description: 'wallet, security',
  version: 3,
  createdAt: '2021-01-01T00:00:00.000Z',
};

const palette: ColorPalette = [
  { name: 'black', light: '#0A0B0D', dark: '#0A0B0D' },
  { name: 'gray', light: '#CED2DB', dark: '#464B55' },
  { name: 'primary', light: '#0052FF', dark: '#578BFA' },
  { name: 'white', light: '#FFFFFF', dark: '#FFFFFF' },
];

const lightSvg = fixture('expected-spotIcon-2fa-1-light.svg');

let dir: string;
let sink: IllustrationsPackageSink;

const read = (relative: string) => fs.readFileSync(path.join(dir, relative), 'utf-8');
const files = () =>
  fs
    .readdirSync(dir, { recursive: true, withFileTypes: true })
    .filter((entry) => entry.isFile())
    .map((entry) => path.relative(dir, path.join(entry.parentPath, entry.name)))
    .sort();

const apply = (
  changes: Partial<Parameters<IllustrationsPackageSink['apply']>[0]>,
  target: IllustrationsPackageSink = sink,
) =>
  target.apply({
    remove: [],
    write: [],
    illustrations: [],
    palette,
    ...changes,
  });

beforeEach(() => {
  dir = fs.mkdtempSync(path.join(os.tmpdir(), 'sync-illustrations-'));
  sink = new IllustrationsPackageSink({ dir });
});

afterEach(() => {
  fs.rmSync(dir, { recursive: true, force: true });
});

describe('IllustrationsPackageSink', () => {
  it('accepts everything by default and respects an include filter', () => {
    expect(sink.accepts(twoFactor)).toBe(true);
    const onlyPictograms = new IllustrationsPackageSink({
      dir,
      include: includeTypes('pictogram'),
    });
    expect(onlyPictograms.accepts(twoFactor)).toBe(false);
    expect(onlyPictograms.accepts({ ...twoFactor, type: 'pictogram' })).toBe(true);
  });

  it('writes every asset of an illustration in the package layout and removes them again', async () => {
    expect(await sink.has(twoFactor)).toBe(false);
    await apply({
      write: [{ illustration: twoFactor, svg: lightSvg }],
      illustrations: [twoFactor],
    });

    expect(files()).toEqual([
      'spotIcon/data/descriptionMap.ts',
      'spotIcon/data/names.ts',
      'spotIcon/data/svgEsmMap.ts',
      'spotIcon/data/svgJsMap.ts',
      'spotIcon/data/versionMap.ts',
      'spotIcon/png/dark/2fa-1.png',
      'spotIcon/png/light/2fa-1.png',
      'spotIcon/svg/dark/2fa-1.svg',
      'spotIcon/svg/light/2fa-1.svg',
      'spotIcon/svgJs/cjs/dark/2fa-1.js',
      'spotIcon/svgJs/cjs/light/2fa-1.js',
      'spotIcon/svgJs/cjs/themeable/2fa-1.js',
      'spotIcon/svgJs/esm/themeable/2fa-1.js',
      'spotIcon/types/SpotIconName.ts',
    ]);
    expect(await sink.has(twoFactor)).toBe(true);

    await apply({ remove: [twoFactor] });
    expect(files().filter((file) => !file.includes('/data/') && !file.includes('/types/'))).toEqual(
      [],
    );
    expect(await sink.has(twoFactor)).toBe(false);
  });

  it('reports a partially written illustration as missing', async () => {
    await apply({ write: [{ illustration: twoFactor, svg: lightSvg }] });
    fs.rmSync(path.join(dir, 'spotIcon/svgJs/cjs/dark/2fa-1.js'));
    expect(await sink.has(twoFactor)).toBe(false);
  });

  it('removing a never-written illustration is a no-op', async () => {
    await expect(apply({ remove: [wallet] })).resolves.toBeUndefined();
  });

  describe('asset contents', () => {
    beforeEach(() => apply({ write: [{ illustration: twoFactor, svg: lightSvg }] }));

    it('writes the light SVG verbatim and a palette-swapped dark SVG', () => {
      expect(read('spotIcon/svg/light/2fa-1.svg')).toBe(lightSvg);
      expect(read('spotIcon/svg/dark/2fa-1.svg')).toBe(fixture('expected-spotIcon-2fa-1-dark.svg'));
    });

    it('rasterizes PNGs at the intrinsic size', async () => {
      const { width, height, format } = await sharp(
        path.join(dir, 'spotIcon/png/light/2fa-1.png'),
      ).metadata();
      expect({ width, height, format }).toEqual({ width: 32, height: 32, format: 'png' });
    });

    it('writes CJS modules in the published format, themeable with CSS variables', () => {
      expect(read('spotIcon/svgJs/cjs/light/2fa-1.js')).toBe(
        `module.exports = {\n  content: \`${lightSvg}\`,\n};\n`,
      );
      expect(read('spotIcon/svgJs/cjs/themeable/2fa-1.js')).toBe(
        `${fixture('expected-spotIcon-2fa-1-themeable.cjs.js')}\n`,
      );
    });

    it('writes the themeable ES module in the published format', () => {
      expect(read('spotIcon/svgJs/esm/themeable/2fa-1.js')).toBe(
        `${fixture('expected-spotIcon-2fa-1-themeable.esm.js')}\n`,
      );
    });

    it('honours a different CSS variable prefix', async () => {
      await apply(
        { write: [{ illustration: twoFactor, svg: lightSvg }] },
        new IllustrationsPackageSink({ dir, cssVariablePrefix: 'cds' }),
      );
      expect(read('spotIcon/svgJs/cjs/themeable/2fa-1.js')).toContain('var(--cds-primary)');
    });
  });

  describe('per-type data files', () => {
    it('writes the name union, names, descriptionMap and versionMap', async () => {
      await apply({ illustrations: [wallet, twoFactor] });

      expect(read('spotIcon/types/SpotIconName.ts')).toBe(`/**
 * DO NOT MODIFY
 * Generated from yarn nx run illustrations:sync-illustrations
 */

export type SpotIconName = '2fa' | 'wallet';
`);
      expect(read('spotIcon/data/names.ts')).toContain(
        "const names: SpotIconName[] = ['2fa', 'wallet'];",
      );
      expect(read('spotIcon/data/descriptionMap.ts')).toContain("security: ['wallet', '2fa'],");
      // createdAt order, which the percy stories depend on; inlined because it fits, like prettier.
      expect(read('spotIcon/data/versionMap.ts')).toContain(
        `const versionMap: Record<SpotIconName, number> = { wallet: 3, '2fa': 1 };`,
      );
    });

    it('writes a typed, alphabetically sorted svgJsMap that lazily requires the modules', async () => {
      await apply({
        illustrations: [
          wallet,
          twoFactor,
          { ...wallet, name: 'advancedTradingChartsIndicatorsCandles' },
        ],
      });
      expect(read('spotIcon/data/svgJsMap.ts'))
        .toBe(`import type { SpotIconName } from '../types/SpotIconName';

/**
 * DO NOT MODIFY
 * Generated from yarn nx run illustrations:sync-illustrations
 */

const svgJsMap = {
  '2fa': {
    light: () => require('../svgJs/cjs/light/2fa-1.js').content,
    dark: () => require('../svgJs/cjs/dark/2fa-1.js').content,
    themeable: () => require('../svgJs/cjs/themeable/2fa-1.js').content,
  },
  advancedTradingChartsIndicatorsCandles: {
    light: () => require('../svgJs/cjs/light/advancedTradingChartsIndicatorsCandles-3.js').content,
    dark: () => require('../svgJs/cjs/dark/advancedTradingChartsIndicatorsCandles-3.js').content,
    themeable: () =>
      require('../svgJs/cjs/themeable/advancedTradingChartsIndicatorsCandles-3.js').content,
  },
  wallet: {
    light: () => require('../svgJs/cjs/light/wallet-3.js').content,
    dark: () => require('../svgJs/cjs/dark/wallet-3.js').content,
    themeable: () => require('../svgJs/cjs/themeable/wallet-3.js').content,
  },
} as Record<SpotIconName, { light: () => string; dark: () => string; themeable?: () => string }>;

export default svgJsMap;
`);
    });

    it('writes a typed svgEsmMap that lazily imports the modules, breaking long entries like prettier', async () => {
      await apply({
        illustrations: [
          { ...wallet, name: 'appTrackingTransparencyEvenLonger' },
          wallet,
          { ...wallet, name: 'accountUnderReview' },
          twoFactor,
        ],
      });
      expect(read('spotIcon/data/svgEsmMap.ts'))
        .toBe(`import type { SpotIconName } from '../types/SpotIconName';

/**
 * DO NOT MODIFY
 * Generated from yarn nx run illustrations:sync-illustrations
 */

const svgEsmMap = {
  '2fa': {
    themeable: () => import('../svgJs/esm/themeable/2fa-1.js').then((m) => m.default as string),
  },
  accountUnderReview: {
    themeable: () =>
      import('../svgJs/esm/themeable/accountUnderReview-3.js').then((m) => m.default as string),
  },
  appTrackingTransparencyEvenLonger: {
    themeable: () =>
      import('../svgJs/esm/themeable/appTrackingTransparencyEvenLonger-3.js').then(
        (m) => m.default as string,
      ),
  },
  wallet: {
    themeable: () => import('../svgJs/esm/themeable/wallet-3.js').then((m) => m.default as string),
  },
} as Partial<Record<SpotIconName, { themeable: () => Promise<string> }>>;

export default svgEsmMap;
`);
    });

    it('breaks the svgJsMap type assertion across lines when the type name makes it too long', async () => {
      await apply({ illustrations: [{ ...twoFactor, type: 'spotRectangle' }] });
      expect(read('spotRectangle/data/svgJsMap.ts')).toContain(`} as Record<
  SpotRectangleName,
  { light: () => string; dark: () => string; themeable?: () => string }
>;`);
    });
  });
});
