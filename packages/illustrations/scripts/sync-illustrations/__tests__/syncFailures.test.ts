import type {
  GetLocalVariablesResponse,
  GetPublishedVariablesResponse,
} from '@figma/rest-api-spec';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';

import { MAX_PATH_DATA } from '../artifacts/vectorDrawable';
import type { Component } from '../illustration';
import { type Manifest, readManifest, writeManifest } from '../manifest';
import { AndroidVectorDrawableSink } from '../sinks/AndroidVectorDrawableSink';
import { IosAssetCatalogSink } from '../sinks/IosAssetCatalogSink';
import { buildColorPalette } from '../source/fetchColorPalette';
import { InMemorySource } from '../source/InMemorySource';
import { runSync, type SyncOutcome } from '../sync';

import localFixture from './__fixtures__/getLocalVariables.json';
import publishedFixture from './__fixtures__/getPublishedVariables.json';
import { readTree } from './__fixtures__/nativeSinkHarness';

/**
 * How a run behaves when some illustrations cannot be exported: the default publishes everything
 * that validates, `allOrNothing` publishes nothing for a sink with any failure, and `dryRun`
 * validates the same way and writes nothing.
 */

const palette = buildColorPalette(
  localFixture as unknown as GetLocalVariablesResponse,
  publishedFixture as unknown as GetPublishedVariablesResponse,
  'illustration',
);

const component = (name: string, nodeId: string): Component => ({
  nodeId,
  type: 'pictogram',
  name,
  description: '',
  createdAt: '2024-01-01T00:00:00.000Z',
  updatedAt: '2024-01-01T00:00:00.000Z',
  url: `https://www.figma.com/design/file?node-id=${nodeId.replace(':', '-')}`,
});

const square = (fill: string) =>
  `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 8 8"><path fill="${fill}" d="M0 0h8v8H0z"/></svg>`;

const oversizedSvg = (() => {
  const segments = Array.from(
    { length: 3600 },
    (_, i) => `L${(i * 7919) % 90000}.123 ${(i * 104729) % 90000}.456`,
  ).join('');
  return `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 8 8"><path fill="#0052FF" d="M0 0${segments}z"/></svg>`;
})();

jest.setTimeout(30000);

const good = component('good', '1:1');
const other = component('other', '1:2');
const bad = component('bad', '1:3');

let dir: string;
let source: InMemorySource;
let manifest: Manifest;

const androidTree = () => readTree(path.join(dir, 'android'));
const iosTree = () => readTree(path.join(dir, 'ios'));

const sinks = () => [
  new IosAssetCatalogSink({
    catalogDir: path.join(dir, 'ios/Illustrations.xcassets'),
    generatedDir: path.join(dir, 'ios/Generated'),
  }),
  new AndroidVectorDrawableSink({
    drawableDir: path.join(dir, 'android/res/drawable'),
    kotlinDir: path.join(dir, 'android/kotlin'),
    componentUrl: ({ nodeId }) => `https://www.figma.com/design/file?node-id=${nodeId}`,
  }),
];

const run = async (options: { dryRun?: boolean; allOrNothing?: boolean } = {}) => {
  const outcome = await runSync({ source, manifest, sinks: sinks(), syncAll: true, ...options });
  if (outcome.status === 'synced' && !options.dryRun) {
    writeManifest(path.join(dir, 'manifest.json'), {
      illustrations: outcome.diff.illustrations,
      palette: outcome.palette,
    });
    manifest = readManifest(path.join(dir, 'manifest.json'));
  }
  return outcome;
};

const results = (outcome: SyncOutcome) => {
  if (outcome.status !== 'synced') throw new Error(`Expected a sync, got ${outcome.status}`);
  return Object.fromEntries(outcome.sinkResults.map((result) => [result.sink, result]));
};

const names = (illustrations: { name: string }[]) => illustrations.map(({ name }) => name).sort();

const androidNames = () =>
  androidTree()['kotlin/com/coinbase/cds/illustrations/generated/PictogramNames.kt'] ?? '';

beforeEach(() => {
  dir = fs.mkdtempSync(path.join(os.tmpdir(), 'sync-illustrations-failures-'));
  manifest = readManifest(path.join(dir, 'manifest.json'));
  source = new InMemorySource({
    components: [good, other, bad],
    svgs: {
      [good.nodeId]: square('#0052FF'),
      [other.nodeId]: square('#5DE2F8'),
      [bad.nodeId]: oversizedSvg,
    },
    palette,
  });
});

afterEach(() => {
  fs.rmSync(dir, { recursive: true, force: true });
});

describe('best effort, the default', () => {
  it('publishes what validates, skips the failed asset and reports it in full', async () => {
    const outcome = await run();
    const { AndroidVectorDrawableSink: android, IosAssetCatalogSink: ios } = results(outcome);

    expect(names(android.written)).toEqual(['good', 'other']);
    expect(android.published).toBe(true);
    expect(android.failures).toHaveLength(1);
    expect(android.failures[0].message).toMatch(
      /^pictogram\/bad cannot be drawn as an Android vector drawable\./,
    );
    expect(android.failures[0].message).toContain('light: a path of');
    expect(android.failures[0].message).toContain('dark: a path of');
    expect(android.failures[0].message).toMatch(
      new RegExp(`a path of \\d+ characters exceeds Android's ${MAX_PATH_DATA}-character`),
    );
    expect(android.failures[0].message).toContain('output cds_pictogram_bad_light.xml');
    expect(android.failures[0].message).toContain('path starts "m0 0');
    expect(android.failures[0].message).toContain('Fix it in Figma: https://www.figma.com');

    expect(names(ios.written)).toEqual(['bad', 'good', 'other']);
    expect(ios.failures).toEqual([]);

    expect(Object.keys(androidTree()).filter((file) => file.endsWith('.xml'))).toEqual([
      'res/drawable/cds_pictogram_good_dark.xml',
      'res/drawable/cds_pictogram_good_light.xml',
      'res/drawable/cds_pictogram_other_dark.xml',
      'res/drawable/cds_pictogram_other_light.xml',
    ]);
    expect(androidNames()).toContain('PictogramName.Companion.good');
    expect(androidNames()).not.toContain('bad');
  });

  it('reports a failed new asset again on every run until it is fixed', async () => {
    await run();
    const again = await run();
    expect(results(again).AndroidVectorDrawableSink.failures).toHaveLength(1);

    source.svgs[bad.nodeId] = square('#123456');
    const fixed = await run();
    expect(results(fixed).AndroidVectorDrawableSink.failures).toEqual([]);
    expect(androidNames()).toContain('PictogramName.Companion.bad');
  });

  it('keeps the previous files and catalog entry when an update fails', async () => {
    source.svgs[bad.nodeId] = square('#123456');
    await run();
    const before = androidTree();

    source.svgs[bad.nodeId] = oversizedSvg;
    source.components = source.components.map((item) =>
      item.nodeId === bad.nodeId ? { ...item, updatedAt: '2030-01-01T00:00:00.000Z' } : item,
    );
    const outcome = await run();

    expect(results(outcome).AndroidVectorDrawableSink.failures).toHaveLength(1);
    expect(androidTree()).toEqual(before);
    expect(androidNames()).toContain('PictogramName.Companion.bad');
  });

  it('removes a deleted illustration even when another one fails', async () => {
    source.svgs[bad.nodeId] = square('#123456');
    await run();
    source.components = source.components.filter((item) => item.nodeId !== other.nodeId);
    source.svgs[bad.nodeId] = oversizedSvg;

    await run();

    const files = Object.keys(androidTree());
    expect(files.some((file) => file.includes('other'))).toBe(false);
    expect(files.some((file) => file.includes('cds_pictogram_bad_light'))).toBe(true);
  });
});

describe('all or nothing', () => {
  it('publishes nothing for a sink with any failure, and everything for the others', async () => {
    const outcome = await run({ allOrNothing: true });
    const { AndroidVectorDrawableSink: android, IosAssetCatalogSink: ios } = results(outcome);

    expect(android.published).toBe(false);
    expect(android.failures).toHaveLength(1);
    expect(androidTree()).toEqual({});
    expect(ios.published).toBe(true);
    expect(Object.keys(iosTree()).length).toBeGreaterThan(0);
  });

  it('leaves files, catalogs and pending deletions untouched', async () => {
    source.svgs[bad.nodeId] = square('#123456');
    await run();
    const before = androidTree();

    source.components = source.components.filter((item) => item.nodeId !== other.nodeId);
    source.svgs[bad.nodeId] = oversizedSvg;
    source.components = source.components.map((item) =>
      item.nodeId === bad.nodeId ? { ...item, updatedAt: '2030-01-01T00:00:00.000Z' } : item,
    );
    await run({ allOrNothing: true });

    expect(androidTree()).toEqual(before);
  });
});

describe('dry run', () => {
  it.each([
    ['best effort', {}],
    ['all or nothing', { allOrNothing: true }],
  ])('validates like a real run and writes nothing (%s)', async (_label, options) => {
    const outcome = await run({ dryRun: true, ...options });
    const { AndroidVectorDrawableSink: android, IosAssetCatalogSink: ios } = results(outcome);

    expect(android.published).toBe(false);
    expect(ios.published).toBe(false);
    expect(android.failures).toHaveLength(1);
    expect(names(android.written)).toEqual(['good', 'other']);
    expect(names(ios.written)).toEqual(['bad', 'good', 'other']);
    expect(readTree(dir)).toEqual({});
  });

  it('reports no failures when everything validates', async () => {
    source.svgs[bad.nodeId] = square('#123456');
    const outcome = await run({ dryRun: true });
    expect(results(outcome).AndroidVectorDrawableSink.failures).toEqual([]);
    expect(readTree(dir)).toEqual({});
  });
});

describe('an already-current asset', () => {
  it('is regenerated when its stamped drawable carries an oversized path', async () => {
    source.svgs[bad.nodeId] = square('#123456');
    await run();
    const drawable = path.join(dir, 'android/res/drawable/cds_pictogram_good_light.xml');
    const original = fs.readFileSync(drawable, 'utf-8');
    const huge = 'M0 0' + Array.from({ length: 9000 }, (_, i) => `L${i} ${i}`).join('');
    fs.writeFileSync(
      drawable,
      original.replace(/android:pathData="[^"]*"/, `android:pathData="${huge}"`),
    );

    const outcome = await run();

    expect(names(results(outcome).AndroidVectorDrawableSink.written)).toContain('good');
    expect(fs.readFileSync(drawable, 'utf-8')).toBe(original);
  });
});
