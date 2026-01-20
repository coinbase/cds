import React from 'react';
import { figma } from '@figma/code-connect';

import { ContentCard } from '../ContentCard';

figma.connect(
  ContentCard,
  'https://www.figma.com/design/k5CtyJccNQUGMI5bI4lJ2g/✨-CDS-Components?node-id=14705%3A22920',
  {
    imports: ["import { ContentCard } from '@cbhq/cds-web/cards/ContentCard/ContentCard'"],
    props: {
      header: figma.boolean('show card header', {
        true: figma.children('.📦 ContentCardHeader'),
        false: undefined,
      }),
      body: figma.children('.📦 ContentCardBody'),
      footer: figma.boolean('show card footer', {
        true: figma.children('.📦 ContentCardFooter'),
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
