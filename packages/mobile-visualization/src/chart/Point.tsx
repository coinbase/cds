import { memo, useEffect, useMemo } from 'react';
import { Circle, G } from 'react-native-svg';
import type { SharedProps } from '@coinbase/cds-common/types';
import { useTheme } from '@coinbase/cds-mobile/hooks/useTheme';

import type { ChartTextChildren } from './text/ChartText';
import { useCartesianChartContext } from './ChartProvider';
import { ChartText, type ChartTextProps } from './text';
import { projectPoint, useScrubberContext } from './utils';

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
   * @default 4
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
   * Handler for when the scrubber enters this point.
   */
  onScrubberEnter?: (point: { x: number; y: number }) => void;
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
    radius = 4,
    opacity,
    onPress,
    onScrubberEnter,
    stroke,
    strokeWidth = 2,
    accessibilityLabel,
    label,
    labelProps,
    pixelCoordinates,
    testID,
  }) => {
    const theme = useTheme();
    const effectiveStroke = stroke ?? theme.color.bg;

    const { getXScale, getYScale } = useCartesianChartContext();
    const { scrubberPosition } = useScrubberContext();

    const xScale = getXScale();
    const yScale = getYScale(yAxisId);

    // Scrubber detection: check if this point is highlighted by the scrubber
    const isScrubberHighlighted = scrubberPosition !== undefined && scrubberPosition === dataX;

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

    useEffect(() => {
      if (isScrubberHighlighted && onScrubberEnter) {
        onScrubberEnter({ x: pixelCoordinate.x, y: pixelCoordinate.y });
      }
    }, [isScrubberHighlighted, onScrubberEnter, pixelCoordinate.x, pixelCoordinate.y]);

    if (!xScale || !yScale) {
      return null;
    }

    return (
      <>
        <G
          opacity={opacity}
          testID={testID}
          transform={[{ translateX: pixelCoordinate.x }, { translateY: pixelCoordinate.y }]}
        >
          <Circle
            accessibilityLabel={accessibilityLabel}
            cx={0}
            cy={0}
            fill={fill ?? theme.color.fgPrimary}
            onPress={
              onPress
                ? (event: any) =>
                    onPress({ dataX, dataY, x: pixelCoordinate.x, y: pixelCoordinate.y })
                : undefined
            }
            r={radius}
            stroke={effectiveStroke}
            strokeWidth={strokeWidth}
          />
        </G>
        {label && (
          <ChartText x={pixelCoordinate.x} y={pixelCoordinate.y} {...labelProps}>
            {label}
          </ChartText>
        )}
      </>
    );
  },
);
