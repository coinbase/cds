import React, { forwardRef, memo, useCallback, useMemo, useRef } from 'react';
import { useMergeRefs } from '@coinbase/cds-common/hooks/useMergeRefs';
import type { IconName } from '@coinbase/cds-common/types';
import { css } from '@linaria/core';

import { cx } from '../cx';
import { Box } from '../layout/Box';

import { InputIcon } from './InputIcon';
import { InputIconButton } from './InputIconButton';
import { TextInput, type TextInputBaseProps } from './TextInput';

export const scales = {
  regular: 56,
  compact: 40,
};

const baseCss = css`
  height: ${scales.regular}px;
`;

const compactCss = css`
  height: ${scales.compact}px;
`;

type HTMLElementProps = React.InputHTMLAttributes<HTMLInputElement> &
  Required<Pick<HTMLInputElement, 'value'>>;

export type SearchInputBaseProps = Pick<
  TextInputBaseProps,
  | 'accessibilityHint'
  | 'accessibilityLabel'
  | 'accessibilityLabelledBy'
  | 'bordered'
  | 'compact'
  | 'disabled'
  | 'enableColorSurge'
  | 'focusedBorderWidth'
  | 'helperTextErrorIconAccessibilityLabel'
  | 'placeholder'
  | 'testID'
  | 'testIDMap'
  | 'width'
> & {
  /**
   * Callback is fired when a user hits enter on the keyboard. Can obtain the query
   * through str parameter
   */
  onSearch?: (str: string) => void;
  /**
   * hide the start icon
   * @default false
   */
  hideStartIcon?: boolean;
  /**
   * Set the start icon. You can only
   * set it to search | backArrow icon. If
   * you set this, the icon would not toggle
   * between search and backArrow depending on
   * the focus state
   * @default search
   */
  startIcon?: Extract<IconName, 'search' | 'backArrow'>;
  /**
   * hide the end icon
   * @default undefined
   */
  hideEndIcon?: boolean;
  /**
   * Set the end node
   * @default undefined
   */
  end?: React.ReactNode;
  /**
   * Set the a11y label for the clear icon
   */
  clearIconAccessibilityLabel?: string | undefined;
  /**
   * Set the a11y label for the start icon
   */
  startIconAccessibilityLabel?: string | undefined;
};

export type SearchInputProps = SearchInputBaseProps &
  HTMLElementProps & {
    onClear?: React.MouseEventHandler;
    onChangeText: (text: string) => void;
    /**
     * Callback fired when pressed/clicked
     */
    onClick?: React.MouseEventHandler;
  };

export const SearchInput = memo(
  forwardRef(function SearchInput(
    {
      onChange,
      onClear,
      onChangeText,
      onSearch,
      testID,
      value,
      compact,
      hideStartIcon = false,
      hideEndIcon,
      startIcon,
      end,
      startIconAccessibilityLabel = 'Back',
      clearIconAccessibilityLabel = 'Clear search query',
      ...props
    }: SearchInputProps,
    ref: React.ForwardedRef<HTMLInputElement>,
  ) {
    const internalRef = useRef<HTMLInputElement>(null);
    const refs = useMergeRefs(ref, internalRef);

    const handleOnChange = useCallback(
      (e: React.ChangeEvent<HTMLInputElement>) => {
        onChange?.(e);
        onChangeText?.(e.target.value);
      },
      [onChange, onChangeText],
    );

    const handleOnKeyUp = useCallback(
      (event: React.KeyboardEvent<HTMLElement>) => {
        if (event.key === 'Enter') {
          onSearch?.(value?.toString() ?? '');
        }
      },
      [onSearch, value],
    );

    const handleOnClear = useCallback(
      (e: React.MouseEvent) => {
        onClear?.(e);
        internalRef.current?.focus();
        onChangeText?.('');
        onSearch?.('');
      },
      [onClear, onChangeText, onSearch],
    );

    const determineStartIconAccessibilityLabel = useMemo(
      () => (startIcon === 'backArrow' ? startIconAccessibilityLabel : undefined),
      [startIconAccessibilityLabel, startIcon],
    );

    return (
      <TextInput
        ref={refs}
        borderRadius={1000}
        className={cx(baseCss, compact && compactCss)}
        end={
          end ??
          (!!value && !hideEndIcon && (
            <Box marginEnd={compact ? -0.5 : 0} paddingEnd={compact ? 0 : 0.5}>
              <InputIconButton
                accessibilityLabel={clearIconAccessibilityLabel}
                name="close"
                onClick={handleOnClear}
                testID={testID && `${testID}-close-iconbtn`}
              />
            </Box>
          ))
        }
        onChange={handleOnChange}
        onKeyUp={handleOnKeyUp}
        role="searchbox"
        start={
          !hideStartIcon && (
            <InputIcon
              accessibilityLabel={determineStartIconAccessibilityLabel}
              name={startIcon ?? 'search'}
              testID={testID && `${testID}-search-icon`}
            />
          )
        }
        testID={testID}
        type="search"
        value={value}
        variant="secondary"
        {...props}
      />
    );
  }),
);
