import React from 'react';
import { figma } from '@figma/code-connect';

import { Avatar } from '../../../media';
import { DataCard } from '../DataCard';

figma.connect(
  DataCard,
  'https://www.figma.com/design/k5CtyJccNQUGMI5bI4lJ2g/%E2%9C%A8-CDS-Components?node-id=72941-17832&m=dev',
  {
    imports: [
      "import { DataCard } from '@coinbase/cds-web/alpha/data-card'",
      "import { Avatar } from '@coinbase/cds-web/media/Avatar'",
    ],
    props: {
      subtitle: figma.boolean('show subtitle', {
        true: figma.string('Subtitle'),
        false: undefined,
      }),
      thumbnail: figma.boolean('show media', {
        true: figma.instance('↳ media'),
        false: undefined,
      }),
    },
    example: ({ thumbnail, subtitle }) => (
      <DataCard layout="vertical" subtitle={subtitle} thumbnail={thumbnail} title="Title">
        {/* visualization */}
      </DataCard>
    ),
  },
);
