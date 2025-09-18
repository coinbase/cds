import { useEffect, useRef, useState } from 'react';
import type { RefObject } from 'react';

type UseStickyOptions = {
  /**
   * Distance in pixels from the top of the viewport/container where the element should become sticky.
   * Negative values will make the element stick before it reaches the top.
   * @default 0
   */
  top?: number;

  /**
   * Optional ref to a container element. If provided, the sticky behavior will be relative
   * to this container instead of the viewport.
   */
  containerRef?: RefObject<HTMLElement>;
};

type UseStickyResult = {
  /** Ref to attach to the element that should become sticky */
  elementRef: RefObject<HTMLDivElement>;
  /** Whether the element is currently in "sticky" state */
  isSticky: boolean;
};

/**
 * Hook that detects when an element becomes "sticky" by monitoring its intersection
 * with a scroll container or the viewport.
 *
 * Note: This hook only works correctly when the element's initial position is different
 * from its sticky position. If an element starts at the same position where it should
 * stick (e.g., element starts at top: 0 and should stick at top: 0), the sticky state
 * will not be detected correctly.
 *
 * @param options Configuration options for sticky detection behavior
 * @returns Object containing refs to attach to your elements and the sticky top offset
 */

export function useIsSticky(options: UseStickyOptions = {}): UseStickyResult {
  const { top = 0, containerRef } = options;
  const elementRef = useRef<HTMLDivElement>(null);
  const [isSticky, setIsSticky] = useState(false);

  useEffect(() => {
    const targetElement = elementRef.current;
    if (!targetElement) return;

    // -top adjusts the intersection boundary to match the element's intended sticky position
    // The additional -1px ensures the element is not 100% intersecting with the container when stuck (and vice versa),
    // which triggers the intersection observer right before the element reaches its sticky position (top + 1px from viewport top)
    const rootMargin = `${-top - 1}px 0px 0px 0px`;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsSticky(!entry.isIntersecting);
      },
      {
        root: containerRef?.current || null,
        rootMargin,
        threshold: 1,
      },
    );

    observer.observe(targetElement);
    return () => observer.disconnect();
  }, [top, containerRef]);

  return {
    elementRef,
    isSticky,
  };
}
