import { selectDeleted } from '@cds/figma-api/syncCore';
import { Ledger } from '@cds/figma-api/syncLedger';
import type { ExaminedSummary, RejectedAsset } from '@cds/figma-api/syncReport';
import fs from 'node:fs';

import type { Sink, SinkChanges } from './sinks/Sink';
import type { SyncIconsConfig } from './config';
import {
  applyDiff,
  buildFetchedIconSets,
  diffIconSets,
  hasIconChanges,
  type IconSetChange,
  type IconSetDiff,
  type IconSyncResults,
  recordDiff,
  type Rejection,
  toSyncResults,
  validateIconSets,
  withoutIconSets,
} from './diff';
import { assertSvgFilesExist, readManifest, writeManifest } from './manifest';
import { optimizeSvg } from './optimizeSvg';
import { toRejectedAsset } from './report';
import { emptyLibraryProblem, selectIconSetsToFetch, sortLooseComponents } from './select';

export type SyncOptions = {
  config: SyncIconsConfig;
  /** Where the sync writes. They run in this order, the `assets` sinks before the manifest is saved. */
  sinks: Sink[];
  fullCompare?: boolean;
  /** For the date of the manifest; defaults to the current time. */
  now?: () => Date;
  log?: (message: string) => void;
};

export type SyncOutcome = {
  status: 'nothing-to-sync' | 'synced';
  results: IconSyncResults;
  /** What happened to everything the sync found in Figma; the report is built from it. */
  ledger: Ledger;
  /** How many component sets and components the source listed. */
  seen: number;
  /** Icon sets that were skipped because designers need to fix them in Figma. */
  rejected: RejectedAsset[];
  examined: ExaminedSummary;
};

const toOutcome = (
  status: SyncOutcome['status'],
  results: IconSyncResults,
  ledger: Ledger,
  seen: number,
): SyncOutcome => ({
  status,
  results,
  ledger,
  seen,
  rejected: ledger.rejected(),
  examined: { seen, ignored: ledger.ignoredGroups() },
});

const noResults = (): IconSyncResults => ({
  newIconSets: [],
  deletedIconSets: [],
  renamedIconSets: [],
  updatedIconSets: [],
});

const toSinkChanges = (
  config: SyncIconsConfig,
  manifest: SinkChanges['manifest'],
  diff: IconSetDiff,
): SinkChanges => ({
  config,
  manifest,
  write: diff.changes.flatMap((change) =>
    change.kind === 'unchanged' ? [] : [{ iconSet: change.iconSet, icons: change.icons }],
  ),
  remove: [
    ...diff.changes.flatMap((change) => (change.kind === 'changed' ? [change.oldIconSet] : [])),
    ...diff.deleted,
  ],
});

const logChange = (change: IconSetChange, log: (message: string) => void) => {
  if (change.kind === 'new') log('  [NEW] Icon set is new, creating svg output files...');
  if (change.kind === 'changed') {
    log('  [CHANGED] Icon set has changed, deleting and recreating svg output files...');
  }
};

export async function runSync({
  config,
  sinks,
  fullCompare = false,
  now = () => new Date(),
  log = console.log,
}: SyncOptions): Promise<SyncOutcome> {
  log('Starting icon sync...');
  log('Validating config settings...');
  fs.mkdirSync(config.outputSvgPath, { recursive: true });
  fs.mkdirSync(config.outputDataPath, { recursive: true });

  log('Loading manifest file...');
  const oldManifest = readManifest(config.manifestPath);

  log('Confirming that manifest svg output files exist...');
  assertSvgFilesExist(oldManifest, config.outputSvgPath);

  log('Fetching file data from Figma...');
  const [componentSets, looseComponents] = await Promise.all([
    config.source.listComponentSets(),
    config.source.listLooseComponents(),
  ]);
  const remoteIds = new Set(componentSets.map((componentSet) => componentSet.node_id));
  // Components outside sets are reported, not synced; a published icon they replace keeps its version.
  const loose = sortLooseComponents(looseComponents, oldManifest.iconSets, remoteIds);
  const emptyLibrary = emptyLibraryProblem(componentSets.length, oldManifest.iconSets.length);
  if (emptyLibrary) throw Error(emptyLibrary);
  // Deleting a set bumps no `updated_at`, so deletions are found here and not from the fetched sets.
  const deletedIconSets = selectDeleted(oldManifest.iconSets, {
    identity: ({ nodeId }) => nodeId,
    present: remoteIds,
    kept: loose.keepNodeIds,
  });
  const seen = componentSets.length + looseComponents.length;

  const ledger = new Ledger();
  for (const { reason, items } of loose.ignored) ledger.ignored(reason, items);
  const reject = (rejection: Rejection) => {
    console.warn(`  [REJECTED] ${rejection.message}`);
    ledger.skipped(toRejectedAsset(config.figmaFileId, rejection));
  };

  const idsToFetch = new Set(
    selectIconSetsToFetch(componentSets, fullCompare ? undefined : oldManifest.iconSets),
  );
  const nodes = await config.source.fetchSetNodes(
    componentSets.filter((componentSet) => idsToFetch.has(componentSet.node_id)),
  );
  const numberOfNodes = Object.values(nodes).length;

  const finishSinks = sinks.filter(({ stage }) => stage === 'finish');
  const assetSinks = sinks.filter(({ stage }) => stage === 'assets');

  if (numberOfNodes === 0 && deletedIconSets.length === 0) {
    if (fullCompare) throw Error('No icon sets found in Figma');
    log('Figma file has no updates, skipping icon sync...');
    const unchanged = toSinkChanges(config, oldManifest, { changes: [], deleted: [] });
    for (const sink of finishSinks.filter(({ runsWithoutChanges }) => runsWithoutChanges)) {
      await sink.apply(unchanged);
    }
    return toOutcome('nothing-to-sync', noResults(), ledger, seen);
  }

  log(`\nProcessing ${numberOfNodes} updated icon sets from Figma...`);
  const { accepted, rejections: ruleRejections } = validateIconSets({
    nodes,
    previous: oldManifest.iconSets,
    log,
  });
  ruleRejections.forEach(reject);

  const variantIds = accepted.flatMap(({ variants }) => variants.map(({ id }) => id));
  log(`\nDownloading ${variantIds.length} svg assets...`);
  const rawSvgs = await config.source.fetchSvgs(variantIds);

  const { fetched, rejections: assetRejections } = buildFetchedIconSets({
    accepted,
    rawSvgs,
    optimize: optimizeSvg,
  });
  assetRejections.forEach(reject);

  // Every sink plans what it is about to write before any of them writes. An icon set a sink
  // cannot write is rejected and left as it was published, and the sinks plan again without it.
  let diff = diffIconSets({ fetched, deleted: deletedIconSets });
  let manifest = applyDiff(oldManifest, diff);
  let plans = await Promise.all(
    assetSinks.map((sink) => sink.plan(toSinkChanges(config, manifest, diff))),
  );
  const failures = plans.flatMap((plan) => plan.failures);
  if (failures.length > 0) {
    for (const { nodeId, name, message } of failures) {
      reject({ name, nodeId, message, category: 'invalid-asset' });
    }
    diff = withoutIconSets(diff, new Set(failures.map(({ nodeId }) => nodeId)));
    manifest = applyDiff(oldManifest, diff);
    plans = await Promise.all(
      assetSinks.map((sink) => sink.plan(toSinkChanges(config, manifest, diff))),
    );
    const remaining = plans.flatMap((plan) => plan.failures);
    if (remaining.length > 0) {
      throw Error(remaining.map(({ name, message }) => `${name}: ${message}`).join('\n'));
    }
  }

  for (const change of diff.changes) logChange(change, log);
  log(`\nProcessing ${deletedIconSets.length} deleted icon sets...`);
  for (const iconSet of diff.deleted) log(` Deleting icon set: ${iconSet.name} ${iconSet.nodeId}`);

  const results = toSyncResults(diff);
  recordDiff(ledger, diff);

  log('\nGenerating output files...');
  for (const plan of plans) await plan.commit();

  log('Updating manifest...');
  // Rejected icon sets are not in the manifest, so they are fetched and reported until designers fix them
  // The date moves only when icon sets changed, so a run that finds nothing leaves manifest.json
  // as it was and the workflow has nothing to push.
  manifest.lastUpdated = hasIconChanges(results) ? now().toISOString() : oldManifest.lastUpdated;
  writeManifest(config.manifestPath, manifest);

  const finished = toSinkChanges(config, manifest, diff);
  for (const sink of finishSinks) await sink.apply(finished);

  return toOutcome('synced', results, ledger, seen);
}
