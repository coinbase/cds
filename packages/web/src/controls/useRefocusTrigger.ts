import { useEffect, useRef } from 'react';
import { FOCUSABLE_ELEMENTS } from '@coinbase/cds-common/tokens/overlays';

import { isBrowser } from '../utils/browser';

/** Refocuses a pressable that opens a menu after the menu has been opened and then closed */
export const useRefocusTrigger = (shouldRefocus: boolean) => {
  const ref = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    //  focuses the element after the menu opens & closes at least once
    if (shouldRefocus && isBrowser() && ref.current) {
      const focusableElements = ref.current.parentNode?.querySelectorAll(FOCUSABLE_ELEMENTS);

      if (focusableElements?.length && focusableElements[0]) {
        (focusableElements[0] as HTMLElement).focus();
      }
    }
  }, [shouldRefocus, ref]);

  return ref;
};
