import React, {
  forwardRef,
  memo,
  type Ref,
  useCallback,
  useImperativeHandle,
  useMemo,
  useState,
} from 'react';
import useMeasure from 'react-use-measure';
import type { SharedAccessibilityProps, SharedProps } from '@coinbase/cds-common/types';
import { css } from '@linaria/core';

import { cx } from '../../cx';
import { useBreakpoints } from '../../hooks/useBreakpoints';
import { useComponentConfig } from '../../hooks/useComponentConfig';
import type { StylesAndClassNames } from '../../types';
import { FocusTrap } from '../FocusTrap';
import { ModalWrapper } from '../modal/ModalWrapper';

import { Popover } from './Popover';
import { PopoverPanelContent, type PopoverPanelContentBaseProps } from './PopoverPanelContent';
import type { PopoverBaseProps, PopoverContentPositionConfig } from './PopoverProps';

const POPOVER_PANEL_MAX_HEIGHT = 300;

export type PopoverPanelRef = {
  openPopover: () => void;
  closePopover: () => void;
};

export type PopoverPanelRenderContent = (api: { closePopover: () => void }) => React.ReactNode;

export type PopoverPanelBaseProps = SharedProps &
  Pick<
    SharedAccessibilityProps,
    'accessibilityLabel' | 'accessibilityLabelledBy' | 'accessibilityHint'
  > &
  Pick<
    PopoverBaseProps,
    | 'showOverlay'
    | 'contentPosition'
    | 'block'
    | 'disableTypeFocus'
    | 'controlledElementAccessibilityProps'
    | 'respectNegativeTabIndex'
    | 'disableAutoFocus'
    | 'focusTabIndexElements'
    | 'autoFocusDelay'
  > & {
    /**
     * Enable to have PopoverPanel render its content inside a Modal as opposed to a relatively positioned Popover.
     * Ideal for mobile or smaller devices.
     */
    enableMobileModal?: boolean;
    /** Width of the panel. */
    panelWidth?: PopoverPanelContentBaseProps['width'];
    /** Minimum width of the panel. */
    minPanelWidth?: PopoverPanelContentBaseProps['minWidth'];
    /** Maximum width of the panel. */
    maxPanelWidth?: PopoverPanelContentBaseProps['maxWidth'];
    /** Height of the panel. */
    panelHeight?: PopoverPanelContentBaseProps['height'];
    /** Can optionally pass a maxHeight.
     * @default 300
     */
    maxPanelHeight?: PopoverPanelContentBaseProps['maxHeight'];
    /** Callback that fires when PopoverPanel is opened */
    onOpen?: () => void;
    /** Callback that fires when PopoverPanel is closed */
    onClose?: () => void;
    /** Callback that fires when PopoverPanel or trigger are blurred */
    onBlur?: () => void;
    /** Does not render the panel inside of a portal (react-dom createPortal).
     * Portal is automatically disabled for SSR
     */
    disablePortal?: boolean;
    /**
     * Prevents the panel from opening.
     * You'll need to surface disabled state on the trigger manually.
     */
    disabled?: boolean;
    /**
     * If `true`, the focus trap will restore focus to the previously focused element when it unmounts.
     *
     * WARNING: If you disable this, you need to ensure that focus is restored properly so it doesn't end up on the body
     * @default true
     */
    restoreFocusOnUnmount?: boolean;
    /**
     * Panel body, or a function that receives `closePopover` (helpfulwhen actions inside the panel should dismiss it).
     */
    content: React.ReactNode | PopoverPanelRenderContent;
  };

export const popoverPanelClassNames = {
  /** Elevated panel surface (`PopoverPanelContent`). */
  content: 'cds-PopoverPanel-content',
  /** Wrapper around `children` (the `Popover` root in floating layout, or the trigger `div` in the mobile modal). */
  triggerContainer: 'cds-PopoverPanel-triggerContainer',
};

export type PopoverPanelProps = PopoverPanelBaseProps &
  StylesAndClassNames<typeof popoverPanelClassNames> & {
    style?: React.CSSProperties;
    className?: string;
    children: React.ReactNode;
  };

export type PopoverPanelInternalProps = Omit<PopoverPanelProps, 'content'> & {
  content: React.ReactNode;
  visible: boolean;
};
const NOOP = () => {};

const defaultPopoverContentPositionConfig: PopoverContentPositionConfig = {
  gap: 0.5,
  placement: 'bottom-start',
};

function usePopoverPanelImperativeHandle(
  ref: Ref<PopoverPanelRef>,
  onOpen: () => void,
  onClose: () => void,
) {
  useImperativeHandle(
    ref,
    () => ({
      openPopover: onOpen,
      closePopover: onClose,
    }),
    [onOpen, onClose],
  );
}

const triggerContainerCss = css`
  width: fit-content;
`;

const blockCss = css`
  width: 100%;
`;

const MobilePopoverPanel = memo(
  forwardRef<PopoverPanelRef, PopoverPanelInternalProps>(
    (
      {
        children,
        onOpen = NOOP,
        onClose = NOOP,
        block,
        content,
        disablePortal,
        visible,
        panelWidth,
        showOverlay,
        minPanelWidth,
        maxPanelWidth,
        maxPanelHeight,
        disabled,
        controlledElementAccessibilityProps,
        respectNegativeTabIndex,
        restoreFocusOnUnmount,
        style,
        styles,
        className,
        classNames,
        onBlur,
        testID,
        disableAutoFocus,
        focusTabIndexElements,
        autoFocusDelay,
      },
      ref,
    ) => {
      usePopoverPanelImperativeHandle(ref, onOpen, onClose);
      const handleCaptureEvents = useCallback((event: React.MouseEvent<HTMLDivElement>) => {
        event.stopPropagation();
      }, []);
      return (
        // eslint-disable-next-line jsx-a11y/click-events-have-key-events
        <div
          className={cx(
            block ? blockCss : triggerContainerCss,
            popoverPanelClassNames.triggerContainer,
            className,
            classNames?.triggerContainer,
          )}
          onBlur={onBlur}
          onClick={disabled ? undefined : onOpen}
          style={{ ...style, ...styles?.triggerContainer }}
        >
          {children}
          <ModalWrapper
            dangerouslyDisableResponsiveness
            disablePortal={disablePortal}
            hideOverlay={!showOverlay}
            onClick={handleCaptureEvents}
            onOverlayPress={onClose}
            testID={testID}
            visible={visible}
            {...controlledElementAccessibilityProps}
          >
            <FocusTrap
              autoFocusDelay={autoFocusDelay}
              disableAutoFocus={disableAutoFocus}
              focusTabIndexElements={focusTabIndexElements}
              onEscPress={onClose}
              respectNegativeTabIndex={respectNegativeTabIndex}
              restoreFocusOnUnmount={restoreFocusOnUnmount}
            >
              <PopoverPanelContent
                className={classNames?.content}
                maxHeight={maxPanelHeight}
                maxWidth={maxPanelWidth}
                minWidth={minPanelWidth}
                style={styles?.content}
                width={panelWidth}
              >
                {content}
              </PopoverPanelContent>
            </FocusTrap>
          </ModalWrapper>
        </div>
      );
    },
  ),
);

type FloatingPopoverPanelProps = Omit<PopoverPanelInternalProps, 'enableMobileModal'>;
const FloatingPopoverPanel = memo(
  forwardRef<PopoverPanelRef, FloatingPopoverPanelProps>(
    (
      {
        content,
        showOverlay,
        children,
        visible,
        onClose = NOOP,
        onOpen = NOOP,
        panelWidth: width,
        minPanelWidth: minWidth,
        maxPanelWidth: maxWidth,
        maxPanelHeight: maxHeight = POPOVER_PANEL_MAX_HEIGHT,
        panelHeight: height,
        testID,
        disablePortal,
        onBlur,
        contentPosition = defaultPopoverContentPositionConfig,
        block,
        disabled,
        restoreFocusOnUnmount,
        style,
        styles,
        className,
        classNames,
        ...props
      },
      ref,
    ) => {
      const [triggerRef, triggerBounds] = useMeasure();

      const combinedContentPosition = useMemo(
        () => ({ ...defaultPopoverContentPositionConfig, ...contentPosition }),
        [contentPosition],
      );

      const memoizedContent = useMemo(
        () => (
          <PopoverPanelContent
            className={classNames?.content}
            height={height}
            maxHeight={maxHeight}
            maxWidth={maxWidth}
            minWidth={minWidth}
            placement={combinedContentPosition.placement}
            style={styles?.content}
            width={width ?? triggerBounds.width}
          >
            {content}
          </PopoverPanelContent>
        ),
        [
          classNames?.content,
          height,
          maxHeight,
          maxWidth,
          minWidth,
          combinedContentPosition.placement,
          styles?.content,
          width,
          triggerBounds.width,
          content,
        ],
      );

      usePopoverPanelImperativeHandle(ref, onOpen, onClose);

      return (
        <Popover
          ref={triggerRef}
          block={block}
          className={cx(
            !block && triggerContainerCss,
            popoverPanelClassNames.triggerContainer,
            className,
            classNames?.triggerContainer,
          )}
          content={disabled ? undefined : memoizedContent}
          contentPosition={combinedContentPosition}
          disablePortal={disablePortal}
          disabled={disabled}
          onBlur={onBlur}
          onClose={onClose}
          onPressSubject={!visible ? onOpen : undefined}
          restoreFocusOnUnmount={restoreFocusOnUnmount}
          showOverlay={showOverlay}
          style={{ ...style, ...styles?.triggerContainer }}
          testID={testID}
          visible={disabled ? false : visible}
          {...props}
        >
          {children}
        </Popover>
      );
    },
  ),
);

/**
 * Anchored floating panel  built on {@link Popover} and {@link PopoverPanelContent} without select context. Use for custom panel content.
 * Imperative `openPopover` / `closePopover` are implemented in the floating and modal subcomponents (Dropdown continues to use `openMenu` / `closeMenu` on its ref).
 */
export const PopoverPanel = forwardRef<PopoverPanelRef, PopoverPanelProps>((_props, ref) => {
  const mergedProps = useComponentConfig('PopoverPanel', _props);
  const {
    children,
    content,
    maxPanelHeight = POPOVER_PANEL_MAX_HEIGHT,
    enableMobileModal,
    onOpen,
    onClose,
    restoreFocusOnUnmount = true,
    ...props
  } = mergedProps;
  const { isPhone } = useBreakpoints();
  const [visible, setVisible] = useState(false);

  const handleOpenPopover = useCallback(() => {
    setVisible(true);
    onOpen?.();
  }, [onOpen]);

  const handleClosePopover = useCallback(() => {
    setVisible(false);
    onClose?.();
  }, [onClose]);

  const resolvedContent = useMemo(
    () => (typeof content === 'function' ? content({ closePopover: handleClosePopover }) : content),
    [content, handleClosePopover],
  );

  const sharedProps = {
    maxPanelHeight,
    onClose: handleClosePopover,
    onOpen: handleOpenPopover,
    restoreFocusOnUnmount,
    visible,
    content: resolvedContent,
    ...props,
  };

  return isPhone && enableMobileModal ? (
    <MobilePopoverPanel ref={ref} {...sharedProps}>
      {children}
    </MobilePopoverPanel>
  ) : (
    <FloatingPopoverPanel ref={ref} {...sharedProps}>
      {children}
    </FloatingPopoverPanel>
  );
});
