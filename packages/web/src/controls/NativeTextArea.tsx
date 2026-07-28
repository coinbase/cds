import React, { forwardRef, memo } from 'react';
import type { SharedProps } from '@coinbase/cds-common/types/SharedProps';
import { css } from '@linaria/core';

import { cx } from '../cx';
import type { BoxProps } from '../layout/Box';
import { Box } from '../layout/Box';

const baseCss = css`
  min-width: 0;
  flex-grow: 2;
  background-color: transparent;
  color: var(--color-fg);

  &::-webkit-outer-spin-button,
  &::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  &:focus {
    outline-style: none;
    box-shadow: none;
    border-color: transparent;
  }

  &::placeholder {
    color: var(--color-fgMuted);
    opacity: 1;
  }

  &:-webkit-autofill {
    border-radius: var(--borderRadius-200);
  }
`;

const defaultContainerPaddingCss = css`
  padding: var(--space-2);

  &[data-compact='true'] {
    padding: var(--space-1);
  }
`;

export type NativeTextAreaBaseProp = {
  /** Custom container spacing if needed. This will add to the existing spacing */
  containerSpacing?: string;
  /**
   * Callback fired when pressed/clicked
   */
  onClick?: React.MouseEventHandler;
  // Declared locally rather than picked from `TextInputBaseProps` so it does not inherit
  // TextInput's `compact` → `size="s"` deprecation: `NativeTextArea` has no `size` prop, so the
  // replacement here is `padding` props — matching `NativeInput`.
  /**
   * Decreases the padding within the textarea element.
   * @default false
   * @deprecated Use `padding` props instead. This will be removed in a future major release.
   * @deprecationExpectedRemoval v10
   */
  compact?: boolean;
} & SharedProps;

export type NativeTextAreaProp = NativeTextAreaBaseProp & BoxProps<'textarea'>;

export const NativeTextArea = memo(
  forwardRef(function NativeTextArea(
    {
      font = 'body',
      testID,
      onFocus,
      onClick,
      onBlur,
      onKeyDown,
      onChange,
      accessibilityHint,
      compact,
      containerSpacing,
      className,
      ...props
    }: NativeTextAreaProp,
    ref: React.ForwardedRef<HTMLTextAreaElement>,
  ) {
    return (
      <Box
        ref={ref}
        aria-describedby={accessibilityHint}
        as="textarea"
        className={cx(baseCss, containerSpacing ?? defaultContainerPaddingCss, className)}
        data-compact={compact}
        data-testid={testID}
        font={font}
        onBlur={onBlur}
        onChange={onChange}
        onClick={onClick}
        onFocus={onFocus}
        onKeyDown={onKeyDown}
        tabIndex={0}
        {...props}
      />
    );
  }),
);
