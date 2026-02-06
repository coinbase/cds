import React from 'react';
import { ethBackground } from '@coinbase/cds-common/internal/data/assets';
import { figma } from '@figma/code-connect';

import { Avatar, RemoteImage } from '../../../media';
import { MediaCard } from '../';

figma.connect(
  MediaCard,
  'https://www.figma.com/design/k5CtyJccNQUGMI5bI4lJ2g/%E2%9C%A8-CDS-Components?node-id=72941-18302&m=dev',
  {
    imports: [
      "import { MediaCard } from '@coinbase/cds-mobile/cards/MediaCard'",
      "import { Avatar } from '@coinbase/cds-mobile/media/Avatar'",
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
      thumbnail: figma.boolean('show media', {
        true: figma.instance('↳ media'),
        false: undefined,
      }),
      mediaPlacement: figma.enum('image placement', {
        left: 'start',
        right: 'end',
        none: undefined,
      }),
      media: figma.enum('image placement', {
        left: <RemoteImage alt="Media" shape="rectangle" source={ethBackground} width="100%" />,
        right: <RemoteImage alt="Media" shape="rectangle" source={ethBackground} width="100%" />,
        none: undefined,
      }),
    },
    example: (props) => <MediaCard {...props} />,
  },
);
