import React, { forwardRef, memo, useCallback, useMemo, useState } from 'react';
import type { ThemeVars } from '@coinbase/cds-common';
import { useTabsContext } from '@coinbase/cds-common/tabs/TabsContext';
import type { TabValue } from '@coinbase/cds-common/tabs/useTabs';
import { css } from '@linaria/core';

import type { ChipProps } from '../../chips/ChipProps';
import { MediaChip } from '../../chips/MediaChip';
import { useHorizontalScrollToTarget } from '../../hooks/useHorizontalScrollToTarget';
import { type BoxBaseProps, HStack } from '../../layout';
import { Paddle, Tabs, type TabsActiveIndicatorComponent, type TabsProps } from '../../tabs';

const scrollContainerCss = css`
  &::-webkit-scrollbar {
    display: none;
  }
  scrollbar-width: none;
`;

const DefaultTabComponent = <T extends string = string>({
  label = '',
  id,
  onClick,
  ...tabProps
}: TabbedChipProps<T>) => {
  const { activeTab, updateActiveTab } = useTabsContext();
  const isActive = useMemo(() => activeTab?.id === id, [activeTab, id]);
  const handleClick = useCallback(
    (event: React.MouseEvent<HTMLButtonElement>) => {
      event.preventDefault();
      onClick?.(event);
      updateActiveTab(id);
    },
    [id, onClick, updateActiveTab],
  );
  return (
    <MediaChip
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

const DefaultTabsActiveIndicatorComponent: TabsActiveIndicatorComponent = () => {
  return null;
};

export type TabbedChipProps<T extends string = string> = Omit<ChipProps, 'children' | 'onClick'> &
  TabValue<T> & {
    Component?: React.FC<Omit<ChipProps, 'children'> & TabValue<T>>;
    onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  };

export type TabbedChipsBaseProps<T extends string = string> = Omit<BoxBaseProps, 'background'> &
  Omit<TabsProps<T>, 'TabComponent' | 'TabsActiveIndicatorComponent' | 'tabs'> & {
    paddleStyle?: React.CSSProperties;
    previousArrowAccessibilityLabel?: string;
    nextArrowAccessibilityLabel?: string;
    background?: ThemeVars.Color;
    TabComponent?: TabsProps<T>['TabComponent'];
    TabsActiveIndicatorComponent?: TabsProps<T>['TabsActiveIndicatorComponent'];
    tabs: TabbedChipProps<T>[];
  };

export type TabbedChipsProps<T extends string = string> = TabbedChipsBaseProps<T>;

type TabbedChipsFC = <T extends string = string>(
  props: TabbedChipsProps<T> & { ref?: React.ForwardedRef<HTMLElement> },
) => React.ReactElement;

const TabbedChipsComponent = memo(
  forwardRef(function TabbedChips<T extends string = string>(
    {
      tabs,
      activeTab,
      onChange,
      TabComponent = DefaultTabComponent,
      paddleStyle,
      testID,
      background = 'bg',
      gap = 1,
      role,
      previousArrowAccessibilityLabel = 'Previous',
      nextArrowAccessibilityLabel = 'Next',
      width = '100%',
      TabsActiveIndicatorComponent = DefaultTabsActiveIndicatorComponent,
      ...props
    }: TabbedChipsProps<T>,
    ref: React.ForwardedRef<HTMLElement | null>,
  ) {
    const [scrollTarget, setScrollTarget] = useState<HTMLElement | null>(null);
    const { scrollRef, isScrollContentOffscreenLeft, isScrollContentOffscreenRight, handleScroll } =
      useHorizontalScrollToTarget({ activeTarget: scrollTarget, scrollPadding: 50 });

    const handleScrollLeft = useCallback(() => {
      scrollRef?.current?.scrollTo({ left: 0, behavior: 'smooth' });
    }, [scrollRef]);

    const handleScrollRight = useCallback(() => {
      if (!scrollRef.current) return;
      const maxScroll = scrollRef.current.scrollWidth - scrollRef.current.clientWidth;
      scrollRef.current.scrollTo({ left: maxScroll, behavior: 'smooth' });
    }, [scrollRef]);
    return (
      <HStack
        alignItems="center"
        overflow="hidden"
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
            TabComponent={TabComponent}
            TabsActiveIndicatorComponent={DefaultTabsActiveIndicatorComponent}
            activeTab={activeTab || null}
            background={background}
            gap={gap}
            onActiveTabElementChange={setScrollTarget}
            onChange={onChange}
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

export const TabbedChips = TabbedChipsComponent as TabbedChipsFC;
