import { forwardRef, memo, useCallback, useEffect, useImperativeHandle, useMemo } from 'react';
import { Modal as RNModal } from 'react-native';
import type {
  ButtonVariant,
  IllustrationPictogramNames,
  PositionStyles,
  SharedProps,
} from '@coinbase/cds-common/types';

import { Button } from '../buttons';
import { useComponentConfig } from '../hooks/useComponentConfig';
import { Pictogram } from '../illustrations';
import { Box } from '../layout';
import { Text } from '../typography/Text';

import type { ModalBaseProps, ModalRefBaseProps } from './modal/Modal';
import { Overlay } from './overlay/Overlay';
import { useAlertAnimation } from './useAlertAnimation';

export type AlertBaseProps = SharedProps &
  Pick<PositionStyles, 'zIndex'> &
  Pick<ModalBaseProps, 'onRequestClose' | 'visible' | 'onDidClose'> & {
    /**
     * Alert title
     */
    title: string;
    /**
     * Alert body/description
     */
    body: string;
    /**
     * Illustration pictogram name for alert
     */
    pictogram?: IllustrationPictogramNames;
    /**
     * Label of the preferred action
     */
    preferredActionLabel: string;
    /**
     * Callback function fired when the preferred action is pressed
     */
    onPreferredActionPress?: () => void;
    /**
     * Button variant of the preferred action
     * @default primary
     */
    preferredActionVariant?: Extract<ButtonVariant, 'primary' | 'negative'>;
    /**
     * Label of the dismiss action
     */
    dismissActionLabel?: string;
    /**
     * Callback function fired when the dismiss action is pressed
     */
    onDismissActionPress?: () => void;
    /**
     * Layout of the actions
     * @default horizontal
     */
    actionLayout?: 'horizontal' | 'vertical';
  };

export type AlertProps = AlertBaseProps;

export const Alert = memo(
  forwardRef<ModalRefBaseProps, AlertProps>((_props, ref) => {
    const mergedProps = useComponentConfig('Alert', _props);
    const {
      title,
      body,
      pictogram,
      visible = false,
      onRequestClose,
      preferredActionLabel,
      onPreferredActionPress,
      preferredActionVariant,
      dismissActionLabel,
      onDismissActionPress,
      testID,
      actionLayout = 'horizontal',
    } = mergedProps;
    const [{ modalOpacity, modalScale, overlayOpacity }, animateIn, animateOut] =
      useAlertAnimation();

    useEffect(() => {
      if (visible) {
        animateIn.start();
      }
    }, [visible, animateIn]);

    const handleClose = useCallback(() => {
      animateOut.start(({ finished }) => {
        if (finished) {
          onRequestClose?.();
        }
      });
    }, [onRequestClose, animateOut]);

    useImperativeHandle(
      ref,
      () => ({
        onRequestClose: handleClose,
      }),
      [handleClose],
    );

    const handlePrimaryActionPress = useCallback(() => {
      onPreferredActionPress?.();
      handleClose();
    }, [onPreferredActionPress, handleClose]);

    const handleSecondaryActionPress = useCallback(() => {
      onDismissActionPress?.();
      handleClose();
    }, [onDismissActionPress, handleClose]);

    const actionFlexBasis = actionLayout === 'vertical' ? undefined : 0;
    const actionFlexDirection = actionLayout === 'vertical' ? 'column-reverse' : 'row';

    const dismissAction = useMemo(() => {
      if (!dismissActionLabel) {
        return null;
      }
      return (
        <Box key="dismiss" flexBasis={actionFlexBasis} flexGrow={1}>
          <Button block onPress={handleSecondaryActionPress} variant="secondary">
            {dismissActionLabel}
          </Button>
        </Box>
      );
    }, [dismissActionLabel, handleSecondaryActionPress, actionFlexBasis]);

    const preferredAction = useMemo(() => {
      return (
        <Box flexBasis={actionFlexBasis} flexGrow={1}>
          <Button block onPress={handlePrimaryActionPress} variant={preferredActionVariant}>
            {preferredActionLabel}
          </Button>
        </Box>
      );
    }, [preferredActionLabel, handlePrimaryActionPress, preferredActionVariant, actionFlexBasis]);

    return (
      <RNModal
        hardwareAccelerated
        statusBarTranslucent
        transparent
        animationType="none"
        onRequestClose={handleClose}
        testID={testID}
        visible={visible}
      >
        <Box alignItems="center" justifyContent="center" pin="all">
          <Overlay opacity={overlayOpacity} />
          <Box
            animated
            borderRadius={200}
            elevation={2}
            style={{
              transform: [{ scale: modalScale }],
              opacity: modalOpacity,
              borderWidth: 0,
            }}
            width={318}
          >
            <Box
              alignItems="center"
              flexDirection="column"
              paddingBottom={1}
              paddingTop={3}
              paddingX={3}
            >
              {!!pictogram && (
                <Box paddingBottom={2}>
                  {/* fixed size: 120x120 */}
                  <Pictogram
                    dimension="48x48"
                    name={pictogram}
                    scaleMultiplier={2.5}
                    testID={testID && `${testID}-pictogram`}
                  />
                </Box>
              )}
              <Text align="center" font="title3" paddingBottom={0.5}>
                {title}
              </Text>
              <Text align="center" color="fgMuted" font="body">
                {body}
              </Text>
            </Box>
            <Box
              flexDirection={actionFlexDirection}
              gap={2}
              paddingX={3}
              paddingY={2}
              testID={testID && `${testID}-actions`}
            >
              {dismissAction}
              {preferredAction}
            </Box>
          </Box>
        </Box>
      </RNModal>
    );
  }),
);
