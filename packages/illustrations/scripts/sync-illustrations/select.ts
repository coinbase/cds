import { dedupeByIdentity, selectChanged } from '@cds/figma-api/syncCore';

import { type Component, type Illustration, illustrationKey } from './illustration';

export type ComponentSelection = {
  /** Node ids of every component that should exist after the sync; previous entries not in here are deleted. */
  remoteNodeIds: Set<string>;
  /** The components whose SVGs need to be downloaded. */
  toSync: Component[];
  /** Components dropped because another component already claims the same `type/name`, with the one kept. */
  duplicates: DuplicateComponent[];
};

export type DuplicateComponent = { component: Component; keptBy: Component };

/**
 * When Figma holds two components with the same `type/name`, keep the one the manifest already
 * knows, falling back to the oldest, so the choice is stable across runs.
 */
function dedupeByKey(components: Component[], knownNodeIds: Set<string>) {
  const preferred = (a: Component, b: Component) => {
    if (knownNodeIds.has(a.nodeId) !== knownNodeIds.has(b.nodeId)) {
      return knownNodeIds.has(a.nodeId) ? a : b;
    }
    return a.createdAt <= b.createdAt ? a : b;
  };

  const { kept, dropped } = dedupeByIdentity(components, illustrationKey, preferred);
  return {
    kept: [...kept.values()],
    duplicates: dropped.map(({ item, keptBy }) => ({ component: item, keptBy })),
  };
}

/**
 * Decides which Figma components take part in this sync: duplicates are dropped, and unless
 * `fullCompare` is set only components that are new, renamed or whose `updatedAt` differs from the one
 * the manifest recorded for them are downloaded. Each component is compared with its own record, so a
 * missed run, a clock difference or a component that failed earlier never hides a change.
 */
export function selectComponents({
  components,
  previous,
  fullCompare,
}: {
  components: Component[];
  previous: Illustration[];
  fullCompare: boolean;
}): ComponentSelection {
  const knownNodeIds = new Set(previous.map((illustration) => illustration.nodeId));
  const { kept, duplicates } = dedupeByKey(components, knownNodeIds);

  const previousByNodeId = new Map(
    previous.map((illustration) => [illustration.nodeId, illustration]),
  );
  const toSync = fullCompare
    ? kept
    : selectChanged(kept, previousByNodeId, {
        id: (component) => component.nodeId,
        differs: (component, known) =>
          known.lastUpdated !== component.updatedAt ||
          illustrationKey(known) !== illustrationKey(component),
      });

  return {
    remoteNodeIds: new Set(kept.map((component) => component.nodeId)),
    toSync,
    duplicates,
  };
}
