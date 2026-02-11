import { useMemo, useRef } from 'react';
import { Animated, Easing, useWindowDimensions } from 'react-native';
import type { MotionBaseSpec, PinningDirection } from '@coinbase/cds-common';
import {
  animateDrawerInConfig,
  animateDrawerOutConfig,
  drawerAnimationDefaultDuration,
  MAX_OVER_DRAG,
} from '@coinbase/cds-common/animation/drawer';
import { durations } from '@coinbase/cds-common/motion/tokens';
import {
  handleBarOffset,
  horizontalDrawerPercentageOfView,
  verticalDrawerPercentageOfView as defaultVerticalDrawerPercentageOfView,
} from '@coinbase/cds-common/tokens/drawer';

import { convertMotionConfig } from '../../animation/convertMotionConfig';

const animateDrawer = {
  animateIn: convertMotionConfig(animateDrawerInConfig as MotionBaseSpec),
  animateOut: convertMotionConfig(animateDrawerOutConfig as MotionBaseSpec),
};

export const useDrawerAnimation = (
  pin: PinningDirection | undefined = 'bottom',
  verticalDrawerPercentageOfView: number | undefined = defaultVerticalDrawerPercentageOfView,
  reduceMotion?: boolean,
) => {
  const windowDimensions = useWindowDimensions();

  const isPinVertical = pin === 'top' || pin === 'bottom';
  const drawerDimension = isPinVertical
    ? windowDimensions.height * verticalDrawerPercentageOfView
    : windowDimensions.width * horizontalDrawerPercentageOfView;

  const drawerAnimation = useRef(new Animated.Value(0));
  // Separate opacity value used when reduceMotion is true so that
  // open/close-button fades are independent of the transform that
  // the pan-responder drives during swipe gestures.
  const contentOpacity = useRef(new Animated.Value(reduceMotion ? 0 : 1));

  const animateDrawerIn = useMemo(() => {
    if (reduceMotion) {
      return Animated.parallel([
        Animated.timing(drawerAnimation.current, {
          ...animateDrawer.animateIn,
          duration: 0,
        }),
        Animated.timing(contentOpacity.current, animateDrawer.animateIn),
      ]);
    }
    return Animated.timing(drawerAnimation.current, animateDrawer.animateIn);
  }, [reduceMotion]);

  const animateDrawerOut = useMemo(() => {
    if (reduceMotion) {
      return Animated.timing(contentOpacity.current, animateDrawer.animateOut);
    }
    return Animated.timing(drawerAnimation.current, animateDrawer.animateOut);
  }, [reduceMotion]);

  const animateSnapBack = useMemo(() => {
    if (reduceMotion) {
      return Animated.parallel([
        Animated.timing(drawerAnimation.current, animateDrawer.animateIn),
        Animated.timing(contentOpacity.current, animateDrawer.animateIn),
      ]);
    }
    return Animated.timing(drawerAnimation.current, animateDrawer.animateIn);
  }, [reduceMotion]);

  /** custom animation config for swipe and fling to close that has no friction and is faster */
  const animateSwipeToClose = useMemo(
    () =>
      Animated.timing(drawerAnimation.current, {
        toValue: animateDrawerOutConfig.toValue,
        useNativeDriver: true,
        duration: isPinVertical ? durations.fast3 : durations[drawerAnimationDefaultDuration],
        easing: Easing.ease,
      }),
    [isPinVertical],
  );

  const translation = useMemo(() => {
    switch (pin) {
      case 'top':
        return {
          translateY: drawerAnimation.current.interpolate({
            inputRange: [0, 1],
            outputRange: [-drawerDimension, -MAX_OVER_DRAG],
          }),
        };
      case 'left':
        return {
          translateX: drawerAnimation.current.interpolate({
            inputRange: [0, 1],
            outputRange: [-drawerDimension, -MAX_OVER_DRAG],
          }),
        };
      case 'right':
        return {
          translateX: drawerAnimation.current.interpolate({
            inputRange: [0, 1],
            outputRange: [drawerDimension, MAX_OVER_DRAG],
          }),
        };
      case 'bottom':
      default:
        return {
          translateY: drawerAnimation.current.interpolate({
            inputRange: [0, 1],
            outputRange: [drawerDimension + handleBarOffset, MAX_OVER_DRAG],
          }),
        };
    }
  }, [pin, drawerDimension]);

  const drawerAnimationStyles = useMemo(() => {
    if (reduceMotion) {
      return {
        opacity: contentOpacity.current,
        transform: [translation],
      };
    }
    return { transform: [translation] };
  }, [reduceMotion, translation]);

  return useMemo(() => {
    return {
      drawerAnimation: drawerAnimation.current,
      animateDrawerOut,
      animateDrawerIn,
      animateSnapBack,
      drawerAnimationStyles,
      animateSwipeToClose,
    };
  }, [
    animateDrawerOut,
    animateDrawerIn,
    animateSnapBack,
    drawerAnimationStyles,
    animateSwipeToClose,
  ]);
};
