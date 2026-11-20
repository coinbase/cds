import { selectChanged } from '@cds/figma-api/syncCore';

/** What the manifest recorded for an icon set at the last sync. */
export type KnownIconSet = {
  nodeId: string;
  name: string;
  description: string;
  lastUpdated: string;
};

/** The icon name is the part after the first `/` of the component set name, e.g. `Icon / add`. */
const iconNameOf = (componentSetName: string) => componentSetName.split('/')[1]?.trim();

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
