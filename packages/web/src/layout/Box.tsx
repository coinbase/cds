import React, { forwardRef, memo, useMemo } from 'react';
import type { PinningDirection } from '@coinbase/cds-common/types/BoxBaseProps';
import type { SharedAccessibilityProps } from '@coinbase/cds-common/types/SharedAccessibilityProps';
import type { SharedProps } from '@coinbase/cds-common/types/SharedProps';

import type { Polymorphic } from '../core/polymorphism';
import { cx } from '../cx';
import { borderStyle, pinStyle } from '../styles/booleanStyles';
import type { fontFamily } from '../styles/responsive/base';
import { getStyles, type ResponsiveProp, type StyleProps } from '../styles/styleProps';

export const boxDefaultElement = 'div';

export type BoxDefaultElement = typeof boxDefaultElement;

export type BoxBaseProps = StyleProps &
  SharedProps &
  Pick<
    SharedAccessibilityProps,
    'accessibilityLabel' | 'accessibilityLabelledBy' | 'accessibilityHint'
  > & {
    style?: React.CSSProperties;
    font?: ResponsiveProp<keyof typeof fontFamily>;
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
  };

export type BoxProps<AsComponent extends React.ElementType> = Polymorphic.Props<
  AsComponent,
  BoxBaseProps
>;

type BoxComponent = (<AsComponent extends React.ElementType = BoxDefaultElement>(
  props: BoxProps<AsComponent>,
) => Polymorphic.ReactReturn) &
  Polymorphic.ReactNamed;

export const Box: BoxComponent = memo(
  forwardRef<React.ReactElement<BoxBaseProps>, BoxBaseProps>(
    <AsComponent extends React.ElementType>(
      {
        children,
        as,
        accessibilityLabel,
        accessibilityLabelledBy,
        accessibilityHint,
        style,
        className,
        testID,
        pin,
        elevation,
        bordered,
        borderedTop,
        borderedBottom,
        borderedStart,
        borderedEnd,
        borderedHorizontal,
        borderedVertical,
        dangerouslySetBackground,
        // Begin className style props
        display = 'flex',
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
        borderStartWidth,
        borderBottomWidth,
        borderWidth,
        borderRadius,
        font,
        fontFamily = font,
        fontSize = font,
        fontWeight = font,
        lineHeight = font,
        textAlign,
        textDecoration,
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
        visibility,
        // Begin inline style props
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
        gridTemplateColumns,
        gridTemplateRows,
        gridTemplateAreas,
        gridTemplate,
        gridAutoColumns,
        gridAutoRows,
        gridAutoFlow,
        grid,
        gridRowStart,
        gridColumnStart,
        gridRowEnd,
        gridColumnEnd,
        gridRow,
        gridColumn,
        gridArea,
        opacity,
        // End style props
        ...props
      }: Polymorphic.Props<AsComponent, BoxBaseProps>,
      ref: Polymorphic.Ref<AsComponent>,
    ) => {
      const Component = as ?? boxDefaultElement;

      const inlineStyle = useMemo(
        () => ({
          backgroundColor: dangerouslySetBackground,
          ...style,
        }),
        [dangerouslySetBackground, style],
      );

      const styles = useMemo(
        () =>
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
              textDecoration,
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
              visibility,
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
              gridTemplateColumns,
              gridTemplateRows,
              gridTemplateAreas,
              gridTemplate,
              gridAutoColumns,
              gridAutoRows,
              gridAutoFlow,
              grid,
              gridRowStart,
              gridColumnStart,
              gridRowEnd,
              gridColumnEnd,
              gridRow,
              gridColumn,
              gridArea,
              opacity,
            },
            inlineStyle,
          ),
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
          textDecoration,
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
          visibility,
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
          gridTemplateColumns,
          gridTemplateRows,
          gridTemplateAreas,
          gridTemplate,
          gridAutoColumns,
          gridAutoRows,
          gridAutoFlow,
          grid,
          gridRowStart,
          gridColumnStart,
          gridRowEnd,
          gridColumnEnd,
          gridRow,
          gridColumn,
          gridArea,
          opacity,
          inlineStyle,
        ],
      );

      return (
        <Component
          ref={ref}
          aria-describedby={accessibilityHint}
          aria-label={accessibilityLabel}
          aria-labelledby={accessibilityLabelledBy}
          className={cx(
            styles.className,
            pin && pinStyle[pin],
            bordered && borderStyle.bordered,
            borderedTop && borderStyle.borderedTop,
            borderedBottom && borderStyle.borderedBottom,
            borderedStart && borderStyle.borderedStart,
            borderedEnd && borderStyle.borderedEnd,
            borderedHorizontal && borderStyle.borderedHorizontal,
            borderedVertical && borderStyle.borderedVertical,
            className,
          )}
          data-testid={testID}
          style={styles.style}
          {...props}
        >
          {children}
        </Component>
      );
    },
  ),
);

Box.displayName = 'Box';

/**
 * @example
 * Use `PolymorphicBoxProps` to create polymorphic components from Box (components with the `as` prop and style props):
 * ```tsx
 * type MyComponentBaseProps = { message?: string }
 * type MyComponentProps<AsComponent extends React.ElementType> =
 *   PolymorphicBoxProps<AsComponent, MyComponentBaseProps>
 * const MyComponent = <
 *   AsComponent extends React.ElementType = 'button',
 * >({
 *   as = 'button' as AsComponent,
 *   message,
 *   ...props
 * }: MyComponentProps<AsComponent>) => {
 *   return <Box as={as} {...props}>{message}</Box>
 * }
 * ```
 */
export type PolymorphicBoxProps<
  AsComponent extends React.ElementType,
  OverrideProps,
> = Polymorphic.Props<AsComponent, Polymorphic.ExtendableProps<BoxBaseProps, OverrideProps>>;
