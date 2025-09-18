import React, { forwardRef, memo } from 'react';
import type { View } from 'react-native';

import type { BoxProps } from './Box';
import { Box } from './Box';

export type VStackProps = BoxProps;

export const VStack = memo(
  forwardRef(function VStack(
    { flexDirection = 'column', ...props }: VStackProps,
    forwardedRef: React.ForwardedRef<View>,
  ) {
    return <Box ref={forwardedRef} flexDirection={flexDirection} {...props} />;
  }),
);
