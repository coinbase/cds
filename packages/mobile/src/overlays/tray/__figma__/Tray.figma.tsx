import { useRef, useState } from 'react';
import { figma } from '@figma/code-connect';

import { Button } from '../../../buttons/Button';
import { Box, VStack } from '../../../layout';
import { TextBody, TextTitle1 } from '../../../typography';
import { Tray, TrayStickyFooter } from '../Tray';

figma.connect(
  Tray,
  'https://www.figma.com/design/k5CtyJccNQUGMI5bI4lJ2g/✨-CDS-Components?node-id=14729-33327&m=dev',
  {
    imports: ["import { Tray } from '@coinbase/cds-mobile/overlays/tray/Tray';"],
    props: {
      title: figma.boolean('show section header', {
        true: figma.textContent('SectionHeader'),
        false: undefined,
      }),
      stickyFooter: figma.children('StickyFooter'),
      content: figma.children('.Select Option*'),
    },
    example: function TrayExample({ stickyFooter, content, title }) {
      const [isTrayVisible, setIsTrayVisible] = useState(false);
      const trayRef = useRef(null);

      return (
        <>
          <Button onPress={() => setIsTrayVisible(true)}>Open</Button>
          {isTrayVisible && (
            <Tray
              ref={trayRef}
              disableCapturePanGestureToDismiss
              handleBarAccessibilityLabel="Dismiss"
              onCloseComplete={() => setIsTrayVisible(false)}
              onVisibilityChange={() => {}}
              title={title}
            >
              {({ handleClose }) => (
                <TrayStickyFooter>
                  {content}
                  {stickyFooter}
                </TrayStickyFooter>
              )}
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
    imports: ["import { Tray } from '@coinbase/cds-mobile/overlays/tray/Tray';"],
    props: {
      pictogram: figma.boolean('show pictogram', {
        true: figma.children('Spot Square/blockchain'),
        false: undefined,
      }),
      title: figma.textContent('SectionHeader'),
      stickyFooter: figma.children('StickyFooter'),
    },
    example: function TrayExample({ pictogram, title, stickyFooter }) {
      const [isTrayVisible, setIsTrayVisible] = useState(false);
      const trayRef = useRef(null);

      return (
        <>
          <Button onPress={() => setIsTrayVisible(true)}>Open</Button>
          {isTrayVisible && (
            <Tray
              ref={trayRef}
              disableCapturePanGestureToDismiss
              handleBarAccessibilityLabel="Dismiss"
              onCloseComplete={() => setIsTrayVisible(false)}
              onVisibilityChange={() => {}}
              title={title}
            >
              {({ handleClose }) => (
                <TrayStickyFooter>
                  {pictogram}
                  <TextBody>
                    Lorem ipsum dolor sit amet consectetur. Lacus vitae vulputate maecenas sed ac
                    cursus enim elementum euismod. Ac vulputate gravida mauris id nulla imperdiet
                    eget. Dictum vitae enim eget ut. Maecenas hendrerit amet integer sagittis cras.
                    Fermentum ultricies malesuada interdum
                  </TextBody>
                  {stickyFooter}
                </TrayStickyFooter>
              )}
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
    imports: ["import { Tray } from '@coinbase/cds-mobile/overlays/tray/Tray';"],
    props: {
      spotRectangle: figma.instance('spot rectangle'),
      title: figma.string('title'),
      body: figma.string('body'),
      stickyFooter: figma.children('StickyFooter'),
    },
    example: function TrayExample({ spotRectangle, title, body, stickyFooter }) {
      const [isTrayVisible, setIsTrayVisible] = useState(false);
      const trayRef = useRef(null);

      return (
        <>
          <Button onPress={() => setIsTrayVisible(true)}>Open</Button>
          {isTrayVisible && (
            <Tray
              ref={trayRef}
              disableCapturePanGestureToDismiss
              handleBarAccessibilityLabel="Dismiss"
              onCloseComplete={() => setIsTrayVisible(false)}
              onVisibilityChange={() => {}}
            >
              {({ handleClose }) => (
                <TrayStickyFooter>
                  <VStack paddingBottom={1} paddingTop={1} paddingX={3}>
                    <Box alignItems="center" paddingBottom={3}>
                      {spotRectangle}
                    </Box>
                    <TextTitle1 align="center" paddingBottom={2}>
                      {title}
                    </TextTitle1>
                    <TextBody align="center" color="fgMuted" paddingBottom={2}>
                      {body}
                    </TextBody>
                  </VStack>
                  {stickyFooter}
                </TrayStickyFooter>
              )}
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
    imports: ["import { Tray } from '@coinbase/cds-mobile/overlays/tray/Tray';"],
    props: {
      children: figma.children('*'),
    },
    example: function TrayExample({ children }) {
      const [isTrayVisible, setIsTrayVisible] = useState(false);
      const trayRef = useRef(null);

      return (
        <>
          <Button onPress={() => setIsTrayVisible(true)}>Open</Button>
          {isTrayVisible && (
            <Tray
              ref={trayRef}
              disableCapturePanGestureToDismiss
              handleBarAccessibilityLabel="Dismiss"
              onCloseComplete={() => setIsTrayVisible(false)}
              onVisibilityChange={() => {}}
            >
              {({ handleClose }) => <TrayStickyFooter>{children}</TrayStickyFooter>}
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
    imports: ["import { Tray } from '@coinbase/cds-mobile/overlays/tray/Tray';"],
    props: {
      content: figma.instance('content'),
      stickyFooter: figma.children('StickyFooter'),
      title: figma.boolean('show section header', {
        true: figma.textContent('SectionHeader'),
        false: undefined,
      }),
    },
    example: function TrayExample({ content, stickyFooter, title }) {
      const [isTrayVisible, setIsTrayVisible] = useState(false);
      const trayRef = useRef(null);

      return (
        <>
          <Button onPress={() => setIsTrayVisible(true)}>Open</Button>
          {isTrayVisible && (
            <Tray
              ref={trayRef}
              disableCapturePanGestureToDismiss
              handleBarAccessibilityLabel="Dismiss"
              onCloseComplete={() => setIsTrayVisible(false)}
              onVisibilityChange={() => {}}
              title={title}
            >
              {({ handleClose }) => (
                <TrayStickyFooter>
                  {content}
                  {stickyFooter}
                </TrayStickyFooter>
              )}
            </Tray>
          )}
        </>
      );
    },
  },
);
