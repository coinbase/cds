import type { Animated } from 'react-native';

export type AnimationHookProps<T> = {
  animatedStyles: T;
  animateIn: Animated.CompositeAnimation;
  animateOut: Animated.CompositeAnimation;
};
