import React, { memo, useContext } from 'react';
import type { ThemeVars } from '@coinbase/cds-common/core/theme';
import type { InputVariant } from '@coinbase/cds-common/types/InputBaseProps';
import type { SharedAccessibilityProps } from '@coinbase/cds-common/types/SharedAccessibilityProps';
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
  compact?: boolean;
} & Omit<IconProps, 'size'> &
  SharedProps &
  Pick<SharedAccessibilityProps, 'accessibilityLabel' | 'accessibilityHint'>;

const variantColorMap: Record<InputVariant, ThemeVars.Color> = {
  primary: 'fgPrimary',
  positive: 'fgPositive',
  negative: 'fgNegative',
  foreground: 'fg',
  foregroundMuted: 'fgMuted',
  secondary: 'fgMuted',
};

export const InputIcon = memo(function InputIcon({
  disableInheritFocusStyle = false,
  testID,
  color = 'fg',
  compact,
  accessibilityLabel,
  accessibilityHint,
  ...props
}: InputIconProps) {
  const variant = useContext(TextInputFocusVariantContext);
  const variantColor = variant ? variantColorMap[variant] : undefined;

  return (
    <Box
      accessibilityHint={accessibilityHint ?? props.name}
      accessibilityLabel={accessibilityLabel ?? props.name}
      paddingX={compact ? 1 : 2}
      testID={testID}
    >
      <Icon
        color={disableInheritFocusStyle ? color : (variantColor ?? color)}
        size="s"
        {...props}
      />
    </Box>
  );
});
