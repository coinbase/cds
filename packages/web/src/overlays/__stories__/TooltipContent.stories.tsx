import React, { useEffect, useRef } from 'react';
import type { Meta, StoryObj } from '@storybook/react';

import { Button } from '../../buttons/Button';
import { HStack } from '../../layout/HStack';
import { VStack } from '../../layout/VStack';
import { PortalProvider } from '../PortalProvider';
import { TooltipContent } from '../tooltip/TooltipContent';
import type { PopperTooltipProps } from '../tooltip/TooltipProps';

const meta: Meta = {
  title: 'Components/Tooltip/TooltipContent',
  component: TooltipContent,
  parameters: {
    layout: 'padded',
  },
};

export default meta;
type Story = StoryObj<PopperTooltipProps>;

const BasicTooltipContent = ({ content }: PopperTooltipProps) => {
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (ref.current) {
      ref.current.style.opacity = '1';
    }
  }, []);

  return (
    <PortalProvider>
      <HStack gap={5} paddingX={8} paddingY={2}>
        <VStack gap={2} paddingX={2}>
          <TooltipContent ref={ref} content={content} gap={0} />
        </VStack>
      </HStack>
    </PortalProvider>
  );
};

const longContent =
  'This is the tooltip Content. This is just really really really really really really really really really really really really really really really really really really really really really really really really really really really really really really really really really really really really really really really really really really really really really really Long.';

const longWordContent =
  'ThisisReallyReallyReallyReallyReallyReallyReallyReallyReallyReallyReallyReallyReallyReallyReallyReallyReallyReallyReallyReallyReallyReallyReallyReallyReallyReallyReallyReallyReallyReallyReallyReallyReallyReallyReallyReallyReallyReallyReallyReallyReallyLongWordContent. This is just really really really really really really really really really really really really really really really really really really really really really really really really really really really really really really really really really really really really really really really really really really really really really really Long.';

const VStackNode = (
  <VStack gap={2}>
    <Button>Btn 1</Button>
    <Button>Btn 2</Button>
    <Button>Btn 3</Button>
  </VStack>
);

const HStackNode = (
  <HStack gap={2}>
    <Button>Btn 1</Button>
    <Button>Btn 2</Button>
    <Button>Btn 3</Button>
  </HStack>
);

export const Default: Story = {
  render: (args) => <BasicTooltipContent {...args} />,
  args: {
    content: 'This is the tooltip Content',
  },
};

export const TooltipLongContent: Story = {
  render: (args) => <BasicTooltipContent {...args} />,
  args: {
    content: longContent,
  },
};

export const TooltipLongWordContent: Story = {
  render: (args) => <BasicTooltipContent {...args} />,
  args: {
    content: longWordContent,
  },
};

export const VStackNodeContent: Story = {
  render: (args) => <BasicTooltipContent {...args} />,
  args: {
    content: VStackNode,
  },
};

export const HStackNodeContent: Story = {
  render: (args) => <BasicTooltipContent {...args} />,
  args: {
    content: HStackNode,
  },
};
