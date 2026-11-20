import type { Sink, SinkChanges, SinkFailure } from './sinks/Sink';
import type { IllustrationSource , InvalidComponent } from './source/IllustrationSource';
import type { ColorPalette } from './colorPalette';
import {
  diffIllustrations,
  type FetchedIllustration,
  hasChangesToRecord,
  type IllustrationDiff,
} from './diffIllustrations';
import { hashSvg } from './hashSvg';
import type { Component, Illustration } from './illustration';
import { type Manifest, manifestIllustrations } from './manifest';
import { mapConcurrently } from './mapConcurrently';
import { getSvgSize, optimizeSvg } from './optimizeSvg';
import { type DuplicateComponent, selectComponents } from './selectComponents';

export type SyncOptions = {
  source: IllustrationSource;
  /** The state of the previous sync; an empty manifest syncs everything. */
  manifest: Manifest;
  sinks: Sink[];
  /** Re-download every component instead of only those updated since `manifest.lastUpdated`. */
  fullCompare?: boolean;
  /** Plan and validate every sink exactly as a real run would, but write nothing. */
  dryRun?: boolean;
  /** A sink with any failed illustration publishes nothing, instead of publishing the rest. */
  allOrNothing?: boolean;
  log?: (message: string) => void;
};

/** What one sink did, or in a dry run would do, with this run's changes. */
export type SinkResult = {
  sink: string;
  written: Illustration[];
  removed: Illustration[];
  failures: SinkFailure[];
  /** False when the run was a dry run, or all-or-nothing withheld a sink that had failures. */
  published: boolean;
};

export type SyncOutcome = {
  /** Components dropped because another component already claims the same `type/name`. */
  duplicates: DuplicateComponent[];
  /** Published components skipped because their name cannot be used; what was published for them stays. */
  invalid: InvalidComponent[];
} & (
  | { status: 'nothing-to-sync' }
  | { status: 'no-changes' }
  | {
      status: 'synced';
      diff: IllustrationDiff;
      palette: ColorPalette;
      /** Unchanged illustrations that were written because a sink was missing their files. */
      backfilled: Illustration[];
      sinkResults: SinkResult[];
    }
);

const concurrentChecks = 32;

/** Which of the sinks that accept the illustration are missing files for it. */
async function sinksMissing(illustration: Illustration, sinks: Sink[]) {
  const missing: Sink[] = [];
  for (const sink of sinks) {
    if (sink.accepts(illustration) && !(await sink.has(illustration))) missing.push(sink);
  }
  return missing;
}

/** Optimizes one export, pointing at the offending component in Figma when it cannot be used. */
function optimizeComponentSvg(component: Component, rawSvg: string) {
  try {
    return optimizeSvg(rawSvg);
  } catch (error) {
    throw new Error(
      `${component.type}/${component.name} has an SVG the sync cannot publish.\n` +
        `  Reason: ${error instanceof Error ? error.message : String(error)}\n` +
        `  Fix it in Figma: ${component.url}`,
      { cause: error },
    );
  }
}

/**
 * Brings every sink in line with the source: fetches what changed, reconciles it with the manifest
 * of the previous sync, plans each sink's changes and applies them. Idempotent: a second run finds
 * nothing updated and nothing missing and does nothing. Pure with respect to its surroundings: no
 * git, no process, no file system beyond what the sinks own. Recording the run (manifest, version
 * plan) is left to the caller, which receives everything it needs.
 */
export async function runSync({
  source,
  manifest,
  sinks,
  fullCompare = false,
  dryRun = false,
  allOrNothing = false,
  log = () => undefined,
}: SyncOptions): Promise<SyncOutcome> {
  const previous = manifestIllustrations(manifest);

  log('Fetching component list...');
  const { components, invalid } = await source.listComponents();
  const selection = selectComponents({
    components,
    previous,
    fullCompare,
  });
  const { duplicates } = selection;
  // A component with an unusable name still exists in Figma: what was published for it stays.
  const invalidNodeIds = new Set(invalid.map(({ nodeId }) => nodeId));
  const remoteNodeIds = new Set([...selection.remoteNodeIds, ...invalidNodeIds]);

  // Illustrations some sink lacks (a new destination, a wiped directory) are downloaded as well,
  // so that every run leaves every destination complete.
  const missingSinks = new Map<Illustration, Sink[]>();
  await mapConcurrently(
    previous.filter(({ nodeId }) => remoteNodeIds.has(nodeId) && !invalidNodeIds.has(nodeId)),
    concurrentChecks,
    async (illustration) => {
      const sinks_ = await sinksMissing(illustration, sinks);
      if (sinks_.length) missingSinks.set(illustration, sinks_);
    },
  );
  const missing = [...missingSinks.keys()];
  const selected = new Set(selection.toSync.map(({ nodeId }) => nodeId));
  const componentsByNodeId = new Map(components.map((component) => [component.nodeId, component]));
  const toSync = [
    ...selection.toSync,
    ...missing
      .filter(({ nodeId }) => !selected.has(nodeId))
      .map(({ nodeId }) => componentsByNodeId.get(nodeId) as Component),
  ];

  const deletions = previous.filter(({ nodeId }) => !remoteNodeIds.has(nodeId));
  if (toSync.length === 0 && deletions.length === 0) {
    if (fullCompare) throw Error('No illustrations found in the source');
    return { status: 'nothing-to-sync', duplicates, invalid };
  }

  log('Fetching color palette...');
  const palette = await source.fetchPalette();

  log(`Downloading ${toSync.length} SVGs...`);
  const rawSvgs = await source.fetchSvgs(
    toSync.map(({ nodeId }) => nodeId),
    (done, total) => {
      if (done % 100 === 0 || done === total) log(` (${done}/${total})`);
    },
  );

  const svgs = new Map<string, string>();
  const fetched: FetchedIllustration[] = toSync.map((component) => {
    const svg = optimizeComponentSvg(component, rawSvgs.get(component.nodeId) as string);
    svgs.set(component.nodeId, svg);
    return { ...component, hash: hashSvg(component.nodeId, svg), ...getSvgSize(svg) };
  });

  const diff = diffIllustrations({ previous, fetched, remoteNodeIds });
  if (!hasChangesToRecord(diff) && missing.length === 0)
    return { status: 'no-changes', duplicates, invalid };

  // Changed illustrations are written to every sink; unchanged ones only to sinks missing them.
  const missingByNodeId = new Map([...missingSinks].map(([prev, s]) => [prev.nodeId, s]));
  const changed = new Set(diff.writes.map(({ nodeId }) => nodeId));
  const backfilled = diff.illustrations.filter(
    ({ nodeId }) => !changed.has(nodeId) && missingByNodeId.has(nodeId),
  );

  log(
    `${dryRun ? 'Planning' : 'Applying'} ${diff.removals.length} removals and ${diff.writes.length} changes` +
      (backfilled.length ? `, restoring ${backfilled.length} missing illustrations` : '') +
      ` to ${sinks.length} sinks...`,
  );
  // Sinks are independent and, past this point, so is the work: no more network, only CPU and the
  // sinks' own files. Plan every sink first, validating all of it, then publish. A sink that fails
  // to plan as a whole (a name collision in its catalog) throws here, before any file is written.
  const plans = await Promise.all(
    sinks.map(async (sink) => {
      const toWrite = diff.illustrations.filter(
        (illustration) =>
          sink.accepts(illustration) &&
          (changed.has(illustration.nodeId) ||
            missingByNodeId.get(illustration.nodeId)?.includes(sink)),
      );
      const changes: SinkChanges = {
        remove: diff.removals.filter((illustration) => sink.accepts(illustration)),
        write: toWrite.map((illustration) => ({
          illustration,
          svg: svgs.get(illustration.nodeId) as string,
        })),
        illustrations: diff.illustrations.filter((illustration) => sink.accepts(illustration)),
        palette,
      };
      log(` ${sink.name}: ${changes.remove.length} removals, ${changes.write.length} writes`);
      return sink.plan(changes);
    }),
  );

  const publishing = plans.map((plan) => !dryRun && !(allOrNothing && plan.failures.length > 0));
  await Promise.all(plans.map((plan, index) => (publishing[index] ? plan.commit() : undefined)));

  const sinkResults = plans.map(
    (plan, index): SinkResult => ({
      sink: plan.sink,
      written: plan.writes,
      removed: plan.removals,
      failures: plan.failures,
      published: publishing[index],
    }),
  );

  return { status: 'synced', diff, palette, backfilled, sinkResults, duplicates, invalid };
}
