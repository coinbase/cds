import React, { memo, useMemo, useState } from 'react';
import { ScrollView } from 'react-native';
import type { StyleProp, View, ViewStyle } from 'react-native';
import type { SharedAccessibilityProps } from '@coinbase/cds-common/types/SharedAccessibilityProps';

import { useComponentConfig } from '../hooks/useComponentConfig';
import { useHorizontalScrollToTarget } from '../hooks/useHorizontalScrollToTarget';
import { Box, type BoxBaseProps } from '../layout/Box';

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
  onActiveTabElementChange: (element: View | null) => void;
};

export type TabsScrollAreaStyles = {
  /** Root layout element */
  root?: StyleProp<ViewStyle>;
  /** Horizontal `ScrollView` wrapping `Tabs` */
  scrollContainer?: StyleProp<ViewStyle>;
  /** Applied to the overflow indicator at each edge */
  overflowIndicator?: StyleProp<ViewStyle>;
};

export type TabsScrollAreaBaseProps = Omit<BoxBaseProps, 'children' | 'ref'> &
  SharedAccessibilityProps & {
    /**
     * Horizontal offset when auto-scrolling to the active tab (e.g. so the active tab is not under the overflow gradient).
     * @default 30
     */
    autoScrollOffset?: number;
    /**
     * Rendered at each end when content overflows. Defaults to {@link TabsScrollAreaOverflowIndicator}
     * ({@link OverflowGradient}). Props must extend {@link TabsScrollAreaOverflowIndicatorProps}.
     */
    OverflowIndicatorComponent?: React.FC<TabsScrollAreaOverflowIndicatorProps>;
  };

export type TabsScrollAreaProps = TabsScrollAreaBaseProps & {
  /**
   * Render function that receives `onActiveTabElementChange` (wire to `Tabs` as
   * `onActiveTabElementChange`).
   */
  children: (props: TabsScrollAreaRenderProps) => React.ReactNode;
  /** Custom style for the root element */
  style?: StyleProp<ViewStyle>;
  /** Custom styles for individual elements of the TabsScrollArea component */
  styles?: TabsScrollAreaStyles;
  ref?: React.Ref<View>;
};

export const TabsScrollArea = memo(function TabsScrollArea({
  ref,
  ..._props
}: TabsScrollAreaProps) {
  const mergedProps = useComponentConfig('TabsScrollArea', _props);
  const {
    children,
    testID,
    width,
    autoScrollOffset = 30,
    OverflowIndicatorComponent = TabsScrollAreaOverflowIndicator,
    style,
    styles: {
      root: rootStyle,
      scrollContainer: scrollContainerStyle,
      overflowIndicator: overflowIndicatorStyle,
    } = {},
    ...props
  } = mergedProps;

  const [scrollTarget, setScrollTarget] = useState<View | null>(null);
  const {
    scrollRef,
    isScrollContentOverflowing,
    isScrollContentOffscreenLeft,
    isScrollContentOffscreenRight,
    handleScroll,
    handleScrollContainerLayout,
    handleScrollContentSizeChange,
  } = useHorizontalScrollToTarget({ activeTarget: scrollTarget, autoScrollOffset });

  const rootStyles = useMemo(() => [style, rootStyle], [rootStyle, style]);

  const renderedChildren = useMemo(() => {
    if (typeof children === 'function') {
      return children({ onActiveTabElementChange: setScrollTarget });
    }
    return children ?? null;
  }, [children]);

  return (
    <Box
      ref={ref}
      // Let content (e.g. focus rings) paint outside the root while nothing is clipped by scrolling.
      overflow={isScrollContentOverflowing ? undefined : 'visible'}
      style={rootStyles}
      testID={testID}
      width={width}
      {...props}
    >
      <ScrollView
        ref={scrollRef}
        horizontal
        onContentSizeChange={handleScrollContentSizeChange}
        onLayout={handleScrollContainerLayout}
        onScroll={handleScroll}
        scrollEventThrottle={1}
        showsHorizontalScrollIndicator={false}
        style={scrollContainerStyle}
      >
        {renderedChildren}
      </ScrollView>
      <OverflowIndicatorComponent
        direction="left"
        show={isScrollContentOverflowing && isScrollContentOffscreenLeft}
        style={overflowIndicatorStyle}
      />
      <OverflowIndicatorComponent
        direction="right"
        show={isScrollContentOverflowing && isScrollContentOffscreenRight}
        style={overflowIndicatorStyle}
      />
    </Box>
  );
});

TabsScrollArea.displayName = 'TabsScrollArea';
