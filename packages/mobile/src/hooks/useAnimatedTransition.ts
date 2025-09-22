import { useEffect, useRef } from 'react';
import { Animated } from 'react-native';
import { usePreviousValues } from '@cbhq/cds-common/hooks/usePreviousValues';
import type { MotionBaseSpec } from '@cbhq/cds-common/types';

import { convertMotionConfig } from '../animation/convertMotionConfig';

/** Animate to a new value from it's previously tracked state */
export const useAnimatedTransition = (
  nextValue: number,
  motionSpec: Omit<MotionBaseSpec, 'toValue' | 'property'>,
) => {
  const { getPreviousValue, addPreviousValue } = usePreviousValues<number>([0]);
  addPreviousValue(nextValue);
  const previousValue = getPreviousValue() ?? 0;
  const animatedValue = useRef(new Animated.Value(previousValue));

  useEffect(() => {
    Animated.timing(
      animatedValue.current,
      convertMotionConfig({
        toValue: nextValue,
        ...motionSpec,
      }),
    )?.start();
  }, [nextValue, animatedValue, motionSpec]);

  return animatedValue.current;
};
