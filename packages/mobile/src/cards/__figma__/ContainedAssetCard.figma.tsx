import { figma } from '@figma/code-connect';

import { ContainedAssetCard } from '../ContainedAssetCard';

figma.connect(
  ContainedAssetCard,
  'https://www.figma.com/design/k5CtyJccNQUGMI5bI4lJ2g/✨-CDS-Components?node-id=10084%3A2875',
  {
    imports: ["import { ContainedAssetCard } from '@coinbase/cds-mobile/cards/ContainedAssetCard'"],
    props: {
      // showverified1025912: figma.boolean('↳ show verified'),
      header: figma.instance('header'),
      subtitle: figma.boolean('show subtitle', {
        true: figma.string('↳ subtitle'),
        false: undefined,
      }),
      title: figma.string('title'),
      description: figma.boolean('show description', {
        true: figma.instance('↳ description'),
        false: undefined,
      }),
      size: figma.enum('size', {
        s: 's',
        l: 'l',
      }),
      children: figma.enum('type', {
        contained: undefined,
        'half filled': 'right half content',
      }),
    },
    example: ({ children, ...props }) => (
      <ContainedAssetCard {...props}>{children}</ContainedAssetCard>
    ),
  },
);
