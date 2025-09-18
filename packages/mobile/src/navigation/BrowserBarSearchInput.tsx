import { memo, useCallback } from 'react';
import type { NativeSyntheticEvent, TextInputFocusEventData } from 'react-native';

import { SearchInput, type SearchInputProps } from '../controls/SearchInput';

import { useBrowserBarContext } from './BrowserBar';

export type BrowserBarSearchInputProps = SearchInputProps & {
  /**
   * Whether to expand itself and collapse the start and end node of the browser bar when the input is focused.
   * @default true
   */
  expandOnFocus?: boolean;
};

/**
 * This component is used to render the search input in the browser bar.
 * It wraps around the existing SearchInput component and handles the logic
 * for collapsing the start and end node of the browser bar when the input is focused.
 */
export const BrowserBarSearchInput = memo(
  ({
    onFocus,
    onBlur,
    compact = true,
    expandOnFocus = true,
    ...props
  }: BrowserBarSearchInputProps) => {
    const { setHideStart, setHideEnd } = useBrowserBarContext();

    const handleFocus = useCallback(
      (e: NativeSyntheticEvent<TextInputFocusEventData>) => {
        if (expandOnFocus) {
          setHideStart(true);
          setHideEnd(true);
        }
        onFocus?.(e);
      },
      [expandOnFocus, onFocus, setHideStart, setHideEnd],
    );

    const handleBlur = useCallback(
      (e: NativeSyntheticEvent<TextInputFocusEventData>) => {
        setHideEnd(false);
        setHideStart(false);
        onBlur?.(e);
      },
      [onBlur, setHideEnd, setHideStart],
    );

    return <SearchInput compact={compact} onBlur={handleBlur} onFocus={handleFocus} {...props} />;
  },
);

BrowserBarSearchInput.displayName = 'BrowserBarSearchInput';
