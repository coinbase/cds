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

export const singlePulseDuration = 1000; // 1 second
export const pulseDuration = 2000; // 2 seconds

const AnimatedCircle = Reanimated.createAnimatedComponent(Circle);

export type PulseCircleRef = {
  /**
   * Triggers a single pulse animation.
   */
  pulse: () => void;
};

type PulseCircleProps = {
  /**
   * Whether to animate the point with a pulsing effect.
   */
  pulse: boolean;
  /**
   * Radius of the pulse ring.
   */
  pulseRadius: number;
  /**
   * The color of the pulse circle.
   */
  color: string;
};

/**
 * Memoized animated pulse circle component.
 * Handles all pulse animation logic internally.
 */
const PulseCircle = memo(
  forwardRef<PulseCircleRef, PulseCircleProps>(({ pulse, pulseRadius, color }, ref) => {
    const { animate } = useCartesianChartContext();
    const pulseOpacity = useSharedValue(0);

    const pulseAnimatedProps = useAnimatedProps(() => {
      return {
        opacity: pulseOpacity.value,
      };
    });

    useImperativeHandle(ref, () => ({
      pulse: () => {
        pulseOpacity.value = 0.1;
        pulseOpacity.value = withTiming(0, { duration: singlePulseDuration });
      },
    }));

    const shouldPulse = animate && pulse;

    useEffect(() => {
      if (shouldPulse) {
        pulseOpacity.value = withRepeat(
          withSequence(
            withTiming(0.1, { duration: pulseDuration / 2 }),
            withTiming(0, { duration: pulseDuration / 2 }),
          ),
          -1, // infinite repeat
          false, // don't reverse
        );
      } else {
        cancelAnimation(pulseOpacity);
        pulseOpacity.value = withTiming(0, { duration: 200 });
      }
    }, [shouldPulse, pulseOpacity]);

    return (
      <AnimatedCircle
        animatedProps={pulseAnimatedProps}
        cx={0}
        cy={0}
        fill={color}
        r={pulseRadius}
      />
    );
  }),
);

/**
 * Calculate text alignment props based on position preset.
 */
const calculateLabelAlignment = (
  position: PointLabelConfig['position'],
): Pick<ChartTextProps, 'horizontalAlignment' | 'verticalAlignment'> => {
  switch (position) {
    case 'top':
      return {
        horizontalAlignment: 'center',
        verticalAlignment: 'bottom',
      };
    case 'bottom':
      return {
        horizontalAlignment: 'center',
        verticalAlignment: 'top',
      };
    case 'left':
      return {
        horizontalAlignment: 'right',
        verticalAlignment: 'middle',
      };
    case 'right':
      return {
        horizontalAlignment: 'left',
        verticalAlignment: 'middle',
      };
    case 'center':
    default:
      return {
        horizontalAlignment: 'center',
        verticalAlignment: 'middle',
      };
  }
};

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
  | 'fontSize'
  | 'fontWeight'
  | 'color'
  | 'inset'
  | 'background'
  | 'borderRadius'
  | 'disableRepositioning'
  | 'bounds'
  | 'horizontalAlignment'
  | 'verticalAlignment'
> & {
  /**
   * Preset position relative to point center.
   * Automatically calculates horizontalAlignment/verticalAlignment.
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
     * Whether to animate the point with a pulsing effect.
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
        pulse,
        radius = 4,
        pulseRadius = 16,
        opacity,
        onPress,
        onScrubberEnter,
        stroke,
        strokeWidth = 2,
        accessibilityLabel,
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

      const pulseCircleRef = React.useRef<PulseCircleRef>(null);

      const { getXScale, getYScale } = useCartesianChartContext();
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

      useImperativeHandle(ref, () => ({
        pulse: () => {
          pulseCircleRef.current?.pulse();
        },
      }));

      useEffect(() => {
        if (isScrubberHighlighted && onScrubberEnter) {
          onScrubberEnter({ x: pixelCoordinate.x, y: pixelCoordinate.y });
        }
      }, [isScrubberHighlighted, onScrubberEnter, pixelCoordinate.x, pixelCoordinate.y]);

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
          <G
            opacity={opacity}
            testID={testID}
            transform={[{ translateX: pixelCoordinate.x }, { translateY: pixelCoordinate.y }]}
          >
            <PulseCircle
              ref={pulseCircleRef}
              color={effectiveColor}
              pulse={!!pulse}
              pulseRadius={pulseRadius}
            />
            <Circle
              accessibilityLabel={accessibilityLabel}
              cx={0}
              cy={0}
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
