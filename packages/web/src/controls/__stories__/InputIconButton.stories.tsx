import React from 'react';

import { Box } from '../../layout/Box';
import { InputIconButton } from '../InputIconButton';
import { TextInput } from '../TextInput';

export default {
  title: 'Components/Inputs/InputIconButton',
  component: InputIconButton,
};

const variants = ['foreground', 'foregroundMuted', 'primary', 'negative', 'positive'] as const;

export const AddCustomColor = () => {
  return (
    <TextInput
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

export const AddCustomColorEnd = () => {
  return (
    <TextInput
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

export const Basic = () => {
  return (
    <>
      {variants.map((variant) => (
        <TextInput
          key={`${variant}-input-iconbutton`}
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

export const BasicEnd = () => {
  return (
    <TextInput end={<InputIconButton active accessibilityLabel="Add" name="add" />} label="Label" />
  );
};

export const DefaultsToPrimary = () => {
  return (
    <TextInput
      label="Label"
      start={<InputIconButton accessibilityLabel="Search" name="search" />}
      variant="foregroundMuted"
    />
  );
};

export const InvalidPlacement = () => {
  return (
    <Box background="bgAlternate">
      <InputIconButton active accessibilityLabel="Add" name="add" variant="foregroundMuted" />
    </Box>
  );
};

export const SetColorAndInheritFocusStyle = () => {
  return (
    <TextInput
      label="Search"
      start={<InputIconButton accessibilityLabel="Search" name="search" variant="secondary" />}
      variant="foregroundMuted"
    />
  );
};
