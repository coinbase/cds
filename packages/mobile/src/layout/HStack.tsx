import React, { forwardRef, memo } from 'react';
import type { View } from 'react-native';

import { Box, type BoxProps } from './Box';

export type HStackProps = BoxProps;

export const HStack = memo(
  forwardRef(function HStack(
    { flexDirection = 'row', ...props }: HStackProps,
    forwardedRef: React.ForwardedRef<View>,
  ) {
    return <Box ref={forwardedRef} flexDirection={flexDirection} {...props} />;
  }),
);
