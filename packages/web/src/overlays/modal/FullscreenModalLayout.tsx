import React, { forwardRef, memo } from 'react';
import {
  animateInOpacityConfig,
  animateInOverlayOpacityConfig,
  animateInTranslateYConfig,
  animateOutOpacityConfig,
  animateOutOverlayOpacityConfig,
  animateOutTranslateYConfig,
} from '@coinbase/cds-common/animation/fullscreenModal';
import {
  OverlayContentContext,
  type OverlayContentContextValue,
} from '@coinbase/cds-common/overlays/OverlayContentContext';
import { css } from '@linaria/core';
import { m as motion } from 'framer-motion';

import { useMotionProps } from '../../motion/useMotionProps';
import { FocusTrap, type FocusTrapProps } from '../FocusTrap';
import { Overlay } from '../overlay/Overlay';

import type { ModalProps } from './Modal';
import { ModalWrapper } from './ModalWrapper';

export type FullscreenModalLayoutBaseProps = Pick<
  ModalProps,
  | 'visible'
  | 'onRequestClose'
  | 'disablePortal'
  | 'accessibilityLabel'
  | 'accessibilityLabelledBy'
  | 'testID'
  | 'zIndex'
  | 'role'
  | 'onDidClose'
  | 'shouldCloseOnEscPress'
  | 'disableFocusTrap'
  | 'focusTabIndexElements'
  | 'restoreFocusOnUnmount'
> &
  Pick<FocusTrapProps, 'disableFocusTrap' | 'focusTabIndexElements'> & {
    children: React.ReactElement;
  };

export type FullscreenModalLayoutProps = FullscreenModalLayoutBaseProps;

const pinCss = css`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
`;

const overlayContentContextValue: OverlayContentContextValue = {
  isModal: true,
};

export const FullscreenModalLayout = memo(
  forwardRef<HTMLDivElement, FullscreenModalLayoutProps>(function FullscreenModalLayout(
    {
      children,
      focusTabIndexElements,
      visible,
      onRequestClose,
      testID,
      zIndex,
      disablePortal,
      role,
      onDidClose,
      shouldCloseOnEscPress = true,
      disableFocusTrap,
      restoreFocusOnUnmount = true,
      accessibilityLabelledBy,
      accessibilityLabel,
    },
    ref,
  ) {
    const overlayMotionProps = useMotionProps({
      enterConfigs: [animateInOverlayOpacityConfig],
      exitConfigs: [animateOutOverlayOpacityConfig],
      exit: 'exit',
    });

    const dialogMotionProps = useMotionProps({
      enterConfigs: [animateInOpacityConfig, animateInTranslateYConfig],
      exitConfigs: [animateOutOpacityConfig, animateOutTranslateYConfig],
      exit: 'exit',
    });

    return (
      <OverlayContentContext.Provider value={overlayContentContextValue}>
        <ModalWrapper
          ref={ref}
          hideOverlay
          accessibilityLabel={accessibilityLabel}
          accessibilityLabelledBy={accessibilityLabelledBy}
          disablePortal={disablePortal}
          onDidClose={onDidClose}
          role={role}
          testID={testID}
          visible={visible}
          zIndex={zIndex}
        >
          <motion.div {...overlayMotionProps}>
            <Overlay />
          </motion.div>
          <motion.div {...dialogMotionProps} className={pinCss}>
            <FocusTrap
              disableFocusTrap={disableFocusTrap}
              focusTabIndexElements={focusTabIndexElements}
              onEscPress={shouldCloseOnEscPress ? onRequestClose : undefined}
              restoreFocusOnUnmount={restoreFocusOnUnmount}
            >
              {children}
            </FocusTrap>
          </motion.div>
        </ModalWrapper>
      </OverlayContentContext.Provider>
    );
  }),
);
