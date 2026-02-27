import React, { forwardRef, memo, useMemo } from 'react';
import type { View } from 'react-native';
import { animated, to } from '@react-spring/native';

import { Box } from '../layout/Box';
import { TextHeadline } from '../typography/TextHeadline';

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

      const animatedStyle = useMemo(
        () => ({ opacity: disabled ? 0.5 : to(progress, (value) => 1 - value) }),
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
        </Box>
      );
    },
  ),
);
