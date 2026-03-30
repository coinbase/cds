import React, { memo, useState } from 'react';

import { TabNavigation } from '../../../../tabs/TabNavigation';

import { tabNavigationTabs } from './constants';

export const TabsExample = memo(() => {
  const [value, setValue] = useState<string>(tabNavigationTabs[0].id);

  return (
    <TabNavigation onChange={setValue} tabs={tabNavigationTabs.map((tab) => ({ ...tab }))} value={value} />
  );
});
