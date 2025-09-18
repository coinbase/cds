import { useCallback, useRef } from 'react';
import { Animated } from 'react-native';
import {
  animateDotOpacityConfig,
  animateDotWidthConfig,
  dotHidden,
  dotVisible,
} from '@cbhq/cds-common/animation/dot';
import { getDotSize } from '@cbhq/cds-common/tokens/dot';

import { convertMotionConfig } from '../../animation/convertMotionConfig';

// opacity animation
const opacityInConfig = convertMotionConfig({
  ...animateDotOpacityConfig,
  toValue: dotVisible,
  fromValue: dotHidden,
});
const opacityOutConfig = convertMotionConfig({
  ...animateDotOpacityConfig,
  toValue: dotHidden,
  fromValue: dotVisible,
});

// Y transform animation
const scaleInConfig = convertMotionConfig({
  ...animateDotWidthConfig,
  toValue: getDotSize(),
  fromValue: 0,
});
const scaleOutConfig = convertMotionConfig({
  ...animateDotWidthConfig,
  toValue: 0,
  fromValue: getDotSize(),
});

export const useDotAnimation = () => {
  const opacity = useRef(new Animated.Value(dotHidden)).current;
  const width = useRef(new Animated.Value(dotHidden)).current;

  const animateIn = useCallback(
    (count: number) => {
      const params = { ...scaleInConfig, toValue: getDotSize(count) };
      return Animated.parallel([
        Animated.timing(opacity, opacityInConfig),
        Animated.timing(width, params),
      ]).start();
    },
    [opacity, width],
  );

  const animateOut = useCallback(
    (count: number) => {
      const params = { ...scaleOutConfig, fromValue: getDotSize(count) };
      return Animated.parallel([
        Animated.timing(opacity, opacityOutConfig),
        Animated.timing(width, params),
      ]).start();
    },
    [opacity, width],
  );

  return {
    opacity,
    width,
    animateIn,
    animateOut,
  };
};
