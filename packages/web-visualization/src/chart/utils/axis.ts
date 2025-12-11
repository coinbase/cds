import { useCallback, useMemo, useState } from 'react';
import type React from 'react';
import type { Rect } from '@coinbase/cds-common/types';

import {
  type AxisBounds,
  type CartesianSeries,
  getCartesianDomain,
  getCartesianRange,
  getPolarAngularDomain,
  getPolarRadialRange,
  isValidBounds,
  type PolarSeries,
} from './chart';
import {
  type ChartAxisScaleType,
  type ChartScaleFunction,
  getCategoricalScale,
  getNumericScale,
  isCategoricalScale,
  isNumericScale,
  type NumericScale,
} from './scale';

export const defaultAxisId = 'DEFAULT_AXIS_ID';
export const defaultAxisScaleType = 'linear';

/**
 * Axis configuration with computed bounds
 */
export type AxisConfig = {
  /**
   * Domain bounds for the axis (data space)
   */
  domain: AxisBounds;
  /**
   * Range bounds for the axis (visual space in pixels)
   */
  range: AxisBounds;
};

export type CartesianAxisConfig = AxisConfig & {
  /** The type of scale to use */
  scaleType: ChartAxisScaleType;
  /**
   * Domain limit type for numeric scales
   * - 'nice' (default for y axes): Rounds the domain to human-friendly values (e.g., 0-100 instead of 1.2-97.8)
   * - 'strict' (default for x axes): Uses the exact min/max values from the data
   */
  domainLimit: 'nice' | 'strict';
  /**
   * Padding between categories for band scales (0-1, where 0.1 = 10% spacing)
   * Only used when scaleType is 'band'
   * @default 0.1
   */
  categoryPadding?: number;
  /**
   * Data for the axis
   */
  data?: string[] | number[];
};

export type RadialAxisConfig = AxisConfig & {
  /** The type of scale to use */
  scaleType: Exclude<ChartAxisScaleType, 'band'>;
};

export type AngularAxisConfig = AxisConfig & {
  /** The type of scale to use */
  scaleType: Exclude<ChartAxisScaleType, 'band'>;
  /**
   * Padding angle between slices in degrees.
   * @default 0
   */
  paddingAngle?: number;
};

/**
 * Base axis configuration props (used for input, without computed bounds)
 */
type AxisConfigProps = {
  /**
   * Unique identifier for this axis.
   */
  id: string;
  /**
   * Domain configuration for the axis (data space).
   * Can be a partial bounds object to override specific min/max values,
   * or a function that receives calculated bounds and allows customization.
   */
  domain?: Partial<AxisBounds> | ((bounds: AxisBounds) => AxisBounds);
  /**
   * Range configuration for the axis (visual space in pixels).
   * Can be a partial bounds object to override specific values,
   * or a function that transforms the calculated range.
   */
  range?: Partial<AxisBounds> | ((bounds: AxisBounds) => AxisBounds);
};

/**
 * Cartesian axis configuration props (for x/y axes).
 * Inherits required scaleType and domainLimit from CartesianAxisConfig,
 * with optional domain/range overrides for user input.
 */
export type CartesianAxisConfigProps = Omit<CartesianAxisConfig, 'domain' | 'range'> &
  AxisConfigProps;

/**
 * Base polar axis configuration props (shared by angular and radial axes)
 */
type PolarAxisConfigProps = AxisConfigProps & {
  /**
   * The type of scale to use.
   * @default 'linear'
   */
  scaleType?: Exclude<ChartAxisScaleType, 'band'>;
};

/**
 * Angular axis configuration props (for polar charts)
 */
export type AngularAxisConfigProps = PolarAxisConfigProps & {
  /**
   * Padding angle between slices in degrees.
   * @default 0
   */
  paddingAngle?: number;
};

/**
 * Radial axis configuration props (for polar charts)
 */
export type RadialAxisConfigProps = PolarAxisConfigProps;

/**
 * Gets a D3 scale for a polar axis.
 *
 * @param params - Scale parameters
 * @returns The D3 scale function
 */
export const getPolarAxisScale = ({
  config,
  range,
  dataDomain,
}: {
  config?: AngularAxisConfig | RadialAxisConfig;
  range: AxisBounds;
  dataDomain: AxisBounds;
}): ChartScaleFunction => {
  const scaleType = config?.scaleType ?? 'linear';

  let adjustedDomain = dataDomain;

  if (config?.domain) {
    adjustedDomain = {
      min: config.domain.min ?? dataDomain.min,
      max: config.domain.max ?? dataDomain.max,
    };
  }

  if (!isValidBounds(adjustedDomain)) {
    throw new Error('Invalid polar axis domain bounds.');
  }

  // Polar charts only use linear/log scales (no band scales)
  return getNumericScale({
    domain: adjustedDomain,
    range,
    scaleType: scaleType as 'linear' | 'log',
  });
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
export const getCartesianAxisScale = ({
  config,
  type,
  range,
  dataDomain,
}: {
  config?: CartesianAxisConfig;
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

  if (!isValidBounds(adjustedDomain))
    throw new Error(
      'Invalid domain bounds. See https://cds.coinbase.com/http://localhost:3000/components/graphs/XAxis/#domain',
    );

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
export const getCartesianAxisConfig = (
  type: 'x' | 'y',
  axes: Partial<CartesianAxisConfigProps> | Partial<CartesianAxisConfigProps>[] | undefined,
  defaultId: string = defaultAxisId,
  defaultScaleType: ChartAxisScaleType = defaultAxisScaleType,
): CartesianAxisConfigProps[] => {
  const defaultDomainLimit = type === 'x' ? 'strict' : 'nice';
  if (!axes) {
    return [{ id: defaultId, scaleType: defaultScaleType, domainLimit: defaultDomainLimit }];
  }

  if (Array.isArray(axes)) {
    const axesLength = axes.length;
    // forces id to be defined on every input config when there are multiple axes
    if (axesLength > 1 && axes.some(({ id }) => id === undefined)) {
      throw new Error(
        'When defining multiple axes, each must have a unique id. See https://cds.coinbase.com/components/graphs/YAxis/#multiple-y-axes.',
      );
    }

    return axes.map(({ id, ...axis }) => ({
      // defaults the axis id if only a single axis is provided
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
export const getCartesianAxisDomain = (
  axisParam: CartesianAxisConfigProps,
  series: CartesianSeries[],
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
  const seriesDomain = axisType === 'x' ? getCartesianDomain(series) : getCartesianRange(series);

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

/**
 * Formats the array of user-provided angular axis configs with default values.
 * @param axes - array of axis configs or single axis config
 * @param defaultId - the default id to use for the axis
 * @returns array of angular axis configs with IDs
 */
export const getAngularAxisConfig = (
  axes: Partial<AngularAxisConfigProps> | Partial<AngularAxisConfigProps>[] | undefined,
  defaultId: string = defaultAxisId,
): AngularAxisConfigProps[] => {
  if (!axes) {
    return [{ id: defaultId, scaleType: 'linear' }];
  }

  if (Array.isArray(axes)) {
    const axesLength = axes.length;
    if (axesLength > 1 && axes.some(({ id }) => id === undefined)) {
      throw new Error('When defining multiple angular axes, each must have a unique id.');
    }

    return axes.map(({ id, ...axis }) => ({
      id: axesLength > 1 ? (id ?? defaultAxisId) : (id as string),
      scaleType: 'linear' as const,
      ...axis,
    }));
  }

  return [{ id: defaultId, scaleType: 'linear', ...axes }];
};

/**
 * Formats the array of user-provided radial axis configs with default values.
 * @param axes - array of axis configs or single axis config
 * @param defaultId - the default id to use for the axis
 * @returns array of radial axis configs with IDs
 */
export const getRadialAxisConfig = (
  axes: Partial<RadialAxisConfigProps> | Partial<RadialAxisConfigProps>[] | undefined,
  defaultId: string = defaultAxisId,
): RadialAxisConfigProps[] => {
  if (!axes) {
    return [{ id: defaultId, scaleType: 'linear' }];
  }

  if (Array.isArray(axes)) {
    const axesLength = axes.length;
    if (axesLength > 1 && axes.some(({ id }) => id === undefined)) {
      throw new Error('When defining multiple radial axes, each must have a unique id.');
    }

    return axes.map(({ id, ...axis }) => ({
      id: axesLength > 1 ? (id ?? defaultAxisId) : (id as string),
      scaleType: 'linear' as const,
      ...axis,
    }));
  }

  return [{ id: defaultId, scaleType: 'linear', ...axes }];
};

/**
 * Calculates the data domain for a polar axis based on its configuration and series data.
 *
 * @param axisParam - The axis configuration
 * @param series - Array of polar series objects
 * @param axisType - Whether this is an 'angular' or 'radial' axis
 * @returns The calculated axis bounds
 */
export const getPolarAxisDomain = (
  axisParam: PolarAxisConfigProps,
  series: PolarSeries[],
  axisType: 'angular' | 'radial',
): AxisBounds => {
  // Calculate domain from series data
  const seriesDomain =
    axisType === 'angular' ? getPolarAngularDomain(series) : getPolarRadialRange(series);

  const bounds = axisParam.domain;
  let finalDomain: Partial<AxisBounds>;

  if (typeof bounds === 'function') {
    finalDomain = bounds({
      min: seriesDomain.min ?? 0,
      max: seriesDomain.max ?? 0,
    });
  } else if (bounds && typeof bounds === 'object') {
    finalDomain = {
      min: bounds.min ?? seriesDomain.min,
      max: bounds.max ?? seriesDomain.max,
    };
  } else {
    finalDomain = seriesDomain;
  }

  return {
    min: finalDomain.min ?? 0,
    max: finalDomain.max ?? 0,
  };
};

/**
 * Calculates the visual range for a polar axis.
 *
 * For angular axes, returns degrees (conversion to radians happens at path generation).
 * For radial axes, returns pixels.
 *
 * @param axisParam - The axis configuration
 * @param axisType - Whether this is an 'angular' or 'radial' axis
 * @param outerRadius - The outer radius in pixels (used for radial axis)
 * @returns The calculated axis range bounds (degrees for angular, pixels for radial)
 */
export const getPolarAxisRange = (
  axisParam: AngularAxisConfigProps | RadialAxisConfigProps,
  axisType: 'angular' | 'radial',
  outerRadius: number,
): AxisBounds => {
  // Default ranges:
  // Angular: full circle starting at 3 o'clock (0° to 360° in degrees)
  // Radial: 0 to outerRadius (pixels)
  const baseRange: AxisBounds =
    axisType === 'angular' ? { min: 0, max: 360 } : { min: 0, max: outerRadius };

  const rangeConfig = axisParam.range;

  if (!rangeConfig) {
    return baseRange;
  }

  if (typeof rangeConfig === 'function') {
    return rangeConfig(baseRange);
  }

  return {
    min: rangeConfig.min ?? baseRange.min,
    max: rangeConfig.max ?? baseRange.max,
  };
};

/**
 * Options for tick generation behavior
 */
type TickGenerationOptions = {
  /**
   * Minimum step size allowed for ticks.
   * Prevents the step from being smaller than this value.
   * @example 1 // Prevents fractional steps like 0.5
   */
  minStep?: number;
  /**
   * Maximum step size allowed for ticks.
   * Prevents the step from being larger than this value.
   * @example 100 // Prevents steps larger than 100
   */
  maxStep?: number;
  /**
   * Minimum number of ticks to generate when using tickInterval.
   * @default 4
   */
  minTickCount?: number;
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
  ticks?: number[] | ((value: number) => boolean);
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
   * // For a chart with 400px width, tickInterval: 64 would generate ~6 ticks
   * // evenly distributed across the data range, always including first and last values
   * getAxisTicksData({
   *   scaleFunction: numericScale,
   *   tickInterval: 32,
   *   possibleTickValues: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
   * });
   * // Result: ticks at indices [0, 2, 4, 6, 8, 10] with their corresponding positions
   */
  tickInterval?: number;
  /**
   * Options for tick generation behavior
   */
  options?: TickGenerationOptions;
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
 * Calculates a rounded step size for tick generation.
 * Chooses from multiples of 1, 2, or 5 (scaled by powers of 10).
 *
 * @param roughStep - The approximate step size needed
 * @param minStep - Optional minimum step size constraint
 * @param maxStep - Optional maximum step size constraint
 * @returns rounded step size within the specified constraints
 */
const calculateNiceStep = (roughStep: number, minStep?: number, maxStep?: number): number => {
  if (roughStep <= 0) return minStep ?? 1;

  const magnitude = Math.pow(10, Math.floor(Math.log10(roughStep)));
  const residual = roughStep / magnitude;

  let roundResidual: number;
  if (residual <= 1) {
    roundResidual = 1;
  } else if (residual <= 2) {
    roundResidual = 2;
  } else if (residual <= 5) {
    roundResidual = 5;
  } else {
    roundResidual = 10;
  }

  let niceStep = roundResidual * magnitude;

  if (minStep !== undefined && niceStep < minStep) {
    niceStep = minStep;
  }

  if (maxStep !== undefined && niceStep > maxStep) {
    niceStep = maxStep;
  }

  return niceStep;
};

/**
 * Generates evenly distributed tick values.
 * Always includes first and last domain values, with intermediate ticks evenly distributed using nice step sizes.
 * Selects from actual data points (possibleTickValues) or generates nice round numbers.
 *
 * @param scale - The numeric scale function
 * @param tickInterval - Space between ticks (in pixels)
 * @param possibleTickValues - Optional array of possible tick values to select from (e.g., data indices). If not provided, generates nice round numbers with guaranteed first/last inclusion.
 * @param options - Options for tick generation behavior
 * @returns Array of tick values, always including first and last domain values
 */
const generateEvenlyDistributedTicks = (
  scale: NumericScale,
  tickInterval: number,
  possibleTickValues?: number[],
  options?: TickGenerationOptions,
): number[] => {
  const minTickCount = options?.minTickCount ?? 4;
  const [rangeMin, rangeMax] = scale.range();
  const range = Math.abs(rangeMax - rangeMin);

  const tickCountFromSpace = Math.floor(range / tickInterval);
  const tickCount = Math.max(tickCountFromSpace, minTickCount);

  if (tickCount < 1) {
    return [];
  }

  // If we have possibleTickValues, select evenly from them
  if (possibleTickValues && possibleTickValues.length > 0) {
    // Limit tick count to available values
    const finalTickCount = Math.min(tickCount, possibleTickValues.length);

    const tickValues: number[] = [];
    const step = (possibleTickValues.length - 1) / (finalTickCount - 1);
    for (let i = 0; i < finalTickCount; i++) {
      const index = i === finalTickCount - 1 ? possibleTickValues.length - 1 : Math.round(step * i);
      tickValues.push(possibleTickValues[index]);
    }

    return tickValues;
  }

  // Generate nice round numbers that always include first and last domain values
  const [domainMin, domainMax] = scale.domain();

  if (tickCount === 1) {
    return [domainMin];
  }

  if (tickCount === 2) {
    return [domainMin, domainMax];
  }

  // Calculate a nice step size
  const domainRange = domainMax - domainMin;
  const roughStep = domainRange / (tickCount - 1);
  const niceStep = calculateNiceStep(roughStep, options?.minStep, options?.maxStep);

  // Generate ticks starting from domainMin and stepping by niceStep
  const tickValues: number[] = [domainMin];

  // Generate intermediate ticks using the nice step, starting from domainMin
  let currentTick = domainMin + niceStep;
  while (currentTick < domainMax) {
    // Avoid floating point precision issues
    const roundedTick = Number(currentTick.toFixed(10));
    tickValues.push(roundedTick);
    currentTick += niceStep;
  }

  // Only include domainMax if it naturally falls on a step (or very close due to floating point)
  // or if the last tick is far enough away that including max provides useful context
  const lastTick = tickValues[tickValues.length - 1];
  const distanceToMax = domainMax - lastTick;

  // Include max if:
  // 1. It naturally falls on a step (within floating point tolerance)
  // 2. Or the last tick is more than half a step away (provides meaningful context)
  const tolerance = niceStep * 0.0001; // Floating point tolerance
  const shouldIncludeMax =
    Math.abs(distanceToMax - niceStep) < tolerance || // Natural step
    distanceToMax > niceStep * 0.5; // Far enough to provide context

  if (shouldIncludeMax && domainMax !== lastTick) {
    tickValues.push(domainMax);
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
  options,
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
  } else if (requestedTickCount !== undefined) {
    // Use scale-generated ticks
    tickValues = numericScale.ticks(requestedTickCount);
  } else if (tickInterval !== undefined) {
    tickValues = generateEvenlyDistributedTicks(
      numericScale,
      tickInterval,
      possibleTickValues,
      options,
    );
  }

  // Map values to positions using the scale function
  return tickValues.map((tick) => ({
    tick,
    position: numericScale(tick),
  }));
};

export type RegisteredAxis = {
  id: string;
  position: 'top' | 'bottom' | 'left' | 'right';
  size: number;
};

/**
 * Calculates the total amount of padding needed to render a set of axes on the main drawing area of the chart.
 * Returns the registered axes, an API for adding/removing axes as well as the total calculated padding that must be reserved in the drawing area.
 */
export const useTotalAxisPadding = () => {
  const [renderedAxes, setRenderedAxes] = useState<Map<string, RegisteredAxis>>(new Map());

  const registerAxis = useCallback(
    (id: string, position: 'top' | 'bottom' | 'left' | 'right', size: number) => {
      setRenderedAxes((prev) => {
        const newMap = new Map(prev);
        newMap.set(id, {
          id,
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
      padding[axis.position] += axis.size;
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
