import React, { useCallback, useRef, useState } from 'react';
import { loremIpsum } from '@coinbase/cds-common/internal/data/loremIpsum';

import { Accordion, AccordionItem } from '../../accordion';
import { Button } from '../../buttons/Button';
import { FeedCard } from '../../cards/FeedCard';
import { ListCell } from '../../cells/ListCell';
import { Box, VStack } from '../../layout';
import { Text } from '../../typography/Text';
import { FullscreenModal } from '../modal/FullscreenModal';

export default {
  title: 'Components/FullscreenModal',
  component: FullscreenModal,
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

const useTriggerFocus = () => {
  const triggerRef = useRef<HTMLButtonElement>(null);

  return {
    triggerRef,
  };
};

const contentStyle = { justifyContent: 'center', marginLeft: 'auto' };

export const Basic = () => {
  const [visible, setVisible] = useState(true);
  const setVisibleToTrue = useCallback(() => setVisible(true), []);
  const setVisibleToFalse = useCallback(() => setVisible(false), []);
  const { triggerRef } = useTriggerFocus();

  const primaryContent = (
    <Box background="bgAlternate" height={800}>
      <Text as="p" display="block" font="body">
        Primary Content {loremIpsum}
      </Text>
    </Box>
  );

  const secondaryContent = (
    <Box background="bgAlternate" height={800}>
      <Text as="p" display="block" font="body">
        Secondary Content {loremIpsum}
      </Text>
    </Box>
  );

  return (
    <>
      <Button ref={triggerRef} onClick={setVisibleToTrue}>
        Open Modal
      </Button>
      <FullscreenModal
        closeAccessibilityLabel="Close modal"
        onRequestClose={setVisibleToFalse}
        primaryContent={primaryContent}
        secondaryContent={secondaryContent}
        title="Modal title"
        visible={visible}
      />
    </>
  );
};

export const NoTitle = () => {
  const [visible, setVisible] = useState(true);
  const setVisibleToFalse = useCallback(() => setVisible(false), []);
  const setVisibleToTrue = useCallback(() => setVisible(true), []);
  const { triggerRef } = useTriggerFocus();

  const primaryContent = (
    <Box background="bgAlternate" height={800}>
      <Text as="p" display="block" font="body">
        Primary Content {loremIpsum}
      </Text>
    </Box>
  );

  const secondaryContent = (
    <Box background="bgAlternate" height={800}>
      <Text as="p" display="block" font="body">
        Secondary Content {loremIpsum}
      </Text>
    </Box>
  );

  return (
    <>
      <Button ref={triggerRef} onClick={setVisibleToTrue}>
        Open Modal
      </Button>
      <FullscreenModal
        accessibilityLabel="Modal context info"
        closeAccessibilityLabel="Close modal"
        onRequestClose={setVisibleToFalse}
        primaryContent={primaryContent}
        secondaryContent={secondaryContent}
        visible={visible}
      />
    </>
  );
};

export const NoSecondary = () => {
  const [visible, setVisible] = useState(true);
  const setVisibleToFalse = useCallback(() => setVisible(false), []);
  const setVisibleToTrue = useCallback(() => setVisible(true), []);
  const { triggerRef } = useTriggerFocus();

  const primaryContent = (
    <Box background="bgAlternate" height={800}>
      <Text as="p" display="block" font="body">
        Primary Content {loremIpsum}
      </Text>
    </Box>
  );

  return (
    <>
      <Button ref={triggerRef} onClick={setVisibleToTrue}>
        Open Modal
      </Button>
      <FullscreenModal
        closeAccessibilityLabel="Close modal"
        onRequestClose={setVisibleToFalse}
        primaryContent={primaryContent}
        title="Modal title"
        visible={visible}
      />
    </>
  );
};

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

  const primaryContent = (
    <VStack>
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

  const secondaryContent = (
    <Box borderRadius={200} elevation={1} overflow="hidden">
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

  return (
    <>
      <Button ref={triggerRef} onClick={setVisibleToTrue}>
        Open Modal
      </Button>
      <FullscreenModal
        closeAccessibilityLabel="Close modal"
        onRequestClose={setVisibleToFalse}
        primaryContent={primaryContent}
        secondaryContent={secondaryContent}
        title="Modal title"
        visible={visible}
      />
    </>
  );
};

export const SecondaryContentDivider = () => {
  const [visible, setVisible] = useState(true);
  const setVisibleToFalse = useCallback(() => setVisible(false), []);
  const setVisibleToTrue = useCallback(() => setVisible(true), []);
  const { triggerRef } = useTriggerFocus();

  const primaryContent = (
    <Box background="bgAlternate" height={800}>
      <Text as="p" display="block" font="body">
        Primary Content {loremIpsum}
      </Text>
    </Box>
  );

  const secondaryContent = (
    <Box background="bgAlternate" height={800}>
      <Text as="p" display="block" font="body">
        Secondary Content {loremIpsum}
      </Text>
    </Box>
  );

  return (
    <>
      <Button ref={triggerRef} onClick={setVisibleToTrue}>
        Open Modal
      </Button>
      <FullscreenModal
        showSecondaryContentDivider
        closeAccessibilityLabel="Close modal"
        onRequestClose={setVisibleToFalse}
        primaryContent={primaryContent}
        secondaryContent={secondaryContent}
        title="Modal title"
        visible={visible}
      />
    </>
  );
};

export const CenterPrimary = () => {
  const [visible, setVisible] = useState(true);
  const setVisibleToFalse = useCallback(() => setVisible(false), []);
  const setVisibleToTrue = useCallback(() => setVisible(true), []);
  const { triggerRef } = useTriggerFocus();

  const primaryContent = (
    <Box background="bgAlternate" height={800}>
      <Text as="p" display="block" font="body">
        Primary Content {loremIpsum}
      </Text>
    </Box>
  );

  return (
    <>
      <Button ref={triggerRef} onClick={setVisibleToTrue}>
        Open Modal
      </Button>
      <FullscreenModal
        closeAccessibilityLabel="Close modal"
        contentStyle={contentStyle}
        onRequestClose={setVisibleToFalse}
        primaryContent={primaryContent}
        title="Modal title"
        visible={visible}
      />
    </>
  );
};
