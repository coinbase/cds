import { useMemo, useRef } from 'react';
import { Animated } from 'react-native';
import { fadeDuration } from '@coinbase/cds-common/tokens/sparkline';

export function useOpacityAnimation(
  initialValue: number | undefined = 0,
  duration: number | undefined = fadeDuration,
): [Animated.Value, Animated.CompositeAnimation, Animated.CompositeAnimation] {
  const animation = useRef(new Animated.Value(initialValue)).current;

  const animateIn = useMemo(
    () =>
      Animated.timing(animation, {
        toValue: 1,
        duration,
        useNativeDriver: true,
      }),
    [animation, duration],
  );

  const animateOut = useMemo(
    () =>
      Animated.timing(animation, {
        toValue: 0,
        duration,
        useNativeDriver: true,
      }),
    [animation, duration],
  );

  return [animation, animateIn, animateOut];
}
