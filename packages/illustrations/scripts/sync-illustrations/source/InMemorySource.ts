import { ColorPalette } from '../colorPalette';
import type { Component } from '../illustration';

import type {
  ComponentListing,
  IllustrationSource,
  InvalidComponent,
  ProgressCallback,
} from './IllustrationSource';

/**
 * A source backed by plain data, for tests: mutate `components` and `svgs` between syncs to
 * simulate designers publishing changes.
 */
export class InMemorySource implements IllustrationSource {
  components: Component[];
  /** Published components with an unusable name. */
  invalid: InvalidComponent[];
  /** Raw SVG export per node id. */
  svgs: Record<string, string>;
  palette: ColorPalette;

  constructor({
    components = [],
    invalid = [],
    svgs = {},
    palette = new ColorPalette([]),
  }: Partial<Pick<InMemorySource, 'components' | 'invalid' | 'svgs' | 'palette'>> = {}) {
    this.components = components;
    this.invalid = invalid;
    this.svgs = svgs;
    this.palette = palette;
  }

  async listComponents(): Promise<ComponentListing> {
    return { components: [...this.components], invalid: [...this.invalid] };
  }

  async fetchSvgs(nodeIds: string[], onProgress?: ProgressCallback) {
    const svgs = new Map<string, string>();
    nodeIds.forEach((nodeId, index) => {
      const svg = this.svgs[nodeId];
      if (svg === undefined) throw new Error(`No SVG for node ${nodeId}`);
      svgs.set(nodeId, svg);
      onProgress?.(index + 1, nodeIds.length);
    });
    return svgs;
  }

  async fetchPalette() {
    return this.palette;
  }
}
