import { useEffect } from 'react';
import { Animated } from 'react-native';
import type { LayoutRectangle } from 'react-native';
import { durations } from '@coinbase/cds-common/motion/tokens';
import { useTheme } from '@coinbase/cds-mobile/hooks/useTheme';

import { useSparklineInteractiveContext } from './SparklineInteractiveProvider';
import { useSparklineInteractiveConstants } from './useSparklineInteractiveConstants';

type MinMaxTransformParams = {
  minMaxLayout: LayoutRectangle;
  x: number;
  transform: Animated.ValueXY;
  opacity: Animated.Value;
};

export function useMinMaxTransform({ minMaxLayout, x, transform, opacity }: MinMaxTransformParams) {
  const theme = useTheme();
  const { height, width } = minMaxLayout;
  const { SparklineInteractiveMinMaxLabelHeight, chartWidth } = useSparklineInteractiveConstants(
    {},
  );

  const { gutter } = useSparklineInteractiveContext();

  useEffect(() => {
    // If onLayout has not finished we don't want to show min/max
    // or else it will abruptly change positions
    if (height === 0 && width === 0) {
      opacity.setValue(0);
      return;
    }

    // if we have no gutter the min/max label needs some space so it's not right up against the edge of the screen
    const minGutter = gutter === 0 ? theme.space['1'] : 0;

    // Position min or max at center of the desired x coordinate when possible.
    // If this is not possible, ensure that it's never positioned outside of chart container.
    // This means the x transform should never be less than 0 or greater than chartWidth - labelWidth
    const idealX = x - width / 2;
    const translateX = Math.round(
      Math.max(minGutter, Math.min(idealX, chartWidth - width - minGutter)),
    );
    // Vertically center the min/max label within SparklineInteractiveMinMaxLabelHeight.
    // This is the area between the vertical dotted line and the top or bottom
    // of sparkline where min/max is displayed
    const translateY = SparklineInteractiveMinMaxLabelHeight / 2 - height / 2;

    transform.setValue({ x: translateX, y: translateY });
    Animated.timing(opacity, {
      toValue: 1,
      duration: durations.moderate1,
      useNativeDriver: true,
    }).start();
  }, [
    SparklineInteractiveMinMaxLabelHeight,
    chartWidth,
    gutter,
    height,
    opacity,
    theme.space,
    transform,
    width,
    x,
  ]);
}
