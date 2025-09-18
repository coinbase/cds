import { useCallback, useMemo, useState } from 'react';
import type { LayoutChangeEvent, LayoutRectangle } from 'react-native';

export type OnLayout = (event: LayoutChangeEvent) => void;

export const useLayout = (): [LayoutRectangle, OnLayout] => {
  // TODO: default sizing is problematic. Change to null.
  const [size, setSize] = useState<LayoutRectangle>({
    width: 0,
    height: 0,
    x: 0,
    y: 0,
  });

  const onLayout = useCallback((event: LayoutChangeEvent) => {
    setSize(event.nativeEvent.layout);
  }, []);

  return useMemo(() => [size, onLayout], [onLayout, size]);
};
