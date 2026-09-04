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

describe("'figma-connect-imports-required' rule", () => {
  ruleTester.run('figma-connect-imports-required', rule, {
    valid: [
      {
        // Valid: imports array with one element
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
      },
      {
        // Valid: imports array with multiple elements
        code: `
          import { figma } from '@figma/code-connect';
          import { Accordion } from '../Accordion';

          figma.connect(Accordion, 'https://figma.com/design/abc', {
            imports: [
              "import { Accordion } from '@coinbase/cds-web/accordion/Accordion';",
              "import { AccordionItem } from '@coinbase/cds-web/accordion/AccordionItem';",
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
          const result = someOtherFunction({
            props: {},
            example: () => null,
          });
        `,
        filename: 'other.ts',
      },
      {
        // Valid: figma.something else (should be ignored)
        code: `
          figma.render(() => <Button />);
        `,
        filename: 'other.figma.tsx',
      },
    ],
    invalid: [
      {
        // Invalid: missing imports property
        code: `
          import { figma } from '@figma/code-connect';
          import { Button } from '../Button';

          figma.connect(Button, 'https://figma.com/design/abc', {
            props: {},
            example: () => <Button />,
          });
        `,
        filename: 'Button.figma.tsx',
        errors: [{ messageId: 'missingImports' }],
      },
      {
        // Invalid: empty imports array
        code: `
          import { figma } from '@figma/code-connect';
          import { Button } from '../Button';

          figma.connect(Button, 'https://figma.com/design/abc', {
            imports: [],
            props: {},
            example: () => <Button />,
          });
        `,
        filename: 'Button.figma.tsx',
        errors: [{ messageId: 'emptyImports' }],
      },
      {
        // Invalid: imports is a string instead of array
        code: `
          import { figma } from '@figma/code-connect';
          import { Button } from '../Button';

          figma.connect(Button, 'https://figma.com/design/abc', {
            imports: "import { Button } from '@coinbase/cds-web/buttons/Button';",
            props: {},
            example: () => <Button />,
          });
        `,
        filename: 'Button.figma.tsx',
        errors: [{ messageId: 'importsNotArray' }],
      },
      {
        // Invalid: imports is undefined
        code: `
          import { figma } from '@figma/code-connect';
          import { Button } from '../Button';

          figma.connect(Button, 'https://figma.com/design/abc', {
            imports: undefined,
            props: {},
            example: () => <Button />,
          });
        `,
        filename: 'Button.figma.tsx',
        errors: [{ messageId: 'importsNotArray' }],
      },
    ],
  });
});
