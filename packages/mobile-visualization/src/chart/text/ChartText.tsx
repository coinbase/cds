import React, { memo, useMemo } from 'react';
import type { ViewStyle } from 'react-native';
import { runOnJS, useAnimatedReaction, useDerivedValue } from 'react-native-reanimated';
import type { ThemeVars } from '@coinbase/cds-common/core/theme';
import type { ElevationLevels, Rect, SharedProps } from '@coinbase/cds-common/types';
import type { Theme } from '@coinbase/cds-mobile/core/theme';
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

type Shadow = {
  elevation?: number;
  shadowColor?: ViewStyle['shadowColor'];
  shadowOpacity?: ViewStyle['shadowOpacity'];
  shadowOffset?: ViewStyle['shadowOffset'];
  shadowRadius?: ViewStyle['shadowRadius'];
  backgroundColor?: string;
};

const getElevationStyles = (elevation: ElevationLevels, theme: Theme) => {
  const elevationStyles: Record<ElevationLevels, Shadow> = {
    0: {},
    1: {
      elevation: 2,
      backgroundColor: theme.color.bgElevation1,
      ...theme.shadow.elevation1,
    },
    2: {
      elevation: 8,
      backgroundColor: theme.color.bgElevation2,
      ...theme.shadow.elevation2,
    },
  };
  return elevationStyles[elevation];
};

/**
 * Interpolates between two colors using linear interpolation.
 * Returns an rgba string.
 */
const interpolateColor = (color1: string, opacity: number): string => {
  const c = Skia.Color(color1);
  return `rgba(${c[0] * 255}, ${c[1] * 255}, ${c[2] * 255}, ${opacity})`;
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
  dx?: AnimatedProp<number>;
  /**
   * Vertical offset in pixels to adjust the final y position.
   * Useful for fine-tuning placement or elevation.
   * Positive values move the text down, negative values move it up.
   * @default 0
   * @example
   * // Elevate text 10 pixels above its calculated position
   * dy={-10}
   */
  dy?: AnimatedProp<number>;
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
   * Opacity of the text and background.
   * @default 1
   */
  opacity?: number;
  /**
   * Elevation level for drop shadow.
   * @default undefined
   * @example
   * // Simple elevation
   * elevation={1}
   */
  elevation?: ElevationLevels;
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
    dx = 0,
    dy = 0,
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
    elevation,
  }) => {
    const theme = useTheme();
    const { width: chartWidth, height: chartHeight, fontMgr } = useCartesianChartContext();

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
      para.layout(chartWidth);
      return para;
    }, [fontMgr, textSegments, color, theme.color.fgMuted, chartWidth]);

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
      const offsetX = unwrapAnimatedValue(dx);
      const offsetY = unwrapAnimatedValue(dy);
      return {
        x: backgroundRect.value.x + overflowAmount.value.x + offsetX,
        y: backgroundRect.value.y + overflowAmount.value.y + offsetY,
        width: backgroundRect.value.width,
        height: backgroundRect.value.height,
      };
    }, [backgroundRect, overflowAmount, dx, dy]);

    const adjustedTextPositionX = useDerivedValue(
      () => textPosition.value.x + overflowAmount.value.x + unwrapAnimatedValue(dx),
      [textPosition, overflowAmount, dx],
    );

    const adjustedTextPositionY = useDerivedValue(
      () => textPosition.value.y + overflowAmount.value.y + unwrapAnimatedValue(dy),
      [textPosition, overflowAmount, dy],
    );

    useAnimatedReaction(
      () => adjustedBackgroundRect.value,
      (rect, previous) => {
        'worklet';

        // If callback is provided, jump to JS thread
        if (onDimensionsChange && rect !== previous) {
          runOnJS(onDimensionsChange)(rect);
        }
      },
      [onDimensionsChange],
    );

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

    const elevationStylesResult = getElevationStyles(elevation ?? 0, theme);

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
            {elevationStylesResult && (
              <Shadow
                blur={Number(elevationStylesResult.shadowRadius ?? 0)}
                color={interpolateColor(
                  String(elevationStylesResult.shadowColor ?? '#000000'),
                  Number(elevationStylesResult.shadowOpacity ?? 1),
                )}
                dx={Number(elevationStylesResult.shadowOffset?.width ?? 0)}
                dy={Number(elevationStylesResult.shadowOffset?.height ?? 0)}
              />
            )}
          </RoundedRect>
        )}
        {/* Render paragraph only when content is valid */}
        {hasValidContent && (
          <Paragraph
            paragraph={paragraph}
            width={chartWidth}
            x={adjustedTextPositionX}
            y={adjustedTextPositionY}
          />
        )}
      </Group>
    );
  },
);
