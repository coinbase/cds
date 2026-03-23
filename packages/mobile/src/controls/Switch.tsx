import React, { forwardRef, memo, useMemo } from 'react';
import { StyleSheet, type View } from 'react-native';

import { useTheme } from '../hooks/useTheme';
import { Box } from '../layout/Box';
import { Interactable } from '../system/Interactable';

import { Control, type ControlBaseProps, type ControlIconProps } from './Control';

export type SwitchBaseProps<SwitchValue extends string> = Omit<
  ControlBaseProps<SwitchValue>,
  'style'
>;

export type SwitchProps<SwitchValue extends string> = SwitchBaseProps<SwitchValue>;

const SwitchIcon = ({
  pressed,
  checked,
  disabled,
  controlColor,
  background = checked ? 'bgPrimary' : 'bgTertiary',
  borderColor,
  borderRadius = 1000,
  borderWidth = 0,
  animatedScaleValue,
  testID,
  elevation,
}: ControlIconProps) => {
  const theme = useTheme();

  const borderSize = theme.borderWidth[borderWidth];
  const defaultControlColor = theme.activeColorScheme === 'dark' ? 'fg' : 'fgInverse';

  const { switchWidth, switchHeight, switchThumbSize } = theme.controlSize;

  const trackStyle = useMemo(
    () => [
      {
        width: switchWidth,
        height: switchHeight,
      } as const,
    ],
    [switchWidth, switchHeight],
  );

  const thumbStyle = useMemo(
    () => [
      styles.thumb,
      {
        width: switchThumbSize,
        height: switchThumbSize,
        position: 'absolute',
        top: 1 - borderSize,
        left: 1 - borderSize,
      } as const,
      {
        transform: [
          {
            translateX: animatedScaleValue.interpolate({
              inputRange: [0.9, 1],
              outputRange: [0, switchWidth - switchThumbSize - 2],
            }),
          },
        ],
      },
    ],
    [animatedScaleValue, borderSize, switchThumbSize, switchWidth],
  );

  return (
    <Interactable
      background={background}
      borderColor={borderColor}
      borderRadius={borderRadius}
      borderWidth={borderWidth}
      disabled={disabled}
      pressed={pressed}
      style={trackStyle}
      testID={testID}
    >
      <Interactable
        background={controlColor ?? defaultControlColor}
        borderColor="bgLine"
        borderRadius={borderRadius}
        borderWidth={100}
        disabled={disabled}
        elevation={elevation}
        pressed={pressed}
        style={thumbStyle}
        testID="switch-thumb"
      />
    </Interactable>
  );
};

const SwitchWithRef = forwardRef(function SwitchWithRef<SwitchValue extends string>(
  { children, ...props }: SwitchProps<SwitchValue>,
  ref: React.ForwardedRef<View>,
) {
  const theme = useTheme();
  const { switchHeight } = theme.controlSize;

  const switchNode = (
    <Control
      {...props}
      ref={ref}
      accessible
      shouldUseSwitchTransition
      accessibilityRole="switch"
      label={children}
    >
      {SwitchIcon}
    </Control>
  );

  return children ? (
    <Box alignItems="center" flexDirection="row" minHeight={switchHeight}>
      {switchNode}
    </Box>
  ) : (
    switchNode
  );
});

export const Switch = memo(SwitchWithRef);

const styles = StyleSheet.create({
  thumb: {
    position: 'absolute',
    top: 1,
    left: 1,
  },
});
