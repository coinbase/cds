import type { ColorPalette, Component } from '../illustration';

import type { IllustrationSource, ProgressCallback } from './IllustrationSource';

/**
 * A source backed by plain data, for tests: mutate `components` and `svgs` between syncs to
 * simulate designers publishing changes.
 */
export class InMemorySource implements IllustrationSource {
  components: Component[];
  /** Raw SVG export per node id. */
  svgs: Record<string, string>;
  palette: ColorPalette;

  constructor({
    components = [],
    svgs = {},
    palette = [],
  }: Partial<Pick<InMemorySource, 'components' | 'svgs' | 'palette'>> = {}) {
    this.components = components;
    this.svgs = svgs;
    this.palette = palette;
  }

  async listComponents() {
    return [...this.components];
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
    return [...this.palette];
  }
}
