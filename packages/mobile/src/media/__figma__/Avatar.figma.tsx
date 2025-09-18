import React from 'react';
import { figma } from '@figma/code-connect';

import { Avatar } from '../Avatar';

figma.connect(
  Avatar,
  'https://www.figma.com/design/k5CtyJccNQUGMI5bI4lJ2g/✨-CDS-Components?node-id=60-643&m=dev',
  {
    imports: ["import {Avatar} from '@cbhq/cds-mobile/media/Avatar'"],
    props: {
      shape: figma.enum('shape', {
        circle: 'circle',
        square: 'square',
        polygon: 'polygon',
      }),
      size: figma.enum('size', {
        'm (24)': 'm',
        'l (32)': 'l',
        'xl (40)': 'xl',
        'xxl (48)': 'xxl',
        'xxxl (56)': 'xxxl',
      }),
      colorScheme: figma.enum('color scheme', {
        teal: 'teal',
        purple: 'purple',
        pink: 'pink',
        green: 'green',
        gray: 'gray',
        NA: 'blue',
        blue: 'blue',
      }),
      variant: figma.enum('variant', {
        image: 'image',
        initial: 'initial',
        NFT: 'nft',
      }),
      name: figma.enum('variant', {
        initial: figma.string('initial'),
      }),
      src: figma.enum('variant', {
        image: 'url',
      }),
    },
    // @ts-expect-error shape mapping issue
    example: ({ variant, shape, ...props }) => <Avatar {...props} alt={variant} shape={shape} />,
  },
);
