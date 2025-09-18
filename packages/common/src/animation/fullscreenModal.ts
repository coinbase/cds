import type { MotionBaseSpec } from '../types';

export const modalHiddenOpacity = 0;
export const modalHiddenTranslateY = 80;
export const modalVisibleOpacity = 1;
export const modalVisibleTranslateY = 0;

export const animateInOpacityConfig: MotionBaseSpec = {
  property: 'opacity',
  easing: 'enterFunctional',
  duration: 'moderate3',
  toValue: modalVisibleOpacity,
};
export const animateOutOpacityConfig: MotionBaseSpec = {
  property: 'opacity',
  easing: 'exitFunctional',
  duration: 'moderate1',
  toValue: modalHiddenOpacity,
};

export const animateInTranslateYConfig: MotionBaseSpec = {
  property: 'y',
  easing: 'enterFunctional',
  duration: 'moderate3',
  toValue: modalVisibleTranslateY,
};
export const animateOutTranslateYConfig: MotionBaseSpec = {
  property: 'y',
  easing: 'exitFunctional',
  duration: 'moderate1',
  toValue: modalHiddenTranslateY,
};

export const animateInOverlayOpacityConfig: MotionBaseSpec = {
  ...animateInOpacityConfig,
  easing: 'global',
};
export const animateOutOverlayOpacityConfig: MotionBaseSpec = {
  ...animateOutOpacityConfig,
  easing: 'global',
};
