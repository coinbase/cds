/* stylelint-disable color-named */
import { useState } from 'react';
import { useMultiSelect } from '@coinbase/cds-common/select/useMultiSelect';
import { css } from '@linaria/core';

import { Icon } from '../../../icons/Icon';
import { VStack } from '../../../layout/VStack';
import { Pressable } from '../../../system/Pressable';
import { Text } from '../../../typography/Text';
import { Select, type SelectOptionComponent } from '../Select';

export default {
  title: 'Components/Alpha/Select/MultiSelect',
  component: Select,
};

const paddingCss = css`
  /* stylelint-disable-next-line color-named */
  background-color: pink;
  padding: 20px;
`;

const hoveredBackgroundCss = css`
  &:hover {
    /* stylelint-disable-next-line color-named */
    background-color: lightblue;
  }
`;

export const Default = () => {
  const exampleOptions = [
    { value: null, label: 'Remove selection' },
    { value: '1', label: 'Option 1' },
    { value: '2', label: 'Option 2' },
    { value: '3', label: 'Option 3' },
    { value: '4', label: 'Option 4' },
    { value: '5', label: 'Option 5' },
    { value: '6', label: 'Option 6' },
    { value: '7', label: 'Option 7' },
    { value: '8', label: 'Option 8' },
  ];
  const { value, onChange } = useMultiSelect({
    initialValue: ['1', '2'],
  });

  return (
    <Select
      controlAccessibilityLabel="Multi select control with selected options"
      label="Multi select"
      onChange={onChange}
      options={exampleOptions}
      placeholder="Empty value"
      type="multi"
      value={value}
    />
  );
};

export const Compact = () => {
  const exampleOptions = [
    { value: null, label: 'Remove selection' },
    { value: '1', label: 'Option 1' },
    { value: '2', label: 'Option 2' },
    { value: '3', label: 'Option 3' },
    { value: '4', label: 'Option 4' },
    { value: '5', label: 'Option 5' },
    { value: '6', label: 'Option 6' },
    { value: '7', label: 'Option 7' },
    { value: '8', label: 'Option 8' },
  ];
  const { value, onChange } = useMultiSelect({
    initialValue: ['1', '2'],
  });

  return (
    <Select
      compact
      label="Multi select - compact"
      onChange={onChange}
      options={exampleOptions}
      placeholder="Empty value"
      type="multi"
      value={value}
    />
  );
};

export const InsideLabelVariant = () => {
  const exampleOptions = [
    { value: null, label: 'Remove selection' },
    { value: '1', label: 'Option 1' },
    { value: '2', label: 'Option 2' },
    { value: '3', label: 'Option 3' },
    { value: '4', label: 'Option 4' },
  ];
  const { value, onChange } = useMultiSelect({
    initialValue: ['1', '2', '3', '4'],
  });

  return (
    <Select
      label="Multi select - inside label variant"
      labelVariant="inside"
      onChange={onChange}
      options={exampleOptions}
      placeholder="Empty value"
      type="multi"
      value={value}
    />
  );
};

export const CompactManySelected = () => {
  const exampleOptions = [
    { value: null, label: 'Remove selection' },
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
  const { value, onChange } = useMultiSelect({
    initialValue: ['1', '3', '7', '8', '9', '10'],
  });

  return (
    <Select
      compact
      label="Multi select - compact with many selected"
      onChange={onChange}
      options={exampleOptions}
      placeholder="Empty value"
      type="multi"
      value={value}
    />
  );
};

export const HideSelectAll = () => {
  const exampleOptions = [
    { value: null, label: 'Remove selection' },
    { value: '1', label: 'Option 1' },
    { value: '2', label: 'Option 2' },
    { value: '3', label: 'Option 3' },
    { value: '4', label: 'Option 4' },
    { value: '5', label: 'Option 5' },
    { value: '6', label: 'Option 6' },
    { value: '7', label: 'Option 7' },
    { value: '8', label: 'Option 8' },
  ];
  const { value, onChange } = useMultiSelect({
    initialValue: ['1'],
  });

  return (
    <Select
      hideSelectAll
      label="Multi select - hide select all"
      onChange={onChange}
      options={exampleOptions}
      placeholder="Empty value"
      type="multi"
      value={value}
    />
  );
};

export const Alignments = () => {
  const exampleOptions = [
    { value: null, label: 'Remove selection' },
    { value: '1', label: 'Option 1' },
    { value: '2', label: 'Option 2' },
    { value: '3', label: 'Option 3' },
    { value: '4', label: 'Option 4' },
    { value: '5', label: 'Option 5' },
    { value: '6', label: 'Option 6' },
    { value: '7', label: 'Option 7' },
    { value: '8', label: 'Option 8' },
  ];
  const { value, onChange } = useMultiSelect({
    initialValue: ['1'],
  });

  return (
    <VStack gap={2}>
      <Select
        label="Default align - start"
        onChange={onChange}
        options={exampleOptions}
        placeholder="Empty value"
        type="multi"
        value={value}
      />
      <Select
        align="center"
        label="Center align"
        onChange={onChange}
        options={exampleOptions}
        placeholder="Empty value"
        type="multi"
        value={value}
      />
      <Select
        align="end"
        label="End align"
        onChange={onChange}
        options={exampleOptions}
        placeholder="Empty value"
        type="multi"
        value={value}
      />
      <Select
        compact
        label="Compact align - start"
        onChange={onChange}
        options={exampleOptions}
        placeholder="Empty value"
        type="multi"
        value={value}
      />
      <Select
        compact
        align="center"
        label="Compact align - center"
        onChange={onChange}
        options={exampleOptions}
        placeholder="Empty value"
        type="multi"
        value={value}
      />
      <Select
        compact
        align="end"
        label="Compact align - end"
        onChange={onChange}
        options={exampleOptions}
        placeholder="Empty value"
        type="multi"
        value={value}
      />
    </VStack>
  );
};

export const CustomSelectAllLabel = () => {
  const exampleOptions = [
    { value: null, label: 'Remove selection' },
    { value: '1', label: 'Option 1' },
    { value: '2', label: 'Option 2' },
    { value: '3', label: 'Option 3' },
    { value: '4', label: 'Option 4' },
    { value: '5', label: 'Option 5' },
    { value: '6', label: 'Option 6' },
    { value: '7', label: 'Option 7' },
    { value: '8', label: 'Option 8' },
  ];
  const { value, onChange } = useMultiSelect({
    initialValue: ['1'],
  });

  return (
    <Select
      label="Multi select - custom select all label"
      onChange={onChange}
      options={exampleOptions}
      placeholder="Empty value"
      selectAllLabel="~Custom!~ Select every single option here"
      type="multi"
      value={value}
    />
  );
};

export const CustomClearAllLabel = () => {
  const { value, onChange } = useMultiSelect({
    initialValue: ['1'],
  });
  const exampleOptions = [
    { value: null, label: 'Remove selection' },
    { value: '1', label: 'Option 1' },
    { value: '2', label: 'Option 2' },
    { value: '3', label: 'Option 3' },
    { value: '4', label: 'Option 4' },
    { value: '5', label: 'Option 5' },
    { value: '6', label: 'Option 6' },
    { value: '7', label: 'Option 7' },
    { value: '8', label: 'Option 8' },
  ];

  return (
    <Select
      clearAllLabel="Custom Clear All Label"
      label="Multi select - custom clear all label"
      onChange={onChange}
      options={exampleOptions}
      placeholder="Empty value"
      type="multi"
      value={value}
    />
  );
};

export const CustomSelectAllOption = () => {
  const exampleOptions = [
    { value: null, label: 'Remove selection' },
    { value: '1', label: 'Option 1' },
    { value: '2', label: 'Option 2' },
    { value: '3', label: 'Option 3' },
    { value: '4', label: 'Option 4' },
    { value: '5', label: 'Option 5' },
    { value: '6', label: 'Option 6' },
    { value: '7', label: 'Option 7' },
    { value: '8', label: 'Option 8' },
  ];
  const { value, onChange } = useMultiSelect({
    initialValue: ['1'],
  });

  const CustomSelectAllOption: SelectOptionComponent<'multi'> = ({
    onClick,
    selected,
    disabled,
    label,
    blendStyles,
    className,
    style,
  }) => {
    return (
      <Pressable
        noScaleOnPress
        background={selected ? 'bgSecondary' : 'bg'}
        blendStyles={blendStyles}
        className={className}
        disabled={disabled}
        onClick={() => onClick?.('select-all')}
        paddingX={2}
        paddingY={3}
        style={style}
      >
        <Text color={selected ? 'fgPrimary' : 'fg'} font="headline">
          {label || 'Custom Select All Option'}
        </Text>
      </Pressable>
    );
  };

  return (
    <Select
      SelectAllOptionComponent={CustomSelectAllOption}
      label="Multi select - custom select all option"
      onChange={onChange}
      options={exampleOptions}
      placeholder="Empty value"
      type="multi"
      value={value}
    />
  );
};

export const Disabled = () => {
  const exampleOptions = [
    { value: null, label: 'Remove selection' },
    { value: '1', label: 'Option 1' },
    { value: '2', label: 'Option 2' },
    { value: '3', label: 'Option 3' },
    { value: '4', label: 'Option 4' },
    { value: '5', label: 'Option 5' },
    { value: '6', label: 'Option 6' },
    { value: '7', label: 'Option 7' },
    { value: '8', label: 'Option 8' },
  ];
  const { value, onChange } = useMultiSelect({
    initialValue: ['1'],
  });

  return (
    <Select
      disabled
      label="Multi select - disabled"
      onChange={onChange}
      options={exampleOptions}
      placeholder="Empty value"
      type="multi"
      value={value}
    />
  );
};

export const DisabledOptions = () => {
  const exampleOptions = [
    { value: null, label: 'Remove selection' },
    { value: '1', label: 'Option 1', disabled: true },
    { value: '2', label: 'Option 2' },
    { value: '3', label: 'Option 3' },
    { value: '4', label: 'Option 4', disabled: true },
    { value: '5', label: 'Option 5' },
    { value: '6', label: 'Option 6', disabled: true },
    { value: '7', label: 'Option 7', disabled: true },
    { value: '8', label: 'Option 8' },
  ];
  const { value, onChange } = useMultiSelect({
    initialValue: ['1', '2', '3', '4', '5', '6', '7', '8'],
  });

  return (
    <Select
      label="Multi select - disabled options"
      onChange={onChange}
      options={exampleOptions}
      placeholder="Empty value"
      type="multi"
      value={value}
    />
  );
};

export const CustomAccessory = () => {
  const exampleOptions = [
    { value: null, label: 'Remove selection' },
    { value: '1', label: 'Option 1' },
    { value: '2', label: 'Option 2' },
    { value: '3', label: 'Option 3' },
    { value: '4', label: 'Option 4' },
    { value: '5', label: 'Option 5' },
    { value: '6', label: 'Option 6' },
    { value: '7', label: 'Option 7' },
    { value: '8', label: 'Option 8' },
  ];
  const { value, onChange } = useMultiSelect({
    initialValue: ['1'],
  });

  return (
    <Select
      accessory={<Icon color="fg" name="star" />}
      label="Multi select - custom accessory"
      onChange={onChange}
      options={exampleOptions}
      placeholder="Empty value"
      type="multi"
      value={value}
    />
  );
};

export const CustomMedia = () => {
  const exampleOptions = [
    { value: null, label: 'Remove selection' },
    { value: '1', label: 'Option 1' },
    { value: '2', label: 'Option 2' },
    { value: '3', label: 'Option 3' },
    { value: '4', label: 'Option 4' },
    { value: '5', label: 'Option 5' },
    { value: '6', label: 'Option 6' },
    { value: '7', label: 'Option 7' },
    { value: '8', label: 'Option 8' },
  ];
  const { value, onChange } = useMultiSelect({
    initialValue: ['1'],
  });

  return (
    <Select
      label="Multi select - custom media"
      media={<Icon color="fg" name="star" />}
      onChange={onChange}
      options={exampleOptions}
      placeholder="Empty value"
      type="multi"
      value={value}
    />
  );
};

export const ManyOptions = () => {
  const manyExampleOptions = Array.from({ length: 100 }, (_, i) => ({
    value: (i + 1).toString(),
    label: `Option ${i + 1}`,
  }));
  const { value, onChange } = useMultiSelect({
    initialValue: manyExampleOptions.map((option) => option.value),
  });

  return (
    <Select
      label="Multi select - many options"
      onChange={onChange}
      options={manyExampleOptions}
      placeholder="Empty value"
      type="multi"
      value={value}
    />
  );
};

export const MaxSelectedOptions = () => {
  const manyExampleOptions = Array.from({ length: 100 }, (_, i) => ({
    value: (i + 1).toString(),
    label: `Option ${i + 1}`,
  }));
  const { value, onChange } = useMultiSelect({
    initialValue: manyExampleOptions.map((option) => option.value),
  });

  return (
    <Select
      label="Multi select - custom max num of selected options to show"
      maxSelectedOptionsToShow={2}
      onChange={onChange}
      options={manyExampleOptions}
      placeholder="Empty value"
      type="multi"
      value={value}
    />
  );
};

export const CustomHiddenSelectedOptionsLabel = () => {
  const manyExampleOptions = Array.from({ length: 100 }, (_, i) => ({
    value: (i + 1).toString(),
    label: `Option ${i + 1}`,
  }));
  const { value, onChange } = useMultiSelect({
    initialValue: manyExampleOptions.map((option) => option.value),
  });

  return (
    <Select
      hiddenSelectedOptionsLabel="custom label"
      label="Multi select - custom hidden selected options label"
      maxSelectedOptionsToShow={2}
      onChange={onChange}
      options={manyExampleOptions}
      placeholder="Empty value"
      type="multi"
      value={value}
    />
  );
};

export const Descriptions = () => {
  const exampleOptionsWithDescription = [
    { value: null, label: 'Remove selection' },
    { value: '1', label: 'Option 1', description: 'Description 1' },
    { value: '2', label: 'Option 2', description: 'Description 2' },
    { value: '3', label: 'Option 3', description: 'Description 3' },
    { value: '4', label: 'Option 4', description: 'Description 4' },
    { value: '5', label: 'Option 5', description: 'Description 5' },
    { value: '6', label: 'Option 6', description: 'Description 6' },
    { value: '7', label: 'Option 7', description: 'Description 7' },
    { value: '8', label: 'Option 8', description: 'Description 8' },
  ];
  const { value, onChange } = useMultiSelect({
    initialValue: ['1'],
  });

  return (
    <Select
      label="Multi select - with descriptions"
      onChange={onChange}
      options={exampleOptionsWithDescription}
      placeholder="Empty value"
      type="multi"
      value={value}
    />
  );
};

export const DescriptionsOnly = () => {
  const exampleOptionsWithOnlyDescription = [
    { value: null, label: 'Remove selection' },
    { value: '1', description: 'Description 1' },
    { value: '2', description: 'Description 2' },
    { value: '3', description: 'Description 3' },
    { value: '4', description: 'Description 4' },
  ];
  const { value, onChange } = useMultiSelect({
    initialValue: ['1'],
  });

  return (
    <Select
      label="Multi select - with descriptions only"
      onChange={onChange}
      options={exampleOptionsWithOnlyDescription}
      placeholder="Empty value"
      type="multi"
      value={value}
    />
  );
};

export const MixedAccessoriesMedia = () => {
  const exampleOptions = [
    { value: null, label: 'Remove selection' },
    {
      value: '1',
      label: 'Option 1',
      accessory: <Icon color="fg" name="star" />,
      media: <Icon color="fg" name="heart" />,
    },
    {
      value: '2',
      label: 'Option 2',
      accessory: <Icon color="fg" name="checkmark" />,
      media: <Icon color="fg" name="cross" />,
    },
    {
      value: '3',
      label: 'Option 3',
      accessory: <Icon color="fg" name="add" />,
      media: <Icon color="fg" name="minus" />,
    },
    {
      value: '4',
      label: 'Option 4',
      accessory: <Icon color="fg" name="caretRight" />,
      media: <Icon color="fg" name="caretLeft" />,
    },
    {
      value: '5',
      label: 'Option 5',
      accessory: <Icon color="fg" name="arrowUp" />,
      media: <Icon color="fg" name="home" />,
    },
  ];
  const { value, onChange } = useMultiSelect({
    initialValue: ['1'],
  });

  return (
    <Select
      label="Multi select - mixed unique accessories and media"
      onChange={onChange}
      options={exampleOptions}
      placeholder="Empty value"
      type="multi"
      value={value}
    />
  );
};

export const AllCombinedFeatures = () => {
  const exampleOptions = [
    { value: null, label: 'Remove selection' },
    {
      value: '1',
      label: 'Option 1',
      accessory: <Icon color="fg" name="star" />,
      media: <Icon color="fg" name="heart" />,
    },
    {
      value: '2',
      label: 'Option 2',
      accessory: <Icon color="fg" name="checkmark" />,
      media: <Icon color="fg" name="cross" />,
    },
    {
      value: '3',
      label: 'Option 3',
      accessory: <Icon color="fg" name="add" />,
      media: <Icon color="fg" name="minus" />,
    },
    {
      value: '4',
      label: 'Option 4',
      accessory: <Icon color="fg" name="caretRight" />,
      media: <Icon color="fg" name="caretLeft" />,
    },
    {
      value: '5',
      label: 'Option 5',
      accessory: <Icon color="fg" name="arrowUp" />,
      media: <Icon color="fg" name="home" />,
    },
  ];
  const { value, onChange } = useMultiSelect({
    initialValue: ['1'],
  });

  return (
    <Select
      helperText="All multi-select features combined"
      label="Multi select - all combined features"
      maxSelectedOptionsToShow={3}
      onChange={onChange}
      options={exampleOptions}
      placeholder="Choose options"
      selectAllLabel="Select all these amazing options"
      startNode={<Icon color="fg" name="filter" />}
      type="multi"
      value={value}
      variant="positive"
    />
  );
};

export const EdgeCaseEmptyLabels = () => {
  const edgeOptions = [
    { value: '1', label: '' },
    { value: '2', label: ' ' },
    { value: '3', label: 'Normal Label' },
    { value: '4', label: '\t\n' },
  ];
  const { value, onChange } = useMultiSelect({
    initialValue: ['3'],
  });

  return (
    <Select
      label="Multi select - edge case empty labels"
      onChange={onChange}
      options={edgeOptions}
      placeholder="Empty value"
      type="multi"
      value={value}
    />
  );
};

export const ControlledOpen = () => {
  const exampleOptions = [
    { value: null, label: 'Remove selection' },
    { value: '1', label: 'Option 1' },
    { value: '2', label: 'Option 2' },
    { value: '3', label: 'Option 3' },
    { value: '4', label: 'Option 4' },
    { value: '5', label: 'Option 5' },
    { value: '6', label: 'Option 6' },
    { value: '7', label: 'Option 7' },
    { value: '8', label: 'Option 8' },
  ];
  const { value, onChange } = useMultiSelect({
    initialValue: ['1'],
  });
  const [open, setOpen] = useState(false);

  return (
    <div>
      <button onClick={() => setOpen(!open)} style={{ marginBottom: '10px' }}>
        Toggle Multi-Select: {open ? 'Close' : 'Open'}
      </button>
      <Select
        disableClickOutsideClose
        label="Multi select - controlled open state"
        onChange={onChange}
        open={open}
        options={exampleOptions}
        placeholder="Empty value"
        setOpen={setOpen}
        type="multi"
        value={value}
      />
    </div>
  );
};

export const PositiveVariant = () => {
  const exampleOptions = [
    { value: null, label: 'Remove selection' },
    { value: '1', label: 'Option 1' },
    { value: '2', label: 'Option 2' },
    { value: '3', label: 'Option 3' },
    { value: '4', label: 'Option 4' },
    { value: '5', label: 'Option 5' },
    { value: '6', label: 'Option 6' },
    { value: '7', label: 'Option 7' },
    { value: '8', label: 'Option 8' },
  ];
  const { value, onChange } = useMultiSelect({
    initialValue: ['1'],
  });

  return (
    <Select
      helperText="Multi-select with positive variant"
      label="Multi select - positive variant"
      onChange={onChange}
      options={exampleOptions}
      placeholder="Empty value"
      type="multi"
      value={value}
      variant="positive"
    />
  );
};

export const NegativeVariant = () => {
  const exampleOptions = [
    { value: null, label: 'Remove selection' },
    { value: '1', label: 'Option 1' },
    { value: '2', label: 'Option 2' },
    { value: '3', label: 'Option 3' },
    { value: '4', label: 'Option 4' },
    { value: '5', label: 'Option 5' },
    { value: '6', label: 'Option 6' },
    { value: '7', label: 'Option 7' },
    { value: '8', label: 'Option 8' },
  ];
  const { value, onChange } = useMultiSelect({
    initialValue: ['1'],
  });

  return (
    <Select
      helperText="Multi-select with negative variant"
      label="Multi select - negative variant"
      onChange={onChange}
      options={exampleOptions}
      placeholder="Empty value"
      type="multi"
      value={value}
      variant="negative"
    />
  );
};

export const StartNode = () => {
  const exampleOptions = [
    { value: null, label: 'Remove selection' },
    { value: '1', label: 'Option 1' },
    { value: '2', label: 'Option 2' },
    { value: '3', label: 'Option 3' },
    { value: '4', label: 'Option 4' },
    { value: '5', label: 'Option 5' },
    { value: '6', label: 'Option 6' },
    { value: '7', label: 'Option 7' },
    { value: '8', label: 'Option 8' },
  ];
  const { value, onChange } = useMultiSelect({
    initialValue: ['1'],
  });

  return (
    <Select
      label="Multi select - with start node"
      onChange={onChange}
      options={exampleOptions}
      placeholder="Empty value"
      startNode={<Icon color="fg" name="filter" />}
      type="multi"
      value={value}
    />
  );
};

export const EmptyOptions = () => {
  const { value, onChange } = useMultiSelect({ initialValue: [] });

  return (
    <Select
      label="Multi select - empty options"
      onChange={onChange}
      options={[]}
      placeholder="Empty value"
      type="multi"
      value={value}
    />
  );
};

export const ComplexStyles = () => {
  const exampleOptions = [
    { value: null, label: 'Remove selection' },
    { value: '1', label: 'Option 1' },
    { value: '2', label: 'Option 2' },
    { value: '3', label: 'Option 3' },
    { value: '4', label: 'Option 4' },
    { value: '5', label: 'Option 5' },
    { value: '6', label: 'Option 6' },
    { value: '7', label: 'Option 7' },
    { value: '8', label: 'Option 8' },
  ];
  const { value, onChange } = useMultiSelect({
    initialValue: ['1', '2'],
  });

  return (
    <Select
      classNames={{
        control: paddingCss,
        dropdown: hoveredBackgroundCss,
      }}
      label="Multi select - complex styles"
      onChange={onChange}
      options={exampleOptions}
      placeholder="Empty value"
      styles={{
        control: {
          backgroundColor: 'lightblue',
          border: '2px solid navy',
        },
        dropdown: {
          backgroundColor: 'lightyellow',
          border: '1px solid gold',
        },
        optionBlendStyles: {
          background: 'lightcyan',
          hoveredBackground: 'cyan',
        },
      }}
      type="multi"
      value={value}
    />
  );
};
