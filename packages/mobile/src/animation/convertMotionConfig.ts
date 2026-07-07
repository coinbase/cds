import { Easing } from 'react-native';
import type { Animated } from 'react-native';
import { curves, durations } from '@coinbase/cds-common/motion/tokens';
import type { MotionBaseSpec } from '@coinbase/cds-common/types/Motion';

type MotionSpec = Omit<MotionBaseSpec, 'property'>;

export const mobileCurves = {
  global: Easing.bezier(...curves.global),
  enterExpressive: Easing.bezier(...curves.enterExpressive),
  enterFunctional: Easing.bezier(...curves.enterFunctional),
  exitExpressive: Easing.bezier(...curves.exitExpressive),
  exitFunctional: Easing.bezier(...curves.exitFunctional),
  linear: Easing.bezier(...curves.linear),
};

export const convertMotionConfig = ({
  toValue,
  delay,
  easing,
  duration,
  useNativeDriver = true,
  oneOffDuration,
}: MotionSpec): Animated.TimingAnimationConfig => {
  if (typeof toValue === 'string') {
    throw Error(
      'RN Animation methods does not work with string values. Please use interpolation instead.',
    );
  }

  return {
    toValue,
    delay,
    easing: mobileCurves[easing],
    duration: oneOffDuration ?? (duration && durations[duration]),
    useNativeDriver,
  };
};
