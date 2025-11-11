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
  FontWeight,
  Group,
  Paint,
  Paragraph,
  RoundedRect,
  Shadow,
  Skia,
  type SkParagraph,
  type SkTextStyle,
  TextAlign,
} from '@shopify/react-native-skia';

import { useCartesianChartContext } from '../ChartProvider';
import { type ChartInset, getChartInset, getColorWithOpacity, unwrapAnimatedValue } from '../utils';

type Shadow = {
  elevation?: number;
  shadowColor?: ViewStyle['shadowColor'];
  shadowOpacity?: ViewStyle['shadowOpacity'];
  shadowOffset?: ViewStyle['shadowOffset'];
  shadowRadius?: ViewStyle['shadowRadius'];
  backgroundColor?: string;
};

// todo: how can we simplify elevation
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
 * Converts a fontWeight from Theme to a Skia FontWeight
 * @note this only works when the fontWeight is a valid number (ie not 'bold')
 * @param theme - The theme to use
 * @param font - The font to use
 * @returns The FontWeight or undefined if the fontWeight is not a valid number
 */
const getFontWeight = (theme: Theme, font: ThemeVars.Font): FontWeight | undefined => {
  const themeFontWeight = theme.fontWeight[font];

  const numericWeight =
    typeof themeFontWeight === 'string' ? Number(themeFontWeight) : themeFontWeight;

  const validFontWeights = Object.values(FontWeight).filter(
    (value): value is number => typeof value === 'number',
  );

  return numericWeight !== undefined && validFontWeights.includes(numericWeight)
    ? numericWeight
    : undefined;
};

/**
 * The supported content types for ChartText.
 * Pass a string for simple text, or a SkParagraph for advanced rich text formatting.
 */
export type ChartTextChildren = AnimatedProp<string | SkParagraph>;

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
   * Pass a string for simple text rendering, or build your own SkParagraph for advanced formatting.
   * @example
   * // Simple text
   * <ChartText x={100} y={100}>Hello World</ChartText>
   *
   * @example
   * // Advanced rich text with SkParagraph
   * const paragraph = useMemo(() => {
   *   const builder = Skia.ParagraphBuilder.Make(style, fontProvider);
   *   builder.pushStyle({ fontSize: 14, fontWeight: 400 });
   *   builder.addText('Regular ');
   *   builder.pushStyle({ fontSize: 14, fontWeight: 700 });
   *   builder.addText('Bold');
   *   builder.pop();
   *   const para = builder.build();
   *   para.layout(width);
   *   return para;
   * }, [fontProvider, width]);
   * <ChartText x={100} y={100}>{paragraph}</ChartText>
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
   * Font families override for Skia
   * @example
   * ['Helvetica', 'sans-serif']
   */
  fontFamilies?: string[];
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
  opacity?: AnimatedProp<number>;
  /**
   * Elevation level for drop shadow.
   * @default undefined
   * @example
   * // Simple elevation
   * elevation={1}
   */
  elevation?: ElevationLevels;
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
    fontFamilies,
    font = 'label2',
    fontSize,
    fontWeight,
    fontStyle: fontStyleProp = FontSlant.Upright,
    elevation,
  }) => {
    const theme = useTheme();
    const {
      width: chartWidth,
      height: chartHeight,
      fontFamily,
      fontProvider,
    } = useCartesianChartContext();

    const inset = useMemo(() => getChartInset(insetInput), [insetInput]);

    const background =
      backgroundProp ?? (elevation && elevation > 0 ? theme.color.bg : 'transparent');

    const defaultParagraphStyle: SkTextStyle = useMemo(
      () => ({
        fontFamilies: fontFamilies ?? (fontFamily ? [fontFamily] : []),
        fontSize: fontSize ?? theme.fontSize[font],
        fontStyle: { weight: fontWeight ?? getFontWeight(theme, font), slant: fontStyleProp },
        color: Skia.Color(color ?? theme.color.fgMuted),
      }),
      [fontFamilies, fontFamily, fontSize, theme, font, fontWeight, fontStyleProp, color],
    );
    const paragraph = useDerivedValue<SkParagraph | null>(() => {
      const childrenValue = unwrapAnimatedValue(children);

      if (typeof childrenValue !== 'string') {
        return childrenValue;
      }

      const builder = Skia.ParagraphBuilder.Make({ textAlign: TextAlign.Left }, fontProvider);

      builder.pushStyle(defaultParagraphStyle);
      builder.addText(childrenValue);
      builder.pop();

      const para = builder.build();
      para.layout(chartWidth);
      return para;
    }, [children, fontProvider, defaultParagraphStyle, chartWidth]);

    const textDimensions = useDerivedValue(() => {
      const unwrappedParagraph = paragraph.value;
      if (!unwrappedParagraph) return { width: 0, height: 0 };
      return {
        width: unwrappedParagraph.getLongestLine(),
        height: unwrappedParagraph.getHeight(),
      };
    }, [paragraph]);

    const backgroundRectSize = useDerivedValue(
      () => ({
        width: textDimensions.value.width + inset.left + inset.right,
        height: textDimensions.value.height + inset.top + inset.bottom,
      }),
      [textDimensions, inset],
    );

    // Calculate background rect position based on alignment
    const backgroundRect = useDerivedValue<Rect>(() => {
      const horAlignment = unwrapAnimatedValue(horizontalAlignment);
      const verAlignment = unwrapAnimatedValue(verticalAlignment);
      // By default the value is top left
      let rectX = unwrapAnimatedValue(x);
      let rectY = unwrapAnimatedValue(y);
      const rectSize = backgroundRectSize.value;

      // Adjust for horizontal alignment
      switch (horAlignment) {
        case 'center':
          rectX = rectX - rectSize.width / 2;
          break;
        case 'right':
          rectX = rectX - rectSize.width;
          break;
      }

      // Adjust for vertical alignment
      switch (verAlignment) {
        case 'middle':
          rectY = rectY - rectSize.height / 2;
          break;
        case 'bottom':
          rectY = rectY - rectSize.height;
          break;
      }

      return {
        x: rectX,
        y: rectY,
        width: rectSize.width,
        height: rectSize.height,
      };
    }, [x, y, backgroundRectSize, horizontalAlignment, verticalAlignment]);

    // Paragraph uses top-left positioning
    const textPosition = useDerivedValue<Rect>(() => {
      const textDims = textDimensions.value;
      return {
        x: backgroundRect.value.x + inset.left,
        y: backgroundRect.value.y + inset.top,
        width: textDims.width,
        height: textDims.height,
      };
    }, [backgroundRect, textDimensions, inset, backgroundRectSize]);

    // Calculate overflow and repositioning
    const fullChartBounds = useMemo<Rect>(
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
    const backgroundRectWithOffset = useDerivedValue<Rect>(() => {
      const offsetX = unwrapAnimatedValue(dx);
      const offsetY = unwrapAnimatedValue(dy);
      return {
        x: backgroundRect.value.x + overflowAmount.value.x + offsetX,
        y: backgroundRect.value.y + overflowAmount.value.y + offsetY,
        width: backgroundRect.value.width,
        height: backgroundRect.value.height,
      };
    }, [backgroundRect, overflowAmount, dx, dy]);

    const textWithOffsetX = useDerivedValue(
      () => textPosition.value.x + overflowAmount.value.x + unwrapAnimatedValue(dx),
      [textPosition, overflowAmount, dx],
    );

    const textWithOffsetY = useDerivedValue(
      () => textPosition.value.y + overflowAmount.value.y + unwrapAnimatedValue(dy),
      [textPosition, overflowAmount, dy],
    );

    useAnimatedReaction(
      () => backgroundRectWithOffset.value,
      (rect, previous) => {
        if (onDimensionsChange && rect !== previous) {
          runOnJS(onDimensionsChange)(rect);
        }
      },
      [onDimensionsChange],
    );

    // Show group if we are ready
    const groupOpacity = useDerivedValue(() => {
      const textSize = textDimensions.value;
      const hasValidContent = paragraph.value && textSize.width > 0 && textSize.height > 0;
      return hasValidContent ? unwrapAnimatedValue(opacity) : 0;
    }, [paragraph, textDimensions, opacity]);

    const backgroundRectHeight = useDerivedValue(
      () => backgroundRectWithOffset.value.height,
      [backgroundRectWithOffset],
    );
    const backgroundRectWidth = useDerivedValue(
      () => backgroundRectWithOffset.value.width,
      [backgroundRectWithOffset],
    );
    const backgroundRectX = useDerivedValue(
      () => backgroundRectWithOffset.value.x,
      [backgroundRectWithOffset],
    );
    const backgroundRectY = useDerivedValue(
      () => backgroundRectWithOffset.value.y,
      [backgroundRectWithOffset],
    );

    const elevationStylesResult = getElevationStyles(elevation ?? 0, theme);

    // Opacity on a group doesn't impact the paragraph so we need to apply it to Group
    return (
      <Group data-testID={testID} layer={<Paint opacity={groupOpacity} />}>
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
                color={getColorWithOpacity(
                  String(elevationStylesResult.shadowColor ?? '#000000'),
                  Number(elevationStylesResult.shadowOpacity ?? 1),
                )}
                dx={Number(elevationStylesResult.shadowOffset?.width ?? 0)}
                dy={Number(elevationStylesResult.shadowOffset?.height ?? 0)}
              />
            )}
          </RoundedRect>
        )}
        <Paragraph
          paragraph={paragraph}
          width={chartWidth}
          x={textWithOffsetX}
          y={textWithOffsetY}
        />
      </Group>
    );
  },
);
