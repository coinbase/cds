import { figma } from '@figma/code-connect';

import { HStack } from '../../layout';
import { SectionHeader } from '../SectionHeader';

figma.connect(
  SectionHeader,
  'https://www.figma.com/design/k5CtyJccNQUGMI5bI4lJ2g/✨-CDS-Components?node-id=19270%3A19118',
  {
    imports: ["import { SectionHeader } from '@coinbase/cds-web/section-header/SectionHeader'"],
    props: {
      title: figma.children('string.section title'),
      balance: figma.enum('type', {
        'with balance (bottom)': figma.children(['Balance Header', 'Subdetails']),
      }),
      searchNode: figma.boolean('show search', {
        true: figma.children('Search Input (Desktop)'),
        false: undefined,
      }),
      spacingTop: figma.boolean('show bottom spacing', {
        true: undefined,
        false: 2,
      }),
      spacingVertical: figma.boolean('show bottom spacing', {
        true: undefined,
        false: 0,
      }),
      start: figma.boolean('show start', {
        true: figma.instance('↳ start'),
        false: undefined,
      }),
      icon: figma.boolean('show icon', {
        true: figma.children('icon'),
        false: undefined,
      }),
      description: figma.boolean('show description', {
        true: figma.string('↳ string'),
        false: undefined,
      }),
      end: figma.boolean('show start', {
        true: figma.instance('↳ end'),
        false: undefined,
      }),
    },
    example: ({ searchNode, ...props }) => (
      <HStack>
        <SectionHeader {...props} />
        {searchNode}
      </HStack>
    ),
  },
);
