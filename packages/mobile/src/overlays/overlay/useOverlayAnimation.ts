import { useMemo, useRef } from 'react';
import { Animated } from 'react-native';
import {
  animateInOpacityConfig,
  animateOutOpacityConfig,
  overlayHiddenOpacity,
} from '@coinbase/cds-common/animation/overlay';
import type { MotionDuration } from '@coinbase/cds-common/types/Motion';

import { convertMotionConfig } from '../../animation/convertMotionConfig';

/**
 * Uses a default overlay animation config, but you can pass it custom duration tokens for enter and exit animations
 * If only a custom enter animation duration value is provided, it will be used for both enter and exit animations
 */
export const useOverlayAnimation = (
  animateInDuration?: MotionDuration,
  animateOutDuration?: MotionDuration,
): [Animated.Value, Animated.CompositeAnimation, Animated.CompositeAnimation] => {
  const overlayAnim = useRef(new Animated.Value(overlayHiddenOpacity));
  // custom animate out duration > animate in duration > fallback
  const getAnimateOutDuration =
    animateOutDuration ?? animateInDuration ?? animateOutOpacityConfig.duration;

  const animateInConfig = useMemo(
    () =>
      convertMotionConfig({
        easing: animateInOpacityConfig.easing,
        toValue: animateInOpacityConfig.toValue,
        fromValue: animateInOpacityConfig.fromValue,
        duration: animateInDuration ?? animateInOpacityConfig.duration,
      } as const),
    [animateInDuration],
  );

  const animateOutConfig = useMemo(
    () =>
      convertMotionConfig({
        easing: animateOutOpacityConfig.easing,
        toValue: animateOutOpacityConfig.toValue,
        fromValue: animateOutOpacityConfig.fromValue,
        duration: getAnimateOutDuration,
      } as const),
    [getAnimateOutDuration],
  );

  return useMemo(() => {
    const animateIn = Animated.timing(overlayAnim.current, animateInConfig);
    const animateOut = Animated.timing(overlayAnim.current, animateOutConfig);
    return [overlayAnim.current, animateIn, animateOut];
  }, [animateInConfig, animateOutConfig]);
};
