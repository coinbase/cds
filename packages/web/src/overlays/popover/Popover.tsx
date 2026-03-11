/* eslint-disable jsx-a11y/no-static-element-interactions, jsx-a11y/click-events-have-key-events */
import React, { memo, useCallback, useMemo } from 'react';
import { zIndex } from '@coinbase/cds-common/tokens/zIndex';
import { css } from '@linaria/core';

import { NewAnimatePresence } from '../../animation/NewAnimatePresence';
import { cx } from '../../cx';
import { Box } from '../../layout/Box';
import { InvertedThemeProvider } from '../../system/ThemeProvider';
import { FocusTrap } from '../FocusTrap';
import { Overlay } from '../overlay/Overlay';
import { Portal } from '../Portal';
import { tooltipContainerId } from '../PortalProvider';

import type { PopoverContentPositionConfig, PopoverProps } from './PopoverProps';
import { usePopper } from './usePopper';

const subjectCss = css`
  background-color: transparent;
  display: flex;
  cursor: default;
`;

const defaultContentPosition: PopoverContentPositionConfig = {
  gap: 0,
  skid: 0,
  placement: 'bottom',
  offsetGap: undefined,
  strategy: undefined,
};

const blockCss = css`
  width: 100%;
`;

/**
 * Popover is the internal recommended base component used for any overlay that is laid out with respect to a subject.
 * It is purposely a flexible component and is reserved for CDS internal usage.
 */
export const Popover = memo(
  ({
    content,
    children,
    disablePortal,
    showOverlay = false,
    onPressSubject,
    onClose,
    onMouseEnter,
    onMouseLeave,
    onFocus,
    onBlur,
    onMouseDown,
    invertColorScheme,
    visible,
    accessibilityLabel = 'popoverMenu',
    testID,
    contentPosition = defaultContentPosition,
    block = false,
    disabled,
    disableFocusTrap,
    disableAutoFocus = false,
    disableTypeFocus = false,
    focusTabIndexElements,
    respectNegativeTabIndex,
    autoFocusDelay,
    restoreFocusOnUnmount,
    controlledElementAccessibilityProps,
  }: PopoverProps) => {
    const { setSubject, setPopper, popperStyles, popperAttributes } = usePopper(contentPosition);

    // We use this to infer that hover events are triggering the mounting/dismounting of the content
    const hasHoverInteractions = !!onMouseEnter && !!onMouseLeave && !onPressSubject;
    const shouldShowContent = visible && !disabled;

    const handleClose = useCallback(async () => {
      onClose?.();
      onBlur?.();
    }, [onBlur, onClose]);

    // swallow click events inside the Popover content so the overlay doesn't consider it a blur event
    const handleCaptureEvents = useCallback((event: React.MouseEvent<HTMLDivElement>) => {
      event.stopPropagation();
    }, []);

    const memoizedContent = useMemo(
      () => (
        <div
          ref={setPopper}
          style={{
            ...popperStyles.popper,
            zIndex: zIndex.dropdown,
          }}
          {...popperAttributes.popper}
          onClick={handleCaptureEvents}
        >
          <FocusTrap
            autoFocusDelay={autoFocusDelay}
            disableAutoFocus={disableAutoFocus}
            disableFocusTrap={disableFocusTrap}
            disableTypeFocus={disableTypeFocus}
            focusTabIndexElements={focusTabIndexElements}
            onEscPress={handleClose}
            respectNegativeTabIndex={respectNegativeTabIndex}
            restoreFocusOnUnmount={restoreFocusOnUnmount}
          >
            {/* Box with Horizontal padding to ensure proper margins but still rely on popper for layout. */}
            <Box
              background="transparent"
              data-testid={testID}
              {...controlledElementAccessibilityProps}
            >
              {content}
            </Box>
          </FocusTrap>
        </div>
      ),
      [
        setPopper,
        popperStyles.popper,
        popperAttributes.popper,
        handleCaptureEvents,
        autoFocusDelay,
        disableAutoFocus,
        disableFocusTrap,
        disableTypeFocus,
        focusTabIndexElements,
        handleClose,
        respectNegativeTabIndex,
        restoreFocusOnUnmount,
        testID,
        controlledElementAccessibilityProps,
        content,
      ],
    );

    const renderContent = hasHoverInteractions ? (
      memoizedContent
    ) : (
      <Box
        aria-label={accessibilityLabel}
        aria-modal="true"
        onClick={handleClose}
        pin="all"
        position="fixed"
        role="dialog"
        zIndex={zIndex.portal + zIndex.modal}
      >
        {memoizedContent}
      </Box>
    );

    const Wrapper = invertColorScheme ? InvertedThemeProvider : React.Fragment;

    return (
      <div
        className={block ? blockCss : undefined}
        onBlur={onBlur}
        onMouseEnter={disabled ? undefined : onMouseEnter}
        onMouseLeave={disabled ? undefined : onMouseLeave}
      >
        <div
          ref={setSubject}
          className={cx(subjectCss, block && blockCss)}
          onClick={disabled ? undefined : onPressSubject}
          onFocus={disabled ? undefined : onFocus}
          onMouseDown={disabled ? undefined : onMouseDown}
        >
          {children}
        </div>
        <NewAnimatePresence>
          {shouldShowContent ? (
            <Portal containerId={tooltipContainerId} disablePortal={disablePortal}>
              <Wrapper>
                {showOverlay ? (
                  <Box pin="all" position="fixed" zIndex={zIndex.portal + zIndex.modal}>
                    <Overlay animated onClick={handleClose} />
                    {memoizedContent}
                  </Box>
                ) : (
                  renderContent
                )}
              </Wrapper>
            </Portal>
          ) : undefined}
        </NewAnimatePresence>
      </div>
    );
  },
);
