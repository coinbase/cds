import {
  area as d3Area,
  curveBumpX,
  curveCatmullRom,
  curveLinear,
  curveLinearClosed,
  curveMonotoneX,
  curveNatural,
  curveStep,
  curveStepAfter,
  curveStepBefore,
  line as d3Line,
} from 'd3-shape';

import { projectPoint, projectPoints } from './point';
import { type ChartScaleFunction, isCategoricalScale } from './scale';

export type ChartPathCurveType =
  | 'bump'
  | 'catmullRom'
  | 'linear'
  | 'linearClosed'
  | 'monotone'
  | 'natural'
  | 'step'
  | 'stepBefore'
  | 'stepAfter';

/**
 * Get the d3 curve function for a path.
 * See https://d3js.org/d3-shape/curve
 * @param curve - The curve type. Defaults to 'linear'.
 * @returns The d3 curve function.
 */
export const getPathCurveFunction = (curve: ChartPathCurveType = 'linear') => {
  switch (curve) {
    case 'catmullRom':
      return curveCatmullRom;
    case 'monotone': // When we support layout="vertical" this should dynamically switch to curveMonotoneY
      return curveMonotoneX;
    case 'natural':
      return curveNatural;
    case 'step':
      return curveStep;
    case 'stepBefore':
      return curveStepBefore;
    case 'stepAfter':
      return curveStepAfter;
    case 'bump': // When we support layout="vertical" this should dynamically switch to curveBumpY
      return curveBumpX;
    case 'linearClosed':
      return curveLinearClosed;
    case 'linear':
    default:
      return curveLinear;
  }
};

/**
 * Generates an SVG line path string from data using chart scale functions.
 *
 * @example
 * ```typescript
 * const chartScale = getChartScale({ chartRect, domain, range, xScale, yScale });
 * const path = getLinePath({ data: [1, 2, 3], chartScale, curve: 'bump' });
 * ```
 */
export const getLinePath = ({
  data,
  curve = 'bump',
  xScale,
  yScale,
  xData,
  connectNulls,
}: {
  data: (number | null | { x: number; y: number })[];
  curve?: ChartPathCurveType;
  xScale: ChartScaleFunction;
  yScale: ChartScaleFunction;
  xData?: number[];
  /**
   * When true, null values are skipped and the line connects across gaps.
   * By default, null values create gaps in the line.
   */
  connectNulls?: boolean;
}): string => {
  if (data.length === 0) {
    return '';
  }

  const curveFunction = getPathCurveFunction(curve);

  const dataPoints = projectPoints({ data, xScale, yScale, xData });

  // When connectNulls is true, filter out null values before rendering
  // When false, use defined() to create gaps in the line
  const filteredPoints = connectNulls ? dataPoints.filter((d) => d !== null) : dataPoints;

  const pathGenerator = d3Line<{ x: number; y: number } | null>()
    .x((d) => d!.x)
    .y((d) => d!.y)
    .curve(curveFunction)
    .defined((d) => connectNulls || d !== null);

  return pathGenerator(filteredPoints) ?? '';
};

/**
 * Generates an SVG area path string from data using chart scale functions.
 * Supports both single values (area from baseline to value) and tuples ([baseline, value]).
 *
 * @example
 * ```typescript
 * // Single values - area from baseline to value
 * const area = getAreaPath({
 *   data: [1, 2, 3],
 *   xScale,
 *   yScale,
 * });
 *
 * // Range values - area from low to high
 * const rangeArea = getAreaPath({
 *   data: [[0, 3], [2, 4], [1, 5]],
 *   xScale,
 *   yScale,
 *   curve: 'monotone'
 * });
 * ```
 */
export const getAreaPath = ({
  data,
  curve = 'bump',
  xScale,
  yScale,
  xData,
  connectNulls,
}: {
  data: (number | null)[] | Array<[number, number] | null>;
  xScale: ChartScaleFunction;
  yScale: ChartScaleFunction;
  curve: ChartPathCurveType;
  xData?: number[];
  /**
   * When true, null values are skipped and the area connects across gaps.
   * By default null values create gaps in the area.
   */
  connectNulls?: boolean;
}): string => {
  if (data.length === 0) {
    return '';
  }

  const curveFunction = getPathCurveFunction(curve);

  const yDomain = yScale.domain();
  const yMin = Math.min(...yDomain);

  const normalizedData: Array<[number, number] | null> = data.map((item, index) => {
    if (item === null) {
      return null;
    }

    if (Array.isArray(item)) {
      if (item.length >= 2 && typeof item[0] === 'number' && typeof item[1] === 'number') {
        return [item[0], item[1]];
      }
      return null;
    }

    if (typeof item === 'number') {
      return [yMin, item];
    }

    return null;
  });

  const dataPoints = normalizedData.map((range, index) => {
    if (range === null) {
      return {
        x: 0,
        low: null,
        high: null,
        isValid: false,
      };
    }

    let xValue: number = index;
    if (!isCategoricalScale(xScale) && xData && xData[index] !== undefined) {
      xValue = xData[index];
    }

    const xPoint = projectPoint({ x: xValue, y: 0, xScale, yScale });
    const lowPoint = projectPoint({
      x: xValue,
      y: range[0],
      xScale,
      yScale,
    });
    const highPoint = projectPoint({
      x: xValue,
      y: range[1],
      xScale,
      yScale,
    });

    return {
      x: xPoint.x,
      low: lowPoint.y,
      high: highPoint.y,
      isValid: true,
    };
  });

  // When connectNulls is true, filter out invalid points before rendering
  // When false, use defined() to create gaps in the area
  const filteredPoints = connectNulls ? dataPoints.filter((d) => d.isValid) : dataPoints;

  const areaGenerator = d3Area<{
    x: number;
    low: number | null;
    high: number | null;
    isValid: boolean;
  }>()
    .x((d) => d.x)
    .y0((d) => d.low ?? 0) // Bottom boundary (low values), fallback to 0
    .y1((d) => d.high ?? 0) // Top boundary (high values), fallback to 0
    .curve(curveFunction)
    .defined((d) => connectNulls || (d.isValid && d.low != null && d.high != null)); // Only draw where both values exist

  const result = areaGenerator(filteredPoints);
  return result ?? '';
};

/**
 * Converts line coordinates to an SVG path string.
 * Useful for rendering axis lines and tick marks.
 *
 * @example
 * ```typescript
 * const path = lineToPath(0, 0, 100, 100);
 * // Returns: "M 0 0 L 100 100"
 * ```
 */
export const lineToPath = (x1: number, y1: number, x2: number, y2: number): string => {
  return `M${x1},${y1} L${x2},${y2}`;
};

/**
 * Creates an SVG path string for a rectangle with selective corner rounding.
 * Useful for creating bars in charts with optional rounded corners.
 *
 * @example
 * ```typescript
 * // Simple rectangle bar
 * const barPath = getBarPath(10, 20, 50, 100, 0, false, false);
 *
 * // Bar with rounded top corners
 * const roundedPath = getBarPath(10, 20, 50, 100, 8, true, false);
 * ```
 */
export const getBarPath = (
  x: number,
  y: number,
  width: number,
  height: number,
  radius: number,
  roundTop: boolean,
  roundBottom: boolean,
): string => {
  const roundBothSides = roundTop && roundBottom;
  const r = Math.min(radius, width / 2, roundBothSides ? height / 2 : height);
  const topR = roundTop ? r : 0;
  const bottomR = roundBottom ? r : 0;

  // Build path with selective rounding
  let path = `M ${x + (roundTop ? r : 0)} ${y}`;
  path += ` L ${x + width - topR} ${y}`;

  path += ` A ${topR} ${topR} 0 0 1 ${x + width} ${y + topR}`;

  path += ` L ${x + width} ${y + height - bottomR}`;

  path += ` A ${bottomR} ${bottomR} 0 0 1 ${x + width - bottomR} ${y + height}`;

  path += ` L ${x + bottomR} ${y + height}`;

  path += ` A ${bottomR} ${bottomR} 0 0 1 ${x} ${y + height - bottomR}`;

  path += ` L ${x} ${y + topR}`;

  path += ` A ${topR} ${topR} 0 0 1 ${x + topR} ${y}`;

  path += ' Z';
  return path;
};
