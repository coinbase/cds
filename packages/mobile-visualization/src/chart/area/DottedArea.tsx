import { memo, useMemo } from 'react';
import { useTheme } from '@coinbase/cds-mobile/hooks/useTheme';
import {
  Blend,
  Group,
  ImageShader,
  LinearGradient,
  Path as SkiaPath,
  Skia,
  vec,
} from '@shopify/react-native-skia';

import { useCartesianChartContext } from '../ChartProvider';
import type { PathProps } from '../Path';
import { applyOpacityToColor, getGradientScale, processGradient } from '../utils/gradient';
import { defaultTransition, type TransitionConfig, usePathTransition } from '../utils/transition';

import type { AreaComponentProps } from './Area';

export type DottedAreaProps = Omit<PathProps, 'd' | 'fill' | 'fillOpacity'> &
  AreaComponentProps & {
    /**
     * Size of the pattern unit (width and height).
     * @default 4
     */
    patternSize?: number;
    /**
     * Size of the dots within the pattern.
     * @default 1
     */
    dotSize?: number;
    /**
     * Opacity at the peak values (top/bottom of gradient).
     * @default 1
     */
    peakOpacity?: number;
    /**
     * Opacity at the baseline (0 or edge closest to 0).
     * @default 0
     */
    baselineOpacity?: number;
    /**
     * Transition configuration for area transitions.
     * Allows customization of animation type, timing, and springs.
     *
     * @example
     * // Spring animation
     * transitionConfig={{ type: 'spring', damping: 10, stiffness: 100 }}
     *
     * @example
     * // Timing animation
     * transitionConfig={{ type: 'timing', duration: 500 }}
     */
    transitionConfig?: TransitionConfig;
  };

/**
 * Efficient dotted area component with gradient opacity support.
 * Uses Skia's ImageShader for the dot pattern and LinearGradient for colors/opacity.
 * Supports both data-based color gradients and simple opacity gradients.
 */
export const DottedArea = memo<DottedAreaProps>(
  ({
    d,
    fill: fillProp,
    fillOpacity = 1,
    patternSize = 4,
    dotSize = 1,
    peakOpacity = 1,
    baselineOpacity = 0,
    baseline,
    yAxisId,
    clipRect,
    gradient: gradientProp,
    seriesId,
    animate: animateProp,
    transitionConfig = defaultTransition,
  }) => {
    const theme = useTheme();
    const context = useCartesianChartContext();

    const drawingArea = clipRect ?? context.drawingArea;
    const fill = fillProp ?? theme.color.fgPrimary;

    const shouldAnimate = animateProp ?? context.animate;

    const currentPath = d ?? '';

    const targetSeries = seriesId ? context.getSeries(seriesId) : undefined;
    const gradient = gradientProp ?? targetSeries?.gradient;
    const gradientScale = seriesId ? context.getSeriesGradientScale(seriesId) : undefined;

    // Get scales for gradient calculation
    const xScale = context.getXScale();
    const yScale = context.getYScale(yAxisId);
    const yRange = yScale?.range();
    const yDomain = yScale?.domain();

    // Create white dot pattern image (reused for all gradients)
    // We use white so it can be colored by the gradient
    const patternImage = useMemo(() => {
      const surface = Skia.Surface.Make(patternSize, patternSize);
      if (!surface) return null;

      const canvas = surface.getCanvas();
      const paint = Skia.Paint();

      // Use white for the pattern, will be colored by gradient
      paint.setColor(Skia.Color('white'));
      paint.setAntiAlias(true);

      // Draw a single dot in the center of the pattern
      canvas.drawCircle(patternSize / 2, patternSize / 2, dotSize, paint);

      return surface.makeImageSnapshot();
    }, [patternSize, dotSize]);

    // Create clip rect for drawing area (like web's Path.tsx)
    const clipPath = useMemo(() => {
      if (!drawingArea) return null;
      const path = Skia.Path.Make();
      path.addRect(
        Skia.XYWHRect(drawingArea.x, drawingArea.y, drawingArea.width, drawingArea.height),
      );
      return path;
    }, [drawingArea]);

    // Calculate gradient configuration (color or opacity-based)
    const gradientConfig = useMemo(() => {
      // If a data-based gradient is provided, use it for colors
      if (gradient) {
        // Use gradientScale if available, otherwise calculate from scales
        let scale = gradientScale;
        if (!scale && xScale && yScale) {
          scale = getGradientScale(gradient, xScale, yScale);
        }

        if (!scale) {
          console.warn('Gradient requires a valid numeric scale');
          return null;
        }

        const processed = processGradient(gradient, scale);
        if (!processed) return null;

        const axisType = gradient.axis ?? 'y';
        const range = scale.range();

        // Apply fillOpacity to all colors
        const colors =
          fillOpacity < 1
            ? processed.colors.map((color) => applyOpacityToColor(color, fillOpacity))
            : processed.colors;

        // Determine gradient direction based on axis
        const gradientStart = axisType === 'x' ? vec(range[0], 0) : vec(0, range[0]);
        const gradientEnd = axisType === 'x' ? vec(range[1], 0) : vec(0, range[1]);

        return {
          start: gradientStart,
          end: gradientEnd,
          colors,
          positions: processed.positions,
          isColorGradient: true,
        };
      }

      // No data gradient - use opacity mask (legacy behavior)
      const createMaskColor = (alpha: number) => {
        return applyOpacityToColor(fill, alpha * fillOpacity);
      };

      if (!yScale || !yDomain || !yRange || !drawingArea) {
        // Fallback to simple top-to-bottom gradient
        return {
          start: vec(0, drawingArea?.y ?? 0),
          end: vec(0, (drawingArea?.y ?? 0) + (drawingArea?.height ?? 100)),
          colors: [createMaskColor(peakOpacity), createMaskColor(baselineOpacity)],
          positions: [0, 1],
          isColorGradient: false,
        };
      }

      const [minValue, maxValue] = yDomain;
      const [yMin, yMax] = yRange; // yMin is bottom (higher y), yMax is top (lower y)

      // Determine baseline value
      let dataBaseline: number;
      if (minValue >= 0) {
        dataBaseline = minValue; // All positive: baseline at min
      } else if (maxValue <= 0) {
        dataBaseline = maxValue; // All negative: baseline at max
      } else {
        dataBaseline = 0; // Crosses zero: baseline at 0
      }

      const scaledBaseline = yScale(baseline ?? dataBaseline);
      const baselineY = typeof scaledBaseline === 'number' ? scaledBaseline : yMin;

      // Calculate normalized position for baseline (0 = top, 1 = bottom)
      const baselinePosition = Math.max(0, Math.min(1, (baselineY - yMax) / (yMin - yMax)));

      // Diverging gradient: high opacity at extremes, low at baseline
      return {
        start: vec(0, yMax), // Top
        end: vec(0, yMin), // Bottom
        colors: [
          createMaskColor(peakOpacity), // Top peak
          createMaskColor(baselineOpacity), // Baseline
          createMaskColor(peakOpacity), // Bottom peak
        ],
        positions: [0, baselinePosition, 1],
        isColorGradient: false,
      };
    }, [
      gradient,
      gradientScale,
      xScale,
      yScale,
      yDomain,
      yRange,
      drawingArea,
      baseline,
      peakOpacity,
      baselineOpacity,
      fillOpacity,
      fill,
    ]);

    const areaPath = usePathTransition({
      currentPath,
      animate: shouldAnimate,
      transitionConfig,
    });

    if (!clipPath || !drawingArea || !patternImage || !gradientConfig) return null;

    return (
      <Group clip={clipPath}>
        <SkiaPath path={areaPath} style="fill">
          <ImageShader fit="none" image={patternImage} tx="repeat" ty="repeat" />
          <Blend mode="srcIn">
            <LinearGradient
              colors={gradientConfig.colors}
              end={gradientConfig.end}
              positions={gradientConfig.positions}
              start={gradientConfig.start}
            />
          </Blend>
        </SkiaPath>
      </Group>
    );
  },
);
