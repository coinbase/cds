import { useCallback, useMemo } from 'react';

export type TabValue<TabId extends string = string> = {
  /** The tab id. */
  id: TabId;
  /** The tab label. */
  label?: React.ReactNode;
  /** Disable interactions on the tab. */
  disabled?: boolean;
};

export type TabsOptions<
  TabId extends string = string,
  TTab extends TabValue<TabId> = TabValue<TabId>,
> = {
  /** The array of tabs data. */
  tabs: TTab[];
  /** React state for the currently active tab. Setting it to `null` results in no active tab. */
  activeTab: TTab | null;
  /** Callback that is fired when the active tab changes. Use this callback to update the `activeTab` state. */
  onChange: (activeTab: TTab | null) => void;
  /** Disable interactions on all the tabs. */
  disabled?: boolean;
};

export type TabsApi<
  TabId extends string = string,
  TTab extends TabValue<TabId> = TabValue<TabId>,
> = Omit<TabsOptions<TabId, TTab>, 'onChange'> & {
  /** Update the currently active tab to the tab with `tabId`. */
  updateActiveTab: (tabId: TabId | null) => void;
  /** Update the currently active tab to the next enabled tab in the tabs array. Does nothing if the last tab is already active. */
  goNextTab: () => void;
  /** Update the currently active tab to the previous enabled tab in the tabs array. Does nothing if the first tab is already active. */
  goPreviousTab: () => void;
};

/** A controlled hook for managing tabs state, such as the currently active tab. */
export const useTabs = <TabId extends string, TTab extends TabValue<TabId> = TabValue<TabId>>({
  tabs,
  activeTab,
  disabled,
  onChange,
}: TabsOptions<TabId, TTab>): TabsApi<TabId, TTab> => {
  const updateActiveTab = useCallback(
    (tabId: TabId | null) => {
      let newActiveTab: TTab | null = null;
      if (typeof tabId === 'string' && tabId !== '') {
        newActiveTab = tabs.find((tab) => tab.id === tabId) ?? tabs[0];
      }
      if (newActiveTab !== activeTab) onChange(newActiveTab);
    },
    [activeTab, tabs, onChange],
  );

  const goNextTab = useCallback(() => {
    if (!activeTab || activeTab === tabs[tabs.length - 1]) return;
    const activeTabIndex = tabs.indexOf(activeTab);
    // Find next tab that isn't disabled
    for (let i = activeTabIndex + 1; i < tabs.length; i++) {
      if (!tabs[i].disabled) return onChange(tabs[i]);
    }
  }, [activeTab, onChange, tabs]);

  const goPreviousTab = useCallback(() => {
    if (!activeTab || activeTab === tabs[0]) return;
    const activeTabIndex = tabs.indexOf(activeTab);
    // Find previous tab that isn't disabled
    for (let i = activeTabIndex - 1; i > -1; i--) {
      if (!tabs[i].disabled) return onChange(tabs[i]);
    }
  }, [activeTab, onChange, tabs]);

  const api = useMemo(
    () => ({
      tabs,
      activeTab,
      disabled,
      updateActiveTab,
      goNextTab,
      goPreviousTab,
    }),
    [tabs, activeTab, disabled, updateActiveTab, goNextTab, goPreviousTab],
  );

  return api;
};
