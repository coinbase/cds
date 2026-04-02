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
import { useResponsiveHeight } from '../../dropdown/useResponsiveHeight';
import { useBreakpoints } from '../../hooks/useBreakpoints';
import { Box } from '../../layout';
import { FocusTrap } from '../FocusTrap';
import { ModalWrapper } from '../modal/ModalWrapper';

import { Popover } from './Popover';
import { PopoverPanelContent } from './PopoverPanelContent';
import type { PopoverContentPositionConfig, PopoverProps } from './PopoverProps';

export type PopoverPanelRef = {
  openPopover: () => void;
  closePopover: () => void;
};

export type PopoverPanelRenderContent = (api: { closePopover: () => void }) => React.ReactNode;

export type PopoverPanelProps = {
  /**
   * Enable to have PopoverPanel render its content inside a Modal as opposed to a relatively positioned Popover.
   * Ideal for mobile or smaller devices.
   */
  enableMobileModal?: boolean;
  /**
   * Width of the panel as a percentage string or number converted to pixels.
   */
  panelWidth?: React.CSSProperties['width'];
  /** Minimum width of the panel as a percentage string or number converted to pixels. */
  minPanelWidth?: React.CSSProperties['minWidth'];
  /** Maximum width of the panel as a percentage string or number converted to pixels. */
  maxPanelWidth?: React.CSSProperties['maxWidth'];
  /** Can optionally pass a maxHeight.
   * @default 300
   */
  maxPanelHeight?: React.CSSProperties['maxHeight'];
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
  styles?: {
    /** Inline styles for the elevated panel surface (`PopoverPanelContent`). */
    content?: React.CSSProperties;
    /** Inline styles for the wrapper around `children` (the `Popover` root in floating layout, or the trigger `Box` in the mobile modal). */
    triggerContainer?: React.CSSProperties;
  };
  classNames?: {
    /** Additional class name merged onto the panel surface (`PopoverPanelContent`). */
    content?: string;
    /** Additional class name merged onto the wrapper around `children` (same targets as `styles.triggerContainer`). */
    triggerContainer?: string;
  };
} & Pick<
  PopoverProps,
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
  >;

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

const MobilePopoverPanel = memo(
  forwardRef<PopoverPanelRef, PopoverPanelInternalProps>(
    (
      {
        children,
        onOpen = NOOP,
        onClose = NOOP,
        content,
        disablePortal,
        visible,
        panelWidth,
        minPanelWidth,
        maxPanelWidth,
        maxPanelHeight,
        disabled,
        controlledElementAccessibilityProps,
        respectNegativeTabIndex,
        restoreFocusOnUnmount,
        styles,
        classNames,
      },
      ref,
    ) => {
      usePopoverPanelImperativeHandle(ref, onOpen, onClose);

      return (
        <>
          <ModalWrapper
            dangerouslyDisableResponsiveness
            disablePortal={disablePortal}
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
          <Box
            className={classNames?.triggerContainer}
            onClick={disabled ? undefined : onOpen}
            onKeyDown={onOpen}
            style={styles?.triggerContainer}
          >
            {children}
          </Box>
        </>
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
        panelWidth,
        minPanelWidth: minWidth,
        maxPanelWidth: maxWidth,
        maxPanelHeight: maxHeight,
        testID,
        disablePortal,
        onBlur,
        contentPosition = defaultPopoverContentPositionConfig,
        block,
        disabled,
        restoreFocusOnUnmount,
        styles,
        classNames,
        ...props
      },
      ref,
    ) => {
      const [panelContentRef, dropdownBounds] = useMeasure();
      const [triggerRef, triggerBounds] = useMeasure();

      const combinedContentPosition = useMemo(
        () => ({ ...defaultPopoverContentPositionConfig, ...contentPosition }),
        [contentPosition],
      );

      const { dropdownHeight } = useResponsiveHeight({
        gap: combinedContentPosition.gap,
        dropdownBounds,
        maxHeight,
        visible,
        placement: combinedContentPosition.placement,
      });

      const memoizedContent = useMemo(
        () => (
          <PopoverPanelContent
            ref={panelContentRef}
            className={classNames?.content}
            maxHeight={dropdownHeight}
            maxWidth={maxWidth}
            minWidth={minWidth}
            placement={combinedContentPosition.placement}
            style={styles?.content}
            width={panelWidth ?? triggerBounds.width}
          >
            {content}
          </PopoverPanelContent>
        ),
        [
          panelContentRef,
          dropdownHeight,
          maxWidth,
          minWidth,
          combinedContentPosition.placement,
          triggerBounds.width,
          panelWidth,
          content,
          styles?.content,
          classNames?.content,
        ],
      );

      usePopoverPanelImperativeHandle(ref, onOpen, onClose);

      return (
        <Popover
          ref={triggerRef}
          block={block}
          className={cx(triggerContainerCss, classNames?.triggerContainer)}
          content={disabled ? undefined : memoizedContent}
          contentPosition={combinedContentPosition}
          disablePortal={disablePortal}
          disabled={disabled}
          onBlur={onBlur}
          onClose={onClose}
          onPressSubject={!visible ? onOpen : undefined}
          restoreFocusOnUnmount={restoreFocusOnUnmount}
          showOverlay={showOverlay}
          style={styles?.triggerContainer}
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
export const PopoverPanel = forwardRef<PopoverPanelRef, PopoverPanelProps>(
  (
    {
      children,
      content,
      maxPanelHeight = POPOVER_PANEL_MAX_HEIGHT,
      enableMobileModal,
      onOpen,
      onClose,
      restoreFocusOnUnmount = true,
      ...props
    },
    ref,
  ) => {
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
      () =>
        typeof content === 'function' ? content({ closePopover: handleClosePopover }) : content,
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
  },
);
