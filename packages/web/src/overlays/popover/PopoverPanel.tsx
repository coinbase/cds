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
import { FocusTrap } from '../FocusTrap';
import { ModalWrapper } from '../modal/ModalWrapper';

import { Popover } from './Popover';
import { PopoverPanelContent, type PopoverPanelContentBaseProps } from './PopoverPanelContent';
import type { PopoverBaseProps, PopoverContentPositionConfig } from './PopoverProps';
import { useResponsivePanelMaxHeight } from './useResponsivePanelMaxHeight';

export type PopoverPanelRef = {
  openPopover: () => void;
  closePopover: () => void;
};

export type PopoverPanelRenderContent = (api: { closePopover: () => void }) => React.ReactNode;

export type PopoverPanelBaseProps = Pick<
  PopoverBaseProps,
  | 'children'
  | 'showOverlay'
  | 'contentPosition'
  | 'block'
  | 'disableTypeFocus'
  | 'controlledElementAccessibilityProps'
  | 'respectNegativeTabIndex'
> &
  SharedProps &
  Pick<
    SharedAccessibilityProps,
    'accessibilityLabel' | 'accessibilityLabelledBy' | 'accessibilityHint'
  > & {
    /**
     * Enable to have PopoverPanel render its content inside a Modal as opposed to a relatively positioned Popover.
     * Ideal for mobile or smaller devices.
     */
    enableMobileModal?: boolean;
    /**
     * Width of the panel as a percentage string or number converted to pixels.
     */
    panelWidth?: PopoverPanelContentBaseProps['width'];
    /** Minimum width of the panel as a percentage string or number converted to pixels. */
    minPanelWidth?: PopoverPanelContentBaseProps['minWidth'];
    /** Maximum width of the panel as a percentage string or number converted to pixels. */
    maxPanelWidth?: PopoverPanelContentBaseProps['maxWidth'];
    /** Height of the panel as a percentage string or number converted to pixels. */
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

export type PopoverPanelProps = PopoverPanelBaseProps & {
  style?: React.CSSProperties;
  styles?: {
    /** Inline styles for the elevated panel surface (`PopoverPanelContent`). */
    content?: React.CSSProperties;
    /** Inline styles for the wrapper around `children` (the `Popover` root in floating layout, or the trigger `Box` in the mobile modal). */
    triggerContainer?: React.CSSProperties;
  };
  className?: string;
  classNames?: {
    /** Additional class name merged onto the panel surface (`PopoverPanelContent`). */
    content?: string;
    /** Additional class name merged onto the wrapper around `children` (same targets as `styles.triggerContainer`). */
    triggerContainer?: string;
  };
};

export type PopoverPanelInternalProps = Omit<PopoverPanelProps, 'content'> & {
  content: React.ReactNode;
  visible: boolean;
};

export const POPOVER_PANEL_MAX_HEIGHT = 300;
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
          className={cx(block ? blockCss : triggerContainerCss, classNames?.triggerContainer)}
          onBlur={onBlur}
          onClick={disabled ? undefined : onOpen}
          style={styles?.triggerContainer}
        >
          {children}
          <ModalWrapper
            dangerouslyDisableResponsiveness
            disablePortal={disablePortal}
            hideOverlay={!showOverlay}
            onClick={handleCaptureEvents}
            onOverlayPress={onClose}
            testID="popover-panel-modal"
            visible={visible}
            {...controlledElementAccessibilityProps}
          >
            <FocusTrap
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
        maxPanelHeight: maxHeight,
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
      const [panelContentRef, panelBounds] = useMeasure();
      const [triggerRef, triggerBounds] = useMeasure();

      const combinedContentPosition = useMemo(
        () => ({ ...defaultPopoverContentPositionConfig, ...contentPosition }),
        [contentPosition],
      );

      const { panelMaxHeight } = useResponsivePanelMaxHeight({
        gap: combinedContentPosition.gap,
        panelBounds,
        maxHeight,
        visible,
        placement: combinedContentPosition.placement,
      });

      const memoizedContent = useMemo(
        () => (
          <PopoverPanelContent
            ref={panelContentRef}
            className={classNames?.content}
            height={height}
            maxHeight={panelMaxHeight}
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
          panelContentRef,
          classNames?.content,
          height,
          panelMaxHeight,
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
          className={cx(!block && triggerContainerCss, className, classNames?.triggerContainer)}
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
 * Anchored floating panel with the same layout and styling as {@link Dropdown}, built on {@link Popover}
 * and {@link PopoverPanelContent}, without select context. Use for custom panel content; for list
 * selection with `MenuItem` and `SelectContext`, use {@link Dropdown} or wire actions manually.
 *
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
