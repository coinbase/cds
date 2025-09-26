import React, { memo, useMemo } from 'react';
import type { ThemeVars } from '@coinbase/cds-common';
import { getBarPath } from '@coinbase/cds-common/visualizations/charts';
import { useTheme } from '@coinbase/cds-mobile/hooks/useTheme';

import { DefaultBar } from './';

export type BarComponentProps = {
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
   * Border radius in pixels.
   * @todo: make this be themevars.borderRadius
   */
  borderRadius: number;
  /**
   * Whether to round the top of the bar.
   * @todo: make this optional
   */
  roundTop: boolean;
  /**
   * Whether to round the bottom of the bar.
   * @todo: make this optional
   */
  roundBottom: boolean;
  /**
   * Y coordinate of the baseline/origin.
   * @todo: make this optional
   */
  originY: number;
  /**
   * The x-axis data value for this bar
   * @todo: pull this from x axis types
   */
  dataX?: number | string;
  /**
   * The y-axis data value for this bar
   */
  dataY?: number | [number, number] | null;
  /**
   * The path data for the bar shape.
   */
  d: string;
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
};

export type BarComponent = React.FC<BarComponentProps>;

export type BarProps = {
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
   * Component to render the bar.
   */
  BarComponent?: BarComponent;
  /**
   * The color of the bar.
   * @default theme.color.fgPrimary
   */
  fill?: string;
  /**
   * Opacity of the bar.
   * @default 1
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
   * Border radius from theme (e.g., 100, 200, etc.).
   * @default 100
   */
  borderRadius?: ThemeVars.BorderRadius;
  roundTop?: boolean;
  roundBottom?: boolean;
};

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
    originY,
    dataX,
    dataY,
    BarComponent = DefaultBar,
    fill,
    fillOpacity = 1,
    stroke,
    strokeWidth,
    borderRadius = 100,
    roundTop = true,
    roundBottom = true,
  }) => {
    const theme = useTheme();

    // Use theme color as default if no fill is provided
    const effectiveFill = fill ?? theme.color.fgPrimary;

    const borderRadiusPixels = useMemo(
      () => (borderRadius ? theme.borderRadius[borderRadius] : 0),
      [borderRadius, theme.borderRadius],
    );

    const barPath = useMemo(() => {
      return getBarPath(x, y, width, height, borderRadiusPixels, roundTop, roundBottom);
    }, [x, y, width, height, borderRadiusPixels, roundTop, roundBottom]);

    const effectiveOriginY = originY ?? y + height;

    if (!barPath) {
      return null;
    }

    // Always use the BarComponent for rendering
    return (
      <BarComponent
        borderRadius={borderRadiusPixels}
        d={barPath}
        dataX={dataX}
        dataY={dataY}
        fill={effectiveFill}
        fillOpacity={fillOpacity}
        height={height}
        originY={effectiveOriginY}
        roundBottom={roundBottom}
        roundTop={roundTop}
        stroke={stroke}
        strokeWidth={strokeWidth}
        width={width}
        x={x}
        y={y}
      />
    );
  },
);
