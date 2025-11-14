import { memo, useEffect, useMemo } from 'react';
import { cancelAnimation, useDerivedValue, useSharedValue } from 'react-native-reanimated';
import { usePreviousValue } from '@coinbase/cds-common/hooks/usePreviousValue';
import type { SharedProps } from '@coinbase/cds-common/types';
import { useTheme } from '@coinbase/cds-mobile/hooks/useTheme';
import { Circle, type Color, Group, interpolateColors } from '@shopify/react-native-skia';

import type { ChartTextChildren } from './text/ChartText';
import { buildTransition, defaultTransition, type Transition } from './utils/transition';
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
  /**
   * Fill for the point
   */
  fill: string;
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
   * @note there is no way to add an accessibilityLabel inside of the chart
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
   * Transition configuration for point animations.
   * Defines how the point transitions when position or color changes.
   */
  transition?: Transition;
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
    /**
     * Override the chart's animation setting for this specific point.
     * When undefined, uses the chart context's animation setting.
     */
    animate?: boolean;
  };

export const Point = memo<PointProps>(
  ({
    dataX,
    dataY,
    yAxisId,
    fill: fillProp,
    radius = 5,
    opacity,
    onPress,
    stroke: strokeProp,
    strokeWidth = 2,
    label,
    labelProps,
    pixelCoordinates,
    transition = defaultTransition,
    testID,
    animate: animateProp,
  }) => {
    const theme = useTheme();
    const stroke = strokeProp ?? theme.color.bg;
    const fill = fillProp ?? theme.color.fgPrimary;

    const {
      getXScale,
      getYScale,
      animate: animationEnabled,
      drawingArea,
    } = useCartesianChartContext();
    const animate = animateProp ?? animationEnabled;

    const xScale = getXScale();
    const yScale = getYScale(yAxisId);

    const shouldAnimate = animate ?? false;

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

    const previousPixelCoordinate = usePreviousValue(pixelCoordinate);
    const previousFill = usePreviousValue(fill);

    // Animated values for position
    const animatedX = useSharedValue(pixelCoordinate.x);
    const animatedY = useSharedValue(pixelCoordinate.y);

    // Animated value for color interpolation (0 = old color, 1 = new color)
    const colorProgress = useSharedValue(1);

    // Update position when coordinates change
    useEffect(() => {
      if (shouldAnimate && previousPixelCoordinate) {
        animatedX.value = buildTransition(pixelCoordinate.x, transition);
        animatedY.value = buildTransition(pixelCoordinate.y, transition);
      } else {
        cancelAnimation(animatedX);
        cancelAnimation(animatedY);
        animatedX.value = pixelCoordinate.x;
        animatedY.value = pixelCoordinate.y;
      }
    }, [
      pixelCoordinate.x,
      pixelCoordinate.y,
      shouldAnimate,
      previousPixelCoordinate,
      animatedX,
      animatedY,
      transition,
    ]);

    // Update color when fill changes
    useEffect(() => {
      if (shouldAnimate && previousFill && previousFill !== fill) {
        colorProgress.value = 0;
        colorProgress.value = buildTransition(1, transition);
      } else {
        cancelAnimation(colorProgress);
        colorProgress.value = 1;
      }
    }, [fill, shouldAnimate, previousFill, colorProgress, transition]);

    // Create animated point for circles
    const animatedPoint = useDerivedValue(() => {
      return { x: animatedX.value, y: animatedY.value };
    }, [animatedX, animatedY]);

    // Interpolate between previous and current fill color
    const animatedFillColor = useDerivedValue(() => {
      if (!previousFill || previousFill === fill) {
        return fill;
      }
      return interpolateColors(colorProgress.value, [0, 1], [previousFill, fill]);
    }, [colorProgress, previousFill, fill]);

    // Check if point is within drawing area
    const isWithinDrawingArea = useDerivedValue(() => {
      return (
        animatedX.value >= drawingArea.x &&
        animatedX.value <= drawingArea.x + drawingArea.width &&
        animatedY.value >= drawingArea.y &&
        animatedY.value <= drawingArea.y + drawingArea.height
      );
    }, [animatedX, animatedY, drawingArea]);

    // Compute effective opacity based on drawing area bounds
    const effectiveOpacity = useDerivedValue(() => {
      const baseOpacity = opacity ?? 1;
      return isWithinDrawingArea.value ? baseOpacity : 0;
    }, [isWithinDrawingArea, opacity]);

    if (!xScale || !yScale) {
      return null;
    }

    // If animation is disabled or on first render, use static rendering
    if (!shouldAnimate || !previousPixelCoordinate) {
      const isWithinBounds =
        pixelCoordinate.x >= drawingArea.x &&
        pixelCoordinate.x <= drawingArea.x + drawingArea.width &&
        pixelCoordinate.y >= drawingArea.y &&
        pixelCoordinate.y <= drawingArea.y + drawingArea.height;
      const staticOpacity = isWithinBounds ? (opacity ?? 1) : 0;

      return (
        <>
          <Group opacity={staticOpacity}>
            {/* Outer stroke circle */}
            {strokeWidth > 0 && (
              <Circle
                c={{ x: pixelCoordinate.x, y: pixelCoordinate.y }}
                color={stroke as Color}
                r={radius + strokeWidth / 2}
              />
            )}
            {/* Inner fill circle */}
            <Circle
              c={{ x: pixelCoordinate.x, y: pixelCoordinate.y }}
              color={fill as Color}
              r={radius - strokeWidth / 2}
            />
          </Group>
          {label && (
            <ChartText x={pixelCoordinate.x} y={pixelCoordinate.y} {...labelProps}>
              {label}
            </ChartText>
          )}
        </>
      );
    }

    // Animated rendering
    return (
      <>
        <Group opacity={effectiveOpacity}>
          {/* Outer stroke circle */}
          {strokeWidth > 0 && (
            <Circle c={animatedPoint} color={stroke as Color} r={radius + strokeWidth / 2} />
          )}
          {/* Inner fill circle with animated color */}
          <Circle c={animatedPoint} color={animatedFillColor} r={radius - strokeWidth / 2} />
        </Group>
        {label && (
          <ChartText x={pixelCoordinate.x} y={pixelCoordinate.y} {...labelProps}>
            {label}
          </ChartText>
        )}
      </>
    );
  },
);
