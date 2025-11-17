import { useCallback, useState } from 'react';

import { VStack } from '../../../layout/VStack';
import { Combobox } from '../Combobox';

export default {
  title: 'Components/Alpha/Combobox',
  component: Combobox,
};

const exampleOptions = [
  { value: null, label: 'Null' },
  { value: '1', label: 'One' },
  { value: '2', label: 'Two' },
];

export const Default = () => {
  const [activeSingleValue, setActiveSingleValue] = useState<string | null>('1');
  const [searchText, setSearchText] = useState('');
  const handleSearch = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(event.target.value);
  }, []);
  //   const { value: multiValue, onChange: handleMultiChange } = useMultiSelect({
  //     initialValue: ['1'],
  //   });
  return (
    <VStack>
      <Combobox
        onChange={setActiveSingleValue}
        onSearch={handleSearch}
        options={exampleOptions}
        placeholder="Empty value"
        searchText={searchText}
        value={activeSingleValue}
      />
      {/* <Select
        onChange={handleMultiChange}
        options={exampleOptions}
        placeholder="Empty value"
        value={multiValue}
      /> */}
    </VStack>
  );
};
