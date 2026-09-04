import { useMemo } from 'react';
import type {
  AnimationControls,
  MotionProps as FramerMotionProps,
  Target,
  TargetAndTransition,
} from 'framer-motion';

import type { MotionConfigs, MotionState, MotionTransition, MotionVariant } from './types';
import { convertTransition, createVariant } from './utils';

type TransformProperties = {
  x?: string | number;
  y?: string | number;
  z?: string | number;
  translateX?: string | number;
  translateY?: string | number;
  translateZ?: string | number;
  rotate?: string | number;
  rotateX?: string | number;
  rotateY?: string | number;
  rotateZ?: string | number;
  scale?: string | number;
  scaleX?: string | number;
  scaleY?: string | number;
  scaleZ?: string | number;
  skew?: string | number;
  skewX?: string | number;
  skewY?: string | number;
  originX?: string | number;
  originY?: string | number;
  originZ?: string | number;
  perspective?: string | number;
  transformPerspective?: string | number;
};

export type UseMotionProps = {
  /**
   * Array of CDS Motion configs for enter animation
   */
  enterConfigs?: MotionConfigs;
  /**
   * Array of CDS Motion configs for exit animation
   */
  exitConfigs?: MotionConfigs;
  /**
   * FM initial prop
   * @default exit
   * @link https://www.framer.com/docs/component/###initial
   */
  initial?: MotionState | Target | boolean;
  /**
   * FM animate prop
   * @default enter
   * @link https://www.framer.com/docs/component/###animate
   */
  animate?: MotionState | TargetAndTransition | AnimationControls | boolean;
  /**
   * FM exit prop
   * @link https://www.framer.com/docs/component/###exit
   */
  exit?: MotionState | TargetAndTransition;
  /**
   * FM transition prop with CDS time-based tokens
   * @link https://www.framer.com/docs/component/###transition
   */
  transition?: MotionTransition;
  transformTemplate?: (transform: TransformProperties, generatedTransform: string) => string;
  viewport?: FramerMotionProps['viewport'];
} & Omit<
  FramerMotionProps,
  'exit' | 'initial' | 'animate' | 'transition' | 'transformTemplate' | 'viewport'
>;

const getVariants = (enterConfigs?: MotionConfigs, exitConfigs?: MotionConfigs) => {
  if (!enterConfigs && !exitConfigs) return undefined;

  const variant: MotionVariant = {};

  if (enterConfigs) {
    variant.enter = createVariant(enterConfigs);
  }

  if (exitConfigs) {
    variant.exit = createVariant(exitConfigs);
  }

  return variant;
};

export const getMotionProps = ({
  enterConfigs,
  exitConfigs,
  initial = 'exit',
  animate = 'enter',
  transition,
  ...rest
}: UseMotionProps) => {
  return {
    variants: getVariants(enterConfigs, exitConfigs),
    initial,
    animate,
    transition: transition && convertTransition(transition),
    ...rest,
  };
};

/**
 * Convert CDS motion configs to framer motion props.
 * @warning Use the function version(getMotionProps) if possible to avoid unnecessary rerenders.
 * @link https://www.framer.com/docs/component/##animation
 */
export const useMotionProps = (props: UseMotionProps) => {
  return useMemo(() => getMotionProps(props), [props]);
};
