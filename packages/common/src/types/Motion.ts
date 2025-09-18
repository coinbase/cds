import type { curves, durations } from '../motion/tokens';

export type MotionCurve = keyof typeof curves;
export type MotionDuration = keyof typeof durations;
export type MotionEffect =
  | 'fadeIn'
  | 'fadeIn10'
  | 'fadeIn20'
  | 'fadeIn30'
  | 'fadeOut'
  | 'fadeOut10'
  | 'fadeOut20'
  | 'fadeOut30'
  | 'slideUp'
  | 'slideUp8'
  | 'slideUp16'
  | 'slideUp24'
  | 'slideUp40'
  | 'slideDown'
  | 'slideDown8'
  | 'slideDown16'
  | 'slideDown24'
  | 'slideDown40'
  | 'slideRight'
  | 'slideRight8'
  | 'slideRight16'
  | 'slideRight24'
  | 'slideRight40'
  | 'slideLeft'
  | 'slideLeft8'
  | 'slideLeft16'
  | 'slideLeft24'
  | 'slideLeft40'
  | 'scaleUpXXS'
  | 'scaleUpXS'
  | 'scaleUpS'
  | 'scaleDownXXS'
  | 'scaleDownXS'
  | 'scaleDownS';

export type MotionProperty = 'opacity' | 'rotate' | 'scale' | 'y' | 'x';
export type MotionValue = number | string;

export type MotionAnimation = Record<
  MotionEffect,
  {
    property: MotionProperty;
    fromValue?: MotionValue;
    toValue: MotionValue;
    easing: MotionCurve;
  }
>;

export type MotionTransition = {
  /**
   * CDS motion easing token
   */
  easing: MotionCurve;
  /**
   * CDS motion duration token
   */
  duration?: MotionDuration;
  /**
   * One-off duration in ms
   */
  oneOffDuration?: number;
};

export type MotionBaseSpec = {
  // TODO: use MotionProperty
  property: string;
  toValue: MotionValue;
  fromValue?: MotionValue;
  delay?: number;
  useNativeDriver?: boolean;
} & MotionTransition;
