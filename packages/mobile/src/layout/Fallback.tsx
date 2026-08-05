import React, { memo, useMemo } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import type { DimensionValue, ViewStyle } from 'react-native';
import { EaseView } from 'react-native-ease';
import type { UseFallbackShapeOptions } from '@coinbase/cds-common/hooks/useFallbackShape';
import { useFallbackShape } from '@coinbase/cds-common/hooks/useFallbackShape';
import type { Shape } from '@coinbase/cds-common/types/Shape';

import { LinearGradient } from '../gradients/LinearGradient';
import { useComponentConfig } from '../hooks/useComponentConfig';
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
  width: DimensionValue;
  /** Disables randomization of rectangle shape width. */
  disableRandomRectWidth?: boolean;
  /**
   * When shape is a rectangle, creates a variant with deterministic width.
   * Variants map to a predetermined set of width values, which are cycled through repeatedly when the set is exhausted.
   */
  rectWidthVariant?: number;
};

export type FallbackProps = Omit<BoxProps, 'borderRadius' | 'height' | 'width'> & FallbackBaseProps;

const shimmerDuration = 1300;
const fallbackShimmerRange = 400;

export const Fallback = memo((_props: FallbackProps) => {
  const mergedProps = useComponentConfig('Fallback', _props);
  const {
    height,
    shape = 'rectangle',
    width: baseWidth,
    disableRandomRectWidth,
    rectWidthVariant,
    accessibilityLabel = 'Loading',
    ...props
  } = mergedProps;
  const fallbackShapeOptions = useMemo(
    (): UseFallbackShapeOptions => ({
      disableRandomRectWidth,
      rectWidthVariant,
    }),
    [disableRandomRectWidth, rectWidthVariant],
  );

  const { width, borderRadius } = useFallbackShape<DimensionValue>(
    shape,
    baseWidth,
    fallbackShapeOptions,
  );

  const { activeColorScheme } = useTheme();
  const shimmerColor = fallbackShimmer[activeColorScheme];

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

  const shimmerOffset = typeof width === 'number' ? width : fallbackShimmerRange;

  return (
    <Box position="relative" width={width} {...props}>
      {accessibilityLabel && <Text style={styles.visuallyHidden}>{accessibilityLabel}</Text>}
      <View aria-hidden style={containerStyle}>
        <EaseView
          animate={{ translateX: shimmerOffset }}
          initialAnimate={{ translateX: -shimmerOffset }}
          style={styles.child}
          transition={{
            type: 'timing',
            duration: shimmerDuration,
            easing: 'linear',
            loop: 'repeat',
          }}
        >
          <LinearGradient
            colors={shimmerColor}
            end={gradEnd}
            start={gradStart}
            stops={gradLocations}
            style={styles.child}
          />
        </EaseView>
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
