import { createContext, useContext } from 'react';
import type React from 'react';

import { type RefMapApi } from '../hooks/useRefMap';

export type RefMapContextValue<RefValue> = RefMapApi<RefValue>;

export type RefMapProviderProps<RefValue> = {
  api: RefMapContextValue<RefValue>;
  children?: React.ReactNode;
};

export const RefMapContext = createContext({} as RefMapContextValue<any>);

export const useRefMapContext = <T,>() => {
  const context = useContext<RefMapContextValue<T>>(RefMapContext);
  if (!context.refs) throw Error('useRefMapContext must be called inside a RefMapProvider');
  return context;
};
