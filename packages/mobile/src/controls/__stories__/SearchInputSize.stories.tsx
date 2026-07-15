import { useState } from 'react';

import { Example, ExampleScreen } from '../../examples/ExampleScreen';
import type { SearchInputProps } from '../SearchInput';
import { SearchInput } from '../SearchInput';

const MockSearchInput = (props: Partial<SearchInputProps>) => {
  const [value, setValue] = useState(typeof props.value === 'string' ? props.value : 'Search term');

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
 * One-off t-shirt size stories for SearchInput (s/m/l).
 * Do not fold these into SearchInput.stories.tsx — keeps visual review of sizing isolated.
 */
const SearchInputSizeScreen = () => {
  return (
    <ExampleScreen>
      <Example title="Default (resolves to size l)">
        <MockSearchInput />
      </Example>
      <Example title="Deprecated compact (renders as size s)">
        <MockSearchInput compact />
      </Example>
      <Example title='size="s"'>
        <MockSearchInput size="s" />
      </Example>
      <Example title='size="m"'>
        <MockSearchInput size="m" />
      </Example>
      <Example title='size="l"'>
        <MockSearchInput size="l" />
      </Example>
      <Example title='compact + size="m" (size wins)'>
        <MockSearchInput compact size="m" />
      </Example>
    </ExampleScreen>
  );
};

export default SearchInputSizeScreen;
