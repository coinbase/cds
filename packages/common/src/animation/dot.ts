import { durations } from '../motion/tokens';
import type { MotionBaseSpec } from '../types';

export const dotHidden = 0;
export const dotVisible = 1;

export const animateDotWidthConfig: Omit<MotionBaseSpec, 'toValue' | 'fromValue'> = {
  property: 'width',
  easing: 'global',
  duration: 'fast1',
  useNativeDriver: false,
};

export const animateDotOpacityConfig: Omit<MotionBaseSpec, 'toValue' | 'fromValue'> = {
  property: 'opacity',
  easing: 'exitFunctional',
  duration: 'fast1',
  delay: durations.fast1,
};
