import type {
  GetLocalVariablesResponse,
  GetPublishedVariablesResponse,
} from '@figma/rest-api-spec';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';

import type { Component, Illustration } from '../illustration';
import { type Manifest, manifestIllustrations, readManifest, writeManifest } from '../manifest';
import { allFilesExist, removeFile, writeFile } from '../sinks/files';
import { IllustrationsPackageSink } from '../sinks/IllustrationsPackageSink';
import { includeTypes, Sink, type SinkChanges } from '../sinks/Sink';
import { buildColorPalette } from '../source/fetchColorPalette';
import { InMemorySource } from '../source/InMemorySource';
import { runSync, type SyncOutcome } from '../sync';

import localFixture from './__fixtures__/getLocalVariables.json';
import publishedFixture from './__fixtures__/getPublishedVariables.json';

/**
 * Drives the whole pipeline, from component list to files on disk, against an in-memory source
 * that is mutated between runs the way designers mutate the Figma library. The package sink is
 * real; only the network is not.
 */

/** What a second destination might look like: flat, light-only SVGs in another directory. */
class MirrorSink extends Sink {
  private readonly dir: string;

  constructor(dir: string, options?: ConstructorParameters<typeof Sink>[0]) {
    super(options);
    this.dir = dir;
  }

  private file = ({ type, name }: Illustration) => path.join(this.dir, type, `${name}.svg`);

  has(illustration: Illustration) {
    return allFilesExist([this.file(illustration)]);
  }

  async apply({ remove, write }: SinkChanges) {
    await Promise.all(remove.map((illustration) => removeFile(this.file(illustration))));
    await Promise.all(
      write.map(({ illustration, svg }) => writeFile(this.file(illustration), svg)),
    );
  }
}

const fixture = (name: string) =>
  fs.readFileSync(path.join(__dirname, '__fixtures__', name), 'utf-8').trimEnd();

const palette = buildColorPalette(
  localFixture as unknown as GetLocalVariablesResponse,
  publishedFixture as unknown as GetPublishedVariablesResponse,
  'illustration',
);

const twoFactor: Component = {
  nodeId: '4390:695',
  type: 'spotIcon',
  name: '2fa',
  description: 'trust, 2fa, authenticate',
  createdAt: '2023-11-07T19:19:47.073Z',
  updatedAt: '2024-01-01T00:00:00.000Z',
  url: 'https://www.figma.com/design/file?node-id=4390-695',
};

const leverage: Component = {
  nodeId: '2:33979',
  type: 'heroSquare',
  name: 'leverage',
  description: 'leverage, trading',
  createdAt: '2022-01-01T00:00:00.000Z',
  updatedAt: '2024-01-01T00:00:00.000Z',
  url: 'https://www.figma.com/design/file?node-id=2-33979',
};

const twoFactorSvg = fixture('figma-export-spotIcon-2fa.svg');
const leverageSvg = fixture('figma-export-heroSquare-leverage.svg');

/**
 * A timestamp just after the last sync, so the incremental sync notices the component without the
 * timestamp lying in the future (which would make every following run re-download it).
 */
const later = () => new Date(Date.parse(manifest.lastUpdated) + 1).toISOString();

let dir: string;
let source: InMemorySource;
let manifest: Manifest;
/** A second destination, added part way through the sequence. */
let mirrorDir: string | undefined;

const files = (type: string) =>
  fs.existsSync(path.join(dir, type))
    ? fs
        .readdirSync(path.join(dir, type), { recursive: true, withFileTypes: true })
        .filter((entry) => entry.isFile() && !entry.parentPath.includes('/data'))
        .filter((entry) => !entry.parentPath.includes('/types'))
        .map((entry) =>
          path.relative(path.join(dir, type), path.join(entry.parentPath, entry.name)),
        )
        .sort()
    : [];

const read = (relative: string) => fs.readFileSync(path.join(dir, relative), 'utf-8');

const assetFiles = (baseName: string) =>
  [
    ...['light', 'dark'].map((theme) => `svg/${theme}/${baseName}.svg`),
    ...['light', 'dark'].map((theme) => `png/${theme}/${baseName}.png`),
    ...['light', 'dark', 'themeable'].map((theme) => `svgJs/cjs/${theme}/${baseName}.js`),
    `svgJs/esm/themeable/${baseName}.js`,
  ].sort();

const sync = async (syncAll = false) => {
  const outcome = await runSync({
    source,
    manifest,
    sinks: [
      new IllustrationsPackageSink({ dir }),
      // Exercises `include`: the mirror only wants spot icons.
      ...(mirrorDir ? [new MirrorSink(mirrorDir, { include: includeTypes('spotIcon') })] : []),
    ],
    syncAll,
  });
  if (outcome.status === 'synced') {
    writeManifest(path.join(dir, 'manifest.json'), {
      illustrations: outcome.diff.illustrations,
      palette: outcome.palette,
    });
    manifest = readManifest(path.join(dir, 'manifest.json'));
  }
  return outcome;
};

const synced = (outcome: SyncOutcome) => {
  if (outcome.status !== 'synced') throw new Error(`Expected a sync, got ${outcome.status}`);
  return outcome.diff;
};

const entry = (name: string) => manifestIllustrations(manifest).find((item) => item.name === name);

beforeAll(() => {
  dir = fs.mkdtempSync(path.join(os.tmpdir(), 'sync-illustrations-e2e-'));
  manifest = readManifest(path.join(dir, 'manifest.json'));
  source = new InMemorySource({
    components: [twoFactor, leverage],
    svgs: { [twoFactor.nodeId]: twoFactorSvg, [leverage.nodeId]: leverageSvg },
    palette,
  });
});

afterAll(() => {
  fs.rmSync(dir, { recursive: true, force: true });
  if (mirrorDir) fs.rmSync(mirrorDir, { recursive: true, force: true });
});

describe('runSync, end to end against an in-memory source', () => {
  it('publishes every component at version 0 on the first run', async () => {
    const diff = synced(await sync());

    expect(diff.results.added.map((item) => item.name).sort()).toEqual(['2fa', 'leverage']);
    expect(files('spotIcon')).toEqual(assetFiles('2fa-0'));
    expect(files('heroSquare')).toEqual(assetFiles('leverage-0'));

    // The same optimization and theming as the files previous syncs published.
    expect(read('spotIcon/svg/light/2fa-0.svg')).toBe(fixture('expected-spotIcon-2fa-1-light.svg'));
    expect(read('spotIcon/svg/dark/2fa-0.svg')).toBe(fixture('expected-spotIcon-2fa-1-dark.svg'));
    expect(read('heroSquare/svg/dark/leverage-0.svg')).toBe(
      fixture('expected-heroSquare-leverage-4-dark.svg'),
    );

    expect(read('spotIcon/types/SpotIconName.ts')).toContain(`export type SpotIconName = '2fa';`);
    expect(read('spotIcon/data/versionMap.ts')).toContain(`{ '2fa': 0 }`);
    expect(Object.keys(manifest.items)).toEqual(['2:33979', '4390:695']);
    expect(entry('2fa')).toMatchObject({ nodeId: '4390:695', version: 0, width: 32, height: 32 });
    expect(Object.keys(manifest.colors)).toHaveLength(15);
  });

  it('does nothing when no component was updated since the last sync', async () => {
    expect((await sync()).status).toBe('nothing-to-sync');
  });

  it('refreshes the description map without touching assets on a description-only change', async () => {
    source.components[0] = { ...twoFactor, description: 'trust, 2fa, passkey', updatedAt: later() };
    const diff = synced(await sync());

    expect(diff.results.updated.map((item) => item.name)).toEqual(['2fa']);
    expect(diff.writes).toHaveLength(0);
    expect(entry('2fa')?.version).toBe(0);
    expect(read('spotIcon/data/descriptionMap.ts')).toContain(`passkey: ['2fa']`);
  });

  it('bumps the version and replaces the asset files when the artwork changes', async () => {
    source.components[0] = { ...source.components[0], updatedAt: later() };
    source.svgs[twoFactor.nodeId] = twoFactorSvg.replace('#CED2DB', '#3CC28A');
    const diff = synced(await sync());

    expect(diff.results.updated.map((item) => item.name)).toEqual(['2fa']);
    expect(entry('2fa')?.version).toBe(1);
    expect(files('spotIcon')).toEqual(assetFiles('2fa-1'));
    expect(read('spotIcon/svg/dark/2fa-1.svg')).toContain('#44C28D');
    expect(read('spotIcon/svgJs/cjs/themeable/2fa-1.js')).toContain('var(--illustration-positive)');
    expect(read('spotIcon/data/svgJsMap.ts')).toContain(`require('../svgJs/cjs/light/2fa-1.js')`);
    expect(read('spotIcon/data/versionMap.ts')).toContain(`{ '2fa': 1 }`);
  });

  it('resets the version, moves the files and keeps createdAt when a component is renamed', async () => {
    source.components[0] = { ...source.components[0], name: 'twoFactor', updatedAt: later() };
    const diff = synced(await sync());

    expect(diff.results.renamed).toMatchObject([{ oldName: '2fa', name: 'twoFactor', version: 0 }]);
    expect(entry('2fa')).toBeUndefined();
    expect(entry('twoFactor')).toMatchObject({ version: 0, createdAt: twoFactor.createdAt });
    expect(files('spotIcon')).toEqual(assetFiles('twoFactor-0'));
    expect(read('spotIcon/types/SpotIconName.ts')).toContain(
      `export type SpotIconName = 'twoFactor';`,
    );
    expect(read('spotIcon/data/svgEsmMap.ts')).toContain(
      `import('../svgJs/esm/themeable/twoFactor-0.js')`,
    );
  });

  it('rejects a rename that only changes case', async () => {
    const before = source.components[0];
    source.components[0] = { ...before, name: 'TwoFactor', updatedAt: later() };
    await expect(sync()).rejects.toThrow('Renames are case-insensitive');
    source.components[0] = before;
  });

  it('continues the version history when design re-creates the node under the same name', async () => {
    const recreated = { ...source.components[0], nodeId: '9000:1', updatedAt: later() };
    source.components[0] = recreated;
    source.svgs[recreated.nodeId] = source.svgs[twoFactor.nodeId];
    const diff = synced(await sync());

    // Not a new illustration: createdAt and the version sequence carry over. The hash covers the
    // node id, so the artwork counts as changed and the version advances rather than restarting.
    expect(diff.results.added).toHaveLength(0);
    expect(diff.results.updated.map((item) => item.name)).toEqual(['twoFactor']);
    expect(entry('twoFactor')).toMatchObject({
      nodeId: '9000:1',
      version: 1,
      createdAt: twoFactor.createdAt,
    });
    expect(files('spotIcon')).toEqual(assetFiles('twoFactor-1'));
  });

  it('ignores a second component that claims an existing type/name', async () => {
    const duplicate: Component = {
      ...source.components[0],
      nodeId: '9000:2',
      createdAt: later(),
      updatedAt: later(),
    };
    source.components.push(duplicate);
    source.svgs[duplicate.nodeId] = leverageSvg;
    const outcome = await sync();

    expect(outcome.duplicates).toEqual([duplicate]);
    expect(outcome.status).toBe('nothing-to-sync');
    expect(entry('twoFactor')?.nodeId).toBe('9000:1');
    source.components.pop();
  });

  it('halts before touching any sink when an export cannot be themed, pointing at the node in Figma', async () => {
    const before = [...files('spotIcon'), ...files('heroSquare')];
    const alphaHex = { ...leverage, nodeId: '7000:1', name: 'alphaHex', updatedAt: later() };
    source.components.push(alphaHex);
    source.svgs[alphaHex.nodeId] = leverageSvg.replace('fill="#0052FF"', 'fill="#0052FF80"');

    await expect(sync()).rejects.toThrow(
      [
        'heroSquare/alphaHex has an SVG the sync cannot publish.',
        '  Reason: fill="#0052FF80" cannot be themed: only 6-digit hex colors, "none" and url(#id) are supported; express transparency with fill-opacity instead of an alpha channel',
        '  Fix it in Figma: https://www.figma.com/design/file?node-id=2-33979',
      ].join('\n'),
    );
    expect([...files('spotIcon'), ...files('heroSquare')]).toEqual(before);
    expect(entry('alphaHex')).toBeUndefined();

    source.components.pop();
    delete source.svgs[alphaHex.nodeId];
  });

  it('removes every file of a component that was deleted from the source', async () => {
    source.components = source.components.filter((component) => component.name !== 'leverage');
    const diff = synced(await sync());

    expect(diff.results.deleted.map((item) => item.name)).toEqual(['leverage']);
    expect(files('heroSquare')).toEqual([]);
    expect(manifestIllustrations(manifest).map((item) => item.name)).toEqual(['twoFactor']);
  });

  it('re-downloads everything with syncAll and finds nothing changed', async () => {
    expect((await sync(true)).status).toBe('no-changes');
  });

  it('fills a destination added later on an ordinary incremental run, without a version bump', async () => {
    mirrorDir = fs.mkdtempSync(path.join(os.tmpdir(), 'sync-illustrations-mirror-'));
    const outcome = await sync();

    if (outcome.status !== 'synced') throw new Error(outcome.status);
    expect(outcome.backfilled.map((item) => item.name)).toEqual(['twoFactor']);
    expect(outcome.diff.results).toEqual({ added: [], updated: [], renamed: [], deleted: [] });
    expect(fs.readFileSync(path.join(mirrorDir, 'spotIcon/twoFactor.svg'), 'utf-8')).toBe(
      read('spotIcon/svg/light/twoFactor-1.svg'),
    );
    // Only the mirror was missing files; the package's own outputs were left alone, and the
    // mirror's include filter kept the hero square out of it.
    expect(fs.existsSync(path.join(mirrorDir, 'heroSquare'))).toBe(false);
    expect(files('spotIcon')).toEqual(assetFiles('twoFactor-1'));
    expect(entry('twoFactor')?.version).toBe(1);
  });

  it('is idempotent: the next run has nothing to do', async () => {
    expect((await sync()).status).toBe('nothing-to-sync');
    expect((await sync(true)).status).toBe('no-changes');
  });

  it('repairs a destination whose files were deleted, including under syncAll', async () => {
    fs.rmSync(path.join(dir, 'spotIcon/svgJs'), { recursive: true });
    const outcome = await sync(true);

    if (outcome.status !== 'synced') throw new Error(outcome.status);
    expect(outcome.backfilled.map((item) => item.name)).toEqual(['twoFactor']);
    expect(files('spotIcon')).toEqual(assetFiles('twoFactor-1'));
    expect(read('spotIcon/data/svgJsMap.ts')).toContain(`twoFactor-1.js`);
    expect((await sync()).status).toBe('nothing-to-sync');
  });

  it('keeps every destination complete when the mirror is wiped and the artwork changes at once', async () => {
    fs.rmSync(mirrorDir as string, { recursive: true });
    const [current] = source.components;
    source.components[0] = { ...current, updatedAt: later() };
    source.svgs[current.nodeId] = source.svgs[current.nodeId].replace('#0052FF', '#E13947');
    const outcome = await sync();

    if (outcome.status !== 'synced') throw new Error(outcome.status);
    // A changed illustration is written everywhere as a change, so it is not reported as backfilled.
    expect(outcome.diff.results.updated.map((item) => item.name)).toEqual(['twoFactor']);
    expect(outcome.backfilled).toEqual([]);
    expect(entry('twoFactor')?.version).toBe(2);
    expect(fs.readFileSync(path.join(mirrorDir as string, 'spotIcon/twoFactor.svg'), 'utf-8')).toBe(
      read('spotIcon/svg/light/twoFactor-2.svg'),
    );
    expect((await sync()).status).toBe('nothing-to-sync');
  });
});
