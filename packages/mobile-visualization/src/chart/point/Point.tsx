import { type ComponentType, memo, useEffect, useMemo } from 'react';
import { cancelAnimation, useDerivedValue, useSharedValue } from 'react-native-reanimated';
import { usePreviousValue } from '@coinbase/cds-common/hooks/usePreviousValue';
import { useTheme } from '@coinbase/cds-mobile/hooks/useTheme';
import { Circle, type Color, Group, interpolateColors } from '@shopify/react-native-skia';

import { useCartesianChartContext } from '../ChartProvider';
import type { ChartTextChildren, ChartTextProps } from '../text/ChartText';
import { type PointLabelPosition, projectPoint } from '../utils';
import { buildTransition, defaultTransition, type Transition } from '../utils/transition';

import { DefaultPointLabel } from './DefaultPointLabel';

export type PointBaseProps = {
  /**
   * X coordinate in data space (not pixel coordinates).
   */
  dataX: number;
  /**
   * Y coordinate in data space (not pixel coordinates).
   */
  dataY: number;
  /**
   * The fill color of the point.
   * @default theme.color.fgPrimary
   */
  fill?: string;
  /**
   * Optional Y-axis id to specify which axis to plot along.
   * @default first y-axis defined in chart props.
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
   * When set, overrides the chart's animation setting for this specific point.
   */
  animate?: boolean;
  /**
   * Custom component to render the label.
   * @default DefaultPointLabel
   */
  LabelComponent?: PointLabelComponent;
  /**
   * Position of the label relative to the point.
   * @default 'center'
   */
  labelPosition?: PointLabelPosition;
  /**
   * Distance in pixels to offset the label from the point.
   * @default 2 * radius
   */
  labelOffset?: number;
  /**
   * Font style for the label text.
   */
  labelFont?: ChartTextProps['font'];
};

/**
 * Props for point label components.
 */
export type PointLabelProps = {
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
   * Fill color for the point.
   */
  fill: string;
  /**
   * Position of the label relative to the point.
   * @default 'center'
   */
  position?: PointLabelPosition;
  /**
   * Distance in pixels to offset the label from the point.
   */
  offset?: number;
  /**
   * Content to display in the label.
   */
  children: ChartTextChildren;
};

export type PointLabelComponent = ComponentType<PointLabelProps>;

export type PointProps = PointBaseProps & {
  /**
   * Simple text label to display at the point position.
   * If provided, a label component will be automatically rendered.
   */
  label?: ChartTextChildren;
  /**
   * Transition configuration for point animations.
   * Defines how the point transitions when position or color changes.
   */
  transition?: Transition;
};

export const Point = memo<PointProps>(
  ({
    dataX,
    dataY,
    yAxisId,
    fill: fillProp,
    radius = 5,
    opacity,
    stroke: strokeProp,
    strokeWidth = 2,
    label,
    LabelComponent = DefaultPointLabel,
    labelPosition = 'center',
    labelOffset,
    labelFont,
    transition = defaultTransition,
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

    // Calculate pixel coordinates from data coordinates
    const pixelCoordinate = useMemo(() => {
      if (!xScale || !yScale) {
        return undefined;
      }

      return projectPoint({
        x: dataX,
        y: dataY,
        xScale,
        yScale,
      });
    }, [xScale, yScale, dataX, dataY]);

    const previousPixelCoordinate = usePreviousValue(pixelCoordinate);
    const previousFill = usePreviousValue(fill);

    // Animated values for position
    const animatedX = useSharedValue(0);
    const animatedY = useSharedValue(0);

    // Animated value for color interpolation (0 = old color, 1 = new color)
    const colorProgress = useSharedValue(1);

    // Update position when coordinates change
    useEffect(() => {
      if (!pixelCoordinate) {
        return;
      }

      if (shouldAnimate && previousPixelCoordinate) {
        animatedX.value = buildTransition(pixelCoordinate.x, transition);
        animatedY.value = buildTransition(pixelCoordinate.y, transition);
      } else {
        cancelAnimation(animatedX);
        cancelAnimation(animatedY);
        animatedX.value = pixelCoordinate.x;
        animatedY.value = pixelCoordinate.y;
      }
    }, [pixelCoordinate, shouldAnimate, previousPixelCoordinate, animatedX, animatedY, transition]);

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

    const offset = useMemo(() => labelOffset ?? radius * 2, [labelOffset, radius]);

    if (!pixelCoordinate) {
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
            <LabelComponent
              dataX={dataX}
              dataY={dataY}
              fill={fill}
              font={labelFont}
              offset={offset}
              position={labelPosition}
              x={pixelCoordinate.x}
              y={pixelCoordinate.y}
            >
              {label}
            </LabelComponent>
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
          <LabelComponent
            dataX={dataX}
            dataY={dataY}
            fill={fill}
            font={labelFont}
            offset={offset}
            position={labelPosition}
            x={pixelCoordinate.x}
            y={pixelCoordinate.y}
          >
            {label}
          </LabelComponent>
        )}
      </>
    );
  },
);
