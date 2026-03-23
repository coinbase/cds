import React, { forwardRef, memo, useContext } from 'react';
import type { View } from 'react-native';
import type { IconButtonVariant, InputVariant } from '@coinbase/cds-common/types';

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

export const InputIconButton = memo(
  forwardRef<View, InputIconButtonProps>(function InputIconButton(
    {
      disableInheritFocusStyle = false,
      testID,
      variant = 'primary',
      accessibilityLabel,
      accessibilityHint,
      ...props
    },
    ref,
  ) {
    const contextVariant = useContext(TextInputFocusVariantContext);
    const transformedVariant = contextVariant ? variantTransformMap[contextVariant] : variant;

    return (
      <Box paddingEnd={0.5} paddingStart={1} testID={testID}>
        <IconButton
          ref={ref}
          transparent
          accessibilityHint={accessibilityHint ?? props.name}
          accessibilityLabel={accessibilityLabel ?? props.name}
          variant={disableInheritFocusStyle ? variant : transformedVariant}
          {...props}
        />
      </Box>
    );
  }),
);
