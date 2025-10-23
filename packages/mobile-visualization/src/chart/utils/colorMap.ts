import { Skia } from '@shopify/react-native-skia';
import type { ScaleLinear } from 'd3-scale';

import {
  type CategoricalScale,
  type ChartScaleFunction,
  isCategoricalScale,
  isNumericScale,
  type NumericScale,
} from './scale';

/**
 * A color stop can be either:
 * - A color string: 'red', '#FF0000', 'rgb(255, 0, 0)'
 * - An object with color and optional opacity: { color: 'red', opacity: 0.5 }
 */
export type ColorStop = string | { color: string; opacity?: number };

/**
 * Unified color mapping configuration for chart visualizations.
 */
export type ColorMap = {
  /**
   * Type of color mapping.
   * - 'continuous': Smooth interpolation between colors
   * - 'discrete': Hard transitions at threshold boundaries
   */
  type: 'continuous' | 'discrete';

  /**
   * Which axis to map colors against.
   * - 'y': Map colors based on y-values (high/low values) - most common
   * - 'x': Map colors based on x-position (left/right, or time progression)
   * @default 'y'
   */
  axis?: 'x' | 'y';

  /**
   * Colors to use in the mapping.
   *
   * Can be:
   * - Color strings: ['red', 'yellow', 'green']
   * - Objects with opacity: [{ color: 'red', opacity: 1 }, { color: 'green', opacity: 0.5 }]
   * - Mixed: ['red', { color: 'green', opacity: 0.5 }]
   *
   * **For continuous type:**
   * Colors are interpolated smoothly between stops.
   * If no stops provided, colors are evenly distributed.
   * If stops are provided, must have stops.length + 1.
   *
   * **For discrete type:**
   * Each color represents a segment. Must have stops.length + 1 colors.
   * Each segment has a distinct color with no interpolation.
   */
  colors: ColorStop[];

  /**
   * Stop positions that control color distribution.
   * Must be in ascending order.
   *
   * **For continuous type (optional):**
   * Data domain values where each color is positioned.
   * Values are automatically normalized to 0-1 based on the scale domain.
   * If provided, must match colors array length.
   * @example With x-axis domain [0, 100] and stops [0, 30, 100]:
   * - First color at start (0%)
   * - Second color at 30%
   * - Third color at end (100%)
   *
   * **For discrete type (optional):**
   * Data value thresholds where colors change.
   * Creates colors.length segments from stops.length thresholds.
   * If not provided, creates single segment with first color.
   * @example [0, 10] with colors ['red', 'yellow', 'green']
   * - values < 0: red
   * - values 0-10: yellow
   * - values > 10: green
   */
  stops?: number[];
};

/**
 * Processed color information with normalized values
 */
export type ProcessedColor = {
  color: string;
  opacity: number;
};

/**
 * Configuration for rendering a gradient using Skia
 */
export type GradientConfig = {
  colors: string[];
  positions: number[];
};

/**
 * Type for scales that can be used with ColorMap.
 * Band scales use numerical indices [0, 1, 2, ...] so they work with ColorMap.
 */
export type ColorMapScale = NumericScale | CategoricalScale;

/**
 * Extracts min/max domain values from any scale type.
 * Handles both numeric scales ([min, max]) and band scales ([0, 1, 2, ...]).
 */
const getScaleDomainBounds = (scale: ColorMapScale): [number, number] => {
  const domain = scale.domain();

  if (isCategoricalScale(scale)) {
    // Band scale domain is an array like [0, 1, 2, 3, ...]
    // Extract the first and last values
    const domainArray = domain as number[];
    return [domainArray[0], domainArray[domainArray.length - 1]];
  } else {
    // Numeric scale domain is [min, max]
    return domain as [number, number];
  }
};

/**
 * Normalizes a ColorStop to a color string with opacity applied.
 * Returns an rgba color string.
 */
export const normalizeColorStop = (colorStop: ColorStop): ProcessedColor => {
  // Handle string color
  if (typeof colorStop === 'string') {
    return { color: colorStop, opacity: 1 };
  }

  // Handle object with color and optional opacity
  return {
    color: colorStop.color,
    opacity: colorStop.opacity ?? 1,
  };
};

/**
 * Parses a color string using Skia and returns RGBA values.
 * Used internally for color manipulation and interpolation.
 *
 * @param colorStr - Color string to parse
 * @returns Object with r, g, b (0-255) and a (0-1) values, or null if parsing fails
 */
const parseColorToRgba = (
  colorStr: string,
): { r: number; g: number; b: number; a: number } | null => {
  try {
    const skColor = Skia.Color(colorStr);
    if (!skColor) return null;

    // skColor is a Float32Array [r, g, b, a] with values 0-1
    return {
      r: Math.round(skColor[0] * 255),
      g: Math.round(skColor[1] * 255),
      b: Math.round(skColor[2] * 255),
      a: skColor[3],
    };
  } catch (error) {
    return null;
  }
};

/**
 * Parses a color string and returns it as an rgba string with the specified opacity.
 * Uses Skia's color parsing for robustness (handles hex, rgb, rgba, named colors, etc).
 *
 * @param color - Color string to parse
 * @param opacity - Opacity value (0-1), defaults to 1
 * @returns rgba color string
 */
export const parseColor = (color: string, opacity: number = 1): string => {
  const parsed = parseColorToRgba(color);

  if (!parsed) {
    console.warn(`Invalid color: ${color}`);
    return color;
  }

  return `rgba(${parsed.r}, ${parsed.g}, ${parsed.b}, ${opacity})`;
};

/**
 * Processes continuous colorMap to gradient configuration.
 * Colors are smoothly interpolated between stops.
 */
const processContinuousColorMap = (
  colorMap: ColorMap,
  scale: ColorMapScale,
): GradientConfig | null => {
  const { colors, stops } = colorMap;

  if (colors.length < 2) {
    console.warn('Continuous colorMap requires at least 2 colors');
    return null;
  }

  // Process colors and apply opacities
  const processedColors = colors.map((colorStop) => {
    const { color, opacity } = normalizeColorStop(colorStop);
    return parseColor(color, opacity);
  });

  // Determine positions
  let positions: number[];

  if (stops && stops.length > 0) {
    // Use provided stops (data domain values that need normalization)
    if (stops.length !== colors.length) {
      console.warn(
        `Continuous colorMap: stops length (${stops.length}) must match colors length (${colors.length})`,
      );
      return null;
    }

    // Validate stops are in ascending order (allow equal values for hard transitions)
    for (let i = 1; i < stops.length; i++) {
      if (stops[i] < stops[i - 1]) {
        console.warn(`Continuous colorMap: stops must be in ascending order`);
        return null;
      }
    }

    // Get scale domain and normalize stops to 0-1 range
    const [minValue, maxValue] = getScaleDomainBounds(scale);
    const range = maxValue - minValue;

    if (range === 0) {
      console.warn('Scale domain has zero range');
      return null;
    }

    // Convert data value stops to normalized positions (0-1)
    positions = stops.map((stop) => {
      const normalized = (stop - minValue) / range;
      // Clamp to [0, 1] to handle stops outside domain
      return Math.max(0, Math.min(1, normalized));
    });
  } else {
    // Evenly distribute colors
    positions = colors.map((_, i) => i / (colors.length - 1));
  }

  // Determine if we need to reverse colors for Y-axis gradients
  // In Skia, Y-axis gradients go from top (high values) to bottom (low values)
  // But our colorMap is defined in data space (low to high)
  // So for Y-axis, we need to reverse the colors to match the visual layout
  const scaleRange = scale.range();
  const isYAxisReversed = scaleRange[0] > scaleRange[1]; // range goes from high to low (typical Y-axis)

  if (isYAxisReversed) {
    return {
      colors: [...processedColors].reverse(),
      positions: [...positions].reverse().map((pos) => 1 - pos),
    };
  }

  return {
    colors: processedColors,
    positions,
  };
};

/**
 * Processes discrete colorMap to gradient configuration.
 * Creates hard color transitions at thresholds by duplicating colors.
 */
const processDiscreteColorMap = (
  colorMap: ColorMap,
  scale: ColorMapScale,
): GradientConfig | null => {
  const { colors, stops } = colorMap;

  // Process colors
  const processedColors = colors.map((colorStop) => {
    const { color, opacity } = normalizeColorStop(colorStop);
    return parseColor(color, opacity);
  });

  // If no stops, use first color for entire range
  if (!stops || stops.length === 0) {
    return {
      colors: [processedColors[0], processedColors[0]],
      positions: [0, 1],
    };
  }

  // Validate: colors.length should equal stops.length + 1
  if (colors.length !== stops.length + 1) {
    console.warn(
      `Discrete colorMap: colors length (${colors.length}) must equal stops length + 1 (${stops.length + 1})`,
    );
    return null;
  }

  // Validate stops are in ascending order
  for (let i = 1; i < stops.length; i++) {
    if (stops[i] <= stops[i - 1]) {
      console.warn(`Discrete colorMap: stops must be in ascending order`);
      return null;
    }
  }

  // Get scale domain and range
  const [minValue, maxValue] = getScaleDomainBounds(scale);
  const range = maxValue - minValue;

  if (range === 0) {
    console.warn('Scale domain has zero range');
    return null;
  }

  // Convert data value stops to normalized positions (0-1)
  const normalizedStops = stops.map((stop) => {
    return (stop - minValue) / range;
  });

  // Determine if we need to reverse colors for Y-axis gradients
  // In Skia, Y-axis gradients go from top (high values) to bottom (low values)
  // But our colorMap is defined in data space (low to high)
  // So for Y-axis, we need to reverse the colors to match the visual layout
  const scaleRange = scale.range();
  const isYAxisReversed = scaleRange[0] > scaleRange[1]; // range goes from high to low (typical Y-axis)

  const orderedColors = isYAxisReversed ? [...processedColors].reverse() : processedColors;
  const orderedStops = isYAxisReversed
    ? [...normalizedStops].reverse().map((pos) => 1 - pos)
    : normalizedStops;

  // Create gradient with hard edges by duplicating colors at each threshold
  // For example: [red, green] with stop at 0.5 becomes:
  // colors: [red, red, green, green]
  // positions: [0, 0.5, 0.5, 1]
  const gradientColors: string[] = [];
  const gradientPositions: number[] = [];

  // Add first color at start
  gradientColors.push(orderedColors[0]);
  gradientPositions.push(0);

  // Add colors at each threshold (duplicate for hard edge)
  orderedStops.forEach((position, index) => {
    // Clamp position to [0, 1]
    const clampedPosition = Math.max(0, Math.min(1, position));

    // End of previous segment
    gradientColors.push(orderedColors[index]);
    gradientPositions.push(clampedPosition);

    // Start of next segment
    gradientColors.push(orderedColors[index + 1]);
    gradientPositions.push(clampedPosition);
  });

  // Add last color at end
  gradientColors.push(orderedColors[orderedColors.length - 1]);
  gradientPositions.push(1);

  return {
    colors: gradientColors,
    positions: gradientPositions,
  };
};

/**
 * Processes a ColorMap configuration into a gradient configuration for Skia.
 * Handles both continuous and discrete color mapping types.
 * Supports both numeric scales (linear, log) and categorical scales (band).
 *
 * @param colorMap - The ColorMap configuration
 * @param scale - The d3 scale to use for mapping data values to positions
 * @returns Gradient configuration with colors and positions, or null if invalid
 */
export const processColorMap = (
  colorMap: ColorMap,
  scale: ColorMapScale,
): GradientConfig | null => {
  if (!colorMap) return null;

  switch (colorMap.type) {
    case 'continuous':
      return processContinuousColorMap(colorMap, scale);
    case 'discrete':
      return processDiscreteColorMap(colorMap, scale);
    default:
      console.warn(`Unknown colorMap type: ${(colorMap as ColorMap).type}`);
      return null;
  }
};

/**
 * Determines the appropriate scale to use based on ColorMap axis configuration.
 * ColorMaps work with numeric scales (linear, log) and categorical scales (band).
 * Band scales use numerical indices [0, 1, 2, ...] which work for color mapping.
 *
 * @param colorMap - The ColorMap configuration
 * @param xScale - The x-axis scale
 * @param yScale - The y-axis scale
 * @returns The scale to use for color mapping, or undefined if not supported
 */
export const getColorMapScale = (
  colorMap: ColorMap | undefined,
  xScale: ChartScaleFunction | undefined,
  yScale: ChartScaleFunction | undefined,
): ColorMapScale | undefined => {
  if (!colorMap) {
    return yScale && isNumericScale(yScale) ? yScale : undefined;
  }

  const axis = colorMap.axis ?? 'y';
  const targetScale = axis === 'x' ? xScale : yScale;

  // ColorMap requires either a numeric scale or a categorical (band) scale
  if (!targetScale) {
    console.warn(`ColorMap requires a scale on the ${axis}-axis`);
    return;
  }

  if (!isNumericScale(targetScale) && !isCategoricalScale(targetScale)) {
    console.warn(`ColorMap requires a numeric or categorical scale on the ${axis}-axis`);
    return;
  }

  return targetScale as ColorMapScale;
};

/**
 * Interpolates between two colors based on a progress value (0-1).
 */
const interpolateColors = (color1: string, color2: string, progress: number): string => {
  const c1 = parseColorToRgba(color1);
  const c2 = parseColorToRgba(color2);

  if (!c1 || !c2) {
    return progress < 0.5 ? color1 : color2;
  }

  const r = Math.round(c1.r + (c2.r - c1.r) * progress);
  const g = Math.round(c1.g + (c2.g - c1.g) * progress);
  const b = Math.round(c1.b + (c2.b - c1.b) * progress);
  const a = c1.a + (c2.a - c1.a) * progress;

  return `rgba(${r}, ${g}, ${b}, ${a})`;
};

/**
 * Evaluates the color at a specific data value based on the colorMap configuration.
 * For discrete colorMaps, returns the appropriate color bucket.
 * For continuous colorMaps, interpolates between colors.
 *
 * @param colorMap - The ColorMap configuration
 * @param dataValue - The data value to evaluate (for band scales, this is the index)
 * @param scale - The scale to use for mapping
 * @param includeAlpha - Whether to include alpha/opacity from the colorMap in the returned color (default: false)
 * @returns The color string at this data value, or null if invalid
 */
export const evaluateColorMapAtValue = (
  colorMap: ColorMap,
  dataValue: number,
  scale: ColorMapScale,
  includeAlpha: boolean = false,
): string | null => {
  const { colors, stops, type } = colorMap;

  if (colors.length === 0) return null;

  // Process color stops to get actual color strings with opacity
  const processedColors = colors.map((colorStop) => {
    const { color, opacity } = normalizeColorStop(colorStop);
    // If includeAlpha is false, always use full opacity
    return parseColor(color, includeAlpha ? opacity : 1);
  });

  if (type === 'discrete') {
    // For discrete: find which bucket the value falls into
    if (!stops || stops.length === 0) {
      return processedColors[0];
    }

    // Find the appropriate color based on thresholds
    for (let i = 0; i < stops.length; i++) {
      if (dataValue < stops[i]) {
        return processedColors[i];
      }
    }

    // If we're past all thresholds, use the last color
    return processedColors[processedColors.length - 1];
  } else if (type === 'continuous') {
    // For continuous: interpolate between colors based on normalized position
    const [minValue, maxValue] = getScaleDomainBounds(scale);
    const range = maxValue - minValue;

    if (range === 0) return processedColors[0];

    // Normalize the value to 0-1 in data space (0 = min, 1 = max)
    let normalizedValue = Math.max(0, Math.min(1, (dataValue - minValue) / range));

    // Determine positions (normalize data domain stops to 0-1)
    let positions: number[];
    if (stops && stops.length === colors.length) {
      // Normalize data domain stops to 0-1 positions
      positions = stops.map((stop) => {
        const normalized = (stop - minValue) / range;
        return Math.max(0, Math.min(1, normalized));
      });
    } else {
      // Evenly distribute
      positions = colors.map((_, i) => i / (colors.length - 1));
    }

    // Account for Y-axis reversal to match gradient rendering
    // In Skia, Y-axis gradients are reversed (high pixel values at bottom, low at top)
    // So high data values appear at the top (low pixel position)
    const scaleRange = scale.range();
    const isYAxisReversed = scaleRange[0] > scaleRange[1];

    let orderedColors = processedColors;
    let orderedPositions = positions;

    if (isYAxisReversed && (colorMap.axis ?? 'y') === 'y') {
      // Reverse the colors to match the gradient rendering
      orderedColors = [...processedColors].reverse();
      orderedPositions = [...positions].reverse().map((pos) => 1 - pos);
      // Also flip the normalized value to match the reversed gradient
      // High data values (1) should map to position 0 (top of gradient)
      // Low data values (0) should map to position 1 (bottom of gradient)
      normalizedValue = 1 - normalizedValue;
    }

    // Handle values before the first position
    if (normalizedValue <= orderedPositions[0]) {
      return orderedColors[0];
    }

    // Handle values after the last position
    if (normalizedValue >= orderedPositions[orderedPositions.length - 1]) {
      return orderedColors[orderedColors.length - 1];
    }

    // Find which segment we're in and interpolate
    for (let i = 0; i < orderedPositions.length - 1; i++) {
      const start = orderedPositions[i];
      const end = orderedPositions[i + 1];
      if (normalizedValue >= start && normalizedValue <= end) {
        // Handle hard transition (equal consecutive stops)
        if (end === start) {
          // Choose the previous color at the exact boundary for determinism
          return orderedColors[i];
        }

        // Calculate progress within this segment (0-1)
        const segmentProgress = (normalizedValue - start) / (end - start);
        // Interpolate between the two colors
        return interpolateColors(orderedColors[i], orderedColors[i + 1], segmentProgress);
      }
    }

    // Fallback to last color (should not reach here)
    return orderedColors[orderedColors.length - 1];
  }

  return null;
};
