import React, { forwardRef, memo, useCallback, useEffect, useMemo, useState } from 'react';
import { ScrollView, View } from 'react-native';
import type { ThemeVars } from '@coinbase/cds-common/core/theme';
import type { SharedAccessibilityProps, SharedProps } from '@coinbase/cds-common/types';
import { isDevelopment } from '@coinbase/cds-utils';

import type { DotCountBaseProps } from '../dots';
import { useHorizontallyScrollingPressables } from '../hooks/useHorizontallyScrollingPressables';
import { OverflowGradient } from '../layout';
import { Box, type BoxBaseProps } from '../layout/Box';
import { HStack } from '../layout/HStack';
import { VStack } from '../layout/VStack';
import { Pressable } from '../system/Pressable';

import { TabIndicator } from './TabIndicator';
import { TabLabel } from './TabLabel';

export type TabProps<T extends string | undefined = string> = SharedProps &
  Partial<Pick<DotCountBaseProps, 'max' | 'count'>> & {
    /** The id should be a meaningful and useful identifier like "watchlist" or "forSale" */
    id: T;
    /** Define a label for this Tab */
    label: React.ReactNode;
    /** See the Tabs TDD to understand which variant should be used.
     *  @default 'primary'
     */
    variant?: 'primary' | 'secondary';
    /** Disable interactions on the tab. */
    disabled?: boolean;
    /** Full length accessibility label when the child text is not descriptive enough. */
    accessibilityLabel?: string;
    /** Callback to fire when pressed */
    onPress?: (id: T) => void;
    /** Render a custom Component for the Tab */
    Component?: (props: CustomTabProps) => React.ReactNode;
  };

export type CustomTabProps = Pick<TabProps, 'id'> & {
  /**
   * @default false
   * When true, used to surface an active state for the currently selected tab
   */
  active?: boolean;
  /** Define a label for this Tab */
  label?: React.ReactNode;
};

export type TabNavigationBaseProps<T extends string | undefined = string> = BoxBaseProps &
  Pick<SharedAccessibilityProps, 'accessibilityLabel' | 'accessibilityLabelledBy'> &
  Pick<TabProps, 'variant' | 'Component'> & {
    /** The active tabId
     *  @default tabs[0].id
     */
    value?: T;
    /** Children should be TabLabels. If you only have one child, don't use tabs 🤪 */
    tabs: TabProps<T>[];
    /** Use the onChange handler to deal with any side effects, ie event tracking or showing a tooltip */
    onChange: ((tabId: T) => void) | React.Dispatch<React.SetStateAction<T>>;
    /** This should always match the background color of the parent container
     * @default: 'bg'
     */
    background?: ThemeVars.Color;
    /**
     * The spacing between Tabs
     * @default 4
     */
    gap?: ThemeVars.Space;
    /**
     * Used to generate a11y attributes for the Tabs
     * If TabNavigation is used to display options that will filter data, use `radiogroup`
     * If TabNavigation is used to display a list of pages or views, use `tablist`
     * @default tablist
     */
    role?: 'radiogroup' | 'tablist';
    /**
     * Web only. Accessibility label for the previous arrow paddle (skip to beginning).
     */
    previousArrowAccessibilityLabel?: string | undefined;
    /**
     * Web only. Accessibility label for the next arrow paddle (skip to end).
     */
    nextArrowAccessibilityLabel?: string | undefined;
    /**
     * Web only. Styling for the paddle icon buttons. Mobile does not have paddles.
     */
    paddleStyle?: React.CSSProperties;
    /** @danger This should only be used for accessibility purposes, eg: aria-controls https://accessibilityresources.org/aria-controls */
    id?: string;
  };

export type TabNavigationProps<T extends string | undefined = string> = TabNavigationBaseProps<T>;

type TabNavigationFC = <T extends string | undefined = string>(
  props: TabNavigationProps<T> & { ref?: React.ForwardedRef<View> },
) => React.ReactElement;

const TabNavigationComponent = memo(
  forwardRef<View, TabNavigationProps>(
    (
      {
        tabs,
        value = tabs[0].id,
        variant = 'primary',
        testID = 'tabNavigation',
        background = 'bg',
        onChange,
        Component,
        gap = 4,
        role = 'tablist',
        ...props
      },
      forwardedRef,
    ) => {
      const isPrimary = useMemo(() => variant === 'primary', [variant]);
      const [activeTabLayout, setActiveTabLayout] = useState({ width: 0, x: 0, y: 0, height: 0 });
      const {
        scrollRef,
        isScrollContentOverflowing,
        isScrollContentOffscreenRight,
        handleScroll,
        handleScrollContainerLayout,
        handleScrollContentSizeChange,
        getPressableLayoutHandler,
      } = useHorizontallyScrollingPressables(value, {
        setActivePressableLayout: setActiveTabLayout,
      });

      // TO DO: The `tab` role is not being announced correctly because of this RN issue https://github.com/facebook/react-native/issues/43266
      const descendantAriaRole = role === 'tablist' ? 'tab' : 'radio';

      const getTabPressHandler = useCallback(
        ({ id, onPress }: Pick<TabProps, 'id' | 'onPress'>) => {
          return function handleTabPress() {
            onChange(id);
            onPress?.(id); // handle callback
          };
        },
        [onChange],
      );

      useEffect(() => {
        if (isDevelopment() && variant === 'secondary') {
          console.warn(
            'Deprecation Warning: Secondary tabs are deprecated, please migrate to primary tabs. In the case of nested tabs, consider using TabbedChips',
          );
        }
      }, [variant]);

      // Iterate over the tabs and create Pressable TabLabels
      const tabLabels = useMemo(
        () =>
          tabs
            .filter(Boolean)
            .map(
              ({
                id,
                onPress,
                label,
                disabled,
                accessibilityLabel = label,
                count,
                max,
                testID: tabLabelTestID = `${testID}-tabLabel--${id}`,
                Component: TabComponent,
              }) => {
                const isActiveTab = id === value;
                const a11yLabelToString =
                  typeof accessibilityLabel === 'string' ? accessibilityLabel : undefined;
                const a11yState =
                  role === 'radiogroup' ? { checked: isActiveTab } : { selected: isActiveTab };

                const CustomTabComponent = TabComponent ?? Component;

                return (
                  <View key={id} onLayout={getPressableLayoutHandler(id)}>
                    <Pressable
                      transparentWhilePressed
                      accessibilityHint={a11yLabelToString}
                      accessibilityLabel={a11yLabelToString}
                      accessibilityRole={descendantAriaRole}
                      accessibilityState={a11yState}
                      background="transparent"
                      disabled={disabled}
                      onPress={getTabPressHandler({ id, onPress })}
                      testID={tabLabelTestID}
                    >
                      {CustomTabComponent ? (
                        <CustomTabComponent active={isActiveTab} id={id} label={label} />
                      ) : (
                        <TabLabel active={id === value} count={count} max={max} variant={variant}>
                          {label}
                        </TabLabel>
                      )}
                    </Pressable>
                  </View>
                );
              },
            ),
        [
          tabs,
          testID,
          value,
          role,
          Component,
          getPressableLayoutHandler,
          descendantAriaRole,
          getTabPressHandler,
          variant,
        ],
      );

      return (
        <Box
          ref={forwardedRef}
          background={background}
          overflow={
            isScrollContentOverflowing && isScrollContentOffscreenRight ? undefined : 'visible'
          }
          testID={testID}
          {...props}
        >
          <ScrollView
            ref={scrollRef}
            horizontal
            accessibilityRole={role}
            onContentSizeChange={handleScrollContentSizeChange}
            onLayout={handleScrollContainerLayout}
            onScroll={handleScroll}
            scrollEventThrottle={1}
            showsHorizontalScrollIndicator={false}
          >
            <VStack>
              <HStack gap={gap}>{tabLabels}</HStack>
              {isPrimary && (
                <TabIndicator
                  background={background}
                  width={activeTabLayout.width}
                  x={activeTabLayout.x}
                />
              )}
            </VStack>
          </ScrollView>
          {isScrollContentOverflowing && isScrollContentOffscreenRight ? (
            <OverflowGradient />
          ) : null}
        </Box>
      );
    },
  ),
);

/**
 * TabNavigation renders a horizontal, tab-based navigation bar.
 * This component has a opinionated default style, but allows for customization through custom Component props.
 * @deprecated Use `Tabs` instead.
 */
export const TabNavigation = TabNavigationComponent as TabNavigationFC;

TabNavigationComponent.displayName = 'TabNavigation';
