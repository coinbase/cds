import { useMemo, useRef, useState } from 'react';
import { Animated } from 'react-native';
import type { NativeScrollEvent, NativeSyntheticEvent } from 'react-native';

export function useScrollOffset() {
  const xOffset = useRef(new Animated.Value(0));
  const yOffset = useRef(new Animated.Value(0));
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const { contentOffset, layoutMeasurement } = event.nativeEvent;
    // Prevent negative offsets on android
    const normalizedXOffset = contentOffset.x < 0 ? 0 : contentOffset.x;
    const index = Math.floor(normalizedXOffset / layoutMeasurement.width);
    setCurrentIndex(index);
  };

  const onScroll = Animated.event(
    [
      {
        nativeEvent: {
          contentOffset: {
            x: xOffset.current,
            y: yOffset.current,
          },
        },
      },
    ],
    {
      useNativeDriver: true,
      listener: handleScroll,
    },
  );

  return useMemo(() => {
    return {
      onScroll,
      xOffset: xOffset.current,
      yOffset: yOffset.current,
      currentIndex,
    };
  }, [onScroll, currentIndex]);
}
