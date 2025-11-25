/* stylelint-disable color-named */
import { useRef, useState } from 'react';
import { useMultiSelect } from '@coinbase/cds-common/select/useMultiSelect';
import { css } from '@linaria/core';

import { Button } from '../../../buttons/Button';
import { UpsellCard } from '../../../cards/UpsellCard';
import { TextInput } from '../../../controls';
import { cx } from '../../../cx';
import { Icon } from '../../../icons/Icon';
import { HStack } from '../../../layout/HStack';
import { VStack } from '../../../layout/VStack';
import { Spinner } from '../../../loaders';
import { Text } from '../../../typography/Text';
import {
  Select,
  type SelectControlComponent,
  type SelectOption,
  type SelectOptionComponent,
  type SelectRef,
  type SelectType,
} from '../Select';

export default {
  title: 'Components/Alpha/Select/SingleSelect',
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
    { value: '9', label: 'Option 9' },
  ];
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
    { value: '9', label: 'Option 9' },
  ];
  const [value, setValue] = useState<string | null>('1');

  return (
    <Select
      compact
      label="Single select - compact"
      onChange={setValue}
      options={exampleOptions}
      placeholder="Empty value"
      value={value}
    />
  );
};

export const ExampleForm = () => {
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
  ];
  const [value, setValue] = useState<string | null>('1');
  const { value: multiSelectValue, onChange: multiSelectOnChange } = useMultiSelect({
    initialValue: ['1', '2'],
  });

  return (
    <VStack gap={2} width="100%">
      <HStack gap={1}>
        <Select
          label="Single select"
          onChange={setValue}
          options={exampleOptions}
          placeholder="Empty value"
          style={{ flexGrow: 1 }}
          value={value}
        />
        <TextInput label="Text input" width="40%" />
      </HStack>
      <HStack gap={1}>
        <Select
          compact
          label="Single select - compact"
          onChange={setValue}
          options={exampleOptions}
          placeholder="Empty value"
          style={{ flexGrow: 1 }}
          value={value}
        />
        <TextInput compact label="Text input" width="40%" />
      </HStack>
      <HStack gap={1}>
        <TextInput label="Text input" labelVariant="inside" width="40%" />
      </HStack>
      <HStack gap={1}>
        <Select
          controlAccessibilityLabel="Multi select control with selected options"
          label="Multi select"
          onChange={multiSelectOnChange}
          options={exampleOptions}
          placeholder="Empty value"
          style={{ flexGrow: 1 }}
          type="multi"
          value={multiSelectValue}
        />
        <TextInput label="Text input" width="40%" />
      </HStack>
      <HStack gap={1}>
        <Select
          compact
          controlAccessibilityLabel="Multi select control with selected options"
          label="Multi select - compact"
          onChange={multiSelectOnChange}
          options={exampleOptions}
          placeholder="Empty value"
          style={{ flexGrow: 1 }}
          type="multi"
          value={multiSelectValue}
        />
        <TextInput compact label="Text input" width="40%" />
      </HStack>
      <HStack gap={1}>
        <TextInput label="Text input" labelVariant="inside" width="40%" />
      </HStack>
    </VStack>
  );
};

export const HelperText = () => {
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
  ];
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

export const Description = () => {
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

export const OnlyDescription = () => {
  const exampleOptionsWithOnlyDescription = [
    { value: null, label: 'Remove selection' },
    { value: '1', description: 'Description 1' },
    { value: '2', description: 'Description 2' },
    { value: '3', description: 'Description 3' },
    { value: '4', description: 'Description 4' },
  ];
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

export const AccessibilityLabel = () => {
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
  ];
  const [value, setValue] = useState<string | null>('1');

  return (
    <Select
      accessibilityLabel="Custom accessibility label"
      controlAccessibilityLabel="Custom control accessibility label"
      label="Single select - accessibility label"
      onChange={setValue}
      options={exampleOptions}
      placeholder="Empty value"
      value={value}
    />
  );
};

export const AccessibilityRoles = () => {
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
  ];
  const [value, setValue] = useState<string | null>('1');

  return (
    <Select
      accessibilityRoles={{ dropdown: 'menu', option: 'menuitem' }}
      label="Single select - accessibility role"
      onChange={setValue}
      options={exampleOptions}
      placeholder="Empty value"
      value={value}
    />
  );
};

export const NoLabel = () => {
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
  ];
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

export const Disabled = () => {
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

export const DisabledOptions = () => {
  const exampleOptionsWithSomeDisabled = [
    { value: null, label: 'Remove selection' },
    { value: '1', label: 'Option 1', disabled: true },
    { value: '2', label: 'Option 2' },
    { value: '3', label: 'Option 3' },
    { value: '4', label: 'Option 4', disabled: true },
  ];
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

export const WithoutNull = () => {
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

export const OptionsAsReactNodes = () => {
  const exampleOptionsWithReactNodes = [
    {
      value: '1',
      label: <Text font="title3">Option 1</Text>,
      description: <Text font="title3">Description 1</Text>,
    },
    {
      value: '2',
      label: 'Option 2',
      description: 'Not a react node',
    },
    {
      value: '3',
      label: <Text font="title4">Option 3</Text>,
      description: <Text font="title4">Description 3</Text>,
    },
    {
      value: '4',
      label: 'Option 4',
      description: 'Not a react node',
    },
    {
      value: '5',
      label: <Text font="legal">Option 5</Text>,
      description: <Text font="legal">Description 5</Text>,
    },
  ];
  const [value, setValue] = useState<string | null>('1');

  return (
    <Select
      helperText="Options are displayed as react nodes"
      label="Single select - options as react nodes"
      onChange={setValue}
      options={exampleOptionsWithReactNodes}
      placeholder="Empty value"
      value={value}
    />
  );
};

export const MixedDefaultAndCustomComponentOptions = () => {
  const CustomOptionComponent: SelectOptionComponent = ({ value, onClick }) => {
    return (
      <HStack justifyContent="center">
        <Spinner size={4} />
        <Button transparent onClick={() => onClick?.(value)} width="80%">
          {value ?? 'Empty value'}
        </Button>
        <Spinner size={4} />
      </HStack>
    );
  };
  const exampleOptions = [
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
      options={exampleOptions}
      placeholder="Empty value"
      value={value}
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
    { value: '9', label: 'Option 9' },
  ];
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

export const CustomEndNode = () => {
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
  ];
  const [value, setValue] = useState<string | null>('1');

  return (
    <Select
      endNode={<Icon alignItems="center" color="fg" name="search" />}
      label="Single select - end node"
      onChange={setValue}
      options={exampleOptions}
      placeholder="Empty value"
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
    { value: '9', label: 'Option 9' },
  ];
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
    { value: '9', label: 'Option 9' },
  ];
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

export const UniqueAccessoryAndMedia = () => {
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

export const UniqueEndNodeForEachOption = () => {
  const exampleOptions = [
    { value: null, label: 'Remove selection' },
    { value: '1', label: 'Option 1', end: <Icon color="fg" name="star" /> },
    { value: '2', label: 'Option 2', end: <Icon color="fg" name="checkmark" /> },
    { value: '3', label: 'Option 3', end: <Icon color="fg" name="add" /> },
  ];
  const [value, setValue] = useState<string | null>('1');

  return (
    <Select
      label="Single select - unique end node for each option"
      onChange={setValue}
      options={exampleOptions}
      placeholder="Empty value"
      value={value}
    />
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
    { value: '9', label: 'Option 9' },
  ];
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
    { value: '9', label: 'Option 9' },
  ];
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

export const CustomStyles = () => {
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
  ];
  const [value, setValue] = useState<string | null>('1');

  return (
    <Select
      label="Single select - styles"
      onChange={setValue}
      options={exampleOptions}
      placeholder="Empty value"
      styles={{
        control: {
          padding: '20px',
          backgroundColor: 'lightgray',
        },
        controlBlendStyles: {
          background: 'coral',
          hoveredBackground: 'crimson',
          pressedBackground: 'red',
        },
        optionBlendStyles: {
          background: 'lightblue',
          hoveredBackground: 'blue',
        },
        dropdown: {
          padding: '20px',
          backgroundColor: 'pink',
        },
      }}
      value={value}
    />
  );
};

export const CustomClassNames = () => {
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
  ];
  const [value, setValue] = useState<string | null>('1');

  return (
    <Select
      classNames={{
        control: cx(paddingCss, hoveredBackgroundCss),
        option: hoveredBackgroundCss,
      }}
      label="Single select - class names"
      onChange={setValue}
      options={exampleOptions}
      placeholder="Empty value"
      value={value}
    />
  );
};

export const Typed = () => {
  type TestValue = '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9';

  const typedOptions: SelectOption<TestValue>[] = [
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

export const DefaultOpen = () => {
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
  ];
  const [value, setValue] = useState<string | null>('1');

  return (
    <Select
      defaultOpen
      label="Single select - default open"
      onChange={setValue}
      options={exampleOptions}
      placeholder="Empty value"
      value={value}
    />
  );
};

export const DisabledClickOutsideClose = () => {
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
  ];
  const [value, setValue] = useState<string | null>('1');

  return (
    <Select
      disableClickOutsideClose
      label="Single select - disable click outside close"
      onChange={setValue}
      options={exampleOptions}
      placeholder="Empty value"
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
    { value: '9', label: 'Option 9' },
  ];
  const [value, setValue] = useState<string | null>('1');
  const [open, setOpen] = useState(true);

  return (
    <div>
      <button onClick={() => setOpen(!open)} style={{ marginBottom: '10px' }}>
        Toggle Open: {open ? 'Close' : 'Open'}
      </button>
      <Select
        disableClickOutsideClose
        label="Single select - controlled open state"
        onChange={setValue}
        open={open}
        options={exampleOptions}
        placeholder="Empty value"
        setOpen={setOpen}
        value={value}
      />
    </div>
  );
};

export const EmptyOptions = () => {
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

export const EmptyOptionsWithCustomLabel = () => {
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

export const EmptyOptionsWithCustomComponent = () => {
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

export const VeryLongLabels = () => {
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
    {
      value: '5',
      description:
        'This is a very long description that is somewhere between short and extremely long',
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
      <Select
        label="Single select - very long option labels - custom start node"
        onChange={setValue}
        options={longOptions}
        placeholder="Empty value"
        startNode={<Icon color="fg" name="star" />}
        value={value}
      />
      <Select
        endNode={<Icon color="fg" name="star" />}
        label="Single select - very long option labels - custom end node"
        onChange={setValue}
        options={longOptions}
        placeholder="Empty value"
        value={value}
      />
    </VStack>
  );
};

export const MixedOptionsWithAndWithoutDescriptions = () => {
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

export const OptionsWithOnlyAccessory = () => {
  const accessoryOnlyOptions = [
    {
      value: '1',
      label: 'Option 1',
      accessory: <Icon color="fg" name="star" />,
    },
    {
      value: '2',
      label: 'Option 2',
      accessory: <Icon color="fg" name="checkmark" />,
    },
    {
      value: '3',
      label: 'Option 3',
      accessory: <Icon color="fg" name="heart" />,
    },
  ];
  const [value, setValue] = useState<string | null>('1');

  return (
    <Select
      label="Single select - options with only accessory"
      onChange={setValue}
      options={accessoryOnlyOptions}
      placeholder="Empty value"
      value={value}
    />
  );
};

export const OptionsWithOnlyMedia = () => {
  const mediaOnlyOptions = [
    {
      value: '1',
      label: 'Option 1',
      media: <Icon color="fg" name="star" />,
    },
    {
      value: '2',
      label: 'Option 2',
      media: <Icon color="fg" name="checkmark" />,
    },
    {
      value: '3',
      label: 'Option 3',
      media: <Icon color="fg" name="heart" />,
    },
  ];
  const [value, setValue] = useState<string | null>('1');

  return (
    <Select
      label="Single select - options with only media"
      onChange={setValue}
      options={mediaOnlyOptions}
      placeholder="Empty value"
      value={value}
    />
  );
};

export const CompactWithVariants = () => {
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
  ];
  const [positiveValue, setPositiveValue] = useState<string | null>('1');
  const [negativeValue, setNegativeValue] = useState<string | null>('2');

  return (
    <div style={{ display: 'flex', gap: '20px', flexDirection: 'column' }}>
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
    </div>
  );
};

export const DisabledWithVariants = () => {
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
  ];
  const [positiveValue, setPositiveValue] = useState<string | null>('1');
  const [negativeValue, setNegativeValue] = useState<string | null>('2');

  return (
    <div style={{ display: 'flex', gap: '20px', flexDirection: 'column' }}>
      <Select
        disabled
        helperText="Disabled positive variant"
        label="Disabled + Positive"
        onChange={setPositiveValue}
        options={exampleOptions}
        placeholder="Empty value"
        value={positiveValue}
        variant="positive"
      />
      <Select
        disabled
        helperText="Disabled negative variant"
        label="Disabled + Negative"
        onChange={setNegativeValue}
        options={exampleOptions}
        placeholder="Empty value"
        value={negativeValue}
        variant="negative"
      />
    </div>
  );
};

export const StartNodeWithVariants = () => {
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
  ];
  const [positiveValue, setPositiveValue] = useState<string | null>('1');
  const [negativeValue, setNegativeValue] = useState<string | null>('2');

  return (
    <div style={{ display: 'flex', gap: '20px', flexDirection: 'column' }}>
      <Select
        helperText="Start node with positive variant"
        label="Start Node + Positive"
        onChange={setPositiveValue}
        options={exampleOptions}
        placeholder="Empty value"
        startNode={<Icon color="fg" name="search" />}
        value={positiveValue}
        variant="positive"
      />
      <Select
        helperText="Start node with negative variant"
        label="Start Node + Negative"
        onChange={setNegativeValue}
        options={exampleOptions}
        placeholder="Empty value"
        startNode={<Icon color="fg" name="warning" />}
        value={negativeValue}
        variant="negative"
      />
    </div>
  );
};

export const LongHelperText = () => {
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
  ];
  const [value, setValue] = useState<string | null>('1');

  return (
    <Select
      helperText="This is a very long helper text that should test how the component handles extensive helper text content. It might wrap to multiple lines or be truncated depending on the design."
      label="Single select - long helper text"
      onChange={setValue}
      options={exampleOptions}
      placeholder="Empty value"
      value={value}
    />
  );
};

export const CustomLongPlaceholder = () => {
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
  ];
  const [value, setValue] = useState<string | null>(null);

  return (
    <Select
      label="Single select - long placeholder"
      onChange={setValue}
      options={exampleOptions}
      placeholder="This is a very long placeholder text that should test how the component handles extensive placeholder content"
      value={value}
    />
  );
};

export const AllCombinedFeatures = () => {
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

export const ComplexStyleCombinations = () => {
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
  ];
  const [value, setValue] = useState<string | null>('1');

  return (
    <Select
      classNames={{
        control: paddingCss,
        option: hoveredBackgroundCss,
        dropdown: hoveredBackgroundCss,
      }}
      label="Single select - complex style combinations"
      onChange={setValue}
      options={exampleOptions}
      placeholder="Empty value"
      styles={{
        control: {
          border: '2px solid purple',
          borderRadius: '8px',
        },
        option: {
          fontWeight: 'bold',
        },
        optionBlendStyles: {
          background: 'lightgreen',
          hoveredBackground: 'darkgreen',
          pressedBackground: 'green',
        },
        dropdown: {
          border: '1px solid orange',
          borderRadius: '12px',
        },
      }}
      value={value}
    />
  );
};

export const SingleNullOnlyOption = () => {
  const [value, setValue] = useState<string | null>(null);

  return (
    <Select
      label="Single select - only null option"
      onChange={setValue}
      options={[{ value: null, label: 'None' }]}
      placeholder="Empty value"
      value={value}
    />
  );
};

export const NestedComplexOptions = () => {
  const complexOptions = [
    {
      value: '1',
      label: 'Complex Option 1',
      description: 'Description with special characters: àáâãäåæçèéêë',
      accessory: <Icon color="fg" name="star" />,
      media: <Icon color="fg" name="heart" />,
    },
    {
      value: '2',
      label: 'Option with Numbers: 123456789',
      description: 'Mathematical symbols: ∑∏∫∂∇∆',
      accessory: <Icon color="fg" name="checkmark" />,
      media: <Icon color="fg" name="cross" />,
    },
    {
      value: '3',
      label: 'Emojis: 🚀🌟💫⭐️🔥',
      description: 'More emojis: 🎉🎊🎈🎁🎂',
      disabled: true,
    },
  ];
  const [value, setValue] = useState<string | null>('1');

  return (
    <Select
      label="Single select - complex nested options"
      onChange={setValue}
      options={complexOptions}
      placeholder="Choose complex option"
      value={value}
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
  const [value, setValue] = useState<string | null>('3');

  return (
    <Select
      label="Single select - edge case empty labels"
      onChange={setValue}
      options={edgeOptions}
      placeholder="Empty value"
      value={value}
    />
  );
};

export const StressTestManyOptionsWithDescriptions = () => {
  const stressOptions = Array.from({ length: 50 }, (_, i) => ({
    value: (i + 1).toString(),
    label: `Option ${i + 1}`,
    description: `This is a description for option ${
      i + 1
    } with some additional text to test rendering performance`,
    ...(i % 3 === 0 && { disabled: true }),
    ...(i % 5 === 0 && { accessory: <Icon color="fg" name="star" /> }),
    ...(i % 7 === 0 && { media: <Icon color="fg" name="heart" /> }),
  }));
  const [value, setValue] = useState<string | null>('1');

  return (
    <Select
      label="Single select - stress test many options with descriptions"
      onChange={setValue}
      options={stressOptions}
      placeholder="Choose from many options"
      value={value}
    />
  );
};

export const CustomControlComponent = () => {
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
  ];
  const [value, setValue] = useState<string | null>('1');

  const CustomControlComponent: SelectControlComponent = ({ value, setOpen }) => {
    return <Button onClick={() => setOpen(true)}>{value ?? 'Empty value'}</Button>;
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

export const CustomOptionComponent = () => {
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
  ];
  const [value, setValue] = useState<string | null>('1');

  const CustomOptionComponent: SelectOptionComponent = ({ value, onClick }) => {
    return (
      <HStack justifyContent="center">
        <Spinner size={4} />
        <Button transparent onClick={() => onClick?.(value)} width="80%">
          {value ?? 'Empty value'}
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

export const ValueDisplayed = () => {
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
  ];
  const [value, setValue] = useState<string | null>('1');

  return (
    <VStack gap={2}>
      <UpsellCard description={value ?? 'Empty value'} title="Your selection"></UpsellCard>
      <Select
        label="Single select - value displayed"
        onChange={setValue}
        options={exampleOptions}
        placeholder="Empty value"
        value={value}
      />
    </VStack>
  );
};

export const RefImperativeHandle = () => {
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
  ];
  const [value, setValue] = useState<string | null>('1');
  const selectRef = useRef<SelectRef>(null);

  const handleOpenSelect = () => {
    selectRef.current?.setOpen?.(true);
  };
  const handleCloseSelect = () => {
    selectRef.current?.setOpen?.(false);
  };

  return (
    <VStack gap={2}>
      <HStack gap={2}>
        <Button onClick={handleOpenSelect}>Open</Button>
        <Button onClick={handleCloseSelect}>Close</Button>
        <Text color="fg">{selectRef.current?.open ? 'Open' : 'Closed'}</Text>
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
