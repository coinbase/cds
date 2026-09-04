import React from 'react';
import { IconButton } from '@coinbase/cds-web/buttons';
import { Tooltip } from '@coinbase/cds-web/overlays';
import { useKBar } from 'kbar';

const SearchBar = () => {
  const {
    query: { toggle },
  } = useKBar();
  return (
    <Tooltip content="Click or press ⌘ + K to search">
      <IconButton accessibilityLabel="Search" name="magnifyingGlass" onClick={toggle} />
    </Tooltip>
  );
};

export default SearchBar;
