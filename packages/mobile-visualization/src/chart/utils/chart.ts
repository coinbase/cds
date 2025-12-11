import { isSharedValue } from 'react-native-reanimated';
import type { AnimatedProp } from '@shopify/react-native-skia';
import { stack as d3Stack, stackOffsetDiverging, stackOrderNone } from 'd3-shape';

import type { GradientDefinition } from './gradient';

export const defaultStackId = 'DEFAULT_STACK_ID';

export type AxisBounds = {
  min: number;
  max: number;
};

/**
 * Type guard to check if bounds are complete with both min and max values.
 * @param bounds - The bounds to validate
 * @returns True if bounds has both min and max defined
 */
export const isValidBounds = (bounds: Partial<AxisBounds>): bounds is AxisBounds =>
  bounds.min !== undefined && bounds.max !== undefined;

export type Series = {
  /**
   * Id of the series.
   */
  id: string;
  /**
   * Label of the series.
   */
  label?: string;
  /**
   * Color for the series.
   */
  color?: string;
};

export type CartesianSeries = Series & {
  /**
   * Data array for this series. Use null values to create gaps in the visualization.
   *
   * Can be either:
   * - Array of numbers: `[10, -5, 20]`
   * - Array of tuples: `[[0, 10], [0, -5], [0, 20]]` [baseline, value] pairs
   */
  data?: Array<number | null> | Array<[number, number] | null>;
  /**
   * Color gradient configuration.
   * Takes precedence over color for drawing area components (such as Line, Area, Bar, and ScrubberBeacon).
   */
  gradient?: GradientDefinition;
  /**
   * Id of the y-axis this series uses.
   * Defaults to defaultAxisId if not specified.
   */
  yAxisId?: string;
  /**
   * Id of the stack group this series belongs to.
   * Series with the same stackId value will be stacked together.
   * If not specified, the series will not be stacked.
   */
  stackId?: string;
};

export type PolarSeries = Series & {
  /**
   * Data for the series.
   * - Single number for pie/donut charts (each series = one slice)
   * - Array of numbers for radar/radial bar charts (each series = multiple points)
   */
  data: number | Array<number | null>;
  /**
   * ID of the angular axis this series should use.
   * If not specified, uses the default angular axis.
   */
  angularAxisId?: string;
  /**
   * ID of the radial axis this series should use.
   * If not specified, uses the default radial axis.
   */
  radialAxisId?: string;
};

/**
 * Calculates the angular domain from polar series data.
 * For pie/donut: domain is 0 to series.length - 1
 * For radar: domain is 0 to data array length - 1
 */
export const getPolarAngularDomain = (
  series: PolarSeries[],
  min?: number,
  max?: number,
): Partial<AxisBounds> => {
  const domain = { min, max };

  if (domain.min !== undefined && domain.max !== undefined) {
    return domain;
  }

  if (series.length === 0) {
    return domain;
  }

  const firstSeriesData = series[0].data;

  if (typeof firstSeriesData === 'number') {
    // Pie/donut: each series is a slice
    if (domain.min === undefined) domain.min = 0;
    if (domain.max === undefined) domain.max = series.length - 1;
  } else if (Array.isArray(firstSeriesData)) {
    // Radar: domain is based on data array length
    const dataLength = Math.max(...series.map((s) => (Array.isArray(s.data) ? s.data.length : 0)));
    if (dataLength > 0) {
      if (domain.min === undefined) domain.min = 0;
      if (domain.max === undefined) domain.max = dataLength - 1;
    }
  }

  return domain;
};

/**
 * Calculates the radial range (value extent) from polar series data.
 */
export const getPolarRadialRange = (
  series: PolarSeries[],
  min?: number,
  max?: number,
): Partial<AxisBounds> => {
  const range = { min, max };

  if (range.min !== undefined && range.max !== undefined) {
    return range;
  }

  if (series.length === 0) {
    return range;
  }

  const allValues: number[] = [];

  series.forEach((s) => {
    if (typeof s.data === 'number') {
      allValues.push(s.data);
    } else if (Array.isArray(s.data)) {
      s.data.forEach((value) => {
        if (typeof value === 'number') {
          allValues.push(value);
        }
      });
    }
  });

  if (allValues.length > 0) {
    const minValue = Math.min(...allValues);
    const maxValue = Math.max(...allValues);
    if (range.min === undefined) range.min = Math.min(0, minValue);
    if (range.max === undefined) range.max = maxValue;
  }

  return range;
};

/**
 * Calculates the domain of a chart from series data.
 * Domain represents the range of x-values from the data.
 */
export const getCartesianDomain = (
  series: CartesianSeries[],
  min?: number,
  max?: number,
): Partial<AxisBounds> => {
  const domain = {
    min,
    max,
  };

  if (domain.min !== undefined && domain.max !== undefined) {
    return domain;
  }

  if (series.length > 0) {
    const dataLength = Math.max(...series.map((s) => s.data?.length || 0));

    if (dataLength > 0) {
      if (domain.min === undefined) domain.min = 0;
      if (domain.max === undefined) domain.max = dataLength - 1;
    }
  }

  return domain;
};

/**
 * Creates a composite stack key that includes both stack ID and y-axis ID.
 * This ensures series with different y-scales don't get stacked together.
 */
const createCartesianStackKey = (series: CartesianSeries): string | undefined => {
  if (series.stackId === undefined) return undefined;

  // Include y-axis ID to prevent cross-scale stacking
  const yAxisId = series.yAxisId || 'default';
  return `${series.stackId}:${yAxisId}`;
};

/**
 * Transforms series data into stacked data using D3's stack algorithm.
 * Returns a map of series ID to transformed [baseline, value] tuples.
 *
 * @param series - Array of series with potential stack properties
 * @returns Map of series ID to stacked data arrays
 */
export const getCartesianStackedSeriesData = (
  series: CartesianSeries[],
): Map<string, Array<[number, number] | null>> => {
  const stackedDataMap = new Map<string, Array<[number, number] | null>>();

  const numericStackGroups = new Map<string, typeof series>();
  const individualSeries: typeof series = [];

  series.forEach((s) => {
    const stackKey = createCartesianStackKey(s);
    const hasTupleData = s.data?.some((val) => Array.isArray(val));

    if (hasTupleData || stackKey === undefined) {
      individualSeries.push(s);
    } else {
      if (!numericStackGroups.has(stackKey)) {
        numericStackGroups.set(stackKey, []);
      }
      numericStackGroups.get(stackKey)!.push(s);
    }
  });

  individualSeries.forEach((s) => {
    if (!s.data) return;

    const normalizedData: Array<[number, number] | null> = s.data.map((val) => {
      if (val === null) return null;

      if (Array.isArray(val)) {
        return val as [number, number];
      }

      if (typeof val === 'number') {
        return [0, val];
      }

      return null;
    });

    stackedDataMap.set(s.id, normalizedData);
  });

  numericStackGroups.forEach((groupSeries, stackKey) => {
    const maxLength = Math.max(...groupSeries.map((s) => s.data?.length || 0));

    if (maxLength === 0) return;

    const dataset: Array<Record<string, number>> = new Array(maxLength)
      .fill(undefined)
      .map((_, i) => {
        const row: Record<string, number> = {};
        for (const s of groupSeries) {
          const val = s.data?.[i];
          const num = typeof val === 'number' ? val : 0;
          row[s.id] = num;
        }
        return row;
      });

    const keys = groupSeries.map((s) => s.id);
    const stackedSeries = d3Stack<Record<string, number>, string>()
      .keys(keys)
      .order(stackOrderNone)
      .offset(stackOffsetDiverging)(dataset);

    stackedSeries.forEach((layer, layerIndex) => {
      const seriesId = keys[layerIndex];
      const stackedData: Array<[number, number] | null> = layer.map(([bottom, top]) => [
        bottom,
        top,
      ]);
      stackedDataMap.set(seriesId, stackedData);
    });
  });

  return stackedDataMap;
};

/**
 * Extracts line data values from series data that may contain tuples.
 * For tuple data [[baseline, value]], extracts the last value.
 * For numeric data [value], returns as-is.
 *
 * @param data - Array of numbers, tuples, or null values
 * @returns Array of numbers or null values
 */
export const getLineData = (
  data?: Array<number | null> | Array<[number, number] | null>,
): Array<number | null> => {
  if (!data) return [];

  // Check if this is tuple data by finding first non-null entry
  const firstNonNull = data.find((d) => d !== null);
  if (Array.isArray(firstNonNull)) {
    return data.map((d) => {
      if (d === null) return null;
      if (Array.isArray(d)) return d.at(-1) ?? null;
      return d as number;
    });
  }

  // Already numeric data
  return data as Array<number | null>;
};

/**
 * Calculates the range of a chart from series data.
 * Range represents the range of y-values from the data.
 * Handles stacking by transforming data when series have stack properties.
 */
export const getCartesianRange = (
  series: CartesianSeries[],
  min?: number,
  max?: number,
): Partial<AxisBounds> => {
  const range = {
    min,
    max,
  };

  if (range.min !== undefined && range.max !== undefined) {
    return range;
  }

  if (series.length === 0) {
    return range;
  }

  // Group series by composite stack key for proper calculation
  const stackGroups = new Map<string | undefined, typeof series>();
  series.forEach((s) => {
    const stackKey = createCartesianStackKey(s);
    if (!stackGroups.has(stackKey)) {
      stackGroups.set(stackKey, []);
    }
    stackGroups.get(stackKey)!.push(s);
  });

  // Check if we have any stacked series
  const hasStacks = Array.from(stackGroups.keys()).some((k) => k !== undefined);

  if (hasStacks) {
    // Get stacked data using the shared function
    const stackedDataMap = getCartesianStackedSeriesData(series);

    // Find the extreme values from the stacked data
    let stackedMax = 0;
    let stackedMin = 0;

    stackedDataMap.forEach((stackedData) => {
      stackedData.forEach((point) => {
        if (point !== null) {
          const [bottom, top] = point;
          if (top > stackedMax) stackedMax = top;
          if (bottom < stackedMin) stackedMin = bottom;
        }
      });
    });

    // Don't add padding - let D3's nice() function handle axis padding
    if (range.min === undefined) range.min = Math.min(0, stackedMin);
    if (range.max === undefined) range.max = Math.max(0, stackedMax);
  } else {
    // No stacking, calculate range from raw values
    const allValues: number[] = [];

    series.forEach((s) => {
      if (s.data) {
        s.data.forEach((point) => {
          if (typeof point === 'number') {
            allValues.push(point);
          } else if (Array.isArray(point)) {
            // Filter out null values from tuples
            const validValues = point.filter((val): val is number => val !== null);
            allValues.push(...validValues);
          }
        });
      }
    });

    if (allValues.length > 0) {
      const minValue = Math.min(...allValues);
      const maxValue = Math.max(...allValues);
      if (range.min === undefined) range.min = minValue;
      if (range.max === undefined) range.max = maxValue;
    }
  }

  return range;
};

export type ChartInset = {
  top: number;
  left: number;
  bottom: number;
  right: number;
};

export const defaultChartInset: ChartInset = {
  top: 32,
  left: 16,
  bottom: 16,
  right: 16,
};

/**
 * Normalize padding to include all sides with a value.
 * @param padding - The padding to get.
 * @param defaults - Optional complete default values to use instead of 0.
 * @returns The calculated padding.
 */
/**
 * Normalize inset to include all sides with a value.
 * @param inset - The inset to get.
 * @param defaults - Optional complete default values to use instead of 0.
 * @returns The calculated inset.
 */
export const getChartInset = (
  inset?: number | Partial<ChartInset>,
  defaults?: ChartInset,
): ChartInset => {
  const baseDefaults = defaults ?? {
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  };

  if (typeof inset === 'number') {
    return {
      top: inset,
      left: inset,
      bottom: inset,
      right: inset,
    };
  }

  return {
    top: inset?.top ?? baseDefaults.top,
    left: inset?.left ?? baseDefaults.left,
    bottom: inset?.bottom ?? baseDefaults.bottom,
    right: inset?.right ?? baseDefaults.right,
  };
};

/**
 * Unwraps an optionally animated value to get the raw value.
 * @param value - The value to unwrap.
 * @returns The raw value.
 */
export const unwrapAnimatedValue = <T>(value: AnimatedProp<T>): T => {
  'worklet';
  if (isSharedValue<T>(value)) {
    return value.value;
  }
  return value as T;
};
