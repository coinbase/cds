import type { getFileComponentSets, getFileNodes } from '@cds/figma-api';

type ComponentSetsResponse = Awaited<ReturnType<typeof getFileComponentSets>>;
type NodesResponse = Awaited<ReturnType<typeof getFileNodes>>;

/** A published component set (an icon with its variants), as the listing reports it. */
export type ComponentSet = ComponentSetsResponse['meta']['component_sets'][number];

/** A component set with its variants, plus the listing metadata it came from. */
export type SetNode = NonNullable<NodesResponse['nodes'][string]> & { metadata: ComponentSet };

/** A published component that is not part of a component set. */
export type LooseComponent = { nodeId: string; name: string; url: string };

export type ProgressCallback = (completed: number, total: number) => void;

/**
 * Where icons come from, the same three steps as the illustrations source: list what is published
 * (cheap), then fetch the details of what the sync selected, then download the SVGs.
 */
export type IconSource = {
  /** Every published component set with the metadata the sync compares. Expected to be cheap. */
  listComponentSets(): Promise<ComponentSet[]>;

  /** Published components that are not part of a component set. They are not synced. */
  listLooseComponents(): Promise<LooseComponent[]>;

  /** The variants of the given component sets, keyed by node id. */
  fetchSetNodes(sets: readonly ComponentSet[]): Promise<Record<string, SetNode>>;

  /** The raw, unoptimized SVG export of each node, keyed by node id. */
  fetchSvgs(
    nodeIds: readonly string[],
    onProgress?: ProgressCallback,
  ): Promise<Map<string, string>>;
};
