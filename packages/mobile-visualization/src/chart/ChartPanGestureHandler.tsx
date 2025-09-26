import { memo, useCallback } from 'react';
import { Animated as RNAnimated, Platform, View } from 'react-native';
import type React from 'react';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, { runOnJS } from 'react-native-reanimated';
import { Haptics } from '@coinbase/cds-mobile/utils/haptics';
import { noop } from '@coinbase/cds-utils';

const { lightImpact } = Haptics;

export type ChartPanGestureHandlerProps = {
  allowOverflowGestures?: boolean;
  onScrub?: (x: number) => void;
  onScrubEnd?: () => void;
  onScrubStart?: () => void;
  children: React.ReactNode;
};

// Generics do not work with React.memo or forwardRef
// https://stackoverflow.com/questions/58469229/react-with-typescript-generics-while-using-react-forwardref/58473012
export const ChartPanGestureHandler = memo(
  ({
    onScrubEnd = noop,
    onScrubStart = noop,
    onScrub = noop,
    children,
    allowOverflowGestures = false,
  }: ChartPanGestureHandlerProps) => {
    const handleOnStartJsThread = useCallback(() => {
      void lightImpact();
      onScrubStart();
    }, [onScrubStart]);

    const handleOnEndOrCancelledJsThread = useCallback(() => {
      onScrubEnd();
    }, [onScrubEnd]);

    const handleOnUpdateJsThread = useCallback(
      (x: number) => {
        onScrub(x);
      },
      [onScrub],
    );

    const handleOnEndJsThread = useCallback(() => {
      void Haptics.lightImpact();
      handleOnEndOrCancelledJsThread();
    }, [handleOnEndOrCancelledJsThread]);

    const longPressGesture = Gesture.Pan()
      .activateAfterLongPress(110)
      .shouldCancelWhenOutside(!allowOverflowGestures)
      .onStart(function onStart(event) {
        runOnJS(handleOnStartJsThread)();

        // Android does not trigger onUpdate when the gesture starts. This achieves consistent behavior across both iOS and Android
        if (Platform.OS === 'android') {
          runOnJS(handleOnUpdateJsThread)(event.x);
        }
      })
      .onUpdate(function onUpdate(event) {
        runOnJS(handleOnUpdateJsThread)(event.x);
      })
      .onEnd(function onEnd() {
        runOnJS(handleOnEndJsThread)();
      })
      .onTouchesCancelled(function onTouchesCancelled() {
        runOnJS(handleOnEndOrCancelledJsThread)();
      });

    return <GestureDetector gesture={longPressGesture}>{children}</GestureDetector>;
  },
);
