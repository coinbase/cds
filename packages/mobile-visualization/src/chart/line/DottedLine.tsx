import { memo, useMemo } from 'react';
import type { SharedProps } from '@coinbase/cds-common/types';
import { useTheme } from '@coinbase/cds-mobile/hooks/useTheme';
import { DashPathEffect, LinearGradient, Path as SkiaPath, vec } from '@shopify/react-native-skia';

import { useCartesianChartContext } from '../ChartProvider';
import { type PathProps } from '../Path';
import { type PathAnimationConfig, usePathAnimation } from '../utils/animation';
import { getGradientScale, type Gradient, processGradient } from '../utils/gradient';

export type DottedLineProps = SharedProps &
  Omit<PathProps, 'fill' | 'strokeWidth' | 'd'> & {
    fill?: string;
    strokeWidth?: number;
    /**
     * Gradient configuration.
     * When provided, creates gradient or threshold-based coloring.
     */
    gradient?: Gradient;
    /**
     * Series ID - used to retrieve gradient scale from context.
     */
    seriesId?: string;
    /**
     * ID of the y-axis to use.
     */
    yAxisId?: string;
    d?: string;
    /**
     * Whether to animate the line.
     * Overrides the animate value from the chart context.
     */
    animate?: boolean;
    /**
     * Animation configuration for path transitions.
     * Allows customization of animation type, timing, springs, delays, and chaining.
     *
     * @example
     * // Simple timing animation
     * animationConfig={{ type: 'timing', config: { duration: 500 } }}
     *
     * @example
     * // Delayed spring animation
     * animationConfig={{
     *   type: 'delay',
     *   delayMs: 200,
     *   then: { type: 'spring', config: { damping: 15 } }
     * }}
     */
    animationConfig?: PathAnimationConfig;
  };

/**
 * A customizable dotted line component.
 * Supports gradient for gradient effects on the dots and smooth data transitions via AnimatedPath.
 */
export const DottedLine = memo<DottedLineProps>(
  ({
    fill = 'none',
    stroke,
    strokeDasharray = '0 4',
    strokeLinecap = 'round',
    strokeLinejoin = 'round',
    strokeOpacity = 1,
    strokeWidth = 2,
    vectorEffect = 'non-scaling-stroke',
    gradient,
    seriesId,
    yAxisId,
    d,
    animate: animateProp,
    animationConfig = { type: 'timing', config: { duration: 300 } },
    ...props
  }) => {
    const theme = useTheme();
    const context = useCartesianChartContext();

    const xScale = context.getXScale();
    const yScale = context.getYScale(yAxisId);

    // Use prop value if provided, otherwise fall back to context
    const shouldAnimate = animateProp ?? context.animate;

    const currentPath = d ?? '';

    // Process gradient to get gradient configuration
    const gradientConfig = useMemo(() => {
      if (!gradient || !xScale || !yScale) return;

      const scale = getGradientScale(gradient, xScale, yScale);
      if (!scale) return;

      const processed = processGradient(gradient, scale);
      if (!processed) return;

      const axisType = gradient.axis ?? 'y';
      const range = scale.range();

      // Determine gradient direction based on axis
      // For y-axis, we need to flip the gradient direction because y-scales are inverted
      // (higher data values have smaller pixel values, appearing at the top)
      const gradientStart = axisType === 'x' ? vec(range[0], 0) : vec(0, range[0]);
      const gradientEnd = axisType === 'x' ? vec(range[1], 0) : vec(0, range[1]);

      return {
        start: gradientStart,
        end: gradientEnd,
        colors: processed.colors,
        positions: processed.positions,
      };
    }, [gradient, xScale, yScale]);

    // Parse strokeDasharray into intervals for DashPathEffect
    // todo: change the prop to be this array instead
    const dashIntervals = useMemo(() => {
      if (!strokeDasharray) return [0, 4]; // default
      return strokeDasharray.split(/[\s,]+/).map((v) => parseFloat(v));
    }, [strokeDasharray]);

    const path = usePathAnimation({
      currentPath,
      animate: shouldAnimate,
      animationConfig,
    });

    return (
      <SkiaPath
        color={stroke ?? theme.color.bgLine}
        opacity={strokeOpacity}
        path={path}
        strokeCap={strokeLinecap}
        strokeJoin={strokeLinejoin}
        strokeWidth={strokeWidth}
        style="stroke"
      >
        <DashPathEffect intervals={dashIntervals} />
        {gradientConfig && (
          <LinearGradient
            colors={gradientConfig.colors}
            end={gradientConfig.end}
            positions={gradientConfig.positions ?? undefined}
            start={gradientConfig.start}
          />
        )}
      </SkiaPath>
    );
  },
);
