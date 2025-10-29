import { Skia, vec } from '@shopify/react-native-skia';

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

  /** Color value (color string like 'red', '#FF0000', 'rgb(255, 0, 0)') */
  color: string;

  /** Optional opacity (0-1). Defaults to 1. */
  opacity?: number;
};

/**
 * Unified color gradient configuration for chart visualizations.
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
 * Processed gradient colors and positions (internal use).
 */
type ProcessedGradient = {
  colors: string[];
  positions: number[];
};

/**
 * Complete configuration for rendering a linear gradient with Skia.
 * Includes start/end vectors for gradient direction and colors/positions for gradient stops.
 */
export type GradientConfig = {
  /** Starting point of the gradient (x, y coordinates) */
  start: ReturnType<typeof vec>;
  /** Ending point of the gradient (x, y coordinates) */
  end: ReturnType<typeof vec>;
  /** Array of color strings (rgba format) */
  colors: string[];
  /** Array of position values (0-1 normalized) */
  positions: number[];
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
 * Parses a color string and returns an rgba string with the given opacity.
 * Uses Skia to parse colors, which handles hex, rgb, rgba, and named colors.
 */
export const parseColor = (color: string, opacity: number): string => {
  const skiaColor = Skia.Color(color);
  const r = Math.round(skiaColor[0] * 255);
  const g = Math.round(skiaColor[1] * 255);
  const b = Math.round(skiaColor[2] * 255);
  return `rgba(${r}, ${g}, ${b}, ${opacity})`;
};

/**
 * Applies an additional opacity multiplier to an rgba color string.
 * Used to apply fillOpacity to gradient colors.
 */
export const applyOpacityToColor = (colorString: string, opacityMultiplier: number): string => {
  // Parse rgba string: rgba(r, g, b, a)
  const match = colorString.match(/rgba?\((\d+),\s*(\d+),\s*(\d+),?\s*([\d.]+)?\)/);
  if (!match) return colorString;

  const r = parseInt(match[1], 10);
  const g = parseInt(match[2], 10);
  const b = parseInt(match[3], 10);
  const a = parseFloat(match[4] ?? '1');

  return `rgba(${r}, ${g}, ${b}, ${a * opacityMultiplier})`;
};

/**
 * Processes Gradient to gradient configuration for Skia.
 * Colors are smoothly interpolated between stops by Skia.
 * Multiple stops at the same offset create hard color transitions.
 */
const processGradientStops = (
  stops: GradientStop[],
  scale: GradientScale,
): ProcessedGradient | null => {
  // Handle edge cases
  if (stops.length === 0) {
    console.warn('Gradient has no stops - falling back to default');
    return null;
  }

  // Get scale domain for single-stop expansion and normalization
  const [minValue, maxValue] = getScaleDomainBounds(scale);

  // If only 1 stop, create a 2-stop gradient from baseline to the stop
  let effectiveStops = stops;
  if (stops.length === 1) {
    const singleStop = stops[0];
    const { color, opacity } = normalizeGradientStop(singleStop);

    // Create a gradient from baseline (transparent) to the stop color
    // Determine baseline based on whether stop is positive or negative
    const baselineOffset = singleStop.offset >= 0 ? minValue : maxValue;

    effectiveStops = [{ offset: baselineOffset, color, opacity: 0 }, singleStop];
  }

  const offsets: number[] = [];
  const processedColors: string[] = [];

  effectiveStops.forEach((stop) => {
    const { color, opacity } = normalizeGradientStop(stop);
    // Parse color with Skia and apply opacity
    const parsedColor = parseColor(color, opacity);
    processedColors.push(parsedColor);
    offsets.push(stop.offset);
  });

  // Validate offsets are in ascending order (allow equal values for hard transitions)
  for (let i = 1; i < offsets.length; i++) {
    if (offsets[i] < offsets[i - 1]) {
      console.warn(`Gradient: stop offsets must be in ascending order`);
      return null;
    }
  }

  // Calculate range and normalize offsets to 0-1
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
  };
};

/**
 * Processes a Gradient configuration into a gradient configuration for Skia.
 * Supports both numeric scales (linear, log) and categorical scales (band).
 *
 * @param gradient - The Gradient configuration
 * @param scale - The d3 scale to use for mapping data values to positions
 * @returns Gradient configuration with colors and positions, or null if invalid
 */
export const processGradient = (
  gradient: Gradient,
  scale: GradientScale,
): ProcessedGradient | null => {
  if (!gradient) return null;

  // Resolve stops (handle function form)
  const resolvedStops = resolveGradientStops(gradient.stops, scale);

  return processGradientStops(resolvedStops, scale);
};

/**
 * Determines the appropriate scale to use based on Gradient axis configuration.
 * Gradients work with numeric scales (linear, log) and categorical scales (band).
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
 * Interpolates between two colors using linear interpolation.
 * Returns an rgba string.
 */
const interpolateColor = (color1: string, color2: string, t: number): string => {
  const c1 = Skia.Color(color1);
  const c2 = Skia.Color(color2);

  const r = Math.round((c1[0] + (c2[0] - c1[0]) * t) * 255);
  const g = Math.round((c1[1] + (c2[1] - c1[1]) * t) * 255);
  const b = Math.round((c1[2] + (c2[2] - c1[2]) * t) * 255);
  const a = c1[3] + (c2[3] - c1[3]) * t;

  return `rgba(${r}, ${g}, ${b}, ${a})`;
};

/**
 * Evaluates the color at a specific data value based on the gradient configuration.
 * Interpolates colors for smooth transitions.
 *
 * Note: Opacity from gradient stops is ignored when evaluating colors at specific points.
 * Opacity should only be used in the gradient rendering itself (Skia LinearGradient).
 *
 * @param gradient - The Gradient configuration
 * @param dataValue - The data value to evaluate (for band scales, this is the index)
 * @param scale - The scale to use for mapping
 * @returns The color string at this data value (rgba format), or null if invalid
 */
export const evaluateGradientAtValue = (
  gradient: Gradient,
  dataValue: number,
  scale: GradientScale,
): string | null => {
  // Resolve stops (handle function form)
  const resolvedStops = resolveGradientStops(gradient.stops, scale);

  if (resolvedStops.length === 0) return null;

  // Get scale domain for single-stop expansion
  const [minValue, maxValue] = getScaleDomainBounds(scale);

  // If only 1 stop, expand to 2-stop gradient from baseline
  let effectiveStops = resolvedStops;
  if (resolvedStops.length === 1) {
    const singleStop = resolvedStops[0];
    const { color } = normalizeGradientStop(singleStop);
    const baselineOffset = singleStop.offset >= 0 ? minValue : maxValue;

    effectiveStops = [{ offset: baselineOffset, color, opacity: 0 }, singleStop];
  }

  // Process stops - always ignore opacity for point evaluation (opacity is handled in gradient rendering)
  const processedColors = effectiveStops.map((stop) => {
    const { color } = normalizeGradientStop(stop);
    return parseColor(color, 1); // Always use full opacity for point colors
  });

  const offsets = effectiveStops.map((stop) => stop.offset);

  // Calculate range
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

  // Find the two colors to interpolate between
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

      // Interpolate between the two colors
      return interpolateColor(processedColors[i], processedColors[i + 1], segmentProgress);
    }
  }

  return processedColors[processedColors.length - 1];
};

/**
 * Creates a gradient configuration for Skia components.
 * Handles gradient processing and direction calculation based on axis.
 *
 * @param gradient - Gradient configuration (required)
 * @param xScale - X-axis scale (required)
 * @param yScale - Y-axis scale (required)
 * @returns GradientConfig or null if gradient processing fails
 *
 * @example
 * const gradientConfig = useMemo(() => {
 *   if (!gradient || !xScale || !yScale) return;
 *   return getGradientConfig(gradient, xScale, yScale);
 * }, [gradient, xScale, yScale]);
 *
 * return (
 *   <SkiaPath path={path} style="stroke">
 *     {gradientConfig && (
 *       <LinearGradient
 *         colors={gradientConfig.colors}
 *         end={gradientConfig.end}
 *         positions={gradientConfig.positions}
 *         start={gradientConfig.start}
 *       />
 *     )}
 *   </SkiaPath>
 * );
 */
export const getGradientConfig = (
  gradient: Gradient,
  xScale: ChartScaleFunction,
  yScale: ChartScaleFunction,
): GradientConfig | null => {
  const scale = getGradientScale(gradient, xScale, yScale);
  if (!scale) return null;

  const processed = processGradient(gradient, scale);
  if (!processed) return null;

  const axisType = gradient.axis ?? 'y';
  const range = scale.range();

  // Determine gradient direction based on axis
  // For y-axis, we need to flip the gradient direction because y-scales are inverted
  // (higher data values have smaller pixel values, appearing at the top)
  const gradientStart = axisType === 'x' ? vec(range[0], 0) : vec(0, range[0]);
  const gradientEnd = axisType === 'x' ? vec(range[1], 0) : vec(0, range[1]);

  return {
    start: gradientStart,
    end: gradientEnd,
    colors: processed.colors,
    positions: processed.positions,
  };
};
