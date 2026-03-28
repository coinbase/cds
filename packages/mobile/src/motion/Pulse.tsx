import React, {
  forwardRef,
  memo,
  useCallback,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from 'react';
import { Animated } from 'react-native';
import type { ForwardedRef } from 'react';
import { pulseTransitionConfig, pulseVariantOpacity } from '@coinbase/cds-common/motion/hint';
import type { MotionTransition, PulseVariant } from '@coinbase/cds-common/types';

import { convertMotionConfig } from '../animation/convertMotionConfig';

import type { HintMotionBaseProps } from './types';

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
    const [variantState, setVariantState] = useState(variant);
    const opacity = useRef(new Animated.Value(0)).current;

    const interpolatedOpacity = opacity.interpolate({
      inputRange: [0, 0.5, 1],
      outputRange: [1, pulseVariantOpacity[variantState], 1],
    });

    const stopAnimation = useCallback(() => {
      opacity.stopAnimation();
      opacity.setValue(0);
    }, [opacity]);

    const playAnimation = useCallback(
      async (variantParam?: PulseVariant) => {
        if (variantParam) {
          setVariantState(variantParam);
        }

        stopAnimation();
        Animated.loop(
          Animated.timing(
            opacity,
            convertMotionConfig({
              ...pulseTransitionConfig,
              ...(motionConfig || {}),
              toValue: 1,
            }),
          ),
          { iterations: iterations === 0 ? 1 : iterations },
        ).start();
      },
      [iterations, opacity, stopAnimation, motionConfig],
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

    return <Animated.View style={{ opacity: interpolatedOpacity }}>{children}</Animated.View>;
  }),
);
