import React, { type ComponentType, memo, type SVGProps, useMemo } from 'react';
import type { SharedProps } from '@coinbase/cds-common/types';
import { cx } from '@coinbase/cds-web';
import { css } from '@linaria/core';
import { m as motion, type Transition } from 'framer-motion';

import { useCartesianChartContext } from '../ChartProvider';
import type { ChartTextChildren } from '../text/ChartText';
import { type PointLabelPosition, projectPoint } from '../utils';

import { DefaultPointLabel } from './DefaultPointLabel';

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
  /**
   * Fill for the point
   */
  fill: string;
};

/**
 * Props for point label components.
 */
export type PointLabelProps = RenderPointsParams & {
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

export type PointLabelComponent = React.FC<PointLabelProps>;

/**
 * Shared configuration for point appearance and behavior.
 * Used by line-associated points rendered via Line/LineChart components.
 */
export type PointConfig = {
  /**
   * The fill color of the point.
   * @default 'var(--color-fgPrimary)'
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
   * If provided, a label component will be automatically rendered.
   */
  label?: ChartTextChildren;
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
};

export type PointBaseProps = SharedProps &
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
     * When set, overrides the chart's animation setting for this specific point.
     */
    animate?: boolean;
  };

export type PointProps = PointBaseProps &
  Omit<
    SVGProps<SVGCircleElement>,
    | 'onClick'
    | 'onAnimationStart'
    | 'onAnimationEnd'
    | 'onAnimationIteration'
    | 'onAnimationStartCapture'
    | 'onAnimationEndCapture'
    | 'onAnimationIterationCapture'
    | 'onDrag'
    | 'onDragEnd'
    | 'onDragStart'
    | 'onDragCapture'
    | 'onDragEndCapture'
    | 'onDragStartCapture'
    | 'cx'
    | 'cy'
    | 'r'
    | 'fill'
    | 'stroke'
    | 'strokeWidth'
    | 'opacity'
    | 'className'
    | 'style'
    | 'aria-label'
    | 'role'
    | 'tabIndex'
    | 'onKeyDown'
  > & {
    /**
     * Custom class names for the component.
     */
    classNames?: {
      /**
       * Custom class name for the point root element.
       */
      root?: string;
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
       * Custom styles for the point root element.
       */
      root?: React.CSSProperties;
      /**
       * Custom styles for the inner circle element.
       */
      point?: React.CSSProperties;
    };
    /**
     * Transition configuration for animation.
     * @default defaultTransition
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
    LabelComponent = DefaultPointLabel,
    labelPosition = 'center',
    labelOffset = radius * 2,
    testID,
    animate: animateProp,
    transition,
    ...svgProps
  }) => {
    const {
      getXScale,
      getYScale,
      animate: animationEnabled,
      drawingArea,
    } = useCartesianChartContext();
    const animate = animateProp ?? animationEnabled;

    const xScale = getXScale();
    const yScale = getYScale(yAxisId);

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
            {...svgProps}
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
          {...svgProps}
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
          className={cx(containerCss, classNames?.root)}
          data-testid={testID}
          opacity={opacity}
          style={styles?.root}
        >
          {innerPoint}
        </g>
        {label && (
          <LabelComponent
            dataX={dataX}
            dataY={dataY}
            fill={fill}
            offset={labelOffset}
            position={labelPosition}
            x={pixelCoordinate.x}
            y={pixelCoordinate.y}
          >
            {label}
          </LabelComponent>
        )}
      </g>
    );
  },
);
