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
  testID,
  zIndex,
  tooltipId: tooltipIdDefault,
  visible,
  hasInteractiveContent,
  invertColorScheme = true,
  disableAutoFocus = hasInteractiveContent,
  disableFocusTrap = hasInteractiveContent,
  disablePortal = hasInteractiveContent,
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
    const isStringContent = typeof content === 'string';
    return cloneElement(
      children,
      // String content: Use only aria-label so the trigger is announced on focus without
      // double announcement (aria-describedby would point to the same text when the tooltip is open).
      // Non-string content: Use only aria-describedby to associate the visible tooltip (id=tooltipId).
      // We cannot use aria-label here (it accepts only strings). May not announce on focus for
      // non-button triggers due to timing (describedby target mounts when tooltip opens).
      isStringContent ? { 'aria-label': content } : { 'aria-describedby': tooltipId },
    );
  }, [children, content, tooltipId]);

  const contentPosition = useMemo(
    () => ({
      placement,
    }),
    [placement],
  );

  const isVisible = useMemo(() => visible !== false && isOpen, [visible, isOpen]);

  const handleBlur = useCallback(
    (event?: React.FocusEvent) => {
      const relatedTarget = event?.relatedTarget as Node | null;
      const currentTarget = event?.currentTarget as Node | null;
      if (relatedTarget && currentTarget?.contains(relatedTarget)) {
        return;
      }
      handleOnBlur();
    },
    [handleOnBlur],
  );

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
      onBlur={handleBlur}
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
