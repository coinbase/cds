// Simplified version of https://github.com/tomzaku/react-native-shimmer-placeholder/blob/master/lib/ShimmerPlaceholder.js
import React, { memo, useEffect, useMemo, useRef } from 'react';
import { Animated, StyleSheet, Text, View } from 'react-native';
import type { DimensionValue, ViewStyle } from 'react-native';
import type { UseFallbackShapeOptions } from '@coinbase/cds-common/hooks/useFallbackShape';
import { useFallbackShape } from '@coinbase/cds-common/hooks/useFallbackShape';
import type { Shape } from '@coinbase/cds-common/types/Shape';

import { LinearGradient } from '../gradients/LinearGradient';
import { useTheme } from '../hooks/useTheme';
import { fallbackShimmer } from '../styles/fallbackShimmer';

import type { BoxProps } from './Box';
import { Box } from './Box';

export type FallbackBaseProps = {
  height: number | string;
  /**
   * @default rectangle
   */
  shape?: Shape;
  width: number | string;
  /** Disables randomization of rectangle shape width. */
  disableRandomRectWidth?: boolean;
  /**
   * When shape is a rectangle, creates a variant with deterministic width.
   * Variants map to a predetermined set of width values, which are cycled through repeatedly when the set is exhausted.
   */
  rectWidthVariant?: number;
};

export type FallbackProps = Omit<BoxProps, 'borderRadius' | 'height' | 'width'> & FallbackBaseProps;

export const Fallback = memo(function Fallback({
  height,
  shape = 'rectangle',
  width: baseWidth,
  disableRandomRectWidth,
  rectWidthVariant,
  accessibilityLabel = 'Loading',
  ...props
}: FallbackProps) {
  const fallbackShapeOptions = useMemo(
    (): UseFallbackShapeOptions => ({
      disableRandomRectWidth,
      rectWidthVariant,
    }),
    [disableRandomRectWidth, rectWidthVariant],
  );

  const { width, borderRadius } = useFallbackShape(shape, baseWidth, fallbackShapeOptions);

  const { activeColorScheme } = useTheme();
  const shimmerColor = fallbackShimmer[activeColorScheme];
  const shimmerPosition = useRef(new Animated.Value(-1));

  useEffect(() => {
    const shimmerAnimation = Animated.loop(
      Animated.timing(shimmerPosition.current, {
        toValue: 1,
        duration: 1300,
        useNativeDriver: true,
        // Disable interaction otherwise all `InteractionManager` listeners
        // will hang indefinitely since Fallbacks will be rendered offscreen.
        isInteraction: false,
      }),
      {
        iterations: 10,
      },
    );

    const animateShimmer = () => {
      shimmerAnimation.start();
    };

    animateShimmer();

    return () => shimmerAnimation.stop();
  }, []);

  const containerStyle: ViewStyle = useMemo(
    () => ({
      width: width as DimensionValue,
      height: height as DimensionValue,
      overflow: 'hidden',
      backgroundColor: shimmerColor[0],
      borderRadius,
    }),
    [width, height, shimmerColor, borderRadius],
  );

  const outputRange = useMemo(
    () => (typeof width === 'number' ? [-width, width] : [-400, 400]),
    [width],
  );

  return (
    <Box position="relative" width={width} {...props}>
      {accessibilityLabel && <Text style={styles.visuallyHidden}>{accessibilityLabel}</Text>}
      <View aria-hidden style={containerStyle}>
        <Animated.View
          style={[
            styles.child,
            {
              transform: [
                {
                  translateX: shimmerPosition.current.interpolate({
                    inputRange: [-1, 1],
                    outputRange,
                  }),
                },
              ],
            },
          ]}
        >
          <LinearGradient
            colors={shimmerColor}
            end={gradEnd}
            start={gradStart}
            stops={gradLocations}
            style={styles.child}
          />
        </Animated.View>
      </View>
    </Box>
  );
});

const gradStart = { x: -1, y: 0.5 };
const gradEnd = { x: 2, y: 0.5 };
const gradLocations = [0.3, 0.5, 0.7];

const styles = StyleSheet.create({
  child: {
    flex: 1,
  },
  visuallyHidden: {
    position: 'absolute',
    width: 1,
    height: 1,
    margin: -1,
    overflow: 'hidden',
  },
});
