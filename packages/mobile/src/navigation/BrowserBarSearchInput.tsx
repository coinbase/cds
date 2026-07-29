import { memo, useCallback } from 'react';
import type { BlurEvent, FocusEvent } from 'react-native';

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
  ({ onFocus, onBlur, size = 's', expandOnFocus = true, ...props }: BrowserBarSearchInputProps) => {
    const { setHideStart, setHideEnd } = useBrowserBarContext();

    const handleFocus = useCallback(
      (e: FocusEvent) => {
        if (expandOnFocus) {
          setHideStart(true);
          setHideEnd(true);
        }
        onFocus?.(e);
      },
      [expandOnFocus, onFocus, setHideStart, setHideEnd],
    );

    const handleBlur = useCallback(
      (e: BlurEvent) => {
        setHideEnd(false);
        setHideStart(false);
        onBlur?.(e);
      },
      [onBlur, setHideEnd, setHideStart],
    );

    // The browser bar always wants the dense input, so the density default moved from the deprecated
    // `compact` onto `size`. A consumer-supplied `compact` still arrives via the spread but is inert,
    // since `SearchInput` resolves `size` first.
    return <SearchInput onBlur={handleBlur} onFocus={handleFocus} size={size} {...props} />;
  },
);

BrowserBarSearchInput.displayName = 'BrowserBarSearchInput';
