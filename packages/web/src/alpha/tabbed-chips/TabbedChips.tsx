import React, { forwardRef, memo, useCallback, useMemo, useState } from 'react';
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

const scrollContainerCss = css`
  &::-webkit-scrollbar {
    display: none;
  }
  scrollbar-width: none;
`;

const DefaultTabComponent = <T extends string = string>({
  label = '',
  id,
  ...tabProps
}: TabbedChipProps<T>) => {
  const { activeTab, updateActiveTab } = useTabsContext();
  const isActive = useMemo(() => activeTab?.id === id, [activeTab, id]);
  const handleClick = useCallback(
    (event: React.MouseEvent<HTMLButtonElement>) => {
      event.preventDefault();
      updateActiveTab(id);
    },
    [id, updateActiveTab],
  );
  return (
    <MediaChip
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

export type TabbedChipProps<T extends string = string> = Omit<ChipProps, 'children' | 'onClick'> &
  TabValue<T> & {
    Component?: React.FC<Omit<ChipProps, 'children'> & TabValue<T>>;
  };

export type TabbedChipsBaseProps<T extends string = string> = Omit<
  TabsBaseProps<T>,
  | 'TabComponent'
  | 'TabsActiveIndicatorComponent'
  | 'tabs'
  | 'onActiveTabElementChange'
  | 'activeBackground'
> & {
  TabComponent?: React.FC<TabbedChipProps<T>>;
  TabsActiveIndicatorComponent?: TabsProps<T>['TabsActiveIndicatorComponent'];
  tabs: TabbedChipProps<T>[];
  /**
   * Turn on to use a compact Chip component for each tab.
   * @default false
   */
  compact?: boolean;
};

export type TabbedChipsProps<T extends string = string> = TabbedChipsBaseProps<T> &
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
      /**
       * Style applied to the root container.
       */
      root?: React.CSSProperties;
      /**
       * Style applied to the scroll container.
       */
      scrollContainer?: React.CSSProperties;
      /**
       * Style applied to the paddle icon buttons.
       */
      paddle?: React.CSSProperties;
      /**
       * Style applied to the root of the Tabs component.
       */
      tabs?: React.CSSProperties;
    };
    classNames?: {
      /**
       * Class name applied to the root container.
       */
      root?: string;
      /**
       * Class name applied to the scroll container.
       */
      scrollContainer?: string;
      /**
       * Class name applied to the root of the Tabs component.
       */
      tabs?: string;
    };
  };

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
      ...accessibilityProps
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

    const TabComponentWithCompact = useCallback(
      (props: TabValue<T>) => {
        return <TabComponent compact={compact} {...props} />;
      },
      [TabComponent, compact],
    );

    return (
      <HStack
        alignItems="center"
        className={classNames?.root}
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
