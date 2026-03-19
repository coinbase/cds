import { memo, useCallback, useState } from 'react';
import { useTabsContext } from '@coinbase/cds-common/tabs/TabsContext';
import type { TabValue } from '@coinbase/cds-common/tabs/useTabs';
import { Box } from '@coinbase/cds-web/layout/Box';
import { Pressable } from '@coinbase/cds-web/system/Pressable';
import {
  type TabComponentProps,
  Tabs,
  TabsActiveIndicator,
  type TabsActiveIndicatorProps,
} from '@coinbase/cds-web/tabs/Tabs';
import { Text } from '@coinbase/cds-web/typography/Text';

const tabs: TabValue[] = [
  { id: 'assets', label: 'Assets' },
  { id: 'activity', label: 'Activity' },
  { id: 'staking', label: 'Staking' },
];

const NavigationTab = memo(({ id, label }: TabComponentProps) => {
  const { activeTab, updateActiveTab } = useTabsContext();
  const isActive = activeTab?.id === id;
  const handlePress = useCallback(() => updateActiveTab(id), [id, updateActiveTab]);

  return (
    <Pressable background="transparent" onClick={handlePress}>
      <Box paddingY={2}>
        <Text color={isActive ? 'fgPrimary' : 'fg'} font="headline">
          {label}
        </Text>
      </Box>
    </Pressable>
  );
});

const NavigationIndicator = (props: TabsActiveIndicatorProps) => (
  <TabsActiveIndicator {...props} background="bgPrimary" bottom={0} height={2} />
);

export const TabsExample = memo(() => {
  const [activeTab, setActiveTab] = useState<TabValue | null>(tabs[0]);
  const onChange = useCallback((tab: TabValue | null) => setActiveTab(tab), []);

  return (
    <Tabs
      TabComponent={NavigationTab}
      TabsActiveIndicatorComponent={NavigationIndicator}
      activeTab={activeTab}
      gap={4}
      onChange={onChange}
      tabs={tabs}
    />
  );
});
