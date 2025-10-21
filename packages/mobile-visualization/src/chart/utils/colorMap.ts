import { Skia } from '@shopify/react-native-skia';
import type { ScaleLinear } from 'd3-scale';

import type { ColorMap, ColorStop } from '../types';

import { type ChartScaleFunction, isNumericScale, type NumericScale } from './scale';

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
 * Converts a color string to rgba format with the specified opacity.
 * Uses Skia's color parsing for robustness.
 */
export const applyOpacityToColor = (color: string, opacity: number): string => {
  if (opacity === 1) return color;

  try {
    // Use Skia to parse the color
    const skColor = Skia.Color(color);
    if (!skColor) {
      console.warn(`Invalid color: ${color}`);
      return color;
    }

    // skColor is a Float32Array [r, g, b, a] with values 0-1
    const r = Math.round(skColor[0] * 255);
    const g = Math.round(skColor[1] * 255);
    const b = Math.round(skColor[2] * 255);

    return `rgba(${r}, ${g}, ${b}, ${opacity})`;
  } catch (error) {
    console.warn(`Error processing color: ${color}`, error);
    return color;
  }
};

/**
 * Processes continuous colorMap to gradient configuration.
 * Colors are smoothly interpolated between stops.
 */
const processContinuousColorMap = (
  colorMap: ColorMap,
  scale: ScaleLinear<number, number, never>,
): GradientConfig | null => {
  const { colors, stops } = colorMap;

  if (colors.length < 2) {
    console.warn('Continuous colorMap requires at least 2 colors');
    return null;
  }

  // Process colors and apply opacities
  const processedColors = colors.map((colorStop) => {
    const { color, opacity } = normalizeColorStop(colorStop);
    return applyOpacityToColor(color, opacity);
  });

  // Determine positions
  let positions: number[];

  if (stops && stops.length > 0) {
    // Use provided stops (should be 0-1 normalized)
    if (stops.length !== colors.length) {
      console.warn(
        `Continuous colorMap: stops length (${stops.length}) must match colors length (${colors.length})`,
      );
      return null;
    }

    // Validate stops are in range [0, 1] and ascending
    for (let i = 0; i < stops.length; i++) {
      if (stops[i] < 0 || stops[i] > 1) {
        console.warn(`Continuous colorMap: stops must be between 0 and 1, received: ${stops[i]}`);
        return null;
      }
      if (i > 0 && stops[i] <= stops[i - 1]) {
        console.warn(`Continuous colorMap: stops must be in ascending order`);
        return null;
      }
    }

    positions = stops;
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
  scale: ScaleLinear<number, number, never>,
): GradientConfig | null => {
  const { colors, stops } = colorMap;

  // Process colors
  const processedColors = colors.map((colorStop) => {
    const { color, opacity } = normalizeColorStop(colorStop);
    return applyOpacityToColor(color, opacity);
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
  const domain = scale.domain();
  const [minValue, maxValue] = domain;
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
 *
 * @param colorMap - The ColorMap configuration
 * @param scale - The d3 scale to use for mapping data values to positions
 * @returns Gradient configuration with colors and positions, or null if invalid
 */
export const processColorMap = (colorMap: ColorMap, scale: NumericScale): GradientConfig | null => {
  if (!colorMap) return null;

  // For discrete colorMaps, we need a linear scale
  // For continuous, we use the scale for domain information
  const linearScale = scale as ScaleLinear<number, number, never>;

  switch (colorMap.type) {
    case 'continuous':
      return processContinuousColorMap(colorMap, linearScale);
    case 'discrete':
      return processDiscreteColorMap(colorMap, linearScale);
    default:
      console.warn(`Unknown colorMap type: ${(colorMap as ColorMap).type}`);
      return null;
  }
};

/**
 * Determines the appropriate scale to use based on ColorMap axis configuration.
 * ColorMaps only work with numeric scales (linear or log), not categorical (band) scales.
 * @param colorMap - The ColorMap configuration
 * @param xScale - The x-axis scale
 * @param yScale - The y-axis scale
 * @returns The numeric scale to use for color mapping, or null if not numeric
 */
export const getColorMapScale = (
  colorMap: ColorMap | undefined,
  xScale: ChartScaleFunction | undefined,
  yScale: ChartScaleFunction | undefined,
): NumericScale | null => {
  if (!colorMap) {
    return yScale && isNumericScale(yScale) ? yScale : null;
  }

  const axis = colorMap.axis ?? 'y';
  const targetScale = axis === 'x' ? xScale : yScale;

  // ColorMap requires a numeric scale
  if (!targetScale || !isNumericScale(targetScale)) {
    console.warn(`ColorMap requires a numeric scale on the ${axis}-axis`);
    return null;
  }

  return targetScale;
};

/**
 * Evaluates the color at a specific data value based on the colorMap configuration.
 * For discrete colorMaps, returns the appropriate color bucket.
 * For continuous colorMaps, interpolates between colors.
 *
 * @param colorMap - The ColorMap configuration
 * @param dataValue - The data value to evaluate
 * @param scale - The scale to use for mapping
 * @returns The color string at this data value, or null if invalid
 */
export const evaluateColorMapAtValue = (
  colorMap: ColorMap,
  dataValue: number,
  scale: NumericScale,
): string | null => {
  const { colors, stops, type } = colorMap;

  if (colors.length === 0) return null;

  // Process color stops to get actual color strings with opacity
  const processedColors = colors.map((colorStop) => {
    const { color, opacity } = normalizeColorStop(colorStop);
    return applyOpacityToColor(color, opacity);
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
    const domain = scale.domain();
    const [minValue, maxValue] = domain;
    const range = maxValue - minValue;

    if (range === 0) return processedColors[0];

    // Normalize the value to 0-1
    const normalizedValue = Math.max(0, Math.min(1, (dataValue - minValue) / range));

    // Determine positions
    let positions: number[];
    if (stops && stops.length === colors.length) {
      positions = stops;
    } else {
      // Evenly distribute
      positions = colors.map((_, i) => i / (colors.length - 1));
    }

    // Find which segment we're in
    for (let i = 0; i < positions.length - 1; i++) {
      if (normalizedValue >= positions[i] && normalizedValue <= positions[i + 1]) {
        // For simplicity, we'll just return the closest color
        // A more sophisticated approach would interpolate RGB values
        const segmentProgress =
          (normalizedValue - positions[i]) / (positions[i + 1] - positions[i]);
        return segmentProgress < 0.5 ? processedColors[i] : processedColors[i + 1];
      }
    }

    // Fallback to last color
    return processedColors[processedColors.length - 1];
  }

  return null;
};
