import React, { forwardRef, memo, useMemo } from 'react';
import { Animated, type StyleProp, View, type ViewProps, type ViewStyle } from 'react-native';
import type { PinningDirection } from '@coinbase/cds-common';
import type { ThemeVars } from '@coinbase/cds-common/core/theme';
import type { ElevationLevels } from '@coinbase/cds-common/types/ElevationLevels';

import type { Theme } from '../core/theme';
import { useTheme } from '../hooks/useTheme';
import { pinStyles } from '../styles/pinStyles';
import { getStyles, type StyleProps } from '../styles/styleProps';

export type BoxBaseProps = StyleProps & {
  children?: React.ReactNode;
  style?: Animated.WithAnimatedValue<StyleProp<ViewStyle>>;
  animated?: boolean;
  /** Determines box shadow styles. Parent should have overflow set to visible to ensure styles are not clipped. */
  elevation?: ElevationLevels;
  font?: ThemeVars.FontFamily | 'inherit';
  /** Direction in which to absolutely pin the box. */
  pin?: PinningDirection;
  /** Add a border around all sides of the box. */
  bordered?: boolean;
  /** Add a border to the top side of the box. */
  borderedTop?: boolean;
  /** Add a border to the bottom side of the box. */
  borderedBottom?: boolean;
  /** Add a border to the leading side of the box. */
  borderedStart?: boolean;
  /** Add a border to the trailing side of the box. */
  borderedEnd?: boolean;
  /** Add a border to the leading and trailing sides of the box. */
  borderedHorizontal?: boolean;
  /** Add a border to the top and bottom sides of the box. */
  borderedVertical?: boolean;
  /** @danger This is a migration escape hatch. It is not intended to be used normally. */
  dangerouslySetBackground?: string;
  /** Used to locate this element in unit and end-to-end tests. */
  testID?: string;
};

export type BoxProps = BoxBaseProps & Omit<ViewProps, 'style'>;

export const getElevationStyles = (
  elevation: ElevationLevels,
  theme: Theme,
  background?: ThemeVars.Color,
): ViewStyle => {
  const elevationStyles: Record<ElevationLevels, ViewStyle> = {
    0: {},
    1: {
      elevation: 2,
      ...(background === undefined ? { backgroundColor: theme.color.bgElevation1 } : {}),
      ...theme.shadow.elevation1,
    },
    2: {
      elevation: 8,
      ...(background === undefined ? { backgroundColor: theme.color.bgElevation2 } : {}),
      ...theme.shadow.elevation2,
    },
  };
  return elevationStyles[elevation];
};

const getBorderedStyles = (
  {
    bordered,
    borderedHorizontal,
    borderedVertical,
    borderedStart,
    borderedEnd,
    borderedTop,
    borderedBottom,
  }: {
    bordered?: boolean;
    borderedHorizontal?: boolean;
    borderedVertical?: boolean;
    borderedStart?: boolean;
    borderedEnd?: boolean;
    borderedTop?: boolean;
    borderedBottom?: boolean;
  },
  theme: Theme,
): (ViewStyle | false | undefined)[] => {
  const borderStyles = {
    bordered: {
      borderWidth: theme.borderWidth[100],
      borderStyle: 'solid',
      borderColor: theme.color.bgLine,
    },
    borderedHorizontal: {
      borderStartWidth: theme.borderWidth[100],
      borderEndWidth: theme.borderWidth[100],
      borderStyle: 'solid',
      borderColor: theme.color.bgLine,
    },
    borderedVertical: {
      borderTopWidth: theme.borderWidth[100],
      borderBottomWidth: theme.borderWidth[100],
      borderStyle: 'solid',
      borderColor: theme.color.bgLine,
    },
    borderedStart: {
      borderStartWidth: theme.borderWidth[100],
      borderStyle: 'solid',
      borderColor: theme.color.bgLine,
    },
    borderedEnd: {
      borderEndWidth: theme.borderWidth[100],
      borderStyle: 'solid',
      borderColor: theme.color.bgLine,
    },
    borderedTop: {
      borderTopWidth: theme.borderWidth[100],
      borderStyle: 'solid',
      borderColor: theme.color.bgLine,
    },
    borderedBottom: {
      borderBottomWidth: theme.borderWidth[100],
      borderStyle: 'solid',
      borderColor: theme.color.bgLine,
    },
  } satisfies Record<string, ViewStyle>;
  return [
    bordered && borderStyles.bordered,
    borderedHorizontal && borderStyles.borderedHorizontal,
    borderedVertical && borderStyles.borderedVertical,
    borderedStart && borderStyles.borderedStart,
    borderedEnd && borderStyles.borderedEnd,
    borderedTop && borderStyles.borderedTop,
    borderedBottom && borderStyles.borderedBottom,
  ];
};

export const Box = memo(
  forwardRef<View, BoxProps>(
    (
      {
        children,
        style,
        animated,
        testID,
        pin,
        bordered,
        borderedTop,
        borderedBottom,
        borderedStart,
        borderedEnd,
        borderedHorizontal,
        borderedVertical,
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
        color,
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
        font,
        fontFamily = font,
        fontSize = font,
        fontWeight = font,
        lineHeight = font,
        textAlign,
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
        ...props
      },
      ref,
    ) => {
      const Component = animated ? Animated.View : View;

      const theme = useTheme();

      const styles = useMemo(
        () => [
          getBorderedStyles(
            {
              bordered,
              borderedHorizontal,
              borderedVertical,
              borderedStart,
              borderedEnd,
              borderedTop,
              borderedBottom,
            },
            theme,
          ),
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
              textAlign,
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
            },
            theme,
          ),
          elevation ? getElevationStyles(elevation, theme, background) : undefined,
          pin && pinStyles[pin],
          dangerouslySetBackground ? { backgroundColor: dangerouslySetBackground } : undefined,
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
          textAlign,
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
          dangerouslySetBackground,
          pin,
          bordered,
          borderedHorizontal,
          borderedVertical,
          borderedStart,
          borderedEnd,
          borderedTop,
          borderedBottom,
          theme,
          style,
        ],
      );

      return (
        <Component ref={ref} style={styles} testID={testID} {...props}>
          {children}
        </Component>
      );
    },
  ),
);

Box.displayName = 'Box';
