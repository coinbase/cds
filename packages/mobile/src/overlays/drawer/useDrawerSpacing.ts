import { useMemo } from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import type { PinningDirection } from '@coinbase/cds-common';
import { MAX_OVER_DRAG } from '@coinbase/cds-common/animation/drawer';

import { useSafeBottomPadding } from '../../hooks/useSafeBottomPadding';

export const useDrawerSpacing = (
  pin: PinningDirection | undefined = 'bottom',
  reduceMotion?: boolean,
) => {
  const { top } = useSafeAreaInsets();
  const safeBottomPadding: number = useSafeBottomPadding();

  // MAX_OVER_DRAG padding accommodates the over-drag area during swipe gestures.
  // It is normally hidden off-screen by the slide transform. When reduceMotion is
  // true there is no transform, so the extra padding must be excluded.
  const overDragPadding = reduceMotion ? 0 : MAX_OVER_DRAG;

  const safeAreaStyles = useMemo(() => {
    switch (pin) {
      case 'top':
        return { paddingTop: top + overDragPadding };
      case 'left':
        return { paddingTop: top, paddingLeft: overDragPadding };
      case 'bottom':
        return { paddingBottom: safeBottomPadding + overDragPadding };
      case 'right':
        return { paddingTop: top, paddingRight: overDragPadding };
      default:
        return { paddingBottom: safeBottomPadding + overDragPadding };
    }
  }, [pin, safeBottomPadding, top, overDragPadding]);

  return safeAreaStyles;
};
