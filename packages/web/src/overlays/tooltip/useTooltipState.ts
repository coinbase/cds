import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { usePrefixedId } from '@coinbase/cds-common/hooks/usePrefixedId';

export const useTooltipState = (id?: string, openDelay?: number, closeDelay?: number) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const tooltipId = usePrefixedId(id);
  const openTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const closeTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const clearOpenTimeout = useCallback(() => {
    if (openTimeoutRef.current) {
      clearTimeout(openTimeoutRef.current);
      openTimeoutRef.current = null;
    }
  }, []);

  const clearCloseTimeout = useCallback(() => {
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current);
      closeTimeoutRef.current = null;
    }
  }, []);

  const handleOnMouseEnter = useCallback(() => {
    clearCloseTimeout();

    if (openDelay && openDelay > 0) {
      openTimeoutRef.current = setTimeout(() => setIsHovered(true), openDelay);
    } else {
      setIsHovered(true);
    }
  }, [clearCloseTimeout, openDelay]);

  const toggleOffIsHovered = useCallback(() => {
    clearOpenTimeout();

    if (closeDelay && closeDelay > 0) {
      closeTimeoutRef.current = setTimeout(() => setIsHovered(false), closeDelay);
    } else {
      setIsHovered(false);
    }
  }, [clearOpenTimeout, closeDelay]);

  const handleOnFocus = useCallback(() => {
    clearCloseTimeout();
    clearOpenTimeout();
    setIsFocused(true);
  }, [clearCloseTimeout, clearOpenTimeout]);

  const toggleOffIsFocused = useCallback(() => {
    clearOpenTimeout();
    clearCloseTimeout();
    setIsFocused(false);
  }, [clearCloseTimeout, clearOpenTimeout]);

  const handleOnBlur = useCallback(() => {
    toggleOffIsFocused();
  }, [toggleOffIsFocused]);

  const handleOnMouseLeave = useCallback(() => {
    toggleOffIsHovered();
  }, [toggleOffIsHovered]);

  useEffect(() => {
    return () => {
      clearOpenTimeout();
      clearCloseTimeout();
    };
  }, [clearCloseTimeout, clearOpenTimeout]);

  return useMemo(() => {
    return {
      isOpen: isHovered || isFocused,
      tooltipId,
      handleOnMouseEnter,
      handleOnMouseLeave,
      handleOnFocus,
      handleOnBlur,
    };
  }, [
    handleOnBlur,
    handleOnFocus,
    handleOnMouseEnter,
    handleOnMouseLeave,
    isFocused,
    isHovered,
    tooltipId,
  ]);
};
