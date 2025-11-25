import { useCallback, useRef, useState } from 'react';
import { useMultiSelect } from '@coinbase/cds-common/select/useMultiSelect';

import { Button } from '../../../buttons';
import { Example, ExampleScreen } from '../../../examples/ExampleScreen';
import { Icon } from '../../../icons';
import { HStack } from '../../../layout/HStack';
import { VStack } from '../../../layout/VStack';
import { Spinner } from '../../../loaders';
import { Pressable } from '../../../system';
import { Text } from '../../../typography/Text';
import {
  Select,
  type SelectControlComponent,
  type SelectOption,
  type SelectOptionComponent,
  type SelectRef,
} from '../Select';

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

const exampleOptionsWithOnlyDescription = [
  { value: null, label: 'Remove selection' },
  { value: '1', description: 'Description 1' },
  { value: '2', description: 'Description 2' },
  { value: '3', description: 'Description 3' },
  { value: '4', description: 'Description 4' },
];

const exampleOptionsWithNoLabelOrDescription = [
  { value: null, label: 'Remove selection' },
  { value: '1' },
  { value: '2' },
  { value: '3' },
  { value: '4' },
];

const exampleOptionsWithSomeDisabled = [
  { value: null, label: 'Remove selection' },
  { value: '1', label: 'Option 1', disabled: true },
  { value: '2', label: 'Option 2' },
  { value: '3', label: 'Option 3' },
  { value: '4', label: 'Option 4', disabled: true },
];

const exampleOptionsWithoutNull = [
  { value: '1', label: 'Option 1' },
  { value: '2', label: 'Option 2' },
  { value: '3', label: 'Option 3' },
  { value: '4', label: 'Option 4' },
  { value: '5', label: 'Option 5' },
  { value: '6', label: 'Option 6' },
  { value: '7', label: 'Option 7' },
  { value: '8', label: 'Option 8' },
];

const exampleOptionsWithReactNodes = [
  {
    value: '1',
    label: <Text font="title3">Option 1</Text>,
    description: <Text font="title3">Description 1</Text>,
  },
  {
    value: '2',
    label: <Text font="title3">Option 2</Text>,
    description: <Text font="title3">Description 2</Text>,
  },
  {
    value: '3',
    label: <Text font="title3">Option 3</Text>,
    description: <Text font="title3">Description 3</Text>,
  },
  {
    value: '4',
    label: <Text font="title3">Option 4</Text>,
    description: <Text font="title3">Description 4</Text>,
  },
  {
    value: '5',
    label: <Text font="title3">Option 5</Text>,
    description: <Text font="title3">Description 5</Text>,
  },
];

const exampleOptionsWithCustomAccessoriesAndMedia = [
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

const exampleOptionsWithUniqueEndNode = [
  { value: null, label: 'Remove selection' },
  { value: '1', label: 'Option 1', end: <Icon color="fg" name="star" /> },
  { value: '2', label: 'Option 2', end: <Icon color="fg" name="checkmark" /> },
  { value: '3', label: 'Option 3', end: <Icon color="fg" name="add" /> },
];

const DefaultExample = () => {
  const [value, setValue] = useState<string | null>('1');

  return (
    <Select
      label="Single select"
      onChange={setValue}
      options={exampleOptions}
      placeholder="Empty value"
      value={value}
    />
  );
};

const TypedSelectExample = () => {
  type TestValue = '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9';
  const typedOptions: SelectOption<TestValue>[] = [
    { value: null, label: 'Remove selection' },
    { value: '1', label: 'Option 1' },
    { value: '2', label: 'Option 2' },
    { value: '3', label: 'Option 3' },
    { value: '4', label: 'Option 4' },
  ];
  const [value, setValue] = useState<TestValue | null>('1');
  return (
    <Select
      label="Typed select"
      onChange={setValue}
      options={typedOptions}
      placeholder="Empty value"
      value={value}
    />
  );
};

const CompactExample = () => {
  const [value, setValue] = useState<string | null>('1');

  return (
    <Select
      compact
      label="Compact"
      onChange={setValue}
      options={exampleOptions}
      placeholder="Empty value"
      value={value}
    />
  );
};

const WithHelperTextExample = () => {
  const [value, setValue] = useState<string | null>('1');

  return (
    <Select
      helperText="Helper text"
      label="Single select - helper text"
      onChange={setValue}
      options={exampleOptions}
      placeholder="Empty value"
      value={value}
    />
  );
};

const WithDescriptionExample = () => {
  const [value, setValue] = useState<string | null>('1');

  return (
    <Select
      label="Single select - options with description"
      onChange={setValue}
      options={exampleOptionsWithDescription}
      placeholder="Empty value"
      value={value}
    />
  );
};

const WithOnlyDescriptionExample = () => {
  const [value, setValue] = useState<string | null>('1');

  return (
    <Select
      label="Single select - options with only description"
      onChange={setValue}
      options={exampleOptionsWithOnlyDescription}
      placeholder="Empty value"
      value={value}
    />
  );
};

const WithNoLabelOrDescriptionExample = () => {
  const [value, setValue] = useState<string | null>('1');

  return (
    <Select
      label="Single select - options with no label or description"
      onChange={setValue}
      options={exampleOptionsWithNoLabelOrDescription}
      placeholder="Empty value"
      value={value}
    />
  );
};

const AccessibilityLabelExample = () => {
  const [value, setValue] = useState<string | null>('1');

  return (
    <Select
      accessibilityLabel="Accessibility label"
      label="Single select - accessibility label"
      onChange={setValue}
      options={exampleOptions}
      placeholder="Empty value"
      value={value}
    />
  );
};

const CustomAccessibilityRoleExample = () => {
  const [value, setValue] = useState<string | null>('1');

  return (
    <Select
      accessibilityRoles={{ option: 'link' }}
      label="Single select - custom accessibility role"
      onChange={setValue}
      options={exampleOptions}
      placeholder="Empty value"
      value={value}
    />
  );
};

const NoLabelExample = () => {
  const [value, setValue] = useState<string | null>('1');

  return (
    <Select
      accessibilityLabel="No label. An accessibility label is required."
      onChange={setValue}
      options={exampleOptions}
      placeholder="Empty value"
      value={value}
    />
  );
};

const EmptyOptionsExample = () => {
  const [value, setValue] = useState<string | null>(null);

  return (
    <Select
      label="Single select - empty options"
      onChange={setValue}
      options={[]}
      placeholder="No options available"
      value={value}
    />
  );
};

const EmptyOptionsWithCustomLabelExample = () => {
  const [value, setValue] = useState<string | null>(null);

  return (
    <Select
      emptyOptionsLabel="Custom label! No choices to choose from"
      label="Single select - empty options with custom label"
      onChange={setValue}
      options={[]}
      placeholder="No options available"
      value={value}
    />
  );
};

const EmptyOptionsWithCustomComponentExample = () => {
  const [value, setValue] = useState<string | null>(null);
  const CustomEmpty = () => (
    <Text background="fgWarning" font="headline" padding={4}>
      Custom component! No choices to choose from
    </Text>
  );

  return (
    <Select
      SelectEmptyDropdownContentsComponent={CustomEmpty}
      label="Single select - empty options with custom component"
      onChange={setValue}
      options={[]}
      placeholder="No options available"
      value={value}
    />
  );
};

const DisabledExample = () => {
  const [value, setValue] = useState<string | null>('1');

  return (
    <Select
      disabled
      label="Single select - disabled"
      onChange={setValue}
      options={exampleOptionsWithDescription}
      placeholder="Empty value"
      value={value}
    />
  );
};

const WithDisabledOptionsExample = () => {
  const [value, setValue] = useState<string | null>('1');

  return (
    <Select
      label="Single select - disabled options"
      onChange={setValue}
      options={exampleOptionsWithSomeDisabled}
      placeholder="Empty value"
      value={value}
    />
  );
};

const WithoutNullExample = () => {
  const [value, setValue] = useState<string | null>(null);

  return (
    <Select
      label="Single select - no null"
      onChange={setValue}
      options={exampleOptionsWithoutNull}
      placeholder="Empty value"
      value={value}
    />
  );
};

const WithStartNodeExample = () => {
  const [value, setValue] = useState<string | null>('1');

  return (
    <Select
      label="Single select - start node"
      onChange={setValue}
      options={exampleOptions}
      placeholder="Empty value"
      startNode={<Icon color="fg" name="search" />}
      value={value}
    />
  );
};

const WithCustomEndNodeExample = () => {
  const [value, setValue] = useState<string | null>('1');

  return (
    <Select
      endNode={<Icon color="fg" name="search" />}
      label="Single select - custom end node"
      onChange={setValue}
      options={exampleOptions}
      placeholder="Empty value"
      value={value}
    />
  );
};

const WithCustomAccessoryExample = () => {
  const [value, setValue] = useState<string | null>('1');

  return (
    <Select
      accessory={<Icon color="fg" name="star" />}
      label="Single select - custom accessory on all options"
      onChange={setValue}
      options={exampleOptions}
      placeholder="Empty value"
      value={value}
    />
  );
};

const WithCustomMediaExample = () => {
  const [value, setValue] = useState<string | null>('1');

  return (
    <Select
      label="Single select - custom media on all options"
      media={<Icon color="fg" name="star" />}
      onChange={setValue}
      options={exampleOptions}
      placeholder="Empty value"
      value={value}
    />
  );
};

const WithOptionsAsReactNodesExample = () => {
  const [value, setValue] = useState<string | null>('1');

  return (
    <Select
      label="Single select - options as react nodes"
      onChange={setValue}
      options={exampleOptionsWithReactNodes}
      placeholder="Empty value"
      value={value}
    />
  );
};

const MixedDefaultAndCustomComponentOptions = () => {
  const CustomOptionComponent: SelectOptionComponent = ({ value, onPress }) => {
    return (
      <HStack justifyContent="center">
        <Spinner size={4} />
        <Button transparent onPress={() => onPress?.(value)}>
          {value ?? 'Empty value'}
        </Button>
        <Spinner size={4} />
      </HStack>
    );
  };
  const exampleOptionsWithCustomComponents = [
    { value: null, label: 'Remove selection' },
    { value: '1', label: 'Option 1', Component: CustomOptionComponent },
    { value: '2', label: 'Option 2' },
    { value: '3', label: 'Option 3', Component: CustomOptionComponent },
    { value: '4', label: 'Option 4' },
  ];
  const [value, setValue] = useState<string | null>('1');

  return (
    <Select
      label="Single select - mixed default and custom component options"
      onChange={setValue}
      options={exampleOptionsWithCustomComponents}
      placeholder="Empty value"
      value={value}
    />
  );
};

const CustomControlComponent = () => {
  const [value, setValue] = useState<string | null>('1');

  const CustomControlComponent: SelectControlComponent = ({ value, setOpen }) => {
    return <Button onPress={() => setOpen(true)}>{value ?? 'Empty value'}</Button>;
  };

  return (
    <Select
      SelectControlComponent={CustomControlComponent}
      label="Single select - custom control component"
      onChange={setValue}
      options={exampleOptions}
      placeholder="Empty value"
      value={value}
    />
  );
};

const CustomOptionComponent = () => {
  const [value, setValue] = useState<string | null>('1');

  const CustomOptionComponent: SelectOptionComponent = ({ value, onPress }) => {
    return (
      <HStack justifyContent="center">
        <Spinner size={4} />
        <Button transparent onPress={() => onPress?.(value)}>
          <Text>{value ?? 'Empty value'}</Text>
        </Button>
        <Spinner size={4} />
      </HStack>
    );
  };

  return (
    <Select
      SelectOptionComponent={CustomOptionComponent}
      label="Single select - custom option component"
      onChange={setValue}
      options={exampleOptions}
      placeholder="Empty value"
      value={value}
    />
  );
};

const WithUniqueAccessoryAndMediaExample = () => {
  const [value, setValue] = useState<string | null>('1');

  return (
    <Select
      label="Single select - custom unique accessory and media on all options"
      onChange={setValue}
      options={exampleOptionsWithCustomAccessoriesAndMedia}
      placeholder="Empty value"
      value={value}
    />
  );
};

const UniqueEndNodeForEachOptionExample = () => {
  const [value, setValue] = useState<string | null>('1');

  return (
    <Select
      label="Single select - unique end node for each option"
      onChange={setValue}
      options={exampleOptionsWithUniqueEndNode}
      placeholder="Empty value"
      value={value}
    />
  );
};

const PositiveVariantExample = () => {
  const [value, setValue] = useState<string | null>('1');

  return (
    <Select
      helperText="Helper text"
      label="Single select - positive variant"
      onChange={setValue}
      options={exampleOptions}
      placeholder="Empty value"
      value={value}
      variant="positive"
    />
  );
};

const NegativeVariantExample = () => {
  const [value, setValue] = useState<string | null>('1');

  return (
    <Select
      helperText="Helper text"
      label="Single select - negative variant"
      onChange={setValue}
      options={exampleOptions}
      placeholder="Empty value"
      value={value}
      variant="negative"
    />
  );
};

const MultiSelectDefaultExample = () => {
  const { value, onChange } = useMultiSelect({
    initialValue: ['1'],
  });

  return (
    <Select
      label="Multi select"
      onChange={onChange}
      options={exampleOptions}
      placeholder="Empty value"
      type="multi"
      value={value}
    />
  );
};

const MultiSelectCompactExample = () => {
  const { value, onChange } = useMultiSelect({
    initialValue: ['1'],
  });

  return (
    <Select
      compact
      label="Compact"
      onChange={onChange}
      options={exampleOptions}
      placeholder="Empty value"
      type="multi"
      value={value}
    />
  );
};

const MultiSelectHideSelectAllExample = () => {
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

const MultiSelectCustomSelectAllLabelExample = () => {
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

const MultiSelectCustomClearAllLabelExample = () => {
  const { value, onChange } = useMultiSelect({
    initialValue: ['1'],
  });

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

const MultiSelectCustomSelectAllOptionExample = () => {
  const { value, onChange } = useMultiSelect({
    initialValue: ['1'],
  });

  const CustomSelectAllOption: SelectOptionComponent<'multi'> = ({
    onPress,
    selected,
    disabled,
    label,
    style,
  }) => {
    return (
      <Pressable
        background={selected ? 'bgSecondary' : 'bg'}
        disabled={disabled}
        onPress={() => onPress?.('select-all')}
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

const MultiSelectDisabledExample = () => {
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

const MultiSelectWithDisabledOptionsExample = () => {
  const { value, onChange } = useMultiSelect({
    initialValue: ['1', '2', '3', '4'],
  });

  return (
    <Select
      label="Multi select - disabled options"
      onChange={onChange}
      options={exampleOptionsWithSomeDisabled}
      placeholder="Empty value"
      type="multi"
      value={value}
    />
  );
};

const MultiSelectWithCustomAccessoryExample = () => {
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

const MultiSelectWithCustomMediaExample = () => {
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

const MultiSelectManyOptionsExample = () => {
  const manyExampleOptions = Array.from({ length: 100 }, (_, i) => ({
    value: (i + 1).toString(),
    label: 'Option ' + String(i + 1),
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

const MultiSelectEmptyOptionsExample = () => {
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

const MultiSelectMaxSelectedOptionsExample = () => {
  const manyExampleOptions = Array.from({ length: 100 }, (_, i) => ({
    value: (i + 1).toString(),
    label: 'Option ' + String(i + 1),
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

const MultiSelectCustomHiddenSelectedOptionsLabelExample = () => {
  const manyExampleOptions = Array.from({ length: 100 }, (_, i) => ({
    value: (i + 1).toString(),
    label: 'Option ' + String(i + 1),
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

const MutliSelectStartNodeExample = () => {
  const { value, onChange } = useMultiSelect({
    initialValue: ['1'],
  });

  return (
    <Select
      label="Multi select - start node"
      onChange={onChange}
      options={exampleOptions}
      placeholder="Empty value"
      startNode={<Icon color="fg" name="star" />}
      type="multi"
      value={value}
    />
  );
};

const VeryLongLabelsExample = () => {
  const longOptions = [
    { value: null, label: 'Remove selection' },
    {
      value: '1',
      label:
        'This is an extremely long option label that should test how the component handles very long text content',
      description:
        'This is an extremely long option description that should test how the component handles very long text content',
    },
    {
      value: '2',
      label:
        'Another super long option label with even more text to see how it wraps or truncates in the UI',
      description:
        'Another super long option description with even more text to see how it wraps or truncates in the UI',
    },
    {
      value: '3',
      label: 'Short',
      description: 'Short description',
    },
    {
      value: '4',
      label: 'A moderately long label that is somewhere between short and extremely long',
      description:
        'A moderately long description that is somewhere between short and extremely long',
    },
  ];
  const [value, setValue] = useState<string | null>('1');

  return (
    <VStack gap={2}>
      <Select
        label="Single select - very long option labels"
        onChange={setValue}
        options={longOptions}
        placeholder="Empty value"
        value={value}
      />
      <Select
        compact
        label="Single select - very long option labels - compact"
        onChange={setValue}
        options={longOptions}
        placeholder="Empty value"
        value={value}
      />
    </VStack>
  );
};

const LongPlaceholder = () => {
  const [value, setValue] = useState<string | null>(null);

  return (
    <Select
      label="Single select - long placeholder"
      onChange={setValue}
      options={exampleOptions}
      placeholder="This is a very long placeholder that should be truncated with an ellipsis"
      value={value}
    />
  );
};

const MixedOptionsWithAndWithoutDescriptionsExample = () => {
  const mixedOptions = [
    { value: null, label: 'Remove selection' },
    { value: '1', label: 'Option 1', description: 'Has description' },
    { value: '2', label: 'Option 2' },
    { value: '3', label: 'Option 3', description: 'Also has description' },
    { value: '4', label: 'Option 4' },
    { value: '5', label: 'Option 5', description: 'Another description' },
  ];
  const [value, setValue] = useState<string | null>('1');

  return (
    <Select
      label="Single select - mixed options with/without descriptions"
      onChange={setValue}
      options={mixedOptions}
      placeholder="Empty value"
      value={value}
    />
  );
};

const CompactWithVariantsExample = () => {
  const [positiveValue, setPositiveValue] = useState<string | null>('1');
  const [negativeValue, setNegativeValue] = useState<string | null>('2');

  return (
    <VStack gap={4}>
      <Select
        compact
        helperText="Compact positive variant"
        label="Compact + Positive"
        onChange={setPositiveValue}
        options={exampleOptions}
        placeholder="Empty value"
        value={positiveValue}
        variant="positive"
      />
      <Select
        compact
        helperText="Compact negative variant"
        label="Compact + Negative"
        onChange={setNegativeValue}
        options={exampleOptions}
        placeholder="Empty value"
        value={negativeValue}
        variant="negative"
      />
    </VStack>
  );
};

const MultiSelectWithDescriptionsExample = () => {
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

const CustomStylesExample = () => {
  const [value, setValue] = useState<string | null>('1');

  return (
    <Select
      label="Single select - custom styles"
      onChange={setValue}
      options={exampleOptions}
      styles={{
        control: {
          backgroundColor: 'lightgray',
          padding: 10,
        },
        option: {
          backgroundColor: 'lightblue',
        },
        optionBlendStyles: {
          pressedBackground: 'darkgreen',
        },
      }}
      value={value}
    />
  );
};

const AllCombinedFeaturesExample = () => {
  const [value, setValue] = useState<string | null>('1');

  return (
    <Select
      helperText="All features combined"
      label="Single select - all combined features"
      onChange={setValue}
      options={exampleOptionsWithCustomAccessoriesAndMedia}
      placeholder="Choose an option"
      startNode={<Icon color="fg" name="search" />}
      value={value}
      variant="positive"
    />
  );
};

const RefImperativeHandleExample = () => {
  const [value, setValue] = useState<string | null>('1');
  const selectRef = useRef<SelectRef>(null);

  const handleOpenSelect = useCallback(() => {
    selectRef.current?.setOpen?.(true);
  }, []);

  return (
    <VStack gap={2}>
      <HStack gap={2}>
        <Button onPress={handleOpenSelect}>Open Select</Button>
      </HStack>
      <Select
        ref={selectRef}
        label="Single select - ref imperative handle"
        onChange={setValue}
        options={exampleOptions}
        placeholder="Empty value"
        value={value}
      />
    </VStack>
  );
};

const SelectV3Screen = () => {
  return (
    <ExampleScreen>
      <Example title="Default">
        <DefaultExample />
      </Example>
      <Example title="Typed">
        <TypedSelectExample />
      </Example>
      <Example title="Compact">
        <CompactExample />
      </Example>
      <Example title="With Helper Text">
        <WithHelperTextExample />
      </Example>
      <Example title="With Description">
        <WithDescriptionExample />
      </Example>
      <Example title="With Only Description">
        <WithOnlyDescriptionExample />
      </Example>
      <Example title="With No Label or Description">
        <WithNoLabelOrDescriptionExample />
      </Example>
      <Example title="Accessibility Label">
        <AccessibilityLabelExample />
      </Example>
      <Example title="Custom Accessibility Role">
        <CustomAccessibilityRoleExample />
      </Example>
      <Example title="No Label">
        <NoLabelExample />
      </Example>
      <Example title="Empty Options">
        <EmptyOptionsExample />
      </Example>
      <Example title="Empty Options With Custom Label">
        <EmptyOptionsWithCustomLabelExample />
      </Example>
      <Example title="Empty Options With Custom Component">
        <EmptyOptionsWithCustomComponentExample />
      </Example>
      <Example title="Disabled">
        <DisabledExample />
      </Example>
      <Example title="With Disabled Options">
        <WithDisabledOptionsExample />
      </Example>
      <Example title="Without Null Option">
        <WithoutNullExample />
      </Example>
      <Example title="With Start Node">
        <WithStartNodeExample />
      </Example>
      <Example title="With Custom End Node">
        <WithCustomEndNodeExample />
      </Example>
      <Example title="With Custom Accessory">
        <WithCustomAccessoryExample />
      </Example>
      <Example title="With Custom Media">
        <WithCustomMediaExample />
      </Example>
      <Example title="With Options as React Nodes">
        <WithOptionsAsReactNodesExample />
      </Example>
      <Example title="With Mixed Default and Custom Component Options">
        <MixedDefaultAndCustomComponentOptions />
      </Example>
      <Example title="With Custom Control Component">
        <CustomControlComponent />
      </Example>
      <Example title="With Custom Option Component">
        <CustomOptionComponent />
      </Example>
      <Example title="With Unique Accessory and Media">
        <WithUniqueAccessoryAndMediaExample />
      </Example>
      <Example title="Unique End Node for Each Option">
        <UniqueEndNodeForEachOptionExample />
      </Example>
      <Example title="Positive Variant">
        <PositiveVariantExample />
      </Example>
      <Example title="Negative Variant">
        <NegativeVariantExample />
      </Example>
      <Example title="Multi Select Default">
        <MultiSelectDefaultExample />
      </Example>
      <Example title="Multi Select Compact">
        <MultiSelectCompactExample />
      </Example>
      <Example title="Multi Select Hide Select All">
        <MultiSelectHideSelectAllExample />
      </Example>
      <Example title="Multi Select Custom Select All Label">
        <MultiSelectCustomSelectAllLabelExample />
      </Example>
      <Example title="Multi Select Custom Clear All Label">
        <MultiSelectCustomClearAllLabelExample />
      </Example>
      <Example title="Multi Select Custom Select All Option">
        <MultiSelectCustomSelectAllOptionExample />
      </Example>
      <Example title="Multi Select Disabled">
        <MultiSelectDisabledExample />
      </Example>
      <Example title="Multi Select With Disabled Options">
        <MultiSelectWithDisabledOptionsExample />
      </Example>
      <Example title="Multi Select With Custom Accessory">
        <MultiSelectWithCustomAccessoryExample />
      </Example>
      <Example title="Multi Select With Custom Media">
        <MultiSelectWithCustomMediaExample />
      </Example>
      <Example title="Multi Select Many Options">
        <MultiSelectManyOptionsExample />
      </Example>
      <Example title="Multi Select Empty Options">
        <MultiSelectEmptyOptionsExample />
      </Example>
      <Example title="Multi Select Max Selected Options">
        <MultiSelectMaxSelectedOptionsExample />
      </Example>
      <Example title="Multi Select Custom Hidden Selected Options Label">
        <MultiSelectCustomHiddenSelectedOptionsLabelExample />
      </Example>
      <Example title="Multi Select Start Node">
        <MutliSelectStartNodeExample />
      </Example>
      <Example title="Very Long Option Labels">
        <VeryLongLabelsExample />
      </Example>
      <Example title="Long Placeholder">
        <LongPlaceholder />
      </Example>
      <Example title="Mixed Options With and Without Descriptions">
        <MixedOptionsWithAndWithoutDescriptionsExample />
      </Example>
      <Example title="Compact With Variants">
        <CompactWithVariantsExample />
      </Example>
      <Example title="Multi Select With Descriptions">
        <MultiSelectWithDescriptionsExample />
      </Example>
      <Example title="Custom Styles">
        <CustomStylesExample />
      </Example>
      <Example title="All Combined Features">
        <AllCombinedFeaturesExample />
      </Example>
      <Example title="Ref Imperative Handle">
        <RefImperativeHandleExample />
      </Example>
    </ExampleScreen>
  );
};

export default SelectV3Screen;
