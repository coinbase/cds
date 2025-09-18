import type { MotionBaseSpec } from '../types';

export const toastHiddenOpacity = 0;
export const toastHiddenBottom = 25;
export const toastVisibleOpacity = 1;
export const toastVisibleBottom = 0;

export const animateInOpacityConfig: MotionBaseSpec = {
  property: 'opacity',
  easing: 'enterFunctional',
  duration: 'moderate3',
  toValue: toastVisibleOpacity,
  fromValue: toastHiddenOpacity,
};

export const animateOutOpacityConfig: MotionBaseSpec = {
  property: 'opacity',
  easing: 'exitFunctional',
  duration: 'moderate3',
  toValue: toastHiddenOpacity,
  fromValue: toastVisibleOpacity,
};

export const animateInBottomConfig: MotionBaseSpec = {
  property: 'y',
  easing: 'enterFunctional',
  duration: 'moderate3',
  toValue: toastVisibleBottom,
  fromValue: toastHiddenBottom,
};

export const animateOutBottomConfig: MotionBaseSpec = {
  property: 'y',
  easing: 'exitFunctional',
  duration: 'moderate3',
  toValue: toastHiddenBottom,
  fromValue: toastVisibleBottom,
};

// pan responder configs
export const horizontalPanThreshold = 50;
export const bottomPanThreshold = 10;
