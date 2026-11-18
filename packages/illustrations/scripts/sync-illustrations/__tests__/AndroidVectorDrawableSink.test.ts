import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';

import type { Illustration } from '../illustration';
import {
  AndroidVectorDrawableSink,
  drawableName,
  kotlinPropertyName,
  renderNameProperties,
  snakeCase,
} from '../sinks/AndroidVectorDrawableSink';

import { nativeSamples } from './__fixtures__/nativeSamples';
import { fixturePalette, readTree } from './__fixtures__/nativeSinkHarness';

/**
 * The Android sink's layout and file contents, pinned byte for byte to `__fixtures__/androidSink/`.
 * Regenerate the fixtures by deleting the directory and running this file: the first test writes
 * what it would compare against.
 */

const fixtureDir = path.join(__dirname, '__fixtures__', 'androidSink');
const illustrations = nativeSamples.map(({ illustration }) => illustration);

let dir: string;
let sink: AndroidVectorDrawableSink;

beforeEach(() => {
  dir = fs.mkdtempSync(path.join(os.tmpdir(), 'android-vector-drawable-sink-'));
  sink = new AndroidVectorDrawableSink({
    drawableDir: path.join(dir, 'res/drawable'),
    kotlinDir: path.join(dir, 'kotlin'),
    componentUrl: ({ nodeId }) => `https://www.figma.com/design/file?node-id=${nodeId}`,
  });
});

afterEach(() => {
  fs.rmSync(dir, { recursive: true, force: true });
});

const applyAll = () =>
  sink.apply({ remove: [], write: nativeSamples, illustrations, palette: fixturePalette });

describe('AndroidVectorDrawableSink', () => {
  it('writes the drawables and the name properties exactly as pinned', async () => {
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
      'kotlin/com/coinbase/cds/illustrations/generated/HeroSquareNames.kt',
      'kotlin/com/coinbase/cds/illustrations/generated/PictogramNames.kt',
      'kotlin/com/coinbase/cds/illustrations/generated/SpotIconNames.kt',
      'res/drawable/cds_hero_square_arrows_up_down_dark.xml',
      'res/drawable/cds_hero_square_arrows_up_down_light.xml',
      'res/drawable/cds_hero_square_private_dark.xml',
      'res/drawable/cds_hero_square_private_light.xml',
      'res/drawable/cds_pictogram_2fa_dark.xml',
      'res/drawable/cds_pictogram_2fa_light.xml',
      'res/drawable/cds_pictogram_delegate_dark.xml',
      'res/drawable/cds_pictogram_delegate_light.xml',
      'res/drawable/cds_pictogram_object_dark.xml',
      'res/drawable/cds_pictogram_object_light.xml',
      'res/drawable/cds_spot_icon_2fa_dark.xml',
      'res/drawable/cds_spot_icon_2fa_light.xml',
    ]);
  });

  it('has an illustration only when both drawables carry its current stamp', async () => {
    const [sample] = nativeSamples;
    expect(await sink.has(sample.illustration)).toBe(false);
    await applyAll();
    expect(await sink.has(sample.illustration)).toBe(true);
    expect(await sink.has({ ...sample.illustration, hash: 'other' })).toBe(false);

    fs.rmSync(path.join(dir, 'res/drawable/cds_spot_icon_2fa_dark.xml'));
    expect(await sink.has(sample.illustration)).toBe(false);
  });

  it('removes both drawables and rebuilds the properties from the remaining set', async () => {
    await applyAll();
    const removed = nativeSamples[1].illustration;
    await sink.apply({
      remove: [removed],
      write: [],
      illustrations: illustrations.filter((item) => item !== removed),
      palette: fixturePalette,
    });
    expect(fs.existsSync(path.join(dir, 'res/drawable/cds_pictogram_2fa_light.xml'))).toBe(false);
    expect(fs.existsSync(path.join(dir, 'res/drawable/cds_pictogram_2fa_dark.xml'))).toBe(false);
    const names = fs.readFileSync(
      path.join(dir, 'kotlin/com/coinbase/cds/illustrations/generated/PictogramNames.kt'),
      'utf-8',
    );
    expect(names).not.toContain('_2fa');
    expect(names).toContain(
      '        "delegate" to PictogramName.delegate,\n        "object" to PictogramName.`object`,\n',
    );
  });

  it('fails with the Figma link and writes nothing when an SVG cannot be drawn', async () => {
    const [sample] = nativeSamples;
    const skewed = {
      illustration: sample.illustration,
      svg: '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 8 8"><path fill="#0052FF" d="M0 0h8v8H0z" transform="skewX(10)"/></svg>',
    };
    await expect(
      sink.apply({ remove: [], write: [skewed], illustrations, palette: fixturePalette }),
    ).rejects.toThrow(
      /spotIcon\/2fa cannot be drawn as an Android vector drawable\.\n {2}Reason: transform skewX\(\) cannot be expressed as a <group>\n {2}Fix it in Figma: https:\/\/www\.figma\.com\/design\/file\?node-id=4390:695/,
    );
    expect(readTree(dir)).toEqual({});
  });

  it('imports R from the configured package', async () => {
    sink = new AndroidVectorDrawableSink({
      drawableDir: path.join(dir, 'res/drawable'),
      kotlinDir: path.join(dir, 'kotlin'),
      rPackage: 'com.example.cds',
    });
    await applyAll();
    expect(
      fs.readFileSync(
        path.join(dir, 'kotlin/com/coinbase/cds/illustrations/generated/PictogramNames.kt'),
        'utf-8',
      ),
    ).toContain('import com.example.cds.R\n');
  });
});

describe('naming', () => {
  it('snake-cases types and names into drawable names', () => {
    expect(snakeCase('arrowsUpDown')).toBe('arrows_up_down');
    expect(drawableName({ type: 'heroSquare', name: 'arrowsUpDown' }, 'light')).toBe(
      'cds_hero_square_arrows_up_down_light',
    );
    expect(drawableName({ type: 'pictogram', name: '2fa' }, 'dark')).toBe('cds_pictogram_2fa_dark');
  });

  it('keeps plain names, prefixes digits and backticks hard keywords', () => {
    expect(kotlinPropertyName('wallet')).toBe('wallet');
    expect(kotlinPropertyName('2fa')).toBe('_2fa');
    expect(kotlinPropertyName('object')).toBe('`object`');
    expect(kotlinPropertyName('private')).toBe('private');
    expect(() => kotlinPropertyName('two-factor')).toThrow('cannot be a Kotlin identifier');
  });

  const named = (...names: string[]): Illustration[] =>
    names.map((name) => ({ ...nativeSamples[1].illustration, nodeId: name, name }));

  it('fails on a name that would shadow the generated `all` property', () => {
    expect(() => renderNameProperties('pictogram', named('all'), 'com.coinbase.cds')).toThrow(
      'pictogram/all collides with the generated PictogramName.all in the Android module; rename it in Figma',
    );
  });

  it('fails on names that collide as properties', () => {
    expect(() =>
      renderNameProperties('pictogram', named('2fa', '_2fa'), 'com.coinbase.cds'),
    ).toThrow('cannot be a Kotlin identifier');
  });
});
