import { useCallback, useMemo, useState } from 'react';
import type React from 'react';

import type { Rect } from '../../types';

import { getChartDomain, getChartRange, type Series } from './chart';
import {
  type AxisBounds,
  type ChartAxisScaleType,
  type ChartScaleFunction,
  getCategoricalScale,
  getNumericScale,
  isCategoricalScale,
  isNumericScale,
  isValidBounds,
  type NumericScale,
} from './scale';

export const defaultAxisId = 'DEFAULT_AXIS_ID';
export const defaultAxisScaleType = 'linear';

/**
 * Axis configuration with computed bounds
 */
export type AxisConfig = {
  /** The type of scale to use */
  scaleType: ChartAxisScaleType;
  /**
   * Domain bounds for the axis (data space)
   */
  domain: AxisBounds;
  /**
   * Range bounds for the axis (visual space in pixels)
   */
  range: AxisBounds;
  /**
   * Data for the axis
   */
  data?: string[] | number[];
  /**
   * Padding between categories for band scales (0-1, where 0.1 = 10% spacing)
   * Only used when scaleType is 'band'
   * @default 0.1
   */
  categoryPadding?: number;
  /**
   * Domain limit type for numeric scales
   * - 'nice': Rounds the domain to human-friendly values
   * - 'strict': Uses the exact min/max values from the data
   */
  domainLimit: 'nice' | 'strict';
};

/**
 * Axis configuration without computed bounds (used for input)
 */
export type AxisConfigProps = Omit<AxisConfig, 'domain' | 'range'> & {
  /**
   * Unique identifier for this axis.
   */
  id: string;
  /**
   * Domain configuration for the axis (data space).
   *
   * The domainLimit parameter (inherited from AxisConfig) controls how initial domain bounds are calculated:
   * - 'nice' (default for y axes): Rounds the domain to human-friendly values (e.g., 0-100 instead of 1.2-97.8)
   * - 'strict' (default for x axes): Uses the exact min/max values from the data
   *
   * The domain can be:
   * - A partial bounds object to override specific min/max values
   * - A function that receives the limit-processed bounds and allows further customization
   *
   * This allows you to first apply nice/strict processing, then optionally transform the result.
   */
  domain?: Partial<AxisBounds> | ((bounds: AxisBounds) => AxisBounds);
  /**
   * Range configuration for the axis (visual space in pixels).
   * Can be a partial bounds object to override specific values, or a function that transforms the calculated range.
   *
   * When using a function, it receives the initial calculated range bounds and allows you to adjust them.
   * This replaces the previous rangeOffset approach and provides more flexibility for range customization.
   */
  range?: Partial<AxisBounds> | ((bounds: AxisBounds) => AxisBounds);
};

/**
 * Gets a D3 scale based on the axis configuration.
 * Handles both numeric (linear/log) and categorical (band) scales.
 *
 * For numeric scales, the domain limit controls whether bounds are "nice" (human-friendly)
 * or "strict" (exact min/max). Range can be customized using function-based configuration.
 *
 * @param params - Scale parameters
 * @returns The D3 scale function
 * @throws An Error if bounds are invalid
 */
export const getAxisScale = ({
  config,
  type,
  range,
  dataDomain,
}: {
  config?: AxisConfig;
  type: 'x' | 'y';
  range: AxisBounds;
  dataDomain: AxisBounds;
}): ChartScaleFunction => {
  const scaleType = config?.scaleType ?? 'linear';

  let adjustedRange = range;

  // Invert range for Y axis for SVG coordinate system
  if (type === 'y') {
    adjustedRange = { min: adjustedRange.max, max: adjustedRange.min };
  }

  let adjustedDomain = dataDomain;

  if (config?.domain) {
    adjustedDomain = {
      min: config.domain.min ?? dataDomain.min,
      max: config.domain.max ?? dataDomain.max,
    };
  }

  if (!isValidBounds(adjustedDomain)) throw new Error('Invalid domain bounds');

  if (scaleType === 'band') {
    return getCategoricalScale({
      domain: adjustedDomain,
      range: adjustedRange,
      padding: config?.categoryPadding ?? 0.3,
    });
  } else {
    const scale = getNumericScale({
      domain: adjustedDomain,
      range: adjustedRange,
      scaleType: scaleType as 'linear' | 'log',
    });

    if (config?.domainLimit === 'nice') scale.nice();

    return scale;
  }
};

/**
 * Formats the array of user-provided axis configs with default values and validates axis ids.
 * Ensures at least one axis config exists if no input is provided.
 * Requires specific axis ids when there are more than 1 axes.
 * Defaults the axis id for a single axis config if there is no id.
 * @param type - the type of axis, 'x' or 'y'
 * @param axes - array of axis configs or single axis config
 * @param defaultId - the default id to use for the axis
 * @param defaultScaleType - the default scale type to use for the axis
 * @returns array of axis configs with IDs
 */
export const getAxisConfig = (
  type: 'x' | 'y',
  axes: Partial<AxisConfigProps> | Partial<AxisConfigProps>[] | undefined,
  defaultId: string = defaultAxisId,
  defaultScaleType: ChartAxisScaleType = defaultAxisScaleType,
): AxisConfigProps[] => {
  const defaultDomainLimit = type === 'x' ? 'strict' : 'nice';
  if (!axes) {
    return [{ id: defaultId, scaleType: defaultScaleType, domainLimit: defaultDomainLimit }];
  }

  if (Array.isArray(axes)) {
    const axesLength = axes.length;
    // forces id to be defined on every input config when there are multiple axes
    if (axesLength > 1 && axes.some(({ id }) => id === undefined)) {
      throw new Error('When defining multiple axes, each must have a unique id');
    }

    return axes.map(({ id, ...axis }) => ({
      // defaults the axis id if onlly a single axis is provided
      id: axesLength > 1 ? (id ?? defaultAxisId) : (id as string),
      scaleType: defaultScaleType,
      domainLimit: defaultDomainLimit,
      ...axis,
    }));
  }

  // Single axis config
  return [{ id: defaultId, scaleType: defaultScaleType, domainLimit: defaultDomainLimit, ...axes }];
};

/**
 * Calculates the data domain for an axis based on its configuration and series data.
 * Handles both x and y axes, categorical data, custom domain configurations, and stacking.
 *
 * @param axisParam - The axis configuration
 * @param series - Array of series objects (for stacking support)
 * @param axisType - Whether this is an 'x' or 'y' axis
 * @returns The calculated axis bounds
 */
export const getAxisDomain = (
  axisParam: AxisConfigProps,
  series: Series[],
  axisType: 'x' | 'y',
): AxisBounds => {
  let dataDomain: AxisBounds | null = null;
  if (axisParam.data && Array.isArray(axisParam.data) && axisParam.data.length > 0) {
    const firstItem = axisParam.data[0];

    if (typeof firstItem === 'number') {
      // Numeric data - use actual min/max values
      const numericData = axisParam.data as number[];
      dataDomain = {
        min: Math.min(...numericData),
        max: Math.max(...numericData),
      };
    } else if (typeof firstItem === 'string') {
      // String labels - use indices as domain (0 to length-1)
      // This allows using string labels with linear scales
      dataDomain = {
        min: 0,
        max: axisParam.data.length - 1,
      };
    }
  }

  // Calculate domain from series data
  const seriesDomain = axisType === 'x' ? getChartDomain(series) : getChartRange(series);

  // If data sets the domain, use that instead of the series domain
  const preferredDataDomain = dataDomain ?? seriesDomain;

  const bounds = axisParam.domain;
  let finalDomain: Partial<AxisBounds>;

  if (typeof bounds === 'function') {
    // Apply the transform function to the base domain
    // No need to default to 0 here since we'll do it once at the end
    finalDomain = bounds({
      min: preferredDataDomain.min ?? 0,
      max: preferredDataDomain.max ?? 0,
    });
  } else if (bounds && typeof bounds === 'object') {
    // Merge explicit bounds with calculated domain
    finalDomain = {
      min: bounds.min ?? preferredDataDomain.min,
      max: bounds.max ?? preferredDataDomain.max,
    };
  } else {
    // Use the base domain as-is
    finalDomain = preferredDataDomain;
  }

  // Ensure we always return valid bounds with no undefined values
  return {
    min: finalDomain.min ?? 0,
    max: finalDomain.max ?? 0,
  };
};

/**
 * Calculates the visual range for an axis based on the chart rectangle and configuration.
 * Handles custom range configurations including functions and partial bounds.
 *
 * @param axisParam - The axis configuration
 * @param chartRect - The chart drawing area rectangle
 * @param axisType - Whether this is an 'x' or 'y' axis
 * @returns The calculated axis range bounds
 */
export const getAxisRange = (
  axisParam: AxisConfigProps,
  chartRect: Rect,
  axisType: 'x' | 'y',
): AxisBounds => {
  // Calculate base range based on axis type
  let baseRange: AxisBounds;
  if (axisType === 'x') {
    baseRange = { min: chartRect.x, max: chartRect.x + chartRect.width };
  } else {
    baseRange = { min: chartRect.y, max: chartRect.y + chartRect.height };
  }

  // Apply any custom range configuration
  const rangeConfig = axisParam.range;
  if (!rangeConfig) {
    return baseRange;
  }

  if (typeof rangeConfig === 'function') {
    // Apply the transform function to the base range
    return rangeConfig(baseRange);
  } else {
    // Merge explicit range values with calculated range
    return {
      min: rangeConfig.min ?? baseRange.min,
      max: rangeConfig.max ?? baseRange.max,
    };
  }
};

export type GetAxisTicksDataProps = {
  /**
   * Custom tick configuration for the axis.
   * - **Array**: Uses these exact values for tick positioning and labels.
   *   - For numeric scales: exact values to display
   *   - For band scales: category indices to display
   * - **Function**: Filters based on the predicate function.
   *   - For numeric scales: filters generated tick values
   *   - For band scales: filters category indices
   */
  ticks?: boolean | number[] | ((value: number) => boolean);
  /**
   * The scale function to use for positioning and tick generation.
   * Can be either a numeric scale or a band scale.
   */
  scaleFunction: ChartScaleFunction;
  /**
   * Requested number of ticks to display (only used for numeric scales).
   * For band/categorical scales, use the `ticks` parameter to control which categories are shown.
   */
  requestedTickCount?: number;
  /**
   * Categories for band scales
   */
  categories?: string[];
  /**
   * Possible tick values to filter from when using function-based ticks.
   * Used for discrete data (such as 'band' scale indices).
   */
  possibleTickValues?: number[];
  /**
   * Interval at which to show ticks in pixels.
   * When provided, calculates tick count based on available space and generates
   * evenly distributed ticks that always include first and last domain values.
   * Only applies to numeric scales and overrides requestedTickCount.
   *
   * @example
   * // For a chart with 400px width, tickInterval: 80 would generate ~5 ticks
   * // evenly distributed across the data range, always including first and last values
   * getAxisTicksData({
   *   scaleFunction: numericScale,
   *   tickInterval: 80,
   *   possibleTickValues: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
   * });
   * // Result: ticks at indices [0, 2, 5, 7, 10] with their corresponding positions
   */
  tickInterval?: number;
};

/**
 * Formats a tick value for display on an axis.
 * Consolidates the identical formatting logic shared between XAxis and YAxis.
 *
 * @param value - The raw tick value to format
 * @param tickFormatter - Optional custom formatter function
 * @returns The formatted tick value as a React node
 */
export const formatAxisTick = (
  value: any,
  tickFormatter?: (value: any) => React.ReactNode,
): React.ReactNode => {
  if (tickFormatter) {
    return tickFormatter(value);
  }
  return value;
};

/**
 * Generates evenly distributed tick values.
 * Uses space-between distribution: first and last positions are prioritized,
 * with remaining ticks evenly distributed between them.
 * Selects from actual data points (possibleTickValues) or generates whole integers from domain.
 *
 * @param scale - The numeric scale function
 * @param tickInterval - Space between ticks (in pixels)
 * @param possibleTickValues - Optional array of possible tick values to select from (e.g., data indices). If not provided, generates evenly spaced values from scale domain.
 * @param minTickCount - Minimum number of ticks to generate (default is 4)
 * @param maxTickCount - Maximum number of possible tick values to generate when creating from domain (default is 1000)
 * @returns Array of tick values selected from possibleTickValues or generated from domain
 */
const generateEvenlyDistributedTicks = (
  scale: NumericScale,
  tickInterval: number,
  possibleTickValues?: number[],
  minTickCount: number = 4,
  maxTickCount: number = 100,
): number[] => {
  // If no possibleTickValues provided, generate evenly spaced values from domain
  let tickValuesList: number[];
  if (!possibleTickValues || possibleTickValues.length === 0) {
    const [domainMin, domainMax] = scale.domain();
    const min = Math.ceil(domainMin);
    const max = Math.floor(domainMax);

    if (min > max) {
      return [];
    }

    if (min === max) {
      return [min];
    }

    const range = max - min;
    tickValuesList = [];

    // If the range is small enough, use every integer
    if (range <= maxTickCount) {
      for (let i = min; i <= max; i++) {
        tickValuesList.push(i);
      }
    } else {
      // Otherwise, generate evenly spaced values
      const step = range / (maxTickCount - 1);
      let currentValue = min;
      let count = 0;

      while (count < maxTickCount - 1 && currentValue < max) {
        tickValuesList.push(Math.round(currentValue));
        count++;
        currentValue = min + step * count;
      }

      tickValuesList.push(max);
    }

    if (tickValuesList.length === 0) {
      tickValuesList = [min, max];
    }
  } else {
    tickValuesList = possibleTickValues;
  }

  if (tickValuesList.length === 0) {
    return [];
  }

  const [rangeMin, rangeMax] = scale.range();
  const range = Math.abs(rangeMax - rangeMin);

  const tickCountFromSpace = Math.floor(range / tickInterval);
  const tickCount = Math.max(tickCountFromSpace, minTickCount);

  if (tickCount < 1) {
    return [];
  }

  // Limit tick count to available values
  const finalTickCount = Math.min(tickCount, tickValuesList.length);

  const tickValues: number[] = [];
  const step = (tickValuesList.length - 1) / (finalTickCount - 1);
  for (let i = 0; i < finalTickCount; i++) {
    const index = i === finalTickCount - 1 ? tickValuesList.length - 1 : Math.round(step * i);
    tickValues.push(tickValuesList[index]);
  }

  return tickValues;
};

/**
 * Processes tick configuration and returns tick data with positions.
 *
 * **Parameter Precedence by Scale Type:**
 *
 * **For Numeric Scales (linear/log):**
 * 1. `ticks` (array) - Explicit tick values override all other options
 * 2. `ticks` (function) - Filter function for tick selection
 * 3. `ticks` (boolean) - Show/hide all possible ticks
 * 4. `requestedTickCount` - D3 automatic tick generation (overrides tickInterval)
 * 5. `tickInterval` - Pixel-based spacing (fallback)
 *
 * **For Categorical Scales (band):**
 * 1. `ticks` (array) - Explicit category indices to display
 * 2. `ticks` (function) - Filter function for category selection
 * 3. `ticks` (boolean) - Show/hide all categories
 * 4. Default - Show all categories (requestedTickCount and tickInterval are ignored)
 *
 * @param params - Tick processing parameters
 * @param params.ticks - Custom tick configuration with multiple formats:
 *   - **Array**: For numeric scales: exact tick values; For band scales: category indices
 *   - **Function**: Predicate to filter tick values or category indices
 *   - **Boolean**: Show all (true) or no ticks (false) for both scale types
 * @param params.scaleFunction - D3 scale function (numeric or band scale)
 * @param params.requestedTickCount - Number of ticks for D3 generation (**numeric scales only**, overrides tickInterval)
 * @param params.categories - Category labels (**band scales only**)
 * @param params.possibleTickValues - Available tick values for filtering/selection (**numeric scales only**)
 * @param params.tickInterval - Pixel spacing between ticks (**numeric scales only**, fallback option)
 * @returns Array of tick data with values and positions
 *
 * @example
 * // Basic usage with tickInterval for pixel-based spacing
 * import { scaleLinear } from 'd3-scale';
 *
 * const numericScale = scaleLinear().domain([0, 10]).range([0, 400]);
 * const result = getAxisTicksData({
 *   scaleFunction: numericScale,
 *   tickInterval: 80, // 80 pixels between ticks
 *   possibleTickValues: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
 * });
 * // Returns: [
 * //   { tick: 0, position: 0 },    // Always includes first
 * //   { tick: 2, position: 80 },
 * //   { tick: 5, position: 200 },
 * //   { tick: 7, position: 280 },
 * //   { tick: 10, position: 400 }  // Always includes last
 * // ]
 *
 * @example
 * // Using requestedTickCount for D3-generated ticks
 * const result = getAxisTicksData({
 *   scaleFunction: numericScale,
 *   requestedTickCount: 5
 * });
 * // Uses D3's tick generation algorithm
 *
 * @example
 * // Using explicit tick values
 * const result = getAxisTicksData({
 *   scaleFunction: numericScale,
 *   ticks: [0, 2.5, 5, 7.5, 10]
 * });
 * // Returns exact positions for specified values
 *
 * @example
 * // Using tick filter function
 * const result = getAxisTicksData({
 *   scaleFunction: numericScale,
 *   ticks: (value) => value % 2 === 0, // Only even numbers
 *   possibleTickValues: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
 * });
 * // Returns: [0, 2, 4, 6, 8, 10] with their positions
 *
 * @example
 * // Band scale with categories (requestedTickCount and tickInterval are ignored)
 * import { scaleBand } from 'd3-scale';
 *
 * const bandScale = scaleBand().domain([0, 1, 2, 3, 4]).range([0, 400]).padding(0.1);
 * const result = getAxisTicksData({
 *   scaleFunction: bandScale,
 *   categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May'],
 *   ticks: [0, 2, 4], // Show only Jan (index 0), Mar (index 2), May (index 4)
 *   requestedTickCount: 10, // IGNORED for band scales
 *   tickInterval: 50 // IGNORED for band scales
 * });
 * // Returns tick positions centered in each selected band
 */
export const getAxisTicksData = ({
  ticks,
  scaleFunction,
  requestedTickCount,
  categories = [],
  possibleTickValues,
  tickInterval,
}: GetAxisTicksDataProps): Array<{ tick: number; position: number }> => {
  // Handle band scales
  if (isCategoricalScale(scaleFunction)) {
    // If explicit ticks are provided as array, use them
    if (Array.isArray(ticks)) {
      return ticks
        .filter((index) => index >= 0 && index < categories.length)
        .map((index) => {
          // Band scales expect numeric indices, not category strings
          const position = scaleFunction(index);
          if (position === undefined) return null;

          return {
            tick: index,
            position: position + ((scaleFunction as any).bandwidth?.() ?? 0) / 2,
          };
        })
        .filter(Boolean) as Array<{ tick: number; position: number }>;
    }

    // If a tick function is provided, use it to filter
    if (typeof ticks === 'function') {
      return categories
        .map((category, index) => {
          if (!ticks(index)) return null;

          // Band scales expect numeric indices, not category strings
          const position = scaleFunction(index);
          if (position === undefined) return null;

          return {
            tick: index,
            position: position + ((scaleFunction as any).bandwidth?.() ?? 0) / 2,
          };
        })
        .filter(Boolean) as Array<{ tick: number; position: number }>;
    }

    if (typeof ticks === 'boolean' && !ticks) {
      return [];
    }

    // For band scales without explicit ticks, show all categories
    // requestedTickCount is ignored for categorical scales - use ticks parameter to control visibility
    return categories
      .map((category, index) => {
        // Band scales expect numeric indices, not category strings
        const position = scaleFunction(index);
        if (position === undefined) return null;

        return {
          tick: index,
          position: position + ((scaleFunction as any).bandwidth?.() ?? 0) / 2,
        };
      })
      .filter(Boolean) as Array<{ tick: number; position: number }>;
  }

  // Handle numeric scales
  if (!isNumericScale(scaleFunction)) {
    console.warn('Scale does not support automatic tick generation');
    return [];
  }

  const numericScale = scaleFunction as NumericScale;

  let tickValues: number[] = [];

  if (Array.isArray(ticks)) {
    // Use exact tick values provided
    tickValues = ticks;
  } else if (typeof ticks === 'function') {
    // Filter the possible tick values using the predicate function
    if (possibleTickValues) {
      tickValues = possibleTickValues.filter(ticks);
    } else {
      // Fallback to scale-generated ticks if no possible tick values provided
      const generatedTicks = numericScale.ticks(requestedTickCount);
      tickValues = generatedTicks.filter(ticks);
    }
  } else if (typeof ticks === 'boolean') {
    tickValues = ticks && possibleTickValues ? possibleTickValues : [];
  } else if (requestedTickCount !== undefined) {
    // Use scale-generated ticks
    tickValues = numericScale.ticks(requestedTickCount);
  } else if (tickInterval !== undefined) {
    tickValues = generateEvenlyDistributedTicks(numericScale, tickInterval, possibleTickValues);
  }

  // Map values to positions using the scale function
  return tickValues.map((tick) => ({
    tick,
    position: numericScale(tick),
  }));
};

export type RegisteredAxis = {
  id: string;
  type: 'x' | 'y';
  position: 'start' | 'end';
  size: number;
};

/**
 * Calculates the total amount of padding needed to render a set of axes on the main drawing area of the chart.
 * Returns the registed axes, an API for adding/removing axes as well as the total calculated padding that must be reserved in the drawing area.
 */
export const useTotalAxisPadding = () => {
  const [renderedAxes, setRenderedAxes] = useState<Map<string, RegisteredAxis>>(new Map());

  const registerAxis = useCallback(
    (id: string, type: 'x' | 'y', position: 'start' | 'end', size: number) => {
      setRenderedAxes((prev) => {
        const newMap = new Map(prev);
        newMap.set(id, {
          id,
          type,
          position,
          size,
        });
        return newMap;
      });
    },
    [],
  );

  const unregisterAxis = useCallback((id: string) => {
    setRenderedAxes((prev) => {
      const newMap = new Map(prev);
      newMap.delete(id);
      return newMap;
    });
  }, []);

  const axisPadding = useMemo(() => {
    const padding = { top: 0, right: 0, bottom: 0, left: 0 };

    renderedAxes.forEach((axis) => {
      if (axis.type === 'x') {
        if (axis.position === 'start') {
          padding.top += axis.size;
        } else if (axis.position === 'end') {
          padding.bottom += axis.size;
        }
      } else if (axis.type === 'y') {
        if (axis.position === 'start') {
          padding.left += axis.size;
        } else if (axis.position === 'end') {
          padding.right += axis.size;
        }
      }
    });

    return padding;
  }, [renderedAxes]);

  return {
    renderedAxes,
    axisPadding,
    registerAxis,
    unregisterAxis,
  };
};
