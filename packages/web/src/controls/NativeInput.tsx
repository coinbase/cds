import React, { forwardRef, memo, useMemo } from 'react';
import type { SharedAccessibilityProps } from '@coinbase/cds-common/types/SharedAccessibilityProps';
import type { SharedProps } from '@coinbase/cds-common/types/SharedProps';
import type { TextAlignProps } from '@coinbase/cds-common/types/TextBaseProps';
import { css } from '@linaria/core';

import { cx } from '../cx';
import { useTheme } from '../hooks/useTheme';

const baseCss = css`
  font-size: var(--fontSize-body);
  line-height: var(--lineHeight-body);
  font-weight: var(--fontWeight-body);
  font-family: var(--fontFamily-body);
  min-width: 0;
  flex-grow: 2;
  background-color: transparent;
  color: var(--color-fg);
  border-color: transparent;

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

  &[type='number'] {
    -moz-appearance: textfield;
  }

  &[readonly]:not(:disabled) {
    background-color: var(--color-bgSecondary);
  }

  /* stylelint-disable a11y/no-display-none */
  /* clears the "X" from Internet Explorer */
  &[type='search']::-ms-clear {
    display: none;
    width: 0;
    height: 0;
  }
  &[type='search']::-ms-reveal {
    display: none;
    width: 0;
    height: 0;
  }
  /* clears the "X" from Chrome */
  &[type='search']::-webkit-search-decoration,
  &[type='search']::-webkit-search-cancel-button,
  &[type='search']::-webkit-search-results-button,
  &[type='search']::-webkit-search-results-decoration {
    display: none;
  }
  /* stylelint-enable a11y/no-display-none */

  &:-webkit-autofill,
  &:-webkit-autofill:hover,
  &:-webkit-autofill:focus,
  &:-webkit-autofill:active {
    border-radius: var(--borderRadius-200);
    -webkit-text-fill-color: var(--color-fg);
    transition: background-color 0s ease-in-out 5000s;
  }
`;

const originalContainerPaddingCss = css`
  padding: var(--space-2);
`;

const compactContainerPaddingCss = css`
  padding: var(--space-1);
`;

export type NativeInputProps = {
  compact?: boolean;
  /** Custom container spacing if needed. This will add to the existing spacing */
  containerSpacing?: string;
  /**
   * Text Align Input
   * @default start
   * */
  align?: TextAlignProps['align'];
  /**
   * Callback fired when pressed/clicked
   */
  onClick?: React.MouseEventHandler;
} & SharedProps &
  Pick<
    SharedAccessibilityProps,
    'accessibilityLabel' | 'accessibilityLabelledBy' | 'accessibilityHint'
  > &
  React.InputHTMLAttributes<HTMLInputElement>;

export const NativeInput = memo(
  forwardRef(function NativeInput(
    {
      containerSpacing,
      testID,
      align = 'start',
      onFocus,
      onClick,
      onBlur,
      onKeyDown,
      onChange,
      accessibilityLabel,
      accessibilityLabelledBy,
      accessibilityHint,
      compact,
      className,
      style,
      ...props
    }: NativeInputProps,
    ref: React.ForwardedRef<HTMLInputElement>,
  ) {
    const { activeColorScheme } = useTheme();
    const defaultContainerPadding = compact
      ? compactContainerPaddingCss
      : originalContainerPaddingCss;

    const dynamicStyles = useMemo(
      () => ({
        textAlign: align,
        colorScheme: activeColorScheme,
        ...style,
      }),
      [align, activeColorScheme, style],
    );

    return (
      <input
        ref={ref}
        aria-describedby={accessibilityHint}
        aria-label={accessibilityLabel}
        aria-labelledby={accessibilityLabelledBy}
        className={cx(baseCss, containerSpacing ?? defaultContainerPadding, className)}
        data-testid={testID}
        onBlur={onBlur}
        onChange={onChange}
        onClick={onClick}
        onFocus={onFocus}
        onKeyDown={onKeyDown}
        style={dynamicStyles}
        tabIndex={0}
        {...props}
      />
    );
  }),
);
