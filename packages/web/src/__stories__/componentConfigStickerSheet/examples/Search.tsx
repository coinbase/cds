import { memo, useState } from 'react';
import { SearchInput } from '@coinbase/cds-web/controls/SearchInput';

export const SearchExample = memo(() => {
  const [searchValue, setSearchValue] = useState('');
  return (
    <>
      <SearchInput
        compact
        onChangeText={setSearchValue}
        placeholder="Search..."
        value={searchValue}
      />
      <SearchInput onChangeText={setSearchValue} placeholder="Search..." value={searchValue} />
    </>
  );
});
