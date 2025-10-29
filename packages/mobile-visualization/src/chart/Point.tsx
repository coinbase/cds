import { memo, useMemo, useRef } from 'react';
import type { SharedProps } from '@coinbase/cds-common/types';
import { useTheme } from '@coinbase/cds-mobile/hooks/useTheme';
import { Circle, type Color, Group } from '@shopify/react-native-skia';

import type { ChartTextChildren } from './text/ChartText';
import { useCartesianChartContext } from './ChartProvider';
import { ChartText, type ChartTextProps } from './text';
import { projectPoint } from './utils';

/**
 * Parameters passed to renderPoints callback function.
 */
export type RenderPointsParams = {
  /**
   * X coordinate in SVG pixel space.
   */
  x: number;
  /**
   * Y coordinate in SVG pixel space.
   */
  y: number;
  /**
   * X coordinate in data space (usually same as index).
   */
  dataX: number;
  /**
   * Y coordinate in data space (same as value).
   */
  dataY: number;
};

/**
 * Shared configuration for point appearance and behavior.
 * Used by line-associated points rendered via Line/LineChart components.
 */
export type PointConfig = {
  /**
   * The fill color of the point.
   */
  fill?: string;
  /**
   * Optional Y-axis id to specify which axis to plot along.
   * Defaults to the first y-axis
   */
  yAxisId?: string;
  /**
   * Radius of the point.
   * @default 5
   */
  radius?: number;
  /**
   * Opacity of the point.
   */
  opacity?: number;
  /**
   * Handler for when the point is clicked.
   */
  onPress?: (point: { x: number; y: number; dataX: number; dataY: number }) => void;
  /**
   * Color of the outer stroke around the point.
   * @default theme.color.bg
   */
  stroke?: string;
  /**
   * Outer stroke width of the point.
   * Set to  0 to remove the stroke.
   * @default 2
   */
  strokeWidth?: number;
  /**
   * Simple text label to display at the point position.
   * If provided, a ChartText will be automatically rendered.
   */
  label?: ChartTextChildren;
  /**
   * Configuration for the automatically rendered label.
   * Only used when `label` prop is provided.
   */
  labelProps?: Omit<ChartTextProps, 'x' | 'y' | 'children'>;
  /**
   * Accessibility label for screen readers to describe the point.
   * If not provided, a default label will be generated using the data coordinates.
   */
  accessibilityLabel?: string;
};

export type PointProps = SharedProps &
  PointConfig & {
    /**
     * X coordinate in data space (not pixel coordinates).
     */
    dataX: number;
    /**
     * Y coordinate in data space (not pixel coordinates).
     */
    dataY: number;
    /**
     * Optional pixel coordinates to use instead of calculating from dataX/dataY.
     * Useful for performance when coordinates are already calculated.
     */
    pixelCoordinates?: { x: number; y: number };
  };

export const Point = memo<PointProps>(
  ({
    dataX,
    dataY,
    yAxisId,
    fill,
    radius = 5,
    opacity,
    onPress,
    stroke,
    strokeWidth = 2,
    accessibilityLabel,
    label,
    labelProps,
    pixelCoordinates,
    testID,
  }) => {
    const renderCount = useRef(0);
    renderCount.current++;
    const theme = useTheme();
    const effectiveStroke = stroke ?? theme.color.bg;

    const { getXScale, getYScale } = useCartesianChartContext();

    const xScale = getXScale();
    const yScale = getYScale(yAxisId);

    // Use provided pixelCoordinates or calculate from data coordinates
    const pixelCoordinate = useMemo(() => {
      if (pixelCoordinates) {
        return pixelCoordinates;
      }

      if (!xScale || !yScale) {
        return { x: 0, y: 0 };
      }

      return projectPoint({
        x: dataX,
        y: dataY,
        xScale,
        yScale,
      });
    }, [pixelCoordinates, xScale, yScale, dataX, dataY]);

    if (!xScale || !yScale) {
      return null;
    }

    return (
      <>
        <Group opacity={opacity}>
          {/* Outer stroke circle */}
          {strokeWidth > 0 && (
            <Circle
              c={{ x: pixelCoordinate.x, y: pixelCoordinate.y }}
              color={effectiveStroke as Color}
              r={radius + strokeWidth / 2}
            />
          )}
          {/* Inner fill circle */}
          <Circle
            c={{ x: pixelCoordinate.x, y: pixelCoordinate.y }}
            color={(fill ?? theme.color.fgPrimary) as Color}
            r={radius - strokeWidth / 2}
          />
        </Group>
        <ChartText x={pixelCoordinate.x} y={pixelCoordinate.y - 20}>
          {renderCount.current}
        </ChartText>
        {label && (
          <ChartText x={pixelCoordinate.x} y={pixelCoordinate.y} {...labelProps}>
            {label}
          </ChartText>
        )}
      </>
    );
  },
);
