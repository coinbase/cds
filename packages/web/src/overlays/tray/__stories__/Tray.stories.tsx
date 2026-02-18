import React, { useEffect, useRef, useState } from 'react';
import type { Meta } from '@storybook/react';

import { Button } from '../../../buttons/Button';
import { ListCell } from '../../../cells/ListCell';
import { useBreakpoints } from '../../../hooks/useBreakpoints';
import { Pictogram } from '../../../illustrations/Pictogram';
import { Box } from '../../../layout/Box';
import { HStack } from '../../../layout/HStack';
import { VStack } from '../../../layout/VStack';
import { PageFooter } from '../../../page/PageFooter';
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

export const ResponsiveBasic = () => {
  const { isPhone } = useBreakpoints();
  const [isOpen, setIsOpen] = useState(false);

  // Open after initial load to properly configure scroll ref in StrictMode
  useEffect(() => setIsOpen(true), []);

  return (
    <>
      <Button onClick={() => setIsOpen(true)}>Open Tray</Button>
      {isOpen && (
        <Tray
          footer={({ handleClose }) => (
            <PageFooter
              borderedTop
              action={
                <Button block={isPhone} onClick={handleClose}>
                  Button
                </Button>
              }
              justifyContent={isPhone ? 'center' : 'flex-end'}
            />
          )}
          hideCloseButton={isPhone}
          onCloseComplete={() => setIsOpen(false)}
          pin={isPhone ? 'bottom' : 'right'}
          showHandleBar={isPhone}
          title="Section header"
        >
          <Text color="fgMuted" font="body" paddingBottom={2}>
            Curabitur commodo nulla vel dolor vulputate vestibulum. Nulla et nisl molestie, interdum
            lorem id, viverra.
          </Text>
        </Tray>
      )}
    </>
  );
};

export const ResponsiveIllustration = () => {
  const { isPhone } = useBreakpoints();
  const [isOpen, setIsOpen] = useState(false);

  // Open after initial load to properly configure scroll ref in StrictMode
  useEffect(() => setIsOpen(true), []);

  return (
    <>
      <Button onClick={() => setIsOpen(true)}>Open Tray</Button>
      {isOpen && (
        <Tray
          footer={({ handleClose }) => (
            <PageFooter
              borderedTop
              action={
                <Button block={isPhone} onClick={handleClose}>
                  Button
                </Button>
              }
              justifyContent={isPhone ? 'center' : 'flex-end'}
            />
          )}
          hideCloseButton={isPhone}
          onCloseComplete={() => setIsOpen(false)}
          pin={isPhone ? 'bottom' : 'right'}
          showHandleBar={isPhone}
          title={
            <VStack gap={isPhone ? 1.5 : 2}>
              <Pictogram name="addWallet" />
              <Text font="title3">Welcome aboard</Text>
            </VStack>
          }
        >
          <Text color="fgMuted" font="body" paddingBottom={2}>
            Curabitur commodo nulla vel dolor vulputate vestibulum. Nulla et nisl molestie, interdum
            lorem id, viverra.
          </Text>
        </Tray>
      )}
    </>
  );
};

export const ResponsiveFullBleedImage = () => {
  const { isPhone } = useBreakpoints();
  const [isOpen, setIsOpen] = useState(false);

  // Open after initial load to properly configure scroll ref in StrictMode
  useEffect(() => setIsOpen(true), []);

  return (
    <>
      <style>{`
        .tray-close-button-inverted {
          color: white;
        }
        .tray-close-button-inverted:hover,
        .tray-close-button-inverted:focus-visible {
          background-color: rgba(255, 255, 255, 0.15);
        }
      `}</style>
      <Button onClick={() => setIsOpen(true)}>Open Tray</Button>
      {isOpen && (
        <Tray
          classNames={{
            closeButton: 'tray-close-button-inverted',
          }}
          footer={({ handleClose }) => (
            <PageFooter
              borderedTop
              action={
                <Button block={isPhone} onClick={handleClose}>
                  Close
                </Button>
              }
              justifyContent={isPhone ? 'center' : 'flex-end'}
            />
          )}
          header={
            <Text
              font="title3"
              paddingBottom={0.75}
              paddingTop={2}
              paddingX={{ base: 4, phone: 3 }}
            >
              Header
            </Text>
          }
          hideCloseButton={isPhone}
          onCloseComplete={() => setIsOpen(false)}
          pin={isPhone ? 'bottom' : 'right'}
          showHandleBar={isPhone}
          styles={{
            handleBar: {
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              zIndex: 1,
            },
            handleBarHandle: {
              backgroundColor: 'white',
              opacity: 1,
            },
            closeButton: {
              position: 'absolute',
              top: 'var(--space-4)',
              right: 'var(--space-4)',
              zIndex: 1,
            },
            header: {
              paddingTop: 0,
            },
          }}
          title={
            <Box flexGrow={1} marginX={{ base: -4, phone: -3 }}>
              <img
                alt="Full Bleed"
                height={180}
                src="https://static-assets.coinbase.com/design-system/placeholder/coinbaseHeader.jpg"
                style={{ objectFit: 'cover', pointerEvents: 'none' }}
                width="100%"
              />
            </Box>
          }
        >
          <VStack gap={2} paddingBottom={2}>
            <Text font="body">This is the content of the tray.</Text>
          </VStack>
        </Tray>
      )}
    </>
  );
};

export const ResponsiveBasicListCells = () => {
  const { isPhone } = useBreakpoints();
  const [isOpen, setIsOpen] = useState(false);

  // Open after initial load to properly configure scroll ref in StrictMode
  useEffect(() => setIsOpen(true), []);

  return (
    <>
      <Button onClick={() => setIsOpen(true)}>Open Tray</Button>
      {isOpen && (
        <Tray
          footer={({ handleClose }) => (
            <PageFooter
              borderedTop
              action={
                <Button block={isPhone} onClick={handleClose}>
                  Button
                </Button>
              }
              justifyContent={isPhone ? 'center' : 'flex-end'}
            />
          )}
          hideCloseButton={isPhone}
          onCloseComplete={() => setIsOpen(false)}
          pin={isPhone ? 'bottom' : 'right'}
          showHandleBar={isPhone}
          styles={{
            header: { paddingBottom: 'var(--space-1)' },
            content: { paddingBottom: 'var(--space-3)' },
          }}
          title="Section header"
        >
          {Array.from({ length: 20 }, (_, i) => (
            <ListCell
              key={i}
              accessory="arrow"
              description="Description"
              innerSpacing={{
                marginX: -4,
                paddingX: 4,
                paddingY: 1,
              }}
              spacingVariant="condensed"
              title="Title"
            />
          ))}
        </Tray>
      )}
    </>
  );
};

export const ResponsiveIllustrationListCells = () => {
  const { isPhone } = useBreakpoints();
  const [isOpen, setIsOpen] = useState(false);

  // Open after initial load to properly configure scroll ref in StrictMode
  useEffect(() => setIsOpen(true), []);

  return (
    <>
      <Button onClick={() => setIsOpen(true)}>Open Tray</Button>
      {isOpen && (
        <Tray
          footer={({ handleClose }) => (
            <PageFooter
              borderedTop
              action={
                <Button block={isPhone} onClick={handleClose}>
                  Button
                </Button>
              }
              justifyContent={isPhone ? 'center' : 'flex-end'}
            />
          )}
          hideCloseButton={isPhone}
          onCloseComplete={() => setIsOpen(false)}
          pin={isPhone ? 'bottom' : 'right'}
          showHandleBar={isPhone}
          styles={{
            header: { paddingBottom: 'var(--space-1)' },
            content: { paddingBottom: 'var(--space-3)' },
          }}
          title={
            <VStack gap={isPhone ? 1.5 : 2}>
              <Pictogram name="addWallet" />
              <Text font="title3">Welcome aboard</Text>
            </VStack>
          }
        >
          {Array.from({ length: 20 }, (_, i) => (
            <ListCell
              key={i}
              accessory="arrow"
              description="Description"
              innerSpacing={{
                marginX: -4,
                paddingX: 4,
                paddingY: 1,
              }}
              spacingVariant="condensed"
              title="Title"
            />
          ))}
        </Tray>
      )}
    </>
  );
};

export const ResponsiveFullBleedImageListCells = () => {
  const { isPhone } = useBreakpoints();
  const [isOpen, setIsOpen] = useState(false);

  // Open after initial load to properly configure scroll ref in StrictMode
  useEffect(() => setIsOpen(true), []);

  return (
    <>
      <style>{`
        .tray-close-button-inverted {
          color: white;
        }
        .tray-close-button-inverted:hover,
        .tray-close-button-inverted:focus-visible {
          background-color: rgba(255, 255, 255, 0.15);
        }
      `}</style>
      <Button onClick={() => setIsOpen(true)}>Open Tray</Button>
      {isOpen && (
        <Tray
          classNames={{
            closeButton: 'tray-close-button-inverted',
          }}
          header={
            <Text
              font="title3"
              paddingBottom={0.75}
              paddingTop={2}
              paddingX={{ base: 4, phone: 3 }}
            >
              Header
            </Text>
          }
          hideCloseButton={isPhone}
          onCloseComplete={() => setIsOpen(false)}
          pin={isPhone ? 'bottom' : 'right'}
          showHandleBar={isPhone}
          styles={{
            handleBar: {
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              zIndex: 1,
            },
            handleBarHandle: {
              backgroundColor: 'white',
              opacity: 1,
            },
            closeButton: {
              position: 'absolute',
              top: 'var(--space-4)',
              right: 'var(--space-4)',
              zIndex: 1,
            },
            header: {
              paddingTop: 0,
            },
            content: { paddingBottom: 'var(--space-3)' },
          }}
          title={
            <Box flexGrow={1} marginX={{ base: -4, phone: -3 }}>
              <img
                alt="Full Bleed"
                height={180}
                src="https://static-assets.coinbase.com/design-system/placeholder/coinbaseHeader.jpg"
                style={{ objectFit: 'cover', pointerEvents: 'none' }}
                width="100%"
              />
            </Box>
          }
        >
          {Array.from({ length: 20 }, (_, i) => (
            <ListCell
              key={i}
              accessory="arrow"
              description="Description"
              innerSpacing={{
                marginX: -4,
                paddingX: 4,
                paddingY: 1,
              }}
              spacingVariant="condensed"
              title="Title"
            />
          ))}
        </Tray>
      )}
    </>
  );
};

export const ReduceMotion = () => {
  const [showBasicTray, setShowBasicTray] = useState(false);

  return (
    <VStack alignItems="flex-start" gap={2}>
      <Text font="headline">Basic Tray with String Title</Text>
      <Button onClick={() => setShowBasicTray(true)}>Open Basic Tray</Button>
      {showBasicTray && (
        <Tray
          reduceMotion
          onCloseComplete={() => setShowBasicTray(false)}
          title="Basic Tray Example"
        >
          <VStack gap={1}>
            <Text font="body">
              This is a basic tray with a simple string title. Clicking outside or pressing ESC will
              close it.
            </Text>
            <Text font="body">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam euismod, nisl eget
              aliquam ultricies, nunc nisl aliquet nunc, quis aliquam nunc nisl eu nunc.
            </Text>
          </VStack>
        </Tray>
      )}
    </VStack>
  );
};
