import { figma } from '@figma/code-connect';

import { Link } from '../Link';

figma.connect(
  Link,
  'https://www.figma.com/design/k5CtyJccNQUGMI5bI4lJ2g/✨-CDS-Components?node-id=324-14982&m=dev',
  {
    imports: ["import { Link } from '@coinbase/cds-mobile/typography/Link'"],
    props: {
      children: figma.string('string'),
      color: figma.enum('variant', {
        primary: 'fgPrimary',
        foreground: 'fg',
        negativeForeground: 'fgNegative',
      }),
      // Note: variant prop removed in v8 - Link now wraps Text component
      underline: figma.boolean('underline'),
    },
    example: ({ children, ...props }) => <Link {...props}>{children}</Link>,
  },
);
