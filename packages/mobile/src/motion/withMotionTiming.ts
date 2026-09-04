import type { AnimationCallback } from 'react-native-reanimated';
import { withDelay, withTiming } from 'react-native-reanimated';

import type { convertMotionConfig } from './convertMotionConfig';

/**
 * Util worklet to convert CDS motion config to Reanimated withTiming config
 * @param motionConfig CDS motion config
 * @param cb withTiming callback function
 * @returns Reanimated withTiming
 */
export const withMotionTiming = (
  motionConfig: ReturnType<typeof convertMotionConfig>,
  cb?: AnimationCallback,
) => {
  'worklet';

  const timing = withTiming(
    motionConfig.toValue,
    {
      duration: motionConfig.duration,
      easing: motionConfig.easing,
    },
    cb,
  );

  return motionConfig.delay ? withDelay(motionConfig.delay, timing) : timing;
};
