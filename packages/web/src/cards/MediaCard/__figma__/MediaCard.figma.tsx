import React from 'react';
import { figma } from '@figma/code-connect';

import { Avatar } from '../../../media';
import { MediaCard } from '../';

figma.connect(
  MediaCard,
  'https://www.figma.com/design/k5CtyJccNQUGMI5bI4lJ2g/%E2%9C%A8-CDS-Components?node-id=72941-18302&m=dev',
  {
    imports: [
      "import { MediaCard } from '@coinbase/cds-web/cards/MediaCard'",
      "import { Avatar } from '@coinbase/cds-web/media/Avatar'",
    ],
    props: {
      title: figma.string('title'),
      subtitle: figma.boolean('show subtitle', {
        true: figma.string('↳ subtitle'),
        false: undefined,
      }),
      description: figma.boolean('show subdetail', {
        true: figma.instance('↳ subdetail'),
        false: undefined,
      }),
      media: figma.boolean('show media', {
        true: figma.instance('↳ media'),
        false: undefined,
      }),
      mediaPlacement: figma.enum('media placement', {
        left: 'start',
        right: 'end',
        none: undefined,
      }),
    },
    example: ({ ...props }) => (
      <MediaCard thumbnail={<Avatar alt="" shape="circle" size="l" src="" />} {...props} />
    ),
  },
);
