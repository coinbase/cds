import { figma } from '@figma/code-connect';

import { ContentCardHeader } from '../ContentCardHeader';

figma.connect(
  ContentCardHeader,
  'https://www.figma.com/design/k5CtyJccNQUGMI5bI4lJ2g/✨-CDS-Components?node-id=14705%3A24320',
  {
    imports: [
      "import { ContentCardHeader } from '@coinbase/cds-web/cards/ContentCard/ContentCardHeader'",
    ],
    props: {
      title: figma.string('metadata label'),
      meta: figma.string('metadata'),
      avatar: figma.boolean('show start', {
        true: figma.instance('↳ media'),
        false: undefined,
      }),
      end: figma.enum('type', {
        default: figma.children(['action']),
        'with tag': figma.children(['Tag']),
      }),
    },
    example: ({ ...props }) => <ContentCardHeader {...props} />,
  },
);
