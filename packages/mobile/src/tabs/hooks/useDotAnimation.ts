import { useCallback, useRef } from 'react';
import { Animated } from 'react-native';
import {
  animateDotOpacityConfig,
  animateDotWidthConfig,
  dotHidden,
  dotVisible,
} from '@coinbase/cds-common/animation/dot';

import { convertMotionConfig } from '../../animation/convertMotionConfig';

/**
 * Fixed widths to use to achieve an animated in/out effect on the Dot component
 */
const dotSizeTokens = { s: 28, m: 36, l: 48 } as const;
/**
 * Returns the appropriate dot container width based on the notification count.
 * Width increases to accommodate more digits (1-digit, 2-digit, 3+ digits).
 *
 * @param count - The notification count to determine width for
 * @returns The pixel width for the dot container
 */
const getDotSize = (count?: number) => {
  if (!count || count < 10) return dotSizeTokens.s;
  if (count >= 10 && count < 100) return dotSizeTokens.m;
  if (count >= 100) return dotSizeTokens.l;

  return dotSizeTokens.s;
};

// opacity animation
const opacityInConfig = convertMotionConfig({
  ...animateDotOpacityConfig,
  toValue: dotVisible,
  fromValue: dotHidden,
});
const opacityOutConfig = convertMotionConfig({
  ...animateDotOpacityConfig,
  toValue: dotHidden,
  fromValue: dotVisible,
});

// Y transform animation
const scaleInConfig = convertMotionConfig({
  ...animateDotWidthConfig,
  toValue: getDotSize(),
  fromValue: 0,
});
const scaleOutConfig = convertMotionConfig({
  ...animateDotWidthConfig,
  toValue: 0,
  fromValue: getDotSize(),
});

/**
 * Hook that provides animated values and animation functions for dot badge transitions.
 *
 * Used to animate the appearance/disappearance of notification dot badges in tab labels.
 * Runs parallel opacity (fade) and width (scale) animations for smooth enter/exit effects.
 *
 * @returns Object containing:
 * - `opacity` - Animated.Value controlling the dot's opacity (0 = hidden, 1 = visible)
 * - `width` - Animated.Value controlling the dot container's width (0 = collapsed, getDotSize(count) = expanded)
 * - `animateIn` - Triggers the enter animation when a dot badge should appear
 * - `animateOut` - Triggers the exit animation when a dot badge should disappear
 *
 * @example
 * ```tsx
 * const { opacity, width, animateIn, animateOut } = useDotAnimation();
 *
 * useEffect(() => {
 *   if (count > 0) animateIn(count);
 *   else animateOut(count);
 * }, [count]);
 *
 * return (
 *   <Animated.View style={{ width }}>
 *     <Animated.View style={{ opacity }}>
 *       <DotCount count={count} />
 *     </Animated.View>
 *   </Animated.View>
 * );
 * ```
 */
export const useDotAnimation = () => {
  const opacity = useRef(new Animated.Value(dotHidden)).current;
  const width = useRef(new Animated.Value(dotHidden)).current;

  const animateIn = useCallback(
    (count: number) => {
      const params = { ...scaleInConfig, toValue: getDotSize(count) };
      return Animated.parallel([
        Animated.timing(opacity, opacityInConfig),
        Animated.timing(width, params),
      ]).start();
    },
    [opacity, width],
  );

  const animateOut = useCallback(
    (count: number) => {
      const params = { ...scaleOutConfig, fromValue: getDotSize(count) };
      return Animated.parallel([
        Animated.timing(opacity, opacityOutConfig),
        Animated.timing(width, params),
      ]).start();
    },
    [opacity, width],
  );

  return {
    opacity,
    width,
    animateIn,
    animateOut,
  };
};
