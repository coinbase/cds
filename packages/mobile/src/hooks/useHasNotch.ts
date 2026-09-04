import { useSafeAreaInsets } from 'react-native-safe-area-context';

/**
 * @deprecated This logic is seriously outdated. The last iPhone version to have a 20px status bar was iPhone 8. Most modern iOS devices no longer have a "notch". This will be removed in a future major release.
 * @deprecationExpectedRemoval v10
 */
export const useHasNotch = () => {
  const { top } = useSafeAreaInsets();
  // older iphones without a notch (or island for current phones) have a status bar of 20px
  return top > 20;
};
