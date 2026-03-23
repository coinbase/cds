import React from 'react';
import { figma } from '@figma/code-connect';

import { TileButton } from '../TileButton';

figma.connect(
  TileButton,
  'https://www.figma.com/design/k5CtyJccNQUGMI5bI4lJ2g/✨-CDS-Components?node-id=286%3A18370',
  {
    imports: ["import { TileButton } from '@coinbase/cds-web/buttons/TileButton'"],
    props: {
      title: figma.string('product text'),
      children: figma.instance('product logo'),
      disabled: figma.boolean('disabled'),
    },
    example: ({ children, ...props }) => <TileButton {...props}>{children}</TileButton>,
  },
);
