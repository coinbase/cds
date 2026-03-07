import type { TextHorizontalAlignment, TextVerticalAlignment } from '../text';
import type { CartesianChartLayout } from './context';

import {
  type CategoricalScale,
  type ChartScaleFunction,
  isCategoricalScale,
  isLogScale,
  isNumericScale,
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
 * @note for categorical scales, the point will be centered within the banner.
 * @note for log scales, zero and negative values are clamped to a small positive value.
 * @param dataValue - the data value.
 * @param scale - the scale function.
 * @returns the pixel value (defaulting to 0 if data value is not defined in scale).
 */
export const getPointOnScale = (
  dataValue: number,
  scale: ChartScaleFunction,
  anchor: PointAnchor = 'middle',
): number => {
  if (isCategoricalScale(scale)) {
    const bandScale = scale;
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
      case 'bandEnd':
        return bandStart + bandwidth;
      case 'stepEnd':
        return stepStart + step;
      case 'middle':
      default:
        return bandStart + bandwidth / 2;
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

    // Determine values/scales based on role (index vs value) and layout
    const categoryAxisIsX = layout !== 'horizontal';

    const indexScale = categoryAxisIsX ? xScale : yScale;
    const indexData = categoryAxisIsX ? xData : yData;

    const valueScale = categoryAxisIsX ? yScale : xScale;
    const valueData = categoryAxisIsX ? yData : xData;

    // 1. Calculate the position along the index axis (categorical or numeric domain)
    let indexValue: number = index;

    // For band scales, we almost always use the index.
    // For numeric scales, we check if there is custom axis data provided.
    if (!isCategoricalScale(indexScale)) {
      if (indexData && Array.isArray(indexData) && indexData.length > 0) {
        if (typeof indexData[0] === 'number') {
          indexValue = (indexData as number[])[index] ?? index;
        }
      }
    }

    // 2. Calculate the position along the value axis (measured magnitude)
    let val: number = value as number;
    // (In case we ever need to project based on custom valueData, we can add logic here)

    // 3. Project to final coordinates based on layout
    if (categoryAxisIsX) {
      return projectPoint({
        x: indexValue,
        y: val,
        xScale,
        yScale,
      });
    }

    return projectPoint({
      x: val,
      y: indexValue,
      xScale,
      yScale,
    });
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
