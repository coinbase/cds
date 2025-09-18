import type React from 'react';
import { expect } from '@storybook/jest';
import type { ComponentStoryObj } from '@storybook/react';
import { userEvent, waitFor, within } from '@storybook/testing-library';

import { pauseStory } from '../../utils/storybook';

import { AddressForm } from './AddressForm';

export default {
  title: 'Interactive/TextInput',
  component: AddressForm,
};

export const FormFilled: ComponentStoryObj<typeof AddressForm> = {
  args: {
    onSubmit: (e: React.FormEvent) => {
      e.preventDefault();
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.type(canvas.getByPlaceholderText('4321 Jade Palace'), '221 Stockholm Street');
    await pauseStory(1000);

    await userEvent.type(canvas.getByLabelText('City/town'), 'San Jose');
    await pauseStory(1000);

    await userEvent.type(canvas.getByLabelText('State'), 'California');
    await pauseStory(1000);

    await userEvent.type(canvas.getByLabelText('Postal code'), '89201');
    await pauseStory(1000);

    await userEvent.type(canvas.getByLabelText('Country'), 'United States');
    await pauseStory(1000);

    await userEvent.click(canvas.getByTestId('save-btn'));
    await pauseStory(1000);

    await waitFor(() => expect(canvas.getByText('Submit button was clicked')).toBeInTheDocument());
  },
};
