import React, { useState } from 'react';
import { figma } from '@figma/code-connect';

import { Button } from '../../../buttons/Button';
import { Box, VStack } from '../../../layout';
import { StickyFooter } from '../../../sticky-footer/StickyFooter';
import { Text } from '../../../typography/Text';
import { Tray } from '../Tray';

figma.connect(
  Tray,
  'https://www.figma.com/design/k5CtyJccNQUGMI5bI4lJ2g/✨-CDS-Components?node-id=14729-33327&m=dev',
  {
    imports: [
      "import { Tray } from '@coinbase/cds-mobile/overlays/tray/Tray'",
      "import { StickyFooter } from '@coinbase/cds-mobile/sticky-footer/StickyFooter'",
    ],
    props: {
      title: figma.boolean('show section header', {
        true: figma.textContent('SectionHeader'),
        false: undefined,
      }),
      content: figma.children('.Select Option*'),
    },
    example: function TrayExample({ content, title }) {
      const [isTrayVisible, setIsTrayVisible] = useState(false);

      return (
        <>
          <Button onPress={() => setIsTrayVisible(true)}>Open Tray</Button>
          {isTrayVisible && (
            <Tray
              footer={({ handleClose }) => (
                <StickyFooter background="bgElevation2" paddingX={3}>
                  <Button block onPress={handleClose}>
                    Close
                  </Button>
                </StickyFooter>
              )}
              handleBarVariant="inside"
              onCloseComplete={() => setIsTrayVisible(false)}
              title={title}
            >
              <VStack paddingX={3}>{content}</VStack>
            </Tray>
          )}
        </>
      );
    },
  },
);

figma.connect(
  Tray,
  'https://www.figma.com/design/k5CtyJccNQUGMI5bI4lJ2g/✨-CDS-Components?node-id=14729-33472&m=dev',
  {
    imports: ["import { Tray } from '@coinbase/cds-mobile/overlays/tray/Tray'"],
    props: {
      pictogram: figma.boolean('show pictogram', {
        true: figma.children('Spot Square/blockchain'),
        false: undefined,
      }),
      sectionTitle: figma.textContent('SectionHeader'),
    },
    example: function TrayExample({ pictogram, sectionTitle }) {
      const [isTrayVisible, setIsTrayVisible] = useState(false);

      return (
        <>
          <Button onPress={() => setIsTrayVisible(true)}>Open Tray</Button>
          {isTrayVisible && (
            <Tray
              accessibilityLabel={sectionTitle}
              handleBarVariant="inside"
              onCloseComplete={() => setIsTrayVisible(false)}
              title={
                <VStack gap={1.5}>
                  {pictogram}
                  <Text font="title3">{sectionTitle}</Text>
                </VStack>
              }
            >
              <VStack paddingX={3}>
                <Text color="fgMuted" font="body" paddingBottom={2}>
                  Content goes here.
                </Text>
              </VStack>
            </Tray>
          )}
        </>
      );
    },
  },
);

figma.connect(
  Tray,
  'https://www.figma.com/design/k5CtyJccNQUGMI5bI4lJ2g/✨-CDS-Components?node-id=14729-33505&m=dev',
  {
    imports: [
      "import { Tray } from '@coinbase/cds-mobile/overlays/tray/Tray'",
      "import { StickyFooter } from '@coinbase/cds-mobile/sticky-footer/StickyFooter'",
    ],
    props: {
      spotRectangle: figma.instance('spot rectangle'),
      title: figma.string('title'),
      body: figma.string('body'),
    },
    example: function TrayExample({ spotRectangle, title, body }) {
      const [isTrayVisible, setIsTrayVisible] = useState(false);

      return (
        <>
          <Button onPress={() => setIsTrayVisible(true)}>Open Tray</Button>
          {isTrayVisible && (
            <Tray
              accessibilityLabel={title}
              footer={({ handleClose }) => (
                <StickyFooter background="bgElevation2" paddingX={3}>
                  <Button block onPress={handleClose}>
                    Close
                  </Button>
                </StickyFooter>
              )}
              handleBarVariant="inside"
              onCloseComplete={() => setIsTrayVisible(false)}
            >
              <VStack paddingX={3}>
                <Box alignItems="center" paddingBottom={3}>
                  {spotRectangle}
                </Box>
                <Text align="center" font="title1" paddingBottom={2}>
                  {title}
                </Text>
                <Text align="center" color="fgMuted" font="body" paddingBottom={2}>
                  {body}
                </Text>
              </VStack>
            </Tray>
          )}
        </>
      );
    },
  },
);

figma.connect(
  Tray,
  'https://www.figma.com/design/k5CtyJccNQUGMI5bI4lJ2g/✨-CDS-Components?node-id=14729-33538&m=dev',
  {
    imports: ["import { Tray } from '@coinbase/cds-mobile/overlays/tray/Tray'"],
    props: {
      children: figma.children('*'),
    },
    example: function TrayExample({ children }) {
      const [isTrayVisible, setIsTrayVisible] = useState(false);

      return (
        <>
          <Button onPress={() => setIsTrayVisible(true)}>Open Tray</Button>
          {isTrayVisible && (
            <Tray
              handleBarVariant="inside"
              onCloseComplete={() => setIsTrayVisible(false)}
              title="Title"
            >
              {children}
            </Tray>
          )}
        </>
      );
    },
  },
);

figma.connect(
  Tray,
  'https://www.figma.com/design/k5CtyJccNQUGMI5bI4lJ2g/✨-CDS-Components?node-id=14729-77780&m=dev',
  {
    imports: [
      "import { Tray } from '@coinbase/cds-mobile/overlays/tray/Tray'",
      "import { StickyFooter } from '@coinbase/cds-mobile/sticky-footer/StickyFooter'",
    ],
    props: {
      content: figma.instance('content'),
      title: figma.boolean('show section header', {
        true: figma.textContent('SectionHeader'),
        false: undefined,
      }),
    },
    example: function TrayExample({ content, title }) {
      const [isTrayVisible, setIsTrayVisible] = useState(false);

      return (
        <>
          <Button onPress={() => setIsTrayVisible(true)}>Open Tray</Button>
          {isTrayVisible && (
            <Tray
              footer={({ handleClose }) => (
                <StickyFooter background="bgElevation2" paddingX={3}>
                  <Button block onPress={handleClose}>
                    Close
                  </Button>
                </StickyFooter>
              )}
              handleBarVariant="inside"
              onCloseComplete={() => setIsTrayVisible(false)}
              title={title}
            >
              <VStack paddingX={3}>{content}</VStack>
            </Tray>
          )}
        </>
      );
    },
  },
);
