import React from 'react';

import { TabsActiveIndicator, type TabsActiveIndicatorProps } from './Tabs';

export type SegmentedTabsActiveIndicatorProps = TabsActiveIndicatorProps;

export const SegmentedTabsActiveIndicator = ({
  borderRadius = 1000,
  ...props
}: SegmentedTabsActiveIndicatorProps) => {
  return <TabsActiveIndicator borderRadius={borderRadius} {...props} />;
};
