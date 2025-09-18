import React, { forwardRef, memo, useEffect } from 'react';
import { css } from '@linaria/core';

import { NewAnimatePresence } from '../../animation/NewAnimatePresence';
import { cx } from '../../cx';
import { useScrollBlocker } from '../../hooks/useScrollBlocker';
import { Box, type BoxDefaultElement, type BoxProps } from '../../layout/Box';
import { media } from '../../styles/media';
import { Overlay } from '../overlay/Overlay';
import { Portal, type PortalProps } from '../Portal';
import { modalContainerId } from '../PortalProvider';

const modalOverlayResponsiveCss = css`
  @media ${media.phone} {
    display: none;
  }
`;

export type ModalWrapperBaseProps = {
  /**
   * Disable overlay click that closes the Modal
   * @default false
   */
  disableOverlayPress?: boolean;
  /**
   * Disable responsiveness so it maintains the same UI across different viewports.
   * @danger This is a migration escape hatch. It is not intended to be used normally.
   * @default false
   */
  dangerouslyDisableResponsiveness?: boolean;
  /**
   * Callback function fired when the overlay is pressed.
   */
  onOverlayPress?: (() => void) | undefined;
  /**
   * Configure if the overlay should be visible/hidden
   * @default false
   */
  hideOverlay?: boolean;
  /**
   * WAI-ARIA Roles
   * @link https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Roles
   */
  role?: Extract<React.AriaRole, 'dialog' | 'alertdialog'>;
  /**
   * Controls visibility of the Modal
   * @default false
   */
  visible: boolean;
  /**
   * Callback fired after the component is closed.
   */
  onDidClose?: () => void;
} & Pick<PortalProps, 'disablePortal'>;

export type ModalWrapperProps = ModalWrapperBaseProps & BoxProps<BoxDefaultElement>;

export const ModalWrapper = memo(
  forwardRef(
    (
      {
        alignItems = 'center',
        'aria-modal': ariaModal,
        children,
        visible = false,
        disablePortal = false,
        disableOverlayPress = false,
        dangerouslyDisableResponsiveness = false,
        height = '100vh',
        justifyContent = 'center',
        position = 'fixed',
        pin = 'all',
        onOverlayPress,
        onDidClose,
        hideOverlay = false,
        role = 'dialog',
        width = '100vw',
        ...props
      }: ModalWrapperProps,
      ref: React.ForwardedRef<HTMLDivElement>,
    ) => {
      const blockScroll = useScrollBlocker();

      // prevent body scroll when modal is open
      useEffect(() => {
        blockScroll(visible);

        return () => {
          blockScroll(false);
        };
      }, [visible, blockScroll]);

      return (
        <NewAnimatePresence onExitComplete={onDidClose}>
          {!!visible && (
            <Portal containerId={modalContainerId} disablePortal={disablePortal}>
              <Box
                ref={ref}
                alignItems={alignItems}
                aria-modal={ariaModal ?? 'true'}
                height={height}
                justifyContent={justifyContent}
                pin={pin}
                position={position}
                role={role}
                width={width}
                {...props}
              >
                <>
                  {!hideOverlay && (
                    <Overlay
                      animated
                      className={cx(!dangerouslyDisableResponsiveness && modalOverlayResponsiveCss)}
                      onClick={!disableOverlayPress ? onOverlayPress : undefined}
                      testID="modal-overlay"
                    />
                  )}
                  {/* NOTE: Add position or zIndex to children to avoid displaying under overlay
                   * https://www.freecodecamp.org/news/z-index-explained-how-to-stack-elements-using-css-7c5aa0f179b3/
                   */}
                  {children}
                </>
              </Box>
            </Portal>
          )}
        </NewAnimatePresence>
      );
    },
  ),
);
