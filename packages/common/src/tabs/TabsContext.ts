import { createContext, useContext } from 'react';

import { type TabsApi } from './useTabs';

export type TabsContextValue<T extends string = string> = TabsApi<T>;

export const TabsContext = createContext<TabsContextValue | undefined>(undefined);

export const useTabsContext = <T extends string>(): TabsContextValue<T> => {
  const context = useContext(TabsContext) as TabsContextValue<T> | undefined;
  if (!context) throw Error('useTabsContext must be used within a TabsContext.Provider');
  return context;
};
