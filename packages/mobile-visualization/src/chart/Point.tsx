import { memo, useEffect, useMemo } from 'react';
import { cancelAnimation, useDerivedValue, useSharedValue } from 'react-native-reanimated';
import { usePreviousValue } from '@coinbase/cds-common/hooks/usePreviousValue';
import type { SharedProps } from '@coinbase/cds-common/types';
import { useTheme } from '@coinbase/cds-mobile/hooks/useTheme';
import { Circle, type Color, Group, interpolateColors } from '@shopify/react-native-skia';

import type { ChartTextChildren } from './text/ChartText';
import { buildTransition, defaultTransition, type TransitionConfig } from './utils/transition';
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
  /**
   * Transition configuration for point animations.
   * Defines how the point transitions when position or color changes.
   */
  transitionConfig?: TransitionConfig;
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
    transitionConfig,
    testID,
  }) => {
    const theme = useTheme();
    const effectiveStroke = stroke ?? theme.color.bg;
    const effectiveFill = fill ?? theme.color.fgPrimary;

    const { getXScale, getYScale, animate } = useCartesianChartContext();

    const xScale = getXScale();
    const yScale = getYScale(yAxisId);

    const shouldAnimate = animate ?? false;
    const effectiveTransitionConfig = transitionConfig ?? defaultTransition;

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
    const previousFill = usePreviousValue(effectiveFill);

    // Animated values for position
    const animatedX = useSharedValue(pixelCoordinate.x);
    const animatedY = useSharedValue(pixelCoordinate.y);

    // Animated value for color interpolation (0 = old color, 1 = new color)
    const colorProgress = useSharedValue(1);

    // Update position when coordinates change
    useEffect(() => {
      if (shouldAnimate && previousPixelCoordinate) {
        animatedX.value = buildTransition(pixelCoordinate.x, effectiveTransitionConfig);
        animatedY.value = buildTransition(pixelCoordinate.y, effectiveTransitionConfig);
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
      effectiveTransitionConfig,
    ]);

    // Update color when fill changes
    useEffect(() => {
      if (shouldAnimate && previousFill && previousFill !== effectiveFill) {
        colorProgress.value = 0;
        colorProgress.value = buildTransition(1, effectiveTransitionConfig);
      } else {
        cancelAnimation(colorProgress);
        colorProgress.value = 1;
      }
    }, [effectiveFill, shouldAnimate, previousFill, colorProgress, effectiveTransitionConfig]);

    // Create animated point for circles
    const animatedPoint = useDerivedValue(() => {
      return { x: animatedX.value, y: animatedY.value };
    }, [animatedX, animatedY]);

    // Interpolate between previous and current fill color
    const animatedFillColor = useDerivedValue(() => {
      if (!previousFill || previousFill === effectiveFill) {
        return effectiveFill;
      }
      return interpolateColors(colorProgress.value, [0, 1], [previousFill, effectiveFill]);
    }, [colorProgress, previousFill, effectiveFill]);

    if (!xScale || !yScale) {
      return null;
    }

    // If animation is disabled or on first render, use static rendering
    if (!shouldAnimate || !previousPixelCoordinate) {
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
              color={effectiveFill as Color}
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
        <Group opacity={opacity}>
          {/* Outer stroke circle */}
          {strokeWidth > 0 && (
            <Circle
              c={animatedPoint}
              color={effectiveStroke as Color}
              r={radius + strokeWidth / 2}
            />
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
