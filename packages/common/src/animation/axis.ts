import type { MotionBaseSpec } from '../types';

// Animation configs for axis components
// These match the timing used in the web visualization axis components

/**
 * Initial animation config for axis tick labels
 * Waits 850ms then fades in over 150ms on initial mount
 */
export const axisTickLabelsInitialAnimateInConfig: MotionBaseSpec = {
  property: 'opacity',
  easing: 'enterFunctional',
  oneOffDuration: 150,
  delay: 850,
  toValue: 1,
  fromValue: 0,
};

export const axisTickLabelsInitialAnimateOutConfig: MotionBaseSpec = {
  property: 'opacity',
  easing: 'exitFunctional',
  oneOffDuration: 150,
  toValue: 0,
  fromValue: 1,
};

/**
 * Update animation config for axis elements (grid lines and tick labels)
 * Used when data changes - fades out 150ms, then fades in 150ms
 */
export const axisUpdateAnimateInConfig: MotionBaseSpec = {
  property: 'opacity',
  easing: 'enterFunctional',
  oneOffDuration: 150,
  delay: 150,
  toValue: 1,
  fromValue: 0,
};

export const axisUpdateAnimateOutConfig: MotionBaseSpec = {
  property: 'opacity',
  easing: 'exitFunctional',
  oneOffDuration: 150,
  toValue: 0,
  fromValue: 1,
};
