import React, { memo, useState } from 'react';

import { SearchInput } from '../../../../controls/SearchInput';
import { VStack } from '../../../../layout/VStack';

export const SearchExample = memo(() => {
  const [value, setValue] = useState('');
  const [compactValue, setCompactValue] = useState('');

  return (
    <VStack gap={1} width="100%">
      <SearchInput onChangeText={setValue} value={value} />
      <SearchInput compact onChangeText={setCompactValue} value={compactValue} />
    </VStack>
  );
});
