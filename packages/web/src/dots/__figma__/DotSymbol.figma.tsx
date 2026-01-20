import { figma } from '@figma/code-connect';

import { DotSymbol } from '../DotSymbol';

figma.connect(
  DotSymbol,
  'https://www.figma.com/design/k5CtyJccNQUGMI5bI4lJ2g/✨-CDS-Components?node-id=155%3A12033',
  {
    imports: ["import { DotSymbol } from'@coinbase/cds-web/dots/DotSymbol'"],
    props: {
      children: figma.enum('symbol size', {
        l: figma.instance('48 media'),
        m: figma.instance('32 media'),
        s: figma.instance('32 media'),
        xs: figma.instance('24 media'),
      }),
      symbol: figma.enum('symbol size', {
        l: figma.instance('l dot'),
        m: figma.instance('m dot'),
        s: figma.instance('s dot'),
        xs: figma.instance('xs dot'),
      }),
      pin: figma.enum('pin', {
        'bottom-end': 'bottom-end',
        'bottom-start': 'bottom-start',
        'top-start': 'top-start',
        'top-end': 'top-end',
      }),
      size: figma.enum('symbol size', {
        l: 'l',
        m: 'm',
        s: 's',
        xs: 'xs',
      }),
    },
    example: ({ children, ...props }) => <DotSymbol {...props}>{children}</DotSymbol>,
  },
);
