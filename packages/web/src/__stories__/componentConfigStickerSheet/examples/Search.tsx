import { memo, useState } from 'react';
import { SearchInput } from '@coinbase/cds-web/controls/SearchInput';

export const SearchExample = memo(() => {
  const [searchValue, setSearchValue] = useState('');
  return (
    <>
      <SearchInput
        compact
        clearIconAccessibilityLabel="Clear search text"
        onChangeText={setSearchValue}
        placeholder="Search..."
        startIconAccessibilityLabel="Back"
        value={searchValue}
      />
      <SearchInput
        clearIconAccessibilityLabel="Clear search text"
        onChangeText={setSearchValue}
        placeholder="Search..."
        startIconAccessibilityLabel="Back"
        value={searchValue}
      />
    </>
  );
});
