import { svgoConfig } from '@cds/figma-api/svgoConfig';
import { optimize, type Output } from 'svgo';

export type OptimizedSvg = Output;

/** Optimizes an exported icon SVG; throws when svgo cannot parse it. */
export const optimizeSvg = (rawSvg: string): OptimizedSvg => optimize(rawSvg, svgoConfig);
