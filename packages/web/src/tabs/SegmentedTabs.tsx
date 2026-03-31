import React, { forwardRef, memo } from 'react';

import { cx } from '../cx';
import { useComponentConfig } from '../hooks/useComponentConfig';

import { SegmentedTab } from './SegmentedTab';
import { SegmentedTabsActiveIndicator } from './SegmentedTabsActiveIndicator';
import { Tabs, type TabsBaseProps, type TabsProps } from './Tabs';

export type SegmentedTabsBaseProps<TabId extends string = string> = Partial<
  Pick<TabsBaseProps<TabId>, 'TabComponent' | 'TabsActiveIndicatorComponent'>
> &
  Omit<
    TabsBaseProps<TabId>,
    'TabComponent' | 'TabsActiveIndicatorComponent' | 'styles' | 'classNames'
  >;

export type SegmentedTabsProps<TabId extends string = string> = SegmentedTabsBaseProps<TabId> &
  Partial<Pick<TabsProps<TabId>, 'TabComponent' | 'TabsActiveIndicatorComponent'>> &
  Omit<
    TabsProps<TabId>,
    'TabComponent' | 'TabsActiveIndicatorComponent' | 'styles' | 'classNames'
  > & {
    /** Custom styles for individual elements of the SegmentedTabs component */
    styles?: {
      /** Root element */
      root?: React.CSSProperties;
      /** Tab element */
      tab?: React.CSSProperties;
      /** Active indicator element */
      activeIndicator?: React.CSSProperties;
    };
    /** Custom class names for individual elements of the SegmentedTabs component */
    classNames?: {
      /** Root element */
      root?: string;
      /** Tab element */
      tab?: string;
      /** Active indicator element */
      activeIndicator?: string;
    };
  };

type SegmentedTabsFC = <TabId extends string>(
  props: SegmentedTabsProps<TabId> & { ref?: React.ForwardedRef<HTMLElement> },
) => React.ReactElement;

const SegmentedTabsComponent = memo(
  forwardRef(
    <TabId extends string>(
      _props: SegmentedTabsProps<TabId>,
      ref: React.ForwardedRef<HTMLElement>,
    ) => {
      const mergedProps = useComponentConfig('SegmentedTabs', _props);
      const {
        TabComponent = SegmentedTab,
        TabsActiveIndicatorComponent = SegmentedTabsActiveIndicator,
        activeBackground = 'bgInverse',
        background = 'bgSecondary',
        borderRadius = 700,
        className,
        classNames,
        style,
        styles,
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
          className={cx(className, classNames?.root)}
          classNames={{
            tab: classNames?.tab,
            activeIndicator: classNames?.activeIndicator,
          }}
          role="tablist"
          style={styles?.root ? { ...style, ...styles.root } : style}
          styles={{
            tab: styles?.tab,
            activeIndicator: styles?.activeIndicator,
          }}
          {...props}
        />
      );
    },
  ),
);

SegmentedTabsComponent.displayName = 'SegmentedTabs';

export const SegmentedTabs = SegmentedTabsComponent as SegmentedTabsFC;
