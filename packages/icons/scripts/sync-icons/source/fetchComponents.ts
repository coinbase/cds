import { getFileComponentSets, getFileNodes } from '@cds/figma-api';
import { createBatches } from '@cds/figma-api/syncUtils';

import type { ComponentSet, SetNode } from './IconSource';

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
