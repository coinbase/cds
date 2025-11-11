import React, { memo, useMemo } from 'react';
import type { SVGProps } from 'react';
import { useHasMounted } from '@coinbase/cds-common/hooks/useHasMounted';
import type { SharedProps } from '@coinbase/cds-common/types';
import { cx } from '@coinbase/cds-web';
import { css } from '@linaria/core';
import { m as motion, type Transition } from 'framer-motion';

import type { ChartTextChildren } from './text/ChartText';
import { useCartesianChartContext } from './ChartProvider';
import { ChartText, type ChartTextProps } from './text';
import { defaultTransition, projectPoint } from './utils';

const containerCss = css`
  outline: none;
`;

const innerPointCss = css`
  border-radius: var(--borderRadius-1000);
  outline: none;

  &:focus {
    outline: none;
  }

  &:focus-visible {
    outline: 2px solid var(--color-fgPrimary);
    outline-offset: 2px;
  }
`;

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
  onClick?: (
    event: React.MouseEvent,
    point: { x: number; y: number; dataX: number; dataY: number },
  ) => void;
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
   * Accessibility label for screen readers to describe the point.
   * If not provided, a default label will be generated using the data coordinates.
   */
  accessibilityLabel?: string;
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
     * Coordinates in SVG pixel space.
     * Overrides dataX and dataY for pixel coordinate calculation.
     */
    pixelCoordinates?: { x: number; y: number };
    /**
     * Override the chart's animation setting for this specific point.
     * When undefined, uses the chart context's animation setting.
     */
    animate?: boolean;
    /**
     * Custom class names for the component.
     */
    classNames?: {
      /**
       * Custom class name for the point container element.
       */
      container?: string;
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
       * Custom styles for the inner circle element.
       */
      point?: React.CSSProperties;
    };
    /**
     * Transition configuration for animation.
     *
     * @example
     * transition={{
     *   type: 'tween',
     *   duration: 0.3,
     *   ease: 'easeInOut'
     * }}
     */
    transition?: Transition;
  };

export const Point = memo<PointProps>(
  ({
    dataX,
    dataY,
    yAxisId,
    fill = 'var(--color-fgPrimary)',
    radius = 5,
    opacity,
    onClick,
    className,
    style,
    classNames,
    styles,
    stroke = 'var(--color-bg)',
    strokeWidth = 2,
    accessibilityLabel,
    label,
    labelProps,
    testID,
    pixelCoordinates,
    animate: animateProp,
    transition,
    ...svgProps
  }) => {
    const {
      getXScale,
      getYScale,
      getXAxis,
      getYAxis,
      animate: animationEnabled,
      drawingArea,
    } = useCartesianChartContext();
    const animate = animateProp ?? animationEnabled;

    const xScale = getXScale();
    const yScale = getYScale(yAxisId);
    const xAxis = getXAxis();
    const yAxis = getYAxis(yAxisId);

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
    }, [xScale, yScale, dataX, dataY, pixelCoordinates]);

    const isWithinDrawingArea = useMemo(() => {
      if (!pixelCoordinate) return false;
      return (
        pixelCoordinate.x >= drawingArea.x &&
        pixelCoordinate.x <= drawingArea.x + drawingArea.width &&
        pixelCoordinate.y >= drawingArea.y &&
        pixelCoordinate.y <= drawingArea.y + drawingArea.height
      );
    }, [pixelCoordinate, drawingArea]);

    const innerPoint = useMemo(() => {
      const mergedStyles = {
        cursor: onClick !== undefined ? 'pointer' : undefined,
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

      const handleKeyDown = onClick
        ? (event: React.KeyboardEvent) => {
            if (event.key === 'Enter' || event.key === ' ') {
              event.preventDefault();
              onClick(event as any, { dataX, dataY, x: pixelCoordinate.x, y: pixelCoordinate.y });
            }
          }
        : undefined;

      if (!animate) {
        return (
          <circle
            aria-label={accessibilityLabel}
            className={cx(innerPointCss, className, classNames?.point)}
            cx={pixelCoordinate.x}
            cy={pixelCoordinate.y}
            fill={fill}
            onClick={
              onClick
                ? (event: any) =>
                    onClick(event, { dataX, dataY, x: pixelCoordinate.x, y: pixelCoordinate.y })
                : undefined
            }
            onKeyDown={handleKeyDown}
            r={radius}
            role={onClick ? 'button' : undefined}
            stroke={stroke}
            strokeWidth={strokeWidth}
            style={mergedStyles}
            tabIndex={onClick ? 0 : -1}
            {...(svgProps as any)}
          />
        );
      }

      return (
        <motion.circle
          animate={{
            cx: pixelCoordinate.x,
            cy: pixelCoordinate.y,
          }}
          aria-label={accessibilityLabel}
          className={cx(innerPointCss, className, classNames?.point)}
          cx={pixelCoordinate.x}
          cy={pixelCoordinate.y}
          fill={fill}
          initial={false}
          onClick={
            onClick
              ? (event: any) =>
                  onClick(event, { dataX, dataY, x: pixelCoordinate.x, y: pixelCoordinate.y })
              : undefined
          }
          onKeyDown={handleKeyDown}
          r={radius}
          role={onClick ? 'button' : undefined}
          stroke={stroke}
          strokeWidth={strokeWidth}
          style={mergedStyles}
          tabIndex={onClick ? 0 : -1}
          transition={transition}
          variants={variants}
          whileHover={onClick ? 'hovered' : 'default'}
          whileTap={onClick ? 'pressed' : 'default'}
          {...(svgProps as any)}
        />
      );
    }, [
      style,
      styles?.point,
      classNames?.point,
      fill,
      animate,
      radius,
      className,
      onClick,
      stroke,
      strokeWidth,
      svgProps,
      dataX,
      dataY,
      pixelCoordinate.x,
      pixelCoordinate.y,
      accessibilityLabel,
      transition,
    ]);

    if (!xScale || !yScale) {
      return;
    }

    return (
      <g opacity={isWithinDrawingArea ? 1 : 0}>
        <g
          className={cx(containerCss, classNames?.container)}
          data-testid={testID}
          opacity={opacity}
          style={styles?.container}
        >
          {innerPoint}
        </g>
        {label && (
          <ChartText x={pixelCoordinate.x} y={pixelCoordinate.y} {...labelProps}>
            {label}
          </ChartText>
        )}
      </g>
    );
  },
);
