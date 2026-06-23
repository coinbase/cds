import React, { forwardRef, memo, useCallback, useMemo, useState } from 'react';
import { ScrollView, type StyleProp, type View, type ViewStyle } from 'react-native';
import type { ThemeVars } from '@coinbase/cds-common/core/theme';
import { useTabsContext } from '@coinbase/cds-common/tabs/TabsContext';
import type { TabValue } from '@coinbase/cds-common/tabs/useTabs';
import type { SharedAccessibilityProps } from '@coinbase/cds-common/types/SharedAccessibilityProps';
import type { SharedProps } from '@coinbase/cds-common/types/SharedProps';

import type { ChipProps } from '../../chips/ChipProps';
import { MediaChip, type MediaChipBaseProps } from '../../chips/MediaChip';
import { useComponentConfig } from '../../hooks/useComponentConfig';
import { useHorizontalScrollToTarget } from '../../hooks/useHorizontalScrollToTarget';
import { Box, type BoxProps } from '../../layout/Box';
import { OverflowGradient } from '../../layout/OverflowGradient';
import { Tabs, type TabsBaseProps, type TabsProps } from '../../tabs/Tabs';

const DefaultTabComponent = <TabId extends string = string>({
  label = '',
  id,
  activeBackground,
  activeColor,
  color,
  ...tabProps
}: TabbedChipProps<TabId>) => {
  const { activeTab, updateActiveTab } = useTabsContext();
  const isActive = useMemo(() => activeTab?.id === id, [activeTab, id]);
  const handlePress = useCallback(() => updateActiveTab(id), [id, updateActiveTab]);
  return (
    <MediaChip
      accessibilityState={{ selected: isActive }}
      background={isActive && activeBackground ? activeBackground : undefined}
      color={isActive && activeColor ? activeColor : color}
      invertColorScheme={isActive && !activeBackground}
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

export type TabbedChipProps<TabId extends string = string> = Omit<
  ChipProps,
  'children' | 'onPress'
> &
  TabValue<TabId> & {
    Component?: React.FC<Omit<ChipProps, 'children'> & TabValue<TabId>>;
    /**
     * Custom background color applied to the chip when it is the active tab.
     * When set, takes precedence over the default `invertColorScheme` behavior.
     */
    activeBackground?: MediaChipBaseProps['background'];
    /**
     * Custom foreground color applied to the chip label when it is the active tab.
     */
    activeColor?: MediaChipBaseProps['color'];
  };

export type TabbedChipsBaseProps<TabId extends string = string> = Omit<
  TabsBaseProps<TabId>,
  | 'TabComponent'
  | 'TabsActiveIndicatorComponent'
  | 'tabs'
  | 'onActiveTabElementChange'
  | 'activeBackground'
  | 'activeColor'
> & {
  tabs: TabbedChipProps<TabId>[];
  TabComponent?: React.FC<TabbedChipProps<TabId>>;
  TabsActiveIndicatorComponent?: TabsProps<TabId>['TabsActiveIndicatorComponent'];
  /**
   * Turn on to use a compact Chip component for each tab.
   * @default false
   */
  compact?: boolean;
  /**
   * X position offset when auto-scrolling to active tab (to avoid active tab being covered by the overflow gradient on the left side, default: 30px)
   * @default 30
   */
  autoScrollOffset?: number;
};

export type TabbedChipsProps<TabId extends string = string> = TabbedChipsBaseProps<TabId> &
  SharedProps &
  SharedAccessibilityProps & {
    /**
     * The spacing between Tabs
     * @default 1
     */
    gap?: ThemeVars.Space;
    /**
     * The width of the scroll container, defaults to 100% of the parent container
     * If the tabs are wider than the width of the container, paddles will be shown to scroll the tabs.
     */
    width?: BoxProps['width'];
    styles?: {
      /** Root container element */
      root?: StyleProp<ViewStyle>;
      /** Tabs root element */
      tabs?: StyleProp<ViewStyle>;
    };
  };

type TabbedChipsFC = <TabId extends string = string>(
  props: TabbedChipsProps<TabId> & { ref?: React.ForwardedRef<View> },
) => React.ReactElement;

const TabbedChipsComponent = memo(
  forwardRef(function TabbedChips<TabId extends string = string>(
    _props: TabbedChipsProps<TabId>,
    ref: React.ForwardedRef<View>,
  ) {
    const mergedProps = useComponentConfig('TabbedChips', _props);
    const {
      tabs,
      activeTab = tabs[0],
      testID = 'tabbed-chips',
      TabComponent = DefaultTabComponent,
      onChange,
      width,
      gap = 1,
      compact,
      styles,
      autoScrollOffset = 30,
      ...accessibilityProps
    } = mergedProps;
    const [scrollTarget, setScrollTarget] = useState<View | null>(null);
    const {
      scrollRef,
      isScrollContentOverflowing,
      isScrollContentOffscreenLeft,
      isScrollContentOffscreenRight,
      handleScroll,
      handleScrollContainerLayout,
      handleScrollContentSizeChange,
    } = useHorizontalScrollToTarget({ activeTarget: scrollTarget, autoScrollOffset });

    const TabComponentWithCompact = useCallback(
      (props: TabValue<TabId>) => {
        return <TabComponent compact={compact} {...props} />;
      },
      [TabComponent, compact],
    );

    return (
      <Box
        ref={ref}
        overflow={isScrollContentOverflowing ? undefined : 'visible'}
        style={styles?.root}
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
            TabComponent={TabComponentWithCompact}
            TabsActiveIndicatorComponent={TabsActiveIndicatorComponent}
            activeTab={activeTab || null}
            gap={gap}
            onActiveTabElementChange={setScrollTarget}
            onChange={onChange}
            style={styles?.tabs}
            tabs={tabs}
            {...accessibilityProps}
          />
        </ScrollView>
        {isScrollContentOverflowing && isScrollContentOffscreenLeft && (
          <OverflowGradient pin="left" />
        )}
        {isScrollContentOverflowing && isScrollContentOffscreenRight && (
          <OverflowGradient pin="right" />
        )}
      </Box>
    );
  }),
);

TabbedChipsComponent.displayName = 'TabbedChips';

export const TabbedChips = TabbedChipsComponent as TabbedChipsFC;
