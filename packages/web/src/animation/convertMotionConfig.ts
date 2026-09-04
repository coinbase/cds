import { curves, durations } from '@coinbase/cds-common/motion/tokens';
import type {
  MotionBaseSpec as DefaultMotionSpec,
  MotionCurve,
} from '@coinbase/cds-common/types/Motion';

export const webCurves = {
  global: curves.global.join(),
  enterExpressive: curves.enterExpressive.join(),
  enterFunctional: curves.enterFunctional.join(),
  exitExpressive: curves.exitExpressive.join(),
  exitFunctional: curves.exitFunctional.join(),
  linear: curves.linear.join(),
};

export type MotionBaseSpec = {
  toValue: number | string; // allow strings such as 'scale(0)' on web
  fromValue?: number | string;
} & Omit<DefaultMotionSpec, 'toValue' | 'fromValue' | 'property'> &
  Pick<EffectTiming, 'fill'>;

export type MotionConfigOutput = { easing: string; duration?: number } & EffectTiming &
  Pick<MotionBaseSpec, 'toValue' | 'fromValue' | 'fill'>;

export function cubicBezier(easing: MotionCurve) {
  return `cubic-bezier(${webCurves[easing]})`;
}

export const convertMotionConfig = ({
  toValue,
  fromValue,
  delay,
  easing,
  duration,
  oneOffDuration,
  /**
   * Retain styles after animation has completed
   * @link https://developer.mozilla.org/en-US/docs/Web/API/EffectTiming/fill
   */
  fill = 'forwards',
}: MotionBaseSpec): MotionConfigOutput => {
  return {
    toValue,
    fromValue,
    easing: cubicBezier(easing),
    duration: oneOffDuration ?? (duration && durations[duration]),
    delay,
    fill,
  };
};
