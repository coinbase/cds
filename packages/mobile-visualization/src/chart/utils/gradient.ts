import { Skia } from '@shopify/react-native-skia';

import type { AxisBounds } from './chart';
import {
  applySerializableScale,
  type ChartScaleFunction,
  isCategoricalScale,
  isSerializableScale,
  type SerializableScale,
} from './scale';

/**
 * Defines a color transition point in the gradient
 */
export type GradientStop = {
  /**
   * Position in data space.
   * Multiple stops at the same offset create hard color transitions.
   */
  offset: number;
  /**  Color at the stop (any valid Skia color) */
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
export const getGradientStops = (
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
 * Interpolates between two colors using linear interpolation.
 * Returns an rgba string.
 */
const interpolateColor = (color1: string, color2: string, t: number): string => {
  'worklet';
  const c1 = Skia.Color(color1);
  const c2 = Skia.Color(color2);

  const r = Math.round((c1[0] + (c2[0] - c1[0]) * t) * 255);
  const g = Math.round((c1[1] + (c2[1] - c1[1]) * t) * 255);
  const b = Math.round((c1[2] + (c2[2] - c1[2]) * t) * 255);
  const a = c1[3] + (c2[3] - c1[3]) * t;

  return `rgba(${r}, ${g}, ${b}, ${a})`;
};

/**
 * Adds an opacity to a color
 * Returns an rgba string.
 */
export const getColorWithOpacity = (color1: string, opacity: number): string => {
  const c = Skia.Color(color1);
  return `rgba(${c[0] * 255}, ${c[1] * 255}, ${c[2] * 255}, ${opacity})`;
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
 * Evaluates the color at a specific data value based on the gradient stops, ignoring opacity.
 * @param stops - The gradient stops configuration
 * @param dataValue - The data value to evaluate (for band scales, this is the index)
 * @param scale - The scale to use for value mapping (handles log scales correctly)
 * @returns The color string at this data value, or undefined if invalid
 */
export const evaluateGradientAtValue = (
  stops: GradientStop[],
  dataValue: number,
  scale: SerializableScale | ChartScaleFunction,
): string | undefined => {
  'worklet';

  if (stops.length === 0) return;

  // Determine range based on scale type
  let rangeMin: number;
  let rangeMax: number;

  if (isSerializableScale(scale)) {
    // SerializableScale has range as [number, number]
    [rangeMin, rangeMax] = scale.range;
  } else {
    // ChartScaleFunction has range() method
    const scaleRange = scale.range();
    [rangeMin, rangeMax] = Array.isArray(scaleRange)
      ? (scaleRange as [number, number])
      : [scaleRange, scaleRange]; // fallback for band scales
  }

  const rangeSpan = Math.abs(rangeMax - rangeMin);
  if (rangeSpan === 0) return stops[0].color;

  // Map dataValue through scale to get position
  let dataPosition: number;
  if (isSerializableScale(scale)) {
    dataPosition = applySerializableScale(dataValue, scale);
  } else {
    const result = scale(dataValue);
    if (result === undefined) return stops[0].color;
    dataPosition = result;
  }

  // Normalize to 0-1 based on range
  const normalizedValue = Math.max(0, Math.min(1, Math.abs(dataPosition - rangeMin) / rangeSpan));

  // Map stop offsets through scale and normalize to 0-1
  const positions = stops.map((stop) => {
    let stopPosition: number;
    if (isSerializableScale(scale)) {
      stopPosition = applySerializableScale(stop.offset, scale);
    } else {
      const result = scale(stop.offset);
      if (result === undefined) return 0;
      stopPosition = result;
    }
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

  // Find the segment to interpolate between
  for (let i = 0; i < positions.length - 1; i++) {
    if (normalizedValue >= positions[i] && normalizedValue <= positions[i + 1]) {
      const segmentStart = positions[i];
      const segmentEnd = positions[i + 1];

      if (segmentEnd === segmentStart) {
        return stops[i].color;
      }

      const t = (normalizedValue - segmentStart) / (segmentEnd - segmentStart);
      return interpolateColor(stops[i].color, stops[i + 1].color, t);
    }
  }

  return stops[0].color;
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
