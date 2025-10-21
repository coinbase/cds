import React, { memo, useMemo, useState } from 'react';
import { Platform } from 'react-native';
import type { ThemeVars } from '@coinbase/cds-common/core/theme';
import type { ElevationLevels, Rect, SharedProps } from '@coinbase/cds-common/types';
import { useTheme } from '@coinbase/cds-mobile/hooks/useTheme';
import {
  type Color,
  Group,
  matchFont,
  RoundedRect,
  Shadow,
  Text as SkiaText,
} from '@shopify/react-native-skia';

import { useCartesianChartContext } from '../ChartProvider';
import { type ChartInset, getChartInset } from '../utils';
import { calculateTextPosition, useChartFont } from '../utils/skia';

/**
 * Shadow configuration for Skia rendering.
 */
type SkiaShadowConfig = {
  color: string;
  offset: { x: number; y: number };
  blur: number;
  opacity: number;
};

/**
 * Font configurations matching CDS theme (duplicated from useChartFont for use in useMemo)
 */
const FONT_CONFIGS: Record<string, { fontSize: number; fontWeight: string }> = {
  label1: { fontSize: 17, fontWeight: '600' },
  label1Emphasized: { fontSize: 17, fontWeight: '700' },
  label2: { fontSize: 15, fontWeight: '400' },
  body: { fontSize: 17, fontWeight: '400' },
  caption: { fontSize: 13, fontWeight: '400' },
  headline: { fontSize: 20, fontWeight: '600' },
  title1: { fontSize: 28, fontWeight: '700' },
  title2: { fontSize: 22, fontWeight: '600' },
  title3: { fontSize: 20, fontWeight: '600' },
};

/**
 * Get a Skia font for a given font family
 */
const getSkiaFont = (fontFamily?: ThemeVars.FontFamily) => {
  const font = fontFamily ?? 'label2';
  const fontConfig = FONT_CONFIGS[font] ?? FONT_CONFIGS.label2;

  return matchFont({
    fontFamily: Platform.select({ ios: 'Helvetica', default: 'sans-serif' }),
    fontSize: fontConfig.fontSize,
    fontWeight: fontConfig.fontWeight as any,
  });
};

/**
 * Maps elevation levels to Skia-compatible shadow configurations.
 * Based on Material Design elevation guidelines.
 */
const getElevationShadowConfig = (elevation: ElevationLevels): SkiaShadowConfig | null => {
  const configs: Record<ElevationLevels, SkiaShadowConfig | null> = {
    0: null,
    1: {
      color: 'rgba(0, 0, 0, 0.15)',
      offset: { x: 0, y: 2 },
      blur: 4,
      opacity: 1,
    },
    2: {
      color: 'rgba(0, 0, 0, 0.2)',
      offset: { x: 0, y: 4 },
      blur: 8,
      opacity: 1,
    },
  };
  return configs[elevation];
};

/**
 * A text segment with optional styling for rich text support.
 */
export type ChartTextSegment = {
  /**
   * The text content for this segment.
   */
  text: string;
  /**
   * Optional font family for this segment.
   * @default inherits from parent ChartText
   */
  font?: ThemeVars.FontFamily;
};

/**
 * The supported content types for ChartText.
 * Note: Skia only supports simple string/number content, not complex SVG text elements.
 * For rich text with different font weights, use an array of ChartTextSegment.
 */
export type ChartTextChildren = string | number | null | undefined | ChartTextSegment[];

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
   * @default 'transparent' if not elevated, theme.color.bg if elevated
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
   * Horizontal offset in pixels to adjust the final x position.
   * Useful for fine-tuning placement without affecting alignment.
   * @default 0
   */
  xOffset?: number;
  /**
   * Vertical offset in pixels to adjust the final y position.
   * Useful for fine-tuning placement or elevation (similar to dy in SVG).
   * Positive values move the text down, negative values move it up.
   * @default 0
   * @example
   * // Elevate text 10 pixels above its calculated position
   * yOffset={-10}
   */
  yOffset?: number;
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
  /**
   * Elevation level for drop shadow. When set, automatically configures shadow properties.
   * Overrides individual shadow props (shadowColor, shadowOffset, shadowBlur, shadowOpacity).
   * Use this for a simple, consistent elevation API.
   * @default undefined
   * @example
   * // Simple elevation
   * elevation={1}
   */
  elevation?: ElevationLevels;
  /**
   * Color of the drop shadow.
   * Ignored if elevation is set.
   * @default 'rgba(0, 0, 0, 0.15)'
   */
  shadowColor?: string;
  /**
   * Horizontal and vertical offset of the shadow.
   * Ignored if elevation is set.
   * @default { x: 0, y: 2 }
   * @example
   * // Shadow offset 4px down
   * shadowOffset={{ x: 0, y: 4 }}
   */
  shadowOffset?: { x: number; y: number };
  /**
   * Blur radius of the shadow (elevation).
   * Higher values create a more diffused shadow.
   * Ignored if elevation is set.
   * @default 4
   * @example
   * // Strong elevation
   * shadowBlur={8}
   */
  shadowBlur?: number;
  /**
   * Opacity of the shadow.
   * Ignored if elevation is set.
   * @default 1
   */
  shadowOpacity?: number;
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
    xOffset = 0,
    yOffset = 0,
    horizontalAlignment = 'center',
    verticalAlignment = 'middle',
    disableRepositioning = false,
    bounds,
    testID,
    color,
    background: backgroundProp,
    borderRadius = 4,
    inset: insetInput,
    onDimensionsChange,
    opacity = 1,
    font,
    elevation,
    shadowColor: shadowColorProp = 'rgba(0, 0, 0, 0.15)',
    shadowOffset: shadowOffsetProp = { x: 0, y: 2 },
    shadowBlur: shadowBlurProp = 4,
    shadowOpacity: shadowOpacityProp = 1,
  }) => {
    const theme = useTheme();
    const { width: chartWidth, height: chartHeight } = useCartesianChartContext();
    const skiaFont = useChartFont(font);

    // Compute effective background color based on elevation
    const background = useMemo(() => {
      if (backgroundProp !== undefined) {
        return backgroundProp;
      }
      // Default to theme.color.bg when elevated, transparent otherwise
      return elevation && elevation > 0 ? theme.color.bg : 'transparent';
    }, [backgroundProp, elevation, theme.color.bg]);

    // Check if children is segments array
    const isSegments = Array.isArray(children);

    // Convert children to string (for simple text)
    const simpleText = useMemo(() => {
      if (isSegments) return '';
      if (children === null || children === undefined) return '';
      return String(children);
    }, [children, isSegments]);

    // Calculate segment dimensions and fonts
    const segments = useMemo(() => {
      if (!isSegments) return null;

      const textSegments = children as ChartTextSegment[];
      let currentX = 0;

      const segmentsWithDimensions = textSegments.map((segment) => {
        const segmentFont = segment.font ? getSkiaFont(segment.font) : skiaFont;
        const { width } = segmentFont.measureText(segment.text);
        const height = segmentFont.getSize();

        const segmentData = {
          text: segment.text,
          font: segmentFont,
          width,
          height,
          x: currentX,
        };

        currentX += width;
        return segmentData;
      });

      // Segments share the same baseline, matching SVG tspan behavior
      // No vertical offset needed - all text sits on the same baseline
      return segmentsWithDimensions;
    }, [children, isSegments, skiaFont]);

    // Calculate text dimensions
    const textDimensions = useMemo(() => {
      if (segments) {
        const totalWidth = segments.reduce((sum, seg) => sum + seg.width, 0);
        const maxHeight = Math.max(...segments.map((seg) => seg.height));
        return { width: totalWidth, height: maxHeight };
      }

      const { width } = skiaFont.measureText(simpleText);
      const height = skiaFont.getSize();
      return { width, height };
    }, [skiaFont, simpleText, segments]);

    // Calculate background rectangle dimensions with inset
    const inset = useMemo(() => getChartInset(insetInput), [insetInput]);

    const backgroundRectSize = useMemo(
      () => ({
        width: textDimensions.width + inset.left + inset.right,
        height: textDimensions.height + inset.top + inset.bottom,
      }),
      [textDimensions, inset],
    );

    // Calculate background rect position based on alignment
    const backgroundRect = useMemo(() => {
      let rectX = x;
      let rectY = y;

      // Adjust for horizontal alignment
      switch (horizontalAlignment) {
        case 'center':
          rectX = x - backgroundRectSize.width / 2;
          break;
        case 'right':
          rectX = x - backgroundRectSize.width;
          break;
        // 'left' is default, no adjustment needed
      }

      // Adjust for vertical alignment
      switch (verticalAlignment) {
        case 'middle':
          rectY = y - backgroundRectSize.height / 2;
          break;
        case 'bottom':
          rectY = y - backgroundRectSize.height;
          break;
        // 'top' is default, no adjustment needed
      }

      return {
        x: rectX,
        y: rectY,
        width: backgroundRectSize.width,
        height: backgroundRectSize.height,
      };
    }, [x, y, backgroundRectSize, horizontalAlignment, verticalAlignment]);

    // Calculate text position centered within the background rect
    const textPosition = useMemo(
      () => ({
        x: backgroundRect.x + inset.left,
        // For vertical centering: take the center of the background rect and adjust for baseline
        y: backgroundRect.y + backgroundRect.height / 2 + textDimensions.height / 2.5,
        width: textDimensions.width,
        height: textDimensions.height,
      }),
      [backgroundRect, textDimensions, inset.left],
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
        x: backgroundRect.x + overflowAmount.x + xOffset,
        y: backgroundRect.y + overflowAmount.y + yOffset,
        width: backgroundRect.width,
        height: backgroundRect.height,
      }),
      [backgroundRect, overflowAmount, xOffset, yOffset],
    );

    const adjustedTextPosition = useMemo(
      () => ({
        x: textPosition.x + overflowAmount.x + xOffset,
        y: textPosition.y + overflowAmount.y + yOffset,
      }),
      [textPosition, overflowAmount, xOffset, yOffset],
    );

    const [reportedDimensionsRect, setReportedDimensionsRect] = useState<Rect | null>(null);

    if (reportedDimensionsRect !== adjustedBackgroundRect) {
      setReportedDimensionsRect(adjustedBackgroundRect);
      onDimensionsChange?.(adjustedBackgroundRect);
    }

    // Resolve shadow configuration from elevation or individual props
    const shadowConfig = useMemo(() => {
      // Use elevation if provided
      if (elevation !== undefined) {
        return getElevationShadowConfig(elevation);
      }

      // Otherwise use individual shadow props
      return {
        color: shadowColorProp,
        offset: shadowOffsetProp,
        blur: shadowBlurProp,
        opacity: shadowOpacityProp,
      };
    }, [elevation, shadowColorProp, shadowOffsetProp, shadowBlurProp, shadowOpacityProp]);

    // Compute shadow color with opacity baked in
    const computedShadowColor = useMemo(() => {
      if (!shadowConfig) return null;

      const { color: shadowColor, opacity: shadowOpacity } = shadowConfig;

      if (shadowOpacity >= 1) return shadowColor;

      // Parse the color and apply opacity
      // Support both rgba and hex colors
      if (shadowColor.startsWith('rgba')) {
        // Extract rgba values and multiply alpha by shadowOpacity
        const match = shadowColor.match(/rgba\((\d+),\s*(\d+),\s*(\d+),\s*([\d.]+)\)/);
        if (match) {
          const [, r, g, b, a] = match;
          const newAlpha = parseFloat(a) * shadowOpacity;
          return `rgba(${r}, ${g}, ${b}, ${newAlpha})`;
        }
      } else if (shadowColor.startsWith('rgb')) {
        // Convert rgb to rgba with shadowOpacity
        const match = shadowColor.match(/rgb\((\d+),\s*(\d+),\s*(\d+)\)/);
        if (match) {
          const [, r, g, b] = match;
          return `rgba(${r}, ${g}, ${b}, ${shadowOpacity})`;
        }
      }
      // For hex colors or other formats, just use as is
      return shadowColor;
    }, [shadowConfig]);

    // Check if shadow should be rendered
    const shouldRenderShadow =
      background !== 'transparent' &&
      shadowConfig !== null &&
      shadowConfig.blur > 0 &&
      shadowConfig.opacity > 0;

    // Don't render if there's no content
    const hasContent = segments ? segments.length > 0 : simpleText.length > 0;
    if (!hasContent) return null;

    return (
      <Group opacity={opacity}>
        {/* Background rectangle with shadow */}
        {background !== 'transparent' && (
          <RoundedRect
            color={background as Color}
            height={adjustedBackgroundRect.height}
            r={borderRadius}
            width={adjustedBackgroundRect.width}
            x={adjustedBackgroundRect.x}
            y={adjustedBackgroundRect.y}
          >
            {shouldRenderShadow && shadowConfig && computedShadowColor && (
              <Shadow
                blur={shadowConfig.blur}
                color={computedShadowColor}
                dx={shadowConfig.offset.x}
                dy={shadowConfig.offset.y}
              />
            )}
          </RoundedRect>
        )}
        {/* Text - either segments or simple text */}
        {segments ? (
          // Render multiple text segments with different fonts sharing the same baseline
          <>
            {segments.map((segment, index) => (
              <SkiaText
                key={index}
                color={(color ?? theme.color.fgMuted) as Color}
                font={segment.font}
                text={segment.text}
                x={adjustedTextPosition.x + segment.x}
                y={adjustedTextPosition.y}
              />
            ))}
          </>
        ) : (
          // Render simple text
          <SkiaText
            color={(color ?? theme.color.fgMuted) as Color}
            font={skiaFont}
            text={simpleText}
            x={adjustedTextPosition.x}
            y={adjustedTextPosition.y}
          />
        )}
      </Group>
    );
  },
);
