import React, { forwardRef, memo, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useTabsContext } from '@coinbase/cds-common/tabs/TabsContext';
import type { TabValue } from '@coinbase/cds-common/tabs/useTabs';
import { css } from '@linaria/core';

import { useHorizontalScrollToTarget } from '../hooks/useHorizontalScrollToTarget';
import { type BoxBaseProps, HStack } from '../layout';
import { Paddle, type TabNavigationBaseProps, Tabs } from '../tabs';

import { MediaChip } from './MediaChip';

const scrollContainerCss = css`
  &::-webkit-scrollbar {
    display: none;
  }
  scrollbar-width: none;
`;

const TabComponent = <TabId extends string = string>({
  label = '',
  id,
  ...tabProps
}: TabValue<TabId>) => {
  const { activeTab, updateActiveTab } = useTabsContext();
  const isActive = useMemo(() => activeTab?.id === id, [activeTab, id]);
  const chipRef = useRef<HTMLButtonElement>(null);
  const handleClick = useCallback(() => updateActiveTab(id), [id, updateActiveTab]);

  // Keep focus on the newly active chip
  useEffect(() => {
    if (isActive && chipRef.current) {
      chipRef.current.focus();
    }
  }, [isActive]);

  return (
    <MediaChip
      ref={chipRef}
      aria-selected={isActive}
      inverted={isActive}
      onClick={handleClick}
      role="tab"
      width="max-content"
      {...tabProps}
    >
      {label}
    </MediaChip>
  );
};

const TabsActiveIndicatorComponent = () => {
  return null;
};

export type TabbedChipsBaseProps<TabId extends string = string> = BoxBaseProps &
  Omit<TabNavigationBaseProps<TabId>, 'variant'>;

export type TabbedChipsProps<TabId extends string = string> = TabbedChipsBaseProps<TabId>;

type TabbedChipsFC = <TabId extends string = string>(
  props: TabbedChipsProps<TabId> & { ref?: React.ForwardedRef<HTMLElement> },
) => React.ReactElement;

const TabbedChipsComponent = memo(
  forwardRef(function TabbedChips<TabId extends string = string>(
    {
      tabs,
      value,
      onChange,
      Component = TabComponent,
      paddleStyle,
      testID,
      background = 'bg',
      gap = 1,
      role,
      previousArrowAccessibilityLabel = 'Previous',
      nextArrowAccessibilityLabel = 'Next',
      width = '100%',
      ...props
    }: TabbedChipsProps<TabId>,
    ref: React.ForwardedRef<HTMLElement | null>,
  ) {
    const [scrollTarget, setScrollTarget] = useState<HTMLElement | null>(null);
    const { scrollRef, isScrollContentOffscreenLeft, isScrollContentOffscreenRight, handleScroll } =
      useHorizontalScrollToTarget({ activeTarget: scrollTarget, autoScrollOffset: 50 });
    const activeTab = useMemo(() => tabs.find((tab) => tab.id === value), [tabs, value]);

    const handleChange = useCallback(
      (tabValue: TabValue<TabId> | null) => {
        if (tabValue) onChange?.(tabValue.id);
      },
      [onChange],
    );

    const handleScrollLeft = useCallback(() => {
      scrollRef?.current?.scrollTo({ left: 0, behavior: 'smooth' });
    }, [scrollRef]);

    const handleScrollRight = useCallback(() => {
      if (!scrollRef.current) return;
      const maxScroll = scrollRef.current.scrollWidth - scrollRef.current.clientWidth;
      scrollRef.current.scrollTo({ left: maxScroll, behavior: 'smooth' });
    }, [scrollRef]);

    return (
      <HStack alignItems="center" position="relative" testID={testID} width={width} {...props}>
        <Paddle
          accessibilityLabel={previousArrowAccessibilityLabel}
          background={background}
          direction="left"
          onClick={handleScrollLeft}
          paddleStyle={paddleStyle}
          show={isScrollContentOffscreenLeft}
          variant="secondary"
        />
        <HStack
          ref={scrollRef}
          alignItems="center"
          className={scrollContainerCss}
          onScroll={handleScroll}
          overflow="auto"
        >
          <Tabs
            ref={ref}
            TabComponent={Component}
            TabsActiveIndicatorComponent={TabsActiveIndicatorComponent}
            activeTab={activeTab || null}
            background={background}
            gap={gap}
            onActiveTabElementChange={setScrollTarget}
            onChange={handleChange}
            role={role}
            tabs={tabs}
            {...props}
          />
        </HStack>
        <Paddle
          accessibilityLabel={nextArrowAccessibilityLabel}
          background={background}
          direction="right"
          onClick={handleScrollRight}
          paddleStyle={paddleStyle}
          show={isScrollContentOffscreenRight}
          variant="secondary"
        />
      </HStack>
    );
  }),
);

TabbedChipsComponent.displayName = 'TabbedChips';

/**
 * @deprecated Use `TabbedChips(Alpha)` instead.
 */
export const TabbedChips = TabbedChipsComponent as TabbedChipsFC;
