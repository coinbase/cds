import React, { useState } from 'react';
import { css } from '@linaria/core';

import { useCheckboxGroupState } from '../../hooks/useCheckboxGroupState';
import { Box, VStack } from '../../layout';
import { ThemeProvider } from '../../system/ThemeProvider';
import { defaultTheme } from '../../themes/defaultTheme';
import { Text } from '../../typography/Text';
import { Checkbox } from '../Checkbox';
import { CheckboxGroup } from '../CheckboxGroup';

export default {
  title: 'Components/Checkbox',
  component: Checkbox,
};

const Example: React.FC<React.PropsWithChildren<{ title: string }>> = ({ children, title }) => {
  return (
    <VStack gap={2}>
      <Text as="h2" display="block" font="title3">
        {title}
      </Text>
      {children}
    </VStack>
  );
};

function Normal() {
  const [checked, setChecked] = useState(false);
  return (
    <Checkbox checked={checked} name="normal-checkbox" onChange={() => setChecked((s) => !s)}>
      Normal
    </Checkbox>
  );
}

function CustomColor() {
  const [checked, setChecked] = useState(false);
  return (
    <VStack gap={2}>
      <Checkbox
        checked={checked}
        controlColor="bgNegative"
        name="control-color-checkbox"
        onChange={() => setChecked((s) => !s)}
      >
        Control color
      </Checkbox>
      <Checkbox
        background={checked ? 'bgNegative' : 'bg'}
        borderColor={checked ? 'bgNegative' : 'bgPositive'}
        checked={checked}
        controlColor="fg"
        name="style-props-checkbox"
        onChange={() => setChecked((s) => !s)}
      >
        Style props
      </Checkbox>
      <Checkbox
        background={checked ? 'bgNegative' : 'bg'}
        borderColor={checked ? 'bgNegative' : 'bgPositive'}
        borderRadius={200}
        borderWidth={500}
        color="bgPrimary"
        controlColor="fg"
        indeterminate={checked}
        name="indeterminate-checkbox"
        onChange={() => setChecked((s) => !s)}
      >
        Style props indeterminate
      </Checkbox>
    </VStack>
  );
}

function Indeterminate() {
  const [indeterminate, setIndeterminate] = useState(false);
  return (
    <Checkbox
      indeterminate={indeterminate}
      name="indeterminate-checkbox"
      onChange={() => setIndeterminate((s) => !s)}
    >
      Indeterminate
    </Checkbox>
  );
}

const darkNormalCss = css`
  padding: 20px;
  /* All stories have the light story container. This offsets the light story container's padding. */
  margin: -20px;
  background-color: var(--color-bg);
`;

function DarkNormal() {
  const [checked, setChecked] = useState(false);
  return (
    <ThemeProvider activeColorScheme="dark" theme={defaultTheme}>
      <div className={darkNormalCss}>
        {' '}
        <Checkbox checked={checked} onChange={() => setChecked((s) => !s)}>
          Normal
        </Checkbox>
      </div>
    </ThemeProvider>
  );
}

export const NoLabel = () => {
  const [checked, setChecked] = useState(false);
  return <Checkbox checked={checked} onChange={() => setChecked((s) => !s)} />;
};

// This story does not render a label on purpose
NoLabel.parameters = {
  a11y: {
    config: { rules: [{ id: 'label', enabled: false }] },
    test: 'off',
  },
};

function States() {
  return (
    <VStack gap={2}>
      <Checkbox disabled>Disabled unselected</Checkbox>
      <Checkbox checked disabled>
        Disabled selected
      </Checkbox>
    </VStack>
  );
}

export const ReadOnly = () => (
  <VStack gap={2}>
    <Checkbox readOnly>Read-only unselected</Checkbox>
    <Checkbox checked readOnly>
      Read-only selected
    </Checkbox>
  </VStack>
);
ReadOnly.parameters = {
  /**
   * Color contrast ratio doesn't need to meet 4.5:1, as the element is disabled
   * @link https://dequeuniversity.com/rules/axe/4.3/color-contrast
   */
  a11y: { config: { rules: [{ id: 'color-contrast', enabled: false }] } },
};

function MultiLineLabel() {
  return (
    <Box width="250px">
      <Checkbox>
        This checkbox has a multi-line label. The checkbox and label should align at the top.
      </Checkbox>
    </Box>
  );
}

const options = {
  'fish-taco': 'Fish tacos',
  puttanesca: 'Spaghetti alla puttanesca',
  'hamachi-salad': 'Hamachi salad',
  'pad-thai': 'Pad Thai',
  pizza: 'Margherita Pizza',
  ramen: 'Tonkotsu Ramen',
};
const optionValues = Object.keys(options);

function Group() {
  const [selectedValues, { toggle }] = useCheckboxGroupState(optionValues);
  return (
    <>
      <Text as="h1" display="block" font="headline" id="order-dinner-label-no-select-all">
        Checkbox Group Default
      </Text>
      <CheckboxGroup
        aria-labelledby="order-dinner-label-no-select-all"
        name="checkbox-group-default"
        onChange={toggle}
        selectedValues={selectedValues}
      >
        {Object.entries(options).map(([value, label]) => (
          <Checkbox key={value} value={value}>
            {label}
          </Checkbox>
        ))}
      </CheckboxGroup>
    </>
  );
}

const gridLayoutCss = css`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 16px;
`;

function CustomLayoutCheckboxGroup() {
  const [selectedValues, { toggle }] = useCheckboxGroupState(optionValues);
  return (
    <>
      <Text as="h2" display="block" font="headline" paddingY={1}>
        Two Column Layout
      </Text>
      <CheckboxGroup
        className={gridLayoutCss}
        name="checkbox-grid"
        onChange={toggle}
        selectedValues={selectedValues}
      >
        {Object.entries(options).map(([value, label]) => (
          <Checkbox key={value} value={value}>
            {label}
          </Checkbox>
        ))}
      </CheckboxGroup>
    </>
  );
}

function CustomBorderWidth() {
  const [checked, setChecked] = useState(false);
  return (
    <VStack gap={2}>
      <Checkbox
        checked={checked}
        name="border-width-default"
        onChange={() => setChecked((s) => !s)}
      >
        Default (100)
      </Checkbox>
      <Checkbox
        borderWidth={200}
        checked={checked}
        name="border-width-200"
        onChange={() => setChecked((s) => !s)}
      >
        Border width 200
      </Checkbox>
      <Checkbox
        borderWidth={500}
        checked={checked}
        name="border-width-500"
        onChange={() => setChecked((s) => !s)}
      >
        Border width 500
      </Checkbox>
    </VStack>
  );
}

export const All = () => {
  return (
    <VStack gap={4}>
      <Example title="Default">
        <Normal />
      </Example>
      <Example title="Custom Color">
        <CustomColor />
      </Example>
      <Example title="Indeterminate">
        <Indeterminate />
      </Example>
      <Example title="Dark Theme">
        <DarkNormal />
      </Example>
      <Example title="States">
        <States />
      </Example>
      <Example title="Multi-line Label">
        <MultiLineLabel />
      </Example>
      <Example title="Checkbox Group">
        <Group />
      </Example>
      <Example title="Custom Layout Checkbox Group">
        <CustomLayoutCheckboxGroup />
      </Example>
      <Example title="Custom Border Width">
        <CustomBorderWidth />
      </Example>
    </VStack>
  );
};
