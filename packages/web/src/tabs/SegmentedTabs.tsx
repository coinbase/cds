import React, { forwardRef, memo } from 'react';

import { SegmentedTab } from './SegmentedTab';
import { SegmentedTabsActiveIndicator } from './SegmentedTabsActiveIndicator';
import { Tabs, type TabsProps } from './Tabs';

export type SegmentedTabsProps<T extends string = string> = Partial<
  Pick<TabsProps<T>, 'TabComponent' | 'TabsActiveIndicatorComponent'>
> &
  Omit<TabsProps<T>, 'TabComponent' | 'TabsActiveIndicatorComponent'>;

type SegmentedTabsFC = <T extends string>(
  props: SegmentedTabsProps<T> & { ref?: React.ForwardedRef<HTMLElement> },
) => React.ReactElement;

const SegmentedTabsComponent = memo(
  forwardRef(
    <T extends string>(
      {
        TabComponent = SegmentedTab,
        TabsActiveIndicatorComponent = SegmentedTabsActiveIndicator,
        activeBackground = 'bgInverse',
        background = 'bgSecondary',
        borderRadius = 1000,
        ...props
      }: SegmentedTabsProps<T>,
      ref: React.ForwardedRef<HTMLElement>,
    ) => (
      <Tabs
        ref={ref}
        TabComponent={TabComponent}
        TabsActiveIndicatorComponent={TabsActiveIndicatorComponent}
        activeBackground={activeBackground}
        background={background}
        borderRadius={borderRadius}
        role="tablist"
        {...props}
      />
    ),
  ),
);

SegmentedTabsComponent.displayName = 'SegmentedTabs';

export const SegmentedTabs = SegmentedTabsComponent as SegmentedTabsFC;
