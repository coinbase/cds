import React, { forwardRef, memo, useCallback, useMemo } from 'react';
import { StyleSheet, View } from 'react-native';
import { type SharedProps } from '@cbhq/cds-common';

import { useTheme } from '../hooks/useTheme';
import { Icon } from '../icons';
import { HStack, VStack, type VStackProps } from '../layout';
import { type HapticFeedbackType, Pressable } from '../system/Pressable';
import { Text } from '../typography/Text';

export const SEPARATOR = 'SEPARATOR';
export const DELETE = 'DELETE';

export type SeparatorType = typeof SEPARATOR;
export type DeleteType = typeof DELETE;

export type NumpadValue = number | SeparatorType | DeleteType;

export type NumpadButtonProps = {
  value: NumpadValue;
  onPress: (value: NumpadValue) => void;
  onLongPress?: (value: NumpadValue) => void;
  separator?: string;
  disabled?: boolean;
  separatorAccessibilityLabel?: string;
  deleteAccessibilityLabel?: string;
  feedback?: HapticFeedbackType;
};

export type NumpadProps = {
  onPress: (value: NumpadValue) => void;
  onLongPress?: (value: NumpadValue) => void;
  separator?: string;
  disabled?: boolean;
  accessory?: React.ReactNode;
  action?: React.ReactNode;
  separatorAccessibilityLabel?: string;
  deleteAccessibilityLabel?: string;
  /**
   * Haptic feedback to trigger when being pressed.
   * @default none
   */
  feedback?: HapticFeedbackType;
} & SharedProps &
  VStackProps;

const buttonValues: NumpadValue[][] = [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9],
  [SEPARATOR, 0, DELETE],
];

const styles = StyleSheet.create({
  content: {
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'center',
    height: 48,
  },
  button: {
    justifyContent: 'center',
    alignItems: 'stretch',
    width: '33.3333333%',
  },
});

export const Numpad = memo(
  forwardRef(function Numpad(
    {
      separator = '.',
      disabled,
      onPress,
      onLongPress,
      accessory,
      action,
      deleteAccessibilityLabel = 'delete',
      separatorAccessibilityLabel = 'period',
      testID,
      background,
      flexGrow = 0,
      flexShrink = 0,
      gap = 2,
      feedback,
      ...props
    }: NumpadProps,
    forwardedRef: React.ForwardedRef<View>,
  ) {
    const buttons = useMemo(() => {
      return buttonValues.map((values, i) => {
        return (
          <HStack
            key={`num_pad_item_${i}`}
            alignItems="stretch"
            flexGrow={1}
            flexWrap="nowrap"
            justifyContent="space-between"
            paddingX={2}
          >
            {values.map((value) => (
              <NumpadButton
                key={`value_${value}`}
                deleteAccessibilityLabel={deleteAccessibilityLabel}
                disabled={disabled}
                feedback={feedback}
                onLongPress={onLongPress}
                onPress={onPress}
                separator={separator}
                separatorAccessibilityLabel={separatorAccessibilityLabel}
                value={value}
              />
            ))}
          </HStack>
        );
      });
    }, [
      deleteAccessibilityLabel,
      disabled,
      feedback,
      onLongPress,
      onPress,
      separator,
      separatorAccessibilityLabel,
    ]);

    return (
      <VStack
        ref={forwardedRef}
        background={background}
        flexGrow={flexGrow}
        flexShrink={flexShrink}
        gap={gap}
        testID={testID}
        {...props}
      >
        {accessory}
        <VStack flexGrow={1} flexShrink={1} justifyContent="space-between">
          {buttons}
        </VStack>
        {action}
      </VStack>
    );
  }),
);

const NumpadButton = memo(function NumpadButton({
  value,
  onPress,
  onLongPress,
  separator = '.',
  disabled,
  separatorAccessibilityLabel,
  deleteAccessibilityLabel,
  feedback,
}: NumpadButtonProps) {
  const theme = useTheme();
  const content = useMemo(() => {
    if (value === 'DELETE') {
      return <Icon color="fg" name="backArrow" size="s" />;
    }
    return (
      <Text align="center" font="title2" padding={0}>
        {value === 'SEPARATOR' ? separator : value}
      </Text>
    );
  }, [separator, value]);

  const handleOnPress = useCallback(() => onPress(value), [onPress, value]);

  const handleLongPress = useCallback(() => onLongPress?.(value), [onLongPress, value]);

  const accessibilityLabel = useMemo(() => {
    if (value === 'DELETE') return deleteAccessibilityLabel;
    if (value === 'SEPARATOR') return separatorAccessibilityLabel;
    return String(value);
  }, [value, deleteAccessibilityLabel, separatorAccessibilityLabel]);

  const testID = useMemo(() => {
    if (value === 'DELETE') return 'numpad-back';
    if (value === 'SEPARATOR') return 'numpad-separator';
    return `numpad-${value}`;
  }, [value]);

  const pressableStyles = useMemo(
    () => ({
      ...styles.button,
      opacity: value === 'SEPARATOR' && separator === '' ? 0 : undefined,
      pointerEvents: value === 'SEPARATOR' && separator === '' ? ('none' as const) : undefined,
    }),
    [separator, value],
  );

  return (
    <Pressable
      accessibilityLabel={accessibilityLabel}
      accessibilityRole="button"
      accessibilityState={{ disabled }}
      background="transparent"
      blendStyles={{ pressedBackground: theme.color.bg, disabledBackground: theme.color.bg }}
      borderRadius={200}
      debounceTime={100}
      disabled={disabled}
      feedback={feedback}
      onLongPress={handleLongPress}
      onPress={handleOnPress}
      style={pressableStyles}
      testID={testID}
    >
      <View style={styles.content}>{content}</View>
    </Pressable>
  );
});
