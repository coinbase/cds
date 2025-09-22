import React, { forwardRef, memo } from 'react';
import type { View } from 'react-native';
import { contentCardMaxWidth, contentCardMinWidth } from '@cbhq/cds-common/tokens/card';
import type { ValidateProps } from '@cbhq/cds-common/types';

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
      paddingX = 3,
      paddingY = 2,
      ...props
    }: ContentCardProps,
    ref: React.ForwardedRef<View>,
  ) {
    return (
      <VStack
        ref={ref}
        gap={1}
        maxWidth={maxWidth}
        minWidth={minWidth}
        paddingX={paddingX}
        paddingY={paddingY}
        testID={testID}
        {...(props satisfies ValidateProps<
          typeof props,
          Omit<ContentCardProps, keyof VStackProps>
        >)}
      >
        {children}
      </VStack>
    );
  }),
);
