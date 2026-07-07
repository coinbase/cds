import { useMemo, useRef } from 'react';
import { Animated } from 'react-native';
import type { MotionBaseSpec } from '@coinbase/cds-common/types/Motion';

import { convertMotionConfig } from './convertMotionConfig';

type SelectAnimation = {
  rotateAnimation: Animated.Value;
  animateRotateIn: Animated.CompositeAnimation;
  animateRotateOut: Animated.CompositeAnimation;
  rotateAnimationStyles: {
    transform: {
      rotate: Animated.AnimatedInterpolation<string>;
    }[];
  };
};

export const useRotateAnimation = (
  animateInConfig: MotionBaseSpec,
  animateOutConfig: MotionBaseSpec,
  degree: number,
): SelectAnimation => {
  const rotateAnimation = useRef(new Animated.Value(0));

  const animateRotateIn = useMemo(
    () => Animated.timing(rotateAnimation.current, convertMotionConfig(animateInConfig)),
    [animateInConfig],
  );

  const animateRotateOut = useMemo(
    () => Animated.timing(rotateAnimation.current, convertMotionConfig(animateOutConfig)),
    [animateOutConfig],
  );

  const translation = useMemo(() => {
    return {
      rotate: rotateAnimation.current.interpolate({
        inputRange: [0, 1],
        outputRange: ['0deg', `${degree}deg`],
      }),
    };
  }, [rotateAnimation, degree]);

  return useMemo(() => {
    return {
      rotateAnimation: rotateAnimation.current,
      animateRotateIn,
      animateRotateOut,
      rotateAnimationStyles: { transform: [translation] },
    };
  }, [rotateAnimation, animateRotateIn, animateRotateOut, translation]);
};
