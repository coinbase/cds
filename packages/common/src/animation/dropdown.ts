import type { MotionBaseSpec } from '../types';

const baseDropdownAnimations: Pick<MotionBaseSpec, 'easing' | 'duration'> = {
  easing: 'global',
  duration: 'moderate3',
};

const fromTransformValue = -16;
const toTransformValue = 0;

export const animateDropdownOpacityInConfig = {
  property: 'opacity',
  fromValue: 0,
  toValue: 1,
  ...baseDropdownAnimations,
};

export const animateDropdownOpacityOutConfig = {
  property: 'opacity',
  fromValue: 1,
  toValue: 0,
  ...baseDropdownAnimations,
};

// property based on placement
export const animateDropdownTransformInConfig = {
  fromValue: fromTransformValue,
  toValue: toTransformValue,
  ...baseDropdownAnimations,
};

export const animateDropdownTransformOutConfig = {
  fromValue: toTransformValue,
  toValue: fromTransformValue,
  ...baseDropdownAnimations,
};
