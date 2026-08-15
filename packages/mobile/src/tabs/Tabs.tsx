import React, { memo, useCallback, useEffect, useImperativeHandle, useRef, useState } from 'react';
import { type LayoutChangeEvent, type StyleProp, View, type ViewStyle } from 'react-native';
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
  onLayout: (tabId: string, event: LayoutChangeEvent) => void;
  style?: StyleProp<ViewStyle>;
  children?: React.ReactNode;
};

const TabContainer = ({ id, registerRef, onLayout, ...props }: TabContainerProps) => {
  const refCallback = useCallback(
    (ref: View | null) => {
      if (ref) registerRef(id, ref);
    },
    [id, registerRef],
  );

  const handleLayout = useCallback(
    (event: LayoutChangeEvent) => {
      onLayout(id, event);
    },
    [id, onLayout],
  );

  return <View ref={refCallback} onLayout={handleLayout} {...props} />;
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
  <TabId extends string, TTab extends TabValue<TabId> = TabValue<TabId>>({
    ref,
    ..._props
  }: TabsProps<TabId, TTab> & {
    ref?: React.Ref<View>;
  }) => {
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
    const tabRects = useRef<Record<string, Rect>>({});
    const [prevActiveTabId, setPrevActiveTabId] = useState(activeTab?.id);

    const handleTabLayout = useCallback(
      (tabId: string, event: LayoutChangeEvent) => {
        const { x, y, width, height } = event.nativeEvent.layout;
        const nextRect = { x, y, width, height };
        tabRects.current[tabId] = nextRect;

        if (activeTab?.id === tabId) {
          setActiveTabRect(nextRect);
        }
      },
      [activeTab?.id],
    );

    if (activeTab?.id !== prevActiveTabId) {
      setPrevActiveTabId(activeTab?.id);
      if (activeTab?.id) {
        const cachedRect = tabRects.current[activeTab.id];
        if (cachedRect) {
          setActiveTabRect(cachedRect);
        }
      } else {
        setActiveTabRect(defaultRect);
      }
    }

    const registerRef = useCallback(
      (tabId: string, ref: View) => {
        refMap.registerRef(tabId, ref);
        if (activeTab?.id === tabId) {
          onActiveTabElementChange?.(ref);
        }
      },
      [activeTab?.id, onActiveTabElementChange, refMap],
    );

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
                onLayout={handleTabLayout}
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
  const animatedTabRect = useSharedValue({
    x: activeTabRect.x,
    y: activeTabRect.y,
    width: activeTabRect.width,
  });
  // Skip spring on first non-zero width or the indicator animates in from x:0/width:0.
  const isFirstRenderWithWidth = useRef(true);

  useEffect(() => {
    const nextActiveTabRect = {
      x: activeTabRect.x,
      y: activeTabRect.y,
      width: activeTabRect.width,
    };

    if (activeTabRect.width <= 0) return;

    if (isFirstRenderWithWidth.current) {
      animatedTabRect.value = nextActiveTabRect;
      isFirstRenderWithWidth.current = false;
    } else {
      animatedTabRect.value = withSpring(nextActiveTabRect, tabsSpringConfig);
    }
  }, [activeTabRect, animatedTabRect]);

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
