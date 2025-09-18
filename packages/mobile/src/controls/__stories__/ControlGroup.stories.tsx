import { useState } from 'react';

import { Example, ExampleScreen } from '../../examples/ExampleScreen';
import { Text } from '../../typography/Text';
import { Checkbox, CheckboxCell, ControlGroup, Radio, RadioCell, Switch } from '..';

const ControlGroupScreen = () => {
  const radioOptions = [
    { value: '1', children: 'Radio Option 1' },
    { value: '2', children: 'Radio Option 2' },
    { value: '3', children: 'Radio Option 3' },
    { value: '4', children: 'Radio Option 4 (disabled)', disabled: true },
    { value: '5', children: 'Radio Option 5 (readOnly)', readOnly: true },
  ];

  const checkboxOptions = [
    { value: '1', label: 'Checkbox Option 1' },
    { value: '2', label: 'Checkbox Option 2' },
    { value: '3', label: 'Checkbox Option 3' },
    { value: '4', label: 'Checkbox Option 4 (disabled)', disabled: true },
    { value: '5', label: 'Checkbox Option 5 (readOnly)', readOnly: true },
  ];

  const radioCellOptions = [
    { value: '1', title: 'Radio Cell 1', description: 'Description for radio cell 1' },
    { value: '2', title: 'Radio Cell 2', description: 'Description for radio cell 2' },
    { value: '3', title: 'Radio Cell 3', description: 'Description for radio cell 3' },
    {
      value: '4',
      title: 'Radio Cell 4 (disabled)',
      description: 'Description for radio cell 4',
      disabled: true,
    },
    {
      value: '5',
      title: 'Radio Cell 5 (readOnly)',
      description: 'Description for radio cell 5',
      readOnly: true,
    },
  ];

  const checkboxCellOptions = [
    { value: '1', title: 'Checkbox Cell 1', description: 'Description for checkbox cell 1' },
    { value: '2', title: 'Checkbox Cell 2', description: 'Description for checkbox cell 2' },
    { value: '3', title: 'Checkbox Cell 3', description: 'Description for checkbox cell 3' },
    {
      value: '4',
      title: 'Checkbox Cell 4 (disabled)',
      description: 'Description for checkbox cell 4',
      disabled: true,
    },
    {
      value: '5',
      title: 'Checkbox Cell 5 (readOnly)',
      description: 'Description for checkbox cell 5',
      readOnly: true,
    },
  ];

  const switchOptions = [
    { value: '1', children: 'Switch 1' },
    { value: '2', children: 'Switch 2' },
    { value: '3', children: 'Switch 3' },
    { value: '4', children: 'Switch 4 (disabled)', disabled: true },
    { value: '5', children: 'Switch 5 (readOnly)', readOnly: true },
  ];

  const RadioExample = () => {
    const [value, setValue] = useState('one');
    const handleChange = (newValue?: string, isChecked?: boolean) => {
      if (isChecked && typeof newValue === 'string') {
        setValue(newValue);
      }
    };
    return (
      <ControlGroup
        ControlComponent={Radio}
        label={<Text font="headline">Radio Group</Text>}
        onChange={handleChange}
        options={radioOptions}
        role="radiogroup"
        value={value}
      />
    );
  };

  const CheckboxExample = () => {
    const [value, setValue] = useState(['one']);
    const handleChange = (optionValue?: string, isChecked?: boolean) => {
      if (!optionValue) return;
      setValue((currentValue) => {
        if (isChecked) {
          return [...currentValue, optionValue];
        }
        return currentValue.filter((v) => v !== optionValue);
      });
    };
    return (
      <ControlGroup
        ControlComponent={Checkbox}
        label={<Text font="headline">Checkbox Group</Text>}
        onChange={handleChange}
        options={checkboxOptions}
        value={value}
      />
    );
  };

  const RadioCellExample = () => {
    const [value, setValue] = useState('one');
    const handleChange = (newValue?: string, isChecked?: boolean) => {
      if (isChecked && typeof newValue === 'string') {
        setValue(newValue);
      }
    };
    return (
      <ControlGroup
        ControlComponent={RadioCell}
        label={<Text font="headline">Radio Group</Text>}
        onChange={handleChange}
        options={radioCellOptions}
        role="radiogroup"
        value={value}
      />
    );
  };

  const CheckboxCellExample = () => {
    const [value, setValue] = useState(['one']);
    const handleChange = (optionValue?: string, isChecked?: boolean) => {
      if (!optionValue) return;
      setValue((currentValue) => {
        if (isChecked) {
          return [...currentValue, optionValue];
        }
        return currentValue.filter((v) => v !== optionValue);
      });
    };
    return (
      <ControlGroup
        ControlComponent={CheckboxCell}
        label={<Text font="headline">Checkbox Group</Text>}
        onChange={handleChange}
        options={checkboxCellOptions}
        value={value}
      />
    );
  };

  const SwitchExample = () => {
    const [value, setValue] = useState<string[]>([]);

    const handleToggle = (optionValue: string | undefined, isChecked?: boolean) => {
      if (!optionValue) return;
      setValue((currentValue) => {
        if (isChecked && optionValue) {
          return [...currentValue, optionValue];
        }
        return currentValue.filter((v) => v !== optionValue);
      });
    };

    return (
      <ControlGroup
        ControlComponent={Switch}
        label={<Text font="headline">Switch Group</Text>}
        onChange={handleToggle}
        options={switchOptions}
        value={value}
      />
    );
  };

  return (
    <ExampleScreen>
      <Example inline title="Radio">
        <RadioExample />
      </Example>
      <Example inline title="Checkbox">
        <CheckboxExample />
      </Example>
      <Example inline title="Radio Cell">
        <RadioCellExample />
      </Example>
      <Example inline title="Checkbox Cell">
        <CheckboxCellExample />
      </Example>
      <Example inline title="Switch">
        <SwitchExample />
      </Example>
    </ExampleScreen>
  );
};

export default ControlGroupScreen;
