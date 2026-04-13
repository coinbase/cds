import React, { forwardRef, memo, useCallback, useImperativeHandle, useMemo } from 'react';
import {
  animateInOpacityConfig,
  animateInScaleConfig,
  animateOutOpacityConfig,
  animateOutScaleConfig,
} from '@coinbase/cds-common/animation/modal';
import { ModalContext, type ModalContextValue } from '@coinbase/cds-common/overlays/ModalContext';
import {
  OverlayContentContext,
  type OverlayContentContextValue,
} from '@coinbase/cds-common/overlays/OverlayContentContext';
import { zIndex } from '@coinbase/cds-common/tokens/zIndex';
import type { PositionStyles, SharedProps } from '@coinbase/cds-common/types';
import type { Position } from '@coinbase/cds-common/types/Position';
import { css } from '@linaria/core';
import { m as motion } from 'framer-motion';

import { cx } from '../../cx';
import { useA11yLabels } from '../../hooks/useA11yLabels';
import { useComponentConfig } from '../../hooks/useComponentConfig';
import { Box } from '../../layout';
import { VStack } from '../../layout/VStack';
import { useMotionProps } from '../../motion/useMotionProps';
import { media } from '../../styles/media';
import { FocusTrap, type FocusTrapProps } from '../FocusTrap';

import type { ModalWrapperProps } from './ModalWrapper';
import { ModalWrapper } from './ModalWrapper';

const modalMaxWidth = 612;
const defaultWidthStyle = { tablet: 'auto', desktop: modalMaxWidth };
const defaultMaxWidthStyle = { tablet: modalMaxWidth };

const baseCss = css`
  position: absolute;
  max-height: calc(100vh - var(--space-10) * 2);
  @supports (height: 100dvh) {
    max-height: calc(100dvh - var(--space-10) * 2);
  }
  display: flex;
  justify-content: center;
  /* this makes sure modal dialogue displays on top of overlay */
  z-index: ${zIndex.modal};
`;

const modalDialogResponsiveCss = css`
  @media ${media.phone} {
    border-radius: var(--borderRadius-0);
  }
`;

const modalResponsiveCss = css`
  @media ${media.tablet} {
    margin-inline-start: var(--space-3);
    margin-inline-end: var(--space-3);
  }

  @media ${media.phone} {
    max-height: 100vh;
    max-height: 100dvh;
    top: 0;
    bottom: 0;
    right: 0;
    left: 0;
    margin-inline-start: 0;
    margin-inline-end: 0;
  }
`;

const MotionBox = motion(Box);

const overlayContentContextValue: OverlayContentContextValue = {
  isModal: true,
};

type ModalChildrenRenderProps = { closeModal: () => void };

export type ModalBaseProps = SharedProps &
  ModalContextValue &
  Pick<PositionStyles, 'zIndex'> &
  Omit<ModalWrapperProps, 'onOverlayPress'> &
  Pick<
    FocusTrapProps,
    'disableFocusTrap' | 'focusTabIndexElements' | 'disableArrowKeyNavigation'
  > & {
    /** Component to render as the Modal content */
    children?: React.ReactNode | React.FC<ModalChildrenRenderProps>;
    /**
     * Callback fired after the component is closed.
     */
    onDidClose?: () => void;
    /**
     * If pressing the esc key should close the modal
     * @default true
     */
    shouldCloseOnEscPress?: boolean;
    /**
     * Set the position for the modal dialogue
     * @danger This is a migration escape hatch. It is not intended to be used normally.
     */
    dangerouslySetPosition?: Position;
    /**
     * If `true`, the focus trap will restore focus to the previously focused element when it unmounts.
     *
     * WARNING: If you disable this, you need to ensure that focus is restored properly so it doesn't end up on the body
     * @default true
     */
    restoreFocusOnUnmount?: boolean;
  };

export type ModalProps = ModalBaseProps;

export type ModalRefBaseProps = Pick<ModalBaseProps, 'onRequestClose'>;

export const Modal = memo(
  forwardRef<ModalRefBaseProps, ModalProps>((_props, ref) => {
    const mergedProps = useComponentConfig('Modal', _props);
    const {
      children,
      visible = false,
      onRequestClose,
      disableOverlayPress = false,
      disablePortal = false,
      disableFocusTrap,
      accessibilityLabelledBy,
      accessibilityLabel,
      focusTabIndexElements = false,
      restoreFocusOnUnmount = true,
      disableArrowKeyNavigation,
      width,
      dangerouslyDisableResponsiveness = false,
      dangerouslySetPosition,
      shouldCloseOnEscPress = true,
      hideCloseButton,
      hideDividers,
      maxWidth,
      ...props
    } = mergedProps;
    const defaultWidth = dangerouslyDisableResponsiveness ? modalMaxWidth : defaultWidthStyle;
    const defaultMaxWidth = dangerouslyDisableResponsiveness ? undefined : defaultMaxWidthStyle;
    const { labelledBySource, labelledBy, label } = useA11yLabels({
      accessibilityLabelledBy,
      accessibilityLabel,
    });

    const motionProps = useMotionProps({
      enterConfigs: [animateInOpacityConfig, animateInScaleConfig],
      exitConfigs: [animateOutOpacityConfig, animateOutScaleConfig],
      exit: 'exit',
    });

    const handleClose = useCallback(() => {
      onRequestClose?.();
    }, [onRequestClose]);

    useImperativeHandle(
      ref,
      () => ({
        onRequestClose: handleClose,
      }),
      [handleClose],
    );

    const modalData = useMemo(
      () => ({
        visible,
        onRequestClose: handleClose,
        accessibilityLabelledBy: labelledBySource,
        hideCloseButton,
        hideDividers,
      }),
      [visible, handleClose, labelledBySource, hideCloseButton, hideDividers],
    );

    // TODO: remove render props as we no longer need the method to close modal
    const renderChildrenProps = useMemo(() => ({ closeModal: handleClose }), [handleClose]);

    const dialogStyles = useMemo<React.CSSProperties>(
      () => ({ position: dangerouslySetPosition }),
      [dangerouslySetPosition],
    );

    return (
      <OverlayContentContext.Provider value={overlayContentContextValue}>
        <ModalWrapper
          accessibilityLabel={label}
          accessibilityLabelledBy={labelledBy}
          dangerouslyDisableResponsiveness={dangerouslyDisableResponsiveness}
          disableOverlayPress={disableOverlayPress}
          disablePortal={disablePortal}
          onOverlayPress={handleClose}
          visible={visible}
          {...props}
        >
          <MotionBox
            {...motionProps}
            className={cx(baseCss, !dangerouslyDisableResponsiveness && modalResponsiveCss)}
            maxWidth={maxWidth ?? defaultMaxWidth}
            style={dialogStyles}
            testID="modal-dialog-motion"
            width={width ?? defaultWidth}
          >
            <FocusTrap
              disableArrowKeyNavigation={disableArrowKeyNavigation}
              disableFocusTrap={disableFocusTrap}
              focusTabIndexElements={focusTabIndexElements}
              onEscPress={shouldCloseOnEscPress ? handleClose : undefined}
              restoreFocusOnUnmount={restoreFocusOnUnmount}
            >
              <VStack
                borderRadius={200}
                className={cx(!dangerouslyDisableResponsiveness && modalDialogResponsiveCss)}
                elevation={2}
                overflow="hidden"
                width="100%"
              >
                <ModalContext.Provider value={modalData}>
                  {typeof children === 'function' ? children(renderChildrenProps) : children}
                </ModalContext.Provider>
              </VStack>
            </FocusTrap>
          </MotionBox>
        </ModalWrapper>
      </OverlayContentContext.Provider>
    );
  }),
);
