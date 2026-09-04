import { easing, inDuration } from '../animation/collapsible';
import type { MotionBaseSpec } from '../types/Motion';

export const animateRotateConfig: Omit<MotionBaseSpec, 'toValue'> = {
  property: 'rotate',
  easing,
  duration: inDuration,
};
