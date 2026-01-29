import React, { forwardRef, memo, useMemo } from 'react';
import { Animated } from 'react-native';
import type { View } from 'react-native';
import type { ThemeVars } from '@coinbase/cds-common';

import { useTheme } from '../hooks/useTheme';
import { Icon } from '../icons/Icon';
import { Interactable } from '../system/Interactable';

import { Control, type ControlBaseProps, type ControlIconProps } from './Control';

export type CheckboxBaseProps<CheckboxValue extends string> = ControlBaseProps<CheckboxValue>;

export type CheckboxProps<CheckboxValue extends string> = ControlBaseProps<CheckboxValue> & {
  /** Sets the checked/active color of the control.
   * @default bgPrimary
   */
  controlColor?: ThemeVars.Color;
  /**
   * Optional.Sets the border width of the checkbox.
   * @default 100
   */
  borderWidth?: ThemeVars.BorderWidth;
};

const CheckboxIcon = memo(
  ({
    pressed,
    checked,
    indeterminate,
    disabled,
    controlColor = 'fgInverse',
    background = checked || indeterminate ? 'bgPrimary' : 'bg',
    borderColor = checked || indeterminate ? 'bgPrimary' : 'bgLineHeavy',
    borderRadius,
    borderWidth = 100,
    elevation,
    animatedScaleValue,
    animatedOpacityValue,
    testID,
  }: React.PropsWithChildren<ControlIconProps>) => {
    const filled = checked || indeterminate;
    const theme = useTheme();
    const checkboxSize = theme.controlSize.checkboxSize;
    const iconPadding = checkboxSize / 5;
    const iconSize = checkboxSize - iconPadding;

    const animatedStyle = useMemo(
      () => ({ transform: [{ scale: animatedScaleValue }], opacity: animatedOpacityValue }),
      [animatedScaleValue, animatedOpacityValue],
    );

    const iconStyle = useMemo(
      () => ({
        icon: {
          width: iconSize,
          height: iconSize,
          fontSize: iconSize,
          lineHeight: iconSize,
          opacity: filled ? 1 : 0,
        } as const,
      }),
      [iconSize, filled],
    );

    return (
      <Interactable
        alignItems="center"
        background={background}
        borderColor={borderColor}
        borderRadius={borderRadius}
        borderWidth={borderWidth}
        disabled={disabled}
        elevation={elevation}
        height={checkboxSize}
        justifyContent="center"
        pressed={pressed}
        testID={testID}
        width={checkboxSize}
      >
        <Animated.View style={animatedStyle}>
          <Icon
            color={controlColor}
            name={checked ? 'checkmark' : 'minus'}
            size="s"
            styles={iconStyle}
            testID="checkbox-icon"
          />
        </Animated.View>
      </Interactable>
    );
  },
);

const CheckboxWithRef = forwardRef(function Checkbox<CheckboxValue extends string>(
  {
    children,
    accessibilityLabel,
    accessibilityHint,
    accessible = true,
    ...props
  }: CheckboxProps<CheckboxValue>,
  ref: React.ForwardedRef<View>,
) {
  const accessibilityLabelValue =
    typeof children === 'string' && accessibilityLabel === undefined
      ? children
      : accessibilityLabel;

  const accessibilityHintValue =
    typeof children === 'string' && accessibilityHint === undefined ? children : accessibilityHint;

  return (
    <Control<CheckboxValue>
      ref={ref}
      accessibilityHint={accessibilityHintValue}
      accessibilityLabel={accessibilityLabelValue}
      accessibilityRole="checkbox"
      accessible={accessible}
      hitSlop={5}
      label={children}
      {...props}
    >
      {CheckboxIcon}
    </Control>
  );
  // Make forwardRef result function stay generic function type
}) as <CheckboxValue extends string>(
  props: CheckboxProps<CheckboxValue> & { ref?: React.Ref<View> },
) => React.ReactElement;

// Make memoized function stay generic function type
export const Checkbox = memo(CheckboxWithRef) as typeof CheckboxWithRef &
  React.MemoExoticComponent<typeof CheckboxWithRef>;
