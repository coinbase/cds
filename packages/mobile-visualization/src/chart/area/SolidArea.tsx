import { memo, useMemo } from 'react';
import { useTheme } from '@coinbase/cds-mobile/hooks/useTheme';
import { LinearGradient, vec } from '@shopify/react-native-skia';

import { useCartesianChartContext } from '../ChartProvider';
import { Path, type PathProps } from '../Path';
import { processGradient } from '../utils/gradient';

import type { AreaComponentProps } from './Area';

export type SolidAreaProps = Omit<PathProps, 'd' | 'fill' | 'fillOpacity'> & AreaComponentProps;

/**
 * A customizable solid area component which uses Path.
 * When a gradient is provided, renders with gradient fill.
 * Otherwise, renders with solid fill (no automatic fade).
 */
export const SolidArea = memo<SolidAreaProps>(
  ({ d, fill: fillProp, fillOpacity = 1, clipRect, gradient, seriesId, yAxisId, ...props }) => {
    const context = useCartesianChartContext();
    const theme = useTheme();

    const fill = fillProp ?? theme.color.fgPrimary;

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
      if (!effectiveGradient) return null;

      // Use gradientScale if available, otherwise get the appropriate scale based on axis
      let scale = gradientScale;
      if (!scale) {
        const axis = effectiveGradient.axis ?? 'y';
        scale = axis === 'x' ? xScale : yScale;
      }

      if (!scale) return null;

      const processed = processGradient(effectiveGradient, scale);
      if (!processed) return null;

      const axisType = effectiveGradient.axis ?? 'y';
      const range = scale.range();

      // Determine gradient direction based on axis
      const gradientStart = axisType === 'x' ? vec(range[0], 0) : vec(0, range[1]);
      const gradientEnd = axisType === 'x' ? vec(range[1], 0) : vec(0, range[0]);

      return {
        start: gradientStart,
        end: gradientEnd,
        colors: processed.colors,
        positions: processed.positions,
      };
    }, [effectiveGradient, gradientScale, xScale, yScale]);

    // If no gradient, render solid
    if (!gradientConfig) {
      return <Path clipRect={clipRect} d={d} fill={fill} fillOpacity={fillOpacity} {...props} />;
    }

    // Render with gradient
    return (
      <Path clipRect={clipRect} d={d} fill={fill} fillOpacity={fillOpacity} {...props}>
        <LinearGradient
          colors={gradientConfig.colors}
          end={gradientConfig.end}
          mode="clamp"
          positions={gradientConfig.positions}
          start={gradientConfig.start}
        />
      </Path>
    );
  },
);
