import React, { cloneElement, memo, useCallback, useMemo, useRef } from 'react';

import { useComponentConfig } from '../../hooks/useComponentConfig';
import { Popover } from '../popover/Popover';

import { TooltipContent } from './TooltipContent';
import type { TooltipProps } from './TooltipProps';
import { useTooltipState } from './useTooltipState';

const preventMouseDown = (event: React.MouseEvent) => {
  event.preventDefault();
  event.stopPropagation();
};

export const Tooltip = memo((_props: TooltipProps) => {
  const mergedProps = useComponentConfig('Tooltip', _props);
  const {
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
  } = mergedProps;
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
    // Use aria-describedby to associate the tooltip (role="tooltip") with the trigger.
    // This preserves the trigger's own accessible name (e.g. button text) while the tooltip
    // provides supplemental description, per the ARIA tooltip pattern.
    return cloneElement(children, { 'aria-describedby': tooltipId });
  }, [children, tooltipId]);

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
});
