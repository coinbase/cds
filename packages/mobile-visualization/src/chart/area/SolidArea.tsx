import { memo, useEffect, useMemo, useRef } from 'react';
import { useSharedValue, withTiming } from 'react-native-reanimated';
import { useTheme } from '@coinbase/cds-mobile/hooks/useTheme';
import { LinearGradient, Path as SkiaPath, vec } from '@shopify/react-native-skia';

import { useCartesianChartContext } from '../ChartProvider';
import { type PathProps } from '../Path';
import { useD3PathInterpolation } from '../utils/animation';
import { getGradientScale, processGradient } from '../utils/gradient';

import type { AreaComponentProps } from './Area';

export type SolidAreaProps = Omit<PathProps, 'd' | 'fill' | 'fillOpacity'> & AreaComponentProps;

/**
 * A customizable solid area component which uses Path.
 * When a gradient is provided, renders with gradient fill.
 * Otherwise, renders with solid fill (no automatic fade).
 */
export const SolidArea = memo<SolidAreaProps>(
  ({
    d,
    fill: fillProp,
    fillOpacity = 1,
    clipRect,
    gradient,
    seriesId,
    yAxisId,
    animate: animateProp,
    ...props
  }) => {
    const context = useCartesianChartContext();
    const theme = useTheme();

    const fill = fillProp ?? theme.color.fgPrimary;

    // Use prop value if provided, otherwise fall back to context
    const shouldAnimate = animateProp ?? context.animate;

    // Track previous path for smooth transitions
    const previousPathRef = useRef(d ?? '');
    const progress = useSharedValue(shouldAnimate ? 0 : 1);

    const currentPath = d ?? '';

    // Get gradient from series if seriesId is provided and gradient is not
    const targetSeries = seriesId ? context.getSeries(seriesId) : undefined;
    const seriesGradient = targetSeries?.gradient;
    const effectiveGradient = gradient ?? seriesGradient;

    // Get gradient scale from context if seriesId is provided and has a gradient
    const gradientScale = seriesId ? context.getSeriesGradientScale(seriesId) : undefined;

    // Get scales for gradient calculation
    const xScale = context.getXScale();
    const yScale = context.getYScale(yAxisId);

    // Calculate gradient configuration
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
      <SkiaPath color={fill} opacity={fillOpacity} path={path} style="fill">
        {gradientConfig && (
          <LinearGradient
            colors={gradientConfig.colors}
            end={gradientConfig.end}
            mode="clamp"
            positions={gradientConfig.positions}
            start={gradientConfig.start}
          />
        )}
      </SkiaPath>
    );
  },
);
