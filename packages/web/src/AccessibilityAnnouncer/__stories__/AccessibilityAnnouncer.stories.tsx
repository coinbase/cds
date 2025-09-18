import React, { useCallback, useState } from 'react';
import type { ComponentStoryObj } from '@storybook/react';

import { Button } from '../../buttons';
import { VStack } from '../../layout/VStack';
import { Text } from '../../typography/Text';
import type { AccessibilityAnnouncerProps } from '../AccessibilityAnnouncer';
import { AccessibilityAnnouncer } from '../AccessibilityAnnouncer';

const DEFAULT_MESSAGE =
  'This is a title we would want to display, but the announcement is a little more catered to a person navigating with a screen reader.';

const MockAppScreen = ({ message, ...rest }: AccessibilityAnnouncerProps) => {
  const [internalMessage, updateInternalMessage] = useState(message);

  const handleMessageChange = useCallback(() => {
    updateInternalMessage(
      internalMessage === message ? 'Look, something new and special!' : message,
    );
  }, [internalMessage, message]);

  return (
    <VStack gap={2}>
      <Text as="h2" display="block" font="headline">
        Open VoiceOver and update the Message field 👀
      </Text>
      <>
        <Text aria-hidden as="p" display="block" font="body">
          {message}
        </Text>
        <AccessibilityAnnouncer message={internalMessage} {...rest} />
      </>
      <Button onClick={handleMessageChange}>Update message</Button>
    </VStack>
  );
};

export default {
  title: 'Components/AccessibilityAnnouncer',
  component: MockAppScreen,
  args: { message: DEFAULT_MESSAGE },
};

export const Default: ComponentStoryObj<typeof MockAppScreen> = {
  ...MockAppScreen,
};

export const Assertive: ComponentStoryObj<typeof MockAppScreen> = {
  ...MockAppScreen,
  args: {
    politeness: 'assertive',
    message:
      "It isn't common we would want to display alternate text to screen readers, but it is sometimes important",
  },
};
