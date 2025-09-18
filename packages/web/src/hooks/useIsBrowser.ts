import { isBrowser } from '../utils/browser';

import { useHasMounted } from './useHasMounted';

/** Checks to see that there is a window and the DOM has mounted */
export const useIsBrowser = () => {
  const hasMounted = useHasMounted();
  return isBrowser() && hasMounted;
};
