import React, { forwardRef, memo } from 'react';
import type { View } from 'react-native';
import type { SharedProps } from '@cbhq/cds-common/types';

import type { HStackProps } from '../../layout';
import { HStack } from '../../layout';

export type ContentCardFooterBaseProps = SharedProps & {
  children?: React.ReactNode;
};

export type ContentCardFooterProps = ContentCardFooterBaseProps & HStackProps;

export const ContentCardFooter = memo(
  forwardRef(
    ({ testID, children, ...props }: ContentCardFooterProps, ref: React.ForwardedRef<View>) => (
      <HStack ref={ref} justifyContent="space-between" testID={testID} {...props}>
        {children}
      </HStack>
    ),
  ),
);
