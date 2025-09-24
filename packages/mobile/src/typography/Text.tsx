import React, { forwardRef, memo, useMemo } from 'react';
import {
  Animated,
  type StyleProp,
  StyleSheet,
  Text as NativeText,
  type TextProps as NativeTextProps,
  type TextStyle,
} from 'react-native';
import type { ThemeVars } from '@coinbase/cds-common/core/theme';
import { accessibleOpacityDisabled } from '@coinbase/cds-common/tokens/interactable';

import { useTextAlign } from '../hooks/useTextAlign';
import { useTheme } from '../hooks/useTheme';
import { getStyles, type StyleProps } from '../styles/styleProps';

export type TextBaseProps = StyleProps & {
  children?: React.ReactNode;
  style?: Animated.WithAnimatedValue<StyleProp<TextStyle>>;
  animated?: boolean;
  /**
   * Specifies text alignment. On mobile, the value `justify` is only supported on iOS and fallbacks to `start` on Android.
   * @default start
   */
  align?: 'start' | 'end' | 'center' | 'justify';
  /**
   * Set text font family.
   * @default body
   */
  font?: ThemeVars.FontFamily | 'inherit';
  /**
   * Add disabled opacity style to text
   */
  disabled?: boolean;
  /**
   * Use monospace font family.
   */
  mono?: boolean;
  /**
   * Set text decoration to underline.
   * @default false
   */
  underline?: boolean;
  /**
   * Activates the set of figures where numbers are all of the same size, allowing them to be easily aligned.
   * @default false
   */
  tabularNumbers?: boolean;
  /**
   * Truncates text after wrapping to a defined number of lines.
   */
  numberOfLines?: number;
  /**
   * Choose ellipsize mode.
   * @link [React Native docs](https://reactnative.dev/docs/text#ellipsizemode)
   */
  ellipsize?: NativeTextProps['ellipsizeMode'];
  /**
   * Set text to be in a single line.
   * @default false
   */
  noWrap?: boolean;
  /** @danger This is a migration escape hatch. It is not intended to be used normally. */
  dangerouslySetColor?: TextStyle['color'];
  /** @danger This is a migration escape hatch. It is not intended to be used normally. */
  dangerouslySetBackground?: TextStyle['backgroundColor'];
  /** @deprecated Do not use this prop. This is a migration escape hatch and will be removed in the next major version of CDS. */
  renderEmptyNode?: boolean;
  /** Used to locate this element in unit and end-to-end tests. */
  testID?: string;
};

export type TextProps = TextBaseProps & Omit<NativeTextProps, 'style'>;

const styles = StyleSheet.create({
  disabled: {
    opacity: accessibleOpacityDisabled,
  },
  ellipsize: {
    overflow: 'hidden',
  },
  underline: {
    textDecorationLine: 'underline',
  },
  tabularNumbers: {
    fontVariant: ['tabular-nums'],
  },
});

export const Text = memo(
  forwardRef<NativeText, TextProps>(
    (
      {
        children,
        style,
        animated,
        disabled,
        mono,
        underline,
        tabularNumbers,
        numberOfLines,
        ellipsize,
        noWrap,
        testID,
        dangerouslySetColor,
        dangerouslySetBackground,
        // Begin style props
        display,
        position,
        overflow,
        zIndex,
        gap,
        columnGap,
        rowGap,
        justifyContent,
        alignContent,
        alignItems,
        alignSelf,
        flexDirection,
        flexWrap,
        color = 'fg',
        background,
        borderColor,
        borderTopLeftRadius,
        borderTopRightRadius,
        borderBottomLeftRadius,
        borderBottomRightRadius,
        borderTopWidth,
        borderEndWidth,
        borderBottomWidth,
        borderStartWidth,
        elevation,
        borderWidth,
        borderRadius,
        font = 'inherit',
        fontFamily = font,
        fontSize = font,
        fontWeight = font,
        lineHeight = font,
        align = 'start',
        textDecorationStyle,
        textDecorationLine,
        textTransform,
        padding,
        paddingX,
        paddingY,
        paddingTop,
        paddingBottom,
        paddingStart,
        paddingEnd,
        margin,
        marginX,
        marginY,
        marginTop,
        marginBottom,
        marginStart,
        marginEnd,
        userSelect,
        width,
        height,
        minWidth,
        minHeight,
        maxWidth,
        maxHeight,
        aspectRatio,
        top,
        bottom,
        left,
        right,
        transform,
        flexBasis,
        flexShrink,
        flexGrow,
        opacity,
        renderEmptyNode = true,
        ...props
      },
      ref,
    ) => {
      const Component = animated ? Animated.Text : NativeText;

      const theme = useTheme();
      const textAlign = useTextAlign(align);
      const monoFontFamily = mono && fontFamily !== 'inherit' && theme.fontFamilyMono?.[fontFamily];
      const textTransformValue =
        textTransform ??
        (fontFamily !== 'inherit'
          ? theme.textTransform[fontFamily as keyof typeof theme.textTransform]
          : undefined);
      const computedNumberOfLines =
        noWrap || (ellipsize && typeof numberOfLines === 'undefined') ? 1 : numberOfLines;

      const propStyles = useMemo(
        () => [
          disabled && styles.disabled,
          underline && styles.underline,
          tabularNumbers && styles.tabularNumbers,
          ellipsize && styles.ellipsize,
          monoFontFamily ? { fontFamily: monoFontFamily } : undefined,
          dangerouslySetColor ? { color: dangerouslySetColor } : undefined,
          dangerouslySetBackground ? { backgroundColor: dangerouslySetBackground } : undefined,
        ],
        [
          disabled,
          underline,
          tabularNumbers,
          ellipsize,
          monoFontFamily,
          dangerouslySetColor,
          dangerouslySetBackground,
        ],
      );

      const memoizedStyles = useMemo(
        () => [
          getStyles(
            {
              display,
              position,
              overflow,
              zIndex,
              gap,
              columnGap,
              rowGap,
              justifyContent,
              alignContent,
              alignItems,
              alignSelf,
              flexDirection,
              flexWrap,
              color,
              background,
              borderColor,
              borderWidth,
              borderRadius,
              borderTopLeftRadius,
              borderTopRightRadius,
              borderBottomLeftRadius,
              borderBottomRightRadius,
              borderTopWidth,
              borderEndWidth,
              borderBottomWidth,
              borderStartWidth,
              elevation,
              fontFamily,
              fontSize,
              fontWeight,
              lineHeight,
              textDecorationStyle,
              textDecorationLine,
              textTransform: textTransformValue,
              padding,
              paddingX,
              paddingY,
              paddingTop,
              paddingBottom,
              paddingStart,
              paddingEnd,
              margin,
              marginX,
              marginY,
              marginTop,
              marginBottom,
              marginStart,
              marginEnd,
              userSelect,
              width,
              height,
              minWidth,
              minHeight,
              maxWidth,
              maxHeight,
              aspectRatio,
              top,
              bottom,
              left,
              right,
              transform,
              flexBasis,
              flexShrink,
              flexGrow,
              opacity,
              ...textAlign,
            },
            theme,
          ),
          propStyles,
          style,
        ],
        [
          display,
          position,
          overflow,
          zIndex,
          gap,
          columnGap,
          rowGap,
          justifyContent,
          alignContent,
          alignItems,
          alignSelf,
          flexDirection,
          flexWrap,
          color,
          background,
          borderColor,
          borderWidth,
          borderRadius,
          borderTopLeftRadius,
          borderTopRightRadius,
          borderBottomLeftRadius,
          borderBottomRightRadius,
          borderTopWidth,
          borderEndWidth,
          borderBottomWidth,
          borderStartWidth,
          elevation,
          fontFamily,
          fontSize,
          fontWeight,
          lineHeight,
          textDecorationStyle,
          textDecorationLine,
          textTransformValue,
          padding,
          paddingX,
          paddingY,
          paddingTop,
          paddingBottom,
          paddingStart,
          paddingEnd,
          margin,
          marginX,
          marginY,
          marginTop,
          marginBottom,
          marginStart,
          marginEnd,
          userSelect,
          width,
          height,
          minWidth,
          minHeight,
          maxWidth,
          maxHeight,
          aspectRatio,
          top,
          bottom,
          left,
          right,
          transform,
          flexBasis,
          flexShrink,
          flexGrow,
          opacity,
          textAlign,
          theme,
          propStyles,
          style,
        ],
      );

      if (
        !renderEmptyNode &&
        (children === null || children === undefined || children === '' || Number.isNaN(children))
      )
        return null;

      return (
        <Component
          ref={ref}
          ellipsizeMode={ellipsize}
          numberOfLines={computedNumberOfLines}
          style={memoizedStyles as any}
          testID={testID}
          {...props}
        >
          {children}
        </Component>
      );
    },
  ),
);

Text.displayName = 'Text';
