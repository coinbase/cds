import { useMemo, useRef } from 'react';
import { Animated } from 'react-native';
import {
  animateInOpacityConfig,
  animateInScaleConfig,
  animateOutOpacityConfig,
  animateOutScaleConfig,
  modalHiddenOpacity,
  modalHiddenScale,
} from '@coinbase/cds-common/animation/modal';

import { convertMotionConfig } from '../../animation/convertMotionConfig';

// opacity animation
const opacityInConfig = convertMotionConfig(animateInOpacityConfig);
const opacityOutConfig = convertMotionConfig(animateOutOpacityConfig);

// scale animation
const scaleInConfig = convertMotionConfig(animateInScaleConfig);
const scaleOutConfig = convertMotionConfig(animateOutScaleConfig);

export const useModalAnimation = (): [
  { opacity: Animated.Value; scale: Animated.Value },
  Animated.CompositeAnimation,
  Animated.CompositeAnimation,
] => {
  const modalOpacity = useRef(new Animated.Value(modalHiddenOpacity));
  const modalScale = useRef(new Animated.Value(modalHiddenScale));

  const animateIn = useMemo(
    () =>
      Animated.parallel([
        Animated.timing(modalOpacity.current, opacityInConfig),
        Animated.timing(modalScale.current, scaleInConfig),
      ]),
    [],
  );

  const animateOut = useMemo(
    () =>
      Animated.parallel([
        Animated.timing(modalOpacity.current, opacityOutConfig),
        Animated.timing(modalScale.current, scaleOutConfig),
      ]),
    [],
  );

  return useMemo(() => {
    return [{ opacity: modalOpacity.current, scale: modalScale.current }, animateIn, animateOut];
  }, [animateIn, animateOut]);
};
