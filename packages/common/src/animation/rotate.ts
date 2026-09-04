import type { MotionBaseSpec } from '../types/Motion';

export const baseConfig: Pick<MotionBaseSpec, 'property' | 'easing' | 'duration'> = {
  property: 'transform',
  easing: 'enterFunctional',
  duration: 'moderate1',
};
