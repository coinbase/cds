/**
 * @jest-environment node
 */
import { changedBetween, snapshotFiles, unexplainedFiles } from '@cds/figma-api/changedFiles';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';

import { createConfig } from '../config';
import { explainIconFile } from '../explainFile';
import { lastAllowedUnicode, type Manifest } from '../manifest';
import { profile } from '../profile';
import { buildSyncReport, writeReport } from '../report';
import { InMemorySource } from '../source/InMemorySource';
import { runSync } from '../sync';

import golden1 from './__fixtures__/golden/step1.json';
import golden2 from './__fixtures__/golden/step2.json';
import golden3 from './__fixtures__/golden/step3.json';
import golden4 from './__fixtures__/golden/step4.json';
import {
  firstLibrary,
  fourthLibrary,
  iconSet,
  looseHelper,
  scenarioFigmaFileId,
  secondLibrary,
  thirdLibrary,
} from './__fixtures__/iconScenario';
import { readTree } from './__fixtures__/readTree';

/**
 * Drives the whole icon sync, from the list of component sets to the files on disk, against an
 * in-memory source that is changed between runs the way designers change the Figma library. The
 * same test runs for every package; the golden files are what its sync writes. Only the network,
 * Code Connect and the expo codegen command are replaced.
 */

const mockCodeConnect = jest.fn(async (_repoRoot: string) => undefined);
jest.mock('../../sync-icon-code-connect/index', () => ({
  syncIconCodeConnect: (repoRoot: string) => mockCodeConnect(repoRoot),
}));
jest.mock('node:child_process', () => ({ execSync: jest.fn() }));

const fixedDate = new Date('2026-11-23T12:00:00.000Z');
const sizeCount = profile.variants.sizes.length;
const packageDir = profile.generated.packageDir;

const createRun = () => {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), 'icons-sync-'));
  const source = new InMemorySource();
  const config = createConfig(root, { source, figmaFileId: scenarioFigmaFileId });
  let step = 0;
  const sync = async (fullCompare = false) => {
    step++;
    const outcome = await runSync({
      config,
      sinks: config.sinks,
      fullCompare,
      now: () => fixedDate,
    });
    writeReport(buildSyncReport(outcome, { figmaFileId: config.figmaFileId }), {
      repoRoot: root,
      reportPath: path.join(root, `report-${step}.json`),
    });
    return outcome;
  };
  const readManifest = () => JSON.parse(fs.readFileSync(config.manifestPath, 'utf-8')) as Manifest;
  const writeManifest = (manifest: Manifest) =>
    fs.writeFileSync(config.manifestPath, JSON.stringify(manifest));
  const svgExists = (name: string) =>
    fs.existsSync(
      path.join(config.outputSvgPath, `${name}-${profile.variants.sizes[0]}-active.svg`),
    );
  return { root, source, config, sync, readManifest, writeManifest, svgExists };
};

const silence = () => {
  beforeEach(() => {
    jest.spyOn(console, 'log').mockImplementation(() => undefined);
    jest.spyOn(console, 'warn').mockImplementation(() => undefined);
    mockCodeConnect.mockClear();
  });
  afterEach(() => jest.restoreAllMocks());
};

const withoutReports = (tree: ReturnType<typeof readTree>) =>
  Object.fromEntries(Object.entries(tree).filter(([file]) => !file.startsWith('report-')));

const brokenSvg = (set: ReturnType<typeof iconSet>) => ({
  ...set,
  variants: set.variants.map((variant, index) =>
    index === 0 ? { ...variant, svg: '<svg><path d="M0 0" ' } : variant,
  ),
});

describe('icon sync end to end', () => {
  silence();

  it('writes the files of the golden runs, over four syncs', async () => {
    const run = createRun();

    run.source.sets = firstLibrary();
    expect((await run.sync()).status).toBe('synced');
    expect(readTree(run.root)).toEqual(golden1);

    run.source.sets = secondLibrary();
    await run.sync();
    expect(readTree(run.root)).toEqual(golden2);

    run.source.sets = thirdLibrary();
    run.source.loose = [looseHelper];
    await run.sync();
    expect(readTree(run.root)).toEqual(golden3);

    run.source.sets = fourthLibrary();
    await run.sync();
    expect(readTree(run.root)).toEqual(golden4);
  });

  it('reports what changed, what was skipped and what was left out', async () => {
    const run = createRun();
    run.source.sets = firstLibrary();
    await run.sync();

    run.source.sets = secondLibrary();
    run.source.loose = [looseHelper];
    const { status, changes, rejected, ignored, seen } = await run.sync();

    expect(status).toBe('synced');
    expect(changes.added).toEqual([{ name: 'send' }]);
    expect(changes.updated).toEqual([
      { name: 'add' },
      ...(profile.publishesDescriptions ? [{ name: 'minus' }] : []),
    ]);
    expect(changes.renamed).toEqual([
      { name: 'minus', oldName: 'remove' },
      { name: 'Plus', oldName: 'plus' },
    ]);
    expect(changes.deleted).toEqual([{ name: 'cash' }]);
    expect(rejected.map(({ category, name }) => `${category}:${name}`)).toEqual([
      'invalid-name:ui/bad name',
      'duplicate-name:add',
      'duplicate-name:send',
      'invalid-variant:broken',
    ]);
    expect(seen).toBe(10);
    expect(ignored[0].items).toEqual([{ name: looseHelper.name, url: looseHelper.url }]);
  });

  it('keeps an icon that was re-created under the same name, and finds a rename by its node id', async () => {
    const run = createRun();
    run.source.sets = firstLibrary();
    await run.sync();

    run.source.sets = secondLibrary();
    const { changes } = await run.sync();

    const manifest = run.readManifest();
    expect(manifest.iconSets.find(({ name }) => name === 'stack')?.nodeId).toBe('1:10');
    expect(changes.deleted.map(({ name }) => name)).not.toContain('stack');
    expect(changes.added.map(({ name }) => name)).not.toContain('stack');
    expect(manifest.iconSets.find(({ name }) => name === 'minus')?.nodeId).toBe('1:2');
    expect(run.svgExists('remove')).toBe(false);
    expect(run.svgExists('minus')).toBe(true);
  });

  it('keeps the published icon set when Figma has a second one with the same icon name', async () => {
    const run = createRun();
    run.source.sets = firstLibrary();
    await run.sync();

    run.source.sets = [...firstLibrary(), iconSet('nav/add', '1:11', 8)];
    const { rejected, changes } = await run.sync();

    expect(rejected.map(({ category, name }) => `${category}:${name}`)).toEqual([
      'duplicate-name:add',
    ]);
    expect(changes.added).toEqual([]);
    expect(run.readManifest().iconSets.find(({ name }) => name === 'add')?.nodeId).toBe('1:1');
  });

  it('only records an icon set again when nothing visible changed', async () => {
    const run = createRun();
    run.source.sets = firstLibrary();
    await run.sync();

    run.source.sets = firstLibrary().map((set) =>
      set.nodeId === '1:1' ? { ...set, updatedAt: '2026-05-01T00:00:00.000Z' } : set,
    );
    const { changes, refreshed } = await run.sync();

    expect(changes.updated).toEqual([]);
    expect(refreshed).toBe(true);
    expect(run.readManifest().iconSets.find(({ name }) => name === 'add')?.lastUpdated).toBe(
      '2026-05-01T00:00:00.000Z',
    );
  });

  it('counts a new description as a change only where the package publishes descriptions', async () => {
    const run = createRun();
    run.source.sets = firstLibrary();
    await run.sync();

    run.source.sets = firstLibrary().map((set) =>
      set.nodeId === '1:1'
        ? { ...set, description: 'a new description', updatedAt: '2026-05-01T00:00:00.000Z' }
        : set,
    );
    const { changes, refreshed } = await run.sync();

    expect(changes.updated).toEqual(profile.publishesDescriptions ? [{ name: 'add' }] : []);
    expect(refreshed).toBe(!profile.publishesDescriptions);
    expect(run.readManifest().iconSets.find(({ name }) => name === 'add')?.description).toBe(
      'a new description',
    );
  });

  it('writes a description from Figma as text, whatever characters it has', async () => {
    // Only a package that publishes descriptions writes them.
    if (!profile.publishesDescriptions) return;
    const run = createRun();
    const description = "x': []}; globalThis.injected = true; const rest = {'y, it's \\ \"quoted\"";
    run.source.sets = [{ ...iconSet('ui/add', '1:1', 2), description }];
    await run.sync();

    const file = fs.readFileSync(
      path.join(run.config.outputDataPath, 'descriptionMap.ts'),
      'utf-8',
    );
    const literal = file.slice(file.indexOf('= {') + 2, file.lastIndexOf(';'));
    const descriptionMap = new Function(`return ${literal}`)();
    expect(descriptionMap).toEqual({
      "x': []}; globalThis.injected = true; const rest = {'y": ['add'],
      'it\'s \\ "quoted"': ['add'],
    });
    expect((globalThis as { injected?: boolean }).injected).toBeUndefined();
  });

  it('downloads only the icon sets that changed, and leaves the rest alone', async () => {
    const run = createRun();
    run.source.sets = firstLibrary();
    await run.sync();
    run.source.requestedSetIds = [];
    run.source.requestedSvgIds = [];

    run.source.sets = firstLibrary().map((set) =>
      set.nodeId === '1:1'
        ? iconSet('ui/add', '1:1', 9, { updatedAt: '2026-04-01T00:00:00.000Z' })
        : set,
    );
    const { changes } = await run.sync();

    expect(run.source.requestedSetIds).toEqual(['1:1']);
    expect(run.source.requestedSvgIds).toHaveLength(sizeCount * 2);
    expect(changes.updated).toEqual([{ name: 'add' }]);
  });

  it('does nothing, but still runs Code Connect, when no icon set changed', async () => {
    const run = createRun();
    run.source.sets = firstLibrary();
    await run.sync();
    const before = withoutReports(readTree(run.root));
    run.source.requestedSetIds = [];

    const { status, changes } = await run.sync();

    expect(status).toBe('nothing-to-sync');
    expect(run.source.requestedSetIds).toEqual([]);
    expect(changes.added).toEqual([]);
    expect(mockCodeConnect).toHaveBeenCalledTimes(2);
    expect(withoutReports(readTree(run.root))).toEqual(before);
  });

  it('finds a deleted icon set when no other icon set changed', async () => {
    const run = createRun();
    run.source.sets = firstLibrary();
    await run.sync();
    run.source.requestedSetIds = [];

    run.source.sets = firstLibrary().filter(({ nodeId }) => nodeId !== '1:3');
    const { status, changes } = await run.sync();

    expect(status).toBe('synced');
    expect(run.source.requestedSetIds).toEqual([]);
    expect(changes.deleted).toEqual([{ name: 'cash' }]);
    expect(run.readManifest().iconSets.map(({ name }) => name)).not.toContain('cash');
    expect(run.svgExists('cash')).toBe(false);
  });

  it('stops instead of deleting every icon when Figma returns no icon sets', async () => {
    const run = createRun();
    run.source.sets = firstLibrary();
    await run.sync();
    const before = readTree(run.root);

    run.source.sets = [];

    await expect(run.sync()).rejects.toThrow('Figma returned no icon sets, but 5 are published');
    expect(readTree(run.root)).toEqual(before);
  });

  it('syncs an icon name with a hyphen, which the font finds again from the end of the name', async () => {
    const run = createRun();
    run.source.sets = [...firstLibrary(), iconSet('ui/add-circle', '1:12', 6)];
    const { rejected, changes } = await run.sync();

    expect(rejected).toEqual([]);
    expect(changes.added.map(({ name }) => name)).toContain('add-circle');
    const glyphMap = fs.readFileSync(path.join(run.config.outputDataPath, 'glyphMap.ts'), 'utf-8');
    expect(glyphMap).toContain(`'add-circle-${profile.variants.sizes[0]}-active'`);
  });

  it('gives every new icon the next free code point, and keeps the code points of old ones', async () => {
    const run = createRun();
    run.source.sets = firstLibrary();
    await run.sync();
    const first = run.readManifest();

    run.source.sets = [...firstLibrary(), iconSet('ui/send', '1:4', 6)];
    await run.sync();
    const second = run.readManifest();

    const unicodes = (manifest: Manifest) =>
      Object.fromEntries(
        manifest.iconSets.flatMap(({ svgs }) => svgs.map((svg) => [svg.name, svg.unicode])),
      );
    expect(unicodes(second)).toMatchObject(unicodes(first));
    expect(second.lastUnicode).toBe(first.lastUnicode + sizeCount * 2);
  });
});

describe('icon sync failures', () => {
  silence();

  it('rejects a new icon set whose SVG cannot be optimized and leaves the other icon sets alone', async () => {
    const run = createRun();
    run.source.sets = firstLibrary();
    await run.sync();

    run.source.sets = [
      ...firstLibrary(),
      brokenSvg(iconSet('ui/send', '1:4', 6)),
      iconSet('ui/minus', '1:12', 7),
    ];
    const { rejected, changes } = await run.sync();

    expect(rejected.map(({ category, name }) => `${category}:${name}`)).toEqual([
      'invalid-asset:send',
    ]);
    expect(rejected[0].message).toContain('cannot be optimized');
    expect(changes.added).toEqual([{ name: 'minus' }]);
    expect(run.readManifest().iconSets.map(({ name }) => name)).not.toContain('send');
    expect(run.svgExists('send')).toBe(false);
  });

  it('keeps what was published for an icon set whose new SVG cannot be optimized', async () => {
    const run = createRun();
    run.source.sets = firstLibrary();
    await run.sync();
    const published = run.readManifest().iconSets.find(({ name }) => name === 'add');

    run.source.sets = firstLibrary().map((set) =>
      set.nodeId === '1:1'
        ? brokenSvg(iconSet('ui/add', '1:1', 9, { updatedAt: '2026-04-01T00:00:00.000Z' }))
        : set,
    );
    const { rejected, changes } = await run.sync();

    expect(rejected.map(({ category, name }) => `${category}:${name}`)).toEqual([
      'invalid-asset:add',
    ]);
    expect(changes.updated).toEqual([]);
    expect(run.readManifest().iconSets.find(({ name }) => name === 'add')).toEqual(published);
  });

  it('rejects an icon set that no code point is left for, and keeps the ones that fit', async () => {
    const run = createRun();
    run.source.sets = firstLibrary();
    await run.sync();
    run.writeManifest({ ...run.readManifest(), lastUnicode: lastAllowedUnicode - sizeCount * 2 });

    run.source.sets = [
      ...firstLibrary(),
      iconSet('ui/send', '1:4', 6),
      iconSet('ui/minus', '1:12', 7),
    ];
    const { rejected, changes } = await run.sync();

    expect(rejected.map(({ category, name }) => `${category}:${name}`)).toEqual([
      'invalid-asset:minus',
    ]);
    expect(rejected[0].message).toContain('no code point left');
    expect(changes.added).toEqual([{ name: 'send' }]);
    expect(run.readManifest().lastUnicode).toBe(lastAllowedUnicode);
  });
});

describe('icon sync changed files', () => {
  silence();

  /** Runs the icon sync and lists the changed files that nothing in the report explains. */
  const syncAndCheck = async (run: ReturnType<typeof createRun>) => {
    const before = snapshotFiles(run.root, profile.generated.paths);
    const { changes, refreshed } = await run.sync();
    return unexplainedFiles({
      changed: changedBetween(before, snapshotFiles(run.root, profile.generated.paths)),
      changes,
      refreshed,
      explain: explainIconFile,
    });
  };

  it('explains every file of a sync that changed icons', async () => {
    const run = createRun();
    run.source.sets = firstLibrary();
    expect(await syncAndCheck(run)).toEqual([]);

    run.source.sets = secondLibrary();
    expect(await syncAndCheck(run)).toEqual([]);
  });

  it('lists a Code Connect file that changed while no icon did', async () => {
    const run = createRun();
    const [codeConnectFolder] = profile.generated.fromListing;
    const batch = path.join(run.root, codeConnectFolder, 'icons.figma.batch.json');
    let calls = 0;
    mockCodeConnect.mockImplementation(async () => {
      fs.mkdirSync(path.dirname(batch), { recursive: true });
      fs.writeFileSync(batch, `{"call":${++calls}}`);
    });
    run.source.sets = firstLibrary();
    await run.sync();

    expect(await syncAndCheck(run)).toEqual([`${codeConnectFolder}icons.figma.batch.json`]);
  });
});
