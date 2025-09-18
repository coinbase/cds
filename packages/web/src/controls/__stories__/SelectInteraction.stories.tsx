import React, { useState } from 'react';
import { expect } from '@storybook/jest';
import type { ComponentStoryObj } from '@storybook/react';
import { userEvent, waitFor, within } from '@storybook/testing-library';

import { pauseStory } from '../../utils/storybook';
import type { SelectProps } from '../Select';
import { Select } from '../Select';
import { SelectOption } from '../SelectOption';

const options = ['Option 1', 'Option 2', 'Option 3', 'Option 4', 'Option 5', 'Option 6'];
const placeholder = 'Select an option';

const SelectForm = (props: SelectProps) => {
  const [value, setValue] = useState<string | undefined>(undefined);
  return (
    <Select disablePortal onChange={setValue} value={value} {...props}>
      {options.map((option) => (
        <SelectOption key={option} title={option} value={option} />
      ))}
    </Select>
  );
};

export default {
  title: 'Interactive/Select',
  component: SelectForm,
};

export const SimpleSelect: ComponentStoryObj<typeof SelectForm> = {
  args: {
    placeholder,
    label: 'Label',
    helperText: 'I am helpful',
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // expect to see placeholder
    await waitFor(() => expect(canvas.getByText(placeholder)).toBeDefined());

    // open the menu
    await userEvent.click(canvas.getByRole('button'));
    await pauseStory(1000);

    // close the menu by clicking outside of it (this is hacky, but it clicks the invisible scrim)
    await userEvent.click(canvas.getByRole('dialog'));
    await pauseStory(1000);

    // open the menu again
    await userEvent.click(canvas.getByRole('button'));
    await pauseStory(1000);

    // select an option
    await userEvent.click(canvas.getByText(options[4]));
    await pauseStory(1000);

    // expect placeholder to be replaced with selected option
    await waitFor(() => expect(canvas.getByText(options[4])).toBeDefined());
    await waitFor(() => expect(canvas.queryByText(placeholder)).toBeNull());

    // menu should close
    await waitFor(() => expect(canvas.queryByRole('dialog')).toBeNull());
  },
};

export const SmallSelect: ComponentStoryObj<typeof SelectForm> = {
  args: {
    placeholder,
    width: 80,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    userEvent.click(canvas.getByRole('button'));
  },
};
