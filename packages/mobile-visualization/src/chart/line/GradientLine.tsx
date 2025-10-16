import { memo, useMemo } from 'react';
import type { SharedProps } from '@coinbase/cds-common/types';
import { useTheme } from '@coinbase/cds-mobile/hooks/useTheme';
import { Skia, TileMode } from '@shopify/react-native-skia';

import { useCartesianChartContext } from '../ChartProvider';
import { Path, type PathProps } from '../Path';

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

export type GradientLineProps = SharedProps &
  Omit<PathProps, 'stroke' | 'strokeOpacity' | 'strokeWidth'> & {
    /**
     * The color of the line.
     * @default theme.color.bgLine
     */
    stroke?: string;
    /**
     * Opacity of the line.
     * @default 1
     */
    strokeOpacity?: number;
    /**
     * Path stroke width
     * @default 2
     */
    strokeWidth?: number;
    /**
     * The color of the start of the gradient.
     * @default stroke or theme.color.bgLine
     */
    startColor?: string;
    /**
     * The color of the end of the gradient.
     * @default stroke or theme.color.bgLine
     */
    endColor?: string;
    /**
     * Opacity of the start color.
     * @default strokeOpacity
     */
    startOpacity?: number;
    /**
     * Opacity of the end color.
     * @default strokeOpacity
     */
    endOpacity?: number;
    /**
     * Custom gradient stops based on data value thresholds.
     * When provided, overrides startColor/endColor.
     * Useful for creating threshold-based gradients (e.g., negative/positive color shifts).
     */
    stops?: GradientStop[];
    /**
     * Y-axis ID to use for calculating threshold positions.
     * Only needed if using `stops` with multiple y-axes.
     */
    yAxisId?: string;
  };

/**
 * Helper to convert a color and opacity to an RGBA string that Skia understands.
 */
const colorWithOpacity = (color: string, opacity: number): string => {
  if (opacity === 1) return color;

  const skColor = Skia.Color(color);
  const r = Math.round(skColor[0] * 255);
  const g = Math.round(skColor[1] * 255);
  const b = Math.round(skColor[2] * 255);

  return `rgba(${r}, ${g}, ${b}, ${opacity})`;
};

/**
 * A gradient line component which uses path element with Skia linear gradient shader.
 */
export const GradientLine = memo<GradientLineProps>(
  ({
    fill = 'none',
    stroke,
    startColor,
    endColor,
    strokeOpacity = 1,
    startOpacity = strokeOpacity,
    endOpacity = strokeOpacity,
    strokeLinecap = 'round',
    strokeLinejoin = 'round',
    strokeWidth = 2,
    animate,
    stops,
    yAxisId,
    ...props
  }) => {
    const context = useCartesianChartContext();
    const theme = useTheme();

    const shouldAnimate = animate ?? context.animate;

    // Get the chart dimensions from context to create the gradient
    const { height: chartHeight } = context;
    const yScale = context.getYScale(yAxisId);

    // Create a Skia linear gradient shader
    const shader = useMemo(() => {
      // If custom stops are provided, use threshold-based gradient
      if (stops && stops.length > 0 && yScale) {
        const yRange = yScale.range(); // [bottom, top] in pixels

        // Convert data thresholds to pixel positions and then to 0-1 offsets
        const skiaStops = stops
          .map((stop) => {
            const pixelY = yScale(stop.threshold) ?? 0;
            // Convert to 0-1 offset for Skia LinearGradient
            // yRange[1] is top (smaller y), yRange[0] is bottom (larger y)
            const offset = (pixelY - yRange[1]) / (yRange[0] - yRange[1]);

            return {
              offset: Math.max(0, Math.min(1, offset)),
              color: colorWithOpacity(stop.color, stop.opacity ?? 1),
            };
          })
          // CRITICAL: Sort by offset in ascending order (required by Skia)
          .sort((a, b) => a.offset - b.offset);

        return Skia.Shader.MakeLinearGradient(
          { x: 0, y: yRange[1] }, // Top of chart
          { x: 0, y: yRange[0] }, // Bottom of chart
          skiaStops.map((s) => Skia.Color(s.color)),
          skiaStops.map((s) => s.offset),
          TileMode.Clamp,
        );
      }

      // Fallback to simple 2-color gradient
      const start = colorWithOpacity(startColor ?? stroke ?? theme.color.bgLine, startOpacity);
      const end = colorWithOpacity(endColor ?? stroke ?? theme.color.bgLine, endOpacity);

      // Create a vertical gradient from top to bottom of the chart
      return Skia.Shader.MakeLinearGradient(
        { x: 0, y: 0 },
        { x: 0, y: chartHeight },
        [Skia.Color(start), Skia.Color(end)],
        null,
        TileMode.Clamp,
      );
    }, [
      chartHeight,
      startColor,
      endColor,
      stroke,
      theme.color.bgLine,
      startOpacity,
      endOpacity,
      stops,
      yScale,
    ]);

    return (
      <Path
        animate={shouldAnimate}
        clipOffset={strokeWidth}
        fill={fill}
        shader={shader}
        strokeLinecap={strokeLinecap}
        strokeLinejoin={strokeLinejoin}
        strokeOpacity={strokeOpacity}
        strokeWidth={strokeWidth}
        {...props}
      />
    );
  },
);
