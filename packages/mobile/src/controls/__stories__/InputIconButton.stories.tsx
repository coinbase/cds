import React from 'react';
import type { InputVariant } from '@cbhq/cds-common';

import { Example, ExampleScreen } from '../../examples/ExampleScreen';
import { Box } from '../../layout/Box';
import { InputIconButton } from '../InputIconButton';
import { TextInput } from '../TextInput';

const Basic = () => {
  const variants: InputVariant[] = [
    'foreground',
    'foregroundMuted',
    'primary',
    'negative',
    'positive',
  ];

  return (
    <>
      {variants.map((variant) => (
        <TextInput
          key={`${variant}-input-iconbutton`}
          editable={__DEV__}
          label={variant}
          start={
            <InputIconButton active accessibilityLabel="Add" name="add" variant="foregroundMuted" />
          }
          variant={variant}
        />
      ))}
    </>
  );
};

const DefaultsToPrimary = () => {
  return (
    <TextInput
      editable={__DEV__}
      label="Label"
      start={<InputIconButton accessibilityLabel="Search" name="search" />}
      variant="foregroundMuted"
    />
  );
};

const SetColorAndInheritFocusStyle = () => {
  return (
    <TextInput
      editable={__DEV__}
      label="Search"
      start={<InputIconButton accessibilityLabel="Search" name="search" variant="secondary" />}
      variant="foregroundMuted"
    />
  );
};

const BasicEnd = () => {
  return (
    <TextInput
      editable={__DEV__}
      end={<InputIconButton active accessibilityLabel="Add" name="add" />}
      label="Label"
    />
  );
};

const AddCustomColor = () => {
  return (
    <TextInput
      editable={__DEV__}
      label="Label"
      start={
        <InputIconButton
          active
          disableInheritFocusStyle
          accessibilityLabel="Add"
          name="add"
          variant="foregroundMuted"
        />
      }
    />
  );
};

const AddCustomColorEnd = () => {
  return (
    <TextInput
      editable={__DEV__}
      end={
        <InputIconButton
          active
          disableInheritFocusStyle
          transparent
          accessibilityLabel="Add"
          name="add"
          variant="foregroundMuted"
        />
      }
      label="Label"
    />
  );
};

const InputIconButtonScreen = () => {
  return (
    <ExampleScreen>
      <Example title="InputIconButton changes color with focus state">
        <Basic />
      </Example>

      <Example title="InputIconButton defaults to primary if no color is passed in">
        <DefaultsToPrimary />
      </Example>

      <Example title="InputIconButton has its own custom color when unFocused, but changes color with focus state when focused">
        <SetColorAndInheritFocusStyle />
      </Example>

      <Example title="InputIconButton works for end icons too">
        <BasicEnd />
      </Example>

      <Example title="Override color of focused state">
        <AddCustomColor />
      </Example>

      <Example title="Override color of focused state for end icon">
        <AddCustomColorEnd />
      </Example>

      <Example title="Using InputIconButton outside of a TextInput should not throw error">
        <Box alignItems="center" flexDirection="row" justifyContent="space-between" width={350}>
          <InputIconButton active name="add" variant="foregroundMuted" />
        </Box>
      </Example>
    </ExampleScreen>
  );
};

export default InputIconButtonScreen;
