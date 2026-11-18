import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';

import type { Illustration } from '../illustration';
import { AndroidVectorDrawableSink } from '../sinks/AndroidVectorDrawableSink';
import { IosAssetCatalogSink, renderNameEnum, swiftCaseName } from '../sinks/IosAssetCatalogSink';

import { nativeSamples } from './__fixtures__/nativeSamples';
import { fixturePalette, readTree } from './__fixtures__/nativeSinkHarness';

/**
 * The iOS sink's layout and file contents, pinned byte for byte to `__fixtures__/iosSink/`.
 * Regenerate the fixtures by deleting the directory and running this file: the first test writes
 * what it would compare against.
 */

const fixtureDir = path.join(__dirname, '__fixtures__', 'iosSink');
const illustrations = nativeSamples.map(({ illustration }) => illustration);

let dir: string;
let sink: IosAssetCatalogSink;

beforeEach(() => {
  dir = fs.mkdtempSync(path.join(os.tmpdir(), 'ios-asset-catalog-sink-'));
  sink = new IosAssetCatalogSink({
    dir,
    componentUrl: ({ nodeId }) => `https://www.figma.com/design/file?node-id=${nodeId}`,
  });
});

afterEach(() => {
  fs.rmSync(dir, { recursive: true, force: true });
});

const applyAll = () =>
  sink.apply({ remove: [], write: nativeSamples, illustrations, palette: fixturePalette });

describe('IosAssetCatalogSink', () => {
  it('writes the asset catalog and the name enums exactly as pinned', async () => {
    await applyAll();
    const tree = readTree(dir);
    if (!fs.existsSync(fixtureDir)) {
      for (const [file, content] of Object.entries(tree)) {
        fs.mkdirSync(path.dirname(path.join(fixtureDir, file)), { recursive: true });
        fs.writeFileSync(path.join(fixtureDir, file), content);
      }
    }
    expect(tree).toEqual(readTree(fixtureDir));
    expect(Object.keys(tree)).toEqual([
      'Generated/HeroSquareName.swift',
      'Generated/PictogramName.swift',
      'Generated/SpotIconName.swift',
      'Resources/Illustrations.xcassets/Contents.json',
      'Resources/Illustrations.xcassets/heroSquare/Contents.json',
      'Resources/Illustrations.xcassets/heroSquare/arrowsUpDown.imageset/Contents.json',
      'Resources/Illustrations.xcassets/heroSquare/arrowsUpDown.imageset/arrowsUpDown-dark.svg',
      'Resources/Illustrations.xcassets/heroSquare/arrowsUpDown.imageset/arrowsUpDown-light.svg',
      'Resources/Illustrations.xcassets/heroSquare/private.imageset/Contents.json',
      'Resources/Illustrations.xcassets/heroSquare/private.imageset/private-dark.svg',
      'Resources/Illustrations.xcassets/heroSquare/private.imageset/private-light.svg',
      'Resources/Illustrations.xcassets/pictogram/2fa.imageset/2fa-dark.svg',
      'Resources/Illustrations.xcassets/pictogram/2fa.imageset/2fa-light.svg',
      'Resources/Illustrations.xcassets/pictogram/2fa.imageset/Contents.json',
      'Resources/Illustrations.xcassets/pictogram/Contents.json',
      'Resources/Illustrations.xcassets/pictogram/delegate.imageset/Contents.json',
      'Resources/Illustrations.xcassets/pictogram/delegate.imageset/delegate-dark.svg',
      'Resources/Illustrations.xcassets/pictogram/delegate.imageset/delegate-light.svg',
      'Resources/Illustrations.xcassets/pictogram/object.imageset/Contents.json',
      'Resources/Illustrations.xcassets/pictogram/object.imageset/object-dark.svg',
      'Resources/Illustrations.xcassets/pictogram/object.imageset/object-light.svg',
      'Resources/Illustrations.xcassets/spotIcon/2fa.imageset/2fa-dark.svg',
      'Resources/Illustrations.xcassets/spotIcon/2fa.imageset/2fa-light.svg',
      'Resources/Illustrations.xcassets/spotIcon/2fa.imageset/Contents.json',
      'Resources/Illustrations.xcassets/spotIcon/Contents.json',
    ]);
  });

  it('has an illustration only when both SVGs carry its current stamp', async () => {
    const [sample] = nativeSamples;
    expect(await sink.has(sample.illustration)).toBe(false);
    await applyAll();
    expect(await sink.has(sample.illustration)).toBe(true);
    expect(await sink.has({ ...sample.illustration, version: 2 })).toBe(false);

    const dark = path.join(
      dir,
      'Resources/Illustrations.xcassets/spotIcon/2fa.imageset/2fa-dark.svg',
    );
    fs.writeFileSync(
      dark,
      fs
        .readFileSync(dark, 'utf-8')
        .replace(/cds-illustration spotIcon 2fa 1 /, 'cds-illustration spotIcon 2fa 0 '),
    );
    expect(await sink.has(sample.illustration)).toBe(false);
  });

  it('removes image sets and rebuilds the enums from the remaining set', async () => {
    await applyAll();
    const [removed, ...kept] = nativeSamples.filter(
      ({ illustration }) => illustration.type === 'pictogram',
    );
    await sink.apply({
      remove: [removed.illustration],
      write: [],
      illustrations: illustrations.filter((item) => item !== removed.illustration),
      palette: fixturePalette,
    });
    expect(
      fs.existsSync(path.join(dir, 'Resources/Illustrations.xcassets/pictogram/2fa.imageset')),
    ).toBe(false);
    expect(fs.readFileSync(path.join(dir, 'Generated/PictogramName.swift'), 'utf-8')).toContain(
      '    case delegate\n    case object\n}\n',
    );
    expect(kept).toHaveLength(2);
  });

  it('fails with the Figma link and writes nothing when an SVG cannot be exported', async () => {
    const [sample] = nativeSamples;
    const broken = {
      illustration: sample.illustration,
      svg: '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 8 8"><text>no</text></svg>',
    };
    await expect(
      sink.apply({ remove: [], write: [broken], illustrations, palette: fixturePalette }),
    ).rejects.toThrow(
      /spotIcon\/2fa cannot be exported to the native packages\.\n {2}Reason: <text> is not supported\n {2}Fix it in Figma: https:\/\/www\.figma\.com\/design\/file\?node-id=4390:695/,
    );
    expect(readTree(dir)).toEqual({});
  });
});

describe('the not-exportable list', () => {
  it('is left out by both native sinks, before and after any include predicate', () => {
    const listed = { ...illustrations[0], type: 'spotSquare', name: 'lowRisk' };
    expect(sink.accepts(listed)).toBe(false);
    expect(sink.accepts(illustrations[0])).toBe(true);
    const android = new AndroidVectorDrawableSink({
      dir,
      include: ({ type }) => type === 'spotSquare',
    });
    expect(android.accepts(listed)).toBe(false);
    expect(android.accepts({ ...listed, name: 'wallet' })).toBe(true);
    expect(android.accepts(illustrations[0])).toBe(false);
  });
});

describe('swiftCaseName', () => {
  it('keeps plain names, prefixes digits and backticks keywords', () => {
    expect(swiftCaseName('wallet')).toBe('wallet');
    expect(swiftCaseName('2fa')).toBe('_2fa');
    expect(swiftCaseName('private')).toBe('`private`');
    expect(swiftCaseName('protocol')).toBe('`protocol`');
    expect(swiftCaseName('Self')).toBe('`Self`');
    expect(() => swiftCaseName('two-factor')).toThrow('cannot be a Swift identifier');
  });
});

describe('renderNameEnum', () => {
  const named = (...names: string[]): Illustration[] =>
    names.map((name) => ({ ...nativeSamples[1].illustration, nodeId: name, name }));

  it('fails on names that collide as image sets on a case-insensitive file system', () => {
    expect(() => renderNameEnum('pictogram', named('wallet', 'Wallet'))).toThrow(
      'pictogram/wallet and pictogram/Wallet collide in the iOS package; rename one of them in Figma',
    );
  });

  it('fails on names that collide as identifiers', () => {
    expect(() => renderNameEnum('pictogram', named('2fa', '_2fa'))).toThrow(
      'cannot be a Swift identifier',
    );
  });
});
