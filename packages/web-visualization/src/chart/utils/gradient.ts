import {
  type CategoricalScale,
  type ChartScaleFunction,
  isCategoricalScale,
  isNumericScale,
  type NumericScale,
} from './scale';

/**
 * A gradient stop defines a color transition point in the gradient
 */
export type GradientStop = {
  /**
   * Position in data space (will be normalized to 0-1 based on scale domain).
   * Multiple stops at the same offset create hard color transitions.
   */
  offset: number;

  /** Color value (CSS color string or variable like 'var(--color-fgPositive)') */
  color: string;

  /** Optional opacity (0-1). Defaults to 1. */
  opacity?: number;
};

/**
 * Unified gradient configuration for chart visualizations.
 */
export type Gradient = {
  /**
   * Which axis to map colors against.
   * - 'y': Map colors based on y-values (high/low values) - most common
   * - 'x': Map colors based on x-position (left/right, or time progression)
   * @default 'y'
   */
  axis?: 'x' | 'y';

  /**
   * Gradient stops defining the color transitions.
   * Can be an array of stop objects or a function that receives domain bounds.
   *
   * **Static form:**
   * ```ts
   * stops: [
   *   { offset: 0, color: 'red' },
   *   { offset: 50, color: 'yellow' },
   *   { offset: 100, color: 'green' }
   * ]
   * ```
   *
   * **Function form (receives domain bounds):**
   * ```ts
   * stops: ({ min, max }) => [
   *   { offset: min, color: 'red' },
   *   { offset: 0, color: 'yellow' },
   *   { offset: max, color: 'green' }
   * ]
   * ```
   *
   * **Hard transitions (multiple stops at same offset):**
   * ```ts
   * stops: [
   *   { offset: 0, color: 'red' },
   *   { offset: 0, color: 'green' }  // Creates hard transition at 0
   * ]
   * ```
   */
  stops: GradientStop[] | ((domain: { min: number; max: number }) => GradientStop[]);
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
 * Type for scales that can be used with Gradient.
 * Band scales use numerical indices [0, 1, 2, ...] so they work with Gradient.
 */
export type GradientScale = NumericScale | CategoricalScale;

/**
 * Extracts min/max domain values from any scale type.
 * Handles both numeric scales ([min, max]) and band scales ([0, 1, 2, ...]).
 */
const getScaleDomainBounds = (scale: GradientScale): [number, number] => {
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
 * Resolves gradient stops, handling both static arrays and function forms.
 * When stops is a function, calls it with the domain bounds of the scale.
 */
export const resolveGradientStops = (
  stops: GradientStop[] | ((domain: { min: number; max: number }) => GradientStop[]),
  scale: GradientScale,
): GradientStop[] => {
  if (typeof stops === 'function') {
    const [min, max] = getScaleDomainBounds(scale);
    return stops({ min, max });
  }
  return stops;
};

/**
 * Normalizes a GradientStop to include default opacity if not specified.
 */
export const normalizeGradientStop = (gradientStop: GradientStop): ProcessedColor => {
  return {
    color: gradientStop.color,
    opacity: gradientStop.opacity ?? 1,
  };
};

/**
 * Processes Gradient to gradient configuration for SVG linearGradient.
 * Colors are smoothly interpolated between stops by the browser.
 * Multiple stops at the same offset create hard color transitions.
 */
const processGradientStops = (
  stops: GradientStop[],
  scale: GradientScale,
): GradientConfig | null => {
  if (stops.length < 2) {
    console.warn('Gradient requires at least 2 stops');
    return null;
  }

  // Process stops and extract colors and opacities separately
  // For SVG gradients, we use stop-opacity attribute to avoid transparent-black mixing issues
  const processedColors: string[] = [];
  const opacities: number[] = [];
  const offsets: number[] = [];

  stops.forEach((stop) => {
    const { color, opacity } = normalizeGradientStop(stop);
    processedColors.push(color);
    opacities.push(opacity);
    offsets.push(stop.offset);
  });

  // Validate offsets are in ascending order (allow equal values for hard transitions)
  for (let i = 1; i < offsets.length; i++) {
    if (offsets[i] < offsets[i - 1]) {
      console.warn(`Gradient: stop offsets must be in ascending order`);
      return null;
    }
  }

  // Get scale domain and normalize offsets to 0-1 range
  const [minValue, maxValue] = getScaleDomainBounds(scale);
  const range = maxValue - minValue;

  if (range === 0) {
    console.warn('Scale domain has zero range');
    return null;
  }

  // Convert data value offsets to normalized positions (0-1)
  const positions = offsets.map((offset) => {
    const normalized = (offset - minValue) / range;
    // Clamp to [0, 1] to handle offsets outside domain
    return Math.max(0, Math.min(1, normalized));
  });

  return {
    colors: processedColors,
    positions,
    opacities,
  };
};

/**
 * Processes a Gradient configuration into a gradient configuration for SVG linearGradient.
 * Supports both numeric scales (linear, log) and categorical scales (band).
 *
 * @param gradient - The Gradient configuration
 * @param scale - The d3 scale to use for mapping data values to positions
 * @returns Gradient configuration with colors and positions, or null if invalid
 */
export const processGradient = (
  gradient: Gradient,
  scale: GradientScale,
): GradientConfig | null => {
  if (!gradient) return null;

  // Resolve stops (handle function form)
  const resolvedStops = resolveGradientStops(gradient.stops, scale);

  return processGradientStops(resolvedStops, scale);
};

/**
 * Determines the appropriate scale to use based on Gradient axis configuration.
 * Gradients work with numeric scales (linear, log) and categorical scales (band).
 * Band scales use numerical indices [0, 1, 2, ...] which work for color mapping.
 *
 * @param gradient - The Gradient configuration
 * @param xScale - The x-axis scale
 * @param yScale - The y-axis scale
 * @returns The scale to use for color mapping, or undefined if not supported
 */
export const getGradientScale = (
  gradient: Gradient | undefined,
  xScale: ChartScaleFunction | undefined,
  yScale: ChartScaleFunction | undefined,
): GradientScale | undefined => {
  if (!gradient) {
    return yScale && isNumericScale(yScale) ? yScale : undefined;
  }

  const axis = gradient.axis ?? 'y';
  const targetScale = axis === 'x' ? xScale : yScale;

  // Gradient requires either a numeric scale or a categorical (band) scale
  if (!targetScale) {
    console.warn(`Gradient requires a scale on the ${axis}-axis`);
    return;
  }

  if (!isNumericScale(targetScale) && !isCategoricalScale(targetScale)) {
    console.warn(`Gradient requires a numeric or categorical scale on the ${axis}-axis`);
    return;
  }

  return targetScale as GradientScale;
};

/**
 * Evaluates the color at a specific data value based on the gradient configuration.
 * Uses CSS color-mix() function for color interpolation, which works natively with CSS variables.
 *
 * Note: Opacity from gradient stops is ignored when evaluating colors at specific points.
 * Opacity should only be used in the gradient rendering itself (SVG linearGradient).
 *
 * Returns a color-mix() expression that the browser evaluates.
 *
 * @param gradient - The Gradient configuration
 * @param dataValue - The data value to evaluate (for band scales, this is the index)
 * @param scale - The scale to use for mapping
 * @returns The color string at this data value (may be a color-mix() expression), or null if invalid
 */
export const evaluateGradientAtValue = (
  gradient: Gradient,
  dataValue: number,
  scale: GradientScale,
): string | null => {
  // Resolve stops (handle function form)
  const resolvedStops = resolveGradientStops(gradient.stops, scale);

  if (resolvedStops.length === 0) return null;

  // Default color space is 'srgb'
  const colorSpace = 'srgb';

  // Process stops - always ignore opacity for point evaluation (opacity is handled in gradient rendering)
  const processedColors = resolvedStops.map((stop) => {
    const { color } = normalizeGradientStop(stop);
    return color;
  });

  const offsets = resolvedStops.map((stop) => stop.offset);

  // Get scale domain and range
  const [minValue, maxValue] = getScaleDomainBounds(scale);
  const range = maxValue - minValue;

  if (range === 0) return processedColors[0];

  // Normalize the value to 0-1
  const normalizedValue = Math.max(0, Math.min(1, (dataValue - minValue) / range));

  // Normalize offsets to 0-1 range
  const positions = offsets.map((offset) => {
    const normalized = (offset - minValue) / range;
    return Math.max(0, Math.min(1, normalized));
  });

  // Find which segment we're in
  if (normalizedValue < positions[0]) {
    return processedColors[0];
  }
  if (normalizedValue >= positions[positions.length - 1]) {
    return processedColors[processedColors.length - 1];
  }

  // Find the two colors to mix
  for (let i = 0; i < positions.length - 1; i++) {
    const start = positions[i];
    const end = positions[i + 1];
    if (normalizedValue >= start && normalizedValue <= end) {
      // Handle hard transitions (multiple stops at same offset)
      if (end === start) {
        return processedColors[i + 1];
      }

      // At exact start position, return the start color
      if (normalizedValue === start) {
        return processedColors[i];
      }

      // Calculate progress within this segment (0-1)
      const segmentProgress = (normalizedValue - start) / (end - start);
      const percentage = segmentProgress * 100;

      // Use color-mix()! This works with CSS variables!
      return `color-mix(in ${colorSpace}, ${processedColors[i + 1]} ${percentage}%, ${processedColors[i]})`;
    }
  }

  return processedColors[processedColors.length - 1];
};
