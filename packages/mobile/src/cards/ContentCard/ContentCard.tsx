import React, { forwardRef, memo } from 'react';
import type { View } from 'react-native';
import { contentCardMaxWidth, contentCardMinWidth } from '@coinbase/cds-common/tokens/card';

import { VStack, type VStackProps } from '../../layout';

export type ContentCardBaseProps = VStackProps;

export type ContentCardProps = ContentCardBaseProps;

export const ContentCard = memo(
  forwardRef(function ContentCard(
    {
      testID,
      children,
      maxWidth = contentCardMaxWidth,
      minWidth = contentCardMinWidth,
      borderRadius = 500,
      padding = 2,
      gap = 2,
      ...props
    }: ContentCardProps,
    ref: React.ForwardedRef<View>,
  ) {
    return (
      <VStack
        ref={ref}
        borderRadius={borderRadius}
        gap={gap}
        maxWidth={maxWidth}
        minWidth={minWidth}
        padding={padding}
        testID={testID}
        {...props}
      >
        {children}
      </VStack>
    );
  }),
);
