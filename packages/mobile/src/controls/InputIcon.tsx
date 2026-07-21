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
  /**
   * Kept for backward compatibility. Spacing is no longer applied by InputIcon —
   * apply padding at the call site instead.
   */
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

/**
 * Decorative icon adornment for a parent input's `start` or `end` slot.
 *
 * Reads {@link TextInputFocusVariantContext} so the icon color stays in sync with the
 * parent input's focused variant. Prefer this over a plain {@link Icon} inside
 * `TextInput`, `SearchInput`, or `Select` start/end content.
 *
 * The context is provided by {@link TextInput} (and also by `Select`) when the input
 * is focused.
 */
export const InputIcon = memo(function InputIcon({
  disableInheritFocusStyle = false,
  testID,
  color = 'fg',
  compact: _compact,
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
