import { Easing } from 'react-native-reanimated';
import { curves, durations } from '@coinbase/cds-common/motion/tokens';
import type { MotionBaseSpec } from '@coinbase/cds-common/types/Motion';

export const mobileCurves = {
  global: Easing.bezier(...curves.global),
  enterExpressive: Easing.bezier(...curves.enterExpressive),
  enterFunctional: Easing.bezier(...curves.enterFunctional),
  exitExpressive: Easing.bezier(...curves.exitExpressive),
  exitFunctional: Easing.bezier(...curves.exitFunctional),
  linear: Easing.bezier(...curves.linear),
};

/** Reanimated version */
export const convertMotionConfig = ({
  toValue,
  delay,
  easing,
  duration,
  oneOffDuration,
  ...rest
}: Omit<MotionBaseSpec, 'useNativeDriver'>) => {
  return {
    toValue,
    delay,
    easing: mobileCurves[easing],
    duration: oneOffDuration ?? (duration && durations[duration]),
    ...rest,
  };
};

/** Convert an array of motion configs */
export const convertMotionConfigs = (configs: MotionBaseSpec[]) =>
  configs.map((config) => convertMotionConfig(config));
