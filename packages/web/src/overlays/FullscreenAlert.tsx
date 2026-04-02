import { memo, useMemo } from 'react';
import type { ButtonVariant, IllustrationHeroSquareNames } from '@coinbase/cds-common/types';
import { css } from '@linaria/core';

import { Button } from '../buttons';
import { useA11yLabels } from '../hooks/useA11yLabels';
import { useComponentConfig } from '../hooks/useComponentConfig';
import { HeroSquare } from '../illustrations';
import { Box } from '../layout/Box';
import { VStack } from '../layout/VStack';
import { breakpoints } from '../styles/media';
import { Text } from '../typography/Text';

import { FullscreenModal } from './modal/FullscreenModal';
import type { ModalBaseProps, ModalProps } from './modal/Modal';
import type { ModalHeaderBaseProps, ModalHeaderProps } from './modal/ModalHeader';
import type { AlertBaseProps, AlertProps } from './Alert';

export type FullscreenAlertBaseProps = Pick<AlertBaseProps, 'title' | 'body'> &
  Pick<ModalHeaderBaseProps, 'closeAccessibilityLabel'> &
  Pick<
    ModalBaseProps,
    | 'visible'
    | 'onRequestClose'
    | 'disablePortal'
    | 'accessibilityLabel'
    | 'accessibilityLabelledBy'
    | 'testID'
  > & {
    /**
     * Name of the illustration that is rendered in the alert
     */
    heroSquare?: IllustrationHeroSquareNames;
    /**
     * Label of the main call to action button
     */
    preferredActionLabel: string;
    /**
     * Callback function fired when the main call to action button is pressed
     */
    onPreferredActionPress?: () => void;
    /**
     * Variant of the main call to action button
     * @default primary
     */
    preferredActionVariant?: Extract<ButtonVariant, 'primary' | 'negative'>;
    /**
     * Label of the dismiss button
     */
    dismissActionLabel?: string;
    /**
     * Callback function fired when the dismiss button is pressed
     */
    onDismissActionPress?: () => void;
  };

export type FullscreenAlertProps = FullscreenAlertBaseProps;

const centerContentCss = css`
  height: 100%;
  align-items: center;
  justify-content: center;
  margin-inline-start: 0px;
`;

const actionsContainerCss = css`
  gap: var(--space-3);
  flex-direction: column-reverse;
  width: 100%;

  @media only screen and (min-width: ${breakpoints.phoneLandscape}px) {
    flex-direction: row;
    width: auto;
  }
`;

const primaryContentCss = css`
  height: 100%;

  @media only screen and (min-width: ${breakpoints.phoneLandscape}px) {
    height: auto;
  }
`;

export const FullscreenAlert = memo((_props: FullscreenAlertProps) => {
  const mergedProps = useComponentConfig('FullscreenAlert', _props);
  const {
    visible,
    onRequestClose,
    title,
    body,
    heroSquare,
    preferredActionLabel,
    onPreferredActionPress,
    preferredActionVariant,
    dismissActionLabel,
    onDismissActionPress,
    disablePortal,
    accessibilityLabel,
    accessibilityLabelledBy,
    testID,
    closeAccessibilityLabel,
  } = mergedProps;
  const { labelledBySource, labelledBy, label } = useA11yLabels({
    accessibilityLabelledBy,
    accessibilityLabel,
  });

  const primaryContent = useMemo(
    () => (
      <VStack alignItems="center" height="100%" justifyContent="space-between">
        <VStack alignItems="center" paddingBottom={4}>
          {!!heroSquare && <HeroSquare name={heroSquare} />}
          <Box paddingBottom={1} paddingTop={3}>
            <Text as="h3" display="block" font="title3" id={labelledBySource} textAlign="center">
              {title}
            </Text>
          </Box>
          <Text as="p" color="fgMuted" display="block" font="body" textAlign="center">
            {body}
          </Text>
        </VStack>
        <Box className={actionsContainerCss}>
          {!!dismissActionLabel && (
            <Button onClick={onDismissActionPress} variant="secondary">
              {dismissActionLabel}
            </Button>
          )}
          <Button onClick={onPreferredActionPress} variant={preferredActionVariant}>
            {preferredActionLabel}
          </Button>
        </Box>
      </VStack>
    ),
    [
      body,
      dismissActionLabel,
      heroSquare,
      labelledBySource,
      onDismissActionPress,
      onPreferredActionPress,
      preferredActionLabel,
      preferredActionVariant,
      title,
    ],
  );

  return (
    <FullscreenModal
      hideDivider
      accessibilityLabel={label}
      accessibilityLabelledBy={labelledBy}
      closeAccessibilityLabel={closeAccessibilityLabel}
      contentContainerClassName={centerContentCss}
      disablePortal={disablePortal}
      onRequestClose={onRequestClose}
      primaryContent={primaryContent}
      primaryContentClassName={primaryContentCss}
      role="alertdialog"
      testID={testID}
      visible={visible}
    />
  );
});
