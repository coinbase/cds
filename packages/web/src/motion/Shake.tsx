import React, { forwardRef, memo, useCallback, useEffect, useImperativeHandle } from 'react';
import type { ForwardedRef } from 'react';
import { shakeTransitionConfig, shakeTranslateX } from '@coinbase/cds-common/motion/hint';
import { m as motion, useAnimation } from 'framer-motion';

import type { HintMotionBaseProps } from './types';
import { convertTransition } from './utils';

export type ShakeRefBaseProps = {
  play: () => Promise<void>;
};

export type ShakeBaseProps = HintMotionBaseProps & {
  children: React.ReactNode;
};

export type ShakeProps = ShakeBaseProps;

/**
 * Please consult with the motion team in #ask-motion before using this component.
 */
export const Shake = memo(
  forwardRef(function Shake(
    { children, disableAnimateOnMount = false }: ShakeProps,
    ref: ForwardedRef<ShakeRefBaseProps>,
  ) {
    const controls = useAnimation();

    const playAnimation = useCallback(
      async () =>
        controls.start({
          x: shakeTranslateX,
          transition: convertTransition(shakeTransitionConfig),
        }),
      [controls],
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
      }),
      [playAnimation],
    );

    return <motion.div animate={controls}>{children}</motion.div>;
  }),
);
