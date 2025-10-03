import type { ScaleBand, ScaleLinear, ScaleLogarithmic } from 'd3-scale';
import { scaleBand, scaleLinear, scaleLog } from 'd3-scale';

import type { AxisBounds } from './chart';

// https://d3js.org/d3-scale - ideal next scale would be time
export type ChartAxisScaleType = 'linear' | 'log' | 'band';

export type NumericScale =
  | ScaleLinear<number, number, never>
  | ScaleLogarithmic<number, number, never>;

export type CategoricalScale = ScaleBand<number>;

export type ChartScaleFunction = NumericScale | CategoricalScale;

export const isCategoricalScale = (scale: ChartScaleFunction): scale is CategoricalScale => {
  return scale !== undefined && 'bandwidth' in scale && typeof scale.bandwidth === 'function';
};

export const isNumericScale = (scale: ChartScaleFunction): scale is NumericScale => {
  return scale !== undefined && !isCategoricalScale(scale);
};

/**
 * Type guard to check if a scale is logarithmic.
 */
export const isLogScale = (
  scale: ChartScaleFunction,
): scale is ScaleLogarithmic<number, number, never> => {
  return scale !== undefined && 'base' in scale && typeof (scale as any).base === 'function';
};

/**
 * Create a numeric scale (linear or logarithmic)
 * @returns A numeric scale function
 */
export const getNumericScale = ({
  scaleType,
  domain,
  range,
}: {
  scaleType: 'linear' | 'log';
  domain: AxisBounds;
  range: AxisBounds;
}): NumericScale => {
  const scale = scaleType === 'log' ? scaleLog() : scaleLinear();
  return scale.domain([domain.min, domain.max]).range([range.min, range.max]);
};

/**
 * Create a categorical scale (band)
 * @returns A categorical scale function
 */
export const getCategoricalScale = ({
  domain,
  range,
  padding = 0.1,
}: {
  domain: AxisBounds;
  range: AxisBounds;
  padding?: number;
}): CategoricalScale => {
  const domainArray = Array.from({ length: domain.max - domain.min + 1 }, (_, i) => i);
  const scale = scaleBand<number>()
    .domain(domainArray)
    .range([range.min, range.max])
    .padding(padding);
  return scale;
};
