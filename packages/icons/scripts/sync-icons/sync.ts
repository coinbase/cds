import {
  emptyChanges,
  hasChanges,
  type IgnoredGroup,
  type RejectedAsset,
  type SyncChanges,
} from '@cds/figma-api/syncReport';
import fs from 'node:fs';

import type { Sink, SinkChanges } from './sinks/Sink';
import type { SyncIconsConfig } from './config';
import {
  applyDiff,
  buildFetchedIconSets,
  diffIconSets,
  type IconSetDiff,
  toChanges,
  validateIconSets,
  withoutIconSets,
} from './diff';
import { assertSvgFilesExist, readManifest, writeManifest } from './manifest';
import { optimizeSvg } from './optimizeSvg';
import { toRejectedAsset } from './report';
import type { Rejection } from './rules';
import {
  dedupeRemoteIconSets,
  emptyLibraryProblem,
  matchIconSets,
  selectIconSetsToFetch,
  sortLooseComponents,
  toRemoteIconSets,
} from './select';

export type SyncOptions = {
  config: SyncIconsConfig;
  /** Where the sync writes. They run in this order, the `assets` sinks before the manifest is saved. */
  sinks: Sink[];
  fullCompare?: boolean;
  /** For the date of the manifest; defaults to the current time. */
  now?: () => Date;
  log?: (message: string) => void;
};

/** What a sync found in Figma and did with it: the report is made from this. */
export type SyncOutcome = {
  status: 'nothing-to-sync' | 'synced';
  changes: SyncChanges;
  /** Icon sets that were skipped because designers need to fix them in Figma. */
  rejected: RejectedAsset[];
  /** Things the sync looked at and left out on purpose. */
  ignored: IgnoredGroup[];
  /** An icon set was only recorded again (a new date), so the manifest changes. */
  refreshed: boolean;
  /** How many component sets and components the source listed. */
  seen: number;
};

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
    ...diff.changes.flatMap((change) => (change.kind === 'changed' ? [change.published] : [])),
    ...diff.deleted,
  ],
});

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
  const emptyLibrary = emptyLibraryProblem(componentSets.length, oldManifest.iconSets.length);
  if (emptyLibrary) throw Error(emptyLibrary);

  const rejected: RejectedAsset[] = [];
  const reject = (rejection: Rejection) => {
    console.warn(`  ⚠️ ${rejection.message}`);
    rejected.push(toRejectedAsset(config.figmaFileId, rejection));
  };

  // One component set per icon name; what Figma still has is matched with what was published.
  const named = toRemoteIconSets(componentSets);
  named.rejections.forEach(reject);
  const { unique, rejections: duplicates } = dedupeRemoteIconSets(
    named.remote,
    oldManifest.iconSets,
  );
  duplicates.forEach(reject);
  const { matches, gone } = matchIconSets(unique, oldManifest.iconSets);

  // Components outside sets are reported, not synced; a published icon they replace keeps its version.
  const presentNodeIds = new Set(
    matches.flatMap(({ published }) => (published ? [published.nodeId] : [])),
  );
  const loose = sortLooseComponents(looseComponents, oldManifest.iconSets, presentNodeIds);
  const seen = componentSets.length + looseComponents.length;

  // A published icon set is only deleted when Figma no longer has it. One whose component set is
  // still in Figma under a name that is not allowed, or that a component outside a set replaces,
  // stays as published. Deleting a set bumps no `updated_at`, so deletions are found here.
  const kept = new Set([...named.invalidNodeIds, ...loose.keepNodeIds]);
  const deleted = gone.filter(({ nodeId }) => !kept.has(nodeId));

  const idsToFetch = new Set(selectIconSetsToFetch(matches, fullCompare));
  const nodes = await config.source.fetchSetNodes(
    componentSets.filter((componentSet) => idsToFetch.has(componentSet.node_id)),
  );

  const finishSinks = sinks.filter(({ stage }) => stage === 'finish');
  const assetSinks = sinks.filter(({ stage }) => stage === 'assets');
  const outcome = (status: SyncOutcome['status'], changes: SyncChanges, refreshed = false) => ({
    status,
    changes,
    rejected,
    ignored: loose.ignored,
    refreshed,
    seen,
  });

  // Nothing fetched and nothing deleted → unchanged.
  if (Object.keys(nodes).length === 0 && deleted.length === 0) {
    if (fullCompare) throw Error('No icon sets found in Figma');
    log('Figma file has no updates, skipping icon sync...');
    const unchanged = toSinkChanges(config, oldManifest, { carried: [], changes: [], deleted: [] });
    for (const sink of finishSinks.filter(({ runsWithoutChanges }) => runsWithoutChanges)) {
      await sink.apply(unchanged);
    }
    return outcome('nothing-to-sync', emptyChanges());
  }

  log(`\nReconciling ${matches.length} icon sets from Figma...`);
  const { accepted, carried, rejections } = validateIconSets({ matches, nodes, log });
  rejections.forEach(reject);

  const variantIds = accepted.flatMap(({ variants }) => variants.map(({ id }) => id));
  log(`\nDownloading ${variantIds.length} svg assets...`);
  const rawSvgs = await config.source.fetchSvgs(variantIds);

  const built = buildFetchedIconSets({ accepted, rawSvgs, optimize: optimizeSvg });
  built.rejections.forEach(reject);

  // Every sink plans what it is about to write before any of them writes. An icon set a sink
  // cannot write is rejected and left as it was published, and the sinks plan again without it.
  const planSinks = async (diff: IconSetDiff) => {
    const manifest = applyDiff(oldManifest, diff);
    const plans = await Promise.all(
      assetSinks.map((sink) => sink.plan(toSinkChanges(config, manifest, diff))),
    );
    return { manifest, plans, failures: plans.flatMap((plan) => plan.failures) };
  };
  let diff = diffIconSets({
    fetched: built.fetched,
    carried: [...carried, ...built.carried],
    deleted,
  });
  let planned = await planSinks(diff);
  if (planned.failures.length > 0) {
    // Several sinks can reject the same icon set: it is one rejection, with every reason.
    const reasons = new Map<string, { name: string; messages: string[] }>();
    for (const { nodeId, name, message } of planned.failures) {
      const entry = reasons.get(nodeId) ?? { name, messages: [] };
      entry.messages.push(message);
      reasons.set(nodeId, entry);
    }
    for (const [nodeId, { name, messages }] of reasons) {
      reject({ name, nodeId, message: messages.join(' '), category: 'invalid-asset' });
    }
    diff = withoutIconSets(diff, new Set(reasons.keys()));
    planned = await planSinks(diff);
    if (planned.failures.length > 0) {
      throw Error(planned.failures.map(({ name, message }) => `${name}: ${message}`).join('\n'));
    }
  }

  for (const change of diff.changes) {
    if (change.kind === 'new') log('  [NEW] Icon set is new, creating svg output files...');
    if (change.kind === 'changed')
      log('  [CHANGED] Icon set changed, recreating svg output files...');
  }
  log(`\nProcessing ${diff.deleted.length} deleted icon sets...`);
  for (const iconSet of diff.deleted) log(` Deleting icon set: ${iconSet.name} ${iconSet.nodeId}`);

  log('\nGenerating output files...');
  for (const plan of planned.plans) await plan.commit();

  const { changes, refreshed } = toChanges(diff);
  log('Updating manifest...');
  // Rejected icon sets are fetched and reported on every run until designers fix them. The date
  // moves only when icon sets changed, so a run that finds nothing leaves manifest.json as it was
  // and the workflow has nothing to push.
  planned.manifest.lastUpdated = hasChanges(changes)
    ? now().toISOString()
    : oldManifest.lastUpdated;
  writeManifest(config.manifestPath, planned.manifest);

  const finished = toSinkChanges(config, planned.manifest, diff);
  for (const sink of finishSinks) await sink.apply(finished);

  return outcome('synced', changes, refreshed);
}
