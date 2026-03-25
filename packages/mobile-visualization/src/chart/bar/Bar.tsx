import React, { memo, useMemo } from 'react';
import type { Rect } from '@coinbase/cds-common';
import { useTheme } from '@coinbase/cds-mobile/hooks/useTheme';

import { useCartesianChartContext } from '../ChartProvider';
import { type BarTransition, getBarPath, type Transition } from '../utils';

import { DefaultBar } from './DefaultBar';

export type BarBaseProps = Rect & {
  /**
   * Border radius for the bar.
   * @default 4
   */
  borderRadius?: number;
  /** Whether to round the top of the bar. */
  roundTop?: boolean;
  /** Whether to round the bottom of the bar. */
  roundBottom?: boolean;
  /** Origin of the bar. */
  origin?: number;
  /** The x-axis data value for this bar. */
  dataX?: number | [number, number] | null;
  /** The y-axis data value for this bar. */
  dataY?: number | [number, number] | null;
  /** The ID of the series this bar belongs to. */
  seriesId?: string;
  /** Fill color for the bar. */
  fill?: string;
  /** Fill opacity for the bar. */
  fillOpacity?: number;
  /** Stroke color for the bar outline. */
  stroke?: string;
  /** Stroke width for the bar outline. */
  strokeWidth?: number;
  /** Component to render the bar. */
  BarComponent?: BarComponent;
  /** Minimum bar size in pixels. When set, bars shorter than this value are expanded. */
  minSize?: number;
};

export type BarProps = BarBaseProps & {
  /**
   * Transition configuration for enter and update animations.
   * @note Disable an animation by passing in null.
   *
   * @default transitions = {{
   *   enter: { type: 'spring', stiffness: 900, damping: 120, staggerDelay: 250 },
   *   update: { type: 'spring', stiffness: 900, damping: 120 }
   * }}
   *
   * @example
   * // Custom staggered enter and spring update
   * transitions={{ enter: { type: 'timing', duration: 500, staggerDelay: 300 }, update: { type: 'spring', damping: 20 } }}
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
  d: string;
};

export type BarComponent = React.FC<BarComponentProps>;

/**
 * Simple bar component that renders a single bar at the specified position.
 *
 * This component is intentionally kept simple - it just renders a static bar at the given
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
    fill,
    fillOpacity = 1,
    stroke,
    strokeWidth,
    borderRadius = 4,
    roundTop = true,
    roundBottom = true,
    minSize,
    transitions,
    transition,
  }) => {
    const theme = useTheme();
    const { layout } = useCartesianChartContext();

    const barPath = useMemo(() => {
      return getBarPath(x, y, width, height, borderRadius, roundTop, roundBottom, layout);
    }, [x, y, width, height, borderRadius, roundTop, roundBottom, layout]);

    const origin = useMemo(
      () => originProp ?? (layout === 'horizontal' ? x : y + height),
      [originProp, layout, x, y, height],
    );
    if (!barPath) return;

    return (
      <BarComponent
        borderRadius={borderRadius}
        d={barPath}
        dataX={dataX}
        dataY={dataY}
        fill={fill ?? theme.color.fgPrimary}
        fillOpacity={fillOpacity}
        height={height}
        minSize={minSize}
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
