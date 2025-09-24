import React, { forwardRef, memo, useEffect, useImperativeHandle, useMemo, useState } from 'react';
import type { SVGProps } from 'react';
import type { SharedProps } from '@coinbase/cds-common/types';
import { projectPoint, useChartContext } from '@coinbase/cds-common/visualizations/charts';
import { cx } from '@coinbase/cds-web';
import { css } from '@linaria/core';
import { m as motion, useAnimate } from 'framer-motion';

import { useScrubberContext } from '../Chart';
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
       * Custom class name for the ring between the inner circle and the pulse ring elements.
       */
      outerRing?: string;
      /**
       * Custom class name for the inner circle element.
       */
      innerPoint?: string;
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
       * Custom styles for the ring between the inner circle and the pulse ring elements.
       */
      outerRing?: React.CSSProperties;
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
        color = 'var(--color-fgPrimary)',
        radius = 4,
        pulseRadius = 15,
        pulse = false,
        opacity,
        onClick,
        onScrubberEnter,
        hoverEffect = onClick ? 'scale' : 'none',
        className,
        style,
        classNames,
        styles,
        stroke,
        strokeWidth,
        label,
        labelConfig,
        renderLabel,
        testID,
        ...svgProps
      },
      ref,
    ) => {
      const [scope, animate] = useAnimate();
      const { getXScale, getYScale, animate: animateContext } = useChartContext();
      const { highlightedIndex } = useScrubberContext();
      const [isHovered, setIsHovered] = useState(false);

      const xScale = getXScale(xAxisId);
      const yScale = getYScale(yAxisId);

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

      const effectiveHover = isScrubbing ? isScrubberHighlighted : isHovered;

      const shouldShowPulse =
        animateContext && (pulse || (hoverEffect === 'pulse' && effectiveHover));

      const containerStyle = {
        ...styles?.container,
        cursor: isInteractive ? 'pointer' : undefined,
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
        const innerPointStyles = {
          ...style,
          ...styles?.innerPoint,
        };

        return hoverEffect === 'scale' && animateContext ? (
          <motion.circle
            animate={
              effectiveHover
                ? {
                    r: radius * 1.2,
                  }
                : {
                    r: radius,
                  }
            }
            className={cx(className, classNames?.innerPoint)}
            cx={pixelCoordinate.x}
            cy={pixelCoordinate.y}
            fill={color}
            onClick={
              onClick
                ? (event: any) =>
                    onClick(event, { dataX, dataY, x: pixelCoordinate.x, y: pixelCoordinate.y })
                : undefined
            }
            onMouseEnter={!isScrubbing ? () => setIsHovered(true) : undefined}
            onMouseLeave={!isScrubbing ? () => setIsHovered(false) : undefined}
            r={radius}
            stroke={stroke}
            strokeWidth={strokeWidth}
            style={innerPointStyles}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            {...(svgProps as any)}
          />
        ) : (
          <circle
            className={cx(className, classNames?.innerPoint)}
            cx={pixelCoordinate.x}
            cy={pixelCoordinate.y}
            fill={color}
            onClick={
              onClick
                ? (event) =>
                    onClick(event, { dataX, dataY, x: pixelCoordinate.x, y: pixelCoordinate.y })
                : undefined
            }
            onMouseEnter={!isScrubbing ? () => setIsHovered(true) : undefined}
            onMouseLeave={!isScrubbing ? () => setIsHovered(false) : undefined}
            r={radius}
            stroke={stroke}
            strokeWidth={strokeWidth}
            style={innerPointStyles}
            {...svgProps}
          />
        );
      }, [
        style,
        styles?.innerPoint,
        classNames?.innerPoint,
        pixelCoordinate.x,
        pixelCoordinate.y,
        color,
        hoverEffect,
        animateContext,
        effectiveHover,
        radius,
        className,
        onClick,
        isScrubbing,
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
          <motion.g
            className={cx(containerCss, classNames?.container)}
            data-testid={testID}
            opacity={opacity}
            style={containerStyle}
            whileTap={animateContext ? { scale: 0.9 } : undefined}
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
            {/* outer ring */}
            <circle
              className={classNames?.outerRing}
              cx={pixelCoordinate.x}
              cy={pixelCoordinate.y}
              fill={color}
              opacity={0.15}
              r={(radius + pulseRadius) / 2}
              style={styles?.outerRing}
            />
            {/* inner point */}
            {innerPoint}
          </motion.g>
          {/* point label */}
          {LabelContent}
        </>
      );
    },
  ),
);

Point.displayName = 'Point';
