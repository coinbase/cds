import type { MotionBaseSpec } from '../types';

export const baseConfig: Pick<MotionBaseSpec, 'property' | 'easing' | 'duration'> = {
  property: 'transform',
  easing: 'enterFunctional',
  duration: 'moderate1',
};
