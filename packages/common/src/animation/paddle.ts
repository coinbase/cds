import type { MotionBaseSpec } from '../types';

export const paddleHidden = 0;
export const paddleVisible = 1;

export const animateGradientScaleConfig: Omit<MotionBaseSpec, 'toValue' | 'fromValue'> = {
  property: 'scale',
  easing: 'global',
  duration: 'fast1',
};

export const animatePaddleOpacityConfig: Omit<MotionBaseSpec, 'toValue' | 'fromValue'> = {
  property: 'opacity',
  easing: 'enterFunctional',
  duration: 'moderate1',
};

export const animatePaddleScaleConfig: Omit<MotionBaseSpec, 'toValue' | 'fromValue'> = {
  property: 'scale',
  easing: 'global',
  duration: 'moderate1',
};
