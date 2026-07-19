import React, { memo } from 'react';
import type { View } from 'react-native';
import type { SharedProps } from '@coinbase/cds-common/types/SharedProps';

import type { HStackProps } from '../../layout/HStack';
import { HStack } from '../../layout/HStack';

export type ContentCardFooterBaseProps = SharedProps & {
  children?: React.ReactNode;
};

export type ContentCardFooterProps = ContentCardFooterBaseProps & HStackProps;

export const ContentCardFooter = memo(
  ({
    ref,
    children,
    justifyContent = 'space-between',
    ...props
  }: ContentCardFooterProps & {
    ref?: React.Ref<View>;
  }) => (
    <HStack ref={ref} justifyContent={justifyContent} {...props}>
      {children}
    </HStack>
  ),
);
