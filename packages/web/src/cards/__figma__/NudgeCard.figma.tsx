import React from 'react';
import { figma } from '@figma/code-connect';

import { NudgeCard } from '../NudgeCard';

figma.connect(
  NudgeCard,
  'https://www.figma.com/design/k5CtyJccNQUGMI5bI4lJ2g/✨-CDS-Components?node-id=10085%3A4433',
  {
    imports: ["import { NudgeCard } from '@coinbase/cds-web/cards/NudgeCard'"],
    props: {
      // onActionPress: figma.boolean('compact', {
      //   true: undefined,
      //   false: () => {},
      // }),
      // onDismissPress: figma.boolean('show dismiss', {
      //   true: () => {},
      //   false: undefined,
      // }),
      description: figma.nestedProps('string.nudge', {
        string: figma.enum('Ready-made', {
          Custom: figma.string('description'),
          'Earn more': figma.textContent('description'),
        }),
      }),
      title: figma.nestedProps('string.nudge', {
        string: figma.enum('Ready-made', {
          Custom: figma.boolean('show title', {
            true: figma.string('↳ title'),
            false: undefined,
          }),
          'Earn more': figma.boolean('show title', {
            true: figma.textContent('title'),
            false: undefined,
          }),
        }),
      }),
      media: figma.instance('media'),
      action: figma.nestedProps('string.nudge', {
        button: figma.children('Button'),
      }),
    },
    example: ({ action, title, description, ...props }) => (
      <NudgeCard
        action={action.button}
        description={description.string}
        title={title.string}
        {...props}
      />
    ),
  },
);
