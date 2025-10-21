import { memo, useMemo } from 'react';
import { LinearGradient, vec } from '@shopify/react-native-skia';

import { useCartesianChartContext } from '../ChartProvider';
import { Path, type PathProps } from '../Path';
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
  ({ d, fill, fillOpacity = 1, colorMap, baseline, yAxisId, clipRect, ...pathProps }) => {
    const context = useCartesianChartContext();

    // Get scales from context
    const xScale = context.getXScale();
    const yScale = context.getYScale(yAxisId);

    // Calculate gradient colors and positions
    const gradientConfig = useMemo(() => {
      if (!colorMap) {
        console.warn('GradientArea requires a colorMap prop');
        return null;
      }

      const scale = getColorMapScale(colorMap, xScale, yScale);
      if (!scale) {
        console.warn('ColorMap requires a valid numeric scale');
        return null;
      }

      const processed = processColorMap(colorMap, scale);
      if (!processed) {
        return null;
      }

      const axisType = colorMap.axis ?? 'y';
      const range = scale.range();

      // Apply fillOpacity to all colors if fillOpacity < 1
      const colors =
        fillOpacity === 1
          ? processed.colors
          : processed.colors.map((color) => {
              // Extract rgba values and multiply alpha
              const match = color.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*([\d.]+))?\)/);
              if (match) {
                const [, r, g, b, a = '1'] = match;
                const newAlpha = parseFloat(a) * fillOpacity;
                return `rgba(${r}, ${g}, ${b}, ${newAlpha})`;
              }
              return color;
            });

      // Determine gradient direction based on axis
      const gradientStart = axisType === 'x' ? vec(range[0], 0) : vec(0, range[1]);
      const gradientEnd = axisType === 'x' ? vec(range[1], 0) : vec(0, range[0]);

      return {
        start: gradientStart,
        end: gradientEnd,
        colors,
        positions: processed.positions,
      };
    }, [colorMap, xScale, yScale, fillOpacity]);

    if (!gradientConfig) return null;

    return (
      <Path clipRect={clipRect} d={d} {...pathProps}>
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
