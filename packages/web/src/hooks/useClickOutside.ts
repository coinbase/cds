import { useEffect, useRef } from 'react';

export type ClickOutsideOptions = {
  ref?: React.MutableRefObject<HTMLElement | null>;
  excludeRefs?: React.MutableRefObject<HTMLElement | null>[];
};

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
