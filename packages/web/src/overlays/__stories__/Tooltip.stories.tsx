import React from 'react';
import { assets } from '@coinbase/cds-common/internal/data/assets';
import type { Meta, StoryObj } from '@storybook/react';

import { Button } from '../../buttons/Button';
import { IconButton } from '../../buttons/IconButton';
import { DotSymbol } from '../../dots/DotSymbol';
import { HStack } from '../../layout/HStack';
import { VStack } from '../../layout/VStack';
import { Text } from '../../typography/Text';
import { PortalProvider } from '../PortalProvider';
import { Tooltip } from '../tooltip/Tooltip';
import type { TooltipProps } from '../tooltip/TooltipProps';

const meta: Meta = {
  title: 'Components/Tooltip/Tooltip',
  component: Tooltip,
  parameters: {
    layout: 'padded',
  },
};

export default meta;

type BasicTooltipProps = {
  content: TooltipProps['content'];
};

const BasicTooltip = ({ content }: BasicTooltipProps) => {
  return (
    <PortalProvider>
      <HStack gap={5} paddingX={8} paddingY={2}>
        <VStack gap={2} paddingX={2}>
          <Tooltip content={content}>
            <Button>Default</Button>
          </Tooltip>
          <Tooltip content={content} placement="top">
            <Button>Top</Button>
          </Tooltip>
          <Tooltip content={content} placement="left">
            <Button>Left</Button>
          </Tooltip>
          <Tooltip content={content} placement="right">
            <Button>Right</Button>
          </Tooltip>
          <Tooltip content={content} placement="bottom">
            <Button>Bottom</Button>
          </Tooltip>
          <Tooltip content={content} placement="bottom" visible={false}>
            <Button disabled>Disabled</Button>
          </Tooltip>
          <Tooltip content={content} elevation={2} invertColorScheme={false}>
            <Button>Custom</Button>
          </Tooltip>
        </VStack>

        <VStack gap={3} paddingX={2}>
          <Tooltip
            content={
              <VStack gap={2}>
                <Button>Btn 1</Button>
                <Button>Btn 2</Button>
                <Button>Btn 3</Button>
              </VStack>
            }
          >
            <VStack padding={2}>
              <DotSymbol pin="bottom-start" size="m" source={assets.eth.imageUrl}>
                <IconButton
                  active
                  accessibilityLabel="Notifications"
                  name="bell"
                  variant="secondary"
                />
              </DotSymbol>
            </VStack>
          </Tooltip>
          <Tooltip content={content} placement="left">
            <DotSymbol pin="top-end" size="s" source={assets.ada.imageUrl}>
              <VStack padding={2}>
                <IconButton
                  active
                  accessibilityLabel="Notifications"
                  name="bell"
                  variant="secondary"
                />
              </VStack>
            </DotSymbol>
          </Tooltip>
          <Tooltip content={content} placement="right">
            <VStack padding={2}>
              <IconButton
                active
                accessibilityLabel="Notifications"
                name="bell"
                variant="secondary"
              />
            </VStack>
          </Tooltip>
          <Tooltip content={content} placement="bottom">
            <VStack padding={2}>
              <IconButton
                active
                accessibilityLabel="Notifications"
                name="bell"
                variant="secondary"
              />
            </VStack>
          </Tooltip>
        </VStack>

        <VStack gap={4} padding={2}>
          <Tooltip content={content}>
            <Text as="p" display="block" font="label1">
              Default
            </Text>
          </Tooltip>
          <Tooltip content={content} placement="left">
            <VStack padding={2}>
              <DotSymbol pin="top-end" size="s" source={assets.ada.imageUrl}>
                <VStack padding={2}>
                  <Text as="p" display="block" font="label1">
                    left
                  </Text>
                </VStack>
              </DotSymbol>
            </VStack>
          </Tooltip>
          <Tooltip content={content} placement="right">
            <VStack padding={2}>
              <Text as="p" display="block" font="label1">
                right
              </Text>
            </VStack>
          </Tooltip>
          <Tooltip content={content} placement="bottom">
            <VStack padding={2}>
              <Text as="p" display="block" font="label1">
                bottom
              </Text>
            </VStack>
          </Tooltip>
        </VStack>
      </HStack>
    </PortalProvider>
  );
};

type Story = StoryObj<BasicTooltipProps>;

const longContent =
  'This is the tooltip Content. This is just really really really really really really really really really really really really really really really really really really really really really really really really really really really really really really really really really really really really really really really really really really really really really really Long.';

export const Default: Story = {
  render: (args) => <BasicTooltip {...args} />,
  args: {
    content: 'This is the tooltip Content',
  },
};

export const TooltipLongContent: Story = {
  render: (args) => <BasicTooltip {...args} />,
  args: {
    content: longContent,
  },
};
