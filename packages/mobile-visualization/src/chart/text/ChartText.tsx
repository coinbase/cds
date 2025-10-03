import React, { memo, useCallback, useEffect, useMemo, useState } from 'react';
import { type LayoutChangeEvent } from 'react-native';
import {
  G,
  Rect as SvgRect,
  Text,
  type TextPathProps,
  type TextProps,
  type TSpanProps,
} from 'react-native-svg';
import type { Rect, SharedProps } from '@coinbase/cds-common/types';
import { useTheme } from '@coinbase/cds-mobile/hooks/useTheme';

import { useCartesianChartContext } from '../ChartProvider';
import { type ChartInset, getChartInset } from '../utils';

type ValidChartTextChildElements =
  | React.ReactElement<TSpanProps, 'TSpan'>
  | React.ReactElement<TextPathProps, 'TextPath'>;

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

export type ChartTextProps = SharedProps &
  Pick<TextProps, 'dx' | 'dy' | 'fontSize' | 'fontWeight' | 'opacity'> & {
    /**
     * The text color.
     * @default theme.color.fgMuted
     */
    color?: string;
    /**
     * The background color of the text's container element.
     * @default 'transparent'
     */
    background?: string;
    // override box responsive style
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
     * Horizontal alignment of the text.
     * @default 'center'
     */
    horizontalAlignment?: TextHorizontalAlignment;
    /**
     * Vertical alignment of the text.
     * @default 'middle'
     */
    verticalAlignment?: TextVerticalAlignment;
    /**
     * When true, disables automatic repositioning to fit within bounds.
     */
    disableRepositioning?: boolean;
    /**
     * Optional bounds rectangle to constrain the text within. If provided, text will be positioned
     * to stay within these bounds. If not provided, defaults to the full chart bounds.
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

/**
 * Maps horizontal alignment to SVG textAnchor.
 * This abstraction allows us to provide a consistent alignment API across web and mobile platforms,
 * hiding the platform-specific SVG property differences.
 */
const getTextAnchor = (alignment: TextHorizontalAlignment): TextProps['textAnchor'] => {
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
 * Maps vertical alignment to SVG alignmentBaseline.
 * This abstraction allows us to provide a consistent alignment API across web and mobile platforms,
 * hiding the platform-specific SVG property differences.
 */
const getAlignmentBaseline = (alignment: TextVerticalAlignment): TextProps['alignmentBaseline'] => {
  switch (alignment) {
    case 'top':
      return 'hanging';
    case 'middle':
      return 'central';
    case 'bottom':
      return 'ideographic';
  }
};

type ChartTextVisibleProps = {
  children: ChartTextChildren;
  background: string;
  textAnchor: TextProps['textAnchor'];
  alignmentBaseline: TextProps['alignmentBaseline'];
  fontSize: TextProps['fontSize'];
  fontWeight: TextProps['fontWeight'];
  textDimensions: Rect;
  fill?: string;
  borderRadius?: number;
  inset?: number | ChartInset;
  dx?: TextProps['dx'];
  dy?: TextProps['dy'];
};

const ChartTextVisible = memo<ChartTextVisibleProps>(
  ({
    children,
    background,
    textAnchor,
    alignmentBaseline,
    fontSize,
    fontWeight,
    fill,
    borderRadius,
    inset: insetInput,
    textDimensions,
    dx,
    dy,
  }) => {
    const theme = useTheme();
    const inset = useMemo(() => getChartInset(insetInput), [insetInput]);

    const rectHeight = useMemo(
      () => textDimensions.height + inset.top + inset.bottom,
      [textDimensions, inset],
    );
    const rectWidth = useMemo(
      () => textDimensions.width + inset.left + inset.right,
      [textDimensions, inset],
    );

    return (
      <G>
        {background !== 'transparent' && (
          <SvgRect
            fill={background}
            height={rectHeight}
            rx={borderRadius}
            ry={borderRadius}
            width={rectWidth}
            x={textDimensions.x - inset.left}
            y={textDimensions.y - inset.top}
          />
        )}
        <Text
          alignmentBaseline={alignmentBaseline}
          dx={dx}
          dy={dy}
          fill={fill ?? theme.color.fgMuted}
          fontSize={fontSize}
          fontWeight={fontWeight}
          textAnchor={textAnchor}
        >
          {children}
        </Text>
      </G>
    );
  },
);

export const ChartText = memo<ChartTextProps>(
  ({
    children,
    x,
    y,
    horizontalAlignment = 'center',
    verticalAlignment = 'middle',
    dx,
    dy,
    disableRepositioning = false,
    bounds,
    testID,
    fontSize = 12,
    fontWeight,
    color,
    background = 'transparent',
    borderRadius,
    inset: insetInput,
    onDimensionsChange,
    opacity = 1,
  }) => {
    const { width: chartWidth, height: chartHeight } = useCartesianChartContext();

    const textAnchor = useMemo(() => getTextAnchor(horizontalAlignment), [horizontalAlignment]);
    const alignmentBaseline = useMemo(
      () => getAlignmentBaseline(verticalAlignment),
      [verticalAlignment],
    );

    const fullChartBounds = useMemo(
      () => ({ x: 0, y: 0, width: chartWidth, height: chartHeight }),
      [chartWidth, chartHeight],
    );

    const [textSize, setTextSize] = useState<Rect | null>(null);

    const textBBox = useMemo(() => {
      if (!textSize) {
        return null;
      }

      return {
        x: x + textSize.x,
        y: y + textSize.y,
        width: textSize.width,
        height: textSize.height,
      };
    }, [x, y, textSize]);

    const isDimensionsReady = disableRepositioning || textBBox !== null;

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

      // X-axis overflow
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

      // Y-axis overflow
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

    const onLayout = useCallback((event: LayoutChangeEvent) => {
      if (event.nativeEvent.layout.width > 0 && event.nativeEvent.layout.height > 0) {
        setTextSize(event.nativeEvent.layout);
      }
    }, []);

    return (
      <G opacity={isDimensionsReady ? opacity : 0}>
        {textSize && (
          <G
            transform={[{ translateX: x + overflowAmount.x }, { translateY: y + overflowAmount.y }]}
          >
            <ChartTextVisible
              alignmentBaseline={alignmentBaseline}
              background={background}
              borderRadius={borderRadius}
              dx={dx}
              dy={dy}
              fill={color}
              fontSize={fontSize}
              fontWeight={fontWeight}
              inset={insetInput}
              textAnchor={textAnchor}
              textDimensions={textSize}
            >
              {children}
            </ChartTextVisible>
          </G>
        )}
        <Text
          alignmentBaseline={alignmentBaseline}
          dx={dx}
          dy={dy}
          fill="transparent"
          fontSize={fontSize}
          fontWeight={fontWeight}
          onLayout={onLayout}
          opacity={0}
          textAnchor={textAnchor}
        >
          {children}
        </Text>
      </G>
    );
  },
);
