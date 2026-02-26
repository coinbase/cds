import React, { forwardRef, memo } from 'react';

import { cx } from '../cx';

import { SegmentedTab } from './SegmentedTab';
import { SegmentedTabsActiveIndicator } from './SegmentedTabsActiveIndicator';
import { Tabs, type TabsProps } from './Tabs';

export type SegmentedTabsProps<TabId extends string = string> = Partial<
  Pick<TabsProps<TabId>, 'TabComponent' | 'TabsActiveIndicatorComponent'>
> &
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
      {
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
      }: SegmentedTabsProps<TabId>,
      ref: React.ForwardedRef<HTMLElement>,
    ) => (
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
    ),
  ),
);

SegmentedTabsComponent.displayName = 'SegmentedTabs';

export const SegmentedTabs = SegmentedTabsComponent as SegmentedTabsFC;
