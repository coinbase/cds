import React, { memo } from 'react';
import { gutter } from '@coinbase/cds-common/tokens/sizing';
import type { SharedAccessibilityProps } from '@coinbase/cds-common/types';

import type { BoxBaseProps, BoxDefaultElement, BoxProps } from '../layout';
import { HStack } from '../layout/HStack';

export type CardFooterBaseProps = Pick<SharedAccessibilityProps, 'id'> &
  BoxBaseProps & {
    /** CardFooter takes one or many actions as children */
    children: React.ReactNode;
  };

export type CardFooterProps = CardFooterBaseProps & Omit<BoxProps<BoxDefaultElement>, 'children'>;

export const CardFooter: React.FC<React.PropsWithChildren<CardFooterProps>> = memo(
  function CardFooter({ children, paddingBottom = 2, paddingX = gutter, testID, ...otherProps }) {
    return (
      <HStack paddingBottom={paddingBottom} paddingX={paddingX} testID={testID} {...otherProps}>
        {children}
      </HStack>
    );
  },
);
