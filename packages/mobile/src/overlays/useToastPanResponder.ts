import { useCallback, useMemo, useRef } from 'react';
import { Animated, PanResponder, useWindowDimensions } from 'react-native';
import { bottomPanThreshold, horizontalPanThreshold } from '@coinbase/cds-common/animation/toast';
import { durations } from '@coinbase/cds-common/motion/tokens';

import type { ToastBaseProps } from './Toast';

export const useToastPanResponder = ({
  onWillHide,
  onDidHide,
}: Pick<ToastBaseProps, 'onWillHide' | 'onDidHide'>) => {
  const pan = useRef(new Animated.ValueXY({ x: 0, y: 0 })).current;
  const { width: deviceWidth, height: deviceHeight } = useWindowDimensions();

  const handlePanRelease = useCallback(
    (toValue: { x: number; y: number }) => {
      onWillHide?.();
      Animated.timing(pan, {
        toValue,
        duration: durations.moderate3,
        useNativeDriver: true,
      }).start(({ finished }) => {
        if (finished) {
          onDidHide?.();
        }
      });
    },
    [onWillHide, onDidHide, pan],
  );

  const handlePanReleaseToDirection = useCallback(
    (direction: 'left' | 'right' | 'bottom') => {
      switch (direction) {
        case 'left':
          return handlePanRelease({ x: -deviceWidth, y: 0 });
        case 'right':
          return handlePanRelease({ x: deviceWidth, y: 0 });
        case 'bottom':
          return handlePanRelease({ x: 0, y: deviceHeight });
        default:
          return null;
      }
    },
    [handlePanRelease, deviceWidth, deviceHeight],
  );

  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: (_, gestureState) => {
        // return true if the movement is significant, return false if it's a single click
        return (
          Math.abs(gestureState.dx) > bottomPanThreshold ||
          Math.abs(gestureState.dy) > bottomPanThreshold
        );
      },
      onPanResponderMove: (_, gestureState) => {
        const isSwipingBottom = gestureState.dy > 0;
        pan.setValue({
          // don't allow horizontal swipe when swiping bottom
          x: isSwipingBottom ? 0 : gestureState.dx,
          // don't allow top swipe
          y: isSwipingBottom ? gestureState.dy : 0,
        });
      },
      onPanResponderRelease: (_, gestureState) => {
        if (gestureState.dx > horizontalPanThreshold) {
          handlePanReleaseToDirection('right');
        } else if (gestureState.dx < -horizontalPanThreshold) {
          handlePanReleaseToDirection('left');
        } else if (gestureState.dy > bottomPanThreshold) {
          handlePanReleaseToDirection('bottom');
        } else {
          // reset position
          Animated.timing(pan, {
            toValue: { x: 0, y: 0 },
            useNativeDriver: true,
            duration: durations.moderate3,
          }).start();
        }
      },
    }),
  ).current;

  return useMemo(
    () => ({
      panHandlers: panResponder.panHandlers,
      panResponderAnimation: pan.getTranslateTransform(),
    }),
    [panResponder, pan],
  );
};
