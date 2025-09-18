import type { MotionBaseSpec } from '../types';

const basePopoverMenuAnimations: Pick<MotionBaseSpec, 'easing' | 'duration'> = {
  easing: 'global',
  duration: 'moderate3',
};

const yFromValue = -16;
const yToValue = 0;

export const animateMenuOpacityInConfig = {
  property: 'opacity',
  fromValue: 0,
  toValue: 1,
  ...basePopoverMenuAnimations,
};

export const animateMenuOpacityOutConfig = {
  property: 'opacity',
  fromValue: 1,
  toValue: 0,
  ...basePopoverMenuAnimations,
};

export const animateMenuTransformInConfig = {
  property: 'transform',
  fromValue: yFromValue,
  toValue: yToValue,
  ...basePopoverMenuAnimations,
};

export const animateMenuTransformOutConfig = {
  property: 'transform',
  fromValue: yToValue,
  toValue: yFromValue,
  ...basePopoverMenuAnimations,
};
