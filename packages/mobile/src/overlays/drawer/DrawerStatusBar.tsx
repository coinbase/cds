import React, { memo } from 'react';
import { Platform, StatusBar } from 'react-native';
import type { PinningDirection } from '@cbhq/cds-common/types';

import { useHasNotch } from '../../hooks/useHasNotch';

type DrawerStatusBarProps = {
  pin: PinningDirection;
  visible: boolean;
};

export const DrawerStatusBar = memo(function DrawerStatusBar({
  pin,
  visible,
}: DrawerStatusBarProps) {
  /** this is only used for when the drawer comes from the side or top, and it fades out the menus in the notches (time and wifi/battery) */
  const hasNotch = useHasNotch();
  const updateStatusBar = hasNotch && ['left', 'right', 'top'].includes(pin);

  return Platform.select({
    ios: updateStatusBar ? <StatusBar animated hidden={visible} /> : null,
    default: null,
  });
});

DrawerStatusBar.displayName = 'DrawerStatusBar';
