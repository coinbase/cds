import { useEffect, useRef } from 'react';

/**
 * Options for configuring the useClickOutside hook
 */
export type ClickOutsideOptions = {
  /** Reference to the element to detect clicks outside of */
  ref?: React.MutableRefObject<HTMLElement | null>;
  /** Array of refs that should be excluded from triggering the outside click handler */
  excludeRefs?: React.MutableRefObject<HTMLElement | null>[];
};

/**
 * Hook that detects clicks outside of a specified element and triggers a callback
 * @param callback - Function to call when a click outside is detected
 * @param options - Configuration options for the hook
 * @returns A ref to attach to the element you want to detect clicks outside of
 */
export const useClickOutside = (
  callback: () => void,
  { ref, excludeRefs }: ClickOutsideOptions = {},
) => {
  const internalRef = useRef<HTMLDivElement>(null);
  const containerRef = ref ?? internalRef;

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node;

      if (!containerRef.current) return;
      if (containerRef.current && containerRef.current.contains(target)) return;
      if (excludeRefs && excludeRefs.some((ref) => ref.current?.contains(target))) return;

      callback();
    };

    window.addEventListener('mousedown', handleClickOutside);

    return () => {
      window.removeEventListener('mousedown', handleClickOutside);
    };
  }, [callback, containerRef, excludeRefs]);

  return containerRef;
};
