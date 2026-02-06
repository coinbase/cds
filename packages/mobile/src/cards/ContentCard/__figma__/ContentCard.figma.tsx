import React from 'react';
import { figma } from '@figma/code-connect';

import { ContentCard } from '../ContentCard';

figma.connect(
  ContentCard,
  'https://www.figma.com/design/k5CtyJccNQUGMI5bI4lJ2g/%E2%9C%A8-CDS-Components?node-id=72941-16019&m=dev',
  {
    imports: ["import { ContentCard } from '@coinbase/cds-mobile/cards/ContentCard/ContentCard'"],
    props: {
      header: figma.boolean('show header', {
        true: figma.children('.cardHeader'),
        false: undefined,
      }),
      body: figma.boolean('show body', {
        true: figma.children('.CardBody'),
        false: undefined,
      }),
      footer: figma.boolean('show footer', {
        true: figma.children('.CardFooter'),
        false: undefined,
      }),
    },
    example: ({ header, footer, body, ...props }) => (
      <ContentCard {...props}>
        {header}
        {body}
        {footer}
      </ContentCard>
    ),
  },
);
