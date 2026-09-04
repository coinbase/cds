import { useCallback, useContext, useRef, useSyncExternalStore } from 'react';

import { type DeviceBreakpoint, media } from '../styles/media';
import { MediaQueryContext } from '../system/MediaQueryProvider';

export type DeviceBreakpointValues =
  | 'isPhone'
  | 'isPhonePortrait'
  | 'isPhoneLandscape'
  | 'isTablet'
  | 'isTabletPortrait'
  | 'isTabletLandscape'
  | 'isDesktop'
  | 'isDesktopSmall'
  | 'isDesktopLarge'
  | 'isExtraWide';

type BreakpointRecord = Record<DeviceBreakpointValues, boolean>;

const booleanDeviceNames: Record<DeviceBreakpoint, DeviceBreakpointValues> = {
  phone: 'isPhone',
  phonePortrait: 'isPhonePortrait',
  phoneLandscape: 'isPhoneLandscape',
  tablet: 'isTablet',
  tabletPortrait: 'isTabletPortrait',
  tabletLandscape: 'isTabletLandscape',
  desktop: 'isDesktop',
  desktopSmall: 'isDesktopSmall',
  desktopLarge: 'isDesktopLarge',
  extraWide: 'isExtraWide',
};

const deviceKeys = Object.keys(media) as DeviceBreakpoint[];

// Initial snapshot with all breakpoint values set to false
const initialSnapshot: BreakpointRecord = {
  isPhone: false,
  isPhonePortrait: false,
  isPhoneLandscape: false,
  isTablet: false,
  isTabletPortrait: false,
  isTabletLandscape: false,
  isDesktop: false,
  isDesktopSmall: false,
  isDesktopLarge: false,
  isExtraWide: false,
};

/**
 * Only use this hook to conditionally render large component trees or logic
 * @returns isPhone, isPhoneLandscape, isTablet, isTabletLandscape, isDesktop, isDesktopLarge, isExtraWide
 */
export const useBreakpoints = (): BreakpointRecord => {
  const context = useContext(MediaQueryContext);
  if (!context) throw Error('useBreakpoints must be used within a MediaQueryProvider');
  const matches = useRef<BreakpointRecord>(initialSnapshot);

  const { subscribe, getSnapshot, getServerSnapshot } = context;
  const subscribeFn = useCallback(
    (callback: () => void) => {
      //Subscribe to each breakpoint query and collect unsubscribe callbacks
      const unsubscribers = deviceKeys.map((device) => subscribe(media[device], callback));
      // Return a function that unsubscribes from all
      return () => unsubscribers.forEach((unsubscribe) => unsubscribe());
    },
    [subscribe],
  );
  const getSnapshotFn = useCallback(() => {
    for (const deviceKey of deviceKeys) {
      const snapshot = getSnapshot(media[deviceKey]);
      if (matches.current[booleanDeviceNames[deviceKey]] !== snapshot) {
        matches.current = {
          ...matches.current,
          [booleanDeviceNames[deviceKey]]: snapshot,
        };
      }
    }
    return matches.current;
  }, [getSnapshot]);
  const getServerSnapshotFn = useCallback(() => {
    for (const deviceKey of deviceKeys) {
      const snapshot = getServerSnapshot(media[deviceKey]);
      if (matches.current[booleanDeviceNames[deviceKey]] !== snapshot) {
        matches.current = {
          ...matches.current,
          [booleanDeviceNames[deviceKey]]: snapshot,
        };
      }
    }
    return matches.current;
  }, [getServerSnapshot]);
  return useSyncExternalStore(subscribeFn, getSnapshotFn, getServerSnapshotFn);
};
