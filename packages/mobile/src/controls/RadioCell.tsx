import React, { forwardRef, memo, useCallback, useMemo, useState } from 'react';
import {
  Animated,
  type GestureResponderEvent,
  type PressableStateCallbackType,
  type StyleProp,
  type TextStyle,
  type View,
  type ViewStyle,
} from 'react-native';
import type { ThemeVars } from '@coinbase/cds-common/core/theme';

import { useLayout } from '../hooks/useLayout';
import { useSelectionCellBorderStyle } from '../hooks/useSelectionCellBorderStyle';
import { useTheme } from '../hooks/useTheme';
import { Box, HStack, VStack } from '../layout';
import { Pressable, type PressableProps } from '../system/Pressable';
import { Text } from '../typography/Text';

import type { ControlBaseProps } from './Control';
import { Radio } from './Radio';

export type RadioCellBaseProps<RadioValue extends string> = {
  title: React.ReactNode;
  description?: React.ReactNode;
  columnGap?: ThemeVars.Space;
  rowGap?: ThemeVars.Space;
  pressedBorderColor?: ThemeVars.Color;
  pressedBorderWidth?: ThemeVars.BorderWidth;
} & Omit<ControlBaseProps<RadioValue>, 'style' | 'children' | 'title'> &
  Omit<PressableProps, 'children' | 'noScaleOnPress'>;

export type RadioCellProps<RadioValue extends string> = RadioCellBaseProps<RadioValue> & {
  styles?: {
    root?: StyleProp<ViewStyle>;
    radioContainer?: StyleProp<ViewStyle>;
    contentContainer?: StyleProp<ViewStyle>;
    title?: StyleProp<TextStyle>;
    description?: StyleProp<TextStyle>;
  };
};

const RadioCellWithRef = forwardRef(function RadioCell<RadioValue extends string>(
  {
    title,
    description,
    checked,
    onChange,
    disabled,
    readOnly,
    columnGap = 2,
    rowGap = 0,
    padding = 2,
    borderWidth = 100,
    borderRadius = 200,
    background = 'bg',
    borderColor = 'bgLine',
    accessibilityLabel,
    accessibilityHint,
    testID,
    value,
    width = '100%',
    style,
    contentStyle,
    wrapperStyles,
    onPressIn,
    onPressOut,
    pressedBorderColor = 'bgPrimary',
    pressedBorderWidth = 200,
    styles,
    ...props
  }: RadioCellProps<RadioValue>,
  ref: React.ForwardedRef<View>,
) {
  const theme = useTheme();
  const [layout, setLayout] = useLayout();
  const [pressed, setPressed] = useState(false);
  const { focusRingStyle, pressedStyle, unpressedStyle } = useSelectionCellBorderStyle({
    borderColor,
    borderWidth,
    pressed,
    pressedBorderColor,
    pressedBorderWidth,
  });

  const handlePress = useCallback(() => {
    onChange?.(value, !checked);
  }, [onChange, value, checked]);

  const handlePressIn = useCallback(
    (event: GestureResponderEvent) => {
      setPressed(true);
      onPressIn?.(event);
    },
    [onPressIn],
  );

  const handlePressOut = useCallback(
    (event: GestureResponderEvent) => {
      setPressed(false);
      onPressOut?.(event);
    },
    [onPressOut],
  );

  const mergedPressableStyles = useMemo<
    StyleProp<ViewStyle> | ((state: PressableStateCallbackType) => StyleProp<ViewStyle>)
  >(() => {
    if (typeof style === 'function') {
      return (state) => [style(state), { flexDirection: 'row' }];
    }
    return [style, styles?.root, { flexDirection: 'row' }];
  }, [style, styles?.root]);

  const mergedFocusRingStyle: Animated.WithAnimatedValue<StyleProp<ViewStyle>> = useMemo(() => {
    const borderWidthDelta = theme.borderWidth[pressedBorderWidth] - theme.borderWidth[borderWidth];
    return [
      focusRingStyle,
      {
        transform: [{ translateX: -borderWidthDelta }, { translateY: -borderWidthDelta }],
        width: layout.width + borderWidthDelta * 2,
        height: layout.height + borderWidthDelta * 2,
        left: layout.x,
        top: layout.y,
        position: 'absolute',
        borderWidth: theme.borderWidth[pressedBorderWidth],
        borderRadius: theme.borderRadius[borderRadius],
        pointerEvents: 'none',
      },
    ];
  }, [
    borderRadius,
    borderWidth,
    focusRingStyle,
    layout.height,
    layout.width,
    layout.x,
    layout.y,
    pressedBorderWidth,
    theme.borderRadius,
    theme.borderWidth,
  ]);

  const mergedContentStyle: StyleProp<ViewStyle> = useMemo(
    () => [
      {
        flexDirection: 'row',
        alignItems: 'flex-start',
        gap: theme.space[columnGap],
      },
      contentStyle,
    ],
    [theme.space, columnGap, contentStyle],
  );

  const mergedWrapperStyles = useMemo(() => {
    return {
      ...(wrapperStyles ?? {}),
      base: [wrapperStyles?.base, unpressedStyle],
      pressed: [wrapperStyles?.pressed, pressedStyle],
    };
  }, [pressedStyle, unpressedStyle, wrapperStyles]);

  const combinedAccessibilityLabel = useMemo(() => {
    // Generate accessibility labels
    if (accessibilityLabel) return accessibilityLabel;

    const titleText = typeof title === 'string' ? title : undefined;
    const descriptionText = typeof description === 'string' ? description : undefined;

    const parts = [];
    if (titleText) parts.push(titleText);
    if (descriptionText) parts.push(descriptionText);
    return parts.join(', ');
  }, [accessibilityLabel, title, description]);

  const combinedAccessibilityHint = useMemo(() => {
    if (accessibilityHint) return accessibilityHint;
    return checked ? 'Tap to unselect this option' : 'Tap to select this option';
  }, [accessibilityHint, checked]);

  const radioHeight = theme.lineHeight.headline;

  return (
    <Box position="relative">
      <Pressable
        ref={ref}
        noScaleOnPress
        accessibilityHint={combinedAccessibilityHint}
        accessibilityLabel={combinedAccessibilityLabel}
        accessibilityRole="radio"
        accessibilityState={{ selected: checked }}
        background={background}
        borderColor={borderColor}
        borderRadius={borderRadius}
        borderWidth={borderWidth}
        contentStyle={mergedContentStyle}
        disabled={disabled || readOnly}
        onLayout={setLayout}
        onPress={handlePress}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        padding={padding}
        style={mergedPressableStyles}
        testID={testID}
        width={width}
        wrapperStyles={mergedWrapperStyles}
        {...props}
      >
        <HStack alignItems="center" height={radioHeight} style={styles?.radioContainer}>
          <Radio
            accessible={false}
            checked={!!checked}
            disabled={disabled}
            pointerEvents="none"
            readOnly={readOnly}
            value={value}
          />
        </HStack>
        <VStack flexGrow={1} flexShrink={1} gap={rowGap} style={styles?.contentContainer}>
          {typeof title === 'string' ? (
            <Text accessible={false} font="headline" style={styles?.title}>
              {title}
            </Text>
          ) : (
            title
          )}
          {description &&
            (typeof description === 'string' ? (
              <Text accessible={false} color="fgMuted" font="body" style={styles?.description}>
                {description}
              </Text>
            ) : (
              description
            ))}
        </VStack>
      </Pressable>
      {pressed && <Animated.View style={mergedFocusRingStyle} />}
    </Box>
  );
}) as <RadioValue extends string>(
  props: RadioCellProps<RadioValue> & { ref?: React.ForwardedRef<View> },
) => React.ReactElement;

export const RadioCell = memo(RadioCellWithRef) as typeof RadioCellWithRef &
  React.MemoExoticComponent<typeof RadioCellWithRef>;

RadioCell.displayName = 'RadioCell';
