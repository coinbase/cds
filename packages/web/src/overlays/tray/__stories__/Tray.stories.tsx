import React, { useRef, useState } from 'react';
import type { Meta } from '@storybook/react';

import { Button } from '../../../buttons/Button';
import { HStack } from '../../../layout/HStack';
import { VStack } from '../../../layout/VStack';
import { Text } from '../../../typography/Text';
import type { TrayRefProps } from '../Tray';
import { Tray } from '../Tray';

export default {
  title: 'Components/Tray',
  component: Tray,
} as Meta;

export const Default = () => {
  const [showBasicTray, setShowBasicTray] = useState(false);
  const [showCustomTitleTray, setShowCustomTitleTray] = useState(false);
  const [showFooterTray, setShowFooterTray] = useState(false);
  const [showPreventDismissTray, setShowPreventDismissTray] = useState(false);
  const [showCloseWithRefTray, setShowCloseWithRefTray] = useState(false);
  const [showLongContentTray, setShowLongContentTray] = useState(false);
  const [showNoTitleTray, setShowNoTitleTray] = useState(false);
  // Refs for controlling trays
  const preventDismissTrayRef = useRef<TrayRefProps>(null);

  return (
    <VStack gap={4} padding={1}>
      <VStack alignItems="flex-start" gap={2}>
        <Text font="headline">Basic Tray with String Title</Text>
        <Button onClick={() => setShowBasicTray(true)}>Open Basic Tray</Button>
        {showBasicTray && (
          <Tray onCloseComplete={() => setShowBasicTray(false)} title="Basic Tray Example">
            <VStack gap={1}>
              <Text font="body">
                This is a basic tray with a simple string title. Clicking outside or pressing ESC
                will close it.
              </Text>
              <Text font="body">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam euismod, nisl eget
                aliquam ultricies, nunc nisl aliquet nunc, quis aliquam nunc nisl eu nunc.
              </Text>
            </VStack>
          </Tray>
        )}
      </VStack>

      <VStack alignItems="flex-start" gap={2}>
        <Text font="headline">Tray with Custom Title Component</Text>
        <Button onClick={() => setShowCustomTitleTray(true)}>Open Custom Title Tray</Button>
        {showCustomTitleTray && (
          <Tray
            onCloseComplete={() => setShowCustomTitleTray(false)}
            title={
              <HStack alignItems="center">
                <Text color="fgPrimary" font="title3">
                  Custom Title Component
                </Text>
              </HStack>
            }
          >
            <VStack gap={1}>
              <Text font="body">
                This tray demonstrates using a custom component for the title.
              </Text>
              <Text font="body">
                You can use any React component as the title, giving you flexibility in customizing
                the appearance.
              </Text>
            </VStack>
          </Tray>
        )}
      </VStack>

      <VStack alignItems="flex-start" gap={2}>
        <Text font="headline">Basic Tray with No Title</Text>
        <Button onClick={() => setShowNoTitleTray(true)}>Open Basic Tray With No Title</Button>
        {showNoTitleTray && (
          <Tray onCloseComplete={() => setShowNoTitleTray(false)}>
            <VStack gap={1}>
              <Text font="body">
                This is a basic tray without a title. Clicking outside or pressing ESC will close
                it.
              </Text>
              <Text font="body">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam euismod, nisl eget
                aliquam ultricies, nunc nisl aliquet nunc, quis aliquam nunc nisl eu nunc.
              </Text>
            </VStack>
          </Tray>
        )}
      </VStack>

      <VStack alignItems="flex-start" gap={2}>
        <Text font="headline">Tray with Footer</Text>
        <Button onClick={() => setShowFooterTray(true)}>Open Tray with Footer</Button>
        {showFooterTray && (
          <Tray
            footer={
              <HStack justifyContent="flex-end" padding={2}>
                <Button onClick={() => setShowFooterTray(false)} variant="primary">
                  Close
                </Button>
              </HStack>
            }
            onCloseComplete={() => setShowFooterTray(false)}
            title="Tray with Footer"
          >
            <VStack gap={1}>
              <Text font="body">
                This example demonstrates a tray with a sticky footer using the footer prop.
              </Text>
              <Text font="body">
                The footer prop provides a more intuitive API and automatically handles the styling
                and positioning.
              </Text>
              <Text font="body">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam euismod, nisl eget
                aliquam ultricies, nunc nisl aliquet nunc, quis aliquam nunc nisl eu nunc.
              </Text>
              <Text font="body">
                Nullam euismod, nisl eget aliquam ultricies, nunc nisl aliquet nunc, quis aliquam
                nunc nisl eu nunc.
              </Text>
            </VStack>
          </Tray>
        )}
      </VStack>

      <VStack alignItems="flex-start" gap={2}>
        <Text font="headline">Tray with Prevent Dismiss</Text>
        <Button onClick={() => setShowPreventDismissTray(true)}>Open Non-Dismissible Tray</Button>
        {showPreventDismissTray && (
          <Tray
            preventDismiss
            onCloseComplete={() => setShowPreventDismissTray(false)}
            title="Non-Dismissible Tray"
          >
            {({ handleClose }) => (
              <VStack gap={1}>
                <Text font="body">
                  This tray cannot be dismissed by clicking outside or pressing ESC. You must use
                  the button below to close it.
                </Text>
                <Button onClick={handleClose}>Close Tray</Button>
              </VStack>
            )}
          </Tray>
        )}
      </VStack>

      <VStack alignItems="flex-start" gap={2}>
        <Text font="headline">Close With a Ref</Text>
        <Button onClick={() => setShowCloseWithRefTray(true)}>Open Close With Ref Tray</Button>
        {showCloseWithRefTray && (
          <Tray
            ref={preventDismissTrayRef}
            preventDismiss
            onCloseComplete={() => setShowCloseWithRefTray(false)}
            title="Close With Ref Tray"
          >
            <VStack gap={1}>
              <Text font="body">
                This tray includes a button that closes using the imperative handle on the ref.
              </Text>
              <Button onClick={() => preventDismissTrayRef.current?.close()}>Close Tray</Button>
            </VStack>
          </Tray>
        )}
      </VStack>

      <VStack alignItems="flex-start" gap={2}>
        <Text font="headline">Tray with Long Content</Text>
        <Button onClick={() => setShowLongContentTray(true)}>Open Long Content Tray</Button>
        {showLongContentTray && (
          <Tray onCloseComplete={() => setShowLongContentTray(false)} title="Long Content Example">
            <VStack gap={1}>
              <Text font="body">
                This example demonstrates how the tray handles a large amount of content. The tray
                should expand appropriately and enable scrolling when needed.
              </Text>
              {Array(20)
                .fill(0)
                .map((_, i) => (
                  <Text key={i} font="body">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam euismod, nisl
                    eget aliquam ultricies, nunc nisl aliquet nunc, quis aliquam nunc nisl eu nunc.
                    {i % 2 === 0 &&
                      ' Sed auctor neque eu tellus rhoncus ut eleifend nibh porttitor.'}
                    {i % 3 === 0 && ' Ut in nulla enim. Phasellus molestie magna non est bibendum.'}
                  </Text>
                ))}
            </VStack>
          </Tray>
        )}
      </VStack>
    </VStack>
  );
};
