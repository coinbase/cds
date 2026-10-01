import { fetchColorPalette } from './fetchColorPalette';
import { fetchComponents } from './fetchComponents';
import { fetchSvgs } from './fetchSvgs';
import type { IllustrationSource, ProgressCallback } from './IllustrationSource';

export type FigmaSourceOptions = {
  /** The Figma file the illustration components are published from. */
  fileId: string;
  /** The Figma file holding the published color variables. */
  colorsFileId: string;
  /** Name prefix of the palette variables, e.g. `illustration` for `illustration/primary`. */
  paletteVariablePrefix: string;
};

/** Illustrations published as a Figma library, read through the Figma REST API. */
export class FigmaSource implements IllustrationSource {
  private readonly options: FigmaSourceOptions;

  constructor(options: FigmaSourceOptions) {
    this.options = options;
  }

  listComponents() {
    return fetchComponents(this.options.fileId);
  }

  fetchSvgs(nodeIds: string[], onProgress?: ProgressCallback) {
    return fetchSvgs(this.options.fileId, nodeIds, onProgress);
  }

  fetchPalette() {
    return fetchColorPalette(this.options.colorsFileId, this.options.paletteVariablePrefix);
  }
}
