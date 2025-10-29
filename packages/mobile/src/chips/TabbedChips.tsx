import React, { forwardRef, memo, useCallback, useMemo, useState } from 'react';
import { ScrollView } from 'react-native';
import type { View } from 'react-native';
import { useTabsContext } from '@coinbase/cds-common/tabs/TabsContext';
import type { TabValue } from '@coinbase/cds-common/tabs/useTabs';

import { useHorizontalScrollToTarget } from '../hooks/useHorizontalScrollToTarget';
import { Box, OverflowGradient } from '../layout';
import { type TabNavigationBaseProps, Tabs } from '../tabs';

import { MediaChip } from './MediaChip';

const TabComponent = <T extends string = string>({ label = '', id, ...tabProps }: TabValue<T>) => {
  const { activeTab, updateActiveTab } = useTabsContext();
  const isActive = useMemo(() => activeTab?.id === id, [activeTab, id]);
  const handleClick = useCallback(() => updateActiveTab(id), [id, updateActiveTab]);
  return (
    <MediaChip
      accessibilityState={{ selected: isActive }}
      inverted={isActive}
      onPress={handleClick}
      {...tabProps}
    >
      {label}
    </MediaChip>
  );
};

const TabsActiveIndicatorComponent = () => {
  return null;
};

export type TabbedChipsBaseProps<T extends string = string> = Omit<
  TabNavigationBaseProps<T>,
  'variant'
>;

export type TabbedChipsProps<T extends string = string> = TabbedChipsBaseProps<T>;

type TabbedChipsFC = <T extends string = string>(
  props: TabbedChipsProps<T> & { ref?: React.ForwardedRef<View> },
) => React.ReactElement;

const TabbedChipsComponent = memo(
  forwardRef(function TabbedChips<T extends string = string>(
    {
      tabs,
      value = tabs[0].id,
      testID = 'tabbed-chips',
      onChange,
      Component = TabComponent,
      ...props
    }: TabbedChipsProps<T>,
    ref: React.ForwardedRef<View>,
  ) {
    const activeTab = useMemo(() => tabs.find((tab) => tab.id === value), [tabs, value]);
    const [scrollTarget, setScrollTarget] = useState<View | null>(null);
    const handleChange = useCallback(
      (tabValue: TabValue<T> | null) => {
        if (tabValue) onChange?.(tabValue.id);
      },
      [onChange],
    );

    const {
      scrollRef,
      isScrollContentOverflowing,
      isScrollContentOffscreenRight,
      handleScroll,
      handleScrollContainerLayout,
      handleScrollContentSizeChange,
    } = useHorizontalScrollToTarget({ activeTarget: scrollTarget });

    return (
      <Box
        ref={ref}
        overflow={
          isScrollContentOverflowing && isScrollContentOffscreenRight ? undefined : 'visible'
        }
        testID={testID}
        {...props}
      >
        <ScrollView
          ref={scrollRef}
          horizontal
          onContentSizeChange={handleScrollContentSizeChange}
          onLayout={handleScrollContainerLayout}
          onScroll={handleScroll}
          scrollEventThrottle={1}
          showsHorizontalScrollIndicator={false}
        >
          <Tabs
            TabComponent={Component}
            TabsActiveIndicatorComponent={TabsActiveIndicatorComponent}
            activeTab={activeTab || null}
            gap={1}
            onActiveTabElementChange={setScrollTarget}
            onChange={handleChange}
            tabs={tabs}
          />
        </ScrollView>
        {isScrollContentOverflowing && isScrollContentOffscreenRight ? <OverflowGradient /> : null}
      </Box>
    );
  }),
);

TabbedChipsComponent.displayName = 'TabbedChips';

export const TabbedChips = TabbedChipsComponent as TabbedChipsFC;
