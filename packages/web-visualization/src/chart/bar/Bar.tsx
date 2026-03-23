import React, { memo, useMemo } from 'react';
import type { SVGProps } from 'react';
import type { Transition } from 'framer-motion';

import { useCartesianChartContext } from '../ChartProvider';
import { type BarTransition, getBarPath } from '../utils';

import { DefaultBar } from './';

export type BarBaseProps = {
  /**
   * X coordinate of the bar (left edge).
   */
  x: number;
  /**
   * Y coordinate of the bar (top edge).
   */
  y: number;
  /**
   * Width of the bar.
   */
  width: number;
  /**
   * Height of the bar.
   */
  height: number;
  /**
   * Border radius for the bar.
   * @default 4
   */
  borderRadius?: number;
  /**
   * Whether to round the top of the bar.
   */
  roundTop?: boolean;
  /**
   * Whether to round the bottom of the bar.
   */
  roundBottom?: boolean;
  /**
   * Coordinate of the baseline/origin for animations.
   * For vertical layout (bars grow up), this is the Y coordinate.
   * For horizontal layout (bars grow sideways), this is the X coordinate.
   */
  origin?: number;
  /**
   * The x-axis data value for this bar.
   */
  dataX?: number | string;
  /**
   * The y-axis data value for this bar.
   */
  dataY?: number | [number, number] | null;
  /**
   * The ID of the series this bar belongs to.
   */
  seriesId?: string;
  /**
   * Fill color for the bar.
   */
  fill?: string;
  /**
   * Fill opacity for the bar.
   */
  fillOpacity?: number;
  /**
   * Stroke color for the bar outline.
   */
  stroke?: string;
  /**
   * Stroke width for the bar outline.
   */
  strokeWidth?: number;
  /**
   * Component to render the bar.
   */
  BarComponent?: BarComponent;
};

export type BarProps = BarBaseProps & {
  /**
   * Transition configuration for enter and update animations.
   * @note Disable an animation by passing in null.
   *
   * @default transitions = {{
   *   enter: { type: 'spring', stiffness: 900, damping: 120, mass: 4, staggerDelay: 0.25 },
   *   update: { type: 'spring', stiffness: 900, damping: 120, mass: 4 }
   * }}
   *
   * @example
   * // Custom staggered enter and spring update
   * transitions={{ enter: { type: 'tween', duration: 0.5, staggerDelay: 0.3 }, update: { type: 'spring', damping: 20 } }}
   *
   * @example
   * // Disable enter animation
   * transitions={{ enter: null }}
   */
  transitions?: {
    /**
     * Transition for the initial enter/reveal animation.
     * Set to `null` to disable.
     */
    enter?: BarTransition | null;
    /**
     * Transition for subsequent data update animations.
     * Set to `null` to disable.
     */
    update?: BarTransition | null;
  };
  /**
   * Transition for updates.
   * @deprecated Use `transitions.update` instead. This will be removed in a future major release.
   * @deprecationExpectedRemoval v4
   */
  transition?: Transition;
};

export type BarComponentProps = Omit<BarProps, 'BarComponent'> & {
  /**
   * The path data for the bar shape.
   */
  d: SVGProps<SVGPathElement>['d'];
};

export type BarComponent = React.FC<BarComponentProps>;

/**
 * Simple bar component that renders a single bar at the specified position.
 *
 * This component is intentionally kept simple - it just renders a bar at the given
 * x, y, width, height coordinates. Complex positioning logic (like handling stacks,
 * groups, gaps, etc.) should be handled by parent components like BarChart or BarStack.
 *
 * @example
 * ```tsx
 * <Bar x={10} y={20} width={50} height={100} fill="blue" />
 * ```
 */
export const Bar = memo<BarProps>(
  ({
    x,
    y,
    width,
    height,
    origin: originProp,
    dataX,
    dataY,
    seriesId,
    BarComponent = DefaultBar,
    fill = 'var(--color-fgPrimary)',
    fillOpacity = 1,
    stroke,
    strokeWidth,
    borderRadius = 4,
    roundTop = true,
    roundBottom = true,
    transitions,
    transition,
  }) => {
    const { layout } = useCartesianChartContext();

    const barPath = useMemo(() => {
      return getBarPath(x, y, width, height, borderRadius, !!roundTop, !!roundBottom, layout);
    }, [x, y, width, height, borderRadius, roundTop, roundBottom, layout]);

    const origin = useMemo(() => {
      return originProp ?? (layout === 'horizontal' ? x : y + height);
    }, [originProp, layout, x, y, height]);

    if (!barPath) {
      return null;
    }

    return (
      <BarComponent
        borderRadius={borderRadius}
        d={barPath}
        dataX={dataX}
        dataY={dataY}
        fill={fill}
        fillOpacity={fillOpacity}
        height={height}
        origin={origin}
        roundBottom={roundBottom}
        roundTop={roundTop}
        seriesId={seriesId}
        stroke={stroke}
        strokeWidth={strokeWidth}
        transition={transition}
        transitions={transitions}
        width={width}
        x={x}
        y={y}
      />
    );
  },
);
