import type { MotionBaseSpec } from '../types';

export const activeScale = 1.2;
export const inactiveScale = 1;
export const scaleInConfig: MotionBaseSpec = {
  property: 'scale',
  easing: 'exitFunctional',
  duration: 'fast1',
  fromValue: inactiveScale,
  toValue: activeScale,
  useNativeDriver: true,
};

export const scaleOutConfig: MotionBaseSpec = {
  property: 'scale',
  easing: 'enterFunctional',
  duration: 'slow3',
  fromValue: activeScale,
  toValue: inactiveScale,
  useNativeDriver: true,
};
