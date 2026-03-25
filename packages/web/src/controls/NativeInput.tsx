import React, { forwardRef, memo, useMemo } from 'react';
import type { ThemeVars } from '@coinbase/cds-common/core/theme';
import type { SharedAccessibilityProps } from '@coinbase/cds-common/types/SharedAccessibilityProps';
import type { SharedProps } from '@coinbase/cds-common/types/SharedProps';
import type { TextAlignProps } from '@coinbase/cds-common/types/TextBaseProps';
import { css } from '@linaria/core';

import { cx } from '../cx';
import { useTheme } from '../hooks/useTheme';

const baseCss = css`
  font-size: var(--nativeInput-fontSize, var(--fontSize-body));
  line-height: var(--nativeInput-lineHeight, var(--lineHeight-body));
  font-weight: var(--nativeInput-fontWeight, var(--fontWeight-body));
  font-family: var(--nativeInput-fontFamily, var(--fontFamily-body));
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
   * Typography font token used for typed input text.
   * @default body
   */
  inputFont?: ThemeVars.Font;
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
      inputFont = 'body',
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
      () =>
        ({
          '--nativeInput-fontSize': `var(--fontSize-${inputFont})`,
          '--nativeInput-lineHeight': `var(--lineHeight-${inputFont})`,
          '--nativeInput-fontWeight': `var(--fontWeight-${inputFont})`,
          '--nativeInput-fontFamily': `var(--fontFamily-${inputFont})`,
          fontSize: `var(--fontSize-${inputFont})`,
          lineHeight: `var(--lineHeight-${inputFont})`,
          fontWeight: `var(--fontWeight-${inputFont})`,
          fontFamily: `var(--fontFamily-${inputFont})`,
          textAlign: align,
          colorScheme: activeColorScheme,
          ...style,
        }) as React.CSSProperties,
      [align, activeColorScheme, inputFont, style],
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
