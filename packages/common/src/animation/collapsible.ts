import { durations } from '../motion/tokens';
import type { CollapsibleDirection, MotionBaseSpec } from '../types';

type CollapsibleMotionSpec = Record<CollapsibleDirection, MotionBaseSpec>;

export const collapsibleHiddenOpacity = 0;
export const collapsibleVisibleOpacity = 1;
export const collapsibleHiddenMaxSize = 0;
// for web, mobile will be determined by content height dynamically
export const collapsibleVisibleMaxSize = 1000;

export const easing = 'global';
export const inDuration = 'slow1';
export const outDuration = 'moderate3';

export const animateInOpacityConfig: CollapsibleMotionSpec = {
  vertical: {
    property: 'opacity',
    easing,
    duration: inDuration,
    toValue: collapsibleVisibleOpacity,
    fromValue: collapsibleHiddenOpacity,
    useNativeDriver: false,
  },
  horizontal: {
    property: 'opacity',
    easing: 'exitFunctional',
    duration: 'fast1',
    delay: durations.fast1,
    toValue: collapsibleVisibleOpacity,
    fromValue: collapsibleHiddenOpacity,
    useNativeDriver: false,
  },
};
export const animateOutOpacityConfig: CollapsibleMotionSpec = {
  vertical: {
    ...animateInOpacityConfig.vertical,
    duration: outDuration,
    toValue: collapsibleHiddenOpacity,
    fromValue: collapsibleVisibleOpacity,
  },
  horizontal: {
    ...animateInOpacityConfig.horizontal,
    toValue: collapsibleHiddenOpacity,
    fromValue: collapsibleVisibleOpacity,
    delay: undefined,
  },
};

export const animateInMaxSizeConfig: CollapsibleMotionSpec = {
  vertical: {
    property: 'height',
    easing,
    duration: inDuration,
    toValue: collapsibleVisibleMaxSize,
    fromValue: collapsibleHiddenMaxSize,
    useNativeDriver: false,
  },
  horizontal: {
    property: 'width',
    easing: 'global',
    duration: 'fast1',
    useNativeDriver: false,
    toValue: collapsibleVisibleMaxSize,
    fromValue: collapsibleHiddenMaxSize,
  },
};

export const animateOutMaxSizeConfig: CollapsibleMotionSpec = {
  vertical: {
    ...animateInMaxSizeConfig.vertical,
    duration: outDuration,
    toValue: collapsibleHiddenMaxSize,
    fromValue: collapsibleVisibleMaxSize,
  },
  horizontal: {
    ...animateInMaxSizeConfig.horizontal,
    delay: durations.fast1,
    toValue: collapsibleHiddenMaxSize,
    fromValue: collapsibleVisibleMaxSize,
  },
};
