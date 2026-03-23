import { figma } from '@figma/code-connect';

import { SubBrandLogoMark } from '../SubBrandLogoMark';

figma.connect(
  SubBrandLogoMark,
  'https://www.figma.com/design/46lNmiV1z8I888My5kNq7R/%E2%9C%A8-Logos?node-id=1268-16',
  {
    imports: ["import { SubBrandLogoMark } from '@coinbase/cds-web/icons/SubBrandLogoMark'"],
    props: {
      foreground: figma.nestedProps('Logo Mark', {
        color: figma.enum('color', {
          primary: undefined,
          foreground: true,
        }),
      }),
      type: figma.enum('product', {
        // advanced: 'advanced',
        account: 'account',
        base: 'base',
        card: 'card',
        // 'developer platform': 'developerPlatform',
        commerce: 'commerce',
        exchange: 'exchange',
        'international exchange': 'internationalExchange',
        nft: 'nft',
        one: 'one',
        // onramp: 'onramp',
        // prime: 'prime',
        'private client': 'privateClient',
        tracer: 'tracer',
        wallet: 'wallet',
        // retail: 'retail',
        // 'embedded wallets': 'embeddedWallets',
        // 'internal developer platform': 'internalDeveloperPlatform',
      }),
    },
    example: ({ foreground, ...props }) => (
      <SubBrandLogoMark {...props} foreground={foreground.color} />
    ),
  },
);
