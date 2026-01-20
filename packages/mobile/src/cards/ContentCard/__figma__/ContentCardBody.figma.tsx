import React from 'react';
import { Image } from 'react-native';
import { figma } from '@figma/code-connect';

import { ContentCardBody } from '../ContentCardBody';

figma.connect(
  ContentCardBody,
  'https://www.figma.com/design/k5CtyJccNQUGMI5bI4lJ2g/✨-CDS-Components?node-id=14705-24336',
  {
    imports: [
      "import { ContentCardBody } from '@coinbase/cds-mobile/cards/ContentCard/ContentCardBody'",
    ],
    props: {
      body: figma.string('body'),
      label: figma.string('label'),
      children: figma.enum('type', {
        custom: figma.children('*'),
      }),
      media: figma.enum('type', {
        'image right': <Image />,
        'image top': <Image />,
        'image bottom': <Image />,
        'image left': <Image />,
      }),
      mediaPosition: figma.enum('type', {
        'image right': 'right',
        'image top': 'top',
        'image bottom': 'bottom',
        'image left': 'left',
      }),
    },
    example: ({ children, ...props }) => <ContentCardBody {...props}>{children}</ContentCardBody>,
  },
);
