import React, { useCallback } from 'react';
import { useTabsContext } from '@coinbase/cds-common/tabs/TabsContext';
import type { TabValue } from '@coinbase/cds-common/tabs/useTabs';
import { Box } from '@coinbase/cds-web/layout';
import type { TabsActiveIndicatorProps } from '@coinbase/cds-web/tabs';
import { TabsActiveIndicator } from '@coinbase/cds-web/tabs';
import type { TabsProps as CDSTabsProps } from '@coinbase/cds-web/tabs/Tabs';
import { Tabs as CDSTabs } from '@coinbase/cds-web/tabs/Tabs';
import { Text } from '@coinbase/cds-web/typography';

const CustomTab = ({ id, label }: TabValue) => {
  const { activeTab, updateActiveTab } = useTabsContext();
  const isActive = activeTab?.id === id;
  const handleClick = useCallback(() => updateActiveTab(id), [id, updateActiveTab]);

  return (
    <Box
      onClick={handleClick}
      paddingBottom={1}
      paddingX={1}
      style={{
        cursor: 'pointer',
        userSelect: 'none',
      }}
    >
      <Text color={isActive ? 'fgPrimary' : 'fg'} font="headline" textAlign="center">
        {label}
      </Text>
    </Box>
  );
};

const CustomTabsActiveIndicator = (props: TabsActiveIndicatorProps) => (
  <TabsActiveIndicator
    bottom={0}
    height={3}
    style={{ backgroundColor: 'var(--color-fgPrimary)' }}
    {...props}
  />
);

export const SheetTabs = (
  props: Omit<CDSTabsProps, 'TabComponent' | 'TabsActiveIndicatorComponent'>,
) => (
  <CDSTabs
    TabComponent={CustomTab}
    TabsActiveIndicatorComponent={CustomTabsActiveIndicator}
    {...props}
  />
);
