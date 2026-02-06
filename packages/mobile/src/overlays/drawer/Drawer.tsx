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
import { Animated, Keyboard, Modal, Platform, useWindowDimensions, View } from 'react-native';
import type { ModalProps, PressableProps, StyleProp, ViewStyle } from 'react-native';
import {
  drawerAnimationDefaultDuration,
  MAX_OVER_DRAG,
} from '@coinbase/cds-common/animation/drawer';
import {
  OverlayContentContext,
  type OverlayContentContextValue,
} from '@coinbase/cds-common/overlays/OverlayContentContext';
import {
  horizontalDrawerPercentageOfView,
  verticalDrawerPercentageOfView as defaultVerticalDrawerPercentageOfView,
} from '@coinbase/cds-common/tokens/drawer';
import type {
  PinningDirection,
  SharedAccessibilityProps,
  SharedProps,
} from '@coinbase/cds-common/types';

import { useTheme } from '../../hooks/useTheme';
import { Box } from '../../layout/Box';
import { HandleBar, type HandleBarProps } from '../handlebar/HandleBar';
import { Overlay } from '../overlay/Overlay';
import { useOverlayAnimation } from '../overlay/useOverlayAnimation';

import { DrawerStatusBar } from './DrawerStatusBar';
import { useDrawerAnimation } from './useDrawerAnimation';
import { useDrawerPanResponder } from './useDrawerPanResponder';
import { useDrawerSpacing } from './useDrawerSpacing';

export type DrawerRenderChildren = React.FC<{ handleClose: () => void }>;

export type DrawerRefBaseProps = {
  /** ref callback that animates out the drawer */
  handleClose: () => void;
};

export type DrawerBaseProps = SharedProps &
  Pick<SharedAccessibilityProps, 'accessibilityLabel' | 'accessibilityLabelledBy'> &
  Omit<ModalProps, 'onRequestClose' | 'children'> & {
    /** Component to render as the Modal content */
    children?: DrawerRenderChildren | React.ReactNode;
    /**
     * Pin the modal to one side of the screen
     * @default bottom
     * */
    pin?: PinningDirection;
    /**
     * Prevents a user from dismissing the drawer by pressing the overlay or swiping
     */
    preventDismissGestures?: boolean;
    /**
     * Prevents a user from dismissing the drawer by pressing hardware back button on Android
     */
    preventHardwareBackBehaviorAndroid?: boolean;
    /**
     * The HandleBar can be rendered inside or outside the drawer, when pinned to bottom.
     * @default 'outside'
     * @note The 'outside' variant is deprecated. Use 'inside' for new implementations.
     */
    handleBarVariant?: HandleBarProps['variant'];
    /**
     * The HandleBar by default only is used for a bottom pinned drawer. This removes it.
     * */
    hideHandleBar?: boolean;
    /** Action that will happen when drawer is dismissed */
    onCloseComplete: () => void;
    /**
     * Prevents the Drawer from capturing pan gestures on children. Set to true when using a ScrollView as a child
     * @default false
     */
    disableCapturePanGestureToDismiss?: boolean;
    /** Callback fired when the overlay is pressed, or swipe to close */
    onBlur?: () => void;

    /**
     * Allow user of component to define maximum percentage of screen that can be taken up by the Drawer
     * @example if you want a Drawer to take up 50% of the screen, you would pass a value of `0.5`
     */
    verticalDrawerPercentageOfView?: number;
    /**
     * Accessibility label for handlebar
     * @example This is a handlebar, double tap to dismiss the tray.
     */
    handleBarAccessibilityLabel?: string;
    /**
     * StickyFooter to be rendered at bottom of Drawer
     * @deprecated Use TrayStickyFooter as a Tray child instead.
     */
    stickyFooter?: DrawerRenderChildren | React.ReactNode;
  };

export type DrawerProps = DrawerBaseProps & {
  styles?: {
    root?: StyleProp<ViewStyle>;
    overlay?: StyleProp<ViewStyle>;
    container?: StyleProp<ViewStyle>;
    handleBar?: PressableProps['style'];
    handleBarHandle?: StyleProp<ViewStyle>;
    drawer?: StyleProp<ViewStyle>;
  };
};

const overlayContentContextValue: OverlayContentContextValue = {
  isDrawer: true,
};

const overflowStyle: ViewStyle = { overflow: 'hidden', maxHeight: '100%' };

export const Drawer = memo(
  forwardRef<DrawerRefBaseProps, DrawerProps>(function Drawer(
    {
      children,
      pin = 'bottom',
      onCloseComplete,
      preventDismissGestures,
      preventHardwareBackBehaviorAndroid,
      handleBarVariant = 'outside',
      hideHandleBar,
      disableCapturePanGestureToDismiss = false,
      onBlur,
      verticalDrawerPercentageOfView = defaultVerticalDrawerPercentageOfView,
      handleBarAccessibilityLabel = 'Dismiss',
      accessibilityLabel,
      accessibilityLabelledBy,
      style,
      styles,
      accessibilityRole = 'alert',
      animationType = 'none',
      ...props
    },
    ref,
  ) {
    const theme = useTheme();
    const { width, height } = useWindowDimensions();
    const isAndroid = Platform.OS === 'android';

    const {
      drawerAnimation,
      animateDrawerOut,
      animateDrawerIn,
      drawerAnimationStyles,
      animateSwipeToClose,
    } = useDrawerAnimation(pin, verticalDrawerPercentageOfView);
    const [opacityAnimation, animateOverlayIn, animateOverlayOut] = useOverlayAnimation(
      drawerAnimationDefaultDuration,
    );
    const paddingStyles = useDrawerSpacing(pin);
    const isMounted = useRef(false);

    const handleClose = useCallback(() => {
      Animated.parallel([animateDrawerOut, animateOverlayOut]).start(({ finished }) => {
        if (finished) {
          isMounted.current = false;
          onCloseComplete?.();
        }
      });
    }, [animateDrawerOut, animateOverlayOut, onCloseComplete]);

    const handleRequestClose = useCallback(
      () => (preventHardwareBackBehaviorAndroid && isAndroid ? undefined : handleClose()),
      [preventHardwareBackBehaviorAndroid, handleClose, isAndroid],
    );

    const handleSwipeToClose = useCallback(() => {
      if (!preventDismissGestures) {
        Animated.parallel([animateSwipeToClose, animateOverlayOut]).start(({ finished }) => {
          if (finished) {
            isMounted.current = false;
            onCloseComplete?.();
          }
        });
      }
    }, [preventDismissGestures, animateSwipeToClose, animateOverlayOut, onCloseComplete]);

    useEffect(() => {
      if (!isMounted.current) {
        Animated.parallel([animateOverlayIn, animateDrawerIn]).start(({ finished }) => {
          if (finished) {
            isMounted.current = true;
          }
        });
      }
    }, [drawerAnimation, animateDrawerIn, animateOverlayIn]);

    const panGestureHandlers = useDrawerPanResponder({
      pin,
      drawerAnimation,
      animateDrawerIn,
      disableCapturePanGestureToDismiss,
      onBlur,
      handleSwipeToClose,
      opacityAnimation,
      verticalDrawerPercentageOfView,
    });

    const isSideDrawer = pin === 'left' || pin === 'right';
    const showHandleBar = !hideHandleBar && pin === 'bottom';
    const showHandleBarOutside = showHandleBar && handleBarVariant === 'outside';
    const showHandleBarInside = showHandleBar && handleBarVariant === 'inside';

    // leave 15% of the screenwidth as open area for menu drawer
    const horizontalDrawerWidth = useMemo(
      () => width * horizontalDrawerPercentageOfView + MAX_OVER_DRAG,
      [width],
    );

    const [keyboardInset, setKeyboardInset] = useState(0);
    useEffect(() => {
      if (Platform.OS !== 'android') return;
      const show = Keyboard.addListener('keyboardDidShow', (e) =>
        setKeyboardInset(e.endCoordinates.height),
      );
      const hide = Keyboard.addListener('keyboardDidHide', () => setKeyboardInset(0));
      return () => {
        show.remove();
        hide.remove();
      };
    }, []);

    // drawer will automatically size itself based on content, but will cap at 75% of viewport height (can override)
    const verticalDrawerMaxHeight = useMemo(
      () => height * verticalDrawerPercentageOfView + MAX_OVER_DRAG - keyboardInset,
      [height, verticalDrawerPercentageOfView, keyboardInset],
    );

    // For inside variant, pan handlers go on handlebar, for outside variant, on container
    const getContainerPanHandlers =
      !preventDismissGestures && !showHandleBarInside ? panGestureHandlers.panHandlers : undefined;
    const getHandleBarPanHandlers =
      !preventDismissGestures && showHandleBarInside ? panGestureHandlers.panHandlers : undefined;

    const handleOverlayPress = useCallback(() => {
      if (!preventDismissGestures) {
        onBlur?.();
        handleClose();
      }
    }, [handleClose, preventDismissGestures, onBlur]);

    useImperativeHandle(ref, () => ({ handleClose }), [handleClose]);

    const content = useMemo(
      () => (typeof children === 'function' ? children({ handleClose }) : children),
      [children, handleClose],
    );

    const rootStyle = useMemo(() => [style, styles?.root], [style, styles?.root]);

    const containerStyle = useMemo(
      () => [drawerAnimationStyles, styles?.container],
      [drawerAnimationStyles, styles?.container],
    );

    const drawerStyle: StyleProp<ViewStyle> = useMemo(
      () => [
        paddingStyles,
        { overflow: showHandleBarOutside ? 'visible' : 'hidden' },
        styles?.drawer,
      ],
      [paddingStyles, showHandleBarOutside, styles?.drawer],
    );

    const handleBar = useMemo(
      () => (
        <HandleBar
          accessibilityLabel={handleBarAccessibilityLabel}
          accessibilityRole="button"
          onAccessibilityPress={handleClose}
          panHandlers={getHandleBarPanHandlers}
          styles={{ root: styles?.handleBar, handle: styles?.handleBarHandle }}
          variant={handleBarVariant}
        />
      ),
      [
        handleBarAccessibilityLabel,
        handleClose,
        getHandleBarPanHandlers,
        styles?.handleBar,
        styles?.handleBarHandle,
        handleBarVariant,
      ],
    );

    return (
      <Modal
        hardwareAccelerated
        transparent
        visible
        accessibilityRole={accessibilityRole}
        animationType={animationType}
        onRequestClose={handleRequestClose}
        style={rootStyle}
        {...props}
      >
        <OverlayContentContext.Provider value={overlayContentContextValue}>
          <DrawerStatusBar visible pin={pin} />
          <Overlay
            onTouchStart={handleOverlayPress}
            opacity={opacityAnimation}
            style={styles?.overlay}
            testID="drawer-overlay"
          />
          <Box
            {...getContainerPanHandlers}
            animated
            // close modal when user performs the "escape" accessibility gesture
            // https://reactnative.dev/docs/accessibility#onaccessibilityescape-ios
            onAccessibilityEscape={handleClose}
            pin={pin}
            style={containerStyle}
            width={isSideDrawer ? horizontalDrawerWidth : '100%'}
          >
            {showHandleBarOutside && handleBar}
            <Box
              accessibilityLabel={accessibilityLabel}
              accessibilityLabelledBy={accessibilityLabelledBy}
              borderRadius={isSideDrawer ? 0 : 600}
              bordered={theme.activeColorScheme === 'dark'}
              elevation={2}
              maxHeight={!isSideDrawer ? verticalDrawerMaxHeight : '100%'}
              style={drawerStyle}
            >
              {showHandleBarInside && handleBar}
              <View style={overflowStyle}>{content}</View>
            </Box>
          </Box>
        </OverlayContentContext.Provider>
      </Modal>
    );
  }),
);
