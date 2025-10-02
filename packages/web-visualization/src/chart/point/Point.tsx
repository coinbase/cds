import React, { memo, useEffect, useMemo } from 'react';
import type { SVGProps } from 'react';
import type { SharedProps } from '@coinbase/cds-common/types';
import { projectPoint, useScrubberContext } from '@coinbase/cds-common/visualizations/charts';
import { cx } from '@coinbase/cds-web';
import { css } from '@linaria/core';
import { m as motion } from 'framer-motion';

import { useCartesianChartContext } from '../ChartProvider';
import { ChartText, type ChartTextProps } from '../text';
import type { ChartTextChildren } from '../text/ChartText';

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
  | 'inset'
  | 'background'
  | 'borderRadius'
  | 'disableRepositioning'
  | 'bounds'
  | 'styles'
  | 'classNames'
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
  };

export const Point = memo<PointProps>(
  ({
    dataX,
    dataY,
    yAxisId,
    color = 'var(--color-fgPrimary)',
    radius = 4,
    opacity,
    onClick,
    onScrubberEnter,
    className,
    style,
    classNames,
    styles,
    stroke = 'var(--color-bg)',
    strokeWidth = 2,
    accessibilityLabel,
    label,
    labelConfig,
    renderLabel,
    testID,
    pixelCoordinates,
    animate,
    ...svgProps
  }) => {
    const { getXScale, getYScale, animate: animationEnabled } = useCartesianChartContext();
    const { scrubberPosition } = useScrubberContext();

    const xScale = getXScale();
    const yScale = getYScale(yAxisId);

    const isScrubberHighlighted = scrubberPosition !== undefined && scrubberPosition === dataX;

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

      // Use the animate prop if provided, otherwise fall back to chart context
      const shouldAnimateInteractions = animate ?? animationEnabled;
      const shouldAnimatePosition = animate ?? animationEnabled;

      return (
        <motion.circle
          animate={
            shouldAnimatePosition
              ? {
                  cx: pixelCoordinate.x,
                  cy: pixelCoordinate.y,
                }
              : undefined
          }
          aria-label={accessibilityLabel}
          className={cx(innerPointCss, className, classNames?.point)}
          cx={pixelCoordinate.x}
          cy={pixelCoordinate.y}
          fill={color}
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
          transition={{ duration: 0.3, ease: 'easeInOut' }}
          variants={variants}
          whileHover={shouldAnimateInteractions && onClick ? 'hovered' : 'default'}
          whileTap={shouldAnimateInteractions && onClick ? 'pressed' : 'default'}
          {...(svgProps as any)}
        />
      );
    }, [
      style,
      styles?.point,
      classNames?.point,
      color,
      animate,
      animationEnabled,
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
          style={styles?.container}
        >
          {innerPoint}
        </g>
        {LabelContent}
      </>
    );
  },
);
