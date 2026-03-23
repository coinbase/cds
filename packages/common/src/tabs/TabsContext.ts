import { createContext, useContext } from 'react';

import { type TabsApi } from './useTabs';

export type TabsContextValue<TabId extends string = string> = TabsApi<TabId>;

export const TabsContext = createContext<TabsContextValue | undefined>(undefined);

export const useTabsContext = <TabId extends string>(): TabsContextValue<TabId> => {
  const context = useContext(TabsContext) as TabsContextValue<TabId> | undefined;
  if (!context) throw Error('useTabsContext must be used within a TabsContext.Provider');
  return context;
};
