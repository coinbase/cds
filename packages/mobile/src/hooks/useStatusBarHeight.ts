import { useSafeAreaInsets } from 'react-native-safe-area-context';

/**
 * @deprecated Use `useSafeAreaInsets().top` from `react-native-safe-area-context` instead. This will be removed in a future major release.
 * @deprecationExpectedRemoval v9
 *
 * This approach is recommended by Expo and provides more reliable values across platforms.
 * @see https://docs.expo.dev/versions/latest/sdk/safe-area-context/
 *
 * @example
 * // Before (deprecated)
 * const statusBarHeight = useStatusBarHeight();
 *
 * // After (recommended)
 * import { useSafeAreaInsets } from 'react-native-safe-area-context';
 * const insets = useSafeAreaInsets();
 * const statusBarHeight = insets.top;
 */
export const useStatusBarHeight = () => {
  const { top } = useSafeAreaInsets();
  return top;
};
