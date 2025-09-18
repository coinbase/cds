import { useWindowDimensions } from 'react-native';

import { useStatusBarHeight } from './useStatusBarHeight';

// The bottom Navigation bar height needs the be accounted for but could not find a lib to help with this.
export const IOS_BOTTOM_NAV_BAR_HEIGHT = 50;

// This is the beginning of our new dimensions hook. It will build on the old retail `useDimensions` hook.
export function useDimensions() {
  const { height: screenHeight, width: screenWidth } = useWindowDimensions();
  const statusBarHeight = useStatusBarHeight();
  return {
    screenHeight,
    screenWidth,
    statusBarHeight,
  };
}
