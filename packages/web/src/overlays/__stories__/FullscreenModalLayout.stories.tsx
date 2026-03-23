import React, { useCallback, useRef, useState } from 'react';
import { loremIpsum } from '@coinbase/cds-common/internal/data/loremIpsum';

import { Accordion, AccordionItem } from '../../accordion';
import { Button, ButtonGroup, IconButton } from '../../buttons';
import { FeedCard } from '../../cards/FeedCard';
import { ListCell } from '../../cells/ListCell';
import { LogoMark } from '../../icons/LogoMark';
import { Box, HStack, VStack } from '../../layout';
import { Tag } from '../../tag/Tag';
import { Text } from '../../typography/Text';
import { FullscreenModalLayout } from '../modal/FullscreenModalLayout';

export default {
  title: 'Components/FullscreenModalLayout',
  component: FullscreenModalLayout,
  parameters: {
    a11y: {
      options: {
        rules: {
          'color-contrast': { enabled: false },
        },
      },
    },
  },
};

// Shared setup hook (copied from original)
const useTriggerFocus = () => {
  const triggerRef = useRef<HTMLButtonElement>(null);

  return {
    triggerRef,
  };
};

export const BasicCenterPanel = () => {
  const [visible, setVisible] = useState(true);
  const setVisibleToTrue = useCallback(() => setVisible(true), []);
  const setVisibleToFalse = useCallback(() => setVisible(false), []);
  const { triggerRef } = useTriggerFocus();

  const headerContent = (
    <HStack borderedBottom alignItems="center" paddingX={4} paddingY={2}>
      <Box paddingEnd={3} width={80}>
        <LogoMark size={32} />
      </Box>
      <Box flexGrow={1}>
        <Text as="h1" display="block" font="title1">
          Modal - Center Panel
        </Text>
      </Box>
      <Box>
        <IconButton transparent aria-label="Close modal" name="close" onClick={setVisibleToFalse} />
      </Box>
    </HStack>
  );

  const mainContent = (
    <VStack flexGrow={1} overflow="auto" padding={4}>
      <Text as="p" display="block" font="body">
        This is the main content area (Center Panel).
        <br />
        {loremIpsum}
      </Text>
    </VStack>
  );

  return (
    <>
      <Button ref={triggerRef} onClick={setVisibleToTrue}>
        Open Modal (Center Only)
      </Button>
      <FullscreenModalLayout onRequestClose={setVisibleToFalse} visible={visible}>
        <VStack background="bg" height="100%" width="100%">
          {headerContent}
          {mainContent}
        </VStack>
      </FullscreenModalLayout>
    </>
  );
};
BasicCenterPanel.storyName = 'Basic (Center Panel)';

export const TwoColumnLeftCenter = () => {
  const [visible, setVisible] = useState(true);
  const setVisibleToTrue = useCallback(() => setVisible(true), []);
  const setVisibleToFalse = useCallback(() => setVisible(false), []);
  const { triggerRef } = useTriggerFocus();

  const headerContent = (
    <HStack borderedBottom alignItems="center" paddingX={4} paddingY={2}>
      <Box paddingEnd={3} width={80}>
        <LogoMark size={32} />
      </Box>
      <Box flexGrow={1}>
        <Text as="h1" display="block" font="title1">
          Modal - Left & Center Panels
        </Text>
      </Box>
      <Box>
        <IconButton transparent aria-label="Close modal" name="close" onClick={setVisibleToFalse} />
      </Box>
    </HStack>
  );

  const mainContent = (
    <HStack flexGrow={1} overflow="hidden">
      <VStack background="bgAlternate" height="100%" overflow="auto" padding={4} width={360}>
        <Text as="p" display="block" font="body">
          Left Panel Content
        </Text>
      </VStack>
      <VStack flexGrow={1} overflow="auto" padding={4}>
        <Text as="p" display="block" font="body">
          Center Panel Content
          <br />
          {loremIpsum}
        </Text>
      </VStack>
    </HStack>
  );

  return (
    <>
      <Button ref={triggerRef} onClick={setVisibleToTrue}>
        Open Modal (Left + Center)
      </Button>
      <FullscreenModalLayout onRequestClose={setVisibleToFalse} visible={visible}>
        <VStack background="bg" height="100%" width="100%">
          {headerContent}
          {mainContent}
        </VStack>
      </FullscreenModalLayout>
    </>
  );
};
TwoColumnLeftCenter.storyName = 'Two Column (Left + Center)';

export const ThreeColumn = () => {
  const [visible, setVisible] = useState(true);
  const setVisibleToTrue = useCallback(() => setVisible(true), []);
  const setVisibleToFalse = useCallback(() => setVisible(false), []);
  const { triggerRef } = useTriggerFocus();

  const headerContent = (
    <HStack borderedBottom alignItems="center" paddingX={4} paddingY={2}>
      <Box paddingEnd={3} width={80}>
        <LogoMark size={32} />
      </Box>
      <Box flexGrow={1}>
        <Text as="h1" display="block" font="title1">
          Modal - Three Panels
        </Text>
      </Box>
      <Box>
        <IconButton transparent aria-label="Close modal" name="close" onClick={setVisibleToFalse} />
      </Box>
    </HStack>
  );

  const mainContent = (
    <HStack flexGrow={1} overflow="hidden">
      <VStack background="bgAlternate" height="100%" overflow="auto" padding={4} width={360}>
        <Text as="p" display="block" font="body">
          Left Panel
        </Text>
      </VStack>
      <VStack flexGrow={1} overflow="auto" padding={4}>
        <Text as="p" display="block" font="body">
          Center Panel
          <br />
          {loremIpsum}
        </Text>
      </VStack>
      <VStack background="bgAlternate" height="100%" overflow="auto" padding={4} width={360}>
        <Text as="p" display="block" font="body">
          Right Panel
        </Text>
      </VStack>
    </HStack>
  );

  return (
    <>
      <Button ref={triggerRef} onClick={setVisibleToTrue}>
        Open Modal (Left + Center + Right)
      </Button>
      <FullscreenModalLayout onRequestClose={setVisibleToFalse} visible={visible}>
        <VStack background="bg" height="100%" width="100%">
          {headerContent}
          {mainContent}
        </VStack>
      </FullscreenModalLayout>
    </>
  );
};
ThreeColumn.storyName = 'Three Column (Left + Center + Right)';

export const WithAllPanels = () => {
  const [visible, setVisible] = useState(true);
  const setVisibleToTrue = useCallback(() => setVisible(true), []);
  const setVisibleToFalse = useCallback(() => setVisible(false), []);
  const { triggerRef } = useTriggerFocus();

  const headerContent = (
    <HStack borderedBottom alignItems="center" paddingX={4} paddingY={2}>
      <Box paddingEnd={3} width={80}>
        <LogoMark size={32} />
      </Box>
      <Box flexGrow={1}>
        <Text as="h1" display="block" font="title1">
          Modal - All Panels
        </Text>
      </Box>
      <Box>
        <IconButton transparent aria-label="Close modal" name="close" onClick={setVisibleToFalse} />
      </Box>
    </HStack>
  );

  const mainContent = (
    <VStack flexGrow={1} overflow="hidden">
      <VStack background="bgAlternate" padding={2}>
        <Text as="p" color="fg" display="block" font="body">
          Top Panel (e.g., Breadcrumbs, Progress)
        </Text>
      </VStack>
      <HStack flexGrow={1} overflow="hidden">
        <VStack background="bgAlternate" height="100%" overflow="auto" padding={4} width={360}>
          <Text as="p" display="block" font="body">
            Left Panel
          </Text>
        </VStack>
        <VStack flexGrow={1} overflow="auto" padding={4}>
          <Text as="p" display="block" font="body">
            Center Panel
            <br />
            {loremIpsum}
          </Text>
        </VStack>
        <VStack background="bgAlternate" height="100%" overflow="auto" padding={4} width={360}>
          <Text as="p" display="block" font="body">
            Right Panel
          </Text>
        </VStack>
      </HStack>
      <HStack borderedTop background="bgAlternate" padding={2}>
        <Text as="p" display="block" font="body">
          Bottom Panel (e.g., Footer, Actions)
        </Text>
      </HStack>
    </VStack>
  );

  return (
    <>
      <Button ref={triggerRef} onClick={setVisibleToTrue}>
        Open Modal (All Panels)
      </Button>
      <FullscreenModalLayout onRequestClose={setVisibleToFalse} visible={visible}>
        <VStack background="bg" height="100%" width="100%">
          {headerContent}
          {mainContent}
        </VStack>
      </FullscreenModalLayout>
    </>
  );
};
WithAllPanels.storyName = 'All Panels';

export const Example = () => {
  const [visible, setVisible] = useState(true);
  const setVisibleToTrue = useCallback(() => setVisible(true), []);
  const setVisibleToFalse = useCallback(() => setVisible(false), []);
  const { triggerRef } = useTriggerFocus();

  const feedCard = (
    <FeedCard
      author="Earn crypto"
      avatar="https://images.ctfassets.net/q5ulk4bp65r7/3rv8jr1B1Z1dZ2EhHqo7dp/e74ddbf1cd4836b83d34fe5cec351d78/Alt-Coin.png?w=768&fm=png"
      description="Amp is an Ethereum token that can be used as collateral to provide instant settlement assurance any time value is transferred."
      headerAction={{
        name: 'more',
        variant: 'foregroundMuted',
      }}
      image="https://images.ctfassets.net/q5ulk4bp65r7/3rv8jr1B1Z1dZ2EhHqo7dp/e74ddbf1cd4836b83d34fe5cec351d78/Alt-Coin.png?w=768&fm=png"
      mediaPlacement="above"
      metadata="Dec 18"
      title="Learn AMP. Earn $3 in AMP."
    />
  );

  const listcell = (
    <ListCell
      description="BTC"
      detail="$45,123"
      subdetail="+4.55%"
      title="Bitcoin"
      variant="positive"
    />
  );

  const storyPrimaryContent = (
    <VStack paddingX={4}>
      <Text as="h1" display="block" font="title1">
        Fullscreen Modal
      </Text>
      <Text as="p" display="block" font="body">
        This is a test Fullscreen Modal with components composition.
      </Text>
      {feedCard}
      {listcell}
      {listcell}
      {listcell}
    </VStack>
  );

  const storySecondaryContent = (
    <Box background="bgAlternate" borderRadius={200} elevation={1} overflow="hidden">
      <Accordion defaultActiveKey="2">
        <AccordionItem itemKey="1" subtitle="subtitle1" title="Accordion #1">
          <Text as="p" display="block" font="body">
            {loremIpsum}
          </Text>
        </AccordionItem>
        <AccordionItem itemKey="2" subtitle="subtitle2" title="Accordion #2">
          <Text as="p" display="block" font="body">
            {loremIpsum}
          </Text>
        </AccordionItem>
      </Accordion>
    </Box>
  );

  const headerContent = (
    <HStack borderedBottom alignItems="center" paddingX={4} paddingY={2}>
      <Box paddingEnd={3} width={80}>
        <LogoMark size={32} />
      </Box>
      <Box flexGrow={1}>
        <Text as="h1" display="block" font="title1">
          Example Modal
        </Text>
      </Box>
      <Box>
        <IconButton transparent aria-label="Close modal" name="close" onClick={setVisibleToFalse} />
      </Box>
    </HStack>
  );

  const mainContent = (
    <VStack flexGrow={1} overflow="auto">
      <VStack borderedBottom paddingX={4} paddingY={2}>
        <HStack gap={2}>
          <Tag colorScheme="green" intent="promotional">
            Green
          </Tag>
          <Tag colorScheme="blue" intent="promotional">
            Blue
          </Tag>
          <Tag colorScheme="yellow" intent="promotional">
            Yellow
          </Tag>
          <Tag colorScheme="purple" intent="promotional">
            Purple
          </Tag>
          <Tag colorScheme="red" intent="promotional">
            Red
          </Tag>
          <Tag colorScheme="gray" intent="promotional">
            Gray
          </Tag>
        </HStack>
      </VStack>
      <HStack>
        <VStack alignSelf="start" flexShrink={0} padding={4} width={360}>
          {storySecondaryContent}
        </VStack>
        <VStack flexGrow={1} padding={4}>
          {storyPrimaryContent}
        </VStack>
        <VStack alignSelf="start" flexShrink={0} padding={4} width={360}>
          {storySecondaryContent}
        </VStack>
      </HStack>
      <HStack borderedTop justifyContent="flex-end" padding={2}>
        <ButtonGroup>
          <Button
            onClick={() => {
              alert('Cancel clicked');
            }}
            variant="secondary"
          >
            Cancel
          </Button>
          <Button
            onClick={() => {
              alert('OK clicked');
            }}
            variant="primary"
          >
            OK
          </Button>
        </ButtonGroup>
      </HStack>
    </VStack>
  );

  return (
    <>
      <Button ref={triggerRef} onClick={setVisibleToTrue}>
        Open Example Modal
      </Button>
      <FullscreenModalLayout onRequestClose={setVisibleToFalse} visible={visible}>
        <VStack background="bg" height="100%" width="100%">
          {headerContent}
          {mainContent}
        </VStack>
      </FullscreenModalLayout>
    </>
  );
};
Example.storyName = 'Example';
