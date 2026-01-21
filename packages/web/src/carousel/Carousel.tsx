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

      // Calculate wrap inset for looping (the total width of one "loop" of content)
      const wrapInset = useMemo(() => {
        if (!shouldLoop) return null;
        return contentWidth + gap;
      }, [shouldLoop, contentWidth, gap]);

      // Get current iteration for looping
      const getIteration = useCallback(
        (scrollOffset: number): number => {
          if (!shouldLoop || !wrapInset) return 0;
          return Math.floor(scrollOffset / wrapInset);
        },
        [shouldLoop, wrapInset],
      );

      const updateVisibleCarouselItems = useCallback(
        (scrollOffset: number) => {
          if (containerWidth === 0) {
            setVisibleCarouselItems(new Set());
            return;
          }

          // When looping, adjust scroll offset to account for iteration
          let adjustedScrollOffset = scrollOffset;
          let iteration = 0;
          if (shouldLoop && wrapInset) {
            iteration = getIteration(scrollOffset);
            adjustedScrollOffset = scrollOffset - iteration * wrapInset;
          }

          // Get visible items from original items only
          // Note: adjustedScrollOffset accounts for iteration, so we check original items at their base positions
          const visibleOriginalItems = getVisibleItems(
            carouselItemRects,
            containerWidth,
            adjustedScrollOffset,
          );

          if (process.env.NODE_ENV === 'development' && shouldLoop) {
            console.log(
              '[Carousel] updateVisibleCarouselItems',
              JSON.stringify({
                scrollOffset,
                adjustedScrollOffset,
                iteration,
                wrapInset,
                containerWidth,
                visibleOriginalItems: Array.from(visibleOriginalItems),
                itemRects: Object.keys(carouselItemRects),
                itemRectsDetails: Object.entries(carouselItemRects).map(([id, rect]) => ({
                  id,
                  x: rect.x,
                  width: rect.width,
                  end: rect.x + rect.width,
                  viewportStart: adjustedScrollOffset,
                  viewportEnd: adjustedScrollOffset + containerWidth,
                  isVisible:
                    rect.x < adjustedScrollOffset + containerWidth &&
                    rect.x + rect.width > adjustedScrollOffset,
                })),
              }),
            );
          }

          // When looping, we need to check if we're viewing clones instead of originals
          // Clones appear at different scroll offsets:
          // - Forward clones: visible when scrollOffset is near wrapInset (iteration 1)
          // - Backward clones: visible when scrollOffset is near -wrapInset (iteration -1)
          const visibleItems = new Set<string>(visibleOriginalItems);

          if (shouldLoop && wrapInset) {
            // If we're at iteration 1 or higher, we might be viewing forward clones
            // Forward clones are positioned at wrapInset offset in the DOM (after originals)
            // So when scrollOffset is around wrapInset, we're seeing forward clones
            // Map those back to original item IDs
            if (iteration >= 1 || scrollOffset >= wrapInset * 0.5) {
              // Check if forward clones would be visible at this scroll position
              // Forward clones are at: originalPosition + wrapInset
              // So we check visibility at scrollOffset - wrapInset to see which originals would be visible as clones
              const forwardCloneViewOffset = adjustedScrollOffset;
              const forwardCloneOriginalItems = getVisibleItems(
                carouselItemRects,
                containerWidth,
                forwardCloneViewOffset,
              );
              forwardCloneOriginalItems.forEach((id) => {
                visibleItems.add(id);
              });
              if (process.env.NODE_ENV === 'development' && forwardCloneOriginalItems.size > 0) {
                console.log('[Carousel] Forward clones visible (mapped to originals)', {
                  originalItems: Array.from(forwardCloneOriginalItems),
                });
              }
            }

            // If we're at iteration -1 or lower, we might be viewing backward clones
            // Backward clones are positioned before originals with transform -wrapInset
            // So they appear at: originalPosition - wrapInset visually
            if (iteration <= -1 || scrollOffset <= -wrapInset * 0.5) {
              // Check if backward clones would be visible
              // Backward clones are at: originalPosition - wrapInset visually
              // So we check visibility at scrollOffset + wrapInset
              const backwardCloneViewOffset = adjustedScrollOffset;
              const backwardCloneOriginalItems = getVisibleItems(
                carouselItemRects,
                containerWidth,
                backwardCloneViewOffset,
              );
              backwardCloneOriginalItems.forEach((id) => {
                visibleItems.add(id);
              });
              if (process.env.NODE_ENV === 'development' && backwardCloneOriginalItems.size > 0) {
                console.log('[Carousel] Backward clones visible (mapped to originals)', {
                  originalItems: Array.from(backwardCloneOriginalItems),
                });
              }
            }
          }

          setVisibleCarouselItems(visibleItems);
        },
        [carouselItemRects, containerWidth, shouldLoop, wrapInset, getIteration],
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

      // Calculate how many items to clone for each direction
      // We only need enough clones to fill the viewport on each side
      const cloneCount = useMemo(() => {
        if (!shouldLoop || Object.keys(carouselItemRects).length === 0 || containerWidth === 0) {
          return 0;
        }

        const items = getItemOffsets(carouselItemRects);
        let widthSum = 0;
        let count = 0;

        // Count items until we exceed containerWidth (plus gap for safety margin)
        for (const item of items) {
          widthSum += item.width + gap;
          count++;
          if (widthSum >= containerWidth) break;
        }

        // Ensure at least 1 clone if looping is enabled
        return Math.max(1, count);
      }, [shouldLoop, carouselItemRects, containerWidth, gap]);

      // Clone children for looping to create visual continuity
      // Clones are rendered as plain divs (not CarouselItem) to avoid registering with ref map
      const clonedChildren = useMemo(() => {
        if (!shouldLoop || !wrapInset || !children || cloneCount === 0) return children;

        const childrenArray = React.Children.toArray(children) as CarouselItemElement[];
        if (childrenArray.length === 0) return children;

        const result: React.ReactNode[] = [];

        // Get item data from rects to position backward clones correctly
        const items = getItemOffsets(carouselItemRects);

        // Determine which items to clone (only what's needed to fill viewport)
        const itemsToCloneForward = childrenArray.slice(0, cloneCount);
        const itemsToCloneBackward = childrenArray.slice(-cloneCount);

        // Add backward clones (positioned before original items)
        // These are absolutely positioned at their natural positions minus wrapInset
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
                left: itemPosition - wrapInset,
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
        // They're in flex flow so they naturally appear at contentWidth offset
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
      }, [shouldLoop, wrapInset, children, carouselItemRects, cloneCount]);

      // Calculate pages and their offsets based on snapMode
      const { totalPages, pageOffsets } = useMemo(() => {
        if (!hasDimensions || Object.keys(carouselItemRects).length === 0) {
          return { totalPages: 0, pageOffsets: [] };
        }

        let pageOffsets: { totalPages: number; pageOffsets: number[] };

        if (snapMode === 'item') {
          pageOffsets = getSnapItemPageOffsets(
            getItemOffsets(carouselItemRects),
            containerWidth,
            maxScrollOffset,
            shouldLoop,
          );
        } else {
          pageOffsets = getSnapPageOffsets(
            getItemOffsets(carouselItemRects),
            containerWidth,
            maxScrollOffset,
          );
        }

        updateActivePageIndex((pageIndex) => Math.min(pageIndex, pageOffsets.totalPages - 1));

        return pageOffsets;
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
          if (process.env.NODE_ENV === 'development') {
            console.log(
              '[Carousel] goToPage',
              JSON.stringify({
                page,
                shouldLoop,
                wrapInset,
                activePageIndex,
                totalPages,
                pageOffsets,
              }),
            );
          }

          if (shouldLoop && wrapInset) {
            const currentPage = activePageIndex;
            const currentScrollOffset = Math.abs(carouselScrollX.get());
            const currentIteration = getIteration(currentScrollOffset);

            if (process.env.NODE_ENV === 'development') {
              console.log(
                '[Carousel] goToPage (looping)',
                JSON.stringify({
                  currentPage,
                  currentScrollOffset,
                  currentIteration,
                  targetPage: page,
                }),
              );
            }

            // Check if we're crossing a boundary (e.g., page 3 → page 0)
            const isWrappingForward = currentPage === totalPages - 1 && page === 0;
            const isWrappingBackward = currentPage === 0 && page === totalPages - 1;

            if (isWrappingForward) {
              // Wrapping forward: animate to next iteration, then snap to iteration 0
              updateActivePageIndex(page);
              const targetOffsetNextIteration =
                pageOffsets[page] + (currentIteration + 1) * wrapInset;
              updateVisibleCarouselItems(pageOffsets[page]);

              if (process.env.NODE_ENV === 'development') {
                console.log(
                  '[Carousel] Wrapping forward',
                  JSON.stringify({
                    targetOffsetNextIteration,
                    targetOffsetIteration0: pageOffsets[page],
                  }),
                );
              }

              animationApi
                .start({
                  x: -targetOffsetNextIteration,
                  transition: { type: 'tween', duration: 0.25 },
                })
                .then(() => {
                  // After animation completes, instantly snap to iteration 0
                  const targetOffsetIteration0 = pageOffsets[page];
                  carouselScrollX.set(-targetOffsetIteration0);
                  animationApi.set({ x: -targetOffsetIteration0 });
                  updateVisibleCarouselItems(targetOffsetIteration0);
                  if (process.env.NODE_ENV === 'development') {
                    console.log('[Carousel] Snapped to iteration 0', { targetOffsetIteration0 });
                  }
                });
            } else if (isWrappingBackward) {
              // Wrapping backward: animate to previous iteration, then snap to iteration 0
              // Backward clones are absolutely positioned at left: itemPosition - wrapInset
              // To show page 9 (offset 1962), the backward clone is at left: 1962 - 2180 = -218
              // To show it, we need to scroll carousel to x = -(-218) = 218 (carouselScrollX = -218)
              // So targetOffsetPrevIteration = pageOffsets[page] - wrapInset
              updateActivePageIndex(page);
              // The backward clone of the target page is positioned at: pageOffsets[page] - wrapInset
              // To show it, we scroll to that offset (negated for carousel x)
              const targetOffsetPrevIteration = pageOffsets[page] - wrapInset;
              updateVisibleCarouselItems(pageOffsets[page]);

              if (process.env.NODE_ENV === 'development') {
                console.log(
                  '[Carousel] Wrapping backward',
                  JSON.stringify({
                    targetOffsetPrevIteration,
                    targetOffsetIteration0: pageOffsets[page],
                    pageOffsets,
                  }),
                );
              }

              animationApi
                .start({
                  // Negate because carousel x is negative of scroll offset
                  x: -targetOffsetPrevIteration,
                  transition: { type: 'tween', duration: 0.25 },
                })
                .then(() => {
                  // After animation completes, instantly snap to iteration 0
                  const targetOffsetIteration0 = pageOffsets[page];
                  carouselScrollX.set(-targetOffsetIteration0);
                  animationApi.set({ x: -targetOffsetIteration0 });
                  updateVisibleCarouselItems(targetOffsetIteration0);
                  if (process.env.NODE_ENV === 'development') {
                    console.log(
                      '[Carousel] Snapped to iteration 0',
                      JSON.stringify({ targetOffsetIteration0 }),
                    );
                  }
                });
            } else {
              // Normal page transition within same iteration
              updateActivePageIndex(page);
              const targetOffset = pageOffsets[page] + currentIteration * wrapInset;
              updateVisibleCarouselItems(pageOffsets[page]);
              if (process.env.NODE_ENV === 'development') {
                console.log(
                  '[Carousel] Normal transition',
                  JSON.stringify({ targetOffset, currentIteration }),
                );
              }
              animationApi.start({
                x: -targetOffset,
                transition: { type: 'tween', duration: 0.25 },
              });
            }
          } else {
            // Existing non-looping logic
            const newPage = Math.max(0, Math.min(totalPages - 1, page));
            updateActivePageIndex(newPage);
            const targetOffset = pageOffsets[newPage];
            updateVisibleCarouselItems(targetOffset);
            animationApi.start({
              x: -targetOffset,
              transition: { type: 'tween', duration: 0.25 },
            });
          }
        },
        [
          shouldLoop,
          wrapInset,
          activePageIndex,
          totalPages,
          pageOffsets,
          carouselScrollX,
          getIteration,
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

      const handleDragTransition = useCallback(
        (targetOffsetScroll: number) => {
          if (drag === 'none') return targetOffsetScroll;
          const negatedTargetOffsetScroll = -targetOffsetScroll;

          if (shouldLoop && wrapInset) {
            // Don't clamp - allow infinite scrolling
            const iteration = getIteration(negatedTargetOffsetScroll);

            // Calculate page index accounting for iteration
            const transformInset = iteration * wrapInset;
            const adjustedOffset = negatedTargetOffsetScroll - transformInset;

            // For looping, we need to consider wrap-around when finding the closest page
            // If adjustedOffset is past the last page, page 0 should be considered at wrapInset
            // If adjustedOffset is before page 0, the last page should be considered at -wrapInset
            const lastPageOffset = pageOffsets[pageOffsets.length - 1];
            const firstPageOffset = pageOffsets[0];

            // Calculate distances considering wrap-around
            let closestPageIndex = 0;
            let closestDistance = Infinity;

            pageOffsets.forEach((pageOffset, index) => {
              // Direct distance
              const directDistance = Math.abs(adjustedOffset - pageOffset);

              // Wrap-around distance (page appears again at +wrapInset or -wrapInset)
              const wrapForwardDistance = Math.abs(adjustedOffset - (pageOffset + wrapInset));
              const wrapBackwardDistance = Math.abs(adjustedOffset - (pageOffset - wrapInset));

              const minDistance = Math.min(
                directDistance,
                wrapForwardDistance,
                wrapBackwardDistance,
              );

              if (minDistance < closestDistance) {
                closestDistance = minDistance;
                closestPageIndex = index;
              }
            });

            if (process.env.NODE_ENV === 'development') {
              console.log(
                '[Carousel] handleDragTransition (looping)',
                JSON.stringify({
                  targetOffsetScroll,
                  negatedTargetOffsetScroll,
                  iteration,
                  transformInset,
                  adjustedOffset,
                  wrapInset,
                  pageOffsets,
                  lastPageOffset,
                  firstPageOffset,
                  closestPageIndex,
                  closestDistance,
                  activePageIndex,
                  // Show distances for each page
                  pageDistances: pageOffsets.map((offset, idx) => ({
                    page: idx,
                    offset,
                    directDistance: Math.abs(adjustedOffset - offset),
                    wrapForwardDistance: Math.abs(adjustedOffset - (offset + wrapInset)),
                    wrapBackwardDistance: Math.abs(adjustedOffset - (offset - wrapInset)),
                  })),
                }),
              );
            }

            updateActivePageIndex(closestPageIndex);

            if (drag === 'snap') {
              // Determine which iteration to snap to based on where we're dragging
              let snapIteration = iteration;

              // If we found a closer match via wrap-around, adjust the iteration
              const directDistance = Math.abs(adjustedOffset - pageOffsets[closestPageIndex]);
              const wrapForwardDistance = Math.abs(
                adjustedOffset - (pageOffsets[closestPageIndex] + wrapInset),
              );
              const wrapBackwardDistance = Math.abs(
                adjustedOffset - (pageOffsets[closestPageIndex] - wrapInset),
              );

              if (
                wrapForwardDistance < directDistance &&
                wrapForwardDistance < wrapBackwardDistance
              ) {
                snapIteration = iteration + 1;
              } else if (
                wrapBackwardDistance < directDistance &&
                wrapBackwardDistance < wrapForwardDistance
              ) {
                snapIteration = iteration - 1;
              }

              // Snap to page accounting for iteration
              const snapOffset = pageOffsets[closestPageIndex] + snapIteration * wrapInset;
              updateVisibleCarouselItems(pageOffsets[closestPageIndex]);

              if (process.env.NODE_ENV === 'development') {
                console.log(
                  '[Carousel] handleDragTransition snap result',
                  JSON.stringify({
                    closestPageIndex,
                    snapIteration,
                    snapOffset,
                    willResetToIteration0: snapIteration !== 0,
                  }),
                );
              }

              // After snap completes, instantly reposition to iteration 0 if we crossed boundary
              setTimeout(() => {
                const currentIteration = getIteration(Math.abs(carouselScrollX.get()));
                if (currentIteration !== 0) {
                  const iteration0Offset = pageOffsets[closestPageIndex];
                  carouselScrollX.set(-iteration0Offset);
                  animationApi.set({ x: -iteration0Offset });
                  updateVisibleCarouselItems(iteration0Offset);
                  if (process.env.NODE_ENV === 'development') {
                    console.log(
                      '[Carousel] Reset to iteration 0',
                      JSON.stringify({ iteration0Offset }),
                    );
                  }
                }
              }, 50);

              return -snapOffset;
            }

            // For free drag, wrap the offset to stay within [0, wrapInset) range
            // This ensures smooth continuous scrolling without jumps
            const wrappedOffset = wrap(0, wrapInset, negatedTargetOffsetScroll);
            updateVisibleCarouselItems(wrappedOffset);

            // Return the wrapped offset (negated for carousel x)
            return -wrappedOffset;
          } else {
            // Existing non-looping logic with clamping
            const clampedScrollOffset = clampWithElasticResistance(
              negatedTargetOffsetScroll,
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
          activePageIndex,
          drag,
          shouldLoop,
          wrapInset,
          getIteration,
          maxScrollOffset,
          pageOffsets,
          carouselScrollX,
          animationApi,
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

      // When looping, we need to offset the carousel so backward clones are visible
      // Backward clones are in flex flow before originals, so they're at negative positions
      // When scrollX = 0, we want to see originals (at x = 0)
      // When scrollX goes negative, we want to see backward clones
      // So we offset by -wrapInset: when scrollX = 0, carousel x = -wrapInset, showing originals
      // When scrollX = -wrapInset, carousel x = -2*wrapInset, showing backward clones

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
                      onGoNext={() => {
                        if (shouldLoop) {
                          goToPage(wrap(0, totalPages, activePageIndex + 1));
                        } else {
                          goToPage(activePageIndex + 1);
                        }
                      }}
                      onGoPrevious={() => {
                        if (shouldLoop) {
                          goToPage(wrap(0, totalPages, activePageIndex - 1));
                        } else {
                          goToPage(activePageIndex - 1);
                        }
                      }}
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
                      // When looping, offset by wrapInset so backward clones (at -wrapInset) are positioned correctly
                      // When scrollX = 0, carousel x = -wrapInset, showing originals at x = 0
                      x: carouselScrollX,
                      ...styles?.carousel,
                    }}
                    whileDrag={{
                      pointerEvents: 'none',
                    }}
                  >
                    {clonedChildren}
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
