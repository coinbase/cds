import { figma } from '@figma/code-connect';

import { Tag } from '../Tag';

figma.connect(
  Tag,
  'https://www.figma.com/design/k5CtyJccNQUGMI5bI4lJ2g/✨-CDS-Components?node-id=68%3A996',
  {
    imports: ["import { Tag } from '@coinbase/cds-web/tag/Tag';"],
    variant: { intent: 'informational' },
    props: {
      emphasis: figma.enum('emphasis', {
        high: 'high',
        low: 'low',
      }),
      colorScheme: figma.enum('colorScheme', {
        green: 'green',
        purple: 'purple',
        blue: 'blue',
        yellow: 'yellow',
        red: 'red',
        gray: 'gray',
      }),
      children: figma.nestedProps('string.info tags', {
        node: figma.enum('Ready-made', {
          Custom: figma.string('string'),
          'Most popular': figma.textContent('tag-label'),
          New: figma.textContent('tag-label'),
          'Needs review': figma.textContent('tag-label'),
          'Not verified': figma.textContent('tag-label'),
          Recommended: figma.textContent('tag-label'),
        }),
      }),
    },
    example: ({ children, ...props }) => <Tag {...props}>{children.node}</Tag>,
  },
);

figma.connect(
  Tag,
  'https://www.figma.com/design/k5CtyJccNQUGMI5bI4lJ2g/✨-CDS-Components?node-id=68%3A996',
  {
    imports: ["import { Tag } from '@coinbase/cds-web/tag/Tag';"],
    variant: { intent: 'promotional' },
    props: {
      emphasis: figma.enum('emphasis', {
        high: 'high',
        low: 'low',
      }),
      colorScheme: figma.enum('colorScheme', {
        green: 'green',
        purple: 'purple',
        blue: 'blue',
        yellow: 'yellow',
        red: 'red',
        gray: 'gray',
      }),
      children: figma.nestedProps('string.promo tags', {
        node: figma.enum('Ready-made', {
          Custom: figma.string('string'),
          'Most popular': figma.textContent('tag-label'),
          New: figma.textContent('tag-label'),
          Recommended: figma.textContent('tag-label'),
        }),
      }),
    },
    example: ({ children, ...props }) => (
      <Tag intent="promotional" {...props}>
        {children.node}
      </Tag>
    ),
  },
);
