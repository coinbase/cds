import type { MotionBaseSpec } from '../types';

export const modalHiddenOpacity = 0;
export const modalHiddenScale = 0.98;
export const modalVisibleOpacity = 1;
export const modalVisibleScale = 1;

export const animateInOpacityConfig: MotionBaseSpec = {
  property: 'opacity',
  easing: 'enterFunctional',
  duration: 'fast1',
  toValue: modalVisibleOpacity,
  fromValue: modalHiddenOpacity,
};
export const animateOutOpacityConfig: MotionBaseSpec = {
  property: 'opacity',
  easing: 'global',
  duration: 'fast1',
  toValue: modalHiddenOpacity,
  fromValue: modalVisibleOpacity,
};

export const animateInScaleConfig: MotionBaseSpec = {
  property: 'scale',
  easing: 'enterFunctional',
  duration: 'moderate3',
  toValue: modalVisibleScale,
  fromValue: modalHiddenScale,
};
export const animateOutScaleConfig: MotionBaseSpec = {
  property: 'scale',
  easing: 'global',
  duration: 'fast1',
  toValue: modalHiddenScale,
  fromValue: modalVisibleScale,
};
