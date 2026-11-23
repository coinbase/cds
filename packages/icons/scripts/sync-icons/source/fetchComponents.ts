import { getFileComponents, getFileComponentSets, getFileNodes } from '@cds/figma-api';
import { figmaNodeUrl } from '@cds/figma-api/syncReport';
import { createBatches } from '@cds/figma-api/syncUtils';

import type { ComponentSet, LooseComponent, SetNode } from './IconSource';

/** Lists every component set published from the Figma file. The endpoint is cheap. */
export async function fetchComponentSets(fileId: string): Promise<ComponentSet[]> {
  const response = await getFileComponentSets(fileId);
  return response.meta.component_sets;
}

/**
 * Fetches the variants (children) of the given component sets, in batches, and joins each with the
 * listing metadata it came from. Only the sets the sync selected are fetched.
 */
export async function fetchSetNodes(
  fileId: string,
  sets: readonly ComponentSet[],
  batchSize = 500,
): Promise<Record<string, SetNode>> {
  const nodes: Record<string, SetNode> = {};

  for (const batch of createBatches(sets, batchSize)) {
    const response = await getFileNodes(fileId, {
      ids: batch.map((set) => set.node_id),
      geometry: 'paths',
    });

    for (const set of batch) {
      const nodeData = response.nodes[set.node_id];
      if (nodeData) nodes[set.node_id] = { ...nodeData, styles: {}, metadata: set };
    }
  }

  return nodes;
}

/**
 * Lists the published components that are not part of a component set. The variants of a set are
 * published components too, but they belong to their set and are left out here.
 */
export async function fetchLooseComponents(fileId: string): Promise<LooseComponent[]> {
  const response = await getFileComponents(fileId);
  return response.meta.components
    .filter((component) => !component.containing_frame?.containingComponentSet)
    .map((component) => ({
      nodeId: component.node_id,
      name: component.name,
      url: figmaNodeUrl(component.file_key, component.node_id),
    }));
}
