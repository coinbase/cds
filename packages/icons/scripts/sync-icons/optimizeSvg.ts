import { optimize, type Output } from 'svgo';

import { svgoConfig } from './svgoConfig';

export type OptimizedSvg = Output;

/** Optimizes an exported icon SVG; throws when svgo cannot parse it. */
export const optimizeSvg = (rawSvg: string): OptimizedSvg => optimize(rawSvg, svgoConfig);
