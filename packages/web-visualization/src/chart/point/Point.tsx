import React, { forwardRef, memo, useEffect, useImperativeHandle, useMemo } from 'react';
import type { SVGProps } from 'react';
import type { SharedProps } from '@coinbase/cds-common/types';
import {
  projectPoint,
  useChartContext,
  useScrubberContext,
} from '@coinbase/cds-common/visualizations/charts';
import { cx } from '@coinbase/cds-web';
import { css } from '@linaria/core';
import { m as motion, useAnimate } from 'framer-motion';

import { ChartText, type ChartTextProps } from '../text';
import type { ChartTextChildren } from '../text/ChartText';

export const singlePulseTransitionConfig = {
  duration: 1,
  ease: 'easeInOut',
} as const;

export const pulseTransitionConfig = {
  duration: 2,
  repeat: Infinity,
  ease: 'easeInOut',
} as const;

const containerCss = css`
  outline: none;
`;

const innerPointCss = css`
  outline: none;
`;

/**
 * Calculate text alignment props based on position preset.
 */
function calculateLabelAlignment(
  position: PointLabelConfig['position'],
): Pick<ChartTextProps, 'textAnchor' | 'dominantBaseline'> {
  switch (position) {
    case 'top':
      return {
        textAnchor: 'middle',
        dominantBaseline: 'baseline',
      };
    case 'bottom':
      return {
        textAnchor: 'middle',
        dominantBaseline: 'hanging',
      };
    case 'left':
      return {
        textAnchor: 'end',
        dominantBaseline: 'central',
      };
    case 'right':
      return {
        textAnchor: 'start',
        dominantBaseline: 'central',
      };
    case 'center':
    default:
      return {
        textAnchor: 'middle',
        dominantBaseline: 'central',
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
  | 'font'
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
  | 'classNames'
  | 'dominantBaseline'
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
  onClick?: (
    event: React.MouseEvent,
    point: { x: number; y: number; dataX: number; dataY: number },
  ) => void;
  /**
   * Handler for when the scrubber enters this point.
   */
  onScrubberEnter?: (point: { x: number; y: number }) => void;
  /**
   * Color of the outer stroke around the point.
   * @default 'var(--color-bg)'
   */
  stroke?: string;
  /**
   * Outer stroke width of the point.
   * Set to  0 to remove the stroke.
   * @default 2
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
  PointConfig &
  Omit<SVGProps<SVGCircleElement>, 'onClick'> & {
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
     * Custom class names for the component.
     */
    classNames?: {
      /**
       * Custom class name for the point container element.
       */
      container?: string;
      /**
       * Custom class name for the pulse circle element.
       */
      pulseRing?: string;
      /**
       * Custom class name for the inner circle element.
       */
      point?: string;
    };
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
      pulseRing?: React.CSSProperties;
      /**
       * Custom styles for the inner circle element.
       */
      point?: React.CSSProperties;
    };
  };

export const Point = memo(
  forwardRef<PointRef, PointProps>(
    (
      {
        dataX,
        dataY,
        yAxisId,
        color = 'var(--color-fgPrimary)',
        pulse = false,
        radius = 4,
        pulseRadius = 16,
        opacity,
        onClick,
        onScrubberEnter,
        className,
        style,
        classNames,
        styles,
        stroke = 'var(--color-bg)',
        strokeWidth = 2,
        label,
        labelConfig,
        renderLabel,
        testID,
        ...svgProps
      },
      ref,
    ) => {
      const [scope, animate] = useAnimate();
      const { getXScale, getYScale, animate: animationEnabled } = useChartContext();
      const { highlightedIndex } = useScrubberContext();

      const xScale = getXScale();
      const yScale = getYScale(yAxisId);

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
          animate(
            scope.current,
            {
              opacity: [0.1, 0],
            },
            singlePulseTransitionConfig,
          );
        },
      }));

      useEffect(() => {
        if (isScrubberHighlighted && onScrubberEnter) {
          onScrubberEnter({ x: pixelCoordinate.x, y: pixelCoordinate.y });
        }
      }, [isScrubberHighlighted, onScrubberEnter, pixelCoordinate.x, pixelCoordinate.y]);

      const shouldShowPulse = animationEnabled && pulse;

      const containerStyle = {
        ...styles?.container,
        cursor: onClick !== undefined ? 'pointer' : undefined,
      };

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

      const innerPoint = useMemo(() => {
        const mergedStyles = {
          ...style,
          ...styles?.point,
        };

        // interaction animations to scale radius of point
        const variants = {
          hovered: {
            r: radius * 1.2,
          },
          pressed: {
            r: radius * 0.9,
          },
          default: {
            r: radius,
          },
        };

        return (
          <motion.circle
            className={cx(innerPointCss, className, classNames?.point)}
            cx={pixelCoordinate.x}
            cy={pixelCoordinate.y}
            fill={color}
            onClick={
              onClick
                ? (event: any) =>
                    onClick(event, { dataX, dataY, x: pixelCoordinate.x, y: pixelCoordinate.y })
                : undefined
            }
            r={radius}
            stroke={stroke}
            strokeWidth={strokeWidth}
            style={mergedStyles}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            variants={variants}
            whileHover={animationEnabled && onClick ? 'hovered' : 'default'}
            whileTap={animationEnabled && onClick ? 'pressed' : 'default'}
            {...(svgProps as any)}
          />
        );
      }, [
        style,
        styles?.point,
        classNames?.point,
        pixelCoordinate.x,
        pixelCoordinate.y,
        color,
        animationEnabled,
        radius,
        className,
        onClick,
        stroke,
        strokeWidth,
        svgProps,
        dataX,
        dataY,
      ]);

      if (!xScale || !yScale) {
        return null;
      }

      return (
        <>
          <g
            className={cx(containerCss, classNames?.container)}
            data-testid={testID}
            opacity={opacity}
            style={containerStyle}
          >
            {/* pulse ring */}
            <motion.circle
              ref={scope}
              animate={
                shouldShowPulse
                  ? {
                      opacity: [0.1, 0, 0.1],
                      transition: pulseTransitionConfig,
                    }
                  : { opacity: 0 }
              }
              className={classNames?.pulseRing}
              cx={pixelCoordinate.x}
              cy={pixelCoordinate.y}
              fill={color}
              initial={{ opacity: shouldShowPulse ? 0.1 : 0 }}
              r={pulseRadius}
              style={styles?.pulseRing}
            />
            {/* point */}
            {innerPoint}
          </g>
          {/* point label */}
          {LabelContent}
        </>
      );
    },
  ),
);

Point.displayName = 'Point';
