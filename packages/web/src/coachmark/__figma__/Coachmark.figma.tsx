import React from 'react';
import { figma } from '@figma/code-connect';

import { Button } from '../../buttons';
import { Checkbox } from '../../controls';
import { Coachmark } from '../Coachmark';

figma.connect(
  Coachmark,
  'https://www.figma.com/design/k5CtyJccNQUGMI5bI4lJ2g/✨-CDS-Components?node-id=24997-8568',
  {
    imports: ["import { Coachmark } from '@coinbase/cds-web/tour/Coachmark'"],
    props: {
      // onClose: figma.boolean('dismissable', {
      //   true: () => {},
      //   false: undefined,
      // }),
      media: figma.boolean('show media', {
        true: <img alt="" src="" />,
        false: undefined,
      }),
      action: figma.boolean('action bar', {
        true: (
          <Button compact variant="secondary">
            Button
          </Button>
        ),
        false: undefined,
      }),
    },
    example: ({ ...props }) => (
      <Coachmark
        checkbox={
          <Checkbox checked={false} onChange={() => {}}>
            Checkbox label
          </Checkbox>
        }
        content="Add up to 3 lines of body copy. Deliver your message with clarity and impact"
        title="Headline"
        {...props}
      />
    ),
  },
);
