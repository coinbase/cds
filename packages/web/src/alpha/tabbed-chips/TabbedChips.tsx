import React, { forwardRef, memo, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import type { SharedAccessibilityProps, SharedProps, ThemeVars } from '@coinbase/cds-common';
import { useTabsContext } from '@coinbase/cds-common/tabs/TabsContext';
import type { TabValue } from '@coinbase/cds-common/tabs/useTabs';
import { css } from '@linaria/core';

import type { ChipProps } from '../../chips/ChipProps';
import { MediaChip } from '../../chips/MediaChip';
import { cx } from '../../cx';
import { useHorizontalScrollToTarget } from '../../hooks/useHorizontalScrollToTarget';
import { HStack, type HStackDefaultElement, type HStackProps } from '../../layout';
import {
  Paddle,
  Tabs,
  type TabsActiveIndicatorComponent,
  type TabsBaseProps,
  type TabsProps,
} from '../../tabs';

const containerCss = css`
  isolation: isolate;
`;

const scrollContainerCss = css`
  &::-webkit-scrollbar {
    display: none;
  }
  scrollbar-width: none;
`;

const DefaultTabComponent = <TabId extends string = string>({
  label = '',
  id,
  ...tabProps
}: TabbedChipProps<TabId>) => {
  const { activeTab, updateActiveTab } = useTabsContext();
  const isActive = useMemo(() => activeTab?.id === id, [activeTab, id]);
  const chipRef = useRef<HTMLButtonElement>(null);
  const handleClick = useCallback(
    (event: React.MouseEvent<HTMLButtonElement>) => {
      event.preventDefault();
      updateActiveTab(id);
    },
    [id, updateActiveTab],
  );

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
      invertColorScheme={isActive}
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

export type TabbedChipProps<TabId extends string = string> = Omit<
  ChipProps,
  'children' | 'onClick'
> &
  TabValue<TabId> & {
    Component?: React.FC<Omit<ChipProps, 'children'> & TabValue<TabId>>;
  };

export type TabbedChipsBaseProps<TabId extends string = string> = Omit<
  TabsBaseProps<TabId>,
  | 'TabComponent'
  | 'TabsActiveIndicatorComponent'
  | 'tabs'
  | 'onActiveTabElementChange'
  | 'activeBackground'
> & {
  TabComponent?: React.FC<TabbedChipProps<TabId>>;
  TabsActiveIndicatorComponent?: TabsProps<TabId>['TabsActiveIndicatorComponent'];
  tabs: TabbedChipProps<TabId>[];
  /**
   * Turn on to use a compact Chip component for each tab.
   * @default false
   */
  compact?: boolean;
  /**
   * X position offset when auto-scrolling to active tab (to avoid active tab being covered by the paddle on the left side, default: 50px)
   * @default 50
   */
  autoScrollOffset?: number;
};

export type TabbedChipsProps<TabId extends string = string> = TabbedChipsBaseProps<TabId> &
  SharedProps &
  SharedAccessibilityProps & {
    background?: ThemeVars.Color;
    previousArrowAccessibilityLabel?: string;
    nextArrowAccessibilityLabel?: string;
    /**
     * The spacing between Tabs
     * @default 1
     */
    gap?: HStackProps<HStackDefaultElement>['gap'];
    /**
     * The width of the scroll container, defaults to 100% of the parent container
     * If the tabs are wider than the width of the container, paddles will be shown to scroll the tabs.
     * @default 100%
     */
    width?: HStackProps<HStackDefaultElement>['width'];
    styles?: {
      /** Root container element */
      root?: React.CSSProperties;
      /** Scroll container element */
      scrollContainer?: React.CSSProperties;
      /** Paddle icon buttons */
      paddle?: React.CSSProperties;
      /** Tabs root element */
      tabs?: React.CSSProperties;
    };
    classNames?: {
      /** Root container element */
      root?: string;
      /** Scroll container element */
      scrollContainer?: string;
      /** Tabs root element */
      tabs?: string;
    };
  };

type TabbedChipsFC = <TabId extends string = string>(
  props: TabbedChipsProps<TabId> & { ref?: React.ForwardedRef<HTMLElement> },
) => React.ReactElement;

const TabbedChipsComponent = memo(
  forwardRef(function TabbedChips<TabId extends string = string>(
    {
      tabs,
      activeTab,
      onChange,
      TabComponent = DefaultTabComponent,
      testID,
      background = 'bg',
      gap = 1,
      previousArrowAccessibilityLabel = 'Previous',
      nextArrowAccessibilityLabel = 'Next',
      width = '100%',
      TabsActiveIndicatorComponent = DefaultTabsActiveIndicatorComponent,
      disabled,
      compact,
      styles,
      classNames,
      autoScrollOffset = 50,
      ...accessibilityProps
    }: TabbedChipsProps<TabId>,
    ref: React.ForwardedRef<HTMLElement | null>,
  ) {
    const [scrollTarget, setScrollTarget] = useState<HTMLElement | null>(null);
    const { scrollRef, isScrollContentOffscreenLeft, isScrollContentOffscreenRight, handleScroll } =
      useHorizontalScrollToTarget({ activeTarget: scrollTarget, autoScrollOffset });

    const handleScrollLeft = useCallback(() => {
      scrollRef?.current?.scrollTo({ left: 0, behavior: 'smooth' });
    }, [scrollRef]);

    const handleScrollRight = useCallback(() => {
      if (!scrollRef.current) return;
      const maxScroll = scrollRef.current.scrollWidth - scrollRef.current.clientWidth;
      scrollRef.current.scrollTo({ left: maxScroll, behavior: 'smooth' });
    }, [scrollRef]);

    const TabComponentWithCompact = useCallback(
      (props: TabValue<TabId>) => {
        return <TabComponent compact={compact} {...props} />;
      },
      [TabComponent, compact],
    );

    return (
      <HStack
        alignItems="center"
        className={cx(containerCss, classNames?.root)}
        position="relative"
        style={styles?.root}
        testID={testID}
        width={width}
      >
        <Paddle
          accessibilityLabel={previousArrowAccessibilityLabel}
          background={background}
          direction="left"
          onClick={handleScrollLeft}
          paddleStyle={styles?.paddle}
          show={isScrollContentOffscreenLeft}
          variant="secondary"
        />
        <HStack
          ref={scrollRef}
          alignItems="center"
          className={cx(scrollContainerCss, classNames?.scrollContainer)}
          onScroll={handleScroll}
          overflow="auto"
          style={styles?.scrollContainer}
        >
          <Tabs
            ref={ref}
            TabComponent={TabComponentWithCompact}
            TabsActiveIndicatorComponent={DefaultTabsActiveIndicatorComponent}
            activeTab={activeTab || null}
            background={background}
            className={classNames?.tabs}
            disabled={disabled}
            gap={gap}
            onActiveTabElementChange={setScrollTarget}
            onChange={onChange}
            style={styles?.tabs}
            tabs={tabs}
            {...accessibilityProps}
          />
        </HStack>
        <Paddle
          accessibilityLabel={nextArrowAccessibilityLabel}
          background={background}
          direction="right"
          onClick={handleScrollRight}
          paddleStyle={styles?.paddle}
          show={isScrollContentOffscreenRight}
          variant="secondary"
        />
      </HStack>
    );
  }),
);

TabbedChipsComponent.displayName = 'TabbedChips';

export const TabbedChips = TabbedChipsComponent as TabbedChipsFC;
