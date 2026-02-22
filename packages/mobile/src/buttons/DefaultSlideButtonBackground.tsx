import React, { forwardRef, memo, useMemo } from 'react';
import { StyleSheet, View } from 'react-native';
import Animated, { useAnimatedStyle } from 'react-native-reanimated';

import { useTheme } from '../hooks/useTheme';
import { Text } from '../typography/Text';

import type { SlideButtonBackgroundProps } from './SlideButton';

export const styles = StyleSheet.create({
  base: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export const DefaultSlideButtonBackground = memo(
  forwardRef<View, SlideButtonBackgroundProps>(
    ({ progress, uncheckedLabel, disabled, compact, style, borderRadius }, ref) => {
      const theme = useTheme();

      const horizontalPadding = compact ? 7 : 9;

      const containerStyle = useMemo(
        () => [
          styles.base,
          {
            backgroundColor: theme.color.bgSecondary,
            borderRadius,
          },
          style,
        ],
        [theme.color.bgSecondary, style, borderRadius],
      );

      const animatedStyle = useAnimatedStyle(
        () => ({ opacity: disabled ? 0.5 : 1 - progress.value }),
        [progress, disabled],
      );

      return (
        <View ref={ref} aria-hidden style={containerStyle}>
          <Animated.View style={animatedStyle}>
            {typeof uncheckedLabel !== 'string' ? (
              uncheckedLabel
            ) : (
              <Text
                font="headline"
                numberOfLines={1}
                paddingEnd={horizontalPadding}
                paddingStart={horizontalPadding}
              >
                {uncheckedLabel}
              </Text>
            )}
          </Animated.View>
        </View>
      );
    },
  ),
);
