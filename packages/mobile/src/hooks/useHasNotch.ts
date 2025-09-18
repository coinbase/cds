import { useSafeAreaInsets } from 'react-native-safe-area-context';

export const useHasNotch = () => {
  const { top } = useSafeAreaInsets();
  // we choose to hide the statusbar on iOS for devices with a notch, which
  // has a top inset of more than 20.
  return top > 20;
};
