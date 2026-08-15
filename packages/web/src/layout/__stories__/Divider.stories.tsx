import type { Meta, StoryObj } from '@storybook/react';

import { Box } from '../Box';
import type { DividerProps } from '../Divider';
import { Divider } from '../Divider';
import { HStack } from '../HStack';
import { VStack } from '../VStack';

const meta = {
  title: 'Components/Divider',
  component: Divider,
  argTypes: {
    direction: {
      options: ['horizontal', 'vertical'],
      control: { type: 'radio' },
    },
  },
  render: ({ direction, ...rest }: DividerProps) => {
    if (direction === 'horizontal') {
      return (
        <VStack width={500}>
          <Box background="bg" height={100} width={500} />
          <Divider direction={direction} {...rest} />
          <Box background="bg" height={100} width={500} />
        </VStack>
      );
    }

    return (
      <HStack>
        <Box background="bg" height={200} width={250} />
        <Divider direction={direction} {...rest} />
        <Box background="bg" height={200} width={250} />
      </HStack>
    );
  },
} satisfies Meta<typeof Divider>;

export default meta;
type Story = StoryObj<typeof meta>;

export const HorizontalDirection: Story = {
  args: {
    direction: 'horizontal',
  },
};

export const VerticalDirection: Story = {
  args: {
    direction: 'vertical',
  },
};

export const LightColor: Story = {
  args: {
    direction: 'horizontal',
    color: 'bgLine',
  },
};

export const HeavyColor: Story = {
  args: {
    direction: 'horizontal',
    color: 'bgLineHeavy',
  },
};
