import React, { createContext, useContext } from 'react';

import { useRecentItems } from '../hooks/useRecentItems';

type RecentItemsContextValue = {
  recentItems: string[];
  addRecentItem: (item: string) => void;
  removeRecentItem: (item: string) => void;
  clearRecentItems: () => void;
  loaded: boolean;
};

const RecentItemsContext = createContext<RecentItemsContextValue | null>(null);

export const RecentItemsProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
  const value = useRecentItems();

  return <RecentItemsContext.Provider value={value}>{children}</RecentItemsContext.Provider>;
};

export const useRecentItemsContext = () => {
  const context = useContext(RecentItemsContext);
  if (!context) {
    throw new Error('useRecentItemsContext must be used within RecentItemsProvider');
  }
  return context;
};
