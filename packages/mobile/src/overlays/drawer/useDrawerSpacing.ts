import { useMemo } from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import type { PinningDirection } from '@coinbase/cds-common';
import { MAX_OVER_DRAG } from '@coinbase/cds-common/animation/drawer';

import { useSafeBottomPadding } from '../../hooks/useSafeBottomPadding';

export const useDrawerSpacing = (
  pin: PinningDirection | undefined = 'bottom',
  disableSafeAreaPaddingBottom: boolean = false,
) => {
  const { top: safeTopPadding } = useSafeAreaInsets();
  const safeBottomPadding: number = useSafeBottomPadding();

  const safeAreaStyles = useMemo(() => {
    switch (pin) {
      case 'top':
        return { paddingTop: safeTopPadding + MAX_OVER_DRAG };
      case 'left':
        return { paddingTop: safeTopPadding, paddingLeft: MAX_OVER_DRAG };
      case 'bottom':
        return {
          paddingBottom: disableSafeAreaPaddingBottom
            ? MAX_OVER_DRAG
            : safeBottomPadding + MAX_OVER_DRAG,
        };
      case 'right':
        return { paddingTop: safeTopPadding, paddingRight: MAX_OVER_DRAG };
      default:
        return {
          paddingBottom: disableSafeAreaPaddingBottom
            ? MAX_OVER_DRAG
            : safeBottomPadding + MAX_OVER_DRAG,
        };
    }
  }, [pin, safeBottomPadding, safeTopPadding, disableSafeAreaPaddingBottom]);

  return safeAreaStyles;
};
