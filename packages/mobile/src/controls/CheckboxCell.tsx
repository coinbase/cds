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
import { Pressable, type PressableBaseProps } from '../system/Pressable';
import { Text } from '../typography/Text';

import { Checkbox } from './Checkbox';
import type { ControlBaseProps } from './Control';

export type CheckboxCellBaseProps<CheckboxValue extends string> = {
  title: React.ReactNode;
  description?: React.ReactNode;
  columnGap?: ThemeVars.Space;
  rowGap?: ThemeVars.Space;
  pressedBorderColor?: ThemeVars.Color;
  pressedBorderWidth?: ThemeVars.BorderWidth;
} & Omit<ControlBaseProps<CheckboxValue>, 'style' | 'children' | 'title'> &
  Omit<PressableBaseProps, 'children' | 'noScaleOnPress'>;

export type CheckboxCellProps<CheckboxValue extends string> =
  CheckboxCellBaseProps<CheckboxValue> & {
    styles?: {
      root?: StyleProp<ViewStyle>;
      checkboxContainer?: StyleProp<ViewStyle>;
      contentContainer?: StyleProp<ViewStyle>;
      title?: StyleProp<TextStyle>;
      description?: StyleProp<TextStyle>;
    };
  };

const CheckboxCellWithRef = forwardRef(function CheckboxCell<CheckboxValue extends string>(
  {
    title,
    description,
    checked,
    onChange,
    disabled,
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
    indeterminate,
    readOnly,
    styles,
    ...props
  }: CheckboxCellProps<CheckboxValue>,
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
    pressedBorderWidth: pressedBorderWidth ?? borderWidth,
  });

  const handlePress = useCallback(() => {
    onChange?.(value, !checked);
  }, [value, checked, onChange]);

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
    return checked ? 'Tap to uncheck this option' : 'Tap to check this option';
  }, [accessibilityHint, checked]);

  const checkboxHeight = theme.lineHeight.headline;

  return (
    <Box position="relative">
      <Pressable
        ref={ref}
        noScaleOnPress
        accessibilityHint={combinedAccessibilityHint}
        accessibilityLabel={combinedAccessibilityLabel}
        accessibilityRole="checkbox"
        accessibilityState={{ checked: !!checked }}
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
        <HStack alignItems="center" height={checkboxHeight} style={styles?.checkboxContainer}>
          <Checkbox
            accessible={false}
            checked={!!checked}
            disabled={disabled}
            indeterminate={indeterminate}
            pointerEvents="none"
            readOnly={readOnly}
            value={value}
          />
        </HStack>
        <VStack flexBasis={0} flexGrow={1} gap={rowGap} style={styles?.contentContainer}>
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
}) as <CheckboxValue extends string>(
  props: CheckboxCellProps<CheckboxValue> & { ref?: React.ForwardedRef<View> },
) => React.ReactElement;

export const CheckboxCell = memo(CheckboxCellWithRef) as typeof CheckboxCellWithRef &
  React.MemoExoticComponent<typeof CheckboxCellWithRef>;

CheckboxCell.displayName = 'CheckboxCell';
