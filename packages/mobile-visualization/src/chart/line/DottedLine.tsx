import { memo, useEffect, useMemo, useRef } from 'react';
import { useSharedValue, withTiming } from 'react-native-reanimated';
import type { SharedProps } from '@coinbase/cds-common/types';
import { useTheme } from '@coinbase/cds-mobile/hooks/useTheme';
import { DashPathEffect, LinearGradient, Path as SkiaPath, vec } from '@shopify/react-native-skia';

import { useCartesianChartContext } from '../ChartProvider';
import { type PathProps } from '../Path';
import { useD3PathInterpolation } from '../utils/animation';
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
    ...props
  }) => {
    const theme = useTheme();
    const context = useCartesianChartContext();

    const xScale = context.getXScale();
    const yScale = context.getYScale(yAxisId);

    // Use prop value if provided, otherwise fall back to context
    const shouldAnimate = animateProp ?? context.animate;

    // Track previous path for smooth transitions
    const previousPathRef = useRef(d ?? '');
    const progress = useSharedValue(shouldAnimate ? 0 : 1);

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

    // Animate when path changes
    useEffect(() => {
      if (currentPath !== previousPathRef.current && shouldAnimate) {
        progress.value = 0;
        progress.value = withTiming(1, { duration: 300 });
        previousPathRef.current = currentPath;
      }
    }, [currentPath, shouldAnimate, progress]);

    const path = useD3PathInterpolation(progress, previousPathRef.current, currentPath);

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
