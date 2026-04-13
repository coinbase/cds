import React, { forwardRef, memo, useCallback, useMemo, useRef, useState } from 'react';
import type { ForwardedRef } from 'react';
import type {
  GestureResponderEvent,
  NativeSyntheticEvent,
  TextInput as RNTextInput,
  TextInputFocusEventData,
} from 'react-native';
import { useMergeRefs } from '@coinbase/cds-common/hooks/useMergeRefs';
import type { IconName } from '@coinbase/cds-common/types';

import { useComponentConfig } from '../hooks/useComponentConfig';
import { Box } from '../layout/Box';

import { InputIconButton } from './InputIconButton';
import { TextInput, type TextInputBaseProps, type TextInputProps } from './TextInput';

export type SearchInputBaseProps = Pick<
  TextInputBaseProps,
  | 'accessibilityHint'
  | 'accessibilityLabel'
  | 'accessibilityLabelledBy'
  | 'bordered'
  | 'borderRadius'
  | 'compact'
  | 'disabled'
  | 'enableColorSurge'
  | 'focusedBorderWidth'
  | 'helperTextErrorIconAccessibilityLabel'
  | 'font'
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
  TextInputProps & {
    /** Callback is fired when the clear icon is pressed */
    onClear?: (event: GestureResponderEvent) => void;
    /**
     * Callback is fired when backArrow is pressed.
     * If disableBackArrow is true, this will do nothing
     */
    onBack?: (event: GestureResponderEvent) => void;
    /**
     * If this is set to true, the start icon won't toggle between backArrow and Search.
     * The start icon will always be a search icon
     */
    disableBackArrow?: boolean;
  };

export const SearchInput = memo(
  forwardRef((_props: SearchInputProps, ref: ForwardedRef<RNTextInput>) => {
    const mergedProps = useComponentConfig('SearchInput', _props);
    const {
      value,
      testID,
      onSearch,
      onBack,
      onChangeText,
      onClear,
      onFocus,
      onBlur,
      disabled,
      disableBackArrow,
      hideStartIcon,
      hideEndIcon,
      startIcon,
      end,
      startIconAccessibilityLabel = 'Back',
      clearIconAccessibilityLabel = 'Clear text',
      borderRadius = 1000,
      ...props
    } = mergedProps;
    const [startIconName, setStartIconName] = useState<IconName>(startIcon ?? 'search');
    const internalRef = useRef<RNTextInput>(null);
    const refs = useMergeRefs(ref, internalRef);

    const handleOnFocus = useCallback(
      (e: NativeSyntheticEvent<TextInputFocusEventData>) => {
        onFocus?.(e);

        if (!disableBackArrow && startIcon === undefined) {
          setStartIconName('backArrow');
        }
      },
      [disableBackArrow, onFocus, startIcon],
    );

    const handleOnBlur = useCallback(
      (e: NativeSyntheticEvent<TextInputFocusEventData>) => {
        onBlur?.(e);

        if (startIcon === undefined) {
          setStartIconName('search');
        }
      },
      [onBlur, startIcon],
    );

    /**
     * This is triggered when 'Enter', when Search IconButton is pressed, or when
     * clearing
     */
    const handleOnSearch = useCallback(() => {
      onSearch?.(value?.toString() ?? '');

      internalRef.current?.focus();
    }, [onSearch, value]);

    const handleOnClear = useCallback(
      (e: GestureResponderEvent) => {
        onClear?.(e);
        internalRef.current?.focus();
        onChangeText?.('');
        onSearch?.('');
      },
      [onClear, onChangeText, onSearch],
    );

    const handleOnBack = useCallback(
      (e: GestureResponderEvent) => {
        onBack?.(e);
        internalRef.current?.blur();
      },
      [onBack],
    );

    const determineStartIconAccessibilityLabel = useMemo(
      () => (startIconName === 'backArrow' ? startIconAccessibilityLabel : undefined),
      [startIconAccessibilityLabel, startIconName],
    );

    return (
      <TextInput
        ref={refs}
        accessibilityRole="search"
        borderRadius={borderRadius}
        disabled={disabled}
        end={
          end ??
          (!!value && !hideEndIcon && (
            <Box paddingEnd={0.5}>
              <InputIconButton
                accessibilityLabel={clearIconAccessibilityLabel}
                name="close"
                onPress={handleOnClear}
                testID={testID && `${testID}-close-iconbtn`}
              />
            </Box>
          ))
        }
        keyboardType="web-search"
        onBlur={handleOnBlur}
        onChangeText={onChangeText}
        onFocus={handleOnFocus}
        onSubmitEditing={handleOnSearch}
        start={
          !hideStartIcon && (
            <InputIconButton
              accessibilityElementsHidden // The pressable wrapper will be accessible, not the icon
              accessibilityLabel={determineStartIconAccessibilityLabel} // A11y props will get passed to the pressable wrapper
              disabled={disabled}
              importantForAccessibility="no"
              name={startIconName}
              onPress={startIconName === 'backArrow' ? handleOnBack : handleOnSearch}
              testID={testID && `${testID}-searchinput-iconbtn`}
            />
          )
        }
        testID={testID}
        value={value}
        variant="secondary"
        {...props}
      />
    );
  }),
);
