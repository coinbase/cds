import React, { useState } from 'react';

import { Example, ExampleScreen } from '../../examples/ExampleScreen';
import type { SearchInputProps } from '../SearchInput';
import { SearchInput } from '../SearchInput';

const MockSearchInput = ({ ...props }: Partial<SearchInputProps>) => {
  const [value, setValue] = useState('Search term');

  return (
    <SearchInput
      accessibilityLabel="Search"
      onChangeText={setValue}
      onClear={() => setValue('')}
      placeholder="Search..."
      value={value}
      {...props}
    />
  );
};

/**
 * One-off size density story for SearchInput (s/m/l).
 * Do not fold these into SearchInput.stories.tsx — keeps visual review of density isolated.
 */
const SearchInputSizeScreen = () => {
  return (
    <ExampleScreen>
      <Example inline title="Default (resolves to size l, 56px)">
        <MockSearchInput />
      </Example>
      <Example inline title="Deprecated compact (legacy behavior, 40px)">
        <MockSearchInput compact />
      </Example>
      <Example inline title='size="s" (replaces compact, 40px)'>
        <MockSearchInput size="s" />
      </Example>
      <Example inline title='size="m" (new, 48px)'>
        <MockSearchInput size="m" />
      </Example>
      <Example inline title='size="l" (default, 56px)'>
        <MockSearchInput size="l" />
      </Example>
      <Example inline title='compact + size="m" (size wins, 48px)'>
        <MockSearchInput compact size="m" />
      </Example>
    </ExampleScreen>
  );
};

export default SearchInputSizeScreen;
