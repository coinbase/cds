import React, { forwardRef, memo, useContext } from 'react';
import type { ThemeVars } from '@coinbase/cds-common/core/theme';
import type { InputVariant } from '@coinbase/cds-common/types/InputBaseProps';
import type { SharedProps } from '@coinbase/cds-common/types/SharedProps';

import type { IconProps } from '../icons/Icon';
import { Icon } from '../icons/Icon';
import { Box } from '../layout/Box';

import { TextInputFocusVariantContext } from './context';

export type InputIconProps = {
  /**
   * If set to true, when parent input is focused, the icon will match the color of the focus state
   * @default false
   * */
  disableInheritFocusStyle?: boolean;
} & Omit<IconProps, 'size'> &
  SharedProps;

export const variantColorMap: Record<InputVariant, ThemeVars.Color> = {
  primary: 'fgPrimary',
  positive: 'fgPositive',
  negative: 'fgNegative',
  foreground: 'fg',
  foregroundMuted: 'fgMuted',
  secondary: 'bgSecondary',
};

export const InputIcon = memo(
  forwardRef(
    (
      { disableInheritFocusStyle = false, testID, color = 'fg', ...props }: InputIconProps,
      ref: React.ForwardedRef<HTMLDivElement>,
    ) => {
      const variant = useContext(TextInputFocusVariantContext);
      const variantColor = variant ? variantColorMap[variant] : undefined;

      return (
        <Box paddingX={2} testID={testID}>
          <Icon
            ref={ref}
            color={disableInheritFocusStyle ? color : (variantColor ?? color)}
            size="s"
            {...props}
          />
        </Box>
      );
    },
  ),
);
