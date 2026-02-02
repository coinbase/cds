import React, { cloneElement } from 'react';
import type { PressableProps } from 'react-native';
import { useModalContext } from '@coinbase/cds-common/overlays/ModalContext';
import type { SharedProps } from '@coinbase/cds-common/types';

import type { ButtonBaseProps } from '../../buttons/Button';
import { ButtonGroup, type ButtonGroupProps } from '../../buttons/ButtonGroup';
import { Box } from '../../layout/Box';

export type ModalFooterProps = {
  /** Primary action button */
  primaryAction: NonNullable<
    React.ReactElement<ButtonBaseProps & { onPress?: PressableProps['onPress'] }>
  >;
  /** Secondary action button */
  secondaryAction?: React.ReactElement<ButtonBaseProps & { onPress?: PressableProps['onPress'] }>;
} & Pick<ButtonGroupProps, 'direction'> &
  SharedProps;

export const ModalFooter = ({
  primaryAction,
  secondaryAction,
  direction = 'horizontal',
  testID,
}: ModalFooterProps) => {
  const { hideDividers = false } = useModalContext();
  const actions = [secondaryAction, primaryAction].filter(
    (action): action is NonNullable<typeof action> => Boolean(action),
  );
  const isVertical = direction === 'vertical';

  // reverse actions order when stacked
  if (isVertical) {
    actions.reverse();
  }

  return (
    <Box borderedTop={!hideDividers} paddingX={3} paddingY={2} testID={testID}>
      <ButtonGroup block={!isVertical} direction={direction}>
        {actions.map((action, i) =>
          // actions are stable so should be fine to use index as key
          cloneElement(action, { key: i }),
        )}
      </ButtonGroup>
    </Box>
  );
};
