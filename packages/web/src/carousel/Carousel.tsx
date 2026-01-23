import React, {
  forwardRef,
  memo,
  useCallback,
  useContext,
  useEffect,
  useImperativeHandle,
  useMemo,
  useRef,
  useState,
} from 'react';
import { useRefMap } from '@coinbase/cds-common/hooks/useRefMap';
import { RefMapContext } from '@coinbase/cds-common/system/RefMapContext';
import type { Rect, SharedAccessibilityProps, SharedProps } from '@coinbase/cds-common/types';
import { css } from '@linaria/core';
import {
  animate,
  domMax,
  LazyMotion,
  m,
  useAnimation,
  useDragControls,
  useMotionValue,
  useTransform,
} from 'framer-motion';

import { cx } from '../cx';
import { type BoxBaseProps, type BoxDefaultElement, type BoxProps } from '../layout/Box';
import { HStack } from '../layout/HStack';
import { VStack } from '../layout/VStack';
import { Text } from '../typography';

import { DefaultCarouselNavigation } from './DefaultCarouselNavigation';
import { DefaultCarouselPagination } from './DefaultCarouselPagination';

const defaultCarouselCss = css`
  & img {
    pointer-events: none;
  }
`;

export type CarouselItemRenderChildren = React.FC<{ isVisible: boolean }>;

export type CarouselItemBaseProps = Omit<BoxBaseProps, 'children'> & {
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

export type CarouselItemProps = Omit<BoxProps<BoxDefaultElement>, 'children'> &
  CarouselItemBaseProps;

export type CarouselItemComponent = React.FC<CarouselItemProps>;
export type CarouselItemElement = React.ReactElement<CarouselItemProps, CarouselItemComponent>;

export type CarouselContextValue = {
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
  onGoPrevious?: () => void;
  /**
   * Callback for when the next button is pressed.
   */
  onGoNext?: () => void;
  /**
   * Whether the previous button is disabled.
   */
  disableGoPrevious?: boolean;
  /**
   * Whether the next button is disabled.
   */
  disableGoNext?: boolean;
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
   * Custom class name for the component.
   */
  className?: string;
  /**
   * Custom styles for the component.
   */
  style?: React.CSSProperties;
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
  onClickPage?: (index: number) => void;
  /**
   * Accessibility label for the go to page button. You can optionally pass a function that will receive the pageIndex as an argument, and return an accessibility label string.
   */
  paginationAccessibilityLabel?: string | ((pageIndex: number) => string);
};

export type CarouselPaginationComponentProps = CarouselPaginationComponentBaseProps & {
  /**
   * Custom class name for the root element.
   */
  className?: string;
  /**
   * Custom styles for the component.
   */
  style?: React.CSSProperties;
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
    paginationAccessibilityLabel?: string | ((pageIndex: number) => string);
    /**
     * Callback fired when the carousel page changes.
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

export type CarouselProps = Omit<BoxProps<BoxDefaultElement>, 'title'> &
  CarouselBaseProps & {
    /**
     * Custom class name for the root element.
     */
    className?: string;
    /**
     * Custom class names for the component.
     */
    classNames?: {
      /**
       * Custom class name for the root element.
       */
      root?: string;
      /**
       * Custom class name for the title element.
       */
      title?: string;
      /**
       * Custom class name for the navigation element.
       */
      navigation?: string;
      /**
       * Custom class name for the pagination element.
       */
      pagination?: string;
      /**
       * Custom class name for the main carousel element.
       */
      carousel?: string;
      /**
       * Custom class name for the outer carousel container element.
       */
      carouselContainer?: string;
    };
    /**
     * Custom styles for the root element.
     */
    style?: React.CSSProperties;
    /**
     * Custom styles for the component.
     */
    styles?: {
      /**
       * Custom styles for the root element.
       */
      root?: React.CSSProperties;
      /**
       * Custom styles for the title element.
       */
      title?: React.CSSProperties;
      /**
       * Custom styles for the navigation element.
       */
      navigation?: React.CSSProperties;
      /**
       * Custom styles for the pagination element.
       */
      pagination?: React.CSSProperties;
      /**
       * Custom styles for the main carousel element.
       */
      carousel?: React.CSSProperties;
      /**
       * Custom styles for the outer carousel container element.
       */
      carouselContainer?: React.CSSProperties;
    };
  };

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
const getCloneCount = (items: Rect[], containerWidth: number): number => {
  let widthSum = 0;
  let count = 0;

  for (const item of items) {
    widthSum += item.width;
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
        className,
        classNames,
        style,
        styles,
        nextPageAccessibilityLabel,
        previousPageAccessibilityLabel,
        paginationAccessibilityLabel,
        onChangePage,
        onDragStart,
        onDragEnd,
        loop,
        ...props
      }: CarouselProps,
      ref: React.ForwardedRef<CarouselImperativeHandle>,
    ) => {
      const animationApi = useAnimation();
      const carouselScrollX = useMotionValue(0);
      const dragControls = useDragControls();

      const [activePageIndex, setActivePageIndex] = useState(0);
      const containerRef = useRef<HTMLDivElement>(null);
      const rootRef = useRef<HTMLDivElement>(null);
      const [containerWidth, setContainerWidth] = useState(0);
      const carouselItemRefMap = useRefMap<HTMLElement>();
      const [carouselItemRects, setCarouselItemRects] = useState<{
        [itemId: string]: Rect;
      }>({});
      const [visibleCarouselItems, setVisibleCarouselItems] = useState<Set<string>>(new Set());

      const isDragEnabled = drag !== 'none';

      useEffect(() => {
        const observer = new window.ResizeObserver(() => {
          const newRects: { [itemId: string]: Rect } = {};
          Object.entries(carouselItemRefMap.refs).forEach(([id, element]) => {
            if (element) {
              newRects[id] = {
                x: element.offsetLeft,
                y: element.offsetTop,
                width: element.offsetWidth,
                height: element.offsetHeight,
              };
            }
          });
          setCarouselItemRects(newRects);
        });

        Object.values(carouselItemRefMap.refs).forEach((element) => {
          if (element) observer.observe(element);
        });

        if (
          Object.keys(carouselItemRefMap.refs).length === 0 ||
          Object.values(carouselItemRefMap.refs).every((element) => element === null)
        ) {
          setCarouselItemRects({});
        }

        return () => observer.disconnect();
      }, [carouselItemRefMap.refs, children]);

      const contentWidth = useMemo(() => {
        if (Object.keys(carouselItemRects).length === 0) return 0;
        const items = getItemOffsets(carouselItemRects);
        const lastItem = items[items.length - 1];
        return lastItem.x + lastItem.width;
      }, [carouselItemRects]);

      const maxScrollOffset = Math.max(0, contentWidth - containerWidth);
      const hasDimensions = contentWidth > 0 && containerWidth > 0;

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
      const shouldLoop = loop && hasDimensions && maxScrollOffset > 0;

      // Total width of one "cycle" of content for looping
      const loopLength = useMemo(() => {
        if (!shouldLoop) return 0;
        return contentWidth + gap;
      }, [shouldLoop, contentWidth, gap]);

      // Derived transform: physics (carouselScrollX) can go to ±∞, visuals (wrappedX) stay bounded
      const wrappedX = useTransform(carouselScrollX, (value) => {
        if (!shouldLoop || !loopLength) return value;
        const wrapped = value % loopLength;
        return wrapped > 0 ? wrapped - loopLength : wrapped;
      });

      const updateVisibleCarouselItems = useCallback(
        (localScrollOffset: number) => {
          if (containerWidth === 0) {
            setVisibleCarouselItems(new Set());
            return;
          }

          // When looping, wrap the offset to get the local position within one cycle
          const adjustedOffset =
            shouldLoop && loopLength
              ? ((localScrollOffset % loopLength) + loopLength) % loopLength
              : localScrollOffset;

          setVisibleCarouselItems(
            getVisibleItems(carouselItemRects, containerWidth, adjustedOffset),
          );
        },
        [carouselItemRects, containerWidth, shouldLoop, loopLength],
      );

      useEffect(() => {
        const element = containerRef.current;
        if (!element) return;
        const observer = new window.ResizeObserver((entries) => {
          for (const entry of entries) {
            setContainerWidth(entry.contentRect.width);
            updateVisibleCarouselItems(Math.abs(carouselScrollX.get()));
          }
        });
        observer.observe(element);
        return () => observer.unobserve(element);
      }, [carouselItemRects, carouselScrollX, updateVisibleCarouselItems]);

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

      // Calculate how many items to clone for each direction (enough to fill viewport)
      const cloneCount = useMemo(() => {
        if (!shouldLoop || Object.keys(carouselItemRects).length === 0 || containerWidth === 0) {
          return 0;
        }
        return getCloneCount(getItemOffsets(carouselItemRects), containerWidth);
      }, [shouldLoop, carouselItemRects, containerWidth]);

      // Clone children for looping to create visual continuity
      // Clones are rendered as plain divs (not CarouselItem) to avoid registering with ref map
      const childrenWithClones = useMemo(() => {
        if (!shouldLoop || !loopLength || !children || cloneCount === 0) return children;

        const childrenArray = React.Children.toArray(children) as CarouselItemElement[];
        if (childrenArray.length === 0) return children;

        const result: React.ReactNode[] = [];

        // Get item data from rects to position backward clones correctly
        const items = getItemOffsets(carouselItemRects);

        // Determine which items to clone (only what's needed to fill viewport)
        const itemsToCloneForward = childrenArray.slice(0, cloneCount);
        const itemsToCloneBackward = childrenArray.slice(-cloneCount);

        // Add backward clones (positioned before original items)
        // These are absolutely positioned at their natural positions minus loopLength
        itemsToCloneBackward.forEach((child, cloneIndex) => {
          // Get the original item's position (from the end of the array)
          const originalIndex = childrenArray.length - cloneCount + cloneIndex;
          const itemData = items[originalIndex];
          const itemPosition = itemData?.x ?? 0;

          // Render as a plain div that mirrors the CarouselItem structure but doesn't register
          const cloneElement = (
            <div
              key={`clone-backward-${child.props.id}`}
              aria-hidden="true"
              style={{
                position: 'absolute',
                left: itemPosition - loopLength,
                flexShrink: 0,
                width: itemData?.width,
                height: itemData?.height,
                ...(child.props.style as React.CSSProperties),
              }}
            >
              {typeof child.props.children === 'function'
                ? child.props.children({ isVisible: false })
                : child.props.children}
            </div>
          );
          result.push(cloneElement);
        });

        // Add original items (in flex flow, normal positions)
        result.push(...childrenArray);

        // Add forward clones (positioned after original items in DOM)
        // They're in flex flow with the container's gap, so they naturally appear at loopLength position
        itemsToCloneForward.forEach((child, cloneIndex) => {
          const itemData = items[cloneIndex];

          // Render as a plain div that mirrors the CarouselItem structure but doesn't register
          const cloneElement = (
            <div
              key={`clone-forward-${child.props.id}`}
              aria-hidden="true"
              style={{
                flexShrink: 0,
                width: itemData?.width,
                height: itemData?.height,
                ...(child.props.style as React.CSSProperties),
              }}
            >
              {typeof child.props.children === 'function'
                ? child.props.children({ isVisible: false })
                : child.props.children}
            </div>
          );
          result.push(cloneElement);
        });

        return result;
      }, [shouldLoop, loopLength, children, carouselItemRects, cloneCount]);

      // Calculate pages and their offsets based on snapMode
      const { totalPages, pageOffsets } = useMemo(() => {
        if (!hasDimensions || Object.keys(carouselItemRects).length === 0) {
          return { totalPages: 0, pageOffsets: [] };
        }

        let pageOffsetsResult: { totalPages: number; pageOffsets: number[] };

        if (snapMode === 'item') {
          pageOffsetsResult = getSnapItemPageOffsets(
            getItemOffsets(carouselItemRects),
            containerWidth,
            maxScrollOffset,
            shouldLoop,
          );
        } else {
          pageOffsetsResult = getSnapPageOffsets(
            getItemOffsets(carouselItemRects),
            containerWidth,
            maxScrollOffset,
          );
        }

        updateActivePageIndex((pageIndex) => Math.min(pageIndex, pageOffsetsResult.totalPages - 1));

        return pageOffsetsResult;
      }, [
        hasDimensions,
        carouselItemRects,
        snapMode,
        containerWidth,
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
            const currentOffset = -carouselScrollX.get();
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

            animate(carouselScrollX, -shortest, { type: 'tween', duration: 0.25 });
          } else {
            animationApi.start({
              x: -pageOffsets[safePage],
              transition: { type: 'tween', duration: 0.25 },
            });
          }
        },
        [
          shouldLoop,
          loopLength,
          totalPages,
          pageOffsets,
          carouselScrollX,
          animationApi,
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

      const handleDragTransition = useCallback(
        (targetOffsetScroll: number) => {
          if (drag === 'none') return targetOffsetScroll;

          const targetOffset = -targetOffsetScroll;

          if (shouldLoop && loopLength) {
            const currentCycle = Math.floor(targetOffset / loopLength);
            const localOffset = targetOffset - currentCycle * loopLength;

            // Find nearest snap target across current, previous, and next cycles
            let nearest = { pageIndex: 0, offset: 0, distance: Infinity };
            for (const [pageIndex, pageOffset] of pageOffsets.entries()) {
              for (const cycle of [currentCycle - 1, currentCycle, currentCycle + 1]) {
                const cycleOffset = cycle * loopLength + pageOffset;
                const distance = Math.abs(targetOffset - cycleOffset);
                if (distance < nearest.distance) {
                  nearest = { pageIndex, offset: cycleOffset, distance };
                }
              }
            }

            updateActivePageIndex(nearest.pageIndex);

            if (drag === 'snap') {
              updateVisibleCarouselItems(pageOffsets[nearest.pageIndex]);
              return -nearest.offset;
            }

            updateVisibleCarouselItems(localOffset);
            return targetOffsetScroll;
          } else {
            // Non-looping logic with clamping
            const clampedScrollOffset = clampWithElasticResistance(
              targetOffset,
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
              return -snapOffset;
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

      const handleDragStart = useCallback(() => {
        onDragStart?.();
      }, [onDragStart]);

      const handleDragEnd = useCallback(() => {
        onDragEnd?.();
      }, [onDragEnd]);

      const carouselContextValue = useMemo(
        () => ({
          visibleCarouselItems,
        }),
        [visibleCarouselItems],
      );

      return (
        <LazyMotion features={domMax}>
          <RefMapContext.Provider value={carouselItemRefMap}>
            <VStack
              ref={rootRef}
              aria-live="polite"
              aria-roledescription="carousel"
              className={cx(className, classNames?.root)}
              gap={2}
              role="group"
              style={{ overflow: 'hidden', ...style, ...styles?.root }}
              width="100%"
              {...props}
            >
              {(title || !hideNavigation) && (
                <HStack alignItems="center" justifyContent={title ? 'space-between' : 'flex-end'}>
                  {typeof title === 'string' ? (
                    <Text className={classNames?.title} font="title3" style={styles?.title}>
                      {title}
                    </Text>
                  ) : (
                    title
                  )}
                  {!hideNavigation && (
                    <NavigationComponent
                      className={classNames?.navigation}
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
              <div
                ref={containerRef}
                className={classNames?.carouselContainer}
                onPointerDown={(e) => {
                  if (isDragEnabled) {
                    // Allows us to grab between items where child wouldn't be selected
                    dragControls.start(e);
                    handleDragStart();
                  }
                }}
                style={{
                  width: '100%',
                  position: 'relative',
                  ...styles?.carouselContainer,
                }}
              >
                <CarouselContext.Provider value={carouselContextValue}>
                  <m.div
                    _dragX={carouselScrollX}
                    animate={animationApi}
                    className={cx(classNames?.carousel, defaultCarouselCss)}
                    drag={isDragEnabled ? 'x' : false}
                    dragConstraints={shouldLoop ? undefined : { left: -maxScrollOffset, right: 0 }}
                    dragControls={dragControls}
                    dragTransition={{
                      // How much inertia affects the target
                      power: drag === 'free' ? 0.5 : 0.125,
                      timeConstant: drag !== 'free' ? 125 : undefined,
                      modifyTarget: handleDragTransition,
                    }}
                    initial={false}
                    onDragEnd={handleDragEnd}
                    style={{
                      display: 'flex',
                      position: 'relative',
                      // Derived Transform Pattern:
                      // - Drag/momentum modifies carouselScrollX (can grow to ±∞)
                      // - wrappedX is purely derived via useTransform (always bounded)
                      // - Rendering with wrappedX preserves momentum since we never jump during motion
                      x: shouldLoop ? wrappedX : carouselScrollX,
                      ...styles?.carousel,
                    }}
                    whileDrag={{
                      pointerEvents: 'none',
                    }}
                  >
                    {childrenWithClones}
                  </m.div>
                </CarouselContext.Provider>
              </div>
              {!hidePagination && (
                <PaginationComponent
                  activePageIndex={activePageIndex}
                  className={classNames?.pagination}
                  onClickPage={goToPage}
                  paginationAccessibilityLabel={paginationAccessibilityLabel}
                  style={styles?.pagination}
                  totalPages={totalPages}
                />
              )}
            </VStack>
          </RefMapContext.Provider>
        </LazyMotion>
      );
    },
  ),
);
