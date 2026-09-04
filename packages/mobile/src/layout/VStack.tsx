import React, { memo } from 'react';
import type { View } from 'react-native';

import type { BoxProps } from './Box';
import { Box } from './Box';

export type VStackProps = BoxProps;

export const VStack = memo(function VStack({
  ref: forwardedRef,
  flexDirection = 'column',
  ...props
}: VStackProps & {
  ref?: React.Ref<View>;
}) {
  return <Box ref={forwardedRef} flexDirection={flexDirection} {...props} />;
});
