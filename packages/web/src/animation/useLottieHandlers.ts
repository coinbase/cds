import { useMemo } from 'react';
import { mapValues } from '@coinbase/cds-utils';

import type { LottieEventHandlersMap, LottieListener } from './types';

const emptyArray: LottieListener[] = [];

export const useLottieHandlers = (handlers?: LottieEventHandlersMap) => {
  return useMemo(() => {
    if (handlers) {
      const objectMap = mapValues(handlers, (val, key) => ({ name: key, handler: val }));
      return Object.values(objectMap).filter(
        (listener): listener is LottieListener => !!listener && !!listener.handler,
      );
    }
    return emptyArray;
  }, [handlers]);
};
