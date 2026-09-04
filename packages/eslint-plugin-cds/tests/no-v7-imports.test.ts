import { RuleTester } from '@typescript-eslint/rule-tester';

import { noV7Imports } from '../src/rules/no-v7-imports';

const ruleTester = new RuleTester({
  languageOptions: {
    parserOptions: {
      ecmaFeatures: {
        jsx: true,
      },
    },
  },
});

// @ts-expect-error - not sure why the rule type is not matching up with the rule tester
ruleTester.run('no-v7-imports', noV7Imports, {
  valid: [
    {
      code: "import { Button } from '@coinbase/cds-web/buttons';",
    },
    {
      code: "import { Text } from '@coinbase/cds-mobile/typography';",
    },
    {
      code: "import { useTheme } from '@coinbase/cds-common/hooks';",
    },
    {
      code: "import { SomeComponent } from 'some-other-library/v7/components';",
    },
  ],
  invalid: [
    {
      code: "import { Button } from '@coinbase/cds-web/v7/buttons';",
      errors: [{ messageId: 'noV7Imports' }],
    },
    {
      code: "import { Text } from '@coinbase/cds-mobile/v7/typography';",
      errors: [{ messageId: 'noV7Imports' }],
    },
    {
      code: "import { useTheme } from '@coinbase/cds-common/v7/hooks';",
      errors: [{ messageId: 'noV7Imports' }],
    },
    {
      code: "import { Alert } from '@coinbase/cds-web/v7/overlays/Alert';",
      errors: [{ messageId: 'noV7Imports' }],
    },
    {
      code: "import { SparklineInteractiveHeader } from '@coinbase/cds-web-visualization/v7/sparkline/sparkline-interactive-header/SparklineInteractiveHeader';",
      errors: [{ messageId: 'noV7Imports' }],
    },
  ],
});
