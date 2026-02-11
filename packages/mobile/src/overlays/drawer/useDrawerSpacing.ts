import { useMemo } from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import type { PinningDirection } from '@coinbase/cds-common';
import { MAX_OVER_DRAG } from '@coinbase/cds-common/animation/drawer';

import { useSafeBottomPadding } from '../../hooks/useSafeBottomPadding';

export const useDrawerSpacing = (pin: PinningDirection | undefined = 'bottom') => {
  const { top } = useSafeAreaInsets();
  const safeBottomPadding: number = useSafeBottomPadding();

  const safeAreaStyles = useMemo(() => {
    switch (pin) {
      case 'top':
        return { paddingTop: top + MAX_OVER_DRAG };
      case 'left':
        return { paddingTop: top, paddingLeft: MAX_OVER_DRAG };
      case 'bottom':
        return { paddingBottom: safeBottomPadding + MAX_OVER_DRAG };
      case 'right':
        return { paddingTop: top, paddingRight: MAX_OVER_DRAG };
      default:
        return { paddingBottom: safeBottomPadding + MAX_OVER_DRAG };
    }
  }, [pin, safeBottomPadding, top]);

  return safeAreaStyles;
};
