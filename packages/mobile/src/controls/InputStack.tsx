import React, { memo, useMemo } from 'react';
import { Animated, StyleSheet, View } from 'react-native';
import type { StyleProp, ViewStyle } from 'react-native';
import type { ThemeVars } from '@coinbase/cds-common/core/theme';
import { accessibleOpacityDisabled } from '@coinbase/cds-common/tokens/interactable';
import type { InputVariant } from '@coinbase/cds-common/types/InputBaseProps';
import type { SharedProps } from '@coinbase/cds-common/types/SharedProps';

import { useLayout } from '../hooks/useLayout';
import { useTheme } from '../hooks/useTheme';
import type { BoxBaseProps, BoxProps } from '../layout';
import { HStack } from '../layout/HStack';
import { VStack } from '../layout/VStack';
import { ColorSurge } from '../motion/ColorSurge';

export type InputStackBaseProps = SharedProps & {
  /**
   * Determines the sentiment of the input. Because
   * we allow startContent and endContent to be custom ReactNode,
   * the content placed inside these slots will not change colors according
   * to the variant. You will have to add that yourself
   */
  variant?: InputVariant;
  /**
   * Width of input as a percentage string.
   * @default 100%
   * */
  width?: BoxProps['width'];
  /**
   * Height of input
   */
  height?: BoxBaseProps['height'];
  /**
   * Toggles input interactability and opacity
   * @default false
   */
  disabled?: boolean;
  /**
   * Width of the border.
   * @default 100
   */
  borderWidth?: ThemeVars.BorderWidth;
  /**
   * Additional border width when focused.
   * @default borderWidth
   */
  focusedBorderWidth?: ThemeVars.BorderWidth;
  /** Prepends custom content to the start. Content is not part of input */
  prependNode?: React.ReactNode;
  /** Adds content to the start of the inner input. Refer to diagram for location of startNode in InputStack component */
  startNode?: React.ReactNode;
  /** Appends custom content to the end. Content is not part of input */
  appendNode?: React.ReactNode;
  /** Adds content to the end of the inner input. Refer to diagram for location of endNode in InputStack component */
  endNode?: React.ReactNode;
  /** Editable area of the Input */
  inputNode: React.ReactNode;
  /** Text shown below input. Used for when label is not enough to indicate what this input does */
  helperTextNode?: React.ReactNode;
  /** A message indicating the purpose of this input */
  labelNode?: React.ReactNode;
  /** This should only be used when focused styles need to be persisted */
  focused?: boolean;
  /**
   * Leverage one of the borderRadius styles we offer to round the corners of the input.
   * @default 200
   */
  borderRadius?: BoxProps['borderRadius'];
  /**
   * Enable Color Surge motion
   */
  enableColorSurge?: boolean;
  /** Adds border styling to input  */
  borderStyle?: Animated.WithAnimatedValue<StyleProp<ViewStyle>>;
  /** Border overlay to animate border when focused */
  borderFocusedStyle?: Animated.WithAnimatedValue<StyleProp<ViewStyle>>;
  /**
   * The variant of the label. Only used when compact is not true.
   * @default 'outside'
   */
  labelVariant?: 'inside' | 'outside';
  /**
   * Background color of the input
   * @default 'bg'
   */
  inputBackground?: ThemeVars.Color;
};

export type InputStackProps = Omit<BoxProps, 'width' | 'height' | 'borderRadius'> &
  InputStackBaseProps;

const variantColorMap: Record<InputVariant, ThemeVars.Color> = {
  primary: 'fgPrimary',
  positive: 'fgPositive',
  negative: 'fgNegative',
  foreground: 'fg',
  foregroundMuted: 'fgMuted',
  secondary: 'bgSecondary',
};

export const InputStack = memo(function InputStack({
  /** CDS custom props */
  width = '100%',
  prependNode,
  endNode,
  appendNode,
  startNode,
  disabled = false,
  inputNode,
  helperTextNode,
  borderStyle,
  variant,
  labelNode,
  testID = '',
  borderRadius = 200,
  borderFocusedStyle,
  focused,
  enableColorSurge,
  labelVariant = 'outside',
  inputBackground = 'bg',
  borderWidth = 100,
  focusedBorderWidth = borderWidth,
  ...props
}: InputStackProps) {
  const theme = useTheme();
  const [inputAreaSize, onInputAreaLayout] = useLayout();

  const inputAreaStyle: ViewStyle = useMemo(() => {
    const inputBorderRadius: ViewStyle = {
      ...(prependNode
        ? {
            borderTopLeftRadius: 0,
            borderBottomLeftRadius: 0,
          }
        : {}),
      ...(appendNode
        ? {
            borderTopRightRadius: 0,
            borderBottomRightRadius: 0,
          }
        : {}),
    };

    return {
      borderColor:
        variant === 'secondary'
          ? 'transparent'
          : theme.color[
              variant === 'foregroundMuted' || !variant ? 'bgLineHeavy' : variantColorMap[variant]
            ],
      borderWidth: theme.borderWidth[borderWidth],
      flexDirection: 'row',
      flexGrow: 1,
      backgroundColor:
        variant === 'secondary' ? theme.color.bgSecondary : theme.color[inputBackground],
      borderRadius: theme.borderRadius[borderRadius],
      overflow: 'hidden',
      ...inputBorderRadius,
    };
  }, [
    prependNode,
    appendNode,
    variant,
    theme.color,
    theme.borderWidth,
    theme.borderRadius,
    borderWidth,
    inputBackground,
    borderRadius,
  ]);

  const inputAreaStyles = useMemo(() => {
    return [inputAreaStyle, borderStyle];
  }, [borderStyle, inputAreaStyle]);

  const borderFocusedStyles: Animated.WithAnimatedValue<StyleProp<ViewStyle>> = useMemo(() => {
    const resolvedFocusedBorderWidth = theme.borderWidth[focusedBorderWidth];
    const resolvedBorderRadius = theme.borderRadius[borderRadius];
    const overlayBorderRadius = resolvedBorderRadius + resolvedFocusedBorderWidth;

    const overlayBorderRadiusStyle: ViewStyle = {
      borderRadius: overlayBorderRadius,
      ...(prependNode
        ? {
            borderTopLeftRadius: 0,
            borderBottomLeftRadius: 0,
          }
        : {}),
      ...(appendNode
        ? {
            borderTopRightRadius: 0,
            borderBottomRightRadius: 0,
          }
        : {}),
    };

    return [
      borderFocusedStyle,
      {
        transform: [
          { translateX: inputAreaSize.x - resolvedFocusedBorderWidth },
          { translateY: inputAreaSize.y - resolvedFocusedBorderWidth },
        ],
        width: inputAreaSize.width + resolvedFocusedBorderWidth * 2,
        height: inputAreaSize.height + resolvedFocusedBorderWidth * 2,
        position: 'absolute',
        backgroundColor: 'transparent',
        ...overlayBorderRadiusStyle,
      },
    ];
  }, [
    theme.borderWidth,
    theme.borderRadius,
    focusedBorderWidth,
    borderRadius,
    prependNode,
    appendNode,
    borderFocusedStyle,
    inputAreaSize.x,
    inputAreaSize.y,
    inputAreaSize.width,
    inputAreaSize.height,
  ]);

  return (
    <VStack
      gap={0.5}
      opacity={disabled ? accessibleOpacityDisabled : 1}
      testID={testID}
      width={width}
      {...props}
    >
      {!!labelNode && labelVariant === 'outside' && <>{labelNode}</>}
      <HStack>
        {!!prependNode && <>{prependNode}</>}
        <View style={styles.inputAreaContainerStyle}>
          {focused && <Animated.View style={borderFocusedStyles} />}
          <Animated.View
            onLayout={onInputAreaLayout}
            style={inputAreaStyles}
            testID={testID && `${testID}-input-area`}
          >
            {focused && enableColorSurge && (
              <ColorSurge background={variant ? variantColorMap[variant] : undefined} />
            )}
            {!!startNode && <>{startNode}</>}
            {!!labelNode && labelVariant === 'inside' ? (
              <VStack flexGrow={1} minHeight={60} paddingY={1}>
                {labelNode}
                {inputNode}
              </VStack>
            ) : (
              inputNode
            )}
            {!!endNode && <>{endNode}</>}
          </Animated.View>
        </View>
        {!!appendNode && <>{appendNode}</>}
      </HStack>
      {!!helperTextNode && <>{helperTextNode}</>}
    </VStack>
  );
});

// Fixes a problem found in Accordion children element.
// When `overflow: auto` is set the thickened border when focused is not accounted for
// hence you see a cutoff.
// Padding must accommodate the focus border extension (default 2px for focusedBorderWidth: 200)
const styles = StyleSheet.create({
  inputAreaContainerStyle: {
    padding: 2,
    flexGrow: 1,
  },
});
