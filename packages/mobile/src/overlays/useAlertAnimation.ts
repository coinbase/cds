import { useMemo } from 'react';
import { Animated } from 'react-native';

import { useModalAnimation } from './modal/useModalAnimation';
import { useOverlayAnimation } from './overlay/useOverlayAnimation';

export const useAlertAnimation = (): [
  { modalOpacity: Animated.Value; modalScale: Animated.Value; overlayOpacity: Animated.Value },
  Animated.CompositeAnimation,
  Animated.CompositeAnimation,
] => {
  const [{ opacity: modalOpacity, scale: modalScale }, animateModalIn, animateModalOut] =
    useModalAnimation();
  const [overlayOpacity, animateOverlayIn, animateOverlayOut] = useOverlayAnimation();

  return useMemo(
    () => [
      { modalOpacity, modalScale, overlayOpacity },
      Animated.parallel([animateModalIn, animateOverlayIn]),
      Animated.parallel([animateModalOut, animateOverlayOut]),
    ],
    [
      modalOpacity,
      modalScale,
      overlayOpacity,
      animateModalIn,
      animateOverlayIn,
      animateModalOut,
      animateOverlayOut,
    ],
  );
};
