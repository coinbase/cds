import React, {
  forwardRef,
  memo,
  useCallback,
  useContext,
  useImperativeHandle,
  useRef,
  useState,
} from 'react';
import {
  animateInBottomConfig,
  animateInOpacityConfig,
  animateOutBottomConfig,
  animateOutOpacityConfig,
} from '@coinbase/cds-common/animation/toast';
import {
  type ToastBaseProps as CommonToastBaseProps,
  ToastContext,
  type ToastRefHandle,
} from '@coinbase/cds-common/overlays/ToastProvider';
import type { SharedAccessibilityProps } from '@coinbase/cds-common/types';
import { css } from '@linaria/core';
import { m as motion } from 'framer-motion';

import { Button } from '../buttons/Button';
import { IconButton } from '../buttons/IconButton';
import { useComponentConfig } from '../hooks/useComponentConfig';
import { Box, type BoxDefaultElement, type BoxProps } from '../layout/Box';
import { HStack } from '../layout/HStack';
import { ColorSurge } from '../motion/ColorSurge';
import { useMotionProps } from '../motion/useMotionProps';
import { Text } from '../typography/Text';

import type { ModalProps } from './modal/Modal';
import { Portal } from './Portal';
import { toastContainerId } from './PortalProvider';

export type ToastBaseProps = CommonToastBaseProps &
  Pick<ModalProps, 'disablePortal'> & {
    /**
     * Hide the close button on the right
     * @default false
     */
    hideCloseButton?: boolean;
    /**
     * Accessibility props are provided to ensure i18n
     * support for all relevant a11y props
     * @default { accessibilityLabel: "close" }
     */
    closeButtonAccessibilityProps?: SharedAccessibilityProps;
  };

export type ToastProps = ToastBaseProps & Omit<BoxProps<BoxDefaultElement>, 'children'>;

// Note: ensure any updates here are reflected in the jsdoc above
const closeButtonAccessibilityDefaults: ToastProps['closeButtonAccessibilityProps'] = {
  accessibilityLabel: 'close',
};

const baseCss = css`
  position: fixed;
  left: 0;
  width: 100%;
  pointer-events: none;
`;

const toastCss = css`
  pointer-events: all;
`;

export const toastTestId = 'cds-toast';

export const Toast = memo(
  forwardRef<ToastRefHandle, ToastProps>((_props, ref) => {
    const mergedProps = useComponentConfig('Toast', _props);
    const {
      text,
      action,
      onWillHide,
      onDidHide,
      disablePortal = false,
      hideCloseButton = false,
      testID = toastTestId,
      bottomOffset = 'var(--space-4)',
      closeButtonAccessibilityProps = closeButtonAccessibilityDefaults,
      variant,
      ...props
    } = mergedProps;
    const { pauseTimer, resumeTimer } = useContext(ToastContext);
    const [motionState, setMotionState] = useState<'enter' | 'exit'>('enter');
    const exitResolverRef = useRef<((value: boolean) => void) | null>(null);

    const motionProps = useMotionProps({
      enterConfigs: [animateInOpacityConfig, animateInBottomConfig],
      exitConfigs: [animateOutOpacityConfig, animateOutBottomConfig],
      animate: motionState,
      style: { bottom: bottomOffset },
    });

    const handleAnimationComplete = useCallback(
      (definition: string) => {
        if (definition === 'exit') {
          onDidHide?.();
          exitResolverRef.current?.(true);
          exitResolverRef.current = null;
        }
      },
      [onDidHide],
    );

    const handleClose = useCallback((): Promise<boolean> => {
      onWillHide?.();
      return new Promise((resolve) => {
        exitResolverRef.current = resolve;
        setMotionState('exit');
      });
    }, [onWillHide]);

    useImperativeHandle(
      ref,
      () => ({
        hide: handleClose,
      }),
      [handleClose],
    );

    const handleActionPress = useCallback(() => {
      action?.onPress();
      void handleClose();
    }, [action, handleClose]);

    return (
      <Portal containerId={toastContainerId} disablePortal={disablePortal}>
        <motion.div
          {...motionProps}
          className={baseCss}
          data-testid={`${testID}-motion`}
          onAnimationComplete={handleAnimationComplete}
        >
          <Box
            justifyContent="center"
            onMouseEnter={pauseTimer} // persist toast when hovering
            onMouseLeave={resumeTimer}
            padding={2}
            role="alert"
            testID={testID}
            width="100%"
            {...props}
          >
            <HStack
              alignItems="center"
              background="bgAlternate"
              borderRadius={200}
              className={toastCss}
              elevation={2}
              maxWidth={550}
              overflow="hidden"
              paddingEnd={1}
              paddingStart={3}
              paddingY={1}
              position="relative"
            >
              {/* avoid pushing contents off screen */}
              <Box flexShrink={1} paddingEnd={2} paddingY={1}>
                <Text as="p" display="block" font="headline" tabIndex={0}>
                  {text}
                </Text>
              </Box>
              <ColorSurge background={variant} />
              <HStack>
                {!!action && (
                  <Button
                    compact
                    transparent
                    onClick={handleActionPress}
                    testID={action.testID ?? 'toast-action'}
                  >
                    {action.label}
                  </Button>
                )}
                {!hideCloseButton && (
                  <IconButton
                    transparent
                    name="close"
                    onClick={handleClose}
                    testID={`${testID}-close-button`}
                    variant="foregroundMuted"
                    {...closeButtonAccessibilityProps}
                  />
                )}
              </HStack>
            </HStack>
          </Box>
        </motion.div>
      </Portal>
    );
  }),
);
