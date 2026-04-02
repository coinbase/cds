import React, { forwardRef, memo } from 'react';
import { Animated, type ColorValue, StyleSheet, type View } from 'react-native';
import { Circle, Svg } from 'react-native-svg';
import type { ThemeVars } from '@coinbase/cds-common';

import { useComponentConfig } from '../hooks/useComponentConfig';
import { useTheme } from '../hooks/useTheme';
import { Box } from '../layout';
import { Interactable } from '../system/Interactable';

import { Control, type ControlBaseProps, type ControlIconProps } from './Control';

const styles = StyleSheet.create({
  circle: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export type RadioBaseProps<RadioValue extends string> = Omit<
  ControlBaseProps<RadioValue>,
  'controlColor' | 'controlSize' | 'dotSize'
> & {
  /**
   * Sets the checked/active color of the radio.
   * @default bgPrimary
   */
  controlColor?: ThemeVars.Color;
  /**
   * Sets the border width of the radio.
   * @default 100
   */
  borderWidth?: ThemeVars.BorderWidth;
  /**
   * Sets the outer radio control size in pixels.
   * @default theme.controlSize.radioSize
   */
  controlSize?: number;
  /**
   * Sets the inner dot size in pixels.
   * @default 2/3 of controlSize
   */
  dotSize?: number;
};

export type RadioProps<RadioValue extends string> = RadioBaseProps<RadioValue>;

const DotSvg = ({
  color = 'black',
  width = 20,
  dotSize = (2 * width) / 3,
}: {
  color?: ColorValue;
  width?: number;
  dotSize?: number;
}) => {
  return (
    <Svg fill="none" height={width} viewBox={`0 0 ${width} ${width}`} width={width}>
      <Circle cx="50%" cy="50%" fill={color} r={dotSize / 2} />
    </Svg>
  );
};

const RadioIcon: React.FC<React.PropsWithChildren<ControlIconProps>> = ({
  pressed,
  disabled,
  checked,
  background = 'bg',
  borderRadius = 1000,
  borderWidth = 100,
  elevation,
  animatedScaleValue,
  animatedOpacityValue,
  controlColor = 'bgPrimary',
  controlSize,
  dotSize,
  borderColor = checked ? controlColor : 'bgLineHeavy',
  testID,
}) => {
  const theme = useTheme();
  const radioSize = controlSize ?? theme.controlSize.radioSize;

  return (
    <Interactable
      background={background}
      borderColor={borderColor}
      borderRadius={borderRadius}
      borderWidth={borderWidth}
      disabled={disabled}
      elevation={elevation}
      pressed={pressed}
      style={[
        styles.circle,
        {
          width: radioSize,
          height: radioSize,
        },
      ]}
      testID={testID}
    >
      <Animated.View
        style={{ transform: [{ scale: animatedScaleValue }], opacity: animatedOpacityValue }}
      >
        <Box testID="radio-icon">
          <DotSvg color={theme.color[controlColor]} dotSize={dotSize} width={radioSize} />
        </Box>
      </Animated.View>
    </Interactable>
  );
};

const RadioWithRef = forwardRef(function Radio<RadioValue extends string>(
  _props: RadioProps<RadioValue>,
  ref: React.ForwardedRef<View>,
) {
  const mergedProps = useComponentConfig('Radio', _props);
  const { children, accessibilityHint, accessibilityLabel, ...props } = mergedProps;
  const accessibilityLabelValue =
    typeof children === 'string' && accessibilityLabel === undefined
      ? children
      : accessibilityLabel;
  return (
    <Control<RadioValue>
      {...props}
      ref={ref}
      accessibilityHint={accessibilityHint}
      accessibilityLabel={accessibilityLabelValue}
      accessibilityRole="radio"
      hitSlop={5}
      label={children}
    >
      {RadioIcon}
    </Control>
  );
  // Make forwardRef result function stay generic function type
}) as <RadioValue extends string>(
  props: RadioProps<RadioValue> & { ref?: React.Ref<View> },
) => React.ReactElement;

// Make memoized function stay generic function type
export const Radio = memo(RadioWithRef) as typeof RadioWithRef &
  React.MemoExoticComponent<typeof RadioWithRef>;
