import { memo, useMemo } from 'react';
import { useTheme } from '@coinbase/cds-mobile/hooks/useTheme';
import { LinearGradient, vec } from '@shopify/react-native-skia';

import { useCartesianChartContext } from '../ChartProvider';
import { Path, type PathProps } from '../Path';
import { ChartText } from '../text/ChartText';
import { type ColorMap, getColorMapScale, processColorMap } from '../utils/colorMap';

import type { AreaComponentProps } from './Area';

export type GradientAreaProps = Omit<PathProps, 'd' | 'fill' | 'fillOpacity'> &
  AreaComponentProps & {
    /**
     * Color mapping configuration.
     * Supports both continuous (smooth gradients) and discrete (threshold-based) coloring.
     * @example
     * colorMap={{
     *   type: 'continuous',
     *   colors: [
     *     { color: 'green', opacity: 0.4 },
     *     { color: 'green', opacity: 0 }
     *   ]
     * }}
     */
    colorMap?: ColorMap;
  };

/**
 * A customizable gradient area component which uses Path with Skia linear gradient shader.
 */
export const GradientArea = memo<GradientAreaProps>(
  ({ d, fill: fillProp, fillOpacity = 1, colorMap, baseline, yAxisId, clipRect, ...pathProps }) => {
    const context = useCartesianChartContext();
    const theme = useTheme();

    const fill = fillProp ?? theme.color.fgPrimary;

    // Get scales from context
    const xScale = context.getXScale();
    const yScale = context.getYScale(yAxisId);

    // Calculate gradient colors and positions
    const gradientConfig = useMemo(() => {
      // Create default fade gradient if no colorMap is provided
      const effectiveColorMap: ColorMap = colorMap ?? {
        type: 'continuous',
        axis: 'y',
        colors: [
          { color: fill, opacity: 0 },
          { color: fill, opacity: 0.4 },
        ],
      };

      const scale = getColorMapScale(effectiveColorMap, xScale, yScale);
      if (!scale) {
        console.warn('ColorMap requires a valid numeric scale');
        return null;
      }

      const processed = processColorMap(effectiveColorMap, scale);
      if (!processed) {
        return null;
      }

      const axisType = effectiveColorMap.axis ?? 'y';
      const range = scale.range();

      // Apply fillOpacity to all colors if fillOpacity < 1
      const colors = processed.colors;

      // Determine gradient direction based on axis
      const gradientStart = axisType === 'x' ? vec(range[0], 0) : vec(0, range[1]);
      const gradientEnd = axisType === 'x' ? vec(range[1], 0) : vec(0, range[0]);

      return {
        start: gradientStart,
        end: gradientEnd,
        colors,
        positions: processed.positions,
      };
    }, [colorMap, fill, xScale, yScale]);

    if (!gradientConfig)
      return (
        <ChartText x={50} y={50}>
          No gradient config
        </ChartText>
      );

    return (
      <Path clipRect={clipRect} d={d} fill={fill} {...pathProps}>
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
