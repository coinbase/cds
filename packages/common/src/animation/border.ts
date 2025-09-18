import type { MotionBaseSpec } from '../types';

export const animateInputBorderInConfig: Omit<MotionBaseSpec, 'property' | 'useNativeDriver'> = {
  toValue: 1,
  easing: 'enterFunctional',
  duration: 'moderate1',
};

export const animateInputBorderOutConfig: Omit<MotionBaseSpec, 'property' | 'useNativeDriver'> = {
  toValue: 0,
  easing: 'exitFunctional',
  duration: 'moderate1',
};
