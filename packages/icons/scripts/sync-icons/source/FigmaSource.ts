import { fetchSvgs } from '@cds/figma-api/fetchSvgs';

import { fetchComponentSets, fetchSetNodes } from './fetchComponents';
import type { ComponentSet, IconSource, ProgressCallback } from './IconSource';

export type FigmaSourceOptions = {
  /** The Figma file the icon component sets are published from. */
  fileId: string;
};

/** Icons published as a Figma library, read through the Figma REST API. */
export class FigmaSource implements IconSource {
  private readonly options: FigmaSourceOptions;

  constructor(options: FigmaSourceOptions) {
    this.options = options;
  }

  listComponentSets() {
    return fetchComponentSets(this.options.fileId);
  }

  fetchSetNodes(sets: readonly ComponentSet[]) {
    return fetchSetNodes(this.options.fileId, sets);
  }

  fetchSvgs(nodeIds: readonly string[], onProgress?: ProgressCallback) {
    return fetchSvgs(this.options.fileId, nodeIds, onProgress);
  }
}
