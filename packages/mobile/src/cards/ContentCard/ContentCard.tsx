import React, { memo } from 'react';
import type { View } from 'react-native';
import { contentCardMaxWidth, contentCardMinWidth } from '@coinbase/cds-common/tokens/card';

import { VStack, type VStackProps } from '../../layout/VStack';

export type ContentCardBaseProps = VStackProps;

export type ContentCardProps = ContentCardBaseProps;

export const ContentCard = memo(function ContentCard({
  ref,
  testID,
  children,
  maxWidth = contentCardMaxWidth,
  minWidth = contentCardMinWidth,
  borderRadius = 500,
  padding = 2,
  gap = 2,
  ...props
}: ContentCardProps & {
  ref?: React.Ref<View>;
}) {
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
});
