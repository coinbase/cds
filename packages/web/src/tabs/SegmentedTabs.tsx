import React, { forwardRef, memo } from 'react';

import { cx } from '../cx';
import type { StylesAndClassNames } from '../types';

import { SegmentedTab } from './SegmentedTab';
import { SegmentedTabsActiveIndicator } from './SegmentedTabsActiveIndicator';
import { Tabs, type TabsProps } from './Tabs';

/**
 * Static class names for SegmentedTabs component parts.
 * Use these selectors to target specific elements with CSS.
 */
export const segmentedTabsClassNames = {
  /** Root element */
  root: 'cds-SegmentedTabs',
  /** Tab element */
  tab: 'cds-SegmentedTabs-tab',
  /** Active indicator element */
  activeIndicator: 'cds-SegmentedTabs-activeIndicator',
} as const;

export type SegmentedTabsProps<TabId extends string = string> = Partial<
  Pick<TabsProps<TabId>, 'TabComponent' | 'TabsActiveIndicatorComponent'>
> &
  Omit<
    TabsProps<TabId>,
    'TabComponent' | 'TabsActiveIndicatorComponent' | 'classNames' | 'styles'
  > &
  StylesAndClassNames<typeof segmentedTabsClassNames>;

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
        className={cx(segmentedTabsClassNames.root, className, classNames?.root)}
        classNames={{
          tab: cx(segmentedTabsClassNames.tab, classNames?.tab),
          activeIndicator: cx(segmentedTabsClassNames.activeIndicator, classNames?.activeIndicator),
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
