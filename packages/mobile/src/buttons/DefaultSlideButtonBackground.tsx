import React, { forwardRef, memo, useMemo } from 'react';
import { StyleSheet, View } from 'react-native';
import { animated, to } from '@react-spring/native';

import { useTheme } from '../hooks/useTheme';
import { TextHeadline } from '../typography/TextHeadline';

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

      const animatedStyle = useMemo(
        () => ({ opacity: disabled ? 0.5 : to(progress, (value) => 1 - value) }),
        [progress, disabled],
      );

      return (
        <View ref={ref} aria-hidden style={containerStyle}>
          <animated.View style={animatedStyle}>
            {typeof uncheckedLabel !== 'string' ? (
              uncheckedLabel
            ) : (
              <TextHeadline
                numberOfLines={1}
                paddingEnd={horizontalPadding}
                paddingStart={horizontalPadding}
              >
                {uncheckedLabel}
              </TextHeadline>
            )}
          </animated.View>
        </View>
      );
    },
  ),
);
