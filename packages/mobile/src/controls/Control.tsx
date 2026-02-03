import React, { forwardRef, memo, useCallback, useEffect, useMemo, useRef } from 'react';
import { I18nManager, Keyboard, Pressable, View } from 'react-native';
import type {
  AccessibilityActionEvent,
  Animated,
  PressableProps,
  PressableStateCallbackType,
  ViewStyle,
} from 'react-native';
import type { ElevationLevels, SharedProps } from '@coinbase/cds-common';
import type { ThemeVars } from '@coinbase/cds-common/core/theme';
import {
  accessibleOpacityDisabled,
  opacityPressed,
} from '@coinbase/cds-common/tokens/interactable';
import { isDevelopment } from '@coinbase/cds-utils';

import { useTheme } from '../hooks/useTheme';
import type { InteractableBaseProps } from '../system';
import type { TextProps } from '../typography/Text';
import { Text } from '../typography/Text';
import { Haptics } from '../utils/haptics';

import { useControlMotionProps } from './useControlMotionProps';

export type ControlIconProps = SharedProps & {
  pressed: boolean;
  checked?: boolean;
  indeterminate?: boolean;
  disabled?: boolean;
  controlColor?: ThemeVars.Color;
  background?: ThemeVars.Color;
  borderColor?: ThemeVars.Color;
  borderRadius?: ThemeVars.BorderRadius;
  borderWidth?: ThemeVars.BorderWidth;
  elevation?: ElevationLevels;
  animatedScaleValue: Animated.Value;
  animatedOpacityValue: Animated.Value;
  accessible?: boolean;
};

export type ControlBaseProps<ControlValue extends string> = Omit<
  PressableProps,
  'disabled' | 'children' | 'style'
> &
  Partial<
    Pick<
      InteractableBaseProps,
      'background' | 'borderColor' | 'borderRadius' | 'borderWidth' | 'color'
    >
  > & {
    /** Label for the control option. */
    children?: React.ReactNode;
    /** Set the control to selected/on. */
    checked?: boolean;
    /** Disable user interaction. */
    disabled?: boolean;
    /** Set the control to ready-only. Similar effect as disabled. */
    readOnly?: boolean;
    /** Value of the option. Useful for multiple choice. */
    value?: ControlValue;
    /** Accessibility label describing the element. */
    accessibilityLabel?: string;
    /** Enable indeterminate state. Useful when you want to indicate that sub-items of a control are partially filled. */
    indeterminate?: boolean;
    /** Toggle control selected state. */
    onChange?: (value: ControlValue | undefined, checked?: boolean) => void;
    /** Sets the checked/active color of the control.
     * @default bgPrimary
     */
    controlColor?: ThemeVars.Color;
    /** Sets the elevation/drop shadow of the control. */
    elevation?: ElevationLevels;
    style?: ViewStyle;
  };

export type ControlProps<ControlValue extends string> = Omit<
  ControlBaseProps<ControlValue>,
  'children'
> & {
  /** Control icon to show. */
  children: React.ComponentType<React.PropsWithChildren<ControlIconProps>>;
  /** Label associated with the multiple choice option control. */
  label?: TextProps['children'];
  /** If control is a switch. This will use switch motion token. */
  shouldUseSwitchTransition?: boolean;
};

const ControlWithRef = forwardRef(function ControlWithRef<ControlValue extends string>(
  {
    testID,
    label,
    checked,
    indeterminate,
    disabled = false,
    readOnly = false,
    onChange,
    hitSlop = 4,
    value,
    controlColor,
    elevation,
    accessibilityRole,
    accessibilityLabel,
    accessibilityHint,
    children: ControlIcon,
    shouldUseSwitchTransition,
    accessible = true,
    style,
    color,
    background,
    borderColor,
    borderRadius,
    borderWidth,
    ...props
  }: ControlProps<ControlValue>,
  ref: React.ForwardedRef<View>,
) {
  const theme = useTheme();

  if (isDevelopment() && accessible && !label && !accessibilityLabel) {
    console.warn(
      `Please specify an accessibility label for the ${accessibilityRole} control with value ${value}.`,
    );
  }

  const bodyLineHeight = theme.lineHeight.body;
  const isMounted = useRef(false);

  const { animation, animatedBoxValue, animatedScaleValue, animatedOpacityValue } =
    useControlMotionProps({
      checked: checked || indeterminate,
      disabled,
      shouldUseSwitchTransition,
    });

  const pressDisabled = disabled || readOnly;

  useEffect(() => {
    if (isMounted.current) animation.start();
    else isMounted.current = true;
  }, [checked, indeterminate, animation]);

  const handlePress = useCallback(() => {
    void Haptics.lightImpact();
    const newChecked = typeof checked === 'boolean' ? !checked : undefined;
    onChange?.(value, newChecked);
    Keyboard.dismiss();
  }, [checked, onChange, value]);

  const iconWrapperStyles: ViewStyle = useMemo(
    () => ({
      height: bodyLineHeight,
      justifyContent: 'center',
    }),
    [bodyLineHeight],
  );

  const pressableStyle: ViewStyle = useMemo(
    () => ({
      flexDirection: I18nManager.isRTL ? 'row-reverse' : 'row',
      alignItems: 'flex-start',
      gap: theme.space[1],
      ...style,
    }),
    [theme.space, style],
  );

  const getLabelStyle = useCallback(
    (state: PressableStateCallbackType) => ({
      color: color
        ? theme.color[color]
        : animatedBoxValue.interpolate({
            inputRange: [0, 1],
            outputRange: [theme.color.fgMuted, theme.color.fg],
          }),
      // Prevent text element from expanding beyond available width.
      flexShrink: 1,
      opacity: state.pressed ? opacityPressed : pressDisabled ? accessibleOpacityDisabled : 1,
    }),
    [animatedBoxValue, color, pressDisabled, theme.color],
  );

  const accessibilityProps = useMemo(
    () =>
      accessible
        ? {
            accessibilityActions: [{ name: 'activate' }],
            accessibilityHint,
            accessibilityLabel,
            accessibilityRole,
            accessibilityState: {
              disabled: pressDisabled,
              checked: Boolean(checked || indeterminate),
            },
          }
        : {},
    [
      accessible,
      accessibilityHint,
      accessibilityLabel,
      accessibilityRole,
      pressDisabled,
      checked,
      indeterminate,
    ],
  );

  const handleAccessibilityAction = useCallback(
    (event: AccessibilityActionEvent) => {
      if (event.nativeEvent.actionName === 'activate') handlePress();
    },
    [handlePress],
  );

  const controlIcon = useCallback(
    ({ pressed }: { pressed: boolean }) => {
      /**
       * If the control has label, the label's lineHeight doesn't match the icon size. We need to
       * wrap the icon with a container that match the lineHeight of the label typography and
       * center the icon inside the wrapper so that the icon will be aligned properly with the
       * first line of the label text.
       */
      const iconElement = (
        <ControlIcon
          animatedOpacityValue={animatedOpacityValue}
          animatedScaleValue={animatedScaleValue}
          background={background}
          borderColor={borderColor}
          borderRadius={borderRadius}
          borderWidth={borderWidth}
          checked={checked}
          controlColor={controlColor}
          disabled={pressDisabled}
          elevation={elevation}
          indeterminate={indeterminate}
          pressed={pressed}
          testID={testID}
        />
      );

      if (!label) return iconElement;
      return (
        <>
          <View style={iconWrapperStyles}>{iconElement}</View>
          <Text
            animated
            disabled={disabled || readOnly}
            font="body"
            style={getLabelStyle({ pressed })}
            testID={`${testID}Label`}
          >
            {label}
          </Text>
        </>
      );
    },
    [
      ControlIcon,
      animatedOpacityValue,
      animatedScaleValue,
      background,
      borderColor,
      borderRadius,
      borderWidth,
      checked,
      controlColor,
      disabled,
      elevation,
      getLabelStyle,
      iconWrapperStyles,
      indeterminate,
      label,
      pressDisabled,
      readOnly,
      testID,
    ],
  );

  return (
    <Pressable
      ref={ref}
      accessible={accessible}
      {...accessibilityProps}
      disabled={pressDisabled}
      hitSlop={hitSlop}
      onAccessibilityAction={handleAccessibilityAction}
      onPress={handlePress}
      style={pressableStyle}
      {...props}
    >
      {controlIcon}
    </Pressable>
  );
  // Make forwardRef result function stay generic function type
}) as <ControlValue extends string>(
  props: ControlProps<ControlValue> & { ref?: React.Ref<View> },
) => React.ReactElement;

// Make memoized function stay generic function type
export const Control = memo(ControlWithRef) as typeof ControlWithRef &
  React.MemoExoticComponent<typeof ControlWithRef>;
