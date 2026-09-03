import type { Config } from 'svgo';
import { optimize } from 'svgo';

import { defaultSvgoConfig } from './svgoConfig';

export function optimizeSvg(content: string, svgConfig: Config = defaultSvgoConfig): string {
  const optimizedSvg = optimize(content, svgConfig);
  return optimizedSvg.data;
}
