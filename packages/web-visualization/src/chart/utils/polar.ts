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

/**
 * Converts a polar coordinate (angle + radius) to cartesian (x, y) coordinates.
 * Handles the coordinate system conversion where 0° points up (12 o'clock) and
 * angles increase clockwise, which matches how polar charts are typically rendered.
 *
 * @param angleDegrees - Angle in degrees (0° = top, 90° = right, etc.)
 * @param radius - Distance from center in pixels
 * @returns The x, y coordinates relative to the center
 *
 * @example
 * // Get position for 45° at radius 100
 * const { x, y } = polarToCartesian(45, 100);
 * // Use in SVG: <circle cx={centerX + x} cy={centerY + y} />
 */
export const polarToCartesian = (
  angleDegrees: number,
  radius: number,
): { x: number; y: number } => {
  const angleRadians = degreesToRadians(angleDegrees);
  // Subtract 90° (π/2) to convert from "0° = right" to "0° = top"
  const adjustedAngle = angleRadians - Math.PI / 2;
  return {
    x: Math.cos(adjustedAngle) * radius,
    y: Math.sin(adjustedAngle) * radius,
  };
};

/**
 * Calculates the centroid (center point) of an arc.
 * Useful for positioning labels.
 *
 * @param startAngle - Start angle in radians
 * @param endAngle - End angle in radians
 * @param innerRadius - Inner radius in pixels
 * @param outerRadius - Outer radius in pixels
 * @returns The x, y coordinates of the centroid relative to the center
 */
export const getArcCentroid = (
  startAngle: number,
  endAngle: number,
  innerRadius: number,
  outerRadius: number,
): { x: number; y: number } => {
  // Midpoint angle
  const midAngle = (startAngle + endAngle) / 2;
  // Midpoint radius
  const midRadius = (innerRadius + outerRadius) / 2;

  // Convert polar to cartesian
  // Note: In SVG, angles start from 12 o'clock and go clockwise
  // but d3-shape uses standard math angles (3 o'clock, counterclockwise)
  // The arc paths are already adjusted for SVG, so we use sin/cos directly
  const x = Math.cos(midAngle - Math.PI / 2) * midRadius;
  const y = Math.sin(midAngle - Math.PI / 2) * midRadius;

  return { x, y };
};

/**
 * Calculates a point at the outer edge of an arc (for tooltip positioning).
 * Returns a point slightly outside the arc at the midpoint angle.
 *
 * @param startAngle - Start angle in radians
 * @param endAngle - End angle in radians
 * @param outerRadius - Outer radius in pixels
 * @param offset - Additional offset beyond the outer radius (default: 8px)
 * @returns The x, y coordinates relative to the center
 */
export const getArcOuterPoint = (
  startAngle: number,
  endAngle: number,
  outerRadius: number,
  offset = 8,
): { x: number; y: number } => {
  // Midpoint angle
  const midAngle = (startAngle + endAngle) / 2;
  // Position at outer edge plus offset
  const radius = outerRadius + offset;

  // Convert polar to cartesian (adjusted for SVG coordinate system)
  const x = Math.cos(midAngle - Math.PI / 2) * radius;
  const y = Math.sin(midAngle - Math.PI / 2) * radius;

  return { x, y };
};
