import React, { memo, useContext } from 'react';
import type { IconButtonVariant, InputVariant } from '@cbhq/cds-common/types';

import { IconButton, type IconButtonProps } from '../buttons/IconButton';
import { Box } from '../layout/Box';

import { TextInputFocusVariantContext } from './context';

export const variantTransformMap: Record<InputVariant, IconButtonVariant> = {
  positive: 'primary',
  negative: 'primary',
  foreground: 'primary',
  primary: 'primary',
  foregroundMuted: 'foregroundMuted',
  secondary: 'secondary',
};

export type InputIconButtonProps = IconButtonProps & {
  /**
   * If set to true, when parent input is focused, the icon will match the color of the focus state
   * @default false
   * */
  disableInheritFocusStyle?: boolean;
};

export const InputIconButton = memo(function InputIconButton({
  disableInheritFocusStyle = false,
  testID,
  variant = 'primary',
  accessibilityLabel,
  accessibilityHint,
  ...props
}: InputIconButtonProps) {
  const contextVariant = useContext(TextInputFocusVariantContext);
  const transformedVariant = contextVariant ? variantTransformMap[contextVariant] : variant;

  return (
    <Box paddingEnd={0.5} paddingStart={1} testID={testID}>
      <IconButton
        transparent
        accessibilityHint={accessibilityHint ?? props.name}
        accessibilityLabel={accessibilityLabel ?? props.name}
        variant={disableInheritFocusStyle ? variant : transformedVariant}
        {...props}
      />
    </Box>
  );
});
