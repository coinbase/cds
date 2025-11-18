import React from 'react';
import { useModalContext } from '@coinbase/cds-common/overlays/ModalContext';
import { css } from '@linaria/core';

import type { ButtonBaseProps } from '../../buttons/Button';
import { Button } from '../../buttons/Button';
import type { BoxDefaultElement, BoxProps } from '../../layout/Box';
import { HStack } from '../../layout/HStack';
import { breakpoints } from '../../styles/media';

const baseCss = css`
  & > button,
  a {
    flex: none;
  }
  flex-direction: column-reverse;

  @media (min-width: ${breakpoints.phoneLandscape}px) {
    flex-direction: row;
    & > button,
    a {
      flex: 1;
    }
  }

  @media (min-width: ${breakpoints.tabletLandscape}px) {
    flex-direction: row;
    & > button,
    a {
      flex: initial;
    }
  }
`;

type ModalFooterBaseProps = {
  /** Primary action button */
  primaryAction: NonNullable<
    React.ReactElement<ButtonBaseProps & { onClick?: React.MouseEventHandler }>
  >;
  /** Secondary action button */
  secondaryAction?: React.ReactElement<ButtonBaseProps & { onClick?: React.MouseEventHandler }>;
};
export type ModalFooterProps = ModalFooterBaseProps & BoxProps<BoxDefaultElement>;

export const ModalFooter = ({
  gap = 2,
  justifyContent = 'flex-end',
  paddingX = 3,
  paddingY = 2,
  width = '100%',
  primaryAction,
  secondaryAction,
  ...props
}: ModalFooterProps) => {
  const { hideDividers } = useModalContext();

  return (
    <HStack
      borderedTop={!hideDividers}
      className={baseCss}
      gap={gap}
      justifyContent={justifyContent}
      paddingX={paddingX}
      paddingY={paddingY}
      width={width}
      {...props}
    >
      {secondaryAction}
      {primaryAction}
    </HStack>
  );
};
