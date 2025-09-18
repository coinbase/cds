import type { MotionBaseSpec } from '../types';

const baseConfig: Pick<MotionBaseSpec, 'property' | 'easing' | 'duration'> = {
  property: 'transform',
  easing: 'enterFunctional',
  duration: 'moderate1',
};

export const animateCaretInConfig: MotionBaseSpec = {
  ...baseConfig,
  toValue: 1,
};

export const animateCaretOutConfig: MotionBaseSpec = {
  ...baseConfig,
  toValue: 0,
};
