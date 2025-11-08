import { Skia } from '@shopify/react-native-skia';

import type { AxisBounds } from './chart';
import {
  applySerializableScale,
  type ChartScaleFunction,
  isCategoricalScale,
  isNumericScale,
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
  const normalizedStops: GradientStop[] = stops.map((stop, index) => {
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
  });

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
 * Evaluates the color at a specific data value based on the gradient configuration.
 * Uses Skia color interpolation for smooth transitions.
 *
 * Note: Opacity from gradient stops is ignored when evaluating colors at specific points.
 * Opacity should only be used in the gradient rendering itself (Skia LinearGradient).
 *
 * Returns an interpolated color that Skia can render.
 *
 * @param gradient - The GradientDefinition configuration
 * @param dataValue - The data value to evaluate (for band scales, this is the index)
 * @param scale - The scale to use for value mapping (handles log scales correctly)
 * @returns The color string at this data value (may be an interpolated color), or null if invalid
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

      // Use Skia color interpolation for smooth transitions
      return interpolateColor(stops[i].color, stops[i + 1].color, segmentProgress);
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

/**
 * Worklet-compatible version of evaluateGradientAtValue that works with SerializableScale.
 * Evaluates a gradient at a specific data value using a serializable scale.
 *
 * @param gradient - The GradientDefinition configuration
 * @param dataValue - The data value to evaluate (for band scales, this is the index)
 * @param scale - The serializable scale to use for value mapping
 * @returns The color string at this data value (may be an interpolated color), or null if invalid
 */
export const evaluateGradientAtValueWithSerializableScale = (
  gradient: GradientDefinition,
  dataValue: number,
  scale: SerializableScale,
): string | undefined => {
  'worklet';

  // Extract domain from serializable scale
  const domain = { min: scale.domain[0], max: scale.domain[1] };

  const stops = getGradientStops(gradient.stops, domain);
  if (stops.length === 0) return;

  // Use serializable scale to map values to positions
  const rangeSpan = Math.abs(scale.range[1] - scale.range[0]);
  if (rangeSpan === 0) return stops[0].color;

  // Map dataValue through scale to get position
  const dataPosition = applySerializableScale(dataValue, scale);

  // Normalize to 0-1 based on range
  const normalizedValue = Math.max(
    0,
    Math.min(1, Math.abs(dataPosition - scale.range[0]) / rangeSpan),
  );

  // Map stop offsets through scale and normalize to 0-1
  const positions = stops.map((stop) => {
    const stopPosition = applySerializableScale(stop.offset, scale);
    return Math.max(0, Math.min(1, Math.abs(stopPosition - scale.range[0]) / rangeSpan));
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
 * Optimized worklet-compatible version that accepts pre-computed gradient stops.
 * Use this when you want to pre-compute stops off the UI thread and then evaluate colors on the UI thread.
 *
 * @param precomputedStops - Pre-computed gradient stops (computed off UI thread)
 * @param dataValue - The data value to evaluate (for band scales, this is the index)
 * @param scale - The serializable scale to use for value mapping
 * @returns The color string at this data value (may be an interpolated color), or null if invalid
 */
export const evaluateGradientAtValueWithPrecomputedStops = (
  precomputedStops: GradientStop[],
  dataValue: number,
  scale: SerializableScale,
): string | undefined => {
  'worklet';

  if (precomputedStops.length === 0) return;

  // Use serializable scale to map values to positions
  const rangeSpan = Math.abs(scale.range[1] - scale.range[0]);
  if (rangeSpan === 0) return precomputedStops[0].color;

  // Map dataValue through scale to get position
  const dataPosition = applySerializableScale(dataValue, scale);

  // Normalize to 0-1 based on range
  const normalizedValue = Math.max(
    0,
    Math.min(1, Math.abs(dataPosition - scale.range[0]) / rangeSpan),
  );

  // Map stop offsets through scale and normalize to 0-1
  const positions = precomputedStops.map((stop) => {
    const stopPosition = applySerializableScale(stop.offset, scale);
    return Math.max(0, Math.min(1, Math.abs(stopPosition - scale.range[0]) / rangeSpan));
  });

  // Find which segment we're in
  if (normalizedValue < positions[0]) {
    return precomputedStops[0].color;
  }
  if (normalizedValue >= positions[positions.length - 1]) {
    return precomputedStops[precomputedStops.length - 1].color;
  }

  // Check if dataValue matches any stop offset exactly (for hard transitions)
  for (let i = 0; i < precomputedStops.length; i++) {
    if (dataValue === precomputedStops[i].offset) {
      // Found exact match - check if there are multiple stops at this offset (hard transition)
      // Use the LAST color at this offset for hard transitions
      let lastIndexAtOffset = i;
      while (
        lastIndexAtOffset + 1 < precomputedStops.length &&
        precomputedStops[lastIndexAtOffset + 1].offset === precomputedStops[i].offset
      ) {
        lastIndexAtOffset++;
      }
      return precomputedStops[lastIndexAtOffset].color;
    }
  }

  // Find the segment to interpolate between
  for (let i = 0; i < positions.length - 1; i++) {
    if (normalizedValue >= positions[i] && normalizedValue <= positions[i + 1]) {
      const segmentStart = positions[i];
      const segmentEnd = positions[i + 1];

      if (segmentEnd === segmentStart) {
        return precomputedStops[i].color;
      }

      const t = (normalizedValue - segmentStart) / (segmentEnd - segmentStart);
      return interpolateColor(precomputedStops[i].color, precomputedStops[i + 1].color, t);
    }
  }

  return precomputedStops[0].color;
};
