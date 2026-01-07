import type React from 'react';

import { type LineComponent } from '../line';
import type { ChartTextChildren, ChartTextProps } from '../text/ChartText';
import { accessoryFadeTransitionDuration, type AxisBandPlacement } from '../utils';

/**
 * Animation transition for axis elements (grid lines, tick marks, tick labels).
 * Matches web's axisUpdateAnimationTransition timing.
 */
export const axisUpdateAnimationTransition = {
  duration: accessoryFadeTransitionDuration,
};

export type AxisTickLabelComponentProps = Pick<
  ChartTextProps,
  | 'x'
  | 'y'
  | 'children'
  | 'dx'
  | 'dy'
  | 'font'
  | 'fontFamilies'
  | 'fontSize'
  | 'fontWeight'
  | 'fontStyle'
  | 'color'
  | 'horizontalAlignment'
  | 'verticalAlignment'
  | 'opacity'
>;

export type AxisTickLabelComponent = React.FC<AxisTickLabelComponentProps>;

export type AxisBaseProps = {
  /**
   * Placement of grid lines relative to each band.
   * Options: 'start', 'middle', 'end', 'edges'
   * @note This property only applies to band scales.
   * @default 'edges'
   */
  bandGridLinePlacement?: AxisBandPlacement;
  /**
   * Placement of tick marks relative to each band.
   * Options: 'start', 'middle', 'end', 'edges'
   * @note This property only applies to band scales.
   * @default 'middle'
   */
  bandTickMarkPlacement?: AxisBandPlacement;
  /**
   * Label text to display for the axis.
   */
  label?: string;
  /**
   * Gap between the tick labels and the axis label.
   * @default 4
   */
  labelGap?: number;
  /**
   * Minimum gap between tick labels.
   * Labels will be hidden if they are closer than this gap.
   * @default 4
   */
  minTickLabelGap?: number;
  /**
   * Requested number of ticks to display.
   * This value is passed into d3 and may not be respected.
   * @note This property is overridden when `ticks` is provided.
   * @note this property overrides the `tickInterval` property.
   * @default 5 (for y-axis)
   */
  requestedTickCount?: number;
  /**
   * Whether to show grid lines at each tick position.
   */
  showGrid?: boolean;
  /**
   * Whether to show the axis line.
   */
  showLine?: boolean;
  /**
   * Whether to show tick marks on the axis.
   */
  showTickMarks?: boolean;
  /**
   * Size of the tick marks.
   * @default 4
   */
  tickMarkSize?: number;
  /**
   * Custom tick configuration for the axis.
   * When provided, this overrides the `requestedTickCount` property.
   *
   * - **Array**: Uses these exact values for tick positioning and labels.
   * - **Function**: Filters based on the predicate function.
   *   - For **x-axis**: Checks every data index (0, 1, 2, ..., dataLength-1)
   *   - For **y-axis**: Filters d3-generated tick values
   *
   * @example
   * // Exact tick values
   * ticks: [0, 25, 50, 75, 100]
   *
   * @example
   * // Show every 12th data point on x-axis
   * ticks: (index) => index % 12 === 0
   */
  ticks?: number[] | ((value: number) => boolean);
  /**
   * Space between the axis tick mark and labels.
   * If tick marks are not shown, this is the gap between the axis and the chart.
   * @default 2 for x-axis, 8 for y-axis
   */
  tickMarkLabelGap?: number;
  /**
   * Interval at which to show ticks.
   * When provided, calculates tick count based on available space.
   * @note this property is overridden by the `requestedTickCount` and `ticks` properties.
   * @default 32 (for x-axis)
   */
  tickInterval?: number;
  /**
   * Minimum step size for tick generation.
   * Prevents the step from being smaller than this value.
   * @default 1
   */
  tickMinStep?: number;
  /**
   * Maximum step size for tick generation.
   * Prevents the step from being larger than this value.
   */
  tickMaxStep?: number;
};

export type AxisProps = AxisBaseProps & {
  /**
   * Component to render the grid lines.
   * @default DottedLine
   */
  GridLineComponent?: LineComponent;
  /**
   * Component to render the axis line.
   * @default SolidLine
   */
  LineComponent?: LineComponent;
  /**
   * Component to render the tick marks.
   * @default SolidLine
   */
  TickMarkLineComponent?: LineComponent;
  /**
   * Formatter function for axis tick values.
   * Tick values will be wrapped in ChartText component.
   *
   * @example
   * // XAxis
   * tickLabelFormatter: (index) => {
   *   return `$${prices[index]}`;
   * }
   *
   * @example
   * // YAxis
   * tickLabelFormatter: (value) => `$${prices[value]}`
   */
  tickLabelFormatter?: (value: number) => ChartTextChildren;
  /**
   * Component to render tick labels.
   * Allows for custom styling and formatting that works cross-platform.
   *
   * @example
   * // Custom tick label component with offset positioning
   * TickLabelComponent={(props) => (
   *   <DefaultAxisTickLabel {...props} dx={4} dy={-12} />
   * )}
   * @default DefaultAxisTickLabel
   */
  TickLabelComponent?: AxisTickLabelComponent;
};
