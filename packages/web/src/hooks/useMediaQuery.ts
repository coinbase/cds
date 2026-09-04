import { useCallback, useContext, useSyncExternalStore } from 'react';
import { isDevelopment } from '@coinbase/cds-utils';

import { MediaQueryContext } from '../system/MediaQueryProvider';

const complexQueryCharacters = ['<', '>', '=', ',', ' or ', ' not ', '(((', ')))'];

export const useMediaQuery = (query: string): boolean => {
  const context = useContext(MediaQueryContext);
  if (!context) throw Error('useMediaQuery must be used within a MediaQueryProvider');
  if (isDevelopment() && complexQueryCharacters.some((char) => query.includes(char))) {
    console.warn(
      `useMediaQuery received a complex query which may return an incorrect result for server renders: "${query}". See the docs at https://cds.coinbase.com/hooks/useMediaQuery/#ssr-support`,
    );
  }
  const { subscribe, getSnapshot, getServerSnapshot } = context;
  const subscribeFn = useCallback(
    (callback: () => void) => subscribe(query, callback),
    [subscribe, query],
  );
  const getSnapshotFn = useCallback(() => getSnapshot(query), [getSnapshot, query]);
  const getServerSnapshotFn = useCallback(
    () => getServerSnapshot(query),
    [getServerSnapshot, query],
  );
  return useSyncExternalStore(subscribeFn, getSnapshotFn, getServerSnapshotFn);
};
