import { useEffect } from 'react';
import type { Animated } from 'react-native';
import { usePreviousValue } from '@coinbase/cds-common/hooks/usePreviousValue';

type ToggleAnimation = {
  animateIn: Animated.CompositeAnimation;
  animateOut: Animated.CompositeAnimation;
  on: boolean;
};

export const useToggleAnimation = ({ on, animateIn, animateOut }: ToggleAnimation) => {
  const previousOn = usePreviousValue(on);

  useEffect(() => {
    if (!previousOn && on) {
      animateIn.start();
    }
    // prevent animating on default collapsed items
    if (previousOn && !on) {
      animateOut.start();
    }
  }, [animateIn, animateOut, on, previousOn]);
};
