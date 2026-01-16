import { figma } from '@figma/code-connect';

import { useTheme } from '../../hooks/useTheme';
import { UpsellCard } from '../UpsellCard';

figma.connect(
  UpsellCard,
  'https://www.figma.com/design/k5CtyJccNQUGMI5bI4lJ2g/✨-CDS-Components?node-id=10085%3A6279',
  {
    imports: [
      "import { useTheme } from '@coinbase/cds-web/hooks/useTheme'",
      "import { UpsellCard } from '@coinbase/cds-web/cards/UpsellCard'",
    ],
    props: {
      media: figma.instance('media'),
      // onDismissPress: figma.boolean('show dismiss', {
      //   true: () => {},
      //   false: undefined,
      // }),
      title: figma.nestedProps('string.upsell', {
        string: figma.enum('Ready-made', {
          Custom: figma.boolean('show title', { true: figma.string('↳ title'), false: undefined }),
          Quests: figma.boolean('show title', {
            true: figma.textContent('title'),
            false: undefined,
          }),
        }),
      }),
      description: figma.nestedProps('string.upsell', {
        string: figma.enum('Ready-made', {
          Custom: figma.string('description'),
          Quests: figma.textContent('description'),
        }),
      }),
      action: figma.children('Button'),
    },
    example: function Example({ title, description, ...props }) {
      const { spectrum } = useTheme();
      const green60 = `rgba(${spectrum.green60})`;
      return (
        <UpsellCard
          {...props}
          dangerouslySetBackground={green60}
          description={description.string}
          title={title.string}
        />
      );
    },
  },
);
