import React, {
  forwardRef,
  memo,
  useCallback,
  useEffect,
  useImperativeHandle,
  useState,
} from 'react';
import type { ThemeVars } from '@coinbase/cds-common/core/theme';
import { colorSurgeEnterConfig, colorSurgeExitConfig } from '@coinbase/cds-common/motion/hint';
import { m as motion, useAnimation } from 'framer-motion';

import { Box } from '../layout/Box';

import type { HintMotionBaseProps } from './types';
import { useMotionProps } from './useMotionProps';

export type ColorSurgeRefBaseProps = {
  play: (background?: ThemeVars.Color) => Promise<void>;
};

export type ColorSurgeBaseProps = HintMotionBaseProps & {
  /**
   * The surge color
   * @default bgPrimary
   */
  background?: ThemeVars.Color;
};

export type ColorSurgeTypes = ColorSurgeBaseProps;

const MotionBox = motion(Box);

/**
 * Please consult with the motion team in #ask-motion before using this component.
 */
export const ColorSurge = memo(
  forwardRef(function ColorSurge(
    { background = 'bgPrimary', disableAnimateOnMount = false }: ColorSurgeTypes,
    ref: React.ForwardedRef<ColorSurgeRefBaseProps>,
  ) {
    const [backgroundState, setBackgroundState] = useState<ThemeVars.Color>(background);

    const controls = useAnimation();

    const motionProps = useMotionProps({
      enterConfigs: [colorSurgeEnterConfig],
      exitConfigs: [colorSurgeExitConfig],
      animate: controls,
    });

    const playAnimation = useCallback(
      async (backgroundParam?: ThemeVars.Color) => {
        if (backgroundParam) {
          setBackgroundState(backgroundParam);
        }
        controls.set('enter');
        await controls.start('exit');
      },
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

    return (
      <MotionBox
        animate={controls}
        background={backgroundState}
        initial={disableAnimateOnMount ? 'exit' : 'enter'}
        pin="all"
        variants={motionProps.variants}
      />
    );
  }),
);
