import { useCallback, useMemo } from 'react';
import { PanResponder, useWindowDimensions } from 'react-native';
import type { Animated, GestureResponderEvent, PanResponderGestureState } from 'react-native';
import type { PinningDirection } from '@coinbase/cds-common';
import {
  DISMISSAL_DRAG_THRESHOLD,
  DISMISSAL_VELOCITY_THRESHOLD,
  MAX_OVER_DRAG,
  MIN_PAN_DISTANCE,
} from '@coinbase/cds-common/animation/drawer';
import {
  handleBarHeight,
  handleBarOffset,
  horizontalDrawerPercentageOfView,
  normalizeDrawerPanDistanceMultiplier,
  verticalDrawerPercentageOfView as defaultVerticalDrawerPercentageOfView,
} from '@coinbase/cds-common/tokens/drawer';
import { modulate } from '@coinbase/cds-common/utils/modulate';

type UseDrawerPanResponderParams = {
  drawerAnimation: Animated.Value;
  animateSnapBack: Animated.CompositeAnimation;
  pin: PinningDirection;
  disableCapturePanGestureToDismiss: boolean;
  onBlur?: () => void;
  handleSwipeToClose: () => void;
  opacityAnimation: Animated.Value;
  verticalDrawerPercentageOfView: number;
};
type DragDirection = 'up' | 'down' | 'left' | 'right' | undefined;

/** accumulated distance of the gesture - max over drag */
const calculateDragOffset = (x: number) => {
  const newX = x / 100;
  return MAX_OVER_DRAG * Math.tanh(newX);
};

export const useDrawerPanResponder = ({
  pin,
  drawerAnimation,
  animateSnapBack,
  disableCapturePanGestureToDismiss,
  onBlur,
  handleSwipeToClose,
  opacityAnimation,
  verticalDrawerPercentageOfView = defaultVerticalDrawerPercentageOfView,
}: UseDrawerPanResponderParams) => {
  // drawer dimensions
  const { width, height } = useWindowDimensions();
  const drawerWidth = width * horizontalDrawerPercentageOfView + MAX_OVER_DRAG;
  const handleBarTotalHeight = handleBarOffset + handleBarHeight;
  const drawerHeight =
    pin === 'bottom'
      ? height * verticalDrawerPercentageOfView + handleBarTotalHeight + MAX_OVER_DRAG
      : height * verticalDrawerPercentageOfView + MAX_OVER_DRAG;
  const isHorizontalDrawer = pin === 'left' || pin === 'right';

  /** calculates whether gesture was great enough to warrant a response */
  const shouldHandleGesture = useCallback(
    ({ dx, dy }: PanResponderGestureState) => {
      if (pin === 'bottom') {
        return dy > MIN_PAN_DISTANCE || dy < -MIN_PAN_DISTANCE;
      }
      return dx > MIN_PAN_DISTANCE || dx < -MIN_PAN_DISTANCE;
    },
    [pin],
  );

  const shouldCaptureGestures = useCallback(
    (_: GestureResponderEvent, state: PanResponderGestureState) => {
      if (disableCapturePanGestureToDismiss) {
        return false;
      }
      return shouldHandleGesture(state);
    },
    [shouldHandleGesture, disableCapturePanGestureToDismiss],
  );

  /** translate gesture state based on pin position */
  const parseGestureState = useCallback(
    (gestureState: PanResponderGestureState) => {
      let dragDirection: DragDirection;
      let isOverDrag = false;

      const distance = pin === 'top' || pin === 'bottom' ? gestureState.dy : gestureState.dx;
      const velocity = pin === 'top' || pin === 'bottom' ? gestureState.vy : gestureState.vx;
      const isDragging = Math.abs(distance) > MIN_PAN_DISTANCE;

      switch (pin) {
        case 'left':
        case 'right':
          dragDirection = gestureState.dx <= 0 ? 'left' : 'right';
          break;
        case 'bottom':
        case 'top':
        default:
          dragDirection = gestureState.dy <= 0 ? 'up' : 'down';
          break;
      }

      switch (pin) {
        case 'left':
          isOverDrag = dragDirection === 'right';
          break;
        case 'right':
          isOverDrag = dragDirection === 'left';
          break;
        case 'bottom':
          isOverDrag = dragDirection === 'up';
          break;
        case 'top':
        default:
          isOverDrag = dragDirection === 'down';
          break;
      }

      return {
        distance,
        velocity,
        isDragging,
        dragDirection,
        isOverDrag,
      };
    },
    [pin],
  );

  const isTryingToDismiss = useCallback(
    (dragDirection: DragDirection) => {
      if (
        (pin === 'left' && dragDirection === 'left') ||
        (pin === 'right' && dragDirection === 'right') ||
        (pin === 'bottom' && dragDirection === 'down') ||
        (pin === 'top' && dragDirection === 'up')
      ) {
        return true;
      }
      return false;
    },
    [pin],
  );

  const isFlingToDismiss = useCallback(
    (velocity: number) => {
      switch (pin) {
        case 'top':
        case 'left':
          return velocity <= -DISMISSAL_VELOCITY_THRESHOLD;
        case 'bottom':
        case 'right':
        default:
          return velocity >= DISMISSAL_VELOCITY_THRESHOLD;
      }
    },
    [pin],
  );

  const isSwipeToDismiss = useCallback(
    (distance: number) => {
      switch (pin) {
        case 'top':
        case 'left':
          return distance <= -DISMISSAL_DRAG_THRESHOLD;
        case 'bottom':
        case 'right':
        default:
          return distance >= DISMISSAL_DRAG_THRESHOLD;
      }
    },
    [pin],
  );

  const shouldDismiss = useCallback(
    (gestureState: PanResponderGestureState): boolean => {
      const { velocity, dragDirection, distance } = parseGestureState(gestureState);

      if (
        isTryingToDismiss(dragDirection) &&
        (isFlingToDismiss(velocity) || isSwipeToDismiss(distance))
      ) {
        return true;
      }
      return false;
    },
    [isTryingToDismiss, parseGestureState, isFlingToDismiss, isSwipeToDismiss],
  );

  const panGestureHandlers = useMemo(() => {
    return PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: shouldCaptureGestures,
      onMoveShouldSetPanResponderCapture: shouldCaptureGestures,
      onPanResponderMove: (_, gestureState) => {
        const { isDragging, distance, isOverDrag } = parseGestureState(gestureState);
        const isInvertedPin = pin === 'bottom' || pin === 'right';
        const horizontalDrawerMaxPanDistance = isInvertedPin ? -drawerWidth : drawerWidth;
        const verticalDrawerMaxPanDistance = isInvertedPin ? -drawerHeight : drawerHeight;

        if (isDragging) {
          if (isOverDrag) {
            const normalizedDistance = modulate(Math.abs(distance), {
              inputRange: [0, MAX_OVER_DRAG],
              outputRange: [0, 0.1],
              clamp: true,
            });
            drawerAnimation.setOffset(calculateDragOffset(normalizedDistance));
          } else {
            const normalizedDrawerTransition = modulate(distance, {
              inputRange: [
                0,
                isHorizontalDrawer ? horizontalDrawerMaxPanDistance : verticalDrawerMaxPanDistance,
              ],
              outputRange: [0, normalizeDrawerPanDistanceMultiplier],
              clamp: false,
            });
            drawerAnimation.setOffset(normalizedDrawerTransition);
            const normalizedOpacityTransition = modulate(distance, {
              inputRange: [
                0,
                isHorizontalDrawer ? horizontalDrawerMaxPanDistance : verticalDrawerMaxPanDistance,
              ],
              outputRange: [0, 1],
              clamp: false,
            });
            opacityAnimation.setOffset(normalizedOpacityTransition);
          }
        }
      },
      onPanResponderRelease: (_, gestureState) => {
        drawerAnimation.flattenOffset();
        opacityAnimation.flattenOffset();
        if (shouldDismiss(gestureState)) {
          onBlur?.();
          handleSwipeToClose();
        } else {
          animateSnapBack.start();
        }
      },
    });
  }, [
    drawerAnimation,
    animateSnapBack,
    parseGestureState,
    shouldCaptureGestures,
    shouldDismiss,
    drawerWidth,
    drawerHeight,
    pin,
    isHorizontalDrawer,
    onBlur,
    handleSwipeToClose,
    opacityAnimation,
  ]);

  return panGestureHandlers;
};
