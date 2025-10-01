import React, {
  createContext,
  memo,
  useCallback,
  useContext,
  useMemo,
  useRef,
  useState,
} from 'react';
import { Animated } from 'react-native';
import type { SharedValue } from 'react-native-reanimated';
import { makeMutable, useSharedValue } from 'react-native-reanimated';
import type { ThemeVars } from '@coinbase/cds-common/core/theme';
import { gutter } from '@coinbase/cds-common/tokens/sizing';
import { noop } from '@coinbase/cds-utils';

import { useOpacityAnimation } from './useOpacityAnimation';

type SparklineInteractiveProviderProps = {
  children: React.ReactNode;
  compact?: boolean;
  gutter?: ThemeVars.Space;
};

type SparklineInteractiveContextInterface = {
  isFallbackVisible: boolean;
  markerXPosition: SharedValue<number>;
  markerGestureState: SharedValue<0 | 1>;
  showFallback: () => void;
  hideFallback: () => void;
  chartOpacity: Animated.Value;
  animateChartIn: Animated.CompositeAnimation;
  markerOpacity: Animated.Value;
  animateMarkerIn: Animated.CompositeAnimation;
  animateMarkerOut: Animated.CompositeAnimation;
  minMaxOpacity: Animated.Value;
  animateMinMaxIn: Animated.CompositeAnimation;
  animateMinxMaxOut: Animated.CompositeAnimation;
  hoverDateOpacity: Animated.Value;
  animateHoverDateIn: Animated.CompositeAnimation;
  animateHoverDateOut: Animated.CompositeAnimation;
  compact: boolean;
  gutter: ThemeVars.Space;
};

const SparklineInteractiveContext = createContext<SparklineInteractiveContextInterface>({
  isFallbackVisible: true,
  markerXPosition: makeMutable(0),
  markerGestureState: makeMutable(0),
  showFallback: noop,
  hideFallback: noop,
  chartOpacity: new Animated.Value(0),
  animateChartIn: noop as unknown as Animated.CompositeAnimation,
  markerOpacity: new Animated.Value(0),
  animateMarkerIn: noop as unknown as Animated.CompositeAnimation,
  animateMarkerOut: noop as unknown as Animated.CompositeAnimation,
  minMaxOpacity: new Animated.Value(0),
  animateMinMaxIn: noop as unknown as Animated.CompositeAnimation,
  animateMinxMaxOut: noop as unknown as Animated.CompositeAnimation,
  hoverDateOpacity: new Animated.Value(0),
  animateHoverDateIn: noop as unknown as Animated.CompositeAnimation,
  animateHoverDateOut: noop as unknown as Animated.CompositeAnimation,
  compact: false,
  gutter,
});

export const SparklineInteractiveProvider = memo(
  ({ children, compact = false, gutter: propGutter }: SparklineInteractiveProviderProps) => {
    const [isFallbackVisible, setIsFallbackVisible] = useState(true);
    const markerXPosition = useSharedValue<number>(-1);
    const markerGestureState = useSharedValue<0 | 1>(0);
    const [chartOpacity, animateChartIn, animateChartOut] = useOpacityAnimation();
    const [markerOpacity, animateMarkerIn, animateMarkerOut] = useOpacityAnimation();
    const [minMaxOpacity, animateMinMaxIn, animateMinxMaxOut] = useOpacityAnimation();
    const [hoverDateOpacity, animateHoverDateIn, animateHoverDateOut] = useOpacityAnimation();
    const chartGutter = useRef<ThemeVars.Space>(propGutter ?? gutter).current;

    const showFallback = useCallback(() => {
      animateChartOut.start();
      setIsFallbackVisible(true);
    }, [animateChartOut]);

    const hideFallback = useCallback(() => {
      animateChartIn.start();
      animateMinMaxIn.start();
      setIsFallbackVisible(false);
    }, [animateChartIn, animateMinMaxIn]);

    const sparklineProviderVal = useMemo(() => {
      return {
        isFallbackVisible,
        markerXPosition,
        markerGestureState,
        showFallback,
        hideFallback,
        chartOpacity,
        animateChartIn,
        markerOpacity,
        animateMarkerIn,
        animateMarkerOut,
        minMaxOpacity,
        animateMinMaxIn,
        animateMinxMaxOut,
        hoverDateOpacity,
        animateHoverDateIn,
        animateHoverDateOut,
        compact,
        gutter: chartGutter,
      };
    }, [
      animateChartIn,
      animateHoverDateIn,
      animateHoverDateOut,
      animateMarkerIn,
      animateMarkerOut,
      animateMinMaxIn,
      animateMinxMaxOut,
      chartOpacity,
      compact,
      hideFallback,
      hoverDateOpacity,
      isFallbackVisible,
      markerGestureState,
      markerOpacity,
      markerXPosition,
      minMaxOpacity,
      showFallback,
      chartGutter,
    ]);
    return (
      <SparklineInteractiveContext.Provider value={sparklineProviderVal}>
        {children}
      </SparklineInteractiveContext.Provider>
    );
  },
);

export function useSparklineInteractiveContext() {
  return useContext(SparklineInteractiveContext);
}
