import { useSafeAreaInsets } from 'react-native-safe-area-context';

/**
 * @deprecated Use `useSafeAreaInsets().top` from `react-native-safe-area-context` instead.
 */
export const useStatusBarHeight = () => {
  const { top } = useSafeAreaInsets();
  return top;
};
