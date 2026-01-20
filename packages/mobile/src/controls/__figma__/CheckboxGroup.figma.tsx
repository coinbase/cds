import React from 'react';
import { figma } from '@figma/code-connect';

import { CheckboxGroup } from '../CheckboxGroup';

figma.connect(
  CheckboxGroup,
  'https://www.figma.com/design/k5CtyJccNQUGMI5bI4lJ2g/✨-CDS-Components?node-id=155%3A10032',
  {
    imports: ["import { CheckboxGroup } from '@coinbase/cds-mobile/controls/CheckboxGroup'"],
    props: {
      children: figma.children('*'),
    },
    example: ({ children, ...props }) => {
      // @ts-expect-error: Checkbox expects multiple children but only 1 was provided
      return <CheckboxGroup {...props}>{children}</CheckboxGroup>;
    },
  },
);
