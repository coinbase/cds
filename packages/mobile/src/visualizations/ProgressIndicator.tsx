import React, { forwardRef, memo, useMemo } from 'react';
import { Animated, StyleSheet } from 'react-native';
import type { StyleProp, View, ViewStyle } from 'react-native';
import type { SharedProps } from '@coinbase/cds-common/types/SharedProps';

import { useTheme } from '../hooks/useTheme';
import type { BoxProps } from '../layout/Box';
import { Box } from '../layout/Box';

export const PROGRESS_INDICATOR_WIDTH = 24;

export type ProgressIndicatorProps = {
  /** An Animated.Value or interpolated Animated.Value between 0 and 1 */
  progress?: Animated.Value | Animated.AnimatedInterpolation<number>;
  /**
   * @danger This is a migration escape hatch. It is not intended to be used normally.
   */
  style?: Animated.WithAnimatedValue<StyleProp<ViewStyle>>;
} & BoxProps &
  SharedProps;

export const ProgressIndicator = memo(
  forwardRef<View, ProgressIndicatorProps>(function ProgressIndicator(
    { progress, style, testID, ...boxProps },
    ref,
  ) {
    const theme = useTheme();
    const outerStyles = useMemo(
      () => [styles.dash, { backgroundColor: theme.color.bgLine }],
      [theme.color.bgLine],
    );
    const innerStyles = useMemo(
      () => [
        styles.dashOverlay,
        { backgroundColor: theme.color.bgInverse, zIndex: 2 },
        progress && {
          transform: [
            {
              translateX: progress.interpolate({
                inputRange: [0, 1],
                outputRange: [-PROGRESS_INDICATOR_WIDTH, 0],
              }),
            },
          ],
        },
      ],
      [theme.color.bgInverse, progress],
    );

    return (
      <Box
        ref={ref}
        animated
        alignItems="center"
        justifyContent="center"
        style={style}
        testID={testID}
        {...boxProps}
      >
        <Animated.View style={outerStyles}>
          <Animated.View style={innerStyles} />
        </Animated.View>
      </Box>
    );
  }),
);

const styles = StyleSheet.create({
  dash: {
    height: 2,
    width: PROGRESS_INDICATOR_WIDTH,
    borderRadius: 99,
    position: 'relative',
    overflow: 'hidden',
  },
  dashOverlay: StyleSheet.absoluteFillObject,
});

ProgressIndicator.displayName = 'ProgressIndicator';
