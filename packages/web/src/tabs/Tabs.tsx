import React, { forwardRef, memo, useCallback, useMemo } from 'react';
import useMeasure from 'react-use-measure';
import type { ThemeVars } from '@coinbase/cds-common/core/theme';
import { useMergeRefs } from '@coinbase/cds-common/hooks/useMergeRefs';
import { useRefMap } from '@coinbase/cds-common/hooks/useRefMap';
import { TabsContext } from '@coinbase/cds-common/tabs/TabsContext';
import {
  type TabsApi,
  type TabsOptions,
  type TabValue,
  useTabs,
} from '@coinbase/cds-common/tabs/useTabs';
import { accessibleOpacityDisabled } from '@coinbase/cds-common/tokens/interactable';
import { defaultRect, type Rect } from '@coinbase/cds-common/types/Rect';
import { m as motion, type MotionProps, type Transition } from 'framer-motion';

import { cx } from '../cx';
import { useComponentConfig } from '../hooks/useComponentConfig';
import { Box, type BoxBaseProps, type BoxDefaultElement, type BoxProps } from '../layout/Box';
import { HStack, type HStackDefaultElement, type HStackProps } from '../layout/HStack';

import { DefaultTab } from './DefaultTab';
import { DefaultTabsActiveIndicator } from './DefaultTabsActiveIndicator';

const MotionBox = motion<BoxProps<BoxDefaultElement>>(Box);

type TabContainerProps = {
  id: string;
  registerRef: (tabId: string, ref: HTMLElement) => void;
  children?: React.ReactNode;
};

const TabContainer = ({ id, registerRef, ...props }: TabContainerProps) => {
  const refCallback = useCallback(
    (ref: HTMLElement | null) => ref && registerRef(id, ref),
    [id, registerRef],
  );
  return <div ref={refCallback} {...props} />;
};

export const tabsTransitionConfig = {
  type: 'spring',
  mass: 0.15,
  stiffness: 170,
  damping: 10,
  velocity: 5,
} as const satisfies Transition;

export type TabsActiveIndicatorProps = {
  activeTabRect: Rect;
} & BoxProps<BoxDefaultElement> &
  MotionProps;

export type TabComponentProps<
  TabId extends string = string,
  TTab extends TabValue<TabId> = TabValue<TabId>,
> = Omit<TTab, 'Component'> & {
  /** The tab index for the tab. Automatically set to manage focus behavior. */
  tabIndex?: number;
  /**
   * The role for the tab.
   * @default "tab"
   */
  role?: string;
  className?: string;
  style?: React.CSSProperties;
  'data-rendered-tab'?: boolean;
};

export type TabComponent<
  TabId extends string = string,
  TTab extends TabValue<TabId> = TabValue<TabId>,
> = React.FC<TabComponentProps<TabId, TTab>>;

export type TabsActiveIndicatorComponent = React.FC<TabsActiveIndicatorProps>;

export type TabsBaseProps<
  TabId extends string = string,
  TTab extends TabValue<TabId> = TabValue<TabId>,
> = Omit<BoxBaseProps, 'onChange'> &
  Omit<TabsOptions<TabId, TTab>, 'tabs'> & {
    /** The array of tabs data. Each tab may optionally define a custom Component to render. */
    tabs: (TTab & { Component?: TabComponent<TabId, TTab> })[];
    /** The default Component to render each tab. */
    TabComponent?: TabComponent<TabId, TTab>;
    /** The default Component to render the tabs active indicator. */
    TabsActiveIndicatorComponent?: TabsActiveIndicatorComponent;
    /** Background color passed to the TabsActiveIndicatorComponent. */
    activeBackground?: ThemeVars.Color;
    /** Optional callback to receive the active tab element. */
    onActiveTabElementChange?: (element: HTMLElement | null) => void;
  };

export type TabsProps<
  TabId extends string = string,
  TTab extends TabValue<TabId> = TabValue<TabId>,
> = TabsBaseProps<TabId, TTab> &
  Omit<HStackProps<HStackDefaultElement>, 'onChange' | 'ref'> & {
    /** Custom styles for individual elements of the Tabs component */
    styles?: {
      /** Root element */
      root?: React.CSSProperties;
      /** Tab element */
      tab?: React.CSSProperties;
      /** Active indicator element */
      activeIndicator?: React.CSSProperties;
    };
    /** Custom class names for individual elements of the Tabs component */
    classNames?: {
      /** Root element */
      root?: string;
      /** Tab element */
      tab?: string;
      /** Active indicator element */
      activeIndicator?: string;
    };
  };

type TabsFC = <TabId extends string = string, TTab extends TabValue<TabId> = TabValue<TabId>>(
  props: TabsProps<TabId, TTab> & { ref?: React.ForwardedRef<HTMLElement> },
) => React.ReactElement;

const TabsComponent = memo(
  forwardRef(
    <TabId extends string, TTab extends TabValue<TabId> = TabValue<TabId>>(
      _props: TabsProps<TabId, TTab>,
      ref: React.ForwardedRef<HTMLElement>,
    ) => {
      const mergedProps = useComponentConfig('Tabs', _props);
      const {
        tabs,
        TabComponent = DefaultTab,
        TabsActiveIndicatorComponent = DefaultTabsActiveIndicator,
        activeBackground,
        activeTab,
        onActiveTabElementChange,
        disabled,
        onChange,
        className,
        classNames,
        styles,
        role = 'tablist',
        position = 'relative',
        width = 'fit-content',
        borderRadius,
        borderTopLeftRadius,
        borderTopRightRadius,
        borderBottomLeftRadius,
        borderBottomRightRadius,
        style,
        testID,
        ...props
      } = mergedProps;
      const api = useTabs<TabId, TTab>({ tabs, activeTab, disabled, onChange });

      const [tabsContainerRef, tabsContainerRect] = useMeasure({
        debounce: 20,
      });

      const mergedContainerRefs = useMergeRefs(ref, tabsContainerRef);

      const refMap = useRefMap<HTMLElement>();

      const activeTabRect: Rect = useMemo(() => {
        const activeTabRef = activeTab ? refMap.getRef(activeTab.id) : null;
        if (!activeTabRef || !tabsContainerRect.width) return defaultRect;

        return {
          x: activeTabRef.offsetLeft,
          y: activeTabRef.offsetTop,
          width: activeTabRef.offsetWidth,
          height: activeTabRef.offsetHeight,
        };
      }, [activeTab, refMap, tabsContainerRect.width]);

      const handleTabsContainerKeyDown = useCallback(
        (event: React.KeyboardEvent<HTMLElement>) => {
          const keyEventsToHandle = ['ArrowRight', 'ArrowLeft', 'Home', 'End'];
          if (!keyEventsToHandle.includes(event.key)) return;

          const focusedElement = document.activeElement;
          if (!focusedElement) return;

          // Find the focused tab's index
          let focusedTabId: TabId | null = null;
          for (const tab of tabs) {
            const tabRef = refMap.getRef(tab.id);
            if (tabRef && tabRef.contains(focusedElement)) {
              focusedTabId = tab.id;
              break;
            }
          }
          if (!focusedTabId) return;

          const focusedTabIndex = tabs.findIndex((tab) => tab.id === focusedTabId);
          if (focusedTabIndex === -1) return;

          event.preventDefault();

          // For ArrowLeft and End key events, we need to iterate backwards so a for loop is used
          let targetTab;
          if (event.key === 'ArrowRight') {
            targetTab = tabs.slice(focusedTabIndex + 1).find((tab) => !tab.disabled);
          } else if (event.key === 'ArrowLeft') {
            targetTab = tabs
              .slice(0, focusedTabIndex)
              .reverse()
              .find((tab) => !tab.disabled);
          } else if (event.key === 'Home') {
            targetTab = tabs.find((tab) => !tab.disabled);
          } else if (event.key === 'End') {
            targetTab = tabs
              .slice(0)
              .reverse()
              .find((tab) => !tab.disabled);
          }

          if (targetTab) {
            const targetRef = refMap.getRef(targetTab.id);
            const focusableElement = targetRef?.querySelector<HTMLElement>(
              '[data-rendered-tab], [tabindex]:not([tabindex="-1"])',
            );
            focusableElement?.focus();
          }
        },
        [tabs, refMap],
      );

      const containerStyle = useMemo(() => ({ ...style, ...styles?.root }), [style, styles?.root]);

      const registerRef = useCallback(
        (tabId: string, ref: HTMLElement) => {
          refMap.registerRef(tabId, ref);
          if (activeTab?.id === tabId) {
            onActiveTabElementChange?.(ref);
          }
        },
        [activeTab, onActiveTabElementChange, refMap],
      );

      return (
        <HStack
          ref={mergedContainerRefs}
          borderBottomLeftRadius={borderBottomLeftRadius}
          borderBottomRightRadius={borderBottomRightRadius}
          borderRadius={borderRadius}
          borderTopLeftRadius={borderTopLeftRadius}
          borderTopRightRadius={borderTopRightRadius}
          className={cx(className, classNames?.root)}
          onKeyDown={handleTabsContainerKeyDown}
          opacity={disabled ? accessibleOpacityDisabled : 1}
          position={position}
          role={role}
          style={containerStyle}
          testID={testID}
          width={width}
          {...props}
        >
          <TabsContext.Provider value={api as TabsApi<string, TTab>}>
            <TabsActiveIndicatorComponent
              activeTabRect={activeTabRect}
              background={activeBackground}
              borderBottomLeftRadius={borderBottomLeftRadius}
              borderBottomRightRadius={borderBottomRightRadius}
              borderRadius={borderRadius}
              borderTopLeftRadius={borderTopLeftRadius}
              borderTopRightRadius={borderTopRightRadius}
              className={classNames?.activeIndicator}
              style={styles?.activeIndicator}
              testID={testID ? `${testID}-active-indicator` : undefined}
            />
            {tabs.map((props) => {
              const RenderedTab = props.Component ?? TabComponent;
              const renderedTabProps = {
                ...props,
                'data-rendered-tab': true,
                className: classNames?.tab,
                role: 'tab',
                style: styles?.tab,
                tabIndex: activeTab?.id === props.id || !activeTab ? 0 : -1,
              };
              return (
                <TabContainer key={props.id} id={props.id} registerRef={registerRef}>
                  <RenderedTab {...renderedTabProps} />
                </TabContainer>
              );
            })}
          </TabsContext.Provider>
        </HStack>
      );
    },
  ),
);

TabsComponent.displayName = 'Tabs';

export const Tabs = TabsComponent as TabsFC;

export const TabsActiveIndicator = ({
  activeTabRect,
  position = 'absolute',
  testID = 'tabs-active-indicator',
  ...props
}: TabsActiveIndicatorProps) => {
  const { width, height, x } = activeTabRect;
  const activeAnimation = useMemo(() => ({ width, x }), [width, x]);
  if (!width) return null;
  return (
    <MotionBox
      animate={activeAnimation}
      height={height}
      initial={false}
      left={0}
      position={position}
      role="none"
      testID={testID}
      transition={tabsTransitionConfig}
      {...props}
    />
  );
};
