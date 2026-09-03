import { getFileComponents, getFileImages, getFileNodes } from '@cds/figma-api';

// Derive types from the API functions being called
type FileNodesResponse = Awaited<ReturnType<typeof getFileNodes>>;
type NodeData = NonNullable<FileNodesResponse['nodes'][string]>;
type ComponentsResponse = Awaited<ReturnType<typeof getFileComponents>>;
type ComponentMetadata = ComponentsResponse['meta']['components'][number];
export type NodeWithMetadata = NodeData & { metadata: ComponentMetadata };
export type NodeDocument = NodeWithMetadata['document'];

// Derive child node type from document children (for nodes with children like frames, components)
type NodeWithChildren = Extract<NodeDocument, { children: unknown[] }>;
export type ChildNode = NodeWithChildren['children'][number];

// Derive paint-related types from node fills
type NodeWithFills = Extract<NodeDocument, { fills: unknown[] }>;
type Paint = NodeWithFills['fills'][number];
type GradientPaint = Extract<Paint, { gradientStops: unknown[] }>;
export type ColorStop = GradientPaint['gradientStops'][number];

// Derive geometry types from nodes with fillGeometry
type NodeWithGeometry = Extract<NodeDocument, { fillGeometry?: unknown[] }>;
type FillGeometry = NonNullable<NodeWithGeometry['fillGeometry']>;
export type PathGeometry = FillGeometry[number];

export type SyncedIllustrationLibrary = Awaited<ReturnType<typeof fetchIllustrationLibrary>>;
// Alias for backwards compatibility
export type SyncedLibrary = SyncedIllustrationLibrary;

type FetchIllustrationLibraryParams = {
  /** The Figma file ID containing the illustrations */
  fileId: string;
  /**
   * ISO timestamp from the last sync. Only components updated after this
   * date will have their nodes and images fetched. Pass undefined to fetch all.
   */
  lastUpdated?: string;
  /** Number of IDs to include in each batched API request. Defaults to 500. */
  batchSize?: number;
};

/**
 * Fetches illustration library data from Figma.
 *
 * This is a focused implementation for components (illustrations) that:
 * 1. Gets all component metadata from the /components endpoint
 * 2. Filters to recently updated items based on lastUpdated
 * 3. Fetches detailed node data for recently updated components
 * 4. Fetches SVG image URLs for the components directly
 *
 * @returns SyncedLibrary with nodes, imageUrls, remoteIds, and recentlyUpdatedIds
 */
export async function fetchIllustrationLibrary({
  fileId,
  lastUpdated,
  batchSize = 500,
}: FetchIllustrationLibraryParams) {
  // Step 1: Get all component metadata (fast endpoint)
  const componentsResponse = await getFileComponents(fileId);
  const allComponents = componentsResponse.meta.components;

  // Step 2: Extract all remote IDs and filter for recently updated
  const remoteIds = allComponents.map((c) => c.node_id);
  const recentlyUpdatedIds = filterByLastUpdated(allComponents, lastUpdated);

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

    // Merge node data with metadata from components
    for (const nodeId of batch) {
      const nodeData = nodesResponse.nodes[nodeId];
      const metadata = allComponents.find((c) => c.node_id === nodeId);

      if (nodeData && metadata) {
        nodes[nodeId] = {
          ...nodeData,
          styles: {},
          metadata,
        };
      }
    }
  }

  // Step 4: Fetch SVG image URLs for the components directly (batched)
  // Unlike icons, illustrations use the component IDs themselves, not children
  const imageUrls: {
    svg: Record<string, string>;
  } = { svg: {} };

  const imageBatches = createBatches(recentlyUpdatedIds, batchSize);

  for (const batch of imageBatches) {
    const imagesResponse = await getFileImages(fileId, {
      ids: batch.join(','),
      format: 'svg',
    });

    Object.assign(imageUrls.svg, imagesResponse.images);
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
