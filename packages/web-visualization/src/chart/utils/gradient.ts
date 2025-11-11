import type { AxisBounds } from './chart';
import { type ChartScaleFunction, isCategoricalScale, isNumericScale } from './scale';

/**
 * Defines a color transition point in the gradient
 */
export type GradientStop = {
  /**
   * Position in data space.
   * Multiple stops at the same offset create hard color transitions.
   */
  offset: number;
  /**  Color at the stop (any valid CSS color) */
  color: string;
  /** Optional opacity (0-1). Defaults to 1. */
  opacity?: number;
};

/**
 * Defines a gradient.
 */
export type GradientDefinition = {
  /**
   * Axis that the gradient maps to.
   * @default 'y'
   */
  axis?: 'x' | 'y';
  /**
   * Gradient stops with colors and positions.
   * Can be an array of stop objects or a function that receives domain bounds.
   */
  stops: GradientStop[] | ((domain: AxisBounds) => GradientStop[]);
};

/**
 * Resolves gradient stops, handling both static arrays and function forms.
 * When stops is a function, calls it with the domain bounds.
 */
const getGradientStops = (
  stops: GradientStop[] | ((domain: AxisBounds) => GradientStop[]),
  domain: AxisBounds,
): GradientStop[] => {
  if (typeof stops === 'function') {
    return stops(domain);
  }
  return stops;
};

/**
 * Processes Gradient to gradient configuration for SVG linearGradient.
 * Colors are smoothly interpolated between stops by the browser.
 * Multiple stops at the same offset create hard color transitions.
 */
const processGradientStops = (
  stops: GradientStop[],
  scale: ChartScaleFunction,
): GradientStop[] | undefined => {
  if (stops.length === 0) {
    console.warn('Gradient has no stops - falling back to default');
    return;
  }

  // Check if stops are in ascending order
  const isOutOfOrder = stops.some((stop, i) => {
    return i > 0 && stop.offset < stops[i - 1].offset;
  });

  if (isOutOfOrder) {
    console.warn(`Gradient: stop offsets must be in ascending order`);
    return;
  }

  const [rangeMin, rangeMax] = scale.range();
  const rangeSpan = Math.abs(rangeMax - rangeMin);

  // Convert data value offsets to normalized positions (0-1) using scale
  const normalizedStops: GradientStop[] = stops
    .map((stop, index) => {
      const stopPosition = scale(stop.offset);
      const normalized =
        stopPosition === undefined
          ? 0
          : Math.max(0, Math.min(1, Math.abs(stopPosition - rangeMin) / rangeSpan));
      return {
        offset: normalized, // Now 0-1 normalized (not data space)
        color: stop.color,
        opacity: stop.opacity ?? 1,
      };
    })
    .sort((a, b) => a.offset - b.offset);

  return normalizedStops;
};

/**
 * Determines the appropriate scale to use based on GradientDefinition axis configuration.
 * Gradients work with numeric scales (linear, log) and categorical scales (band).
 * Band scales use numerical indices [0, 1, 2, ...] which work for color mapping.
 *
 * @param gradient - The GradientDefinition configuration
 * @param xScale - The x-axis scale
 * @param yScale - The y-axis scale
 * @returns The scale to use for color mapping, or undefined if not supported
 */
export const getGradientScale = (
  gradient: GradientDefinition | undefined,
  xScale: ChartScaleFunction | undefined,
  yScale: ChartScaleFunction | undefined,
): ChartScaleFunction | undefined => {
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

  return targetScale;
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
 * @param gradient - The GradientDefinition configuration
 * @param dataValue - The data value to evaluate (for band scales, this is the index)
 * @param scale - The scale to use for value mapping (handles log scales correctly)
 * @returns The color string at this data value (may be a color-mix() expression), or null if invalid
 */
export const evaluateGradientAtValue = (
  gradient: GradientDefinition,
  dataValue: number,
  scale: ChartScaleFunction,
): string | undefined => {
  // Extract domain from scale
  const scaleDomain = scale.domain();
  let domain: AxisBounds;

  if (isCategoricalScale(scale)) {
    const domainArray = scaleDomain as number[];
    domain = { min: domainArray[0], max: domainArray[domainArray.length - 1] };
  } else {
    const [min, max] = scaleDomain as [number, number];
    domain = { min, max };
  }

  const stops = getGradientStops(gradient.stops, domain);
  if (stops.length === 0) return;

  // Use srgb color space to match our linearGradient which uses srgb color space
  // https://www.w3.org/TR/SVG11/painting.html#ColorInterpolationProperty
  const colorSpace = 'srgb';

  // Use scale to map values to positions (handles log scales correctly)
  // For numeric scales: scale(value) returns pixel position
  // We normalize these positions to 0-1 based on the range
  const scaleRange = scale.range();
  const [rangeMin, rangeMax] = Array.isArray(scaleRange)
    ? (scaleRange as [number, number])
    : [scaleRange, scaleRange]; // fallback for band scales

  const rangeSpan = Math.abs(rangeMax - rangeMin);
  if (rangeSpan === 0) return stops[0].color;

  // Map dataValue through scale to get position
  const dataPosition = scale(dataValue);
  if (dataPosition === undefined) return stops[0].color;

  // Normalize to 0-1 based on range
  const normalizedValue = Math.max(0, Math.min(1, Math.abs(dataPosition - rangeMin) / rangeSpan));

  // Map stop offsets through scale and normalize to 0-1
  const positions = stops.map((stop) => {
    const stopPosition = scale(stop.offset);
    if (stopPosition === undefined) return 0;
    return Math.max(0, Math.min(1, Math.abs(stopPosition - rangeMin) / rangeSpan));
  });

  // Find which segment we're in
  if (normalizedValue < positions[0]) {
    return stops[0].color;
  }
  if (normalizedValue >= positions[positions.length - 1]) {
    return stops[stops.length - 1].color;
  }

  // Check if dataValue matches any stop offset exactly (for hard transitions)
  for (let i = 0; i < stops.length; i++) {
    if (dataValue === stops[i].offset) {
      // Found exact match - check if there are multiple stops at this offset (hard transition)
      // Use the LAST color at this offset for hard transitions
      let lastIndexAtOffset = i;
      while (
        lastIndexAtOffset + 1 < stops.length &&
        stops[lastIndexAtOffset + 1].offset === stops[i].offset
      ) {
        lastIndexAtOffset++;
      }
      return stops[lastIndexAtOffset].color;
    }
  }

  // Find the two colors to mix based on normalized positions
  for (let i = 0; i < positions.length - 1; i++) {
    const start = positions[i];
    const end = positions[i + 1];

    if (normalizedValue >= start && normalizedValue <= end) {
      // Handle hard transitions (multiple stops at same position)
      if (end === start) {
        return stops[i + 1].color;
      }

      // Calculate progress within this segment (0-1)
      const segmentProgress = (normalizedValue - start) / (end - start);
      const percentage = segmentProgress * 100;

      // Use color-mix()! This works with CSS variables!
      return `color-mix(in ${colorSpace}, ${stops[i + 1].color} ${percentage}%, ${stops[i].color})`;
    }
  }

  return stops[stops.length - 1].color;
};

/**
 * Creates a gradient configuration for SVG components.
 * Processes a GradientDefinition into a renderable GradientConfig.
 * Supports both numeric scales (linear, log) and categorical scales (band).
 *
 * @param gradient - GradientDefinition configuration (required)
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
 * if (gradientConfig) {
 *   return (
 *     <defs>
 *       <Gradient
 *         config={gradientConfig}
 *         direction={gradient.axis === 'x' ? 'horizontal' : 'vertical'}
 *         id={gradientId}
 *       />
 *     </defs>
 *   );
 * }
 */
export const getGradientConfig = (
  gradient: GradientDefinition,
  xScale: ChartScaleFunction,
  yScale: ChartScaleFunction,
): GradientStop[] | undefined => {
  if (!gradient) return;

  // Get the scale based on axis
  const scale = getGradientScale(gradient, xScale, yScale);
  if (!scale) return;

  // Extract domain from scale
  const scaleDomain = scale.domain();
  let domain: AxisBounds;

  if (isCategoricalScale(scale)) {
    const domainArray = scaleDomain as number[];
    domain = { min: domainArray[0], max: domainArray[domainArray.length - 1] };
  } else {
    const [min, max] = scaleDomain as [number, number];
    domain = { min, max };
  }

  const resolvedStops = getGradientStops(gradient.stops, domain);
  return processGradientStops(resolvedStops, scale);
};
