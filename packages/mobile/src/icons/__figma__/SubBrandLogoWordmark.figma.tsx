import React from 'react';
import { figma } from '@figma/code-connect';

import { SubBrandLogoWordmark } from '../SubBrandLogoWordmark';

figma.connect(
  SubBrandLogoWordmark,
  'https://www.figma.com/design/46lNmiV1z8I888My5kNq7R/%E2%9C%A8-Logos?node-id=1268-79',
  {
    imports: [
      "import { SubBrandLogoWordmark } from '@coinbase/cds-mobile/icons/SubBrandLogoWordmark'",
    ],
    props: {
      foreground: figma.nestedProps('Logo Wordmark', {
        color: figma.enum('color', {
          primary: undefined,
          foreground: true,
          'primary Foreground': undefined,
        }),
      }),
      type: figma.enum('product', {
        // retail: undefined,
        advanced: 'advanced',
        card: 'card',
        // 'developer platform': 'developerPlatform',
        commerce: 'commerce',
        'derivatives exchange': 'derivativesExchange',
        exchange: 'exchange',
        help: 'help',
        'international exchange': 'internationalExchange',
        nft: 'nft',
        one: 'one',
        // onramp: 'onramp',
        prime: 'prime',
        'private client': 'privateClient',
        tracer: 'tracer',
        wallet: 'wallet',
        // 'embedded wallets': 'embeddedWallets',
        // 'internal developer platform': 'internalDeveloperPlatform',
      }),
    },
    example: ({ foreground, ...props }) => (
      <SubBrandLogoWordmark {...props} foreground={foreground.color} />
    ),
  },
);
