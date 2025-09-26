import { stack as d3Stack, stackOffsetDiverging, stackOrderNone } from 'd3-shape';

import type { AxisBounds } from './scale';

export const defaultStackId = 'DEFAULT_STACK_ID';

export type Series = {
  /**
   * The id of the series.
   */
  id: string;
  /**
   * The data array for this series. Use null values to create gaps in the visualization.
   *
   * Can be either:
   * - Array of numbers: `[10, -5, 20]`
   * - Array of tuples: `[[0, 10], [0, -5], [0, 20]]` [baseline, value] pairs
   */
  data?: Array<number | null> | Array<[number, number] | null>;
  /**
   * The label of the series. Can be a React node or a function that receives the data index and returns a React node.
   */
  label?: string | ((dataIndex: number) => string);
  /**
   * The color of the series.
   */
  color?: string;
  /**
   * The ID of the y-axis this series uses.
   * Defaults to defaultAxisId if not specified.
   */
  yAxisId?: string;
  /**
   * The stack group this series belongs to.
   * Series with the same stackId value will be stacked together.
   * If not specified, the series will not be stacked.
   */
  stackId?: string;
};

/**
 * Calculates the domain of a chart from series data.
 * Domain represents the range of x-values from the data.
 */
export const getChartDomain = (
  series: Series[],
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
    const maxDataLength = Math.max(...series.map((s) => s.data?.length || 0));

    if (maxDataLength > 0) {
      if (domain.min === undefined) domain.min = 0;
      if (domain.max === undefined) domain.max = maxDataLength - 1;
    }
  }

  return domain;
};

/**
 * Creates a composite stack key that includes both stack ID and y-axis ID.
 * This ensures series with different y-scales don't get stacked together.
 */
const createStackKey = (series: Series): string | undefined => {
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
export const getStackedSeriesData = (
  series: Series[],
): Map<string, Array<[number, number] | null>> => {
  const stackedDataMap = new Map<string, Array<[number, number] | null>>();

  const numericStackGroups = new Map<string, typeof series>();
  const individualSeries: typeof series = [];

  series.forEach((s) => {
    const stackKey = createStackKey(s);
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
 * Calculates the range of a chart from series data.
 * Range represents the range of y-values from the data.
 * Handles stacking by transforming data when series have stack properties.
 */
export const getChartRange = (
  series: Series[],
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
    const stackKey = createStackKey(s);
    if (!stackGroups.has(stackKey)) {
      stackGroups.set(stackKey, []);
    }
    stackGroups.get(stackKey)!.push(s);
  });

  // Check if we have any stacked series
  const hasStacks = Array.from(stackGroups.keys()).some((k) => k !== undefined);

  if (hasStacks) {
    // Get stacked data using the shared function
    const stackedDataMap = getStackedSeriesData(series);

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
