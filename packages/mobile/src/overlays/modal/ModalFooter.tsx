import React, { Fragment, memo } from 'react';
import type { PressableProps } from 'react-native';
import { useModalContext } from '@coinbase/cds-common/overlays/ModalContext';

import type { ButtonBaseProps } from '../../buttons/Button';
import { ButtonGroup, type ButtonGroupProps } from '../../buttons/ButtonGroup';
import { useComponentConfig } from '../../hooks/useComponentConfig';
import { Box, type BoxBaseProps, type BoxProps } from '../../layout/Box';

export type ModalFooterBaseProps = Omit<BoxBaseProps, 'children'> &
  Pick<ButtonGroupProps, 'direction'> & {
    /** Primary action button */
    primaryAction: NonNullable<
      React.ReactElement<ButtonBaseProps & { onPress?: PressableProps['onPress'] }>
    >;
    /** Secondary action button */
    secondaryAction?: React.ReactElement<ButtonBaseProps & { onPress?: PressableProps['onPress'] }>;
  };

export type ModalFooterProps = ModalFooterBaseProps & Omit<BoxProps, 'children'>;

export const ModalFooter = memo((_props: ModalFooterProps) => {
  const mergedProps = useComponentConfig('ModalFooter', _props);
  const {
    primaryAction,
    secondaryAction,
    direction = 'horizontal',
    paddingX = 3,
    paddingY = 2,
    ...props
  } = mergedProps;
  const { hideDividers = false } = useModalContext();
  const actions = [secondaryAction, primaryAction].filter(Boolean);
  const isVertical = direction === 'vertical';

  // reverse actions order when stacked
  if (isVertical) {
    actions.reverse();
  }

  return (
    <Box borderedTop={!hideDividers} paddingX={paddingX} paddingY={paddingY} {...props}>
      <ButtonGroup block={!isVertical} direction={direction}>
        {actions.map((action, i) => (
          // actions are stable so should be fine to use index as key

          <Fragment key={i}>{action}</Fragment>
        ))}
      </ButtonGroup>
    </Box>
  );
});
