import React, { memo, useEffect, useMemo, useRef, useState } from 'react';
import type { ThemeVars } from '@coinbase/cds-common';
import type { ElevationLevels, Rect, SharedProps } from '@coinbase/cds-common/types';
import {
  type ChartPadding,
  getPadding,
} from '@coinbase/cds-common/visualizations/charts';
import { cx, useTheme } from '@coinbase/cds-web';
import { Box, type BoxProps } from '@coinbase/cds-web/layout';
import { Text } from '@coinbase/cds-web/typography';
import { m as motion } from 'framer-motion';

import { useChartContext } from '../ChartProvider';

// Define the valid SVG children for the <text> element.
type ValidChartTextChildElements =
  | React.ReactElement<React.SVGProps<SVGTSpanElement>, 'tspan'>
  | React.ReactElement<React.SVGProps<SVGTextPathElement>, 'textPath'>;

export type ChartTextChildren =
  | string
  | number
  | null
  | undefined
  | ValidChartTextChildElements
  | ValidChartTextChildElements[];

export type ChartTextProps = SharedProps &
  Pick<BoxProps<'g'>, 'font' | 'fontFamily' | 'fontSize' | 'fontWeight' | 'opacity'> &
  Pick<React.SVGProps<SVGTextElement>, 'textAnchor' | 'dominantBaseline'> & {
    /**
     * The text color.
     * @default 'var(--color-fgMuted)'
     */
    color?: string;
    /**
     * The background color of the text's background rectangle.
     * @default 'transparent'
     */
    background?: string;
    /**
     * The desired x offset in SVG pixels.
     */
    dx?: number;
    /**
     * The desired y offset in SVG pixels.
     */
    dy?: number;
    // override box responsive style
    /**
     * The elevation for the background.
     */
    elevation?: ElevationLevels;
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
     * When true, disables automatic repositioning to fit within bounds.
     * @default false
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
     * Padding around the text content for the background rect.
     * Only affects the background, text position remains unchanged.
     */
    padding?: number | ChartPadding;
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
    // override box responsive style
    borderRadius?: ThemeVars.BorderRadius;
  };

export const ChartText = memo<ChartTextProps>(
  ({
    children,
    x,
    y,
    textAnchor = 'middle',
    dominantBaseline = 'central',
    dx,
    dy,
    disableRepositioning = false,
    bounds,
    opacity,
    testID,
    font = 'label2',
    fontFamily,
    fontSize,
    fontWeight,
    elevation,
    color = 'var(--color-fgMuted)',
    background = elevation && elevation > 0 ? 'var(--color-bg)' : 'transparent',
    borderRadius,
    padding: paddingInput,
    onDimensionsChange,
    style,
    styles,
    className,
    classNames,
  }) => {
    const theme = useTheme();
    const { width: chartWidth, height: chartHeight } = useChartContext();
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

      const padding = getPadding(paddingInput);
      return {
        x: textBBox.x - padding.left,
        y: textBBox.y - padding.top,
        width: textBBox.width + padding.left + padding.right,
        height: textBBox.height + padding.top + padding.bottom,
      };
    }, [textBBox, paddingInput]);

    const overflowAmount = useMemo(() => {
      if (disableRepositioning) {
        return { x: 0, y: 0 };
      }

      const parentBounds = bounds ?? fullChartBounds;
      // TODO: it might be more clear to allow chartRect to be null until it has been measured after first render
      if (!textBBox || !parentBounds || parentBounds.width <= 0 || parentBounds.height <= 0) {
        return { x: 0, y: 0 };
      }

      let x = 0;
      let y = 0;

      // X-axis overflow
      if (textBBox.x < parentBounds.x) {
        x = parentBounds.x - textBBox.x; // positive = shift right
      } else if (textBBox.x + textBBox.width > parentBounds.x + parentBounds.width) {
        x = parentBounds.x + parentBounds.width - (textBBox.x + textBBox.width); // negative = shift left
      }

      // Y-axis overflow
      if (textBBox.y < parentBounds.y) {
        y = parentBounds.y - textBBox.y; // positive = shift down
      } else if (textBBox.y + textBBox.height > parentBounds.y + parentBounds.height) {
        y = parentBounds.y + parentBounds.height - (textBBox.y + textBBox.height); // negative = shift up
      }

      return { x, y };
    }, [textBBox, fullChartBounds, bounds, disableRepositioning]);

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

    // send latest calculated dimensions (adjusted for translation) to parent
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
        as="g"
        className={cx(className, classNames?.root)}
        opacity={opacity}
        style={containerStyle}
        testID={testID}
      >
        <motion.g
          animate={{ opacity: isDimensionsReady ? 1 : 0 }}
          transition={{ duration: 0.2, ease: 'easeOut' }}
        >
          <Box
            as="rect"
            className={classNames?.backgroundRect}
            fill={background}
            filter={
              elevation && elevation > 0
                ? `drop-shadow(var(--shadow-elevation${elevation}))`
                : undefined
            }
            height={backgroundRectDimensions?.height}
            rx={borderRadius ? theme.borderRadius[borderRadius] : undefined}
            ry={borderRadius ? theme.borderRadius[borderRadius] : undefined}
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
            {children}
          </Text>
        </motion.g>
      </Box>
    );
  },
);
