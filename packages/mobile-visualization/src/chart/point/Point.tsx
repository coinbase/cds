import React, { forwardRef, memo, useEffect, useImperativeHandle, useMemo } from 'react';
import Reanimated, {
  cancelAnimation,
  Easing,
  useAnimatedProps,
  useSharedValue,
  withRepeat,
  withSequence,
  withTiming,
} from 'react-native-reanimated';
import { Circle, G } from 'react-native-svg';
import type { SharedProps } from '@coinbase/cds-common/types';
import { projectPoint, useScrubberContext } from '@coinbase/cds-common/visualizations/charts';
import { useTheme } from '@coinbase/cds-mobile/hooks/useTheme';

import { useCartesianChartContext } from '../ChartProvider';
import { ChartText, type ChartTextProps } from '../text';
import type { ChartTextChildren } from '../text/ChartText';

// Create animated component once at module level for better performance
const AnimatedCircle = Reanimated.createAnimatedComponent(Circle);

export const singlePulseDuration = 1000; // 1 second
export const pulseDuration = 2000; // 2 seconds

/**
 * Calculate text alignment props based on position preset.
 */
function calculateLabelAlignment(
  position: PointLabelConfig['position'],
): Pick<ChartTextProps, 'textAnchor' | 'alignmentBaseline'> {
  switch (position) {
    case 'top':
      return {
        textAnchor: 'middle',
        alignmentBaseline: 'baseline',
      };
    case 'bottom':
      return {
        textAnchor: 'middle',
        alignmentBaseline: 'hanging',
      };
    case 'left':
      return {
        textAnchor: 'end',
        alignmentBaseline: 'central',
      };
    case 'right':
      return {
        textAnchor: 'start',
        alignmentBaseline: 'central',
      };
    case 'center':
    default:
      return {
        textAnchor: 'middle',
        alignmentBaseline: 'central',
      };
  }
}

export type PointRef = {
  /**
   * Triggers a single pulse animation.
   */
  pulse: () => void;
};

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
 * Configuration for Point label rendering using ChartText.
 */
export type PointLabelConfig = Pick<
  ChartTextProps,
  | 'dx'
  | 'dy'
  | 'fontFamily'
  | 'fontSize'
  | 'fontWeight'
  | 'color'
  | 'elevation'
  | 'padding'
  | 'background'
  | 'borderRadius'
  | 'disableRepositioning'
  | 'bounds'
  | 'alignmentBaseline'
  | 'textAnchor'
> & {
  /**
   * Preset position relative to point center.
   * Automatically calculates textAnchor/dominantBaseline.
   * Can be combined with dx/dy for fine-tuning.
   */
  position?: 'top' | 'bottom' | 'left' | 'right' | 'center';
};

/**
 * Shared configuration for point appearance and behavior.
 * Used by line-associated points rendered via Line/LineChart components.
 */
export type PointConfig = {
  /**
   * The color (i.e. SVG fill) of the point.
   */
  color?: string;
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
   * Radius of the pulse ring. Only used when pulse is enabled.
   * @default 16
   */
  pulseRadius?: number;
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
  labelConfig?: PointLabelConfig;
  /**
   * Full control over label rendering.
   * Receives point's pixel coordinates and data values.
   * If provided, overrides `label` and `labelConfig`.
   */
  renderLabel?: (params: { x: number; y: number; dataX: number; dataY: number }) => React.ReactNode;
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
     * Whether to animate the point with a pulsing effect.
     * @default false
     */
    pulse?: boolean;
    /**
     * Optional pixel coordinates to use instead of calculating from dataX/dataY.
     * Useful for performance when coordinates are already calculated.
     */
    pixelCoordinates?: { x: number; y: number };
  };

export const Point = memo(
  forwardRef<PointRef, PointProps>(
    (
      {
        dataX,
        dataY,
        yAxisId,
        color,
        pulse = false,
        radius = 4,
        pulseRadius = 16,
        opacity,
        onPress,
        onScrubberEnter,
        stroke,
        strokeWidth = 2,
        label,
        labelConfig,
        renderLabel,
        pixelCoordinates,
        testID,
        ...props
      },
      ref,
    ) => {
      const theme = useTheme();
      const effectiveStroke = stroke ?? theme.color.bg;

      // Use Reanimated shared values for better performance
      const pulseOpacity = useSharedValue(0);
      const pulseScale = useSharedValue(1);

      const { getXScale, getYScale, animate: animationEnabled } = useCartesianChartContext();
      const { scrubberPosition: scrubberPosition } = useScrubberContext();

      const xScale = getXScale();
      const yScale = getYScale(yAxisId);

      // Use theme color as default if no color is provided
      const effectiveColor = color ?? theme.color.fgPrimary;

      // Scrubber detection: check if this point is highlighted by the scrubber
      const isScrubbing = scrubberPosition !== undefined;
      const isScrubberHighlighted = isScrubbing && scrubberPosition === dataX;

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

      // Animated props for pulse circle - runs entirely on UI thread
      const pulseAnimatedProps = useAnimatedProps(() => {
        return {
          opacity: pulseOpacity.value,
          r: radius * pulseScale.value,
        };
      });

      useImperativeHandle(ref, () => ({
        pulse: () => {
          // Trigger a single pulse using Reanimated
          pulseOpacity.value = withSequence(
            withTiming(0.15, {
              duration: singlePulseDuration / 2,
              easing: Easing.inOut(Easing.ease),
            }),
            withTiming(0, { duration: singlePulseDuration / 2, easing: Easing.inOut(Easing.ease) }),
          );
          pulseScale.value = withSequence(
            withTiming(pulseRadius / radius, {
              duration: singlePulseDuration / 2,
              easing: Easing.out(Easing.ease),
            }),
            withTiming(1, { duration: singlePulseDuration / 2, easing: Easing.in(Easing.ease) }),
          );
        },
      }));

      useEffect(() => {
        if (isScrubberHighlighted && onScrubberEnter) {
          onScrubberEnter({ x: pixelCoordinate.x, y: pixelCoordinate.y });
        }
      }, [isScrubberHighlighted, onScrubberEnter, pixelCoordinate.x, pixelCoordinate.y]);

      // Set up pulse animation with Reanimated for smoother performance
      const shouldPulse = animationEnabled && pulse;

      useEffect(() => {
        if (shouldPulse) {
          // Start infinite pulse animation using Reanimated
          pulseOpacity.value = withRepeat(
            withSequence(
              withTiming(0.15, { duration: pulseDuration / 2, easing: Easing.inOut(Easing.ease) }),
              withTiming(0, { duration: pulseDuration / 2, easing: Easing.inOut(Easing.ease) }),
            ),
            -1, // infinite repeat
            false, // don't reverse
          );

          pulseScale.value = withRepeat(
            withSequence(
              withTiming(pulseRadius / radius, {
                duration: pulseDuration / 2,
                easing: Easing.out(Easing.ease),
              }),
              withTiming(1, { duration: pulseDuration / 2, easing: Easing.in(Easing.ease) }),
            ),
            -1, // infinite repeat
            false, // don't reverse
          );
        } else {
          // Stop animations smoothly
          cancelAnimation(pulseOpacity);
          cancelAnimation(pulseScale);
          pulseOpacity.value = withTiming(0, { duration: 200 });
          pulseScale.value = withTiming(1, { duration: 200 });
        }
      }, [shouldPulse, pulseOpacity, pulseScale, pulseRadius, radius]);

      const LabelContent = useMemo(() => {
        // Custom render function takes precedence
        if (renderLabel) {
          return renderLabel({
            x: pixelCoordinate.x,
            y: pixelCoordinate.y,
            dataX,
            dataY,
          });
        }

        if (label) {
          const alignment = labelConfig?.position
            ? calculateLabelAlignment(labelConfig.position)
            : {};

          const chartTextProps: ChartTextProps = {
            x: pixelCoordinate.x,
            y: pixelCoordinate.y,
            ...alignment,
            ...labelConfig, // labelConfig overrides alignment if provided
            children: label,
          };

          return <ChartText {...chartTextProps} />;
        }

        return null;
      }, [renderLabel, label, labelConfig, pixelCoordinate.x, pixelCoordinate.y, dataX, dataY]);

      if (!xScale || !yScale) {
        return null;
      }

      return (
        <>
          <G opacity={opacity} testID={testID}>
            {/* pulse ring - using native animated props for optimal performance */}
            {shouldPulse && (
              <AnimatedCircle
                animatedProps={pulseAnimatedProps}
                cx={pixelCoordinate.x}
                cy={pixelCoordinate.y}
                fill={effectiveColor}
              />
            )}
            {/* inner point */}
            <Circle
              cx={pixelCoordinate.x}
              cy={pixelCoordinate.y}
              fill={effectiveColor}
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
          {LabelContent}
        </>
      );
    },
  ),
);

Point.displayName = 'Point';
