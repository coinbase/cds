import { useMemo, useRef } from 'react';
import { Animated } from 'react-native';
import {
  animateInOpacityConfig,
  animateOutOpacityConfig,
  getTranslateConfigByPlacement,
  tooltipHiddenOpacity,
} from '@coinbase/cds-common/animation/tooltip';

import { convertMotionConfig } from '../../animation/convertMotionConfig';

import type { TooltipPlacement } from './TooltipProps';

// opacity animation
const opacityInConfig = convertMotionConfig(animateInOpacityConfig);
const opacityOutConfig = convertMotionConfig(animateOutOpacityConfig);

export const useTooltipAnimation = (placement: TooltipPlacement) => {
  // translate animation
  const enterConfigByPlacement = getTranslateConfigByPlacement({ placement });
  const exitConfigByPlacement = getTranslateConfigByPlacement({ placement, isExiting: true });

  const opacity = useRef(new Animated.Value(tooltipHiddenOpacity)).current;
  const translateY = useRef(new Animated.Value(enterConfigByPlacement.fromValue as number)).current;

  const animateIn = useMemo(() => {
    return Animated.parallel([
      Animated.timing(opacity, opacityInConfig),
      Animated.timing(translateY, convertMotionConfig(enterConfigByPlacement)),
    ]);
  }, [opacity, translateY, enterConfigByPlacement]);

  const animateOut = useMemo(() => {
    return Animated.parallel([
      Animated.timing(opacity, opacityOutConfig),
      Animated.timing(translateY, convertMotionConfig(exitConfigByPlacement)),
    ]);
  }, [opacity, translateY, exitConfigByPlacement]);

  return {
    opacity,
    translateY,
    animateIn,
    animateOut,
  };
};
