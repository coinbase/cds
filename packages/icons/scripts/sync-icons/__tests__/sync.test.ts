import { changedBetween, snapshotChanges, unexplainedFiles } from '@cds/figma-api/changedFiles';
import { execFileSync } from 'node:child_process';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';

import type { SyncIconsConfig } from '../config';
import { explainIconFile, generatedPaths } from '../explainFile';
import { lastAllowedUnicode, type Manifest } from '../manifest';
import { buildSyncReport, writeReport } from '../report';
import { CodeConnectSink } from '../sinks/CodeConnectSink';
import { ExpoSvgMapSink } from '../sinks/ExpoSvgMapSink';
import { IconDataSink } from '../sinks/IconDataSink';
import { IconFontSink } from '../sinks/IconFontSink';
import { SvgFilesSink } from '../sinks/SvgFilesSink';
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
 * golden files were recorded from the sync as it ran before it was split into sources, a diff and
 * sinks, so they show that the split changed no output. Only the network, Code Connect and the
 * expo codegen command are replaced.
 */

const fixedDate = new Date('2026-11-23T12:00:00.000Z');

const createRun = () => {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), 'icons-sync-'));
  const source = new InMemorySource();
  const codeConnect = jest.fn(async () => undefined);
  const expoCommands: string[] = [];
  const config: SyncIconsConfig = {
    source,
    figmaFileId: scenarioFigmaFileId,
    repoRoot: root,
    manifestPath: path.join(root, 'packages/icons/manifest.json'),
    outputSvgPath: path.join(root, 'packages/icons/src/svgs'),
    outputDataPath: path.join(root, 'packages/icons/src'),
    outputFontPath: path.join(root, 'packages/icons/src/fonts'),
    outputFontName: 'CoinbaseIcons',
    outputFontCssFileName: 'icon-font',
    fullCompare: false,
  };
  const sinks = () => [
    new SvgFilesSink(),
    new IconFontSink(),
    new IconDataSink(),
    new CodeConnectSink(codeConnect),
    new ExpoSvgMapSink((command) => expoCommands.push(command)),
  ];
  let step = 0;
  const sync = async (fullCompare = false) => {
    step++;
    const outcome = await runSync({ config, sinks: sinks(), fullCompare, now: () => fixedDate });
    writeReport(buildSyncReport(outcome), {
      repoRoot: root,
      reportPath: path.join(root, `report-${step}.json`),
    });
    return outcome;
  };
  const readManifest = () => JSON.parse(fs.readFileSync(config.manifestPath, 'utf-8')) as Manifest;
  const writeManifest = (manifest: Manifest) =>
    fs.writeFileSync(config.manifestPath, JSON.stringify(manifest));
  return { root, source, config, codeConnect, expoCommands, sync, readManifest, writeManifest };
};

describe('icon sync end to end', () => {
  beforeEach(() => {
    jest.spyOn(console, 'log').mockImplementation(() => undefined);
    jest.spyOn(console, 'warn').mockImplementation(() => undefined);
  });

  afterEach(() => jest.restoreAllMocks());

  it('writes the same files as the sync before it was split, over four runs', async () => {
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
    const { status, results, rejected, examined } = await run.sync();

    expect(status).toBe('synced');
    expect(results.newIconSets.map(({ name }) => name)).toEqual(['send']);
    expect(results.updatedIconSets.map(({ name }) => name)).toEqual(['add', 'minus']);
    expect(results.renamedIconSets.map(({ name, oldName }) => [oldName, name])).toEqual([
      ['remove', 'minus'],
    ]);
    expect(results.deletedIconSets.map(({ name }) => name)).toEqual(['cash']);
    expect(rejected.map(({ category, name }) => `${category}:${name}`)).toEqual([
      'invalid-variant:broken',
      'duplicate-name:add',
    ]);
    expect(examined.seen).toBe(6);
    expect(examined.ignored[0].items).toEqual([{ name: looseHelper.name, url: looseHelper.url }]);
  });

  it('keeps one ledger entry per outcome, in the words of git status', async () => {
    const run = createRun();
    run.source.sets = firstLibrary();
    await run.sync();

    run.source.sets = secondLibrary();
    run.source.loose = [looseHelper];
    const { ledger } = await run.sync();

    expect(ledger.entries.map(({ status, name }) => `${status} ${name}`)).toEqual([
      '! Icon / helper',
      'U broken',
      'U add',
      'M add',
      'R minus',
      'M minus',
      'A send',
      'D cash',
    ]);
    expect(ledger.explains('remove')).toBe(true);
    expect(ledger.explains('broken')).toBe(false);
  });

  it('only records an icon set again when Figma touched it and nothing visible changed', async () => {
    const run = createRun();
    run.source.sets = firstLibrary();
    await run.sync();

    run.source.sets = firstLibrary().map((set) =>
      set.nodeId === '1:1' ? { ...set, updatedAt: '2026-05-01T00:00:00.000Z' } : set,
    );
    const { ledger, results } = await run.sync();

    expect(ledger.hasChanges()).toBe(false);
    expect(ledger.hasRefreshed()).toBe(true);
    expect(results.updatedIconSets).toEqual([]);
    expect(run.readManifest().iconSets.find(({ name }) => name === 'add')?.lastUpdated).toBe(
      '2026-05-01T00:00:00.000Z',
    );
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
    const { results } = await run.sync();

    expect(run.source.requestedSetIds).toEqual(['1:1']);
    expect(run.source.requestedSvgIds).toHaveLength(6);
    expect(results.updatedIconSets.map(({ name }) => name)).toEqual(['add']);
  });

  it('does nothing, but still runs Code Connect, when no icon set changed', async () => {
    const run = createRun();
    run.source.sets = firstLibrary();
    await run.sync();
    const before = readTree(run.root);
    run.source.requestedSetIds = [];

    const { status, results } = await run.sync();

    expect(status).toBe('nothing-to-sync');
    expect(run.source.requestedSetIds).toEqual([]);
    expect(results.newIconSets).toEqual([]);
    expect(run.codeConnect).toHaveBeenCalledTimes(2);
    expect(run.expoCommands).toHaveLength(1);
    const withoutReports = (tree: ReturnType<typeof readTree>) =>
      Object.fromEntries(Object.entries(tree).filter(([file]) => !file.startsWith('report-')));
    const after = withoutReports(readTree(run.root));
    const firstTree = withoutReports(before);
    expect(after).toEqual(firstTree);
  });

  it('finds a deleted icon set when no other icon set changed', async () => {
    const run = createRun();
    run.source.sets = firstLibrary();
    await run.sync();
    run.source.requestedSetIds = [];

    run.source.sets = firstLibrary().filter(({ nodeId }) => nodeId !== '1:3');
    const { status, results } = await run.sync();

    expect(status).toBe('synced');
    expect(run.source.requestedSetIds).toEqual([]);
    expect(results.deletedIconSets.map(({ name }) => name)).toEqual(['cash']);
    expect(run.readManifest().iconSets.map(({ name }) => name)).toEqual(['add', 'remove']);
    expect(fs.existsSync(path.join(run.config.outputSvgPath, 'cash-24-active.svg'))).toBe(false);
    const plan = fs.readdirSync(path.join(run.root, '.nx/version-plans'))[0];
    expect(fs.readFileSync(path.join(run.root, '.nx/version-plans', plan), 'utf-8')).toContain(
      'icons: major',
    );
  });

  it('stops instead of deleting every icon when Figma returns no icon sets', async () => {
    const run = createRun();
    run.source.sets = firstLibrary();
    await run.sync();
    const before = readTree(run.root);

    run.source.sets = [];

    await expect(run.sync()).rejects.toThrow('Figma returned no icon sets, but 3 are published');
    expect(readTree(run.root)).toEqual(before);
  });

  it('keeps giving every new icon the next free code point, and keeps the code points of old ones', async () => {
    const run = createRun();
    run.source.sets = firstLibrary();
    await run.sync();
    const first = run.readManifest();

    run.source.sets = [...firstLibrary(), iconSet('ui/send', '1:4', 6)];
    await run.sync();
    const second = run.readManifest();

    const unicodes = (manifest: Manifest) =>
      manifest.iconSets.flatMap(({ name, svgs }) => svgs.map((svg) => [svg.name, svg.unicode]));
    expect(unicodes(second).slice(0, unicodes(first).length)).toEqual(unicodes(first));
    expect(second.lastUnicode).toBe(first.lastUnicode + 6);
  });
});

describe('icon sync failures', () => {
  beforeEach(() => {
    jest.spyOn(console, 'log').mockImplementation(() => undefined);
    jest.spyOn(console, 'warn').mockImplementation(() => undefined);
  });

  afterEach(() => jest.restoreAllMocks());

  it('rejects an icon set whose SVG cannot be optimized and leaves the other icon sets alone', async () => {
    const run = createRun();
    run.source.sets = firstLibrary();
    await run.sync();

    run.source.sets = [
      ...firstLibrary(),
      iconSet('ui/send', '1:4', 6, {
        variants: iconSet('ui/send', '1:4', 6).variants.map((variant, index) =>
          index === 0 ? { ...variant, svg: '<svg><path d="M0 0" ' } : variant,
        ),
      }),
      iconSet('ui/plus', '1:5', 7),
    ];
    const { rejected, results } = await run.sync();

    expect(rejected.map(({ category, name }) => `${category}:${name}`)).toEqual([
      'invalid-asset:send',
    ]);
    expect(rejected[0].message).toContain('cannot be optimized');
    expect(results.newIconSets.map(({ name }) => name)).toEqual(['plus']);
    expect(run.readManifest().iconSets.map(({ name }) => name)).not.toContain('send');
    expect(fs.existsSync(path.join(run.config.outputSvgPath, 'send-24-active.svg'))).toBe(false);
  });

  it('rejects an icon set whose name the icon font cannot map back, before writing any file', async () => {
    const run = createRun();
    run.source.sets = firstLibrary();
    await run.sync();

    run.source.sets = [
      ...firstLibrary(),
      iconSet('ui/add-circle', '1:4', 6),
      iconSet('ui/plus', '1:5', 7),
    ];
    const { rejected, results } = await run.sync();

    expect(rejected.map(({ category, name }) => `${category}:${name}`)).toEqual([
      'invalid-asset:add-circle',
    ]);
    expect(rejected[0].message).toContain('contains "-"');
    expect(results.newIconSets.map(({ name }) => name)).toEqual(['plus']);
    expect(fs.existsSync(path.join(run.config.outputSvgPath, 'add-circle-24-active.svg'))).toBe(
      false,
    );
  });

  it('rejects an icon set that no code point is left for, and keeps the ones that fit', async () => {
    const run = createRun();
    run.source.sets = firstLibrary();
    await run.sync();
    run.writeManifest({ ...run.readManifest(), lastUnicode: lastAllowedUnicode - 6 });

    run.source.sets = [
      ...firstLibrary(),
      iconSet('ui/send', '1:4', 6),
      iconSet('ui/plus', '1:5', 7),
    ];
    const { rejected, results } = await run.sync();

    expect(rejected.map(({ category, name }) => `${category}:${name}`)).toEqual([
      'invalid-asset:plus',
    ]);
    expect(rejected[0].message).toContain('no code point left');
    expect(results.newIconSets.map(({ name }) => name)).toEqual(['send']);
    expect(run.readManifest().lastUnicode).toBe(lastAllowedUnicode);
  });
});

describe('icon sync changed files', () => {
  const git = (cwd: string, ...args: string[]) =>
    execFileSync(
      'git',
      [
        '-c',
        'user.name=test',
        '-c',
        'user.email=test@example.test',
        '-c',
        'commit.gpgsign=false',
        ...args,
      ],
      { cwd, encoding: 'utf-8' },
    );

  /** Runs the icon sync and lists the changed files that nothing in the report explains. */
  const syncAndCheck = async (run: ReturnType<typeof createRun>) => {
    const before = snapshotChanges(run.root, generatedPaths);
    const { ledger } = await run.sync();
    const after = snapshotChanges(run.root, generatedPaths);
    return unexplainedFiles({
      changed: changedBetween(before, after),
      ledger,
      explain: explainIconFile,
    });
  };

  beforeEach(() => {
    jest.spyOn(console, 'log').mockImplementation(() => undefined);
    jest.spyOn(console, 'warn').mockImplementation(() => undefined);
  });

  afterEach(() => jest.restoreAllMocks());

  it('explains every file of a sync that changed icons', async () => {
    const run = createRun();
    git(run.root, 'init', '-q');
    run.source.sets = firstLibrary();
    expect(await syncAndCheck(run)).toEqual([]);
    git(run.root, 'add', '-A');
    git(run.root, 'commit', '-qm', 'first');

    run.source.sets = secondLibrary();
    expect(await syncAndCheck(run)).toEqual([]);
  });

  it('lists a Code Connect file that changed while no icon did', async () => {
    const run = createRun();
    git(run.root, 'init', '-q');
    const batch = path.join(run.root, 'packages/web/src/icons/__figma__/icons.figma.batch.json');
    let calls = 0;
    run.codeConnect.mockImplementation(async () => {
      fs.mkdirSync(path.dirname(batch), { recursive: true });
      fs.writeFileSync(batch, `{"call":${++calls}}`);
    });
    run.source.sets = firstLibrary();
    await run.sync();
    git(run.root, 'add', '-A');
    git(run.root, 'commit', '-qm', 'first');

    expect(await syncAndCheck(run)).toEqual([
      'packages/web/src/icons/__figma__/icons.figma.batch.json',
    ]);
  });
});
