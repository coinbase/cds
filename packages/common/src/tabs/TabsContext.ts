import { createContext, useContext } from 'react';

import { type TabsApi, type TabValue } from './useTabs';

export type TabsContextValue<
  TabId extends string = string,
  TTab extends TabValue<TabId> = TabValue<TabId>,
> = TabsApi<TabId, TTab>;

export const TabsContext = createContext<TabsContextValue | undefined>(undefined);

export const useTabsContext = <
  TabId extends string,
  TTab extends TabValue<TabId> = TabValue<TabId>,
>(): TabsContextValue<TabId, TTab> => {
  const context = useContext(TabsContext) as TabsContextValue<TabId, TTab> | undefined;
  if (!context) throw Error('useTabsContext must be used within a TabsContext.Provider');
  return context;
};
