import { memo, useMemo } from 'react';
import { useTheme } from '@coinbase/cds-mobile/hooks/useTheme';
import { LinearGradient, Skia, vec } from '@shopify/react-native-skia';

import { useCartesianChartContext } from '../ChartProvider';
import { Path, type PathProps } from '../Path';

import type { AreaComponentProps } from './Area';

/**
 * Converts a color string to a format with the specified opacity.
 * This allows us to encode opacity per color stop in the gradient.
 *
 * For simplicity, we use a transparent color overlay approach:
 * We return the color with the opacity value appended in a way Skia understands.
 */
const colorWithOpacity = (color: string, opacity: number): string => {
  // If opacity is 1, return the color as-is
  if (opacity === 1) return color;

  // Parse the color to get RGB values
  // For now, use a simple approach: convert common color formats
  // Skia's LinearGradient accepts standard CSS color formats including rgba()

  // If the color is already in rgba/rgb format, we'd need to parse it
  // For hex colors like #RRGGBB, we need to convert
  // For named colors, we can't easily get RGB without a lookup table

  // Simple approach: Use a canvas-like trick or just return color with lower opacity
  // For Skia, we can actually just use the color as-is and rely on the path's opacity
  // But we want per-stop opacity, so we need to encode it in the color

  // Let's use a hex color approach - convert any color to hex with alpha
  const skColor = Skia.Color(color);
  // skColor is a Float32Array [r, g, b, a] with values 0-1
  const r = Math.round(skColor[0] * 255);
  const g = Math.round(skColor[1] * 255);
  const b = Math.round(skColor[2] * 255);

  return `rgba(${r}, ${g}, ${b}, ${opacity})`;
};

export type GradientStop = {
  /**
   * Data value threshold where this color should be applied.
   * For example, 0 for the zero line, 85 for warning threshold, etc.
   */
  threshold: number;
  /**
   * Color at this stop.
   */
  color: string;
  /**
   * Optional opacity at this stop.
   * @default 1
   */
  opacity?: number;
};

export type GradientAreaProps = Omit<PathProps, 'd' | 'fill' | 'fillOpacity'> &
  AreaComponentProps & {
    /**
     * The color at peak values (top/bottom of gradient).
     * @default fill or theme.color.fgPrimary
     */
    peakColor?: string;
    /**
     * The color at the baseline (0 or edge closest to 0).
     * @default peakColor or fill
     */
    baselineColor?: string;
    /**
     * Opacity at peak values.
     * @default 0.3
     */
    peakOpacity?: number;
    /**
     * Opacity at the baseline.
     * @default 0
     */
    baselineOpacity?: number;
    /**
     * Custom gradient stops based on data value thresholds.
     * When provided, overrides peakColor/baselineColor.
     * Useful for creating threshold-based gradients (e.g., negative/positive color shifts).
     */
    stops?: GradientStop[];
  };

/**
 * A customizable gradient area component which uses Path with Skia linear gradient shader.
 */
export const GradientArea = memo<GradientAreaProps>(
  ({
    d,
    fill,
    fillOpacity = 1,
    peakColor,
    baselineColor,
    peakOpacity = 0.3,
    baselineOpacity = 0,
    baseline,
    yAxisId,
    clipRect,
    stops,
    ...pathProps
  }) => {
    // Apply fillOpacity as a multiplier to individual opacities
    const effectivePeakOpacity = peakOpacity * fillOpacity;
    const effectiveBaselineOpacity = baselineOpacity * fillOpacity;
    const context = useCartesianChartContext();
    const theme = useTheme();

    // Get the y-scale for the specified axis (or default)
    const yScale = context.getYScale(yAxisId);
    const yRange = yScale?.range();
    const yDomain = yScale?.domain();

    // Auto-calculate baseline position based on domain
    const baselinePosition = useMemo(() => {
      if (!yScale || !yDomain || !yRange) return undefined;

      const [minValue, maxValue] = yDomain;

      let dataBaseline: number;
      if (minValue >= 0) {
        // All positive: baseline at min
        dataBaseline = minValue;
      } else if (maxValue <= 0) {
        // All negative: baseline at max
        dataBaseline = maxValue;
      } else {
        // Crosses zero: baseline at 0
        dataBaseline = 0;
      }

      // Get the actual y coordinate for the baseline
      const scaledValue = yScale(baseline ?? dataBaseline);
      return typeof scaledValue === 'number' ? scaledValue : undefined;
    }, [yScale, yDomain, yRange, baseline]);

    const effectiveFill = fill ?? theme.color.fgPrimary;
    const effectivePeakColor = peakColor ?? effectiveFill;
    const effectiveBaselineColor = baselineColor ?? effectivePeakColor;

    // Calculate gradient colors and positions with opacity encoded
    const gradientConfig = useMemo(() => {
      if (!yRange) return null;

      const [yBottom, yTop] = yRange; // yRange is [bottom, top] for chart coordinates

      // If custom stops are provided, use threshold-based gradient
      if (stops && stops.length > 0 && yScale) {
        // Convert data thresholds to pixel positions and then to 0-1 offsets
        const skiaStops = stops
          .map((stop) => {
            const pixelY = yScale(stop.threshold) ?? 0;
            // Convert to 0-1 offset for Skia LinearGradient
            const offset = (pixelY - yTop) / (yBottom - yTop);

            return {
              offset: Math.max(0, Math.min(1, offset)),
              color: colorWithOpacity(stop.color, (stop.opacity ?? 1) * fillOpacity),
            };
          })
          // CRITICAL: Sort by offset in ascending order (required by Skia)
          .sort((a, b) => a.offset - b.offset);

        return {
          start: vec(0, yTop),
          end: vec(0, yBottom),
          colors: skiaStops.map((s) => s.color),
          positions: skiaStops.map((s) => s.offset),
        };
      }

      // If we have a baseline position, create a diverging gradient
      if (baselinePosition !== undefined) {
        // Create a gradient with 3 color stops: peak → baseline → peak
        const baselinePercent = (baselinePosition - yTop) / (yBottom - yTop);

        return {
          start: vec(0, yTop),
          end: vec(0, yBottom),
          colors: [
            colorWithOpacity(effectivePeakColor, effectivePeakOpacity),
            colorWithOpacity(effectiveBaselineColor, effectiveBaselineOpacity),
            colorWithOpacity(effectivePeakColor, effectivePeakOpacity),
          ],
          positions: [0, baselinePercent, 1],
        };
      }

      // Simple 2-color gradient from top to bottom
      return {
        start: vec(0, yTop),
        end: vec(0, yBottom),
        colors: [
          colorWithOpacity(effectivePeakColor, effectivePeakOpacity),
          colorWithOpacity(effectiveBaselineColor, effectiveBaselineOpacity),
        ],
        positions: undefined,
      };
    }, [
      yRange,
      yScale,
      stops,
      fillOpacity,
      baselinePosition,
      effectivePeakColor,
      effectiveBaselineColor,
      effectivePeakOpacity,
      effectiveBaselineOpacity,
    ]);

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
