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

  const animateDrawerIn = useMemo(
    () => Animated.timing(drawerAnimation.current, animateDrawer.animateIn),
    [],
  );
  const animateDrawerOut = useMemo(
    () => Animated.timing(drawerAnimation.current, animateDrawer.animateOut),
    [],
  );

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
        opacity: drawerAnimation.current.interpolate({
          inputRange: [0, 1],
          outputRange: [0, 1],
        }),
      };
    }
    return { transform: [translation] };
  }, [reduceMotion, translation]);

  return useMemo(() => {
    return {
      drawerAnimation: drawerAnimation.current,
      animateDrawerOut,
      animateDrawerIn,
      drawerAnimationStyles,
      animateSwipeToClose,
    };
  }, [animateDrawerOut, animateDrawerIn, drawerAnimationStyles, animateSwipeToClose]);
};
