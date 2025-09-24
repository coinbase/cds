import React, {
  forwardRef,
  memo,
  useEffect,
  useImperativeHandle,
  useMemo,
  useRef,
  useState,
} from 'react';
import { Animated, StyleSheet } from 'react-native';
import { Circle, G } from 'react-native-svg';
import type { SharedProps } from '@coinbase/cds-common/types';
import {
  projectPoint,
  useChartContext,
  useScrubberContext,
} from '@coinbase/cds-common/visualizations/charts';
import { useTheme } from '@coinbase/cds-mobile/hooks/useTheme';

import { ChartText, type ChartTextProps } from '../text';
import type { ChartTextChildren } from '../text/ChartText';

export const singlePulseDuration = 1000; // 1 second
export const pulseDuration = 2000; // 2 seconds

const styles = StyleSheet.create({
  container: {
    // React Native doesn't need outline styles
  },
});

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
  | 'styles'
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
   * Optional X-axis id to specify which axis to plot along.
   * Defaults to the first x-axis
   */
  xAxisId?: string;
  /**
   * Optional Y-axis id to specify which axis to plot along.
   * Defaults to the first y-axis
   */
  yAxisId?: string;
  /**
   * Radius of the point.
   */
  radius?: number;
  /**
   * Opacity of the point.
   */
  opacity?: number;
  /**
   * Handler for when the point is clicked.
   */
  onClick?: (
    event: React.MouseEvent,
    point: { x: number; y: number; dataX: number; dataY: number },
  ) => void;
  /**
   * Handler for when the scrubber enters this point.
   */
  onScrubberEnter?: (point: { x: number; y: number }) => void;
  /**
   * Stroke color around the point.
   */
  stroke?: string;
  /**
   * Stroke width of the point.
   * Adding a stroke creates a ring around the Point
   */
  strokeWidth?: number;
  /**
   * Custom class name for the point.
   */
  className?: string;
  /**
   * Custom styles for the point.
   */
  style?: React.CSSProperties;
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
     * Radius of the pulse ring. Only used when pulse is enabled.
     * @default 15
     */
    pulseRadius?: number;
    /**
     * Whether to animate the point with a pulsing effect.
     * @default false
     */
    pulse?: boolean;
    /**
     * Type of hover effect to apply. Setting this (except 'none') makes the point interactive.
     * @default 'scale' when onClick is provided, 'none' otherwise
     */
    hoverEffect?: 'scale' | 'pulse' | 'none';
    /**
     * Custom styles for the component.
     */
    styles?: {
      /**
       * Custom styles for the point container element.
       */
      container?: React.CSSProperties;
      /**
       * Custom styles for the pulse circle element.
       */
      pulseCircle?: React.CSSProperties;
      /**
       * Custom styles for the inner circle element.
       */
      innerPoint?: React.CSSProperties;
    };
  };

export const Point = memo(
  forwardRef<PointRef, PointProps>(
    (
      {
        dataX,
        dataY,
        xAxisId,
        yAxisId,
        color,
        radius = 4,
        pulseRadius = 15,
        pulse = false,
        opacity,
        onClick,
        onScrubberEnter,
        hoverEffect = onClick ? 'scale' : 'none',
        className,
        style,
        styles,
        stroke,
        strokeWidth,
        label,
        labelConfig,
        renderLabel,
        testID,
        ...props
      },
      ref,
    ) => {
      const theme = useTheme();
      const pulseOpacity = useRef(new Animated.Value(0)).current;
      const scaleValue = useRef(new Animated.Value(1)).current;
      const { getXScale, getYScale, animate } = useChartContext();
      const { highlightedIndex } = useScrubberContext();
      const [isHovered, setIsHovered] = useState(false);

      const xScale = getXScale(xAxisId);
      const yScale = getYScale(yAxisId);

      // Use theme color as default if no color is provided
      const effectiveColor = color ?? theme.color.fgPrimary;

      // Point is interactive if onClick is provided or hoverEffect is set (and not 'none')
      const isInteractive = !!onClick || hoverEffect !== 'none';

      // Scrubber detection: check if this point is highlighted by the scrubber
      const isScrubbing = highlightedIndex !== undefined;
      const isScrubberHighlighted = isScrubbing && highlightedIndex === dataX;

      // Project the point to pixel coordinates
      const pixelCoordinate = useMemo(() => {
        if (!xScale || !yScale) {
          return { x: 0, y: 0 };
        }

        return projectPoint({
          x: dataX,
          y: dataY,
          xScale,
          yScale,
        });
      }, [xScale, yScale, dataX, dataY]);

      useImperativeHandle(ref, () => ({
        pulse: () => {
          Animated.sequence([
            Animated.timing(pulseOpacity, {
              toValue: 0.1,
              duration: singlePulseDuration / 2,
              useNativeDriver: true,
            }),
            Animated.timing(pulseOpacity, {
              toValue: 0,
              duration: singlePulseDuration / 2,
              useNativeDriver: true,
            }),
          ]).start();
        },
      }));

      useEffect(() => {
        if (isScrubberHighlighted && onScrubberEnter) {
          onScrubberEnter({ x: pixelCoordinate.x, y: pixelCoordinate.y });
        }
      }, [isScrubberHighlighted, onScrubberEnter, pixelCoordinate.x, pixelCoordinate.y]);

      const effectiveHover = isScrubbing ? isScrubberHighlighted : isHovered;

      const shouldShowPulse = animate && (pulse || (hoverEffect === 'pulse' && effectiveHover));

      // Set up pulse animation
      useEffect(() => {
        if (shouldShowPulse) {
          const pulseAnimation = Animated.loop(
            Animated.sequence([
              Animated.timing(pulseOpacity, {
                toValue: 0.1,
                duration: pulseDuration / 2,
                useNativeDriver: true,
              }),
              Animated.timing(pulseOpacity, {
                toValue: 0,
                duration: pulseDuration / 2,
                useNativeDriver: true,
              }),
            ]),
          );
          pulseAnimation.start();
          return () => pulseAnimation.stop();
        } else {
          Animated.timing(pulseOpacity, {
            toValue: 0,
            duration: 200,
            useNativeDriver: true,
          }).start();
        }
      }, [shouldShowPulse, pulseOpacity]);

      // Set up scale animation for hover
      useEffect(() => {
        if (hoverEffect === 'scale' && animate) {
          Animated.timing(scaleValue, {
            toValue: effectiveHover ? 1.2 : 1,
            duration: 200,
            useNativeDriver: true,
          }).start();
        }
      }, [effectiveHover, hoverEffect, animate, scaleValue]);

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

      const AnimatedCircle = useMemo(() => Animated.createAnimatedComponent(Circle), []);

      const PointContent = useMemo(() => {
        if (!animate) {
          // Simple non-animated version
          return (
            <G opacity={opacity}>
              <Circle
                cx={pixelCoordinate.x}
                cy={pixelCoordinate.y}
                fill={effectiveColor}
                onPress={
                  onClick
                    ? (event: any) =>
                        onClick(event, { dataX, dataY, x: pixelCoordinate.x, y: pixelCoordinate.y })
                    : undefined
                }
                r={radius}
                stroke={effectiveColor}
                strokeWidth={strokeWidth}
              />
            </G>
          );
        }

        return (
          <G opacity={opacity}>
            {/* Pulse circle - only show if pulsing */}
            {(pulse || (hoverEffect === 'pulse' && effectiveHover)) && (
              <AnimatedCircle
                cx={pixelCoordinate.x}
                cy={pixelCoordinate.y}
                fill={effectiveColor}
                opacity={pulseOpacity}
                r={pulseRadius}
              />
            )}
            {/* Main circle */}
            <Circle
              cx={pixelCoordinate.x}
              cy={pixelCoordinate.y}
              fill={effectiveColor}
              onPress={
                onClick
                  ? (event: any) =>
                      onClick(event, { dataX, dataY, x: pixelCoordinate.x, y: pixelCoordinate.y })
                  : undefined
              }
              r={radius}
              stroke={effectiveColor}
              strokeOpacity={0.15}
              strokeWidth={strokeWidth}
            />
          </G>
        );
      }, [
        AnimatedCircle,
        opacity,
        pulseOpacity,
        pixelCoordinate.x,
        pixelCoordinate.y,
        effectiveColor,
        pulseRadius,
        hoverEffect,
        animate,
        radius,
        onClick,
        strokeWidth,
        dataX,
        dataY,
        pulse,
        effectiveHover,
      ]);

      if (!xScale || !yScale) {
        return null;
      }

      return (
        <G testID={testID}>
          {PointContent}
          {LabelContent}
        </G>
      );
    },
  ),
);

Point.displayName = 'Point';
