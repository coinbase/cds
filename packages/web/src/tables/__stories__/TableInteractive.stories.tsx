import { expect } from '@storybook/jest';
import type { Meta, StoryObj } from '@storybook/react';
import { userEvent, within } from '@storybook/testing-library';

import { StickyHeaderSortingExample } from './Table.stories';

const meta = {
  title: 'Interactive/Table',
  component: StickyHeaderSortingExample,
} satisfies Meta<typeof StickyHeaderSortingExample>;

export default meta;
type Story = StoryObj<typeof meta>;

export const SortingFocus: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const firstSortButton = canvas.getByText('Asset').closest('button');

    // Tab into the document and expect the active element to be in focus
    userEvent.tab();
    expect(firstSortButton).toHaveFocus();
  },
};
