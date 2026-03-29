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
import type { ThemeVars } from '@coinbase/cds-common/core/theme';
import { colorSurgeEnterConfig, colorSurgeExitConfig } from '@coinbase/cds-common/motion/hint';
import type { MotionBaseSpec } from '@coinbase/cds-common/types';

import { convertMotionConfig } from '../animation/convertMotionConfig';
import { Box } from '../layout';

import type { HintMotionBaseProps } from './types';

export type ColorSurgeBaseProps = HintMotionBaseProps & {
  /**
   * Palette alias of the surge color
   * @default primary
   */
  background?: ThemeVars.Color;
};

export type ColorSurgeRefBaseProps = {
  play: (background?: ThemeVars.Color) => Promise<void>;
};

export type ColorSurgeTypes = ColorSurgeBaseProps;

/**
 * Please consult with the motion team in #ask-motion before using this component.
 */
export const ColorSurge = memo(
  forwardRef(function ColorSurge(
    { background = 'bgPrimary', disableAnimateOnMount = false }: ColorSurgeTypes,
    ref: ForwardedRef<ColorSurgeRefBaseProps>,
  ) {
    const [backgroundState, setBackgroundState] = useState<ThemeVars.Color>(background);
    const opacity = useRef(new Animated.Value(colorSurgeEnterConfig.fromValue as number)).current;

    const playAnimation = useCallback(
      async (backgroundParam?: ThemeVars.Color) => {
        if (backgroundParam) {
          setBackgroundState(backgroundParam);
        }
        Animated.sequence([
          /**
           * Casting to workaround value type mismatch, string value is not allowed for mobile
           * TODO: fix value mismatch and remove casting
           */
          Animated.timing(opacity, convertMotionConfig(colorSurgeEnterConfig as MotionBaseSpec)),
          Animated.timing(opacity, convertMotionConfig(colorSurgeExitConfig as MotionBaseSpec)),
        ]).start();
      },
      [opacity],
    );

    useImperativeHandle(
      ref,
      () => ({
        play: playAnimation,
      }),
      [playAnimation],
    );

    useEffect(() => {
      if (!disableAnimateOnMount) {
        void playAnimation();
      }
    }, [playAnimation, disableAnimateOnMount]);

    return <Box animated background={backgroundState} pin="all" style={{ opacity }} />;
  }),
);
