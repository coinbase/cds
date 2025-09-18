import React, { memo } from 'react';

import { Text, type TextProps } from '../typography/Text';

export type InputLabelProps = TextProps<'label'>;

export const InputLabel = memo(function InputLabel({
  color = 'fg',
  disabled = false,
  ...props
}: InputLabelProps) {
  return (
    <Text
      as="label"
      color={color}
      disabled={disabled}
      display="block"
      font="label1"
      paddingY={0.5}
      {...props}
    />
  );
});
