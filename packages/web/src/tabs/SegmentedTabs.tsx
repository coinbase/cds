import React, { forwardRef, memo, useMemo } from 'react';
import { css } from '@linaria/core';

import { cx } from '../cx';
import { useComponentConfig } from '../hooks/useComponentConfig';

import { SegmentedTab } from './SegmentedTab';
import { SegmentedTabsActiveIndicator } from './SegmentedTabsActiveIndicator';
import { Tabs, type TabsBaseProps, type TabsProps } from './Tabs';

const equalWidthTabContainerCss = css`
  flex: 1;
`;

const equalWidthTabCss = css`
  align-self: stretch;
`;

export type SegmentedTabsBaseProps<TabId extends string = string> = Partial<
  Pick<TabsBaseProps<TabId>, 'TabComponent' | 'TabsActiveIndicatorComponent'>
> &
  Omit<
    TabsBaseProps<TabId>,
    'TabComponent' | 'TabsActiveIndicatorComponent' | 'styles' | 'classNames'
  > & {
    /**
     * When true, each tab stretches to an equal share of the component width and the component
     * fills its parent. Also defaults `width` to `100%` (unless a `width` is explicitly provided),
     * since the component otherwise sizes to its content by default. This is the correct way to
     * achieve distributed tab layout — do NOT use `justifyContent` for this, as it breaks the
     * active indicator position calculation.
     * @default false
     */
    equalWidth?: boolean;
  };

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
      /** Container element wrapping each tab */
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
      /** Container element wrapping each tab */
      tabContainer?: string;
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
        equalWidth,
        alignSelf = equalWidth ? 'stretch' : undefined,
        width = equalWidth ? '100%' : undefined,
        className,
        classNames,
        style,
        styles,
        ...props
      } = mergedProps;

      const resolvedClassNames = useMemo(() => {
        if (!equalWidth) return classNames;
        return {
          ...classNames,
          tabContainer: cx(equalWidthTabContainerCss, classNames?.tabContainer),
          tab: cx(equalWidthTabCss, classNames?.tab),
        };
      }, [equalWidth, classNames]);

      return (
        <Tabs
          ref={ref}
          TabComponent={TabComponent}
          TabsActiveIndicatorComponent={TabsActiveIndicatorComponent}
          activeBackground={activeBackground}
          alignSelf={alignSelf}
          background={background}
          borderRadius={borderRadius}
          className={cx(className, classNames?.root)}
          classNames={{
            tabContainer: resolvedClassNames?.tabContainer,
            tab: resolvedClassNames?.tab,
            activeIndicator: classNames?.activeIndicator,
          }}
          role="tablist"
          style={styles?.root ? { ...style, ...styles.root } : style}
          styles={{
            tabContainer: styles?.tabContainer,
            tab: styles?.tab,
            activeIndicator: styles?.activeIndicator,
          }}
          width={width}
          {...props}
        />
      );
    },
  ),
);

SegmentedTabsComponent.displayName = 'SegmentedTabs';

export const SegmentedTabs = SegmentedTabsComponent as SegmentedTabsFC;
