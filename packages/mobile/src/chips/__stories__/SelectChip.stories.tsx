import React, { useState } from 'react';
import { loremIpsum } from '@coinbase/cds-common/internal/data/loremIpsum';
import type { IconName } from '@coinbase/cds-icons';

import { SelectOption } from '../../controls';
import { Example, ExampleScreen } from '../../examples/ExampleScreen';
import { Icon } from '../../icons';
import type { SelectChipProps } from '../SelectChip';
import { SelectChip } from '../SelectChip';

const defaultSortOptions = ['Balance', 'Name', 'Asset Value'];
const customSortOptions = [loremIpsum, ...defaultSortOptions];
const customContentStyle = { maxWidth: 300 };

const SelectChipExample = ({
  value: defaultValue,
  sortOptions = defaultSortOptions,
  ...props
}: Omit<SelectChipProps, 'children'> & {
  sortOptions?: string[];
}) => {
  const [value, setValue] = useState<string | undefined>(defaultValue);
  return (
    <SelectChip active={value !== undefined} onChange={setValue} value={value} {...props}>
      {sortOptions.map((option) => (
        <SelectOption key={option} title={option} value={option} />
      ))}
    </SelectChip>
  );
};

type ValueObject = {
  label: string;
  title: string;
  value: string;
  iconName: IconName;
};

const ObjectValueModel = () => {
  const options: ValueObject[] = [
    {
      label: 'Price',
      title: 'Price (High to Low)',
      value: 'price-high-low',
      iconName: 'arrowDown',
    },
    { label: 'Price', title: 'Price (Low to High)', value: 'price-low-high', iconName: 'arrowUp' },
    {
      label: 'Market Cap',
      title: 'Market Cap (High to Low)',
      value: 'market-cap-high-low',
      iconName: 'arrowDown',
    },
    {
      label: 'Market Cap',
      title: 'Market Cap (Low to High)',
      value: 'market-cap-low-high',
      iconName: 'arrowUp',
    },
  ];
  const [value, setValue] = useState(options[0]);

  const handleChange = (newValue: string) => {
    const getOption = options.find(({ value }) => value === newValue) ?? options[0];
    setValue(getOption);
  };

  return (
    <SelectChip
      active={value !== undefined}
      end={<Icon active color="fg" name={value.iconName} size="xs" />}
      onChange={(newValue: string) => handleChange(newValue)}
      value={value.value}
      valueLabel={value.label}
    >
      {options.map(({ title, value }) => (
        <SelectOption key={value} title={title} value={value} />
      ))}
    </SelectChip>
  );
};

const SelectChipScreen = () => (
  <ExampleScreen>
    <Example title="Default">
      <SelectChipExample placeholder="Sort" />
      <SelectChipExample placeholder="Sort" value="Balance" />
    </Example>
    <Example title="Compact">
      <SelectChipExample compact placeholder="Sort" />
      <SelectChipExample compact placeholder="Sort" value="Balance" />
    </Example>
    <Example title="Custom end node">
      <SelectChipExample
        end={<Icon active color="fg" name="filter" size="xs" />}
        placeholder="Filter"
      />
      <SelectChipExample
        end={<Icon active color="fg" name="filter" size="xs" />}
        placeholder="Filter"
        value="Balance"
      />
    </Example>
    <Example title="Value Object Model">
      <ObjectValueModel />
    </Example>
    <Example title="Custom Style">
      <SelectChipExample
        contentStyle={customContentStyle}
        sortOptions={customSortOptions}
        value={customSortOptions[0]}
      />
    </Example>
  </ExampleScreen>
);

export default SelectChipScreen;
