import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';

import { Checkbox } from '../Checkbox';
import { CheckboxCell } from '../CheckboxCell';
import { ControlGroup } from '../ControlGroup';
import { Radio } from '../Radio';
import { RadioCell } from '../RadioCell';
import { Switch } from '../Switch';

const meta: Meta<typeof ControlGroup> = {
  title: 'Components/ControlGroup',
  component: ControlGroup,
};

export default meta;

type Story = StoryObj<typeof ControlGroup>;

const radioOptions = [
  { value: '1', label: 'Radio Option 1' },
  { value: '2', label: 'Radio Option 2' },
  { value: '3', label: 'Radio Option 3' },
  { value: '4', label: 'Radio Option 4', disabled: true },
  { value: '5', label: 'Radio Option 5', readOnly: true },
];

const checkboxOptions = [
  { value: '1', label: 'Checkbox Option 1' },
  { value: '2', label: 'Checkbox Option 2' },
  { value: '3', label: 'Checkbox Option 3' },
  { value: '4', label: 'Checkbox Option 4', disabled: true },
  { value: '5', label: 'Checkbox Option 5', readOnly: true },
];

const radioCellOptions = [
  { value: '1', title: 'Radio Cell 1', description: 'Description for radio cell 1' },
  { value: '2', title: 'Radio Cell 2', description: 'Description for radio cell 2' },
  { value: '3', title: 'Radio Cell 3', description: 'Description for radio cell 3' },
  {
    value: '4',
    title: 'Radio Cell 4',
    description: 'Description for radio cell 4',
    disabled: true,
  },
  {
    value: '5',
    title: 'Radio Cell 5',
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
    title: 'Checkbox Cell 4',
    description: 'Description for checkbox cell 4',
    disabled: true,
  },
  {
    value: '5',
    title: 'Checkbox Cell 5',
    description: 'Description for checkbox cell 5',
    readOnly: true,
  },
];

const switchOptions = [
  { value: '1', label: 'Switch 1' },
  { value: '2', label: 'Switch 2' },
  { value: '3', label: 'Switch 3' },
  { value: '4', label: 'Switch 4', disabled: true },
  { value: '5', label: 'Switch 5', readOnly: true },
];

const RadioGroup = () => {
  const [value, setValue] = useState('1');
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => setValue(e.target.value);
  return (
    <ControlGroup
      ControlComponent={Radio}
      label="Radio Group"
      onChange={onChange}
      options={radioOptions}
      role="radiogroup"
      value={value}
    />
  );
};

export const RadioGroupStory: Story = {
  name: 'RadioGroup',
  render: () => <RadioGroup />,
};

const CheckboxGroup = () => {
  const [value, setValue] = useState<string[]>(['1']);
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value: targetValue, checked } = e.target;
    setValue((prev) => (checked ? [...prev, targetValue] : prev.filter((v) => v !== targetValue)));
  };
  return (
    <ControlGroup
      ControlComponent={Checkbox}
      label="Checkbox Group"
      onChange={onChange}
      options={checkboxOptions}
      role="group"
      value={value}
    />
  );
};

export const CheckboxGroupStory: Story = {
  name: 'CheckboxGroup',
  render: CheckboxGroup,
};

const RadioCellGroup = () => {
  const [value, setValue] = useState('1');
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => setValue(e.target.value);
  return (
    <ControlGroup
      ControlComponent={RadioCell}
      label="Radio Cell Group"
      onChange={onChange}
      options={radioCellOptions}
      role="radiogroup"
      value={value}
    />
  );
};

export const RadioCellGroupStory: Story = {
  name: 'RadioCellGroup',
  render: RadioCellGroup,
};

const CheckboxCellGroup = () => {
  const [value, setValue] = useState<string[]>(['1']);
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value: targetValue, checked } = e.target;
    setValue((prev) => (checked ? [...prev, targetValue] : prev.filter((v) => v !== targetValue)));
  };
  return (
    <ControlGroup
      ControlComponent={CheckboxCell}
      label="Checkbox Cell Group"
      onChange={onChange}
      options={checkboxCellOptions}
      role="group"
      value={value}
    />
  );
};

export const CheckboxCellGroupStory: Story = {
  name: 'CheckboxCellGroup',
  render: CheckboxCellGroup,
};

const SwitchGroup = () => {
  const [value, setValue] = useState<string[]>(['1']);
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value: targetValue, checked } = e.target;
    setValue((prev) => (checked ? [...prev, targetValue] : prev.filter((v) => v !== targetValue)));
  };
  return (
    <ControlGroup
      ControlComponent={Switch}
      label="Switch Group"
      onChange={onChange}
      options={switchOptions}
      role="group"
      value={value}
    />
  );
};

export const SwitchGroupStory: Story = {
  name: 'SwitchGroup',
  render: SwitchGroup,
};
