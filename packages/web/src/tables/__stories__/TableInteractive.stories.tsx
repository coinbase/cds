import { expect } from '@storybook/jest';
import type { ComponentStoryObj } from '@storybook/react';
import { userEvent, within } from '@storybook/testing-library';

import { StickyHeaderSortingExample } from './Table.stories';

export default {
  title: 'Interactive/Table',
  component: StickyHeaderSortingExample,
};

export const SortingFocus: ComponentStoryObj<typeof StickyHeaderSortingExample> = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const firstSortButton = canvas.getByText('Asset').closest('button');

    // Tab into the document and expect the active element to be in focus
    userEvent.tab();
    expect(firstSortButton).toHaveFocus();
  },
};
