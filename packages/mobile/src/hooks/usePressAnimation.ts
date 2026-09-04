import { useCallback, useMemo, useRef } from 'react';
import { Animated } from 'react-native';
import type { GestureResponderEvent } from 'react-native';

export function usePressAnimation(
  factor = 0.02,
): [
  (event?: GestureResponderEvent) => void,
  (event?: GestureResponderEvent) => void,
  Animated.Value,
] {
  const value = useRef(new Animated.Value(1)).current;

  const down = useCallback(() => {
    Animated.spring(value, {
      toValue: 1 - factor,
      useNativeDriver: true,
    }).start();
  }, [value, factor]);

  const up = useCallback(() => {
    Animated.spring(value, {
      friction: 3,
      tension: 5,
      toValue: 1,
      useNativeDriver: true,
    }).start();
  }, [value]);

  return useMemo(() => [down, up, value], [down, up, value]);
}
