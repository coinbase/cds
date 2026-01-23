import React, {
  forwardRef,
  memo,
  useCallback,
  useContext,
  useImperativeHandle,
  useMemo,
  useRef,
  useState,
} from 'react';
import { type StyleProp, type TextStyle, View, type ViewStyle } from 'react-native';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import type { Rect, SharedAccessibilityProps, SharedProps } from '@coinbase/cds-common/types';
import { animated, useSpring } from '@react-spring/native';

import { useLayout } from '../hooks/useLayout';
import { Box, type BoxBaseProps, type BoxProps } from '../layout/Box';
import { HStack } from '../layout/HStack';
import { VStack } from '../layout/VStack';
import { Text } from '../typography/Text';

import { DefaultCarouselNavigation } from './DefaultCarouselNavigation';
import { DefaultCarouselPagination } from './DefaultCarouselPagination';

/**
 * Wraps a value within a range (min, max) for circular indexing.
 * @param min - The minimum value of the range.
 * @param max - The maximum value of the range (exclusive).
 * @param value - The value to wrap.
 * @returns The wrapped value within the range.
 */
const wrap = (min: number, max: number, value: number): number => {
  const range = max - min;
  return min + ((((value - min) % range) + range) % range);
};

export type CarouselItemRenderChildren = React.FC<{ isVisible: boolean }>;

export type CarouselItemBaseProps = Omit<BoxBaseProps, 'children'> &
  SharedAccessibilityProps & {
    /**
     * Unique identifier for this carousel item.
     */
    id: string;
    /**
     * Component to render as the carousel item content.
     * Can be a React node or a function that receives the visibility state.
     */
    children?: CarouselItemRenderChildren | React.ReactNode;
  };

export type CarouselItemProps = Omit<BoxProps, 'children'> & CarouselItemBaseProps;

export type CarouselItemComponent = React.FC<CarouselItemProps>;
export type CarouselItemElement = React.ReactElement<CarouselItemProps, CarouselItemComponent>;

export type CarouselContextValue = {
  registerItem: (id: string, state: Rect) => void;
  unregisterItem: (id: string) => void;
  /**
   * Set of item IDs that are currently visible in the carousel viewport.
   */
  visibleCarouselItems: Set<string>;
};

export const CarouselContext = React.createContext<CarouselContextValue | undefined>(undefined);

export const useCarouselContext = (): CarouselContextValue => {
  const context = useContext(CarouselContext);
  if (!context) {
    throw new Error('useCarouselContext must be used within a Carousel component');
  }
  return context;
};

export type CarouselNavigationComponentBaseProps = {
  /**
   * Callback for when the previous button is pressed.
   */
  onGoPrevious: () => void;
  /**
   * Callback for when the next button is pressed.
   */
  onGoNext: () => void;
  /**
   * Whether the previous button is disabled.
   */
  disableGoPrevious: boolean;
  /**
   * Whether the next button is disabled.
   */
  disableGoNext: boolean;
  /**
   * Accessibility label for the next page button.
   */
  nextPageAccessibilityLabel?: string;
  /**
   * Accessibility label for the previous page button.
   */
  previousPageAccessibilityLabel?: string;
};

export type CarouselNavigationComponentProps = CarouselNavigationComponentBaseProps & {
  /**
   * Custom styles for the component.
   */
  style?: StyleProp<ViewStyle>;
};

export type CarouselNavigationComponent = React.FC<CarouselNavigationComponentProps>;

export type CarouselPaginationComponentBaseProps = {
  /**
   * Total number of pages.
   */
  totalPages: number;
  /**
   * Index of the active page.
   */
  activePageIndex: number;
  /**
   * Callback for when a page is clicked.
   */
  onPressPage: (index: number) => void;
  /**
   * Accessibility label for the go to page button. You can optionally pass a function that will receive the pageIndex as an argument, and return an accessibility label string.
   */
  paginationAccessibilityLabel?: string | ((pageIndex: number) => string);
};

export type CarouselPaginationComponentProps = CarouselPaginationComponentBaseProps & {
  /**
   * Custom styles for the component.
   */
  style?: StyleProp<ViewStyle>;
};

export type CarouselPaginationComponent = React.FC<CarouselPaginationComponentProps>;

export type CarouselImperativeHandle = {
  /**
   * The currently active page index.
   */
  activePageIndex: number;
  /**
   * The total number of pages.
   */
  totalPages: number;
  /**
   * Navigate to a specific page by index.
   */
  goToPage: (pageIndex: number) => void;
};

export type CarouselBaseProps = SharedProps &
  SharedAccessibilityProps &
  BoxBaseProps & {
    /**
     * Children are required to be CarouselItems because we calculate
     * their offset relative to the parent container.
     */
    children?: CarouselItemElement | CarouselItemElement[];
    /**
     * Defines the drag interaction behavior for the carousel.
     * 'none' disables dragging completely.
     * 'free' enables free-form dragging with natural deceleration when released.
     * 'snap' enables dragging with automatic snapping to targets when released,
     * defined by snapMode.
     * @default 'snap'
     */
    drag?: 'none' | 'free' | 'snap';
    /**
     * Specifies the pagination and navigation strategy for the carousel.
     * 'item' treats each item as a separate page for navigation, pagination, and snapping.
     * 'page' groups items into pages based on visible area for navigation, pagination, and snapping.
     * This affects page calculation, navigation button behavior, and snap targets when dragging.
     * @default 'page'
     */
    snapMode?: 'item' | 'page';
    /**
     * Hides the navigation arrows (previous/next buttons).
     */
    hideNavigation?: boolean;
    /**
     * Hides the pagination indicators (dots/bars showing current page).
     */
    hidePagination?: boolean;
    /**
     * Custom component to render navigation arrows.
     * @default DefaultCarouselNavigation
     */
    NavigationComponent?: CarouselNavigationComponent;
    /**
     * Custom component to render pagination indicators.
     * @default DefaultCarouselPagination
     */
    PaginationComponent?: CarouselPaginationComponent;
    /**
     * Title to display above the carousel.
     * When a string is provided, it will be rendered with default title styling.
     * When a React element is provided, it completely replaces the default title component
     * and styling.
     */
    title?: React.ReactNode;
    /**
     * Accessibility label for the next page button.
     */
    nextPageAccessibilityLabel?: string;
    /**
     * Accessibility label for the previous page button.
     */
    previousPageAccessibilityLabel?: string;
    /**
     * Accessibility label for the go to page button.
     */
    goToPageAccessibilityLabel?: string;
    /**
     * Accessibility label for the go to page button.
     */
    paginationAccessibilityLabel?: string | ((pageIndex: number) => string);
    /**
     * Callback fired when the page changes.
     */
    onChangePage?: (activePageIndex: number) => void;
    /**
     * Callback fired when the user starts dragging the carousel.
     */
    onDragStart?: () => void;
    /**
     * Callback fired when the user ends dragging the carousel.
     */
    onDragEnd?: () => void;
    /**
     * Enables infinite looping. When true, the carousel will seamlessly
     * loop from the last item back to the first.
     * @note Requires at least 2 pages worth of content to function.
     */
    loop?: boolean;
  };

export type CarouselProps = CarouselBaseProps & {
  /**
   * Custom styles for the root element.
   */
  style?: StyleProp<ViewStyle>;
  /**
   * Custom styles for the component.
   */
  styles?: {
    /**
     * Custom styles for the root element.
     */
    root?: StyleProp<ViewStyle>;
    /**
     * Custom styles for the title element.
     */
    title?: StyleProp<TextStyle>;
    /**
     * Custom styles for the navigation element.
     */
    navigation?: StyleProp<ViewStyle>;
    /**
     * Custom styles for the pagination element.
     */
    pagination?: StyleProp<ViewStyle>;
    /**
     * Custom styles for the main carousel element.
     */
    carousel?: StyleProp<ViewStyle>;
    /**
     * Custom styles for the outer carousel container element.
     */
    carouselContainer?: StyleProp<ViewStyle>;
  };
};

/**
 * Calculates the locations of each item in the carousel, offset from the first item.
 * @param itemRects - The items to get the offsets for.
 * @returns The item offsets.
 */
const getItemOffsets = (itemRects: { [itemId: string]: Rect }) => {
  const sortedItems = Object.values(itemRects).sort((a, b) => a.x - b.x);
  const initialItemOffset = sortedItems[0].x;
  return sortedItems.map((item) => ({
    ...item,
    x: item.x - initialItemOffset,
  }));
};

/**
 * Calculates the nearest page index from a given scroll offset.
 * @param scrollOffset - The scroll offset.
 * @param pageOffsets - The page offsets.
 * @returns The nearest page index.
 */
const getNearestPageIndexFromOffset = (scrollOffset: number, pageOffsets: number[]) => {
  let closestPageIndex = 0;
  let closestDistance = Infinity;
  pageOffsets.forEach((pageOffset, index) => {
    const distance = Math.abs(scrollOffset - pageOffset);
    if (distance < closestDistance) {
      closestDistance = distance;
      closestPageIndex = index;
    }
  });
  return closestPageIndex;
};

/**
 * Calculates the offsets for a given set of items grouped by item.
 * @param items - The items to get the page offsets for.
 * @param containerWidth - The width of the container.
 * @param maxScrollOffset - The maximum scroll offset.
 * @param loop - Whether looping is enabled.
 * @returns The page offsets and the total number of pages.
 */
const getSnapItemPageOffsets = (
  items: Rect[],
  containerWidth: number,
  maxScrollOffset: number,
  loop?: boolean,
): { totalPages: number; pageOffsets: number[] } => {
  if (loop) {
    // When looping, all items become snap targets
    const offsets: number[] = [];
    for (let i = 0; i < items.length; i++) {
      offsets.push(items[i].x);
    }
    return { totalPages: offsets.length, pageOffsets: offsets };
  }

  // Non-looping behavior (original logic)
  let lastPageStartIndex = items.length - 1;
  const lastItem = items[lastPageStartIndex];
  const lastItemsEndPosition = lastItem.x + lastItem.width;

  // Find the last item that can start a page and still show all remaining items
  let i = lastPageStartIndex;
  let viewportEndIfStartingAtThisItem = lastItem.x + containerWidth;
  while (i >= 0 && viewportEndIfStartingAtThisItem >= lastItemsEndPosition) {
    lastPageStartIndex = i;
    i--;
    if (i >= 0) {
      viewportEndIfStartingAtThisItem = items[i].x + containerWidth;
    }
  }

  // Create pages - each item before lastPageStartIndex gets its own page
  const offsets: number[] = [];

  for (let i = 0; i < lastPageStartIndex; i++) {
    const item = items[i];
    const offset = Math.min(item.x, maxScrollOffset);
    offsets.push(offset);
  }

  // Add the final page that shows all remaining items
  const lastPageItem = items[lastPageStartIndex];
  const lastPageOffset = Math.min(lastPageItem.x, maxScrollOffset);
  offsets.push(lastPageOffset);

  return { totalPages: offsets.length, pageOffsets: offsets };
};

/**
 * Calculates the offsets for a given set of items grouped by page.
 * @param items - The items to get the page offsets for.
 * @param containerWidth - The width of the container.
 * @param maxScrollOffset - The maximum scroll offset.
 * @returns The page offsets and the total number of pages.
 */
const getSnapPageOffsets = (
  items: Rect[],
  containerWidth: number,
  maxScrollOffset: number,
): { totalPages: number; pageOffsets: number[] } => {
  // Find natural page breaks based on what fits in viewport
  const offsets = [0];

  for (let i = 0; i < items.length; i++) {
    const item = items[i];

    // Calculate the current viewport boundaries based on the last page offset
    const currentViewportStart = offsets[offsets.length - 1];
    const currentViewportEnd = currentViewportStart + containerWidth;

    // If this item extends beyond current viewport, we need a new page
    if (item.x + item.width > currentViewportEnd && item.x !== currentViewportStart) {
      /**
       * Clamp it to the max scroll offset in cases where the start of the item
       * is greater than the max we would need to scroll to show all items.
       */
      const clampedOffset = Math.min(item.x, maxScrollOffset);
      offsets.push(clampedOffset);
    }
  }

  return { totalPages: offsets.length, pageOffsets: offsets };
};

/**
 * Clamps an offset value with elastic resistance.
 * @param offset - The offset to clamp.
 * @param maxScrollOffset - The maximum offset.
 * @param elasticAmount - The amount of elastic resistance to apply (0 - 1), defaults to 0.5.
 * @returns The clamped offset.
 */
const clampWithElasticResistance = (
  offset: number,
  maxScrollOffset: number,
  elasticAmount = 0.5,
): number => {
  if (offset < 0) {
    return offset * elasticAmount;
  } else if (offset > maxScrollOffset) {
    const overScroll = offset - maxScrollOffset;
    return maxScrollOffset + overScroll * elasticAmount;
  }
  return offset;
};

/**
 * Calculates how many items need to be cloned for looping to fill the viewport.
 * @param items - The item rects sorted by position.
 * @param containerWidth - The width of the container viewport.
 * @param gap - The gap between items.
 * @returns The number of items to clone for each direction.
 */
const getCloneCount = (items: Rect[], containerWidth: number, gap: number): number => {
  let widthSum = 0;
  let count = 0;

  for (const item of items) {
    widthSum += item.width + gap;
    count++;
    if (widthSum >= containerWidth) break;
  }

  return Math.max(1, count);
};

/**
 * Calculates which items are visible in the carousel based on scroll offset and viewport.
 * @param itemRects - The items to get the visibility for.
 * @param containerWidth - The width of the container viewport.
 * @param scrollOffset - The current scroll offset (positive value).
 * @returns Set of visible item IDs.
 */
const getVisibleItems = (
  itemRects: { [itemId: string]: Rect },
  containerWidth: number,
  scrollOffset: number,
): Set<string> => {
  const visibleItems = new Set<string>();

  const viewportLeft = scrollOffset;
  const viewportRight = scrollOffset + containerWidth;

  Object.entries(itemRects).forEach(([itemId, rect]) => {
    const itemLeft = rect.x;
    const itemRight = rect.x + rect.width;

    const isVisible = itemLeft < viewportRight && itemRight > viewportLeft;

    if (isVisible) {
      visibleItems.add(itemId);
    }
  });

  return visibleItems;
};

const animationConfig = { tension: 200, friction: 25 };

export const Carousel = memo(
  forwardRef<CarouselImperativeHandle, CarouselProps>(
    (
      {
        children,
        title,
        hideNavigation,
        hidePagination,
        drag = 'snap',
        snapMode = 'page',
        NavigationComponent = DefaultCarouselNavigation,
        PaginationComponent = DefaultCarouselPagination,
        style,
        styles,
        nextPageAccessibilityLabel,
        previousPageAccessibilityLabel,
        goToPageAccessibilityLabel,
        onChangePage,
        onDragStart,
        onDragEnd,
        loop,
        ...props
      }: CarouselProps,
      ref: React.ForwardedRef<CarouselImperativeHandle>,
    ) => {
      const carouselScrollX = useRef(0);

      const animationApi = useSpring({
        x: carouselScrollX.current,
        config: animationConfig,
      });

      const [activePageIndex, setActivePageIndex] = useState(0);
      const [containerSize, onLayout] = useLayout();
      const [carouselItemRects, setCarouselItemRects] = useState<{
        [itemId: string]: Rect;
      }>({});
      const [visibleCarouselItems, setVisibleCarouselItems] = useState<Set<string>>(new Set());
      const rootRef = useRef<View>(null);

      const isDragEnabled = drag !== 'none';

      const updateActivePageIndex = useCallback(
        (newPageIndexOrUpdater: number | ((prevIndex: number) => number)) => {
          setActivePageIndex((prevIndex) => {
            const newPageIndex =
              typeof newPageIndexOrUpdater === 'function'
                ? newPageIndexOrUpdater(prevIndex)
                : newPageIndexOrUpdater;

            if (prevIndex !== newPageIndex && onChangePage) {
              onChangePage(newPageIndex);
            }

            return newPageIndex;
          });
        },
        [onChangePage],
      );

      const contentWidth = useMemo(() => {
        if (Object.keys(carouselItemRects).length === 0) return 0;
        const items = getItemOffsets(carouselItemRects);
        const lastItem = items[items.length - 1];
        return lastItem.x + lastItem.width;
      }, [carouselItemRects]);

      const maxScrollOffset = Math.max(0, contentWidth - containerSize.width);
      const hasCalculatedDimensions = contentWidth > 0 && containerSize.width > 0;

      // Calculate gap from item spacing
      const gap = useMemo(() => {
        if (Object.keys(carouselItemRects).length < 2) return 0;
        const items = getItemOffsets(carouselItemRects);
        const firstItemEnd = items[0].x + items[0].width;
        const secondItemStart = items[1].x;
        return Math.max(0, secondItemStart - firstItemEnd);
      }, [carouselItemRects]);

      // Determine if looping should actually be enabled
      // Looping requires: loop prop enabled, content measured, and more content than fits in viewport
      const shouldLoop = loop && hasCalculatedDimensions && maxScrollOffset > 0;

      // Total width of one "cycle" of content for looping
      const loopLength = useMemo(() => {
        if (!shouldLoop) return 0;
        return contentWidth + gap;
      }, [shouldLoop, contentWidth, gap]);

      const updateVisibleCarouselItems = useCallback(
        (scrollOffset: number) => {
          if (containerSize.width === 0) {
            setVisibleCarouselItems(new Set());
            return;
          }

          // When looping, wrap the offset to get the local position within one cycle
          const adjustedOffset =
            shouldLoop && loopLength
              ? ((scrollOffset % loopLength) + loopLength) % loopLength
              : scrollOffset;

          setVisibleCarouselItems(
            getVisibleItems(carouselItemRects, containerSize.width, adjustedOffset),
          );
        },
        [carouselItemRects, containerSize.width, shouldLoop, loopLength],
      );

      // Calculate how many items to clone for each direction (enough to fill viewport)
      const cloneCount = useMemo(() => {
        if (
          !shouldLoop ||
          Object.keys(carouselItemRects).length === 0 ||
          containerSize.width === 0
        ) {
          return 0;
        }
        return getCloneCount(getItemOffsets(carouselItemRects), containerSize.width, gap);
      }, [shouldLoop, carouselItemRects, containerSize.width, gap]);

      // Calculate pages and their offsets based on snapMode
      const { totalPages, pageOffsets } = useMemo(() => {
        if (!hasCalculatedDimensions || Object.keys(carouselItemRects).length === 0) {
          return { totalPages: 0, pageOffsets: [] };
        }

        let pageOffsetsResult: { totalPages: number; pageOffsets: number[] };

        if (snapMode === 'item') {
          pageOffsetsResult = getSnapItemPageOffsets(
            getItemOffsets(carouselItemRects),
            containerSize.width,
            maxScrollOffset,
            shouldLoop,
          );
        } else {
          pageOffsetsResult = getSnapPageOffsets(
            getItemOffsets(carouselItemRects),
            containerSize.width,
            maxScrollOffset,
          );
        }

        updateActivePageIndex((pageIndex) => Math.min(pageIndex, pageOffsetsResult.totalPages - 1));

        return pageOffsetsResult;
      }, [
        hasCalculatedDimensions,
        carouselItemRects,
        snapMode,
        containerSize.width,
        maxScrollOffset,
        shouldLoop,
        updateActivePageIndex,
      ]);

      const goToPage = useCallback(
        (page: number) => {
          const safePage = Math.max(0, Math.min(totalPages - 1, page));

          updateActivePageIndex(safePage);
          updateVisibleCarouselItems(pageOffsets[safePage]);

          if (shouldLoop && loopLength) {
            // Find shortest path across current, previous, and next cycles
            const currentOffset = carouselScrollX.current;
            const currentCycle = Math.floor(currentOffset / loopLength);
            const targetInCurrentCycle = currentCycle * loopLength + pageOffsets[safePage];

            const candidates = [
              targetInCurrentCycle,
              targetInCurrentCycle - loopLength,
              targetInCurrentCycle + loopLength,
            ];
            const shortest = candidates.reduce((a, b) =>
              Math.abs(currentOffset - a) < Math.abs(currentOffset - b) ? a : b,
            );

            carouselScrollX.current = shortest;
            animationApi.x.start({ to: shortest, config: animationConfig });
          } else {
            const targetOffset = pageOffsets[safePage];
            carouselScrollX.current = targetOffset;
            animationApi.x.start({ to: targetOffset, config: animationConfig });
          }
        },
        [
          shouldLoop,
          loopLength,
          totalPages,
          pageOffsets,
          animationApi.x,
          updateVisibleCarouselItems,
          updateActivePageIndex,
        ],
      );

      useImperativeHandle(
        ref,
        () => ({
          activePageIndex,
          totalPages,
          goToPage,
        }),
        [activePageIndex, totalPages, goToPage],
      );

      const handleGoNext = useCallback(() => {
        const nextPage = shouldLoop
          ? wrap(0, totalPages, activePageIndex + 1)
          : activePageIndex + 1;
        goToPage(nextPage);
      }, [shouldLoop, totalPages, activePageIndex, goToPage]);

      const handleGoPrevious = useCallback(() => {
        const prevPage = shouldLoop
          ? wrap(0, totalPages, activePageIndex - 1)
          : activePageIndex - 1;
        goToPage(prevPage);
      }, [shouldLoop, totalPages, activePageIndex, goToPage]);

      const handleDragStart = useCallback(() => {
        onDragStart?.();
      }, [onDragStart]);

      const handleDragEnd = useCallback(() => {
        onDragEnd?.();
      }, [onDragEnd]);

      const handleDragTransition = useCallback(
        (targetOffsetScroll: number) => {
          if (drag === 'none') return targetOffsetScroll;

          if (shouldLoop && loopLength) {
            const currentCycle = Math.floor(targetOffsetScroll / loopLength);
            const localOffset = targetOffsetScroll - currentCycle * loopLength;

            // Find nearest snap target across current, previous, and next cycles
            let nearest = { pageIndex: 0, offset: 0, distance: Infinity };
            for (const [pageIndex, pageOffset] of pageOffsets.entries()) {
              for (const cycle of [currentCycle - 1, currentCycle, currentCycle + 1]) {
                const cycleOffset = cycle * loopLength + pageOffset;
                const distance = Math.abs(targetOffsetScroll - cycleOffset);
                if (distance < nearest.distance) {
                  nearest = { pageIndex, offset: cycleOffset, distance };
                }
              }
            }

            updateActivePageIndex(nearest.pageIndex);

            if (drag === 'snap') {
              updateVisibleCarouselItems(pageOffsets[nearest.pageIndex]);
              return nearest.offset;
            }

            updateVisibleCarouselItems(localOffset);
            return targetOffsetScroll;
          } else {
            // Non-looping logic with clamping
            const clampedScrollOffset = clampWithElasticResistance(
              targetOffsetScroll,
              maxScrollOffset,
              0,
            );
            const closestPageIndex = getNearestPageIndexFromOffset(
              clampedScrollOffset,
              pageOffsets,
            );
            updateActivePageIndex(closestPageIndex);

            if (drag === 'snap') {
              const snapOffset = pageOffsets[closestPageIndex];
              updateVisibleCarouselItems(snapOffset);
              return snapOffset;
            }

            updateVisibleCarouselItems(clampedScrollOffset);
            return targetOffsetScroll;
          }
        },
        [
          drag,
          shouldLoop,
          loopLength,
          maxScrollOffset,
          pageOffsets,
          updateVisibleCarouselItems,
          updateActivePageIndex,
        ],
      );

      const panGesture = useMemo(
        () =>
          Gesture.Pan()
            .onStart(() => {
              if (!isDragEnabled) return;
              handleDragStart();
            })
            .onUpdate(({ translationX }) => {
              if (!isDragEnabled) return;

              let newOffset: number;
              if (shouldLoop) {
                // When looping, allow unconstrained dragging
                newOffset = carouselScrollX.current - translationX;
              } else {
                newOffset = clampWithElasticResistance(
                  carouselScrollX.current - translationX,
                  maxScrollOffset,
                );
              }

              animationApi.x.set(newOffset);
            })
            .onEnd(({ translationX, velocityX }) => {
              if (!isDragEnabled) return;

              let projectedOffset: number;

              if (shouldLoop) {
                // When looping, allow unconstrained momentum
                projectedOffset = carouselScrollX.current - translationX;
              } else {
                projectedOffset = clampWithElasticResistance(
                  carouselScrollX.current - translationX,
                  maxScrollOffset,
                );
              }

              const power = drag === 'free' ? 0.25 : 0.125;
              const momentumDistance = velocityX * power;

              if (shouldLoop) {
                projectedOffset = projectedOffset - momentumDistance;
              } else {
                projectedOffset = clampWithElasticResistance(
                  projectedOffset - momentumDistance,
                  maxScrollOffset,
                  0,
                );
              }

              const finalOffset = handleDragTransition(projectedOffset);

              carouselScrollX.current = finalOffset;

              animationApi.x.start({
                to: finalOffset,
                config: {
                  ...animationConfig,
                },
              });

              handleDragEnd();
            })
            .runOnJS(true),
        [
          isDragEnabled,
          shouldLoop,
          maxScrollOffset,
          animationApi,
          drag,
          handleDragTransition,
          handleDragStart,
          handleDragEnd,
        ],
      );

      // Clone children for looping to create visual continuity
      // Key insight: we always return a consistent structure when loop=true
      // to prevent children from remounting when shouldLoop changes
      // Clones are rendered as plain Views (not CarouselItem) to avoid registering
      const childrenWithClones = useMemo(() => {
        // When loop prop is false, just return children as-is
        if (!loop) return children;

        const childrenArray = React.Children.toArray(children) as CarouselItemElement[];
        if (childrenArray.length === 0) return children;

        const result: React.ReactNode[] = [];

        // Add backward clones (only when we have enough data to position them)
        if (shouldLoop && loopLength && cloneCount > 0) {
          const items = getItemOffsets(carouselItemRects);
          const itemsToCloneBackward = childrenArray.slice(-cloneCount);

          itemsToCloneBackward.forEach((child, cloneIndex) => {
            const originalIndex = childrenArray.length - cloneCount + cloneIndex;
            const itemData = items[originalIndex];
            const itemPosition = itemData?.x ?? 0;

            result.push(
              <View
                key={`clone-backward-${child.props.id}`}
                aria-hidden
                style={{
                  position: 'absolute',
                  left: itemPosition - loopLength,
                  width: itemData?.width,
                  height: itemData?.height,
                }}
              >
                {typeof child.props.children === 'function'
                  ? child.props.children({ isVisible: false })
                  : child.props.children}
              </View>,
            );
          });
        }

        // Add original children (always present, never changes structure)
        result.push(...childrenArray);

        // Add forward clones (only when we have enough data)
        if (shouldLoop && loopLength && cloneCount > 0) {
          const items = getItemOffsets(carouselItemRects);
          const itemsToCloneForward = childrenArray.slice(0, cloneCount);

          itemsToCloneForward.forEach((child, cloneIndex) => {
            const itemData = items[cloneIndex];

            result.push(
              <View
                key={`clone-forward-${child.props.id}`}
                aria-hidden
                style={{
                  flexShrink: 0,
                  width: itemData?.width,
                  height: itemData?.height,
                }}
              >
                {typeof child.props.children === 'function'
                  ? child.props.children({ isVisible: false })
                  : child.props.children}
              </View>,
            );
          });
        }

        return result;
      }, [loop, children, shouldLoop, loopLength, cloneCount, carouselItemRects]);

      const containerStyle = useMemo(
        () => [{ flex: 1, overflow: 'hidden' } as const, style, styles?.root],
        [style, styles?.root],
      );

      const scrollViewStyle = useMemo(
        () => [
          {
            flex: 1,
          },
          styles?.carouselContainer,
        ],
        [styles?.carouselContainer],
      );

      const animatedStyle = useMemo(
        () => ({
          flexDirection: 'row' as const,
          ...(styles?.carousel as any),
        }),
        [styles?.carousel],
      );

      const animatedTransform = useMemo(
        () => ({
          transform: [
            {
              translateX: animationApi.x.to((value) => {
                if (!shouldLoop || !loopLength) return -value;
                // Wrap the value to stay within one cycle for visual continuity
                // Ensure wrapped is always in range [0, loopLength)
                const wrapped = ((value % loopLength) + loopLength) % loopLength;
                return -wrapped;
              }),
            },
          ],
        }),
        [animationApi, shouldLoop, loopLength],
      );

      const registerItem = useCallback(
        (id: string, rect: Rect) => {
          setCarouselItemRects((prev) => ({
            ...prev,
            [id]: rect,
          }));
          updateVisibleCarouselItems(carouselScrollX.current);
        },
        [updateVisibleCarouselItems],
      );

      const unregisterItem = useCallback((id: string) => {
        setCarouselItemRects((prev) => {
          const newRects = { ...prev };
          delete newRects[id];
          return newRects;
        });
      }, []);

      const carouselContextValue: CarouselContextValue = useMemo(
        () => ({
          registerItem,
          unregisterItem,
          visibleCarouselItems,
        }),
        [registerItem, unregisterItem, visibleCarouselItems],
      );

      return (
        <CarouselContext.Provider value={carouselContextValue}>
          <VStack
            ref={rootRef}
            aria-live="polite"
            aria-roledescription="carousel"
            gap={2}
            role="group"
            style={containerStyle}
            {...props}
          >
            {(title || !hideNavigation) && (
              <HStack alignItems="center" justifyContent={title ? 'space-between' : 'flex-end'}>
                {typeof title === 'string' ? (
                  <Text font="title3" style={styles?.title}>
                    {title}
                  </Text>
                ) : (
                  title
                )}
                {!hideNavigation && (
                  <NavigationComponent
                    disableGoNext={
                      totalPages <= 1 || (!shouldLoop && activePageIndex >= totalPages - 1)
                    }
                    disableGoPrevious={totalPages <= 1 || (!shouldLoop && activePageIndex <= 0)}
                    nextPageAccessibilityLabel={nextPageAccessibilityLabel}
                    onGoNext={handleGoNext}
                    onGoPrevious={handleGoPrevious}
                    previousPageAccessibilityLabel={previousPageAccessibilityLabel}
                    style={styles?.navigation}
                  />
                )}
              </HStack>
            )}
            <GestureDetector gesture={panGesture}>
              <View onLayout={onLayout} style={scrollViewStyle}>
                <animated.View style={[animatedStyle, animatedTransform]}>
                  {childrenWithClones}
                </animated.View>
              </View>
            </GestureDetector>
            {!hidePagination && (
              <PaginationComponent
                activePageIndex={activePageIndex}
                onPressPage={goToPage}
                paginationAccessibilityLabel={goToPageAccessibilityLabel}
                style={styles?.pagination}
                totalPages={totalPages}
              />
            )}
          </VStack>
        </CarouselContext.Provider>
      );
    },
  ),
);
