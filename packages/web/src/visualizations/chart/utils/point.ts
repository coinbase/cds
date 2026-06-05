import type { TextHorizontalAlignment, TextVerticalAlignment } from '../text';

import type { CartesianChartLayout } from './context';
import {
  type CategoricalScale,
  type ChartScaleFunction,
  isCategoricalScale,
  isLogScale,
  type PointAnchor,
} from './scale';

/**
 * Position a label should be placed relative to the point
 *
 * @example
 * 'top' would have the label be located above the point itself,
 * and thus the vertical alignment of that text would be bottom.
 */
export type PointLabelPosition = 'top' | 'bottom' | 'left' | 'right' | 'center';

/**
 * Get a point from a data value and a scale.
 *
 * @param dataValue - The data value to convert to a pixel position.
 * @param scale - The scale function.
 * @param anchor (@default 'middle') - For band scales, where to anchor the point within the band.
 * @returns The pixel value (@default 0 if data value is not defined in scale).
 */
export const getPointOnScale = (
  dataValue: number,
  scale: ChartScaleFunction,
  anchor: PointAnchor = 'middle',
): number => {
  if (isCategoricalScale(scale)) {
    const bandScale = scale as CategoricalScale;
    const bandStart = bandScale(dataValue);
    if (bandStart === undefined) return 0;

    const bandwidth = bandScale.bandwidth?.() ?? 0;
    const step = bandScale.step?.() ?? bandwidth;
    const paddingOffset = (step - bandwidth) / 2;
    const stepStart = bandStart - paddingOffset;

    switch (anchor) {
      case 'stepStart':
        return stepStart;
      case 'bandStart':
        return bandStart;
      case 'middle':
        return bandStart + bandwidth / 2;
      case 'bandEnd':
        return bandStart + bandwidth;
      case 'stepEnd':
        return stepStart + step;
    }
  }

  // For log scales, ensure the value is positive
  let adjustedValue = dataValue;
  if (isLogScale(scale) && dataValue <= 0) {
    adjustedValue = 0.001; // Use a small positive value for log scales
  }

  return scale(adjustedValue) ?? 0;
};

/**
 * Projects a data point to pixel coordinates using the chart scale.
 * Automatically handles log scale transformations for zero/negative values.
 *
 * @example
 * ```typescript
 * const chartScale = getChartScale({ chartRect, domain, range, xScale, yScale });
 * const pixelCoord = projectPoint({ x: 5, y: 10, chartScale });
 * ```
 * @example
 * ```typescript
 * const chartScale = getChartScale({ chartRect, domain, range, xScale, yScale });
 * const pixelCoord = projectPoint({ x: 2, y: 10, chartScale, xData: ['Jan', 'Feb', 'Mar'] });
 * ```
 */
export const projectPoint = ({
  x,
  y,
  xScale,
  yScale,
}: {
  x: number;
  y: number;
  xScale: ChartScaleFunction;
  yScale: ChartScaleFunction;
}): { x: number; y: number } => {
  return { x: getPointOnScale(x, xScale), y: getPointOnScale(y, yScale) };
};

/**
 * Projects multiple data points to pixel coordinates using chart scale functions.
 * Handles both numeric and band scales automatically.
 *
 * @example
 * ```typescript
 * const chartScale = getChartScale({ chartRect, domain, range, xScale, yScale });
 * const pixelPoints = projectPoints({ data, chartScale });
 * // For mixed scales
 * const pixelPoints = projectPoints({ data, chartScale, xData: ['Jan', 'Feb', 'Mar'] });
 * ```
 */
export const projectPoints = ({
  data,
  xScale,
  yScale,
  xData,
  yData,
  layout = 'vertical',
}: {
  data: (number | null | { x: number; y: number })[];
  xData?: number[];
  yData?: number[];
  xScale: ChartScaleFunction;
  yScale: ChartScaleFunction;
  /**
   * Chart layout.
   * @default 'vertical'
   */
  layout?: CartesianChartLayout;
}): Array<{ x: number; y: number } | null> => {
  if (data.length === 0) {
    return [];
  }

  return data.map((value, index) => {
    if (value === null) {
      return null;
    }

    if (typeof value === 'object' && 'x' in value && 'y' in value) {
      return projectPoint({
        x: value.x,
        y: value.y,
        xScale,
        yScale,
      });
    }

    // Determine values/scales based on role (index vs value) and layout.
    const categoryAxisIsX = layout !== 'horizontal';
    const indexScale = categoryAxisIsX ? xScale : yScale;
    const indexData = categoryAxisIsX ? xData : yData;

    // 1. Calculate position along the index axis (categorical or numeric domain).
    let indexValue: number = index;
    if (!isCategoricalScale(indexScale)) {
      if (indexData && Array.isArray(indexData) && indexData.length > 0) {
        if (typeof indexData[0] === 'number') {
          indexValue = (indexData as number[])[index] ?? index;
        }
      }
    }

    // 2. Calculate position along the value axis (measured magnitude).
    const valueAsNumber = value as number;

    // 3. Project final coordinates based on layout.
    if (categoryAxisIsX) {
      return projectPoint({ x: indexValue, y: valueAsNumber, xScale, yScale });
    }

    return projectPoint({ x: valueAsNumber, y: indexValue, xScale, yScale });
  });
};

/**
 * Determines text alignment based on label position.
 * For example, a 'top' position needs the text aligned to the 'bottom' so it appears above the point.
 */
export const getAlignmentFromPosition = (
  position: PointLabelPosition,
): { horizontalAlignment: TextHorizontalAlignment; verticalAlignment: TextVerticalAlignment } => {
  let horizontalAlignment: TextHorizontalAlignment = 'center';
  let verticalAlignment: TextVerticalAlignment = 'middle';

  switch (position) {
    case 'top':
      verticalAlignment = 'bottom';
      break;
    case 'bottom':
      verticalAlignment = 'top';
      break;
    case 'left':
      horizontalAlignment = 'right';
      break;
    case 'right':
      horizontalAlignment = 'left';
      break;
    case 'center':
    default:
      horizontalAlignment = 'center';
      verticalAlignment = 'middle';
      break;
  }

  return { horizontalAlignment, verticalAlignment };
};

/**
 * Calculates the final label coordinates by applying offset based on position.
 */
export const getLabelCoordinates = (
  x: number,
  y: number,
  position: PointLabelPosition,
  offset: number,
): { x: number; y: number } => {
  let dx = 0;
  let dy = 0;

  switch (position) {
    case 'top':
      dy = -offset;
      break;
    case 'bottom':
      dy = offset;
      break;
    case 'left':
      dx = -offset;
      break;
    case 'right':
      dx = offset;
      break;
    case 'center':
    default:
      break;
  }

  return {
    x: x + dx,
    y: y + dy,
  };
};
