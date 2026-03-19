import React, { forwardRef, memo } from 'react';
import type { StyleProp, View, ViewStyle } from 'react-native';

import { useComponentConfig } from '../hooks/useComponentConfig';

import { SegmentedTab } from './SegmentedTab';
import { SegmentedTabsActiveIndicator } from './SegmentedTabsActiveIndicator';
import { Tabs, type TabsProps } from './Tabs';

export type SegmentedTabsBaseProps<TabId extends string = string> = Partial<
  Pick<TabsProps<TabId>, 'TabComponent' | 'TabsActiveIndicatorComponent'>
> &
  Omit<TabsProps<TabId>, 'TabComponent' | 'TabsActiveIndicatorComponent' | 'styles'> & {
    /** Custom styles for individual elements of the SegmentedTabs component */
    styles?: {
      /** Root container element */
      root?: StyleProp<ViewStyle>;
      /** Tab element */
      tab?: StyleProp<ViewStyle>;
      /** Active indicator element */
      activeIndicator?: StyleProp<ViewStyle>;
    };
  };

export type SegmentedTabsProps<TabId extends string = string> = SegmentedTabsBaseProps<TabId>;

type SegmentedTabsFC = <TabId extends string = string>(
  props: SegmentedTabsProps<TabId> & { ref?: React.ForwardedRef<View> },
) => React.ReactElement;

const SegmentedTabsComponent = memo(
  forwardRef(
    <TabId extends string>(_props: SegmentedTabsProps<TabId>, ref: React.ForwardedRef<View>) => {
      const mergedProps = useComponentConfig('SegmentedTabs', _props);
      const {
        TabComponent = SegmentedTab,
        TabsActiveIndicatorComponent = SegmentedTabsActiveIndicator,
        activeBackground = 'bgInverse',
        background = 'bgSecondary',
        borderRadius = 700,
        ...props
      } = mergedProps;
      return (
        <Tabs
          ref={ref}
          TabComponent={TabComponent}
          TabsActiveIndicatorComponent={TabsActiveIndicatorComponent}
          activeBackground={activeBackground}
          background={background}
          borderRadius={borderRadius}
          {...props}
        />
      );
    },
  ),
);

SegmentedTabsComponent.displayName = 'SegmentedTabs';

export const SegmentedTabs = SegmentedTabsComponent as SegmentedTabsFC;
