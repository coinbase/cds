import React from 'react';
import type { InputVariant } from '@coinbase/cds-common';
import type { ThemeVars } from '@coinbase/cds-common/core/theme';

import { Example, ExampleScreen } from '../../examples/ExampleScreen';
import { Box } from '../../layout/Box';
import { InputIcon } from '../InputIcon';
import { TextInput } from '../TextInput';

const variants = ['foreground', 'foregroundMuted', 'primary', 'negative', 'positive'] as const;

const variantColorMap: Record<InputVariant, ThemeVars.Color> = {
  primary: 'fgPrimary',
  positive: 'fgPositive',
  negative: 'fgNegative',
  foreground: 'fg',
  foregroundMuted: 'fgMuted',
  secondary: 'bgSecondary',
};

const Basic = () => {
  return (
    <>
      {variants.map((variant) => (
        <TextInput
          key={`${variant}-inputicon`}
          editable={__DEV__}
          label={variant}
          start={<InputIcon active color={variantColorMap[variant]} name="add" />}
          variant={variant}
        />
      ))}
    </>
  );
};

const AccessibleInputIcon = () => {
  return (
    <TextInput
      accessibilityLabel="Search add an item"
      editable={__DEV__}
      label="Add"
      start={<InputIcon active name="add" />}
    />
  );
};

const DefaultsToForeground = () => {
  return (
    <TextInput
      editable={__DEV__}
      label="Search"
      start={<InputIcon name="search" />}
      variant="foregroundMuted"
    />
  );
};

const SetColorAndInheritFocusStyle = () => {
  return (
    <TextInput
      editable={__DEV__}
      label="Search"
      start={<InputIcon color="fgPositive" name="search" />}
      variant="foregroundMuted"
    />
  );
};

const BasicEnd = () => {
  return <TextInput editable={__DEV__} end={<InputIcon active name="add" />} label="Label" />;
};

const AddCustomColor = () => {
  return (
    <TextInput
      editable={__DEV__}
      label="Label"
      start={<InputIcon active disableInheritFocusStyle color="fg" name="add" />}
    />
  );
};

const AddCustomColorEnd = () => {
  return (
    <TextInput
      editable={__DEV__}
      end={<InputIcon active disableInheritFocusStyle color="fg" name="add" />}
      label="Label"
    />
  );
};

const InvalidPlacement = () => {
  return (
    <Box background="bgAlternate">
      <InputIcon active name="add" />
    </Box>
  );
};

const InputIconScreen = () => {
  return (
    <ExampleScreen>
      <Example title="InputIcon changes color with focus state">
        <Basic />
      </Example>

      <Example title="With good accessible label">
        <AccessibleInputIcon />
      </Example>

      <Example title="InputIcon defaults to foreground if no color is passed in">
        <DefaultsToForeground />
      </Example>

      <Example title="InputIcon has its own custom color when unFocused, but changes color with focus state when focused">
        <SetColorAndInheritFocusStyle />
      </Example>

      <Example title="InputIcon works for end icons too">
        <BasicEnd />
      </Example>

      <Example title="Override color of focused state">
        <AddCustomColor />
      </Example>

      <Example title="Override color of focused state for end icon">
        <AddCustomColorEnd />
      </Example>

      <Example title="Using InputIcon outside of a TextInput should not throw error">
        <InvalidPlacement />
      </Example>
    </ExampleScreen>
  );
};

export default InputIconScreen;
