import { useCallback, useEffect, useRef, useState } from 'react';
import { assets } from '@coinbase/cds-common/internal/data/assets';
import type {
  ComponentMeta,
  ComponentStory,
} from '@storybook/react/dist/ts3.9/client/preview/types-6-3';

import { Button } from '../../buttons/Button';
import { IconButton } from '../../buttons/IconButton';
import { DotSymbol } from '../../dots/DotSymbol';
import { HStack } from '../../layout/HStack';
import { VStack } from '../../layout/VStack';
import { Text } from '../../typography/Text';
import { PortalProvider } from '../PortalProvider';
import { Tooltip } from '../tooltip/Tooltip';
import type { TooltipProps } from '../tooltip/TooltipProps';

export default {
  title: 'Components/Tooltip/Tooltip',
  component: Tooltip,
  parameters: {
    layout: 'padded',
  },
} as ComponentMeta<typeof Tooltip>;

type BasicTooltipProps = {
  content: TooltipProps['content'];
  openDelay?: TooltipProps['openDelay'];
  closeDelay?: TooltipProps['closeDelay'];
};

const BasicTooltip = ({ content, openDelay, closeDelay }: BasicTooltipProps) => {
  return (
    <PortalProvider>
      <HStack gap={5} paddingX={8} paddingY={2}>
        <VStack gap={2} paddingX={2}>
          <Tooltip closeDelay={closeDelay} content={content} openDelay={openDelay}>
            <Button>Default</Button>
          </Tooltip>
          <Tooltip closeDelay={closeDelay} content={content} openDelay={openDelay} placement="top">
            <Button>Top</Button>
          </Tooltip>
          <Tooltip closeDelay={closeDelay} content={content} openDelay={openDelay} placement="left">
            <Button>Left</Button>
          </Tooltip>
          <Tooltip
            closeDelay={closeDelay}
            content={content}
            openDelay={openDelay}
            placement="right"
          >
            <Button>Right</Button>
          </Tooltip>
          <Tooltip
            closeDelay={closeDelay}
            content={content}
            openDelay={openDelay}
            placement="bottom"
          >
            <Button>Bottom</Button>
          </Tooltip>
          <Tooltip
            closeDelay={closeDelay}
            content={content}
            openDelay={openDelay}
            placement="bottom"
            visible={false}
          >
            <Button disabled>Disabled</Button>
          </Tooltip>
          <Tooltip
            closeDelay={closeDelay}
            content={content}
            elevation={2}
            invertColorScheme={false}
            openDelay={openDelay}
          >
            <Button>Custom</Button>
          </Tooltip>
        </VStack>

        <VStack gap={3} paddingX={2}>
          <Tooltip
            closeDelay={closeDelay}
            content={
              <VStack gap={2}>
                <Button>Btn 1</Button>
                <Button>Btn 2</Button>
                <Button>Btn 3</Button>
              </VStack>
            }
            openDelay={openDelay}
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
          <Tooltip closeDelay={closeDelay} content={content} openDelay={openDelay} placement="left">
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
          <Tooltip
            closeDelay={closeDelay}
            content={content}
            openDelay={openDelay}
            placement="right"
          >
            <VStack padding={2}>
              <IconButton
                active
                accessibilityLabel="Notifications"
                name="bell"
                variant="secondary"
              />
            </VStack>
          </Tooltip>
          <Tooltip
            closeDelay={closeDelay}
            content={content}
            openDelay={openDelay}
            placement="bottom"
          >
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
          <Tooltip closeDelay={closeDelay} content={content} openDelay={openDelay}>
            <Text as="p" display="block" font="label1">
              Default
            </Text>
          </Tooltip>
          <Tooltip closeDelay={closeDelay} content={content} openDelay={openDelay} placement="left">
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
          <Tooltip
            closeDelay={closeDelay}
            content={content}
            openDelay={openDelay}
            placement="right"
          >
            <VStack padding={2}>
              <Text as="p" display="block" font="label1">
                right
              </Text>
            </VStack>
          </Tooltip>
          <Tooltip
            closeDelay={closeDelay}
            content={content}
            openDelay={openDelay}
            placement="bottom"
          >
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

const Template: ComponentStory<typeof BasicTooltip> = (args: BasicTooltipProps) => (
  <BasicTooltip {...args} />
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

export const DelayedVisibility = ({
  openDelay,
  closeDelay,
}: {
  openDelay: number;
  closeDelay: number;
}) => {
  const RERENDER_OPEN_DELAY = 3000;
  const TICK_INTERVAL = 50;
  const [elapsed, setElapsed] = useState(0);
  const [rerenders, setRerenders] = useState(0);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const clearTimer = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }, []);

  const startTimer = useCallback(() => {
    setElapsed(0);
    setRerenders(0);
    intervalRef.current = setInterval(() => {
      setRerenders((prev) => prev + 1);
      setElapsed((prev) => {
        const next = prev + TICK_INTERVAL;
        if (next >= RERENDER_OPEN_DELAY) {
          clearTimer();
          return RERENDER_OPEN_DELAY;
        }
        return next;
      });
    }, TICK_INTERVAL);
  }, [clearTimer]);

  const stopTimer = useCallback(() => {
    clearTimer();
    setElapsed(0);
    setRerenders(0);
  }, [clearTimer]);

  useEffect(() => {
    return clearTimer;
  }, [clearTimer]);

  const elapsedSeconds = (elapsed / 1000).toFixed(1);
  const totalSeconds = (RERENDER_OPEN_DELAY / 1000).toFixed(1);

  return (
    <PortalProvider>
      <VStack gap={3} padding={2}>
        <VStack alignItems="flex-start" gap={2}>
          <Text as="p" display="block" font="body">
            Hover the button below. The tooltip opens after {openDelay}ms and closes after{' '}
            {closeDelay}ms.
          </Text>
          <Tooltip
            closeDelay={closeDelay}
            content={`Opens after ${openDelay}ms, closes after ${closeDelay}ms`}
            openDelay={openDelay}
            placement="right"
          >
            <Button>Hover me</Button>
          </Tooltip>
        </VStack>
        <VStack alignItems="flex-start" gap={2}>
          <Text font="body">
            Hover the text below to start a {totalSeconds}s tooltip delay. State updates every{' '}
            {TICK_INTERVAL}ms while hovering, triggering rerenders. The tooltip should still open on
            schedule because the delay timers are stored in refs that persist across renders.
          </Text>
          <Text font="label1">
            Note: Mouse handlers are on a wrapper div outside the Tooltip to avoid spurious
            mouseenter events caused by React replacing the child DOM node during rapid rerenders.
          </Text>
          <HStack alignItems="center" gap={2}>
            <div onMouseEnter={startTimer} onMouseLeave={stopTimer}>
              <Tooltip
                content={`Tooltip survived ${rerenders} rerenders`}
                openDelay={RERENDER_OPEN_DELAY}
                placement="bottom"
              >
                <Text as="span" display="block" font="label1">
                  Hover me for tooltip
                </Text>
              </Tooltip>
            </div>
            <Text as="p" display="block" font="label2">
              {elapsedSeconds}s / {totalSeconds}s ({rerenders} rerenders)
            </Text>
          </HStack>
        </VStack>
      </VStack>
    </PortalProvider>
  );
};

DelayedVisibility.args = {
  openDelay: 400,
  closeDelay: 150,
};
