import { forwardRef, memo, useCallback, useMemo } from 'react';
import type {
  ButtonVariant,
  IllustrationPictogramNames,
  PositionStyles,
  SharedProps,
  ValidateProps,
} from '@coinbase/cds-common/types';

import { Button } from '../buttons';
import { useA11yLabels } from '../hooks/useA11yLabels';
import { useComponentConfig } from '../hooks/useComponentConfig';
import { Pictogram } from '../illustrations';
import { Box } from '../layout/Box';
import { Text } from '../typography/Text';

import { Modal, type ModalBaseProps, type ModalRefBaseProps } from './modal/Modal';
import { Portal } from './Portal';
import { alertContainerId } from './PortalProvider';

export type AlertBaseProps = SharedProps &
  Pick<PositionStyles, 'zIndex'> &
  Pick<
    ModalBaseProps,
    | 'onRequestClose'
    | 'visible'
    | 'onDidClose'
    | 'disablePortal'
    | 'accessibilityLabel'
    | 'accessibilityLabelledBy'
  > & {
    /**
     * Indicating if Alert is stacked on top of Modal
     */
    stacked?: boolean;
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

export const alertModalWidth = 318;

export const Alert = memo(
  forwardRef<ModalRefBaseProps, AlertProps>((_props, ref) => {
    const mergedProps = useComponentConfig('Alert', _props);
    const {
      title,
      body,
      pictogram,
      visible,
      onRequestClose,
      preferredActionLabel,
      onPreferredActionPress,
      preferredActionVariant,
      dismissActionLabel,
      onDismissActionPress,
      disablePortal,
      testID,
      stacked,
      actionLayout = 'horizontal',
      accessibilityLabelledBy,
      accessibilityLabel,
      ...props
    } = mergedProps;
    const { labelledBySource, labelledBy, label } = useA11yLabels({
      accessibilityLabelledBy,
      accessibilityLabel,
    });

    const handlePreferredActionPress = useCallback(() => {
      onPreferredActionPress?.();
      onRequestClose?.();
    }, [onPreferredActionPress, onRequestClose]);

    const handleDismissActionPress = useCallback(() => {
      onDismissActionPress?.();
      onRequestClose?.();
    }, [onDismissActionPress, onRequestClose]);

    const dismissAction = useMemo(() => {
      if (!dismissActionLabel) {
        return null;
      }
      return (
        <Box flexBasis={0} flexGrow={1} minWidth={0}>
          <Button block onClick={handleDismissActionPress} variant="secondary">
            {dismissActionLabel}
          </Button>
        </Box>
      );
    }, [dismissActionLabel, handleDismissActionPress]);

    const preferredAction = useMemo(() => {
      return (
        <Box flexBasis={0} flexGrow={1} minWidth={0}>
          <Button block onClick={handlePreferredActionPress} variant={preferredActionVariant}>
            {preferredActionLabel}
          </Button>
        </Box>
      );
    }, [preferredActionLabel, handlePreferredActionPress, preferredActionVariant]);

    return (
      <Portal containerId={alertContainerId} disablePortal={disablePortal}>
        <Modal
          ref={ref}
          dangerouslyDisableResponsiveness
          disableOverlayPress
          disablePortal
          hideDividers
          accessibilityLabel={label}
          accessibilityLabelledBy={labelledBy}
          dangerouslySetPosition={!stacked ? 'static' : undefined} // center alert vertically
          onRequestClose={onRequestClose}
          role="alertdialog"
          shouldCloseOnEscPress={!!dismissActionLabel} // disable esc close when no dismiss action
          testID={testID}
          visible={visible}
          width={alertModalWidth}
          {...(props satisfies ValidateProps<typeof props, Omit<AlertProps, keyof ModalBaseProps>>)}
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
            <Text
              as="h3"
              display="block"
              font="title3"
              id={labelledBySource}
              paddingBottom={0.5}
              textAlign="center"
            >
              {title}
            </Text>
            <Text as="p" color="fgMuted" display="block" font="body" textAlign="center">
              {body}
            </Text>
          </Box>
          <Box
            flexDirection={actionLayout === 'vertical' ? 'column-reverse' : 'row'}
            gap={2}
            paddingX={2}
            paddingY={3}
            testID={testID && `${testID}-actions`}
          >
            {dismissAction}
            {preferredAction}
          </Box>
        </Modal>
      </Portal>
    );
  }),
);
