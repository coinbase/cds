import React, { memo, useEffect, useMemo } from 'react';
import type { ThemeVars } from '@coinbase/cds-common/core/theme';
import type { Rect, SharedProps } from '@coinbase/cds-common/types';
import { useTheme } from '@coinbase/cds-mobile/hooks/useTheme';
import { type Color, Group, RoundedRect, Text as SkiaText } from '@shopify/react-native-skia';

import { useCartesianChartContext } from '../ChartProvider';
import { type ChartInset, getChartInset } from '../utils';
import { calculateTextPosition, useChartFont } from '../utils/skia';

/**
 * The supported content types for ChartText.
 * Note: Skia only supports simple string/number content, not complex SVG text elements.
 */
export type ChartTextChildren = string | number | null | undefined;

/**
 * Horizontal alignment options for chart text.
 */
export type TextHorizontalAlignment = 'left' | 'center' | 'right';

/**
 * Vertical alignment options for chart text.
 */
export type TextVerticalAlignment = 'top' | 'middle' | 'bottom';

export type ChartTextProps = SharedProps & {
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
  /**
   * The text content to display.
   */
  children: ChartTextChildren;
  /**
   * The desired x position in pixels.
   * @note Text will be automatically positioned to fit within bounds unless `disableRepositioning` is true.
   */
  x: number;
  /**
   * The desired y position in pixels.
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
  /**
   * Font family from theme to use for text rendering.
   * @default 'label2'
   */
  font?: ThemeVars.FontFamily;
  /**
   * Opacity of the text and background.
   * @default 1
   */
  opacity?: number;
};

/**
 * Maps horizontal alignment to Skia text alignment.
 */
const mapHorizontalAlignment = (alignment: TextHorizontalAlignment): 'start' | 'center' | 'end' => {
  switch (alignment) {
    case 'left':
      return 'start';
    case 'center':
      return 'center';
    case 'right':
      return 'end';
  }
};

/**
 * Maps vertical alignment to Skia text alignment.
 */
const mapVerticalAlignment = (alignment: TextVerticalAlignment): 'top' | 'middle' | 'bottom' => {
  return alignment;
};

export const ChartText = memo<ChartTextProps>(
  ({
    children,
    x,
    y,
    horizontalAlignment = 'center',
    verticalAlignment = 'middle',
    disableRepositioning = false,
    bounds,
    testID,
    color,
    background = 'transparent',
    borderRadius = 4,
    inset: insetInput,
    onDimensionsChange,
    opacity = 1,
    font,
  }) => {
    const theme = useTheme();
    const { width: chartWidth, height: chartHeight } = useCartesianChartContext();
    const skiaFont = useChartFont(font);

    // Convert children to string
    const text = useMemo(() => {
      if (children === null || children === undefined) return '';
      return String(children);
    }, [children]);

    // Calculate text position and dimensions using Skia font measurement
    const textPosition = useMemo(() => {
      return calculateTextPosition(x, y, skiaFont, text, {
        horizontalAlign: mapHorizontalAlignment(horizontalAlignment),
        verticalAlign: mapVerticalAlignment(verticalAlignment),
      });
    }, [x, y, skiaFont, text, horizontalAlignment, verticalAlignment]);

    // Calculate background rectangle dimensions with inset
    const inset = useMemo(() => getChartInset(insetInput), [insetInput]);

    const backgroundRect = useMemo(
      () => ({
        x: textPosition.x - inset.left,
        y: textPosition.y - inset.top,
        width: textPosition.width + inset.left + inset.right,
        height: textPosition.height + inset.top + inset.bottom,
      }),
      [textPosition, inset],
    );

    // Calculate overflow and repositioning
    const fullChartBounds = useMemo(
      () => ({ x: 0, y: 0, width: chartWidth, height: chartHeight }),
      [chartWidth, chartHeight],
    );

    const overflowAmount = useMemo(() => {
      if (disableRepositioning) {
        return { x: 0, y: 0 };
      }

      const parentBounds = bounds ?? fullChartBounds;
      if (!parentBounds || parentBounds.width <= 0 || parentBounds.height <= 0) {
        return { x: 0, y: 0 };
      }

      let offsetX = 0;
      let offsetY = 0;

      // X-axis overflow
      if (backgroundRect.x < parentBounds.x) {
        offsetX = parentBounds.x - backgroundRect.x;
      } else if (backgroundRect.x + backgroundRect.width > parentBounds.x + parentBounds.width) {
        offsetX = parentBounds.x + parentBounds.width - (backgroundRect.x + backgroundRect.width);
      }

      // Y-axis overflow
      if (backgroundRect.y < parentBounds.y) {
        offsetY = parentBounds.y - backgroundRect.y;
      } else if (backgroundRect.y + backgroundRect.height > parentBounds.y + parentBounds.height) {
        offsetY = parentBounds.y + parentBounds.height - (backgroundRect.y + backgroundRect.height);
      }

      return { x: offsetX, y: offsetY };
    }, [backgroundRect, fullChartBounds, bounds, disableRepositioning]);

    // Final adjusted positions
    const adjustedBackgroundRect = useMemo(
      () => ({
        x: backgroundRect.x + overflowAmount.x,
        y: backgroundRect.y + overflowAmount.y,
        width: backgroundRect.width,
        height: backgroundRect.height,
      }),
      [backgroundRect, overflowAmount],
    );

    const adjustedTextPosition = useMemo(
      () => ({
        x: textPosition.x + overflowAmount.x,
        y: textPosition.y + overflowAmount.y,
      }),
      [textPosition, overflowAmount],
    );

    // Report dimensions
    useEffect(() => {
      if (onDimensionsChange) {
        onDimensionsChange(adjustedBackgroundRect);
      }
    }, [adjustedBackgroundRect, onDimensionsChange]);

    if (!text) return null;

    return (
      <Group opacity={opacity}>
        {/* Background rectangle */}
        {background !== 'transparent' && (
          <RoundedRect
            color={background as Color}
            height={adjustedBackgroundRect.height}
            r={borderRadius}
            width={adjustedBackgroundRect.width}
            x={adjustedBackgroundRect.x}
            y={adjustedBackgroundRect.y}
          />
        )}
        {/* Text */}
        <SkiaText
          color={(color ?? theme.color.fgMuted) as Color}
          font={skiaFont}
          text={text}
          x={adjustedTextPosition.x}
          y={adjustedTextPosition.y}
        />
      </Group>
    );
  },
);
