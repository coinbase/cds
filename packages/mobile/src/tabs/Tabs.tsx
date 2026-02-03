import React, { forwardRef, memo, useCallback, useImperativeHandle, useRef, useState } from 'react';
import { View } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  type WithSpringConfig,
} from 'react-native-reanimated';
import type { ThemeVars } from '@coinbase/cds-common/core/theme';
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

import type { BoxProps, HStackProps } from '../layout';
import { Box, HStack } from '../layout';

const AnimatedBox = Animated.createAnimatedComponent(Box);

type TabContainerProps = {
  id: string;
  registerRef: (tabId: string, ref: View) => void;
  children?: React.ReactNode;
};

const TabContainer = ({ id, registerRef, ...props }: TabContainerProps) => {
  const refCallback = useCallback(
    (ref: View | null) => ref && registerRef(id, ref),
    [id, registerRef],
  );
  return <View ref={refCallback} {...props} />;
};

export const tabsSpringConfig = {
  mass: 0.15,
  stiffness: 160,
  damping: 10,
  overshootClamping: true,
} as const satisfies WithSpringConfig;

export type TabsActiveIndicatorProps = {
  activeTabRect: Rect;
} & BoxProps;

export type TabComponent<TabId extends string = string> = React.FC<TabValue<TabId>>;

export type TabsActiveIndicatorComponent = React.FC<TabsActiveIndicatorProps>;

export type TabsBaseProps<TabId extends string = string> = {
  /** The array of tabs data. Each tab may optionally define a custom Component to render. */
  tabs: (TabValue<TabId> & { Component?: TabComponent<TabId> })[];
  /** The default Component to render each tab. */
  TabComponent: TabComponent<TabId>;
  /** The default Component to render the tabs active indicator. */
  TabsActiveIndicatorComponent: TabsActiveIndicatorComponent;
  /** Background color passed to the TabsActiveIndicatorComponent. */
  activeBackground?: ThemeVars.Color;
  /** Optional callback to receive the active tab element. */
  onActiveTabElementChange?: (element: View | null) => void;
} & Omit<TabsOptions<TabId>, 'tabs'>;

export type TabsProps<TabId extends string = string> = TabsBaseProps<TabId> &
  Omit<HStackProps, 'onChange'>;

type TabsFC = <TabId extends string = string>(
  props: TabsProps<TabId> & { ref?: React.ForwardedRef<View> },
) => React.ReactElement;

const TabsComponent = memo(
  forwardRef(
    <TabId extends string>(
      {
        tabs,
        TabComponent,
        TabsActiveIndicatorComponent,
        activeBackground,
        activeTab,
        disabled,
        onChange,
        role = 'tablist',
        position = 'relative',
        alignSelf = 'flex-start',
        opacity,
        onActiveTabElementChange,
        ...props
      }: TabsProps<TabId>,
      ref: React.ForwardedRef<View>,
    ) => {
      const tabsContainerRef = useRef<View>(null);
      useImperativeHandle(ref, () => tabsContainerRef.current as View, []); // merge internal ref to forwarded ref

      const refMap = useRefMap<View>();
      const api = useTabs<TabId>({ tabs, activeTab, disabled, onChange });

      const [activeTabRect, setActiveTabRect] = useState<Rect>(defaultRect);
      const previousActiveRef = useRef(activeTab);

      const updateActiveTabRect = useCallback(() => {
        const activeTabRef = activeTab ? refMap.getRef(activeTab.id) : null;
        if (!activeTabRef || !tabsContainerRef.current) return;
        activeTabRef.measureLayout(tabsContainerRef.current, (x, y, width, height) =>
          setActiveTabRect({ x, y, width, height }),
        );
      }, [activeTab, refMap]);

      const registerRef = useCallback(
        (tabId: string, ref: View) => {
          refMap.registerRef(tabId, ref);
          if (activeTab?.id === tabId) {
            onActiveTabElementChange?.(ref);
          }
        },
        [activeTab, onActiveTabElementChange, refMap],
      );

      if (previousActiveRef.current !== activeTab) {
        previousActiveRef.current = activeTab;
        updateActiveTabRect();
      }

      return (
        <HStack
          ref={tabsContainerRef}
          alignSelf={alignSelf}
          onLayout={updateActiveTabRect}
          opacity={opacity ?? (disabled ? accessibleOpacityDisabled : 1)}
          position={position}
          role={role}
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
                  <RenderedTab disabled={tabDisabled} id={id} {...props} />
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
  const previousActiveTabRect = useRef(activeTabRect);
  const newActiveTabRect = { x: activeTabRect.x, y: activeTabRect.y, width: activeTabRect.width };
  const animatedTabRect = useSharedValue(newActiveTabRect);
  const isFirstRenderWithWidth =
    previousActiveTabRect.current.width === 0 && activeTabRect.width > 0;

  if (previousActiveTabRect.current !== activeTabRect) {
    previousActiveTabRect.current = activeTabRect;
    animatedTabRect.value = isFirstRenderWithWidth
      ? newActiveTabRect
      : withSpring(newActiveTabRect, tabsSpringConfig);
  }

  const animatedBoxStyle = useAnimatedStyle(
    () => ({
      transform: [{ translateX: animatedTabRect.value.x }, { translateY: animatedTabRect.value.y }],
      width: animatedTabRect.value.width,
    }),
    [animatedTabRect],
  );

  return (
    <AnimatedBox
      animated
      height={activeTabRect.height}
      position={position}
      role="none"
      style={animatedBoxStyle}
      testID="tabs-active-indicator"
      {...props}
    />
  );
};
