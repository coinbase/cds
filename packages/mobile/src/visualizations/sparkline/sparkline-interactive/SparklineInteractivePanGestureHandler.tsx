import React, { useCallback } from 'react';
import { Animated as RNAnimated, Platform, View } from 'react-native';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, { runOnJS } from 'react-native-reanimated';
import type { ChartGetMarker, ChartScrubParams } from '@coinbase/cds-common/types/Chart';
import { Haptics } from '@coinbase/cds-mobile/utils/haptics';
import { noop } from '@coinbase/cds-utils';

import { type SparklineInteractiveProps } from './SparklineInteractive';
import { useSparklineInteractiveContext } from './SparklineInteractiveProvider';
import { useSparklineInteractiveConstants } from './useSparklineInteractiveConstants';

const { lightImpact } = Haptics;

export type SparklineInteractivePanGestureHandlerProps<Period extends string> = Pick<
  SparklineInteractiveProps<Period>,
  'allowOverflowGestures'
> & {
  onScrub?: (params: ChartScrubParams<Period>) => void;
  getMarker: ChartGetMarker;
  selectedPeriod: Period;
  onScrubEnd?: () => void;
  onScrubStart?: () => void;
  disabled?: boolean;
  children: React.ReactNode;
};

// Generics do not work with React.memo or forwardRef
// https://stackoverflow.com/questions/58469229/react-with-typescript-generics-while-using-react-forwardref/58473012
export const SparklineInteractivePanGestureHandler = function SparklineInteractivePanGestureHandler<
  Period extends string,
>({
  onScrubEnd = noop,
  onScrubStart = noop,
  onScrub = noop,
  getMarker,
  selectedPeriod,
  children,
  disabled,
  allowOverflowGestures,
}: SparklineInteractivePanGestureHandlerProps<Period>) {
  const {
    markerXPosition,
    markerGestureState,
    animateMarkerIn,
    animateMarkerOut,
    animateMinMaxIn,
    animateMinxMaxOut,
    animateHoverDateIn,
    animateHoverDateOut,
  } = useSparklineInteractiveContext();
  const { chartVerticalLineWidth, endX, startX } = useSparklineInteractiveConstants({});

  const handleOnStartJsThread = useCallback(() => {
    void lightImpact();
    onScrubStart();
    RNAnimated.parallel([animateMarkerIn, animateMinxMaxOut, animateHoverDateIn]).start();
  }, [animateHoverDateIn, animateMarkerIn, animateMinxMaxOut, onScrubStart]);

  const handleOnUpdateJsThread = useCallback(() => {
    const dataPoint = getMarker(markerXPosition.value);
    if (dataPoint) {
      onScrub({
        point: dataPoint,
        period: selectedPeriod,
      });
    }
  }, [getMarker, markerXPosition.value, onScrub, selectedPeriod]);

  const handleOnEndOrCancelledJsThread = useCallback(() => {
    onScrubEnd();
    RNAnimated.parallel([animateMarkerOut, animateMinMaxIn, animateHoverDateOut]).start(
      ({ finished }) => {
        if (finished) {
          markerXPosition.value = -1;
        }
      },
    );
  }, [animateHoverDateOut, animateMarkerOut, animateMinMaxIn, markerXPosition, onScrubEnd]);

  const handleOnEndJsThread = useCallback(() => {
    void Haptics.lightImpact();
    handleOnEndOrCancelledJsThread();
  }, [handleOnEndOrCancelledJsThread]);

  if (disabled) {
    return <View>{children}</View>;
  }

  const longPressGesture = Gesture.Pan()
    .activateAfterLongPress(110)
    .shouldCancelWhenOutside(!allowOverflowGestures)
    .onStart(function onStart(event) {
      runOnJS(handleOnStartJsThread)();
      markerGestureState.value = 1;

      // Android does not trigger onUpdate when the gesture starts. This achieves consistent behavior across both iOS and Android
      if (Platform.OS === 'android') {
        const newMarkerXPosition = Math.min(
          endX,
          Math.max(startX, event.x - chartVerticalLineWidth / 2),
        );
        markerXPosition.value = newMarkerXPosition;
        runOnJS(handleOnUpdateJsThread)();
      }
    })
    .onUpdate(function onUpdate(event) {
      const newMarkerXPosition = Math.min(
        endX,
        Math.max(startX, event.x - chartVerticalLineWidth / 2),
      );
      markerXPosition.value = newMarkerXPosition;
      if (markerGestureState.value === 1) {
        runOnJS(handleOnUpdateJsThread)();
      }
    })
    .onEnd(function onEnd() {
      markerGestureState.value = 0;
      runOnJS(handleOnEndJsThread)();
    })
    .onTouchesCancelled(function onTouchesCancelled() {
      markerGestureState.value = 0;
      runOnJS(handleOnEndOrCancelledJsThread)();
    });

  return (
    <GestureDetector gesture={longPressGesture}>
      <Animated.View>{children}</Animated.View>
    </GestureDetector>
  );
};
