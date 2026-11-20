import type { ColorPalette } from '../colorPalette';
import type { Component } from '../illustration';

/** A published component whose name the sync cannot use, with what to fix. */
export type InvalidComponent = {
  nodeId: string;
  /** The name as it is in Figma. */
  name: string;
  url: string;
  message: string;
};

export type ComponentListing = { components: Component[]; invalid: InvalidComponent[] };

export type ProgressCallback = (completed: number, total: number) => void;

/**
 * Where illustrations come from. The sync needs exactly three things from the outside world, and
 * nothing else in it knows about Figma: `FigmaSource` is the production implementation,
 * `InMemorySource` lets tests drive the whole pipeline without a network.
 */
export type IllustrationSource = {
  /**
   * Every published component with the metadata the sync needs, split into the ones the sync can
   * use and the ones with an unusable name. Expected to be cheap.
   */
  listComponents(): Promise<ComponentListing>;

  /** The raw, unoptimized SVG export of each node, keyed by node id. */
  fetchSvgs(nodeIds: string[], onProgress?: ProgressCallback): Promise<Map<string, string>>;

  /** The illustration color palette, with a light and a dark value per color. */
  fetchPalette(): Promise<ColorPalette>;
};
