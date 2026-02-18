import { useId, useState } from 'react';
import { figma } from '@figma/code-connect';

import { Button } from '../../../buttons';
import { useBreakpoints } from '../../../hooks/useBreakpoints';
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
    "import { useBreakpoints } from '@coinbase/cds-web/hooks/useBreakpoints'",
  ],
  props: {
    title: figma.textContent('SectionHeader'),
  },
  example: function StandardExample({ title }) {
    const [visible, setVisible] = useState(false);
    const { isPhone } = useBreakpoints();
    return (
      <>
        <Button onClick={() => setVisible(true)}>Open Tray</Button>
        {visible && (
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
            onCloseComplete={() => setVisible(false)}
            pin={isPhone ? 'bottom' : 'right'}
            showHandleBar={isPhone}
            title={title}
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
    "import { useBreakpoints } from '@coinbase/cds-web/hooks/useBreakpoints'",
  ],
  props: {
    sectionTitle: figma.textContent('SectionHeader'),
  },
  example: function IllustrationExample({ sectionTitle }) {
    const [visible, setVisible] = useState(false);
    const { isPhone } = useBreakpoints();
    const titleId = useId();
    return (
      <>
        <Button onClick={() => setVisible(true)}>Open Tray</Button>
        {visible && (
          <Tray
            accessibilityLabelledBy={titleId}
            onCloseComplete={() => setVisible(false)}
            pin={isPhone ? 'bottom' : 'right'}
            showHandleBar={isPhone}
            title={
              <VStack gap={{ phone: 1.5, tablet: 2, desktop: 2 }}>
                <Pictogram name="addWallet" />
                <Text font="title3" id={titleId}>
                  {sectionTitle}
                </Text>
              </VStack>
            }
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
  imports: [
    "import { Tray } from '@coinbase/cds-web/overlays/tray/Tray'",
    "import { useBreakpoints } from '@coinbase/cds-web/hooks/useBreakpoints'",
  ],
  props: {
    sectionTitle: figma.textContent('SectionHeader'),
  },
  example: function FullBleedImageExample({ sectionTitle }) {
    const [visible, setVisible] = useState(false);
    const { isPhone } = useBreakpoints();
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
