import React, { cloneElement, useCallback, useMemo, useRef } from 'react';

import { Popover } from '../popover/Popover';

import { TooltipContent } from './TooltipContent';
import type { TooltipProps } from './TooltipProps';
import { useTooltipState } from './useTooltipState';

const preventMouseDown = (event: React.MouseEvent) => {
  event.preventDefault();
  event.stopPropagation();
};

export const Tooltip = ({
  children,
  content,
  elevation,
  placement = 'top',
  gap = 1,
  disablePortal,
  testID,
  zIndex,
  tooltipId: tooltipIdDefault,
  visible,
  invertColorScheme = true,
  disableFocusTrap,
  disableAutoFocus,
  disableTypeFocus,
  focusTabIndexElements,
  respectNegativeTabIndex,
  autoFocusDelay = 20,
  openDelay,
  closeDelay,
}: TooltipProps) => {
  const { isOpen, handleOnMouseEnter, handleOnMouseLeave, handleOnFocus, handleOnBlur, tooltipId } =
    useTooltipState(tooltipIdDefault, openDelay, closeDelay);
  const tooltipContentRef = useRef<HTMLDivElement | null>(null);

  const handleMouseEnter = useCallback(
    ({ target }: React.MouseEvent) => {
      const node = tooltipContentRef.current;

      // to prevent flicker, don't open tooltip if enter event originates from tooltip content
      if (target instanceof Node && node?.parentNode !== target && !node?.contains(target)) {
        handleOnMouseEnter();
      }
    },
    [handleOnMouseEnter],
  );

  const clonedChild = useMemo(() => {
    return cloneElement(children, {
      'aria-describedby': tooltipId,
    });
  }, [children, tooltipId]);

  const contentPosition = useMemo(
    () => ({
      placement,
    }),
    [placement],
  );

  const isVisible = useMemo(() => visible !== false && isOpen, [visible, isOpen]);

  return (
    <Popover
      autoFocusDelay={autoFocusDelay}
      content={
        <TooltipContent
          ref={tooltipContentRef}
          content={content}
          elevation={elevation}
          gap={gap}
          placement={placement}
          testID={testID}
          tooltipId={tooltipId}
          zIndex={zIndex}
        />
      }
      contentPosition={contentPosition}
      disableAutoFocus={disableAutoFocus}
      disableFocusTrap={disableFocusTrap}
      disablePortal={disablePortal}
      disableTypeFocus={disableTypeFocus}
      focusTabIndexElements={focusTabIndexElements}
      invertColorScheme={invertColorScheme}
      onBlur={handleOnBlur}
      onFocus={handleOnFocus}
      onMouseDown={preventMouseDown}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleOnMouseLeave}
      respectNegativeTabIndex={respectNegativeTabIndex}
      visible={isVisible}
    >
      {clonedChild}
    </Popover>
  );
};
