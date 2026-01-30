import React, {
  forwardRef,
  memo,
  useCallback,
  useEffect,
  useImperativeHandle,
  useMemo,
  useRef,
  useState,
} from 'react';
import type { PinningDirection, SharedAccessibilityProps, ThemeVars } from '@coinbase/cds-common';
import {
  DISMISSAL_DRAG_THRESHOLD,
  DISMISSAL_VELOCITY_THRESHOLD,
  MAX_OVER_DRAG,
} from '@coinbase/cds-common/animation/drawer';
import {
  OverlayContentContext,
  type OverlayContentContextValue,
} from '@coinbase/cds-common/overlays/OverlayContentContext';
import { m as motion, useAnimation } from 'framer-motion';

import { IconButton } from '../../buttons';
import { useScrollBlocker } from '../../hooks/useScrollBlocker';
import { useTheme } from '../../hooks/useTheme';
import { Box, HStack } from '../../layout';
import { VStack } from '../../layout/VStack';
import type { ResponsiveProp } from '../../styles/styleProps';
import { Text } from '../../typography/Text';
import { FocusTrap } from '../FocusTrap';
import { HandleBar } from '../handlebar/HandleBar';
import { Overlay } from '../overlay/Overlay';
import { Portal } from '../Portal';
import { trayContainerId } from '../PortalProvider';

const MotionBox = motion(Box);

export type TrayRenderChildren = React.FC<{ handleClose: () => void }>;

export type TrayBaseProps = {
  children?: React.ReactNode | TrayRenderChildren;
  /** ReactNode to render as the Drawer header. Can be a ReactNode or a function that receives { handleClose }. */
  header?: React.ReactNode | TrayRenderChildren;
  /** ReactNode to render as the Drawer footer. Can be a ReactNode or a function that receives { handleClose }. */
  footer?: React.ReactNode | TrayRenderChildren;
  /** HTML ID for the tray */
  id?: string;
  /**
   * Pin the tray to one side of the screen
   * @default 'bottom'
   */
  pin?: PinningDirection;
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
  /** Hide the header of the tray */
  hideHeader?: boolean;
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
   * Allow user of component to define maximum percentage of screen that can be taken up by the Drawer when pinned to the bottom or top
   * @example if you want a Drawer to take up 50% of the screen, you would pass a value of `"50%"`
   * @default "85%"
   */
  verticalDrawerPercentageOfView?: string;
  /** z-index for the tray overlay */
  zIndex?: number;
  /**
   * Allow any element with `tabIndex` attribute to be focusable in FocusTrap, rather than only focusing specific interactive element types like button.
   * This can be useful when having long content in a Modal.
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
  /**
   * Show a handle bar indicator at the top of the tray.
   * The handle bar is positioned inside the tray content area.
   * Only appears when `pin="bottom"`.
   *
   * When enabled, the handle bar provides swipe-to-dismiss functionality (drag down to close)
   * and is keyboard accessible (Tab to focus, Enter/Space to close).
   * The close button is hidden by default when the handle bar is shown.
   */
  showHandleBar?: boolean;
  /**
   * Hide the close icon on the top right.
   * Defaults to `true` when `showHandleBar` is enabled (since the handle bar provides close functionality).
   * Set explicitly to `false` to show both the handle bar and close button.
   */
  hideCloseButton?: boolean;
} & Pick<SharedAccessibilityProps, 'accessibilityLabel'>;

export type TrayProps = TrayBaseProps & {
  /** Inline styles for the tray elements */
  styles?: {
    /** Styles for the root container element */
    root?: React.CSSProperties;
    /** Styles for the overlay backdrop */
    overlay?: React.CSSProperties;
    /** Styles for the animated sliding container */
    container?: React.CSSProperties;
    /** Styles for the header section */
    header?: React.CSSProperties;
    /** Styles for the title text */
    title?: React.CSSProperties;
    /** Styles for the content area */
    content?: React.CSSProperties;
    /** Styles for the footer section */
    footer?: React.CSSProperties;
    /** Styles for the handle bar container */
    handleBar?: React.CSSProperties;
    /** Styles for the handle bar element */
    handleBarHandle?: React.CSSProperties;
  };
  /** Class names for the tray elements */
  classNames?: {
    /** Class name for the root container element */
    root?: string;
    /** Class name for the overlay backdrop */
    overlay?: string;
    /** Class name for the animated sliding container */
    container?: string;
    /** Class name for the header section */
    header?: string;
    /** Class name for the title text */
    title?: string;
    /** Class name for the content area */
    content?: string;
    /** Class name for the footer section */
    footer?: string;
    /** Class name for the handle bar container */
    handleBar?: string;
    /** Class name for the handle bar element */
    handleBarHandle?: string;
  };
};

// Extended ref type for web implementation
export type TrayRefProps = {
  close: () => void;
};

const animationConfig = {
  slideIn: {
    transition: { duration: 0.3 },
  },
  slideOut: {
    transition: { duration: 0.3 },
  },
};

const overlayContentContextValue: OverlayContentContextValue = {
  isDrawer: true,
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
      hideHeader,
      preventDismiss,
      id,
      role = 'dialog',
      accessibilityLabel = 'Tray',
      focusTabIndexElements,
      restoreFocusOnUnmount = true,
      closeAccessibilityLabel = 'Close',
      closeAccessibilityHint,
      styles,
      classNames,
      zIndex,
      pin = 'bottom',
      showHandleBar,
      hideCloseButton,
      ...props
    },
    ref,
  ) {
    const theme = useTheme();
    const [isOpen, setIsOpen] = useState(true);
    const [hasScrolledDown, setHasScrolledDown] = useState(false);
    const trayRef = useRef<HTMLDivElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);
    const controls = useAnimation();
    const isSideTray = pin === 'right' || pin === 'left';
    const horizontalPadding: ResponsiveProp<ThemeVars.Space> = useMemo(
      () => (pin !== 'bottom' || showHandleBar ? { base: 4, phone: 3 } : 6),
      [showHandleBar, pin],
    );

    const blockScroll = useScrollBlocker();
    useEffect(() => {
      blockScroll(isOpen);
      return () => blockScroll(false);
    }, [isOpen, blockScroll]);

    // Initialize animation
    useEffect(() => {
      controls.start({
        ...animationConfig.slideIn,
        ...(isSideTray ? { x: 0 } : { y: 0 }),
      });
    }, [controls, isSideTray]);

    useEffect(() => {
      onVisibilityChange?.('visible');
      return () => onVisibilityChange?.('hidden');
    }, [onVisibilityChange]);

    // Scroll-based header border using IntersectionObserver
    // Only updates state when the value actually changes
    useEffect(() => {
      const content = contentRef.current;
      if (!content || typeof IntersectionObserver === 'undefined') return;

      // Create sentinel element at the top of content
      const sentinel = document.createElement('div');
      sentinel.style.height = '1px';
      sentinel.style.width = '100%';
      sentinel.style.position = 'absolute';
      sentinel.style.top = '0';
      sentinel.style.pointerEvents = 'none';
      content.style.position = 'relative';
      content.prepend(sentinel);

      const observer = new IntersectionObserver(
        ([entry]) => {
          const isScrolled = !entry.isIntersecting;
          // Only update state when value changes
          setHasScrolledDown((prev) => (prev !== isScrolled ? isScrolled : prev));
        },
        { root: content, threshold: 0 },
      );

      observer.observe(sentinel);

      return () => {
        observer.disconnect();
        sentinel.remove();
      };
    }, []);

    const handleClose = useCallback(() => {
      controls
        .start({
          ...animationConfig.slideOut,
          ...(isSideTray
            ? { x: pin === 'right' ? '100%' : '-100%' }
            : { y: pin === 'bottom' ? '100%' : '-100%' }),
        })
        .then(() => {
          setIsOpen(false);
          onClose?.();
          onCloseComplete?.();
        });
    }, [controls, isSideTray, pin, onClose, onCloseComplete]);

    // Swipe-to-close animation (faster, no friction - matching mobile)
    const handleSwipeClose = useCallback(() => {
      controls
        .start({
          y: '100%',
          transition: { duration: 0.15, ease: 'easeOut' },
        })
        .then(() => {
          setIsOpen(false);
          onBlur?.();
          onClose?.();
          onCloseComplete?.();
        });
    }, [controls, onBlur, onClose, onCloseComplete]);

    useImperativeHandle(ref, () => ({ close: handleClose }), [handleClose]);

    const handleOverlayClick = useCallback(() => {
      if (!preventDismiss) {
        onBlur?.();
        handleClose();
      }
    }, [handleClose, preventDismiss, onBlur]);

    const handleTrayClick = useCallback((event: React.MouseEvent<HTMLDivElement>) => {
      event.stopPropagation();
    }, []);

    // Track drag state for swipe-to-dismiss using native pointer events
    const dragStateRef = useRef<{
      isDragging: boolean;
      startY: number;
      startTime: number;
      lastY: number;
      lastTime: number;
    } | null>(null);

    const handlePointerDown = useCallback(
      (event: React.PointerEvent<HTMLDivElement>) => {
        if (preventDismiss) return;

        // Capture pointer to receive events even if pointer moves outside element
        event.currentTarget.setPointerCapture(event.pointerId);

        dragStateRef.current = {
          isDragging: true,
          startY: event.clientY,
          startTime: Date.now(),
          lastY: event.clientY,
          lastTime: Date.now(),
        };

        console.log('[Tray] Pointer down at Y:', event.clientY);
      },
      [preventDismiss],
    );

    const handlePointerMove = useCallback(
      (event: React.PointerEvent<HTMLDivElement>) => {
        if (preventDismiss || !dragStateRef.current?.isDragging) return;

        const dragY = event.clientY - dragStateRef.current.startY;

        // Update last position for velocity calculation
        dragStateRef.current.lastY = event.clientY;
        dragStateRef.current.lastTime = Date.now();

        console.log('[Tray] Pointer move, offset.y:', dragY);

        // Dragging down (positive Y) - allow full movement
        // Dragging up (negative Y) - apply rubber-band effect capped at MAX_OVER_DRAG
        if (dragY < 0) {
          // Rubber-band effect using tanh for smooth resistance
          const rubberBandY = -MAX_OVER_DRAG * Math.tanh(Math.abs(dragY) / 100);
          controls.set({ y: rubberBandY });
        } else {
          controls.set({ y: dragY });
        }
      },
      [controls, preventDismiss],
    );

    const handlePointerUp = useCallback(
      (event: React.PointerEvent<HTMLDivElement>) => {
        if (preventDismiss || !dragStateRef.current?.isDragging) return;

        // Release pointer capture
        event.currentTarget.releasePointerCapture(event.pointerId);

        const dragState = dragStateRef.current;
        const dragY = event.clientY - dragState.startY;
        const timeDelta = (Date.now() - dragState.lastTime) / 1000; // seconds
        const velocityY = timeDelta > 0 ? (event.clientY - dragState.lastY) / timeDelta / 1000 : 0; // pixels per ms

        dragStateRef.current = null;

        console.log('[Tray] Pointer up, offset.y:', dragY, 'velocity.y:', velocityY);

        console.log(
          '[Tray] Thresholds - drag:',
          DISMISSAL_DRAG_THRESHOLD,
          'velocity:',
          DISMISSAL_VELOCITY_THRESHOLD,
        );

        // Check if drag distance or velocity exceeds threshold for dismissal
        const shouldDismissVal =
          dragY >= DISMISSAL_DRAG_THRESHOLD || velocityY >= DISMISSAL_VELOCITY_THRESHOLD;

        console.log('[Tray] Should dismiss:', shouldDismissVal);

        if (shouldDismissVal) {
          handleSwipeClose();
        } else {
          // Snap back to open position
          controls.start({
            y: 0,
            transition: { duration: 0.2, ease: 'easeOut' },
          });
        }
      },
      [controls, preventDismiss, handleSwipeClose],
    );

    const handlePointerCancel = useCallback(() => {
      if (dragStateRef.current?.isDragging) {
        dragStateRef.current = null;
        // Snap back to open position
        controls.start({
          y: 0,
          transition: { duration: 0.2, ease: 'easeOut' },
        });
      }
    }, [controls]);

    // Handle keyboard activation on handlebar for accessibility dismiss
    const handleHandleBarActivate = useCallback(() => {
      if (!preventDismiss) {
        onBlur?.();
        handleClose();
      }
    }, [handleClose, preventDismiss, onBlur]);

    const initialAnimationValue = useMemo(
      () =>
        isSideTray
          ? { x: pin === 'right' ? '100%' : '-100%' }
          : { y: pin === 'bottom' ? '100%' : '-100%' },
      [isSideTray, pin],
    );

    // Handle bar only shows for bottom-pinned trays (matching mobile behavior)
    const shouldShowHandleBar = showHandleBar && pin === 'bottom';
    const shouldShrinkPadding = pin !== 'bottom' || showHandleBar;

    const animatedContainerStyle = useMemo(
      () => ({
        position: 'absolute',
        zIndex: 1,
        maxHeight: isSideTray ? undefined : verticalDrawerPercentageOfView,
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
        ...styles?.container,
      }),
      [isSideTray, verticalDrawerPercentageOfView, styles?.container],
    );

    // Handle bar uses bgInverse at 40% opacity with smaller width (matching mobile)
    const handleBarHandleStyle: React.CSSProperties = useMemo(
      () => ({
        width: 32,
        backgroundColor: theme.color.bgInverse,
        opacity: 0.4,
        ...styles?.handleBarHandle,
      }),
      [theme.color.bgInverse, styles?.handleBarHandle],
    );

    if (!isOpen) return null;

    return (
      <OverlayContentContext.Provider value={overlayContentContextValue}>
        <Portal containerId={trayContainerId}>
          <Box
            className={classNames?.root}
            height="100vh"
            pin="all"
            position="fixed"
            style={styles?.root}
            width="100vw"
            zIndex={zIndex}
          >
            <Overlay
              className={classNames?.overlay}
              onClick={handleOverlayClick}
              style={styles?.overlay}
              testID="tray-overlay"
            />
            <FocusTrap
              focusTabIndexElements={focusTabIndexElements}
              onEscPress={preventDismiss ? undefined : handleClose}
              restoreFocusOnUnmount={restoreFocusOnUnmount}
            >
              <MotionBox
                animate={controls}
                borderBottomLeftRadius={pin === 'left' || pin === 'bottom' ? 0 : 600}
                borderBottomRightRadius={pin === 'right' || pin === 'bottom' ? 0 : 600}
                borderTopLeftRadius={pin === 'left' || pin === 'top' ? 0 : 600}
                borderTopRightRadius={pin === 'right' || pin === 'top' ? 0 : 600}
                bordered={theme.activeColorScheme === 'dark'}
                className={classNames?.container}
                elevation={2}
                initial={initialAnimationValue}
                pin={pin}
                style={animatedContainerStyle}
                tabIndex={0}
              >
                <VStack
                  ref={trayRef}
                  accessibilityLabel={accessibilityLabel}
                  alignItems="center"
                  aria-modal="true"
                  data-testid="tray"
                  flexGrow={1}
                  id={id}
                  minHeight={0}
                  onClick={handleTrayClick}
                  overflow="hidden"
                  role={role}
                  width={isSideTray ? 'min(400px, 100vw)' : '100%'}
                >
                  <VStack
                    flexGrow={1}
                    maxWidth={isSideTray ? undefined : '70em'}
                    minHeight={0}
                    width="100%"
                  >
                    {!hideHeader && (
                      <VStack
                        background="bgElevation2"
                        borderTopLeftRadius={pin === 'left' || pin === 'top' ? 0 : 600}
                        borderTopRightRadius={pin === 'right' || pin === 'top' ? 0 : 600}
                        borderedBottom={hasScrolledDown && shouldShrinkPadding}
                        className={classNames?.header}
                        flexShrink={0}
                        overflow="hidden"
                        paddingBottom={shouldShrinkPadding ? 0.75 : 1}
                        paddingTop={
                          !shouldShrinkPadding ? 3 : shouldShowHandleBar ? 0 : isSideTray ? 4 : 2
                        }
                        style={styles?.header}
                      >
                        {shouldShowHandleBar && (
                          <div
                            onPointerCancel={handlePointerCancel}
                            onPointerDown={handlePointerDown}
                            onPointerMove={handlePointerMove}
                            onPointerUp={handlePointerUp}
                            style={{
                              width: '100%',
                              cursor: preventDismiss ? undefined : 'grab',
                              touchAction: 'none',
                            }}
                          >
                            <HandleBar
                              accessibilityHint={closeAccessibilityHint}
                              accessibilityLabel={closeAccessibilityLabel}
                              className={classNames?.handleBar}
                              handleClassName={classNames?.handleBarHandle}
                              handleStyle={handleBarHandleStyle}
                              onActivate={preventDismiss ? undefined : handleHandleBarActivate}
                              style={styles?.handleBar}
                            />
                          </div>
                        )}
                        {(title ||
                          (!preventDismiss && !(hideCloseButton ?? shouldShowHandleBar))) && (
                          <HStack
                            alignItems={isSideTray ? 'flex-start' : 'center'}
                            justifyContent={title ? 'space-between' : 'flex-end'}
                            paddingX={horizontalPadding}
                          >
                            {title &&
                              (typeof title === 'string' ? (
                                <Text
                                  className={classNames?.title}
                                  font="title3"
                                  style={styles?.title}
                                >
                                  {title}
                                </Text>
                              ) : (
                                title
                              ))}
                            {!preventDismiss && !(hideCloseButton ?? shouldShowHandleBar) && (
                              <IconButton
                                transparent
                                accessibilityHint={closeAccessibilityHint}
                                accessibilityLabel={closeAccessibilityLabel}
                                margin={isSideTray ? -1.5 : undefined}
                                name="close"
                                onClick={handleClose}
                                testID="tray-close-button"
                              />
                            )}
                          </HStack>
                        )}
                      </VStack>
                    )}
                    {header && (typeof header === 'function' ? header({ handleClose }) : header)}
                    <VStack
                      ref={contentRef}
                      className={classNames?.content}
                      flexGrow={1}
                      minHeight={0}
                      overflow="hidden"
                      paddingBottom={shouldShrinkPadding ? 0 : 2}
                      paddingTop={shouldShrinkPadding ? 0 : 1}
                      paddingX={horizontalPadding}
                      style={{ overflowY: 'auto', ...styles?.content }}
                    >
                      {typeof children === 'function' ? children({ handleClose }) : children}
                    </VStack>
                    {footer && (
                      <VStack
                        background="bgElevation2"
                        borderBottomLeftRadius={pin === 'left' || pin === 'bottom' ? 0 : 600}
                        borderBottomRightRadius={pin === 'right' || pin === 'bottom' ? 0 : 600}
                        className={classNames?.footer}
                        flexShrink={0}
                        style={styles?.footer}
                      >
                        {typeof footer === 'function' ? footer({ handleClose }) : footer}
                      </VStack>
                    )}
                  </VStack>
                </VStack>
              </MotionBox>
            </FocusTrap>
          </Box>
        </Portal>
      </OverlayContentContext.Provider>
    );
  }),
);
