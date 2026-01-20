import { figma } from '@figma/code-connect';

import { Button, IconButton } from '../../buttons';
import { HStack } from '../../layout';
import { PageHeader } from '../PageHeader';

figma.connect(
  PageHeader,
  'https://www.figma.com/design/k5CtyJccNQUGMI5bI4lJ2g/✨-CDS-Components?node-id=17685%3A3171',
  {
    imports: [
      "import { PageHeader } from '@coinbase/cds-web/page/PageHeader'",
      "import { HStack } from '@coinbase/cds-web/layout/HStack'",
    ],
    props: {
      start: figma.boolean('show start', {
        true: figma.enum('type', {
          L1: figma.children('Logo*'),
          L2: <IconButton compact name="backArrow" variant="secondary" />,
        }),
        false: undefined,
      }),
      title: figma.boolean('stepper', {
        true: 'Stepper',
        false: figma.boolean('show page title', {
          true: 'Page title',
          false: undefined,
        }),
      }),
    },
    example: ({ title, start }) => {
      return (
        <PageHeader
          end={
            <HStack>
              <Button compact transparent flush="start" variant="primary">
                Button
              </Button>
              <IconButton compact transparent name="externalLink" variant="secondary" />
              <IconButton compact transparent name="close" variant="secondary" />
            </HStack>
          }
          start={start}
          title={title}
        />
      );
    },
  },
);
