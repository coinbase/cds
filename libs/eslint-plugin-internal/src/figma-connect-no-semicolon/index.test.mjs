import { RuleTester } from '@typescript-eslint/rule-tester';

import rule from './index.mjs';

RuleTester.afterAll = afterAll;
RuleTester.describe = describe;
RuleTester.it = it;

const ruleTester = new RuleTester({
  languageOptions: {
    parserOptions: {
      ecmaVersion: 2022,
      sourceType: 'module',
      ecmaFeatures: {
        jsx: true,
      },
    },
  },
});

describe("'figma-connect-no-semicolon' rule", () => {
  ruleTester.run('figma-connect-no-semicolon', rule, {
    valid: [
      {
        // Valid: no semicolon in import string
        code: `
          import { figma } from '@figma/code-connect';
          import { Button } from '../Button';

          figma.connect(Button, 'https://figma.com/design/abc', {
            imports: ["import { Button } from '@coinbase/cds-web/buttons/Button'"],
            props: {},
            example: () => <Button />,
          });
        `,
        filename: 'Button.figma.tsx',
      },
      {
        // Valid: multiple imports without semicolons
        code: `
          import { figma } from '@figma/code-connect';
          import { Accordion } from '../Accordion';

          figma.connect(Accordion, 'https://figma.com/design/abc', {
            imports: [
              "import { Accordion } from '@coinbase/cds-mobile/accordion/Accordion'",
              "import { AccordionItem } from '@coinbase/cds-mobile/accordion/AccordionItem'",
            ],
            props: {},
            example: () => <Accordion />,
          });
        `,
        filename: 'Accordion.figma.tsx',
      },
      {
        // Valid: not a figma.connect call (should be ignored)
        code: `
          const config = {
            imports: ["import React from 'react';"],
          };
        `,
        filename: 'other.ts',
      },
    ],
    invalid: [
      {
        // Invalid: single import with semicolon
        code: `
          import { figma } from '@figma/code-connect';
          import { Button } from '../Button';

          figma.connect(Button, 'https://figma.com/design/abc', {
            imports: ["import { Button } from '@coinbase/cds-web/buttons/Button';"],
            props: {},
            example: () => <Button />,
          });
        `,
        filename: 'Button.figma.tsx',
        errors: [{ messageId: 'noSemicolonInImportString' }],
        output: `
          import { figma } from '@figma/code-connect';
          import { Button } from '../Button';

          figma.connect(Button, 'https://figma.com/design/abc', {
            imports: ["import { Button } from '@coinbase/cds-web/buttons/Button'"],
            props: {},
            example: () => <Button />,
          });
        `,
      },
      {
        // Invalid: multiple imports with semicolons
        code: `
          import { figma } from '@figma/code-connect';
          import { Accordion } from '../Accordion';

          figma.connect(Accordion, 'https://figma.com/design/abc', {
            imports: [
              "import { Accordion } from '@coinbase/cds-mobile/accordion/Accordion';",
              "import { AccordionItem } from '@coinbase/cds-mobile/accordion/AccordionItem';",
            ],
            props: {},
            example: () => <Accordion />,
          });
        `,
        filename: 'Accordion.figma.tsx',
        errors: [
          { messageId: 'noSemicolonInImportString' },
          { messageId: 'noSemicolonInImportString' },
        ],
        output: `
          import { figma } from '@figma/code-connect';
          import { Accordion } from '../Accordion';

          figma.connect(Accordion, 'https://figma.com/design/abc', {
            imports: [
              "import { Accordion } from '@coinbase/cds-mobile/accordion/Accordion'",
              "import { AccordionItem } from '@coinbase/cds-mobile/accordion/AccordionItem'",
            ],
            props: {},
            example: () => <Accordion />,
          });
        `,
      },
      {
        // Invalid: single quotes with semicolon
        code: `
          import { figma } from '@figma/code-connect';
          import { Text } from '../Text';

          figma.connect(Text, 'https://figma.com/design/abc', {
            imports: ['import { Text } from "@coinbase/cds-mobile/typography/Text";'],
            props: {},
            example: () => <Text />,
          });
        `,
        filename: 'Text.figma.tsx',
        errors: [{ messageId: 'noSemicolonInImportString' }],
        output: `
          import { figma } from '@figma/code-connect';
          import { Text } from '../Text';

          figma.connect(Text, 'https://figma.com/design/abc', {
            imports: ['import { Text } from "@coinbase/cds-mobile/typography/Text"'],
            props: {},
            example: () => <Text />,
          });
        `,
      },
    ],
  });
});
