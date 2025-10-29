import { memo, useMemo, useState } from 'react';
import type { ThemeVars } from '@coinbase/cds-common/core/theme';
import type { ElevationLevels, Rect, SharedProps } from '@coinbase/cds-common/types';
import { useTheme } from '@coinbase/cds-mobile/hooks/useTheme';
import {
  type Color,
  FontSlant,
  Group,
  Paint,
  Paragraph,
  RoundedRect,
  Shadow,
  Skia,
  TextAlign,
} from '@shopify/react-native-skia';

import { useCartesianChartContext } from '../ChartProvider';
import { type ChartInset, getChartInset } from '../utils';

import { getSkiaFontDescriptor } from './fontMapping';

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
 * Maps horizontal alignment to Skia TextAlign.
 */
const mapHorizontalAlignmentToTextAlign = (alignment: TextHorizontalAlignment): TextAlign => {
  switch (alignment) {
    case 'left':
      return TextAlign.Left;
    case 'center':
      return TextAlign.Center;
    case 'right':
      return TextAlign.Right;
  }
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
  /**
   * Optional font size override for this segment.
   * Overrides the size from font family.
   * @default inherits from font or parent ChartText
   */
  fontSize?: number;
  /**
   * Optional font weight override for this segment.
   * Overrides the weight from font family.
   * @default inherits from font or parent ChartText
   */
  fontWeight?: string;
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
   * Supports plain strings, numbers, and arrays of segments for rich text.
   * Use \n for line breaks.
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
   * Font from theme to use for text rendering.
   * Accepts theme font keys like 'headline', 'body', 'label1', 'label2', etc.
   * @default 'label2'
   * @example
   * <ChartText font="headline">Chart Title</ChartText>
   */
  font?: ThemeVars.Font;
  /**
   * Font size override in pixels.
   * Overrides the size from font family.
   * @example
   * // Use label1 font but with custom size
   * <ChartText font="label1" fontSize={18}>Text</ChartText>
   */
  fontSize?: number;
  /**
   * Font style (normal or italic).
   * @default 'normal'
   * @example
   * <ChartText fontStyle="italic">Italic text</ChartText>
   */
  fontStyle?: 'normal' | 'italic';
  /**
   * Maximum width for text layout in pixels.
   * Text will wrap within this width. Explicit line breaks (\n) are also supported.
   * @default chartWidth (uses full chart width)
   * @example
   * // Constrain text to 150px width
   * <ChartText maxWidth={150}>Long text that wraps</ChartText>
   */
  maxWidth?: number;
  /**
   * Maximum number of lines before truncating with ellipsis.
   * @default undefined (no limit)
   * @example
   * <ChartText maxLines={2} ellipsis="…">
   *   Very long text that will be truncated after 2 lines
   * </ChartText>
   */
  maxLines?: number;
  /**
   * Ellipsis text when truncating due to maxLines.
   * @default '...'
   */
  ellipsis?: string;
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
    fontSize: fontSizeOverride,
    fontStyle: fontStyleOverride,
    maxWidth: maxWidthProp,
    maxLines,
    ellipsis = '...',
    elevation,
    shadowColor: shadowColorProp = 'rgba(0, 0, 0, 0.15)',
    shadowOffset: shadowOffsetProp = { x: 0, y: 2 },
    shadowBlur: shadowBlurProp = 4,
    shadowOpacity: shadowOpacityProp = 1,
  }) => {
    const theme = useTheme();
    const { width: chartWidth, height: chartHeight, fontMgr } = useCartesianChartContext();

    // Default maxWidth to chart width
    const maxWidth = maxWidthProp ?? chartWidth;

    // Compute effective background color based on elevation
    const background = useMemo(() => {
      if (backgroundProp !== undefined) {
        return backgroundProp;
      }
      // Default to theme.color.bg when elevated, transparent otherwise
      return elevation && elevation > 0 ? theme.color.bg : 'transparent';
    }, [backgroundProp, elevation, theme.color.bg]);

    // Get default font descriptor from theme
    const defaultFontDescriptor = useMemo(() => {
      return getSkiaFontDescriptor('Helvetica', theme, fontSizeOverride, fontStyleOverride);
    }, [theme, fontSizeOverride, fontStyleOverride]);

    // Build paragraph with Skia ParagraphBuilder
    const paragraph = useMemo(() => {
      // FontMgr must be loaded before we can build paragraphs
      if (!fontMgr) return null;

      // For positioning, we always use left alignment and position the paragraph manually
      // This gives us consistent behavior with the old Text component
      const paragraphStyle = {
        textAlign: TextAlign.Left,
        ...(maxLines && { maxLines }),
        ...(maxLines && { ellipsis }),
      };

      const builder = Skia.ParagraphBuilder.Make(paragraphStyle, fontMgr!);

      // Check if children is segments array
      const isSegments = Array.isArray(children);

      if (isSegments) {
        // Build rich text with segments
        const textSegments = children as ChartTextSegment[];
        textSegments.forEach((segment) => {
          // Get segment font descriptor (use segment overrides or default)
          const segmentDescriptor = getSkiaFontDescriptor(
            'Helvetica',
            theme,
            segment.fontSize || fontSizeOverride,
            fontStyleOverride,
          );

          builder.pushStyle({
            fontFamilies: ['Helvetica'],
            fontSize: segmentDescriptor.fontSize,
            fontStyle: {
              weight: segment.fontWeight
                ? parseInt(segment.fontWeight, 10)
                : segmentDescriptor.fontWeight,
            },
            color: Skia.Color(color ?? theme.color.fgMuted),
          });
          builder.addText(segment.text);
          builder.pop();
        });
      } else {
        // Build simple text
        const text = children !== null && children !== undefined ? String(children) : '';
        builder.pushStyle({
          fontFamilies: ['Helvetica'],
          fontSize: defaultFontDescriptor.fontSize,
          fontStyle: {
            weight: defaultFontDescriptor.fontWeight,
            slant:
              defaultFontDescriptor.fontStyle === 'italic' ? FontSlant.Italic : FontSlant.Upright,
          },
          color: Skia.Color(color ?? theme.color.fgMuted),
        });
        builder.addText(text);
        builder.pop();
      }

      const para = builder.build();
      para.layout(maxWidth);
      return para;
    }, [
      fontMgr,
      children,
      theme,
      fontSizeOverride,
      fontStyleOverride,
      color,
      maxLines,
      ellipsis,
      maxWidth,
      defaultFontDescriptor,
    ]);

    // Calculate text dimensions from paragraph
    const textDimensions = useMemo(() => {
      if (!paragraph) return { width: 0, height: 0 };
      return {
        width: paragraph.getLongestLine(),
        height: paragraph.getHeight(),
      };
    }, [paragraph]);

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

    // Calculate text position within the background rect
    // Note: Paragraph uses top-left positioning, not baseline like Text
    const textPosition = useMemo(
      () => ({
        x: backgroundRect.x + inset.left,
        // Paragraph y is the top of the text box (not baseline like Text)
        // Center vertically within the background rect
        y:
          backgroundRect.y +
          inset.top +
          (backgroundRectSize.height - inset.top - inset.bottom - textDimensions.height) / 2,
        width: textDimensions.width,
        height: textDimensions.height,
      }),
      [backgroundRect, textDimensions, inset, backgroundRectSize],
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

    // Report dimensions when they change (with epsilon comparison to avoid jitter)
    const EPSILON = 0.5;
    const dimensionsChanged =
      !reportedDimensionsRect ||
      Math.abs(reportedDimensionsRect.x - adjustedBackgroundRect.x) > EPSILON ||
      Math.abs(reportedDimensionsRect.y - adjustedBackgroundRect.y) > EPSILON ||
      Math.abs(reportedDimensionsRect.width - adjustedBackgroundRect.width) > EPSILON ||
      Math.abs(reportedDimensionsRect.height - adjustedBackgroundRect.height) > EPSILON;

    if (dimensionsChanged) {
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

    // Check if we have valid content to render
    const hasValidContent = paragraph && textDimensions.width > 0 && textDimensions.height > 0;

    // Always render a Group so onDimensionsChange is called (needed for collision detection)
    // but make it invisible if content isn't ready
    const finalOpacity = hasValidContent ? opacity : 0;

    return (
      <Group layer={<Paint opacity={finalOpacity} />}>
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
        {/* Render paragraph only when content is valid */}
        {hasValidContent && (
          <Paragraph
            paragraph={paragraph}
            width={maxWidth}
            x={adjustedTextPosition.x}
            y={adjustedTextPosition.y}
          />
        )}
      </Group>
    );
  },
);
