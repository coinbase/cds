import { figma } from '@figma/code-connect';

import { SearchInput } from '../SearchInput';

figma.connect(
  SearchInput,
  'https://www.figma.com/design/k5CtyJccNQUGMI5bI4lJ2g/✨-CDS-Components?node-id=67-767&m=dev',
  {
    imports: ["import { SearchInput } from '@coinbase/cds-web/controls/SearchInput'"],
    props: {
      // state: figma.enum('state', {
      //   active: 'active',
      //   focus: 'focus',
      //   typing: 'typing',
      // }),
      compact: figma.boolean('compact'),
      disabled: figma.boolean('disabled'),
      text: figma.nestedProps('string.search input', {
        placeholder: figma.enum('Ready-made', {
          Custom: figma.string('string'),
          'Retail search': figma.textContent('search-input-label'),
          'Retail send': figma.textContent('search-input-label'),
          'Web3 search': figma.textContent('search-input-label'),
          'Wallet search': figma.textContent('search-input-label'),
          'Wallet send': figma.textContent('search-input-label'),
        }),
      }),
    },
    example: ({ text, ...props }) => (
      <SearchInput onChangeText={() => {}} placeholder={text.placeholder} value="" {...props} />
    ),
  },
);
