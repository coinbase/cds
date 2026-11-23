import type {
  ComponentSet,
  IconSource,
  LooseComponent,
  ProgressCallback,
  SetNode,
} from './IconSource';

/** One variant of an icon set: `name` is the Figma variant name, such as `size=24, active=true`. */
export type InMemoryVariant = { id: string; name: string; svg: string };

/** An icon set as the Figma library lists it, with its variants and their SVG exports. */
export type InMemoryIconSet = {
  nodeId: string;
  /** The component set name, such as `ui/add`. */
  name: string;
  description?: string;
  createdAt?: string;
  updatedAt?: string;
  variants: InMemoryVariant[];
};

/**
 * A source backed by plain data, for tests: mutate `sets` and `loose` between syncs to simulate
 * designers publishing changes. `requestedSetIds` and `requestedSvgIds` record what the sync
 * downloaded, so a test can check that an unchanged icon set was not fetched again.
 */
export class InMemorySource implements IconSource {
  sets: InMemoryIconSet[];
  loose: LooseComponent[];
  requestedSetIds: string[] = [];
  requestedSvgIds: string[] = [];

  constructor({ sets = [], loose = [] }: Partial<Pick<InMemorySource, 'sets' | 'loose'>> = {}) {
    this.sets = sets;
    this.loose = loose;
  }

  private listing = (set: InMemoryIconSet) =>
    ({
      node_id: set.nodeId,
      name: set.name,
      description: set.description ?? '',
      created_at: set.createdAt ?? '2026-01-01T00:00:00.000Z',
      updated_at: set.updatedAt ?? '2026-01-01T00:00:00.000Z',
    }) as ComponentSet;

  async listComponentSets() {
    return this.sets.map(this.listing);
  }

  async listLooseComponents() {
    return [...this.loose];
  }

  async fetchSetNodes(sets: readonly ComponentSet[]) {
    const nodes: Record<string, SetNode> = {};
    for (const { node_id: nodeId } of sets) {
      const set = this.sets.find((candidate) => candidate.nodeId === nodeId);
      if (!set) continue;
      this.requestedSetIds.push(nodeId);
      nodes[nodeId] = {
        document: {
          type: 'COMPONENT_SET',
          id: set.nodeId,
          name: set.name,
          children: set.variants.map(({ id, name }) => ({ type: 'COMPONENT', id, name })),
        },
        metadata: this.listing(set),
      } as unknown as SetNode;
    }
    return nodes;
  }

  async fetchSvgs(nodeIds: readonly string[], onProgress?: ProgressCallback) {
    const variants = new Map(
      this.sets.flatMap(({ variants: setVariants }) => setVariants).map((v) => [v.id, v]),
    );
    const svgs = new Map<string, string>();
    nodeIds.forEach((nodeId, index) => {
      const variant = variants.get(nodeId);
      if (!variant) throw new Error(`No SVG for node ${nodeId}`);
      this.requestedSvgIds.push(nodeId);
      svgs.set(nodeId, variant.svg);
      onProgress?.(index + 1, nodeIds.length);
    });
    return svgs;
  }
}
