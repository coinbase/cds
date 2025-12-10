import React, { memo, useMemo } from 'react';
import { useTheme } from '@coinbase/cds-mobile/hooks/useTheme';

import { getBarPath, type Transition } from '../utils';

import { DefaultBar } from './DefaultBar';

export type BarBaseProps = {
  /**
   * The series ID this bar belongs to.
   */
  seriesId?: string;
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
   * Y coordinate of the baseline/origin.
   */
  originY?: number;
  /**
   * The x-axis data value for this bar.
   */
  dataX?: number | string;
  /**
   * The y-axis data value for this bar.
   */
  dataY?: number | [number, number] | null;
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
   * Transition configuration for bar animations.
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
    seriesId,
    x,
    y,
    width,
    height,
    originY,
    dataX,
    dataY,
    BarComponent = DefaultBar,
    fill,
    fillOpacity = 1,
    stroke,
    strokeWidth,
    borderRadius = 4,
    roundTop = true,
    roundBottom = true,
    transition,
  }) => {
    const theme = useTheme();

    // Use theme color as default if no fill is provided
    const effectiveFill = fill ?? theme.color.fgPrimary;

    const borderRadiusPixels = useMemo(() => borderRadius ?? 0, [borderRadius]);

    const barPath = useMemo(() => {
      return getBarPath(x, y, width, height, borderRadiusPixels, roundTop, roundBottom);
    }, [x, y, width, height, borderRadiusPixels, roundTop, roundBottom]);

    const effectiveOriginY = originY ?? y + height;

    if (!barPath) return;

    // Always use the BarComponent for rendering
    return (
      <BarComponent
        borderRadius={borderRadius}
        d={barPath}
        dataX={dataX}
        dataY={dataY}
        fill={effectiveFill}
        fillOpacity={fillOpacity}
        height={height}
        originY={effectiveOriginY}
        roundBottom={roundBottom}
        roundTop={roundTop}
        seriesId={seriesId}
        stroke={stroke}
        strokeWidth={strokeWidth}
        transition={transition}
        width={width}
        x={x}
        y={y}
      />
    );
  },
);
