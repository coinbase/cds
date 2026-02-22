/* eslint-disable jsx-a11y/no-static-element-interactions, jsx-a11y/click-events-have-key-events */
import React, { memo, useCallback, useMemo } from 'react';
import { zIndex } from '@coinbase/cds-common/tokens/zIndex';
import {
  autoPlacement,
  autoUpdate,
  flip,
  limitShift,
  offset,
  type Placement as FloatingPlacement,
  shift,
  useFloating,
} from '@floating-ui/react-dom';
import { css } from '@linaria/core';

import { NewAnimatePresence } from '../../animation/NewAnimatePresence';
import { cx } from '../../cx';
import { useTheme } from '../../hooks/useTheme';
import { Box } from '../../layout/Box';
import { InvertedThemeProvider } from '../../system/ThemeProvider';
import { FocusTrap } from '../FocusTrap';
import { Overlay } from '../overlay/Overlay';
import { Portal } from '../Portal';
import { tooltipContainerId } from '../PortalProvider';

import type { PopoverContentPositionConfig, PopoverProps } from './PopoverProps';

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
    const theme = useTheme();
    const {
      placement: rawPlacement = 'bottom',
      skid = 0,
      gap = 0,
      offsetGap,
      strategy,
    } = contentPosition;

    const computedSkid = theme.space[skid];
    const computedGap = theme.space[gap];
    const getOffsetGap = offsetGap && gap - offsetGap;

    const isAutoPlacement = typeof rawPlacement === 'string' && rawPlacement.startsWith('auto');

    const middleware = useMemo(() => {
      const middlewareList = [
        offset({
          crossAxis: computedSkid,
          mainAxis: getOffsetGap ?? computedGap,
        }),
      ];

      if (isAutoPlacement) {
        const alignment =
          rawPlacement === 'auto-start' ? 'start' : rawPlacement === 'auto-end' ? 'end' : undefined;
        middlewareList.push(autoPlacement(alignment ? { alignment } : undefined));
      } else {
        middlewareList.push(flip());
        middlewareList.push(shift({ crossAxis: true, limiter: limitShift() }));
      }

      return middlewareList;
    }, [computedSkid, getOffsetGap, computedGap, isAutoPlacement, rawPlacement]);

    const { refs, floatingStyles } = useFloating({
      placement: isAutoPlacement ? undefined : (rawPlacement as FloatingPlacement),
      strategy,
      middleware,
      whileElementsMounted: autoUpdate,
    });

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
          ref={refs.setFloating}
          onClick={handleCaptureEvents}
          style={{
            ...floatingStyles,
            zIndex: zIndex.dropdown,
          }}
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
        refs.setFloating,
        floatingStyles,
        handleCaptureEvents,
        handleClose,
        testID,
        content,
        controlledElementAccessibilityProps,
        disableFocusTrap,
        disableAutoFocus,
        disableTypeFocus,
        focusTabIndexElements,
        respectNegativeTabIndex,
        autoFocusDelay,
        restoreFocusOnUnmount,
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
        onMouseEnter={disabled ? undefined : onMouseEnter}
        onMouseLeave={disabled ? undefined : onMouseLeave}
      >
        <div
          ref={refs.setReference}
          className={cx(subjectCss, block && blockCss)}
          onBlur={onBlur}
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
