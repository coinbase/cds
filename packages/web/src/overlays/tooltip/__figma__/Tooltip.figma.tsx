import { figma } from '@figma/code-connect';

import { Button } from '../../../buttons';
import { TextBody, TextHeadline } from '../../../typography';
import { Tooltip } from '../Tooltip';

figma.connect(
  Tooltip,
  'https://www.figma.com/design/k5CtyJccNQUGMI5bI4lJ2g/✨-CDS-Components?node-id=715%3A14162',
  {
    imports: [
      "import { Tooltip } from '@coinbase/cds-web/overlays'",
      "import { Button } from '@coinbase/cds-web/buttons/Button'",
    ],
    variant: { type: 'body' },
    props: {
      content: figma.nestedProps('string.tooltip', {
        description: figma.enum('Ready-made', {
          Custom: figma.string('description'),
          Congestion: figma.textContent('body-option'),
          'Crypto prices': figma.textContent('body-option'),
          'Exchange rate': figma.textContent('body-option'),
          'Gain/loss': figma.textContent('body-option'),
          'Max slippage': figma.textContent('body-option'),
          Network: figma.textContent('body-option'),
          'Network fee': figma.textContent('body-option'),
          'Trading activity': figma.textContent('body-option'),
          'Transaction estimate': figma.textContent('body-option'),
        }),
      }),
    },
    example: ({ content }) => (
      <Tooltip content={content.description}>
        <Button>Default</Button>
      </Tooltip>
    ),
  },
);

figma.connect(
  Tooltip,
  'https://www.figma.com/design/k5CtyJccNQUGMI5bI4lJ2g/✨-CDS-Components?node-id=715%3A14162',
  {
    imports: [
      "import { Tooltip } from '@coinbase/cds-web/overlays'",
      "import { Button } from '@coinbase/cds-web/buttons/Button'",
    ],
    variant: { type: 'title + body' },
    props: {
      content: figma.nestedProps('string.tooltip', {
        title: figma.enum('Ready-made', {
          Custom: figma.string('title'),
          Congestion: figma.textContent('title-option'),
          'Crypto prices': figma.textContent('title-option'),
          'Exchange rate': figma.textContent('title-option'),
          'Gain/loss': figma.textContent('title-option'),
          'Max slippage': figma.textContent('title-option'),
          Network: figma.textContent('title-option'),
          'Network fee': figma.textContent('title-option'),
          'Trading activity': figma.textContent('title-option'),
          'Transaction estimate': figma.textContent('title-option'),
        }),
        description: figma.enum('Ready-made', {
          Custom: figma.string('description'),
          Congestion: figma.textContent('body-option'),
          'Crypto prices': figma.textContent('body-option'),
          'Exchange rate': figma.textContent('body-option'),
          'Gain/loss': figma.textContent('body-option'),
          'Max slippage': figma.textContent('body-option'),
          Network: figma.textContent('body-option'),
          'Network fee': figma.textContent('body-option'),
          'Trading activity': figma.textContent('body-option'),
          'Transaction estimate': figma.textContent('body-option'),
        }),
      }),
    },
    example: ({ content }) => (
      <Tooltip
        content={
          <>
            <TextHeadline as="p">{content.title}</TextHeadline>
            <TextBody as="p">{content.description}</TextBody>
          </>
        }
      >
        <Button>Default</Button>
      </Tooltip>
    ),
  },
);
