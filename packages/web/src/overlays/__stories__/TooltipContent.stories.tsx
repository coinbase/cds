import React, { useEffect, useRef } from 'react';
import type {
  ComponentMeta,
  ComponentStory,
} from '@storybook/react/dist/ts3.9/client/preview/types-6-3';

import { Button } from '../../buttons/Button';
import { HStack } from '../../layout/HStack';
import { VStack } from '../../layout/VStack';
import { PortalProvider } from '../PortalProvider';
import { TooltipContent } from '../tooltip/TooltipContent';
import type { PopperTooltipProps } from '../tooltip/TooltipProps';

export default {
  title: 'Components/Tooltip/TooltipContent',
  component: TooltipContent,
  parameters: {
    layout: 'padded',
  },
} as ComponentMeta<typeof TooltipContent>;

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

const Template: ComponentStory<typeof BasicTooltipContent> = (args: PopperTooltipProps) => (
  <BasicTooltipContent {...args} />
);

export const Default = Template.bind({});

Default.args = {
  content: 'This is the tooltip Content',
};

export const TooltipLongContent = Template.bind({});

const longContent =
  'This is the tooltip Content. This is just really really really really really really really really really really really really really really really really really really really really really really really really really really really really really really really really really really really really really really really really really really really really really really Long.';

TooltipLongContent.args = {
  content: longContent,
};

export const TooltipLongWordContent = Template.bind({});

const longWordContent =
  'ThisisReallyReallyReallyReallyReallyReallyReallyReallyReallyReallyReallyReallyReallyReallyReallyReallyReallyReallyReallyReallyReallyReallyReallyReallyReallyReallyReallyReallyReallyReallyReallyReallyReallyReallyReallyReallyReallyReallyReallyReallyReallyLongWordContent. This is just really really really really really really really really really really really really really really really really really really really really really really really really really really really really really really really really really really really really really really really really really really really really really really Long.';

TooltipLongWordContent.args = {
  content: longWordContent,
};

export const VStackNodeContent = Template.bind({});

const VStackNode = (
  <VStack gap={2}>
    <Button>Btn 1</Button>
    <Button>Btn 2</Button>
    <Button>Btn 3</Button>
  </VStack>
);

VStackNodeContent.args = {
  content: VStackNode,
};

export const HStackNodeContent = Template.bind({});

const HStackNode = (
  <HStack gap={2}>
    <Button>Btn 1</Button>
    <Button>Btn 2</Button>
    <Button>Btn 3</Button>
  </HStack>
);

HStackNodeContent.args = {
  content: HStackNode,
};
