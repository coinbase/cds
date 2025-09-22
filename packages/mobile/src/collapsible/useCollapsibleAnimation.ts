import { useMemo, useRef } from 'react';
import { Animated } from 'react-native';
import type { CollapsibleDirection } from '@cbhq/cds-common';
import {
  animateInMaxSizeConfig,
  animateInOpacityConfig,
  animateOutMaxSizeConfig,
  animateOutOpacityConfig,
  collapsibleHiddenMaxSize,
  collapsibleHiddenOpacity,
  collapsibleVisibleOpacity,
} from '@cbhq/cds-common/animation/collapsible';

import { convertMotionConfig } from '../animation/convertMotionConfig';

import type { UseCollapsibleDirectionReturn } from './useCollapsibleDirection';

type UseCollapsibleAnimationParams = {
  collapsed: boolean;
  animateTo: UseCollapsibleDirectionReturn['animateTo'];
  animateProperty: UseCollapsibleDirectionReturn['animateProperty'];
  direction: CollapsibleDirection;
};

export const useCollapsibleAnimation = ({
  collapsed,
  animateTo,
  animateProperty,
  direction,
}: UseCollapsibleAnimationParams) => {
  const defaultExpanded = useRef(!collapsed);
  const collapsibleOpacity = useRef(new Animated.Value(collapsibleHiddenOpacity)).current;
  const collapsibleSize = useRef(new Animated.Value(collapsibleHiddenMaxSize)).current;

  // if it's expanded by default, fast forward the animated value to skip the animation
  if (defaultExpanded.current && animateTo > 0) {
    collapsibleOpacity.setValue(collapsibleVisibleOpacity);
    collapsibleSize.setValue(animateTo);
    defaultExpanded.current = false;
  }

  const animateIn = useMemo(
    () =>
      Animated.parallel([
        Animated.timing(collapsibleOpacity, convertMotionConfig(animateInOpacityConfig[direction])),
        Animated.timing(collapsibleSize, {
          ...convertMotionConfig(animateInMaxSizeConfig[direction]),
          toValue: animateTo,
        }),
      ]),
    [animateTo, direction, collapsibleOpacity, collapsibleSize],
  );

  const animateOut = useMemo(
    () =>
      Animated.parallel([
        Animated.timing(
          collapsibleOpacity,
          convertMotionConfig(animateOutOpacityConfig[direction]),
        ),
        Animated.timing(collapsibleSize, convertMotionConfig(animateOutMaxSizeConfig[direction])),
      ]),
    [direction, collapsibleOpacity, collapsibleSize],
  );

  return useMemo(() => {
    return {
      animatedStyles: {
        opacity: collapsibleOpacity,
        [animateProperty]: collapsibleSize,
      },
      animateIn,
      animateOut,
    };
  }, [animateIn, animateOut, animateProperty, collapsibleOpacity, collapsibleSize]);
};
