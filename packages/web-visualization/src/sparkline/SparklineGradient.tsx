import React, { forwardRef, memo } from 'react';

import type { SparklineBaseProps } from './Sparkline';
import { Sparkline } from './Sparkline';
import type { SparklinePathRef } from './SparklinePath';

/**
 * @deprecated Use LineChart instead.
 */
export const SparklineGradient = memo(
  forwardRef<SparklinePathRef, SparklineBaseProps>(
    ({ background, color, path, height, width, yAxisScalingFactor, children }, ref) => {
      return (
        <Sparkline
          ref={ref}
          background={background}
          color={color}
          fillType="dotted"
          height={height}
          path={path}
          strokeType="gradient"
          width={width}
          yAxisScalingFactor={yAxisScalingFactor}
        >
          {children}
        </Sparkline>
      );
    },
  ),
);

SparklineGradient.displayName = 'SparklineGradient';
