import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';

import { Button } from '../../buttons/Button';
import { VStack } from '../../layout/VStack';
import { TabIndicator } from '../TabIndicator';

const getRandomNumber = () => Math.random() * 100 + 100;

const meta: Meta = {
  title: 'Components/Tabs/TabIndicator',
  component: TabIndicator,
};

export default meta;
type Story = StoryObj;

const DefaultRender = () => {
  const [width, setWidth] = useState(120);
  const [x, setX] = useState(120);

  const handlePress = () => {
    setWidth(getRandomNumber());
    setX(getRandomNumber());
  };

  return (
    <VStack background="bg" gap={2} padding={4}>
      <Button block onClick={handlePress}>
        Randomize
      </Button>
      <TabIndicator width={width} x={x} />
    </VStack>
  );
};

export const Default: Story = {
  render: () => <DefaultRender />,
};
