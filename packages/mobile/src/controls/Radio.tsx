import React, { forwardRef, memo } from 'react';
import { Animated, type ColorValue, StyleSheet, type View } from 'react-native';
import { Circle, Svg } from 'react-native-svg';

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

export type RadioBaseProps<T extends string> = ControlBaseProps<T>;

export type RadioProps<T extends string> = RadioBaseProps<T>;

const DotSvg = ({ color = 'black', width = 20 }: { color?: ColorValue; width?: number }) => {
  return (
    <Svg fill="none" height={width} viewBox={`0 0 ${width} ${width}`} width={width}>
      <Circle cx="50%" cy="50%" fill={color} r={width / 3} />
    </Svg>
  );
};

const RadioIcon: React.FC<React.PropsWithChildren<ControlIconProps>> = ({
  pressed,
  disabled,
  checked,
  background = 'bg',
  borderRadius = 1000,
  elevation,
  animatedScaleValue,
  animatedOpacityValue,
  controlColor = 'bgPrimary',
  borderColor = checked ? controlColor : 'bgLineHeavy',
  testID,
}) => {
  const theme = useTheme();
  const radioSize = theme.controlSize.radioSize;

  return (
    <Interactable
      background={background}
      borderColor={borderColor}
      borderRadius={borderRadius}
      borderWidth={100}
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
          <DotSvg color={theme.color[controlColor]} width={radioSize} />
        </Box>
      </Animated.View>
    </Interactable>
  );
};

const RadioWithRef = forwardRef(function Radio<T extends string>(
  { children, accessibilityHint, accessibilityLabel, ...props }: RadioProps<T>,
  ref: React.ForwardedRef<View>,
) {
  const accessibilityLabelValue =
    typeof children === 'string' && accessibilityLabel === undefined
      ? children
      : accessibilityLabel;

  return (
    <Control<T>
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
}) as <T extends string>(props: RadioProps<T> & { ref?: React.Ref<View> }) => React.ReactElement;

// Make memoized function stay generic function type
export const Radio = memo(RadioWithRef) as typeof RadioWithRef &
  React.MemoExoticComponent<typeof RadioWithRef>;
