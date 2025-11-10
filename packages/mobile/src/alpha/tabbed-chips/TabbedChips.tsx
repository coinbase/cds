import React, { forwardRef, memo, useCallback, useMemo, useState } from 'react';
import { ScrollView, type View } from 'react-native';
import type { SharedAccessibilityProps, SharedProps, ThemeVars } from '@coinbase/cds-common';
import { useTabsContext } from '@coinbase/cds-common/tabs/TabsContext';
import type { TabValue } from '@coinbase/cds-common/tabs/useTabs';

import type { ChipProps } from '../../chips/ChipProps';
import { MediaChip } from '../../chips/MediaChip';
import { useHorizontalScrollToTarget } from '../../hooks/useHorizontalScrollToTarget';
import { Box, OverflowGradient } from '../../layout';
import { Tabs, type TabsBaseProps, type TabsProps } from '../../tabs';

const DefaultTabComponent = <T extends string = string>({
  label = '',
  id,
  ...tabProps
}: TabbedChipProps<T>) => {
  const { activeTab, updateActiveTab } = useTabsContext();
  const isActive = useMemo(() => activeTab?.id === id, [activeTab, id]);
  const handlePress = useCallback(() => updateActiveTab(id), [id, updateActiveTab]);
  return (
    <MediaChip
      accessibilityState={{ selected: isActive }}
      invertColorScheme={isActive}
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
  TabsBaseProps<T>,
  | 'TabComponent'
  | 'TabsActiveIndicatorComponent'
  | 'tabs'
  | 'onActiveTabElementChange'
  | 'activeBackground'
> & {
  tabs: TabbedChipProps<T>[];
  TabComponent?: TabsProps<T>['TabComponent'];
  TabsActiveIndicatorComponent?: TabsProps<T>['TabsActiveIndicatorComponent'];
  gap?: ThemeVars.Space;
  width?: React.CSSProperties['width'];
};

export type TabbedChipsProps<T extends string = string> = TabbedChipsBaseProps<T> &
  SharedProps &
  SharedAccessibilityProps;

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
      width,
      gap = 1,
      ...accessibilityProps
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
        width={width}
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
            gap={gap}
            onActiveTabElementChange={setScrollTarget}
            onChange={onChange}
            tabs={tabs}
            {...accessibilityProps}
          />
        </ScrollView>
        {isScrollContentOverflowing && isScrollContentOffscreenRight ? <OverflowGradient /> : null}
      </Box>
    );
  }),
);

TabbedChipsComponent.displayName = 'TabbedChips';

export const TabbedChips = TabbedChipsComponent as TabbedChipsFC;
