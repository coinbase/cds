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

import { Box, type BoxDefaultElement, type BoxProps } from '../layout/Box';
import { HStack, type HStackDefaultElement, type HStackProps } from '../layout/HStack';

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

export type TabComponentProps<T extends string = string> = TabValue<T> & {
  /** The tab index for the tab. Automatically set to manage focus behavior. */
  tabIndex?: number;
  /**
   * The role for the tab.
   * @default "tab"
   */
  role?: string;
};

export type TabComponent<T extends string = string> = React.FC<TabComponentProps<T>>;

export type TabsActiveIndicatorComponent = React.FC<TabsActiveIndicatorProps>;

export type TabsBaseProps<T extends string = string> = {
  /** The array of tabs data. Each tab may optionally define a custom Component to render. */
  tabs: (TabValue<T> & { Component?: TabComponent<T> })[];
  /** The default Component to render each tab. */
  TabComponent: TabComponent<T>;
  /** The default Component to render the tabs active indicator. */
  TabsActiveIndicatorComponent: TabsActiveIndicatorComponent;
  /** Background color passed to the TabsActiveIndicatorComponent. */
  activeBackground?: ThemeVars.Color;
  /** Optional callback to receive the active tab element. */
  onActiveTabElementChange?: (element: HTMLElement | null) => void;
} & Omit<TabsOptions<T>, 'tabs'>;

export type TabsProps<T extends string = string> = TabsBaseProps<T> &
  Omit<HStackProps<HStackDefaultElement>, 'onChange' | 'ref'>;

type TabsFC = <T extends string = string>(
  props: TabsProps<T> & { ref?: React.ForwardedRef<HTMLElement> },
) => React.ReactElement;

const TabsComponent = memo(
  forwardRef(
    <T extends string>(
      {
        tabs,
        TabComponent,
        TabsActiveIndicatorComponent,
        activeBackground,
        activeTab,
        onActiveTabElementChange,
        disabled,
        onChange,
        role = 'tablist',
        position = 'relative',
        width = 'fit-content',
        style,
        ...props
      }: TabsProps<T>,
      ref: React.ForwardedRef<HTMLElement>,
    ) => {
      const api = useTabs<T>({ tabs, activeTab, disabled, onChange });

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
          let focusedTabId: T | null = null;
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

      const containerStyle = useMemo(
        () => ({ opacity: disabled ? accessibleOpacityDisabled : 1, ...style }),
        [disabled, style],
      );

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
          onKeyDown={handleTabsContainerKeyDown}
          position={position}
          role={role}
          style={containerStyle}
          width={width}
          {...props}
        >
          <TabsContext.Provider value={api as TabsApi<string>}>
            <TabsActiveIndicatorComponent
              activeTabRect={activeTabRect}
              background={activeBackground}
            />
            {tabs.map(({ id, Component: CustomTabComponent, disabled: tabDisabled, ...props }) => {
              const RenderedTab = CustomTabComponent ?? TabComponent;
              return (
                <TabContainer key={id} id={id} registerRef={registerRef}>
                  <RenderedTab
                    data-rendered-tab
                    disabled={tabDisabled}
                    id={id}
                    role="tab"
                    tabIndex={activeTab?.id === id || !activeTab ? 0 : -1}
                    {...props}
                  />
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
  ...props
}: TabsActiveIndicatorProps) => {
  const { width, height, x } = activeTabRect;
  const activeAnimation = useMemo(() => ({ width, x }), [width, x]);
  if (!width) return null;
  return (
    <MotionBox
      animate={activeAnimation}
      data-testid="tabs-active-indicator"
      height={height}
      initial={false}
      left={0}
      position={position}
      role="none"
      transition={tabsTransitionConfig}
      {...props}
    />
  );
};
