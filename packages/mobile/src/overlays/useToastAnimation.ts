import { useMemo, useRef } from 'react';
import { Animated } from 'react-native';
import {
  animateInBottomConfig,
  animateInOpacityConfig,
  animateOutBottomConfig,
  animateOutOpacityConfig,
  toastHiddenBottom,
  toastHiddenOpacity,
} from '@coinbase/cds-common/animation/toast';

import { convertMotionConfig } from '../animation/convertMotionConfig';

// opacity animation
const opacityInConfig = convertMotionConfig(animateInOpacityConfig);
const opacityOutConfig = convertMotionConfig(animateOutOpacityConfig);

// position animation
const bottomInConfig = convertMotionConfig(animateInBottomConfig);
const bottomOutConfig = convertMotionConfig(animateOutBottomConfig);

export const useToastAnimation = (): [
  { opacity: Animated.Value; bottom: Animated.Value },
  Animated.CompositeAnimation,
  Animated.CompositeAnimation,
] => {
  const toastOpacity = useRef(new Animated.Value(toastHiddenOpacity));
  const toastBottom = useRef(new Animated.Value(toastHiddenBottom));

  const animateIn = useMemo(
    () =>
      Animated.parallel([
        Animated.timing(toastOpacity.current, opacityInConfig),
        Animated.timing(toastBottom.current, bottomInConfig),
      ]),
    [],
  );

  const animateOut = useMemo(
    () =>
      Animated.parallel([
        Animated.timing(toastOpacity.current, opacityOutConfig),
        Animated.timing(toastBottom.current, bottomOutConfig),
      ]),
    [],
  );

  return useMemo(() => {
    return [{ opacity: toastOpacity.current, bottom: toastBottom.current }, animateIn, animateOut];
  }, [animateIn, animateOut]);
};
