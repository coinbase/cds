import { memo, useMemo } from 'react';
import { useTheme } from '@coinbase/cds-mobile/hooks/useTheme';
import { LinearGradient, vec } from '@shopify/react-native-skia';

import { useCartesianChartContext } from '../ChartProvider';
import { Path, type PathProps } from '../Path';
import { type ColorMap, processColorMap } from '../utils/colorMap';

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
 *
 * When no colorMap is provided, automatically creates an appropriate gradient:
 * - For data crossing zero: Creates a diverging gradient with peak opacity at both extremes
 *   and baseline opacity at zero (or the specified baseline).
 * - For all-positive or all-negative data: Creates a simple gradient from baseline to peak.
 */
export const GradientArea = memo<GradientAreaProps>(
  ({
    d,
    fill: fillProp,
    fillOpacity = 1,
    colorMap,
    seriesId,
    baseline,
    yAxisId,
    clipRect,
    ...pathProps
  }) => {
    const context = useCartesianChartContext();
    const theme = useTheme();

    const fill = fillProp ?? theme.color.fgPrimary;

    // Get colorMap scale from context if seriesId is provided and has a colorMap
    const colorMapScale = seriesId ? context.getSeriesColorMapScale(seriesId) : undefined;

    // Get scales directly for default gradient when no colorMap is defined
    const xScale = context.getXScale();
    const yScale = context.getYScale(yAxisId);

    // Calculate gradient colors and positions
    const gradientConfig = useMemo(() => {
      // If no colorMap is provided, create a default diverging gradient around baseline
      let effectiveColorMap: ColorMap;

      if (!colorMap) {
        // Get the y-scale to determine if we need a diverging gradient
        const scale = yScale;
        const yDomain = scale?.domain();

        // Check if data crosses zero to determine gradient type
        let shouldDiverge = false;
        let baselineValue = 0;

        if (yDomain && Array.isArray(yDomain) && yDomain.length === 2) {
          const [minValue, maxValue] = yDomain;

          if (minValue >= 0) {
            // All positive: simple gradient from bottom
            baselineValue = minValue;
          } else if (maxValue <= 0) {
            // All negative: simple gradient from top
            baselineValue = maxValue;
          } else {
            // Crosses zero: use diverging gradient
            shouldDiverge = true;
            baselineValue = baseline ?? 0;
          }
        }

        // Create default gradient (diverging if data crosses zero)
        if (shouldDiverge) {
          effectiveColorMap = {
            type: 'continuous',
            axis: 'y',
            colors: [
              { color: fill, opacity: 0.4 },
              { color: fill, opacity: 0 },
              { color: fill, opacity: 0.4 },
            ],
            stops: yDomain ? [yDomain[0], baselineValue, yDomain[1]] : undefined,
          };
        } else {
          // Simple gradient from baseline to peak
          effectiveColorMap = {
            type: 'continuous',
            axis: 'y',
            colors: [
              { color: fill, opacity: 0 },
              { color: fill, opacity: 0.4 },
            ],
          };
        }
      } else {
        effectiveColorMap = colorMap;
      }

      // Use colorMapScale if available (from series colorMap), otherwise calculate for default gradient
      let scale = colorMapScale;
      if (!scale && !colorMap) {
        // For default gradient, get the appropriate scale based on axis
        const axis = effectiveColorMap.axis ?? 'y';
        scale = axis === 'x' ? xScale : yScale;
      }

      if (!scale) {
        console.warn('ColorMap requires a valid numeric scale');
        return;
      }

      const processed = processColorMap(effectiveColorMap, scale);
      if (!processed) {
        return;
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
    }, [colorMap, fill, baseline, colorMapScale, xScale, yScale]);

    if (!gradientConfig) return;

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
