import type React from 'react';
import type { ThemeVars } from '@coinbase/cds-common/core/theme';

import { type LineComponent } from '../line';
import type { ChartTextChildren } from '../text/ChartText';

export const axisLineStyles = `
  stroke: var(--color-fg);
  stroke-linecap: square;
  stroke-width: 1px;
`;

export const axisTickMarkStyles = `
  stroke: var(--color-fg);
  stroke-linecap: square;
  stroke-width: 1px;
`;

/**
 * Animation variants for grouped axis tick labels - initial mount
 */
export const axisTickLabelsInitialAnimationVariants = {
  initial: {
    opacity: 0,
  },
  animate: {
    opacity: 1,
    transition: {
      duration: 0.15,
      delay: 0.85, // Initial animation: wait 850ms then fade in over 150ms
    },
  },
  exit: {
    opacity: 0,
    transition: {
      duration: 0.15,
    },
  },
};

/**
 * Animation variants for axis elements - updates (used for both grid lines and tick labels)
 */
export const axisUpdateAnimationVariants = {
  initial: {
    opacity: 0,
  },
  animate: {
    opacity: 1,
    transition: {
      duration: 0.15,
      delay: 0.15, // For updates: fade out 150ms, then fade in 150ms
    },
  },
  exit: {
    opacity: 0,
    transition: {
      duration: 0.15,
    },
  },
};

export type AxisBaseProps = {
  /**
   * Key that identifies the current dataset.
   * When this changes, triggers a fade-out/fade-in transition animation.
   * Useful for distinguishing between live updates vs complete dataset changes.
   * todo: @deprecate this
   */
  dataKey?: string | number;
  /**
   * Component to render the grid lines.
   * @default DottedLine
   */
  GridLineComponent?: LineComponent;
  /**
   * Minimum gap between tick labels in theme space units.
   * Labels will be hidden if they are closer than this gap.
   * @default 0.5
   */
  minTickLabelGap?: ThemeVars.Space;
  /**
   * The position of the axis relative to the chart's drawing area.
   */
  position?: 'start' | 'end';
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
   * @todo see if we can move to separate Grid component
   * Remaining issue is that this needs to line up with 'ticks'
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
   * Size of the axis. This value is inclusive of the padding.
   * @default 32 for x-axis, 44 for y-axis
   */
  size?: number;
  /**
   * Size of the tick marks in theme space units.
   * @default 0.5
   */
  tickMarkSize?: ThemeVars.Space;
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
  ticks?: boolean | number[] | ((value: number) => boolean);
  /**
   * Formatter function for axis tick values.
   * Tick values will be wrapped in ChartText component.
   *
   * @example
   * // Simple string formatting
   * tickLabelFormatter: (value) => `$${prices[value]}`
   *
   * @example
   * // ReactNode with conditional styling
   * tickLabelFormatter: (index) => {
   *   if (index % 12 === 0) {
   *     return <tspan style={{ fontWeight: 'bold' }}>${prices[index]}</tspan>;
   *   }
   *   return `$${prices[index]}`;
   * }
   */
  tickLabelFormatter?: (value: any) => ChartTextChildren;
  /**
   * Space between the axis tick mark and labels.
   * If tick marks are not shown, this is the gap between the axis and the chart.
   * @default 0.25 for x-axis, 1 for y-axis
   */
  tickMarkLabelGap?: ThemeVars.Space;
  /**
   * Interval at which to show ticks
   * When provided, calculates tick count based on available space.
   * @note this property is overridden by the `requestedTickCount` and `ticks` properties.
   * @default 8 (for x-axis)
   */
  tickInterval?: ThemeVars.Space;
};

export type AxisProps = AxisBaseProps & {
  /**
   * Custom className for the axis.
   */
  className?: string;
  /**
   * Custom classNames for the axis.
   */
  classNames?: {
    /**
     * Custom className for the root element.
     */
    root?: string;
    /**
     * Custom className for the tick labels.
     */
    tickLabel?: string;
    /**
     * Custom className for the grid lines.
     */
    gridLine?: string;
    /**
     * Custom className for the axis line.
     */
    line?: string;
    /**
     * Custom className for the tick marks.
     */
    tickMark?: string;
  };
  /**
   * Custom style for the axis.
   */
  style?: React.CSSProperties;
  /**
   * Custom styles for the axis.
   */
  styles?: {
    /**
     * Custom style for the root element.
     */
    root?: React.CSSProperties;
    /**
     * Custom style for the tick labels.
     */
    tickLabel?: React.CSSProperties;
    /**
     * Custom style for the grid lines.
     */
    gridLine?: React.CSSProperties;
    /**
     * Custom style for the axis line.
     */
    line?: React.CSSProperties;
    /**
     * Custom style for the tick marks.
     */
    tickMark?: React.CSSProperties;
  };
};
