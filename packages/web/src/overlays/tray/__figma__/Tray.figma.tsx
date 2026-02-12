import { useId, useState } from 'react';
import { figma } from '@figma/code-connect';

import { Button } from '../../../buttons';
import { Pictogram } from '../../../illustrations/Pictogram';
import { Box } from '../../../layout';
import { VStack } from '../../../layout/VStack';
import { PageFooter } from '../../../page/PageFooter';
import { Text } from '../../../typography/Text';
import { Tray } from '../Tray';

const FIGMA_URL =
  'https://www.figma.com/design/k5CtyJccNQUGMI5bI4lJ2g/%E2%9C%A8-CDS-Components?node-id=74148-11495&m=dev';

figma.connect(Tray, FIGMA_URL, {
  variant: { type: 'standard' },
  imports: [
    "import { Tray } from '@coinbase/cds-web/overlays/tray/Tray'",
    "import { PageFooter } from '@coinbase/cds-web/page/PageFooter'",
  ],
  props: {
    pin: figma.enum('device', {
      desktop: 'right',
    }),
    showHandleBar: figma.enum('device', {
      mobile: true,
    }),
    title: figma.textContent('SectionHeader'),
  },
  example: function StandardExample({ title, ...props }) {
    const [visible, setVisible] = useState(false);
    return (
      <>
        <Button onClick={() => setVisible(true)}>Open Tray</Button>
        {visible && (
          <Tray
            footer={({ handleClose }) => (
              <PageFooter borderedTop action={<Button onClick={handleClose}>Close</Button>} />
            )}
            onCloseComplete={() => setVisible(false)}
            title={title}
            {...props}
          >
            <Text color="fgMuted" paddingBottom={2}>
              Content goes here.
            </Text>
          </Tray>
        )}
      </>
    );
  },
});

figma.connect(Tray, FIGMA_URL, {
  variant: { type: 'illustration' },
  imports: [
    "import { Tray } from '@coinbase/cds-web/overlays/tray/Tray'",
    "import { Pictogram } from '@coinbase/cds-web/illustrations/Pictogram'",
  ],
  props: {
    pin: figma.enum('device', {
      desktop: 'right',
    }),
    showHandleBar: figma.enum('device', {
      mobile: true,
    }),
    sectionTitle: figma.textContent('SectionHeader'),
  },
  example: function IllustrationExample({ sectionTitle, ...props }) {
    const [visible, setVisible] = useState(false);
    const titleId = useId();
    return (
      <>
        <Button onClick={() => setVisible(true)}>Open Tray</Button>
        {visible && (
          <Tray
            accessibilityLabelledBy={titleId}
            onCloseComplete={() => setVisible(false)}
            title={
              <VStack gap={2}>
                <Pictogram name="addWallet" />
                <Text font="title3" id={titleId}>
                  {sectionTitle}
                </Text>
              </VStack>
            }
            {...props}
          >
            <Text color="fgMuted" font="body" paddingBottom={2}>
              Content goes here.
            </Text>
          </Tray>
        )}
      </>
    );
  },
});

figma.connect(Tray, FIGMA_URL, {
  variant: { type: 'full-bleed image' },
  imports: ["import { Tray } from '@coinbase/cds-web/overlays/tray/Tray'"],
  props: {
    pin: figma.enum('device', {
      desktop: 'right',
    }),
    showHandleBar: figma.enum('device', {
      mobile: true,
    }),
    sectionTitle: figma.textContent('SectionHeader'),
  },
  example: function FullBleedImageExample({ sectionTitle, ...props }) {
    const [visible, setVisible] = useState(false);
    const titleId = useId();
    return (
      <>
        <Button onClick={() => setVisible(true)}>Open Tray</Button>
        {visible && (
          <Tray
            accessibilityLabelledBy={titleId}
            header={
              <Text font="title3" id={titleId} paddingTop={2} paddingX={{ base: 4, phone: 3 }}>
                {sectionTitle}
              </Text>
            }
            onCloseComplete={() => setVisible(false)}
            styles={{
              handleBar: {
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                zIndex: 1,
              },
              closeButton: {
                position: 'absolute',
                top: 'var(--space-4)',
                right: 'var(--space-4)',
                zIndex: 1,
              },
              header: { paddingTop: 0 },
            }}
            title={
              <Box flexGrow={1} marginX={{ base: -4, phone: -3 }}>
                <img
                  alt="Full Bleed"
                  height={180}
                  src="image.jpg"
                  style={{ objectFit: 'cover', pointerEvents: 'none' }}
                  width="100%"
                />
              </Box>
            }
            {...props}
          >
            <Text color="fgMuted" font="body" paddingBottom={2}>
              Content goes here.
            </Text>
          </Tray>
        )}
      </>
    );
  },
});
