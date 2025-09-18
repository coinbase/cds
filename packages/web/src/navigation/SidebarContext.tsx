import { createContext, useContext } from 'react';

export type SidebarContextType = {
  collapsed: boolean;
  variant: 'default' | 'condensed';
};

export const SidebarContext = createContext<SidebarContextType>({
  collapsed: false,
  variant: 'default',
});

export const SidebarProvider = SidebarContext.Provider;

export const useSidebarContext = () => {
  const context = useContext(SidebarContext);
  return context;
};
