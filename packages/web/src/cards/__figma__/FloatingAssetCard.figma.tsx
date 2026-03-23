import React from 'react';
import { figma } from '@figma/code-connect';

import { FloatingAssetCard } from '../FloatingAssetCard';

figma.connect(
  FloatingAssetCard,
  'https://www.figma.com/design/k5CtyJccNQUGMI5bI4lJ2g/✨-CDS-Components?node-id=10085%3A3012',
  {
    imports: ["import { FloatingAssetCard } from '@coinbase/cds-web/cards/FloatingAssetCard'"],
    props: {
      // showverified1025919: figma.boolean('↳ show verified'),
      title: figma.string('title'),
      description: figma.boolean('show description', {
        true: figma.instance('↳ description'),
        false: undefined,
      }),
      subtitle: figma.boolean('show subtitle', {
        true: figma.string('↳ subtitle'),
        false: undefined,
      }),
      size: figma.enum('size', {
        l: 'l',
        s: 's',
      }),
    },
    example: ({ ...props }) => <FloatingAssetCard media="<img />" {...props} />,
  },
);
