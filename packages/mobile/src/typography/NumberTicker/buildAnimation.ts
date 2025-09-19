import { withSpring, withTiming } from 'react-native-reanimated';

import type { SpringTransition, TimingTransition } from './NumberTicker';

// Helper to build an animation node from a PropertyTransition
export const buildAnimation = ({
  toValue,
  transition,
}: {
  toValue: any;
  transition?: TimingTransition | SpringTransition;
}): any => {
  'worklet';
  if (transition && transition.type === 'spring') {
    const { type: _omit, ...springConfig } = transition;
    return withSpring(toValue, springConfig);
  }
  // if type is not provided, we default to timing, same behavior as web
  const { type: _omit, ...timingConfig } = transition ?? {};
  return withTiming(toValue, timingConfig);
};
