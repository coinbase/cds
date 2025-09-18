import type { MotionCurve, MotionProperty, MotionValue } from '../types';

type MotionValues = [MotionValue, MotionValue] | MotionValue;

export const generateAnimToken = (
  property: MotionProperty,
  values: MotionValues,
  easing: MotionCurve,
) => {
  if (Array.isArray(values)) {
    return {
      property,
      fromValue: values[0],
      toValue: values[1],
      easing,
    };
  }

  // animate from current value thus no specific fromValue
  return {
    property,
    toValue: values,
    easing,
  };
};
