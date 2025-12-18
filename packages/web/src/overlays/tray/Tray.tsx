import React, {
  forwardRef,
  memo,
  useCallback,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from 'react';
import type { SharedAccessibilityProps } from '@coinbase/cds-common';
import {
  OverlayContentContext,
  type OverlayContentContextValue,
} from '@coinbase/cds-common/overlays/OverlayContentContext';
import { m, useAnimation } from 'framer-motion';

import { IconButton } from '../../buttons';
import { useScrollBlocker } from '../../hooks/useScrollBlocker';
import { Box, HStack } from '../../layout';
import { VStack } from '../../layout/VStack';
import { Text } from '../../typography/Text';
import { FocusTrap } from '../FocusTrap';
import { Overlay } from '../overlay/Overlay';
import { Portal } from '../Portal';
import { trayContainerId } from '../PortalProvider';

export type TrayRenderChildren = React.FC<{ handleClose: () => void }>;

export type TrayBaseProps = {
  children: React.ReactNode | TrayRenderChildren;
  /** ReactNode to render as the Drawer header */
  header?: React.ReactNode;
  /** ReactNode to render as the Drawer footer */
  footer?: React.ReactNode;
  /** HTML ID for the tray */
  id?: string;
  /** Callback fired when the overlay is pressed, or swipe to close */
  onBlur?: () => void;
  /** Action that will happen when tray is dismissed */
  onClose?: () => void;
  /** Action that will happen when tray is dismissed */
  onCloseComplete: () => void;
  /**
   * Optional callback that, if provided, will be triggered when the Tray is toggled open/ closed
   * If used for analytics, context ('visible' | 'hidden') can be bundled with the event info to track whether the
   * multiselect was toggled into or out of view
   */
  onVisibilityChange?: (context: 'visible' | 'hidden') => void;
  /** Prevents a user from dismissing the tray by pressing the overlay or swiping */
  preventDismiss?: boolean;
  /**
   * WAI-ARIA Roles
   * @link https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Roles
   */
  role?: Extract<React.AriaRole, 'dialog' | 'alertdialog'>;
  /** Text or ReactNode for optional Tray title */
  title?: React.ReactNode;
  /**
   * Allow user of component to define maximum percentage of screen that can be taken up by the Drawer
   * @example if you want a Drawer to take up 50% of the screen, you would pass a value of `"50%"`
   */
  verticalDrawerPercentageOfView?: string;
  /** z-index for the tray overlay */
  zIndex?: number;
  /**
   * Allow any element with `tabIndex` attribute to be focusable in FocusTrap, rather than only focusing specific interactive element types like button.
   * This can be useful when having long content in a Modal.
   * @default false
   */
  focusTabIndexElements?: boolean;
  /**
   * If `true`, the focus trap will restore focus to the previously focused element when it unmounts.
   *
   * WARNING: If you disable this, you need to ensure that focus is restored properly so it doesn't end up on the body
   * @default true
   */
  restoreFocusOnUnmount?: boolean;
  /**
   * Sets an accessible label for the close button.
   * On web, maps to `aria-label` and defines a string value that labels an interactive element.
   * On mobile, VoiceOver will read this string when a user selects the associated element.
   * @link https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-label
   * @link https://reactnative.dev/docs/accessibility#accessibilitylabel
   */
  closeAccessibilityLabel?: SharedAccessibilityProps['accessibilityLabel'];
  /**
   * Sets an accessible hint or description for the close button.
   * On web, maps to `aria-describedby` and lists the id(s) of the element(s) that describe the element on which the attribute is set.
   * On mobile, a string that helps users understand what will happen when they perform an action on the accessibility element
   * when that result is not clear from the accessibility label.
   * @link https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-describedby
   * @link https://reactnative.dev/docs/accessibility#accessibilityhint
   */
  closeAccessibilityHint?: SharedAccessibilityProps['accessibilityHint'];
} & Pick<SharedAccessibilityProps, 'accessibilityLabel'>;

// Animation constants
const ANIMATIONS = {
  SLIDE_IN: {
    y: 0,
    transition: { duration: 0.3 },
  },
  SLIDE_OUT: {
    y: '100%',
    transition: { duration: 0.3 },
  },
  SNAP_BACK: {
    y: 0,
    transition: {
      type: 'spring',
      stiffness: 300,
      damping: 30,
    },
  },
};

// Extended props for web-specific functionality
export type TrayProps = TrayBaseProps;

// Extended ref type for web implementation
export type TrayRefProps = {
  close: () => void;
};

export const Tray = memo(
  forwardRef<TrayRefProps, TrayProps>(function Tray(
    {
      children,
      header,
      footer,
      title,
      onVisibilityChange,
      verticalDrawerPercentageOfView = '85%',
      onBlur,
      onClose,
      onCloseComplete,
      preventDismiss = false,
      id,
      role = 'dialog',
      accessibilityLabel = 'Tray',
      focusTabIndexElements = false,
      restoreFocusOnUnmount = true,
      closeAccessibilityLabel = 'Close',
      closeAccessibilityHint,
    },
    ref,
  ) {
    const [isOpen, setIsOpen] = useState(true);
    const trayRef = useRef<HTMLDivElement>(null);
    const controls = useAnimation();

    const blockScroll = useScrollBlocker();

    // prevent body scroll when modal is open
    useEffect(() => {
      blockScroll(isOpen);

      return () => {
        blockScroll(false);
      };
    }, [isOpen, blockScroll]);

    // Setup initial animation
    useEffect(() => {
      controls.start(ANIMATIONS.SLIDE_IN);
    }, [controls]);

    // Unified dismissal function
    const handleClose = useCallback(() => {
      // Run the animation
      controls.start(ANIMATIONS.SLIDE_OUT).then(() => {
        // Then set state after animation completes
        setIsOpen(false);
        onClose?.();
        onCloseComplete?.();
      });
    }, [onClose, onCloseComplete, controls]);

    const handleOverlayPress = useCallback(() => {
      if (!preventDismiss) {
        onBlur?.();
        handleClose();
      }
    }, [handleClose, preventDismiss, onBlur]);

    // Use imperative handle for cleaner ref implementation
    useImperativeHandle(
      ref,
      () => ({
        close: handleClose,
      }),
      [handleClose],
    );

    // Handle visibility changes
    useEffect(() => {
      onVisibilityChange?.('visible');
      return () => {
        onVisibilityChange?.('hidden');
      };
    }, [onVisibilityChange]);

    const overlayContentContextValue: OverlayContentContextValue = {
      isDrawer: true,
    };

    if (!isOpen) return null;

    return (
      <OverlayContentContext.Provider value={overlayContentContextValue}>
        <Portal containerId={trayContainerId}>
          <Box height="100vh" pin="all" position="fixed" width="100vw">
            <Overlay onClick={handleOverlayPress} testID="tray-overlay" />
            <FocusTrap
              focusTabIndexElements={focusTabIndexElements}
              onEscPress={preventDismiss ? undefined : handleClose}
              restoreFocusOnUnmount={restoreFocusOnUnmount}
            >
              <m.div
                animate={controls}
                initial={{ y: '100%' }}
                style={{
                  width: '100%',
                  position: 'absolute',
                  bottom: 0,
                  left: 0,
                  right: 0,
                  zIndex: 1,
                  maxHeight: verticalDrawerPercentageOfView,
                  overflowY: 'auto',
                }}
                tabIndex={0}
              >
                <VStack
                  ref={trayRef}
                  accessibilityLabel={accessibilityLabel}
                  alignItems="center"
                  aria-modal="true"
                  background="bg"
                  borderTopLeftRadius={400}
                  borderTopRightRadius={400}
                  data-testid="tray"
                  height="100%"
                  id={id}
                  justifyContent="center"
                  minHeight={200}
                  onClick={(e) => e.stopPropagation()}
                  role={role}
                >
                  <VStack maxWidth="70em" paddingX={6} width="100%">
                    {header}
                    <HStack
                      alignItems="center"
                      justifyContent={title ? 'space-between' : 'flex-end'}
                      paddingBottom={1}
                      paddingTop={3}
                      position="sticky"
                      top={0}
                    >
                      {title &&
                        (typeof title === 'string' ? <Text font="title3">{title}</Text> : title)}
                      {!preventDismiss && (
                        <IconButton
                          transparent
                          accessibilityHint={closeAccessibilityHint}
                          accessibilityLabel={closeAccessibilityLabel}
                          name="close"
                          onClick={handleClose}
                          testID="tray-close-button"
                        />
                      )}
                    </HStack>
                    <VStack
                      minHeight={0}
                      paddingBottom={2}
                      paddingTop={1}
                      style={{
                        overflowY: 'auto',
                      }}
                    >
                      {typeof children === 'function' ? children({ handleClose }) : children}
                    </VStack>
                    {footer}
                  </VStack>
                </VStack>
              </m.div>
            </FocusTrap>
          </Box>
        </Portal>
      </OverlayContentContext.Provider>
    );
  }),
);
