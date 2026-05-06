import React, { forwardRef, memo } from 'react';
import type { SharedProps } from '@coinbase/cds-common/types/SharedProps';
import { css } from '@linaria/core';

import { cx } from '../cx';
import type { BoxProps } from '../layout/Box';
import { Box } from '../layout/Box';

import type { TextInputBaseProps } from './TextInput';

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
    border-radius: var(--borderRadius-400);
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
} & SharedProps &
  Pick<TextInputBaseProps, 'compact'>;

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
