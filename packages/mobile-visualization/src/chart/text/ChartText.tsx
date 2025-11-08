import React, { memo, useEffect, useMemo } from 'react';
import { useDerivedValue } from 'react-native-reanimated';
import type { ThemeVars } from '@coinbase/cds-common/core/theme';
import type { ElevationLevels, Rect, SharedProps } from '@coinbase/cds-common/types';
import { useTheme } from '@coinbase/cds-mobile/hooks/useTheme';
import {
  type AnimatedProp,
  type Color,
  FontSlant,
  type FontWeight,
  Group,
  Paint,
  Paragraph,
  RoundedRect,
  Shadow,
  Skia,
  TextAlign,
} from '@shopify/react-native-skia';

import { useCartesianChartContext } from '../ChartProvider';
import { type ChartInset, getChartInset, unwrapAnimatedValue } from '../utils';

/**
 * Default font family for chart text rendering.
 * Uses system font that works across platforms.
 */
const DEFAULT_CHART_FONT_FAMILY = 'Inter';

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
 * Props for ChartTextSpan - used for inline text styling within ChartText.
 */
export type ChartTextSpanProps = {
  /**
   * The text content or nested spans.
   */
  children: React.ReactNode;
  /**
   * Font from theme to use for this span.
   * @default inherits from parent
   */
  font?: ThemeVars.Font;
  /**
   * Font size override for this span.
   * @default inherits from parent
   */
  fontSize?: number;
  /**
   * Font weight override for this span.
   * @default inherits from parent
   */
  fontWeight?: FontWeight;
  /**
   * Font style for this span.
   * @default inherits from parent
   */
  fontStyle?: FontSlant;
};

/**
 * ChartTextSpan - A lightweight component for inline text styling.
 * Must be used as a child of ChartText.
 *
 * @example
 * <ChartText x={100} y={100}>
 *   Regular text <ChartTextSpan fontWeight="700">bold text</ChartTextSpan> more text
 * </ChartText>
 */
export const ChartTextSpan = (_props: ChartTextSpanProps) => {
  // This is a marker component - it doesn't render anything itself
  // ChartText will process it during paragraph building
  return null;
};

/**
 * Internal: A text segment extracted from the children tree.
 */
type TextSegment = {
  text: string;
  font: ThemeVars.Font;
  fontSize: number;
  fontWeight: number;
  fontStyle: FontSlant;
};

/**
 * The supported content types for ChartText.
 */
export type ChartTextChildren = React.ReactNode;

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
  x: AnimatedProp<number>;
  /**
   * The desired y position in pixels.
   * @note Text will be automatically positioned to fit within bounds unless `disableRepositioning` is true.
   */
  y: AnimatedProp<number>;
  /**
   * Horizontal offset in pixels to adjust the final x position.
   * Useful for fine-tuning placement without affecting alignment.
   * @default 0
   */
  xOffset?: AnimatedProp<number>;
  /**
   * Vertical offset in pixels to adjust the final y position.
   * Useful for fine-tuning placement or elevation (similar to dy in SVG).
   * Positive values move the text down, negative values move it up.
   * @default 0
   * @example
   * // Elevate text 10 pixels above its calculated position
   * yOffset={-10}
   */
  yOffset?: AnimatedProp<number>;
  /**
   * Horizontal alignment of the text.
   * @default 'center'
   */
  horizontalAlignment?: AnimatedProp<TextHorizontalAlignment>;
  /**
   * Vertical alignment of the text.
   * @default 'middle'
   */
  verticalAlignment?: AnimatedProp<TextVerticalAlignment>;
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
   * This sets both fontSize and fontWeight from the theme.
   * @default 'label2'
   * @example
   * <ChartText font="headline">Chart Title</ChartText>
   */
  font?: ThemeVars.Font;
  /**
   * Font size override in pixels.
   * Overrides the size from the font prop.
   * @example
   * // Use label1 font weight but with custom size
   * <ChartText font="label1" fontSize={18}>Text</ChartText>
   */
  fontSize?: number;
  /**
   * Font weight override.
   * Overrides the weight from the font prop.
   * @example
   * <ChartText font="label1" fontWeight="700">Bold text</ChartText>
   */
  fontWeight?: FontWeight;
  /**
   * Font style (normal or italic).
   * @default FontSlant.Upright
   * @example
   * <ChartText fontStyle={FontSlant.Italic}>Italic text</ChartText>
   */
  fontStyle?: FontSlant;
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
 * Recursively extracts text segments from React children tree.
 * Processes ChartTextSpan components and plain text nodes.
 */
const extractTextSegments = (
  children: React.ReactNode,
  parentFont: ThemeVars.Font,
  parentFontSize: number,
  parentFontWeight: number,
  parentFontStyle: FontSlant,
  theme: any,
): TextSegment[] => {
  const segments: TextSegment[] = [];

  React.Children.forEach(children, (child) => {
    if (child === null || child === undefined) {
      return;
    }

    // Handle plain text or numbers
    if (typeof child === 'string' || typeof child === 'number') {
      const text = String(child);
      if (text.length > 0) {
        segments.push({
          text,
          font: parentFont,
          fontSize: parentFontSize,
          fontWeight: parentFontWeight,
          fontStyle: parentFontStyle,
        });
      }
      return;
    }

    // Handle React elements (ChartTextSpan)
    if (React.isValidElement(child)) {
      const props = child.props as ChartTextSpanProps;

      // Get effective styling for this span
      const spanFont = props.font ?? parentFont;
      const spanFontSize = props.fontSize ?? theme.fontSize[spanFont] ?? parentFontSize;
      const spanFontWeight =
        props.fontWeight ?? parseInt(String(theme.fontWeight[spanFont] ?? parentFontWeight), 10);
      const spanFontStyle = props.fontStyle ?? parentFontStyle;

      // Recursively process children with inherited styles
      const nestedSegments = extractTextSegments(
        props.children,
        spanFont,
        spanFontSize,
        spanFontWeight,
        spanFontStyle,
        theme,
      );
      segments.push(...nestedSegments);
    }
  });

  return segments;
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
    font = 'label2',
    fontSize: fontSizeOverride,
    fontWeight: fontWeightOverride,
    fontStyle = FontSlant.Upright,
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
    const background =
      backgroundProp ?? (elevation && elevation > 0 ? theme.color.bg : 'transparent');

    // Get font properties from theme with overrides (convert theme strings to numbers)
    const fontSize = fontSizeOverride ?? theme.fontSize[font] ?? 14;
    const fontWeight = fontWeightOverride ?? parseInt(String(theme.fontWeight[font] ?? '400'), 10);

    // Extract text segments from children (handles ChartTextSpan nesting)
    const textSegments = useMemo(() => {
      return extractTextSegments(children, font, fontSize, fontWeight, fontStyle, theme);
    }, [children, font, fontSize, fontWeight, fontStyle, theme]);

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

      const builder = Skia.ParagraphBuilder.Make(paragraphStyle, fontMgr);

      // Build paragraph from extracted segments
      textSegments.forEach((segment) => {
        builder.pushStyle({
          fontFamilies: [DEFAULT_CHART_FONT_FAMILY],
          fontSize: segment.fontSize,
          fontStyle: {
            weight: segment.fontWeight,
            slant: segment.fontStyle,
          },
          color: Skia.Color(color ?? theme.color.fgMuted),
        });
        builder.addText(segment.text);
        builder.pop();
      });

      const para = builder.build();
      para.layout(maxWidth);
      return para;
    }, [fontMgr, textSegments, color, theme.color.fgMuted, maxLines, ellipsis, maxWidth]);

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
    const backgroundRect = useDerivedValue(() => {
      const horAlignment = unwrapAnimatedValue(horizontalAlignment);
      const verAlignment = unwrapAnimatedValue(verticalAlignment);
      let rectX = unwrapAnimatedValue(x);
      let rectY = unwrapAnimatedValue(y);

      // Adjust for horizontal alignment
      switch (horAlignment) {
        case 'center':
          rectX = rectX - backgroundRectSize.width / 2;
          break;
        case 'right':
          rectX = rectX - backgroundRectSize.width;
          break;
        // 'left' is default, no adjustment needed
      }

      // Adjust for vertical alignment
      switch (verAlignment) {
        case 'middle':
          rectY = rectY - backgroundRectSize.height / 2;
          break;
        case 'bottom':
          rectY = rectY - backgroundRectSize.height;
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
    const textPosition = useDerivedValue(
      () => ({
        x: backgroundRect.value.x + inset.left,
        // Paragraph y is the top of the text box (not baseline like Text)
        // Center vertically within the background rect
        y:
          backgroundRect.value.y +
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

    const overflowAmount = useDerivedValue(() => {
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
      if (backgroundRect.value.x < parentBounds.x) {
        offsetX = parentBounds.x - backgroundRect.value.x;
      } else if (
        backgroundRect.value.x + backgroundRect.value.width >
        parentBounds.x + parentBounds.width
      ) {
        offsetX =
          parentBounds.x +
          parentBounds.width -
          (backgroundRect.value.x + backgroundRect.value.width);
      }

      // Y-axis overflow
      if (backgroundRect.value.y < parentBounds.y) {
        offsetY = parentBounds.y - backgroundRect.value.y;
      } else if (
        backgroundRect.value.y + backgroundRect.value.height >
        parentBounds.y + parentBounds.height
      ) {
        offsetY =
          parentBounds.y +
          parentBounds.height -
          (backgroundRect.value.y + backgroundRect.value.height);
      }

      return { x: offsetX, y: offsetY };
    }, [backgroundRect, fullChartBounds, bounds, disableRepositioning]);

    // Final adjusted positions
    const adjustedBackgroundRect = useDerivedValue(() => {
      const offsetX = unwrapAnimatedValue(xOffset);
      const offsetY = unwrapAnimatedValue(yOffset);
      return {
        x: backgroundRect.value.x + overflowAmount.value.x + offsetX,
        y: backgroundRect.value.y + overflowAmount.value.y + offsetY,
        width: backgroundRect.value.width,
        height: backgroundRect.value.height,
      };
    }, [backgroundRect, overflowAmount, xOffset, yOffset]);

    const adjustedTextPositionX = useDerivedValue(
      () => textPosition.value.x + overflowAmount.value.x + unwrapAnimatedValue(xOffset),
      [textPosition, overflowAmount, xOffset],
    );

    const adjustedTextPositionY = useDerivedValue(
      () => textPosition.value.y + overflowAmount.value.y + unwrapAnimatedValue(yOffset),
      [textPosition, overflowAmount, yOffset],
    );

    // todo: this might not be working, check out useAnimatedReaction
    useEffect(() => {
      if (onDimensionsChange && adjustedBackgroundRect !== null) {
        onDimensionsChange(adjustedBackgroundRect.value);
      }
    }, [adjustedBackgroundRect, onDimensionsChange]);

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

    // Compute shadow color (Skia will handle opacity via Paint)
    const shadowColor = shadowConfig?.color ?? null;

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

    const backgroundRectHeight = useDerivedValue(
      () => adjustedBackgroundRect.value.height,
      [adjustedBackgroundRect],
    );
    const backgroundRectWidth = useDerivedValue(
      () => adjustedBackgroundRect.value.width,
      [adjustedBackgroundRect],
    );
    const backgroundRectX = useDerivedValue(
      () => adjustedBackgroundRect.value.x,
      [adjustedBackgroundRect],
    );
    const backgroundRectY = useDerivedValue(
      () => adjustedBackgroundRect.value.y,
      [adjustedBackgroundRect],
    );

    return (
      <Group layer={<Paint opacity={finalOpacity} />}>
        {/* Background rectangle with shadow */}
        {background !== 'transparent' && (
          <RoundedRect
            color={background as Color}
            height={backgroundRectHeight}
            r={borderRadius}
            width={backgroundRectWidth}
            x={backgroundRectX}
            y={backgroundRectY}
          >
            {shouldRenderShadow && shadowConfig && shadowColor && (
              <Shadow
                blur={shadowConfig.blur}
                color={shadowColor}
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
            x={adjustedTextPositionX}
            y={adjustedTextPositionY}
          />
        )}
      </Group>
    );
  },
);
