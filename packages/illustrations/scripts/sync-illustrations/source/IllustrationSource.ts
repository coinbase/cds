import type { ColorPalette } from '../colorPalette';
import type { Component } from '../illustration';

export type ProgressCallback = (completed: number, total: number) => void;

/**
 * Where illustrations come from. The sync needs exactly three things from the outside world, and
 * nothing else in it knows about Figma: `FigmaSource` is the production implementation,
 * `InMemorySource` lets tests drive the whole pipeline without a network.
 */
export type IllustrationSource = {
  /** Every published illustration component with the metadata the sync needs. Expected to be cheap. */
  listComponents(): Promise<Component[]>;

  /** The raw, unoptimized SVG export of each node, keyed by node id. */
  fetchSvgs(nodeIds: string[], onProgress?: ProgressCallback): Promise<Map<string, string>>;

  /** The illustration color palette, with a light and a dark value per color. */
  fetchPalette(): Promise<ColorPalette>;
};
