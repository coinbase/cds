import React, {
  forwardRef,
  memo,
  useCallback,
  useEffect,
  useImperativeHandle,
  useMemo,
} from 'react';
import type { ForwardedRef } from 'react';
import type { MotionTransition, PulseVariant } from '@coinbase/cds-common';
import { pulseTransitionConfig, pulseVariantOpacity } from '@coinbase/cds-common/motion/hint';
import { m as motion, useAnimation } from 'framer-motion';

import type { HintMotionBaseProps } from './types';
import { convertTransition } from './utils';

export type PulseBaseProps = HintMotionBaseProps & {
  /**
   * Variant controls opacity of the pulse
   * @default moderate
   */
  variant?: PulseVariant;
  children: React.ReactNode;
  /**
   * Specifies the number of times the pulse animation should loop.
   * Provide a positive integer to define an exact number of loops.
   * To enable infinite looping, omit this property or leave it undefined.
   * By default, the animation loops infinitely if this property is not specified.
   * @default Infinity
   */
  iterations?: number;
  /**
   * Custom motion transition to override default motion config
   */
  motionConfig?: Partial<MotionTransition>;
};

export type PulseRefBaseProps = {
  play: (variant?: PulseVariant) => Promise<void>;
  stop: () => void;
};

export type PulseProps = PulseBaseProps;

export const calculateRepeatValue = (iterations: number | undefined) => {
  if (iterations === undefined || iterations === Infinity) {
    return Infinity;
  }
  // Adjust for Framer Motion's zero-indexed repeat, ensure non-negative
  return iterations > 0 ? iterations - 1 : 0;
};

/**
 * Please consult with the motion team in #ask-motion before using this component.
 */
export const Pulse = memo(
  forwardRef(function Pulse(
    {
      children,
      variant = 'moderate',
      disableAnimateOnMount = false,
      iterations,
      motionConfig,
    }: PulseProps,
    ref: ForwardedRef<PulseRefBaseProps>,
  ) {
    const controls = useAnimation();

    const stopAnimation = useCallback(() => {
      controls.stop();
      controls.set({ opacity: 1 });
    }, [controls]);

    const repeatValue = useMemo(() => calculateRepeatValue(iterations), [iterations]);

    const playAnimation = useCallback(
      async (variantParam?: PulseVariant) => {
        stopAnimation();
        await controls.start({
          opacity: [1, pulseVariantOpacity[variantParam ?? variant], 1],
          transition: convertTransition({
            ...pulseTransitionConfig,
            ...(motionConfig || {}),
            repeat: repeatValue,
          }),
        });
      },
      [stopAnimation, controls, variant, repeatValue, motionConfig],
    );

    useEffect(() => {
      if (!disableAnimateOnMount) {
        void playAnimation();
      }
    }, [playAnimation, disableAnimateOnMount]);

    useImperativeHandle(
      ref,
      () => ({
        play: playAnimation,
        stop: stopAnimation,
      }),
      [playAnimation, stopAnimation],
    );

    return <motion.div animate={controls}>{children}</motion.div>;
  }),
);
