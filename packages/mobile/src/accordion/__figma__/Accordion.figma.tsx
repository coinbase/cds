import React from 'react';
import { figma } from '@figma/code-connect';

import { Accordion } from '../Accordion';
import { AccordionItem } from '../AccordionItem';

figma.connect(
  Accordion,
  'https://www.figma.com/design/k5CtyJccNQUGMI5bI4lJ2g/✨-CDS-Components?node-id=148%3A2954',
  {
    imports: [
      "import { Accordion } from '@coinbase/cds-mobile/accordion/Accordion'",
      "import { AccordionItem } from '@coinbase/cds-mobile/accordion/AccordionItem'",
    ],
    props: {
      subtitle: figma.boolean('show subtitle', {
        true: figma.string('subtitle'),
        false: undefined,
      }),
      media: figma.boolean('show media', {
        true: figma.instance('media'),
        false: undefined,
      }),
      title: figma.textContent('title'),
      defaultActiveKey: figma.boolean('show panel', {
        true: '1',
        false: undefined,
      }),
      itemContent: figma.instance('🔄 replace me'),
    },
    example: ({ defaultActiveKey, itemContent, ...props }) => (
      <Accordion defaultActiveKey={defaultActiveKey}>
        <AccordionItem itemKey="1" {...props}>
          {itemContent}
        </AccordionItem>
      </Accordion>
    ),
  },
);
