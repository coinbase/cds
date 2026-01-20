import fs from 'fs';
import path from 'path';

import { RuleTester } from '@typescript-eslint/rule-tester';

import rule from './index.mjs';

RuleTester.afterAll = afterAll;
RuleTester.describe = describe;
RuleTester.it = it;

// Mock fs and path for testing
const originalExistsSync = fs.existsSync;
const originalReadFileSync = fs.readFileSync;

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

describe("'figma-connect-imports-package-match' rule", () => {
  beforeEach(() => {
    // Mock fs.existsSync and fs.readFileSync for package.json lookups
    fs.existsSync = (filePath) => {
      if (filePath.endsWith('package.json')) {
        // Return true for our test package paths
        if (
          filePath.includes('/packages/web/') ||
          filePath.includes('/packages/mobile/') ||
          filePath.includes('/packages/web-visualization/') ||
          filePath.includes('/packages/mobile-visualization/')
        ) {
          return true;
        }
        // Check if it's a direct package.json path we want to mock
        const normalizedPath = filePath.replace(/\\/g, '/');
        if (
          normalizedPath === '/project/packages/web/package.json' ||
          normalizedPath === '/project/packages/mobile/package.json' ||
          normalizedPath === '/project/packages/web-visualization/package.json' ||
          normalizedPath === '/project/packages/mobile-visualization/package.json'
        ) {
          return true;
        }
      }
      return originalExistsSync(filePath);
    };

    fs.readFileSync = (filePath, encoding) => {
      const normalizedPath = filePath.replace(/\\/g, '/');

      if (normalizedPath.includes('/packages/web/package.json')) {
        return JSON.stringify({ name: '@coinbase/cds-web' });
      }
      if (normalizedPath.includes('/packages/mobile/package.json')) {
        return JSON.stringify({ name: '@coinbase/cds-mobile' });
      }
      if (normalizedPath.includes('/packages/web-visualization/package.json')) {
        return JSON.stringify({ name: '@coinbase/cds-web-visualization' });
      }
      if (normalizedPath.includes('/packages/mobile-visualization/package.json')) {
        return JSON.stringify({ name: '@coinbase/cds-mobile-visualization' });
      }

      return originalReadFileSync(filePath, encoding);
    };
  });

  afterEach(() => {
    fs.existsSync = originalExistsSync;
    fs.readFileSync = originalReadFileSync;
  });

  ruleTester.run('figma-connect-imports-package-match', rule, {
    valid: [
      {
        // Valid: web package importing from cds-web
        code: `
          import { figma } from '@figma/code-connect';
          import { Button } from '../Button';

          figma.connect(Button, 'https://figma.com/design/abc', {
            imports: ["import { Button } from '@coinbase/cds-web/buttons/Button';"],
            props: {},
            example: () => <Button />,
          });
        `,
        filename: '/project/packages/web/src/buttons/__figma__/Button.figma.tsx',
      },
      {
        // Valid: mobile package importing from cds-mobile
        code: `
          import { figma } from '@figma/code-connect';
          import { Button } from '../Button';

          figma.connect(Button, 'https://figma.com/design/abc', {
            imports: ["import { Button } from '@coinbase/cds-mobile/buttons/Button';"],
            props: {},
            example: () => <Button />,
          });
        `,
        filename: '/project/packages/mobile/src/buttons/__figma__/Button.figma.tsx',
      },
      {
        // Valid: web package importing from cds-common (shared package allowed)
        code: `
          import { figma } from '@figma/code-connect';
          import { Sparkline } from '../Sparkline';

          figma.connect(Sparkline, 'https://figma.com/design/abc', {
            imports: [
              "import { Sparkline } from '@coinbase/cds-web-visualization';",
              "import { useSparklinePath } from '@coinbase/cds-common/visualizations/useSparklinePath';",
            ],
            props: {},
            example: () => <Sparkline />,
          });
        `,
        filename: '/project/packages/web-visualization/src/sparkline/__figma__/Sparkline.figma.tsx',
      },
      {
        // Valid: not a figma.connect call (should be ignored)
        code: `
          const result = someOtherFunction({
            imports: ["import { Button } from '@coinbase/cds-mobile/buttons/Button';"],
          });
        `,
        filename: '/project/packages/web/src/buttons/__figma__/Button.figma.tsx',
      },
    ],
    invalid: [
      {
        // Invalid: web package importing from cds-mobile
        code: `
          import { figma } from '@figma/code-connect';
          import { Button } from '../Button';

          figma.connect(Button, 'https://figma.com/design/abc', {
            imports: ["import { Button } from '@coinbase/cds-mobile/buttons/Button';"],
            props: {},
            example: () => <Button />,
          });
        `,
        filename: '/project/packages/web/src/buttons/__figma__/Button.figma.tsx',
        errors: [
          {
            messageId: 'packageMismatch',
            data: {
              importPath: '@coinbase/cds-mobile',
              expectedPackage: '@coinbase/cds-web',
            },
          },
        ],
      },
      {
        // Invalid: mobile package importing from cds-web
        code: `
          import { figma } from '@figma/code-connect';
          import { Button } from '../Button';

          figma.connect(Button, 'https://figma.com/design/abc', {
            imports: ["import { Button } from '@coinbase/cds-web/buttons/Button';"],
            props: {},
            example: () => <Button />,
          });
        `,
        filename: '/project/packages/mobile/src/buttons/__figma__/Button.figma.tsx',
        errors: [
          {
            messageId: 'packageMismatch',
            data: {
              importPath: '@coinbase/cds-web',
              expectedPackage: '@coinbase/cds-mobile',
            },
          },
        ],
      },
      {
        // Invalid: multiple imports with one wrong package
        code: `
          import { figma } from '@figma/code-connect';
          import { Accordion } from '../Accordion';

          figma.connect(Accordion, 'https://figma.com/design/abc', {
            imports: [
              "import { Accordion } from '@coinbase/cds-web/accordion/Accordion';",
              "import { AccordionItem } from '@coinbase/cds-mobile/accordion/AccordionItem';",
            ],
            props: {},
            example: () => <Accordion />,
          });
        `,
        filename: '/project/packages/web/src/accordion/__figma__/Accordion.figma.tsx',
        errors: [
          {
            messageId: 'packageMismatch',
            data: {
              importPath: '@coinbase/cds-mobile',
              expectedPackage: '@coinbase/cds-web',
            },
          },
        ],
      },
    ],
  });
});
