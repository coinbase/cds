import { pie as d3Pie } from 'd3-shape';

import type { AngularAxisConfig, AxisConfig } from './axis';

/**
 * Converts degrees to radians.
 */
export const degreesToRadians = (degrees: number): number => {
  return (degrees * Math.PI) / 180;
};

/**
 * Converts radians to degrees.
 */
export const radiansToDegrees = (radians: number): number => {
  return (radians * 180) / Math.PI;
};

/**
 * Extracts angular axis values (in radians) from axis config.
 * Range values are expected in radians, paddingAngle in degrees (converted to radians).
 * @param axisConfig - The angular axis configuration
 */
export const getAngularAxisRadians = (
  axisConfig?: Partial<AngularAxisConfig>,
): { startAngle: number; endAngle: number; paddingAngle: number } => {
  const range = axisConfig?.range ?? { min: 0, max: 2 * Math.PI };
  const startAngle = range.min ?? 0;
  const endAngle = range.max ?? 2 * Math.PI;
  // Convert paddingAngle from degrees to radians
  const paddingAngle = degreesToRadians(axisConfig?.paddingAngle ?? 0);

  return { startAngle, endAngle, paddingAngle };
};

/**
 * Extracts radial axis values (in pixels) from axis config.
 * @param maxRadius - The maximum available radius
 * @param axisConfig - The radial axis configuration
 */
export const getRadialAxisPixels = (
  maxRadius: number,
  axisConfig?: Partial<AxisConfig>,
): { innerRadius: number; outerRadius: number } => {
  const range = axisConfig?.range ?? { min: 0, max: 1 };
  // Range values are typically 0-1 representing percentage of maxRadius
  const innerRadius = (range.min ?? 0) * maxRadius;
  const outerRadius = (range.max ?? 1) * maxRadius;

  return { innerRadius, outerRadius };
};

/**
 * Calculates arc geometry for pie/donut chart slices using D3's pie generator.
 *
 * All angle inputs are in degrees; outputs are in radians for rendering.
 *
 * @param values - Array of numeric values for each slice
 * @param innerRadius - Inner radius in pixels
 * @param outerRadius - Outer radius in pixels
 * @param startAngleDegrees - Start angle in degrees (default: 0, 3 o'clock)
 * @param endAngleDegrees - End angle in degrees (default: 360, full circle)
 * @param paddingAngleDegrees - Padding between slices in degrees (default: 0)
 * @returns Array of arc data objects with angles in radians for rendering
 */
export const calculateArcData = (
  values: number[],
  innerRadius: number,
  outerRadius: number,
  startAngleDegrees = 0,
  endAngleDegrees = 360,
  paddingAngleDegrees = 0,
): Array<{
  startAngle: number;
  endAngle: number;
  paddingAngle: number;
  innerRadius: number;
  outerRadius: number;
  index: number;
  value: number;
}> => {
  if (values.length === 0) {
    return [];
  }

  // Convert degrees to radians for D3
  const startAngleRadians = degreesToRadians(startAngleDegrees);
  const endAngleRadians = degreesToRadians(endAngleDegrees);
  const paddingAngleRadians = degreesToRadians(paddingAngleDegrees);

  const pieGenerator = d3Pie<number>()
    .value((d) => Math.abs(d))
    .startAngle(startAngleRadians)
    .endAngle(endAngleRadians)
    .padAngle(paddingAngleRadians)
    .sort(null); // Preserve data order

  const pieData = pieGenerator(values);

  return pieData.map((d, index) => ({
    startAngle: d.startAngle,
    endAngle: d.endAngle,
    paddingAngle: d.padAngle,
    innerRadius,
    outerRadius,
    index,
    value: d.data,
  }));
};
