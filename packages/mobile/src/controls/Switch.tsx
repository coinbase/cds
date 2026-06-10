import React, { forwardRef, memo, useMemo } from 'react';
import { type StyleProp, StyleSheet, type View, type ViewStyle } from 'react-native';

import { useComponentConfig } from '../hooks/useComponentConfig';
import { useTheme } from '../hooks/useTheme';
import { Box } from '../layout/Box';
import { Interactable } from '../system/Interactable';

import { Control, type ControlBaseProps, type ControlIconProps } from './Control';

export type SwitchBaseProps<SwitchValue extends string> = Omit<
  ControlBaseProps<SwitchValue>,
  'controlSize' | 'dotSize'
>;

export type SwitchProps<SwitchValue extends string> = SwitchBaseProps<SwitchValue> & {
  /**
   * Label content rendered next to the switch control.
   *
   * @example
   * ```tsx
   * <Switch onChange={handleChange}>Dark mode</Switch>
   * ```
   */
  children?: React.ReactNode;
  /** Slot-level styles for Switch. */
  styles?: {
    /** Persistent outer wrapper across all variants. */
    root?: StyleProp<ViewStyle>;
    /**
     * Control wrapper style.
     * Applied to the underlying `Control` element (same element that receives `style`).
     */
    control?: StyleProp<ViewStyle>;
  };
};

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

  // Inset that keeps the thumb centered within the track regardless of the
  // configured track/thumb sizes (built-in themes use a 1px inset).
  const thumbInset = (switchHeight - switchThumbSize) / 2;

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
        top: thumbInset - borderSize,
        left: thumbInset - borderSize,
      } as const,
      {
        transform: [
          {
            translateX: animatedScaleValue.interpolate({
              inputRange: [0.9, 1],
              outputRange: [0, switchWidth - switchThumbSize - thumbInset * 2],
            }),
          },
        ],
      },
    ],
    [animatedScaleValue, borderSize, thumbInset, switchThumbSize, switchWidth],
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
  _props: SwitchProps<SwitchValue>,
  ref: React.ForwardedRef<View>,
) {
  const mergedProps = useComponentConfig('Switch', _props);
  const { children, style, styles, ...props } = mergedProps;
  const theme = useTheme();
  const { switchHeight } = theme.controlSize;
  const controlStyles = useMemo(
    () => StyleSheet.flatten([style, styles?.control]),
    [style, styles?.control],
  );

  const switchNode = (
    <Control
      ref={ref}
      accessible
      shouldUseSwitchTransition
      accessibilityRole="switch"
      label={children}
      style={controlStyles}
      {...props}
    >
      {SwitchIcon}
    </Control>
  );

  return (
    <Box
      alignItems={children ? 'center' : undefined}
      flexDirection={children ? 'row' : undefined}
      minHeight={children ? switchHeight : undefined}
      style={styles?.root}
    >
      {switchNode}
    </Box>
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
