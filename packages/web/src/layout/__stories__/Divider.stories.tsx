import type { ComponentStory } from '@storybook/react';

import { Box } from '../Box';
import { Divider } from '../Divider';
import { HStack } from '../HStack';
import { VStack } from '../VStack';

export default {
  title: 'Components/Divider',
  component: Divider,
  argTypes: {
    direction: {
      options: ['horizontal', 'vertical'],
      control: { type: 'radio' },
    },
  },
};

const Template: ComponentStory<typeof Divider> = ({ direction, ...rest }) => {
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
};

export const HorizontalDirection = Template.bind({});
HorizontalDirection.args = {
  direction: 'horizontal',
};

export const VerticalDirection = Template.bind({});
VerticalDirection.args = {
  direction: 'vertical',
};

export const LightColor = Template.bind({});
LightColor.args = {
  direction: 'horizontal',
  color: 'bgLine',
};

export const HeavyColor = Template.bind({});
HeavyColor.args = {
  direction: 'horizontal',
  color: 'bgLineHeavy',
};
