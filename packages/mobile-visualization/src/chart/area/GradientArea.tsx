import { memo, useMemo } from 'react';
import { useTheme } from '@coinbase/cds-mobile/hooks/useTheme';
import { LinearGradient, vec } from '@shopify/react-native-skia';

import { useCartesianChartContext } from '../ChartProvider';
import { Path, type PathProps } from '../Path';
import { type Gradient, processGradient } from '../utils/gradient';

import type { AreaComponentProps } from './Area';

export type GradientAreaProps = Omit<PathProps, 'd' | 'fill' | 'fillOpacity'> &
  AreaComponentProps & {
    /**
     * Color gradient configuration.
     * Supports smooth gradient transitions.
     * @example
     * gradient={{
     *   stops: [
     *     { offset: 0, color: 'green', opacity: 0.4 },
     *     { offset: 100, color: 'green', opacity: 0 }
     *   ]
     * }}
     */
    gradient?: Gradient;
  };

/**
 * A customizable gradient area component which uses Path with Skia linear gradient shader.
 *
 * When no gradient is provided, automatically creates an appropriate gradient:
 * - For data crossing zero: Creates a diverging gradient with peak opacity at both extremes
 *   and baseline opacity at zero (or the specified baseline).
 * - For all-positive or all-negative data: Creates a simple gradient from baseline to peak.
 */
export const GradientArea = memo<GradientAreaProps>(
  ({
    d,
    fill: fillProp,
    fillOpacity = 1,
    gradient,
    seriesId,
    baseline,
    yAxisId,
    clipRect,
    ...pathProps
  }) => {
    const context = useCartesianChartContext();
    const theme = useTheme();

    const fill = fillProp ?? theme.color.fgPrimary;

    // Get gradient scale from context if seriesId is provided and has a gradient
    const gradientScale = seriesId ? context.getSeriesGradientScale(seriesId) : undefined;

    // Get scales directly for default gradient when no gradient is defined
    const xScale = context.getXScale();
    const yScale = context.getYScale(yAxisId);

    // Calculate gradient colors and positions
    const gradientConfig = useMemo(() => {
      // If no gradient is provided, create a default diverging gradient around baseline
      let effectiveGradient: Gradient;

      if (!gradient) {
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
          effectiveGradient = {
            axis: 'y',
            stops: yDomain
              ? [
                  { offset: yDomain[0], color: fill, opacity: 0.4 },
                  { offset: baselineValue, color: fill, opacity: 0 },
                  { offset: yDomain[1], color: fill, opacity: 0.4 },
                ]
              : [
                  { offset: 0, color: fill, opacity: 0.4 },
                  { offset: 50, color: fill, opacity: 0 },
                  { offset: 100, color: fill, opacity: 0.4 },
                ],
          };
        } else {
          // Simple gradient from baseline to peak
          effectiveGradient = {
            axis: 'y',
            stops: [
              { offset: 0, color: fill, opacity: 0 },
              { offset: 100, color: fill, opacity: 0.4 },
            ],
          };
        }
      } else {
        effectiveGradient = gradient;
      }

      // Use gradientScale if available (from series gradient), otherwise calculate for default gradient
      let scale = gradientScale;
      if (!scale && !gradient) {
        // For default gradient, get the appropriate scale based on axis
        const axis = effectiveGradient.axis ?? 'y';
        scale = axis === 'x' ? xScale : yScale;
      }

      if (!scale) {
        console.warn('Gradient requires a valid numeric scale');
        return;
      }

      const processed = processGradient(effectiveGradient, scale);
      if (!processed) {
        return;
      }

      const axisType = effectiveGradient.axis ?? 'y';
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
    }, [gradient, fill, baseline, gradientScale, xScale, yScale]);

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
