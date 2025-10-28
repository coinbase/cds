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
import {
  defaultTransition,
  type TransitionConfig,
  useTransitionAnimation,
} from '../utils/animation';

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
     * Allows customization of animation type, timing, springs, delays, and chaining.
     *
     * @example
     * // Spring animation
     * transitionConfig={{ type: 'spring', config: { damping: 10 } }}
     *
     * @example
     * // Delayed spring animation
     * transitionConfig={{
     *   type: 'delay',
     *   delayMs: 200,
     *   then: { type: 'spring', config: { damping: 15 } }
     * }}
     */
    transitionConfig?: TransitionConfig;
  };

/**
 * Efficient dotted area component with gradient opacity support.
 * Uses Skia's ImageShader for the dot pattern and LinearGradient for opacity.
 */
export const DottedArea = memo<DottedAreaProps>(
  ({
    d,
    fill,
    fillOpacity = 1,
    patternSize = 4,
    dotSize = 1,
    peakOpacity = 1,
    baselineOpacity = 0,
    baseline,
    yAxisId,
    clipRect,
    animate: animateProp,
    transitionConfig = defaultTransition,
  }) => {
    const theme = useTheme();
    const context = useCartesianChartContext();

    const drawingArea = clipRect ?? context.drawingArea;
    const effectiveFill = fill ?? theme.color.fgPrimary;

    // Use prop value if provided, otherwise fall back to context
    const shouldAnimate = animateProp ?? context.animate;

    const currentPath = d ?? '';

    // Get the y-scale for gradient calculations
    const yScale = context.getYScale(yAxisId);
    const yRange = yScale?.range();
    const yDomain = yScale?.domain();

    // Create dot pattern image (created once, reused)
    const patternImage = useMemo(() => {
      const surface = Skia.Surface.Make(patternSize, patternSize);
      if (!surface) return null;

      const canvas = surface.getCanvas();
      const paint = Skia.Paint();

      // Parse color string to Skia Color
      const color = Skia.Color(effectiveFill);
      paint.setColor(color);
      paint.setAntiAlias(true);

      // Draw a single dot in the center of the pattern
      canvas.drawCircle(patternSize / 2, patternSize / 2, dotSize, paint);

      return surface.makeImageSnapshot();
    }, [patternSize, dotSize, effectiveFill]);

    // Create clip rect for drawing area (like web's Path.tsx)
    const clipPath = useMemo(() => {
      if (!drawingArea) return null;
      const path = Skia.Path.Make();
      path.addRect(
        Skia.XYWHRect(drawingArea.x, drawingArea.y, drawingArea.width, drawingArea.height),
      );
      return path;
    }, [drawingArea]);

    // Calculate gradient positions and colors
    const { gradientStart, gradientEnd, gradientColors, gradientPositions } = useMemo(() => {
      // Helper function to create white color with specific alpha (for opacity mask)
      const createMaskColor = (alpha: number) => {
        // White with specified alpha acts as an opacity mask
        // Skia colors are Float32Array [r, g, b, a]
        return [1, 1, 1, alpha * fillOpacity];
      };

      if (!yScale || !yDomain || !yRange || !drawingArea) {
        // Fallback to simple top-to-bottom gradient
        return {
          gradientStart: vec(0, drawingArea?.y ?? 0),
          gradientEnd: vec(0, (drawingArea?.y ?? 0) + (drawingArea?.height ?? 100)),
          gradientColors: [createMaskColor(peakOpacity), createMaskColor(baselineOpacity)],
          gradientPositions: [0, 1],
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
        gradientStart: vec(0, yMax), // Top
        gradientEnd: vec(0, yMin), // Bottom
        gradientColors: [
          createMaskColor(peakOpacity), // Top peak
          createMaskColor(baselineOpacity), // Baseline
          createMaskColor(peakOpacity), // Bottom peak
        ],
        gradientPositions: [0, baselinePosition, 1],
      };
    }, [yScale, yDomain, yRange, drawingArea, baseline, peakOpacity, baselineOpacity, fillOpacity]);

    const areaPath = useTransitionAnimation({
      currentPath,
      animate: shouldAnimate,
      transitionConfig,
    });

    if (!clipPath || !drawingArea || !patternImage) return null;

    return (
      <Group clip={clipPath}>
        <SkiaPath path={areaPath} style="fill">
          {/* Dot pattern shader */}
          <ImageShader fit="none" image={patternImage} tx="repeat" ty="repeat" />
          {/* Blend with gradient opacity */}
          <Blend mode="dstIn">
            <LinearGradient
              colors={gradientColors}
              end={gradientEnd}
              positions={gradientPositions}
              start={gradientStart}
            />
          </Blend>
        </SkiaPath>
      </Group>
    );
  },
);
