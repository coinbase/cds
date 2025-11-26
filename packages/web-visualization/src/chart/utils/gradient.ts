import type { AxisBounds } from './chart';
import { type ChartScaleFunction, isCategoricalScale } from './scale';

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
    .map((stop) => {
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
 * Evaluates the color at a specific data value based on the gradient stops, ignoring opacity.
 * @param stops - The gradient stops configuration
 * @param dataValue - The data value to evaluate (for band scales, this is the index)
 * @param scale - The scale to use for value mapping (handles log scales correctly)
 * @returns The color string at this data value, or undefined if invalid
 */
export const evaluateGradientAtValue = (
  stops: GradientStop[],
  dataValue: number,
  scale: ChartScaleFunction,
): string | undefined => {
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

  // stops already have normalized offsets (0-1), use them directly
  const positions = stops.map((stop) => stop.offset);

  // Find which segment we're in
  if (normalizedValue < positions[0]) {
    return stops[0].color;
  }
  if (normalizedValue >= positions[positions.length - 1]) {
    return stops[stops.length - 1].color;
  }

  // Check if normalizedValue matches any stop offset exactly (for hard transitions)
  for (let i = 0; i < stops.length; i++) {
    if (Math.abs(normalizedValue - stops[i].offset) < 1e-10) {
      // Found exact match - check if there are multiple stops at this offset (hard transition)
      // Use the LAST color at this offset for hard transitions
      let lastIndexAtOffset = i;
      while (
        lastIndexAtOffset + 1 < stops.length &&
        Math.abs(stops[lastIndexAtOffset + 1].offset - stops[i].offset) < 1e-10
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
      const segmentProgress = (normalizedValue - start) / (end - start);
      return `color-mix(in ${colorSpace}, ${stops[i + 1].color} ${segmentProgress * 100}%, ${stops[i].color})`;
    }
  }

  // If we didn't reach any to be mixed, return the last color
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
  const scale = gradient.axis === 'x' ? xScale : yScale;
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

/**
 * Determines the baseline value for the gradient area by finding the value
 * within the axis bounds that is closest to the target baseline.
 *
 * @param axisBounds - The min and max bounds of the axis
 * @param baseline - The target baseline value (defaults to 0)
 * @returns The value within bounds closest to the baseline
 */
export const getBaseline = (axisBounds: AxisBounds, baseline: number = 0): number => {
  const { min, max } = axisBounds;

  // Normalize to ensure lowerBound <= upperBound
  const lowerBound = Math.min(min, max);
  const upperBound = Math.max(min, max);

  // If baseline is within the range, use it
  if (lowerBound <= baseline && baseline <= upperBound) return baseline;

  // Otherwise, return the bound closest to baseline
  return Math.abs(lowerBound - baseline) < Math.abs(upperBound - baseline)
    ? lowerBound
    : upperBound;
};

/**
 * Generates a gradient definition for the area chart based on the axis bounds
 * and styling parameters. Ensures gradient stops are in ascending order.
 *
 * @param axisBounds - The min and max bounds of the axis
 * @param baselineValue - The baseline value for the gradient
 * @param fill - The color to use for the gradient
 * @param peakOpacity - Opacity at the peak of the gradient
 * @param baselineOpacity - Opacity at the baseline
 * @returns A gradient definition with y-axis stops in ascending order
 */
export const createGradient = (
  axisBounds: AxisBounds,
  baselineValue: number,
  fill: string,
  peakOpacity: number,
  baselineOpacity: number,
): GradientDefinition => {
  const { min, max } = axisBounds;

  const lowerBound = Math.min(min, max);
  const upperBound = Math.max(min, max);

  if (lowerBound < baselineValue && baselineValue < upperBound) {
    return {
      axis: 'y',
      stops: [
        { offset: lowerBound, color: fill, opacity: peakOpacity },
        { offset: baselineValue, color: fill, opacity: baselineOpacity },
        { offset: upperBound, color: fill, opacity: peakOpacity },
      ],
    };
  }

  const peakValue = Math.abs(min - baselineValue) > Math.abs(max - baselineValue) ? min : max;

  return {
    axis: 'y',
    stops: [
      { offset: peakValue, color: fill, opacity: peakOpacity },
      { offset: baselineValue, color: fill, opacity: baselineOpacity },
    ].sort((a, b) => a.offset - b.offset),
  };
};
