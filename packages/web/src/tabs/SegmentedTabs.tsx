import React, { forwardRef, memo, useMemo } from 'react';

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
      /** Tab container element */
      tabContainer?: React.CSSProperties;
      /** Tab element */
      tab?: React.CSSProperties;
      /** Active indicator element */
      activeIndicator?: React.CSSProperties;
    };
    /** Custom class names for individual elements of the SegmentedTabs component */
    classNames?: {
      /** Root element */
      root?: string;
      /** Tab container element */
      tabContainer?: string;
      /** Tab element */
      tab?: string;
      /** Active indicator element */
      activeIndicator?: string;
    };
    /**
     * When true, each tab container grows equally to fill the available width,
     * distributing tabs with equal width across the full component.
     */
    equalWidth?: boolean;
  };

/** Applied to each TabContainer div when equalWidth is true */
const equalWidthTabContainerStyle: React.CSSProperties = { flex: 1 };
/** Applied to the tab button when equalWidth is true so it fills its container */
const equalWidthTabStyle: React.CSSProperties = { width: '100%' };

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
        equalWidth,
        style,
        styles,
        width,
        ...props
      } = mergedProps;

      const resolvedStyles = useMemo(() => {
        const baseStyles = {
          tab: styles?.tab,
          tabContainer: styles?.tabContainer,
          activeIndicator: styles?.activeIndicator,
        };
        if (!equalWidth) return baseStyles;
        return {
          ...baseStyles,
          tabContainer: styles?.tabContainer
            ? { ...equalWidthTabContainerStyle, ...styles.tabContainer }
            : equalWidthTabContainerStyle,
          tab: styles?.tab ? { ...equalWidthTabStyle, ...styles.tab } : equalWidthTabStyle,
        };
      }, [equalWidth, styles]);

      const resolvedWidth = width ?? (equalWidth ? '100%' : 'fit-content');

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
            tabContainer: classNames?.tabContainer,
            activeIndicator: classNames?.activeIndicator,
          }}
          role="tablist"
          style={styles?.root ? { ...style, ...styles.root } : style}
          styles={resolvedStyles}
          width={resolvedWidth}
          {...props}
        />
      );
    },
  ),
);

SegmentedTabsComponent.displayName = 'SegmentedTabs';

export const SegmentedTabs = SegmentedTabsComponent as SegmentedTabsFC;
