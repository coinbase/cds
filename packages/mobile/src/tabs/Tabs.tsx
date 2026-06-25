import React, { forwardRef, memo, useCallback, useImperativeHandle, useRef, useState } from 'react';
import { type StyleProp, View, type ViewStyle } from 'react-native';
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

import { useComponentConfig } from '../hooks/useComponentConfig';
import type { BoxBaseProps, BoxProps } from '../layout/Box';
import { Box } from '../layout/Box';
import type { HStackProps } from '../layout/HStack';
import { HStack } from '../layout/HStack';

import { DefaultTab } from './DefaultTab';
import { DefaultTabsActiveIndicator } from './DefaultTabsActiveIndicator';

const AnimatedBox = Animated.createAnimatedComponent(Box);

type TabContainerProps = {
  id: string;
  registerRef: (tabId: string, ref: View) => void;
  style?: StyleProp<ViewStyle>;
  children?: React.ReactNode;
};

const TabContainer = ({ id, registerRef, ...props }: TabContainerProps) => {
  const refCallback = useCallback(
    (ref: View | null) => {
      if (ref) registerRef(id, ref);
    },
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

export type TabComponentProps<
  TabId extends string = string,
  TTab extends TabValue<TabId> = TabValue<TabId>,
> = Omit<TTab, 'Component' | 'id'> & {
  id: TabId;
  /**
   * Color when a tab is inactive.
   */
  color?: ThemeVars.Color;
  /**
   * Color when a tab is active.
   */
  activeColor?: ThemeVars.Color;
  style?: StyleProp<ViewStyle>;
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
  Omit<TabsOptions<TabId, TTab>, 'tabs'> &
  Pick<TabComponentProps<TabId, TTab>, 'color' | 'activeColor'> & {
    /** The array of tabs data. Each tab may optionally define a custom Component to render. */
    tabs: (TTab & { Component?: TabComponent<TabId, TTab> })[];
    /** The default Component to render each tab. */
    TabComponent?: TabComponent<TabId, TTab>;
    /** The default Component to render the tabs active indicator. */
    TabsActiveIndicatorComponent?: TabsActiveIndicatorComponent;
    /** Background color passed to the TabsActiveIndicatorComponent. */
    activeBackground?: ThemeVars.Color;
    /** Optional callback to receive the active tab element. */
    onActiveTabElementChange?: (element: View | null) => void;
  };

export type TabsProps<
  TabId extends string = string,
  TTab extends TabValue<TabId> = TabValue<TabId>,
> = TabsBaseProps<TabId, TTab> &
  Omit<HStackProps, 'onChange'> & {
    /** Custom styles for individual elements of the Tabs component */
    styles?: {
      /** Root container element */
      root?: StyleProp<ViewStyle>;
      /** Container element wrapping each tab */
      tabContainer?: StyleProp<ViewStyle>;
      /** Tab element */
      tab?: StyleProp<ViewStyle>;
      /** Active indicator element */
      activeIndicator?: StyleProp<ViewStyle>;
    };
  };

type TabsFC = <TabId extends string = string, TTab extends TabValue<TabId> = TabValue<TabId>>(
  props: TabsProps<TabId, TTab> & { ref?: React.ForwardedRef<View> },
) => React.ReactElement;

const TabsComponent = memo(
  forwardRef(
    <TabId extends string, TTab extends TabValue<TabId> = TabValue<TabId>>(
      _props: TabsProps<TabId, TTab>,
      ref: React.ForwardedRef<View>,
    ) => {
      const mergedProps = useComponentConfig('Tabs', _props);
      const {
        tabs,
        TabComponent = DefaultTab,
        TabsActiveIndicatorComponent = DefaultTabsActiveIndicator,
        activeBackground,
        color,
        activeColor,
        activeTab,
        disabled,
        onChange,
        styles,
        style,
        role = 'tablist',
        position = 'relative',
        alignSelf = 'flex-start',
        opacity,
        onActiveTabElementChange,
        borderRadius,
        borderTopLeftRadius,
        borderTopRightRadius,
        borderBottomLeftRadius,
        borderBottomRightRadius,
        testID,
        ...props
      } = mergedProps;
      const tabsContainerRef = useRef<View>(null);
      useImperativeHandle(ref, () => tabsContainerRef.current as View, []); // merge internal ref to forwarded ref

      const refMap = useRefMap<View>();
      const api = useTabs<TabId, TTab>({ tabs, activeTab, disabled, onChange });

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
          borderBottomLeftRadius={borderBottomLeftRadius}
          borderBottomRightRadius={borderBottomRightRadius}
          borderRadius={borderRadius}
          borderTopLeftRadius={borderTopLeftRadius}
          borderTopRightRadius={borderTopRightRadius}
          color={color}
          onLayout={updateActiveTabRect}
          opacity={opacity ?? (disabled ? accessibleOpacityDisabled : 1)}
          position={position}
          role={role}
          style={styles?.root ? [style, styles.root] : style}
          testID={testID}
          {...props}
        >
          <TabsContext.Provider value={api as TabsApi<string>}>
            <TabsActiveIndicatorComponent
              activeTabRect={activeTabRect}
              background={activeBackground}
              borderBottomLeftRadius={borderBottomLeftRadius}
              borderBottomRightRadius={borderBottomRightRadius}
              borderRadius={borderRadius}
              borderTopLeftRadius={borderTopLeftRadius}
              borderTopRightRadius={borderTopRightRadius}
              style={styles?.activeIndicator}
              testID={testID ? `${testID}-active-indicator` : undefined}
            />
            {tabs.map((tabProps) => {
              const { id, Component: CustomTabComponent, ...tabRest } = tabProps;
              const RenderedTab = CustomTabComponent ?? TabComponent;
              const renderedTabProps = {
                activeColor,
                color,
                id,
                style: styles?.tab,
                ...tabRest,
              };
              return (
                <TabContainer
                  key={id}
                  id={id}
                  registerRef={registerRef}
                  style={styles?.tabContainer}
                >
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
  style,
  testID = 'tabs-active-indicator',
  ...props
}: TabsActiveIndicatorProps) => {
  const previousActiveTabRect = useRef(activeTabRect);
  const newActiveTabRect = { x: activeTabRect.x, y: activeTabRect.y, width: activeTabRect.width };
  const animatedTabRect = useSharedValue(newActiveTabRect);
  const isFirstRenderWithWidth =
    previousActiveTabRect.current.width === 0 && activeTabRect.width > 0;

  if (previousActiveTabRect.current !== activeTabRect) {
    previousActiveTabRect.current = activeTabRect;
    // TODO: writing to shared value during render causes a reanimated warning which we have to suppress in jest setup
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
      style={[animatedBoxStyle, style]}
      testID={testID}
      {...props}
    />
  );
};
