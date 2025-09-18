import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { useTheme } from './useTheme';

export const useSafeBottomPadding = (): number => {
  const { bottom } = useSafeAreaInsets();
  const theme = useTheme();
  // For gesture based navigation on Android the bottom safe area is
  // basically nonexistent. This ensures we have minimal padding.
  return Math.max(bottom, theme.space[1]);
};
