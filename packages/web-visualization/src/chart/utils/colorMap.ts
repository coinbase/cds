import {
  type CategoricalScale,
  type ChartScaleFunction,
  isCategoricalScale,
  isNumericScale,
  type NumericScale,
} from './scale';

/**
 * A color stop can be either:
 * - A color string: 'red', '#FF0000', 'rgb(255, 0, 0)', 'var(--color-fgPositive)'
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
   * - CSS variables: ['var(--color-fgNegative)', 'var(--color-fgPositive)']
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

  /**
   * Color space for interpolation. Defaults to 'srgb'.
   * 'oklch' provides perceptually uniform gradients.
   * Only applicable when using color-mix() for discrete elements.
   * For SVG gradients (continuous), this is ignored.
   */
  colorSpace?: 'srgb' | 'oklch' | 'hsl' | 'hwb';
};

/**
 * Processed color information with normalized values
 */
export type ProcessedColor = {
  color: string;
  opacity: number;
};

/**
 * Configuration for rendering a gradient using SVG linearGradient
 */
export type GradientConfig = {
  colors: string[];
  positions: number[];
  /**
   * Optional array of opacities (0-1 range) corresponding to each color.
   * When provided, uses stop-opacity attribute instead of color-mix with transparent.
   */
  opacities?: number[];
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
 * Returns a ProcessedColor with color and opacity.
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
 * Processes continuous colorMap to gradient configuration for SVG linearGradient.
 * Colors are smoothly interpolated between stops by the browser.
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

  // Process colors and extract opacities separately
  // For SVG gradients, we use stop-opacity attribute to avoid transparent-black mixing issues
  const processedColors: string[] = [];
  const opacities: number[] = [];

  colors.forEach((colorStop) => {
    const { color, opacity } = normalizeColorStop(colorStop);
    processedColors.push(color);
    opacities.push(opacity);
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

  return {
    colors: processedColors,
    positions,
    opacities,
  };
};

/**
 * Processes discrete colorMap to gradient configuration for SVG linearGradient.
 * Creates hard color transitions at thresholds by duplicating colors.
 */
const processDiscreteColorMap = (
  colorMap: ColorMap,
  scale: ColorMapScale,
): GradientConfig | null => {
  const { colors, stops } = colorMap;

  // Process colors and extract opacities separately
  const processedColors: string[] = [];
  const processedOpacities: number[] = [];

  colors.forEach((colorStop) => {
    const { color, opacity } = normalizeColorStop(colorStop);
    processedColors.push(color);
    processedOpacities.push(opacity);
  });

  // If no stops, use first color for entire range
  if (!stops || stops.length === 0) {
    return {
      colors: [processedColors[0], processedColors[0]],
      positions: [0, 1],
      opacities: [processedOpacities[0], processedOpacities[0]],
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

  // Create gradient with hard edges by duplicating colors at each threshold
  // For example: [red, green] with stop at 0.5 becomes:
  // colors: [red, red, green, green]
  // positions: [0, 0.5, 0.5, 1]
  // opacities: [1, 1, 1, 1]
  const gradientColors: string[] = [];
  const gradientPositions: number[] = [];
  const gradientOpacities: number[] = [];

  // Add first color at start
  gradientColors.push(processedColors[0]);
  gradientPositions.push(0);
  gradientOpacities.push(processedOpacities[0]);

  // Add colors at each threshold (duplicate for hard edge)
  normalizedStops.forEach((position, index) => {
    // Clamp position to [0, 1]
    const clampedPosition = Math.max(0, Math.min(1, position));

    // End of previous segment
    gradientColors.push(processedColors[index]);
    gradientPositions.push(clampedPosition);
    gradientOpacities.push(processedOpacities[index]);

    // Start of next segment
    gradientColors.push(processedColors[index + 1]);
    gradientPositions.push(clampedPosition);
    gradientOpacities.push(processedOpacities[index + 1]);
  });

  // Add last color at end
  gradientColors.push(processedColors[processedColors.length - 1]);
  gradientPositions.push(1);
  gradientOpacities.push(processedOpacities[processedOpacities.length - 1]);

  return {
    colors: gradientColors,
    positions: gradientPositions,
    opacities: gradientOpacities,
  };
};

/**
 * Processes a ColorMap configuration into a gradient configuration for SVG linearGradient.
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
 * Evaluates the color at a specific data value based on the colorMap configuration.
 * Uses CSS color-mix() function for color interpolation, which works natively with CSS variables.
 *
 * For discrete colorMaps, returns the appropriate color bucket.
 * For continuous colorMaps, returns a color-mix() expression that the browser evaluates.
 *
 * @param colorMap - The ColorMap configuration
 * @param dataValue - The data value to evaluate (for band scales, this is the index)
 * @param scale - The scale to use for mapping
 * @returns The color string at this data value (may be a color-mix() expression), or null if invalid
 */
export const evaluateColorMapAtValue = (
  colorMap: ColorMap,
  dataValue: number,
  scale: ColorMapScale,
): string | null => {
  const { colors, stops, type, colorSpace = 'srgb' } = colorMap;

  if (colors.length === 0) return null;

  const processedColors = colors.map((colorStop) => {
    const { color, opacity } = normalizeColorStop(colorStop);
    // Handle opacity using color-mix with transparent
    return opacity !== 1
      ? `color-mix(in ${colorSpace}, ${color}, transparent ${(1 - opacity) * 100}%)`
      : color;
  });

  if (type === 'discrete') {
    // For discrete: find which bucket the value falls into
    if (!stops || stops.length === 0) {
      return processedColors[0];
    }

    for (let i = 0; i < stops.length; i++) {
      if (dataValue < stops[i]) {
        return processedColors[i];
      }
    }
    return processedColors[processedColors.length - 1];
  }

  if (type === 'continuous') {
    // For continuous: use color-mix() to interpolate!
    const [minValue, maxValue] = getScaleDomainBounds(scale);
    const range = maxValue - minValue;

    if (range === 0) return processedColors[0];

    // Normalize the value to 0-1
    const normalizedValue = Math.max(0, Math.min(1, (dataValue - minValue) / range));

    // Determine positions
    let positions: number[];
    if (stops && stops.length === colors.length) {
      positions = stops.map((stop) => {
        const normalized = (stop - minValue) / range;
        return Math.max(0, Math.min(1, normalized));
      });
    } else {
      positions = colors.map((_, i) => i / (colors.length - 1));
    }

    // Find which segment we're in
    if (normalizedValue <= positions[0]) {
      return processedColors[0];
    }
    if (normalizedValue >= positions[positions.length - 1]) {
      return processedColors[processedColors.length - 1];
    }

    // Find the two colors to mix
    for (let i = 0; i < positions.length - 1; i++) {
      if (normalizedValue >= positions[i] && normalizedValue <= positions[i + 1]) {
        // Calculate progress within this segment (0-1)
        const segmentProgress =
          (normalizedValue - positions[i]) / (positions[i + 1] - positions[i]);

        const percentage = segmentProgress * 100;

        // Use color-mix()! This works with CSS variables!
        return `color-mix(in ${colorSpace}, ${processedColors[i + 1]} ${percentage}%, ${processedColors[i]})`;
      }
    }

    return processedColors[processedColors.length - 1];
  }

  return null;
};
