import React, { memo, useEffect, useMemo, useRef, useState } from 'react';
import type { Rect, SharedProps } from '@coinbase/cds-common/types';
import { cx } from '@coinbase/cds-web';
import { Box, type BoxProps } from '@coinbase/cds-web/layout';
import { Text } from '@coinbase/cds-web/typography';
import { m as motion } from 'framer-motion';

import { useCartesianChartContext } from '../ChartProvider';
import { type ChartInset, getChartInset } from '../utils';
import { accessoryFadeTransitionDuration } from '../utils/transition';

type ValidChartTextChildElements =
  | React.ReactElement<React.SVGProps<SVGTSpanElement>, 'tspan'>
  | React.ReactElement<React.SVGProps<SVGTextPathElement>, 'textPath'>;

/**
 * The supported content types for ChartText.
 */
export type ChartTextChildren =
  | string
  | number
  | null
  | undefined
  | ValidChartTextChildElements
  | ValidChartTextChildElements[];

/**
 * Horizontal alignment options for chart text.
 */
export type TextHorizontalAlignment = 'left' | 'center' | 'right';

/**
 * Vertical alignment options for chart text.
 */
export type TextVerticalAlignment = 'top' | 'middle' | 'bottom';

export type ChartTextBaseProps = SharedProps & {
  /**
   * The text color.
   * @default 'var(--color-fgMuted)'
   */
  color?: string;
  /**
   * The background color of the text's background rectangle.
   * @default 'var(--color-bg)' if elevated, otherwise 'transparent'
   */
  background?: string;
  /**
   * Whether the text should have an elevated appearance with a shadow.
   * @default false
   */
  elevated?: boolean;
  /**
   * When true, disables automatic repositioning to fit within bounds.
   */
  disableRepositioning?: boolean;
  /**
   * Optional bounds rectangle to constrain the text within. If provided, text will be positioned
   * to stay within these bounds. Defaults to the full chart bounds when not provided.
   */
  bounds?: Rect;
  /**
   * Callback fired when text dimensions change.
   * Used for collision detection and smart positioning.
   * Returns the adjusted position and dimensions.
   */
  onDimensionsChange?: (rect: Rect) => void;
  /**
   * Inset around the text content for the background rect.
   * Only affects the background, text position remains unchanged.
   */
  inset?: number | ChartInset;
  /**
   * Border radius for the background rectangle.
   * @default 4
   */
  borderRadius?: number;
};

export type ChartTextProps = ChartTextBaseProps &
  Pick<BoxProps<'g'>, 'font' | 'fontFamily' | 'fontSize' | 'fontWeight' | 'opacity'> & {
    /**
     * The desired x offset in SVG pixels.
     */
    dx?: number;
    /**
     * The desired y offset in SVG pixels.
     */
    dy?: number;
    /**
     * The text content to display.
     */
    children: ChartTextChildren;
    /**
     * The desired x position in SVG pixels.
     * @note Text will be automatically positioned to fit within bounds unless `disableRepositioning` is true.
     */
    x: number;
    /**
     * The desired y position in SVG pixels.
     * @note Text will be automatically positioned to fit within bounds unless `disableRepositioning` is true.
     */
    y: number;
    /**
     * Horizontal alignment of the component.
     * @default 'center'
     */
    horizontalAlignment?: TextHorizontalAlignment;
    /**
     * Vertical alignment of the component.
     * @default 'middle'
     */
    verticalAlignment?: TextVerticalAlignment;
    style?: React.CSSProperties;
    styles?: {
      root?: React.CSSProperties;
      text?: React.CSSProperties;
      backgroundRect?: React.CSSProperties;
    };
    className?: string;
    classNames?: {
      root?: string;
      text?: string;
      backgroundRect?: string;
    };
  };

/**
 * Get text anchor based on horizontal alignment.
 */
const getTextAnchor = (
  alignment: TextHorizontalAlignment,
): React.SVGProps<SVGTextElement>['textAnchor'] => {
  switch (alignment) {
    case 'left':
      return 'start';
    case 'center':
      return 'middle';
    case 'right':
      return 'end';
  }
};

/**
 * Get dominant baseline based on vertical alignment.
 */
const getDominantBaseline = (
  alignment: TextVerticalAlignment,
): React.SVGProps<SVGTextElement>['dominantBaseline'] => {
  switch (alignment) {
    case 'top':
      return 'hanging';
    case 'middle':
      return 'central';
    case 'bottom':
      return 'ideographic';
  }
};

export const ChartText = memo<ChartTextProps>(
  ({
    children,
    x,
    y,
    horizontalAlignment = 'center',
    verticalAlignment = 'middle',
    dx,
    dy,
    disableRepositioning,
    bounds,
    opacity,
    testID,
    font = 'label2',
    fontFamily,
    fontSize,
    fontWeight,
    elevated,
    color = 'var(--color-fgMuted)',
    background = elevated ? 'var(--color-bg)' : 'transparent',
    borderRadius,
    inset: insetInput,
    onDimensionsChange,
    style,
    styles,
    className,
    classNames,
  }) => {
    const { animate, width: chartWidth, height: chartHeight } = useCartesianChartContext();
    const fullChartBounds = useMemo(
      () => ({ x: 0, y: 0, width: chartWidth, height: chartHeight }),
      [chartWidth, chartHeight],
    );

    const textRef = useRef<SVGTextElement | null>(null);
    const [textBBox, setTextBBox] = useState<Rect | null>(null);
    const isDimensionsReady = disableRepositioning || textRef.current !== null;

    const backgroundRectDimensions = useMemo(() => {
      if (!textBBox) {
        return null;
      }

      const inset = getChartInset(insetInput);
      return {
        x: textBBox.x - inset.left,
        y: textBBox.y - inset.top,
        width: textBBox.width + inset.left + inset.right,
        height: textBBox.height + inset.top + inset.bottom,
      };
    }, [textBBox, insetInput]);

    const overflowAmount = useMemo(() => {
      if (disableRepositioning) {
        return { x: 0, y: 0 };
      }

      const parentBounds = bounds ?? fullChartBounds;
      if (
        !backgroundRectDimensions ||
        !parentBounds ||
        parentBounds.width <= 0 ||
        parentBounds.height <= 0
      ) {
        return { x: 0, y: 0 };
      }

      let x = 0;
      let y = 0;

      if (backgroundRectDimensions.x < parentBounds.x) {
        x = parentBounds.x - backgroundRectDimensions.x; // positive = shift right
      } else if (
        backgroundRectDimensions.x + backgroundRectDimensions.width >
        parentBounds.x + parentBounds.width
      ) {
        x =
          parentBounds.x +
          parentBounds.width -
          (backgroundRectDimensions.x + backgroundRectDimensions.width); // negative = shift left
      }

      if (backgroundRectDimensions.y < parentBounds.y) {
        y = parentBounds.y - backgroundRectDimensions.y; // positive = shift down
      } else if (
        backgroundRectDimensions.y + backgroundRectDimensions.height >
        parentBounds.y + parentBounds.height
      ) {
        y =
          parentBounds.y +
          parentBounds.height -
          (backgroundRectDimensions.y + backgroundRectDimensions.height); // negative = shift up
      }

      return { x, y };
    }, [backgroundRectDimensions, fullChartBounds, bounds, disableRepositioning]);

    // Compose the final reported rect including any overflow translation applied
    const reportedRect = useMemo(() => {
      if (!backgroundRectDimensions) return null;
      return {
        x: backgroundRectDimensions.x + overflowAmount.x,
        y: backgroundRectDimensions.y + overflowAmount.y,
        width: backgroundRectDimensions.width,
        height: backgroundRectDimensions.height,
      };
    }, [backgroundRectDimensions, overflowAmount.x, overflowAmount.y]);

    useEffect(() => {
      if (onDimensionsChange && reportedRect !== null) {
        onDimensionsChange(reportedRect);
      }
    }, [reportedRect, onDimensionsChange]);

    useEffect(() => {
      if (textRef.current) {
        const observer = new ResizeObserver((entries) => {
          for (const entry of entries) {
            setTextBBox((entry.target as SVGTextElement).getBBox());
          }
        });

        observer.observe(textRef.current);

        // Cleanup function
        return () => {
          observer.disconnect();
        };
      }
    }, []);

    const textAnchor = useMemo(() => getTextAnchor(horizontalAlignment), [horizontalAlignment]);
    const dominantBaseline = useMemo(
      () => getDominantBaseline(verticalAlignment),
      [verticalAlignment],
    );

    // forces state update the bounding box when any properties that can affect the bounding box change
    useEffect(() => {
      if (textRef.current) {
        setTextBBox(textRef.current.getBBox());
      }
    }, [textAnchor, dominantBaseline, dx, dy, x, y]);

    const containerStyle = useMemo(
      () => ({
        ...style,
        ...styles?.root,
        transform: `translate(${overflowAmount.x}px, ${overflowAmount.y}px)`,
      }),
      [overflowAmount.x, overflowAmount.y, style, styles?.root],
    );

    return (
      <Box
        aria-hidden="true"
        as="g"
        className={cx(className, classNames?.root)}
        opacity={opacity}
        style={containerStyle}
        testID={testID}
      >
        <motion.g
          animate={{ opacity: isDimensionsReady ? 1 : 0 }}
          transition={
            animate ? { duration: accessoryFadeTransitionDuration, ease: 'easeOut' } : undefined
          }
        >
          <Box
            as="rect"
            className={classNames?.backgroundRect}
            fill={background}
            filter={elevated ? 'drop-shadow(var(--shadow-elevation1))' : undefined}
            height={backgroundRectDimensions?.height}
            rx={borderRadius}
            ry={borderRadius}
            style={styles?.backgroundRect}
            width={backgroundRectDimensions?.width}
            x={backgroundRectDimensions?.x}
            y={backgroundRectDimensions?.y}
          />
          <Text
            ref={textRef}
            as="text"
            className={classNames?.text}
            dominantBaseline={dominantBaseline}
            dx={dx}
            dy={dy}
            fill={color}
            font={font}
            fontFamily={fontFamily}
            fontSize={fontSize}
            fontWeight={fontWeight}
            style={styles?.text}
            textAnchor={textAnchor}
            x={x}
            y={y}
          >
            <tspan>{children}</tspan>
          </Text>
        </motion.g>
      </Box>
    );
  },
);
