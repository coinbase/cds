import React, { forwardRef, memo } from 'react';
import type { View } from 'react-native';
import Animated, { useAnimatedStyle } from 'react-native-reanimated';

import { Box } from '../layout/Box';
import { Text } from '../typography/Text';

import type { SlideButtonBackgroundProps } from './SlideButton';

export const DefaultSlideButtonBackground = memo(
  forwardRef<View, SlideButtonBackgroundProps>(
    (
      {
        progress,
        uncheckedLabel,
        disabled,
        compact,
        style,
        borderRadius,
        borderTopLeftRadius,
        borderTopRightRadius,
        borderBottomLeftRadius,
        borderBottomRightRadius,
      },
      ref,
    ) => {
      const horizontalPadding = compact ? 7 : 9;

      const animatedStyle = useAnimatedStyle(
        () => ({ opacity: disabled ? 0.5 : 1 - progress.value }),
        [progress, disabled],
      );

      return (
        <Box
          ref={ref}
          aria-hidden
          alignItems="center"
          background="bgSecondary"
          borderBottomLeftRadius={borderBottomLeftRadius}
          borderBottomRightRadius={borderBottomRightRadius}
          borderRadius={borderRadius}
          borderTopLeftRadius={borderTopLeftRadius}
          borderTopRightRadius={borderTopRightRadius}
          height="100%"
          justifyContent="center"
          style={style}
          width="100%"
        >
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
        </Box>
      );
    },
  ),
);
