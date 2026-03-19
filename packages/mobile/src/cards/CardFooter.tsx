import React, { memo } from 'react';
import { gutter } from '@coinbase/cds-common/tokens/sizing';
import type { SharedAccessibilityProps } from '@coinbase/cds-common/types';

import { useComponentConfig } from '../hooks/useComponentConfig';
import type { BoxBaseProps, BoxProps } from '../layout';
import { HStack } from '../layout/HStack';

export type CardFooterBaseProps = Pick<
  SharedAccessibilityProps,
  'accessibilityLabel' | 'accessibilityLabelledBy' | 'accessibilityHint'
> &
  Omit<BoxBaseProps, 'children'> & {
    /** CardFooter takes one or many actions as children */
    children: React.ReactNode;
  };

export type CardFooterProps = CardFooterBaseProps & Omit<BoxProps, 'children'>;

export const CardFooter = memo(function CardFooter(_props: CardFooterProps) {
  const mergedProps = useComponentConfig('CardFooter', _props);
  const { children, paddingBottom = 2, paddingX = gutter, testID, ...otherProps } = mergedProps;
  return (
    <HStack paddingBottom={paddingBottom} paddingX={paddingX} testID={testID} {...otherProps}>
      {children}
    </HStack>
  );
});
