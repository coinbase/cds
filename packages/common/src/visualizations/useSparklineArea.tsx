import { useCallback } from 'react';
import { area, curveBasis } from 'd3-shape';

import type { SparklineGeneratorParams, UseSparklinePathParams } from './useSparklinePathGenerator';
import { useSparklinePathGenerator } from './useSparklinePathGenerator';

export const useSparklineArea = ({ height, ...props }: UseSparklinePathParams) => {
  const generator = useCallback(
    ({ xFunction, yFunction, data }: SparklineGeneratorParams) => {
      return (
        area<number>()
          .curve(curveBasis)
          .x((_, i) => xFunction(i))
          .y0(height)
          .y1((y) => yFunction(y))(data) ?? ''
      );
    },
    [height],
  );

  return useSparklinePathGenerator({ generator, height, ...props });
};
