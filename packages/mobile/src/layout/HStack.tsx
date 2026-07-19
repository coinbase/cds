import React, { memo } from 'react';
import type { View } from 'react-native';

import { Box, type BoxProps } from './Box';

export type HStackProps = BoxProps;

export const HStack = memo(function HStack({
  ref: forwardedRef,
  flexDirection = 'row',
  ...props
}: HStackProps & {
  ref?: React.Ref<View>;
}) {
  return <Box ref={forwardedRef} flexDirection={flexDirection} {...props} />;
});
