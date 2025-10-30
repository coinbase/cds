import React, { forwardRef, memo, useCallback, useMemo, useState } from 'react';
import { ScrollView } from 'react-native';
import type { View } from 'react-native';
import { useTabsContext } from '@coinbase/cds-common/tabs/TabsContext';
import type { TabValue } from '@coinbase/cds-common/tabs/useTabs';

import type { ChipProps } from '../../chips/ChipProps';
import { MediaChip } from '../../chips/MediaChip';
import { useHorizontalScrollToTarget } from '../../hooks/useHorizontalScrollToTarget';
import { Box, OverflowGradient } from '../../layout';
import { Tabs, type TabsProps } from '../../tabs';

const DefaultTabComponent = <T extends string = string>({
  label = '',
  id,
  ...tabProps
}: TabValue<T>) => {
  const { activeTab, updateActiveTab } = useTabsContext();
  const isActive = useMemo(() => activeTab?.id === id, [activeTab, id]);
  const handlePress = useCallback(() => updateActiveTab(id), [id, updateActiveTab]);
  return (
    <MediaChip
      accessibilityState={{ selected: isActive }}
      inverted={isActive}
      onPress={handlePress}
      {...tabProps}
    >
      {label}
    </MediaChip>
  );
};

const TabsActiveIndicatorComponent = () => {
  return null;
};

export type TabbedChipProps<T extends string = string> = Omit<ChipProps, 'children' | 'onPress'> &
  TabValue<T> & {
    Component?: React.FC<Omit<ChipProps, 'children'> & TabValue<T>>;
  };

export type TabbedChipsBaseProps<T extends string = string> = Omit<
  TabsProps<T>,
  'TabComponent' | 'TabsActiveIndicatorComponent' | 'tabs'
> & {
  tabs: TabbedChipProps<T>[];
  TabComponent?: TabsProps<T>['TabComponent'];
  TabsActiveIndicatorComponent?: TabsProps<T>['TabsActiveIndicatorComponent'];
};

export type TabbedChipsProps<T extends string = string> = TabbedChipsBaseProps<T>;

type TabbedChipsFC = <T extends string = string>(
  props: TabbedChipsProps<T> & { ref?: React.ForwardedRef<View> },
) => React.ReactElement;

const TabbedChipsComponent = memo(
  forwardRef(function TabbedChips<T extends string = string>(
    {
      tabs,
      activeTab = tabs[0],
      testID = 'tabbed-chips',
      TabComponent = DefaultTabComponent,
      onChange,
      ...props
    }: TabbedChipsProps<T>,
    ref: React.ForwardedRef<View>,
  ) {
    const [scrollTarget, setScrollTarget] = useState<View | null>(null);
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
            TabComponent={TabComponent}
            TabsActiveIndicatorComponent={TabsActiveIndicatorComponent}
            activeTab={activeTab || null}
            gap={1}
            onActiveTabElementChange={setScrollTarget}
            onChange={onChange}
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
