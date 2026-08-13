import React, { memo, useCallback, useMemo } from 'react';
import type { StyleProp, View, ViewStyle } from 'react-native';
import type { ThemeVars } from '@coinbase/cds-common/core/theme';
import { useTabsContext } from '@coinbase/cds-common/tabs/TabsContext';
import type { TabValue } from '@coinbase/cds-common/tabs/useTabs';
import type { SharedAccessibilityProps } from '@coinbase/cds-common/types/SharedAccessibilityProps';
import type { SharedProps } from '@coinbase/cds-common/types/SharedProps';

import type { ChipProps, ChipSize } from '../../chips/ChipProps';
import { MediaChip, type MediaChipBaseProps } from '../../chips/MediaChip';
import { useComponentConfig } from '../../hooks/useComponentConfig';
import type { BoxProps } from '../../layout/Box';
import { Tabs, type TabsBaseProps, type TabsProps } from '../../tabs/Tabs';
import { TabsScrollArea, type TabsScrollAreaStyles } from '../../tabs/TabsScrollArea';

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

const DefaultTabsActiveIndicatorComponent = () => {
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
   * @deprecated Use `size="xs"` instead. This will be removed in a future major release.
   * @deprecationExpectedRemoval v10
   */
  compact?: boolean;
  /**
   * Set the size of each tab chip.
   * @default s
   */
  size?: ChipSize;
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
     * If the tabs are wider than the width of the container, overflow gradients are shown at the edges.
     */
    width?: BoxProps['width'];
    styles?: {
      /** Root container element */
      root?: StyleProp<ViewStyle>;
      /** Horizontal scroll region wrapping the tab row (aligned with {@link TabsScrollArea}). */
      scrollContainer?: StyleProp<ViewStyle>;
      /** Single overflow affordance (gradient); applied to both edges (aligned with {@link TabsScrollArea}). */
      overflowIndicator?: StyleProp<ViewStyle>;
      /** Tabs root element */
      tabs?: StyleProp<ViewStyle>;
    };
  };

type TabbedChipsFC = <TabId extends string = string>(
  props: TabbedChipsProps<TabId> & { ref?: React.ForwardedRef<View> },
) => React.ReactElement;

const TabbedChipsComponent = memo(function TabbedChips<TabId extends string = string>({
  ref,
  ..._props
}: TabbedChipsProps<TabId> & {
  ref?: React.Ref<View>;
}) {
  const mergedProps = useComponentConfig('TabbedChips', _props);
  const {
    tabs,
    activeTab = tabs[0],
    testID = 'tabbed-chips',
    TabComponent = DefaultTabComponent,
    TabsActiveIndicatorComponent = DefaultTabsActiveIndicatorComponent,
    onChange,
    width,
    gap = 1,
    compact,
    size,
    styles,
    autoScrollOffset = 30,
    ...accessibilityProps
  } = mergedProps;
  // Size is driven by `size`; deprecated `compact` falls back to its legacy `xs` size.
  const resolvedSize: ChipSize = size ?? (compact ? 'xs' : 's');

  const TabComponentWithSize = useCallback(
    (props: TabValue<TabId>) => {
      return <TabComponent size={resolvedSize} {...props} />;
    },
    [TabComponent, resolvedSize],
  );

  const tabsScrollAreaStyles: TabsScrollAreaStyles = useMemo(
    () => ({
      root: styles?.root,
      scrollContainer: styles?.scrollContainer,
      overflowIndicator: styles?.overflowIndicator,
    }),
    [styles],
  );

  return (
    <TabsScrollArea
      ref={ref}
      autoScrollOffset={autoScrollOffset}
      styles={tabsScrollAreaStyles}
      testID={testID}
      width={width}
    >
      {({ onActiveTabElementChange }) => (
        <Tabs
          TabComponent={TabComponentWithSize}
          TabsActiveIndicatorComponent={TabsActiveIndicatorComponent}
          activeTab={activeTab || null}
          gap={gap}
          onActiveTabElementChange={onActiveTabElementChange}
          onChange={onChange}
          style={styles?.tabs}
          tabs={tabs}
          {...accessibilityProps}
        />
      )}
    </TabsScrollArea>
  );
});

TabbedChipsComponent.displayName = 'TabbedChips';

export const TabbedChips = TabbedChipsComponent as TabbedChipsFC;
