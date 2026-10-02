import { type Component, type Illustration, illustrationKey } from './illustration';

/** A component that has been downloaded: its metadata plus everything derived from its SVG. */
export type FetchedIllustration = Component & Pick<Illustration, 'hash' | 'width' | 'height'>;

/** What changed, in the shape the version plan and the change summary consume. */
export type SyncResults = {
  added: Illustration[];
  /** Artwork changes (which bump the version) as well as description-only changes. */
  updated: Illustration[];
  renamed: (Illustration & { oldName: string })[];
  deleted: Illustration[];
};

export type IllustrationDiff = {
  results: SyncResults;
  /** Previous entries whose output files are stale and must be removed before writing. */
  removals: Illustration[];
  /** Illustrations whose assets must be (re)written. */
  writes: Illustration[];
  /** The complete set of illustrations after this sync. */
  illustrations: Illustration[];
};

export const hasChanges = ({ results }: IllustrationDiff) =>
  Object.values(results).some((changes) => changes.length > 0);

const toIllustration = (fetched: FetchedIllustration, version: number, createdAt: string) => {
  const { updatedAt, url: _url, ...rest } = fetched;
  const illustration: Illustration = { ...rest, version, createdAt, lastUpdated: updatedAt };
  return illustration;
};

/**
 * Reconciles the illustrations fetched from Figma with the previous manifest.
 *
 * - An unknown `type/name` is added at version 0. A previous entry with the same `type/name` but a
 *   different node id is treated as the same illustration (design re-created the node); since the
 *   hash covers the node id this always bumps the version, which keeps the CDN URL fresh.
 * - A changed hash bumps the version, which renames every asset file.
 * - A changed name resets the version to 0; a changed type is a deletion plus an addition.
 * - Previous entries whose node no longer exists in Figma are deleted.
 */
export function diffIllustrations({
  previous,
  fetched,
  remoteNodeIds,
}: {
  previous: Illustration[];
  fetched: FetchedIllustration[];
  remoteNodeIds: Set<string>;
}): IllustrationDiff {
  const results: SyncResults = { added: [], updated: [], renamed: [], deleted: [] };
  const removals: Illustration[] = [];
  const writes: Illustration[] = [];
  const illustrations: Illustration[] = [];

  const previousByNodeId = new Map(previous.map((item) => [item.nodeId, item]));
  const previousByKey = new Map(previous.map((item) => [illustrationKey(item), item]));
  const reconciled = new Set<Illustration>();

  const add = (next: FetchedIllustration) => {
    const illustration = toIllustration(next, 0, next.createdAt);
    results.added.push(illustration);
    writes.push(illustration);
    return illustration;
  };

  for (const next of fetched) {
    const prev = previousByNodeId.get(next.nodeId) ?? previousByKey.get(illustrationKey(next));

    if (!prev) {
      illustrations.push(add(next));
      continue;
    }
    reconciled.add(prev);

    if (prev.type !== next.type) {
      results.deleted.push(prev);
      removals.push(prev);
      illustrations.push(add(next));
      continue;
    }

    if (prev.name !== next.name) {
      if (prev.name.toLowerCase() === next.name.toLowerCase()) {
        throw new Error(
          `Renames are case-insensitive: "${prev.name}" -> "${next.name}". Pick a distinct name for ${illustrationKey(next)} in Figma.`,
        );
      }
      const illustration = toIllustration(next, 0, prev.createdAt);
      results.renamed.push({ ...illustration, oldName: prev.name });
      removals.push(prev);
      writes.push(illustration);
      illustrations.push(illustration);
      continue;
    }

    if (prev.hash !== next.hash) {
      const illustration = toIllustration(next, prev.version + 1, prev.createdAt);
      results.updated.push(illustration);
      removals.push(prev);
      writes.push(illustration);
      illustrations.push(illustration);
      continue;
    }

    const illustration = toIllustration(next, prev.version, prev.createdAt);
    if (prev.description !== next.description) results.updated.push(illustration);
    illustrations.push(illustration);
  }

  for (const prev of previous) {
    if (reconciled.has(prev)) continue;
    if (remoteNodeIds.has(prev.nodeId)) {
      illustrations.push(prev);
    } else {
      results.deleted.push(prev);
      removals.push(prev);
    }
  }

  return { results, removals, writes, illustrations };
}
