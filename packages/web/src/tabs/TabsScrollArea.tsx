import React, { memo, useCallback, useMemo, useState } from 'react';
import type { SharedAccessibilityProps } from '@coinbase/cds-common/types/SharedAccessibilityProps';
import { css } from '@linaria/core';

import type { IconButtonSize } from '../buttons/IconButton';
import { cx } from '../cx';
import { useComponentConfig } from '../hooks/useComponentConfig';
import { useHorizontalScrollToTarget } from '../hooks/useHorizontalScrollToTarget';
import type { BoxBaseProps } from '../layout/Box';
import { HStack } from '../layout/HStack';
import type { StylesAndClassNames } from '../types';

import {
  TabsScrollAreaOverflowIndicator,
  type TabsScrollAreaOverflowIndicatorProps,
} from './TabsScrollAreaOverflowIndicator';

/**
 * Values passed to `TabsScrollArea`'s function child. Pass `onActiveTabElementChange` to `Tabs` as
 * `onActiveTabElementChange` so the scroll area can scroll the active tab into view.
 */
export type TabsScrollAreaRenderProps = {
  /**
   * Pass to `Tabs` as `onActiveTabElementChange={onActiveTabElementChange}`.
   */
  onActiveTabElementChange: (element: HTMLElement | null) => void;
};

/**
 * Static class names for TabsScrollArea component parts.
 * Use these selectors to target specific elements with CSS.
 */
export const tabsScrollAreaClassNames = {
  /** Root layout element */
  root: 'cds-TabsScrollArea',
  /** Horizontal scroll region wrapping `Tabs` */
  scrollContainer: 'cds-TabsScrollArea-scrollContainer',
  /** Applied to each overflow indicator's root */
  overflowIndicator: 'cds-TabsScrollArea-overflowIndicator',
  /** Applied to each overflow indicator's icon button */
  overflowIndicatorButton: 'cds-TabsScrollArea-overflowIndicatorButton',
  /** Applied to each overflow indicator's icon button container */
  overflowIndicatorButtonContainer: 'cds-TabsScrollArea-overflowIndicatorButtonContainer',
  /** Applied to each overflow indicator's gradient */
  overflowIndicatorGradient: 'cds-TabsScrollArea-overflowIndicatorGradient',
} as const;

export type TabsScrollAreaBaseProps = Omit<BoxBaseProps, 'children' | 'style'> &
  Pick<SharedAccessibilityProps, 'id' | 'accessibilityLabelId' | 'accessibilityDescriptionId'> & {
    previousArrowAccessibilityLabel?: string;
    nextArrowAccessibilityLabel?: string;
    /**
     * Horizontal offset when auto-scrolling to the active tab, so the active tab does not end up
     * underneath an overflow indicator.
     * @default 50
     */
    autoScrollOffset?: number;
    /**
     * Size of the overflow indicator buttons, so they can track the size of the content they scroll.
     * @default s
     */
    size?: IconButtonSize;
    /**
     * Painted on the root and passed to the OverflowIndicatorComponent, so overflow affordances
     * always blend into the surface behind the tab row.
     * @default bg
     */
    background?: BoxBaseProps['background'];
    /**
     * Component rendered at each end when content overflows (left / right). Defaults to
     * {@link TabsScrollAreaOverflowIndicator}. Props must extend {@link TabsScrollAreaOverflowIndicatorProps}.
     */
    OverflowIndicatorComponent?: React.FC<TabsScrollAreaOverflowIndicatorProps>;
  };

export type TabsScrollAreaProps = TabsScrollAreaBaseProps &
  StylesAndClassNames<typeof tabsScrollAreaClassNames> & {
    /**
     * Render function that receives `onActiveTabElementChange` (wire to `Tabs` as `onActiveTabElementChange`).
     */
    children: (props: TabsScrollAreaRenderProps) => React.ReactNode;
    /** Merged with the root `HStack`. */
    style?: React.CSSProperties;
    /** Merged with the root `HStack`. */
    className?: string;
  };

const containerCss = css`
  isolation: isolate;
`;

const scrollContainerCss = css`
  &::-webkit-scrollbar {
    display: none;
  }
  scrollbar-width: none;
`;

export const TabsScrollArea = memo(function TabsScrollArea(_props: TabsScrollAreaProps) {
  const mergedProps = useComponentConfig('TabsScrollArea', _props);
  const {
    children,
    position = 'relative',
    testID,
    width = '100%',
    background = 'bg',
    previousArrowAccessibilityLabel = 'Previous',
    nextArrowAccessibilityLabel = 'Next',
    autoScrollOffset = 50,
    size,
    OverflowIndicatorComponent = TabsScrollAreaOverflowIndicator,
    style,
    styles,
    className,
    classNames,
    ...props
  } = mergedProps;

  const [scrollTarget, setScrollTarget] = useState<HTMLElement | null>(null);
  const { scrollRef, isScrollContentOffscreenLeft, isScrollContentOffscreenRight, handleScroll } =
    useHorizontalScrollToTarget({ activeTarget: scrollTarget, autoScrollOffset });

  const handleScrollLeft = useCallback(() => {
    scrollRef.current?.scrollTo({ left: 0, behavior: 'smooth' });
  }, [scrollRef]);

  const handleScrollRight = useCallback(() => {
    if (!scrollRef.current) return;
    const maxScroll = scrollRef.current.scrollWidth - scrollRef.current.clientWidth;
    scrollRef.current.scrollTo({ left: maxScroll, behavior: 'smooth' });
  }, [scrollRef]);

  const renderedChildren = useMemo(() => {
    if (typeof children === 'function') {
      return children({ onActiveTabElementChange: setScrollTarget });
    }
    return children ?? null;
  }, [children]);

  const rootStyle = useMemo(() => ({ ...style, ...styles?.root }), [style, styles?.root]);

  const overflowIndicatorClassNames = useMemo(
    () => ({
      root: cx(tabsScrollAreaClassNames.overflowIndicator, classNames?.overflowIndicator),
      button: cx(
        tabsScrollAreaClassNames.overflowIndicatorButton,
        classNames?.overflowIndicatorButton,
      ),
      buttonContainer: cx(
        tabsScrollAreaClassNames.overflowIndicatorButtonContainer,
        classNames?.overflowIndicatorButtonContainer,
      ),
      gradient: cx(
        tabsScrollAreaClassNames.overflowIndicatorGradient,
        classNames?.overflowIndicatorGradient,
      ),
    }),
    [
      classNames?.overflowIndicator,
      classNames?.overflowIndicatorButton,
      classNames?.overflowIndicatorButtonContainer,
      classNames?.overflowIndicatorGradient,
    ],
  );

  const overflowIndicatorStyles = useMemo(
    () => ({
      root: styles?.overflowIndicator,
      button: styles?.overflowIndicatorButton,
      buttonContainer: styles?.overflowIndicatorButtonContainer,
      gradient: styles?.overflowIndicatorGradient,
    }),
    [
      styles?.overflowIndicator,
      styles?.overflowIndicatorButton,
      styles?.overflowIndicatorButtonContainer,
      styles?.overflowIndicatorGradient,
    ],
  );

  return (
    <HStack
      alignItems="center"
      background={background}
      className={cx(containerCss, tabsScrollAreaClassNames.root, className, classNames?.root)}
      position={position}
      style={rootStyle}
      testID={testID}
      width={width}
      {...props}
    >
      <OverflowIndicatorComponent
        accessibilityLabel={previousArrowAccessibilityLabel}
        background={background}
        classNames={overflowIndicatorClassNames}
        direction="left"
        onClick={handleScrollLeft}
        show={isScrollContentOffscreenLeft}
        size={size}
        styles={overflowIndicatorStyles}
      />
      <HStack
        ref={scrollRef}
        alignItems="center"
        className={cx(
          scrollContainerCss,
          tabsScrollAreaClassNames.scrollContainer,
          classNames?.scrollContainer,
        )}
        minWidth={0}
        onScroll={handleScroll}
        overflow="auto"
        style={styles?.scrollContainer}
      >
        {renderedChildren}
      </HStack>
      <OverflowIndicatorComponent
        accessibilityLabel={nextArrowAccessibilityLabel}
        background={background}
        classNames={overflowIndicatorClassNames}
        direction="right"
        onClick={handleScrollRight}
        show={isScrollContentOffscreenRight}
        size={size}
        styles={overflowIndicatorStyles}
      />
    </HStack>
  );
});

TabsScrollArea.displayName = 'TabsScrollArea';
