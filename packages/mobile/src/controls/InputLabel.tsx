import React, { memo } from 'react';

import { Text } from '../typography/Text';

import type { HelperTextProps } from './HelperText';

export const InputLabel = memo(function InputLabel({
  color = 'fg',
  font = 'label1',
  ...props
}: HelperTextProps) {
  return <Text color={color} font={font} paddingY={0.5} {...props} />;
});
