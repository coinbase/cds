import React from 'react';
import { figma } from '@figma/code-connect';

import { Button } from '../../buttons/Button';
import { ButtonGroup } from '../../buttons/ButtonGroup';
import { PageFooter } from '../PageFooter';

const url =
  'https://www.figma.com/design/k5CtyJccNQUGMI5bI4lJ2g/✨-CDS-Components?node-id=17685%3A3266';

figma.connect(PageFooter, url, {
  imports: [
    "import { PageFooter } from '@coinbase/cds-web/page/PageFooter'",
    "import { Button } from '@coinbase/cds-web/buttons/Button'",
  ],
  variant: { '# of actions': '1' },
  props: {
    action: figma.children('Button'),
    legalText: figma.boolean('show legal text', {
      true: 'Your legal text here.',
      false: undefined,
    }),
  },
  example: ({ legalText }) => (
    <PageFooter action={<Button variant="primary">Next</Button>} legalText={legalText} />
  ),
});

figma.connect(PageFooter, url, {
  imports: [
    "import { PageFooter } from '@coinbase/cds-web/page/PageFooter'",
    "import { Button } from '@coinbase/cds-web/buttons/Button'",
    "import { ButtonGroup } from '@coinbase/cds-web/buttons/ButtonGroup'",
  ],
  variant: { '# of actions': '2' },
  props: {
    legalText: figma.boolean('show legal text', {
      true: 'Your legal text here.',
      false: undefined,
    }),
  },
  example: ({ legalText }) => (
    <PageFooter
      action={
        <ButtonGroup>
          <Button variant="secondary">Back</Button>
          <Button variant="primary">Next</Button>
        </ButtonGroup>
      }
      legalText={legalText}
    />
  ),
});
