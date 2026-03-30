import React, { forwardRef, memo } from 'react';
import type { View } from 'react-native';
import type { SharedProps } from '@coinbase/cds-common/types';

import { useComponentConfig } from '../../hooks/useComponentConfig';
import type { BoxBaseProps, HStackProps } from '../../layout';
import { HStack } from '../../layout';

export type ContentCardFooterBaseProps = BoxBaseProps &
  SharedProps & {
    children?: React.ReactNode;
  };

export type ContentCardFooterProps = ContentCardFooterBaseProps & HStackProps;

export const ContentCardFooter = memo(
  forwardRef((_props: ContentCardFooterProps, ref: React.ForwardedRef<View>) => {
    const mergedProps = useComponentConfig('ContentCardFooter', _props);
    const { children, justifyContent = 'space-between', ...props } = mergedProps;
    return (
      <HStack ref={ref} justifyContent={justifyContent} {...props}>
        {children}
      </HStack>
    );
  }),
);
