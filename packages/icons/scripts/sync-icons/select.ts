import { selectChanged } from '@cds/figma-api/syncCore';
import type { IgnoredGroup } from '@cds/figma-api/syncReport';

import type { LooseComponent } from './source/IconSource';

/** What the manifest recorded for an icon set at the last sync. */
export type KnownIconSet = {
  nodeId: string;
  name: string;
  description: string;
  lastUpdated: string;
};

/** The icon name is the part after the first `/` of the component set name, e.g. `Icon / add`. */
export const iconNameOf = (componentSetName: string) => componentSetName.split('/')[1]?.trim();

/**
 * Picks the component sets to download: the ones the manifest does not know, and the ones whose
 * `updated_at`, description or icon name differ from the manifest entry. Each set is compared with
 * its own record, so the result does not depend on the clock or on the last run having finished.
 * Without known icon sets every component set is picked.
 */
export function selectIconSetsToFetch(
  componentSets: readonly {
    node_id: string;
    name: string;
    description: string;
    updated_at: string;
  }[],
  knownIconSets?: readonly KnownIconSet[],
): string[] {
  if (!knownIconSets) return componentSets.map((componentSet) => componentSet.node_id);

  const knownByNodeId = new Map(knownIconSets.map((iconSet) => [iconSet.nodeId, iconSet]));
  return selectChanged(componentSets, knownByNodeId, {
    id: (componentSet) => componentSet.node_id,
    differs: (componentSet, known) =>
      known.lastUpdated !== componentSet.updated_at ||
      known.description !== componentSet.description ||
      known.name !== iconNameOf(componentSet.name),
  }).map((componentSet) => componentSet.node_id);
}

/**
 * A Figma response with no component sets while icons are published is a failed read, not a
 * library where every icon was deleted, so the sync stops instead of deleting them all.
 */
export const emptyLibraryProblem = (remoteSetCount: number, publishedSetCount: number) =>
  remoteSetCount === 0 && publishedSetCount > 0
    ? `Figma returned no icon sets, but ${publishedSetCount} are published. Nothing was deleted; check the Figma file and the access token.`
    : undefined;

/**
 * Components outside component sets are not synced, but they are never silent. When one has the
 * icon name of an icon that is published and whose set is gone, the published version is kept
 * instead of being deleted: its node id comes back in `keepNodeIds`.
 */
export const sortLooseComponents = (
  loose: readonly LooseComponent[],
  knownIconSets: readonly (KnownIconSet & { nodeId: string })[],
  presentNodeIds: ReadonlySet<string>,
) => {
  const knownByName = new Map(
    knownIconSets.map((iconSet) => [iconSet.name.toLowerCase(), iconSet]),
  );
  const keepNodeIds: string[] = [];
  const replacing: LooseComponent[] = [];
  const others: LooseComponent[] = [];

  for (const component of loose) {
    const known = knownByName.get(
      (iconNameOf(component.name) ?? component.name.trim()).toLowerCase(),
    );
    if (known && !presentNodeIds.has(known.nodeId)) {
      keepNodeIds.push(known.nodeId);
      replacing.push(component);
    } else {
      others.push(component);
    }
  }

  const group = (reason: string, items: LooseComponent[]): IgnoredGroup[] =>
    items.length > 0 ? [{ reason, items: items.map(({ name, url }) => ({ name, url })) }] : [];

  return {
    keepNodeIds,
    ignored: [
      ...group('components outside icon sets, not synced', others),
      ...group(
        'components outside icon sets that replace a published icon set, whose published version is kept',
        replacing,
      ),
    ],
  };
};
