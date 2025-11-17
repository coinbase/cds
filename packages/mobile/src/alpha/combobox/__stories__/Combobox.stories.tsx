import { useMultiSelect } from '@coinbase/cds-common/select/useMultiSelect';

import { Example, ExampleScreen } from '../../../examples/ExampleScreen';
import { Combobox } from '../Combobox2';

const exampleOptions = [
  { value: '1', label: 'Option 1' },
  { value: '2', label: 'Option 2' },
  { value: '3', label: 'Option 3' },
  { value: '4', label: 'Option 4' },
  { value: '5', label: 'Option 5' },
  { value: '6', label: 'Option 6' },
  { value: '7', label: 'Option 7' },
  { value: '8', label: 'Option 8' },
  { value: '9', label: 'Option 9' },
  { value: '10', label: 'Option 10' },
];

const Default = () => {
  const { value, onChange } = useMultiSelect({ initialValue: ['1'] });

  return (
    <ExampleScreen>
      <Example title="Default">
        <Combobox
          onChange={onChange}
          options={exampleOptions}
          placeholder="Search..."
          value={value}
        />
      </Example>
    </ExampleScreen>
  );
};

export default Default;
