import { figma } from '@figma/code-connect';

import { HStack } from '../../layout';
import { Link } from '../../typography';
import { TextInput } from '../TextInput';

figma.connect(
  TextInput,
  'https://www.figma.com/design/k5CtyJccNQUGMI5bI4lJ2g/✨-CDS-Components?node-id=252%3A16679',
  {
    imports: ["import { TextInput } from '@coinbase/cds-mobile/controls/TextInput'"],
    props: {
      align: figma.boolean('right align text', {
        true: 'end',
        false: undefined,
      }),
      disabled: figma.boolean('disabled'),
      compact: figma.boolean('compact'),
      label: figma.boolean('show label', {
        true: figma.string('↳ label string'),
        false: undefined,
      }),
      labelVariant: figma.boolean('label inside', {
        true: 'inside',
        false: 'outside',
      }),
      start: figma.boolean('show start', {
        true: figma.instance('↳ start icon'),
        false: undefined,
      }),
      end: figma.boolean('show end', {
        true: figma.boolean('↳ show end icon', {
          true: figma.instance('↳ end icon'),
          false: undefined,
        }),
        false: undefined,
      }),
      helperText: figma.boolean('show helper text', {
        true: 'Assistive message',
        false: undefined,
      }),
      placeholder: figma.nestedProps('string.text input', {
        text: figma.enum('Ready-made', {
          Custom: figma.string('string'),
          Email: figma.textContent('text-input-label'),
          Password: figma.textContent('text-input-label'),
          'Legal name': figma.textContent('text-input-label'),
        }),
      }),
      variant: figma.enum('state', {
        positive: 'positive',
        negative: 'negative',
      }),
    },
    example: ({ placeholder, ...props }) => <TextInput placeholder={placeholder.text} {...props} />,
  },
);

figma.connect(
  TextInput,
  'https://www.figma.com/design/k5CtyJccNQUGMI5bI4lJ2g/✨-CDS-Components?node-id=252%3A16679',
  {
    imports: ["import { TextInput } from '@coinbase/cds-mobile/controls/TextInput'"],
    variant: { 'show end': true, '↳ show suffix': true },
    props: {
      align: figma.boolean('right align text', {
        true: 'end',
        false: undefined,
      }),
      disabled: figma.boolean('disabled'),
      compact: figma.boolean('compact'),
      label: figma.boolean('show label', {
        true: figma.string('↳ label string'),
        false: undefined,
      }),
      labelVariant: figma.enum('label inside', {
        inside: 'inside',
        outside: 'outside',
      }),
      start: figma.boolean('show start', {
        true: figma.instance('↳ start icon'),
        false: undefined,
      }),
      endIcon: figma.instance('↳ end icon'),
      helperText: figma.boolean('show helper text', {
        true: 'Assistive message',
        false: undefined,
      }),
      placeholder: figma.nestedProps('string.text input', {
        text: figma.enum('Ready-made', {
          Custom: figma.string('string'),
          Email: figma.textContent('text-input-label'),
          Password: figma.textContent('text-input-label'),
          'Legal name': figma.textContent('text-input-label'),
        }),
      }),
      variant: figma.enum('state', {
        positive: 'positive',
        negative: 'negative',
      }),
    },
    example: ({ placeholder, endIcon, ...props }) => (
      <TextInput
        end={
          <HStack>
            <Link color="fgPrimary" onPress={() => {}}>
              copy
            </Link>
            {endIcon}
          </HStack>
        }
        placeholder={placeholder.text}
        {...props}
      />
    ),
  },
);
