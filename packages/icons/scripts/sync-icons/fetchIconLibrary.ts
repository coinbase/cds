import { getFileComponentSets, getFileImages, getFileNodes } from '@cds/figma-api';

// Derive types from the API functions being called
type FileNodesResponse = Awaited<ReturnType<typeof getFileNodes>>;
type NodeData = NonNullable<FileNodesResponse['nodes'][string]>;
type ComponentSetsResponse = Awaited<ReturnType<typeof getFileComponentSets>>;
type ComponentSetMetadata = ComponentSetsResponse['meta']['component_sets'][number];
type NodeWithMetadata = NodeData & { metadata: ComponentSetMetadata };

type FetchIconLibraryParams = {
  /** The Figma file ID containing the icons */
  fileId: string;
  /**
   * ISO timestamp from the last sync. Only component sets updated after this
   * date will have their nodes and images fetched. Pass undefined to fetch all.
   */
  lastUpdated?: string;
  /** Number of IDs to include in each batched API request. Defaults to 500. */
  batchSize?: number;
};

/**
 * Fetches icon library data from Figma.
 *
 * This is a focused implementation for component_sets (icons) that:
 * 1. Gets all component set metadata from the /component_sets endpoint
 * 2. Filters to recently updated items based on lastUpdated
 * 3. Fetches detailed node data for recently updated component sets
 * 4. Fetches SVG image URLs for child components (not the component sets themselves)
 *
 * @returns SyncedLibrary with nodes, imageUrls, remoteIds, and recentlyUpdatedIds
 */
export async function fetchIconLibrary({
  fileId,
  lastUpdated,
  batchSize = 500,
}: FetchIconLibraryParams) {
  // Step 1: Get all component sets metadata (fast endpoint)
  const componentSetsResponse = await getFileComponentSets(fileId);
  const allComponentSets = componentSetsResponse.meta.component_sets;

  // Step 2: Extract all remote IDs and filter for recently updated
  const remoteIds = allComponentSets.map((cs) => cs.node_id);
  const recentlyUpdatedIds = filterByLastUpdated(allComponentSets, lastUpdated);

  // If nothing was updated, return early with empty nodes/imageUrls
  if (recentlyUpdatedIds.length === 0) {
    return {
      remoteIds,
      recentlyUpdatedIds,
      nodes: {} as Record<string, NodeWithMetadata>,
      imageUrls: {
        svg: {} as Record<string, string>,
      },
    };
  }

  // Step 3: Fetch detailed node data for recently updated items (batched)
  const nodes: Record<string, NodeWithMetadata> = {};
  const idBatches = createBatches(recentlyUpdatedIds, batchSize);

  for (const batch of idBatches) {
    const nodesResponse = await getFileNodes(fileId, {
      ids: batch,
      geometry: 'paths',
    });

    // Merge node data with metadata from component sets
    for (const nodeId of batch) {
      const nodeData = nodesResponse.nodes[nodeId];
      const metadata = allComponentSets.find((cs) => cs.node_id === nodeId);

      if (nodeData && metadata) {
        nodes[nodeId] = {
          ...nodeData,
          styles: {},
          metadata,
        };
      }
    }
  }

  // Step 4: Extract child component IDs (icons use children, not the component set itself)
  const childComponentIds: string[] = [];
  Object.values(nodes).forEach((node) => {
    if (node.document.type === 'COMPONENT_SET' && node.document.children) {
      node.document.children.forEach((child: { id: string }) => {
        childComponentIds.push(child.id);
      });
    }
  });

  // Step 5: Fetch SVG image URLs for child components (batched)
  const imageUrls: {
    svg: Record<string, string>;
  } = { svg: {} };

  if (childComponentIds.length > 0) {
    const imageBatches = createBatches(childComponentIds, batchSize);

    for (const batch of imageBatches) {
      const imagesResponse = await getFileImages(fileId, {
        ids: batch.join(','),
        format: 'svg',
      });

      Object.assign(imageUrls.svg, imagesResponse.images);
    }
  }

  return {
    remoteIds,
    recentlyUpdatedIds,
    nodes,
    imageUrls,
  };
}

/**
 * Filters items to only those updated after the given timestamp.
 * If no timestamp provided, returns all items.
 */
function filterByLastUpdated(
  items: readonly { node_id: string; updated_at: string }[],
  lastUpdated?: string,
): string[] {
  if (!lastUpdated) {
    return items.map((item) => item.node_id);
  }

  const lastUpdatedDate = new Date(lastUpdated);
  return items
    .filter((item) => new Date(item.updated_at) > lastUpdatedDate)
    .map((item) => item.node_id);
}

/**
 * Splits an array into batches of the specified size.
 */
function createBatches<T>(items: T[], batchSize: number): T[][] {
  const batches: T[][] = [];
  for (let i = 0; i < items.length; i += batchSize) {
    batches.push(items.slice(i, i + batchSize));
  }
  return batches;
}
