import React, { memo, useMemo } from 'react';
import type { StyleProp, View, ViewStyle } from 'react-native';

import { useComponentConfig } from '../hooks/useComponentConfig';

import { SegmentedTab } from './SegmentedTab';
import { SegmentedTabsActiveIndicator } from './SegmentedTabsActiveIndicator';
import { Tabs, type TabsBaseProps, type TabsProps } from './Tabs';

const equalWidthTabContainerStyle: ViewStyle = { flex: 1 };
const equalWidthTabStyle: ViewStyle = { alignSelf: 'stretch' };

// We do Partial/Pick to allow TabComponent and TabsActiveIndicatorComponent to be optional
// We grab 'tabs' from the Omit allowing it to stay required

export type SegmentedTabsBaseProps<TabId extends string = string> = Partial<
  Pick<TabsBaseProps<TabId>, 'TabComponent' | 'TabsActiveIndicatorComponent'>
> &
  Omit<TabsBaseProps<TabId>, 'TabComponent' | 'TabsActiveIndicatorComponent' | 'styles'> & {
    /**
     * When true, each tab stretches to an equal share of the component width and the component
     * fills its parent. This is the correct way to achieve distributed tab layout — do NOT use
     * `justifyContent` for this, as it breaks the active indicator position calculation.
     * @default false
     */
    equalWidth?: boolean;
  };

export type SegmentedTabsProps<TabId extends string = string> = SegmentedTabsBaseProps<TabId> &
  Partial<Pick<TabsProps<TabId>, 'TabComponent' | 'TabsActiveIndicatorComponent'>> &
  Omit<TabsProps<TabId>, 'TabComponent' | 'TabsActiveIndicatorComponent' | 'styles'> & {
    /** Custom styles for individual elements of the SegmentedTabs component */
    styles?: {
      /** Root container element */
      root?: StyleProp<ViewStyle>;
      /** Wrapper View around each tab — use `{ flex: 1 }` for equal-width distribution */
      tabContainer?: StyleProp<ViewStyle>;
      /** Tab element */
      tab?: StyleProp<ViewStyle>;
      /** Active indicator element */
      activeIndicator?: StyleProp<ViewStyle>;
    };
  };

type SegmentedTabsFC = <TabId extends string = string>(
  props: SegmentedTabsProps<TabId> & { ref?: React.ForwardedRef<View> },
) => React.ReactElement;

const SegmentedTabsComponent = memo(
  <TabId extends string>({
    ref,
    ..._props
  }: SegmentedTabsProps<TabId> & {
    ref?: React.Ref<View>;
  }) => {
    const mergedProps = useComponentConfig('SegmentedTabs', _props);
    const {
      TabComponent = SegmentedTab,
      TabsActiveIndicatorComponent = SegmentedTabsActiveIndicator,
      activeBackground = 'bgInverse',
      background = 'bgSecondary',
      borderRadius = 700,
      equalWidth,
      alignSelf = equalWidth ? 'stretch' : undefined,
      styles,
      ...props
    } = mergedProps;

    const resolvedStyles = useMemo(() => {
      if (!equalWidth) return styles;
      return {
        ...styles,
        tabContainer: [equalWidthTabContainerStyle, styles?.tabContainer],
        tab: [equalWidthTabStyle, styles?.tab],
      };
    }, [equalWidth, styles]);

    return (
      <Tabs
        ref={ref}
        TabComponent={TabComponent}
        TabsActiveIndicatorComponent={TabsActiveIndicatorComponent}
        activeBackground={activeBackground}
        alignSelf={alignSelf}
        background={background}
        borderRadius={borderRadius}
        styles={resolvedStyles}
        {...props}
      />
    );
  },
);

SegmentedTabsComponent.displayName = 'SegmentedTabs';

export const SegmentedTabs = SegmentedTabsComponent as SegmentedTabsFC;
