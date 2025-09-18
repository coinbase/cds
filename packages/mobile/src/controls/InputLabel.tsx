import React, { memo } from 'react';

import { Text } from '../typography/Text';

import type { HelperTextProps } from './HelperText';

export const InputLabel = memo(function InputLabel({ color, ...props }: HelperTextProps) {
  return <Text color={color} font="label1" paddingY={0.5} {...props} />;
});
