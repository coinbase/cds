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
} from '@coinbase/cds-common/animation/drawer';
import {
  OverlayContentContext,
  type OverlayContentContextValue,
} from '@coinbase/cds-common/overlays/OverlayContentContext';
import { css } from '@linaria/core';
import {
  domMax,
  LazyMotion,
  m as motion,
  MotionConfig,
  useAnimate,
  useDragControls,
} from 'framer-motion';

import { IconButton } from '../../buttons';
import { cx } from '../../cx';
import { useDimensions } from '../../hooks/useDimensions';
import { useScrollBlocker } from '../../hooks/useScrollBlocker';
import { useTheme } from '../../hooks/useTheme';
import { Box, HStack } from '../../layout';
import { VStack } from '../../layout/VStack';
import type { ResponsiveProp } from '../../styles/styleProps';
import type { StylesAndClassNames } from '../../types';
import { Text } from '../../typography/Text';
import { FocusTrap } from '../FocusTrap';
import { HandleBar } from '../handlebar/HandleBar';
import { Overlay } from '../overlay/Overlay';
import { Portal } from '../Portal';
import { trayContainerId } from '../PortalProvider';

const DISMISSAL_DRAG_PERCENTAGE = 0.4;

const MotionVStack = motion(Box);

/**
 * Conditionally wraps children in LazyMotion with domMax features to support dragging.
 */
const DragMotionProvider = ({
  enabled,
  children,
}: {
  enabled: boolean;
  children: React.ReactNode;
}) => {
  if (!enabled) {
    return children;
  }
  return <LazyMotion features={domMax}>{children}</LazyMotion>;
};

const trayHeaderBorderBaseCss = css`
  border-bottom-width: var(--borderWidth-100);
  border-bottom-style: solid;
  border-bottom-color: transparent;
`;

const trayHeaderBorderVisibleCss = css`
  border-bottom-color: var(--color-bgLine);
`;

const trayContainerBaseCss = css`
  z-index: 1;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  flex-grow: 1;
  min-height: 0;
  align-items: center;
`;

const trayContainerPinBottomCss = css`
  border-top-left-radius: var(--borderRadius-600);
  border-top-right-radius: var(--borderRadius-600);
`;

const trayContainerPinTopCss = css`
  border-bottom-left-radius: var(--borderRadius-600);
  border-bottom-right-radius: var(--borderRadius-600);
`;

const trayContainerPinLeftCss = css`
  border-top-right-radius: var(--borderRadius-600);
  border-bottom-right-radius: var(--borderRadius-600);
`;

const trayContainerPinRightCss = css`
  border-top-left-radius: var(--borderRadius-600);
  border-bottom-left-radius: var(--borderRadius-600);
`;

/**
 * Static class names for Tray component parts.
 * Use these selectors to target specific elements with CSS.
 */
export const trayClassNames = {
  /** Root container element */
  root: 'cds-Tray',
  /** Overlay backdrop element */
  overlay: 'cds-Tray-overlay',
  /** Animated sliding container element */
  container: 'cds-Tray-container',
  /** Header section element */
  header: 'cds-Tray-header',
  /** Title text element */
  title: 'cds-Tray-title',
  /** Content area element */
  content: 'cds-Tray-content',
  /** Handle bar container element, only rendered when showHandleBar is true and pin is "bottom" */
  handleBar: 'cds-Tray-handleBar',
  /** Handle bar indicator element, only rendered when showHandleBar is true and pin is "bottom" */
  handleBarHandle: 'cds-Tray-handleBarHandle',
  /** Close button element */
  closeButton: 'cds-Tray-closeButton',
} as const;

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
  /**
   * Prevents a user from dismissing the tray by pressing the overlay or swiping
   * @note hides closeButton when `true`
   */
  preventDismiss?: boolean;
  /**
   * Hide the close icon on the top right.
   * @default `true` when handlebar is shown, false otherwise.
   */
  hideCloseButton?: boolean;
  /**
   * WAI-ARIA Roles
   * @link https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Roles
   */
  role?: Extract<React.AriaRole, 'dialog' | 'alertdialog'>;
  /** Text or ReactNode for optional Tray title */
  title?: React.ReactNode;
  /**
   * Allow user of component to define maximum percentage of screen that can be taken up by the Drawer when pinned to the bottom or top.
   * @note not used when `pin` is `"left"` or `"right"`.
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
   * When true, the tray will use opacity animation instead of transform animation.
   * This is useful for supporting reduced motion for accessibility.
   */
  reduceMotion?: boolean;
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
   * @note only appears when `pin="bottom"`.
   *
   * When enabled, the handle bar provides swipe-to-dismiss functionality (drag down to close)
   * and is keyboard accessible (Tab to focus, Enter/Space to close).
   * The close button is hidden by default when the handle bar is shown.
   */
  showHandleBar?: boolean;
} & Pick<SharedAccessibilityProps, 'accessibilityLabel' | 'accessibilityLabelledBy'>;

export type TrayProps = TrayBaseProps & StylesAndClassNames<typeof trayClassNames>;

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
      preventDismiss,
      id,
      role = 'dialog',
      accessibilityLabel = 'Tray',
      accessibilityLabelledBy,
      focusTabIndexElements,
      restoreFocusOnUnmount = true,
      reduceMotion,
      closeAccessibilityLabel = 'Close',
      closeAccessibilityHint,
      styles,
      classNames,
      zIndex,
      pin = 'bottom',
      showHandleBar,
      hideCloseButton,
    },
    ref,
  ) {
    const theme = useTheme();
    const [isOpen, setIsOpen] = useState(true);
    const [hasScrolledDown, setHasScrolledDown] = useState(false);

    const trayRef = useRef<HTMLDivElement>(null);
    const { observe: observeTraySize, height: trayHeight } = useDimensions<HTMLDivElement>();
    const contentRef = useRef<HTMLDivElement>(null);
    const [scope, animate] = useAnimate();
    const dragControls = useDragControls();

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

    useEffect(() => {
      onVisibilityChange?.('visible');
      return () => onVisibilityChange?.('hidden');
    }, [onVisibilityChange]);

    const handleClose = useCallback(() => {
      if (!scope.current) return;

      let finalAnimationValue;
      if (reduceMotion) {
        finalAnimationValue = { opacity: 0 };
      } else {
        finalAnimationValue = isSideTray
          ? { x: pin === 'right' ? '100%' : '-100%' }
          : { y: pin === 'bottom' ? '100%' : '-100%' };
      }
      animate(scope.current, finalAnimationValue, animationConfig.slideOut.transition).then(() => {
        setIsOpen(false);
        onClose?.();
        onCloseComplete?.();
      });
    }, [animate, scope, isSideTray, pin, onClose, onCloseComplete, reduceMotion]);

    const handleSwipeClose = useCallback(() => {
      if (!scope.current) return;
      animate(scope.current, { y: '100%' }, { duration: 0.15, ease: 'easeOut' }).then(() => {
        setIsOpen(false);
        onBlur?.();
        onClose?.();
        onCloseComplete?.();
      });
    }, [animate, scope, onBlur, onClose, onCloseComplete]);

    useImperativeHandle(ref, () => ({ close: handleClose }), [handleClose]);

    const handleOverlayClick = useCallback(() => {
      if (!preventDismiss) {
        onBlur?.();
        handleClose();
      }
    }, [handleClose, preventDismiss, onBlur]);

    const handleDragEnd = useCallback(
      (
        _event: MouseEvent | TouchEvent | PointerEvent,
        info: { offset: { y: number }; velocity: { y: number } },
      ) => {
        const offsetY = info.offset.y;
        const velocityY = info.velocity.y;

        const dragThreshold = trayHeight
          ? Math.min(trayHeight * DISMISSAL_DRAG_PERCENTAGE, DISMISSAL_DRAG_THRESHOLD)
          : DISMISSAL_DRAG_THRESHOLD;

        // Close if dragged past threshold OR if flicked down with high velocity
        if (offsetY >= dragThreshold || velocityY >= DISMISSAL_VELOCITY_THRESHOLD) {
          handleSwipeClose();
        } else {
          // Snap back to closed position
          animate(scope.current, { y: 0 }, { duration: 0.2, ease: 'easeOut' });
        }
      },
      [trayHeight, handleSwipeClose, animate, scope],
    );

    const initialAnimationValue = useMemo(() => {
      if (reduceMotion) {
        return { opacity: 0 };
      }
      return isSideTray
        ? { x: pin === 'right' ? '100%' : '-100%' }
        : { y: pin === 'bottom' ? '100%' : '-100%' };
    }, [isSideTray, pin, reduceMotion]);

    const animateValue = useMemo(() => {
      if (reduceMotion) {
        return { opacity: 1 };
      }
      return isSideTray ? { x: 0 } : { y: 0 };
    }, [isSideTray, reduceMotion]);

    // Handle bar only shows for bottom-pinned trays (matching mobile behavior)
    const shouldShowHandleBar = showHandleBar && pin === 'bottom';
    const shouldShrinkPadding = pin !== 'bottom' || showHandleBar;
    const shouldShowCloseButton = !preventDismiss && !(hideCloseButton ?? shouldShowHandleBar);
    const shouldShowTitle = title || shouldShowCloseButton;

    useEffect(() => {
      const content = contentRef.current;
      if (!content || !shouldShrinkPadding) return;

      const handleScroll = () => {
        setHasScrolledDown(content.scrollTop > 0);
      };

      content.addEventListener('scroll', handleScroll, { passive: true });
      return () => content.removeEventListener('scroll', handleScroll);
    }, [shouldShrinkPadding]);

    const headerContent = useMemo(
      () => (typeof header === 'function' ? header({ handleClose }) : header),
      [header, handleClose],
    );

    const content = useMemo(
      () => (typeof children === 'function' ? children({ handleClose }) : children),
      [children, handleClose],
    );

    const footerContent = useMemo(
      () => (typeof footer === 'function' ? footer({ handleClose }) : footer),
      [footer, handleClose],
    );

    const trayContainerPinCss = useMemo(() => {
      switch (pin) {
        case 'top':
          return trayContainerPinTopCss;
        case 'left':
          return trayContainerPinLeftCss;
        case 'right':
          return trayContainerPinRightCss;
        case 'bottom':
        default:
          return trayContainerPinBottomCss;
      }
    }, [pin]);

    if (!isOpen) return null;

    return (
      <OverlayContentContext.Provider value={overlayContentContextValue}>
        <Portal containerId={trayContainerId}>
          <Box
            ref={trayRef}
            className={cx(trayClassNames.root, classNames?.root)}
            height="100vh"
            pin="all"
            position="fixed"
            style={styles?.root}
            width="100vw"
            zIndex={zIndex}
          >
            <Overlay
              className={cx(trayClassNames.overlay, classNames?.overlay)}
              onClick={handleOverlayClick}
              style={styles?.overlay}
              testID="tray-overlay"
            />
            <MotionConfig reducedMotion={reduceMotion ? 'always' : undefined}>
              <DragMotionProvider enabled={!preventDismiss}>
                <FocusTrap
                  focusTabIndexElements={focusTabIndexElements}
                  onEscPress={preventDismiss ? undefined : handleClose}
                  restoreFocusOnUnmount={restoreFocusOnUnmount}
                >
                  <MotionVStack
                    ref={scope}
                    accessibilityLabel={accessibilityLabel}
                    accessibilityLabelledBy={accessibilityLabelledBy}
                    animate={animateValue}
                    aria-modal="true"
                    bordered={theme.activeColorScheme === 'dark'}
                    className={cx(
                      trayContainerBaseCss,
                      trayContainerPinCss,
                      trayClassNames.container,
                      classNames?.container,
                    )}
                    data-testid="tray"
                    drag={!preventDismiss ? 'y' : undefined}
                    dragConstraints={{ top: 0, bottom: 0 }}
                    dragControls={dragControls}
                    dragElastic={{ top: 0, bottom: 0.5 }}
                    dragListener={false}
                    elevation={2}
                    id={id}
                    initial={initialAnimationValue}
                    onClick={(e: React.MouseEvent<HTMLDivElement>) => e.stopPropagation()}
                    onDragEnd={!preventDismiss ? handleDragEnd : undefined}
                    pin={pin}
                    role={role}
                    style={{
                      maxHeight: isSideTray ? undefined : verticalDrawerPercentageOfView,
                      touchAction: !preventDismiss && pin === 'bottom' ? 'none' : undefined,
                      ...styles?.container,
                    }}
                    tabIndex={0}
                    transition={animationConfig.slideIn.transition}
                    width={isSideTray ? 'min(400px, 100vw)' : undefined}
                  >
                    <VStack
                      ref={observeTraySize}
                      flexGrow={1}
                      maxWidth={isSideTray ? undefined : '70em'}
                      minHeight={0}
                      width="100%"
                    >
                      {(shouldShowTitle || headerContent || shouldShowHandleBar) && (
                        <VStack
                          className={cx(
                            shouldShrinkPadding && trayHeaderBorderBaseCss,
                            shouldShrinkPadding && hasScrolledDown && trayHeaderBorderVisibleCss,
                            trayClassNames.header,
                            classNames?.header,
                          )}
                          flexShrink={0}
                          overflow="hidden"
                          paddingBottom={shouldShrinkPadding ? 0.75 : 1}
                          paddingTop={
                            !shouldShrinkPadding ? 3 : shouldShowHandleBar ? 0 : isSideTray ? 4 : 2
                          }
                          style={styles?.header}
                        >
                          {shouldShowHandleBar &&
                            (preventDismiss ? (
                              <HandleBar
                                classNames={{
                                  root: cx(trayClassNames.handleBar, classNames?.handleBar),
                                  handle: cx(
                                    trayClassNames.handleBarHandle,
                                    classNames?.handleBarHandle,
                                  ),
                                }}
                                styles={{
                                  root: styles?.handleBar,
                                  handle: styles?.handleBarHandle,
                                }}
                              />
                            ) : (
                              <HandleBar
                                accessibilityHint={closeAccessibilityHint}
                                accessibilityLabel={closeAccessibilityLabel}
                                classNames={{
                                  root: cx(trayClassNames.handleBar, classNames?.handleBar),
                                  handle: cx(
                                    trayClassNames.handleBarHandle,
                                    classNames?.handleBarHandle,
                                  ),
                                }}
                                onClose={handleClose}
                                onPointerDown={(e: React.PointerEvent<HTMLDivElement>) => {
                                  dragControls.start(e);
                                }}
                                styles={{
                                  root: styles?.handleBar,
                                  handle: { ...styles?.handleBarHandle, touchAction: 'none' },
                                }}
                              />
                            ))}
                          {shouldShowTitle && (
                            <HStack
                              alignItems={isSideTray ? 'flex-start' : 'center'}
                              justifyContent={title ? 'space-between' : 'flex-end'}
                              paddingX={horizontalPadding}
                            >
                              {title &&
                                (typeof title === 'string' ? (
                                  <Text
                                    className={cx(trayClassNames.title, classNames?.title)}
                                    font="title3"
                                    style={styles?.title}
                                  >
                                    {title}
                                  </Text>
                                ) : (
                                  title
                                ))}
                              {shouldShowCloseButton && (
                                <IconButton
                                  transparent
                                  accessibilityHint={closeAccessibilityHint}
                                  accessibilityLabel={closeAccessibilityLabel}
                                  className={cx(
                                    trayClassNames.closeButton,
                                    classNames?.closeButton,
                                  )}
                                  margin={isSideTray ? -1.5 : undefined}
                                  name="close"
                                  onClick={handleClose}
                                  style={styles?.closeButton}
                                  testID="tray-close-button"
                                />
                              )}
                            </HStack>
                          )}
                          {headerContent}
                        </VStack>
                      )}
                      <VStack
                        ref={contentRef}
                        className={cx(trayClassNames.content, classNames?.content)}
                        flexGrow={1}
                        minHeight={0}
                        overflow="hidden"
                        paddingBottom={shouldShrinkPadding ? 0 : 2}
                        paddingTop={shouldShrinkPadding ? 0 : 1}
                        paddingX={horizontalPadding}
                        style={{ overflowY: 'auto', ...styles?.content }}
                      >
                        {content}
                      </VStack>
                      {footerContent}
                    </VStack>
                  </MotionVStack>
                </FocusTrap>
              </DragMotionProvider>
            </MotionConfig>
          </Box>
        </Portal>
      </OverlayContentContext.Provider>
    );
  }),
);
