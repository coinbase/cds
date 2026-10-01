import type { Sink, SinkChanges } from './sinks/Sink';
import type { IllustrationSource } from './source/IllustrationSource';
import {
  diffIllustrations,
  type FetchedIllustration,
  hasChanges,
  type IllustrationDiff,
} from './diffIllustrations';
import { hashSvg } from './hashSvg';
import type { ColorPalette, Component, Illustration } from './illustration';
import { type Manifest, manifestIllustrations } from './manifest';
import { mapConcurrently } from './mapConcurrently';
import { getSvgSize, optimizeSvg } from './optimizeSvg';
import { selectComponents } from './selectComponents';

export type SyncOptions = {
  source: IllustrationSource;
  /** The state of the previous sync; an empty manifest syncs everything. */
  manifest: Manifest;
  sinks: Sink[];
  /** Re-download every component instead of only those updated since `manifest.lastUpdated`. */
  syncAll?: boolean;
  log?: (message: string) => void;
};

export type SyncOutcome = {
  /** Components dropped because another component already claims the same `type/name`. */
  duplicates: Component[];
} & (
  | { status: 'nothing-to-sync' }
  | { status: 'no-changes' }
  | {
      status: 'synced';
      diff: IllustrationDiff;
      palette: ColorPalette;
      /** Unchanged illustrations that were written because a sink was missing their files. */
      backfilled: Illustration[];
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
  syncAll = false,
  log = () => undefined,
}: SyncOptions): Promise<SyncOutcome> {
  const previous = manifestIllustrations(manifest);

  log('Fetching component list...');
  const components = await source.listComponents();
  const selection = selectComponents({
    components,
    previous,
    lastUpdated: manifest.lastUpdated,
    syncAll,
  });
  const { remoteNodeIds, duplicates } = selection;

  // Illustrations some sink lacks (a new destination, a wiped directory) are downloaded as well,
  // so that every run leaves every destination complete.
  const missingSinks = new Map<Illustration, Sink[]>();
  await mapConcurrently(
    previous.filter(({ nodeId }) => remoteNodeIds.has(nodeId)),
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
    if (syncAll) throw Error('No illustrations found in the source');
    return { status: 'nothing-to-sync', duplicates };
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
    const svg = optimizeSvg(rawSvgs.get(component.nodeId) as string);
    svgs.set(component.nodeId, svg);
    return { ...component, hash: hashSvg(component.nodeId, svg), ...getSvgSize(svg) };
  });

  const diff = diffIllustrations({ previous, fetched, remoteNodeIds });
  if (!hasChanges(diff) && missing.length === 0) return { status: 'no-changes', duplicates };

  // Changed illustrations are written to every sink; unchanged ones only to sinks missing them.
  const missingByNodeId = new Map([...missingSinks].map(([prev, s]) => [prev.nodeId, s]));
  const changed = new Set(diff.writes.map(({ nodeId }) => nodeId));
  const backfilled = diff.illustrations.filter(
    ({ nodeId }) => !changed.has(nodeId) && missingByNodeId.has(nodeId),
  );

  log(
    `Applying ${diff.removals.length} removals and ${diff.writes.length} changes` +
      (backfilled.length ? `, restoring ${backfilled.length} missing illustrations` : '') +
      ` to ${sinks.length} sinks...`,
  );
  // Sinks are independent and, past this point, so is the work: no more network, only CPU and the
  // sinks' own files. Plan every sink, then apply them all at once.
  const plans = sinks.map((sink) => {
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
    return { sink, changes };
  });
  await Promise.all(plans.map(({ sink, changes }) => sink.apply(changes)));

  return { status: 'synced', diff, palette, backfilled, duplicates };
}
