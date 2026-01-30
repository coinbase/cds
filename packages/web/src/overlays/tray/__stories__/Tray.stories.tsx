import React, { useRef, useState } from 'react';
import type { Meta } from '@storybook/react';

import { Button } from '../../../buttons/Button';
import { ListCell } from '../../../cells/ListCell';
import { useBreakpoints } from '../../../hooks/useBreakpoints';
import { Pictogram } from '../../../illustrations/Pictogram';
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

export const Responsive = () => {
  const [showBasic, setShowBasic] = useState(false);
  const [showIllustration, setShowIllustration] = useState(false);
  const [showFullBleedImage, setShowFullBleedImage] = useState(false);
  const [showBasicListCells, setShowBasicListCells] = useState(false);
  const [showIllustrationListCells, setShowIllustrationListCells] = useState(false);
  const [showFullBleedImageListCells, setShowFullBleedImageListCells] = useState(false);
  const { isPhone } = useBreakpoints();

  return (
    <VStack gap={4} padding={1}>
      <VStack alignItems="flex-start" gap={2}>
        <Text font="headline">Responsive Basic Tray</Text>
        <Button onClick={() => setShowBasic(true)}>Open Responsive Tray</Button>
        {showBasic && (
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
            onCloseComplete={() => setShowBasic(false)}
            pin={isPhone ? 'bottom' : 'right'}
            showHandleBar={isPhone}
            styles={
              isPhone
                ? {
                    container: {
                      maxHeight: 650,
                    },
                  }
                : undefined
            }
            title="Section header"
          >
            <Text color="fgMuted" font="body" paddingBottom={2}>
              Curabitur commodo nulla vel dolor vulputate vestibulum. Nulla et nisl molestie,
              interdum lorem id, viverra.
            </Text>
          </Tray>
        )}
      </VStack>

      <VStack alignItems="flex-start" gap={2}>
        <Text font="headline">Responsive with Illustration</Text>
        <Button onClick={() => setShowIllustration(true)}>Open Illustration Tray</Button>
        {showIllustration && (
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
            onCloseComplete={() => setShowIllustration(false)}
            pin={isPhone ? 'bottom' : 'right'}
            showHandleBar={isPhone}
            styles={
              isPhone
                ? {
                    container: {
                      maxHeight: 650,
                    },
                  }
                : undefined
            }
            title={
              <VStack gap={isPhone ? 1.5 : 2}>
                <Pictogram name="addWallet" />
                <Text font="title3">Welcome aboard</Text>
              </VStack>
            }
          >
            <Text color="fgMuted" font="body" paddingBottom={2}>
              Curabitur commodo nulla vel dolor vulputate vestibulum. Nulla et nisl molestie,
              interdum lorem id, viverra.
            </Text>
          </Tray>
        )}
      </VStack>

      <VStack alignItems="flex-start" gap={2}>
        <Text font="headline">Full Bleed Image</Text>
        <Button onClick={() => setShowFullBleedImage(true)}>Open Full Bleed Image Tray</Button>
        {showFullBleedImage && (
          <Tray
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
            hideCloseButton={isPhone}
            onCloseComplete={() => setShowFullBleedImage(false)}
            pin={isPhone ? 'bottom' : 'right'}
            showHandleBar={isPhone}
            styles={{
              container: isPhone
                ? {
                    maxHeight: 650,
                  }
                : undefined,
              header: {
                backgroundImage:
                  'url(https://images.ctfassets.net/o10es7wu5gm1/4BsskcYybNIDMYTeMpkFPG/216eb97727f834346649004a5d66cd3f/Coinbase_Press_Page_Product_Image.png?fm=avif&w=641&h=426&q=65)',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                minHeight: 220,
              },
            }}
          >
            <Text font="title3" paddingBottom={0.75} paddingTop={2}>
              Header
            </Text>
            <VStack gap={2} paddingBottom={2}>
              <Text font="body">This is the content of the tray.</Text>
            </VStack>
          </Tray>
        )}
      </VStack>

      <VStack alignItems="flex-start" gap={2}>
        <Text font="headline">Basic with List Cells</Text>
        <Button onClick={() => setShowBasicListCells(true)}>Open Basic List Cells Tray</Button>
        {showBasicListCells && (
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
            onCloseComplete={() => setShowBasicListCells(false)}
            pin={isPhone ? 'bottom' : 'right'}
            showHandleBar={isPhone}
            styles={{
              container: isPhone
                ? {
                    maxHeight: 650,
                  }
                : undefined,
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
      </VStack>

      <VStack alignItems="flex-start" gap={2}>
        <Text font="headline">Illustration with List Cells</Text>
        <Button onClick={() => setShowIllustrationListCells(true)}>
          Open Illustration List Cells Tray
        </Button>
        {showIllustrationListCells && (
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
            onCloseComplete={() => setShowIllustrationListCells(false)}
            pin={isPhone ? 'bottom' : 'right'}
            showHandleBar={isPhone}
            styles={{
              container: isPhone
                ? {
                    maxHeight: 650,
                  }
                : undefined,
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
      </VStack>

      <VStack alignItems="flex-start" gap={2}>
        <Text font="headline">Full Bleed Image with List Cells</Text>
        <Button onClick={() => setShowFullBleedImageListCells(true)}>
          Open Full Bleed Image List Cells Tray
        </Button>
        {showFullBleedImageListCells && (
          <Tray
            hideCloseButton={isPhone}
            onCloseComplete={() => setShowFullBleedImageListCells(false)}
            pin={isPhone ? 'bottom' : 'right'}
            showHandleBar={isPhone}
            styles={{
              container: isPhone
                ? {
                    maxHeight: 650,
                  }
                : undefined,
              header: {
                backgroundImage:
                  'url(https://images.ctfassets.net/o10es7wu5gm1/4BsskcYybNIDMYTeMpkFPG/216eb97727f834346649004a5d66cd3f/Coinbase_Press_Page_Product_Image.png?fm=avif&w=641&h=426&q=65)',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                minHeight: 220,
              },
              content: { paddingBottom: 'var(--space-3)' },
            }}
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
      </VStack>
    </VStack>
  );
};

export const HandleBar = () => {
  const [showBasic, setShowBasic] = useState(false);
  const [showIllustration, setShowIllustration] = useState(false);
  const [showFullBleedImage, setShowFullBleedImage] = useState(false);
  const [showBasicListCells, setShowBasicListCells] = useState(false);
  const [showIllustrationListCells, setShowIllustrationListCells] = useState(false);
  const [showFullBleedImageListCells, setShowFullBleedImageListCells] = useState(false);

  return (
    <VStack gap={4} padding={1}>
      <VStack alignItems="flex-start" gap={2}>
        <Text font="headline">Bottom Pin with HandleBar - Basic</Text>
        <Button onClick={() => setShowBasic(true)}>Open HandleBar Tray</Button>
        {showBasic && (
          <Tray
            hideCloseButton
            showHandleBar
            footer={({ handleClose }) => (
              <PageFooter
                borderedTop
                action={
                  <Button block onClick={handleClose}>
                    Button
                  </Button>
                }
                justifyContent="center"
              />
            )}
            onCloseComplete={() => setShowBasic(false)}
            pin="bottom"
            styles={{
              container: {
                maxHeight: 650,
              },
            }}
            title="Section header"
          >
            <Text color="fgMuted" font="body" paddingBottom={2}>
              Curabitur commodo nulla vel dolor vulputate vestibulum. Nulla et nisl molestie,
              interdum lorem id, viverra.
            </Text>
          </Tray>
        )}
      </VStack>

      <VStack alignItems="flex-start" gap={2}>
        <Text font="headline">Bottom Pin with HandleBar - Illustration</Text>
        <Button onClick={() => setShowIllustration(true)}>Open Illustration Tray</Button>
        {showIllustration && (
          <Tray
            hideCloseButton
            showHandleBar
            footer={({ handleClose }) => (
              <PageFooter
                borderedTop
                action={
                  <Button block onClick={handleClose}>
                    Button
                  </Button>
                }
                justifyContent="center"
              />
            )}
            onCloseComplete={() => setShowIllustration(false)}
            pin="bottom"
            styles={{
              container: {
                maxHeight: 650,
              },
            }}
            title={
              <VStack gap={1.5}>
                <Pictogram name="addWallet" />
                <Text font="title3">Welcome aboard</Text>
              </VStack>
            }
          >
            <Text color="fgMuted" font="body" paddingBottom={2}>
              Curabitur commodo nulla vel dolor vulputate vestibulum. Nulla et nisl molestie,
              interdum lorem id, viverra.
            </Text>
          </Tray>
        )}
      </VStack>

      <VStack alignItems="flex-start" gap={2}>
        <Text font="headline">Bottom Pin with HandleBar - Full Bleed Image</Text>
        <Button onClick={() => setShowFullBleedImage(true)}>Open Full Bleed Image Tray</Button>
        {showFullBleedImage && (
          <Tray
            hideCloseButton
            showHandleBar
            footer={({ handleClose }) => (
              <PageFooter
                borderedTop
                action={
                  <Button block onClick={handleClose}>
                    Close
                  </Button>
                }
                justifyContent="center"
              />
            )}
            onCloseComplete={() => setShowFullBleedImage(false)}
            pin="bottom"
            styles={{
              container: {
                maxHeight: 650,
              },
              header: {
                backgroundImage:
                  'url(https://images.ctfassets.net/o10es7wu5gm1/4BsskcYybNIDMYTeMpkFPG/216eb97727f834346649004a5d66cd3f/Coinbase_Press_Page_Product_Image.png?fm=avif&w=641&h=426&q=65)',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                minHeight: 220,
              },
            }}
          >
            <Text font="title3" paddingBottom={0.75} paddingTop={2}>
              Header
            </Text>
            <VStack gap={2} paddingBottom={2}>
              <Text font="body">This is the content of the tray.</Text>
            </VStack>
          </Tray>
        )}
      </VStack>

      <VStack alignItems="flex-start" gap={2}>
        <Text font="headline">Bottom Pin with HandleBar - Basic with List Cells</Text>
        <Button onClick={() => setShowBasicListCells(true)}>Open Basic List Cells Tray</Button>
        {showBasicListCells && (
          <Tray
            hideCloseButton
            showHandleBar
            footer={({ handleClose }) => (
              <PageFooter
                borderedTop
                action={
                  <Button block onClick={handleClose}>
                    Button
                  </Button>
                }
                justifyContent="center"
              />
            )}
            onCloseComplete={() => setShowBasicListCells(false)}
            pin="bottom"
            styles={{
              container: {
                maxHeight: 650,
              },
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
      </VStack>

      <VStack alignItems="flex-start" gap={2}>
        <Text font="headline">Bottom Pin with HandleBar - Illustration with List Cells</Text>
        <Button onClick={() => setShowIllustrationListCells(true)}>
          Open Illustration List Cells Tray
        </Button>
        {showIllustrationListCells && (
          <Tray
            hideCloseButton
            showHandleBar
            footer={({ handleClose }) => (
              <PageFooter
                borderedTop
                action={
                  <Button block onClick={handleClose}>
                    Button
                  </Button>
                }
                justifyContent="center"
              />
            )}
            onCloseComplete={() => setShowIllustrationListCells(false)}
            pin="bottom"
            styles={{
              container: {
                maxHeight: 650,
              },
              header: { paddingBottom: 'var(--space-1)' },
              content: { paddingBottom: 'var(--space-3)' },
            }}
            title={
              <VStack gap={1.5}>
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
      </VStack>

      <VStack alignItems="flex-start" gap={2}>
        <Text font="headline">Bottom Pin with HandleBar - Full Bleed Image with List Cells</Text>
        <Button onClick={() => setShowFullBleedImageListCells(true)}>
          Open Full Bleed Image List Cells Tray
        </Button>
        {showFullBleedImageListCells && (
          <Tray
            hideCloseButton
            showHandleBar
            onCloseComplete={() => setShowFullBleedImageListCells(false)}
            pin="bottom"
            styles={{
              container: {
                maxHeight: 650,
              },
              header: {
                backgroundImage:
                  'url(https://images.ctfassets.net/o10es7wu5gm1/4BsskcYybNIDMYTeMpkFPG/216eb97727f834346649004a5d66cd3f/Coinbase_Press_Page_Product_Image.png?fm=avif&w=641&h=426&q=65)',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                minHeight: 220,
              },
              content: { paddingBottom: 'var(--space-3)' },
            }}
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
      </VStack>
    </VStack>
  );
};

export const PinRight = () => {
  const [showBasic, setShowBasic] = useState(false);
  const [showIllustration, setShowIllustration] = useState(false);
  const [showFullBleedImage, setShowFullBleedImage] = useState(false);
  const [showBasicListCells, setShowBasicListCells] = useState(false);
  const [showIllustrationListCells, setShowIllustrationListCells] = useState(false);
  const [showFullBleedImageListCells, setShowFullBleedImageListCells] = useState(false);

  return (
    <VStack gap={4} padding={1}>
      <VStack alignItems="flex-start" gap={2}>
        <Text font="headline">Right Pin - Basic</Text>
        <Button onClick={() => setShowBasic(true)}>Open Right Pin Tray</Button>
        {showBasic && (
          <Tray
            footer={({ handleClose }) => (
              <PageFooter
                borderedTop
                action={<Button onClick={handleClose}>Button</Button>}
                justifyContent="flex-end"
              />
            )}
            onCloseComplete={() => setShowBasic(false)}
            pin="right"
            title="Section header"
          >
            <Text color="fgMuted" font="body" paddingBottom={2}>
              Curabitur commodo nulla vel dolor vulputate vestibulum. Nulla et nisl molestie,
              interdum lorem id, viverra.
            </Text>
          </Tray>
        )}
      </VStack>

      <VStack alignItems="flex-start" gap={2}>
        <Text font="headline">Right Pin - Illustration</Text>
        <Button onClick={() => setShowIllustration(true)}>Open Illustration Tray</Button>
        {showIllustration && (
          <Tray
            footer={({ handleClose }) => (
              <PageFooter
                borderedTop
                action={<Button onClick={handleClose}>Button</Button>}
                justifyContent="flex-end"
              />
            )}
            onCloseComplete={() => setShowIllustration(false)}
            pin="right"
            title={
              <VStack gap={2}>
                <Pictogram name="addWallet" />
                <Text font="title3">Welcome aboard</Text>
              </VStack>
            }
          >
            <Text color="fgMuted" font="body" paddingBottom={2}>
              Curabitur commodo nulla vel dolor vulputate vestibulum. Nulla et nisl molestie,
              interdum lorem id, viverra.
            </Text>
          </Tray>
        )}
      </VStack>

      <VStack alignItems="flex-start" gap={2}>
        <Text font="headline">Right Pin - Full Bleed Image</Text>
        <Button onClick={() => setShowFullBleedImage(true)}>Open Full Bleed Image Tray</Button>
        {showFullBleedImage && (
          <Tray
            footer={({ handleClose }) => (
              <PageFooter
                borderedTop
                action={<Button onClick={handleClose}>Close</Button>}
                justifyContent="flex-end"
              />
            )}
            onCloseComplete={() => setShowFullBleedImage(false)}
            pin="right"
            styles={{
              header: {
                backgroundImage:
                  'url(https://images.ctfassets.net/o10es7wu5gm1/4BsskcYybNIDMYTeMpkFPG/216eb97727f834346649004a5d66cd3f/Coinbase_Press_Page_Product_Image.png?fm=avif&w=641&h=426&q=65)',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                minHeight: 220,
              },
            }}
          >
            <Text font="title3" paddingBottom={0.75} paddingTop={2}>
              Header
            </Text>
            <VStack gap={2} paddingBottom={2}>
              <Text font="body">This is the content of the tray.</Text>
            </VStack>
          </Tray>
        )}
      </VStack>

      <VStack alignItems="flex-start" gap={2}>
        <Text font="headline">Right Pin - Basic with List Cells</Text>
        <Button onClick={() => setShowBasicListCells(true)}>Open Basic List Cells Tray</Button>
        {showBasicListCells && (
          <Tray
            footer={({ handleClose }) => (
              <PageFooter
                borderedTop
                action={<Button onClick={handleClose}>Button</Button>}
                justifyContent="flex-end"
              />
            )}
            onCloseComplete={() => setShowBasicListCells(false)}
            pin="right"
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
      </VStack>

      <VStack alignItems="flex-start" gap={2}>
        <Text font="headline">Right Pin - Illustration with List Cells</Text>
        <Button onClick={() => setShowIllustrationListCells(true)}>
          Open Illustration List Cells Tray
        </Button>
        {showIllustrationListCells && (
          <Tray
            footer={({ handleClose }) => (
              <PageFooter
                borderedTop
                action={<Button onClick={handleClose}>Button</Button>}
                justifyContent="flex-end"
              />
            )}
            onCloseComplete={() => setShowIllustrationListCells(false)}
            pin="right"
            styles={{
              header: { paddingBottom: 'var(--space-1)' },
              content: { paddingBottom: 'var(--space-3)' },
            }}
            title={
              <VStack gap={2}>
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
      </VStack>

      <VStack alignItems="flex-start" gap={2}>
        <Text font="headline">Right Pin - Full Bleed Image with List Cells</Text>
        <Button onClick={() => setShowFullBleedImageListCells(true)}>
          Open Full Bleed Image List Cells Tray
        </Button>
        {showFullBleedImageListCells && (
          <Tray
            onCloseComplete={() => setShowFullBleedImageListCells(false)}
            pin="right"
            styles={{
              header: {
                backgroundImage:
                  'url(https://images.ctfassets.net/o10es7wu5gm1/4BsskcYybNIDMYTeMpkFPG/216eb97727f834346649004a5d66cd3f/Coinbase_Press_Page_Product_Image.png?fm=avif&w=641&h=426&q=65)',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                minHeight: 220,
              },
              content: { paddingBottom: 'var(--space-3)' },
            }}
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
      </VStack>
    </VStack>
  );
};
