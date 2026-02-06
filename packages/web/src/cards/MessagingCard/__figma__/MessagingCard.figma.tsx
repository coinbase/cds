import React from 'react';
import { figma } from '@figma/code-connect';

import { MessagingCard } from '../';

figma.connect(
  MessagingCard,
  'https://www.figma.com/design/k5CtyJccNQUGMI5bI4lJ2g/%E2%9C%A8-CDS-Components?node-id=72941-20711&m=dev',
  {
    imports: ["import { MessagingCard } from '@coinbase/cds-web/cards/MessagingCard'"],
    props: {
      type: figma.enum('type', {
        upsell: 'upsell',
        nudge: 'nudge',
      }),
      title: figma.boolean('show title', {
        true: figma.string('↳ title'),
        false: undefined,
      }),
      description: figma.boolean('show subtitle', {
        true: figma.string('↳ subtitle'),
        false: undefined,
      }),
      tag: figma.boolean('show tag', {
        true: figma.instance('↳ tag'),
        false: undefined,
      }),
      media: figma.instance('media'),
      mediaPlacement: figma.enum('media placement', {
        left: 'start',
        right: 'end',
      }),
      onDismissButtonClick: figma.boolean('show dismiss', {
        true: () => {},
        false: undefined,
      }),
    },
    example: (props) => <MessagingCard action="Button" {...props} />,
  },
);
