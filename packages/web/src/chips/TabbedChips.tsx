import React, { forwardRef, memo, useCallback, useMemo, useRef, useState } from 'react';
import { useTabsContext } from '@coinbase/cds-common/tabs/TabsContext';
import type { TabValue } from '@coinbase/cds-common/tabs/useTabs';
import { css } from '@linaria/core';

import { useDimensions } from '../hooks/useDimensions';
import { type BoxBaseProps, HStack } from '../layout';
import { Paddle, type TabNavigationBaseProps, Tabs } from '../tabs';

import { Chip } from './Chip';

const scrollPadding = 5;

const scrollContainerCss = css`
  &::-webkit-scrollbar {
    display: none;
  }
  scrollbar-width: none;
`;

const TabComponent = <T extends string = string>({ label = '', id, ...tabProps }: TabValue<T>) => {
  const { activeTab, updateActiveTab } = useTabsContext();
  const isActive = useMemo(() => activeTab?.id === id, [activeTab, id]);
  const handleClick = useCallback(() => updateActiveTab(id), [id, updateActiveTab]);
  return (
    <Chip
      aria-selected={isActive}
      inverted={isActive}
      onClick={handleClick}
      role="tab"
      width="max-content"
      {...tabProps}
    >
      {label}
    </Chip>
  );
};

const TabsActiveIndicatorComponent = () => {
  return null;
};

export type TabbedChipsBaseProps<T extends string = string> = BoxBaseProps &
  Omit<TabNavigationBaseProps<T>, 'variant'>;

export type TabbedChipsProps<T extends string = string> = TabbedChipsBaseProps<T>;

type TabbedChipsFC = <T extends string = string>(
  props: TabbedChipsProps<T> & { ref?: React.ForwardedRef<HTMLElement> },
) => React.ReactElement;

const TabbedChipsComponent = memo(
  forwardRef(function TabbedChips<T extends string = string>(
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
    }: TabbedChipsProps<T>,
    ref: React.ForwardedRef<HTMLElement | null>,
  ) {
    const activeTab = useMemo(() => tabs.find((tab) => tab.id === value), [tabs, value]);
    const scrollRef = useRef<HTMLDivElement>(null);
    const end = Number(scrollRef.current?.scrollWidth) - Number(scrollRef.current?.offsetWidth);
    const canScrollRight = Number(scrollRef.current?.scrollLeft) < end;
    const [showLeftPaddle, setShowLeftPaddle] = useState(false);
    const [showRightPaddle, setShowRightPaddle] = useState(canScrollRight);
    const handleChange = useCallback(
      (tabValue: TabValue<T> | null) => {
        if (tabValue) onChange?.(tabValue.id);
      },
      [onChange],
    );

    const handleOnScroll = useCallback(() => {
      const scrollDistance = Number(scrollRef.current?.scrollLeft);
      const endTrigger = end - scrollPadding;
      const startTrigger = scrollPadding;

      // Hide/show the left paddle
      if (scrollDistance > startTrigger) setShowLeftPaddle(true);
      else if (scrollDistance <= startTrigger) setShowLeftPaddle(false);

      // Hide/show the right paddle
      if (scrollDistance < endTrigger) setShowRightPaddle(true);
      else if (scrollDistance >= endTrigger) setShowRightPaddle(false);
    }, [end]);

    if (canScrollRight && !showRightPaddle) {
      const scrollLeft = Number(scrollRef.current?.scrollLeft);
      const endTrigger = end - scrollPadding;
      if (scrollLeft < endTrigger) {
        setShowRightPaddle(true);
      }
    }

    const { observe } = useDimensions({ onResize: handleOnScroll });

    const handleScrollLeft = useCallback(() => {
      scrollRef?.current?.scrollTo({ left: 0, behavior: 'smooth' });
    }, [scrollRef]);
    const handleScrollRight = useCallback(() => {
      scrollRef?.current?.scrollTo({ left: end, behavior: 'smooth' });
    }, [end]);

    return (
      <HStack
        ref={observe}
        alignItems="center"
        position="relative"
        testID={testID}
        width={width}
        {...props}
      >
        <Paddle
          accessibilityLabel={previousArrowAccessibilityLabel}
          background={background}
          direction="left"
          onClick={handleScrollLeft}
          paddleStyle={paddleStyle}
          show={showLeftPaddle}
          variant="secondary"
        />
        <HStack
          ref={scrollRef}
          alignItems="center"
          className={scrollContainerCss}
          onScroll={handleOnScroll}
          // TODO: this overflow styling is necessary for the Paddle feature but cuts off child Chips' focus ring
          overflow="auto"
        >
          <Tabs
            ref={ref}
            TabComponent={Component}
            TabsActiveIndicatorComponent={TabsActiveIndicatorComponent}
            activeTab={activeTab || null}
            background={background}
            gap={gap}
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
          show={showRightPaddle}
          variant="secondary"
        />
      </HStack>
    );
  }),
);

TabbedChipsComponent.displayName = 'TabbedChips';

export const TabbedChips = TabbedChipsComponent as TabbedChipsFC;
