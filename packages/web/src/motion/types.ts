import type {
  MotionBaseSpec,
  MotionTransition as MotionBaseTransition,
} from '@coinbase/cds-common/types/Motion';
import type { TargetAndTransition, Transition, Variant } from 'framer-motion';

export type HintMotionBaseProps = {
  /**
   * Disable animation on component mount
   * @default false
   */
  disableAnimateOnMount?: boolean;
};

export type MotionSpec = {
  toValue: MotionBaseSpec['toValue'] | string; // allow string values like scale(0.5)
  fromValue?: MotionBaseSpec['fromValue'] | string;
} & Omit<MotionBaseSpec, 'toValue' | 'fromValue'>;

export type MotionState = 'enter' | 'exit';
export type MotionVariant = {
  enter?: Variant;
  exit?: Variant;
};

export type MotionConfigs =
  | MotionSpec[]
  | {
      tokens: MotionSpec[];
      transitionEnd?: TargetAndTransition['transitionEnd'];
    };

export type MotionTransition = Partial<MotionBaseTransition> & Transition;
