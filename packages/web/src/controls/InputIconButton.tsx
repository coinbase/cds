import React, { forwardRef, memo, useContext } from 'react';
import type { IconButtonVariant } from '@coinbase/cds-common/types/IconButtonBaseProps';
import type { InputVariant } from '@coinbase/cds-common/types/InputBaseProps';

import {
  IconButton,
  type IconButtonDefaultElement,
  type IconButtonProps,
} from '../buttons/IconButton';
import { Box } from '../layout/Box';

import { TextInputFocusVariantContext } from './context';

export const variantTransformMap: Record<InputVariant, IconButtonVariant> = {
  positive: 'primary',
  negative: 'primary',
  foreground: 'primary',
  primary: 'primary',
  foregroundMuted: 'secondary',
  secondary: 'secondary',
};

export type InputIconButtonProps = IconButtonProps<IconButtonDefaultElement> & {
  /**
   * If set to true, when parent input is focused, the icon will match the color of the focus state
   * @default false
   * */
  disableInheritFocusStyle?: boolean;
};

/**
 * Interactive icon-button adornment for a parent input's `start` or `end` slot
 * (e.g. clear, calendar, or custom actions).
 *
 * Reads {@link TextInputFocusVariantContext} so the button variant stays in sync with
 * the parent input's focused variant. Prefer this over a plain {@link IconButton}
 * inside `TextInput`, `SearchInput`, or `Select` start/end content.
 *
 * The context is provided by {@link TextInput} (and also by `Select` / `SelectTrigger`)
 * when the input is focused.
 */
export const InputIconButton = memo(
  forwardRef(function InputIconButton(
    {
      disableInheritFocusStyle = false,
      testID,
      variant = 'primary',
      ...props
    }: InputIconButtonProps,
    ref: React.ForwardedRef<HTMLButtonElement>,
  ) {
    const contextVariant = useContext(TextInputFocusVariantContext);
    const transformedVariant = contextVariant ? variantTransformMap[contextVariant] : variant;

    return (
      <Box testID={testID}>
        <IconButton
          ref={ref}
          transparent
          variant={disableInheritFocusStyle ? variant : transformedVariant}
          {...props}
        />
      </Box>
    );
  }),
);
