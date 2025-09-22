import { useCallback, useMemo, useState } from 'react';
import { usePrefixedId } from '@cbhq/cds-common/hooks/usePrefixedId';

export const useTooltipState = (id?: string) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const tooltipId = usePrefixedId(id);

  const handleOnMouseEnter = useCallback(() => setIsHovered(true), []);
  const toggleOffIsHovered = useCallback(() => setIsHovered(false), []);
  const handleOnFocus = useCallback(() => setIsFocused(true), []);
  const toggleOffIsFocused = useCallback(() => setIsFocused(false), []);

  const handleOnBlur = useCallback(() => {
    toggleOffIsFocused();
  }, [toggleOffIsFocused]);

  const handleOnMouseLeave = useCallback(() => {
    toggleOffIsHovered();
  }, [toggleOffIsHovered]);

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
